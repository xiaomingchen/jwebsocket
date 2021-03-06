//	---------------------------------------------------------------------------
//	jWebSocket - EhCacheEventListener (Community Edition, CE)
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
package org.jwebsocket.storage.ehcache;

import net.sf.ehcache.CacheException;
import net.sf.ehcache.Status;
import net.sf.ehcache.event.CacheManagerEventListener;

/**
 *
 * @author Alexander Schulze
 */
public class EhCacheEventListener implements CacheManagerEventListener {

	/**
	 *
	 * @throws CacheException
	 */
	@Override
	public void init() throws CacheException {
	}

	/**
	 *
	 * @param aCacheName
	 */
	@Override
	public void notifyCacheAdded(String aCacheName) {
	}

	/**
	 *
	 * @param aCacheName
	 */
	@Override
	public void notifyCacheRemoved(String aCacheName) {
	}

	/**
	 *
	 * @return
	 */
	@Override
	public Status getStatus() {
		return null;
	}

	/**
	 *
	 */
	@Override
	public void dispose() {
	}
}
