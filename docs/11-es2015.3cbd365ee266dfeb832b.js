(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{"ll+R":function(l,n,u){"use strict";u.r(n);var t=u("kZht"),o=u("YtkY"),r=u("Yj6K"),c=u("jn67");const i=c.a+"contributors.json",e=["Angular","Collaborators","GDE"];class s{constructor(l){this.http=l,this.contributors=this.getContributors()}getContributors(){const l=this.http.get(i).pipe(Object(o.a)(l=>{const n={};return Object.keys(l).forEach(u=>{const t=l[u];t.groups.forEach(l=>{(n[l]||(n[l]=[])).push(t)})}),n}),Object(o.a)(l=>Object.keys(l).map(n=>{const u=e.indexOf(n);return{name:n,order:-1===u?e.length:u,contributors:l[n].sort(a)}}).sort(b)),Object(r.a)());return l.connect(),l}}function a(l,n){return l.name.toUpperCase()>n.name.toUpperCase()?1:-1}function b(l,n){return l.order===n.order?l.name>n.name?1:-1:l.order>n.order?1:-1}var p=u("/lUL");class f{constructor(l,n){this.contributorService=l,this.locationService=n}ngOnInit(){const l=this.locationService.search().group||"";this.contributorService.contributors.subscribe(n=>{this.groups=n,this.groupNames=n.map(l=>l.name),this.selectGroup(l)})}selectGroup(l){l=l.toLowerCase(),this.selectedGroup=this.groups.find(n=>n.name.toLowerCase()===l)||this.groups[0],this.locationService.setSearch("",{group:this.selectedGroup.name})}}class g{constructor(){this.customElementComponent=f}}var m=u("Hc9t"),d=u("a+5/"),h=u("An66");class k{constructor(){this.noPicture="_no-one.png",this.pictureBase=c.a+"images/bios/"}flipCard(l){l.isFlipped=!l.isFlipped}}var v=t.pb({encapsulation:2,styles:[],data:{}});function w(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"a",[["class","info-item"],["mat-button",""]],null,null,null,null,null)),(l()(),t.Hb(-1,null,[" View Bio "]))],null,null)}function C(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,2,"a",[["class","info-item icon"],["mat-icon-button",""],["target","_blank"]],[[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==u.stopPropagation()&&t),t},null,null)),(l()(),t.rb(1,0,null,null,1,"mat-icon",[["class","mat-icon"],["role","img"],["svgIcon","logos:twitter"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,m.b,m.a)),t.qb(2,9158656,null,0,d.b,[t.k,d.d,[8,null],[2,d.a]],{svgIcon:[0,"svgIcon"]},null)],function(l,n){l(n,2,0,"logos:twitter")},function(l,n){l(n,0,0,t.tb(1,"https://twitter.com/",n.component.person.twitter,"")),l(n,1,0,t.Bb(n,2).inline,"primary"!==t.Bb(n,2).color&&"accent"!==t.Bb(n,2).color&&"warn"!==t.Bb(n,2).color)})}function I(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,3,"a",[["class","info-item icon"],["mat-icon-button",""],["target","_blank"]],[[8,"href",4]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==u.stopPropagation()&&t),t},null,null)),(l()(),t.rb(1,0,null,null,2,"mat-icon",[["class","link-icon mat-icon"],["role","img"]],[[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,m.b,m.a)),t.qb(2,9158656,null,0,d.b,[t.k,d.d,[8,null],[2,d.a]],null,null),(l()(),t.Hb(-1,0,["link"]))],function(l,n){l(n,2,0)},function(l,n){l(n,0,0,t.tb(1,"",n.component.person.website,"")),l(n,1,0,t.Bb(n,2).inline,"primary"!==t.Bb(n,2).color&&"accent"!==t.Bb(n,2).color&&"warn"!==t.Bb(n,2).color)})}function j(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,4,"div",[["class","card-back"]],null,[[null,"click"]],function(l,n,u){var t=!0,o=l.component;return"click"===n&&(t=!1!==o.flipCard(o.person)&&t),t},null,null)),(l()(),t.rb(1,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.Hb(2,null,["",""])),(l()(),t.rb(3,0,null,null,1,"p",[["class","contributor-bio"]],null,null,null,null,null)),(l()(),t.Hb(4,null,["",""]))],null,function(l,n){var u=n.component;l(n,2,0,u.person.name),l(n,4,0,u.person.bio)})}function q(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,16,"div",[["class","contributor-card"]],null,null,null,null,null)),t.Eb(512,null,h.w,h.x,[t.r,t.s,t.k,t.D]),t.qb(2,278528,null,0,h.i,[h.w],{klass:[0,"klass"],ngClass:[1,"ngClass"]},null),t.Db(3,{flipped:0}),(l()(),t.rb(4,0,null,null,10,"div",[["class","card-front"]],null,[[null,"click"]],function(l,n,u){var t=!0,o=l.component;return"click"===n&&(t=!1!==o.flipCard(o.person)&&t),t},null,null)),(l()(),t.rb(5,0,null,null,1,"h3",[],null,null,null,null,null)),(l()(),t.Hb(6,null,["",""])),(l()(),t.rb(7,0,null,null,7,"div",[["class","contributor-image"]],[[4,"background-image",null]],null,null,null,null)),(l()(),t.rb(8,0,null,null,6,"div",[["class","contributor-info"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,w)),t.qb(10,16384,null,0,h.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,C)),t.qb(12,16384,null,0,h.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,I)),t.qb(14,16384,null,0,h.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,j)),t.qb(16,16384,null,0,h.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component,t=l(n,3,0,u.person.isFlipped);l(n,2,0,"contributor-card",t),l(n,10,0,u.person.bio),l(n,12,0,u.person.twitter),l(n,14,0,u.person.website),l(n,16,0,u.person.isFlipped)},function(l,n){var u=n.component;l(n,6,0,u.person.name),l(n,7,0,"url("+u.pictureBase+(u.person.picture||u.noPicture)+")")})}var B=t.pb({encapsulation:2,styles:[],data:{}});function J(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"a",[["class","button mat-button filter-button"]],[[2,"selected",null]],[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.selectGroup(l.context.$implicit)&&t),t},null,null)),(l()(),t.Hb(1,null,["",""]))],null,function(l,n){l(n,0,0,n.context.$implicit==n.component.selectedGroup.name),l(n,1,0,n.context.$implicit)})}function O(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"aio-contributor",[],null,null,null,q,v)),t.qb(1,49152,null,0,k,[],{person:[0,"person"]},null)],function(l,n){l(n,1,0,n.context.$implicit)},null)}function P(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,3,"section",[["class","grid-fluid"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,2,"div",[["class","contributor-group"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,O)),t.qb(3,278528,null,0,h.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,3,0,n.component.selectedGroup.contributors)},null)}function G(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,2,"div",[["class","flex-center group-buttons"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,J)),t.qb(2,278528,null,0,h.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null),(l()(),t.gb(16777216,null,null,1,null,P)),t.qb(4,16384,null,0,h.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,2,0,u.groupNames),l(n,4,0,u.selectedGroup)},null)}function F(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"aio-contributor-list",[],null,null,null,G,B)),t.qb(1,114688,null,0,f,[s,p.a],null,null)],function(l,n){l(n,1,0)},null)}var y=t.nb("aio-contributor-list",f,F,{},{},[]),z=u("6uGs"),M=u("pOQZ"),x=u("ApNh"),H=u("ENSU");u.d(n,"ContributorListModuleNgFactory",function(){return S});var S=t.ob(g,[],function(l){return t.yb([t.zb(512,t.j,t.bb,[[8,[y]],[3,t.j],t.w]),t.zb(4608,h.m,h.l,[t.t,[2,h.B]]),t.zb(4608,s,s,[z.c]),t.zb(1073742336,h.c,h.c,[]),t.zb(1073742336,M.a,M.a,[]),t.zb(1073742336,x.c,x.c,[[2,x.a],[2,H.f]]),t.zb(1073742336,d.c,d.c,[]),t.zb(1073742336,g,g,[])])})}}]);