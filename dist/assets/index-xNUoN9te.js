const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Skills-DVuvyRov.js","assets/three-fiber-B_EsI_-j.js","assets/three-core-D27qjJZU.js","assets/gsap-B5Zr7YxL.js","assets/lenis-CoS9RZUk.js","assets/Skills-BaJwFjxA.css","assets/Work-CTZDbeTF.js","assets/Work-CLCwzDkQ.css","assets/Experience-BQwv6jsJ.js","assets/Experience-CKg_qnPd.css","assets/Globe-CuJzecgd.js","assets/Globe-Bwzb18PL.css","assets/Achievements-CsDb8uuV.js","assets/Achievements-DFQPdHAR.css","assets/Certificates-DlcWbZ74.js","assets/Certificates-DEEqlVLq.css","assets/Clubs-CKr0LtuH.js","assets/Clubs-DrPL58UV.css","assets/AcademicJourney-D1zWP7_e.js","assets/AcademicJourney-vB3osbeu.css","assets/Resume-D4zr9dVK.js","assets/Resume-DueH-tQt.css","assets/DevConsole-DMB1F-Ao.js","assets/DevConsole-DjiZleqW.css","assets/DevRoom-Dkngly0o.js","assets/DevRoom-DJwdDvv8.css","assets/Contact-zmP480Uj.js","assets/Contact-DHX1JYDa.css","assets/Footer-DeQZ_HO8.js","assets/Footer-vbsNKf4c.css","assets/AIAssistant-q51S_1YI.js","assets/AIAssistant-CjMwxuyn.css"])))=>i.map(i=>d[i]);
import{R as yn,r as k,j as u,_ as qe,c as Fi}from"./three-fiber-B_EsI_-j.js";import{g as X}from"./gsap-B5Zr7YxL.js";import{L as zi}from"./lenis-CoS9RZUk.js";import"./three-core-D27qjJZU.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=a(t);fetch(t.href,r)}})();function Hi(i,e){for(var a=0;a<e.length;a++){var n=e[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(i,n.key,n)}}function Bi(i,e,a){return e&&Hi(i.prototype,e),i}/*!
 * Observer 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var Ce,ra,et,jt,Ft,mn,ui,Ut,gn,pi,Et,ut,fi,hi=function(){return Ce||typeof window<"u"&&(Ce=window.gsap)&&Ce.registerPlugin&&Ce},mi=1,hn=[],P=[],bt=[],Pn=Date.now,Ca=function(e,a){return a},Gi=function(){var e=gn.core,a=e.bridge||{},n=e._scrollers,t=e._proxies;n.push.apply(n,P),t.push.apply(t,bt),P=n,bt=t,Ca=function(l,s){return a[l](s)}},zt=function(e,a){return~bt.indexOf(e)&&bt[bt.indexOf(e)+1][a]},On=function(e){return!!~pi.indexOf(e)},ze=function(e,a,n,t,r){return e.addEventListener(a,n,{passive:t!==!1,capture:!!r})},Fe=function(e,a,n,t){return e.removeEventListener(a,n,!!t)},Un="scrollLeft",Xn="scrollTop",Sa=function(){return Et&&Et.isPressed||P.cache++},ua=function(e,a){var n=function t(r){if(r||r===0){mi&&(et.history.scrollRestoration="manual");var l=Et&&Et.isPressed;r=t.v=Math.round(r)||(Et&&Et.iOS?1:0),e(r),t.cacheID=P.cache,l&&Ca("ss",r)}else(a||P.cache!==t.cacheID||Ca("ref"))&&(t.cacheID=P.cache,t.v=e());return t.v+t.offset};return n.offset=0,e&&n},We={s:Un,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:ua(function(i){return arguments.length?et.scrollTo(i,fe.sc()):et.pageXOffset||jt[Un]||Ft[Un]||mn[Un]||0})},fe={s:Xn,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:We,sc:ua(function(i){return arguments.length?et.scrollTo(We.sc(),i):et.pageYOffset||jt[Xn]||Ft[Xn]||mn[Xn]||0})},Ve=function(e,a){return(a&&a._ctx&&a._ctx.selector||Ce.utils.toArray)(e)[0]||(typeof e=="string"&&Ce.config().nullTargetWarn!==!1?void 0:null)},Wi=function(e,a){for(var n=a.length;n--;)if(a[n]===e||a[n].contains(e))return!0;return!1},Ht=function(e,a){var n=a.s,t=a.sc;On(e)&&(e=jt.scrollingElement||Ft);var r=P.indexOf(e),l=t===fe.sc?1:2;!~r&&(r=P.push(e)-1),P[r+l]||ze(e,"scroll",Sa);var s=P[r+l],p=s||(P[r+l]=ua(zt(e,n),!0)||(On(e)?t:ua(function(h){return arguments.length?e[n]=h:e[n]})));return p.target=e,s||(p.smooth=Ce.getProperty(e,"scrollBehavior")==="smooth"),p},Ta=function(e,a,n){var t=e,r=e,l=Pn(),s=l,p=a||50,h=Math.max(500,p*3),b=function(v,G){var F=Pn();G||F-l>p?(r=t,t=v,s=l,l=F):n?t+=v:t=r+(v-r)/(F-s)*(l-s)},x=function(){r=t=n?0:t,s=l=0},g=function(v){var G=s,F=r,U=Pn();return(v||v===0)&&v!==t&&b(v),l===s||U-s>h?0:(t+(n?F:-F))/((n?U:l)-G)*1e3};return{update:b,reset:x,getVelocity:g}},Sn=function(e,a){return a&&!e._gsapAllow&&e.cancelable!==!1&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},Ya=function(e){var a=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(a)>=Math.abs(n)?a:n},gi=function(){gn=Ce.core.globals().ScrollTrigger,gn&&gn.core&&Gi()},_i=function(e){return Ce=e||hi(),!ra&&Ce&&typeof document<"u"&&document.body&&(et=window,jt=document,Ft=jt.documentElement,mn=jt.body,pi=[et,jt,Ft,mn],Ce.utils.clamp,fi=Ce.core.context||function(){},Ut="onpointerenter"in mn?"pointer":"mouse",ui=ae.isTouch=et.matchMedia&&et.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in et||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ut=ae.eventTypes=("ontouchstart"in Ft?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Ft?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return mi=0},500),ra=1),gn||gi(),ra};We.op=fe;P.cache=0;var ae=function(){function i(a){this.init(a)}var e=i.prototype;return e.init=function(n){ra||_i(Ce),gn||gi();var t=n.tolerance,r=n.dragMinimum,l=n.type,s=n.target,p=n.lineHeight,h=n.debounce,b=n.preventDefault,x=n.onStop,g=n.onStopDelay,d=n.ignore,v=n.wheelSpeed,G=n.event,F=n.onDragStart,U=n.onDragEnd,L=n.onDrag,W=n.onPress,w=n.onRelease,he=n.onRight,Y=n.onLeft,S=n.onUp,me=n.onDown,xe=n.onChangeX,m=n.onChangeY,Q=n.onChange,T=n.onToggleX,vt=n.onToggleY,ce=n.onHover,Pe=n.onHoverEnd,Oe=n.onMove,V=n.ignoreCheck,ie=n.isNormalizer,re=n.onGestureStart,o=n.onGestureEnd,de=n.onWheel,Bt=n.onEnable,Dt=n.onDisable,tt=n.onClick,yt=n.scrollSpeed,Se=n.capture,se=n.allowClicks,Ne=n.lockAxis,Te=n.onLockAxis;this.target=s=Ve(s)||Ft,this.vars=n,d&&(d=Ce.utils.toArray(d)),t=t||1e-9,r=r||0,v=v||1,yt=yt||1,l=l||"wheel,touch,pointer",h=h!==!1,p||(p=parseFloat(et.getComputedStyle(mn).lineHeight)||22);var Rt,Le,je,j,ee,Ye,Ue,c=this,Xe=0,xt=0,At=n.passive||!b&&n.passive!==!1,K=Ht(s,We),wt=Ht(s,fe),Mt=K(),Gt=wt(),ge=~l.indexOf("touch")&&!~l.indexOf("pointer")&&ut[0]==="pointerdown",Pt=On(s),te=s.ownerDocument||jt,st=[0,0,0],nt=[0,0,0],kt=0,xn=function(){return kt=Pn()},oe=function(C,z){return(c.event=C)&&d&&Wi(C.target,d)||z&&ge&&C.pointerType!=="touch"||V&&V(C,z)},Yn=function(){c._vx.reset(),c._vy.reset(),Le.pause(),x&&x(c)},Ct=function(){var C=c.deltaX=Ya(st),z=c.deltaY=Ya(nt),f=Math.abs(C)>=t,E=Math.abs(z)>=t;Q&&(f||E)&&Q(c,C,z,st,nt),f&&(he&&c.deltaX>0&&he(c),Y&&c.deltaX<0&&Y(c),xe&&xe(c),T&&c.deltaX<0!=Xe<0&&T(c),Xe=c.deltaX,st[0]=st[1]=st[2]=0),E&&(me&&c.deltaY>0&&me(c),S&&c.deltaY<0&&S(c),m&&m(c),vt&&c.deltaY<0!=xt<0&&vt(c),xt=c.deltaY,nt[0]=nt[1]=nt[2]=0),(j||je)&&(Oe&&Oe(c),je&&(F&&je===1&&F(c),L&&L(c),je=0),j=!1),Ye&&!(Ye=!1)&&Te&&Te(c),ee&&(de(c),ee=!1),Rt=0},an=function(C,z,f){st[f]+=C,nt[f]+=z,c._vx.update(C),c._vy.update(z),h?Rt||(Rt=requestAnimationFrame(Ct)):Ct()},rn=function(C,z){Ne&&!Ue&&(c.axis=Ue=Math.abs(C)>Math.abs(z)?"x":"y",Ye=!0),Ue!=="y"&&(st[2]+=C,c._vx.update(C,!0)),Ue!=="x"&&(nt[2]+=z,c._vy.update(z,!0)),h?Rt||(Rt=requestAnimationFrame(Ct)):Ct()},Ot=function(C){if(!oe(C,1)){C=Sn(C,b);var z=C.clientX,f=C.clientY,E=z-c.x,y=f-c.y,I=c.isDragging;c.x=z,c.y=f,(I||(E||y)&&(Math.abs(c.startX-z)>=r||Math.abs(c.startY-f)>=r))&&(je||(je=I?2:1),I||(c.isDragging=!0),rn(E,y))}},Wt=c.onPress=function(D){oe(D,1)||D&&D.button||(c.axis=Ue=null,Le.pause(),c.isPressed=!0,D=Sn(D),Xe=xt=0,c.startX=c.x=D.clientX,c.startY=c.y=D.clientY,c._vx.reset(),c._vy.reset(),ze(ie?s:te,ut[1],Ot,At,!0),c.deltaX=c.deltaY=0,W&&W(c))},O=c.onRelease=function(D){if(!oe(D,1)){Fe(ie?s:te,ut[1],Ot,!0);var C=!isNaN(c.y-c.startY),z=c.isDragging,f=z&&(Math.abs(c.x-c.startX)>3||Math.abs(c.y-c.startY)>3),E=Sn(D);!f&&C&&(c._vx.reset(),c._vy.reset(),b&&se&&Ce.delayedCall(.08,function(){if(Pn()-kt>300&&!D.defaultPrevented){if(D.target.click)D.target.click();else if(te.createEvent){var y=te.createEvent("MouseEvents");y.initMouseEvent("click",!0,!0,et,1,E.screenX,E.screenY,E.clientX,E.clientY,!1,!1,!1,!1,0,null),D.target.dispatchEvent(y)}}})),c.isDragging=c.isGesturing=c.isPressed=!1,x&&z&&!ie&&Le.restart(!0),je&&Ct(),U&&z&&U(c),w&&w(c,f)}},Yt=function(C){return C.touches&&C.touches.length>1&&(c.isGesturing=!0)&&re(C,c.isDragging)},ot=function(){return(c.isGesturing=!1)||o(c)},lt=function(C){if(!oe(C)){var z=K(),f=wt();an((z-Mt)*yt,(f-Gt)*yt,1),Mt=z,Gt=f,x&&Le.restart(!0)}},ct=function(C){if(!oe(C)){C=Sn(C,b),de&&(ee=!0);var z=(C.deltaMode===1?p:C.deltaMode===2?et.innerHeight:1)*v;an(C.deltaX*z,C.deltaY*z,0),x&&!ie&&Le.restart(!0)}},Vt=function(C){if(!oe(C)){var z=C.clientX,f=C.clientY,E=z-c.x,y=f-c.y;c.x=z,c.y=f,j=!0,x&&Le.restart(!0),(E||y)&&rn(E,y)}},sn=function(C){c.event=C,ce(c)},St=function(C){c.event=C,Pe(c)},wn=function(C){return oe(C)||Sn(C,b)&&tt(c)};Le=c._dc=Ce.delayedCall(g||.25,Yn).pause(),c.deltaX=c.deltaY=0,c._vx=Ta(0,50,!0),c._vy=Ta(0,50,!0),c.scrollX=K,c.scrollY=wt,c.isDragging=c.isGesturing=c.isPressed=!1,fi(this),c.enable=function(D){return c.isEnabled||(ze(Pt?te:s,"scroll",Sa),l.indexOf("scroll")>=0&&ze(Pt?te:s,"scroll",lt,At,Se),l.indexOf("wheel")>=0&&ze(s,"wheel",ct,At,Se),(l.indexOf("touch")>=0&&ui||l.indexOf("pointer")>=0)&&(ze(s,ut[0],Wt,At,Se),ze(te,ut[2],O),ze(te,ut[3],O),se&&ze(s,"click",xn,!0,!0),tt&&ze(s,"click",wn),re&&ze(te,"gesturestart",Yt),o&&ze(te,"gestureend",ot),ce&&ze(s,Ut+"enter",sn),Pe&&ze(s,Ut+"leave",St),Oe&&ze(s,Ut+"move",Vt)),c.isEnabled=!0,c.isDragging=c.isGesturing=c.isPressed=j=je=!1,c._vx.reset(),c._vy.reset(),Mt=K(),Gt=wt(),D&&D.type&&Wt(D),Bt&&Bt(c)),c},c.disable=function(){c.isEnabled&&(hn.filter(function(D){return D!==c&&On(D.target)}).length||Fe(Pt?te:s,"scroll",Sa),c.isPressed&&(c._vx.reset(),c._vy.reset(),Fe(ie?s:te,ut[1],Ot,!0)),Fe(Pt?te:s,"scroll",lt,Se),Fe(s,"wheel",ct,Se),Fe(s,ut[0],Wt,Se),Fe(te,ut[2],O),Fe(te,ut[3],O),Fe(s,"click",xn,!0),Fe(s,"click",wn),Fe(te,"gesturestart",Yt),Fe(te,"gestureend",ot),Fe(s,Ut+"enter",sn),Fe(s,Ut+"leave",St),Fe(s,Ut+"move",Vt),c.isEnabled=c.isPressed=c.isDragging=!1,Dt&&Dt(c))},c.kill=c.revert=function(){c.disable();var D=hn.indexOf(c);D>=0&&hn.splice(D,1),Et===c&&(Et=0)},hn.push(c),ie&&On(s)&&(Et=c),c.enable(G)},Bi(i,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),i}();ae.version="3.15.0";ae.create=function(i){return new ae(i)};ae.register=_i;ae.getAll=function(){return hn.slice()};ae.getById=function(i){return hn.filter(function(e){return e.vars.id===i})[0]};hi()&&Ce.registerPlugin(ae);/*!
 * ScrollTrigger 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var _,pn,M,B,Qe,H,Oa,pa,Gn,Nn,In,$n,Re,ma,Ea,Be,Va,qa,fn,bi,_a,vi,He,Ia,yi,xi,Lt,Da,Na,_n,La,Ln,Ra,ba,Jn=1,Ae=Date.now,va=Ae(),rt=0,Dn=0,Ua=function(e,a,n){var t=Ze(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+a+"Clamp"]=t,t?e.substr(6,e.length-7):e},Xa=function(e,a){return a&&(!Ze(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Yi=function i(){return Dn&&requestAnimationFrame(i)},$a=function(){return ma=1},Ja=function(){return ma=0},gt=function(e){return e},Rn=function(e){return Math.round(e*1e5)/1e5||0},wi=function(){return typeof window<"u"},ki=function(){return _||wi()&&(_=window.gsap)&&_.registerPlugin&&_},en=function(e){return!!~Oa.indexOf(e)},Ci=function(e){return(e==="Height"?La:M["inner"+e])||Qe["client"+e]||H["client"+e]},Si=function(e){return zt(e,"getBoundingClientRect")||(en(e)?function(){return da.width=M.innerWidth,da.height=La,da}:function(){return Tt(e)})},Vi=function(e,a,n){var t=n.d,r=n.d2,l=n.a;return(l=zt(e,"getBoundingClientRect"))?function(){return l()[t]}:function(){return(a?Ci(r):e["client"+r])||0}},qi=function(e,a){return!a||~bt.indexOf(e)?Si(e):function(){return da}},_t=function(e,a){var n=a.s,t=a.d2,r=a.d,l=a.a;return Math.max(0,(n="scroll"+t)&&(l=zt(e,n))?l()-Si(e)()[r]:en(e)?(Qe[n]||H[n])-Ci(t):e[n]-e["offset"+t])},Kn=function(e,a){for(var n=0;n<fn.length;n+=3)(!a||~a.indexOf(fn[n+1]))&&e(fn[n],fn[n+1],fn[n+2])},Ze=function(e){return typeof e=="string"},Me=function(e){return typeof e=="function"},An=function(e){return typeof e=="number"},Xt=function(e){return typeof e=="object"},Tn=function(e,a,n){return e&&e.progress(a?0:1)&&n&&e.pause()},on=function(e,a,n){if(e.enabled){var t=e._ctx?e._ctx.add(function(){return a(e,n)}):a(e,n);t&&t.totalTime&&(e.callbackAnimation=t)}},ln=Math.abs,Ti="left",Ei="top",ja="right",Fa="bottom",Kt="width",Zt="height",jn="Right",Fn="Left",zn="Top",Hn="Bottom",le="padding",at="margin",vn="Width",za="Height",pe="px",it=function(e){return M.getComputedStyle(e.nodeType===Node.DOCUMENT_NODE?e.scrollingElement:e)},Ui=function(e){var a=it(e).position;e.style.position=a==="absolute"||a==="fixed"?a:"relative"},Ka=function(e,a){for(var n in a)n in e||(e[n]=a[n]);return e},Tt=function(e,a){var n=a&&it(e)[Ea]!=="matrix(1, 0, 0, 1, 0, 0)"&&_.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),t=e.getBoundingClientRect?e.getBoundingClientRect():e.scrollingElement.getBoundingClientRect();return n&&n.progress(0).kill(),t},fa=function(e,a){var n=a.d2;return e["offset"+n]||e["client"+n]||0},Ii=function(e){var a=[],n=e.labels,t=e.duration(),r;for(r in n)a.push(n[r]/t);return a},Xi=function(e){return function(a){return _.utils.snap(Ii(e),a)}},Ha=function(e){var a=_.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(t,r){return t-r});return n?function(t,r,l){l===void 0&&(l=.001);var s;if(!r)return a(t);if(r>0){for(t-=l,s=0;s<n.length;s++)if(n[s]>=t)return n[s];return n[s-1]}else for(s=n.length,t+=l;s--;)if(n[s]<=t)return n[s];return n[0]}:function(t,r,l){l===void 0&&(l=.001);var s=a(t);return!r||Math.abs(s-t)<l||s-t<0==r<0?s:a(r<0?t-e:t+e)}},$i=function(e){return function(a,n){return Ha(Ii(e))(a,n.direction)}},Zn=function(e,a,n,t){return n.split(",").forEach(function(r){return e(a,r,t)})},ye=function(e,a,n,t,r){return e.addEventListener(a,n,{passive:!t,capture:!!r})},ve=function(e,a,n,t){return e.removeEventListener(a,n,!!t)},Qn=function(e,a,n){n=n&&n.wheelHandler,n&&(e(a,"wheel",n),e(a,"touchmove",n))},Za={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},ea={toggleActions:"play",anticipatePin:0},ha={top:0,left:0,center:.5,bottom:1,right:1},sa=function(e,a){if(Ze(e)){var n=e.indexOf("="),t=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(t*=a/100),e=e.substr(0,n-1)),e=t+(e in ha?ha[e]*a:~e.indexOf("%")?parseFloat(e)*a/100:parseFloat(e)||0)}return e},ta=function(e,a,n,t,r,l,s,p){var h=r.startColor,b=r.endColor,x=r.fontSize,g=r.indent,d=r.fontWeight,v=B.createElement("div"),G=en(n)||zt(n,"pinType")==="fixed",F=e.indexOf("scroller")!==-1,U=G?H:n.tagName==="IFRAME"?n.contentDocument.body:n,L=e.indexOf("start")!==-1,W=L?h:b,w="border-color:"+W+";font-size:"+x+";color:"+W+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return w+="position:"+((F||p)&&G?"fixed;":"absolute;"),(F||p||!G)&&(w+=(t===fe?ja:Fa)+":"+(l+parseFloat(g))+"px;"),s&&(w+="box-sizing:border-box;text-align:left;width:"+s.offsetWidth+"px;"),v._isStart=L,v.setAttribute("class","gsap-marker-"+e+(a?" marker-"+a:"")),v.style.cssText=w,v.innerText=a||a===0?e+"-"+a:e,U.children[0]?U.insertBefore(v,U.children[0]):U.appendChild(v),v._offset=v["offset"+t.op.d2],oa(v,0,t,L),v},oa=function(e,a,n,t){var r={display:"block"},l=n[t?"os2":"p2"],s=n[t?"p2":"os2"];e._isFlipped=t,r[n.a+"Percent"]=t?-100:0,r[n.a]=t?"1px":0,r["border"+l+vn]=1,r["border"+s+vn]=0,r[n.p]=a+"px",_.set(e,r)},A=[],Aa={},Wn,Qa=function(){return Ae()-rt>34&&(Wn||(Wn=requestAnimationFrame(It)))},cn=function(){(!He||!He.isPressed||He.startX>H.clientWidth)&&(P.cache++,He?Wn||(Wn=requestAnimationFrame(It)):It(),rt||nn("scrollStart"),rt=Ae())},ya=function(){xi=M.innerWidth,yi=M.innerHeight},Mn=function(e){P.cache++,(e===!0||!Re&&!vi&&!B.fullscreenElement&&!B.webkitFullscreenElement&&(!Ia||xi!==M.innerWidth||Math.abs(M.innerHeight-yi)>M.innerHeight*.25))&&pa.restart(!0)},tn={},Ji=[],Di=function i(){return ve(R,"scrollEnd",i)||$t(!0)},nn=function(e){return tn[e]&&tn[e].map(function(a){return a()})||Ji},Ke=[],Ri=function(e){for(var a=0;a<Ke.length;a+=5)(!e||Ke[a+4]&&Ke[a+4].query===e)&&(Ke[a].style.cssText=Ke[a+1],Ke[a].getBBox&&Ke[a].setAttribute("transform",Ke[a+2]||""),Ke[a+3].uncache=1)},Ai=function(){return P.forEach(function(e){return Me(e)&&++e.cacheID&&(e.rec=e())})},Ba=function(e,a){var n;for(Be=0;Be<A.length;Be++)n=A[Be],n&&(!a||n._ctx===a)&&(e?n.kill(1):n.revert(!0,!0));Ln=!0,a&&Ri(a),a||nn("revert")},Mi=function(e,a){P.cache++,(a||!Ge)&&P.forEach(function(n){return Me(n)&&n.cacheID++&&(n.rec=0)}),Ze(e)&&(M.history.scrollRestoration=Na=e)},Ge,Qt=0,ei,Ki=function(){if(ei!==Qt){var e=ei=Qt;requestAnimationFrame(function(){return e===Qt&&$t(!0)})}},Pi=function(){H.appendChild(_n),La=!He&&_n.offsetHeight||M.innerHeight,H.removeChild(_n)},ti=function(e){return Gn(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(a){return a.style.display=e?"none":"block"})},$t=function(e,a){if(Qe=B.documentElement,H=B.body,Oa=[M,B,Qe,H],rt&&!e&&!Ln){ye(R,"scrollEnd",Di);return}Pi(),Ge=R.isRefreshing=!0,Ln||Ai();var n=nn("refreshInit");bi&&R.sort(),a||Ba(),P.forEach(function(t){Me(t)&&(t.smooth&&(t.target.style.scrollBehavior="auto"),t(0))}),A.slice(0).forEach(function(t){return t.refresh()}),Ln=!1,A.forEach(function(t){if(t._subPinOffset&&t.pin){var r=t.vars.horizontal?"offsetWidth":"offsetHeight",l=t.pin[r];t.revert(!0,1),t.adjustPinSpacing(t.pin[r]-l),t.refresh()}}),Ra=1,ti(!0),A.forEach(function(t){var r=_t(t.scroller,t._dir),l=t.vars.end==="max"||t._endClamp&&t.end>r,s=t._startClamp&&t.start>=r;(l||s)&&t.setPositions(s?r-1:t.start,l?Math.max(s?r:t.start+1,r):t.end,!0)}),ti(!1),Ra=0,n.forEach(function(t){return t&&t.render&&t.render(-1)}),P.forEach(function(t){Me(t)&&(t.smooth&&requestAnimationFrame(function(){return t.target.style.scrollBehavior="smooth"}),t.rec&&t(t.rec))}),Mi(Na,1),pa.pause(),Qt++,Ge=2,It(2),A.forEach(function(t){return Me(t.vars.onRefresh)&&t.vars.onRefresh(t)}),Ge=R.isRefreshing=!1,nn("refresh")},Ma=0,la=1,Bn,It=function(e){if(e===2||!Ge&&!Ln){R.isUpdating=!0,Bn&&Bn.update(0);var a=A.length,n=Ae(),t=n-va>=50,r=a&&A[0].scroll();if(la=Ma>r?-1:1,Ge||(Ma=r),t&&(rt&&!ma&&n-rt>200&&(rt=0,nn("scrollEnd")),In=va,va=n),la<0){for(Be=a;Be-- >0;)A[Be]&&A[Be].update(0,t);la=1}else for(Be=0;Be<a;Be++)A[Be]&&A[Be].update(0,t);R.isUpdating=!1}Wn=0},Pa=[Ti,Ei,Fa,ja,at+Hn,at+jn,at+zn,at+Fn,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],ca=Pa.concat([Kt,Zt,"boxSizing","max"+vn,"max"+za,"position",at,le,le+zn,le+jn,le+Hn,le+Fn]),Zi=function(e,a,n){bn(n);var t=e._gsap;if(t.spacerIsNative)bn(t.spacerState);else if(e._gsap.swappedIn){var r=a.parentNode;r&&(r.insertBefore(e,a),r.removeChild(a))}e._gsap.swappedIn=!1},xa=function(e,a,n,t){if(!e._gsap.swappedIn){for(var r=Pa.length,l=a.style,s=e.style,p;r--;)p=Pa[r],l[p]=n[p];l.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(l.display="inline-block"),s[Fa]=s[ja]="auto",l.flexBasis=n.flexBasis||"auto",l.overflow="visible",l.boxSizing="border-box",l[Kt]=fa(e,We)+pe,l[Zt]=fa(e,fe)+pe,l[le]=s[at]=s[Ei]=s[Ti]="0",bn(t),s[Kt]=s["max"+vn]=n[Kt],s[Zt]=s["max"+za]=n[Zt],s[le]=n[le],e.parentNode!==a&&(e.parentNode.insertBefore(a,e),a.appendChild(e)),e._gsap.swappedIn=!0}},Qi=/([A-Z])/g,bn=function(e){if(e){var a=e.t.style,n=e.length,t=0,r,l;for((e.t._gsap||_.core.getCache(e.t)).uncache=1;t<n;t+=2)l=e[t+1],r=e[t],l?a[r]=l:a[r]&&a.removeProperty(r.replace(Qi,"-$1").toLowerCase())}},na=function(e){for(var a=ca.length,n=e.style,t=[],r=0;r<a;r++)t.push(ca[r],n[ca[r]]);return t.t=e,t},er=function(e,a,n){for(var t=[],r=e.length,l=n?8:0,s;l<r;l+=2)s=e[l],t.push(s,s in a?a[s]:e[l+1]);return t.t=e.t,t},da={left:0,top:0},ni=function(e,a,n,t,r,l,s,p,h,b,x,g,d,v){Me(e)&&(e=e(p)),Ze(e)&&e.substr(0,3)==="max"&&(e=g+(e.charAt(4)==="="?sa("0"+e.substr(3),n):0));var G=d?d.time():0,F,U,L;if(d&&d.seek(0),isNaN(e)||(e=+e),An(e))d&&(e=_.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,g,e)),s&&oa(s,n,t,!0);else{Me(a)&&(a=a(p));var W=(e||"0").split(" "),w,he,Y,S;L=Ve(a,p)||H,w=Tt(L)||{},(!w||!w.left&&!w.top)&&it(L).display==="none"&&(S=L.style.display,L.style.display="block",w=Tt(L),S?L.style.display=S:L.style.removeProperty("display")),he=sa(W[0],w[t.d]),Y=sa(W[1]||"0",n),e=w[t.p]-h[t.p]-b+he+r-Y,s&&oa(s,Y,t,n-Y<20||s._isStart&&Y>20),n-=n-Y}if(v&&(p[v]=e||-.001,e<0&&(e=0)),l){var me=e+n,xe=l._isStart;F="scroll"+t.d2,oa(l,me,t,xe&&me>20||!xe&&(x?Math.max(H[F],Qe[F]):l.parentNode[F])<=me+1),x&&(h=Tt(s),x&&(l.style[t.op.p]=h[t.op.p]-t.op.m-l._offset+pe))}return d&&L&&(F=Tt(L),d.seek(g),U=Tt(L),d._caScrollDist=F[t.p]-U[t.p],e=e/d._caScrollDist*g),d&&d.seek(G),d?e:Math.round(e)},tr=/(webkit|moz|length|cssText|inset)/i,ai=function(e,a,n,t){if(e.parentNode!==a){var r=e.style,l,s;if(a===H){e._stOrig=r.cssText,s=it(e);for(l in s)!+l&&!tr.test(l)&&s[l]&&typeof r[l]=="string"&&l!=="0"&&(r[l]=s[l]);r.top=n,r.left=t}else r.cssText=e._stOrig;_.core.getCache(e).uncache=1,a.appendChild(e)}},Oi=function(e,a,n){var t=a,r=t;return function(l){var s=Math.round(e());return s!==t&&s!==r&&Math.abs(s-t)>3&&Math.abs(s-r)>3&&(l=s,n&&n()),r=t,t=Math.round(l),t}},aa=function(e,a,n){var t={};t[a.p]="+="+n,_.set(e,t)},ii=function(e,a){var n=Ht(e,a),t="_scroll"+a.p2,r=function l(s,p,h,b,x){var g=l.tween,d=p.onComplete,v={};h=h||n();var G=Oi(n,h,function(){g.kill(),l.tween=0});return x=b&&x||0,b=b||s-h,g&&g.kill(),p[t]=s,p.inherit=!1,p.modifiers=v,v[t]=function(){return G(h+b*g.ratio+x*g.ratio*g.ratio)},p.onUpdate=function(){P.cache++,l.tween&&It()},p.onComplete=function(){l.tween=0,d&&d.call(g)},g=l.tween=_.to(e,p),g};return e[t]=n,n.wheelHandler=function(){return r.tween&&r.tween.kill()&&(r.tween=0)},ye(e,"wheel",n.wheelHandler),R.isTouch&&ye(e,"touchmove",n.wheelHandler),r},R=function(){function i(a,n){pn||i.register(_),Da(this),this.init(a,n)}var e=i.prototype;return e.init=function(n,t){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Dn){this.update=this.refresh=this.kill=gt;return}n=Ka(Ze(n)||An(n)||n.nodeType?{trigger:n}:n,ea);var r=n,l=r.onUpdate,s=r.toggleClass,p=r.id,h=r.onToggle,b=r.onRefresh,x=r.scrub,g=r.trigger,d=r.pin,v=r.pinSpacing,G=r.invalidateOnRefresh,F=r.anticipatePin,U=r.onScrubComplete,L=r.onSnapComplete,W=r.once,w=r.snap,he=r.pinReparent,Y=r.pinSpacer,S=r.containerAnimation,me=r.fastScrollEnd,xe=r.preventOverlaps,m=n.horizontal||n.containerAnimation&&n.horizontal!==!1?We:fe,Q=!x&&x!==0,T=Ve(n.scroller||M),vt=_.core.getCache(T),ce=en(T),Pe=("pinType"in n?n.pinType:zt(T,"pinType")||ce&&"fixed")==="fixed",Oe=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],V=Q&&n.toggleActions.split(" "),ie="markers"in n?n.markers:ea.markers,re=ce?0:parseFloat(it(T)["border"+m.p2+vn])||0,o=this,de=n.onRefreshInit&&function(){return n.onRefreshInit(o)},Bt=Vi(T,ce,m),Dt=qi(T,ce),tt=0,yt=0,Se=0,se=Ht(T,m),Ne,Te,Rt,Le,je,j,ee,Ye,Ue,c,Xe,xt,At,K,wt,Mt,Gt,ge,Pt,te,st,nt,kt,xn,oe,Yn,Ct,an,rn,Ot,Wt,O,Yt,ot,lt,ct,Vt,sn,St;if(o._startClamp=o._endClamp=!1,o._dir=m,F*=45,o.scroller=T,o.scroll=S?S.time.bind(S):se,Le=se(),o.vars=n,t=t||n.animation,"refreshPriority"in n&&(bi=1,n.refreshPriority===-9999&&(Bn=o)),vt.tweenScroll=vt.tweenScroll||{top:ii(T,fe),left:ii(T,We)},o.tweenTo=Ne=vt.tweenScroll[m.p],o.scrubDuration=function(f){Yt=An(f)&&f,Yt?O?O.duration(f):O=_.to(t,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Yt,paused:!0,onComplete:function(){return U&&U(o)}}):(O&&O.progress(1).kill(),O=0)},t&&(t.vars.lazy=!1,t._initted&&!o.isReverted||t.vars.immediateRender!==!1&&n.immediateRender!==!1&&t.duration()&&t.render(0,!0,!0),o.animation=t.pause(),t.scrollTrigger=o,o.scrubDuration(x),Ot=0,p||(p=t.vars.id)),w&&((!Xt(w)||w.push)&&(w={snapTo:w}),"scrollBehavior"in H.style&&_.set(ce?[H,Qe]:T,{scrollBehavior:"auto"}),P.forEach(function(f){return Me(f)&&f.target===(ce?B.scrollingElement||Qe:T)&&(f.smooth=!1)}),Rt=Me(w.snapTo)?w.snapTo:w.snapTo==="labels"?Xi(t):w.snapTo==="labelsDirectional"?$i(t):w.directional!==!1?function(f,E){return Ha(w.snapTo)(f,Ae()-yt<500?0:E.direction)}:_.utils.snap(w.snapTo),ot=w.duration||{min:.1,max:2},ot=Xt(ot)?Nn(ot.min,ot.max):Nn(ot,ot),lt=_.delayedCall(w.delay||Yt/2||.1,function(){var f=se(),E=Ae()-yt<500,y=Ne.tween;if((E||Math.abs(o.getVelocity())<10)&&!y&&!ma&&tt!==f){var I=(f-j)/K,_e=t&&!Q?t.totalProgress():I,N=E?0:(_e-Wt)/(Ae()-In)*1e3||0,ne=_.utils.clamp(-I,1-I,ln(N/2)*N/.185),Ee=I+(w.inertia===!1?0:ne),Z,$,q=w,dt=q.onStart,J=q.onInterrupt,$e=q.onComplete;if(Z=Rt(Ee,o),An(Z)||(Z=Ee),$=Math.max(0,Math.round(j+Z*K)),f<=ee&&f>=j&&$!==f){if(y&&!y._initted&&y.data<=ln($-f))return;w.inertia===!1&&(ne=Z-I),Ne($,{duration:ot(ln(Math.max(ln(Ee-_e),ln(Z-_e))*.185/N/.05||0)),ease:w.ease||"power3",data:ln($-f),onInterrupt:function(){return lt.restart(!0)&&J&&on(o,J)},onComplete:function(){o.update(),tt=se(),t&&!Q&&(O?O.resetTo("totalProgress",Z,t._tTime/t._tDur):t.progress(Z)),Ot=Wt=t&&!Q?t.totalProgress():o.progress,L&&L(o),$e&&on(o,$e)}},f,ne*K,$-f-ne*K),dt&&on(o,dt,Ne.tween)}}else o.isActive&&tt!==f&&lt.restart(!0)}).pause()),p&&(Aa[p]=o),g=o.trigger=Ve(g||d!==!0&&d),St=g&&g._gsap&&g._gsap.stRevert,St&&(St=St(o)),d=d===!0?g:Ve(d),Ze(s)&&(s={targets:g,className:s}),d&&(v===!1||v===at||(v=!v&&d.parentNode&&d.parentNode.style&&it(d.parentNode).display==="flex"?!1:le),o.pin=d,Te=_.core.getCache(d),Te.spacer?wt=Te.pinState:(Y&&(Y=Ve(Y),Y&&!Y.nodeType&&(Y=Y.current||Y.nativeElement),Te.spacerIsNative=!!Y,Y&&(Te.spacerState=na(Y))),Te.spacer=ge=Y||B.createElement("div"),ge.classList.add("pin-spacer"),p&&ge.classList.add("pin-spacer-"+p),Te.pinState=wt=na(d)),n.force3D!==!1&&_.set(d,{force3D:!0}),o.spacer=ge=Te.spacer,rn=it(d),xn=rn[v+m.os2],te=_.getProperty(d),st=_.quickSetter(d,m.a,pe),xa(d,ge,rn),Gt=na(d)),ie){xt=Xt(ie)?Ka(ie,Za):Za,c=ta("scroller-start",p,T,m,xt,0),Xe=ta("scroller-end",p,T,m,xt,0,c),Pt=c["offset"+m.op.d2];var wn=Ve(zt(T,"content")||T);Ye=this.markerStart=ta("start",p,wn,m,xt,Pt,0,S),Ue=this.markerEnd=ta("end",p,wn,m,xt,Pt,0,S),S&&(sn=_.quickSetter([Ye,Ue],m.a,pe)),!Pe&&!(bt.length&&zt(T,"fixedMarkers")===!0)&&(Ui(ce?H:T),_.set([c,Xe],{force3D:!0}),Yn=_.quickSetter(c,m.a,pe),an=_.quickSetter(Xe,m.a,pe))}if(S){var D=S.vars.onUpdate,C=S.vars.onUpdateParams;S.eventCallback("onUpdate",function(){o.update(0,0,1),D&&D.apply(S,C||[])})}if(o.previous=function(){return A[A.indexOf(o)-1]},o.next=function(){return A[A.indexOf(o)+1]},o.revert=function(f,E){if(!E)return o.kill(!0);var y=f!==!1||!o.enabled,I=Re;y!==o.isReverted&&(y&&(ct=Math.max(se(),o.scroll.rec||0),Se=o.progress,Vt=t&&t.progress()),Ye&&[Ye,Ue,c,Xe].forEach(function(_e){return _e.style.display=y?"none":"block"}),y&&(Re=o,o.update(y)),d&&(!he||!o.isActive)&&(y?Zi(d,ge,wt):xa(d,ge,it(d),oe)),y||o.update(y),Re=I,o.isReverted=y)},o.refresh=function(f,E,y,I){if(!((Re||!o.enabled)&&!E)){if(d&&f&&rt){ye(i,"scrollEnd",Di);return}!Ge&&de&&de(o),Re=o,Ne.tween&&!y&&(Ne.tween.kill(),Ne.tween=0),O&&O.pause(),G&&t&&(t.revert({kill:!1}).invalidate(),t.getChildren?t.getChildren(!0,!0,!1).forEach(function(Nt){return Nt.vars.immediateRender&&Nt.render(0,!0,!0)}):t.vars.immediateRender&&t.render(0,!0,!0)),o.isReverted||o.revert(!0,!0),o._subPinOffset=!1;var _e=Bt(),N=Dt(),ne=S?S.duration():_t(T,m),Ee=K<=.01||!K,Z=0,$=I||0,q=Xt(y)?y.end:n.end,dt=n.endTrigger||g,J=Xt(y)?y.start:n.start||(n.start===0||!g?0:d?"0 0":"0 100%"),$e=o.pinnedContainer=n.pinnedContainer&&Ve(n.pinnedContainer,o),pt=g&&Math.max(0,A.indexOf(o))||0,we=pt,ke,Ie,qt,Vn,De,ue,ft,ga,Wa,kn,ht,Cn,qn;for(ie&&Xt(y)&&(Cn=_.getProperty(c,m.p),qn=_.getProperty(Xe,m.p));we-- >0;)ue=A[we],ue.end||ue.refresh(0,1)||(Re=o),ft=ue.pin,ft&&(ft===g||ft===d||ft===$e)&&!ue.isReverted&&(kn||(kn=[]),kn.unshift(ue),ue.revert(!0,!0)),ue!==A[we]&&(pt--,we--);for(Me(J)&&(J=J(o)),J=Ua(J,"start",o),j=ni(J,g,_e,m,se(),Ye,c,o,N,re,Pe,ne,S,o._startClamp&&"_startClamp")||(d?-.001:0),Me(q)&&(q=q(o)),Ze(q)&&!q.indexOf("+=")&&(~q.indexOf(" ")?q=(Ze(J)?J.split(" ")[0]:"")+q:(Z=sa(q.substr(2),_e),q=Ze(J)?J:(S?_.utils.mapRange(0,S.duration(),S.scrollTrigger.start,S.scrollTrigger.end,j):j)+Z,dt=g)),q=Ua(q,"end",o),ee=Math.max(j,ni(q||(dt?"100% 0":ne),dt,_e,m,se()+Z,Ue,Xe,o,N,re,Pe,ne,S,o._endClamp&&"_endClamp"))||-.001,Z=0,we=pt;we--;)ue=A[we]||{},ft=ue.pin,ft&&ue.start-ue._pinPush<=j&&!S&&ue.end>0&&(ke=ue.end-(o._startClamp?Math.max(0,ue.start):ue.start),(ft===g&&ue.start-ue._pinPush<j||ft===$e)&&isNaN(J)&&(Z+=ke*(1-ue.progress)),ft===d&&($+=ke));if(j+=Z,ee+=Z,o._startClamp&&(o._startClamp+=Z),o._endClamp&&!Ge&&(o._endClamp=ee||-.001,ee=Math.min(ee,_t(T,m))),K=ee-j||(j-=.01)&&.001,Ee&&(Se=_.utils.clamp(0,1,_.utils.normalize(j,ee,ct))),o._pinPush=$,Ye&&Z&&(ke={},ke[m.a]="+="+Z,$e&&(ke[m.p]="-="+se()),_.set([Ye,Ue],ke)),d&&!(Ra&&o.end>=_t(T,m)))ke=it(d),Vn=m===fe,qt=se(),nt=parseFloat(te(m.a))+$,!ne&&ee>1&&(ht=(ce?B.scrollingElement||Qe:T).style,ht={style:ht,value:ht["overflow"+m.a.toUpperCase()]},ce&&it(H)["overflow"+m.a.toUpperCase()]!=="scroll"&&(ht.style["overflow"+m.a.toUpperCase()]="scroll")),xa(d,ge,ke),Gt=na(d),Ie=Tt(d,!0),ga=Pe&&Ht(T,Vn?We:fe)(),v?(oe=[v+m.os2,K+$+pe],oe.t=ge,we=v===le?fa(d,m)+K+$:0,we&&(oe.push(m.d,we+pe),ge.style.flexBasis!=="auto"&&(ge.style.flexBasis=we+pe)),bn(oe),$e&&A.forEach(function(Nt){Nt.pin===$e&&Nt.vars.pinSpacing!==!1&&(Nt._subPinOffset=!0)}),Pe&&se(ct)):(we=fa(d,m),we&&ge.style.flexBasis!=="auto"&&(ge.style.flexBasis=we+pe)),Pe&&(De={top:Ie.top+(Vn?qt-j:ga)+pe,left:Ie.left+(Vn?ga:qt-j)+pe,boxSizing:"border-box",position:"fixed"},De[Kt]=De["max"+vn]=Math.ceil(Ie.width)+pe,De[Zt]=De["max"+za]=Math.ceil(Ie.height)+pe,De[at]=De[at+zn]=De[at+jn]=De[at+Hn]=De[at+Fn]="0",De[le]=ke[le],De[le+zn]=ke[le+zn],De[le+jn]=ke[le+jn],De[le+Hn]=ke[le+Hn],De[le+Fn]=ke[le+Fn],Mt=er(wt,De,he),Ge&&se(0)),t?(Wa=t._initted,_a(1),t.render(t.duration(),!0,!0),kt=te(m.a)-nt+K+$,Ct=Math.abs(K-kt)>1,Pe&&Ct&&Mt.splice(Mt.length-2,2),t.render(0,!0,!0),Wa||t.invalidate(!0),t.parent||t.totalTime(t.totalTime()),_a(0)):kt=K,ht&&(ht.value?ht.style["overflow"+m.a.toUpperCase()]=ht.value:ht.style.removeProperty("overflow-"+m.a));else if(g&&se()&&!S)for(Ie=g.parentNode;Ie&&Ie!==H;)Ie._pinOffset&&(j-=Ie._pinOffset,ee-=Ie._pinOffset),Ie=Ie.parentNode;kn&&kn.forEach(function(Nt){return Nt.revert(!1,!0)}),o.start=j,o.end=ee,Le=je=Ge?ct:se(),!S&&!Ge&&(Le<ct&&se(ct),o.scroll.rec=0),o.revert(!1,!0),yt=Ae(),lt&&(tt=-1,lt.restart(!0)),Re=0,t&&Q&&(t._initted||Vt)&&t.progress()!==Vt&&t.progress(Vt||0,!0).render(t.time(),!0,!0),(Ee||Se!==o.progress||S||G||t&&!t._initted)&&(t&&!Q&&(t._initted||Se||t.vars.immediateRender!==!1)&&t.totalProgress(S&&j<-.001&&!Se?_.utils.normalize(j,ee,0):Se,!0),o.progress=Ee||(Le-j)/K===Se?0:Se),d&&v&&(ge._pinOffset=Math.round(o.progress*kt)),O&&O.invalidate(),isNaN(Cn)||(Cn-=_.getProperty(c,m.p),qn-=_.getProperty(Xe,m.p),aa(c,m,Cn),aa(Ye,m,Cn-(I||0)),aa(Xe,m,qn),aa(Ue,m,qn-(I||0))),Ee&&!Ge&&o.update(),b&&!Ge&&!At&&(At=!0,b(o),At=!1)}},o.getVelocity=function(){return(se()-je)/(Ae()-In)*1e3||0},o.endAnimation=function(){Tn(o.callbackAnimation),t&&(O?O.progress(1):t.paused()?Q||Tn(t,o.direction<0,1):Tn(t,t.reversed()))},o.labelToScroll=function(f){return t&&t.labels&&(j||o.refresh()||j)+t.labels[f]/t.duration()*K||0},o.getTrailing=function(f){var E=A.indexOf(o),y=o.direction>0?A.slice(0,E).reverse():A.slice(E+1);return(Ze(f)?y.filter(function(I){return I.vars.preventOverlaps===f}):y).filter(function(I){return o.direction>0?I.end<=j:I.start>=ee})},o.update=function(f,E,y){if(!(S&&!y&&!f)){var I=Ge===!0?ct:o.scroll(),_e=f?0:(I-j)/K,N=_e<0?0:_e>1?1:_e||0,ne=o.progress,Ee,Z,$,q,dt,J,$e,pt;if(E&&(je=Le,Le=S?se():I,w&&(Wt=Ot,Ot=t&&!Q?t.totalProgress():N)),F&&d&&!Re&&!Jn&&rt&&(!N&&j<I+(I-je)/(Ae()-In)*F?N=1e-4:N===1&&ee>I+(I-je)/(Ae()-In)*F&&(N=.9999)),N!==ne&&o.enabled){if(Ee=o.isActive=!!N&&N<1,Z=!!ne&&ne<1,J=Ee!==Z,dt=J||!!N!=!!ne,o.direction=N>ne?1:-1,o.progress=N,dt&&!Re&&($=N&&!ne?0:N===1?1:ne===1?2:3,Q&&(q=!J&&V[$+1]!=="none"&&V[$+1]||V[$],pt=t&&(q==="complete"||q==="reset"||q in t))),xe&&(J||pt)&&(pt||x||!t)&&(Me(xe)?xe(o):o.getTrailing(xe).forEach(function(qt){return qt.endAnimation()})),Q||(O&&!Re&&!Jn?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",N,t._tTime/t._tDur):(O.vars.totalProgress=N,O.invalidate().restart())):t&&t.totalProgress(N,!!(Re&&(yt||f)))),d){if(f&&v&&(ge.style[v+m.os2]=xn),!Pe)st(Rn(nt+kt*N));else if(dt){if($e=!f&&N>ne&&ee+1>I&&I+1>=_t(T,m),he)if(!f&&(Ee||$e)){var we=Tt(d,!0),ke=I-j;ai(d,H,we.top+(m===fe?ke:0)+pe,we.left+(m===fe?0:ke)+pe)}else ai(d,ge);bn(Ee||$e?Mt:Gt),Ct&&N<1&&Ee||st(nt+(N===1&&!$e?kt:0))}}w&&!Ne.tween&&!Re&&!Jn&&lt.restart(!0),s&&(J||W&&N&&(N<1||!ba))&&Gn(s.targets).forEach(function(qt){return qt.classList[Ee||W?"add":"remove"](s.className)}),l&&!Q&&!f&&l(o),dt&&!Re?(Q&&(pt&&(q==="complete"?t.pause().totalProgress(1):q==="reset"?t.restart(!0).pause():q==="restart"?t.restart(!0):t[q]()),l&&l(o)),(J||!ba)&&(h&&J&&on(o,h),Oe[$]&&on(o,Oe[$]),W&&(N===1?o.kill(!1,1):Oe[$]=0),J||($=N===1?1:3,Oe[$]&&on(o,Oe[$]))),me&&!Ee&&Math.abs(o.getVelocity())>(An(me)?me:2500)&&(Tn(o.callbackAnimation),O?O.progress(1):Tn(t,q==="reverse"?1:!N,1))):Q&&l&&!Re&&l(o)}if(an){var Ie=S?I/S.duration()*(S._caScrollDist||0):I;Yn(Ie+(c._isFlipped?1:0)),an(Ie)}sn&&sn(-I/S.duration()*(S._caScrollDist||0))}},o.enable=function(f,E){o.enabled||(o.enabled=!0,ye(T,"resize",Mn),ce||ye(T,"scroll",cn),de&&ye(i,"refreshInit",de),f!==!1&&(o.progress=Se=0,Le=je=tt=se()),E!==!1&&o.refresh())},o.getTween=function(f){return f&&Ne?Ne.tween:O},o.setPositions=function(f,E,y,I){if(S){var _e=S.scrollTrigger,N=S.duration(),ne=_e.end-_e.start;f=_e.start+ne*f/N,E=_e.start+ne*E/N}o.refresh(!1,!1,{start:Xa(f,y&&!!o._startClamp),end:Xa(E,y&&!!o._endClamp)},I),o.update()},o.adjustPinSpacing=function(f){if(oe&&f){var E=oe.indexOf(m.d)+1;oe[E]=parseFloat(oe[E])+f+pe,oe[1]=parseFloat(oe[1])+f+pe,bn(oe)}},o.disable=function(f,E){if(f!==!1&&o.revert(!0,!0),o.enabled&&(o.enabled=o.isActive=!1,E||O&&O.pause(),ct=0,Te&&(Te.uncache=1),de&&ve(i,"refreshInit",de),lt&&(lt.pause(),Ne.tween&&Ne.tween.kill()&&(Ne.tween=0)),!ce)){for(var y=A.length;y--;)if(A[y].scroller===T&&A[y]!==o)return;ve(T,"resize",Mn),ce||ve(T,"scroll",cn)}},o.kill=function(f,E){o.disable(f,E),O&&!E&&O.kill(),p&&delete Aa[p];var y=A.indexOf(o);y>=0&&A.splice(y,1),y===Be&&la>0&&Be--,y=0,A.forEach(function(I){return I.scroller===o.scroller&&(y=1)}),y||Ge||(o.scroll.rec=0),t&&(t.scrollTrigger=null,f&&t.revert({kill:!1}),E||t.kill()),Ye&&[Ye,Ue,c,Xe].forEach(function(I){return I.parentNode&&I.parentNode.removeChild(I)}),Bn===o&&(Bn=0),d&&(Te&&(Te.uncache=1),y=0,A.forEach(function(I){return I.pin===d&&y++}),y||(Te.spacer=0)),n.onKill&&n.onKill(o)},A.push(o),o.enable(!1,!1),St&&St(o),t&&t.add&&!K){var z=o.update;o.update=function(){o.update=z,P.cache++,j||ee||o.refresh()},_.delayedCall(.01,o.update),K=.01,j=ee=0}else o.refresh();d&&Ki()},i.register=function(n){return pn||(_=n||ki(),wi()&&window.document&&i.enable(),pn=Dn),pn},i.defaults=function(n){if(n)for(var t in n)ea[t]=n[t];return ea},i.disable=function(n,t){Dn=0,A.forEach(function(l){return l[t?"kill":"disable"](n)}),ve(M,"wheel",cn),ve(B,"scroll",cn),clearInterval($n),ve(B,"touchcancel",gt),ve(H,"touchstart",gt),Zn(ve,B,"pointerdown,touchstart,mousedown",$a),Zn(ve,B,"pointerup,touchend,mouseup",Ja),pa.kill(),Kn(ve);for(var r=0;r<P.length;r+=3)Qn(ve,P[r],P[r+1]),Qn(ve,P[r],P[r+2])},i.enable=function(){if(M=window,B=document,Qe=B.documentElement,H=B.body,_){if(Gn=_.utils.toArray,Nn=_.utils.clamp,Da=_.core.context||gt,_a=_.core.suppressOverwrites||gt,Na=M.history.scrollRestoration||"auto",Ma=M.pageYOffset||0,_.core.globals("ScrollTrigger",i),H){Dn=1,_n=document.createElement("div"),_n.style.height="100vh",_n.style.position="absolute",Pi(),Yi(),ae.register(_),i.isTouch=ae.isTouch,Lt=ae.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Ia=ae.isTouch===1,ye(M,"wheel",cn),Oa=[M,B,Qe,H],_.matchMedia&&(i.matchMedia=function(b){var x=_.matchMedia(),g;for(g in b)x.add(g,b[g]);return x},_.addEventListener("matchMediaInit",function(){Ai(),Ba()}),_.addEventListener("matchMediaRevert",function(){return Ri()}),_.addEventListener("matchMedia",function(){$t(0,1),nn("matchMedia")}),_.matchMedia().add("(orientation: portrait)",function(){return ya(),ya})),ya(),ye(B,"scroll",cn);var n=H.hasAttribute("style"),t=H.style,r=t.borderTopStyle,l=_.core.Animation.prototype,s,p;for(l.revert||Object.defineProperty(l,"revert",{value:function(){return this.time(-.01,!0)}}),t.borderTopStyle="solid",s=Tt(H),fe.m=Math.round(s.top+fe.sc())||0,We.m=Math.round(s.left+We.sc())||0,r?t.borderTopStyle=r:t.removeProperty("border-top-style"),n||(H.setAttribute("style",""),H.removeAttribute("style")),$n=setInterval(Qa,250),_.delayedCall(.5,function(){return Jn=0}),ye(B,"touchcancel",gt),ye(H,"touchstart",gt),Zn(ye,B,"pointerdown,touchstart,mousedown",$a),Zn(ye,B,"pointerup,touchend,mouseup",Ja),Ea=_.utils.checkPrefix("transform"),ca.push(Ea),pn=Ae(),pa=_.delayedCall(.2,$t).pause(),fn=[B,"visibilitychange",function(){var b=M.innerWidth,x=M.innerHeight;B.hidden?(Va=b,qa=x):(Va!==b||qa!==x)&&Mn()},B,"DOMContentLoaded",$t,M,"load",$t,M,"resize",Mn],Kn(ye),A.forEach(function(b){return b.enable(0,1)}),p=0;p<P.length;p+=3)Qn(ve,P[p],P[p+1]),Qn(ve,P[p],P[p+2])}else if(B){var h=function b(){i.enable(),B.removeEventListener("DOMContentLoaded",b)};B.addEventListener("DOMContentLoaded",h)}}},i.config=function(n){"limitCallbacks"in n&&(ba=!!n.limitCallbacks);var t=n.syncInterval;t&&clearInterval($n)||($n=t)&&setInterval(Qa,t),"ignoreMobileResize"in n&&(Ia=i.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Kn(ve)||Kn(ye,n.autoRefreshEvents||"none"),vi=(n.autoRefreshEvents+"").indexOf("resize")===-1)},i.scrollerProxy=function(n,t){var r=Ve(n),l=P.indexOf(r),s=en(r);~l&&P.splice(l,s?6:2),t&&(s?bt.unshift(M,t,H,t,Qe,t):bt.unshift(r,t))},i.clearMatchMedia=function(n){A.forEach(function(t){return t._ctx&&t._ctx.query===n&&t._ctx.kill(!0,!0)})},i.isInViewport=function(n,t,r){var l=(Ze(n)?Ve(n):n).getBoundingClientRect(),s=l[r?Kt:Zt]*t||0;return r?l.right-s>0&&l.left+s<M.innerWidth:l.bottom-s>0&&l.top+s<M.innerHeight},i.positionInViewport=function(n,t,r){Ze(n)&&(n=Ve(n));var l=n.getBoundingClientRect(),s=l[r?Kt:Zt],p=t==null?s/2:t in ha?ha[t]*s:~t.indexOf("%")?parseFloat(t)*s/100:parseFloat(t)||0;return r?(l.left+p)/M.innerWidth:(l.top+p)/M.innerHeight},i.killAll=function(n){if(A.slice(0).forEach(function(r){return r.vars.id!=="ScrollSmoother"&&r.kill()}),n!==!0){var t=tn.killAll||[];tn={},t.forEach(function(r){return r()})}},i}();R.version="3.15.0";R.saveStyles=function(i){return i?Gn(i).forEach(function(e){if(e&&e.style){var a=Ke.indexOf(e);a>=0&&Ke.splice(a,5),Ke.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),_.core.getCache(e),Da())}}):Ke};R.revert=function(i,e){return Ba(!i,e)};R.create=function(i,e){return new R(i,e)};R.refresh=function(i){return i?Mn(!0):(pn||R.register())&&$t(!0)};R.update=function(i){return++P.cache&&It(i===!0?2:0)};R.clearScrollMemory=Mi;R.maxScroll=function(i,e){return _t(i,e?We:fe)};R.getScrollFunc=function(i,e){return Ht(Ve(i),e?We:fe)};R.getById=function(i){return Aa[i]};R.getAll=function(){return A.filter(function(i){return i.vars.id!=="ScrollSmoother"})};R.isScrolling=function(){return!!rt};R.snapDirectional=Ha;R.addEventListener=function(i,e){var a=tn[i]||(tn[i]=[]);~a.indexOf(e)||a.push(e)};R.removeEventListener=function(i,e){var a=tn[i],n=a&&a.indexOf(e);n>=0&&a.splice(n,1)};R.batch=function(i,e){var a=[],n={},t=e.interval||.016,r=e.batchMax||1e9,l=function(h,b){var x=[],g=[],d=_.delayedCall(t,function(){b(x,g),x=[],g=[]}).pause();return function(v){x.length||d.restart(!0),x.push(v.trigger),g.push(v),r<=x.length&&d.progress(1)}},s;for(s in e)n[s]=s.substr(0,2)==="on"&&Me(e[s])&&s!=="onRefreshInit"?l(s,e[s]):e[s];return Me(r)&&(r=r(),ye(R,"refresh",function(){return r=e.batchMax()})),Gn(i).forEach(function(p){var h={};for(s in n)h[s]=n[s];h.trigger=p,a.push(R.create(h))}),a};var ri=function(e,a,n,t){return a>t?e(t):a<0&&e(0),n>t?(t-a)/(n-a):n<0?a/(a-n):1},wa=function i(e,a){a===!0?e.style.removeProperty("touch-action"):e.style.touchAction=a===!0?"auto":a?"pan-"+a+(ae.isTouch?" pinch-zoom":""):"none",e===Qe&&i(H,a)},ia={auto:1,scroll:1},nr=function(e){var a=e.event,n=e.target,t=e.axis,r=(a.changedTouches?a.changedTouches[0]:a).target,l=r._gsap||_.core.getCache(r),s=Ae(),p;if(!l._isScrollT||s-l._isScrollT>2e3){for(;r&&r!==H&&(r.scrollHeight<=r.clientHeight&&r.scrollWidth<=r.clientWidth||!(ia[(p=it(r)).overflowY]||ia[p.overflowX]));)r=r.parentNode;l._isScroll=r&&r!==n&&!en(r)&&(ia[(p=it(r)).overflowY]||ia[p.overflowX]),l._isScrollT=s}(l._isScroll||t==="x")&&(a.stopPropagation(),a._gsapAllow=!0)},Ni=function(e,a,n,t){return ae.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:a,onWheel:t=t&&nr,onPress:t,onDrag:t,onScroll:t,onEnable:function(){return n&&ye(B,ae.eventTypes[0],oi,!1,!0)},onDisable:function(){return ve(B,ae.eventTypes[0],oi,!0)}})},ar=/(input|label|select|textarea)/i,si,oi=function(e){var a=ar.test(e.target.tagName);(a||si)&&(e._gsapAllow=!0,si=a)},ir=function(e){Xt(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var a=e,n=a.normalizeScrollX,t=a.momentum,r=a.allowNestedScroll,l=a.onRelease,s,p,h=Ve(e.target)||Qe,b=_.core.globals().ScrollSmoother,x=b&&b.get(),g=Lt&&(e.content&&Ve(e.content)||x&&e.content!==!1&&!x.smooth()&&x.content()),d=Ht(h,fe),v=Ht(h,We),G=1,F=(ae.isTouch&&M.visualViewport?M.visualViewport.scale*M.visualViewport.width:M.outerWidth)/M.innerWidth,U=0,L=Me(t)?function(){return t(s)}:function(){return t||2.8},W,w,he=Ni(h,e.type,!0,r),Y=function(){return w=!1},S=gt,me=gt,xe=function(){p=_t(h,fe),me=Nn(Lt?1:0,p),n&&(S=Nn(0,_t(h,We))),W=Qt},m=function(){g._gsap.y=Rn(parseFloat(g._gsap.y)+d.offset)+"px",g.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(g._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},Q=function(){if(w){requestAnimationFrame(Y);var ie=Rn(s.deltaY/2),re=me(d.v-ie);if(g&&re!==d.v+d.offset){d.offset=re-d.v;var o=Rn((parseFloat(g&&g._gsap.y)||0)-d.offset);g.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+o+", 0, 1)",g._gsap.y=o+"px",d.cacheID=P.cache,It()}return!0}d.offset&&m(),w=!0},T,vt,ce,Pe,Oe=function(){xe(),T.isActive()&&T.vars.scrollY>p&&(d()>p?T.progress(1)&&d(p):T.resetTo("scrollY",p))};return g&&_.set(g,{y:"+=0"}),e.ignoreCheck=function(V){return Lt&&V.type==="touchmove"&&Q()||G>1.05&&V.type!=="touchstart"||s.isGesturing||V.touches&&V.touches.length>1},e.onPress=function(){w=!1;var V=G;G=Rn((M.visualViewport&&M.visualViewport.scale||1)/F),T.pause(),V!==G&&wa(h,G>1.01?!0:n?!1:"x"),vt=v(),ce=d(),xe(),W=Qt},e.onRelease=e.onGestureStart=function(V,ie){if(d.offset&&m(),!ie)Pe.restart(!0);else{P.cache++;var re=L(),o,de;n&&(o=v(),de=o+re*.05*-V.velocityX/.227,re*=ri(v,o,de,_t(h,We)),T.vars.scrollX=S(de)),o=d(),de=o+re*.05*-V.velocityY/.227,re*=ri(d,o,de,_t(h,fe)),T.vars.scrollY=me(de),T.invalidate().duration(re).play(.01),(Lt&&T.vars.scrollY>=p||o>=p-1)&&_.to({},{onUpdate:Oe,duration:re})}l&&l(V)},e.onWheel=function(){T._ts&&T.pause(),Ae()-U>1e3&&(W=0,U=Ae())},e.onChange=function(V,ie,re,o,de){if(Qt!==W&&xe(),ie&&n&&v(S(o[2]===ie?vt+(V.startX-V.x):v()+ie-o[1])),re){d.offset&&m();var Bt=de[2]===re,Dt=Bt?ce+V.startY-V.y:d()+re-de[1],tt=me(Dt);Bt&&Dt!==tt&&(ce+=tt-Dt),d(tt)}(re||ie)&&It()},e.onEnable=function(){wa(h,n?!1:"x"),R.addEventListener("refresh",Oe),ye(M,"resize",Oe),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=v.smooth=!1),he.enable()},e.onDisable=function(){wa(h,!0),ve(M,"resize",Oe),R.removeEventListener("refresh",Oe),he.kill()},e.lockAxis=e.lockAxis!==!1,s=new ae(e),s.iOS=Lt,Lt&&!d()&&d(1),Lt&&_.ticker.add(gt),Pe=s._dc,T=_.to(s,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Oi(d,d(),function(){return T.pause()})},onUpdate:It,onComplete:Pe.vars.onComplete}),s};R.sort=function(i){if(Me(i))return A.sort(i);var e=M.pageYOffset||0;return R.getAll().forEach(function(a){return a._sortY=a.trigger?e+a.trigger.getBoundingClientRect().top:a.start+M.innerHeight}),A.sort(i||function(a,n){return(a.vars.refreshPriority||0)*-1e6+(a.vars.containerAnimation?1e6:a._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};R.observe=function(i){return new ae(i)};R.normalizeScroll=function(i){if(typeof i>"u")return He;if(i===!0&&He)return He.enable();if(i===!1){He&&He.kill(),He=i;return}var e=i instanceof ae?i:ir(i);return He&&He.target===e.target&&He.kill(),en(e.target)&&(He=e),e};R.core={_getVelocityProp:Ta,_inputObserver:Ni,_scrollers:P,_proxies:bt,bridge:{ss:function(){rt||nn("scrollStart"),rt=Ae()},ref:function(){return Re}}};ki()&&_.registerPlugin(R);const rr="_navbar_5vkzj_1",sr="_navbarScrolled_5vkzj_16",or="_navRight_5vkzj_23",lr="_themeToggle_5vkzj_29",cr="_navInner_5vkzj_53",dr="_logo_5vkzj_63",ur="_navLinks_5vkzj_74",pr="_menuToggle_5vkzj_107",fr="_menuToggleOpen_5vkzj_137",hr="_mobileMenu_5vkzj_148",mr="_mobileMenuOpen_5vkzj_163",gr="_mobileNavLinks_5vkzj_192",_r="_mobileMenuBackdrop_5vkzj_221",Je={navbar:rr,navbarScrolled:sr,navRight:or,themeToggle:lr,navInner:cr,logo:dr,navLinks:ur,menuToggle:pr,menuToggleOpen:fr,mobileMenu:hr,mobileMenuOpen:mr,mobileNavLinks:gr,mobileMenuBackdrop:_r},Li=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Portfolio Content — Editable Source</title>
<meta name="description" content="Single source-of-truth content file for the portfolio site. Fully connected to the React app — editing this file updates the live site." />
</head>
<body>

<!--
  ═══════════════════════════════════════════════════════════════════════════
  PORTFOLIO CONTENT — EDITABLE SOURCE FILE
  ═══════════════════════════════════════════════════════════════════════════
  This file is the planned single source of truth for all editable portfolio
  text/data (see migration plan). It is NOT yet connected to the React app —
  no component currently reads this file. It exists so content can be
  reviewed/edited in one place before the wiring step happens.

  HOW TO EDIT
  -----------
  - Only change the text between tags (or attribute values like \`href\`,
    \`data-*\`) — do not remove tags, \`data-field\` / \`data-list\` / \`data-item\`
    attributes, or restructure the nesting. The loader reads this file by
    these exact attributes.
  - To add/remove a repeatable entry (a skill, a project, an experience
    entry, a social link, an education course...), copy/delete one whole
    <li data-item="..."> block, including its closing tag.
  - Leave placeholder values in ALL CAPS / [BRACKETS] as a visual cue for
    what still needs real content; replace them with real content when
    ready.
  ═══════════════════════════════════════════════════════════════════════════
-->

<main data-content="portfolio">

  <!-- ═══════════════════════════ NAME ═══════════════════════════════════ -->
  <section data-field="name">
    <h1 data-field="fullName">Shreyansh Tiwari</h1>
    <p data-field="tagline">Computer Science Engineering Student</p>
  </section>

  <!-- ═══════════════════════ HERO (SECTION-SPECIFIC) ═════════════════════ -->
  <!-- Fields used only by the Hero section, in addition to fullName/tagline
       above (reused as Name/Designation) and the Resume section below
       (reused as Hero's resume link). \`profileImage\` has no visible slot in
       the current Hero UI yet -- see connection notes -- but the value is
       loaded so it's ready whenever a slot is added. -->
  <section data-field="heroContent">
    <p data-field="description">Java • Spring Boot • Backend Development</p>
    <img data-field="profileImage" src="/assets/images/profile-placeholder.jpg" alt="[YOUR PROFILE PHOTO]" />
  </section>

  <!-- ═══════════════════════════ ABOUT ══════════════════════════════════ -->
  <section data-field="about">
    <h2>About</h2>
    <p data-field="aboutBody">
      Hi, I'm Shreyansh Tiwari, a Computer Science Engineering student
      passionate about Java, Cloud Computing, Backend Development,
       and creating modern web experiences. I enjoy building
      interactive applications with beautiful UI and smooth animations.
    </p>
  </section>

  <!-- ═══════════════════════════ SKILLS ═════════════════════════════════ -->
  <!-- One <li data-item="skill-category"> per category shown on the site. -->
  <section data-list="skills">
    <h2>Skills</h2>

    <ul>
      <li data-item="skill-category">
        <span data-field="categoryName">Frontend</span>
        <ul data-list="skillNames">
          <li data-item="skillName">HTML</li>
          <li data-item="skillName">CSS</li>
          <li data-item="skillName">JavaScript</li>
          <li data-item="skillName">React</li>
        </ul>
      </li>

      <li data-item="skill-category">
        <span data-field="categoryName">Backend</span>
        <ul data-list="skillNames">
          <li data-item="skillName">Java</li>
          <li data-item="skillName">Spring Boot</li>
        </ul>
      </li>

      <li data-item="skill-category">
        <span data-field="categoryName">Cloud</span>
        <ul data-list="skillNames">
          <li data-item="skillName">Google Cloud</li>
        </ul>
      </li>

      <li data-item="skill-category">
        <span data-field="categoryName">Cybersecurity</span>
        <ul data-list="skillNames">
          <li data-item="skillName">Linux</li>
          <li data-item="skillName">Networking</li>
        </ul>
      </li>

      <li data-item="skill-category">
        <span data-field="categoryName">Programming</span>
        <ul data-list="skillNames">
          <li data-item="skillName">C++</li>
          <li data-item="skillName">Python</li>
        </ul>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ EDUCATION ══════════════════════════════ -->
  <!-- Not previously a dedicated section anywhere in the codebase — this is
       the first structured place this content lives. One <li data-item=
       "education-entry"> per degree/program. -->
  <section data-list="education">
    <h2>Education</h2>

    <ul>
      <li data-item="education-entry">
        <span data-field="degree">B.Tech — Computer Science Engineering</span>
        <span data-field="school">Acropolis Institute of Technology and Research</span>
        <span data-field="status">Currently Enrolled</span>
        <span data-field="years">2024 — 2028</span>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ EXPERIENCE ═════════════════════════════ -->
  <!-- One <li data-item="experience-entry"> per role, in the order they
       should appear on the timeline. -->
  <section data-list="experience">
    <h2>Experience</h2>

    <ul>

      <li data-item="experience-entry">
        <span data-field="title">IT Intern At IMC Office</span>
        <span data-field="subtitle">Internship with Mayor</span>
        <p data-field="description">Collaborated within a team to design and build a working prototype under time constraints, applying full-stack development and problem-solving skills.</p>
      </li>

      <li data-item="experience-entry">
        <span data-field="title">Google Cloud Arcade Facilitator 2026</span>
        <span data-field="subtitle">Google Cloud</span>
        <p data-field="description">Guided peers through Google Cloud Arcade quests and labs, helping them build hands-on cloud skills and complete skill badges within program timelines.</p>
      </li>

      <li data-item="experience-entry">
        <span data-field="title">Cloud Engineer At GDG On Campus AITR</span>
        <span data-field="subtitle">Google Developer Groups</span>
        <p data-field="description">Supported the organization of developer-focused sessions and workshops on campus, helping coordinate logistics and encourage student participation in tech events.</p>
      </li>

      <li data-item="experience-entry">
        <span data-field="title">Cloud Jam Organizer</span>
        <span data-field="subtitle">Cloud Study Jam 2026</span>
        <p data-field="description">Co-organized a Cloud Study Jam event, assisting participants with environment setup, lab walkthroughs, and troubleshooting during hands-on cloud sessions.</p>
      </li>

    </ul>
  </section>

  <!-- ═══════════════════════════ PROJECTS ═══════════════════════════════ -->
  <!-- One <li data-item="project-entry"> per project card. \`href\` values on
       the github/demo links are the actual data used — edit those directly.
       \`image\` src points into /public/assets/images/projects/. To swap a
       project's picture: replace the file at that same path/filename on
       disk (keep the filename identical) -- the site will show the new
       image immediately, no code or content.html edit needed. Only change
       the \`src\` value here if you want to point at a different filename. -->
  <section data-list="projects">
    <h2>Projects</h2>

    <li data-item="project-entry">
        <span data-field="title">InterviewAce</span>
        <p data-field="description">Developed an AI-driven interview preparation platform that helps users practice mock interviews, receive personalized feedback, improve communication skills, and build confidence through real-time interview simulations and performance analysis.</p>
        <img data-field="image" src="/assets/images/projects/InterviewAce.png" alt="InterviewAce preview" />
        <ul data-list="tech">
          <li data-item="techTag">Java</li>
          <li data-item="techTag">Web Development</li>
        </ul>
        <a data-field="githubUrl" href="#">GitHub</a>
        <a data-field="demoUrl" href="https://interview-ace-mauve.vercel.app/interview/stranger">Live Demo</a>
      </li>

    <ul>
      <li data-item="project-entry">
        <span data-field="title">Disk Scheduling Simulator</span>
        <p data-field="description">An interactive simulator that visualizes classic disk scheduling algorithms (FCFS, SCAN, SSTF, C-SCAN) to help understand seek time and head movement optimization.</p>
        <img data-field="image" src="/assets/images/projects/Disk Scheduling.png" alt="Disk Scheduling Simulator preview" />
        <ul data-list="tech">
          <li data-item="techTag">Python</li>
          <li data-item="techTag">Data Structures</li>
          <li data-item="techTag">Algorithms</li>
        </ul>
        <a data-field="githubUrl" href="https://github.com/Shreyanshtiwarii/Disk-Scheduling-Simulator.git">GitHub</a>
        <a data-field="demoUrl" href="https://disk-scheduling-simulator.onrender.com">Live Demo</a>
      </li>

      <li data-item="project-entry">
        <span data-field="title">Deadlock Detection Simulator</span>
        <p data-field="description">A visual tool that models resource allocation graphs to detect and demonstrate deadlock conditions in operating systems, aiding in understanding process synchronization.</p>
        <img data-field="image" src="/assets/images/projects/Deadlock Detection.png" alt="Deadlock Detection Simulator preview" />
        <ul data-list="tech">
          <li data-item="techTag">Java</li>
          <li data-item="techTag">Operating Systems</li>
          <li data-item="techTag">Graph Theory</li>
        </ul>
        <a data-field="githubUrl" href="https://github.com/Shreyanshtiwarii/deadlock-simulator.git">GitHub</a>
        <a data-field="demoUrl" href="https://deadlock-simulator.onrender.com">Live Demo</a>
      </li>

    </ul>
  </section>

  <!-- ═══════════════════════════ RESUME PATH ════════════════════════════ -->
  <!-- \`href\` is the actual file path used by the Download/Preview buttons.
       Replace with the real PDF path once available; keep it inside
       /assets/documents/ to match how the app currently serves static files. -->
  <section data-field="resume">
    <a data-field="resumePath" href="/assets/documents/resume/Shreyansh%20Tiwari%20Resume%201.pdf" download data-field-filename="Shreyansh_Tiwari_Resume.pdf">
      Resume PDF
    </a>
  </section>

  <!-- ═══════════════════════════ SOCIAL LINKS ═══════════════════════════ -->
  <!-- One <li data-item="social-entry"> per icon shown in the Contact
       section. \`data-field="platform"\` should stay one of:
       github | linkedin | email | instagram (used to pick the matching
       icon later) unless a new platform + icon is added at the same time. -->
  <section data-list="socialLinks">
    <h2>Social Links</h2>

    <ul>
      <li data-item="social-entry">
        <span data-field="platform">github</span>
        <a data-field="url" href="https://github.com/Shreyanshtiwarii">GitHub</a>
      </li>

      <li data-item="social-entry">
        <span data-field="platform">linkedin</span>
        <a data-field="url" href="https://www.linkedin.com/in/shreyansh-tiwari-483a7231a">LinkedIn</a>
      </li>

      <li data-item="social-entry">
        <span data-field="platform">email</span>
        <a data-field="url" href="mailto:tshreyansh029@gmail.com">Email</a>
      </li>

      <li data-item="social-entry">
        <span data-field="platform">instagram</span>
        <a data-field="url" href="https://instagram.com/Shreyanshtiwariiii">Instagram</a>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ CONTACT DETAILS ════════════════════════ -->
  <section data-field="contact">
    <h2>Contact</h2>
    <a data-field="email" href="mailto:tshreyansh029@gmail.com">tshreyansh029@gmail.com</a>
    <a data-field="linkedinDisplay" href="https://www.linkedin.com/in/shreyansh-tiwari-483a7231a">linkedin.com/in/shreyansh-tiwari-483a7231a</a>
    <span data-field="location">Indore, India</span>
  </section>

  <!-- ═══════════════════════════ ACHIEVEMENTS ════════════════════════════ -->
  <!-- One <li data-item="stat-entry"> per counter card.
       \`data-field="statId"\` must stay unique — it keys the icon lookup.
       \`data-field="statValue"\` is the number the counter animates to.
       \`data-field="statSuffix"\` is the symbol after the number (e.g. +).
       \`data-field="statColor"\` and \`data-field="statGlow"\` are CSS color
       strings — change carefully; they affect the card accent & glow.      -->
  <section data-list="achievements">
    <h2>Achievements</h2>
    <p data-field="achievementsSubtitle">A snapshot of what I've built, learned, and contributed.</p>

    <ul>
      <li data-item="stat-entry">
        <span data-field="statId">projects</span>
        <span data-field="statValue">6</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Projects Built</span>
        <span data-field="statSub">Full-stack &amp; systems</span>
        <span data-field="statColor">#8b5cf6</span>
        <span data-field="statGlow">rgba(139,92,246,0.35)</span>
      </li>
      <li data-item="stat-entry">
        <span data-field="statId">certificates</span>
        <span data-field="statValue">3</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Certificates</span>
        <span data-field="statSub">Google Cloud &amp; more</span>
        <span data-field="statColor">#f59e0b</span>
        <span data-field="statGlow">rgba(245,158,11,0.35)</span>
      </li>
      <li data-item="stat-entry">
        <span data-field="statId">hackathons</span>
        <span data-field="statValue">5</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Hackathons</span>
        <span data-field="statSub">Competed &amp; presented</span>
        <span data-field="statColor">#10b981</span>
        <span data-field="statGlow">rgba(16,185,129,0.35)</span>
      </li>
      <li data-item="stat-entry">
        <span data-field="statId">coding</span>
        <span data-field="statValue">150</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Coding Problems</span>
        <span data-field="statSub">DSA &amp; competitive</span>
        <span data-field="statColor">#3b82f6</span>
        <span data-field="statGlow">rgba(59,130,246,0.35)</span>
      </li>
      <li data-item="stat-entry">
        <span data-field="statId">events</span>
        <span data-field="statValue">6</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Events Organized</span>
        <span data-field="statSub">GDG, Cloud Jams</span>
        <span data-field="statColor">#ec4899</span>
        <span data-field="statGlow">rgba(236,72,153,0.35)</span>
      </li>
      <li data-item="stat-entry">
        <span data-field="statId">skills</span>
        <span data-field="statValue">12</span>
        <span data-field="statSuffix">+</span>
        <span data-field="statLabel">Technologies</span>
        <span data-field="statSub">Java, Spring Boot, Hibernate</span>
        <span data-field="statColor">#a78bfa</span>
        <span data-field="statGlow">rgba(167,139,250,0.35)</span>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ CERTIFICATES ════════════════════════════ -->
  <!-- One <li data-item="cert-entry"> per certificate card.
       \`data-field="certId"\` must stay unique — it's the React list key.
       \`data-field="certCategory"\` must be one of the values that also
       appears in a <li data-item="cert-category"> below — used for filtering.
       Icons / SVGs are visual design, NOT editable here; they live in code
       keyed by \`certId\`. To add a new cert, also add an icon in Certificates.jsx.
       \`data-field="certGradient"\` is the card background CSS gradient string.
       \`data-field="certAccent"\` is the card highlight CSS color string.     -->
  <section data-list="certificates">
    <h2>Certificates</h2>

    

    <ul data-list="cert-entries">
      <li data-item="cert-entry">
        <span data-field="certId">TCS CodeVita Season 13</span>
        <span data-field="certTitle">Global Rank 3271</span>
        <span data-field="certIssuer">Tata Consultancy Services</span>
        <span data-field="certDate">2026</span>
        <ul data-list="certSkills">
          <li data-item="certSkill">Competitive Programming</li>
        </ul>
        <img data-field="certImage" src="/assets/documents/certificates/TCS%20Codevita%20Season%2013.png" alt="TCS CodeVita Season 13 certificate" />
        <span data-field="certGradient">linear-gradient(135deg, #1a1a3a 0%, #0d1f3c 50%, #1a2a4a 100%)</span>
        <span data-field="certAccent">#4f9eff</span>
      </li>
      <li data-item="cert-entry">
        <span data-field="certId">India AI Impact Buildathon</span>
        <span data-field="certTitle">Participation in India AI Impact Buildathon</span>
        <span data-field="certIssuer">HCL GUVI</span>
        <span data-field="certDate">2026</span>
        <ul data-list="certSkills">
          <li data-item="certSkill">Frontend Development</li>
          <li data-item="certSkill">Backend Development</li>
          <li data-item="certSkill">Database Design</li>
        </ul>
        <span data-field="certCredentialId">6n1Ut517AKl722aO93</span>
        <img data-field="certImage" src="/assets/documents/certificates/HCL%20GUVI%20Certification.png" alt="HCL GUVI India AI Impact Buildathon certificate" />
        <span data-field="certGradient">linear-gradient(135deg, #0d1a2e 0%, #1a2a4a 50%, #0d1f3c 100%)</span>
        <span data-field="certAccent">#34a853</span>
      </li>

      <li data-item="cert-entry">
        <span data-field="certId">Hackathon</span>
        <span data-field="certTitle">Participation in Prayatna 3.0</span>
        <span data-field="certIssuer">ACM Student Chapter AITR</span>
        <span data-field="certDate">2026</span>
        <ul data-list="certSkills">
          <li data-item="certSkill">Frontend Development</li>
          <li data-item="certSkill">Backend Development</li>
          <li data-item="certSkill">Database Design</li>
        </ul>
        <span data-field="certCredentialId">e65c96ea-e89b-42b3-a344-49a860170b53</span>
        <img data-field="certImage" src="/assets/documents/certificates/Prayatna%203.0.png" alt="Prayatna 3.0 hackathon participation certificate" />
        <span data-field="certGradient">linear-gradient(135deg, #0d1a2e 0%, #1a2a4a 50%, #0d1f3c 100%)</span>
        <span data-field="certAccent">#34a853</span>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ CLUBS ═══════════════════════════════════ -->
  <!-- One <li data-item="club-entry"> per card.
       \`data-field="clubId"\` must stay unique — it's the React list key and
       the key used to look up the SVG logo in the code.
       \`data-field="clubAccent"\` is a CSS color string for the card accent.
       To add a new club, also add a logo SVG in Clubs.jsx keyed by clubId.  -->
  <section data-list="clubs">
    <h2>Clubs &amp; Leadership</h2>
    <p data-field="clubsSubtitle">Roles and initiatives where I've helped build and grow developer communities.</p>

    <ul>
      <li data-item="club-entry">
        <span data-field="clubId">gdg-aitr</span>
        <span data-field="clubName">GDG On Campus AITR</span>
        <span data-field="clubRole">Cloud Engineer</span>
        <span data-field="clubDuration">2025 — Present</span>
        <p data-field="clubDescription">Part of the organizing core for Google Developer Groups on Campus, helping plan technical sessions and community-driven developer events.</p>
        <ul data-list="clubTags">
          <li data-item="clubTag">Community Building</li>
          <li data-item="clubTag">Event Planning</li>
          <li data-item="clubTag">Public Speaking</li>
        </ul>
        <span data-field="clubAccent">#4f9eff</span>
      </li>
        </ul>
        <ul>
      <li data-item="club-entry">
        <span data-field="clubId">indorix</span>
        <span data-field="clubName">Indorix</span>
        <span data-field="clubRole">Company OutReach</span>
        <span data-field="clubDuration">2025 — Present</span>
        <p data-field="clubDescription">Built and maintained relationships with companies, startups, and industry partners to create collaboration, networking, internship, and career opportunities for the community. Contributed to outreach initiatives that connected students and professionals with industry leaders.</p>
        <ul data-list="clubTags">
          <li data-item="clubTag">Community Building</li>
          <li data-item="clubTag">Event Planning</li>
          <li data-item="clubTag">Public Speaking</li>
        </ul>
        <span data-field="clubAccent">#4f9eff</span>
      </li>
        </ul>
        <span data-field="clubAccent">#34a853</span>
      </li>
      <li data-item="club-entry">
        <span data-field="clubId">codespire</span>
        <span data-field="clubName">CodeSpire Organizing Team</span>
        <span data-field="clubRole">Organizing Committee Member</span>
        <span data-field="clubDuration">2025</span>
        <p data-field="clubDescription">Helping coordinate CodeSpire, a coding and hackathon-style initiative — covering logistics, participant outreach, and on-ground event execution.</p>
        <ul data-list="clubTags">
          <li data-item="clubTag">Team Coordination</li>
          <li data-item="clubTag">Outreach</li>
        </ul>
        <span data-field="clubAccent">#8b5cf6</span>
      </li>
      <li data-item="club-entry">
        <span data-field="clubId">cloud-jam</span>
        <span data-field="clubName">Cloud Jam Organizer</span>
        <span data-field="clubRole">Event Organizer</span>
        <span data-field="clubDuration">2026</span>
        <p data-field="clubDescription">Organized Cloud Study Jam sessions, guiding peers through Google Cloud labs and helping them earn skill badges as a group.</p>
        <ul data-list="clubTags">
          <li data-item="clubTag">Google Cloud</li>
          <li data-item="clubTag">Mentorship</li>
          <li data-item="clubTag">Workshop Facilitation</li>
        </ul>
        <span data-field="clubAccent">#f59e0b</span>
      </li>
    </ul>
  </section>

  <!-- ═══════════════════════════ ACADEMIC JOURNEY ════════════════════════ -->
  <!-- One <li data-item="semester-entry"> per semester card.
       \`data-field="semId"\` must stay unique.
       \`data-field="semStatus"\` must be exactly: completed | upcoming
       \`data-field="semSgpa"\` and \`data-field="semCgpa"\` should be a number
       or leave empty for upcoming semesters.
       \`data-field="semMarksheetUrl"\` — path to PDF, or leave empty.
       \`data-field="semMarksheetFilename"\` — download filename, or leave empty. -->
  <section data-list="academicJourney">
    <h2>Academic Journey</h2>
    <p data-field="academicSubtitle">SGPA, CGPA, and subjects for every semester — with marksheets available to preview or download.</p>

    <ul>
      <li data-item="semester-entry">
        <span data-field="semId">sem-1</span>
        <span data-field="semNumber">1</span>
        <span data-field="semSgpa">7.24</span>
        <span data-field="semCgpa">7.24</span>
        <span data-field="semStatus">completed</span>
        <span data-field="semMarksheetUrl">/assets/documents/results/Semester-1.pdf</span>
        <span data-field="semMarksheetFilename">Semester_1_Marksheet.pdf</span>
      </li>
      <li data-item="semester-entry">
        <span data-field="semId">sem-2</span>
        <span data-field="semNumber">2</span>
        <span data-field="semSgpa">7.19</span>
        <span data-field="semCgpa">7.21</span>
        <span data-field="semStatus">completed</span>
        <span data-field="semMarksheetUrl">/assets/documents/results/Semester-2.pdf</span>
        <span data-field="semMarksheetFilename">Semester_2_Marksheet.pdf</span>
      </li>
      <li data-item="semester-entry">
        <span data-field="semId">sem-3</span>
        <span data-field="semNumber">3</span>
        <span data-field="semSgpa">7.50</span>
        <span data-field="semCgpa">7.30</span>
        <span data-field="semStatus">completed</span>
        <span data-field="semMarksheetUrl">/assets/documents/results/Semester-3.pdf</span>
        <span data-field="semMarksheetFilename">Semester_3_Marksheet.pdf</span>
        </ul>
      </li>
      <li data-item="semester-entry">
        <span data-field="semId">sem-4</span>
        <span data-field="semNumber">4</span>
        <span data-field="semSgpa"></span>
        <span data-field="semCgpa"></span>
        <span data-field="semStatus">upcoming</span>
        <span data-field="semMarksheetUrl"></span>
        <span data-field="semMarksheetFilename"></span>
    </ul>
  </section>

  <!-- ═══════════════════════════ GLOBE ═══════════════════════════════════ -->
  <!-- The Three.js globe auto-rotates back to the location set here.
       \`data-field="globeLat"\` and \`data-field="globeLon"\` are the geographic
       coordinates (decimal degrees). The label appears as a 3D sprite on the
       globe and in the readout bar below the canvas.
       \`data-field="globeReadout"\` is the text in the readout strip below the canvas
       (e.g. "Indore, India · 22.72°N, 75.86°E").
       \`data-field="globeSubtitle"\` is the paragraph under the section heading. -->
  <section data-field="globe">
    <span data-field="globeLat">22.7196</span>
    <span data-field="globeLon">75.8577</span>
    <span data-field="globeLabel">Indore, India</span>
    <span data-field="globeReadout">Indore, India · 22.72°N, 75.86°E</span>
    <p data-field="globeSubtitle">Drag to spin the globe — it finds its way back to Indore, India on its own.</p>
  </section>

  <!-- ═══════════════════════════ DEV CONSOLE ═════════════════════════════ -->
  <!-- Terminal command outputs. Each command has a fixed \`data-field="cmdName"\`
       value matching the command the user types (whoami, skills, etc.).
       Do NOT rename the cmdName values — those are the actual terminal commands.
       \`data-field="consoleSubtitle"\` is the section subtitle text.
       For the skills command: one <li data-item="consoleSkillGroup"> per group.
       For projects: one <li data-item="consoleProject"> per project.
       For experience: one <li data-item="consoleExp"> per role.             -->
  <section data-field="devConsole">
    <p data-field="consoleSubtitle">An interactive terminal with info about me. Try typing commands.</p>

    <!-- whoami command output -->
    <div data-field="cmdWhoami">
      <span data-field="whoamiRole">CS Engineering Student</span>
      <span data-field="whoamiFocus">Java · Spring Boot · Backend Development</span>
      <span data-field="whoamiStatus">🟢  Available for Internship</span>
      <span data-field="whoamiPassion">Building interactive apps with beautiful UI</span>
    </div>

    <!-- skills command output — groups pulled from content.html skills section above -->

    <!-- projects command output — entries pulled from content.html projects section above -->

    <!-- education command output — pulled from content.html education section above -->

    <!-- experience command output — pulled from content.html experience section above -->
  </section>

  <!-- ═══════════════════════════ DEV ROOM ════════════════════════════════ -->
  <!-- The 3D workspace section. Only the UI text is editable here;
       the Three.js scene, camera, lighting, and interactivity live in code. -->
  <section data-field="devRoom">
    <p data-field="devRoomSubtitle">A little 3D corner of where the code happens. Move your cursor to look around, and click on things.</p>
  </section>

</main>

<!--
  ═══════════════════════════════════════════════════════════════════════════
  STATUS: FULLY CONNECTED
  ═══════════════════════════════════════════════════════════════════════════
  All sections are now wired to this file via contentLoader.js (Vite ?raw
  import + DOMParser). Editing values here updates the live site after a
  rebuild. Sections connected:

    Hero            — name, designation, description, profileImage, resumeLink
    About           — aboutBody (+ education data attached to DOM)
    Skills          — categories + skill names
    Work            — project titles, descriptions, images, tech tags, links
    Achievements    — all stat cards (value, label, sub, colors)
    Certificates    — all cert cards (title, issuer, date, skills, colors)
    AcademicJourney — all semester cards (SGPA, CGPA, subjects, marksheet path)
    Clubs           — all club cards (name, role, duration, description, tags)
    Experience      — all timeline entries
    Globe           — location coords, label, readout, subtitle
    DevConsole      — whoami fields; skills/projects/education/experience
                      pulled live from their respective sections above
    DevRoom         — subtitle text
    Resume          — PDF path, download filename
    Contact         — email, LinkedIn URL + label, location, social links
    Footer          — owner name
    Navbar          — logo name
    Loader          — owner name
    Certificates    — mockup name
  ═══════════════════════════════════════════════════════════════════════════
-->

</body>
</html>
`,Ga=new DOMParser().parseFromString(Li,"text/html"),Jt=(i,e=Ga)=>e.querySelector(i)?.textContent?.trim()??"",Ws=(i,e,a=Ga)=>a.querySelector(i)?.getAttribute(e)??"",br=(i,e=Ga)=>Array.from(e.querySelectorAll(i)),vr=Jt('[data-field="name"] [data-field="fullName"]'),li=[{label:"Skills",id:"skills"},{label:"Work",id:"work"},{label:"Achievements",id:"achievements"},{label:"Certificates",id:"certificates"},{label:"Academics",id:"academic-journey"},{label:"Clubs",id:"clubs"},{label:"Experience",id:"experience"},{label:"Globe",id:"globe"},{label:"Console",id:"console"},{label:"Dev Room",id:"dev-room"},{label:"Resume",id:"resume"},{label:"Contact Me",id:"contact"}],yr=()=>u.jsxs("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",width:"18",height:"18",children:[u.jsx("circle",{cx:"12",cy:"12",r:"5"}),u.jsx("line",{x1:"12",y1:"1",x2:"12",y2:"3"}),u.jsx("line",{x1:"12",y1:"21",x2:"12",y2:"23"}),u.jsx("line",{x1:"4.22",y1:"4.22",x2:"5.64",y2:"5.64"}),u.jsx("line",{x1:"18.36",y1:"18.36",x2:"19.78",y2:"19.78"}),u.jsx("line",{x1:"1",y1:"12",x2:"3",y2:"12"}),u.jsx("line",{x1:"21",y1:"12",x2:"23",y2:"12"}),u.jsx("line",{x1:"4.22",y1:"19.78",x2:"5.64",y2:"18.36"}),u.jsx("line",{x1:"18.36",y1:"5.64",x2:"19.78",y2:"4.22"})]}),xr=()=>u.jsx("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",width:"18",height:"18",children:u.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"})}),wr=()=>{const[i,e]=k.useState(!1),[a,n]=k.useState(!1),[t,r]=k.useState(()=>typeof window<"u"&&localStorage.getItem("theme")||"dark");k.useEffect(()=>{const p=()=>e(window.scrollY>40);return window.addEventListener("scroll",p,{passive:!0}),()=>window.removeEventListener("scroll",p)},[]),k.useEffect(()=>{document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)},[t]),k.useEffect(()=>{const p=window.matchMedia("(min-width: 1025px)"),h=b=>{b.matches&&n(!1)};return p.addEventListener("change",h),()=>p.removeEventListener("change",h)},[]),k.useEffect(()=>(document.body.style.overflow=a?"hidden":"",()=>{document.body.style.overflow=""}),[a]);const l=()=>{r(p=>p==="dark"?"light":"dark")},s=p=>h=>{h.preventDefault(),n(!1);const b=document.getElementById(p);b&&b.scrollIntoView({behavior:"smooth",block:"start"})};return u.jsxs("nav",{className:`${Je.navbar} ${i?Je.navbarScrolled:""}`,children:[u.jsxs("div",{className:Je.navInner,children:[u.jsx("a",{href:"#hero",className:Je.logo,onClick:s("hero"),children:vr}),u.jsxs("div",{className:Je.navRight,children:[u.jsx("ul",{className:Je.navLinks,children:li.map(p=>u.jsx("li",{children:u.jsx("a",{href:`#${p.id}`,onClick:s(p.id),children:p.label})},p.id))}),u.jsx("button",{onClick:l,className:Je.themeToggle,"aria-label":`Switch to ${t==="dark"?"light":"dark"} theme`,children:t==="dark"?u.jsx(yr,{}):u.jsx(xr,{})}),u.jsxs("button",{onClick:()=>n(p=>!p),className:`${Je.menuToggle} ${a?Je.menuToggleOpen:""}`,"aria-label":a?"Close menu":"Open menu","aria-expanded":a,children:[u.jsx("span",{}),u.jsx("span",{}),u.jsx("span",{})]})]})]}),u.jsx("div",{className:`${Je.mobileMenu} ${a?Je.mobileMenuOpen:""}`,children:u.jsx("ul",{className:Je.mobileNavLinks,children:li.map(p=>u.jsx("li",{children:u.jsx("a",{href:`#${p.id}`,onClick:s(p.id),children:p.label})},p.id))})}),a&&u.jsx("div",{className:Je.mobileMenuBackdrop,onClick:()=>n(!1)})]})},kr=yn.memo(wr),Cr="_hero_1olns_8",Sr="_parallaxLayer_1olns_48",Tr="_heroContent_1olns_55",Er="_mobileHeroImageWrapper_1olns_62",Ir="_badge_1olns_67",Dr="_badgeDot_1olns_84",Rr="_subLine_1olns_111",Ar="_name_1olns_118",Mr="_welcome_1olns_126",Pr="_role_1olns_133",Or="_tags_1olns_139",Nr="_ctaGroup_1olns_147",Lr="_btnPrimary_1olns_152",jr="_btnSecondary_1olns_153",Fr="_scrollIndicator_1olns_186",zr="_scrollText_1olns_208",Hr="_scrollChevron_1olns_216",Br="_mobileHeroImage_1olns_62",be={hero:Cr,parallaxLayer:Sr,heroContent:Tr,mobileHeroImageWrapper:Er,badge:Ir,badgeDot:Dr,subLine:Rr,name:Ar,welcome:Mr,role:Pr,tags:Or,ctaGroup:Nr,btnPrimary:Lr,btnSecondary:jr,scrollIndicator:Fr,scrollText:zr,scrollChevron:Hr,mobileHeroImage:Br},Gr=i=>{const e=new DOMParser().parseFromString(i,"text/html"),a=t=>e.querySelector(t)?.textContent?.trim()??"",n=(t,r)=>e.querySelector(t)?.getAttribute(r)??"";return{name:a('[data-field="name"] [data-field="fullName"]'),designation:a('[data-field="name"] [data-field="tagline"]'),description:a('[data-field="heroContent"] [data-field="description"]'),profileImage:n('[data-field="heroContent"] [data-field="profileImage"]',"src"),resumeLink:n('[data-field="resume"] [data-field="resumePath"]',"href")}},En=Gr(Li),Wr=()=>{const i=k.useRef(null),e=k.useRef(null),a=k.useRef(null),n=k.useRef(null),t=k.useRef([]),r=k.useRef(null),l=k.useRef({x:0,y:0});k.useEffect(()=>{const p=n.current;if(!p)return;const h=p.getContext("2d"),b=Math.min(window.devicePixelRatio||1,2),x=()=>{const L=window.innerWidth,W=window.innerHeight;p.width=L*b,p.height=W*b,p.style.width=`${L}px`,p.style.height=`${W}px`,h.setTransform(b,0,0,b,0,0)};x(),window.addEventListener("resize",x,{passive:!0});const g=["rgba(139,92,246,","rgba(79,158,255,","rgba(167,139,250,"];class d{constructor(){this.reset(!0)}reset(W=!1){const w=window.innerWidth,he=window.innerHeight;this.x=Math.random()*w,this.y=W?Math.random()*he:he+20,this.r=Math.random()*3+1,this.glow=Math.random()*14+6,this.speedY=Math.random()*.4+.1,this.speedX=(Math.random()-.5)*.3,this.opacity=Math.random()*.7+.2,this.twinkle=Math.random()*.03+.01,this.phase=Math.random()*Math.PI*2,this.color=g[Math.floor(Math.random()*g.length)]}update(){this.y-=this.speedY,this.x+=this.speedX,this.phase+=this.twinkle,this.y<-20&&this.reset()}draw(){const W=this.opacity*((Math.sin(this.phase)+1)/2*.5+.5),w=h.createRadialGradient(this.x,this.y,0,this.x,this.y,this.glow);w.addColorStop(0,`${this.color}${W})`),w.addColorStop(1,`${this.color}0)`),h.beginPath(),h.arc(this.x,this.y,this.glow,0,Math.PI*2),h.fillStyle=w,h.fill(),h.beginPath(),h.arc(this.x,this.y,this.r,0,Math.PI*2),h.fillStyle=`${this.color}${Math.min(W*1.4,1)})`,h.fill()}}const v=window.innerWidth<768?40:80;t.current=Array.from({length:v},()=>new d);let G=!0;const F=new IntersectionObserver(([L])=>{G=L.isIntersecting},{threshold:0});e.current&&F.observe(e.current);const U=()=>{r.current=requestAnimationFrame(U),!(!G||document.hidden)&&(h.clearRect(0,0,window.innerWidth,window.innerHeight),t.current.forEach(L=>{L.update(),L.draw()}))};return U(),()=>{cancelAnimationFrame(r.current),window.removeEventListener("resize",x),F.disconnect()}},[]),k.useEffect(()=>{if(!a.current)return;const p=X.quickTo(a.current,"x",{duration:1.2,ease:"power2.out"}),h=X.quickTo(a.current,"y",{duration:1.2,ease:"power2.out"}),b=x=>{l.current.x=(x.clientX/window.innerWidth-.5)*2,l.current.y=(x.clientY/window.innerHeight-.5)*2,p(l.current.x*-18),h(l.current.y*-10)};return window.addEventListener("mousemove",b,{passive:!0}),()=>{window.removeEventListener("mousemove",b)}},[]),k.useEffect(()=>{i.current&&X.fromTo(i.current.children,{opacity:0,y:30},{opacity:1,y:0,duration:1,stagger:.15,ease:"power3.out",delay:.3})},[]);const s=p=>h=>{h.preventDefault(),document.getElementById(p)?.scrollIntoView({behavior:"smooth"})};return u.jsxs("section",{id:"hero",className:be.hero,ref:e,"data-profile-image":En.profileImage,"data-resume-link":En.resumeLink,children:[u.jsx("div",{ref:a,className:be.parallaxLayer,children:u.jsxs("div",{className:be.heroContent,ref:i,children:[u.jsx("div",{className:be.mobileHeroImageWrapper,children:u.jsx("img",{src:"/assets/images/hero-character.png",alt:"Developer character",className:be.mobileHeroImage})}),u.jsxs("div",{className:be.badge,children:[u.jsx("span",{className:be.badgeDot}),"Available for Internship"]}),u.jsx("h2",{className:be.subLine,children:"I'm"}),u.jsx("h1",{className:be.name,children:u.jsx("span",{className:"gradient-text",children:En.name})}),u.jsx("p",{className:be.welcome,children:"Welcome to my Portfolio"}),u.jsx("p",{className:be.role,children:En.designation}),u.jsx("p",{className:be.tags,children:En.description}),u.jsxs("div",{className:be.ctaGroup,children:[u.jsx("button",{className:be.btnPrimary,onClick:s("work"),children:"View My Work"}),u.jsx("button",{className:be.btnSecondary,onClick:s("contact"),children:"Contact Me"})]})]})}),u.jsxs("button",{className:be.scrollIndicator,onClick:s("about"),"aria-label":"Scroll down",children:[u.jsx("span",{className:be.scrollText,children:"Scroll Down"}),u.jsx("span",{className:be.scrollChevron,"aria-hidden":"true",children:u.jsx("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:u.jsx("path",{d:"M3 6l6 6 6-6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})})]})]})},Yr=yn.memo(Wr),Vr="_about_ctnfj_1",qr="_container_ctnfj_10",Ur="_leftCol_ctnfj_19",Xr="_rightCol_ctnfj_29",$r="_glassCard_ctnfj_34",Jr="_heading_ctnfj_46",Kr="_bodyText_ctnfj_51",Zr="_quoteWrapper_ctnfj_58",Qr="_quoteText_ctnfj_64",es="_quoteAuthor_ctnfj_79",mt={about:Vr,container:qr,leftCol:Ur,rightCol:Xr,glassCard:$r,heading:Jr,bodyText:Kr,quoteWrapper:Zr,quoteText:Qr,quoteAuthor:es};X.registerPlugin(R);const ts=Jt('[data-field="about"] [data-field="aboutBody"]'),ns=br('[data-list="education"] [data-item="education-entry"]').map(i=>({degree:Jt('[data-field="degree"]',i),school:Jt('[data-field="school"]',i),status:Jt('[data-field="status"]',i),years:Jt('[data-field="years"]',i),coursework:Array.from(i.querySelectorAll('[data-list="coursework"] [data-item="course"]')).map(e=>e.textContent.trim())})),as=()=>{const i=k.useRef(null);return k.useEffect(()=>{X.fromTo(i.current,{opacity:0,y:60},{opacity:1,y:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:i.current,start:"top 80%",toggleActions:"play none none reverse"}})},[]),u.jsx("section",{id:"about",className:mt.about,children:u.jsxs("div",{className:mt.container,children:[u.jsx("div",{className:mt.leftCol,children:u.jsxs("div",{className:mt.quoteWrapper,children:[u.jsx("blockquote",{className:mt.quoteText,children:'"Code. Learn. Improve. Repeat."'}),u.jsx("cite",{className:mt.quoteAuthor,children:"— Shreyansh Tiwari"})]})}),u.jsx("div",{className:mt.rightCol,children:u.jsxs("div",{className:mt.glassCard,ref:i,"data-education":JSON.stringify(ns),children:[u.jsxs("h2",{className:mt.heading,children:["About ",u.jsx("span",{className:"gradient-text",children:"Me"})]}),u.jsx("p",{className:mt.bodyText,children:ts})]})})]})})},is=yn.memo(as),rs="_canvasWrapper_14a6f_1",ss="_heroImage_14a6f_17",ci={canvasWrapper:rs,heroImage:ss},ji=k.forwardRef((i,e)=>u.jsx("div",{ref:e,className:ci.canvasWrapper,children:u.jsx("img",{src:"/assets/images/hero-character.png",alt:"Developer character",className:ci.heroImage})}));ji.displayName="Scene3D";const os=k.lazy(()=>qe(()=>import("./Skills-DVuvyRov.js"),__vite__mapDeps([0,1,2,3,4,5]))),ls=k.lazy(()=>qe(()=>import("./Work-CTZDbeTF.js"),__vite__mapDeps([6,1,2,3,4,7]))),cs=k.lazy(()=>qe(()=>import("./Experience-BQwv6jsJ.js"),__vite__mapDeps([8,1,2,3,4,9]))),ds=k.lazy(()=>qe(()=>import("./Globe-CuJzecgd.js"),__vite__mapDeps([10,1,2,3,4,11]))),us=k.lazy(()=>qe(()=>import("./Achievements-CsDb8uuV.js"),__vite__mapDeps([12,1,2,3,4,13]))),ps=k.lazy(()=>qe(()=>import("./Certificates-DlcWbZ74.js"),__vite__mapDeps([14,1,2,3,4,15]))),fs=k.lazy(()=>qe(()=>import("./Clubs-CKr0LtuH.js"),__vite__mapDeps([16,1,2,3,4,17]))),hs=k.lazy(()=>qe(()=>import("./AcademicJourney-D1zWP7_e.js"),__vite__mapDeps([18,1,2,3,4,19]))),ms=k.lazy(()=>qe(()=>import("./Resume-D4zr9dVK.js"),__vite__mapDeps([20,1,2,3,4,21]))),gs=k.lazy(()=>qe(()=>import("./DevConsole-DMB1F-Ao.js"),__vite__mapDeps([22,1,2,3,4,23]))),_s=k.lazy(()=>qe(()=>import("./DevRoom-Dkngly0o.js"),__vite__mapDeps([24,1,2,3,4,25]))),bs=k.lazy(()=>qe(()=>import("./Contact-zmP480Uj.js"),__vite__mapDeps([26,1,2,3,4,27]))),vs=k.lazy(()=>qe(()=>import("./Footer-DeQZ_HO8.js"),__vite__mapDeps([28,1,2,3,4,29]))),ys=k.lazy(()=>qe(()=>import("./AIAssistant-q51S_1YI.js"),__vite__mapDeps([30,1,2,31])));X.registerPlugin(R);const xs=()=>{const i=k.useRef(null);return k.useEffect(()=>{const e=()=>R.refresh(),a=new ResizeObserver(e);return a.observe(document.body),window.addEventListener("load",e),()=>{a.disconnect(),window.removeEventListener("load",e)}},[]),u.jsxs(u.Fragment,{children:[u.jsx(ji,{ref:i}),u.jsx(kr,{}),u.jsxs("main",{children:[u.jsx(Yr,{}),u.jsx(is,{}),u.jsxs(k.Suspense,{fallback:null,children:[u.jsx(os,{}),u.jsx(ls,{}),u.jsx(us,{}),u.jsx(ps,{}),u.jsx(hs,{}),u.jsx(fs,{}),u.jsx(cs,{}),u.jsx(ds,{}),u.jsx(gs,{}),u.jsx(_s,{}),u.jsx(ms,{}),u.jsx(bs,{})]})]}),u.jsx(k.Suspense,{fallback:null,children:u.jsx(vs,{})}),u.jsx(k.Suspense,{fallback:null,children:u.jsx(ys,{})})]})},ws=yn.memo(xs),ks="_overlay_1mx72_1",Cs="_content_1mx72_12",Ss="_name_1mx72_22",Ts="_status_1mx72_30",Es="_barTrack_1mx72_37",Is="_barFill_1mx72_46",dn={overlay:ks,content:Cs,name:Ss,status:Ts,barTrack:Es,barFill:Is},Ds=1600,di=Jt('[data-field="name"] [data-field="fullName"]'),Rs=({onComplete:i})=>{const[e,a]=k.useState(!0),n=k.useRef(null),t=k.useRef(null);return k.useEffect(()=>{const r=X.timeline({onComplete:()=>{a(!1),i&&i()}});return r.to(t.current,{width:"100%",duration:Ds/1e3,ease:"power2.inOut"}).to(n.current,{opacity:0,duration:.5,ease:"power2.out"}),()=>r.kill()},[i]),e?u.jsx("div",{className:dn.overlay,ref:n,children:u.jsxs("div",{className:dn.content,children:[u.jsxs("p",{className:dn.name,children:[di.split(" ").slice(0,-1).join(" ")," ",u.jsx("span",{className:"gradient-text",children:di.split(" ").slice(-1)[0]})]}),u.jsx("p",{className:dn.status,children:"Loading..."}),u.jsx("div",{className:dn.barTrack,children:u.jsx("div",{className:dn.barFill,ref:t})})]})}):null},As="_dot_r7omg_1",Ms="_ring_r7omg_2",Ps="_visible_r7omg_13",Os="_ringActive_r7omg_33",un={dot:As,ring:Ms,visible:Ps,ringActive:Os},ka='a, button, [role="button"], input, textarea, select, label, [data-cursor="interactive"]',Ns=()=>{const i=k.useRef(null),e=k.useRef(null),[a,n]=k.useState(!1),[t,r]=k.useState(!1);return k.useEffect(()=>{const l=window.matchMedia("(pointer: coarse)").matches,s=window.matchMedia("(hover: none)").matches,p="ontouchstart"in window||navigator.maxTouchPoints>0;if(l||s||p){n(!0);return}const h=i.current,b=e.current,x={x:window.innerWidth/2,y:window.innerHeight/2},g={x:window.innerWidth/2,y:window.innerHeight/2};X.set(h,{xPercent:-50,yPercent:-50}),X.set(b,{xPercent:-50,yPercent:-50});const d=X.quickTo(h,"x",{duration:.12,ease:"power3.out"}),v=X.quickTo(h,"y",{duration:.12,ease:"power3.out"}),G=X.quickTo(b,"x",{duration:.45,ease:"power3.out"}),F=X.quickTo(b,"y",{duration:.45,ease:"power3.out"}),U=m=>{g.x=m.clientX,g.y=m.clientY,x.x=m.clientX,x.y=m.clientY,d(g.x),v(g.y),G(x.x),F(x.y)},L=()=>{X.to(b,{scale:1.8,duration:.35,ease:"power3.out"}),X.to(h,{scale:.4,duration:.35,ease:"power3.out"}),b.classList.add(un.ringActive)},W=()=>{X.to(b,{scale:1,duration:.35,ease:"power3.out"}),X.to(h,{scale:1,duration:.35,ease:"power3.out"}),b.classList.remove(un.ringActive)},w=()=>{X.to(b,{scale:.85,duration:.2,ease:"power2.out"})},he=()=>{X.to(b,{scale:1,duration:.3,ease:"power2.out"})},Y=()=>{X.to([h,b],{opacity:0,duration:.25})},S=()=>{X.to([h,b],{opacity:1,duration:.25})},me=m=>{m.target.closest(ka)&&L()},xe=m=>{const Q=m.target.closest(ka),T=m.relatedTarget&&m.relatedTarget.closest?m.relatedTarget.closest(ka):null;Q&&!T&&W()};return window.addEventListener("mousemove",U,{passive:!0}),document.addEventListener("mouseover",me,{passive:!0}),document.addEventListener("mouseout",xe,{passive:!0}),window.addEventListener("mousedown",w,{passive:!0}),window.addEventListener("mouseup",he,{passive:!0}),document.addEventListener("mouseleave",Y,{passive:!0}),document.addEventListener("mouseenter",S,{passive:!0}),r(!0),()=>{window.removeEventListener("mousemove",U),document.removeEventListener("mouseover",me),document.removeEventListener("mouseout",xe),window.removeEventListener("mousedown",w),window.removeEventListener("mouseup",he),document.removeEventListener("mouseleave",Y),document.removeEventListener("mouseenter",S)}},[]),a?null:u.jsxs(u.Fragment,{children:[u.jsx("div",{className:`${un.ring} ${t?un.visible:""}`,ref:e}),u.jsx("div",{className:`${un.dot} ${t?un.visible:""}`,ref:i})]})},Ls=yn.memo(Ns);X.registerPlugin(R);const js=()=>{k.useEffect(()=>{const i=new zi({duration:1.25,easing:a=>Math.min(1,1.001-Math.pow(2,-10*a)),smoothWheel:!0,wheelMultiplier:1,touchMultiplier:1.2});i.on("scroll",R.update);const e=a=>{i.raf(a*1e3)};return X.ticker.add(e),X.ticker.lagSmoothing(0),()=>{X.ticker.remove(e),i.destroy()}},[])};function Fs(){const[i,e]=k.useState(!0);return js(),u.jsxs(u.Fragment,{children:[u.jsx(Ls,{}),i&&u.jsx(Rs,{onComplete:()=>e(!1)}),u.jsx(ws,{})]})}Fi.createRoot(document.getElementById("root")).render(u.jsx(yn.StrictMode,{children:u.jsx(Fs,{})}));export{R as S,Jt as a,Ws as b,br as g};
