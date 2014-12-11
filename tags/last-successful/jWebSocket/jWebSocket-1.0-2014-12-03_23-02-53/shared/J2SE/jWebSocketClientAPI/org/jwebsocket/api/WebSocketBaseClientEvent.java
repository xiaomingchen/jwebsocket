//	---------------------------------------------------------------------------
//	jWebSocket - WebSocketBaseClientEvent (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2014 Innotrade GmbH (jWebSocket.org)
//	Alexander Schulze, Germany (NRW)
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
package org.jwebsocket.api;

/**
 *
 * @author Alexander Schulze
 */
public class WebSocketBaseClientEvent implements WebSocketClientEvent {

	private String mName = null;
	private String mData = null;
	private WebSocketClient mClient = null;
	/*
	 * public WebSocketBaseClientEvent() { }
	 */

	/**
	 *
	 * @param aClient
	 * @param aName
	 * @param aData
	 */
	public WebSocketBaseClientEvent(WebSocketClient aClient, String aName, String aData) {
		mClient = aClient;
		mName = aName;
		mData = aData;
	}

	@Override
	public String getName() {
		return mName;
	}

	@Override
	public String getData() {
		return mData;
	}

	@Override
	public WebSocketClient getClient() {
		return mClient;
	}
}