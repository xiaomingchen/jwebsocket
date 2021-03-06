//	---------------------------------------------------------------------------
//	jWebSocket - WebSocketExceptionType (Community Edition, CE)
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
package org.jwebsocket.kit;

/**
 *
 * @author Alexander Schulze
 */
public enum WebSocketExceptionType {

	/**
	 *
	 */
	UNDEFINED(-1),
	/**
	 *
	 */
	UNKNOWN_HOST(1),
	/**
	 *
	 */
	UNABLE_TO_CONNECT(2),
	/**
	 *
	 */
	UNABLE_TO_CONNECT_SSL(3),
	/**
	 *
	 */
	PROTOCOL_NOT_SUPPORTED(4);
	private int mExceptionType;

	WebSocketExceptionType(int aExceptionType) {
		mExceptionType = aExceptionType;
	}

	/**
	 * @return the exception type's int value
	 */
	public int getExceptionType() {
		return mExceptionType;
	}
}
