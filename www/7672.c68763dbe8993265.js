"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[7672],{7672:(b,r,n)=>{n.r(r),n.d(r,{WebcamPageModule:()=>P});var u=n(6814),h=n(95),l=n(9247),i=n(3044),a=n(6689),m=n(3403),d=n(6593),g=n(6735);const f=[{path:"",component:(()=>{var e;class s{constructor(t,o,p,W){this.channelService=t,this.activatedRoute=o,this.sanitizer=p,this.so=W}ngOnInit(){this.unlockScreenOrientation(),this.id=this.activatedRoute.snapshot.queryParamMap.get("id"),this.channelService.getChannels().subscribe(t=>{for(var o of(this.channels=t,this.channels))if(this.id==o.id){this.channel=o;break}this.iframe=this.getSanitizedHtml(this.channel.url)})}getSanitizedHtml(t){return this.sanitizer.bypassSecurityTrustHtml(t)}lockToPortrait(){this.so.lock(this.so.ORIENTATIONS.PORTRAIT)}lockToLandscape(){this.so.lock(this.so.ORIENTATIONS.LANDSCAPE)}unlockScreenOrientation(){this.so.unlock()}}return(e=s).\u0275fac=function(t){return new(t||e)(a.Y36(m.U),a.Y36(i.gz),a.Y36(d.H7),a.Y36(g.E))},e.\u0275cmp=a.Xpm({type:e,selectors:[["app-webcam"]],decls:1,vars:2,consts:[[2,"background-color","black",3,"fullscreen","innerHTML"]],template:function(t,o){1&t&&a._UZ(0,"ion-content",0),2&t&&a.Q6J("fullscreen",!0)("innerHTML",o.iframe,a.oJD)},dependencies:[l.W2]}),s})()}];let v=(()=>{var e;class s{}return(e=s).\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[i.Bz.forChild(f),i.Bz]}),s})(),P=(()=>{var e;class s{}return(e=s).\u0275fac=function(t){return new(t||e)},e.\u0275mod=a.oAB({type:e}),e.\u0275inj=a.cJS({imports:[u.ez,h.u5,l.Pc,v]}),s})()}}]);