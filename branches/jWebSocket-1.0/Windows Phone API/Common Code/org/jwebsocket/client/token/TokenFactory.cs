﻿//	---------------------------------------------------------------------------
//	jWebSocket - TimeoutOutputStreamNIOWriter
//	Copyright (c) 2011 Alexander Schulze, Innotrade GmbH
//	---------------------------------------------------------------------------
//	This program is free software; you can redistribute it and/or modify it
//	under the terms of the GNU Lesser General Public License as published by the
//	Free Software Foundation; either version 3 of the License, or (at your
//	option) any later version.
//	This program is distributed in the hope that it will be useful, but WITHOUT
//	ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
//	FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for
//	more details.
//	You should have received a copy of the GNU Lesser General Public License along
//	with this program; if not, see <http://www.gnu.org/licenses/lgpl.html>.
//	---------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ClientLibrary.org.jwebsocket.client.config;
using ClientLibrary.org.jwebsocket.client.api;

namespace ClientLibrary.org.jwebsocket.client.token
{
    /// <summary>
    /// Author Rolando Betancourt Toucet
    /// </summary>
    public class TokenFactory
    {
        public static Token CreateToken()
        {
            return new DictionaryToken();
        }

        public static Token CreateToken(string aType)
        {
            return new DictionaryToken(aType);
        }

        public static Token CreateToken(string aNS, string aType)
        {
            return new DictionaryToken(aNS, aType);
        }
    }
}
