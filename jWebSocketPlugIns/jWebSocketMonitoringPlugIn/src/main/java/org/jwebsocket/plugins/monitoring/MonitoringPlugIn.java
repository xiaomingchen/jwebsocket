//	---------------------------------------------------------------------------
//	jWebSocket Monitoring Plug-in (Community Edition, CE)
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
package org.jwebsocket.plugins.monitoring;

import com.mongodb.*;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Map;
import javolution.util.FastList;
import javolution.util.FastMap;
import org.apache.log4j.Logger;
import org.hyperic.sigar.*;
import org.jwebsocket.api.PluginConfiguration;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.config.JWebSocketCommonConstants;
import org.jwebsocket.config.JWebSocketServerConstants;
import org.jwebsocket.kit.CloseReason;
import org.jwebsocket.kit.PlugInResponse;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.token.Token;
import org.jwebsocket.token.TokenFactory;

/**
 * @author Merly, Orlando, vbarzana
 */
public class MonitoringPlugIn extends TokenPlugIn {

	private static Logger mLog = Logging.getLogger();
	public final static String NS_MONITORING =
			JWebSocketServerConstants.NS_BASE + ".plugins.monitoring";
	private final static String VERSION = "1.0.0";
	private final static String VENDOR = JWebSocketCommonConstants.VENDOR_CE;
	private final static String LABEL = "jWebSocket MonitoringPlugIn";
	private final static String COPYRIGHT = JWebSocketCommonConstants.COPYRIGHT_CE;
	private final static String LICENSE = JWebSocketCommonConstants.LICENSE_CE;
	private final static String DESCRIPTION = "jWebSocket MonitoringPlugIn - Community Edition";
	private static Collection<WebSocketConnector> mClients = new FastList<WebSocketConnector>();
	private static Thread mInformationThread;
	private static Thread mServerExchangeInfoThread;
	private static Thread mUserInfoThread;
	private static boolean mInformationRunning = true;
	private static int mMemory[];
	private static float mCpu;
	private static double mUsedMemPercent;
	private static double mFreeMemPercent;
	private Sigar mSigar;
	private CpuPerc[] mCPUPercent;
	private File[] mRoots;
	private NetStat mNetwork;
	private boolean mIsActive = false;
	private boolean mUserInfoRunning = false;
	private SimpleDateFormat mFormat;
	private DBCollection mDBColl;
	private DBCollection mUsePlugInsColl;
	private static int mConnectedUsers = 0;
	private static int mTimeCounter = 0;
	private static FastList<Integer> mConnectedUsersList = new FastList<Integer>(60);
	private final static String TT_REGISTER = "register";
	private final static String TT_UNREGISTER = "unregister";
	private final static String TT_SERVER_XCHG_INFO = "serverXchgInfo";
	private final static String TT_SERVER_XCHG_INFO_DAYS = "serverXchgInfoXDays";
	private final static String TT_SERVER_XCHG_INFO_MONTH = "serverXchgInfoXMonth";
	private final static String TT_USER_INFO = "userInfo";
	private final static String TT_PC_INFO = "computerInfo";
	private final static String TT_PLUGINS_INFO = "pluginsInfo";
	private final static String INTEREST = "interest";
	private final static String DAY = "day";
	private final static String MONTH = "month";
	private final static String YEAR = "year";
	private final static String CURRENT_DATE = "currentDate";
	private final static String CURRENT_MONTH = "currentMonth";
	private final static String CURRENT_YEAR = "currentYear";
	private final static String TOTAL_HDD_SPACE = "totalHddSpace";
	private final static String FREE_HDD = "freeHddSpace";
	private final static String USED_HDD = "usedHddSpace";
	private final static String TOTAL_MEMORY = "totalMem";
	private final static String USED_MEMORY = "usedMem";
	private final static String USED_MEMORY_PERCENT = "usedMemPercent";
	private final static String FREE_MEMORY_PERCENT = "freeMemPercent";
	private final static String TOTAL_SWAP = "totalSwap";
	private final static String USED_SWAP = "usedSwap";
	private final static String SWAP_PERCENT = "swapPercent";
	private final static String NETWORK_RECEIVED = "netReceived";
	private final static String NETWORK_SENT = "netSent";
	private final static String CPU_USAGE = "consumeCPUCharts";
	private final static String CONSUME_CPU = "consumeCPU";
	private final static String CONSUME_TOTAL = "consumeTotal";
	private final static String ONLINE_USERS = "connectedUsers";
	private final static String DATE = "date";
	private final static String EXCHANGES = "exchanges";
	private final static String DB_NAME = "db_charting";
	private final static String DB_COL_EXCHANGES = "exchanges_server";
	private final static String DB_COL_PLUGINS_USAGE = "use_plugins";
	private final static String DB_FIELD_ID = "id";
	private final static String DB_FIELD_REQUESTS = "requests";
	private final static String DB_FIELD_USE_PLUGINS = "usePlugins";

