//	---------------------------------------------------------------------------
//	jWebSocket Load Balancer MongoDBClusterManager (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2015 Innotrade GmbH (jWebSocket.org)
//      Alexander Schulze, Germany (NRW)
//
//	Licensed under the Apache License, Version 2.0 (the "License");
//	you may not use this file except in compliance with the License.
//	You may obtain a copy of the License at
//
//	http://www.apache.org/licenses/LICENSE-2.0
//
//	Unless required by applicable law or agreed to in writing, software
//	distributed under the License is distributed on an "AS IS" BASIS,
//	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//	See the License for the specific language governing permissions and
//	limitations under the License.
//	---------------------------------------------------------------------------
package org.jwebsocket.plugins.loadbalancer.mongodb;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.WriteResult;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import org.jwebsocket.api.IInitializable;
import org.jwebsocket.plugins.loadbalancer.BaseClusterManager;
import static org.jwebsocket.plugins.loadbalancer.api.Attributes.*;
import org.jwebsocket.plugins.loadbalancer.api.ICluster;
import org.jwebsocket.plugins.loadbalancer.api.IClusterEndPoint;
import org.jwebsocket.util.Tools;

/**
 *
 * @author Rolando Santamaria Maso
 */
public class MongoDBClusterManager extends BaseClusterManager implements IInitializable {

	private final DBCollection mConfig, mClusters, mEndPoints;
	private List<ICluster> mStartupClusters;

	public MongoDBClusterManager(DBCollection aConfig, DBCollection aClusters, DBCollection aEndPoints) {
		mClusters = aClusters;
		mEndPoints = aEndPoints;
		mConfig = aConfig;
	}

	@Override
	public Iterator<ICluster> getClusters() {
		final DBCursor lCursor = mClusters.find();
		return new Iterator<ICluster>() {

			@Override
			public boolean hasNext() {
				return lCursor.hasNext();
			}

			@Override
			public ICluster next() {
				try {
					return toCluster(lCursor.next());
				} catch (Exception lEx) {
					throw new RuntimeException(lEx);
				}
			}

			@Override
			public void remove() {
				throw new UnsupportedOperationException("remove");
			}
		};
	}

	public void setStartupClusters(List<ICluster> aClustersList) {
		mStartupClusters = aClustersList;
	}

	public List<ICluster> getStartupClusters() {
		return mStartupClusters;
	}

	private ICluster toCluster(DBObject aDocument) {
		if (null == aDocument) {
			return null;
		}
		return new MongoDBCluster(aDocument, mClusters, mEndPoints);
	}

	@Override
	public List<Map<String, Object>> getClustersInfo() {
		List<Map<String, Object>> lResult = new ArrayList<Map<String, Object>>();
		Iterator<ICluster> lIt = getClusters();
		while (lIt.hasNext()) {
			ICluster lC = lIt.next();
			lResult.add(lC.getInfo());
		}

		return lResult;
	}

	@Override
	public List<Map<String, String>> getStickyRoutes() {
		List<Map<String, String>> lResult = new ArrayList<Map<String, String>>();
		Iterator<ICluster> lIt = getClusters();
		while (lIt.hasNext()) {
			ICluster lC = lIt.next();
			lC.getStickyRoutes(lResult);
		}

		return lResult;
	}

	@Override
	public ICluster getClusterByAlias(String aAlias) {
		return toCluster(mClusters.findOne(new BasicDBObject()
				.append(CLUSTER_ALIAS, aAlias)));
	}

	@Override
	public void setBalancerAlgorithm(Integer aAlgorithm) {
		mConfig.update(new BasicDBObject(), new BasicDBObject()
				.append(BALANCER_ALGORITHM, aAlgorithm));
	}

	@Override
	public Integer getBalancerAlgorithm() {
		return (Integer) mConfig.findOne().get(BALANCER_ALGORITHM);
	}

	@Override
	public ICluster getClusterByNamespace(String aNS) {
		DBCursor lIt = mClusters.find(new BasicDBObject(), new BasicDBObject().append(CLUSTER_NS, 1));
		while (lIt.hasNext()) {
			DBObject lC = lIt.next();
			String lNS = (String) lC.get(CLUSTER_NS);

			if (Tools.wildCardMatch(aNS, lNS.split(","))) {
				BasicDBObject lCriteria = new BasicDBObject().append("_id", lC.get("_id"));
				return toCluster(mClusters.findOne(lCriteria));
			}
		}

		return null;
	}

	@Override
	public void updateCpuUsage(String aConnectorId, double aCpuUsage) {
		mEndPoints.updateMulti(new BasicDBObject().append(CONNECTOR_ID, aConnectorId),
				new BasicDBObject().append("$set", new BasicDBObject().append(CPU, aCpuUsage)));
	}

	@Override
	public boolean isNamespaceSupported(String aNS) {
		DBCursor lIt = mClusters.find(new BasicDBObject(), new BasicDBObject().append(CLUSTER_NS, 1));
		while (lIt.hasNext()) {
			DBObject lC = lIt.next();
			String lNS = (String) lC.get(CLUSTER_NS);

			if (Tools.wildCardMatch(aNS, lNS.split(","))) {
				return true;
			}
		}

		return false;
	}

	@Override
	public IClusterEndPoint getOptimumServiceEndPoint(String aNS) {
		ICluster lCluster = getClusterByNamespace(aNS);

		return getOptimumServiceEndPoint(lCluster);
	}

	@Override
	public int removeConnectorEndPoints(String aConnectorId) {
		WriteResult lResult = mEndPoints.remove(new BasicDBObject().append(CONNECTOR_ID, aConnectorId));
		return lResult.getN();
	}

	@Override
	public void initialize() throws Exception {
		mClusters.createIndex(new BasicDBObject()
				.append(CLUSTER_ALIAS, 1),
				new BasicDBObject().append("unique", true));

		mEndPoints.createIndex(new BasicDBObject()
				.append(CLUSTER_ALIAS, 1)
				.append(CONNECTOR_ID, 1),
				new BasicDBObject().append("unique", true));

		mConfig.getDB().command(new BasicDBObject()
				.append("convertToCapped", mConfig.getName())
				.append("max", 1));

		// setting initial configuration values
		if (mConfig.count() == 0) {
			mConfig.save(new BasicDBObject().append(BALANCER_ALGORITHM, 3));
		}

		// setting initial clusters (if not already registered)
		for (ICluster lC : mStartupClusters) {
			if (!isNamespaceSupported(lC.getNamespace())) {
				mClusters.save(new BasicDBObject()
						.append(CLUSTER_NS, lC.getNamespace())
						.append(CLUSTER_PASSWORD, lC.getPassword())
						.append(GRANTED_ENDPOINTS, lC.getGrantedEndPoints())
						.append(CLUSTER_ALIAS, lC.getAlias()));
			}
		}
	}

	@Override
	public void shutdown() throws Exception {
	}
}
