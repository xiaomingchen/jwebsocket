
//	---------------------------------------------------------------------------
//	jWebSocket JavaScript/Browser Client (Community Edition, CE)
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
if(window.MozWebSocket){window.WebSocket=window.MozWebSocket;}var jws={VERSION:"1.0.0 RC3 (build 50105)",NS_BASE:"org.jwebsocket",
NS_SYSTEM:"org.jwebsocket.plugins.system",MSG_WS_NOT_SUPPORTED:
"Unfortunately your browser does neither natively support WebSockets\n"+"nor you have the Adobe Flash-PlugIn 10+ installed.\n"+
"Please download the last recent Adobe Flash Player at http://get.adobe.com/flashplayer, "+
"or use a native WebSocket compliant browser.",CUR_TOKEN_ID:0,JWS_SERVER_SCHEMA:"ws",JWS_SERVER_SSL_SCHEMA:"wss",JWS_SERVER_HOST:(
self.location.hostname?self.location.hostname:"127.0.0.1"),JWS_SERVER_PORT:8787,JWS_SERVER_SSL_PORT:9797,JWS_SERVER_CONTEXT:
"/jWebSocket",JWS_SERVER_SERVLET:"/jWebSocket",JWS_SERVER_URL:"ws://"+(self.location.hostname?self.location.hostname:"127.0.0.1")+
":8787/jWebSocket/jWebSocket",CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3,RECONNECTING:1000,OPEN_TIMED_OUT:1001,RO_OFF:{autoReconnect:
false,reconnectDelay: -1},RO_ON:{autoReconnect:true,reconnectDelay:3000},WS_SUBPROT_JSON:"org.jwebsocket.json",WS_SUBPROT_XML:
"org.jwebsocket.xml",WS_SUBPROT_CSV:"org.jwebsocket.csv",WS_SUBPROT_CUSTOM:"org.jwebsocket.text",WS_SUBPROT_TEXT:
"org.jwebsocket.text",WS_SUBPROT_BINARY:"org.jwebsocket.binary",SCOPE_PRIVATE:"private",SCOPE_PUBLIC:"public",DEF_RESP_TIMEOUT:
30000,BT_UNKNOWN:0,BT_FIREFOX:1,BT_NETSCAPE:2,BT_OPERA:3,BT_IEXPLORER:4,BT_SAFARI:5,BT_CHROME:6,BROWSER_NAMES:["Unknown","Firefox",
"Netscape","Opera","Internet Explorer","Safari","Chrome"],GUEST_USER_LOGINNAME:"guest",GUEST_USER_PASSWORD:"guest",
DEMO_ROOT_LOGINNAME:"root",DEMO_ROOT_PASSWORD:"root",$:function(aT){return document.getElementById(aT);},getServerURL:function(fm,
bM,bv,dL,dc){var el=fm+"://"+bM+(bv?":"+bv:"");if(dL&&dL.length>0){el+=dL;if(dc&&dc.length>0){el+=dc;}}return el;},getWebAppURL:
function(dL,dc){var is=dL||self.location.pathname;var jF=dc||jws.JWS_SERVER_SERVLET;return jws.getServerURL("https"===
self.location.protocol?"wss":"ws",self.location.hostname,self.location.port,is,jF);},getDefaultServerURL:function(){return(
this.getServerURL(jws.JWS_SERVER_SCHEMA,jws.JWS_SERVER_HOST,jws.JWS_SERVER_PORT,jws.JWS_SERVER_CONTEXT,jws.JWS_SERVER_SERVLET));},
getDefaultServerCometURL:function(){return this.getDefaultServerURL()+"Comet";},getDefaultSSLServerURL:function(){return(
this.getServerURL(jws.JWS_SERVER_SSL_SCHEMA,jws.JWS_SERVER_HOST,jws.JWS_SERVER_SSL_PORT,jws.JWS_SERVER_CONTEXT,
jws.JWS_SERVER_SERVLET));},getDefaultSSLServerCometURL:function(){return this.getDefaultSSLServerURL()+"Comet";},getAutoServerURL:
function(){var iL=location.protocol&&location.protocol.indexOf("https")>=0;return(this.getServerURL((iL?jws.JWS_SERVER_SSL_SCHEMA:
jws.JWS_SERVER_SCHEMA),jws.JWS_SERVER_HOST,(iL?jws.JWS_SERVER_SSL_PORT:jws.JWS_SERVER_PORT),jws.JWS_SERVER_CONTEXT,
jws.JWS_SERVER_SERVLET));},browserSupportsWebSockets:function(){return(window.WebSocket!==null&&window.WebSocket!==undefined);},
enableCometSupportForWebSockets:function(){window.WebSocket=XHRWebSocket;},kQ:function(){window.WebSocket=ka;},
browserSupportsNativeWebSockets:(function(){if(window.WEB_SOCKET_FORCE_FLASH){return false;}return(window.WebSocket!==null&&
window.WebSocket!==undefined);})(),browserSupportsJSON:function(){return(window.JSON!==null&&window.JSON!==undefined);},
browserSupportsNativeJSON:(function(){return(window.JSON!==null&&window.JSON!==undefined);})(),browserSupportsWebWorkers:(function()
{return(window.Worker!==null&&window.Worker!==undefined);})(),getOptions:function(ax,gx){ax=(ax?ax:{});if(gx){for(var dR in gx){if(
undefined===ax[dR]){ax[dR]=gx[dR];}}}return ax;},loadScript:function(dr,ax){if(!ax){ax={};}var gp=document.getElementsByTagName(
"head")[0];bi=document.createElement("script");bi.type="text/javascript";if(ax.id){bi.id=ax.id;}gp.appendChild(bi);if(ax.OnSuccess){
bi.onload=ax.OnSuccess;}if(ax.OnFailure){bi.onerror=ax.OnFailure;}bi.src=dr;},runAsThread:function(ax){if(!
this.browserSupportsWebWorkers){return{code: -1,msg:"Browser does not (yet) support WebWorkers."};}if(!ax){ax={};}var dv=null;
var dG=null;var dw=jws.SCRIPT_PATH+"jwsWorker.js";var bu=null;var bC=[];if(ax.OnMessage&&"function"===typeof ax.OnMessage){dv=
ax.OnMessage;}if(ax.OnError&&"function"===typeof ax.OnError){dG=ax.OnError;}if(ax.file&&"String"===typeof ax.file){dw=ax.file;}if(
ax.method&&"function"===typeof ax.method){bu=ax.method;}if(ax.args){bC=ax.args;}var dJ=this;if(!jws.worker){jws.worker=new Worker(
dw);jws.worker.onmessage=function(cz){if(null!==dv){dv.call(dJ,{data:cz.data});}};jws.worker.onerror=function(cz){if(null!==dG){
dG.call(dJ,{message:cz.message});}};}jws.worker.postMessage({method:bu.toString(),args:bC});return{code:0,msg:"ok",worker:
jws.worker};},SCRIPT_PATH:(function(){var bf=document.getElementsByTagName("script");for(var db=0,dB=bf.length;db<dB;db++){var bi=
bf[db];var ad=bi.src;if(!ad){ad=bi.getAttribute("src");}if(ad){var bg=ad.lastIndexOf("jWebSocket");if(bg>0){return ad.substr(0,bg);}
}}return null;})(),isIE:(function(){var aS=navigator.userAgent;var bJ=aS.indexOf("MSIE");return(bJ>=0);})(),getBrowserName:function(
){return this.eJ;},getBrowserVersion:function(){return this.fd;},getBrowserVersionString:function(){return this.dO;},isFirefox:
function(){return this.fh;},isOpera:function(){return this.eg;},isChrome:function(){return this.fL;},isIExplorer:function(){
return this.dZ;},isIE_LE6:function(){return(this.isIExplorer()&&this.getBrowserVersion()<7);},isIE_LE7:function(){return(
this.isIExplorer()&&this.getBrowserVersion()<8);},isIE_GE8:function(){return(this.isIExplorer()&&this.getBrowserVersion()>=8);},
isSafari:function(){return this.eo;},isNetscape:function(){return this.fj;},isPocketIE:function(){return this.hw;},console:{eZ:
false,fy:2,iY:512,ALL:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,FATAL:5,isDebugEnabled:function(){return(window.console&&jws.console.eZ&&
jws.console.fy<=jws.console.DEBUG);},isInfoEnabled:function(){return(window.console&&jws.console.eZ&&jws.console.fy<=
jws.console.INFO);},log:function(cW){if(window.console&&jws.console.eZ){console.log(cW);}},debug:function(cW){if(window.console&&
jws.console.eZ&&jws.console.fy<=jws.console.DEBUG){if(console.debug){console.debug(cW);}else{console.log("[debug]: "+cW);}}},info:
function(cW){if(window.console&&jws.console.eZ&&jws.console.fy<=jws.console.INFO){if(console.info){console.info(cW);}else{
console.log("[info]: "+cW);}}},warn:function(cW){if(window.console&&jws.console.eZ&&jws.console.fy<=jws.console.WARN){if(
console.warn){console.warn(cW);}else{console.log("[warn]: "+cW);}}},error:function(cW){if(window.console&&jws.console.eZ&&
jws.console.fy<=jws.console.ERROR){if(console.error){console.error(cW);}else{console.log("[error]: "+cW);}}},fatal:function(cW){if(
window.console&&jws.console.eZ&&jws.console.fy<=jws.console.FATAL){if(console.fatal){console.fatal(cW);}else{console.log(
"[fatal]: "+cW);}}},getMaxLogLineLen:function(){return jws.console.iY;},getLevel:function(){return jws.console.fy;},setLevel:
function(fo){jws.console.fy=fo;},isActive:function(){return jws.console.eZ;},setActive:function(eq){jws.console.eZ=eq;}}};(function(
){jws.eJ="unknown";jws.eT=jws.BT_UNKNOWN;jws.fd=undefined;jws.dZ=false;jws.fh=false;jws.fj=false;jws.eg=false;jws.eo=false;jws.fL=
false;var fN=navigator.userAgent;jws.fL=fN.indexOf("Chrome")>=0;if(jws.fL){jws.eT=jws.BT_CHROME;}else{jws.eo=fN.indexOf("Safari")>=
0;if(jws.eo){jws.eT=jws.BT_SAFARI;}else{jws.fj=fN.indexOf("Netscape")>=0;if(jws.fj){jws.eT=jws.BT_NETSCAPE;}else{jws.eg="Opera"===
navigator.appName;if(jws.eg){jws.eT=jws.BT_OPERA;}else{jws.hw="Microsoft Pocket Internet Explorer"===navigator.appName;if(jws.hw){
ws.eT=jws.BT_IEXPLORER;}else{jws.dZ="Microsoft Internet Explorer"===navigator.appName|| ! !fN.match(/Trident.*rv[ :]./);if(jws.dZ){
jws.eT=jws.BT_IEXPLORER;}else{jws.fh="Netscape"===navigator.appName;if(jws.fh){jws.eT=jws.BT_FIREFOX;}}}}}}}var p,db;var aK;var fi;
var cf;if(jws.dZ){jws.eJ=jws.BROWSER_NAMES[jws.BT_IEXPLORER];cf=fN.match(/MSIE.*/i);if(cf){aK=cf[0].substr(5);p=aK.indexOf(";");
jws.dO=p>0?aK.substr(0,p):aK;jws.fd=parseFloat(jws.dO);}else{cf=fN.match(/Trident.*rv[ :]./);if(cf){p=cf[0].indexOf(";");if(p>0){
jws.dO=cf[0].substr(0,p);}else{jws.dO="Trident";}cf=fN.match(/rv[ :].*/i);if(cf){p=cf[0].indexOf(")");jws.fd=parseFloat(p>=3?
cf[0].substr(3,p-3):cf[0].substr(3,4));}}}}else if(jws.fh){jws.eJ=jws.BROWSER_NAMES[jws.BT_FIREFOX];cf=fN.match(/Firefox\/.*/i);if(
cf){aK=cf[0].substr(8);p=aK.indexOf(" ");if(p>0){jws.dO=aK.substring(0,p);}else{jws.dO=aK;}fi=0;db=0;while(db<aK.length){if('.'===
aK.charAt(db)){fi++;}if(fi>=2){break;}db++;}aK=aK.substring(0,db);jws.fd=parseFloat(aK);}}else if(jws.fj){jws.eJ=
jws.BROWSER_NAMES[jws.BT_NETSCAPE];cf=fN.match(/Netscape\/.*/i);if(cf){aK=cf[0].substr(9);p=aK.indexOf(" ");if(p>0){jws.dO=
aK.substring(0,p);}else{jws.dO=aK;}fi=0;db=0;while(db<aK.length){if('.'===aK.charAt(db)){fi++;}if(fi>=2){break;}db++;}aK=
aK.substring(0,db);jws.fd=parseFloat(aK);}}else if(jws.eg){jws.eJ=jws.BROWSER_NAMES[jws.BT_OPERA];cf=fN.match(/Opera\/.*/i);if(cf){
aK=cf[0].substr(6);p=aK.indexOf(" ");jws.dO=p>0?aK.substr(0,p):aK;jws.fd=parseFloat(aK);cf=fN.match(/Version\/.*/i);aK=cf[0].substr(
8);if(cf){p=aK.indexOf(" ");jws.dO=(p>0?aK.substr(0,p):aK)+"/"+jws.dO;jws.fd=parseFloat(aK);}}}else if(jws.fL){jws.eJ=
jws.BROWSER_NAMES[jws.BT_CHROME];cf=fN.match(/Chrome\/.*/i);if(cf){aK=cf[0].substr(7);p=aK.indexOf(" ");jws.dO=p>0?aK.substr(0,p):
aK;jws.fd=parseFloat(aK);}}else if(jws.eo){jws.eJ=jws.BROWSER_NAMES[jws.BT_SAFARI];cf=fN.match(/Version\/.*/i);if(cf){aK=
cf[0].substr(8);p=aK.indexOf(" ");jws.dO=p>0?aK.substr(0,p):aK;fi=0;db=0;while(db<aK.length){if('.'===aK.charAt(db)){fi++;}if(fi>=2)
{break;}db++;}aK=aK.substring(0,db);jws.fd=parseFloat(aK);cf=fN.match(/Safari\/.*/i);if(cf){aK="."+cf[0].substr(7);p=aK.indexOf(" ")
;jws.dO+=p>0?aK.substr(0,p):aK;}}}}());jws.events={addEventListener:(jws.isIE?function(as,cz,aA){as.attachEvent("on"+cz,aA);}:
function(as,cz,aA){as.addEventListener(cz,aA,false);}),removeEventListener:(jws.isIE?function(as,cz,aA){as.detachEvent("on"+cz,aA);}
:function(as,cz,aA){as.removeEventListener(cz,aA,false);}),getTarget:(jws.isIE?function(cz){return cz.srcElement;}:function(cz){
return cz.target;}),preventDefault:(jws.isIE?function(cz){cz=window.event;if(cz){cz.returnValue=false;}}:function(cz){
return cz.preventDefault();}),stopEvent:(jws.isIE?function(cz){if(cz&&cz.preventDefault){return cz.preventDefault();}}:function(cz){
return cz.stopPropagation();})};
/**
 * Copyright (c) 2012 Florian H., https://github.com/js-coder
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/
!function(document,undefined){var cookie=function(){return cookie.get.apply(cookie,arguments);};var utils=cookie.utils={isArray:Array.isArray||function(value){return Object.prototype.toString.call(value)==='[object Array]';},isPlainObject:function(value){return! !value&&Object.prototype.toString.call(value)==='[object Object]';},toArray:function(value){return Array.prototype.slice.call(value);},getKeys:Object.keys||function(obj){var keys=[],key='';for(key in obj){if(obj.hasOwnProperty(key))keys.push(key);}return keys;},escape:function(value){return String(value).replace(/[,;"\\=\s%]/g,function(character){return encodeURIComponent(character);});},retrieve:function(value,fallback){return value==null?fallback:value;}};cookie.defaults={};cookie.expiresMultiplier=60*60*24;cookie.set=function(key,value,options){if(utils.isPlainObject(key)){for(var k in key){if(key.hasOwnProperty(k))this.set(k,key[k],value);}}else{options=utils.isPlainObject(options)?options:{expires:options};var expires=options.expires!==undefined?options.expires:(this.defaults.expires||''),expiresType=typeof(expires);if(expiresType==='string'&&expires!=='')expires=new Date(expires);else if(expiresType==='number')expires=new Date(+new Date+1000*this.expiresMultiplier*expires);if(expires!==''&&'toGMTString'in expires)expires=';expires='+expires.toGMTString();var path=options.path||this.defaults.path;path=path?';path='+path:'';var domain=options.domain||this.defaults.domain;domain=domain?';domain='+domain:'';var secure=options.secure||this.defaults.secure?';secure':'';document.cookie=utils.escape(key)+'='+utils.escape(value)+expires+path+domain+secure;}return this;};cookie.remove=function(keys){keys=utils.isArray(keys)?keys:utils.toArray(arguments);for(var i=0,l=keys.length;i<l;i++){this.set(keys[i],'',-1);}return this;};cookie.empty=function(){return this.remove(utils.getKeys(this.all()));};cookie.get=function(keys,fallback){fallback=fallback||undefined;var cookies=this.all();if(utils.isArray(keys)){var result={};for(var i=0,l=keys.length;i<l;i++){var value=keys[i];result[value]=utils.retrieve(cookies[value],fallback);}return result;}else return utils.retrieve(cookies[keys],fallback);};cookie.all=function(){if(document.cookie==='')return{};var cookies=document.cookie.split('; '),result={};for(var i=0,l=cookies.length;i<l;i++){var item=cookies[i].split('=');result[decodeURIComponent(item[0])]=decodeURIComponent(item[1]);}return result;};cookie.enabled=function(){if(navigator.cookieEnabled)return true;var ret=cookie.set('_','_').get('_')==='_';cookie.remove('_');return ret;};window.cookie=cookie;}(document);

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 * For full source please refer to: md5.js
 */