	/**
	 *
	 * @param aConfiguration
	 */
	public MonitoringPlugIn(PluginConfiguration aConfiguration) {
		super(aConfiguration);
		if (mLog.isDebugEnabled()) {
			mLog.debug("Instantiating Monitoring plug-in...");
		}
		// specify default name space for monitoring plugin
		this.setNamespace(NS_MONITORING);

		// Getting server exchanges
		mFormat = new SimpleDateFormat("MM/dd/yyyy");

		mDBColl = null;
		try {
			Mongo lMongo = new Mongo();
			if (null != lMongo) {
				DB lDB = lMongo.getDB(DB_NAME);
				if (null != lDB) {
					mDBColl = lDB.getCollection(DB_COL_EXCHANGES);
					mUsePlugInsColl = lDB.getCollection(DB_COL_PLUGINS_USAGE);
				} else {
					mLog.error("Mongo db_charting collection could not be obtained.");
				}
			} else {
				mLog.error("Mongo DB instance could not be created.");
			}
		} catch (Exception lEx) {
			mLog.error(Logging.getSimpleExceptionMessage(lEx, "initializing MongoDB connection"));
		}
		if (null == mDBColl) {
			mLog.error("MongoDB collection exchanges_server could not be obtained.");
		} else if (mLog.isInfoEnabled()) {
			mLog.info("Monitoring Plug-in successfully instantiated.");
		}
	}

	@Override
	public String getVersion() {
		return VERSION;
	}

	@Override
	public String getLabel() {
		return LABEL;
	}

	@Override
	public String getDescription() {
		return DESCRIPTION;
	}

	@Override
	public String getVendor() {
		return VENDOR;
	}

	@Override
	public String getCopyright() {
		return COPYRIGHT;
	}

	@Override
	public String getLicense() {
		return LICENSE;
	}

	@Override
	public String getNamespace() {
		return NS_MONITORING;
	}

	@Override
	public void engineStarted(WebSocketEngine aEngine) {
		//Initializing thread
		mInformationRunning = true;
		mInformationThread = new Thread(new getInfo(), "jWebSocket Monitoring Plug-in Information");
		mInformationThread.start();

		mServerExchangeInfoThread = new Thread(new getServerExchangeInfo(), "jWebSocket Monitoring Plug-in Server Exchange");
		mServerExchangeInfoThread.start();

		mUserInfoThread = new Thread(new getUserInfo(), "jWebSocket Monitoring Plug-in UserInformation");
	}

	@Override
	public void engineStopped(WebSocketEngine aEngine) {
		mInformationRunning = false;

		try {
			mInformationThread.join(2000);
			mInformationThread.stop();
		} catch (InterruptedException ex) {
		}

		try {
			mServerExchangeInfoThread.join(2000);
			mServerExchangeInfoThread.stop();
		} catch (InterruptedException ex) {
		}

		try {
			mUserInfoThread.join(2000);
			mUserInfoThread.stop();
		} catch (InterruptedException ex) {
		}

	}

	@Override
	public void connectorStarted(WebSocketConnector aConnector) {
		mConnectedUsers++;
		if (!mUserInfoRunning) {
			mUserInfoRunning = true;
			mUserInfoThread.start();
		}
		if (!mIsActive) {
			try {
				getServer().getListeners().add(new ServerRequestListener());
				mIsActive = true;
			} catch (Exception lEx) {
				System.out.println(lEx.getMessage());
			}
		}
	}

