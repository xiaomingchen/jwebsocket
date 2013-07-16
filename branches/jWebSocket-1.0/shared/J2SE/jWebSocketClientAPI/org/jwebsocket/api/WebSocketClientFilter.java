//  ---------------------------------------------------------------------------
//  jWebSocket - WebSocketClientFilter (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2013 Innotrade GmbH (jWebSocket.org)
//  Alexander Schulze, Germany (NRW)
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
 * The class represents the jWebSocket client filters
 *
 * @author kyberneees
 */
public interface WebSocketClientFilter {

	/**
	 * Filter inbound packets
	 *
	 * @param aPacket
	 * @throws Exception
	 */
	void filterPacketIn(WebSocketPacket aPacket) throws Exception;

	/**
	 * Filter outbound packets
	 *
	 * @param aPacket
	 * @throws Exception
	 */
	void filterPacketOut(WebSocketPacket aPacket) throws Exception;
}