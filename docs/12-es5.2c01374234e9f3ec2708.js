(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{Rz96:function(l,n,t){"use strict";t.r(n);var u=t("LoAr"),e=t("jn67");function o(l,n){var t="string"==typeof n?n:n.find(function(n){return l.hasOwnProperty(n.toLowerCase())});return void 0===t?void 0:l[t.toLowerCase()]}function i(l,n){return void 0===n&&(n=!1),void 0===l?n:"false"!==l.trim()}var a=e.a+"live-examples/",r=e.a+"zips/",b=function(){function l(l,n){var t=function(n){for(var t={},e=0,o=l instanceof u.k?l.nativeElement.attributes:l.attributes;e<o.length;e++){var i=o[e];t[i.name.toLowerCase()]=i.value}return t}(),e=this.getExampleDir(t,n.path(!1)),o=this.getStackblitzName(t);this.mode=this.getMode(t),this.enableDownload=this.getEnableDownload(t),this.stackblitz=this.getStackblitz(e,o,"embedded"===this.mode),this.zip=this.getZip(e,o),this.title=this.getTitle(t)}return l.prototype.ngAfterContentInit=function(){var l=this.content.nativeElement.textContent.trim();l&&(this.title=l)},l.prototype.getEnableDownload=function(l){return!i(o(l,"noDownload"))},l.prototype.getExampleDir=function(l,n){var t=o(l,"name");if(!t){var u=n.match(/[^\/?#]+(?=\/?(?:\?|#|$))/);t=u?u[0]:"index"}return t.trim()},l.prototype.getMode=function(l){var n=i(o(l,"downloadOnly")),t=i(o(l,"embedded"));return n?"downloadOnly":t?"embedded":"default"},l.prototype.getStackblitz=function(l,n,t){return""+a+l+"/"+n+"stackblitz.html"+(t?"?ctl=1":"")},l.prototype.getStackblitzName=function(l){var n=(o(l,"stackblitz")||"").trim();return n&&n+"."},l.prototype.getTitle=function(l){return(o(l,"title")||"live example").trim()},l.prototype.getZip=function(l,n){var t=l.split("/")[0];return""+r+l+"/"+n+t+".zip"},l}(),c=function(){function l(){}return l.prototype.ngAfterViewInit=function(){this.iframe&&(this.iframe.nativeElement.src=this.src)},l}(),s=function(){return function(){this.customElementComponent=b}}(),p=t("WT9V"),d=u.rb({encapsulation:2,styles:[],data:{}});function f(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,4,"p",[],null,null,null,null,null)),(l()(),u.Jb(-1,null,[" You can also "])),(l()(),u.tb(2,0,null,null,1,"a",[["download",""],["title","Download example"]],[[8,"href",4]],null,null,null,null)),(l()(),u.Jb(-1,null,["download this example"])),(l()(),u.Jb(-1,null,[". "]))],null,function(l,n){l(n,2,0,n.component.zip)})}function m(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,5,"span",[],null,null,null,null,null)),(l()(),u.tb(1,0,null,null,2,"div",[],[[8,"title",0]],null,null,null,null)),(l()(),u.tb(2,0,null,null,1,"aio-embedded-stackblitz",[],null,null,null,x,z)),u.sb(3,4243456,null,0,c,[],{src:[0,"src"]},null),(l()(),u.ib(16777216,null,null,1,null,f)),u.sb(5,16384,null,0,p.k,[u.R,u.O],{ngIf:[0,"ngIf"]},null)],function(l,n){var t=n.component;l(n,3,0,t.stackblitz),l(n,5,0,t.enableDownload)},function(l,n){l(n,1,0,u.vb(1,"",n.component.title,""))})}function h(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,2,"span",[],null,null,null,null,null)),(l()(),u.tb(1,0,null,null,1,"a",[["download",""]],[[8,"href",4],[8,"title",0]],null,null,null,null)),(l()(),u.Jb(2,null,["",""]))],null,function(l,n){var t=n.component;l(n,1,0,t.zip,u.vb(1,"",t.title,"")),l(n,2,0,t.title)})}function v(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),u.Jb(-1,null,[" / "])),(l()(),u.tb(2,0,null,null,1,"a",[["download",""],["title","Download example"]],[[8,"href",4]],null,null,null,null)),(l()(),u.Jb(-1,null,["download example"]))],null,function(l,n){l(n,2,0,n.component.zip)})}function g(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,4,"span",[],null,null,null,null,null)),(l()(),u.tb(1,0,null,null,1,"a",[["target","_blank"]],[[8,"href",4],[8,"title",0]],null,null,null,null)),(l()(),u.Jb(2,null,["",""])),(l()(),u.ib(16777216,null,null,1,null,v)),u.sb(4,16384,null,0,p.k,[u.R,u.O],{ngIf:[0,"ngIf"]},null)],function(l,n){l(n,4,0,n.component.enableDownload)},function(l,n){var t=n.component;l(n,1,0,t.stackblitz,u.vb(1,"",t.title,"")),l(n,2,0,t.title)})}function w(l){return u.Lb(0,[u.Hb(402653184,1,{content:0}),(l()(),u.tb(1,0,[[1,0],["content",1]],null,1,"span",[["style","display: none"]],null,null,null,null,null)),u.Cb(null,0),(l()(),u.tb(3,0,null,null,7,"span",[],null,null,null,null,null)),u.sb(4,16384,null,0,p.o,[],{ngSwitch:[0,"ngSwitch"]},null),(l()(),u.ib(16777216,null,null,1,null,m)),u.sb(6,278528,null,0,p.p,[u.R,u.O,p.o],{ngSwitchCase:[0,"ngSwitchCase"]},null),(l()(),u.ib(16777216,null,null,1,null,h)),u.sb(8,278528,null,0,p.p,[u.R,u.O,p.o],{ngSwitchCase:[0,"ngSwitchCase"]},null),(l()(),u.ib(16777216,null,null,1,null,g)),u.sb(10,16384,null,0,p.q,[u.R,u.O,p.o],null,null)],function(l,n){l(n,4,0,n.component.mode),l(n,6,0,"embedded"),l(n,8,0,"downloadOnly")},null)}function y(l){return u.Lb(0,[(l()(),u.tb(0,0,null,null,1,"live-example",[],null,null,null,w,d)),u.sb(1,1097728,null,0,b,[u.k,p.g],null,null)],null,null)}var k=u.pb("live-example",b,y,{},{},["*"]),z=u.rb({encapsulation:0,styles:["iframe[_ngcontent-%COMP%] { min-height: 400px; }"],data:{}});function x(l){return u.Lb(0,[u.Hb(402653184,1,{iframe:0}),(l()(),u.tb(1,0,[[1,0],["iframe",1]],null,0,"iframe",[["frameborder","0"],["height","100%"],["width","100%"]],null,null,null,null,null))],null,null)}t.d(n,"LiveExampleModuleNgFactory",function(){return L});var L=u.qb(s,[],function(l){return u.Ab([u.Bb(512,u.j,u.db,[[8,[k]],[3,u.j],u.y]),u.Bb(4608,p.m,p.l,[u.v,[2,p.B]]),u.Bb(1073742336,p.c,p.c,[]),u.Bb(1073742336,s,s,[])])})}}]);