//  ---------------------------------------------------------------------------
//  jWebSocket - EventsPlugIn
//  Copyright (c) 2010 Innotrade GmbH, jWebSocket.org
//  ---------------------------------------------------------------------------
//  This program is free software; you can redistribute it and/or modify it
//  under the terms of the GNU Lesser General Public License as published by the
//  Free Software Foundation; either version 3 of the License, or (at your
//  option) any later version.
//  This program is distributed in the hope that it will be useful, but WITHOUT
//  ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
//  FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
//  more details.
//  You should have received a copy of the GNU Lesser General Public License along
//  with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
//  ---------------------------------------------------------------------------
package org.jwebsocket.plugins.events;

import java.util.Set;
import javolution.util.FastSet;
import org.jwebsocket.logging.Logging;
import org.apache.log4j.Logger;
import org.jwebsocket.api.PluginConfiguration;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.kit.PlugInResponse;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.token.Token;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.eventmodel.api.IServerSecureComponent;
import org.jwebsocket.kit.CloseReason;
import org.jwebsocket.eventmodel.core.EventModel;
import org.jwebsocket.eventmodel.event.em.ConnectorStarted;
import org.jwebsocket.eventmodel.event.em.ConnectorStopped;
import org.jwebsocket.eventmodel.event.em.EngineStarted;
import org.jwebsocket.eventmodel.event.em.EngineStopped;
import org.jwebsocket.eventmodel.event.C2SEvent;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.spring.JWebSocketBeanFactory;
import org.jwebsocket.spring.ServerXmlBeanFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.xml.XmlBeanFactory;
import org.springframework.core.io.FileSystemResource;

/**
 *
 * @author kyberneees
 */
public class EventsPlugIn extends TokenPlugIn implements IServerSecureComponent {

	private String mConfigFile;
	private EventModel mEm;
	private static Logger mLog = Logging.getLogger(EventsPlugIn.class);
	//IWebSocketSecureObject fields
	private boolean mSecurityEnabled = false;
	private Set<String> mRoles = new FastSet<String>();
	private Set<String> mUsers = new FastSet<String>();
	private Set<String> mIpAddresses = new FastSet<String>();

	/**
	 * @return The Spring IOC bean factory singleton instance
	 */
	public BeanFactory getBeanFactory() {
		return JWebSocketBeanFactory.getInstance(getNamespace());
	}

	/**
	 *
	 * @param aConfiguration 
	 * @throws Exception
	 */
	public EventsPlugIn(PluginConfiguration aConfiguration) throws Exception {
		super(aConfiguration);
		setNamespace(aConfiguration.getNamespace());

		if (mLog.isDebugEnabled()) {
			mLog.debug(">> Creating EventsPlugIn instance for application '" + getNamespace() + "'...");
		}

		//Calling the init method
		initialize();
	}

