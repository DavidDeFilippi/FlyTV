"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1366],{1366:(q,f,c)=>{c.r(f),c.d(f,{HomePageModule:()=>V});var m=c(6814),r=c(2303),T=c(95),u=c(3044),d=c(5861),_=c(3403),b=c(3020);const p=(0,c(2726).fo)("AdMob",{web:()=>c.e(2861).then(c.bind(c,2861)).then(n=>new n.AdMobWeb)});var e=c(6689);let M=(()=>{var n;class s{constructor(){this.globalCategory="",this.numberForAds=1,this.firstLoadingChannels=!0}getGlobalCategory(){return this.globalCategory}setGlobalCategory(t){this.globalCategory=t}getNumberForAds(){return this.numberForAds}setNumberForAds(t){this.numberForAds=t}getFirstLoadingChannels(){return this.firstLoadingChannels}setFirstLoadingChannels(t){this.firstLoadingChannels=t}}return(n=s).\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),s})();var y=c(6735),w=c(6593);function H(n,s){if(1&n&&(e.TgZ(0,"ion-label",25),e._UZ(1,"ion-icon",26),e._uU(2),e.qZA()),2&n){const a=e.oxw(2).$implicit;e.xp6(2),e.Oqu(a.transmitiendo.current)}}function L(n,s){if(1&n&&(e.TgZ(0,"ion-label",25),e._uU(1),e.qZA()),2&n){const a=e.oxw(2).$implicit;e.xp6(1),e.Oqu(a.transmitiendo.next)}}function F(n,s){if(1&n){const a=e.EpF();e.TgZ(0,"ion-label",27),e.NdJ("click",function(){e.CHM(a);const o=e.oxw(2).$implicit,l=e.oxw();return e.KtG(l.setOpen(!0,o))}),e.TgZ(1,"p",28),e._uU(2,"ver programacion"),e.qZA()()}}const S=function(){return["/iframe"]},v=function(){return["/reproductor"]},U=function(n){return{id:n}};function R(n,s){if(1&n&&(e.TgZ(0,"ion-item",1),e._UZ(1,"img",21),e.TgZ(2,"ion-label",22),e._uU(3),e.YNc(4,H,3,1,"ion-label",23),e.YNc(5,L,2,1,"ion-label",23),e.qZA(),e.YNc(6,F,3,0,"ion-label",24),e.qZA()),2&n){const a=e.oxw().$implicit;e.xp6(1),e.Q6J("src",a.logo,e.LSH),e.xp6(1),e.Q6J("routerLink",a.iframe?e.DdM(8,S):e.DdM(9,v))("queryParams",e.VKq(10,U,a.id)),e.uIk("id",a.id),e.xp6(1),e.hij("",a.name," "),e.xp6(1),e.Q6J("ngIf",""!==a.transmitiendo.current),e.xp6(1),e.Q6J("ngIf",""!==a.transmitiendo.next),e.xp6(1),e.Q6J("ngIf",a.parrilla.length)}}function D(n,s){if(1&n&&(e.TgZ(0,"ion-list"),e.YNc(1,R,7,12,"ion-item",20),e.qZA()),2&n){const a=s.$implicit;e.xp6(1),e.Q6J("ngIf",a.enabled)}}function z(n,s){if(1&n&&(e.TgZ(0,"ion-list")(1,"ion-item")(2,"ion-label"),e._uU(3),e.qZA(),e.TgZ(4,"ion-label"),e._uU(5),e.qZA()()()),2&n){const a=s.$implicit;e.xp6(3),e.hij(" ",a.horaNormal," "),e.xp6(2),e.hij(" ",a.programa," ")}}function E(n,s){if(1&n){const a=e.EpF();e.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),e._UZ(3,"img",29),e._uU(4),e.qZA(),e.TgZ(5,"ion-buttons",30)(6,"ion-button",31),e.NdJ("click",function(){e.CHM(a);const o=e.oxw();return e.KtG(o.setOpen(!1,o.channel))}),e._uU(7,"Cerrar"),e.qZA()()()(),e.TgZ(8,"ion-content",32)(9,"h4",33),e._uU(10),e.qZA(),e.YNc(11,z,6,2,"ion-list",18),e.qZA()}if(2&n){const a=e.oxw();e.xp6(3),e.Q6J("src",a.channelModal.logo,e.LSH),e.xp6(1),e.hij("Programacion ",a.channelModal.name,""),e.xp6(6),e.Oqu(a.channelModal.diaParrilla),e.xp6(1),e.Q6J("ngForOf",a.modalParrilla)}}const k=[{path:"",component:(()=>{var n;class s{constructor(t,o,l,i,h,g,G){this.channelService=t,this.loadingCtrl=o,this.globalVar=l,this.so=i,this.sanitizer=h,this.alertController=g,this.platform=G,this.selected_value="",this.isModalOpen=!1,this.diaParrilla="",this.aspck=0}ionViewWillEnter(){var t=this;return(0,d.Z)(function*(){t.lockToPortrait(),t.platform.ready().then(()=>{b.A_.show()}),t.globalVar.getNumberForAds()%2!=0&&t.initialize(),t.globalVar.setNumberForAds(t.globalVar.getNumberForAds()+1),new VideoHls("","stop"),t.globalVar.getFirstLoadingChannels()&&(t.getChannels(),t.globalVar.setFirstLoadingChannels(!1))})()}getChannels(){var t=this;return(0,d.Z)(function*(){const o=yield t.loadingCtrl.create({message:"Cargando canales"});o.present(),t.channelService.getChannels().subscribe(l=>{t.channels=l,t.channelsBackUp=l,t.getParrilla(),t.category=t.globalVar.getGlobalCategory(),t.listCategories(),t.getCategory(t.category),o.dismiss()})})()}getParrilla(){var t=this;return(0,d.Z)(function*(){t.channelService.getParrilla().subscribe(o=>{t.parrilla=o;for(let l=0;l<t.channels.length;l++){t.channels[l].parrilla=[];for(let i=0;i<t.parrilla.length;i++)t.channels[l].id==t.parrilla[i].id&&(t.channels[l].parrilla=t.parrilla[i].parrilla,t.channelsBackUp[l].parrilla=t.parrilla[i].parrilla,t.channels[l].transmitiendo.current=t.getCurrentPrograma(t.parrilla[i].parrilla),t.channels[l].transmitiendo.next=t.getNextPrograma(t.parrilla[i].parrilla),t.channelsBackUp[l].transmitiendo.current=t.getCurrentPrograma(t.parrilla[i].parrilla),t.channelsBackUp[l].transmitiendo.next=t.getNextPrograma(t.parrilla[i].parrilla))}})})()}getCurrentPrograma(t){let o="",l=new Date;for(let i=0;i<t.length;i++){const h=new Date(t[i].hora);let g;g=i<t.length-1?new Date(t[i+1].hora):(new Date).setHours(l.getHours()+1),l>h&&l<g&&(o=h.toLocaleTimeString().slice(0,-3)+" "+t[i].programa)}return o}getNextPrograma(t){let o="",l=new Date;for(let i=0;i<t.length-1;i++){const h=new Date(t[i].hora),g=new Date(t[i+1].hora);l>h&&l<g&&(o=g.toLocaleTimeString().slice(0,-3)+" "+t[i+1].programa)}return this.diaParrilla=new Date(t[0].hora).toLocaleDateString(),o}getCategory(t){var o=this;return(0,d.Z)(function*(){if("todos"===t||""===t||void 0===t){o.globalVar.setGlobalCategory("todos");for(let i=0;i<o.channels.length;i++)o.channels[i].enabled=!0}else for(let i=0;i<o.channels.length;i++)o.channels[i].enabled=o.channels[i].categoria===t;for(var l of(o.globalVar.setGlobalCategory(t),o.htmlSelectOption='<ion-select-option color="light" value="todos" class="ion-text-capitalize">Todos</ion-select-option>',o.categories))o.htmlSelectOption=o.htmlSelectOption+`<ion-select-option color="light" value="${l}" class="ion-text-capitalize">${l}</ion-select-option>`;o.htmlSelectOption=o.getSanitizedHtml(o.htmlSelectOption)})()}listCategories(){var t=this;return(0,d.Z)(function*(){t.categories=[];for(let o=0;o<t.channels.length;o++)t.categories.push(t.channels[o].categoria);t.categories=[...new Set(t.categories)]})()}initialize(){var t=this;return(0,d.Z)(function*(){const{status:o}=yield p.trackingAuthorizationStatus();console.log(o),"notDetermined"===o&&console.log("Display information before ads load first time"),p.initialize({requestTrackingAuthorization:!0,testingDevices:["735978b4-219f-4d70-bade-7eb4b808ac5d"],initializeForTesting:!1}),t.showInterstitial()})()}showInterstitial(){return(0,d.Z)(function*(){yield p.prepareInterstitial({adId:"ca-app-pub-4427288659732696/1947824722",isTesting:!1}),yield p.showInterstitial()})()}lockToPortrait(){this.so.lock(this.so.ORIENTATIONS.PORTRAIT)}lockToLandscape(){this.so.lock(this.so.ORIENTATIONS.LANDSCAPE)}unlockScreenOrientation(){this.so.unlock()}getSanitizedHtml(t){return this.sanitizer.bypassSecurityTrustHtml(t)}handleChange(t){this.getCategory(t.detail.value)}setOpen(t,o){t?(this.channelModal=o,this.channelModal.diaParrilla=this.diaParrilla,this.modalParrilla=this.channelModal.parrilla,this.isModalOpen=t):(this.isModalOpen=t,this.channelModal=[],this.modalParrilla=[])}bounceBaloon(){this.aspck=this.aspck+1,20==this.aspck&&(this.aspck=0,localStorage.setItem("xa88","1"),this.getChannels())}}return(n=s).\u0275fac=function(t){return new(t||n)(e.Y36(_.U),e.Y36(r.HT),e.Y36(M),e.Y36(y.E),e.Y36(w.H7),e.Y36(r.Br),e.Y36(r.t4))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-home"]],features:[e._Bn([_.U])],decls:39,vars:3,consts:[["contentId","main-content"],["color","dark"],["color","light",1,"ion-padding",2,"font-size","16px"],[2,"font-size","18px"],["src","assets/instrucciones/lista.png"],["src","assets/instrucciones/canales.png"],["src","assets/instrucciones/cargandocanal.png"],[2,"font-style","italic","font-size","12px",3,"click"],["id","main-content",1,"ion-page"],["slot","start"],["size","large",1,"ion-text-center"],["src","assets/icon/logo-icon.png",2,"width","30px"],["color","light",1,"ion-text-capitalize"],["color","light"],["size","11"],["color","light","aria-label","Fruit","interface","popover","placeholder","Seleccione una categoria",1,"ion-text-capitalize",2,"width","80%",3,"innerHTML","ionChange"],["size","1",1,"vertical-center",2,"font-size","25px",3,"click"],[1,"fa-solid","fa-rotate-right"],[4,"ngFor","ngForOf"],[3,"isOpen","willDismiss"],["color","dark",4,"ngIf"],[1,"channel-logo",3,"src"],[3,"routerLink","queryParams"],["style","font-size: 12px;",4,"ngIf"],["class","ion-text-right","style","font-size: 14px;    color: aquamarine;",3,"click",4,"ngIf"],[2,"font-size","12px"],["name","chevron-forward-outline",2,"color","aquamarine"],[1,"ion-text-right",2,"font-size","14px","color","aquamarine",3,"click"],["expand","block"],[2,"width","30px","vertical-align","middle","margin-right","10px",3,"src"],["slot","end"],[3,"click"],[1,"ion-padding"],[1,"ion-text-center"]],template:function(t,o){1&t&&(e.TgZ(0,"ion-menu",0)(1,"ion-header")(2,"ion-toolbar",1)(3,"ion-title"),e._uU(4,"Menu"),e.qZA()()(),e.TgZ(5,"ion-content",2)(6,"p",3),e._uU(7,"Instrucciones de Uso de la Aplicacion"),e.qZA(),e.TgZ(8,"p"),e._uU(9,"Selecciona Categoria: "),e.qZA(),e._UZ(10,"ion-img",4),e.TgZ(11,"p"),e._uU(12,"Selecciona Canal:"),e.qZA(),e._UZ(13,"ion-img",5),e.TgZ(14,"p"),e._uU(15,"Y listo!"),e.qZA(),e._UZ(16,"ion-img",6),e.TgZ(17,"p",7),e.NdJ("click",function(){return o.bounceBaloon()}),e._uU(18,"* Algunos canales pueden demorar en conectar dependiendo de la conexion que haya en el momento"),e.qZA()()(),e.TgZ(19,"div",8)(20,"ion-header")(21,"ion-toolbar",1)(22,"ion-buttons",9),e._UZ(23,"ion-menu-button"),e.qZA(),e.TgZ(24,"ion-title",10),e._uU(25,"Fly TV"),e._UZ(26,"img",11),e.qZA()(),e.TgZ(27,"ion-list",12)(28,"ion-item",13)(29,"ion-grid")(30,"ion-row")(31,"ion-col",14)(32,"ion-select",15),e.NdJ("ionChange",function(i){return o.handleChange(i)}),e.qZA()(),e.TgZ(33,"ion-col",16),e.NdJ("click",function(){return o.getChannels()}),e._UZ(34,"i",17),e.qZA()()()()()(),e.TgZ(35,"ion-content"),e.YNc(36,D,2,1,"ion-list",18),e.TgZ(37,"ion-modal",19),e.NdJ("willDismiss",function(){return o.setOpen(!1)}),e.YNc(38,E,12,4,"ng-template"),e.qZA()()()),2&t&&(e.xp6(32),e.Q6J("innerHTML",o.htmlSelectOption,e.oJD),e.xp6(4),e.Q6J("ngForOf",o.channels),e.xp6(1),e.Q6J("isOpen",o.isModalOpen))},dependencies:[m.sg,m.O5,r.YG,r.Sm,r.wI,r.W2,r.jY,r.Gu,r.gu,r.Xz,r.Ie,r.Q$,r.q_,r.z0,r.fG,r.Nd,r.t9,r.wd,r.sr,r.ki,r.QI,r.YI,u.rH],styles:["#container[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}#container[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:25px;line-height:26px}#container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px;line-height:22px;color:#8c8c8c;margin:0}#container[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none}a[_ngcontent-%COMP%]{text-decoration:none;text-align:center}div[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover > ion-item[_ngcontent-%COMP%] > ion-label[_ngcontent-%COMP%]{color:#98e4ff;font-size:23px;white-space:nowrap}ion-list[_ngcontent-%COMP%]{padding-top:0!important;padding-bottom:0!important}.channel-logo[_ngcontent-%COMP%], .acordeon-logo[_ngcontent-%COMP%]{width:25px;margin-right:5px}ion-select[_ngcontent-%COMP%]{max-height:50%!important}.vertical-center[_ngcontent-%COMP%]{margin-top:12px}"]}),s})()}];let I=(()=>{var n;class s{}return(n=s).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[u.Bz.forChild(k),u.Bz]}),s})(),V=(()=>{var n;class s{}return(n=s).\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.ez,T.u5,r.Pc,I]}),s})()}}]);