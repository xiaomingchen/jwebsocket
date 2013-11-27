/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jwebsocket.plugins.quota.storage;

import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import java.net.UnknownHostException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javolution.util.FastList;
import javolution.util.FastMap;
import org.jwebsocket.plugins.quota.api.IQuotaSingleInstance;
import org.jwebsocket.plugins.quota.api.IQuotaStorage;
import org.jwebsocket.plugins.quota.definitions.singleIntance.QuotaChildSI;
import org.jwebsocket.plugins.quota.utils.QuotaHelper;
import org.jwebsocket.plugins.quota.utils.exception.ExceptionQuotaNotFound;

/**
 *
 * @author osvaldo
 */
public class StorageQuotaMongo implements IQuotaStorage {

    Mongo mConnection;
    DB mDBconn;
    String mDatabaseName;
    String mUser;
    String mPassword;
    String mHost;
    Integer mPort;
    DBCollection mCollection;
    DBCollection mCollectionInstance;

    public void setUser(String aUser) {
        this.mUser = aUser;
    }

    public DB getDBconn() {
        return mDBconn;
    }

    public void setPassword(String aPassword) {
        this.mPassword = aPassword;
    }

    public void setHost(String aHost) {
        this.mHost = aHost;
    }

    public void setPort(Integer aPort) {
        this.mPort = aPort;
    }

    public void setDatabaseName(String aDB) {
        this.mDatabaseName = aDB;
    }

    public StorageQuotaMongo() throws UnknownHostException {

        /*TODO Aqui le paso los valores en bruto por que tengo que pasarlos
         * por via constructor de spring y no por setter para que esten dispo
         * nibles en el constructor
         * 
         */
        mConnection = new MongoClient(mHost);
        mDBconn = this.mConnection.getDB("quotaPlugin");
        mCollection = mDBconn.getCollection("quota");
        mCollectionInstance = mDBconn.getCollection("quotaInstance");

    }

    @Override
    public boolean save(IQuotaSingleInstance aQuota) {

        try {
            BasicDBObject lDoc = new BasicDBObject();
            FastMap<String, Object> ltemMap = aQuota.writeToMap();

            for (Map.Entry<String, Object> entry : ltemMap.entrySet()) {
                String string = entry.getKey();
                Object object = entry.getValue();

                lDoc.put(string, object);
            }
            mCollection.insert(lDoc);
        } catch (Exception e) {
            return false;
        }
        return true;

    }

//remove
    @Override
    public boolean save(QuotaChildSI aChildSI) {

        try {
            BasicDBObject lDoc = new BasicDBObject();

            lDoc.put("uuidQuota", aChildSI.getUuid());
            lDoc.put("instance", aChildSI.getInstance());
            lDoc.put("instanceType", aChildSI.getInstanceType());
            lDoc.put("value", aChildSI.getValue());

            mCollectionInstance.insert(lDoc);
        } catch (Exception e) {
            return false;
        }
        return true;
    }

    @Override
    public void remove(String aUuid, String aInstance) {

        BasicDBObject lWhere = new BasicDBObject();
        lWhere.put("uuid", aUuid);
        lWhere.put("instance", aInstance);
        mCollection.remove(lWhere);
        lWhere = new BasicDBObject();
        lWhere.put("uuidQuota", aUuid);
        mCollectionInstance.remove(lWhere);
        
        
    }

    @Override
    public void remove(QuotaChildSI aQuotaChild) {
        BasicDBObject lWhere = new BasicDBObject();
        lWhere.put("uuidQuota", aQuotaChild.getUuid());
        lWhere.put("instance", aQuotaChild.getInstance());
        mCollectionInstance.remove(lWhere);
     
    }

    @Override
    public long update(String aUuid, Long aValue) {

        BasicDBObject lWhere = new BasicDBObject();
        BasicDBObject lSetValue = new BasicDBObject();
        lWhere.put("uuid", aUuid);
        lSetValue.append("$set", new BasicDBObject().append("value", aValue));
        DBObject lObj = mCollection.findOne(lWhere);
        mCollection.update(lWhere, lSetValue);
        return aValue;

    }