	@Override
	public void connectorStopped(WebSocketConnector aConnector,
			CloseReason aCloseReason) {
		if (mConnectedUsers > 0) {
			mConnectedUsers--;
		}

		if (mClients.contains(aConnector)) {
			mClients.remove(aConnector);
		}
	}

	@Override
	public void processToken(PlugInResponse aResponse,
			WebSocketConnector aConnector, Token aToken) {
		if (aToken.getNS().equals(getNamespace())) {

			if (aToken.getType().equals(TT_REGISTER)) {
				String lInterest = aToken.getString(INTEREST);
				if (null != lInterest && !lInterest.isEmpty()) {
					aConnector.setVar(INTEREST, aToken.getString(INTEREST));
					Date lDate = new Date();
					if (TT_SERVER_XCHG_INFO.equals(lInterest)) {
						String lDay = aToken.getString(DAY);
						String lMonth = aToken.getString(MONTH);
						String lYear = aToken.getString(YEAR);

						Integer lCurrentYear = 0;
						if (lYear != null) {
							lCurrentYear = Integer.parseInt(lYear) + 2000;
						}

						String lCurrentDate = lMonth + "/" + lDay + "/"
								+ lCurrentYear;
						String lToday = mFormat.format(lDate);

						if (((lDay == null)
								|| (lYear == null)
								|| (lMonth == null))
								|| (lCurrentDate.equals(lToday))) {
							aConnector.setVar(CURRENT_DATE, true);
							broadcastServerXchgInfo(aConnector);
						} else {
							aConnector.setVar(CURRENT_DATE, false);
							broadcastServerXchgInfoPreviousDate(aConnector,
									lDay, lMonth, lCurrentYear.toString());
						}
					} else if (TT_SERVER_XCHG_INFO_DAYS.equals(lInterest)) {
						String lMonth = aToken.getString(MONTH);

						if (lMonth != null) {
							if (Integer.parseInt(lMonth) != lDate.getMonth() + 1) {
								aConnector.setVar(CURRENT_MONTH, false);
							} else {
								aConnector.setVar(MONTH, lMonth);
								aConnector.setVar(CURRENT_MONTH, true);
							}
						} else {
							aConnector.setVar(CURRENT_MONTH, false);
						}
						broadcastServerXchgInfoXDay(aConnector, lMonth);
					} else if (TT_SERVER_XCHG_INFO_MONTH.equals(lInterest)) {
						String lYear = aToken.getString(YEAR);
						String lDateString = mFormat.format(lDate);
						String lCurrYear = lDateString.substring(lDateString.length() - 4, lDateString.length());

						if (lYear != null) {
							if (lYear.equals(lCurrYear)) {
								aConnector.setVar(YEAR, lYear);
								aConnector.setVar(CURRENT_YEAR, true);
							} else {
								aConnector.setVar(CURRENT_YEAR, false);
							}
						} else {
							aConnector.setVar(CURRENT_YEAR, false);
							lYear = lCurrYear;
						}
						broadcastServerXchgInfoXMonth(aConnector, lYear);
					} else if (TT_PLUGINS_INFO.equals(lInterest)) {
						broadcastPluginsInfo(aConnector);
					} else if (TT_USER_INFO.equals(lInterest)) {
						if( mInformationRunning ) {
							getServer().sendToken(aConnector, getUserInfoToToken());
						}
						Token lToken = getUserInfoToToken();
						
					}
					if (!mClients.contains(aConnector)) {
						mClients.add(aConnector);
					}
				}

			} else if (aToken.getType().equals(TT_UNREGISTER)) {
				if (mClients.contains(aConnector)) {
					mClients.remove(aConnector);
				}
			}
		}
	}

	class getInfo implements Runnable {

