(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{uway:function(l,n,u){"use strict";u.r(n);var t=u("kZht"),r=u("YtkY"),e=u("Yj6K");const o=u("jn67").a+"resources.json";class c{constructor(l){this.http=l,this.categories=this.getCategories()}getCategories(){const l=this.http.get(o).pipe(Object(r.a)(l=>(function(l){return Object.keys(l).map(n=>{const u=l[n];return{id:p(n),title:n,order:u.order,subCategories:s(u.subCategories,n)}}).sort(a)})(l)),Object(e.a)());return l.connect(),l}}function s(l,n){return Object.keys(l).map(u=>{const t=l[u];return{id:p(u),title:u,order:t.order,resources:i(t.resources,u,n)}}).sort(a)}function i(l,n,u){return Object.keys(l).map(t=>{const r=l[t];return r.category=u,r.subCategory=n,r.id=p(t),r}).sort(b)}function a(l,n){return l.order===n.order?b(l,n):l.order>n.order?1:-1}function b(l,n){return l.title.toUpperCase()>n.title.toUpperCase()?1:-1}function p(l){return l.toLowerCase().replace(/\s+/g,"-")}class f{constructor(l,n){this.resourceService=n,this.scrollPos=0,this.location=l.pathname.replace(/^\/+/,"")}href(l){return this.location+"#"+l.id}ngOnInit(){this.resourceService.categories.subscribe(l=>this.categories=l)}onScroll(l){this.scrollPos=l&&(l.scrollTop||l.body.scrollTop)||0}}class d{constructor(){this.customElementComponent=f}}var g=u("An66"),h=t.pb({encapsulation:2,styles:[],data:{}});function m(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,6,"div",[["class","c-resource"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,5,"a",[["class","l-flex--column resource-row-link"],["target","_blank"]],[[8,"href",4]],null,null,null,null)),(l()(),t.rb(2,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),t.rb(3,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),t.Hb(4,null,["",""])),(l()(),t.rb(5,0,null,null,1,"p",[["class","resource-description"]],null,null,null,null,null)),(l()(),t.Hb(6,null,["",""]))],null,function(l,n){l(n,1,0,n.parent.context.$implicit.url),l(n,4,0,n.parent.context.$implicit.title),l(n,6,0,n.parent.context.$implicit.desc||"No Description")})}function v(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,m)),t.qb(2,16384,null,0,g.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,n.context.$implicit.rev)},null)}function w(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,5,"div",[],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,0,"a",[["class","h-anchor-offset"]],[[8,"id",0]],null,null,null,null)),(l()(),t.rb(2,0,null,null,1,"h3",[["class","subcategory-title"]],null,null,null,null,null)),(l()(),t.Hb(3,null,["",""])),(l()(),t.gb(16777216,null,null,1,null,v)),t.qb(5,278528,null,0,g.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,5,0,n.context.$implicit.resources)},function(l,n){l(n,1,0,t.tb(1,"",n.context.$implicit.id,"")),l(n,3,0,n.context.$implicit.title)})}function j(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,7,"div",[["class","showcase"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,3,"header",[["class","c-resource-header"]],null,null,null,null,null)),(l()(),t.rb(2,0,null,null,0,"a",[["class","h-anchor-offset"]],[[8,"id",0]],null,null,null,null)),(l()(),t.rb(3,0,null,null,1,"h2",[],null,null,null,null,null)),(l()(),t.Hb(4,null,["",""])),(l()(),t.rb(5,0,null,null,2,"div",[["class","shadow-1"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,w)),t.qb(7,278528,null,0,g.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,7,0,n.context.$implicit.subCategories)},function(l,n){l(n,2,0,t.tb(1,"",n.context.$implicit.id,"")),l(n,4,0,n.context.$implicit.title)})}function x(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,3,"div",[["class","resources-container"]],null,null,null,null,null)),(l()(),t.rb(1,0,null,null,2,"div",[["class","l-flex--column"]],null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,j)),t.qb(3,278528,null,0,g.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,3,0,n.component.categories)},null)}function O(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"aio-resource-list",[],null,[["window","scroll"]],function(l,n,u){var r=!0;return"window:scroll"===n&&(r=!1!==t.Bb(l,1).onScroll(u.target)&&r),r},x,h)),t.qb(1,114688,null,0,f,[g.s,c],null,null)],function(l,n){l(n,1,0)},null)}var y=t.nb("aio-resource-list",f,O,{},{},[]),k=u("6uGs");u.d(n,"ResourceListModuleNgFactory",function(){return C});var C=t.ob(d,[],function(l){return t.yb([t.zb(512,t.j,t.bb,[[8,[y]],[3,t.j],t.w]),t.zb(4608,g.m,g.l,[t.t,[2,g.B]]),t.zb(4608,c,c,[k.c]),t.zb(1073742336,g.c,g.c,[]),t.zb(1073742336,d,d,[])])})}}]);