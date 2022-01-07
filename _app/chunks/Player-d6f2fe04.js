var At=Object.defineProperty,Dt=Object.defineProperties;var Ct=Object.getOwnPropertyDescriptors;var st=Object.getOwnPropertySymbols;var It=Object.prototype.hasOwnProperty,Et=Object.prototype.propertyIsEnumerable;var nt=(i,t,e)=>t in i?At(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,v=(i,t)=>{for(var e in t||(t={}))It.call(t,e)&&nt(i,e,t[e]);if(st)for(var e of st(t))Et.call(t,e)&&nt(i,e,t[e]);return i},ot=(i,t)=>Dt(i,Ct(t));import{I as Tt,O as at,J as Ft,K as y,S as Pt,i as Rt,s as Mt,e as x,c as O,a as N,d as m,b,f as U,L as zt,M as ct,j as R,t as M,l as z,g as V,N as lt,P as f,p as Z,m as Vt,n as ht,o as Jt,h as X,Q as ut,R as dt,T as jt}from"./vendor-c53312c6.js";function Bt(){function i(e,r=2){for(e=e.toString();e.length<r;)e=`0${e}`;return e}const t=new Date;return`${i(t.getHours())}:${i(t.getMinutes())}:${i(t.getSeconds())}.${i(t.getMilliseconds(),3)}`}class J extends Tt{}function Ht(i){return Object.getPrototypeOf(i).constructor}function ft(i){return i*.062}const I=9,Wt=at;var S;(function(i){i[i.None=0]="None",i[i.Error=1]="Error",i[i.Warn=2]="Warn",i[i.Info=3]="Info",i[i.Debug=4]="Debug"})(S||(S={}));var gt;(function(i){i[i.LocalStorage=0]="LocalStorage",i[i.Server=1]="Server"})(gt||(gt={}));const mt=0;async function pt(i){switch(mt){case 1:{const t=await fetch(`/storage/${i}`);if(t.status===404)return null;if(t.ok===!1)throw new Error(`non-ok error code: ${t.status}`);return JSON.parse(await t.text())}case 0:return JSON.parse(localStorage.getItem(i))}}async function G(i,t){switch(mt){case 1:{const e=await fetch(`/storage/${i}`,{method:"PUT",body:JSON.stringify(t)});if(e.ok===!1)throw new Error(`non-ok error code: ${e.status}`);return}case 0:{localStorage.setItem(i,JSON.stringify(t));return}}}var _t;(function(i){i[i.None=0]="None",i[i.Error=1]="Error",i[i.Warn=2]="Warn",i[i.Info=3]="Info",i[i.Debug=4]="Debug"})(_t||(_t={}));var j;(function(i){i[i.None=0]="None",i[i.Normal=1]="Normal",i[i.Extreme=2]="Extreme"})(j||(j={}));var B;(function(i){i[i.None=0]="None",i[i.NonString=1]="NonString",i[i.All=2]="All"})(B||(B={}));var vt;(function(i){i[i.No=0]="No",i[i.Collapsed=1]="Collapsed",i[i.Open=2]="Open"})(vt||(vt={}));var yt;(function(i){i[i.Line=0]="Line",i[i.Braille=1]="Braille",i[i.Number=2]="Number",i[i.Wiggle=3]="Wiggle",i[i.Run=4]="Run"})(yt||(yt={}));const Q=new J;function Kt(i){return i(d),Q.on("update",i),()=>Q.removeListener("update",i)}const bt={configBuild:I,timestamp:0,video:{noSelect:!0},sound:{},input:{keys:{action1:"Mouse0",action2:"Mouse2",jump:"Space",moveBackwards:"KeyS",moveForwards:"KeyW",moveLeft:"KeyA",moveRight:"KeyD",pause:"Escape",use:"KeyE",debug:"F3",fullscreen:"F11",zoom:"KeyC",lookDown:"ArrowDown",lookLeft:"ArrowLeft",lookRight:"ArrowRight",lookUp:"ArrowUp",changePerspective:"F5"},camera:{mouseSensitivity:.001,keyboardSensitivity:2,touchSensitivity:5}},performance:{fixedTickerUndershoot:0,cache:1},debug:{logging:{level:1,double:0,interceptConsole:!1},stats:{show:0,spinner:1}}},Yt={8:i=>(i.cache=i==null?void 0:i.advanced.cache,delete i.advanced.cache,i),9:async i=>{await G(qt,i.configBackups),delete i.configBackups}},L="settings",qt="settings-backup";let d=bt;function Ut(){return Ft.defaultsDeep(d,bt)}function $(){d=Ut()}async function ie(){_("dbug","generating settings...");try{d=await pt(L),$(),d.timestamp=Date.now();const i=d.configBuild;if(i<I){_("dbug",`settings config is behind! got ${i} while we're at ${I}.`);for(let t=i+1;t<=I;t++){const e=Yt[t];typeof e=="function"&&(d=await e(d))}d.configBuild=I,_("dbug","updated settings for latest")}wt(),_("dbug","finished generating settings.")}catch(i){throw _("warn","error generating settings!",i),_("warn","backing up config and generating a new one..."),d===null&&$(),await G(`settings-backup-${Date.now()}`,await pt(L)),Zt(),new Error("Failed to generate settings! Your data has been backed up and then reset.")}}function wt(){Q.emit("update",d)}async function Zt(){_("dbug","saving settings..."),d===null&&$(),await G(L,d),wt(),_("dbug","done saving settings")}const A={};for(const i in console)if(Object.prototype.hasOwnProperty.call(console,i)){const t=console[i];A[i]=t}let xt=!1;function Xt(){if(xt===!0)return;function i(t,e){console[t]=(...r)=>_(e,...r)}i("debug","dbug"),i("log","info"),i("info","info"),i("warn","warn"),i("error","err!"),xt=!0}Kt(i=>{i.debug.logging.interceptConsole===!0&&Xt()});const Gt={dbug:{stringOutput:y.gray,type:y.gray,logger:A.debug,logLevel:S.Debug},info:{logger:A.log,logLevel:S.Info},warn:{type:y.yellow.inverse,stringOutput:y.yellow,logger:A.warn,logLevel:S.Warn},"err!":{type:y.red.inverse,stringOutput:y.red,logger:A.error,logLevel:S.Error}};function _(i,...t){const e=v({time:y.gray,stack:y.gray,type:s=>s,stringOutput:s=>s,logger:A.log},Gt[i]);if(d.debug.logging.level<e.logLevel)return;t=t.map(s=>typeof s=="string"?e.stringOutput(s):s),e.logger(`[${e.time(Bt())} ${e.type(i)}]`,...t);const r=d.debug.logging.double;if(r===B.All)e.logger();else if(r===B.NonString){let s=!1;for(const n of t)if(typeof n!="string"){s=!0;break}s===!0&&e.logger("")}}const Ot=globalThis;Ot.ug13Watch={};function tt(i,t){Ot.ug13Watch[i]=t}class Nt{constructor(t,e=!1){this._dirty={},this._alreadyDirty=!0,this._caches=t,this._overkill=e}get dirty(){return Object.freeze(v({},this._dirty))}get caches(){return Object.freeze(v({},this._caches))}dirtyAll(){if(this._alreadyDirty===!1)for(const t in this._dirty)Object.prototype.hasOwnProperty.call(this._dirty,t)&&(this._dirty[t]=!0)}isOverkill(t){return d.performance.cache!==j.Extreme?typeof this._overkill=="boolean"?this._overkill:this._overkill[t]===!0:!1}getDirty(t){return[!0,void 0].includes(this._dirty[t])}setDirty(t,e){return this._dirty[t]=e,e===!1&&(this._alreadyDirty=!1),e}getValue(t){return this._caches[t]}setValue(t,e){return this._caches[t]=e,e}do(t,e){return this.getDirty(t)||d.performance.cache===j.None||this.isOverkill(t)?this.setValue(t,e()):this.getValue(t)}}function Qt(i,t,e){const r=v({undershootMultiplier:0},e);let s=performance.now(),n=0;const o=()=>{let h=!0;const c=performance.now(),g=c-s;s=c,n+=g,i>0&&n+g*r.undershootMultiplier<i&&(h=!1),t(o,h?n:null),h===!0&&(n=0)};return o}var kt;(function(i){i[i.RequestAnimationFrame=0]="RequestAnimationFrame",i[i.SetInterval=1]="SetInterval",i[i.Manual=2]="Manual"})(kt||(kt={}));class re extends J{constructor(t){super();this._options={rate:0,method:1,maxDeltaTime:1/0,undershoot:0},this._active=!1,this._options=v(v({},this._options),t)}capDeltatime(t){return this._options.maxDeltaTime<t?this._options.maxDeltaTime:t}_emitTick(t){this.emit("tick",this.capDeltatime(t),t)}start(){if(!this.active){switch(this._active=!0,this._options.method){case 0:this._simpleTicker((t,e)=>{this._active===!0&&(requestAnimationFrame(t),e&&this._emitTick(e))})();break;case 1:{let t=performance.now();const e=setInterval(()=>{const r=performance.now(),s=r-t;t=r,this.active===!0?this._emitTick(s):clearInterval(e)},this._options.rate)}break;case 2:this.on("manualCallback",this._simpleTicker((t,e)=>{e&&this._emitTick(e)}));break}return this}}get active(){return this._active}manualCallback(){this.emit("manualCallback")}_simpleTicker(t,e){return Qt(this._options.rate,t,ot(v({},e),{undershootMultiplier:this._options.undershoot}))}stop(){return this._active=!1,this}}class H extends J{constructor(t,e=null){super();this.vectorHelper=et,this._axis=[],this._cache=new Nt({readonlyAxis:null,length:null}),this._initDim=null,this._initDim=e,this._axis=this.vectorHelper.arrayize(t,e)}get axis(){return this._cache.do("readonlyAxis",()=>[...this._axis])}get dimension(){return this._axis.length}set dimension(t){this.setDimension(t)}setDimension(t,e=0){if(this._initDim!==null)throw new Error("You can't change the dimension!");if(e===!0&&(e=this.dimension===1?this._axis[0]:0),t>this.dimension)for(let r=0;r<t;r++)this._axis[r]===void 0&&this._axis.push(e);else this._axis.length=t}clone(t=this._axis){return new(Ht(this))(t)}setAxis(t,e){return this._axis[t]=e,this._onAxisChange(t),this}getAxis(t){return this._axis[t]}get length(){return this._cache.do("length",()=>this.vectorHelper.distance(this.clone(0),this))}set length(t){this.setNormalized(),this.setMul(t)}normalized(){const t=this.clone(),e=this.length;return t.setDiv(e),t}setNormalized(){return this.clone(this.normalized())}_onAxisChange(t){this.emit("change",t),this._cache.dirtyAll()}set(t){return this._axis=this.vectorHelper.arrayize(t),this._onAxisChange(null),this}calc(t,e){return this.vectorHelper.calc(this,t,e)}add(t){return this.vectorHelper.add(this,t)}sub(t){return this.vectorHelper.sub(this,t)}mul(t){return this.vectorHelper.mul(this,t)}div(t){return this.vectorHelper.div(this,t)}setCalc(t,e){return this.set(this.vectorHelper.calc(this,t,e))}setAdd(t){return this.set(this.add(t))}setSub(t){return this.set(this.sub(t))}setMul(t){return this.set(this.mul(t))}setDiv(t){return this.set(this.div(t))}}class et{static arrayize(t,e){if(typeof t=="number"){const r=[t];if(e)for(let s=0;s<e-1;s++)r.push(t);return r}else return Array.isArray(t)?t:t?[...t.axis]:this.arrayize(0,e)}static distance(t,e){let r=0;const s=t.clone(),n=e.clone();s.dimension!==n.dimension&&(n.dimension=s.dimension);for(let o=0;o<s.axis.length;o++){const h=s.axis[o],c=n.axis[o];r+=(h-c)**2}return Math.sqrt(r)}static calc(t,e,r){const s=new H(t),n=new H(e),o=new H;n.dimension!==s.dimension&&n.setDimension(s.dimension,!0);for(let h=0;h<s.axis.length;h++){const c=s.axis[h],g=n.axis[h];o.setAxis(h,r(c,g))}return o}static add(t,e){return this.calc(t,e,(r,s)=>r+s)}static sub(t,e){return this.calc(t,e,(r,s)=>r-s)}static mul(t,e){return this.calc(t,e,(r,s)=>r*s)}static div(t,e){return this.calc(t,e,(r,s)=>r/s)}static axisNumberToString(t){switch(t){case 0:return"x";case 1:return"y";case 2:return"z";case 3:return"w";default:return t}}}class W extends H{constructor(t){super(t,3)}get x(){return this.getAxis(0)}set x(t){this.setAxis(0,t)}get y(){return this.getAxis(1)}set y(t){this.setAxis(1,t)}get z(){return this.getAxis(2)}set z(t){this.setAxis(2,t)}}function St(i){let t,e,r;return{c(){t=x("div"),this.h()},l(s){t=O(s,"DIV",{class:!0}),N(t).forEach(m),this.h()},h(){b(t,"class","cover svelte-a8lpo5")},m(s,n){U(s,t,n),r=!0},p(s,n){},i(s){r||(zt(()=>{e||(e=ct(t,dt,{duration:200,easing:ut},!0)),e.run(1)}),r=!0)},o(s){e||(e=ct(t,dt,{duration:200,easing:ut},!1)),e.run(0),r=!1},d(s){s&&m(t),s&&e&&e.end()}}}function Lt(i){let t,e,r,s,n,o,h,c,g,E,K,w,C=Math.floor(i[3]*100)+"",T,Y,F,p,l=i[0]===!0&&St();return{c(){l&&l.c(),t=R(),e=x("div"),r=x("div"),s=R(),n=x("div"),o=x("div"),h=M(i[2]),c=R(),g=x("div"),E=M(i[1]),K=R(),w=x("div"),T=M(C),Y=M("%"),this.h()},l(a){l&&l.l(a),t=z(a),e=O(a,"DIV",{class:!0});var u=N(e);r=O(u,"DIV",{class:!0,style:!0}),N(r).forEach(m),s=z(u),n=O(u,"DIV",{class:!0});var P=N(n);o=O(P,"DIV",{class:!0});var it=N(o);h=V(it,i[2]),it.forEach(m),c=z(P),g=O(P,"DIV",{class:!0});var rt=N(g);E=V(rt,i[1]),rt.forEach(m),P.forEach(m),K=z(u),w=O(u,"DIV",{class:!0});var q=N(w);T=V(q,C),Y=V(q,"%"),q.forEach(m),u.forEach(m),this.h()},h(){b(r,"class","bar-filling svelte-a8lpo5"),lt(r,"width",i[3]*100+"%"),b(o,"class","text"),b(g,"class","info svelte-a8lpo5"),b(n,"class","description svelte-a8lpo5"),b(w,"class","percent svelte-a8lpo5"),b(e,"class",F="bar "+(i[0]?"visible":"hidden")+" "+(i[4]?"error":"")+" svelte-a8lpo5")},m(a,u){l&&l.m(a,u),U(a,t,u),U(a,e,u),f(e,r),f(e,s),f(e,n),f(n,o),f(o,h),f(n,c),f(n,g),f(g,E),f(e,K),f(e,w),f(w,T),f(w,Y),p=!0},p(a,[u]){a[0]===!0?l?(l.p(a,u),u&1&&Z(l,1)):(l=St(),l.c(),Z(l,1),l.m(t.parentNode,t)):l&&(Vt(),ht(l,1,1,()=>{l=null}),Jt()),(!p||u&8)&&lt(r,"width",a[3]*100+"%"),(!p||u&4)&&X(h,a[2]),(!p||u&2)&&X(E,a[1]),(!p||u&8)&&C!==(C=Math.floor(a[3]*100)+"")&&X(T,C),(!p||u&17&&F!==(F="bar "+(a[0]?"visible":"hidden")+" "+(a[4]?"error":"")+" svelte-a8lpo5"))&&b(e,"class",F)},i(a){p||(Z(l),p=!0)},o(a){ht(l),p=!1},d(a){l&&l.d(a),a&&m(t),a&&m(e)}}}function $t(i,t,e){let{show:r=!0}=t,{info:s=""}=t,{title:n=""}=t,{percent:o=0}=t,{error:h=!1}=t;return i.$$set=c=>{"show"in c&&e(0,r=c.show),"info"in c&&e(1,s=c.info),"title"in c&&e(2,n=c.title),"percent"in c&&e(3,o=c.percent),"error"in c&&e(4,h=c.error)},[r,s,n,o,h]}class se extends Pt{constructor(t){super();Rt(this,t,$t,Lt,Mt,{show:0,info:1,title:2,percent:3,error:4})}}class k{constructor(t){this._parent=null,this._events=new J,this.position=new W,this.rotation=new W,this.velocity=new W,this._name="",this._rotationOrder="XYZ",this._cache=new Nt({children:null}),this._children=[],(t!=null?t:!1)?this.setFromJSON(k.thingableToJson(t)):this._rendererObject=new at,this._rendererObject.castShadow=!0,this._rendererObject.receiveShadow=!0,this.position.on("change",e=>{this._processVectorChange("position",e)}),this.rotation.on("change",e=>{this._processVectorChange("rotation",e)})}get rotationOrder(){return this._rotationOrder}set rotationOrder(t){this._rotationOrder=t,this._rendererObject.rotation.order=t}toString(){return`[Thing ${this.name}]`}get parent(){return this._parent}set parent(t){this.changeParent(t)}get name(){return this._name}set name(t){this._name=t,this._rendererObject.name=t}_processVectorChange(t,e){if(e===null){const s=this[t].axis;for(let n=0;n<s.length;n++){const o=et.axisNumberToString(n);this._rendererObject[t][o]=s[n]}}const r=et.axisNumberToString(e);this._rendererObject[t][r]=this[t][r]}get children(){return this._cache.do("children",()=>[...this._children])}get rendererObject(){return this._rendererObject}add(t){return this._children.push(t),this._rendererObject.add(t._rendererObject),this._cache.setDirty("children",!0),t.changeParent(this,!1),t}forEveryChild(t,e=!1){for(const r of this._children)t(r),e===!0&&r.forEveryChild(t,!0)}changeParent(t,e=!0){var r;e===!0&&((r=this.parent)==null||r.remove(this),t==null||t.add(this)),this._parent=t}remove(t){for(let e=0;e<this._children.length;e++)if(this._children[e]===t){this._children.splice(e,1);break}return t.changeParent(null,!1),this}getChildFromName(t){for(const e of this._children)if(e.name===t)return e;return null}static rendererObjectToJSON(t){return{name:t.name,position:t.position.toArray(),rotation:t.rotation.toArray(),rotationOrder:t.rotation.order,velocity:[0,0,0],rendererObject:t.clone(!1).toJSON(),children:t.children.map(e=>this.rendererObjectToJSON(e))}}toJSON(){const t={position:this.position.axis,rotation:this.rotation.axis,velocity:this.velocity.axis,rotationOrder:this.rotationOrder,name:this.name,children:this.children.map(e=>e.toJSON()),rendererObject:this._rendererObject.clone(!1).toJSON()};return this._events.emit("toJSON",t),t}setFromJSON(t){if(!Array.isArray(t)){this._rendererObject=new jt().parse(t.rendererObject),this.position.set(t.position),this.rotation.set(t.rotation),this.velocity.set(t.velocity),this.rotationOrder=t.rotationOrder,this.name=t.name;for(let e=0;e<this._children.length;e++){const r=this._children[e];this.remove(r)}for(let e=0;e<t.children.length;e++){const r=t.children[e];this.add(new k().setFromJSON(r))}}return this._events.emit("fromJSON",t),this}clone(){return new k(this)}static thingableToJson(t){return t instanceof k?t.toJSON():t instanceof Wt?k.rendererObjectToJSON(t):t}}class ne extends k{constructor(t,e,r,s,n){super(t);this.model=t,this.world=e,this.input=r,this.camera=s,this.game=n,this._perspective=D.FirstPerson,this.cameraRotation=new W,this.head=this.getChildFromName("").getChildFromName("robot").getChildFromName("head"),this.body=this.getChildFromName("").getChildFromName("robot").getChildFromName("body"),this.world.add(this),this.perspective=this._perspective,this._setupPlayerCamera(),this._subscribeToControls(),this.forEveryChild(o=>{o.rendererObject.castShadow=!0,o.rendererObject.receiveShadow=!0},!0)}_setupPlayerCamera(){this.camera.parent.rotationOrder="YXZ",this.camera.rotationOrder="YXZ",this.rotationOrder="YXZ"}get perspective(){return this._perspective}set perspective(t){switch(t){case D.FirstPerson:this.camera.parent=this.head,this.camera.position.set([0,ft(3),ft(-3)]),this.camera.rotation.set([0,0,0]);break;case D.ThirdPersonBack:this.camera.parent=this.head,this.camera.position.set([0,0,5]),this.camera.rotation.set([0,0,0]);break;case D.ThirdPersonFront:this.camera.parent=this.head,this.camera.position.set([0,0,-5]),this.camera.rotation.set([0,Math.PI,0]);break}this._perspective=t}_subscribeToControls(){this.input.on("changePerspective",t=>{t===!0&&(this.perspective=(this.perspective+1)%3)}),this.input.on("camera",t=>{const e=d.input.camera.mouseSensitivity,r=-t.movement.y*e,s=-t.movement.x*e;this.cameraRotation.x+=r,this.cameraRotation.y+=s,this.head.rotation.x=this.cameraRotation.x,this.head.rotation.y=this.cameraRotation.y;const n=this.head.rotation.y-this.body.rotation.y,o=Math.PI*.25;tt("doing",!1),tt("doing2",n),Math.abs(n)>=o&&(tt("doing",!0),this.body.rotation.y+=s)}),this.game.on("frameTick",t=>{const e=.01,r=Math.sin(this.cameraRotation.y%(Math.PI*2)),s=Math.cos(this.cameraRotation.y%(Math.PI*2)),n=Math.sin((this.cameraRotation.y+Math.PI*.5)%(Math.PI*2)),o=Math.cos((this.cameraRotation.y+Math.PI*.5)%(Math.PI*2));this.input.getInput("moveForwards")&&(this.position.x-=r*e*t,this.position.z-=s*e*t),this.input.getInput("moveBackwards")&&(this.position.x+=r*e*t,this.position.z+=s*e*t),this.input.getInput("moveLeft")&&(this.position.x-=n*e*t,this.position.z-=o*e*t),this.input.getInput("moveRight")&&(this.position.x+=n*e*t,this.position.z+=o*e*t)})}}var D;(function(i){i[i.FirstPerson=0]="FirstPerson",i[i.ThirdPersonBack=1]="ThirdPersonBack",i[i.ThirdPersonFront=2]="ThirdPersonFront"})(D||(D={}));export{Nt as C,se as L,ne as P,yt as S,J as T,H as V,re as a,kt as b,d as c,Kt as d,k as e,G as f,ie as g,vt as h,_ as l,Zt as s,wt as u};