		@Override
		public void run() {
			mSigar = new Sigar();
			Token lPCInfoToken = null;
			while (mInformationRunning) {
				try {
					gatherComputerInfo();
					lPCInfoToken = computerInfoToToken();
				} catch (Exception e) {
				}


				for (WebSocketConnector lConnector : mClients) {

					String lInterest = lConnector.getString(INTEREST);

					if (TT_PC_INFO.equals(lInterest)) {

						getServer().sendToken(lConnector, lPCInfoToken);

					} else if (TT_PLUGINS_INFO.equals(lInterest)) {
						//TODO: Get the plugins info
//                            gatherBrowsersInfo();
						broadcastPluginsInfo(lConnector);
					}
				}
				try {
					Thread.sleep(1000);
				} catch (InterruptedException ex) {
				}
			}
		}
	}

	class getUserInfo implements Runnable {

		@Override
		public void run() {

			while (mUserInfoRunning) {
				mConnectedUsersList.add(mTimeCounter, mConnectedUsers);
				Token lToken = getUserInfoToToken();
				String lInterest = "";
				for (WebSocketConnector lConnector : mClients) {

					lInterest = lConnector.getString(INTEREST);

					if (TT_USER_INFO.equals(lInterest)) {
						getServer().sendToken(lConnector, lToken);
					}
				}
				try {
					Thread.sleep(1000);
					if (mTimeCounter == 59) {
						mConnectedUsersList.removeFirst();
						mTimeCounter--;
					}
				} catch (InterruptedException ex) {
				}
				mTimeCounter++;
			}
		}
	}

	class getServerExchangeInfo implements Runnable {

		@Override
		public void run() {
			while (mInformationRunning) {
				for (WebSocketConnector lConnector : mClients) {
					if (TT_SERVER_XCHG_INFO.equals(
							lConnector.getString(INTEREST))) {
						if (lConnector.getBoolean(CURRENT_DATE) == true) {
							broadcastServerXchgInfo(lConnector);
						}
					}
					if (TT_SERVER_XCHG_INFO_DAYS.equals(
							lConnector.getString(INTEREST))) {
						if (lConnector.getBoolean(CURRENT_MONTH) == true) {
							broadcastServerXchgInfoXDay(lConnector,
									lConnector.getVar(MONTH).toString());
						}
					}
					if (TT_SERVER_XCHG_INFO_MONTH.equals(
							lConnector.getString(INTEREST))) {
						if (lConnector.getBoolean(CURRENT_YEAR) == true) {
							broadcastServerXchgInfoXMonth(lConnector,
									lConnector.getVar(YEAR).toString());
						}
					}
				}
				try {
					Thread.sleep(3000);
				} catch (InterruptedException ex) {
				}
			}
		}
	}

	private Token getUserInfoToToken() {
		Token lToken = TokenFactory.createToken(getNamespace(), TT_USER_INFO);
		lToken.setList(ONLINE_USERS, mConnectedUsersList);

		return lToken;
	}

	/**
	 *
	 * @return
	 */
	public Token computerInfoToToken() throws SigarException {
		Token lToken = TokenFactory.createToken(getNamespace(), TT_PC_INFO);
		//Memory Information
		lToken.setInteger(TOTAL_MEMORY, mMemory[0]);
		lToken.setInteger(USED_MEMORY, mMemory[1]);
		lToken.setDouble(USED_MEMORY_PERCENT, mUsedMemPercent);
		lToken.setDouble(FREE_MEMORY_PERCENT, mFreeMemPercent);
		lToken.setInteger(TOTAL_SWAP, mMemory[2]);
		lToken.setInteger(USED_SWAP, mMemory[3]);
		lToken.setInteger(NETWORK_RECEIVED, mNetwork.getAllInboundTotal());
		lToken.setInteger(NETWORK_SENT, mNetwork.getAllOutboundTotal());
		lToken.setDouble(SWAP_PERCENT, (double) (mMemory[3] * 100
				/ mMemory[2]));

		FastList<String> lList = new FastList<String>();

		for (int i = 0; i < mCPUPercent.length; i++) {
			lList.add(String.valueOf(CpuPerc.format(mCPUPercent[i].getUser())));
		}
		//CPU Information
		lToken.setList(CPU_USAGE, lList);

		lToken.setString(CONSUME_CPU, CpuPerc.format(mCPUPercent[0].getUser()));
		lToken.setString(CONSUME_TOTAL, CpuPerc.format(mCpu));

		//HDD Information
		long lTotalHddSpace = 0;
		long lFreeHddSpace = 0;
		for (File lRoot : mRoots) {
			lTotalHddSpace += lRoot.getTotalSpace();
			lFreeHddSpace += lRoot.getFreeSpace();
		}

		lToken.setString(TOTAL_HDD_SPACE, inMeasure(lTotalHddSpace));
		lToken.setString(FREE_HDD, inMeasure(lFreeHddSpace));
		lToken.setString(USED_HDD, inMeasure(lTotalHddSpace - lFreeHddSpace));
		return lToken;
	}