var hexcase=0;var b64pad="";function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));};function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)));};function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e);};function hex_hmac_md5(k,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));};function b64_hmac_md5(k,d){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));};function any_hmac_md5(k,d,e){return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);};function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";};function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8));};function rstr_hmac_md5(key,data){var bkey=rstr2binl(key);if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));};function rstr2hex(input){try{hexcase}catch(e){hexcase=0;}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F);}return output;};function rstr2b64(input){try{b64pad}catch(e){b64pad='';}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}return output;};function rstr2any(input,encoding){var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)quotient[quotient.length]=q;}remainders[j]=x;dividend=quotient;}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);return output;};function str2rstr_utf8(input){var output="";var i= -1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}if(x<=0x7F)output+=String.fromCharCode(x);else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}return output;};function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;};function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;};function rstr2binl(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++)output[i]=0;for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;};function binl2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;};function binl_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b= -271733879;var c= -1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return Array(a,b,c,d);};function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);};function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);};function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);};function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);};function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);};function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);};function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}
;if(!('lastIndexOf'in Array.prototype)){Array.prototype.lastIndexOf=function(iS,ef){if(ef===undefined){ef=this.length-1;}if(ef<0){
ef+=this.length;}if(ef>this.length-1){ef=this.length-1;}for(ef++;ef-- >0;){if(ef in this&&this[ef]===iS){return ef;}}return-1;};}
String.prototype.getBytes=function(){var hs=[];for(var cI=0;cI<this.length;++cI){hs.push(this.charCodeAt(cI));}return hs;};
jws.tools={lg:function(jH,lq,lc){lq=lq||'';lc=lc||512;var kl=atob(jH);var lh=[];for(var ja=0;ja<kl.length;ja+=lc){var jO=kl.slice(
ja,ja+lc);var kA=new Array(jO.length);for(var cI=0;cI<jO.length;cI++){kA[cI]=jO.charCodeAt(cI);}var kP=new kj(kA);lh.push(kP);}
var kC=new Blob(lh,{type:lq});return kC;},str2bytes:function(gL){var hs=[];for(var cI=0;cI<gL.length;cI++){hs.push(gL.charCodeAt(cI)
);}return hs;},bytes2str:function(gM){var gR="";for(var cI=0;cI<gM.length;cI++){gR+=String.fromCharCode(gM[cI]);}return gR;},
getUniqueInteger:function(){if(undefined===this.gg||2147483647===this.gg){this.gg=1;}return this.gg++;},zerofill:function(ay,am){
var bj=ay.toFixed(0);if(bj.length>am){bj=bj.substring(bj.length-am);}else{while(bj.length<am){bj="0"+bj;}}return bj;},parseQuery:
function(dr){var gc={};var iO=dr.split("?");if(1===iO.length){return gc;}var gH=iO[1].split(",");for(var cI in gH){var ir=
gH[cI].split("=");gc[ir[0]]=ir[1];}return gc;},calcMD5:function(gX){return(hex_md5(gX));},escapeSQL:function(hG){if(hG&&typeof ck===
"string"){}return hG;},date2ISO:function(du){var fJ= -du.getTimezoneOffset();var dE=Math.abs(fJ);var bj=du.getUTCFullYear()+"-"+
this.zerofill(du.getUTCMonth()+1,2)+"-"+this.zerofill(du.getUTCDate(),2)+"T"+this.zerofill(du.getUTCHours(),2)+":"+this.zerofill(
du.getUTCMinutes(),2)+":"+this.zerofill(du.getUTCSeconds(),2)+"."+this.zerofill(du.getUTCMilliseconds(),3)+"Z";return bj;},ISO2Date:
function(bp,bd){var dK=new Date();dK.setUTCFullYear(bp.substr(0,4));dK.setUTCMonth(bp.substr(5,2)-1);dK.setUTCDate(bp.substr(8,2));
dK.setUTCHours(bp.substr(11,2));dK.setUTCMinutes(bp.substr(14,2));dK.setUTCSeconds(bp.substr(17,2));dK.setUTCMilliseconds(bp.substr(
20,3));return dK;},date2String:function(du){var bj=du.getUTCFullYear()+this.zerofill(du.getUTCMonth()+1,2)+this.zerofill(
du.getUTCDate(),2)+this.zerofill(du.getUTCHours(),2)+this.zerofill(du.getUTCMinutes(),2)+this.zerofill(du.getUTCSeconds(),2)+
this.zerofill(du.getUTCMilliseconds(),2);return bj;},string2Date:function(bp){var dK=new Date();dK.setUTCFullYear(bp.substr(0,4));
dK.setUTCMonth(bp.substr(4,2)-1);dK.setUTCDate(bp.substr(6,2));dK.setUTCHours(bp.substr(8,2));dK.setUTCMinutes(bp.substr(10,2));
dK.setUTCSeconds(bp.substr(12,2));dK.setUTCMilliseconds(bp.substr(14,3));return dK;},generateSharedUTID:function(aR){var string=
JSON.stringify(aR);var chars=string.split('');chars.sort();return hex_md5("{"+chars.toString()+"}");},getType:function(ey){var dM=
ey;var bj=typeof dM;if("number"===bj){if((parseFloat(dM)===parseInt(dM))){bj="integer";}else{bj="double";}}else if(
Object.prototype.toString.call(dM)==="[object Array]"){bj="array";}else if(dM===null){bj="null";}return bj;},isArrayOf:function(fE,
bU){if(!Ext.isArray(fE)){return false;}for(var cI in fE){if(this.getType(fE[cI])!==bU){return false;}}return true;},setProperties:
function(ey,gl,gT){var gi=gT||"";var er=null;var eH=null;for(eH in gl){er="set"+eH.substr(0,1).toUpperCase()+eH.substr(1);if(
"function"===typeof(ey[er])){ey[er](gl[eH]);}else{ey[gi+eH]=gl[eH];}}return ey;},zip:function(gL,jj){if(!JSZip){throw new Error(
'JSZip library is missing. Class not found!');}var il=jj||false;var iH=new JSZip();iH.file("temp.zip",gL);var iI=iH.generate({
compression:"DEFLATE",base64:il});return iI;},unzip:function(gL,ic){if(!JSZip){throw new Error(
'JSZip library is missing. Class not found!');}var il=ic||false;var iH=new JSZip(gL,{base64:il});var dw=iH.file("temp.zip");
return dw.asBinary();},intersect:function(js,jb){var hV=[];if(js&&jb){for(var cI=0;cI<js.length;cI++){if(-1<jb.lastIndexOf(js[cI])){
hV.push(js[cI]);}}}return hV;},clone:function(ey){if(null===ey||"object"!==typeof(cQ)){return ey;}if("function"===typeof(
ey["clone"])){return ey.clone();}if(ey instanceof Date){return new Date(ey.getTime());}var cloneArray=function(fE){var fq=fE.length;
var hD=[];if(fq>0){for(var cI=0;cI<fq;cI++){hD[cI]=jws.tools.clone(fE[cI]);}}return hD;};var dH=new ey.constructor();for(
var dX in ey){var dM=ey[dX];if(dM instanceof Array)dH[dX]=cloneArray(dM);else{dH[dX]=jws.tools.clone(dM);}}return dH;},createUUID:
function(){var dT=[];var je="0123456789abcdef";for(var db=0;db<36;db++){dT[db]=je.substr(Math.floor(Math.random()*0x10),1);}dT[14]=
"4";dT[19]=je.substr((dT[19]&0x3)|0x8,1);dT[8]=dT[13]=dT[18]=dT[23]="-";var iC=dT.join("");return iC;}};if(!
jws.browserSupportsNativeWebSockets){
	// --- original code, please refer to swfobject.js in folder flash-bridge ---
	// SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	// released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
	var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
	if(swfobject.hasFlashPlayerVersion("10.0.0")){(function(){var bf=document.getElementsByTagName("script");for(var db=0,dB=bf.length;
db<dB;db++){var bi=bf[db];var ad=bi.src;if(!ad){ad=bi.getAttribute("src");}if(ad){var bg=ad.lastIndexOf("jWebSocket_Bundle_min.js");
if(bg<0){bg=ad.lastIndexOf("jWebSocket_Bundle.js");}if(bg<0){bg=ad.lastIndexOf("jWebSocket.js");}if(bg>0){
window.WEB_SOCKET_SWF_LOCATION=ad.substr(0,bg)+"flash-bridge/WebSocketMain.swf";jws.JWS_FLASHBRIDGE=window.WEB_SOCKET_SWF_LOCATION;
break;}}}})();if(window.WEB_SOCKET_SWF_LOCATION){
			// --- web_socket.js (minified) ---
			// Copyright: Hiroshi Ichikawa, http://gimite.net/en/, https://github.com/gimite/web-socket-js
			// License: New BSD License
			// Reference: http://dev.w3.org/html5/websockets/
			// Reference: http://tools.ietf.org/html/rfc6455
			// Full sources codes provided in web_socket.js in folder flash-bridge
			(function(){if(window.WEB_SOCKET_FORCE_FLASH){}else if(window.WebSocket){return;}else if(window.MozWebSocket){window.WebSocket=MozWebSocket;return;}var logger;if(window.WEB_SOCKET_LOGGER){logger=WEB_SOCKET_LOGGER;}else if(window.console&&window.console.log&&window.console.error){logger=window.console;}else{logger={log:function(){},error:function(){}};}if(swfobject.getFlashPlayerVersion().major<10){logger.error("Flash Player >= 10.0.0 is required.");return;}if(location.protocol=="file:"){logger.error("WARNING: web-socket-js doesn't work in file:///... URL "+"unless you set Flash Security Settings properly. "+"Open the page via Web server i.e. http://...");}window.WebSocket=function(url,protocols,proxyHost,proxyPort,headers){var self=this;self.__id=WebSocket.__nextId++;WebSocket.__instances[self.__id]=self;self.readyState=WebSocket.CONNECTING;self.bufferedAmount=0;self.__events={};if(!protocols){protocols=[];}else if(typeof protocols=="string"){protocols=[protocols];}self.__createTask=setTimeout(function(){WebSocket.__addTask(function(){self.__createTask=null;WebSocket.__flash.create(self.__id,url,protocols,proxyHost||null,proxyPort||0,headers||null);});},0);};WebSocket.prototype.send=function(data){if(this.readyState==WebSocket.CONNECTING){throw "INVALID_STATE_ERR: Web Socket connection has not been established";}var result=WebSocket.__flash.send(this.__id,encodeURIComponent(data));if(result<0){return true;}else{this.bufferedAmount+=result;return false;}};WebSocket.prototype.close=function(){if(this.__createTask){clearTimeout(this.__createTask);this.__createTask=null;this.readyState=WebSocket.CLOSED;return;}if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING){return;}this.readyState=WebSocket.CLOSING;WebSocket.__flash.close(this.__id);};WebSocket.prototype.addEventListener=function(type,listener,useCapture){if(!(type in this.__events)){this.__events[type]=[];}this.__events[type].push(listener);};WebSocket.prototype.removeEventListener=function(type,listener,useCapture){if(!(type in this.__events))return;var events=this.__events[type];for(var i=events.length-1;i>=0;--i){if(events[i]===listener){events.splice(i,1);break;}}};WebSocket.prototype.dispatchEvent=function(event){var events=this.__events[event.type]||[];for(var i=0;i<events.length;++i){events[i](event);}var handler=this["on"+event.type];if(handler)handler.apply(this,[event]);};WebSocket.prototype.__handleEvent=function(flashEvent){if("readyState"in flashEvent){this.readyState=flashEvent.readyState;}if("protocol"in flashEvent){this.protocol=flashEvent.protocol;}var jsEvent;if(flashEvent.type=="open"||flashEvent.type=="error"){jsEvent=this.__createSimpleEvent(flashEvent.type);}else if(flashEvent.type=="close"){jsEvent=this.__createSimpleEvent("close");jsEvent.wasClean=flashEvent.wasClean?true:false;jsEvent.code=flashEvent.code;jsEvent.reason=flashEvent.reason;}else if(flashEvent.type=="message"){var data=decodeURIComponent(flashEvent.message);jsEvent=this.__createMessageEvent("message",data);}else{throw "unknown event type: "+flashEvent.type;}this.dispatchEvent(jsEvent);};WebSocket.prototype.__createSimpleEvent=function(type){if(document.createEvent&&window.Event){var event=document.createEvent("Event");event.initEvent(type,false,false);return event;}else{return{type:type,bubbles:false,cancelable:false};}};WebSocket.prototype.__createMessageEvent=function(type,data){if(document.createEvent&&window.MessageEvent&& !window.opera){var event=document.createEvent("MessageEvent");if(event.initMessageEvent){event.initMessageEvent("message",false,false,data,null,null,window,null);}else if(event.initEvent){var event=new MessageEvent('message',{'view':window,'bubbles':false,'cancelable':false,'data':data});}return event;}else{return{type:type,data:data,bubbles:false,cancelable:false};}};WebSocket.CONNECTING=0;WebSocket.OPEN=1;WebSocket.CLOSING=2;WebSocket.CLOSED=3;WebSocket.__isFlashImplementation=true;WebSocket.__initialized=false;WebSocket.__flash=null;WebSocket.__instances={};WebSocket.__tasks=[];WebSocket.__nextId=0;WebSocket.loadFlashPolicyFile=function(url){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(url);});};WebSocket.__initialize=function(){if(WebSocket.__initialized)return;WebSocket.__initialized=true;if(WebSocket.__swfLocation){window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation;}if(!window.WEB_SOCKET_SWF_LOCATION){logger.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");return;}if(!window.WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR&& !WEB_SOCKET_SWF_LOCATION.match(/(^|\/)WebSocketMainInsecure\.swf(\?.*)?$/)&&WEB_SOCKET_SWF_LOCATION.match(/^\w+:\/\/([^\/]+)/)){var swfHost=RegExp.$1;if(location.host!=swfHost){logger.error("[WebSocket] You must host HTML and WebSocketMain.swf in the same host "+"('"+location.host+"' != '"+swfHost+"'). "+"See also 'How to host HTML file and SWF file in different domains' section "+"in README.md. If you use WebSocketMainInsecure.swf, you can suppress this message "+"by WEB_SOCKET_SUPPRESS_CROSS_DOMAIN_SWF_ERROR = true;");}}var container=document.createElement("div");container.id="webSocketContainer";container.style.position="absolute";if(WebSocket.__isFlashLite()){container.style.left="0px";container.style.top="0px";}else{container.style.left="-100px";container.style.top="-100px";}var holder=document.createElement("div");holder.id="webSocketFlash";container.appendChild(holder);document.body.appendChild(container);swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:true,swliveconnect:true,allowScriptAccess:"always"},null,function(e){if(!e.success){logger.error("[WebSocket] swfobject.embedSWF failed");}});};WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash");WebSocket.__flash.setCallerUrl(location.href);WebSocket.__flash.setDebug(! !window.WEB_SOCKET_DEBUG);for(var i=0;i<WebSocket.__tasks.length;++i){WebSocket.__tasks[i]();}WebSocket.__tasks=[];},0);};WebSocket.__onFlashEvent=function(){setTimeout(function(){try{var events=WebSocket.__flash.receiveEvents();for(var i=0;i<events.length;++i){WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);}}catch(e){logger.error(e);}},0);return true;};WebSocket.__log=function(message){logger.log(decodeURIComponent(message));};WebSocket.__error=function(message){logger.error(decodeURIComponent(message));};WebSocket.__addTask=function(task){if(WebSocket.__flash){task();}else{WebSocket.__tasks.push(task);}};WebSocket.__isFlashLite=function(){if(!window.navigator|| !window.navigator.mimeTypes){return false;}var mimeType=window.navigator.mimeTypes["application/x-shockwave-flash"];if(!mimeType|| !mimeType.enabledPlugin|| !mimeType.enabledPlugin.filename){return false;}return mimeType.enabledPlugin.filename.match(/flashlite/i)?true:false;};if(!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION){swfobject.addDomLoadEvent(function(){WebSocket.__initialize();});}})();
			}}else{WebSocket=null;}}jws.flashBridgeVer="n/a";if(window.swfobject){var fs=swfobject.getFlashPlayerVersion();
jws.flashBridgeVer=fs.major+"."+fs.minor+"."+fs.release;}if(!jws.browserSupportsNativeJSON){
	// This code is public domain
	// Please refer to http://json.org/js
	if(!this.JSON){this.JSON={};}(function(){function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
	}
//	Base64 encode / decode
//  http://www.webtoolkit.info/
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}output=output+this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}if(enc4!=64){output=output+String.fromCharCode(chr3);}}output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}return string;}}
;jws.oop={};jws.oop.declareClass=function(aI,aU,ab,aM){var aG=self[aI];if(!aG){self[aI]={};}var dH=function(){if(this.create){
this.create.apply(this,arguments);var jl=this.constructor;if(jl.cx){for(var db=0;db<jl.cx.length;db++){var cS=jl.cx[db];if(
cS.JWS_NS){this[cS.JWS_NS]={};for(bc in cS){if("function"===typeof(cS[bc])){var iw=this;var jt=
"lFunc = function() { return lPlugIn."+bc+".apply( iw, arguments ); }";this[cS.JWS_NS][bc]=eval(jt);}}}}}}};aG[aU]=dH;var bc;for(
bc in aM){dH.prototype[bc]=aM[bc];}if(null!==ab){if(!ab.descendants){ab.descendants=[];}ab.descendants.push(dH);for(
bc in ab.prototype){var au=ab.prototype[bc];if(typeof au==="function"){if(dH.prototype[bc]){dH.prototype[bc].inherited=au;}else{
dH.prototype[bc]=au;}dH.prototype[bc].superClass=ab;}}}};jws.oop.addPlugIn=function(dz,ap,ax){var bc;if(!dz.cx){dz.cx=[];}
dz.cx.push(ap);for(bc in ap){if(!dz.prototype[bc]){dz.prototype[bc]=ap[bc];}}if(dz.descendants){for(var db=0,dB=
dz.descendants.length;db<dB;db++){jws.oop.addPlugIn(dz.descendants[db],ap,ax);}}};jws.oop.declareClass("jws","jWebSocketBaseClient",
null,{registerFilters:function(){},create:function(ax){if(ax&&ax.reliabilityOptions){this.ac=ax.reliabilityOptions;}if(!this.ac){
this.ac=jws.RO_OFF;}if(!jws.browserSupportsWebSockets()){if(ax.OnWebSocketNotSupported&&"function"==
typeof ax.OnWebSocketNotSupported){ax.OnWebSocketNotSupported();}}},processOpened:function(cz){},processPacket:function(cz){
return cz;},processClosed:function(cz){},open:function(dr,ax){if(!ax){ax={};}var iV=ax['wsClass']||self.WebSocket;if(iV){if(
self.WebSocket.__isFlashImplementation){var dP="JWSSESSIONID";var ip="sessionCookieName=";var lA=dr.indexOf(ip);if(lA> -1){var lB=
dr.indexOf(",",lA);if(lB> -1){dP=dr.substr(lA+dP.length,lB);}else{dP=dr.substr(lA);}}var iQ=cookie.get(dP,jws.tools.createUUID());
cookie.set(dP,iQ);}if(!this.dD||this.dD.readyState>2){var dJ=this;var dM=null;var dI=jws.WS_SUBPROT_JSON;if(ax.subProtocol){dI=
ax.subProtocol;}if(ax.reliabilityOptions){this.ac=ax.reliabilityOptions;}if(this.ac){this.ac.isExplicitClose=false;}if(
jws.RECONNECTING!==this.fI){this.fI=jws.CONNECTING;}if(ax.OnOpenTimeout&&"function"===typeof ax.OnOpenTimeout&&ax.openTimeout){
this.hF=ax.openTimeout;this.eW=setTimeout(function(){dJ.hF=null;var aR={};ax.OnOpenTimeout(aR);},this.hF);}this.dD=new iV(dr,dI);
this.hp=dr;this.gQ=dI;this.dD.onopen=function(cz){if(jws.console.isDebugEnabled()){jws.console.debug("[onopen]: "+JSON.stringify(cz)
);}dJ.he={};dJ.en={};dJ.fB={};if(dJ.eW){clearTimeout(dJ.eW);dJ.eW=null;}dJ.fI=jws.OPEN;dJ.ho=cz;};this.dD.onmessage=function(cz){if(
("undefined"!==typeof Blob&&cz.data instanceof Blob)||("undefined"!==typeof ArrayBuffer&&cz.data instanceof ArrayBuffer)){if(
ax.OnMessage){ax.OnMessage(cz,dM,dJ);}return;}var dg=cz.data;try{var ij=JSON.parse(dg);if(ij["jwsWrappedMsg"]){if("message"===
ij.type){var aJ=ij.msgId;if(ij.isAckRequired){dJ.sendStream(JSON.stringify({"jwsWrappedMsg":true,name:"ack",data:aJ,type:"info"}));}
if(ij.isFragment){if(undefined===dJ.he[ij.fragmentationId]){dJ.he[ij.fragmentationId]=ij.data;}else{dJ.he[ij.fragmentationId]+=
ij.data;}if(ij.isLastFragment){dg=dJ.he[ij.fragmentationId];delete dJ.he[ij.fragmentationId];}else{return;}}else{dg=ij.data;}}
else if("info"===ij.type){if("ack"===ij.name){clearTimeout(dJ.fB[ij.data]);if(dJ.en[ij.data]){dJ.en[ij.data].OnSuccess();
delete dJ.en[ij.data];delete dJ.fB[ij.data];}return;}else if("maxFrameSize"===ij.name){dJ.ee=ij.data;jws.events.stopEvent(cz);if(
jws.console.isDebugEnabled()){jws.console.debug("Maximum frame size for connection is: "+dJ.ee);}dM=dJ.processOpened(cz);if(
ax.OnOpen){ax.OnOpen(cz,dM,dJ);}dJ.processQueue();return;}}}}catch(jx){}if(jws.console.isDebugEnabled()){var gv=
jws.console.getMaxLogLineLen();if(gv>0&&dg.length>gv){jws.console.debug("[onmessage]: "+dg.substr(0,gv)+"...");}else{
jws.console.debug("[onmessage]: "+dg);}}dM=dJ.processPacket(dg);try{if(this.iX){for(var db=0,cF=this.iX.length;db<cF;db++){if(
"function"===typeof this.iX[db]["filterStreamIn"]){this.iX[db]["filterStreamIn"](dM);}}}if(ax.OnMessage){ax.OnMessage(cz,dM,dJ);}}
catch(dQ){jws.console.error("[onmessage]: Exception: "+dQ.message);}};this.dD.onclose=function(cz){if(jws.console.isDebugEnabled()){
jws.console.debug("[onclose]: "+JSON.stringify(cz));}if(dJ.eW){clearTimeout(dJ.eW);dJ.eW=null;}dJ.fI=jws.CLOSED;delete dJ.ee;if(
dJ.az){clearTimeout(dJ.az);delete dJ.az;}dM=dJ.processClosed(cz);if(ax.OnClose){ax.OnClose(cz,dM,dJ);}dJ.dD=null;if(dJ.ac&&
dJ.ac.autoReconnect&& !dJ.ac.isExplicitClose){dJ.fI=jws.RECONNECTING;dJ.fu=setTimeout(function(){if(ax.OnReconnecting){
ax.OnReconnecting(cz,dM,dJ);}dJ.open(dJ.hp,ax);},dJ.ac.reconnectDelay);}};}else{throw new Error("Already connected!");}}else{
throw new Error("WebSockets not supported by web browser!");}},connect:function(dr,ax){return this.open(dr,ax);},processQueue:
function(){if(this.ej){var bj=this.checkConnected();if(0===bj.code){var cE;while(this.ej.length>0){cE=this.ej.shift();this.dD.send(
cE.packet);}}}},queuePacket:function(fW,ax){if(!this.ej){this.ej=[];}this.ej.push({packet:fW,options:ax});},sendStream:function(aw){
if(aw.length>this.ee){throw new Error("Data packet discarded. The packet size "+
"exceeds the max frame size supported by the client!");}if(this.isOpened()){try{if(this.iX){for(var db=0,cF=this.iX.length;db<cF;
db++){if("function"===typeof this.iX[db]["filterStreamOut"]){this.iX[db]["filterStreamOut"](aw);}}}this.dD.send(aw);}catch(dQ){
jws.console.error("[sendStream]: Exception on send: "+dQ.message);}}else{if(this.isWriteable()){this.queuePacket(aw,null);}else{
throw new Error("Not connected");}}},sendStreamInTransaction:function(aw,aA,eu){var aJ=""+jws.tools.getUniqueInteger();var dJ=this;
try{if(undefined===eu){eu=this.ee;}else if(eu<0||eu>this.ee){throw new Error("Invalid 'fragment size' argument. "+
"Expected value: fragment_size > 0 && fragment_size <= max_frame_size");}if(typeof(aw)!=="string"||aw.length===0){throw new Error(
"Invalid value for argument 'data'!");}if(typeof(aA)!=="object"){throw new Error("Invalid value for argument 'listener'!");}if(
typeof(aA["getTimeout"])!=="function"){throw new Error("Missing 'getTimeout' method on argument 'listener'!");}if(typeof(
aA["OnSuccess"])!=="function"){throw new Error("Missing 'OnSuccess' method on argument 'listener'!");}if(typeof(aA["OnTimeout"])!==
"function"){throw new Error("Missing 'OnTimeout' method on argument 'listener'!");}if(typeof(aA["OnFailure"])!=="function"){
throw new Error("Missing 'OnFailure' method on argument 'listener'!");}if(eu<this.ee&&eu<aw.length){var hf=false;var hq=""+
jws.tools.getUniqueInteger();var iZ=aw.substr(0,eu);this.sendMessage({isFragment:true,fragmentationId:hq,type:'message',
isLastFragment:hf,data:iZ,msgId:aJ},{fD:new Date().getTime(),eD:0,getTimeout:function(){var aj=this.fD+aA.getTimeout()-new Date()
.getTime();if(aj<0){aj=0;}return aj;},OnTimeout:function(){aA.OnTimeout();},OnSuccess:function(){this.eD+=eu;if(this.eD>=aw.length){
aA.OnSuccess();}else{var fq=(eu+this.eD<=aw.length)?eu:aw.length-this.eD;var eP=aw.substr(this.eD,fq);var hf=(fq+this.eD===
aw.length)?true:false;dJ.sendMessage({isFragment:true,fragmentationId:hq,type:'message',isLastFragment:hf,data:eP,msgId:""+
jws.tools.getUniqueInteger()},this);}},OnFailure:function(dQ){aA.OnFailure(dQ);}});return;}this.sendMessage({type:'message',data:aw,
msgId:aJ},aA);}catch(dQ){aA.OnFailure(dQ);}},sendMessage:function(cJ,aA){try{var dJ=this;if(null!==aA){cJ.isAckRequired=true;
cJ["jwsWrappedMsg"]=true;var aJ=cJ.msgId;this.en[aJ]=aA;var fO=setTimeout(function(){if(dJ.en[aJ]){dJ.en[aJ].OnTimeout();
delete dJ.en[aJ];delete dJ.fB[aJ];}},aA.getTimeout());this.fB[aJ]=fO;}this.sendStream(JSON.stringify(cJ));}catch(dQ){
delete this.en[aJ];clearTimeout(this.fB[aJ]);delete this.fB[aJ];aA.OnFailure(dQ);}},abortReconnect:function(){if(this.fu){
clearTimeout(this.fu);this.fu=null;return true;}return false;},setAutoReconnect:function(hB){if(hB&&"boolean"===typeof(eb)){
this.ac.autoReconnect=hB;}else{this.ac.autoReconnect=false;}if(!(this.ac&&this.ac.autoReconnect)){abortReconnect();}},
setReliabilityOptions:function(ax){this.ac=ax;if(this.ac){if(this.ac.autoReconnect){}else{this.abortReconnect();}}},
getReliabilityOptions:function(){return this.ac;},getOutQueue:function(){return this.ej;},resetSendQueue:function(){delete this.ej;}
,isOpened:function(){return(undefined!==this.dD&&null!==this.dD&&jws.OPEN===this.dD.readyState);},getURL:function(){return this.hp;}
,getSubProt:function(){return this.gQ;},isConnected:function(){return(this.isOpened());},forceClose:function(ax){var aZ=(ax||{})
.fireClose||false;if(this.ac){this.ac.isExplicitClose=true;}if(this.dD){if(this.dD.readyState===jws.OPEN||this.dD.readyState===
jws.CONNECTING){this.dD.close();this.processClosed();}}if(ax){if(aZ&&this.dD.onclose){var aW={};this.dD.onclose(aW);}}this.dD=null;}
,close:function(ax){var aj=0;if(ax){if(ax.timeout){aj=ax.timeout;}}if(this.dD&&1===this.dD.readyState){if(aj<=0){this.forceClose(ax)
;}else{var dJ=this;this.az=setTimeout(function(){dJ.forceClose(ax);},aj);}}else{this.dD=null;throw new Error("Not connected");}},
disconnect:function(ax){return this.close(ax);},addListener:function(cX){if(!this.cO){this.cO=[];}this.cO.push(cX);},removeListener:
function(cX){if(this.cO){for(var db=0,dB=this.cO;db<dB;db++){if(cX===this.cO[db]){this.cO.splice(db,1);}}}},addFilter:function(jn){
if(!this.iX){this.iX=[];}this.iX.push(jn);},removeFilter:function(jn){if(this.iX){for(var db=0,dB=this.iX;db<dB;db++){if(jn===
this.iX[db]){this.iX.splice(db,1);}}}},addPlugIn:function(ap,aT){if(!this.cx){this.cx=[];}this.cx.push(ap);if(!aT){aT=ap.ID;}if(aT){
ap.conn=this;}},setParam:function(ae,ck){if(!this.dS){this.dS={};}var gf=this.getParam(ae);this.dS[ae]=ck;return gf;},getParam:
function(ae){if(!this.dS){return null;}var bj=this.dS[ae];if(bj===undefined){return null;}return bj;},setParamNS:function(fC,ae,ck){
return this.setParam(fC+"."+ae,ck);},getParamNS:function(fC,ae){return this.getParam(fC+"."+ae);},clearParams:function(){if(this.dS)
{delete this.dS;}}});jws.oop.declareClass("jws","jWebSocketTokenClient",jws.jWebSocketBaseClient,{registerFilters:function(){
var self=this;if(this.iX&&this.iX.length>0){this.iX=[];}this.addFilter({filterTokenOut:function(aR){var ji=aR.enc;if(!ji){return;}
for(var hT in ji){var hS=ji[hT];var dM=aR[hT];if(0>self.iR.lastIndexOf(hS)){jws.console.error(
"[process encoding]: Invalid encoding format '"+hS+" 'received. Token cannot be sent!");throw new Error("Invalid encoding format '"+
hS+" 'received (not supported). Token cannot be sent!");}else if("zipBase64"===hS){aR[hT]=jws.tools.zip(dM,true);}else if(
"base64"===hS){aR[hT]=Base64.encode(dM);}}},filterTokenIn:function(aR){var ji=aR.enc;if(!ji){return;}for(var hT in ji){var hS=
ji[hT];var dM=aR[hT];if(aR["isBinary"]&&"data"===hT){continue;}if(0>self.iR.lastIndexOf(hS)){jws.console.error(
"[process decoding]: Invalid encoding format '"+hS+"' received. Token cannot be processed!");throw new Error(
"Invalid encoding format '"+hS+" 'received  (not supported). Token cannot be processed!");}else if("zipBase64"===hS){aR[hT]=
jws.tools.unzip(dM,true);}else if("base64"===hS){aR[hT]=Base64.decode(dM);}}}});},processOpened:function(cz){this.iR=["base64",
"zipBase64"];this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"header",clientType:"browser",clientName:jws.getBrowserName(),
clientVersion:jws.getBrowserVersionString(),clientInfo:navigator.userAgent,jwsType:"javascript",jwsVersion:jws.VERSION,jwsInfo:
jws.browserSupportsNativeWebSockets?"native":"flash "+jws.flashBridgeVer,encodingFormats:this.iR});},create:function(ax){
arguments.callee.inherited.call(this,ax);this.ao={};},getId:function(){return this.ai;},checkCallbacks:function(aR){var bc="utid"+
aR.utid;var aH=this.ao[bc];if(aH){if(aH.hz){clearTimeout(aH.hz);}var bC=aH.args;var ft=aH.callback;if(ft.OnResponse){
ft.OnResponse.call(this,aR,bC);}if(ft.OnSuccess&&0===aR.code){ft.OnSuccess.call(this,aR,bC);}if(ft.OnFailure&&undefined!==aR.code&&
0!==aR.code){ft.OnFailure.call(this,aR,bC);}delete this.ao[bc];}},createDefaultResult:function(){return{code:0,msg:"Ok",localeKey:
"jws.jsc.res.Ok",args:null,tid:jws.CUR_TOKEN_ID};},checkConnected:function(){var bj=this.createDefaultResult();if(!this.isOpened()){
bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected!";}return bj;},isWriteable:function(){return(
this.isOpened()||this.fI===jws.RECONNECTING);},checkWriteable:function(){var bj=this.createDefaultResult();if(!this.isWriteable()){
bj.code= -1;bj.localeKey="jws.jsc.res.notWriteable";bj.msg="Not writable.";}return bj;},checkLoggedIn:function(){var bj=
this.checkConnected();if(0===bj.code&& !this.isLoggedIn()){bj.code= -1;bj.localeKey="jws.jsc.res.notLoggedIn";bj.msg=
"Not logged in.";}return bj;},resultToString:function(co){return((co&&"object"===typeof co&&co.msg?co.msg:"invalid response token"))
;},tokenToStream:function(aR){throw new Error("tokenToStream needs to be overwritten in descendant classes");},streamToToken:
function(de){throw new Error("streamToToken needs to be overwritten in descendant classes");},notifyPlugInsOpened:function(){var cg=
{sourceId:this.ai};var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(
cS.processOpened){cS.processOpened.call(this,cg);}}}},notifyPlugInsClosed:function(){var cg={sourceId:this.ai};var di=
jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processClosed){cS.processClosed.call(
this,cg);}}}this.dD=null;this.af=null;},processPacket:function(fW){var cg=this.streamToToken(fW);try{if(this.iX){for(var db=0,cF=
this.iX.length;db<cF;db++){if(typeof this.iX[db]["filterTokenIn"]==="function"){this.iX[db]["filterTokenIn"](cg);}}}
this.processToken(cg);return cg;}catch(dQ){jws.console.error("[processPacket]: Exception: "+dQ.message);}},processToken:function(aR)
{var aG=aR['ns'];if(undefined!==aG&&1===aG.indexOf("org.jWebSocket")){aR.ns="org.jwebsocket"+aG.substring(15);}else if(null===aG){
aR.ns="org.jwebsocket.plugins.system";}if(jws.NS_SYSTEM===aR.ns){if(aR.type==="welcome"){this.ai=aR.sourceId;this.af=aR.username;
this.iR=jws.tools.intersect(this.iR,aR.encodingFormats);this.registerFilters();this.notifyPlugInsOpened();if(this.cC){this.cC(aR);}}
else if(aR.type==="goodBye"){if(this.fw){this.fw(aR);}this.af=null;}else if(aR.type==="close"){this.close({timeout:0});}else if(
aR.type==="response"){if(aR.reqType==="login"||aR.reqType==="logon"){if(0===aR.code){this.af=aR.username;if("function"===
typeof this.gZ){this.gZ(aR);}}}else if(aR.reqType==="logout"||aR.reqType==="logoff"){if(0===aR.code){this.af=null;if("function"===
typeof this.hH)this.hH(aR);}}this.checkCallbacks(aR);}else if(aR.type==="event"){if(aR.name==="connect"){this.processConnected(aR);}
if(aR.name==="disconnect"){this.processDisconnected(aR);}}}else{this.checkCallbacks(aR);}var db,cF,di,cS;di=
jws.jWebSocketTokenClient.cx;if(di){for(db=0,cF=di.length;db<cF;db++){cS=di[db];if(cS.processToken){cS.processToken.call(this,aR);}}
}di=this.cx;if(di){for(db=0,cF=di.length;db<cF;db++){cS=di[db];if(cS.processToken){cS.processToken(aR);}}}if(this.eF){this.eF(aR);}
if(this.cO){for(db=0,cF=this.cO.length;db<cF;db++){this.cO[db](aR);}}},processClosed:function(cz){this.notifyPlugInsClosed();
this.ai=null;},processConnected:function(aR){var di=jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){
var cS=di[db];if(cS.processConnected){cS.processConnected.call(this,aR);}}}},processDisconnected:function(aR){var di=
jws.jWebSocketTokenClient.cx;if(di){for(var db=0,cF=di.length;db<cF;db++){var cS=di[db];if(cS.processDisconnected){
cS.processDisconnected.call(this,aR);}}}},__sendToken:function(jg,aR,ax,aA){var bj=this.checkWriteable();if(0===bj.code){try{if(
this.iX){for(var db=0,cF=this.iX.length;db<cF;db++){if("function"===typeof this.iX[db]["filterTokenOut"]){
this.iX[db]["filterTokenOut"](aR);}}}}catch(dQ){jws.console.error("[processPacket]: Exception: "+dQ.message);bj.code= -1;
bj.localeKey="jws.jsc.res.filterChainException";bj.msg=dQ.message;}}if(0===bj.code){var dA=false;var cB=this.ee;var aj=
jws.DEF_RESP_TIMEOUT;var hl=false;var bC=null;var df={OnResponse:null,OnSuccess:null,OnFailure:null,OnTimeout:null};var cU=false;if(
ax){if(ax.OnResponse){df.OnResponse=ax.OnResponse;cU=true;}if(ax.OnFailure){df.OnFailure=ax.OnFailure;cU=true;}if(ax.OnSuccess){
df.OnSuccess=ax.OnSuccess;cU=true;}if(ax.OnTimeout){df.OnTimeout=ax.OnTimeout;cU=true;}if(ax.args){bC=ax.args;}if(ax.timeout){aj=
ax.timeout;}if(ax.spawnThread){dA=ax.spawnThread;}if(ax.fragmentSize){cB=ax.fragmentSize;}if(ax.keepRequest){hl=true;}}
jws.CUR_TOKEN_ID++;if(cU){var dU=jws.CUR_TOKEN_ID;var cl="utid"+dU;var dJ=this;var aH={request:new Date().getTime(),callback:df,
args:bC,timeout:aj};if(hl){aH.request=aR;}this.ao[cl]=aH;aH.hz=setTimeout(function(){var df=aH.callback;delete dJ.ao[cl];if(
df.OnTimeout){df.OnTimeout.call(this,aR,{utid:dU,timeout:aj});}},aj);}if(dA){aR.spawnThread=true;}var aQ=this.tokenToStream(aR);if(
jg){if(jws.console.isDebugEnabled()){jws.console.debug("[sendToken]: Sending stream in transaction "+aQ+"...");}
this.sendStreamInTransaction(aQ,aA,cB);}else{if(jws.console.isDebugEnabled()){jws.console.debug("[sendToken]: Sending stream "+aQ+
"...");}this.sendStream(aQ);}}return bj;},sendToken:function(aR,ax){return this.__sendToken(false,aR,ax);},sendTokenInTransaction:
function(aR,ax,aA){if(!aA){aA={};}if(!aA["getTimeout"]){var aj=ax.timeout||jws.DEF_RESP_TIMEOUT;aA["getTimeout"]=function(){
return aj;};}if(!aA["OnTimeout"]){aA["OnTimeout"]=function(){};}if(!aA["OnSuccess"]){aA["OnSuccess"]=function(){};}if(!
aA["OnFailure"]){aA["OnFailure"]=function(){};}return this.__sendToken(true,aR,ax,aA);},sendChunkable:function(fn,ax,aA){try{if(
undefined===fn.maxFrameSize){fn.maxFrameSize=this.ee-jws.PACKET_TRANSACTION_MAX_BYTES_PREFIXED;}var iz=fn.getChunksIterator();if(!
iz.hasNext()){throw new Error("The chunks iterator is empty. No data to send!");}var ec=iz.next();if(!ec){throw new Error(
"Iterator returned null on 'next' method call!");}ec.ns=fn.ns;ec.type=fn.type;ec.isChunk=true;if(!iz.hasNext()){ec.isLastChunk=true;
}if(!ax){ax={};}ax.fragmentSize=fn.fragmentSize;if(!aA){aA={};}if(!aA["getTimeout"]){var aj=ax.timeout||jws.DEF_RESP_TIMEOUT;
aA["getTimeout"]=function(){return aj;};}if(!aA["OnTimeout"]){aA["OnTimeout"]=function(){};}if(!aA["OnSuccess"]){aA["OnSuccess"]=
function(){};}if(!aA["OnFailure"]){aA["OnFailure"]=function(){};}if(!aA["OnChunkDelivered"]){aA["OnChunkDelivered"]=function(){};}
this.sendTokenInTransaction(ec,ax,{hb:iz,eh:aA,fD:new Date().getTime(),dV:ec,ge:ec.ns,gb:ec.type,gs:ax,getTimeout:function(){var aj=
this.fD+this.eh.getTimeout()-new Date().getTime();if(aj<0){aj=0;}return aj;},OnTimeout:function(){this.eh.OnTimeout();},OnSuccess:
function(){this.OnChunkDelivered(this.dV);if(this.hb.hasNext()){try{this.dV=hN.next();if(!this.dV){throw new Error(
"Iterator returned null on 'next' method call!");}this.dV.ns=this.ge;this.dV.type=this.gb;this.dV.isChunk=true;if(!this.hb.hasNext()
){this.dV.isLastChunk=true;}if(ax.timeout){ax.timeout=this.fD+ax.timeout-new Date().getTime();if(ax.timeout<0){ax.timeout=0;}}
this.sendTokenInTransaction(this.dV,this.gs,this);}catch(dQ){this.eh.OnFailure(dQ);}}else{this.eh.OnSuccess();}},OnChunkDelivered:
function(hC){this.eh.OnChunkDelivered(hC);}});}catch(dQ){aA.OnFailure(dQ);}},getLastTokenId:function(){return jws.CUR_TOKEN_ID;},
getNextTokenId:function(){return jws.CUR_TOKEN_ID+1;},sendText:function(bb,aB){var bj=this.checkLoggedIn();if(0===bj.code){
this.sendToken({ns:jws.NS_SYSTEM,type:"send",targetId:bb,sourceId:this.ai,sender:this.af,data:aB});}return bj;},broadcastText:
function(aP,aB,ax){var bj=this.checkLoggedIn();var aE=false;var aD=true;if(ax){if(ax.senderIncluded){aE=ax.senderIncluded;}if(
ax.responseRequested){aD=ax.responseRequested;}}if(0===bj.code){this.sendToken({ns:jws.NS_SYSTEM,type:"broadcast",sourceId:this.ai,
sender:this.af,pool:aP,data:aB,senderIncluded:aE,responseRequested:aD},ax);}return bj;},broadcastToSharedSession:function(aR,eK,ax){
var bj=this.checkConnected();if(0===bj.code){aR.ns=jws.NS_SYSTEM;aR.type="broadcastToSharedSession";aR.senderIncluded=eK||false;
this.sendToken(aR,ax);}return bj;},echo:function(aw,ax){var bj=this.checkWriteable();if(!ax){ax={};}if(0===bj.code){var cg={ns:
jws.NS_SYSTEM,type:"echo",data:aw};if(ax.delay){cg.delay=ax.delay;}if(ax.jM){cg.jM=ax.jM;}this.sendToken(cg,ax);}return bj;},open:
function(dr,ax){var bj=this.createDefaultResult();try{if(ax&&ax.OnToken&&"function"===typeof ax.OnToken){this.eF=ax.OnToken;}if(ax&&
ax.OnWelcome&&"function"===typeof ax.OnWelcome){this.cC=ax.OnWelcome;}if(ax&&ax.OnGoodBye&&"function"===typeof ax.OnGoodBye){
this.fw=ax.OnGoodBye;}if(ax&&ax.OnLogon&&"function"===typeof ax.OnLogon){this.gZ=ax.OnLogon;}if(ax&&ax.OnLogoff&&"function"===
typeof ax.OnLogoff){this.hH=ax.OnLogoff;}arguments.callee.inherited.call(this,dr,ax);}catch(ex){bj.code= -1;bj.localeKey=
"jws.jsc.ex";bj.args=[ex.message];bj.msg="Exception on open: "+ex.message;}return bj;},connect:function(dr,ax){return this.open(dr,
ax);},close:function(ax){var aj=0;var cD=false;var cZ=false;var cV=false;if(this.ac){this.ac.isExplicitClose=true;}if(ax){if(
ax.timeout){aj=ax.timeout;}if(ax.noGoodBye){cD=true;}if(ax.noLogoutBroadcast){cZ=true;}if(ax.noDisconnectBroadcast){cV=true;}}
var bj=this.checkConnected();try{if(0===bj.code){if(aj>0){var cg={ns:jws.NS_SYSTEM,type:"close",timeout:aj};if(cD){cg.noGoodBye=
true;}if(cZ){cg.noLogoutBroadcast=true;}if(cV){cg.noDisconnectBroadcast=true;}this.sendToken(cg);}arguments.callee.inherited.call(
this,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}}catch(ex){bj.code= -1;bj.localeKey=
"jws.jsc.ex";bj.args=[ex.message];bj.msg="Exception on close: "+ex.message;}return bj;},disconnect:function(ax){return this.close(
ax);},setConfiguration:function(fC,fT){var bj=this.checkConnected();if(0===bj.code){for(var dR in fT){var dM=fT[dR];if("object"===
typeof(dM)){this.setConfiguration(fC+"."+dR,dM);}else{this.sessionPut(fC+"."+dR,dM,false,{});}}}return bj;}});
jws.SystemClientPlugIn={NS:jws.NS_SYSTEM,ALL_CLIENTS:0,AUTHENTICATED:1,NON_AUTHENTICATED:2,PW_PLAIN:null,PW_ENCODE_MD5:1,
PW_MD5_ENCODED:2,processToken:function(aR){if(jws.NS_SYSTEM===aR.ns){if("login"===aR.reqType){if(0===aR.code){if(this.gK){this.gK(
aR);}}else{if(this.gq){this.gq(aR);}}}else if("logon"===aR.reqType){if(0===aR.code){if(this.fV){this.fV(aR);}}else{if(this.gr){
this.gr(aR);}}}else if("logout"===aR.reqType){if(0===aR.code){if(this.fY){this.fY(aR);}}else{if(this.hi){this.hi(aR);}}}else if(
"logoff"===aR.reqType){if(0===aR.code){if(this.gk){this.gk(aR);}}else{if(this.gu){this.gu(aR);}}}}},login:function(an,aq,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.SystemClientPlugIn.NS,type:"login",username:an,password:aq};this.sendToken(cg,
ax);}return bj;},logon:function(dr,an,aq,ax){var bj=this.createDefaultResult();if(!ax){ax={};}if(this.isOpened()){this.login(an,aq,
ax);}else{var hj=ax.OnWelcome;var dJ=this;ax.OnWelcome=function(cz){if(hj){hj.call(dJ,cz);}dJ.login(an,aq,ax);};this.open(dr,ax);}
return bj;},logout:function(ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.SystemClientPlugIn.NS,type:"logout"};
this.sendToken(cg,ax);}return bj;},systemLogon:function(an,aq,ax){return this.login(an,aq,ax);},systemLogoff:function(ax){
return this.logout(ax);},systemGetAuthorities:function(ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.SystemClientPlugIn.NS,type:"getAuthorities"};this.sendToken(cg,ax);}return bj;},isLoggedIn:function(){return(this.isOpened()&&
this.af);},broadcastToken:function(aR,ax){aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.sourceId=this.ai;aR.sender=this.af;
return this.sendToken(aR,ax);},getUsername:function(){return(this.isLoggedIn()?this.af:null);},getClients:function(ax){var aF=
jws.SystemClientPlugIn.ALL_CLIENTS;var al=null;if(ax){if(ax.mode===jws.SystemClientPlugIn.AUTHENTICATED||ax.mode===
jws.SystemClientPlugIn.NON_AUTHENTICATED){aF=ax.mode;}if(ax.pool){al=ax.pool;}}var bj=this.createDefaultResult();if(this.isLoggedIn(
)){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"getClients",mode:aF,pool:al});}else{bj.code= -1;bj.localeKey=
"jws.jsc.res.notLoggedIn";bj.msg="Not logged in.";}return bj;},getNonAuthClients:function(ax){if(!ax){ax={};}ax.mode=
jws.SystemClientPlugIn.NON_AUTHENTICATED;return this.getClients(ax);},getAuthClients:function(ax){if(!ax){ax={};}ax.mode=
jws.SystemClientPlugIn.AUTHENTICATED;return this.getClients(ax);},getAllClients:function(ax){if(!ax){ax={};}ax.mode=
jws.SystemClientPlugIn.ALL_CLIENTS;return this.getClients(ax);},ping:function(ax){var ah=false;if(ax){if(ax.echo){ah=true;}}var bj=
this.createDefaultResult();if(this.isOpened()){this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"ping",echo:ah},ax);}else{bj.code=
 -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},wait:function(ez,ax){var bj=this.checkConnected();
if(0===bj.code){var aD=true;if(ax){if(undefined!==ax.responseRequested){aD=ax.responseRequested;}}this.sendToken({ns:
jws.SystemClientPlugIn.NS,type:"wait",duration:ez,responseRequested:aD},ax);}return bj;},startKeepAlive:function(ax){if(this.ar){
this.stopKeepAlive();}if(!this.isOpened()){return;}var aO=10000;var ah=true;var aL=true;if(ax){if(undefined!==ax.interval){aO=
ax.interval;}if(undefined!==ax.echo){ah=ax.echo;}if(undefined!==ax.immediate){aL=ax.immediate;}}if(aL){this.ping({echo:ah});}var dJ=
this;this.ar=setInterval(function(){if(dJ.isOpened()){dJ.ping({echo:ah});}else{dJ.stopKeepAlive();}},aO);},stopKeepAlive:function(){
if(this.ar){clearInterval(this.ar);this.ar=null;}},setSystemCallbacks:function(ci){if(!ci){ci={};}if(ci.OnLoggedIn!==undefined){
this.gK=ci.OnLoggedIn;}if(ci.OnLoginError!==undefined){this.gq=ci.OnLoginError;}if(ci.OnLoggedOut!==undefined){this.fY=
ci.OnLoggedOut;}if(ci.OnLogoutError!==undefined){this.hi=ci.OnLogoutError;}if(ci.OnLoggedOn!==undefined){this.fV=ci.OnLoggedOn;}if(
ci.OnLogonError!==undefined){this.gr=ci.OnLogonError;}if(ci.OnLoggedOff!==undefined){this.gk=ci.OnLoggedOff;}if(ci.OnLogoffError!==
undefined){this.gu=ci.OnLogoffError;}},sessionPut:function(ae,ck,fM,ax){if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,
type:"sessionPut",key:ae,value:ck,"public":fM,connectionStorage:ax.connectionStorage||false},ax);},sessionHas:function(fA,ae,fM,ax){
if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"sessionHas",key:ae,clientId:fA,"public":fM,connectionStorage:
ax.connectionStorage||false},ax);},sessionGet:function(fA,ae,fM,ax){if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,
type:"sessionGet",key:ae,clientId:fA,"public":fM,connectionStorage:ax.connectionStorage||false},ax);},sessionRemove:function(ae,fM,
ax){if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"sessionRemove",key:ae,"public":fM,connectionStorage:
ax.connectionStorage||false},ax);},sessionKeys:function(fA,fM,ax){if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:
"sessionKeys",clientId:fA,"public":fM,connectionStorage:ax.connectionStorage||false},ax);},sessionGetAll:function(fA,fM,ax){if(!ax){
ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,type:"sessionGetAll",clientId:fA,"public":fM,connectionStorage:
ax.connectionStorage||false},ax);},sessionGetMany:function(gn,jd,ax){if(!ax){ax={};}this.sendToken({ns:jws.SystemClientPlugIn.NS,
type:"sessionGetMany",clients:gn,keys:jd,connectionStorage:ax.connectionStorage||false},ax);},forwardJSON:function(bb,fC,bU,bl,iG,
ax){var ig={ns:fC,type:bU,sourceId:this.ai,utid:this.getNextTokenId(),payload:iG};if(bl){for(var bc in bl){if(undefined===ig[bc]){
ig[bc]=bl[bc];}}}var cg={ns:"org.jwebsocket.plugins.system",type:"send",sourceId:this.ai,targetId:bb,action:"forward.json",
responseRequested:false,data:JSON.stringify(ig)};this.sendToken(cg,ax);}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,
jws.SystemClientPlugIn);jws.oop.declareClass("jws","jWebSocketJSONClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){
aR.utid=aR.utid||jws.CUR_TOKEN_ID;var ak=JSON.stringify(aR);return(ak);},streamToToken:function(de){var bk=JSON.parse(de);return bk;
}});jws.oop.declareClass("jws","jWebSocketCSVClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){var ag="utid="+
jws.CUR_TOKEN_ID;for(var dR in aR){var cY=aR[dR];if(cY===null||cY===undefined){ag+=","+dR+"=";}else if("string"===typeof cY){cY=
cY.replace(/[,]/g,"\\x2C");cY=cY.replace(/["]/g,"\\x22");ag+=","+dR+"=\""+cY+"\"";}else{ag+=","+dR+"="+cY;}}return ag;},
streamToToken:function(de){var cg={};var aN=de.split(",");for(var db=0,dB=aN.length;db<dB;db++){var at=aN[db].split("=");if(2===
at.length){var dR=at[0];var cY=at[1];if(cY.length>=2&&"\""===cY.charAt(0)&&"\""===cY.charAt(cY.length-1)){cY=cY.replace(/\\x2C/g,
"\x2C");cY=cY.replace(/\\x22/g,"\x22");cY=cY.substr(1,cY.length-2);}cg[dR]=cY;}}return cg;}});jws.oop.declareClass("jws",
"jWebSocketXMLClient",jws.jWebSocketTokenClient,{tokenToStream:function(aR){function obj2xml(ae,ck){var dF="";if(
ck instanceof Array){dF+="<"+ae+" type=\""+"array"+"\">";for(var db=0,dB=ck.length;db<dB;db++){dF+=obj2xml("item",ck[db]);}dF+="</"+
ae+">";}else if("object"===typeof ck){dF+="<"+ae+" type=\""+"object"+"\">";for(var bc in ck){dF+=obj2xml(bc,ck[bc]);}dF+="</"+ae+
">";}else{dF+="<"+ae+" type=\""+typeof ck+"\">"+ck.toString()+"</"+ae+">";}return dF;};var bs="windows-1252";var av=
"<?xml version=\"1.0\" encoding=\""+bs+"\"?>"+"<token>";for(var bc in aR){av+=obj2xml(bc,aR[bc]);}av+="</token>";return av;},
streamToToken:function(de){var aC=null;try{var fv=new DOMParser();aC=fv.parseFromString(de,"text/xml");}catch(ex){}
function node2obj(aV,cQ){var cu=aV.firstChild;while(null!==cu){if(1===cu.nodeType){var dp=cu.getAttribute("type");var dR=
cu.nodeName;if(dp){var dM=cu.firstChild;if(dM&&3===dM.nodeType){dM=dM.nodeValue;if(dM){if("string"===dp){}else if("number"===dp){}
else if("boolean"===dp){}else if("date"===dp){}else{dM=undefined;}if(dM){if(cQ instanceof Array){cQ.push(dM);}else{cQ[dR]=dM;}}}}
else if(dM&&1===dM.nodeType){if("array"===dp){cQ[dR]=[];node2obj(cu,cQ[dR]);}else if("object"===dp){cQ[dR]={};node2obj(cu,cQ[dR]);}}
}}cu=cu.nextSibling;}};var cg={};if(aC){node2obj(aC.firstChild,cg);}return cg;}});(function(){XHRWebSocket=function(jA,iq){var self=
this;self.url=(jA.substr(0,2)=="ws")?"http"+jA.substr(2):jA;self.subPrcol=iq;self.readyStateValues={CONNECTING:0,OPEN:1,CLOSING:2,
CLOSED:3};self.readyState=self.readyStateValues.CONNECTING;self.bufferedAmount=0;self.__events={};self.__ableToSend=true;
self.__pendingMessages=[];XHRWebSocket.prototype.__already=false;XHRWebSocket.prototype.addEventListener=function(bU,aA){if(!(
bU in this.__events)){this.__events[bU]=[];}this.__events[bU].push(aA);};XHRWebSocket.prototype.removeEventListener=function(bU,aA,
jh){if(!(bU in this.__events))return;var hK=this.__events[bU];for(var cI=hK.length-1;cI>=0;--cI){if(hK[cI]===aA){hK.splice(cI,1);
break;}}};XHRWebSocket.prototype.dispatchEvent=function(cz){var hK=this.__events[cz.type]||[];for(var cI=0;cI<hK.length;++cI){
hK[cI](cz);}var iB=self["on"+cz.type];if(iB)iB(cz);};XHRWebSocket.prototype.send=function(aw){this.__pendingMessages.push(aw);if(
true==this.__ableToSend){this.__sendMessage(this.__pendingMessages.shift());}};XHRWebSocket.prototype.close=function(){if(
this.readyState==this.readyStateValues.CLOSING)throw "The websocket connection is closing";else if(this.readyState==
this.readyStateValues.CLOSED)throw "The websocket connection is already closed";else{var ij=this.__messageFactory({cometType:
"message",readyState:3});var iD=JSON.stringify(ij);this.__handleEvent({type:"close"});var hg=this.__getXHRTransport();hg.open(
"POST",this.url,true);hg.setRequestHeader("Content-Type","application/x-javascript;");hg.onreadystatechange=function(){if(
hg.readyState>=4&&hg.status==200){if(hg.responseText){self.readyState=self.readyStateValues.CLOSED;setTimeout(function(){
self.__handleEvent({type:"close"});},0)}}};hg.send(iD);}};self.__handleEvent=function(iE){var aW;if(iE.type=="close"||iE.type==
"open"||iE.type=="error"){aW=this.__createSimpleEvent(iE.type);}else if(iE.type=="message"){aW=this.__createMessageEvent("message",
iE.data);}else{throw "unknown event type: "+iE.type;}this.dispatchEvent(aW);};self.__createSimpleEvent=function(dp){return{type:dp,
bubbles:false,cancelable:false};};self.__createMessageEvent=function(bU,aw){return{type:bU,data:aw,bubbles:false,cancelable:false}};
this.__checkPendingMessage=function(){if(this.__pendingMessages.length>0){var ig=this.__pendingMessages.shift();this.__sendMessage(
ig);}};this.open=function(){if(this.readyState==this.readyStateValues.OPEN)throw "the connection is already opened";
else this.__handleConnectionChannel();};this.keepConnection=function(){this.__handleConnectionChannel();};
this.__handleConnectionChannel=function(){var hg=this.__getXHRTransport();this.__xhr=hg;hg.open("POST",this.url,true);
hg.setRequestHeader("Content-Type","application/x-javascript;");hg.onreadystatechange=function(){if(hg.readyState>=4){if(hg.status==
200){if(hg.responseText){var ia=JSON.parse(hg.responseText);if(ia.data!=""){setTimeout(function(){for(var cI=0;cI<ia.data.length;
cI++){self.__handleEvent({type:"message",data:ia.data[cI]});}},0);}self.handleConnectionState(ia);if(1==self.readyState){setTimeout(
function(){self.keepConnection();},200);}}}}};var ij=this.__messageFactory({cometType:"connection"});var iD=JSON.stringify(ij);
hg.send(iD);};this.__objectMessageBasePrototype=function(){var ij={subPl:"json",cometType:undefined,data:undefined,readyState:
self.readyState};return ij;};this.__sendMessage=function(aw){if(this.readyState==this.readyStateValues.CONNECTING){
throw "The websocket connection has not been stablished";}else if(this.readyState==this.readyStateValues.CLOSED){
throw "The websocket connection has been closed, the message can not be sent to the server";}else if(this.__ableToSend==true){
this.__ableToSend=false;var ij=this.__messageFactory({cometType:"message",data:aw});var iD=JSON.stringify(ij);var hg=
this.__getXHRTransport();hg.open("POST",this.url,true);hg.setRequestHeader("Content-Type","application/x-javascript;");
hg.onreadystatechange=function(){self.__ableToSend=true;if(hg.readyState>=4&&hg.status==200){if(hg.responseText){var ia=JSON.parse(
hg.responseText);setTimeout(function(){for(var cI=0;cI<ia.data.length;cI++){self.__handleEvent({type:"message",data:ia.data[cI]});}}
,0);}self.__checkPendingMessage();}};hg.send(iD);}else{this.__pendingMessages.push(aw);}};this.__messageFactory=function(bl){var ij=
this.__objectMessageBasePrototype();if(bl!=undefined)if(bl.cometType==undefined)throw "Error up, type message not found";else{
ij.cometType=bl.cometType;if(bl.data!=undefined)ij.data=bl.data;else ij.data=undefined;if(bl.readyState!=undefined)ij.readyState=
bl.readyState;}return ij;};this.handleConnectionState=function(ia){if(this.readyState==this.readyStateValues.CONNECTING&&
ia.readyState==this.readyStateValues.OPEN){this.readyState=ia.readyState;this.__handleEvent({type:"open"});}if(ia.readyState)
this.readyState=ia.readyState;else throw "Missing 'readyState' argument from the server";if(this.readyState==2||this.readyState==3){
this.__handleEvent({type:"close"});}};this.__getXHRTransport=function(){var hg;if(window.XMLHttpRequest){ie=0;hg=new XMLHttpRequest(
);if(hg.overrideMimeType)hg.overrideMimeType('text/xml');}else{ie=1;try{hg=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){}if(
typeof httpRequest=='undefined'){try{hg=new ActiveXObject("Microsoft.XMLHTTP");}catch(f){}}}if(!hg){
throw "Cannot create an XMLHTTP instance";return false;}return hg;};this.open();}})();var CachePriority={'LOW':1,'NORMAL':2,'HIGH':
4};function Cache(maxSize,debug,storage){this.maxSize_=maxSize|| -1;this.debug_=debug||false;this.storage_=storage||
new Cache.BasicCacheStorage();this.fillFactor_=.75;this.stats_={};this.stats_['hits']=0;this.stats_['misses']=0;this.log_(
'Initialized cache with size '+maxSize);};Cache.BasicCacheStorage=function(){this.items_={};this.count_=0;};
Cache.BasicCacheStorage.prototype.get=function(key){return this.items_[key];};Cache.BasicCacheStorage.prototype.set=function(key,
value){if(typeof this.get(key)==="undefined")this.count_++;this.items_[key]=value;};Cache.BasicCacheStorage.prototype.size=function(
key,value){return this.count_;};Cache.BasicCacheStorage.prototype.remove=function(key){var item=this.get(key);if(typeof item!==
"undefined")this.count_--;delete this.items_[key];return item;};Cache.BasicCacheStorage.prototype.keys=function(){var ret=[],p;for(
p in this.items_)ret.push(p);return ret;};Cache.LocalStorageCacheStorage=function(namespace){this.prefix_='cache-storage.'+(
namespace||'default')+'.';var escapedPrefix=this.prefix_.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");this.regexp_=new RegExp('^'+
escapedPrefix);};Cache.LocalStorageCacheStorage.prototype.get=function(key){var item=window.localStorage[this.prefix_+key];if(item)
return JSON.parse(item);return null;};Cache.LocalStorageCacheStorage.prototype.set=function(key,value){
window.localStorage[this.prefix_+key]=JSON.stringify(value);};Cache.LocalStorageCacheStorage.prototype.size=function(key,value){
return this.keys().length;};Cache.LocalStorageCacheStorage.prototype.remove=function(key){var item=this.get(key);
delete window.localStorage[this.prefix_+key];return item;};Cache.LocalStorageCacheStorage.prototype.keys=function(){var ret=[],p;
for(p in window.localStorage){if(p.match(this.regexp_))ret.push(p.replace(this.prefix_,''));};return ret;};Cache.prototype.getItem=
function(key){var item=this.storage_.get(key);if(item!==null){if(!this.isExpired_(item)){item.lastAccessed=new Date().getTime();}
else{this.removeItem(key);item=null;}}var returnVal=item?item.value:null;if(returnVal){this.stats_['hits']++;this.log_(
'Cache HIT for key '+key);}else{this.stats_['misses']++;this.log_('Cache MISS for key '+key);}return returnVal;};Cache._CacheItem=
function(k,v,o){if(!k){throw new Error("key cannot be null or empty");}this.key=k;this.value=v;o=o||{};if(o.expirationAbsolute){
o.expirationAbsolute=o.expirationAbsolute.getTime();}if(!o.priority){o.priority=CachePriority.NORMAL;}this.options=o;
this.lastAccessed=new Date().getTime();};Cache.prototype.setItem=function(key,value,options){if(this.storage_.get(key)!==null){
this.removeItem(key);}this.addItem_(new Cache._CacheItem(key,value,options));this.log_("Setting key "+key);if((this.maxSize_>0)&&(
this.size()>this.maxSize_)){var that=this;setTimeout(function(){that.purge_.call(that);},0);}};Cache.prototype.clear=function(){
var keys=this.storage_.keys();for(var i=0;i<keys.length;i++){this.removeItem(keys[i]);}this.log_('Cache cleared');};
Cache.prototype.getStats=function(){return this.stats_;};Cache.prototype.toHtmlString=function(){var returnStr=this.size()+
" item(s) in cache<br /><ul>";var keys=this.storage_.keys();for(var i=0;i<keys.length;i++){var item=this.storage_.get(keys[i]);
returnStr=returnStr+"<li>"+item.key.toString()+" = "+item.value.toString()+"</li>";}returnStr=returnStr+"</ul>";return returnStr;};
Cache.prototype.resize=function(newMaxSize){this.log_('Resizing Cache from '+this.maxSize_+' to '+newMaxSize);var oldMaxSize=
this.maxSize_;this.maxSize_=newMaxSize;if(newMaxSize>0&&(oldMaxSize<0||newMaxSize<oldMaxSize)){if(this.size()>newMaxSize){
this.purge_();}}this.log_('Resizing done');};Cache.prototype.purge_=function(){var tmparray=new Array();var purgeSize=Math.round(
this.maxSize_*this.fillFactor_);if(this.maxSize_<0)purgeSize=this.size()*this.fillFactor_;var keys=this.storage_.keys();for(var i=0;
i<keys.length;i++){var key=keys[i];var item=this.storage_.get(key);if(this.isExpired_(item)){this.removeItem(key);}else{
tmparray.push(item);}}if(tmparray.length>purgeSize){tmparray=tmparray.sort(function(a,b){if(a.options.priority!==b.options.priority)
{return b.options.priority-a.options.priority;}else{return b.lastAccessed-a.lastAccessed;}});while(tmparray.length>purgeSize){
var ritem=tmparray.pop();this.removeItem(ritem.key);}}this.log_('Purged cached');};Cache.prototype.addItem_=function(item,
attemptedAlready){var cache=this;try{this.storage_.set(item.key,item);}catch(err){if(attemptedAlready){this.log_(
'Failed setting again, giving up: '+err.toString());throw(err);}this.log_('Error adding item, purging and trying again: '+
err.toString());this.purge_();this.addItem_(item,true);}};Cache.prototype.removeItem=function(key){var item=this.storage_.remove(
key);this.log_("removed key "+key);if(item&&item.options&&item.options.callback){setTimeout(function(){item.options.callback.call(
null,item.key,item.value);},0);}return item?item.value:null;};Cache.prototype.size=function(){return this.storage_.size();};
Cache.prototype.isExpired_=function(item){var now=new Date().getTime();var expired=false;if(item.options.expirationAbsolute&&(
item.options.expirationAbsolute<now)){expired=true;}if(!expired&&item.options.expirationSliding){var lastAccess=item.lastAccessed+(
item.options.expirationSliding*1000);if(lastAccess<now){expired=true;}}return expired;};Cache.prototype.log_=function(msg){if(
this.debug_){console.log(msg);}};if(typeof module!=="undefined"){module.exports=Cache;}onmessage=function(cz){var bu;eval(
"lMethod="+cz.data.method);postMessage(bu(cz.data.args));};jws.APIPlugIn={NS:jws.NS_BASE+".plugins.api",ID:"api",hasPlugIn:function(
aT,ax){var cg={ns:jws.APIPlugIn.NS,type:"hasPlugIn",plugin_id:aT};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}
this.sendToken(cg,ct);},getPlugInAPI:function(aT,ax){var cg={ns:jws.APIPlugIn.NS,type:"getPlugInAPI",plugin_id:aT};var ct={};if(ax){
if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.sendToken(cg,ct);},supportsToken:function(aT,ax){var cg={ns:jws.APIPlugIn.NS,
type:"supportsToken",token_type:aT};var ct={};if(ax){if(ax.OnResponse){ct.OnResponse=ax.OnResponse;}}this.sendToken(cg,ct);},
getServerAPI:function(ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.APIPlugIn.NS,type:"getServerAPI"};
this.sendToken(cg,ax);}return bj;},getPlugInIds:function(ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.APIPlugIn.NS,type:"getPlugInIds"};this.sendToken(cg,ax);}return bj;},getPlugInInfo:function(ax){var bj=this.checkConnected();if(
0===bj.code){var cg={ns:jws.APIPlugIn.NS,type:"getPlugInInfo"};this.sendToken(cg,ax);}return bj;},createSpecFromAPI:function(eG,cT){
var dB=cT.supportedTokens.length;var dx=[];for(var db=0;db<dB;db++){var cg=cT.supportedTokens[db];cg.ns=cT.namespace;var eN=
function(){var cs=false;var cv={ns:cg.ns,type:cg.type};var ek=cg.inArguments;for(var dy=0,eI=ek.length;dy<eI;dy++){var fx=ek[dy];
cv[fx.name]=fx.testValue;}console.log("Automatically sending "+JSON.stringify(cv));eG.sendToken(cv,{OnResponse:function(aR){
console.log("Received auto response: "+JSON.stringify(aR));cs=true;}});waitsFor(function(){return cs==true;},"test",20000);runs(
function(){expect(cs).toEqual(true);});};dx.push(eN);}return dx;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.APIPlugIn);
jws.CanvasPlugIn={NS:jws.NS_BASE+".plugins.canvas",processToken:function(aR){if(aR.reqNS==jws.CanvasPlugIn.NS){if("clear"==
aR.reqType){this.doClear(aR.id);}else if("beginPath"==aR.reqType){this.doBeginPath(aR.id);}else if("moveTo"==aR.reqType){
this.doMoveTo(aR.id,aR.x,aR.y);}else if("lineTo"==aR.reqType){this.doLineTo(aR.id,aR.x,aR.y);}else if("line"==aR.reqType){
this.doLine(aR.id,aR.x1,aR.y1,aR.x2,aR.y2,{color:aR.color});}else if("closePath"==aR.reqType){this.doClosePath(aR.id);}}},bm:{},
canvasOpen:function(aT,bL){var bG=jws.$(bL);this.bm[aT]={dj:bG,ctx:bG.getContext("2d")};},canvasClose:function(aT){this.bm[aT]=null;
delete this.bm[aT];},doClear:function(aT){var bh=this.bm[aT];if(bh!=null){var gj=bh.dj.getAttribute("width");var hE=
bh.dj.getAttribute("height");bh.ctx.clearRect(0,0,gj,hE);return true;}return false;},canvasClear:function(aT){if(this.doClear(aT)){
var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"clear",id:aT};this.broadcastToken(cg);}},canvasGetBase64:function(aT,eB){var bj={code: -
1,msg:"Ok"};var bh=this.bm[aT];if(bh!=null){if(typeof bh.dj.toDataURL=="function"){bj.code=0;bj.encoding="base64";bj.data=
bh.dj.toDataURL(eB);}else{bj.msg="Retrieving image data from canvas not (yet) supported by browser.";}}else{bj.msg=
"Canvas not found.";}return bj;},doBeginPath:function(aT){var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();return true;}
return false;},canvasBeginPath:function(aT){if(this.doBeginPath(aT)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"beginPath",id:aT};
this.broadcastToken(cg);}},doMoveTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.moveTo(cA,cj);return true;}
return false;},canvasMoveTo:function(aT,cA,cj){if(this.doMoveTo(aT,cA,cj)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"moveTo",id:aT,
x:cA,y:cj};this.broadcastToken(cg);}},doLineTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.lineTo(cA,cj);
bh.ctx.stroke();return true;}return false;},canvasLineTo:function(aT,cA,cj){if(this.doLineTo(aT,cA,cj)){var cg={reqNS:
jws.CanvasPlugIn.NS,reqType:"lineTo",id:aT,x:cA,y:cj};this.broadcastToken(cg);}},doLine:function(aT,cn,dk,cy,dq,ax){if(undefined==
ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();bh.ctx.moveTo(cn,dk);
bh.ctx.strokeStyle=ce;bh.ctx.lineTo(cy,dq);bh.ctx.stroke();bh.ctx.closePath();return true;}return false;},canvasLine:function(aT,cn,
dk,cy,dq,ax){if(undefined==ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}if(this.doLine(aT,cn,dk,cy,dq,ax)){var cg={reqNS:
jws.CanvasPlugIn.NS,reqType:"line",id:aT,x1:cn,y1:dk,x2:cy,y2:dq,color:ce};this.broadcastToken(cg);}},doClosePath:function(aT){
var bh=this.bm[aT];if(bh!=null){bh.ctx.closePath();return true;}return false;},canvasClosePath:function(aT){if(this.doClosePath(aT))
{var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"closePath",id:aT};this.broadcastToken(cg);}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.CanvasPlugIn);if(jws.isIE){
	//
	//	-------------------------------------------------------------------------------
	//	ExplorerCanvas
	//
	//	Google Open Source:
	//		<http://code.google.com>
	//		<opensource@google.com>
	//
	//	Developers:
	//		Emil A Eklund <emil@eae.net>
	//		Erik Arvidsson <erik@eae.net>
	//		Glen Murphy <glen@glenmurphy.com>
	//
	//	-------------------------------------------------------------------------------
	//	DESCRIPTION
	//
	//	Firefox, Safari and Opera 9 support the canvas tag to allow 2D command-based
	//	drawing operations. ExplorerCanvas brings the same functionality to Internet
	//	Explorer; web developers only need to include a single script tag in their
	//	existing canvas webpages to enable this support.
	//
	//	-------------------------------------------------------------------------------
	//	INSTALLATION
	//
	//	Include the ExplorerCanvas tag in the same directory as your HTML files, and
	//	add the following code to your page, preferably in the <head> tag.
	//
	//	<!--[if IE]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
	//
	//	If you run into trouble, please look at the included example code to see how
	//	to best implement this
	//	
	//	Copyright 2006 Google Inc.
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
	//
	//	Fullsource code at: http://excanvas.sourceforge.net/
	//	and http://code.google.com/p/explorercanvas/
	//
	document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;
function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2)
;return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&& !
window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(
b){b.namespaces.g_vml_||b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||
b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=
b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText=
"canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}
var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},initElement:function(b){if(!b.getContext){
b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&
a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=
a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){
case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();break;case "height":a.style.height=
a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){
a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){
var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I()
,d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=h}}return c}function O(b,a){
a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=
b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=
b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(
b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+1),h=b.substring(d+1,f).split(",");a=
"#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(
b){switch(b){case "butt":return "flat";case "round":return "round";case "square":default:return "square"}}function H(b){this.m_=I();
this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";
this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;var a=b.ownerDocument.createElement("div");a.style.width=
b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);
this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=
""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:
"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.lineTo=function(b,a){var c=this.getCoords_(b,a);
this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){
var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({
type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(
b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+0.6666666666666666*(f.x-this.currentX_),y:
this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};
i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&& !h)l+=0.125;var n=
this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,
yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d)
;this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);
this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=
this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();
this.fill();this.currentPath_=f};i.createLinearGradient=function(b,a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;
return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=
h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";
b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=
arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==5){a=arguments[1];c=arguments[2];d=arguments[3];f=
arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];
c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(
" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");
if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",",
"M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=
this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),
"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),
"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',
' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");
this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=
c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',! !b,'"',' style="position:absolute;width:',10,"px;height:",
10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},
l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));
break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",
j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-
this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius)," ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*
e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>
g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){
var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=
this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<
0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=
this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){
return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*
this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',
' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',
' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,
'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',
' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),'"',' weight="',K,'px"',
' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){
this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:
k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);
this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};
function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(
b,a,c){if(! !ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,
1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=
function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,
f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)}
;i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=
this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,
color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();}
jws.CanvasPlugIn={NS:jws.NS_BASE+".plugins.canvas",processToken:function(aR){if(aR.reqNS==jws.CanvasPlugIn.NS){if("clear"==
aR.reqType){this.doClear(aR.id);}else if("beginPath"==aR.reqType){this.doBeginPath(aR.id);}else if("moveTo"==aR.reqType){
this.doMoveTo(aR.id,aR.x,aR.y);}else if("lineTo"==aR.reqType){this.doLineTo(aR.id,aR.x,aR.y);}else if("line"==aR.reqType){
this.doLine(aR.id,aR.x1,aR.y1,aR.x2,aR.y2,{color:aR.color});}else if("closePath"==aR.reqType){this.doClosePath(aR.id);}}},bm:{},
canvasOpen:function(aT,bL){var bG=jws.$(bL);this.bm[aT]={dj:bG,ctx:bG.getContext("2d")};},canvasClose:function(aT){this.bm[aT]=null;
delete this.bm[aT];},doClear:function(aT){var bh=this.bm[aT];if(bh!=null){var gj=bh.dj.getAttribute("width");var hE=
bh.dj.getAttribute("height");bh.ctx.clearRect(0,0,gj,hE);return true;}return false;},canvasClear:function(aT){if(this.doClear(aT)){
var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"clear",id:aT};this.broadcastToken(cg);}},canvasGetBase64:function(aT,eB){var bj={code: -
1,msg:"Ok"};var bh=this.bm[aT];if(bh!=null){if(typeof bh.dj.toDataURL=="function"){bj.code=0;bj.encoding="base64";bj.data=
bh.dj.toDataURL(eB);}else{bj.msg="Retrieving image data from canvas not (yet) supported by browser.";}}else{bj.msg=
"Canvas not found.";}return bj;},doBeginPath:function(aT){var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();return true;}
return false;},canvasBeginPath:function(aT){if(this.doBeginPath(aT)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"beginPath",id:aT};
this.broadcastToken(cg);}},doMoveTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.moveTo(cA,cj);return true;}
return false;},canvasMoveTo:function(aT,cA,cj){if(this.doMoveTo(aT,cA,cj)){var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"moveTo",id:aT,
x:cA,y:cj};this.broadcastToken(cg);}},doLineTo:function(aT,cA,cj){var bh=this.bm[aT];if(bh!=null){bh.ctx.lineTo(cA,cj);
bh.ctx.stroke();return true;}return false;},canvasLineTo:function(aT,cA,cj){if(this.doLineTo(aT,cA,cj)){var cg={reqNS:
jws.CanvasPlugIn.NS,reqType:"lineTo",id:aT,x:cA,y:cj};this.broadcastToken(cg);}},doLine:function(aT,cn,dk,cy,dq,ax){if(undefined==
ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}var bh=this.bm[aT];if(bh!=null){bh.ctx.beginPath();bh.ctx.moveTo(cn,dk);
bh.ctx.strokeStyle=ce;bh.ctx.lineTo(cy,dq);bh.ctx.stroke();bh.ctx.closePath();return true;}return false;},canvasLine:function(aT,cn,
dk,cy,dq,ax){if(undefined==ax){ax={};}var ce="black";if(ax.color){ce=ax.color;}if(this.doLine(aT,cn,dk,cy,dq,ax)){var cg={reqNS:
jws.CanvasPlugIn.NS,reqType:"line",id:aT,x1:cn,y1:dk,x2:cy,y2:dq,color:ce};this.broadcastToken(cg);}},doClosePath:function(aT){
var bh=this.bm[aT];if(bh!=null){bh.ctx.closePath();return true;}return false;},canvasClosePath:function(aT){if(this.doClosePath(aT))
{var cg={reqNS:jws.CanvasPlugIn.NS,reqType:"closePath",id:aT};this.broadcastToken(cg);}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.CanvasPlugIn);if(jws.isIE){
	//
	//	-------------------------------------------------------------------------------
	//	ExplorerCanvas
	//
	//	Google Open Source:
	//		<http://code.google.com>
	//		<opensource@google.com>
	//
	//	Developers:
	//		Emil A Eklund <emil@eae.net>
	//		Erik Arvidsson <erik@eae.net>
	//		Glen Murphy <glen@glenmurphy.com>
	//
	//	-------------------------------------------------------------------------------
	//	DESCRIPTION
	//
	//	Firefox, Safari and Opera 9 support the canvas tag to allow 2D command-based
	//	drawing operations. ExplorerCanvas brings the same functionality to Internet
	//	Explorer; web developers only need to include a single script tag in their
	//	existing canvas webpages to enable this support.
	//
	//	-------------------------------------------------------------------------------
	//	INSTALLATION
	//
	//	Include the ExplorerCanvas tag in the same directory as your HTML files, and
	//	add the following code to your page, preferably in the <head> tag.
	//
	//	<!--[if IE]><script type="text/javascript" src="excanvas.js"></script><![endif]-->
	//
	//	If you run into trouble, please look at the included example code to see how
	//	to best implement this
	//	
	//	Copyright 2006 Google Inc.
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
	//
	//	Fullsource code at: http://excanvas.sourceforge.net/
	//	and http://code.google.com/p/explorercanvas/
	//
	document.createElement("canvas").getContext||(function(){var s=Math,j=s.round,F=s.sin,G=s.cos,V=s.abs,W=s.sqrt,k=10,v=k/2;
function X(){return this.context_||(this.context_=new H(this))}var L=Array.prototype.slice;function Y(b,a){var c=L.call(arguments,2)
;return function(){return b.apply(a,c.concat(L.call(arguments)))}}var M={init:function(b){if(/MSIE/.test(navigator.userAgent)&& !
window.opera){var a=b||document;a.createElement("canvas");a.attachEvent("onreadystatechange",Y(this.init_,this,a))}},init_:function(
b){b.namespaces.g_vml_||b.namespaces.add("g_vml_","urn:schemas-microsoft-com:vml","#default#VML");b.namespaces.g_o_||
b.namespaces.add("g_o_","urn:schemas-microsoft-com:office:office","#default#VML");if(!b.styleSheets.ex_canvas_){var a=
b.createStyleSheet();a.owningElement.id="ex_canvas_";a.cssText=
"canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}g_vml_\\:*{behavior:url(#default#VML)}g_o_\\:*{behavior:url(#default#VML)}"}
var c=b.getElementsByTagName("canvas"),d=0;for(;d<c.length;d++)this.initElement(c[d])},initElement:function(b){if(!b.getContext){
b.getContext=X;b.innerHTML="";b.attachEvent("onpropertychange",Z);b.attachEvent("onresize",$);var a=b.attributes;if(a.width&&
a.width.specified)b.style.width=a.width.nodeValue+"px";else b.width=b.clientWidth;if(a.height&&a.height.specified)b.style.height=
a.height.nodeValue+"px";else b.height=b.clientHeight}return b}};function Z(b){var a=b.srcElement;switch(b.propertyName){
case "width":a.style.width=a.attributes.width.nodeValue+"px";a.getContext().clearRect();break;case "height":a.style.height=
a.attributes.height.nodeValue+"px";a.getContext().clearRect();break}}function $(b){var a=b.srcElement;if(a.firstChild){
a.firstChild.style.width=a.clientWidth+"px";a.firstChild.style.height=a.clientHeight+"px"}}M.init();var N=[],B=0;for(;B<16;B++){
var C=0;for(;C<16;C++)N[B*16+C]=B.toString(16)+C.toString(16)}function I(){return[[1,0,0],[0,1,0],[0,0,1]]}function y(b,a){var c=I()
,d=0;for(;d<3;d++){var f=0;for(;f<3;f++){var h=0,g=0;for(;g<3;g++)h+=b[d][g]*a[g][f];c[d][f]=h}}return c}function O(b,a){
a.fillStyle=b.fillStyle;a.lineCap=b.lineCap;a.lineJoin=b.lineJoin;a.lineWidth=b.lineWidth;a.miterLimit=b.miterLimit;a.shadowBlur=
b.shadowBlur;a.shadowColor=b.shadowColor;a.shadowOffsetX=b.shadowOffsetX;a.shadowOffsetY=b.shadowOffsetY;a.strokeStyle=
b.strokeStyle;a.globalAlpha=b.globalAlpha;a.arcScaleX_=b.arcScaleX_;a.arcScaleY_=b.arcScaleY_;a.lineScale_=b.lineScale_}function P(
b){var a,c=1;b=String(b);if(b.substring(0,3)=="rgb"){var d=b.indexOf("(",3),f=b.indexOf(")",d+1),h=b.substring(d+1,f).split(",");a=
"#";var g=0;for(;g<3;g++)a+=N[Number(h[g])];if(h.length==4&&b.substr(3,1)=="a")c=h[3]}else a=b;return{color:a,alpha:c}}function aa(
b){switch(b){case "butt":return "flat";case "round":return "round";case "square":default:return "square"}}function H(b){this.m_=I();
this.mStack_=[];this.aStack_=[];this.currentPath_=[];this.fillStyle=this.strokeStyle="#000";this.lineWidth=1;this.lineJoin="miter";
this.lineCap="butt";this.miterLimit=k*1;this.globalAlpha=1;this.canvas=b;var a=b.ownerDocument.createElement("div");a.style.width=
b.clientWidth+"px";a.style.height=b.clientHeight+"px";a.style.overflow="hidden";a.style.position="absolute";b.appendChild(a);
this.element_=a;this.lineScale_=this.arcScaleY_=this.arcScaleX_=1}var i=H.prototype;i.clearRect=function(){this.element_.innerHTML=
""};i.beginPath=function(){this.currentPath_=[]};i.moveTo=function(b,a){var c=this.getCoords_(b,a);this.currentPath_.push({type:
"moveTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.lineTo=function(b,a){var c=this.getCoords_(b,a);
this.currentPath_.push({type:"lineTo",x:c.x,y:c.y});this.currentX_=c.x;this.currentY_=c.y};i.bezierCurveTo=function(b,a,c,d,f,h){
var g=this.getCoords_(f,h),l=this.getCoords_(b,a),e=this.getCoords_(c,d);Q(this,l,e,g)};function Q(b,a,c,d){b.currentPath_.push({
type:"bezierCurveTo",cp1x:a.x,cp1y:a.y,cp2x:c.x,cp2y:c.y,x:d.x,y:d.y});b.currentX_=d.x;b.currentY_=d.y}i.quadraticCurveTo=function(
b,a,c,d){var f=this.getCoords_(b,a),h=this.getCoords_(c,d),g={x:this.currentX_+0.6666666666666666*(f.x-this.currentX_),y:
this.currentY_+0.6666666666666666*(f.y-this.currentY_)};Q(this,g,{x:g.x+(h.x-this.currentX_)/3,y:g.y+(h.y-this.currentY_)/3},h)};
i.arc=function(b,a,c,d,f,h){c*=k;var g=h?"at":"wa",l=b+G(d)*c-v,e=a+F(d)*c-v,m=b+G(f)*c-v,r=a+F(f)*c-v;if(l==m&& !h)l+=0.125;var n=
this.getCoords_(b,a),o=this.getCoords_(l,e),q=this.getCoords_(m,r);this.currentPath_.push({type:g,x:n.x,y:n.y,radius:c,xStart:o.x,
yStart:o.y,xEnd:q.x,yEnd:q.y})};i.rect=function(b,a,c,d){this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d)
;this.closePath()};i.strokeRect=function(b,a,c,d){var f=this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);
this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();this.stroke();this.currentPath_=f};i.fillRect=function(b,a,c,d){var f=
this.currentPath_;this.beginPath();this.moveTo(b,a);this.lineTo(b+c,a);this.lineTo(b+c,a+d);this.lineTo(b,a+d);this.closePath();
this.fill();this.currentPath_=f};i.createLinearGradient=function(b,a,c,d){var f=new D("gradient");f.x0_=b;f.y0_=a;f.x1_=c;f.y1_=d;
return f};i.createRadialGradient=function(b,a,c,d,f,h){var g=new D("gradientradial");g.x0_=b;g.y0_=a;g.r0_=c;g.x1_=d;g.y1_=f;g.r1_=
h;return g};i.drawImage=function(b){var a,c,d,f,h,g,l,e,m=b.runtimeStyle.width,r=b.runtimeStyle.height;b.runtimeStyle.width="auto";
b.runtimeStyle.height="auto";var n=b.width,o=b.height;b.runtimeStyle.width=m;b.runtimeStyle.height=r;if(arguments.length==3){a=
arguments[1];c=arguments[2];h=g=0;l=d=n;e=f=o}else if(arguments.length==5){a=arguments[1];c=arguments[2];d=arguments[3];f=
arguments[4];h=g=0;l=n;e=o}else if(arguments.length==9){h=arguments[1];g=arguments[2];l=arguments[3];e=arguments[4];a=arguments[5];
c=arguments[6];d=arguments[7];f=arguments[8]}else throw Error("Invalid number of arguments");var q=this.getCoords_(a,c),t=[];t.push(
" <g_vml_:group",' coordsize="',k*10,",",k*10,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;");
if(this.m_[0][0]!=1||this.m_[0][1]){var E=[];E.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",",
"M22=",this.m_[1][1],",","Dx=",j(q.x/k),",","Dy=",j(q.y/k),"");var p=q,z=this.getCoords_(a+d,c),w=this.getCoords_(a,c+f),x=
this.getCoords_(a+d,c+f);p.x=s.max(p.x,z.x,w.x,x.x);p.y=s.max(p.y,z.y,w.y,x.y);t.push("padding:0 ",j(p.x/k),"px ",j(p.y/k),
"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",E.join(""),", sizingmethod='clip');")}else t.push("top:",j(q.y/k),
"px;left:",j(q.x/k),"px;");t.push(' ">','<g_vml_:image src="',b.src,'"',' style="width:',k*d,"px;"," height:",k*f,'px;"',
' cropleft="',h/n,'"',' croptop="',g/o,'"',' cropright="',(n-h-l)/n,'"',' cropbottom="',(o-g-e)/o,'"'," />","</g_vml_:group>");
this.element_.insertAdjacentHTML("BeforeEnd",t.join(""))};i.stroke=function(b){var a=[],c=P(b?this.fillStyle:this.strokeStyle),d=
c.color,f=c.alpha*this.globalAlpha;a.push("<g_vml_:shape",' filled="',! !b,'"',' style="position:absolute;width:',10,"px;height:",
10,'px;"',' coordorigin="0 0" coordsize="',k*10," ",k*10,'"',' stroked="',!b,'"',' path="');var h={x:null,y:null},g={x:null,y:null},
l=0;for(;l<this.currentPath_.length;l++){var e=this.currentPath_[l];switch(e.type){case "moveTo":a.push(" m ",j(e.x),",",j(e.y));
break;case "lineTo":a.push(" l ",j(e.x),",",j(e.y));break;case "close":a.push(" x ");e=null;break;case "bezierCurveTo":a.push(" c ",
j(e.cp1x),",",j(e.cp1y),",",j(e.cp2x),",",j(e.cp2y),",",j(e.x),",",j(e.y));break;case "at":case "wa":a.push(" ",e.type," ",j(e.x-
this.arcScaleX_*e.radius),",",j(e.y-this.arcScaleY_*e.radius)," ",j(e.x+this.arcScaleX_*e.radius),",",j(e.y+this.arcScaleY_*
e.radius)," ",j(e.xStart),",",j(e.yStart)," ",j(e.xEnd),",",j(e.yEnd));break}if(e){if(h.x==null||e.x<h.x)h.x=e.x;if(g.x==null||e.x>
g.x)g.x=e.x;if(h.y==null||e.y<h.y)h.y=e.y;if(g.y==null||e.y>g.y)g.y=e.y}}a.push(' ">');if(b)if(typeof this.fillStyle=="object"){
var m=this.fillStyle,r=0,n={x:0,y:0},o=0,q=1;if(m.type_=="gradient"){var t=m.x1_/this.arcScaleX_,E=m.y1_/this.arcScaleY_,p=
this.getCoords_(m.x0_/this.arcScaleX_,m.y0_/this.arcScaleY_),z=this.getCoords_(t,E);r=Math.atan2(z.x-p.x,z.y-p.y)*180/Math.PI;if(r<
0)r+=360;if(r<1.0E-6)r=0}else{var p=this.getCoords_(m.x0_,m.y0_),w=g.x-h.x,x=g.y-h.y;n={x:(p.x-h.x)/w,y:(p.y-h.y)/x};w/=
this.arcScaleX_*k;x/=this.arcScaleY_*k;var R=s.max(w,x);o=2*m.r0_/R;q=2*m.r1_/R-o}var u=m.colors_;u.sort(function(ba,ca){
return ba.offset-ca.offset});var J=u.length,da=u[0].color,ea=u[J-1].color,fa=u[0].alpha*this.globalAlpha,ga=u[J-1].alpha*
this.globalAlpha,S=[],l=0;for(;l<J;l++){var T=u[l];S.push(T.offset*q+o+" "+T.color)}a.push('<g_vml_:fill type="',m.type_,'"',
' method="none" focus="100%"',' color="',da,'"',' color2="',ea,'"',' colors="',S.join(","),'"',' opacity="',ga,'"',
' g_o_:opacity2="',fa,'"',' angle="',r,'"',' focusposition="',n.x,",",n.y,'" />')}else a.push('<g_vml_:fill color="',d,
'" opacity="',f,'" />');else{var K=this.lineScale_*this.lineWidth;if(K<1)f*=K;a.push("<g_vml_:stroke",' opacity="',f,'"',
' joinstyle="',this.lineJoin,'"',' miterlimit="',this.miterLimit,'"',' endcap="',aa(this.lineCap),'"',' weight="',K,'px"',
' color="',d,'" />')}a.push("</g_vml_:shape>");this.element_.insertAdjacentHTML("beforeEnd",a.join(""))};i.fill=function(){
this.stroke(true)};i.closePath=function(){this.currentPath_.push({type:"close"})};i.getCoords_=function(b,a){var c=this.m_;return{x:
k*(b*c[0][0]+a*c[1][0]+c[2][0])-v,y:k*(b*c[0][1]+a*c[1][1]+c[2][1])-v}};i.save=function(){var b={};O(this,b);this.aStack_.push(b);
this.mStack_.push(this.m_);this.m_=y(I(),this.m_)};i.restore=function(){O(this.aStack_.pop(),this);this.m_=this.mStack_.pop()};
function ha(b){var a=0;for(;a<3;a++){var c=0;for(;c<2;c++)if(!isFinite(b[a][c])||isNaN(b[a][c]))return false}return true}function A(
b,a,c){if(! !ha(a)){b.m_=a;if(c)b.lineScale_=W(V(a[0][0]*a[1][1]-a[0][1]*a[1][0]))}}i.translate=function(b,a){A(this,y([[1,0,0],[0,
1,0],[b,a,1]],this.m_),false)};i.rotate=function(b){var a=G(b),c=F(b);A(this,y([[a,c,0],[-c,a,0],[0,0,1]],this.m_),false)};i.scale=
function(b,a){this.arcScaleX_*=b;this.arcScaleY_*=a;A(this,y([[b,0,0],[0,a,0],[0,0,1]],this.m_),true)};i.transform=function(b,a,c,d,
f,h){A(this,y([[b,a,0],[c,d,0],[f,h,1]],this.m_),true)};i.setTransform=function(b,a,c,d,f,h){A(this,[[b,a,0],[c,d,0],[f,h,1]],true)}
;i.clip=function(){};i.arcTo=function(){};i.createPattern=function(){return new U};function D(b){this.type_=b;this.r1_=this.y1_=
this.x1_=this.r0_=this.y0_=this.x0_=0;this.colors_=[]}D.prototype.addColorStop=function(b,a){a=P(a);this.colors_.push({offset:b,
color:a.color,alpha:a.alpha})};function U(){}G_vmlCanvasManager=M;CanvasRenderingContext2D=H;CanvasGradient=D;CanvasPattern=U})();}
jws.ChannelPlugIn={NS:jws.NS_BASE+".plugins.channels",SUBSCRIBE:"subscribe",UNSUBSCRIBE:"unsubscribe",GET_CHANNELS:"getChannels",
CREATE_CHANNEL:"createChannel",MODIFY_CHANNEL:"modifyChannel",REMOVE_CHANNEL:"removeChannel",GET_SUBSCRIBERS:"getSubscribers",
GET_PUBLISHERS:"getPublishers",GET_SUBSCRIPTIONS:"getSubscriptions",AUTHORIZE:"authorize",PUBLISH:"publish",STOP:"stopChannel",
START:"startChannel",processToken:function(aR){if(aR.ns==jws.ChannelPlugIn.NS){if("event"==aR.type){if("channelCreated"==aR.name){
if(this.fZ){this.fZ(aR);}}else if("channelRemoved"==aR.name){if(this.fQ){this.fQ(aR);}}else if("channelStarted"==aR.name){if(
this.fU){this.fU(aR);}}else if("channelStopped"==aR.name){if(this.fP){this.fP(aR);}}else if("subscription"==aR.name){if(this.gd){
this.gd(aR);}}else if("unsubscription"==aR.name){if(this.gy){this.gy(aR);}}}else if("getChannels"==aR.reqType){if(this.gA){this.gA(
aR);}}else if("data"==aR.type){if(this.gU){this.gU(aR);}}else if(aR.type=="response"&&this.CREATE_CHANNEL==aR.reqType&&aR.isPrivate)
{if(this.fZ){this.fZ(aR);}}}},channelSubscribe:function(dC,dN,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:
jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.SUBSCRIBE,channel:dC,accessKey:dN},ax);}return bj;},channelUnsubscribe:function(dC,ax){
var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.UNSUBSCRIBE,channel:dC},
ax);}return bj;},channelAuth:function(dC,dN,fr,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:
jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.AUTHORIZE,channel:dC,accessKey:dN,secretKey:fr},ax);}return bj;},channelPublishString:
function(dC,gL,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:
jws.ChannelPlugIn.PUBLISH,channel:dC,data:gL},ax);}return bj;},channelPublish:function(dC,aw,hI,ax){var bj=this.checkConnected();if(
0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.PUBLISH,channel:dC,data:aw,map:hI},ax);}return bj;},
channelPublishMap:function(dC,hI,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:
jws.ChannelPlugIn.PUBLISH,channel:dC,map:hI},ax);}return bj;},channelModify:function(aT,fr,ax){var bj=this.checkConnected();if(0==
bj.code){var cg={ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.MODIFY_CHANNEL,channel:aT,secretKey:fr};if(ax["name"]){cg.name=
ax.name;}if("string"==typeof(ax.newSecretKey)&&""!=ax.newSecretKey){cg.newSecretKey=jws.tools.calcMD5(ax.newSecretKey);}if(
"string"==typeof(ax.accessKey)&&""!=ax.accessKey){cg.accessKey=jws.tools.calcMD5(ax.accessKey);}if(ax["owner"]){cg.owner=ax.owner;}
if(undefined!=ax["isPrivate"]){cg.isPrivate=ax.isPrivate;}if(undefined!=ax["isSystem"]){cg.isSystem=ax.isSystem;}this.sendToken(cg,
ax);}return bj;},channelCreate:function(aT,ev,ax){var bj=this.checkConnected();if(0==bj.code){var eV=false;var cL=false;var cd=null;
var cP=null;var cG=null;if(ax){if(ax.isPrivate!=undefined){eV=ax.isPrivate;}if(ax.isSystem!=undefined){cL=ax.isSystem;}if("string"==
typeof(ax.accessKey)&&""!=ax.accessKey){cd=jws.tools.calcMD5(ax.accessKey);}if("string"==typeof(ax.secretKey)&&""!=ax.secretKey){cP=
jws.tools.calcMD5(ax.secretKey);}if(ax.owner!=undefined){cG=ax.owner;}}this.sendToken({ns:jws.ChannelPlugIn.NS,type:
jws.ChannelPlugIn.CREATE_CHANNEL,channel:aT,name:ev,isPrivate:eV,isSystem:cL,accessKey:cd,secretKey:cP,owner:cG},ax);}return bj;},
channelRemove:function(aT,ax){var bj=this.checkConnected();if(0==bj.code){var cd=null;var cP=null;var cG=null;if(ax){if(
ax.secretKey!=undefined){cP=ax.secretKey;}if(ax.owner!=undefined){cG=ax.owner;}}this.sendToken({ns:jws.ChannelPlugIn.NS,type:
jws.ChannelPlugIn.REMOVE_CHANNEL,channel:aT,accessKey:cd,secretKey:cP,owner:cG},ax);}return bj;},channelGetSubscribers:function(dC,
dN,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_SUBSCRIBERS,
channel:dC,accessKey:dN},ax);}return bj;},channelGetPublishers:function(dC,dN,ax){var bj=this.checkConnected();if(0==bj.code){
this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_PUBLISHERS,channel:dC,accessKey:dN},ax);}return bj;},
channelGetSubscriptions:function(ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,type:
jws.ChannelPlugIn.GET_SUBSCRIPTIONS},ax);}return bj;},channelGetIds:function(ax){var bj=this.checkConnected();if(0==bj.code){
this.sendToken({ns:jws.ChannelPlugIn.NS,type:jws.ChannelPlugIn.GET_CHANNELS},ax);}return bj;},channelStop:function(dC,ax){var bj=
this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,channel:dC,type:jws.ChannelPlugIn.STOP},ax);}return bj;
},channelStart:function(dC,ax){var bj=this.checkConnected();if(0==bj.code){this.sendToken({ns:jws.ChannelPlugIn.NS,channel:dC,type:
jws.ChannelPlugIn.START},ax);}return bj;},setChannelCallbacks:function(ci){if(!ci){ci={};}if(ci.OnChannelCreated!==undefined){
this.fZ=ci.OnChannelCreated;}if(ci.OnChannelsReceived!==undefined){this.gA=ci.OnChannelsReceived;}if(ci.OnChannelRemoved!==
undefined){this.fQ=ci.OnChannelRemoved;}if(ci.OnChannelStarted!==undefined){this.fU=ci.OnChannelStarted;}if(ci.OnChannelStopped!==
undefined){this.fP=ci.OnChannelStopped;}if(ci.OnChannelSubscription!==undefined){this.gd=ci.OnChannelSubscription;}if(
ci.OnChannelUnsubscription!==undefined){this.gy=ci.OnChannelUnsubscription;}if(ci.OnChannelBroadcast!==undefined){this.gU=
ci.OnChannelBroadcast;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ChannelPlugIn);jws.ChatPlugIn={NS:jws.NS_BASE+
".plugins.chat",processToken:function(aR){if(aR.ns==jws.ChatPlugIn.NS){if("login"==aR.reqType){if(this.onChatRequestToken){
this.onChatRequestToken(aR);}}}},ChatLogin:function(an,aq,bZ,bv,by,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:
jws.ChatPlugIn.NS,type:"login",username:an,password:aq,server:bZ,port:bv,useSSL:by};this.sendToken(cg,ax);}return bj;},ChatLogout:
function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.ChatPlugIn.NS,type:"logout"};this.sendToken(cg,ax);}
return bj;},setChatCallbacks:function(ci){if(!ci){ci={};}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ChatPlugIn);
jws.ClientGamingPlugIn={NS:jws.NS_BASE+".plugins.clientGaming",fz:false,setActive:function(eq){if(eq){}else{}
jws.ClientGamingPlugIn.fz=eq;},isActive:function(){return jws.ClientGamingPlugIn.fz;},addPlayer:function(aT,an,bE){aT="player"+aT;
var be=document.getElementById(aT);if(!be){be=document.createElement("div");}be.id=aT;be.style.position="absolute";
be.style.overflow="hidden";be.style.opacity=0.85;be.style.left="100px";be.style.top="100px";be.style.width="75px";be.style.height=
"75px";be.style.border="1px solid black";be.style.background="url(img/player_"+bE+".png) 15px 18px no-repeat";
be.style.backgroundColor=bE;be.style.color="white";be.innerHTML="<font style=\"font-size:8pt\">Player "+an+"</font>";
document.body.appendChild(be);if(!this.cR){this.cR={};}this.cR[aT]=be;},removeAllPlayers:function(){if(this.cR){for(
var ff in this.cR){document.body.removeChild(this.cR[ff]);}}delete this.cR;},removePlayer:function(aT){aT="player"+aT;var be=
document.getElementById(aT);if(be){document.body.removeChild(be);if(this.cR){delete this.cR[aT];}}},movePlayer:function(aT,cA,cj){
aT="player"+aT;var be=document.getElementById(aT);if(be){be.style.left=cA+"px";be.style.top=cj+"px";}},processOpened:function(aR){
if(this.isActive()){this.addPlayer(aR.sourceId,aR.sourceId,"green");aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.request=
"identify";this.sendToken(aR);}},processClosed:function(aR){if(this.isActive()){this.removeAllPlayers();}},processConnected:
function(aR){if(this.isActive()){this.addPlayer(aR.sourceId,aR.sourceId,"red");}},processDisconnected:function(aR){if(this.isActive(
)){this.removePlayer(aR.sourceId);}},processToken:function(aR){if(aR.ns==jws.SystemClientPlugIn.NS){var eO,eC;if(aR.event=="move"){
eO=aR.x;eC=aR.y;this.movePlayer(aR.sourceId,eO,eC);}else if(aR.event=="identification"){this.addPlayer(aR.sourceId,aR.sourceId,
"red");eO=aR.x;eC=aR.y;this.movePlayer(aR.sourceId,eO,eC);}else if(aR.request=="identify"){var be=document.getElementById("player"+
this.getId());eO=100;eC=100;if(be){eO=parseInt(be.style.left);eC=parseInt(be.style.top);}var cg={ns:jws.SystemClientPlugIn.NS,type:
"broadcast",event:"identification",x:eO,y:eC,username:this.getUsername()};this.sendToken(cg);}}},broadcastGamingEvent:function(aR,
ax){var bj=this.checkConnected();if(bj.code==0){aR.ns=jws.SystemClientPlugIn.NS;aR.type="broadcast";aR.event="move";
aR.senderIncluded=true;aR.responseRequested=false;aR.username=this.getUsername();this.sendToken(aR,ax);}return bj;}};
jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ClientGamingPlugIn);jws.oop.declareClass('jws','EventsCallbacksHandler',null,{
OnTimeout:function(hk,bl){if(bl.meta&&"undefined"!==typeof bl.meta['OnTimeout']&&'function'===typeof(bl.meta['OnTimeout'])){
bl.meta.OnTimeout(hk);}},OnResponse:function(fk,bl){fk.elapsedTime=(new Date().getTime())-bl.sentTime;fk.processingTime=fk._pt;
delete(fk._pt);if(undefined!=bl.meta.eventDefinition){var cI=bl.filterChain.length-1;while(cI> -1){try{bl.filterChain[cI].afterCall(
bl.meta,fk);}catch(err){switch(err){case 'stop_filter_chain':return;break;default:throw err;break;}}cI--;}}if(undefined!=
bl.meta.OnResponse){bl.meta.OnResponse(fk);}if(fk.code===0){if(undefined!=bl.meta.OnSuccess)bl.meta.OnSuccess(fk);}else{if(
undefined!=bl.meta.OnFailure)bl.meta.OnFailure(fk);}}});jws.oop.declareClass('jws','EventsNotifier',null,{ID:'',jwsClient:{},NS:'',
filterChain:[],plugIns:[],initialize:function(){this.jwsClient.addPlugIn(this);for(var cI=0,gz=this.filterChain.length;cI<gz;cI++){
if(this.filterChain[cI]['initialize']){this.filterChain[cI].initialize(this);}}},notify:function(fH,ax){if(
this.jwsClient.isConnected()){var cg={};if(ax.args){cg=ax.args;delete(ax.args);}cg.ns=this.NS;cg.type=fH;ax.UTID=
jws.tools.generateSharedUTID(cg);var gP;if(!ax['OnResponse']&& !ax['OnSuccess']&& !ax['OnFailure']&& !ax['OnTimeout']){gP={};}else{
gP=new jws.EventsCallbacksHandler();}gP.args={meta:ax,filterChain:this.filterChain,sentTime:new Date().getTime()};if(undefined!=
ax.eventDefinition){for(var i=0;i<this.filterChain.length;i++){try{this.filterChain[i].beforeCall(cg,gP);}catch(err){switch(err){
case 'stop_filter_chain':return;break;default:throw err;break;}}}}this.jwsClient.sendToken(cg,gP);}else jws.console.error(
'client:not_connected');},processToken:function(aR){if((this.NS==aR.ns&&'auth.logon'==aR.reqType&&0==aR.code)){this.user.principal=
aR.username;this.user.uuid=aR.uuid;this.user.roles=aR.roles;}else if((this.NS==aR.ns&&'auth.logoff'==aR.reqType&&0==aR.code)){
this.user.clear();}else if(this.NS==aR.ns&&'s2c.en'==aR.type){var bu=aR._e;var cS=aR._p;if(undefined!=this.plugIns[cS]&&undefined!=
this.plugIns[cS][bu]){var gN=new Date().getTime();var bj=this.plugIns[cS][bu](aR);var hv=(new Date().getTime())-gN;if(aR.hc){
this.notify('s2c.r',{args:{_rid:aR.uid,_r:bj,_pt:hv}});}}else{this.notify('s2c.ens',{args:{_rid:aR.uid}});jws.console.error(
's2c_event_support_not_found for: '+bu);}}}});jws.oop.declareClass('jws','EventsPlugInGenerator',null,{generate:function(ed,cq,hx){
var cS=new jws.EventsPlugIn();cS.notifier=cq;cq.notify('plugin.getapi',{args:{plugin_id:ed},plugIn:cS,callbacks:hx,OnSuccess:
function(fk){this.plugIn.id=fk.id;this.plugIn.plugInAPI=fk.api;for(method in fk.api){eval('this.plugIn.'+method+
'=function(aOptions){if (undefined == aOptions){aOptions = {};};var eventName=this.plugInAPI.'+method+
'.type; aOptions.eventDefinition=this.plugInAPI.'+method+'; aOptions.timeout = this.plugInAPI.'+method+
'.timeout; this.notifier.notify(eventName, aOptions);}')}this.plugIn.notifier.plugIns[this.plugIn.id]=this.plugIn;if('function'==
typeof(this.callbacks)){this.callbacks(this.plugIn);}else if('function'==typeof(this.callbacks['OnSuccess'])){
this.callbacks.OnSuccess(this.plugIn);}},OnFailure:function(fk){if('function'==typeof(this.callbacks['OnFailure'])){
this.callbacks.OnFailure(this.plugIn);}else{jws.console.error('Failure generating plug-in: '+fk.msg);}}});return cS;}});
jws.oop.declareClass('jws','EventsPlugIn',null,{id:'',notifier:{},plugInAPI:{}});jws.oop.declareClass('jws','AppUser',null,{
principal:'',uuid:'',roles:[],clear:function(){this.principal='';this.roles=[];this.uuid='';},isAuthenticated:function(){return(
this.principal)?true:false},hasRole:function(hR){var gz=this.roles.length;for(var cI=0;cI<gz;cI++){if(hR==this.roles[cI])
return true}return false;}});jws.oop.declareClass('jws','EventsBaseFilter',null,{id:'',initialize:function(cq){},beforeCall:
function(aR,cr){},afterCall:function(cr,fk){}});jws.oop.declareClass('jws','SecurityFilter',jws.EventsBaseFilter,{id:'security',
user:null,initialize:function(cq){cq.user=new jws.AppUser();this.user=cq.user;},beforeCall:function(aR,cr){if(
cr.args.meta.eventDefinition.isSecurityEnabled){var lR,fF;var eQ,gW=null;var hn=false;var hu=false;var gO=false;var gG=false;
//@TODO:Support IP addresses restrictions checks on the JS client
;gW=cr.args.meta.eventDefinition.users;eQ=cr.args.meta.eventDefinition.roles;if(gW&&eQ&& !this.user.isAuthenticated()){if(
cr.OnResponse){cr.OnResponse({code: -2,msg:'User is not authenticated yet. Login first!'},cr.args);}this.OnNotAuthorized(aR);
throw 'stop_filter_chain';}if(gW.length>0){var ht=false;for(var k=0;k<gW.length;k++){fF=gW[k];if('all'!=fF){hn=(fF.substring(0,1)==
'!')?true:false;fF=(hn)?fF.substring(1):fF;if(fF==this.user.principal){ht=true;if(!hn){gO=true;}break;}}else{ht=true;gO=true;break;}
}if(!gO&&ht||0==eQ.length){cr.OnResponse({code: -2,msg:'Not autorized to notify this event. USER restrictions: '+gW.toString()},
cr.args);this.OnNotAuthorized(aR);throw 'stop_filter_chain';}}if(eQ.length>0){for(var i=0;i<eQ.length;i++){for(var j=0;j<
this.user.roles.length;j++){lR=eQ[i];if('all'!=lR){hn=(lR.substring(0,1)=='!')?true:false;lR=(hn)?lR.substring(1):lR;if(lR==
this.user.roles[j]){if(!hn){hu=true;}gG=true;break;}}else{hu=true;gG=true;break;}}if(gG){break;}}if(!hu){if(cr.OnResponse){
cr.OnResponse({code: -2,msg:'Not autorized to notify this event. ROLE restrictions: '+eQ.toString()},cr.args);}this.OnNotAuthorized(
aR);throw 'stop_filter_chain';}}}},OnNotAuthorized:function(aR){jws.console.error('not_authorized');}});jws.oop.declareClass('jws',
'CacheFilter',jws.EventsBaseFilter,{id:'cache',cache:{},user:null,initialize:function(cq){this.user=cq.user;cq.notify(
'clientcacheaspect.setstatus',{args:{enabled:true}});var hA=this;cq.plugIns['__cache__']={cleanEntries:function(event){for(var i=0,
end=event.entries.length;i<end;i++){hA.cache.removeItem_(hA.user.principal.toString()+event.suffix+event.entries[i]);}}}},
beforeCall:function(aR,cr){if(cr.args.meta.eventDefinition.isCacheEnabled){var dR=cr.args.meta.eventDefinition.type+
cr.args.meta.UTID;if(cr.args.meta.eventDefinition.isCachePrivate&&this.user.isAuthenticated()){dR=this.user.uuid+dR;}var fS=
this.cache.getItem(dR);if(null!=fS){fS.processingTime=0;cr.args.meta.elapsedTime=(new Date().getTime())-cr.sentTime;if(
cr.OnResponse){cr.OnResponse(fS,cr.args);}throw 'stop_filter_chain';}}},afterCall:function(cr,fk){if(
cr.eventDefinition.isCacheEnabled){var dR=cr.eventDefinition.type+cr.UTID;if(cr.eventDefinition.isCachePrivate){dR=this.user.uuid+
dR;}this.cache.setItem(dR,fk,{expirationAbsolute:null,expirationSliding:cr.eventDefinition.cacheTime,priority:CachePriority.High});}
}});jws.oop.declareClass('jws','ValidatorFilter',jws.EventsBaseFilter,{id:'validator',beforeCall:function(aR,cr){var eU=
cr.args.meta.eventDefinition.incomingArgsValidation;for(var i=0;i<eU.length;i++){if(undefined===aR[eU[i].name]&& !eU[i].optional){
if(cr.OnResponse){cr.OnResponse({code: -4,msg:'Argument \''+eU[i].name+'\' is required!'},cr.args);}throw 'stop_filter_chain';}
else if(aR.hasOwnProperty(eU[i].name)){var hh=eU[i].type;var gB=jws.tools.getType(aR[eU[i].name]);if('number'==hh&&('integer'==gB||
'double'==gB)){return;}if('double'==hh&&('integer'==gB)){return;}if(hh!=gB){if(cr.OnResponse){cr.OnResponse({code: -4,msg:
'Argument \''+eU[i].name+'\' has invalid type. Required type is: \''+hh+'\'!'},cr.args);}throw 'stop_filter_chain';}}}}});
jws.ExtProcessPlugIn={NS:jws.NS_BASE+".plugins.extprocess",processToken:function(aR){if(aR.ns===jws.ExtProcessPlugIn.NS){if(
"selectSQL"===aR.reqType){if(this.OnExtProcessRowSet){this.OnExtProcessRowSet(aR);}}}},extProcessCall:function(hJ,bl,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ExtProcessPlugIn.NS,type:"call",alias:hJ,args:bl};this.sendToken(cg,ax);}
return bj;},setExtProcessCallbacks:function(ci){if(!ci){ci={};}if(ci.OnExtProcessMsg!==undefined){this.OnExtProcessMsg=
ci.OnExtProcessMsg;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.ExtProcessPlugIn);
//	---------------------------------------------------------------------------
//	jWebSocket Filesystem plug-in (Community Edition, CE)
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
jws.FileSystemPlugIn={NS:jws.NS_BASE+".plugins.filesystem",ALIAS_PRIVATE:"privateDir",ALIAS_PUBLIC:"publicDir",kZ:"sessionDir",kJ:
"uuidDir",NOT_FOUND_ERR:1,SECURITY_ERR:2,ABORT_ERR:3,NOT_READABLE_ERR:4,ENCODING_ERR:5,NO_MODIFICATION_ALLOWED_ERR:6,
INVALID_STATE_ERR:7,SYNTAX_ERR:8,INVALID_MODIFICATION_ERR:9,QUOTA_EXCEEDED_ERR:10,TYPE_MISMATCH_ERR:11,PATH_EXISTS_ERR:12,
processToken:function(aR){if(aR.ns===jws.FileSystemPlugIn.NS){if("load"===aR.reqType){if(0===aR.code){if(this.OnFileLoaded){
this.OnFileLoaded(aR);}}else{if(this.OnFileError){this.OnFileError(aR);}}}else if("send"===aR.reqType){if(0===aR.code){if(
this.OnFileSent){this.OnFileSent(aR);}}else{if(this.OnFileError){this.OnFileError(aR);}}}else if("event"===aR.type){if(
"filesaved"===aR.name){if(this.OnFileSaved){this.OnFileSaved(aR);}}else if("filereceived"===aR.name){if(this.OnFileReceived){
this.OnFileReceived(aR);}}else if("filedeleted"===aR.name){if(this.OnFileDeleted){this.OnFileDeleted(aR);}}}}},fileGetFilelist:
function(hJ,hd,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{path:null,recursive:false,includeDirs:false});
var cg={ns:jws.FileSystemPlugIn.NS,type:"getFilelist",alias:hJ,recursive:ax.recursive,includeDirs:ax.includeDirs,filemasks:hd,path:
ax.path};this.sendToken(cg,ax);}return bj;},fileDelete:function(bB,fR,ax){ax=jws.getOptions(ax,{scope:jws.SCOPE_PRIVATE,notify:
false});var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.FileSystemPlugIn.NS,type:"delete",filename:bB,force:fR,notify:(
jws.SCOPE_PUBLIC===ax.scope)&&ax.notify,scope:ax.scope};if("undefined"!==typeof ax.alias){cg.alias=ax.alias;}this.sendToken(cg,ax);}
return bj;},fileExists:function(bB,hJ,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.FileSystemPlugIn.NS,type:
"exists",filename:bB,alias:hJ};this.sendToken(cg,ax);}return bj;},fileLoad:function(bB,hJ,ax){var bj=this.createDefaultResult();ax=
jws.getOptions(ax,{encoding:"base64"});if(this.isConnected()){var cg={ns:jws.FileSystemPlugIn.NS,type:"load",alias:hJ,filename:bB};
if(ax.encoding){cg.encoding=ax.encoding;}this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg=
"Not connected.";}return bj;},ih:function(bB,aw,ax){var bj=this.createDefaultResult();ax=jws.getOptions(ax,{encoding:"base64",
encode:true,notify:false,scope:jws.SCOPE_PRIVATE});var dp=null;if(ax.append){dp="append";}else{dp="save";}if(!dp){bj.code= -1;
bj.msg="No save/append option passed.";return bj;}var ji={};if(ax.encode){ji.data=ax.encoding;}if(this.isConnected()){var cg={ns:
jws.FileSystemPlugIn.NS,type:dp,enc:ji,scope:ax.scope,encoding:ax.encoding,encode:ax.encode,notify:(jws.SCOPE_PUBLIC===ax.scope)&&
ax.notify,data:aw,filename:bB};if(ax.alias){cg.alias=ax.alias;}this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey=
"jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},fileSave:function(bB,aw,ax){if(!ax){ax={};}ax.append=false;
return this.ih(bB,aw,ax);},fileAppend:function(bB,aw,ax){if(!ax){ax={};}ax.append=true;return this.ih(bB,aw,ax);},fileSend:function(
dW,bB,aw,ax){var dY=false;var bs="base64";var gV=true;if(ax){bs=ax["encoding"]||"base64";if(ax.isNode!==undefined){dY=ax.isNode;}if(
ax.encode!==undefined){gV=ax.encode;}}var bj=this.checkConnected();if(0===bj.code){var ji={};if(gV){ji.data=bs;}var cg={ns:
jws.FileSystemPlugIn.NS,type:"send",data:aw,enc:ji,encode:gV,encoding:bs,filename:bB};if(dY){cg.unid=dW;}else{cg.targetId=dW;}
this.sendToken(cg,ax);}return bj;},fileGetErrorMsg:function(eY){var dm="unkown";switch(eY){case jws.FileSystemPlugIn.NOT_FOUND_ERR:{
dm="NOT_FOUND_ERR";break;}case jws.FileSystemPlugIn.SECURITY_ERR:{dm="SECURITY_ERR";break;}case jws.FileSystemPlugIn.ABORT_ERR:{dm=
"ABORT_ERR";break;}case jws.FileSystemPlugIn.NOT_READABLE_ERR:{dm="NOT_READABLE_ERR";break;}case jws.FileSystemPlugIn.ENCODING_ERR:{
dm="ENCODING_ERR";break;}case jws.FileSystemPlugIn.NO_MODIFICATION_ALLOWED_ERR:{dm="NO_MODIFICATION_ALLOWED_ERR";break;}
case jws.FileSystemPlugIn.INVALID_STATE_ERR:{dm="INVALID_STATE_ERR";break;}case jws.FileSystemPlugIn.SYNTAX_ERR:{dm="SYNTAX_ERR";
break;}case jws.FileSystemPlugIn.INVALID_MODIFICATION_ERR:{dm="INVALID_MODIFICATION_ERR";break;}
case jws.FileSystemPlugIn.QUOTA_EXCEEDED_ERR:{dm="QUOTA_EXCEEDED_ERR";break;}case jws.FileSystemPlugIn.TYPE_MISMATCH_ERR:{dm=
"TYPE_MISMATCH_ERR";break;}case jws.FileSystemPlugIn.PATH_EXISTS_ERR:{dm="PATH_EXISTS_ERR";break;}}return dm;},fileLoadLocal:
function(ds,ax){var bj={code:0,msg:"ok"};if(!ds|| !ds.files){return{code: -1,msg:"No input file element passed."};}if(undefined===
window.FileReader){return{code: -1,msg:"Your browser does not yet support the HTML5 File jQ."};}if(!ax){ax={};}ax.encoding="base64";
var cH=ds.files;if(!cH|| !cH.length){return{code: -1,msg:"No files selected."};}for(var db=0,dB=cH.length;db<dB;db++){var dw=cH[db];
var dh=new FileReader();var dJ=this;dh.onload=(function(cw){return function(cz){if(dJ.OnLocalFileRead||ax.OnSuccess){var cg={
encoding:ax.encoding,fileName:(cw.fileName?cw.fileName:cw.name),fileSize:(cw.fileSize?cw.fileSize:cw.size),type:cw.type,
lastModified:cw.lastModifiedDate,data:cz.target.result};if(ax.args){cg.args=ax.args;}if(ax.action){cg.action=ax.action;}}if(
dJ.OnLocalFileRead){dJ.OnLocalFileRead(cg);}if(ax.OnSuccess){ax.OnSuccess(cg);}};})(dw);dh.onerror=(function(cw){return function(cz)
{if(dJ.OnLocalFileError||ax.OnFailure){var dn=cz.target.error.code;var cg={code:dn,msg:dJ.fileGetErrorMsg(dn)};if(ax.args){cg.args=
ax.args;}if(ax.action){cg.action=ax.action;}}if(dJ.OnLocalFileError){dJ.OnLocalFileError(cg);}if(ax.OnFailure){ax.OnFailure(cg);}};}
)(dw);try{dh.readAsDataURL(dw);}catch(dQ){if(dJ.OnLocalFileError||ax.OnFailure){var cg={code: -1,msg:dQ.message};if(ax.args){
cg.args=ax.args;}if(ax.action){cg.action=ax.action;}}if(dJ.OnLocalFileError){dJ.OnLocalFileError(cg);}if(ax.OnFailure){ax.OnFailure(
cg);}}}return bj;},setFileSystemCallbacks:function(ci){if(!ci){ci={};}if(ci.OnFileLoaded!==undefined){this.OnFileLoaded=
ci.OnFileLoaded;}if(ci.OnFileSaved!==undefined){this.OnFileSaved=ci.OnFileSaved;}if(ci.OnFileDeleted!==undefined){
this.OnFileDeleted=ci.OnFileDeleted;}if(ci.OnFileReceived!==undefined){this.OnFileReceived=ci.OnFileReceived;}if(ci.OnFileSent!==
undefined){this.OnFileSent=ci.OnFileSent;}if(ci.OnFileError!==undefined){this.OnFileError=ci.OnFileError;}if(ci.OnLocalFileRead!==
undefined){this.OnLocalFileRead=ci.OnLocalFileRead;}if(ci.OnLocalFileError!==undefined){this.OnLocalFileError=ci.OnLocalFileError;}}
};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.FileSystemPlugIn);jws.ioc={};jws.ioc.ServiceReference=function ServiceReference(
ev){this._name=ev;};jws.ioc.ServiceReference.prototype.getName=function(){return this._name;};jws.ioc.ParameterReference=
function ParameterReference(ev){this._name=ev;};jws.ioc.ParameterReference.prototype.getName=function(){return this._name;};
jws.ioc.DOMReference=function DOMReference(aT){this._id=aT;};jws.ioc.DOMReference.prototype.getId=function(){return this._id;};
jws.ioc.MethodExecutionReference=function MethodExecutionReference(iU,hL,hP){this._source=iU;this._methodName=hL;this._arguments=hP;
};jws.ioc.MethodExecutionReference.prototype.getSource=function(){return this._source;};
jws.ioc.MethodExecutionReference.prototype.setSource=function(iU){this._source=iU;return this;};
jws.ioc.MethodExecutionReference.prototype.getMethodName=function(){return this._methodName;};
jws.ioc.MethodExecutionReference.prototype.setMethodName=function(hL){this._methodName=hL;return this;};
jws.ioc.MethodExecutionReference.prototype.getArguments=function(){return this._arguments;};
jws.ioc.MethodExecutionReference.prototype.setArguments=function(hP){this._arguments=hP;return this;};jws.ioc.ServiceContainer=
function ServiceContainer(){this._services={};this._parameters={};};jws.ioc.ServiceContainer.prototype.getParameter=function(ev){if(
this.hasParameter(ev)){return this._parameters[ev];}throw new Error("IndexOutOfBound:"+ev);};
jws.ioc.ServiceContainer.prototype.setParameter=function(ev,ck){this._parameters[ev]=ck;return this;};
jws.ioc.ServiceContainer.prototype.getService=function(ev){if(this.hasService(ev)){return this._services[ev];}throw new Error(
"IndexOutOfBound:"+ev);};jws.ioc.ServiceContainer.prototype.setService=function(ev,jz){this._services[ev]=jz;return this;};
jws.ioc.ServiceContainer.prototype.hasParameter=function(ev){if(!ev){throw new Error("RequiredParameter:name");}if(undefined!==
this._parameters[ev])return true;return false;};jws.ioc.ServiceContainer.prototype.hasService=function(ev){if(!ev){throw new Error(
"RequiredParameter:name");}if(undefined!==this._services[ev])return true;return false;};
jws.ioc.ServiceContainer.prototype.removeParameter=function(ev){if(!ev){throw new Error("RequiredParameter:name");}var hV=null;if(
undefined!==this._parameters[ev]){hV=this._parameters[ev];delete this._parameters[ev];}return hV;};
jws.ioc.ServiceContainer.prototype.removeService=function(ev){if(!ev){throw new Error("RequiredParameter:name");}var hV=null;if(
undefined!==this._services[ev]){hV=this._services[ev];delete this._services[ev];}return hV;};jws.ioc.ServiceDefinition=
function ServiceDefinition(hm){this._name=null;this._className=null;this._shared=true;this._initArguments=null;this._methodCalls=
new Array();this._factoryService=null;this._factoryMethod=null;this._initMethod=null;this._destroyMethod=null;this._onCreate=null;
this._onRemove=null;this._extend=null;this._aspects=new Array();if(undefined!=hm.className){this._className=hm.className;}if(
undefined!=hm.name){this._name=hm.name;}if(undefined!=hm.shared){this._shared=hm.shared;}if(undefined!=hm.factoryService){
this._factoryService=hm.factoryService;}if(undefined!=hm.factoryMethod){this._factoryMethod=hm.factoryMethod;}if(undefined!=
hm.initArguments){this._initArguments=hm.initArguments;}if(undefined!=hm.initMethod){this._initMethod=hm.initMethod;}if(undefined!=
hm.destroyMethod){this._destroyMethod=hm.destroyMethod;}if("function"==typeof(hm.onCreate)){this._onCreate=hm.onCreate;}if(
"function"==typeof(hm.onRemove)){this._onRemove=hm.onRemove;}if(hm.methodCalls instanceof Array){this._methodCalls=hm.methodCalls;}
if(null!=hm.extend){this._extend=hm.extend;}if(null!=hm.aspects){this._aspects=hm.aspects;}};
jws.ioc.ServiceDefinition.prototype.getName=function(){return this._name;};jws.ioc.ServiceDefinition.prototype.setName=function(ev){
this._name=ev;return this;};jws.ioc.ServiceDefinition.prototype.getClassName=function(){return this._className;};
jws.ioc.ServiceDefinition.prototype.setClassName=function(jw){this._className=jw;return this;};
jws.ioc.ServiceDefinition.prototype.isShared=function(){return this._shared;};jws.ioc.ServiceDefinition.prototype.setShared=
function(ii){this._shared=ii;return this;};jws.ioc.ServiceDefinition.prototype.getFactoryMethod=function(){
return this._factoryMethod;};jws.ioc.ServiceDefinition.prototype.setFactoryMethod=function(hO){this._factoryMethod=hO;return this;};
jws.ioc.ServiceDefinition.prototype.getFactoryService=function(){return this._factoryService;};
jws.ioc.ServiceDefinition.prototype.setFactoryService=function(hX){this._factoryService=hX;return this;};
jws.ioc.ServiceDefinition.prototype.getInitArguments=function(){return this._initArguments;};
jws.ioc.ServiceDefinition.prototype.setInitArguments=function(hP){this._initArguments=hP;return this;};
jws.ioc.ServiceDefinition.prototype.getOnCreate=function(){return this._onCreate;};jws.ioc.ServiceDefinition.prototype.setOnCreate=
function(iu){this._onCreate=iu;return this;};jws.ioc.ServiceDefinition.prototype.getOnRemove=function(){return this._onRemove;};
jws.ioc.ServiceDefinition.prototype.setOnRemove=function(iu){this._onRemove=iu;return this;};
jws.ioc.ServiceDefinition.prototype.getInitMethod=function(){return this._initMethod;};
jws.ioc.ServiceDefinition.prototype.setInitMethod=function(hL){this._initMethod=hL;return this;};
jws.ioc.ServiceDefinition.prototype.getDestroyMethod=function(){return this._destroyMethod;};
jws.ioc.ServiceDefinition.prototype.setDestroyMethod=function(hL){this._destroyMethod=hL;return this;};
jws.ioc.ServiceDefinition.prototype.getExtend=function(){return this._extend;};jws.ioc.ServiceDefinition.prototype.setExtend=
function(jy){this._extend=jy;return this;};jws.ioc.ServiceDefinition.prototype.getAspects=function(){return this._aspects;};
jws.ioc.ServiceDefinition.prototype.setAspects=function(jD){this._aspects=jD;return this;};
jws.ioc.ServiceDefinition.prototype.addAspect=function(hM,it){if(!hM){throw new Error("RequiredParameter:pointcut");}if(!it){
throw new Error("RequiredParameter:advices");}this._aspects.push({pointcut:hM,advices:it});return this;};
jws.ioc.ServiceDefinition.prototype.addMethodCall=function(jB,hP){if(!jB){throw new Error("RequiredParameter:method");}
this._methodCalls.push({method:jB,arguments:hP});return this;};jws.ioc.ServiceDefinition.prototype.getMethodCalls=function(){
return this._methodCalls;};jws.ioc.ServiceContainerBuilder=function ServiceContainerBuilder(hm){this._definitions={};this._id=null;
if(hm.id){this._id=hm.id;}else{throw new Error("RequiredParameter:{config.id}");}if(hm.container){this._container=hm.container;}
else{throw new Error("RequiredParameter:{config.container}");}if(hm.definitions){this._definitions=hm.definitions;}var hY=
new RegExp(/.*/);aop.around(this,hY,function(bl){jws.console.debug(">> "+this._id+": Calling method '"+bl.method+
"' with arguments '"+JSON.stringify(bl.args)+"'...");var ia=bl.proceed();jws.console.debug("<< "+this._id+": Response for '"+
bl.method+"' method call: "+JSON.stringify(ia));return ia;});};jws.ioc.ServiceContainerBuilder.prototype.getParameter=function(ev){
return this._container.getParameter(ev);};jws.ioc.ServiceContainerBuilder.prototype.getServiceDefinition=function(ev){if(
this.hasServiceDefinition(ev)){return this._definitions[ev];}throw new Error("IndexOutOfBound:"+ev);};
jws.ioc.ServiceContainerBuilder.prototype.setParameter=function(ev,ck){this._container.setParameter(ev,ck);return this;};
jws.ioc.ServiceContainerBuilder.prototype.setService=function(ev,ck){this._container.setService(ev,ck);return this;};
jws.ioc.ServiceContainerBuilder.prototype.getService=function(ev){var hV=null;try{hV=this._container.getService(ev);}catch(err){
switch(err.message){case "IndexOutOfBound:"+ev:var im=this.getServiceDefinition(ev);hV=this.createService(im);break;default:
throw err;break;}}return hV;};jws.ioc.ServiceContainerBuilder.prototype.hasParameter=function(ev){
return this._container.hasParameter(ev);};jws.ioc.ServiceContainerBuilder.prototype.hasService=function(ev){
return this.hasServiceDefinition(ev)||this._container.hasService(ev);};jws.ioc.ServiceContainerBuilder.prototype.removeParameter=
function(ev){return this._container.removeParameter(ev);};jws.ioc.ServiceContainerBuilder.prototype.removeService=function(ev){
var jf=null;try{jf=this._container.removeService(ev);}catch(err){}var gh=this._definitions[ev];if(gh){delete this._definitions[ev];
if(null!=gh.getOnRemove()){gh.getOnRemove()(jf);}}return jf;};jws.ioc.ServiceContainerBuilder.prototype.destroy=function(){var gh=
null;var jf=null;for(var jv in this._definitions){gh=this._definitions[jv];jf=this.removeService(jv);if(null!=jf&&null!=
gh.getDestroyMethod()){jf[gh.getDestroyMethod()]();}}};jws.ioc.ServiceContainerBuilder.prototype.addServiceDefinition=function(ik){
var jv=ik.getName();if(null==jv){var jo="";if(null!=ik.getClassName()){jv=ik.getClassName().toString().toLowerCase();}while(
this.hasServiceDefinition(jv+jo)){jo="#"+parseInt(Math.random()*10000000);}ik.setName(jv+jo);jv=jv+jo;}if(
this._container.hasService(jv)){this._container.removeService(jv);}this._definitions[jv]=ik;return this;};
jws.ioc.ServiceContainerBuilder.prototype.register=function(ev,jw){return this.addServiceDefinition(new jws.ioc.ServiceDefinition({
name:ev,className:jw})).getServiceDefinition(ev);};jws.ioc.ServiceContainerBuilder.prototype.getServiceDefinition=function(ev){if(
this.hasServiceDefinition(ev)){return this._definitions[ev];}throw new Error("IndexOutOfBound:"+ev);};
jws.ioc.ServiceContainerBuilder.prototype.hasServiceDefinition=function(ev){if(!ev){throw new Error("RequiredParameter:name");}if(
undefined!==this._definitions[ev]){return true;}return false;};jws.ioc.ServiceContainerBuilder.prototype._parseArguments=function(
hP){if(typeof(hP)!="object"){return hP;}if(hP instanceof jws.ioc.ServiceReference){return this.getService(hP.getName());}else if(
hP instanceof jws.ioc.ServiceDefinition){this.addServiceDefinition(hP);return this.getService(hP.getName());}else if(
hP instanceof jws.ioc.ParameterReference){return this.getParameter(hP.getName());}else if(hP instanceof jws.ioc.ServiceDefinition){
return this.getService(hP.getName());}else if(hP instanceof jws.ioc.DOMReference){return document.getElementById(hP.getId());}
else if(hP instanceof jws.ioc.MethodExecutionReference){var bu=hP.getMethodName();var jm=hP.getSource();var hW=hP.getArguments();if(
jm instanceof jws.ioc.ServiceReference||jm instanceof jws.ioc.ParameterReference||jm instanceof jws.ioc.DOMReference||
jm instanceof jws.ioc.MethodExecutionReference){jm=this._parseArguments(jm);}hW=this._parseArguments(hW);return jm[bu](hW);}var bC;
if(hP instanceof Array){bC=new Array();var gz=hP.length;for(var cI=0;cI<gz;cI++){bC[cI]=this._parseArguments(hP[cI]);}}else{bC={};
for(var dR in hP){bC[dR]=this._parseArguments(hP[dR]);}}return bC;};jws.ioc.ServiceContainerBuilder.prototype.createService=
function(ik){var jf=null;var gh=ik;var cI=0;if("string"==typeof(gh)){gh=this.getServiceDefinition(gh);}if(null!=gh.getExtend()){gh=
this.extendDefinition(gh,this.getServiceDefinition(gh.getExtend()));}if(null!=gh.getFactoryMethod()){var iA=gh.getFactoryMethod();
var iT=null;if(typeof(iA)=="object"){iT=this._parseArguments(iA.arguments);iA=iA.method;}if(null==gh.getFactoryService()){jf=eval(
gh.getClassName()+"[iA](iT);");}else{jf=this.getService(gh.getFactoryService())[iA](iT);}jf["__SERVICE_NAME__"]=gh.getName();
this._applyAspects(gh.getAspects(),jf);}else{jf=eval("new "+gh.getClassName()+"();");jf["__SERVICE_NAME__"]=gh.getName();
this._applyAspects(gh.getAspects(),jf);var jE=gh.getInitMethod();if(null!=gh.getInitArguments()){if(null==jE){jE="initialize";}
jf[jE](this._parseArguments(gh.getInitArguments()));}else if(null!=jE){jf[jE]();}}var jC=gh.getMethodCalls();for(cI=0;cI<jC.length;
cI++){if(null!=jC[cI].arguments){jf[jC[cI].method](this._parseArguments(jC[cI].arguments));}else{jf[jC[cI].method]();}}if(true==
gh.isShared()){this._container.setService(gh.getName(),jf);}if(null!=gh.getOnCreate()){gh.getOnCreate()(jf);}return jf;};
jws.ioc.ServiceContainerBuilder.prototype._applyAspects=function(jD,jz){var gz=jD.length;var jr=null;if(gz>0){for(var cI=0;cI<gz;
cI++){jr=jD[cI];aop.add(jz,jr.pointcut,jr.advices);}}};jws.ioc.ServiceContainerBuilder.prototype.extendDefinition=function(jq,iP){
var ju=new jws.ioc.ServiceDefinition({name:jq.getName(),className:jq.getClassName(),shared:jq.getShared(),extend:jq.getExtend(),
initArguments:(null!=jq.getInitArguments())?jq.getInitArguments():iP.getInitArguments(),initMethod:(null!=jq.getInitMethod())?
jq.getInitMethod():iP.getInitMethod(),destroyMethod:(null!=jq.getDestroyMethod())?jq.getDestroyMethod():iP.getDestoryMethod(),
factoryMethod:(null!=jq.getFactoryMethod())?jq.getFactoryMethod():iP.getFactoryMethod(),methodCalls:(0<jq.getMethodCalls().length)?
jq.getMethodCalls():iP.getMethodCalls(),onCreate:(null!=jq.getOnCreate())?jq.getOnCreate():iP.getOnCreate(),onRemove:(null!=
jq.getOnRemove())?jq.getOnRemove():iP.getOnRemove(),aspects:(0<jq.getAspects().length)?jq.getAspects():iP.getAspects()});return ju;}
;jws.sc=new jws.ioc.ServiceContainerBuilder({id:"jws.sc",container:new jws.ioc.ServiceContainer()});
//	---------------------------------------------------------------------------
//	jWebSocket ItemStorage Client Plug-In (Community Edition, CE)
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
jws.ItemStoragePlugIn={NS:jws.NS_BASE+".plugins.itemstorage",processToken:function(aR){if(aR.ns===jws.ItemStoragePlugIn.NS){if(
"event"===aR.type){if("itemSaved"===aR.name){if(this.OnItemSaved){this.OnItemSaved(aR);}}else if("itemRemoved"===aR.name){if(
this.OnItemRemoved){this.OnItemRemoved(aR);}}else if("collectionCleaned"===aR.name){if(this.OnCollectionCleaned){
this.OnCollectionCleaned(aR);}}else if("collectionRestarted"===aR.name){if(this.OnCollectionRestarted){this.OnCollectionRestarted(
aR);}}else if("collectionRemoved"===aR.name){if(this.OnCollectionRemoved){this.OnCollectionRemoved(aR);}}else if(
"collectionSaved"===aR.name){if(this.OnCollectionSaved){this.OnCollectionSaved(aR);}}else if("authorization"===aR.name){if(
this.OnCollectionAuthorization){this.OnCollectionAuthorization(aR);}}else if("subscription"===aR.name){if(
this.OnCollectionSubscription){this.OnCollectionSubscription(aR);}}else if("unsubscription"===aR.name){if(
this.OnCollectionUnsubscription){this.OnCollectionUnsubscription(aR);}}}}},createCollection:function(iv,ix,hZ,iK,iy,ax){var bj=
this.checkConnected();if(0===bj.code){if("string"===typeof(hZ)&&""!==hZ){hZ=jws.tools.calcMD5(hZ);}if("string"===typeof(iK)&&""!==
iK){iK=jws.tools.calcMD5(iK);}var cg={ns:jws.ItemStoragePlugIn.NS,type:"createCollection",collectionName:iv,itemType:ix,
secretPassword:hZ,accessPassword:iK,"private":iy};if(ax.capacity){cg.capacity=ax.capacity;}if(ax.capped){cg.capped=ax.capped;}
this.sendToken(cg,ax);}return bj;},removeCollection:function(iv,hZ,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.ItemStoragePlugIn.NS,type:"removeCollection",collectionName:iv,secretPassword:hZ};this.sendToken(cg,ax);}return bj;},
existsCollection:function(iv,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:
"existsCollection",collectionName:iv};this.sendToken(cg,ax);}return bj;},subscribeCollection:function(iv,iK,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"subscribe",collectionName:iv,accessPassword:iK};
this.sendToken(cg,ax);}return bj;},unsubscribeCollection:function(iv,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.ItemStoragePlugIn.NS,type:"unsubscribe",collectionName:iv};this.sendToken(cg,ax);}return bj;},authorizeCollection:function(iv,
hZ,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"authorize",collectionName:iv,
secretPassword:hZ};this.sendToken(cg,ax);}return bj;},clearCollection:function(iv,hZ,ax){var bj=this.checkConnected();if(0===
bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"clearCollection",collectionName:iv,secretPassword:hZ};this.sendToken(cg,ax);}
return bj;},editCollection:function(iv,hZ,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:
"editCollection",collectionName:iv,secretPassword:hZ};if("string"===typeof(ax.newSecretPassword)&&""!==ax.newSecretPassword){
cg.newSecretPassword=jws.tools.calcMD5(ax.newSecretPassword);}if("string"===typeof(ax.accessPassword)&&""!==ax.accessPassword){
cg.accessPassword=jws.tools.calcMD5(ax.accessPassword);}if(ax["private"]){cg["private"]=ax["private"];}if(ax.capped){cg.capped=
ax.capped;}if(ax.capacity){cg.capacity=ax.capacity;}this.sendToken(cg,ax);}return bj;},restartCollection:function(iv,hZ,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"restartCollection",collectionName:iv,secretPassword:
hZ};this.sendToken(cg,ax);}return bj;},getCollectionNames:function(jk,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.ItemStoragePlugIn.NS,type:"getCollectionNames",userOnly:jk||false};if(!ax){ax={};}if(ax.offset){cg.offset=ax.offset;}if(
ax.length){cg.length=ax.length;}this.sendToken(cg,ax);}return bj;},findCollection:function(iv,ax){var bj=this.checkConnected();if(
0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"findCollection",collectionName:iv};this.sendToken(cg,ax);}return bj;},
saveItem:function(iv,iM,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"saveItem",
collectionName:iv,item:iM};this.sendToken(cg,ax);}return bj;},removeItem:function(iv,jc,ax){var bj=this.checkConnected();if(0===
bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"removeItem",collectionName:iv,itemPK:jc};this.sendToken(cg,ax);}return bj;},
findItemByPK:function(iv,jc,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:
"findItemByPK",collectionName:iv,itemPK:jc};this.sendToken(cg,ax);}return bj;},existsItem:function(iv,jc,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"existsItem",collectionName:iv,itemPK:jc};
this.sendToken(cg,ax);}return bj;},listItems:function(iv,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.ItemStoragePlugIn.NS,type:"listItems",collectionName:iv,offset:ax["offset"]||0,length:ax["length"]||10};this.sendToken(cg,ax);}
return bj;},findItemDefinition:function(ix,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,
type:"findDefinition",itemType:ix};this.sendToken(cg,ax);}return bj;},existsItemDefinition:function(ix,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,type:"existsDefinition",itemType:ix};this.sendToken(cg,ax)
;}return bj;},listItemDefinitions:function(ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ItemStoragePlugIn.NS,
type:"listDefinitions",offset:ax["offset"]||0,length:ax["length"]||10};this.sendToken(cg,ax);}return bj;},setItemStorageCallbacks:
function(ci){if(!ci){ci={};}if(ci.OnItemSaved!==undefined){this.OnItemSaved=ci.OnItemSaved;}if(ci.OnItemRemoved!==undefined){
this.OnItemRemoved=ci.OnItemRemoved;}if(ci.OnCollectionCleaned!==undefined){this.OnCollectionCleaned=ci.OnCollectionCleaned;}if(
ci.OnCollectionRestarted!==undefined){this.OnCollectionRestarted=ci.OnCollectionRestarted;}if(ci.OnCollectionRemoved!==undefined){
this.OnCollectionRemoved=ci.OnCollectionRemoved;}if(ci.OnCollectionSaved!==undefined){this.OnCollectionSaved=ci.OnCollectionSaved;}
if(ci.OnCollectionSubscription!==undefined){this.OnCollectionSubscription=ci.OnCollectionSubscription;}if(
ci.OnCollectionAuthorization!==undefined){this.OnCollectionAuthorization=ci.OnCollectionAuthorization;}if(
ci.OnCollectionUnsubscription!==undefined){this.OnCollectionUnsubscription=ci.OnCollectionUnsubscription;}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.ItemStoragePlugIn);jws.JDBCPlugIn={NS:jws.NS_BASE+".plugins.jdbc",processToken:function(aR){if(
aR.ns===jws.JDBCPlugIn.NS){if("selectSQL"===aR.reqType){if(this.OnJDBCRowSet){this.OnJDBCRowSet(aR);}}}},jdbcQuerySQL:function(bn,
ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:"querySQL",
sql:bn,alias:ax.alias};this.sendToken(cg,ax);}return bj;},jdbcQueryScript:function(gC,ax){var bj=this.checkConnected();if(0===
bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:"querySQL",script:gC,alias:ax.alias};this.sendToken(
cg,ax);}return bj;},jdbcUpdateSQL:function(bn,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});
var cg={ns:jws.JDBCPlugIn.NS,type:"updateSQL",sql:bn,alias:ax.alias};this.sendToken(cg,ax);}return bj;},jdbcUpdateScript:function(
gC,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:
"updateSQL",script:gC,alias:ax.alias};this.sendToken(cg,ax);}return bj;},jdbcExecSQL:function(bn,ax){var bj=this.checkConnected();
if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:"execSQL",sql:bn,alias:ax.alias};
this.sendToken(cg,ax);}return bj;},jdbcSelect:function(bn,ax){var bj=this.checkConnected();if(0===bj.code){var gF=bn.tables;if(gF&&
 !gF.length){gF=[gF];}var eS=bn.fields;if(eS&& !eS.length){eS=[eS];}var gJ=bn.joins;if(gJ&& !gJ.length){gJ=[gJ];}var gI=bn.orders;
if(gI&& !gI.length){gI=[gI];}ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:"select",tables:gF,joins:gJ,
fields:eS,orders:gI,where:bn.where,group:bn.group,having:bn.having,alias:ax.alias};this.sendToken(cg,ax);}return bj;},jdbcUpdate:
function(bn,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:
"update",table:bn.table,fields:bn.fields,values:bn.values,where:bn.where,alias:ax.alias};this.sendToken(cg,ax);}return bj;},
jdbcInsert:function(bn,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:
jws.JDBCPlugIn.NS,type:"insert",table:bn.table,fields:bn.fields,values:bn.values,alias:ax.alias};this.sendToken(cg,ax);}return bj;},
jdbcDelete:function(bn,ax){var bj=this.checkConnected();if(0===bj.code){ax=jws.getOptions(ax,{alias:null});var cg={ns:
jws.JDBCPlugIn.NS,type:"delete",table:bn.table,where:bn.where,alias:ax.alias};this.sendToken(cg,ax);}return bj;},jdbcGetPrimaryKeys:
function(hy,ax){var bj=this.checkConnected();if(0===bj.code){var gY=1;if(ax){if(ax.count!==undefined){gY=ax.count;}}ax=
jws.getOptions(ax,{alias:null});var cg={ns:jws.JDBCPlugIn.NS,type:"getNextSeqVal",sequence:hy,count:gY,alias:ax.alias};
this.sendToken(cg,ax);}return bj;},setJDBCCallbacks:function(ci){if(!ci){ci={};}if(ci.OnJDBCRowSet!==undefined){this.OnJDBCRowSet=
ci.OnJDBCRowSet;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.JDBCPlugIn);jws.JMSPlugIn={NS:jws.NS_BASE+".plugins.jms",
NS_JMS_GATEWAY:"org.jwebsocket.jms.gateway",NS_JMS_DEMO:"org.jwebsocket.jms.demo",JMS_GATEWAY_ID:"org.jwebsocket.jms.gateway",
JMS_GATEWAY_TOPIC:"org.jwebsocket.jms.gateway",SEND_TEXT:"sendJmsText",SEND_TEXT_MESSAGE:"sendJmsTextMessage",SEND_MAP:"sendJmsMap",
SEND_MAP_MESSAGE:"sendJmsMapMessage",LISTEN:"listenJms",LISTEN_MESSAGE:"listenJmsMessage",UNLISTEN:"unlistenJms",PING:"ping",
IDENTIFY:"identify",kU:"isBrokerConnected",processToken:function(aR){if(aR.ns===jws.JMSPlugIn.NS_JMS_GATEWAY){if("response"===
aR.type){if("ping"===aR.reqType){if(this.OnPing){this.OnPing(aR);}}else if("identify"===aR.reqType){if(this.OnIdentify){
this.OnIdentify(aR);}}}}else if(aR.ns===jws.JMSPlugIn.NS){if("event"===aR.type){if("BrokerException"===aR.name){if(this.kr){this.kr(
aR);}}else if("BrokerTransportInterrupted"===aR.name){if(this.kG){this.kG(aR);}}else if("BrokerTransportResumed"===aR.name){if(
this.jW){this.jW(aR);}}else if("handleJmsText"===aR.name){if(this.OnHandleJmsText){this.OnHandleJmsText(aR);}}else if(
"handleJmsTextMessage"===aR.name){if(this.OnHandleJmsTextMessage){this.OnHandleJmsTextMessage(aR);}}else if("handleJmsMap"===
aR.name){if(this.OnHandleJmsMap){this.OnHandleJmsMap(aR);}}else if("handleJmsMapMessage"===aR.name){if(this.OnHandleJmsMapMessage){
this.OnHandleJmsMapMessage(aR);}}}}},jmsPing:function(dW,ax){var bj=this.checkConnected();if(0===bj.code){this.sendToken({ns:
jws.JMSPlugIn.NS,type:jws.JMSPlugIn.PING,targetId:dW},ax);}return bj;},kp:function(ax){var bj=this.checkConnected();if(0===bj.code){
this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.kU,},ax);}return bj;},jmsIdentify:function(dW,ax){var bj=this.checkConnected(
);if(0===bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.IDENTIFY,targetId:dW},ax);}return bj;},jmsEcho:function(dW,
jp,ax){var bj=this.checkConnected();if(0===bj.code){this.forwardJSON(dW,jws.JMSPlugIn.NS_JMS_DEMO,"echo",{},jp,ax);}return bj;},
listenJms:function(fg,et,fG,ax){var bj=this.checkConnected();if(0===bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:
jws.JMSPlugIn.LISTEN,connectionFactoryName:fg,destinationName:et,pubSubDomain:fG},ax);}return bj;},listenJmsMessage:function(fg,et,
fG,ax){var bj=this.checkConnected();if(0===bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.LISTEN_MESSAGE,
connectionFactoryName:fg,destinationName:et,pubSubDomain:fG},ax);}return bj;},unlistenJms:function(fg,et,fG,ax){var bj=
this.checkConnected();if(0===bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.UNLISTEN,connectionFactoryName:fg,
destinationName:et,pubSubDomain:fG},ax);}return bj;},sendJmsText:function(fg,et,fG,aB,ax){var bj=this.checkConnected();if(0===
bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.SEND_TEXT,connectionFactoryName:fg,destinationName:et,pubSubDomain:
fG,msgPayLoad:aB},ax);}return bj;},sendJmsTextMessage:function(fg,et,fG,aB,gm,ax){var bj=this.checkConnected();if(0===bj.code){
this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.SEND_TEXT_MESSAGE,connectionFactoryName:fg,destinationName:et,pubSubDomain:
fG,msgPayLoad:aB,jmsHeaderProperties:gm},ax);}return bj;},sendJmsMap:function(fg,et,fG,hI,ax){var bj=this.checkConnected();if(0===
bj.code){this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.SEND_MAP,connectionFactoryName:fg,destinationName:et,pubSubDomain:
fG,msgPayLoad:hI},ax);}return bj;},sendJmsMapMessage:function(fg,et,fG,hI,gm,ax){var bj=this.checkConnected();if(0===bj.code){
this.sendToken({ns:jws.JMSPlugIn.NS,type:jws.JMSPlugIn.SEND_MAP_MESSAGE,connectionFactoryName:fg,destinationName:et,pubSubDomain:fG,
msgPayLoad:hI,jmsHeaderProperties:gm},ax);}return bj;},setJMSCallbacks:function(ci){if(!ci){ci={};}if(ci.OnHandleJmsText!==
undefined){this.OnHandleJmsText=ci.OnHandleJmsText;}if(ci.OnHandleJmsTextMessage!==undefined){this.OnHandleJmsTextMessage=
ci.OnHandleJmsTextMessage;}if(ci.OnHandleJmsMap!==undefined){this.OnHandleJmsMap=ci.OnHandleJmsMap;}if(ci.OnHandleJmsMapMessage!==
undefined){this.OnHandleJmsMapMessage=ci.OnHandleJmsMapMessage;}if(ci.OnPing!==undefined){this.OnPing=ci.OnPing;}if(ci.OnIdentify!==
undefined){this.OnIdentify=ci.OnIdentify;}if(ci.kG!==undefined){this.kG=ci.kG;}if(ci.jW!==undefined){this.jW=ci.jW;}if(ci.kr!==
undefined){this.kr=ci.kr;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.JMSPlugIn);jws.LoggingPlugIn={NS:jws.NS_BASE+
".plugins.logging",DEBUG:"debug",INFO:"info",WARN:"warn",ERROR:"error",FATAL:"fatal",processToken:function(aR){if(aR.ns==
jws.LoggingPlugIn.NS){if("log"==aR.reqType){if(this.OnLogged){this.OnLogged(aR);}}}},loggingLog:function(fo,eA,cJ,ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.LoggingPlugIn.NS,type:"log",level:fo,info:eA,message:cJ};this.sendToken(cg,ax);}
return bj;},loggingEvent:function(eR,aw,ax){var bj=this.checkConnected();if(0==bj.code){var ew=null;var fl=null;if(ax){if(
ax.primaryKey){fl=ax.primaryKey;}if(ax.sequence){ew=ax.sequence;}}var eS=[];var fe=[];for(var bc in aw){eS.push(bc);fe.push(aw[bc]);
}var cg={ns:jws.LoggingPlugIn.NS,type:"logEvent",table:eR,fields:eS,values:fe};if(fl&&ew){cg.primaryKey=fl;cg.sequence=ew;}
this.sendToken(cg,ax);}return bj;},loggingGetEvents:function(eR,ax){var bj=this.checkConnected();if(0==bj.code){var fl=null;var fK=
null;var fc=null;if(ax){if(ax.primaryKey){fl=ax.primaryKey;}if(ax.fromKey){fK=ax.fromKey;}if(ax.toKey){fc=ax.toKey;}}var cg={ns:
jws.LoggingPlugIn.NS,type:"getEvents",table:eR,primaryKey:fl,fromKey:fK,toKey:fc};this.sendToken(cg,ax);}return bj;},
loggingSubscribe:function(eR,ax){},loggingUnsubscribe:function(eR,ax){},setLoggingCallbacks:function(ci){if(!ci){ci={};}if(
ci.OnLogged!==undefined){this.OnLogged=ci.OnLogged;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.LoggingPlugIn);
jws.MailPlugIn={NS:jws.NS_BASE+".plugins.mail",HTML_MAIL:true,TEXT_MAIL:false,processToken:function(aR){if(aR.ns===
jws.MailPlugIn.NS){if("sendMail"===aR.reqType){if(this.OnMailSent){this.OnMailSent(aR);}}else if("createMail"===aR.reqType){if(
this.OnMailCreated){this.OnMailCreated(aR);}}}},sendMail:function(aT,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.MailPlugIn.NS,type:"sendMail",id:aT};this.sendToken(cg,ax);}return bj;},createMail:function(bN,bV,bS,bQ,bW,bP,bY,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.MailPlugIn.NS,type:"createMail",from:bN,to:bV,cc:bS,bcc:bQ,subject:bW,body:bP,
isHTML:bY};this.sendToken(cg,ax);}return bj;},dropMail:function(aT,ax){var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.MailPlugIn.NS,type:"dropMail",id:aT};this.sendToken(cg,ax);}return bj;},addAttachment:function(aT,bB,aw,ax){var bj=
this.checkConnected();if(0===bj.code){var bs="base64";var bD=false;var bt=jws.SCOPE_PRIVATE;var fX=null;var gS=null;if(ax){if(
ax.scope!==undefined){bt=ax.scope;}if(ax.encoding!==undefined){bs=ax.encoding;}if(ax.suppressEncoder!==undefined){bD=
ax.suppressEncoder;}if(ax.volumeSize!==undefined){fX=ax.volumeSize;}if(ax.archiveName!==undefined){gS=ax.archiveName;}}if(!bD){if(
bs==="base64"){aw=Base64.encode(aw);}}var cg={ns:jws.MailPlugIn.NS,type:"addAttachment",encoding:bs,id:aT,data:aw,filename:bB};if(
fX){cg.volumeSize=fX;}if(gS){cg.archiveName=gS;}this.sendToken(cg,ax);}return bj;},removeAttachment:function(aT,ax){},getMail:
function(aT,ax){},moveMail:function(aT,ax){},setMailCallbacks:function(ci){if(!ci){ci={};}if(ci.OnMailSent!==undefined){
this.OnMailSent=ci.OnMailSent;}if(ci.OnMailCreated!==undefined){this.OnMailCreated=ci.OnMailCreated;}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.MailPlugIn);jws.ReportingPlugIn={NS:jws.NS_BASE+".plugins.reporting",processToken:function(aR){if(
aR.ns==jws.ReportingPlugIn.NS){if("generateReport"==aR.reqType){if(this.OnReport){this.OnReport(aR);}}else if("getReports"==
aR.reqType){if(this.OnReports){this.OnReports(aR);}}else if("uploadTemplate"==aR.reqType){if(this.OnUploadTemplate){
this.OnUploadTemplate(aR);}}}},reportingGenerateReport:function(gE,fT,aM,ax){var bj=this.checkConnected();if(0==bj.code){if(!ax){ax=
{};}var cg={ns:jws.ReportingPlugIn.NS,type:"generateReport",reportName:gE,reportFields:aM,reportParams:fT,reportOutputType:
ax.outputType||"pdf",useJDBCConnection:ax.useJDBCConnection||false,nameJDBCCOnnection:ax.nameConnection||""};this.sendToken(cg,ax);}
return bj;},reportingGetReports:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.ReportingPlugIn.NS,type:
"getReports"};this.sendToken(cg,ax);}return bj;},reportingUploadTemplate:function(gw,ax){var bj=this.checkConnected();if(0==bj.code)
{var cg={ns:jws.ReportingPlugIn.NS,type:"uploadTemplate",templatePath:gw};this.sendToken(cg,ax);}return bj;},setReportingCallbacks:
function(ci){if(!ci){ci={};}if(ci.OnReport!==undefined){this.OnReport=ci.OnReport;}if(ci.OnReports!==undefined){this.OnReports=
ci.OnReports;}if(ci.OnUploadTemplate!==undefined){this.OnUploadTemplate=ci.OnUploadTemplate;}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.ReportingPlugIn);jws.RPCClientPlugIn={grantedProcs:[],spawnThreadDefault:false,NS:jws.NS_BASE+
".plugins.rpc",setSpawnThreadDefault:function(bR){this.spawnThreadDefault=bR;},addGrantedProcedure:function(bw){
jws.RPCClientPlugIn.grantedProcs[jws.RPCClientPlugIn.grantedProcs.length]=bw;},removeGrantedProcedure:function(bw){var db=
jws.RPCClientPlugIn.grantedProcs.indexOf(bw);if(db>=0){jws.RPCClientPlugIn.grantedProcs.splice(db,1);}},processToken:function(aR){
if(aR.ns==jws.RPCClientPlugIn.NS){if(aR.type=="rrpc"){this.onRRPC(aR);}}},rpc:function(dz,cK,bl,ax){if(bl!=null&& !(
bl instanceof Array)){bl=[bl];}ax=this.setDefaultOption(ax);var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken(
{ns:jws.RPCClientPlugIn.NS,type:"rpc",classname:dz,method:cK,args:bl},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";
bj.msg="Not connected.";}return bj;},setDefaultOption:function(ax){if(ax===undefined){ax={};}if(ax.spawnThread===undefined){
ax.spawnThread=this.spawnThreadDefault;}return ax;},rrpc:function(bb,dz,cK,bl,ax){if(bl!=null&& !(bl instanceof Array)){bl=[bl];}ax=
this.setDefaultOption(ax);var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.RPCClientPlugIn.NS,type:
"rrpc",targetId:bb,classname:dz,method:cK,args:bl},ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg=
"Not connected.";}return bj;},onRRPC:function(aR){var bF=aR.classname;var bu=aR.method;var bC=aR.args;var ad=bF+"."+bu;if(
jws.RPCClientPlugIn.grantedProcs.indexOf(ad)>=0){var bA=bF.split('.');var bI=bA.length;var bx=window[bA[0]];for(var j=1;j<bI;j++){
bx=bx[bA[j]];}var bj;try{bj=bx[bu].apply(null,bC);}catch(ex){bj=ex+"\nProbably a typo error (method called="+bu+
") or wrong number of arguments (args: "+JSON.stringify(bC)+")";}}else{bj= +"\nAcces not granted to the="+bu;}this.sendToken({type:
"send",targetId:aR.sourceId,result:bj,reqType:"rrpc",code:0},null);}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,
jws.RPCClientPlugIn);jws.RTCPlugIn={NS:jws.NS_BASE+".plugins.rtc",processToken:function(aR){if(aR.ns===jws.RTCPlugIn.NS){if(
"selectSQL"===aR.reqType){if(this.OnRTCRowSet){this.OnRTCRowSet(aR);}}}},requestChannelId:function(bb,ax){var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.RTCPlugIn.NS,type:"requestChannelId",target:bb};this.sendToken(cg,ax);}
return bj;},setRTCCallbacks:function(ci){if(!ci){ci={};}if(ci.OnRTCMsg!==undefined){this.OnRTCMsg=ci.OnRTCMsg;}}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.RTCPlugIn);jws.SamplesPlugIn={NS:jws.NS_BASE+".plugins.samples",processToken:function(aR){if(aR.ns==
jws.SamplesPlugIn.NS){if("requestServerTime"==aR.reqType){if(this.OnSamplesServerTime){this.OnSamplesServerTime(aR);}}}},
requestServerTime:function(ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SamplesPlugIn.NS,type:
"requestServerTime"};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}
return bj;},setSamplesCallbacks:function(ci){if(!ci){ci={};}if(ci.OnSamplesServerTime!==undefined){this.OnSamplesServerTime=
ci.OnSamplesServerTime;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.SamplesPlugIn);jws.ScriptingPlugIn={NS:jws.NS_BASE+
'.plugins.scripting',callScriptAppMethod:function(eE,io,jB,bl,ax){ax=this.iW(ax);var bj=this.checkConnected();if(0===bj.code){
var cg={ns:jws.ScriptingPlugIn.NS,type:'callMethod',method:jB,objectId:io,app:eE,args:bl};this.sendToken(cg,ax);}return bj;},iW:
function(kF){var lm=kF;if('function'==typeof kF){var jS=kF;lm={OnSuccess:function(kv){jS(kv);},OnFailure:function(kv){jS(new Error(
kv.msg));},OnTimeout:function(){jS(new Error('timeout'));}};}return lm;},ke:function(eE,lp,kY){var lo=this;var kS={};kS.getName=
function(){return eE;};kS.sendToken=function(aR,ax){lo.sendScriptAppToken(eE,aR,ax);};kS.kK=function(ax){lo.getScriptAppVersion(eE,
ax);};kS.kd=function(ax){lo.getScriptAppManifest(eE,ax);};this.ll(eE,{OnSuccess:function(kv){var kB=kv.jQ;for(var jJ in kB){var jZ={
};var jT=kB[jJ];jZ.description=jT.description;jZ.name=jJ;for(var cI in jT.kV){var bu=jT.kV[cI].name;var fq=jT.kV[cI].length;eval(
'jZ["'+bu+'"] = function() {lo.callScriptAppMethod("'+eE+'","'+jJ+'","'+bu+'",Array.prototype.slice.call(arguments, 0,'+fq+'),'+
'arguments['+fq+']);};');}kS[jJ]=jZ;}lp(kS);},OnFailure:function(aR){kY(aR);}});return kS;},reloadScriptApp:function(eE,iF,ax){ax=
this.iW(ax);var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ScriptingPlugIn.NS,type:'reloadApp',hotReload:iF,app:eE};
this.sendToken(cg,ax);}return bj;},getScriptAppVersion:function(eE,ax){ax=this.iW(ax);var bj=this.checkConnected();if(0===bj.code){
var cg={ns:jws.ScriptingPlugIn.NS,type:'kK',app:eE};this.sendToken(cg,ax);}return bj;},ll:function(eE,ax){ax=this.iW(ax);var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ScriptingPlugIn.NS,type:'getClientAPI',app:eE};this.sendToken(cg,ax);}
return bj;},sendScriptAppToken:function(eE,aR,ax){ax=this.iW(ax);var bj=this.checkConnected();if(0===bj.code&&aR){this.sendToken({
app:eE,ns:jws.ScriptingPlugIn.NS,type:'token',token:aR},ax);}return bj;},deployScriptApp:function(hQ,ib,ax){ax=this.iW(ax);var bj=
this.checkConnected();if(0===bj.code){var cg={ns:jws.ScriptingPlugIn.NS,type:'deploy',hotDeploy:ib,appFile:hQ,deleteAfterDeploy:(ax)
?ax.deleteAfterDeploy||true:true};this.sendToken(cg,ax);}return bj;},listScriptApps:function(ax){ax=this.iW(ax);if(!ax)ax={};var iJ=
ax.userOnly||false;var hU=(undefined===ax.namesOnly)?true:ax.namesOnly;var bj=this.checkConnected();if(0===bj.code){var cg={ns:
jws.ScriptingPlugIn.NS,type:'listApps',userOnly:iJ,namesOnly:hU};this.sendToken(cg,ax);}return bj;},undeployScriptApp:function(eE,
ax){ax=this.iW(ax);var bj=this.checkConnected();if(0===bj.code){var cg={ns:jws.ScriptingPlugIn.NS,type:'undeploy',app:eE};
this.sendToken(cg,ax);}return bj;},getScriptAppManifest:function(eE,ax){ax=this.iW(ax);var bj=this.checkConnected();if(0===bj.code){
var cg={ns:jws.ScriptingPlugIn.NS,type:'kd',app:eE};this.sendToken(cg,ax);}return bj;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,
jws.ScriptingPlugIn);jws.SharedObjectsPlugIn={NS:jws.NS_BASE+".plugins.sharedObjs",DATA_TYPES:["number","string","boolean","object",
"set","list","map","table"],cb:{},processToken:function(aR){if(aR.ns==jws.SharedObjectsPlugIn.NS){if(aR.name=="created"){if(
this.OnSharedObjectCreated){this.OnSharedObjectCreated(aR);}}else if(aR.name=="destroyed"){if(this.OnSharedObjectDestroyed){
this.OnSharedObjectDestroyed(aR);}}else if(aR.name=="updated"){if(this.OnSharedObjectUpdated){this.OnSharedObjectUpdated(aR);}}
else if(aR.name=="init"){if(this.OnSharedObjectsInit){var bk=JSON.parse(aR.value);this.OnSharedObjectsInit(aR,bk);}}}},
createSharedObject:function(aT,bq,ck,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:
jws.SharedObjectsPlugIn.NS,type:"create",id:aT,datatype:bq,value:ck};this.sendToken(cg,ax);if(this.OnSharedObjectCreated){
this.OnSharedObjectCreated(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},
destroySharedObject:function(aT,bq,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:
jws.SharedObjectsPlugIn.NS,type:"destroy",id:aT,datatype:bq};this.sendToken(cg,ax);if(this.OnSharedObjectDestroyed){
this.OnSharedObjectDestroyed(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},
getSharedObject:function(aT,bq,ax){var bj=this.createDefaultResult();if(this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,
type:"get",id:aT,datatype:bq};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg=
"Not connected.";}return bj;},updateSharedObject:function(aT,bq,ck,ax){var bj=this.createDefaultResult();if(this.isConnected()){
var cg={ns:jws.SharedObjectsPlugIn.NS,type:"update",id:aT,datatype:bq,value:ck};this.sendToken(cg,ax);if(this.OnSharedObjectUpdated)
{this.OnSharedObjectUpdated(cg);}}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},
setSharedObjectsCallbacks:function(ci){if(!ci){ci={};}if(ci.OnSharedObjectCreated!==undefined){this.OnSharedObjectCreated=
ci.OnSharedObjectCreated;}if(ci.OnSharedObjectDestroyed!==undefined){this.OnSharedObjectDestroyed=ci.OnSharedObjectDestroyed;}if(
ci.OnSharedObjectUpdated!==undefined){this.OnSharedObjectUpdated=ci.OnSharedObjectUpdated;}if(ci.OnSharedObjectsInit!==undefined){
this.OnSharedObjectsInit=ci.OnSharedObjectsInit;}},initSharedObjects:function(ax){var bj=this.createDefaultResult();if(
this.isConnected()){var cg={ns:jws.SharedObjectsPlugIn.NS,type:"init"};this.sendToken(cg,ax);}else{bj.code= -1;bj.localeKey=
"jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,
jws.SharedObjectsPlugIn);jws.StreamingPlugIn={NS:jws.NS_BASE+".plugins.streaming",JWS_NS:"streaming",registerStream:function(de,ax){
var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.StreamingPlugIn.NS,type:"register",stream:de},ax);}
else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;},unregisterStream:function(de,ax){
var bj=this.createDefaultResult();if(this.isConnected()){this.sendToken({ns:jws.StreamingPlugIn.NS,type:"unregister",stream:de},ax);
}else{bj.code= -1;bj.localeKey="jws.jsc.res.notConnected";bj.msg="Not connected.";}return bj;}};jws.oop.addPlugIn(
jws.jWebSocketTokenClient,jws.StreamingPlugIn);jws.TestPlugIn={NS:jws.NS_BASE+".plugins.test",processToken:function(aR){if(aR.ns==
jws.TestPlugIn.NS){if("event"==aR.type){if("testStarted"==aR.name&&this.OnTestStarted){this.OnTestStarted(aR);}else if(
"testStopped"==aR.name&&this.OnTestStopped){this.OnTestStopped(aR);}else if("startTest"==aR.name&&this.OnStartTest){
this.OnStartTest(aR);}}}},testTimeout:function(gD,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TestPlugIn.NS,type:
"delay",delay:gD};this.sendToken(cg,ax);}return bj;},testS2CPerformance:function(ei,cJ,ax){var bj=this.checkConnected();if(0==
bj.code){var cg={ns:jws.TestPlugIn.NS,type:"testS2CPerformance",count:ei,message:cJ};this.sendToken(cg,ax);}return bj;},execTests:
function(){setTimeout(function(){var es=new jasmine.TrivialReporter();jasmine.getEnv().addReporter(es);jasmine.getEnv().execute();},
1000);},setTestCallbacks:function(ci){if(!ci){ci={};}if(ci.OnStartTest!==undefined){this.OnStartTest=ci.OnStartTest;}if(
ci.OnTestStarted!==undefined){this.OnTestStarted=ci.OnTestStarted;}if(ci.OnTestStopped!==undefined){this.OnTestStopped=
ci.OnTestStopped;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.TestPlugIn);jws.StopWatchPlugIn={NS:jws.NS_BASE+
".plugins.stopwatch",eL:{},startWatch:function(aT,cp){var cE={spec:cp,started:new Date().getTime()};this.eL[aT]=cE;return cE;},
stopWatch:function(aT){var cE=this.eL[aT];if(cE){cE.stopped=new Date().getTime();cE.millis=cE.stopped-cE.started;return cE;}else{
return null;}},logWatch:function(aT,cp,ep){var cE={spec:cp,millis:ep};this.eL[aT]=cE;return cE;},resetWatches:function(){this.eL={};
},printWatches:function(){for(var bc in this.eL){var cE=this.eL[bc];var cN=cE.spec+" ("+bc+"): "+cE.millis+"ms";if(window.console){
console.log(cN);}else{document.write(cN+"<br>");}}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.StopWatchPlugIn);
jws.TwitterPlugIn={NS:jws.NS_BASE+".plugins.twitter",processToken:function(aR){if(aR.ns==jws.TwitterPlugIn.NS){if("getTimeline"==
aR.reqType){if(this.OnGotTwitterTimeline){this.OnGotTwitterTimeline(aR);}}else if("requestAccessToken"==aR.reqType){if(
this.OnTwitterAccessToken){this.OnTwitterAccessToken(aR);}}else if("event"==aR.type){if("status"==aR.name&&this.OnTwitterStatus){
this.OnTwitterStatus(aR);}}}},tweet:function(cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,
type:"tweet",message:cJ};this.sendToken(cg,ax);}return bj;},twitterRequestAccessToken:function(bz,ax){var bj=this.checkConnected();
if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"requestAccessToken",callbackURL:bz};this.sendToken(cg,ax);}return bj;},
twitterSetVerifier:function(bH,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"setVerifier",
verifier:bH};this.sendToken(cg,ax);}return bj;},twitterLogin:function(bz,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:
jws.TwitterPlugIn.NS,type:"login",callbackURL:bz};this.sendToken(cg,ax);}return bj;},twitterLogout:function(an,aq,ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"logout"};this.sendToken(cg,ax);}return bj;},
twitterTimeline:function(an,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getTimeline",
username:an};this.sendToken(cg,ax);}return bj;},twitterQuery:function(bn,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:
jws.TwitterPlugIn.NS,type:"query",query:bn};this.sendToken(cg,ax);}return bj;},twitterTrends:function(ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getTrends"};this.sendToken(cg,ax);}return bj;},
twitterStatistics:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"getStatistics"};
this.sendToken(cg,ax);}return bj;},twitterPublicTimeline:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:
jws.TwitterPlugIn.NS,type:"getPublicTimeline"};this.sendToken(cg,ax);}return bj;},twitterSetStream:function(bK,bX,ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:"setStream",keywords:bX,followers:bK};this.sendToken(cg,
ax);}return bj;},twitterUserData:function(an,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.TwitterPlugIn.NS,type:
"getUserData",username:an};this.sendToken(cg,ax);}return bj;},setTwitterCallbacks:function(ci){if(!ci){ci={};}if(
ci.OnGotTwitterTimeline!==undefined){this.OnGotTwitterTimeline=ci.OnGotTwitterTimeline;}if(ci.OnTwitterStatus!==undefined){
this.OnTwitterStatus=ci.OnTwitterStatus;}if(ci.OnTwitterAccessToken!==undefined){this.OnTwitterAccessToken=ci.OnTwitterAccessToken;}
}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.TwitterPlugIn);jws.XMPPPlugIn={NS:jws.NS_BASE+".plugins.xmpp",MODE_AVAILABLE:
"available",MODE_AWAY:"away",MODE_CHAT:"chat",MODE_DND:"dnd",MODE_XA:"xa",TYPE_AVAILABLE:"available",TYPE_UNAVAILABLE:"unavailable",
TYPE_SUBSCRIBE:"subscribe",TYPE_SUBSCRIBED:"subscribed",TYPE_UNSUBSCRIBE:"unsubscribe",TYPE_UNSUBSCRIBED:"unsubscribed",TYPE_ERROR:
"error",processToken:function(aR){if(aR.ns==jws.XMPPPlugIn.NS){if("event"==aR.type){if("chatMessage"==aR.name){if(
this.OnXMPPChatMessage){this.OnXMPPChatMessage(aR);}}}else if("getRoster"==aR.reqType){if(this.OnXMPPRoster){this.OnXMPPRoster(aR);}
}}},xmppConnect:function(bM,bv,bO,by,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"connect",
host:bM,port:bv,domain:bO,useSSL:by};this.sendToken(cg,ax);}return bj;},xmppDisconnect:function(ax){var bj=this.checkConnected();if(
0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"disconnect"};this.sendToken(cg,ax);}return bj;},xmppLogin:function(an,aq,ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"login",username:an,password:aq};this.sendToken(cg,ax);}
return bj;},xmppLogout:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"logout"};
this.sendToken(cg,ax);}return bj;},xmppRoster:function(ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,
type:"getRoster"};this.sendToken(cg,ax);}return bj;},xmppSetPresence:function(fb,bU,bT,fp,ax){var bj=this.checkConnected();if(0==
bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"setPresence",pmode:fb,ptype:bU,ppriority:fp,pstatus:bT};this.sendToken(cg,ax);}
return bj;},xmppOpenChat:function(bo,ax){var bj=this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,type:"openChat",
userId:bo};this.sendToken(cg,ax);}return bj;},xmppSendChat:function(bo,cJ,ax){var bj=this.checkConnected();if(0==bj.code){var cg={
ns:jws.XMPPPlugIn.NS,type:"sendChat",userId:bo,message:cJ};this.sendToken(cg,ax);}return bj;},xmppCloseChat:function(bo,ax){var bj=
this.checkConnected();if(0==bj.code){var cg={ns:jws.XMPPPlugIn.NS,userId:bo,type:"closeChat"};this.sendToken(cg,ax);}return bj;},
setXMPPCallbacks:function(ci){if(!ci){ci={};}if(ci.OnXMPPChatMessage!==undefined){this.OnXMPPChatMessage=ci.OnXMPPChatMessage;}if(
ci.OnXMPPRoster!==undefined){this.OnXMPPRoster=ci.OnXMPPRoster;}}};jws.oop.addPlugIn(jws.jWebSocketTokenClient,jws.XMPPPlugIn); 