	/**
	 * Initialize the EventsPlugIn
	 */
	public void initialize() {
		try {
			//Load application jars
			if (getSettings().containsKey("jars")) {
				if (mLog.isDebugEnabled()) {
					mLog.debug(">> Loading jars for '" + getNamespace() + "' application...");
				}

				String[] lJars = getString("jars").split(",");
				for (int lIndex = 0; lIndex < lJars.length; lIndex++) {
					JWebSocketFactory.getClassLoader().add(JWebSocketConfig.getLibsFolder(lJars[lIndex]));
					if (mLog.isDebugEnabled()) {
						mLog.debug(">> Loading jar '" + lJars[lIndex] + "'...");
					}
				}
			}

			//Loading plug-in beans
			String lPath = JWebSocketConfig.getConfigFolder("EventsPlugIn/" + getNamespace() + "-application/bootstrap.xml");
			JWebSocketBeanFactory.load(getNamespace(), lPath, Class.forName("org.jwebsocket.eventmodel.event.filter.ResponseFromCache").getClassLoader());
//            ClassLoader lClassLoader = Class.forName("org.jwebsocket.eventmodel.event.filter.ResponseFromCache").getClassLoader();
//            FileSystemResource lFSRes = new FileSystemResource(lPath);
//            XmlBeanFactory lBF = new ServerXmlBeanFactory(lFSRes, lClassLoader);

			//Getting the EventModel service instance
			mEm = (EventModel) getBeanFactory().getBean("EventModel");
//            mEm = (EventModel) lBF.getBean("EventModel");

			//Initializing the event model
			mEm.setParent(this);
			mEm.initialize();
		} catch (Exception ex) {
			mLog.error(ex.toString(), ex);
		}
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void engineStarted(WebSocketEngine aEngine) {
		//Engine started event notification
		try {
			if (mLog.isDebugEnabled()) {
				mLog.debug(">> Engine.started(" + aEngine.toString() + ") event notification...");
			}
			EngineStarted lEvent = (EngineStarted) getEm().getEventFactory().stringToEvent("engine.started");
			lEvent.setEngine(aEngine);
			lEvent.initialize();
			mEm.notify(lEvent, null, true);
		} catch (Exception ex) {
			mLog.error(ex.toString(), ex);
		}
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void engineStopped(WebSocketEngine aEngine) {
		//Engine started event notification
		try {
			if (mLog.isDebugEnabled()) {
				mLog.debug(">> Engine.stopped(" + aEngine.toString() + ") event notification...");
			}
			EngineStopped lEvent = (EngineStopped) getEm().getEventFactory().stringToEvent("engine.stopped");
			lEvent.setEngine(aEngine);
			lEvent.initialize();
			mEm.notify(lEvent, null, true);
		} catch (Exception ex) {
			mLog.error(ex.toString(), ex);
		}
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void connectorStarted(WebSocketConnector aConnector) {
		//Connector started event notification
		try {
			if (mLog.isDebugEnabled()) {
				mLog.debug(">> Connector.started(" + aConnector.toString() + ") event notification...");
			}
			ConnectorStarted lEvent = (ConnectorStarted) getEm().getEventFactory().stringToEvent("connector.started");
			lEvent.setConnector(aConnector);
			lEvent.initialize();
			mEm.notify(lEvent, null, true);
		} catch (Exception ex) {
			mLog.error(ex.toString(), ex);
		}
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void processToken(PlugInResponse aResponse, WebSocketConnector aConnector, Token aToken) {
		if (getNamespace().equals(aToken.getNS())) {
			C2SEvent lEvent = null;
			try {
				if (mLog.isDebugEnabled()) {
					mLog.debug(">> Processing token as event: '" + aToken.getType() + "'...");
				}
				lEvent = getEm().getEventFactory().tokenToEvent(aToken);
				lEvent.setConnector(aConnector);
				
				//Initializing the event...
				lEvent.initialize();
			} catch (Exception ex) {
				mLog.error(ex.toString(), ex);
			}

			processEvent(aConnector, lEvent);
			aResponse.abortChain();
		}
	}

	/**
	 * Process incoming events from the client
	 * 
	 * @param aConnector The client connector
	 * @param aEvent The event from the client
	 */
	public void processEvent(WebSocketConnector aConnector, C2SEvent aEvent) {
		mEm.processEvent(aEvent, null);
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void connectorStopped(WebSocketConnector aConnector, CloseReason aCloseReason) {
		//Connector stopped event notification
		try {
			if (mLog.isDebugEnabled()) {
				mLog.debug(">> Connector.stopped(" + aConnector.toString() + ") event notification...");
			}
			ConnectorStopped lEvent = (ConnectorStopped) getEm().getEventFactory().stringToEvent("connector.stopped");
			lEvent.setConnector(aConnector);
			lEvent.setCloseReason(aCloseReason);
			lEvent.initialize();
			mEm.notify(lEvent, null, true);
		} catch (Exception ex) {
			mLog.error(ex.toString(), ex);
		}
	}

	/**
	 * @return The EventModel instance
	 */
	public EventModel getEm() {
		return mEm;
	}

	/**
	 * @param em The EventModel instance to set
	 */
	public void setEm(EventModel aEm) {
		this.mEm = aEm;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public boolean isSecurityEnabled() {
		return mSecurityEnabled;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void setSecurityEnabled(boolean aSecurityEnabled) {
		this.mSecurityEnabled = aSecurityEnabled;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public Set<String> getRoles() {
		return mRoles;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void setRoles(Set<String> aRoles) {
		this.mRoles.addAll(aRoles);
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public Set<String> getUsers() {
		return mUsers;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void setUsers(Set<String> aUsers) {
		this.mUsers.addAll(aUsers);
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public Set<String> getIpAddresses() {
		return mIpAddresses;
	}

	/**
	 *
	 * {@inheritDoc }
	 */
	@Override
	public void setIpAddresses(Set<String> aIpAddresses) {
		this.mIpAddresses.addAll(aIpAddresses);
	}

	/**
	 * @return The path to the XML root file
	 */
	public String getConfigFile() {
		return mConfigFile;
	}
}