	/**
	 *
	 * @param aConnector
	 */
	public void broadcastServerXchgInfo(WebSocketConnector aConnector) {
		Token lToken = TokenFactory.createToken(getNamespace(),
				TT_SERVER_XCHG_INFO);

		//Getting server exchanges
		try {
			String lToday = mFormat.format(new Date());
			DBObject lRecord = mDBColl.findOne(
					new BasicDBObject().append(DATE, lToday));
			lToken.setMap(EXCHANGES, lRecord.toMap());

		} catch (Exception ex) {
			mLog.error(ex.getMessage());
		}

		getServer().sendToken(aConnector, lToken);
	}

	/**
	 *
	 * @param aConnector
	 * @param aDay
	 * @param aMonth
	 * @param aYear
	 */
	public void broadcastServerXchgInfoPreviousDate(WebSocketConnector aConnector, String aDay, String aMonth, String aYear) {
		Token token = TokenFactory.createToken(getNamespace(),
				TT_SERVER_XCHG_INFO);
		//Getting server exchanges
		try {
			String lToday = aMonth + "/" + aDay + "/" + aYear;

			DBObject lRecord = mDBColl.findOne(
					new BasicDBObject().append(DATE, lToday));

			token.setMap(EXCHANGES, lRecord.toMap());


		} catch (Exception ex) {
			mLog.error(ex.getMessage());
		}

		getServer().sendToken(aConnector, token);

	}

	/**
	 *
	 * @param aConnector
	 * @param aMonth
	 */
	public void broadcastServerXchgInfoXDay(WebSocketConnector aConnector,
			String aMonth) {
		Token lToken = TokenFactory.createToken(getNamespace(), TT_SERVER_XCHG_INFO_DAYS);
		//Getting server exchanges
		try {
			String lMonth = aMonth;
			//DBCursor lCursor = mDBColl.find(
			//new BasicDBObject().append(DATE, "/^" + lMonth + "/"));
			DBCursor lCursor = mDBColl.find();

			boolean lFlag = false;
			String lDate = null;
			Integer lTotal = 0;
			while (lCursor.hasNext()) {
				DBObject lDocument = lCursor.next();
				lDate = (String) lDocument.get(DATE);
				if (lDate.startsWith(lMonth)) {

					String lDay = lDate.substring(3, 5);
					for (int i = 0; i < 24; i++) {
						if ((Integer) lDocument.get("h" + i) != null) {
							lTotal += (Integer) lDocument.get("h" + i);
						}
					}
					//System.out.println(lCursor);
					lToken.setInteger(lDay, lTotal);
					lTotal = 0;
					lFlag = true;
				}
			}
			if (lFlag == false) {
				lToken.setInteger("code", -1);
				aConnector.setVar(CURRENT_MONTH, false);
			}

		} catch (Exception ex) {
			mLog.error(ex.getMessage());
		}

		getServer().sendToken(aConnector, lToken);

	}

