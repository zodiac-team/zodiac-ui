(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{s8K4:function(l,n,e){"use strict";e.r(n);var t=e("kZht"),i=e("ZTXN"),s=e("HM3f"),u=e("vT4p"),c=e("kuMc"),o=e("IdLP"),r=e("KRZI");class a extends o.a{constructor(l,n=0,e=u.a){super(),this.source=l,this.delayTime=n,this.scheduler=e,(!Object(r.a)(n)||n<0)&&(this.delayTime=0),e&&"function"==typeof e.schedule||(this.scheduler=u.a)}static create(l,n=0,e=u.a){return new a(l,n,e)}static dispatch(l){const{source:n,subscriber:e}=l;return this.add(n.subscribe(e))}_subscribe(l){return this.scheduler.schedule(a.dispatch,this.delayTime,{source:this.source,subscriber:l})}}class d{constructor(l,n){this.scheduler=l,this.delay=n}call(l,n){return new a(n,this.delay,this.scheduler).subscribe(l)}}var b=e("jIqt"),p=e("Faly"),h=e("TNhP");class m{constructor(l,n,e){this.scrollService=l,this.tocService=e,this.activeIndex=null,this.type="None",this.isCollapsed=!0,this.isEmbedded=!1,this.onDestroy=new i.a,this.primaryMax=4,this.isEmbedded=-1!==n.nativeElement.className.indexOf("embedded")}ngOnInit(){this.tocService.tocList.pipe(Object(c.a)(this.onDestroy)).subscribe(l=>{this.tocList=l;const n=function(l,n){return l.reduce((l,n)=>(l=>"h1"!==l.level)(n)?l+1:l,0)}(this.tocList);this.type=n>0?this.isEmbedded?n>this.primaryMax?"EmbeddedExpandable":"EmbeddedSimple":"Floating":"None"})}ngAfterViewInit(){this.isEmbedded||Object(s.a)(this.tocService.activeItemIndex.pipe(function(l,n=0){return function(e){return e.lift(new d(l,n))}}(u.a)),this.items.changes.pipe(Object(b.a)(this.items))).pipe(Object(c.a)(this.onDestroy)).subscribe(([l,n])=>{if(this.activeIndex=l,null===l||l>=n.length)return;const e=n.toArray()[l].nativeElement,t=e.offsetParent,i=e.getBoundingClientRect(),s=t.getBoundingClientRect();i.top>=s.top&&i.bottom<=s.bottom||(t.scrollTop+=i.top-s.top-t.clientHeight/2)})}ngOnDestroy(){this.onDestroy.next()}toggle(l=!0){this.isCollapsed=!this.isCollapsed,l&&this.isCollapsed&&this.toTop()}toTop(){this.scrollService.scrollToTop()}}class f{constructor(){this.customElementComponent=m}}var g=e("Hc9t"),y=e("a+5/"),v=e("An66"),I=t.pb({encapsulation:2,styles:[],data:{}});function x(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"div",[["class","toc-heading embedded"]],null,null,null,null,null)),(l()(),t.Hb(-1,null,[" Contents "]))],null,null)}function E(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,3,"button",[["aria-label","Expand/collapse contents"],["class","toc-heading embedded secondary"],["title","Expand/collapse contents"],["type","button"]],[[1,"aria-pressed",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toggle(!1)&&t),t},null,null)),(l()(),t.Hb(-1,null,[" Contents "])),(l()(),t.rb(2,0,null,null,1,"mat-icon",[["class","rotating-icon mat-icon"],["role","img"],["svgIcon","keyboard_arrow_right"]],[[2,"collapsed",null],[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,g.b,g.a)),t.qb(3,9158656,null,0,y.b,[t.k,y.d,[8,null],[2,y.a]],{svgIcon:[0,"svgIcon"]},null)],function(l,n){l(n,3,0,"keyboard_arrow_right")},function(l,n){var e=n.component;l(n,0,0,!e.isCollapsed),l(n,2,0,e.isCollapsed,t.Bb(n,3).inline,"primary"!==t.Bb(n,3).color&&"accent"!==t.Bb(n,3).color&&"warn"!==t.Bb(n,3).color)})}function k(l){return t.Jb(0,[(l()(),t.rb(0,0,[[1,0],["tocItem",1]],null,1,"li",[],[[8,"title",0],[8,"className",0],[2,"secondary",null],[2,"active",null]],null,null,null,null)),(l()(),t.rb(1,0,null,null,0,"a",[],[[8,"href",4],[8,"innerHTML",1]],null,null,null,null))],null,function(l,n){var e=n.component;l(n,0,0,t.tb(1,"",n.parent.context.$implicit.title,""),t.tb(1,"",n.parent.context.$implicit.level,""),"EmbeddedExpandable"===e.type&&n.parent.context.index>=e.primaryMax,n.parent.context.index===e.activeIndex),l(n,1,0,n.parent.context.$implicit.href,n.parent.context.$implicit.content)})}function w(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,k)),t.qb(2,16384,null,0,v.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(0,null,null,0))],function(l,n){l(n,2,0,"Floating"===n.component.type||"h1"!==n.context.$implicit.level)},null)}function C(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,0,"button",[["aria-label","Expand/collapse contents"],["class","toc-more-items embedded material-icons"],["title","Expand/collapse contents"],["type","button"]],[[2,"collapsed",null],[1,"aria-pressed",0]],[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==l.component.toggle()&&t),t},null,null))],null,function(l,n){var e=n.component;l(n,0,0,e.isCollapsed,!e.isCollapsed)})}function T(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,9,"div",[["class","toc-inner no-print"]],[[2,"collapsed",null]],null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,x)),t.qb(2,16384,null,0,v.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.gb(16777216,null,null,1,null,E)),t.qb(4,16384,null,0,v.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null),(l()(),t.rb(5,0,null,null,2,"ul",[["class","toc-list"]],[[2,"embedded",null]],null,null,null,null)),(l()(),t.gb(16777216,null,null,1,null,w)),t.qb(7,278528,null,0,v.j,[t.P,t.M,t.r],{ngForOf:[0,"ngForOf"]},null),(l()(),t.gb(16777216,null,null,1,null,C)),t.qb(9,16384,null,0,v.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],function(l,n){var e=n.component;l(n,2,0,"EmbeddedSimple"===e.type),l(n,4,0,"EmbeddedExpandable"===e.type),l(n,7,0,e.tocList),l(n,9,0,"EmbeddedExpandable"===e.type)},function(l,n){var e=n.component;l(n,0,0,e.isCollapsed),l(n,5,0,"Floating"!==e.type)})}function M(l){return t.Jb(0,[t.Fb(671088640,1,{items:1}),(l()(),t.gb(16777216,null,null,1,null,T)),t.qb(2,16384,null,0,v.k,[t.P,t.M],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,2,0,"None"!==n.component.type)},null)}function q(l){return t.Jb(0,[(l()(),t.rb(0,0,null,null,1,"aio-toc",[],null,null,null,M,I)),t.qb(1,4440064,null,0,m,[p.a,t.k,h.a],null,null)],function(l,n){l(n,1,0)},null)}var O=t.nb("aio-toc",m,q,{},{},[]),J=e("pOQZ"),N=e("ApNh"),P=e("ENSU");e.d(n,"TocModuleNgFactory",function(){return j});var j=t.ob(f,[],function(l){return t.yb([t.zb(512,t.j,t.bb,[[8,[O]],[3,t.j],t.w]),t.zb(4608,v.m,v.l,[t.t,[2,v.B]]),t.zb(1073742336,v.c,v.c,[]),t.zb(1073742336,J.a,J.a,[]),t.zb(1073742336,N.c,N.c,[[2,N.a],[2,P.f]]),t.zb(1073742336,y.c,y.c,[]),t.zb(1073742336,f,f,[])])})},vT4p:function(l,n,e){"use strict";let t=1;const i={},s={setImmediate(l){const n=t++;return i[n]=l,Promise.resolve().then(()=>(function(l){const n=i[l];n&&n()})(n)),n},clearImmediate(l){delete i[l]}};var u=e("EWqr");class c extends u.a{constructor(l,n){super(l,n),this.scheduler=l,this.work=n}requestAsyncId(l,n,e=0){return null!==e&&e>0?super.requestAsyncId(l,n,e):(l.actions.push(this),l.scheduled||(l.scheduled=s.setImmediate(l.flush.bind(l,null))))}recycleAsyncId(l,n,e=0){if(null!==e&&e>0||null===e&&this.delay>0)return super.recycleAsyncId(l,n,e);0===l.actions.length&&(s.clearImmediate(n),l.scheduled=void 0)}}var o=e("DG/E");class r extends o.a{flush(l){this.active=!0,this.scheduled=void 0;const{actions:n}=this;let e,t=-1,i=n.length;l=l||n.shift();do{if(e=l.execute(l.state,l.delay))break}while(++t<i&&(l=n.shift()));if(this.active=!1,e){for(;++t<i&&(l=n.shift());)l.unsubscribe();throw e}}}e.d(n,"a",function(){return a});const a=new r(c)}}]);