(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{c1xn:function(n,l,t){"use strict";var e=t("D57K"),i=1,o={},u=function(n){function l(l,t){var e=n.call(this,l,t)||this;return e.scheduler=l,e.work=t,e}return e.c(l,n),l.prototype.requestAsyncId=function(l,t,e){return void 0===e&&(e=0),null!==e&&e>0?n.prototype.requestAsyncId.call(this,l,t,e):(l.actions.push(this),l.scheduled||(l.scheduled=(u=l.flush.bind(l,null),c=i++,o[c]=u,Promise.resolve().then(function(){return function(n){var l=o[n];l&&l()}(c)}),c)));var u,c},l.prototype.recycleAsyncId=function(l,t,e){if(void 0===e&&(e=0),null!==e&&e>0||null===e&&this.delay>0)return n.prototype.recycleAsyncId.call(this,l,t,e);0===l.actions.length&&(delete o[t],l.scheduled=void 0)},l}(t("/V3T").a),c=function(n){function l(){return null!==n&&n.apply(this,arguments)||this}return e.c(l,n),l.prototype.flush=function(n){this.active=!0,this.scheduled=void 0;var l,t=this.actions,e=-1,i=t.length;n=n||t.shift();do{if(l=n.execute(n.state,n.delay))break}while(++e<i&&(n=t.shift()));if(this.active=!1,l){for(;++e<i&&(n=t.shift());)n.unsubscribe();throw l}},l}(t("zkdO").a);t.d(l,"a",function(){return r});var r=new c(u)},s8K4:function(n,l,t){"use strict";t.r(l);var e=t("LoAr"),i=t("fQLH"),o=t("3riI"),u=t("c1xn"),c=t("mhnT"),r=t("D57K"),s=t("HnWI"),a=t("8tfy"),d=function(n){function l(l,t,e){void 0===t&&(t=0),void 0===e&&(e=u.a);var i=n.call(this)||this;return i.source=l,i.delayTime=t,i.scheduler=e,(!Object(a.a)(t)||t<0)&&(i.delayTime=0),e&&"function"==typeof e.schedule||(i.scheduler=u.a),i}return r.c(l,n),l.create=function(n,t,e){return void 0===t&&(t=0),void 0===e&&(e=u.a),new l(n,t,e)},l.dispatch=function(n){return this.add(n.source.subscribe(n.subscriber))},l.prototype._subscribe=function(n){return this.scheduler.schedule(l.dispatch,this.delayTime,{source:this.source,subscriber:n})},l}(s.a),p=function(){function n(n,l){this.scheduler=n,this.delay=l}return n.prototype.call=function(n,l){return new d(l,this.delay,this.scheduler).subscribe(n)},n}(),b=t("W/Ou"),f=t("Faly"),h=t("TNhP"),m=function(){function n(n,l,t){this.scrollService=n,this.tocService=t,this.activeIndex=null,this.type="None",this.isCollapsed=!0,this.isEmbedded=!1,this.onDestroy=new i.a,this.primaryMax=4,this.isEmbedded=-1!==l.nativeElement.className.indexOf("embedded")}return n.prototype.ngOnInit=function(){var n=this;this.tocService.tocList.pipe(Object(c.a)(this.onDestroy)).subscribe(function(l){n.tocList=l;var t,e=(t=function(n){return"h1"!==n.level},n.tocList.reduce(function(n,l){return t(l)?n+1:n},0));n.type=e>0?n.isEmbedded?e>n.primaryMax?"EmbeddedExpandable":"EmbeddedSimple":"Floating":"None"})},n.prototype.ngAfterViewInit=function(){var n,l,t=this;this.isEmbedded||Object(o.a)(this.tocService.activeItemIndex.pipe((n=u.a,void 0===l&&(l=0),function(t){return t.lift(new p(n,l))})),this.items.changes.pipe(Object(b.a)(this.items))).pipe(Object(c.a)(this.onDestroy)).subscribe(function(n){var l=n[0],e=n[1];if(t.activeIndex=l,!(null===l||l>=e.length)){var i=e.toArray()[l].nativeElement,o=i.offsetParent,u=i.getBoundingClientRect(),c=o.getBoundingClientRect();u.top>=c.top&&u.bottom<=c.bottom||(o.scrollTop+=u.top-c.top-o.clientHeight/2)}})},n.prototype.ngOnDestroy=function(){this.onDestroy.next()},n.prototype.toggle=function(n){void 0===n&&(n=!0),this.isCollapsed=!this.isCollapsed,n&&this.isCollapsed&&this.toTop()},n.prototype.toTop=function(){this.scrollService.scrollToTop()},n}(),v=function(){return function(){this.customElementComponent=m}}(),y=t("Hc9t"),g=t("rXXt"),x=t("WT9V"),I=e.rb({encapsulation:2,styles:[],data:{}});function E(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,1,"div",[["class","toc-heading embedded"]],null,null,null,null,null)),(n()(),e.Jb(-1,null,[" Contents "]))],null,null)}function k(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,3,"button",[["aria-label","Expand/collapse contents"],["class","toc-heading embedded secondary"],["title","Expand/collapse contents"],["type","button"]],[[1,"aria-pressed",0]],[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.toggle(!1)&&e),e},null,null)),(n()(),e.Jb(-1,null,[" Contents "])),(n()(),e.tb(2,0,null,null,1,"mat-icon",[["class","rotating-icon mat-icon"],["role","img"],["svgIcon","keyboard_arrow_right"]],[[2,"collapsed",null],[2,"mat-icon-inline",null],[2,"mat-icon-no-color",null]],null,null,y.b,y.a)),e.sb(3,9158656,null,0,g.b,[e.k,g.d,[8,null],[2,g.a]],{svgIcon:[0,"svgIcon"]},null)],function(n,l){n(l,3,0,"keyboard_arrow_right")},function(n,l){var t=l.component;n(l,0,0,!t.isCollapsed),n(l,2,0,t.isCollapsed,e.Db(l,3).inline,"primary"!==e.Db(l,3).color&&"accent"!==e.Db(l,3).color&&"warn"!==e.Db(l,3).color)})}function w(n){return e.Lb(0,[(n()(),e.tb(0,0,[[1,0],["tocItem",1]],null,1,"li",[],[[8,"title",0],[8,"className",0],[2,"secondary",null],[2,"active",null]],null,null,null,null)),(n()(),e.tb(1,0,null,null,0,"a",[],[[8,"href",4],[8,"innerHTML",1]],null,null,null,null))],null,function(n,l){var t=l.component;n(l,0,0,e.vb(1,"",l.parent.context.$implicit.title,""),e.vb(1,"",l.parent.context.$implicit.level,""),"EmbeddedExpandable"===t.type&&l.parent.context.index>=t.primaryMax,l.parent.context.index===t.activeIndex),n(l,1,0,l.parent.context.$implicit.href,l.parent.context.$implicit.content)})}function L(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,2,null,null,null,null,null,null,null)),(n()(),e.ib(16777216,null,null,1,null,w)),e.sb(2,16384,null,0,x.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.ib(0,null,null,0))],function(n,l){n(l,2,0,"Floating"===l.component.type||"h1"!==l.context.$implicit.level)},null)}function O(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,0,"button",[["aria-label","Expand/collapse contents"],["class","toc-more-items embedded material-icons"],["title","Expand/collapse contents"],["type","button"]],[[2,"collapsed",null],[1,"aria-pressed",0]],[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.toggle()&&e),e},null,null))],null,function(n,l){var t=l.component;n(l,0,0,t.isCollapsed,!t.isCollapsed)})}function C(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,9,"div",[["class","toc-inner no-print"]],[[2,"collapsed",null]],null,null,null,null)),(n()(),e.ib(16777216,null,null,1,null,E)),e.sb(2,16384,null,0,x.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.ib(16777216,null,null,1,null,k)),e.sb(4,16384,null,0,x.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null),(n()(),e.tb(5,0,null,null,2,"ul",[["class","toc-list"]],[[2,"embedded",null]],null,null,null,null)),(n()(),e.ib(16777216,null,null,1,null,L)),e.sb(7,278528,null,0,x.j,[e.R,e.O,e.t],{ngForOf:[0,"ngForOf"]},null),(n()(),e.ib(16777216,null,null,1,null,O)),e.sb(9,16384,null,0,x.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null)],function(n,l){var t=l.component;n(l,2,0,"EmbeddedSimple"===t.type),n(l,4,0,"EmbeddedExpandable"===t.type),n(l,7,0,t.tocList),n(l,9,0,"EmbeddedExpandable"===t.type)},function(n,l){var t=l.component;n(l,0,0,t.isCollapsed),n(l,5,0,"Floating"!==t.type)})}function T(n){return e.Lb(0,[e.Hb(671088640,1,{items:1}),(n()(),e.ib(16777216,null,null,1,null,C)),e.sb(2,16384,null,0,x.k,[e.R,e.O],{ngIf:[0,"ngIf"]},null)],function(n,l){n(l,2,0,"None"!==l.component.type)},null)}function D(n){return e.Lb(0,[(n()(),e.tb(0,0,null,null,1,"aio-toc",[],null,null,null,T,I)),e.sb(1,4440064,null,0,m,[f.a,e.k,h.a],null,null)],function(n,l){n(l,1,0)},null)}var B=e.pb("aio-toc",m,D,{},{},[]),A=t("C7Lb"),j=t("LYzL"),R=t("SeAg");t.d(l,"TocModuleNgFactory",function(){return S});var S=e.qb(v,[],function(n){return e.Ab([e.Bb(512,e.j,e.db,[[8,[B]],[3,e.j],e.y]),e.Bb(4608,x.m,x.l,[e.v,[2,x.B]]),e.Bb(1073742336,x.c,x.c,[]),e.Bb(1073742336,A.a,A.a,[]),e.Bb(1073742336,j.c,j.c,[[2,j.a],[2,R.f]]),e.Bb(1073742336,g.c,g.c,[]),e.Bb(1073742336,v,v,[])])})}}]);