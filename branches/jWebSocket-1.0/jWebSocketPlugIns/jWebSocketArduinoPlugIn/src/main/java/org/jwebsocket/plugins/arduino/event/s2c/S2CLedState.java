// ---------------------------------------------------------------------------
// jWebSocket - S2CLedState (Community Edition, CE)
//	---------------------------------------------------------------------------
//	Copyright 2010-2014 Innotrade GmbH (jWebSocket.org), Germany (NRW), Herzogenrath
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
package org.jwebsocket.plugins.arduino.event.s2c;

import org.jwebsocket.eventmodel.event.S2CEvent;
import org.jwebsocket.token.Token;

/**
 *
 * @author Dariel Noa (dnoa@hab.uci.cu, UCI, Artemisa)
 */
public class S2CLedState extends S2CEvent {

	private final Boolean mBlue;
	private final Boolean mRed;
	private final Boolean mGreen;
	private final Boolean mYellow;

	/**
	 *
	 * @param aBlue
	 * @param aRed
	 * @param aGreen
	 * @param aYellow
	 */
	public S2CLedState(Boolean aBlue, Boolean aRed, Boolean aGreen, Boolean aYellow) {
		super();
		this.setId("ledState");
		this.mBlue = aBlue;
		this.mRed = aRed;
		this.mGreen = aGreen;
		this.mYellow = aYellow;
	}

	/**
	 *
	 * @return
	 */
	public Boolean getBlue() {
		return mBlue;
	}

	/**
	 *
	 * @return
	 */
	public Boolean getRed() {
		return mRed;
	}

	/**
	 *
	 * @return
	 */
	public Boolean getGreen() {
		return mGreen;
	}

	/**
	 *
	 * @return
	 */
	public Boolean getYellow() {
		return mYellow;
	}

	@Override
	public void writeToToken(Token token) {
		token.setBoolean("blue", getBlue());
		token.setBoolean("red", getRed());
		token.setBoolean("green", getGreen());
		token.setBoolean("yellow", getYellow());
	}
}