    @Override
    public long update(QuotaChildSI aChildSI) {

        BasicDBObject lWhere = new BasicDBObject();
        BasicDBObject lSetValue = new BasicDBObject();
        lWhere.put("uuidQuota", aChildSI.getUuid());
        lWhere.put("instance", aChildSI.getInstance());
        lSetValue.append("$set", new BasicDBObject().append("value", aChildSI.getValue()));
        mCollectionInstance.update(lWhere, lSetValue);
        return aChildSI.getValue();

    }

    @Override
    public String getActions(String aUuid) {

        String lAction = "*";
        if (quotaExist(aUuid)) {
            BasicDBObject lQuery = new BasicDBObject();
            lQuery.put("uuid", aUuid);

            DBObject lObj = mCollection.findOne(lQuery);
            lAction = lObj.get("actions").toString();
        }
        return lAction;
    }

    @Override
    public List<String> getAllQuotaUuid(String aQuotaType) {

        FastList<String> lResult = new FastList<String>();
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaType", aQuotaType);
        DBCursor lCur = mCollection.find(lQuery);
        while (lCur.hasNext()) {
            DBObject lObj = lCur.next();
            String lUuid = lObj.get("uuid").toString();
            lResult.add(lUuid);
        }
        return lResult;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotas(String aQuotaType) {

        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaType", aQuotaType);
        DBCursor lCur = mCollection.find(lQuery);

        lResult = getListInstance(lCur);
        return lResult;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotasByIdentifier(String aIdentifier) {

        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaIdentifier", aIdentifier);
        lQuery.put("quotaIdentifier", aIdentifier);
        DBCursor lCur = mCollection.find(lQuery);
        lResult = getListInstance(lCur);

        return lResult;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotasByIdentifierNSInstanceType(String aIdentifier,
            String aNameSpace, String aInstanceType) {

        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaIdentifier", aIdentifier);
        lQuery.put("instanceType", aInstanceType);
        lQuery.put("ns", aNameSpace);

        DBCursor lCur = mCollection.find(lQuery);

        lResult = getListInstance(lCur);

        return lResult;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotas(String aQuotaType, String aNs,
            String aInstance) {
        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaType", aQuotaType);
        lQuery.put("instance", aInstance);
        lQuery.put("ns", aNs);
        DBCursor lCur = mCollection.find(lQuery);

        lResult = getListInstance(lCur);
        return lResult;
    }

    @Override
    public String getUuid(String aQuotaIdentifier, String aNameSpace, String aInstance,
            String aInstanceType) throws ExceptionQuotaNotFound {

        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaIdentifier", aQuotaIdentifier);
        lQuery.put("ns", aNameSpace);
        lQuery.put("instance", aInstance);
        lQuery.put("instanceType", aInstanceType);

        DBObject lResponse = mCollection.findOne(lQuery);
        String lUuid;
        lUuid = lResponse.get("uuid").toString();

        if (null != lUuid) {
            lUuid = lResponse.get("uuid").toString();
        } else {
            throw new ExceptionQuotaNotFound("not found");
        }
        return lUuid;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotasByInstance(String aQuotaType,
            String aInstance) {
        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaType", aQuotaType);
        lQuery.put("instance", aInstance);
        DBCursor lCur = mCollection.find(lQuery);
        lResult = getListInstance(lCur);

        return lResult;
    }

    @Override
    public List<IQuotaSingleInstance> getQuotasByNs(String aQuotaType,
            String aNs) {
        FastList<IQuotaSingleInstance> lResult;
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("quotaType", aQuotaType);
        lQuery.put("ns", aNs);
        DBCursor lCur = mCollection.find(lQuery);
        lResult = getListInstance(lCur);

        return lResult;
    }

    @Override
    public boolean quotaExist(String aUuid) {
        BasicDBObject lQuery = new BasicDBObject();
        lQuery.put("uuid", aUuid);

        DBCursor lCur = mCollection.find(lQuery);
        if (lCur.hasNext()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean quotaExist(String aNameSpace, String aQuotaIdentifier, String aInstance) {
        BasicDBObject lQuery = new BasicDBObject();

        lQuery.put("ns", aNameSpace);
        lQuery.put("instance", aInstance);
        lQuery.put("quotaIdentifier", aQuotaIdentifier);

        DBCursor lCur = mCollection.find(lQuery);
        if (lCur.hasNext()) {
            return true;
        }
        return false;
    }

    @Override
    public IQuotaSingleInstance getQuotaByUuid(String aUuid) {

        IQuotaSingleInstance lSingle = null;
        if (quotaExist(aUuid)) {
            BasicDBObject lQuery = new BasicDBObject();
            lQuery.put("uuid", aUuid);

            DBObject lObj = mCollection.findOne(lQuery);

            lSingle = getSingleInstance(lObj);
        }
        return lSingle;

    }

    private FastList<IQuotaSingleInstance> getListInstance(DBCursor aQuotas) {

        FastList<IQuotaSingleInstance> lResult = new FastList<IQuotaSingleInstance>();

        while (aQuotas.hasNext()) {
            DBObject lObjInstance = aQuotas.next();

            IQuotaSingleInstance lQuota = getSingleInstance(lObjInstance);
            lResult.add(lQuota);
        }
        return lResult;
    }

    private IQuotaSingleInstance getSingleInstance(DBObject aObjQuota) {

        IQuotaSingleInstance lQuota;
        if (!aObjQuota.isPartialObject()) {
            lQuota = QuotaHelper.factorySingleInstance(
                    Long.parseLong(aObjQuota.get("value").toString()),
                    aObjQuota.get("instance").toString(),
                    aObjQuota.get("uuid").toString(),
                    aObjQuota.get("ns").toString(),
                    aObjQuota.get("quotaType").toString(),
                    aObjQuota.get("quotaIdentifier").toString(),
                    aObjQuota.get("instanceType").toString(),
                    aObjQuota.get("actions").toString());
        } else {
            return null;
        }

        //Getting child quota.
        BasicDBObject lObject = new BasicDBObject();
        lObject.put("uuidQuota", aObjQuota.get("uuid"));
        DBCursor lDBQuota = mCollectionInstance.find(lObject);

        while (lDBQuota.hasNext()) {
            DBObject lObjInstance = lDBQuota.next();
            //adding quota Child of this quota.
            QuotaChildSI lChild = new QuotaChildSI(lObjInstance.get("instance").toString(),
                    aObjQuota.get("uuid").toString(), lObjInstance.get("instanceType").toString());

            lChild.setValue(Long.parseLong(lObjInstance.get("value").toString()));
            lQuota.addChildQuota(lChild);
        }
        return lQuota;
    }

    @Override
    public Map<String, Object> getRawQuota(String aUuid, String aInstance) {

        BasicDBObject lObject = new BasicDBObject();
        BasicDBObject lObjectInstance = new BasicDBObject();
        lObject.put("uuid", aUuid);
        lObjectInstance.put("uuidQuota", aUuid);
        lObjectInstance.put("instance", aInstance);
        DBObject lQuery = mCollection.findOne(lObject);

        DBObject lQueryInstance = mCollectionInstance.findOne(lObjectInstance);
        Map<String, Object> lMap = lQuery.toMap();
        lMap.put("instance", lQueryInstance.get("instance"));
        lMap.put("instanceType", lQueryInstance.get("instanceType"));
        return lMap;
    }

    // to see for change the method's name 
    @Override
    public void updateIntervalResetDate(String aUuid, String aResetDate) {
        BasicDBObject lWhere = new BasicDBObject();
        BasicDBObject lSetValue = new BasicDBObject();
        lWhere.put("uuid", aUuid);
        lSetValue.append("$set", new BasicDBObject().append("resetDate", aResetDate));
        mCollection.update(lWhere, lSetValue);
    }
}
