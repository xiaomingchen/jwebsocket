//	---------------------------------------------------------------------------
//	jWebSocket - Demo Appender (Community Edition, CE)
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
package org.jwebsocket.plugins.logging;

import org.apache.log4j.spi.LoggingEvent;
import org.jwebsocket.logging.BaseAppender;

/**
 *
 * @author Alexander Schulze
 */
public class DemoAppender extends BaseAppender {

	@Override
	public void append(LoggingEvent aLE) {
		System.out.println("[Demo Appender]: "
				+ aLE.getLevel().toString() + ": "
				+ aLE.getMessage());
	}

	@Override
	public boolean filterEvent(LoggingEvent aLE) {
		throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
	}

}
