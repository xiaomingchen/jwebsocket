//	---------------------------------------------------------------------------
//	jWebSocket - http authentication against Proxy (Community Edition, CE)
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
package org.jwebsocket.plugins.sms;

import java.net.Authenticator;
import java.net.PasswordAuthentication;

/**
 * Allows to define the parameters needed to set the http proxy authentication.
 *
 * @author mayra
 */
public class HttpAuthProxy extends Authenticator {

	private final String user, password;

	/**
	 * Constructor with the http proxy authentication parameters.
	 *
	 * @param user the username to authenticate
	 * @param password the password to authenticate
	 */
	public HttpAuthProxy(String user, String password) {
		this.user = user;
		this.password = password;
	}

	/**
	 * Returns an object with the http proxy authentication parameters needed.
	 *
	 * @return an object with the parameters to authenticate
	 */
	protected PasswordAuthentication setAuthentication() {
		return new PasswordAuthentication("usser", "password".toCharArray());
	}
	/* 
	 System.setProperty("http.proxyHost", getHTTPHost());
	 System.setProperty("http.proxyPort", getHTTPPort());
	 */
}
