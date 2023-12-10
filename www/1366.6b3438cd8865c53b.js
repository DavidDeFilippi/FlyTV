"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1366],{2726:(ce,R,p)=>{p.d(R,{Uw:()=>k,fo:()=>A});var g=p(5861);typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"&&global;var Z=function(l){return l.Unimplemented="UNIMPLEMENTED",l.Unavailable="UNAVAILABLE",l}(Z||{});class N extends Error{constructor(o,i,d){super(o),this.message=o,this.code=i,this.data=d}}const z=l=>{var o,i,d,n,r;const s=l.CapacitorCustomPlatform||null,t=l.Capacitor||{},a=t.Plugins=t.Plugins||{},c=l.CapacitorPlatforms,_=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.getPlatform)||(()=>null!==s?s.name:(l=>{var o,i;return null!=l&&l.androidBridge?"android":null!==(i=null===(o=null==l?void 0:l.webkit)||void 0===o?void 0:o.messageHandlers)&&void 0!==i&&i.bridge?"ios":"web"})(l)),de=(null===(i=null==c?void 0:c.currentPlatform)||void 0===i?void 0:i.isNativePlatform)||(()=>"web"!==_()),ge=(null===(d=null==c?void 0:c.currentPlatform)||void 0===d?void 0:d.isPluginAvailable)||(m=>{const h=Q.get(m);return!!(null!=h&&h.platforms.has(_())||ae(m))}),ae=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.getPluginHeader)||(m=>{var h;return null===(h=t.PluginHeaders)||void 0===h?void 0:h.find(H=>H.name===m)}),Q=new Map,be=(null===(r=null==c?void 0:c.currentPlatform)||void 0===r?void 0:r.registerPlugin)||((m,h={})=>{const H=Q.get(m);if(H)return console.warn(`Capacitor plugin "${m}" already registered. Cannot register plugins twice.`),H.proxy;const M=_(),S=ae(m);let C;const Pe=function(){var b=(0,g.Z)(function*(){return!C&&M in h?C=C="function"==typeof h[M]?yield h[M]():h[M]:null!==s&&!C&&"web"in h&&(C=C="function"==typeof h.web?yield h.web():h.web),C});return function(){return b.apply(this,arguments)}}(),K=b=>{let P;const y=(...O)=>{const x=Pe().then(v=>{const E=((b,P)=>{var y,O;if(!S){if(b)return null===(O=b[P])||void 0===O?void 0:O.bind(b);throw new N(`"${m}" plugin is not implemented on ${M}`,Z.Unimplemented)}{const x=null==S?void 0:S.methods.find(v=>P===v.name);if(x)return"promise"===x.rtype?v=>t.nativePromise(m,P.toString(),v):(v,E)=>t.nativeCallback(m,P.toString(),v,E);if(b)return null===(y=b[P])||void 0===y?void 0:y.bind(b)}})(v,b);if(E){const $=E(...O);return P=null==$?void 0:$.remove,$}throw new N(`"${m}.${b}()" is not implemented on ${M}`,Z.Unimplemented)});return"addListener"===b&&(x.remove=(0,g.Z)(function*(){return P()})),x};return y.toString=()=>`${b.toString()}() { [capacitor code] }`,Object.defineProperty(y,"name",{value:b,writable:!1,configurable:!1}),y},le=K("addListener"),se=K("removeListener"),ve=(b,P)=>{const y=le({eventName:b},P),O=function(){var v=(0,g.Z)(function*(){const E=yield y;se({eventName:b,callbackId:E},P)});return function(){return v.apply(this,arguments)}}(),x=new Promise(v=>y.then(()=>v({remove:O})));return x.remove=(0,g.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield O()}),x},X=new Proxy({},{get(b,P){switch(P){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return S?ve:le;case"removeListener":return se;default:return K(P)}}});return a[m]=X,Q.set(m,{name:m,proxy:X,platforms:new Set([...Object.keys(h),...S?[M]:[]])}),X});return t.convertFileSrc||(t.convertFileSrc=m=>m),t.getPlatform=_,t.handleError=m=>l.console.error(m),t.isNativePlatform=de,t.isPluginAvailable=ge,t.pluginMethodNoop=(m,h,H)=>Promise.reject(`${H} does not have an implementation of "${h}".`),t.registerPlugin=be,t.Exception=N,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t.platform=t.getPlatform(),t.isNative=t.isNativePlatform(),t},L=(l=>l.Capacitor=z(l))(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),A=L.registerPlugin;class k{constructor(o){this.listeners={},this.windowListeners={},o&&(console.warn(`Capacitor WebPlugin "${o.name}" config object was deprecated in v3 and will be removed in v4.`),this.config=o)}addListener(o,i){var d=this;this.listeners[o]||(this.listeners[o]=[]),this.listeners[o].push(i);const r=this.windowListeners[o];r&&!r.registered&&this.addWindowListener(r);const s=function(){var a=(0,g.Z)(function*(){return d.removeListener(o,i)});return function(){return a.apply(this,arguments)}}(),t=Promise.resolve({remove:s});return Object.defineProperty(t,"remove",{value:(a=(0,g.Z)(function*(){console.warn("Using addListener() without 'await' is deprecated."),yield s()}),function(){return a.apply(this,arguments)})}),t;var a}removeAllListeners(){var o=this;return(0,g.Z)(function*(){o.listeners={};for(const i in o.windowListeners)o.removeWindowListener(o.windowListeners[i]);o.windowListeners={}})()}notifyListeners(o,i){const d=this.listeners[o];d&&d.forEach(n=>n(i))}hasListeners(o){return!!this.listeners[o].length}registerWindowListener(o,i){this.windowListeners[i]={registered:!1,windowEventName:o,pluginEventName:i,handler:d=>{this.notifyListeners(i,d)}}}unimplemented(o="not implemented"){return new L.Exception(o,Z.Unimplemented)}unavailable(o="not available"){return new L.Exception(o,Z.Unavailable)}removeListener(o,i){var d=this;return(0,g.Z)(function*(){const n=d.listeners[o];if(!n)return;const r=n.indexOf(i);d.listeners[o].splice(r,1),d.listeners[o].length||d.removeWindowListener(d.windowListeners[o])})()}addWindowListener(o){window.addEventListener(o.windowEventName,o.handler),o.registered=!0}removeWindowListener(o){o&&(window.removeEventListener(o.windowEventName,o.handler),o.registered=!1)}}const F=l=>encodeURIComponent(l).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),D=l=>l.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class V extends k{getCookies(){return(0,g.Z)(function*(){const o=document.cookie,i={};return o.split(";").forEach(d=>{if(d.length<=0)return;let[n,r]=d.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=D(n).trim(),r=D(r).trim(),i[n]=r}),i})()}setCookie(o){return(0,g.Z)(function*(){try{const i=F(o.key),d=F(o.value),n=`; expires=${(o.expires||"").replace("expires=","")}`,r=(o.path||"/").replace("path=",""),s=null!=o.url&&o.url.length>0?`domain=${o.url}`:"";document.cookie=`${i}=${d||""}${n}; path=${r}; ${s};`}catch(i){return Promise.reject(i)}})()}deleteCookie(o){return(0,g.Z)(function*(){try{document.cookie=`${o.key}=; Max-Age=0`}catch(i){return Promise.reject(i)}})()}clearCookies(){return(0,g.Z)(function*(){try{const o=document.cookie.split(";")||[];for(const i of o)document.cookie=i.replace(/^ +/,"").replace(/=.*/,`=;expires=${(new Date).toUTCString()};path=/`)}catch(o){return Promise.reject(o)}})()}clearAllCookies(){var o=this;return(0,g.Z)(function*(){try{yield o.clearCookies()}catch(i){return Promise.reject(i)}})()}}A("CapacitorCookies",{web:()=>new V});const q=function(){var l=(0,g.Z)(function*(o){return new Promise((i,d)=>{const n=new FileReader;n.onload=()=>{const r=n.result;i(r.indexOf(",")>=0?r.split(",")[1]:r)},n.onerror=r=>d(r),n.readAsDataURL(o)})});return function(i){return l.apply(this,arguments)}}();class Y extends k{request(o){return(0,g.Z)(function*(){const i=((l,o={})=>{const i=Object.assign({method:l.method||"GET",headers:l.headers},o),n=((l={})=>{const o=Object.keys(l);return Object.keys(l).map(n=>n.toLocaleLowerCase()).reduce((n,r,s)=>(n[r]=l[o[s]],n),{})})(l.headers)["content-type"]||"";if("string"==typeof l.data)i.body=l.data;else if(n.includes("application/x-www-form-urlencoded")){const r=new URLSearchParams;for(const[s,t]of Object.entries(l.data||{}))r.set(s,t);i.body=r.toString()}else if(n.includes("multipart/form-data")){const r=new FormData;if(l.data instanceof FormData)l.data.forEach((t,a)=>{r.append(a,t)});else for(const t of Object.keys(l.data))r.append(t,l.data[t]);i.body=r;const s=new Headers(i.headers);s.delete("content-type"),i.headers=s}else(n.includes("application/json")||"object"==typeof l.data)&&(i.body=JSON.stringify(l.data));return i})(o,o.webFetchExtra),d=((l,o=!0)=>l?Object.entries(l).reduce((d,n)=>{const[r,s]=n;let t,a;return Array.isArray(s)?(a="",s.forEach(c=>{t=o?encodeURIComponent(c):c,a+=`${r}=${t}&`}),a.slice(0,-1)):(t=o?encodeURIComponent(s):s,a=`${r}=${t}`),`${d}&${a}`},"").substr(1):null)(o.params,o.shouldEncodeUrlParams),n=d?`${o.url}?${d}`:o.url,r=yield fetch(n,i),s=r.headers.get("content-type")||"";let a,c,{responseType:t="text"}=r.ok?o:{};switch(s.includes("application/json")&&(t="json"),t){case"arraybuffer":case"blob":c=yield r.blob(),a=yield q(c);break;case"json":a=yield r.json();break;default:a=yield r.text()}const u={};return r.headers.forEach((_,w)=>{u[w]=_}),{data:a,headers:u,status:r.status,url:r.url}})()}get(o){var i=this;return(0,g.Z)(function*(){return i.request(Object.assign(Object.assign({},o),{method:"GET"}))})()}post(o){var i=this;return(0,g.Z)(function*(){return i.request(Object.assign(Object.assign({},o),{method:"POST"}))})()}put(o){var i=this;return(0,g.Z)(function*(){return i.request(Object.assign(Object.assign({},o),{method:"PUT"}))})()}patch(o){var i=this;return(0,g.Z)(function*(){return i.request(Object.assign(Object.assign({},o),{method:"PATCH"}))})()}delete(o){var i=this;return(0,g.Z)(function*(){return i.request(Object.assign(Object.assign({},o),{method:"DELETE"}))})()}}A("CapacitorHttp",{web:()=>new Y})},1366:(ce,R,p)=>{p.r(R),p.d(R,{HomePageModule:()=>d});var g=p(6814),f=p(2303),ee=p(95),U=p(3044),T=p(5861),I=p(3403);const A=(0,p(2726).fo)("AdMob",{web:()=>p.e(2861).then(p.bind(p,2861)).then(n=>new n.AdMobWeb)});var e=p(6689);let ne=(()=>{var n;class r{constructor(){this.globalCategory="",this.numberForAds=1}getGlobalCategory(){return this.globalCategory}setGlobalCategory(t){this.globalCategory=t}getNumberForAds(){return this.numberForAds}setNumberForAds(t){this.numberForAds=t}}return(n=r).\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),r})();var k=p(6735),oe=p(6593);function F(n,r){if(1&n&&(e.TgZ(0,"ion-label",21),e._UZ(1,"ion-icon",22),e._uU(2),e.qZA()),2&n){const s=e.oxw(2).$implicit;e.xp6(2),e.Oqu(s.transmitiendo.current)}}function D(n,r){if(1&n&&(e.TgZ(0,"ion-label",21),e._uU(1),e.qZA()),2&n){const s=e.oxw(2).$implicit;e.xp6(1),e.Oqu(s.transmitiendo.next)}}function V(n,r){if(1&n){const s=e.EpF();e.TgZ(0,"ion-label",23),e.NdJ("click",function(){e.CHM(s);const a=e.oxw(2).$implicit,c=e.oxw();return e.KtG(c.setOpen(!0,a))}),e.TgZ(1,"p",24),e._uU(2,"ver programacion"),e.qZA()()}}const ie=function(){return["/iframe"]},q=function(){return["/reproductor"]},W=function(n){return{id:n}};function B(n,r){if(1&n&&(e.TgZ(0,"ion-item",1),e._UZ(1,"img",17),e.TgZ(2,"ion-label",18),e._uU(3),e.YNc(4,F,3,1,"ion-label",19),e.YNc(5,D,2,1,"ion-label",19),e.qZA(),e.YNc(6,V,3,0,"ion-label",20),e.qZA()),2&n){const s=e.oxw().$implicit;e.xp6(1),e.Q6J("src",s.logo,e.LSH),e.xp6(1),e.Q6J("routerLink",s.iframe?e.DdM(8,ie):e.DdM(9,q))("queryParams",e.VKq(10,W,s.id)),e.uIk("id",s.id),e.xp6(1),e.hij("",s.name," "),e.xp6(1),e.Q6J("ngIf",""!==s.transmitiendo.current),e.xp6(1),e.Q6J("ngIf",""!==s.transmitiendo.next),e.xp6(1),e.Q6J("ngIf",s.parrilla.length)}}function J(n,r){if(1&n&&(e.TgZ(0,"ion-list"),e.YNc(1,B,7,12,"ion-item",16),e.qZA()),2&n){const s=r.$implicit;e.xp6(1),e.Q6J("ngIf",s.enabled)}}function Y(n,r){if(1&n&&(e.TgZ(0,"ion-list")(1,"ion-item")(2,"ion-label"),e._uU(3),e.qZA(),e.TgZ(4,"ion-label"),e._uU(5),e.qZA()()()),2&n){const s=r.$implicit;e.xp6(3),e.hij(" ",s.horaNormal," "),e.xp6(2),e.hij(" ",s.programa," ")}}function re(n,r){if(1&n){const s=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._UZ(3,"img",25),e._uU(4),e.qZA(),e.TgZ(5,"ion-buttons",26)(6,"ion-button",27),e.NdJ("click",function(){e.CHM(s);const a=e.oxw();return e.KtG(a.setOpen(!1,a.channel))}),e._uU(7,"Cerrar"),e.qZA()()()(),e.TgZ(8,"ion-content",28)(9,"h4",29),e._uU(10),e.qZA(),e.YNc(11,Y,6,2,"ion-list",14),e.qZA()}if(2&n){const s=e.oxw();e.xp6(3),e.Q6J("src",s.channelModal.logo,e.LSH),e.xp6(1),e.hij("Programacion ",s.channelModal.name,""),e.xp6(6),e.Oqu(s.channelModal.diaParrilla),e.xp6(1),e.Q6J("ngForOf",s.modalParrilla)}}const o=[{path:"",component:(()=>{var n;class r{constructor(t,a,c,u,_){this.channelService=t,this.loadingCtrl=a,this.globalVar=c,this.so=u,this.sanitizer=_,this.selected_value="",this.isModalOpen=!1,this.diaParrilla=""}ionViewWillEnter(){var t=this;return(0,T.Z)(function*(){t.lockToPortrait(),t.globalVar.getNumberForAds()%2!=0&&t.initialize(),t.globalVar.setNumberForAds(t.globalVar.getNumberForAds()+1),new VideoHls("","stop"),t.getChannels()})()}getChannels(){var t=this;return(0,T.Z)(function*(){const a=yield t.loadingCtrl.create({message:"Cargando canales"});a.present(),t.channelService.getChannels().subscribe(c=>{t.channels=c,t.channelsBackUp=c,t.getParrilla(),t.category=t.globalVar.getGlobalCategory(),t.listCategories(),t.getCategory(t.category),a.dismiss()})})()}getParrilla(){var t=this;return(0,T.Z)(function*(){t.channelService.getParrilla().subscribe(a=>{t.parrilla=a;for(let c=0;c<t.channels.length;c++){t.channels[c].parrilla=[];for(let u=0;u<t.parrilla.length;u++)t.channels[c].id==t.parrilla[u].id&&(t.channels[c].parrilla=t.parrilla[u].parrilla,t.channelsBackUp[c].parrilla=t.parrilla[u].parrilla,t.channels[c].transmitiendo.current=t.getCurrentPrograma(t.parrilla[u].parrilla),t.channels[c].transmitiendo.next=t.getNextPrograma(t.parrilla[u].parrilla),t.channelsBackUp[c].transmitiendo.current=t.getCurrentPrograma(t.parrilla[u].parrilla),t.channelsBackUp[c].transmitiendo.next=t.getNextPrograma(t.parrilla[u].parrilla))}})})()}getCurrentPrograma(t){let a="",c=new Date;for(let u=0;u<t.length;u++){const _=new Date(t[u].hora);let w;w=u<t.length-1?new Date(t[u+1].hora):(new Date).setHours(c.getHours()+1),c>_&&c<w&&(a=_.toLocaleTimeString().slice(0,-3)+" "+t[u].programa)}return a}getNextPrograma(t){let a="",c=new Date;for(let u=0;u<t.length-1;u++){const _=new Date(t[u].hora),w=new Date(t[u+1].hora);c>_&&c<w&&(a=w.toLocaleTimeString().slice(0,-3)+" "+t[u+1].programa)}return this.diaParrilla=new Date(t[0].hora).toLocaleDateString(),a}getCategory(t){var a=this;return(0,T.Z)(function*(){if("todos"===t||""===t||void 0===t){a.globalVar.setGlobalCategory("todos");for(let u=0;u<a.channels.length;u++)a.channels[u].enabled=!0}else for(let u=0;u<a.channels.length;u++)a.channels[u].enabled=a.channels[u].categoria===t;for(var c of(a.globalVar.setGlobalCategory(t),a.htmlSelectOption='<ion-select-option color="light" value="todos" class="ion-text-capitalize">Todos</ion-select-option>',a.categories))a.htmlSelectOption=a.htmlSelectOption+`<ion-select-option color="light" value="${c}" class="ion-text-capitalize">${c}</ion-select-option>`;a.htmlSelectOption=a.getSanitizedHtml(a.htmlSelectOption)})()}listCategories(){var t=this;return(0,T.Z)(function*(){t.categories=[];for(let a=0;a<t.channels.length;a++)t.categories.push(t.channels[a].categoria);t.categories=[...new Set(t.categories)]})()}initialize(){var t=this;return(0,T.Z)(function*(){const{status:a}=yield A.trackingAuthorizationStatus();console.log(a),"notDetermined"===a&&console.log("Display information before ads load first time"),A.initialize({requestTrackingAuthorization:!0,testingDevices:["735978b4-219f-4d70-bade-7eb4b808ac5d"],initializeForTesting:!1}),t.showInterstitial()})()}showInterstitial(){return(0,T.Z)(function*(){yield A.prepareInterstitial({adId:"ca-app-pub-4427288659732696/1947824722",isTesting:!1}),yield A.showInterstitial()})()}lockToPortrait(){this.so.lock(this.so.ORIENTATIONS.PORTRAIT)}lockToLandscape(){this.so.lock(this.so.ORIENTATIONS.LANDSCAPE)}unlockScreenOrientation(){this.so.unlock()}getSanitizedHtml(t){return this.sanitizer.bypassSecurityTrustHtml(t)}handleChange(t){this.getCategory(t.detail.value)}setOpen(t,a){t?(this.channelModal=a,this.channelModal.diaParrilla=this.diaParrilla,this.modalParrilla=this.channelModal.parrilla,this.isModalOpen=t):(this.isModalOpen=t,this.channelModal=[],this.modalParrilla=[])}}return(n=r).\u0275fac=function(t){return new(t||n)(e.Y36(I.U),e.Y36(f.HT),e.Y36(ne),e.Y36(k.E),e.Y36(oe.H7))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-home"]],features:[e._Bn([I.U])],decls:34,vars:3,consts:[["contentId","main-content"],["color","dark"],["color","light",1,"ion-padding",2,"font-size","16px"],[2,"font-size","18px"],["src","assets/instrucciones/lista.png"],["src","assets/instrucciones/canales.png"],["src","assets/instrucciones/cargandocanal.png"],[2,"font-style","italic","font-size","12px"],["id","main-content",1,"ion-page"],["slot","start"],["size","large",1,"ion-text-center"],["src","assets/icon/logo-icon.png",2,"width","30px"],["color","light",1,"ion-text-capitalize"],["color","light","aria-label","Fruit","interface","popover","placeholder","Seleccione una categoria",1,"ion-text-capitalize",3,"innerHTML","ionChange"],[4,"ngFor","ngForOf"],[3,"isOpen","willDismiss"],["color","dark",4,"ngIf"],[1,"channel-logo",3,"src"],[3,"routerLink","queryParams"],["style","font-size: 12px;",4,"ngIf"],["class","ion-text-right","style","font-size: 14px;    color: aquamarine;",3,"click",4,"ngIf"],[2,"font-size","12px"],["name","chevron-forward-outline",2,"color","aquamarine"],[1,"ion-text-right",2,"font-size","14px","color","aquamarine",3,"click"],["expand","block"],[2,"width","30px","vertical-align","middle","margin-right","10px",3,"src"],["slot","end"],[3,"click"],[1,"ion-padding"],[1,"ion-text-center"]],template:function(t,a){1&t&&(e.TgZ(0,"ion-menu",0)(1,"ion-header")(2,"ion-toolbar",1)(3,"ion-title"),e._uU(4,"Menu"),e.qZA()()(),e.TgZ(5,"ion-content",2)(6,"p",3),e._uU(7,"Instrucciones de Uso de la Aplicacion"),e.qZA(),e.TgZ(8,"p"),e._uU(9,"Selecciona Categoria: "),e.qZA(),e._UZ(10,"ion-img",4),e.TgZ(11,"p"),e._uU(12,"Selecciona Canal:"),e.qZA(),e._UZ(13,"ion-img",5),e.TgZ(14,"p"),e._uU(15,"Y listo!"),e.qZA(),e._UZ(16,"ion-img",6),e.TgZ(17,"p",7),e._uU(18,"* Algunos canales pueden demorar en conectar dependiendo de la conexion que haya en el momento"),e.qZA()()(),e.TgZ(19,"div",8)(20,"ion-header")(21,"ion-toolbar",1)(22,"ion-buttons",9),e._UZ(23,"ion-menu-button"),e.qZA(),e.TgZ(24,"ion-title",10),e._uU(25,"Fly TV "),e._UZ(26,"img",11),e.qZA()(),e.TgZ(27,"ion-list",12)(28,"ion-item",12)(29,"ion-select",13),e.NdJ("ionChange",function(u){return a.handleChange(u)}),e.qZA()()()(),e.TgZ(30,"ion-content"),e.YNc(31,J,2,1,"ion-list",14),e.TgZ(32,"ion-modal",15),e.NdJ("willDismiss",function(){return a.setOpen(!1)}),e.YNc(33,re,12,4,"ng-template"),e.qZA()()()),2&t&&(e.xp6(29),e.Q6J("innerHTML",a.htmlSelectOption,e.oJD),e.xp6(2),e.Q6J("ngForOf",a.channels),e.xp6(1),e.Q6J("isOpen",a.isModalOpen))},dependencies:[g.sg,g.O5,f.YG,f.Sm,f.W2,f.Gu,f.gu,f.Xz,f.Ie,f.Q$,f.q_,f.z0,f.fG,f.t9,f.wd,f.sr,f.ki,f.QI,f.YI,U.rH],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:25px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%]{text-decoration:none;text-align:center}div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover > ion-item[_ngcontent-%COMP%] > ion-label[_ngcontent-%COMP%]{color:#98e4ff;font-size:23px;white-space:nowrap}ion-list[_ngcontent-%COMP%]{padding-top:0!important;padding-bottom:0!important}.channel-logo[_ngcontent-%COMP%], .acordeon-logo[_ngcontent-%COMP%]{width:25px;margin-right:5px}ion-select[_ngcontent-%COMP%]{max-height:50%!important}"]}),r})()}];let i=(()=>{var n;class r{}return(n=r).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[U.Bz.forChild(o),U.Bz]}),r})(),d=(()=>{var n;class r{}return(n=r).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[g.ez,ee.u5,f.Pc,i]}),r})()}}]);