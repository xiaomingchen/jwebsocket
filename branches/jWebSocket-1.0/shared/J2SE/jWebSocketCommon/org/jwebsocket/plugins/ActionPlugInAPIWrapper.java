//	---------------------------------------------------------------------------
//	jWebSocket ActionPlugInAPIWrapper (Community Edition, CE)
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
package org.jwebsocket.plugins;

import java.util.List;
import java.util.Map;
import org.jwebsocket.token.Token;
import org.jwebsocket.token.TokenFactory;

/**
 * The component allows Java developers to easily invoke methods on remote action plug-ins.
 *
 * @author Rolando Santamaria Maso
 */
public abstract class ActionPlugInAPIWrapper {

	private final Token mAPI;
	private final List<Map> mMethods;

	/**
	 * Create a new instance.
	 *
	 * @param aPlugInAPI The server response Token to a getAPI command.
	 */
	@SuppressWarnings("OverridableMethodCallInConstructor")
	public ActionPlugInAPIWrapper(Token aPlugInAPI) {
		mAPI = aPlugInAPI;
		mMethods = mAPI.getList("data");

		for (Map<String, Object> lMethod : mMethods) {
			filter((String) lMethod.get("name"), (List) lMethod.get("params"));
		}
	}

	/**
	 * Get the wrapped action plug-in name-space.
	 *
	 * @return
	 */
	public String getNS() {
		return mAPI.getNS();
	}

	/**
	 * Invoke a method on remote action plug-in.
	 *
	 * @param aMethodName The method name.
	 * @param aParams The parameters to be passed. The last parameter ALWAYS require to be the
	 * abstract client response listener.
	 * @throws Exception
	 */
	public void invoke(String aMethodName, Object... aParams) throws Exception {
		for (Map<String, Object> lMethod : mMethods) {
			if (aMethodName.equals((String) lMethod.get("name"))) {
				Token lRequest = TokenFactory.createToken(getNS(), aMethodName);

				List<Map> lMethodParams = (List) lMethod.get("params");
				for (int lIndex = 0; lIndex < lMethodParams.size(); lIndex++) {
					// getting the expected parameter type
					Class<?> lType = Class.forName((String) lMethodParams.get(lIndex).get("type"));
					// check that given parameter matches expected type
					lType.cast(aParams[lIndex]);
					// setting the property/value in the request token
					lRequest.getMap().put(lMethodParams.get(lIndex).get("name"), aParams[lIndex]);
				}

				sendTokenStrategy(lRequest, aParams[aParams.length - 1]);

				return;
			}
		}

		throw new Exception("Method not found!");
	}

	public abstract void sendTokenStrategy(Token aToken, Object aListener);

	/**
	 * Allow custom modification on action plug-ins API.
	 *
	 * @param aMethodName
	 * @param aParams
	 */
	public void filter(String aMethodName, List<Map> aParams) {
	}
}
