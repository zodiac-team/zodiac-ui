(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{WoO9:function(n,l,u){"use strict";u.r(l);var e=u("kZht"),t=u("4e/d"),r=u("YtkY"),a=u("vHPH");const o=u("jn67").a+"announcements.json";class c{constructor(n,l){this.http=n,this.logger=l}ngOnInit(){this.http.get(o).pipe(Object(t.a)(n=>(this.logger.error(new Error(`${o} request failed: ${n.message}`)),[])),Object(r.a)(n=>this.findCurrentAnnouncement(n)),Object(t.a)(n=>(this.logger.error(new Error(`${o} contains invalid data: ${n.message}`)),[]))).subscribe(n=>this.announcement=n)}findCurrentAnnouncement(n){return n.filter(n=>new Date(n.startDate).valueOf()<Date.now()).filter(n=>new Date(n.endDate).valueOf()>Date.now())[0]}}class b{constructor(){this.customElementComponent=c}}var s=u("An66"),i=u("6uGs"),m=e.pb({encapsulation:2,styles:[],data:{}});function f(n){return e.Jb(0,[(n()(),e.rb(0,0,null,null,5,"div",[["class","homepage-container"]],null,null,null,null,null)),(n()(),e.rb(1,0,null,null,4,"div",[["class","announcement-bar"]],null,null,null,null,null)),(n()(),e.rb(2,0,null,null,0,"img",[["alt",""]],[[8,"src",4]],null,null,null,null)),(n()(),e.rb(3,0,null,null,0,"p",[],[[8,"innerHTML",1]],null,null,null,null)),(n()(),e.rb(4,0,null,null,1,"a",[["class","button"]],[[8,"href",4]],null,null,null,null)),(n()(),e.Hb(-1,null,["Learn More"]))],null,function(n,l){var u=l.component;n(l,2,0,u.announcement.imageUrl),n(l,3,0,u.announcement.message),n(l,4,0,u.announcement.linkUrl)})}function g(n){return e.Jb(0,[(n()(),e.gb(16777216,null,null,1,null,f)),e.qb(1,16384,null,0,s.k,[e.P,e.M],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,1,0,l.component.announcement)},null)}function d(n){return e.Jb(0,[(n()(),e.rb(0,0,null,null,1,"aio-announcement-bar",[],null,null,null,g,m)),e.qb(1,114688,null,0,c,[i.c,a.a],null,null)],function(n,l){n(l,1,0)},null)}var z=e.nb("aio-announcement-bar",c,d,{},{},[]),h=u("PCNd");u.d(l,"AnnouncementBarModuleNgFactory",function(){return p});var p=e.ob(b,[],function(n){return e.yb([e.zb(512,e.j,e.bb,[[8,[z]],[3,e.j],e.w]),e.zb(4608,s.m,s.l,[e.t,[2,s.B]]),e.zb(4608,i.h,i.n,[s.d,e.A,i.l]),e.zb(4608,i.o,i.o,[i.h,i.m]),e.zb(5120,i.a,function(n){return[n]},[i.o]),e.zb(4608,i.k,i.k,[]),e.zb(6144,i.i,null,[i.k]),e.zb(4608,i.g,i.g,[i.i]),e.zb(6144,i.b,null,[i.g]),e.zb(4608,i.f,i.j,[i.b,e.q]),e.zb(4608,i.c,i.c,[i.f]),e.zb(1073742336,s.c,s.c,[]),e.zb(1073742336,h.a,h.a,[]),e.zb(1073742336,i.e,i.e,[]),e.zb(1073742336,i.d,i.d,[]),e.zb(1073742336,b,b,[]),e.zb(256,i.l,"XSRF-TOKEN",[]),e.zb(256,i.m,"X-XSRF-TOKEN",[])])})}}]);