	/**
	 *
	 * @param aConnector
	 * @param aYear
	 */
	public void broadcastServerXchgInfoXMonth(WebSocketConnector aConnector,
			String aYear) {
		Token token = TokenFactory.createToken(getNamespace(),
				TT_SERVER_XCHG_INFO_MONTH);
		//Getting server exchanges
		try {
			String lYear = aYear;
			//DBCursor lCursor = mDBColl.find(
			//new BasicDBObject().append(DATE, "/^" + lMonth + "/"));
			DBCursor lCursor = mDBColl.find();

			boolean m = false;
			String lDate = null;
			Integer lTotal = 0;
			while (lCursor.hasNext()) {
				DBObject lDocument = lCursor.next();
				lDate = (String) lDocument.get(DATE);
				if (lDate.endsWith(lYear)) {
					for (int lMonth = 1; lMonth < 13; lMonth++) {

						String lComparableMonth = (lMonth < 10)
								? "0" + String.valueOf(lMonth)
								: String.valueOf(lMonth);
						String lRecordMonth = lDate.substring(0, 2);

						if (lRecordMonth.equals(lComparableMonth)) {
							for (int i = 0; i < 24; i++) {
								if ((Integer) lDocument.get("h" + i) != null) {
									lTotal += (Integer) lDocument.get("h" + i);
								}
							}
						}
						token.setInteger(lRecordMonth, token.getInteger(
								lRecordMonth, 0) + lTotal);
						lTotal = 0;
						m = true;
					}
				}
			}
			if (m == false) {
				token.setInteger("code", -1);
				//token.setString("msg", ex.getMessage());
				//throw new Exception("Error");
			}

		} catch (Exception ex) {
			mLog.error(ex.getMessage());
		}

		getServer().sendToken(aConnector, token);

	}

	private void gatherComputerInfo() {
		try {
			mMemory = gatherMemInfo();
			mCPUPercent = mSigar.getCpuPercList();
			mCpu = (float) mSigar.getCpuPerc().getUser();
			mNetwork = mSigar.getNetStat();
			mRoots = File.listRoots();

			Thread.sleep(1000);
		} catch (SigarException ex) {
		} catch (InterruptedException ex) {
		}
	}

	/**
	 *
	 * @param aConnector
	 */
	public void broadcastPluginsInfo(WebSocketConnector aConnector) {
		Token lToken = TokenFactory.createToken(getNamespace(), TT_PLUGINS_INFO);
		String lNamespace = lToken.getNS();
		FastList<Map> lList = new FastList<Map>();

		try {
			DBCursor lCursor = mUsePlugInsColl.find();
			DBObject lDocument;
			FastMap<String, Object> lMap;
			while (lCursor.hasNext()) {
				lDocument = lCursor.next();
				lMap = new FastMap<String, Object>();
				lMap.put(DB_FIELD_ID, lDocument.get(DB_FIELD_ID));
				lMap.put(DB_FIELD_REQUESTS, lDocument.get(DB_FIELD_REQUESTS));

				lList.add(lMap);
			}
			lToken.setList(DB_FIELD_USE_PLUGINS, lList);
		} catch (Exception ex) {
			mLog.error(ex.getMessage());
		}

		getServer().sendToken(aConnector, lToken);
	}

	//To obtain all information about the memories
	/**
	 *
	 * @return @throws SigarException
	 * @throws SigarException
	 */
	public int[] gatherMemInfo() throws SigarException {
		int lMem[] = new int[4];
		Mem lMemo = mSigar.getMem();
		Swap lExchange = mSigar.getSwap();
		long lTotalMem = inMBytes(lMemo.getTotal());
		long lUsedMem = inMBytes(lMemo.getActualUsed());
		long lTotalSwap = inMBytes(lExchange.getTotal());
		long lUsedSwap = inMBytes(lExchange.getUsed());
		mUsedMemPercent = lMemo.getUsedPercent();
		mFreeMemPercent = lMemo.getFreePercent();
		lMem[0] = (int) lTotalMem;
		lMem[1] = (int) lUsedMem;
		lMem[2] = (int) lTotalSwap;
		lMem[3] = (int) lUsedSwap;

		return lMem;
	}

	//converting the memory in megabytes
	private long inMBytes(long value) {
		return ((value / 1024) / 1024);
	}
	//for convert the hdd space

	private String inMeasure(long value) {
		if (value / 1000 < 1) {
			return String.valueOf(value) + " KB";
		} else if (value / 1000 / 1000 < 1) {
			return String.valueOf(value / 1000) + " MB";
		} else {
			return String.valueOf(value / 1000 / 1000 / 1000) + " GB";
		}
	}
}
