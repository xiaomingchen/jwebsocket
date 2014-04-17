//	---------------------------------------------------------------------------
//	jWebSocket - JMS Gateway Demo Client (Community Edition, CE)
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
package tld.yourname.jms.client;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;
import java.util.UUID;
import org.apache.commons.io.FileUtils;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;
import org.jwebsocket.jms.endpoint.JMSEndPoint;
import org.jwebsocket.jms.endpoint.JWSEndPointMessageListener;
import org.jwebsocket.jms.endpoint.JWSEndPointSender;
import org.jwebsocket.jms.endpoint.JWSMessageListener;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.token.Token;
import org.jwebsocket.token.TokenFactory;
import org.jwebsocket.util.Tools;
import javolution.util.FastMap;
import org.apache.commons.configuration.Configuration;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.jwebsocket.jms.endpoint.JMSLogging;
import org.jwebsocket.jms.endpoint.JWSAutoSelectAuthenticator;
import org.jwebsocket.jms.endpoint.JWSEndPoint;
import org.jwebsocket.jms.endpoint.JWSLDAPAuthenticator;
import org.jwebsocket.jms.endpoint.JWSOAuthAuthenticator;
import org.jwebsocket.jms.endpoint.JWSResponseTokenListener;

/**
 * JMS Gateway Demo Client
 *
 * @author Alexander Schulze
 */
public class JMSClient {

	static final Logger mLog = Logger.getLogger(JMSClient.class);

	private static JWSEndPoint lJWSEndPoint;

	private static String lTargetEndPointId = null;

	private static final JWSAutoSelectAuthenticator lAuthenticator = new JWSAutoSelectAuthenticator();
	private static final JWSOAuthAuthenticator lOAuthAuthenticator = new JWSOAuthAuthenticator();
	private static final JWSLDAPAuthenticator lLDAPAuthenticator = new JWSLDAPAuthenticator();

	private static void runProgressTest() {
		Map<String, Object> lArgs = new FastMap<String, Object>();

		// test progress events on login
		lJWSEndPoint.getSender().sendPayload(
				lTargetEndPointId, // target
				"org.jwebsocket.jms.demo", // ns
				"testProgress", // type
				lArgs,
				null, // no payload
				new JWSResponseTokenListener(JWSResponseTokenListener.RESP_TIME_FIELD) {

					@Override
					public void onTimeout() {
						mLog.info("Test progress timed out!");
					}

					@Override
					public void onProgress(Token aEvent) {
						mLog.info("Progress: " + String.format("%.2f", aEvent.getDouble("percent")) + "%");
					}

					@Override
					public void onFailure(Token aReponse) {
						mLog.error("Test progress failed!");
					}

					@Override
					public void onSuccess(Token aReponse) {
						if (mLog.isInfoEnabled()) {
							mLog.info("Test progress succeeded (response received in "
									+ aReponse.getLong(JWSResponseTokenListener.RESP_TIME_FIELD) + "ms).");
						}
					}

				}, 12000);
	}

	private static void runOAuthTest() {
		Map<String, Object> lArgs = new FastMap<String, Object>();

		lArgs.put("accessToken", lOAuthAuthenticator.getAccessToken());

		lJWSEndPoint.getSender().sendPayload(
				lTargetEndPointId, // target
				"org.jwebsocket.jms.demo", // ns
				"testOAuth", // type
				lArgs,
				null, // no payload
				new JWSResponseTokenListener(JWSResponseTokenListener.RESP_TIME_FIELD) {

					@Override
					public void onTimeout() {
						mLog.info("Test OAuth timed out!");
						lJWSEndPoint.shutdown();
					}

					@Override
					public void onProgress(Token aEvent) {
						mLog.info("Progress: " + String.format("%.2f", aEvent.getDouble("percent")));
					}

					@Override
					public void onFailure(Token aReponse) {
						mLog.error("Test OAuth failed!");
						lJWSEndPoint.shutdown();
					}

					@Override
					public void onSuccess(Token aResponse) {
						if (mLog.isInfoEnabled()) {
							mLog.info("Test OAuth succeeded, username is '"
									+ aResponse.getString("username")
									+ "' (response received in "
									+ aResponse.getLong(JWSResponseTokenListener.RESP_TIME_FIELD)
									+ "ms).");
						}
						lJWSEndPoint.shutdown();
					}

				}, 5000);
	}

