/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jwebsocket.tomcat.demo;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.console.JWebSocketTokenListenerSample;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.server.TokenServer;

/**
 * Web application lifecycle listener.
 *
 * @author aschulze
 */
@WebListener()
public class ContextListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent aSCE) {
		// the following line must not be removed due to GNU LGPL 3.0 license!
		JWebSocketFactory.printCopyrightToConsole();
		JWebSocketConfig.initForWebApp(aSCE.getServletContext());

		// start the jWebSocket server sub system with default config and bootstrap
		JWebSocketFactory.start();

		// get the token server
		// and and a listener to it (for demo purposes)
		TokenServer lTS0 = JWebSocketFactory.getTokenServer();
		if (lTS0 != null) {
			// and add the sample listener to the server's listener chain
			lTS0.addListener(new JWebSocketTokenListenerSample());
		}
	}

	@Override
	public void contextDestroyed(ServletContextEvent aSCE) {
		// stop the jWebSocket server sub system
		JWebSocketFactory.stop();
	}
}
