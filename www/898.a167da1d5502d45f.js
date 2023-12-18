"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[898],{2726:(G,j,b)=>{b.d(j,{Uw:()=>M,fo:()=>I});var a=b(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var U=function(r){return r.Unimplemented="UNIMPLEMENTED",r.Unavailable="UNAVAILABLE",r}(U||{});class Z extends Error{constructor(e,t,o){super(e),this.message=e,this.code=t,this.data=o}}const N=r=>{var e,t,o,i,n;const l=r.CapacitorCustomPlatform||null,s=r.Capacitor||{},g=s.Plugins=s.Plugins||{},c=r.CapacitorPlatforms,E=(null===(e=null==c?void 0:c.currentPlatform)||void 0===e?void 0:e.getPlatform)||(()=>null!==l?l.name:(r=>{var e,t;return null!=r&&r.androidBridge?"android":null!==(t=null===(e=null==r?void 0:r.webkit)||void 0===e?void 0:e.messageHandlers)&&void 0!==t&&t.bridge?"ios":"web"})(r)),oe=(null===(t=null==c?void 0:c.currentPlatform)||void 0===t?void 0:t.isNativePlatform)||(()=>"web"!==E()),ie=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(u=>{const d=H.get(u);return!!(null!=d&&d.platforms.has(E())||q(u))}),q=(null===(i=null==c?void 0:c.currentPlatform)||void 0===i?void 0:i.getPluginHeader)||(u=>{var d;return null===(d=s.PluginHeaders)||void 0===d?void 0:d.find(k=>k.name===u)}),H=new Map,de=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.registerPlugin)||((u,d={})=>{const k=H.get(u);if(k)return console.warn(`Capacitor plugin "${u}" already registered. Cannot register plugins twice.`),k.proxy;const C=E(),O=q(u);let w;const fe=function(){var p=(0,a.Z)(function*(){return!w&&C in d?w=w="function"==typeof d[C]?yield d[C]():d[C]:null!==l&&!w&&"web"in d&&(w=w="function"==typeof d.web?yield d.web():d.web),w});return function(){return p.apply(this,arguments)}}(),R=p=>{let m;const P=(...y)=>{const _=fe().then(h=>{const L=((p,m)=>{var P,y;if(!O){if(p)return null===(y=p[m])||void 0===y?void 0:y.bind(p);throw new Z(`"${u}" plugin is not implemented on ${C}`,U.Unimplemented)}{const _=null==O?void 0:O.methods.find(h=>m===h.name);if(_)return"promise"===_.rtype?h=>s.nativePromise(u,m.toString(),h):(h,L)=>s.nativeCallback(u,m.toString(),h,L);if(p)return null===(P=p[m])||void 0===P?void 0:P.bind(p)}})(h,p);if(L){const W=L(...y);return m=null==W?void 0:W.remove,W}throw new Z(`"${u}.${p}()" is not implemented on ${C}`,U.Unimplemented)});return"addListener"===p&&(_.remove=(0,a.Z)(function*(){return m()})),_};return P.toString=()=>`${p.toString()}() { [capacitor code] }`,Object.defineProperty(P,"name",{value:p,writable:!1,configurable:!1}),P},z=R("addListener"),J=R("removeListener"),pe=(p,m)=>{const P=z({eventName:p},m),y=function(){var h=(0,a.Z)(function*(){const L=yield P;J({eventName:p,callbackId:L},m)});return function(){return h.apply(this,arguments)}}(),_=new Promise(h=>P.then(()=>h({remove:y})));return _.remove=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield y()}),_},F=new Proxy({},{get(p,m){switch(m){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return O?pe:z;case"removeListener":return J;default:return R(m)}}});return g[u]=F,H.set(u,{name:u,proxy:F,platforms:new Set([...Object.keys(d),...O?[C]:[]])}),F});return s.convertFileSrc||(s.convertFileSrc=u=>u),s.getPlatform=E,s.handleError=u=>r.console.error(u),s.isNativePlatform=oe,s.isPluginAvailable=ie,s.pluginMethodNoop=(u,d,k)=>Promise.reject(`${k} does not have an implementation of "${d}".`),s.registerPlugin=de,s.Exception=Z,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},x=(r=>r.Capacitor=N(r))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),I=x.registerPlugin;class M{constructor(e){this.listeners={},this.windowListeners={},e&&(console.warn(`Capacitor WebPlugin "${e.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=e)}addListener(e,t){var o=this;this.listeners[e]||(this.listeners[e]=[]),this.listeners[e].push(t);const n=this.windowListeners[e];n&&!n.registered&&this.addWindowListener(n);const l=function(){var g=(0,a.Z)(function*(){return o.removeListener(e,t)});return function(){return g.apply(this,arguments)}}(),s=Promise.resolve({remove:l});return Object.defineProperty(s,"remove",{value:(g=(0,a.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield l()}),function(){return g.apply(this,arguments)})}),s;var g}removeAllListeners(){var e=this;return(0,a.Z)(function*(){e.listeners={};for(const t in e.windowListeners)e.removeWindowListener(e.windowListeners[t]);e.windowListeners={}})()}notifyListeners(e,t){const o=this.listeners[e];o&&o.forEach(i=>i(t))}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:o=>{this.notifyListeners(t,o)}}}unimplemented(e="not implemented"){return new x.Exception(e,U.Unimplemented)}unavailable(e="not available"){return new x.Exception(e,U.Unavailable)}removeListener(e,t){var o=this;return(0,a.Z)(function*(){const i=o.listeners[e];if(!i)return;const n=i.indexOf(t);o.listeners[e].splice(n,1),o.listeners[e].length||o.removeWindowListener(o.windowListeners[e])})()}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}}const K=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),V=r=>r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Q extends M{getCookies(){return(0,a.Z)(function*(){const e=document.cookie,t={};return e.split(";").forEach(o=>{if(o.length<=0)return;let[i,n]=o.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");i=V(i).trim(),n=V(n).trim(),t[i]=n}),t})()}setCookie(e){return(0,a.Z)(function*(){try{const t=K(e.key),o=K(e.value),i=`; expires=${(e.expires||"").replace("expires=","")}`,n=(e.path||"/").replace("path=",""),l=null!=e.url&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${o||""}${i}; path=${n}; ${l};`}catch(t){return Promise.reject(t)}})()}deleteCookie(e){return(0,a.Z)(function*(){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}})()}clearCookies(){return(0,a.Z)(function*(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(e){return Promise.reject(e)}})()}clearAllCookies(){var e=this;return(0,a.Z)(function*(){try{yield e.clearCookies()}catch(t){return Promise.reject(t)}})()}}I("CapacitorCookies",{web:()=>new Q});const X=function(){var r=(0,a.Z)(function*(e){return new Promise((t,o)=>{const i=new FileReader;i.onload=()=>{const n=i.result;t(n.indexOf(",")>=0?n.split(",")[1]:n)},i.onerror=n=>o(n),i.readAsDataURL(e)})});return function(t){return r.apply(this,arguments)}}();class ne extends M{request(e){return(0,a.Z)(function*(){const t=((r,e={})=>{const t=Object.assign({method:r.method||"GET",headers:r.headers},e),i=((r={})=>{const e=Object.keys(r);return Object.keys(r).map(i=>i.toLocaleLowerCase()).reduce((i,n,l)=>(i[n]=r[e[l]],i),{})})(r.headers)["content-type"]||"";if("string"==typeof r.data)t.body=r.data;else if(i.includes("application/x-www-form-urlencoded")){const n=new URLSearchParams;for(const[l,s]of Object.entries(r.data||{}))n.set(l,s);t.body=n.toString()}else if(i.includes("multipart/form-data")){const n=new FormData;if(r.data instanceof FormData)r.data.forEach((s,g)=>{n.append(g,s)});else for(const s of Object.keys(r.data))n.append(s,r.data[s]);t.body=n;const l=new Headers(t.headers);l.delete("content-type"),t.headers=l}else(i.includes("application/json")||"object"==typeof r.data)&&(t.body=JSON.stringify(r.data));return t})(e,e.webFetchExtra),o=((r,e=!0)=>r?Object.entries(r).reduce((o,i)=>{const[n,l]=i;let s,g;return Array.isArray(l)?(g="",l.forEach(c=>{s=e?encodeURIComponent(c):c,g+=`${n}=${s}&`}),g.slice(0,-1)):(s=e?encodeURIComponent(l):l,g=`${n}=${s}`),`${o}&${g}`},"").substr(1):null)(e.params,e.shouldEncodeUrlParams),i=o?`${e.url}?${o}`:e.url,n=yield fetch(i,t),l=n.headers.get("content-type")||"";let g,c,{responseType:s="text"}=n.ok?e:{};switch(l.includes("application/json")&&(s="json"),s){case"arraybuffer":case"blob":c=yield n.blob(),g=yield X(c);break;case"json":g=yield n.json();break;default:g=yield n.text()}const S={};return n.headers.forEach((E,B)=>{S[B]=E}),{data:g,headers:S,status:n.status,url:n.url}})()}get(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"GET"}))})()}post(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"POST"}))})()}put(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PUT"}))})()}patch(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"PATCH"}))})()}delete(e){var t=this;return(0,a.Z)(function*(){return t.request(Object.assign(Object.assign({},e),{method:"DELETE"}))})()}}I("CapacitorHttp",{web:()=>new ne})},3020:(G,j,b)=>{b.d(j,{A_:()=>D});const D=(0,b(2726).fo)("StatusBar")},3403:(G,j,b)=>{b.d(j,{U:()=>A});var a=b(6689),$=b(9862);let A=(()=>{var v;class T{constructor(f){this.http=f}getChannels(){let f="69618bae51ea8f44f4d356f892889261";return"1"==localStorage.getItem("xa88")&&(f="888"),this.http.get(`https://raw.githubusercontent.com/DavidDeFilippi/channels/master/${f}.json`,{responseType:"json"})}getParrilla(){return this.http.get("https://raw.githubusercontent.com/DavidDeFilippi/channels/master/4f43dd901c609825ca8107062b0c8178.json",{responseType:"json"})}getChilevision(){return this.http.get("https://www.chilevision.cl:8080/token.php/ms_player_src_01/live_1/63ee47e1daeeb80a30d98ef4/1702807971649.json",{responseType:"json"})}getCanal13(){return this.http.get("https://us-central1-canal-13-stream-api.cloudfunctions.net/media/token",{responseType:"json"})}}return(v=T).\u0275fac=function(f){return new(f||v)(a.LFG($.eN))},v.\u0275prov=a.Yz7({token:v,factory:v.\u0275fac,providedIn:"root"}),T})()}}]);