	/**
	 *
	 * @param aArgs
	 */
	@SuppressWarnings("SleepWhileInLoop")
	public static void main(String[] aArgs) {

		// set up log4j logging
		// later this should be read from a shared log4j properties or xml file!
		Properties lProps = new Properties();
		lProps.setProperty("log4j.rootLogger", "INFO, console");
		lProps.setProperty("log4j.logger.org.apache.activemq.spring", "WARN");
		lProps.setProperty("log4j.logger.org.apache.activemq.web.handler", "WARN");
		lProps.setProperty("log4j.logger.org.springframework", "WARN");
		lProps.setProperty("log4j.logger.org.apache.xbean", "WARN");
		lProps.setProperty("log4j.logger.org.apache.camel", "INFO");
		lProps.setProperty("log4j.logger.org.eclipse.jetty", "WARN");
		lProps.setProperty("log4j.appender.console", "org.apache.log4j.ConsoleAppender");
		lProps.setProperty("log4j.appender.console.layout", "org.apache.log4j.PatternLayout");
		lProps.setProperty("log4j.appender.console.layout.ConversionPattern",
				// "%p: %m%n"
				"%d{yyyy-MM-dd HH:mm:ss,SSS} %-5p - %C{1}: %m%n"
		);
		// set here the jWebSocket log level:
		lProps.setProperty("log4j.logger.org.jwebsocket", "DEBUG");
		lProps.setProperty("log4j.appender.console.threshold", "DEBUG");
		PropertyConfigurator.configure(lProps);

		JMSLogging.setFullTextLogging(false);

		mLog.info("jWebSocket JMS Gateway Demo Client");

		Configuration lConfig = null;
		boolean lConfigLoaded;
		try {
			// loading properties files
			lConfig = new PropertiesConfiguration("private.properties");
		} catch (ConfigurationException ex) {
		}

		if (null == lConfig) {
			mLog.info("Configuration file could not be opened.");
			return;
		}

		// the URL of the message broker
		String lBrokerURL = lConfig.getString("BrokerURL", "tcp://127.0.0.1:61616");
		// "failover:(tcp://0.0.0.0:61616,tcp://127.0.0.1:61616)?initialReconnectDelay=100&randomize=false";
		// the name of the JMS Gateway topic
		String lGatewayTopic = lConfig.getString("GatewayTopic", "org.jwebsocket.jms.gateway");
		// endpoint id of JMS Gateway
		String lGatewayId = lConfig.getString("GatewayId", "org.jwebsocket.jms.gateway");
		String lEndPointId = lConfig.getString("EndPointId", UUID.randomUUID().toString());

		lTargetEndPointId = lConfig.getString("TargetEndPointId");

		// get authentication information against jWebSocket
		final String lJWSUsername = lConfig.getString("JWSUsername");
		final String lJWSPassword = lConfig.getString("JWSPassword");

		// set up OAuth Authenticator
		boolean lUseOAuth = lConfig.getBoolean("UseOAuth", false);

		String lOAuthHost = lConfig.getString("OAuthHost");
		String lOAuthAppId = lConfig.getString("OAuthAppId");
		String lOAuthAppSecret = lConfig.getString("OAuthAppSecret");
		String lOAuthUsername = lConfig.getString("OAuthUsername");
		String lOAuthPassword = lConfig.getString("OAuthPassword");
		long lOAuthTimeout = lConfig.getLong("OAuthTimeout", 5000);

		lUseOAuth = lUseOAuth
				&& null != lOAuthHost
				&& null != lOAuthAppId
				&& null != lOAuthAppSecret
				&& null != lOAuthUsername
				&& null != lOAuthPassword;

		if (lUseOAuth) {
			lOAuthAuthenticator.init(
					lOAuthHost,
					lOAuthAppId,
					lOAuthAppSecret,
					lOAuthUsername,
					lOAuthPassword,
					lOAuthTimeout
			);
			lAuthenticator.addAuthenticator(lAuthenticator);
		}

		// set up LDAP Authenticator
		boolean lUseLDAP = lConfig.getBoolean("UseLDAP", false);

		String lLDAPURL = lConfig.getString("LDAPURL");
		String lBaseDNGroups = lConfig.getString("BaseDNGroups");
		String lBaseDNUsers = lConfig.getString("BaseDNUsers");
		String lBindUsername = lConfig.getString("BindUsername");
		String lBindPassword = lConfig.getString("BindPassword");

		if (lUseLDAP) {
			lLDAPAuthenticator.init(
					lLDAPURL,
					lBaseDNGroups,
					lBaseDNUsers,
					lBindUsername,
					lBindPassword
			);
			lAuthenticator.addAuthenticator(lLDAPAuthenticator);
		}

		// TODO: Validate config data here!
		lConfigLoaded = true;

		if (!lConfigLoaded) {
			mLog.error("Config not loaded.");
			System.exit(1);
		}

		mLog.info("Using: "
				+ lBrokerURL + ", "
				+ "topic: " + lGatewayTopic + ", "
				+ "gateway-id: " + lGatewayId + ", "
				+ "endpoint-id: " + lEndPointId);

		// todo: Comment that for production purposes
		JMSLogging.setFullTextLogging(true);

		// instantiate a new jWebSocket JMS Gateway Client
		lJWSEndPoint = new JWSEndPoint(
				lBrokerURL,
				lGatewayTopic, // gateway topic
				lGatewayId, // gateway endpoint id
				lEndPointId, // unique node id
				5, // thread pool size, messages being processed concurrently
				JMSEndPoint.TEMPORARY // temporary (for clients)
		);

		final JWSEndPointMessageListener lListener = lJWSEndPoint.getListener();
		final JWSEndPointSender lSender = lJWSEndPoint.getSender();

		// on welcome message from jWebSocket, authenticate against jWebSocket
		lListener.addRequestListener("org.jwebsocket.jms.gateway", "welcome", new JWSMessageListener(lSender) {
			@Override
			public void processToken(String aSourceId, Token aToken) {
				mLog.info("Received 'welcome' from '" + aSourceId + ".");
				if ("org.jwebsocket.jms.gateway".equals(aSourceId)) {
					// create a login token...
					mLog.info("Authenticating against jWebSocket...");
					Token lToken = TokenFactory.createToken("org.jwebsocket.plugins.system", "login");
					if (null != lJWSUsername && null != lJWSPassword) {
						lToken.setString("username", lJWSUsername);
						lToken.setString("password", lJWSPassword);
					}
					// and send it to the gateway (which is was the source of the message)
					sendToken(aSourceId, lToken,
							new JWSResponseTokenListener(JWSResponseTokenListener.RESP_TIME_FIELD) {

								@Override
								public void onTimeout() {
									mLog.info("Login timed out!");
								}

								@Override
								public void onFailure(Token aReponse) {
									mLog.error("Login failure!");
								}

								@Override
								public void onSuccess(Token aReponse) {
									if (mLog.isInfoEnabled()) {
										mLog.info("Login success (response received in "
												+ aReponse.getLong(JWSResponseTokenListener.RESP_TIME_FIELD) + "ms).");
									}
								}

							}, 1000);
				}
			}
		});

		// process response of the JMS Gateway login...
//		lListener.addResponseListener("org.jwebsocket.plugins.system", "login",
//				new JWSMessageListener(lSender) {
//			@Override
//			public void processToken(String aSourceId, Token aToken) {
//				int lCode = aToken.getInteger("code", -1);
//				if (0 == lCode) {
//					if (mLog.isInfoEnabled()) {
//						mLog.info("Authentication against jWebSocket JMS Gateway successful.");
//					}
//				} else {
//					mLog.error("Authentication against jWebSocket JMS Gateway failed!");
//				}
//
//				Map lArgs = new FastMap<String, Object>();
//				/*
//				 lSender.sendPayload("aschulze-dt", "org.jwebsocket.svcep.demo",
//				 "demo1", lArgs, "{}");
//				 */
//				/*
//				lArgs.put("accessToken", lOAuth.getAccessToken());
//				lSender.sendPayload("aschulze-dt", "org.jwebsocket.svcep.demo",
//						"sso1", lArgs, "{}");
//				*/
//				// Token lToken = TokenFactory.createToken("com.ptc.windchill", "createBOM");
//				// lToken.setString("username", "rsouza");
//				// lToken.setString("password", "...");
//				// lToken.setString("payload", "{}");
//				// sendToken("hqdvptas134", lToken);
//				
//				lSender.sendPayload("hqdvptas134", "com.ptc.windchill",
//					"createBOM", lArgs, "{}");
//				
//				if (true) {
//					return;
//				}
//
//				// now to try to get some data from the service...
//				lArgs = new FastMap<String, Object>();
//				lArgs.put("username", "anyUsername");
//				lArgs.put("password", "anyPassword");
//				lArgs.put("action", "CREATE");
//				// send the payload to the target (here the JMS demo service)
//				// lSender.forwardPayload("aschulze-dt", "org.jwebsocket.jms.demo",
//				//		"forwardPayload", "4711", lArgs, null);
//				// send the payload to the target (here the JMS demo service)
//				lSender.sendPayload("HQDVPTAS110", "com.ptc.windchill",
//						"getLibraryPart", lArgs, "{}");
//			}
//		});
		// process response of the JMS Gateway login...
		lListener.addResponseListener("org.jwebsocket.plugins.system", "login",
				new JWSMessageListener(lSender) {
					@Override
					public void processToken(String aSourceId, Token aToken) {
						mLog.info("Login successful, initiating client communication process...");

						// runProgressTest();
						runOAuthTest();
						if (true) {
							return;
						}
						Map<String, Object> lArgs = new FastMap<String, Object>();

						// echo on login
						int lCode = aToken.getInteger("code", -1);
						if (0 == lCode) {
							if (mLog.isInfoEnabled()) {
								mLog.info("Authentication against jWebSocket JMS Gateway successful.");
							}
						} else {
							mLog.error("Authentication against jWebSocket JMS Gateway failed!");
						}

						lArgs.put("echo", "This is the echo message");
						lSender.sendPayload(
								"jWebSocketJMSService",
								// "org.jwebsocket.jms.gateway", // target id
								"org.jwebsocket.plugins.jmsdemo", // ns
								"echo", // type
								lArgs,
								"any additional payload if required",
								new JWSResponseTokenListener(JWSResponseTokenListener.RESP_TIME_FIELD) {

									@Override
									public void onTimeout() {
										mLog.info("Echo timed out!");
									}

									@Override
									public void onFailure(Token aReponse) {
										mLog.error("Echo failure!");
									}

									@Override
									public void onSuccess(Token aReponse) {
										if (mLog.isInfoEnabled()) {
											mLog.info("Echo success (response received in "
													+ aReponse.getLong(JWSResponseTokenListener.RESP_TIME_FIELD) + "ms).");
										}
									}

								}, 10000);

						if (true) {
							return;
						}

						// lSender.ping("server-aschulze-dt");
						// lSender.getIdentification("*");
						lSender.sendPayload(
								"org.jwebsocket.jms.gateway", // target id
								"org.jwebsocket.plugins.jmsdemo", // ns
								"echo", // type
								lArgs, "any additional payload if required");
						/*
						 Token lToken = TokenFactory.createToken("org.jwebsocket.plugins.jmsdemo", "echo");
						 lToken.setString("echo", "This is the echo message");
						 lSender.sendToken("org.jwebsocket.jms.gateway", lToken);
						 */
						if (true) {
							return;
						}

						// lSender.sendPayload("wcslv01.dev.nvdia.com", "com.ptc.windchill",
						//	"getNewPartRequest", lArgs, "{}"); // getLibraryPart, getManufacturerPart "wcslv01.dev.nvidia.com"
						mLog.info("Sending getLibraryPart");
						lSender.sendPayload("hqdvptas134", "com.ptc.windchill",
								"getLibraryPart", lArgs, "{}");
						/*
						 lSender.sendPayload("aschulze-dt", "org.jwebsocket.svcep.demo",
						 "demo1", lArgs, "{}");
						 */
						/*
						 lArgs.put("accessToken", lOAuth.getAccessToken());
						 lSender.sendPayload("server-aschulze-dt", "org.jwebsocket.svcep.demo",
						 "sso1", lArgs, "{}");
						 */
						/*
						 lSender.sendPayload("hqdvptas138", "com.ptc.windchill",
						 "createBOM", lArgs, "{}");
						 */
						if (true) {
							return;
						}

						// now to try to get some data from the service...
						lArgs = new FastMap<String, Object>();
						lArgs.put("username", "anyUsername");
						lArgs.put("password", "anyPassword");
						lArgs.put("action", "CREATE");
						// send the payload to the target (here the JMS demo service)
						// lSender.forwardPayload("aschulze-dt", "org.jwebsocket.jms.demo",
						//		"forwardPayload", "4711", lArgs, null);
						// send the payload to the target (here the JMS demo service)
						lSender.sendPayload("HQDVPTAS110", "com.ptc.windchill",
								"getLibraryPart", lArgs, "{}");
					}
				});

		// process response echo request to the JMS demo plug-in...
		lListener.addResponseListener("org.jwebsocket.plugins.jmsdemo", "echo",
				new JWSMessageListener(lSender) {
					@Override
					public void processToken(String aSourceId, Token aToken) {
						mLog.info("Response from '" + aSourceId
								+ "' to 'echo' received: "
								+ (JMSLogging.isFullTextLogging()
								? aToken.toString()
								: aToken.getLogString())
						);
					}
				});

		// process response of the JMS Gateway login...
		lListener.addResponseListener("org.jwebsocket.svcep.demo", "sso1",
				new JWSMessageListener(lSender) {
					@Override
					public void processToken(String aSourceId, Token aToken) {
						int lCode = aToken.getInteger("code", -1);
						if (0 == lCode) {
							if (mLog.isInfoEnabled()) {
								mLog.info("Username was detected by server: '" + aToken.getString("username") + "'");
							}
						}
					}
				});

		// on welcome message from jWebSocket, authenticate against jWebSocket
		// lListener.addResponseListener("org.jwebsocket.jms.demo", "forwardPayload",
		// 		new JWSMessageListener(lSender) {
		lListener.addResponseListener("com.ptc.windchill", "getLibraryPart",
				new JWSMessageListener(lSender) {
					@Override
					public void processToken(String aSourceId, Token aToken) {
						mLog.info("Received 'forwardPayload'.");
						if (true) {
							return;
						}
						// String lBase64Encoded = lToken.getString("fileAsBase64");
						String lPayload = aToken.getString("payload");
						// specify the target file
						File lFile = new File("getLibraryPart.json");
						try {
							// take the zipped version of the file... 
							byte[] lBA = lPayload.getBytes("UTF-8");
							// and save it to the hard disk
							FileUtils.writeByteArrayToFile(lFile, lBA);
						} catch (IOException lEx) {
							mLog.error("File " + lFile.getAbsolutePath() + " could not be saved!");
						}
					}
				});

		// process response of the get data response...
		lListener.addResponseListener("tld.yourname.jms", "getData",
				new JWSMessageListener(lSender) {
					@Override
					public void processToken(String aSourceId, Token aToken) {
						int lCode = aToken.getInteger("code", -1);
						if (0 == lCode) {
							if (mLog.isInfoEnabled()) {
								mLog.info("Data transfer successful.");
							}
						} else {
							mLog.error("Data transfer failed!");
						}

						// reading a file using Apache Commons IO into a byte array
						File lFile = new File("Apache License 2.0.txt");
						byte[] lBA = null;
						try {
							lBA = FileUtils.readFileToByteArray(lFile);
						} catch (IOException lEx) {
							mLog.error("Demo file " + lFile.getAbsolutePath() + " could not be loaded!");
						}

						// if the file could properly being read...
						if (null != lBA) {
							// base64 encode it w/o any compression
							String lBase64Encoded = Tools.base64Encode(lBA);

							// or compress it as an zip archive
							String lBase64Zipped = null;
							try {
								lBase64Zipped = Tools.base64Encode(Tools.zip(lBA, false));
							} catch (Exception lEx) {
								mLog.error("File could not be compressed: " + lEx.getMessage());
							}

							Token lToken = TokenFactory.createToken();
							// put base64 encoded only version into message
							lToken.setString("fileAsBase64", lBase64Encoded);
							// and the zipped version as well (for demo purposes)
							lToken.setString("fileAsZip", lBase64Zipped);

							// generate the payload as JSON
							String lPayload = JSONProcessor.tokenToPacket(lToken).getUTF8();
							// add some optional arguments to be passed to the target
							Map<String, Object> lArgs = new FastMap<String, Object>();
							lArgs.put("arg1", "value1");
							lArgs.put("arg2", "value2");

							// send the payload to the target (here the JMS demo service)
							lSender.sendPayload("JMSServer", "tld.yourname.jms",
									"transferFile", lArgs, lPayload);
						}

						// and shut down the client
						mLog.info("Gracefully shutting down...");
						lSender.getEndPoint().shutdown();
					}
				});

		// start the endpoint all all listener have been assigned
		lJWSEndPoint.start();

		// add a listener to listen in coming messages
		// lJMSClient.addListener(new JMSClientMessageListener(lJMSClient));
		// this is a console app demo
		// so wait in a thread loop until the client get shut down
		try {
			while (!lJWSEndPoint.isShutdown()) {
				Thread.sleep(1000);
			}
		} catch (InterruptedException lEx) {
			// ignore a potential exception here
		}

		// check if JMS client has already been shutdown by logic
		if (!lJWSEndPoint.isShutdown()) {
			// if not yet done...
			mLog.info("Shutting down JMS Client Endpoint...");
			// shut the client properly down
			lJWSEndPoint.shutdown();
		}
//		try {
//			// Tools.stopUtilityTimer();
//			Tools.getThreadPool().shutdown();
//			Tools.getThreadPool().awaitTermination(10, TimeUnit.SECONDS);
//			/*
//			int lSeconds = 5;
//			while (!lJWSEndPoint.isShutdown() && lSeconds > 0) {
//				Thread.sleep(1000);
//				lSeconds--;
//			}
//			*/
//		} catch (InterruptedException lEx) {
//			mLog.error(lEx.getMessage());
//		}
		// and show final status message in the console
		mLog.info("JMS Client Endpoint properly shutdown.");
	}
}
