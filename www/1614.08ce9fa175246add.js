"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1614],{1614:(S,c,n)=>{n.r(c),n.d(c,{IframePageModule:()=>I});var u=n(6814),h=n(95),l=n(9247),i=n(3044),a=n(6689),f=n(3403),m=n(6593),d=n(6735);const g=[{path:"",component:(()=>{var e;class s{constructor(t,r,P,p){this.channelService=t,this.activatedRoute=r,this.sanitizer=P,this.so=p}ngOnInit(){this.unlockScreenOrientation(),this.id=this.activatedRoute.snapshot.queryParamMap.get("id"),this.channelService.getChannels().subscribe(t=>{for(var r of(this.channels=t,this.channels))if(this.id==r.id){this.channel=r;break}this.iframe=this.getSanitizedHtml(this.channel.url)})}getSanitizedHtml(t){return this.sanitizer.bypassSecurityTrustHtml(t)}lockToPortrait(){this.so.lock(this.so.ORIENTATIONS.PORTRAIT)}lockToLandscape(){this.so.lock(this.so.ORIENTATIONS.LANDSCAPE)}unlockScreenOrientation(){this.so.unlock()}}return(e=s).\u0275fac=function(t){return new(t||e)(a.Y36(f.U),a.Y36(i.gz),a.Y36(m.H7),a.Y36(d.E))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-iframe"]],decls:1,vars:2,consts:[[2,"background-color","black",3,"fullscreen","innerHTML"]],template:function(t,r){1&t&&a._UZ(0,"ion-content",0),2&t&&a.Q6J("fullscreen",!0)("innerHTML",r.iframe,a.oJD)},dependencies:[l.W2]}),s})()}];let v=(()=>{var e;class s{}return(e=s).\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[i.Bz.forChild(g),i.Bz]}),s})(),I=(()=>{var e;class s{}return(e=s).\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[u.ez,h.u5,l.Pc,v]}),s})()}}]);