!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("pdfjs-dist/build/pdf.worker",[],t):"object"==typeof exports?exports["pdfjs-dist/build/pdf.worker"]=t():e["pdfjs-dist/build/pdf.worker"]=e.pdfjsWorker=t()}(this,function(){return function(e){var t={}
function r(a){if(t[a])return t[a].exports
var i=t[a]={i:a,l:!1,exports:{}}
return e[a].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e
if(4&t&&"object"==typeof e&&e&&e.__esModule)return e
var a=Object.create(null)
if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(a,i,function(t){return e[t]}.bind(null,i))
return a},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict"
var a=r(1)
t.WorkerMessageHandler=a.WorkerMessageHandler},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.WorkerMessageHandler=t.WorkerTask=void 0
var a=l(r(2)),i=r(6),n=r(151),o=l(r(9)),s=r(189),c=r(155)
function l(e){return e&&e.__esModule?e:{default:e}}function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],a=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function f(e,t,r,a,i,n,o){try{var s=e[n](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(a,i)}var d=function(){function e(e){this.name=e,this.terminated=!1,this._capability=(0,i.createPromiseCapability)()}return e.prototype={get finished(){return this._capability.promise},finish:function(){this._capability.resolve()},terminate:function(){this.terminated=!0},ensureNotTerminated:function(){if(this.terminated)throw new Error("Worker task was terminated")}},e}()
t.WorkerTask=d
var g,m=function(){function e(e){this._msgHandler=e,this._contentLength=null,this._fullRequestReader=null,this._rangeRequestReaders=[]}function t(e){var t=this
this._msgHandler=e,this._contentLength=null,this._isRangeSupported=!1,this._isStreamingSupported=!1
var r=this._msgHandler.sendWithStream("GetReader")
this._reader=r.getReader(),this._headersReady=this._msgHandler.sendWithPromise("ReaderHeadersReady").then(function(e){t._isStreamingSupported=e.isStreamingSupported,t._isRangeSupported=e.isRangeSupported,t._contentLength=e.contentLength})}function r(e,t,r){this._msgHandler=r,this.onProgress=null
var a=this._msgHandler.sendWithStream("GetRangeReader",{begin:e,end:t})
this._reader=a.getReader()}return e.prototype={getFullReader:function(){return(0,i.assert)(!this._fullRequestReader),this._fullRequestReader=new t(this._msgHandler),this._fullRequestReader},getRangeReader:function(e,t){var a=new r(e,t,this._msgHandler)
return this._rangeRequestReaders.push(a),a},cancelAllRequests:function(e){this._fullRequestReader&&this._fullRequestReader.cancel(e),this._rangeRequestReaders.slice(0).forEach(function(t){t.cancel(e)})}},t.prototype={get headersReady(){return this._headersReady},get contentLength(){return this._contentLength},get isStreamingSupported(){return this._isStreamingSupported},get isRangeSupported(){return this._isRangeSupported},read:function(){return this._reader.read().then(function(e){var t=e.value
return e.done?{value:void 0,done:!0}:{value:t.buffer,done:!1}})},cancel:function(e){this._reader.cancel(e)}},r.prototype={get isStreamingSupported(){return!1},read:function(){return this._reader.read().then(function(e){var t=e.value
return e.done?{value:void 0,done:!0}:{value:t.buffer,done:!1}})},cancel:function(e){this._reader.cancel(e)}},e}(),p={setup:function(e,t){var r=!1
e.on("test",function(t){if(!r)if(r=!0,t instanceof Uint8Array){var a=255===t[0]
e.postMessageTransfers=a
var i=new XMLHttpRequest,n="response"in i
try{i.responseType}catch(e){n=!1}n?e.send("test",{supportTypedArray:!0,supportTransfers:a}):e.send("test",!1)}else e.send("test",!1)}),e.on("configure",function(e){(0,i.setVerbosityLevel)(e.verbosity)}),e.on("GetDocRequest",function(e){return p.createDocumentHandler(e,t)})},createDocumentHandler:function(e,t){var r,o=!1,l=null,g=[],p=e.apiVersion
if("2.1.266"!==p)throw new Error('The API version "'.concat(p,'" does not match ')+'the Worker version "'.concat("2.1.266",'".'))
var v=e.docId,b=e.docBaseUrl,y=e.docId+"_worker",w=new s.MessageHandler(y,v,t)
function k(){if(o)throw new Error("Worker was terminated")}function S(e){g.push(e)}function C(e){e.finish()
var t=g.indexOf(e)
g.splice(t,1)}function x(e){return function(){var e
return(e=a.default.mark(function e(t){var i,n,o,s
return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,r.ensureDoc("checkHeader")
case 2:return e.next=4,r.ensureDoc("parseStartXRef")
case 4:return e.next=6,r.ensureDoc("parse",[t])
case 6:if(t){e.next=9
break}return e.next=9,r.ensureDoc("checkFirstPage")
case 9:return e.next=11,Promise.all([r.ensureDoc("numPages"),r.ensureDoc("fingerprint")])
case 11:return i=e.sent,n=h(i,2),o=n[0],s=n[1],e.abrupt("return",{numPages:o,fingerprint:s})
case 16:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var n=e.apply(t,r)
function o(e){f(n,a,i,o,s,"next",e)}function s(e){f(n,a,i,o,s,"throw",e)}o(void 0)})}).apply(this,arguments)}.apply(this,arguments)}function A(e,t){var r,a=(0,i.createPromiseCapability)(),o=e.source
if(o.data){try{r=new n.LocalPdfManager(v,o.data,o.password,t,b),a.resolve(r)}catch(e){a.reject(e)}return a.promise}var s,c=[]
try{s=new m(w)}catch(e){return a.reject(e),a.promise}var u=s.getFullReader()
u.headersReady.then(function(){if(u.isRangeSupported){var e=o.disableAutoFetch||u.isStreamingSupported
r=new n.NetworkPdfManager(v,s,{msgHandler:w,password:o.password,length:u.contentLength,disableAutoFetch:e,rangeChunkSize:o.rangeChunkSize},t,b)
for(var i=0;i<c.length;i++)r.sendProgressiveData(c[i])
c=[],a.resolve(r),l=null}}).catch(function(e){a.reject(e),l=null})
var h=0
return new Promise(function(e,s){u.read().then(function e(f){try{if(k(),f.done)return r||function(){var e=(0,i.arraysToBytes)(c)
o.length&&e.length!==o.length&&(0,i.warn)("reported HTTP length is different from actual")
try{r=new n.LocalPdfManager(v,e,o.password,t,b),a.resolve(r)}catch(e){a.reject(e)}c=[]}(),void(l=null)
var d=f.value
h+=(0,i.arrayByteLength)(d),u.isStreamingSupported||w.send("DocProgress",{loaded:h,total:Math.max(h,u.contentLength||0)}),r?r.sendProgressiveData(d):c.push(d),u.read().then(e,s)}catch(e){s(e)}},s)}).catch(function(e){a.reject(e),l=null}),l=function(){s.cancelAllRequests("abort")},a.promise}return w.postMessageTransfers=e.postMessageTransfers,w.on("GetPage",function(e){return r.getPage(e.pageIndex).then(function(e){return Promise.all([r.ensure(e,"rotate"),r.ensure(e,"ref"),r.ensure(e,"userUnit"),r.ensure(e,"view")]).then(function(e){var t=h(e,4)
return{rotate:t[0],ref:t[1],userUnit:t[2],view:t[3]}})})}),w.on("GetPageIndex",function(e){var t=new c.Ref(e.ref.num,e.ref.gen)
return r.pdfDocument.catalog.getPageIndex(t)}),w.on("GetDestinations",function(e){return r.ensureCatalog("destinations")}),w.on("GetDestination",function(e){return r.ensureCatalog("getDestination",[e.id])}),w.on("GetPageLabels",function(e){return r.ensureCatalog("pageLabels")}),w.on("GetPageMode",function(e){return r.ensureCatalog("pageMode")}),w.on("getOpenActionDestination",function(e){return r.ensureCatalog("openActionDestination")}),w.on("GetAttachments",function(e){return r.ensureCatalog("attachments")}),w.on("GetJavaScript",function(e){return r.ensureCatalog("javaScript")}),w.on("GetOutline",function(e){return r.ensureCatalog("documentOutline")}),w.on("GetPermissions",function(e){return r.ensureCatalog("permissions")}),w.on("GetMetadata",function(e){return Promise.all([r.ensureDoc("documentInfo"),r.ensureCatalog("metadata")])}),w.on("GetData",function(e){return r.requestLoadedStream(),r.onLoadedStream().then(function(e){return e.bytes})}),w.on("GetStats",function(e){return r.pdfDocument.xref.stats}),w.on("GetAnnotations",function(e){var t=e.pageIndex,a=e.intent
return r.getPage(t).then(function(e){return e.getAnnotationsData(a)})}),w.on("RenderPageRequest",function(e){var t=e.pageIndex
r.getPage(t).then(function(r){var a=new d("RenderPageRequest: page "+t)
S(a)
var n=t+1,o=Date.now()
r.getOperatorList({handler:w,task:a,intent:e.intent,renderInteractiveForms:e.renderInteractiveForms}).then(function(e){C(a),(0,i.info)("page="+n+" - getOperatorList: time="+(Date.now()-o)+"ms, len="+e.totalLength)},function(t){if(C(a),!a.terminated){w.send("UnsupportedFeature",{featureId:i.UNSUPPORTED_FEATURES.unknown})
var r,o="worker.js: while trying to getPage() and getOperatorList()"
r="string"==typeof t?{message:t,stack:o}:"object"===u(t)?{message:t.message||t.toString(),stack:t.stack||o}:{message:"Unknown exception type: "+u(t),stack:o},w.send("PageError",{pageNum:n,error:r,intent:e.intent})}})})},this),w.on("GetTextContent",function(e,t){var a=e.pageIndex
t.onPull=function(e){},t.onCancel=function(e){},r.getPage(a).then(function(r){var n=new d("GetTextContent: page "+a)
S(n)
var o=a+1,s=Date.now()
r.extractTextContent({handler:w,task:n,sink:t,normalizeWhitespace:e.normalizeWhitespace,combineTextItems:e.combineTextItems}).then(function(){C(n),(0,i.info)("text indexing: page="+o+" - time="+(Date.now()-s)+"ms"),t.close()},function(e){if(C(n),!n.terminated)throw t.error(e),e})})}),w.on("FontFallback",function(e){return r.fontFallback(e.id,w)}),w.on("Cleanup",function(e){return r.cleanup()}),w.on("Terminate",function(e){o=!0,r&&(r.terminate(),r=null),l&&l()
var t=[]
return g.forEach(function(e){t.push(e.finished),e.terminate()}),Promise.all(t).then(function(){w.destroy(),w=null})}),w.on("Ready",function(t){!function(e){function t(e){k(),w.send("GetDoc",{pdfInfo:e})}function a(e){if(k(),e instanceof i.PasswordException){var t=new d("PasswordException: response "+e.code)
S(t),w.sendWithPromise("PasswordRequest",e).then(function(e){C(t),r.updatePassword(e.password),n()}).catch(function(e){C(t),w.send("PasswordException",e)}.bind(null,e))}else e instanceof i.InvalidPDFException?w.send("InvalidPDF",e):e instanceof i.MissingPDFException?w.send("MissingPDF",e):e instanceof i.UnexpectedResponseException?w.send("UnexpectedResponse",e):w.send("UnknownError",new i.UnknownErrorException(e.message,e.toString()))}function n(){k(),x(!1).then(t,function(e){k(),e instanceof i.XRefParseException?(r.requestLoadedStream(),r.onLoadedStream().then(function(){k(),x(!0).then(t,a)})):a(e)},a)}k(),A(e,{forceDataSchema:e.disableCreateObjectURL,maxImageSize:e.maxImageSize,disableFontFace:e.disableFontFace,nativeImageDecoderSupport:e.nativeImageDecoderSupport,ignoreErrors:e.ignoreErrors,isEvalSupported:e.isEvalSupported}).then(function(e){if(o)throw e.terminate(),new Error("Worker was terminated");(r=e).onLoadedStream().then(function(e){w.send("DataLoaded",{length:e.bytes.byteLength})})}).then(n,a)}(e),e=null}),y},initializeFromPort:function(e){var t=new s.MessageHandler("worker","main",e)
p.setup(t,e),t.send("ready",null)}}
t.WorkerMessageHandler=p,"undefined"==typeof window&&!(0,o.default)()&&"undefined"!=typeof self&&"function"==typeof(g=self).postMessage&&"onmessage"in g&&p.initializeFromPort(self)},function(e,t,r){"use strict"
e.exports=r(3)},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=function(){return this||"object"===("undefined"==typeof self?"undefined":a(self))&&self}()||Function("return this")(),n=i.regeneratorRuntime&&Object.getOwnPropertyNames(i).indexOf("regeneratorRuntime")>=0,o=n&&i.regeneratorRuntime
if(i.regeneratorRuntime=void 0,e.exports=r(4),n)i.regeneratorRuntime=o
else try{delete i.regeneratorRuntime}catch(e){i.regeneratorRuntime=void 0}},function(e,t,r){"use strict";(function(e){function t(e){return(t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(r){var a,i=Object.prototype,n=i.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},s=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",l=o.toStringTag||"@@toStringTag",u="object"===t(e),h=r.regeneratorRuntime
if(h)u&&(e.exports=h)
else{(h=r.regeneratorRuntime=u?e.exports:{}).wrap=k
var f="suspendedStart",d="suspendedYield",g="executing",m="completed",p={},v={}
v[s]=function(){return this}
var b=Object.getPrototypeOf,y=b&&b(b(F([])))
y&&y!==i&&n.call(y,s)&&(v=y)
var w=A.prototype=C.prototype=Object.create(v)
x.prototype=w.constructor=A,A.constructor=x,A[l]=x.displayName="GeneratorFunction",h.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor
return!!t&&(t===x||"GeneratorFunction"===(t.displayName||t.name))},h.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,A):(e.__proto__=A,l in e||(e[l]="GeneratorFunction")),e.prototype=Object.create(w),e},h.awrap=function(e){return{__await:e}},_(P.prototype),P.prototype[c]=function(){return this},h.AsyncIterator=P,h.async=function(e,t,r,a){var i=new P(k(e,t,r,a))
return h.isGeneratorFunction(t)?i:i.next().then(function(e){return e.done?e.value:i.next()})},_(w),w[l]="Generator",w[s]=function(){return this},w.toString=function(){return"[object Generator]"},h.keys=function(e){var t=[]
for(var r in e)t.push(r)
return t.reverse(),function r(){for(;t.length;){var a=t.pop()
if(a in e)return r.value=a,r.done=!1,r}return r.done=!0,r}},h.values=F,T.prototype={constructor:T,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=a,this.done=!1,this.delegate=null,this.method="next",this.arg=a,this.tryEntries.forEach(E),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=a)},stop:function(){this.done=!0
var e=this.tryEntries[0].completion
if("throw"===e.type)throw e.arg
return this.rval},dispatchException:function(e){if(this.done)throw e
var t=this
function r(r,i){return s.type="throw",s.arg=e,t.next=r,i&&(t.method="next",t.arg=a),!!i}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion
if("root"===o.tryLoc)return r("end")
if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),l=n.call(o,"finallyLoc")
if(c&&l){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)
if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally")
if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r]
if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a
break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null)
var o=i?i.completion:{}
return o.type=e,o.arg=t,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(o)},complete:function(e,t){if("throw"===e.type)throw e.arg
return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t]
if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),E(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t]
if(r.tryLoc===e){var a=r.completion
if("throw"===a.type){var i=a.arg
E(r)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:F(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=a),p}}}function k(e,t,r,a){var i=t&&t.prototype instanceof C?t:C,n=Object.create(i.prototype),o=new T(a||[])
return n._invoke=function(e,t,r){var a=f
return function(i,n){if(a===g)throw new Error("Generator is already running")
if(a===m){if("throw"===i)throw n
return R()}for(r.method=i,r.arg=n;;){var o=r.delegate
if(o){var s=I(o,r)
if(s){if(s===p)continue
return s}}if("next"===r.method)r.sent=r._sent=r.arg
else if("throw"===r.method){if(a===f)throw a=m,r.arg
r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg)
a=g
var c=S(e,t,r)
if("normal"===c.type){if(a=r.done?m:d,c.arg===p)continue
return{value:c.arg,done:r.done}}"throw"===c.type&&(a=m,r.method="throw",r.arg=c.arg)}}}(e,r,o),n}function S(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}function C(){}function x(){}function A(){}function _(e){["next","throw","return"].forEach(function(t){e[t]=function(e){return this._invoke(t,e)}})}function P(e){var r
this._invoke=function(a,i){function o(){return new Promise(function(r,o){!function r(a,i,o,s){var c=S(e[a],e,i)
if("throw"!==c.type){var l=c.arg,u=l.value
return u&&"object"===t(u)&&n.call(u,"__await")?Promise.resolve(u.__await).then(function(e){r("next",e,o,s)},function(e){r("throw",e,o,s)}):Promise.resolve(u).then(function(e){l.value=e,o(l)},function(e){return r("throw",e,o,s)})}s(c.arg)}(a,i,r,o)})}return r=r?r.then(o,o):o()}}function I(e,t){var r=e.iterator[t.method]
if(r===a){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=a,I(e,t),"throw"===t.method))return p
t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=S(r,e.iterator,t.arg)
if("throw"===i.type)return t.method="throw",t.arg=i.arg,t.delegate=null,p
var n=i.arg
return n?n.done?(t[e.resultName]=n.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=a),t.delegate=null,p):n:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,p)}function O(e){var t={tryLoc:e[0]}
1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function E(e){var t=e.completion||{}
t.type="normal",delete t.arg,e.completion=t}function T(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function F(e){if(e){var t=e[s]
if(t)return t.call(e)
if("function"==typeof e.next)return e
if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t
return t.value=a,t.done=!0,t}
return i.next=i}}return{next:R}}function R(){return{value:a,done:!0}}}(function(){return this||"object"===("undefined"==typeof self?"undefined":t(self))&&self}()||Function("return this")())}).call(this,r(5)(e))},function(e,t,r){"use strict"
e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.toRomanNumerals=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1]
u(Number.isInteger(e)&&e>0,"The number should be a positive integer.")
for(var r,a=[];e>=1e3;)e-=1e3,a.push("M")
r=e/100|0,e%=100,a.push(_[r]),r=e/10|0,e%=10,a.push(_[10+r]),a.push(_[20+e])
var i=a.join("")
return t?i.toLowerCase():i},t.arrayByteLength=C,t.arraysToBytes=function(e){if(1===e.length&&e[0]instanceof Uint8Array)return e[0]
var t,r,a,i=0,n=e.length
for(t=0;t<n;t++)i+=a=C(r=e[t])
var o=0,s=new Uint8Array(i)
for(t=0;t<n;t++)(r=e[t])instanceof Uint8Array||(r="string"==typeof r?S(r):new Uint8Array(r)),a=r.byteLength,s.set(r,o),o+=a
return s},t.assert=u,t.bytesToString=function(e){u(null!==e&&"object"===n(e)&&void 0!==e.length,"Invalid argument for bytesToString")
var t=e.length
if(t<8192)return String.fromCharCode.apply(null,e)
for(var r=[],a=0;a<t;a+=8192){var i=Math.min(a+8192,t),o=e.subarray(a,i)
r.push(String.fromCharCode.apply(null,o))}return r.join("")},t.createPromiseCapability=function(){var e=Object.create(null),t=!1
return Object.defineProperty(e,"settled",{get:function(){return t}}),e.promise=new Promise(function(r,a){e.resolve=function(e){t=!0,r(e)},e.reject=function(e){t=!0,a(e)}}),e},t.deprecated=function(e){console.log("Deprecated API usage: "+e)},t.getInheritableProperty=function(e){for(var t,r=e.dict,a=e.key,i=e.getArray,n=void 0!==i&&i,o=e.stopWhenFound,s=void 0===o||o,l=0;r;){var u=n?r.getArray(a):r.get(a)
if(void 0!==u){if(s)return u
t||(t=[]),t.push(u)}if(++l>100){c('getInheritableProperty: maximum loop count exceeded for "'.concat(a,'"'))
break}r=r.get("Parent")}return t},t.getLookupTableFactory=function(e){var t
return function(){return e&&(t=Object.create(null),e(t),e=null),t}},t.getVerbosityLevel=function(){return s},t.info=function(e){s>=o.INFOS&&console.log("Info: "+e)},t.isArrayBuffer=function(e){return"object"===n(e)&&null!==e&&void 0!==e.byteLength},t.isBool=function(e){return"boolean"==typeof e},t.isEmptyObj=function(e){for(var t in e)return!1
return!0},t.isNum=function(e){return"number"==typeof e},t.isString=function(e){return"string"==typeof e},t.isSpace=function(e){return 32===e||9===e||13===e||10===e},t.isSameOrigin=function(e,t){try{var r=new i.URL(e)
if(!r.origin||"null"===r.origin)return!1}catch(e){return!1}var a=new i.URL(t,r)
return r.origin===a.origin},t.createValidAbsoluteUrl=function(e,t){if(!e)return null
try{var r=t?new i.URL(e,t):new i.URL(e)
if(function(e){if(!r)return!1
switch(r.protocol){case"http:":case"https:":case"ftp:":case"mailto:":case"tel:":return!0
default:return!1}}())return r}catch(e){}return null},t.isLittleEndian=function(){var e=new Uint8Array(4)
return e[0]=1,1===new Uint32Array(e.buffer,0,1)[0]},t.isEvalSupported=function(){try{return new Function(""),!0}catch(e){return!1}},t.log2=function(e){return e<=0?0:Math.ceil(Math.log2(e))},t.readInt8=function(e,t){return e[t]<<24>>24},t.readUint16=function(e,t){return e[t]<<8|e[t+1]},t.readUint32=function(e,t){return(e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3])>>>0},t.removeNullCharacters=function(e){return"string"!=typeof e?(c("The argument for removeNullCharacters must be a string."),e):e.replace(k,"")},t.setVerbosityLevel=function(e){Number.isInteger(e)&&(s=e)},t.shadow=function(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!1}),r},t.string32=function(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,255&e)}
t.stringToBytes=S,t.stringToPDFString=function(e){var t,r=e.length,a=[]
if("þ"===e[0]&&"ÿ"===e[1])for(t=2;t<r;t+=2)a.push(String.fromCharCode(e.charCodeAt(t)<<8|e.charCodeAt(t+1)))
else for(t=0;t<r;++t){var i=P[e.charCodeAt(t)]
a.push(i?String.fromCharCode(i):e.charAt(t))}return a.join("")},t.stringToUTF8String=function(e){return decodeURIComponent(escape(e))},t.utf8StringToString=function(e){return unescape(encodeURIComponent(e))},t.warn=c,t.unreachable=l,Object.defineProperty(t,"ReadableStream",{enumerable:!0,get:function(){return a.ReadableStream}}),Object.defineProperty(t,"URL",{enumerable:!0,get:function(){return i.URL}}),t.createObjectURL=t.FormatError=t.XRefParseException=t.XRefEntryException=t.Util=t.UnknownErrorException=t.UnexpectedResponseException=t.TextRenderingMode=t.StreamType=t.PermissionFlag=t.PasswordResponses=t.PasswordException=t.NativeImageDecoding=t.MissingPDFException=t.MissingDataException=t.InvalidPDFException=t.AbortException=t.CMapCompressionType=t.ImageKind=t.FontType=t.AnnotationType=t.AnnotationFlag=t.AnnotationFieldFlag=t.AnnotationBorderStyleType=t.UNSUPPORTED_FEATURES=t.VerbosityLevel=t.OPS=t.IDENTITY_MATRIX=t.FONT_IDENTITY_MATRIX=void 0,r(7)
var a=r(147),i=r(149)
function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}t.IDENTITY_MATRIX=[1,0,0,1,0,0],t.FONT_IDENTITY_MATRIX=[.001,0,0,.001,0,0],t.NativeImageDecoding={NONE:"none",DECODE:"decode",DISPLAY:"display"},t.PermissionFlag={PRINT:4,MODIFY_CONTENTS:8,COPY:16,MODIFY_ANNOTATIONS:32,FILL_INTERACTIVE_FORMS:256,COPY_FOR_ACCESSIBILITY:512,ASSEMBLE:1024,PRINT_HIGH_QUALITY:2048},t.TextRenderingMode={FILL:0,STROKE:1,FILL_STROKE:2,INVISIBLE:3,FILL_ADD_TO_PATH:4,STROKE_ADD_TO_PATH:5,FILL_STROKE_ADD_TO_PATH:6,ADD_TO_PATH:7,FILL_STROKE_MASK:3,ADD_TO_PATH_FLAG:4},t.ImageKind={GRAYSCALE_1BPP:1,RGB_24BPP:2,RGBA_32BPP:3},t.AnnotationType={TEXT:1,LINK:2,FREETEXT:3,LINE:4,SQUARE:5,CIRCLE:6,POLYGON:7,POLYLINE:8,HIGHLIGHT:9,UNDERLINE:10,SQUIGGLY:11,STRIKEOUT:12,STAMP:13,CARET:14,INK:15,POPUP:16,FILEATTACHMENT:17,SOUND:18,MOVIE:19,WIDGET:20,SCREEN:21,PRINTERMARK:22,TRAPNET:23,WATERMARK:24,THREED:25,REDACT:26},t.AnnotationFlag={INVISIBLE:1,HIDDEN:2,PRINT:4,NOZOOM:8,NOROTATE:16,NOVIEW:32,READONLY:64,LOCKED:128,TOGGLENOVIEW:256,LOCKEDCONTENTS:512},t.AnnotationFieldFlag={READONLY:1,REQUIRED:2,NOEXPORT:4,MULTILINE:4096,PASSWORD:8192,NOTOGGLETOOFF:16384,RADIO:32768,PUSHBUTTON:65536,COMBO:131072,EDIT:262144,SORT:524288,FILESELECT:1048576,MULTISELECT:2097152,DONOTSPELLCHECK:4194304,DONOTSCROLL:8388608,COMB:16777216,RICHTEXT:33554432,RADIOSINUNISON:33554432,COMMITONSELCHANGE:67108864},t.AnnotationBorderStyleType={SOLID:1,DASHED:2,BEVELED:3,INSET:4,UNDERLINE:5},t.StreamType={UNKNOWN:0,FLATE:1,LZW:2,DCT:3,JPX:4,JBIG:5,A85:6,AHX:7,CCF:8,RL:9},t.FontType={UNKNOWN:0,TYPE1:1,TYPE1C:2,CIDFONTTYPE0:3,CIDFONTTYPE0C:4,TRUETYPE:5,CIDFONTTYPE2:6,TYPE3:7,OPENTYPE:8,TYPE0:9,MMTYPE1:10}
var o={ERRORS:0,WARNINGS:1,INFOS:5}
t.VerbosityLevel=o,t.CMapCompressionType={NONE:0,BINARY:1,STREAM:2},t.OPS={dependency:1,setLineWidth:2,setLineCap:3,setLineJoin:4,setMiterLimit:5,setDash:6,setRenderingIntent:7,setFlatness:8,setGState:9,save:10,restore:11,transform:12,moveTo:13,lineTo:14,curveTo:15,curveTo2:16,curveTo3:17,closePath:18,rectangle:19,stroke:20,closeStroke:21,fill:22,eoFill:23,fillStroke:24,eoFillStroke:25,closeFillStroke:26,closeEOFillStroke:27,endPath:28,clip:29,eoClip:30,beginText:31,endText:32,setCharSpacing:33,setWordSpacing:34,setHScale:35,setLeading:36,setFont:37,setTextRenderingMode:38,setTextRise:39,moveText:40,setLeadingMoveText:41,setTextMatrix:42,nextLine:43,showText:44,showSpacedText:45,nextLineShowText:46,nextLineSetSpacingShowText:47,setCharWidth:48,setCharWidthAndBounds:49,setStrokeColorSpace:50,setFillColorSpace:51,setStrokeColor:52,setStrokeColorN:53,setFillColor:54,setFillColorN:55,setStrokeGray:56,setFillGray:57,setStrokeRGBColor:58,setFillRGBColor:59,setStrokeCMYKColor:60,setFillCMYKColor:61,shadingFill:62,beginInlineImage:63,beginImageData:64,endInlineImage:65,paintXObject:66,markPoint:67,markPointProps:68,beginMarkedContent:69,beginMarkedContentProps:70,endMarkedContent:71,beginCompat:72,endCompat:73,paintFormXObjectBegin:74,paintFormXObjectEnd:75,beginGroup:76,endGroup:77,beginAnnotations:78,endAnnotations:79,beginAnnotation:80,endAnnotation:81,paintJpegXObject:82,paintImageMaskXObject:83,paintImageMaskXObjectGroup:84,paintImageXObject:85,paintInlineImageXObject:86,paintInlineImageXObjectGroup:87,paintImageXObjectRepeat:88,paintImageMaskXObjectRepeat:89,paintSolidColorImageMask:90,constructPath:91},t.UNSUPPORTED_FEATURES={unknown:"unknown",forms:"forms",javaScript:"javaScript",smask:"smask",shadingPattern:"shadingPattern",font:"font"},t.PasswordResponses={NEED_PASSWORD:1,INCORRECT_PASSWORD:2}
var s=o.WARNINGS
function c(e){s>=o.WARNINGS&&console.log("Warning: "+e)}function l(e){throw new Error(e)}function u(e,t){e||l(t)}var h=function(){function e(e,t){this.name="PasswordException",this.message=e,this.code=t}return e.prototype=new Error,e.constructor=e,e}()
t.PasswordException=h
var f=function(){function e(e,t){this.name="UnknownErrorException",this.message=e,this.details=t}return e.prototype=new Error,e.constructor=e,e}()
t.UnknownErrorException=f
var d=function(){function e(e){this.name="InvalidPDFException",this.message=e}return e.prototype=new Error,e.constructor=e,e}()
t.InvalidPDFException=d
var g=function(){function e(e){this.name="MissingPDFException",this.message=e}return e.prototype=new Error,e.constructor=e,e}()
t.MissingPDFException=g
var m=function(){function e(e,t){this.name="UnexpectedResponseException",this.message=e,this.status=t}return e.prototype=new Error,e.constructor=e,e}()
t.UnexpectedResponseException=m
var p=function(){function e(e,t){this.begin=e,this.end=t,this.message="Missing data ["+e+", "+t+")"}return e.prototype=new Error,e.prototype.name="MissingDataException",e.constructor=e,e}()
t.MissingDataException=p
var v=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="XRefEntryException",e.constructor=e,e}()
t.XRefEntryException=v
var b=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="XRefParseException",e.constructor=e,e}()
t.XRefParseException=b
var y=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="FormatError",e.constructor=e,e}()
t.FormatError=y
var w=function(){function e(e){this.name="AbortException",this.message=e}return e.prototype=new Error,e.constructor=e,e}()
t.AbortException=w
var k=/\x00/g
function S(e){u("string"==typeof e,"Invalid argument for stringToBytes")
for(var t=e.length,r=new Uint8Array(t),a=0;a<t;++a)r[a]=255&e.charCodeAt(a)
return r}function C(e){return void 0!==e.length?e.length:(u(void 0!==e.byteLength),e.byteLength)}var x=function(){function e(){}var t=["rgb(",0,",",0,",",0,")"]
return e.makeCssRgb=function(e,r,a){return t[1]=e,t[3]=r,t[5]=a,t.join("")},e.transform=function(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]},e.applyTransform=function(e,t){return[e[0]*t[0]+e[1]*t[2]+t[4],e[0]*t[1]+e[1]*t[3]+t[5]]},e.applyInverseTransform=function(e,t){var r=t[0]*t[3]-t[1]*t[2]
return[(e[0]*t[3]-e[1]*t[2]+t[2]*t[5]-t[4]*t[3])/r,(-e[0]*t[1]+e[1]*t[0]+t[4]*t[1]-t[5]*t[0])/r]},e.getAxialAlignedBoundingBox=function(t,r){var a=e.applyTransform(t,r),i=e.applyTransform(t.slice(2,4),r),n=e.applyTransform([t[0],t[3]],r),o=e.applyTransform([t[2],t[1]],r)
return[Math.min(a[0],i[0],n[0],o[0]),Math.min(a[1],i[1],n[1],o[1]),Math.max(a[0],i[0],n[0],o[0]),Math.max(a[1],i[1],n[1],o[1])]},e.inverseTransform=function(e){var t=e[0]*e[3]-e[1]*e[2]
return[e[3]/t,-e[1]/t,-e[2]/t,e[0]/t,(e[2]*e[5]-e[4]*e[3])/t,(e[4]*e[1]-e[5]*e[0])/t]},e.apply3dTransform=function(e,t){return[e[0]*t[0]+e[1]*t[1]+e[2]*t[2],e[3]*t[0]+e[4]*t[1]+e[5]*t[2],e[6]*t[0]+e[7]*t[1]+e[8]*t[2]]},e.singularValueDecompose2dScale=function(e){var t=[e[0],e[2],e[1],e[3]],r=e[0]*t[0]+e[1]*t[2],a=e[0]*t[1]+e[1]*t[3],i=e[2]*t[0]+e[3]*t[2],n=e[2]*t[1]+e[3]*t[3],o=(r+n)/2,s=Math.sqrt((r+n)*(r+n)-4*(r*n-i*a))/2,c=o+s||1,l=o-s||1
return[Math.sqrt(c),Math.sqrt(l)]},e.normalizeRect=function(e){var t=e.slice(0)
return e[0]>e[2]&&(t[0]=e[2],t[2]=e[0]),e[1]>e[3]&&(t[1]=e[3],t[3]=e[1]),t},e.intersect=function(t,r){function a(e,t){return e-t}var i=[t[0],t[2],r[0],r[2]].sort(a),n=[t[1],t[3],r[1],r[3]].sort(a),o=[]
return t=e.normalizeRect(t),r=e.normalizeRect(r),(i[0]===t[0]&&i[1]===r[0]||i[0]===r[0]&&i[1]===t[0])&&(o[0]=i[1],o[2]=i[2],(n[0]===t[1]&&n[1]===r[1]||n[0]===r[1]&&n[1]===t[1])&&(o[1]=n[1],o[3]=n[2],o))},e}()
t.Util=x
var A,_=["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM","","X","XX","XXX","XL","L","LX","LXX","LXXX","XC","","I","II","III","IV","V","VI","VII","VIII","IX"],P=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,728,711,710,729,733,731,730,732,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8226,8224,8225,8230,8212,8211,402,8260,8249,8250,8722,8240,8222,8220,8221,8216,8217,8218,8482,64257,64258,321,338,352,376,381,305,322,339,353,382,0,8364],I=(A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",function(e,t){if(!(arguments.length>2&&void 0!==arguments[2]&&arguments[2])&&i.URL.createObjectURL){var r=new Blob([e],{type:t})
return i.URL.createObjectURL(r)}for(var a="data:"+t+";base64,",n=0,o=e.length;n<o;n+=3){var s=255&e[n],c=255&e[n+1],l=255&e[n+2]
a+=A[s>>2]+A[(3&s)<<4|c>>4]+A[n+1<o?(15&c)<<2|l>>6:64]+A[n+2<o?63&l:64]}return a})
t.createObjectURL=I},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=r(8)
if(!i._pdfjsCompatibilityChecked){i._pdfjsCompatibilityChecked=!0
var n=r(9),o="object"===("undefined"==typeof window?"undefined":a(window))&&"object"===("undefined"==typeof document?"undefined":a(document))
!i.btoa&&n()&&(i.btoa=function(e){return Buffer.from(e,"binary").toString("base64")}),!i.atob&&n()&&(i.atob=function(e){return Buffer.from(e,"base64").toString("binary")}),o&&void 0===Element.prototype.remove&&(Element.prototype.remove=function(){this.parentNode&&this.parentNode.removeChild(this)}),function(){if(o&&!n()){var e=document.createElement("div")
if(e.classList.add("testOne","testTwo"),!0!==e.classList.contains("testOne")||!0!==e.classList.contains("testTwo")){var t=DOMTokenList.prototype.add,r=DOMTokenList.prototype.remove
DOMTokenList.prototype.add=function(){for(var e=arguments.length,r=new Array(e),a=0;a<e;a++)r[a]=arguments[a]
for(var i=0;i<r.length;i++){var n=r[i]
t.call(this,n)}},DOMTokenList.prototype.remove=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a]
for(var i=0;i<t.length;i++){var n=t[i]
r.call(this,n)}}}}}(),o&&!n()&&!1!==document.createElement("div").classList.toggle("test",0)&&(DOMTokenList.prototype.toggle=function(e){var t=arguments.length>1?!!arguments[1]:!this.contains(e)
return this[t?"add":"remove"](e),t}),String.prototype.startsWith||r(10),String.prototype.endsWith||r(40),String.prototype.includes||r(42),Array.prototype.includes||r(44),Array.from||r(51),Object.assign||r(74),Math.log2||(Math.log2=r(79)),Number.isNaN||(Number.isNaN=r(81)),Number.isInteger||(Number.isInteger=r(83)),i.Promise&&i.Promise.prototype&&i.Promise.prototype.finally||(i.Promise=r(86)),i.WeakMap||(i.WeakMap=r(106)),i.WeakSet||(i.WeakSet=r(123)),String.codePointAt||(String.codePointAt=r(127)),String.fromCodePoint||(String.fromCodePoint=r(129)),i.Symbol||r(131),String.prototype.padStart||r(138),String.prototype.padEnd||r(142),Object.values||(Object.values=r(144))}},function(e,t,r){"use strict"
e.exports="undefined"!=typeof window&&window.Math===Math?window:"undefined"!=typeof global&&global.Math===Math?global:"undefined"!=typeof self&&self.Math===Math?self:{}},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports=function(){return"object"===("undefined"==typeof process?"undefined":a(process))&&process+""=="[object process]"&&!process.versions.nw}},function(e,t,r){"use strict"
r(11),e.exports=r(14).String.startsWith},function(e,t,r){"use strict"
var a=r(12),i=r(30),n=r(32),o="".startsWith
a(a.P+a.F*r(39)("startsWith"),"String",{startsWith:function(e){var t=n(this,e,"startsWith"),r=i(Math.min(arguments.length>1?arguments[1]:void 0,t.length)),a=String(e)
return o?o.call(t,a,r):t.slice(r,r+a.length)===a}})},function(e,t,r){"use strict"
var a=r(13),i=r(14),n=r(15),o=r(25),s=r(28),c=function e(t,r,c){var l,u,h,f,d=t&e.F,g=t&e.G,m=t&e.P,p=t&e.B,v=g?a:t&e.S?a[r]||(a[r]={}):(a[r]||{}).prototype,b=g?i:i[r]||(i[r]={}),y=b.prototype||(b.prototype={})
for(l in g&&(c=r),c)h=((u=!d&&v&&void 0!==v[l])?v:c)[l],f=p&&u?s(h,a):m&&"function"==typeof h?s(Function.call,h):h,v&&o(v,l,h,t&e.U),b[l]!=h&&n(b,l,f),m&&y[l]!=h&&(y[l]=h)}
a.core=i,c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},function(e,t,r){"use strict"
var a=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")()
"number"==typeof __g&&(__g=a)},function(e,t,r){"use strict"
var a=e.exports={version:"2.6.2"}
"number"==typeof __e&&(__e=a)},function(e,t,r){"use strict"
var a=r(16),i=r(24)
e.exports=r(20)?function(e,t,r){return a.f(e,t,i(1,r))}:function(e,t,r){return e[t]=r,e}},function(e,t,r){"use strict"
var a=r(17),i=r(19),n=r(23),o=Object.defineProperty
t.f=r(20)?Object.defineProperty:function(e,t,r){if(a(e),t=n(t,!0),a(r),i)try{return o(e,t,r)}catch(e){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!")
return"value"in r&&(e[t]=r.value),e}},function(e,t,r){"use strict"
var a=r(18)
e.exports=function(e){if(!a(e))throw TypeError(e+" is not an object!")
return e}},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}e.exports=function(e){return"object"===a(e)?null!==e:"function"==typeof e}},function(e,t,r){"use strict"
e.exports=!r(20)&&!r(21)(function(){return 7!=Object.defineProperty(r(22)("div"),"a",{get:function(){return 7}}).a})},function(e,t,r){"use strict"
e.exports=!r(21)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(e,t,r){"use strict"
e.exports=function(e){try{return!!e()}catch(e){return!0}}},function(e,t,r){"use strict"
var a=r(18),i=r(13).document,n=a(i)&&a(i.createElement)
e.exports=function(e){return n?i.createElement(e):{}}},function(e,t,r){"use strict"
var a=r(18)
e.exports=function(e,t){if(!a(e))return e
var r,i
if(t&&"function"==typeof(r=e.toString)&&!a(i=r.call(e)))return i
if("function"==typeof(r=e.valueOf)&&!a(i=r.call(e)))return i
if(!t&&"function"==typeof(r=e.toString)&&!a(i=r.call(e)))return i
throw TypeError("Can't convert object to primitive value")}},function(e,t,r){"use strict"
e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},function(e,t,r){"use strict"
var a=r(13),i=r(15),n=r(26),o=r(27)("src"),s=Function.toString,c=(""+s).split("toString")
r(14).inspectSource=function(e){return s.call(e)},(e.exports=function(e,t,r,s){var l="function"==typeof r
l&&(n(r,"name")||i(r,"name",t)),e[t]!==r&&(l&&(n(r,o)||i(r,o,e[t]?""+e[t]:c.join(String(t)))),e===a?e[t]=r:s?e[t]?e[t]=r:i(e,t,r):(delete e[t],i(e,t,r)))})(Function.prototype,"toString",function(){return"function"==typeof this&&this[o]||s.call(this)})},function(e,t,r){"use strict"
var a={}.hasOwnProperty
e.exports=function(e,t){return a.call(e,t)}},function(e,t,r){"use strict"
var a=0,i=Math.random()
e.exports=function(e){return"Symbol(".concat(void 0===e?"":e,")_",(++a+i).toString(36))}},function(e,t,r){"use strict"
var a=r(29)
e.exports=function(e,t,r){if(a(e),void 0===t)return e
switch(r){case 1:return function(r){return e.call(t,r)}
case 2:return function(r,a){return e.call(t,r,a)}
case 3:return function(r,a,i){return e.call(t,r,a,i)}}return function(){return e.apply(t,arguments)}}},function(e,t,r){"use strict"
e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!")
return e}},function(e,t,r){"use strict"
var a=r(31),i=Math.min
e.exports=function(e){return e>0?i(a(e),9007199254740991):0}},function(e,t,r){"use strict"
var a=Math.ceil,i=Math.floor
e.exports=function(e){return isNaN(e=+e)?0:(e>0?i:a)(e)}},function(e,t,r){"use strict"
var a=r(33),i=r(38)
e.exports=function(e,t,r){if(a(t))throw TypeError("String#"+r+" doesn't accept regex!")
return String(i(e))}},function(e,t,r){"use strict"
var a=r(18),i=r(34),n=r(35)("match")
e.exports=function(e){var t
return a(e)&&(void 0!==(t=e[n])?!!t:"RegExp"==i(e))}},function(e,t,r){"use strict"
var a={}.toString
e.exports=function(e){return a.call(e).slice(8,-1)}},function(e,t,r){"use strict"
var a=r(36)("wks"),i=r(27),n=r(13).Symbol,o="function"==typeof n;(e.exports=function(e){return a[e]||(a[e]=o&&n[e]||(o?n:i)("Symbol."+e))}).store=a},function(e,t,r){"use strict"
var a=r(14),i=r(13),n=i["__core-js_shared__"]||(i["__core-js_shared__"]={});(e.exports=function(e,t){return n[e]||(n[e]=void 0!==t?t:{})})("versions",[]).push({version:a.version,mode:r(37)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(e,t,r){"use strict"
e.exports=!1},function(e,t,r){"use strict"
e.exports=function(e){if(null==e)throw TypeError("Can't call method on  "+e)
return e}},function(e,t,r){"use strict"
var a=r(35)("match")
e.exports=function(e){var t=/./
try{"/./"[e](t)}catch(r){try{return t[a]=!1,!"/./"[e](t)}catch(e){}}return!0}},function(e,t,r){"use strict"
r(41),e.exports=r(14).String.endsWith},function(e,t,r){"use strict"
var a=r(12),i=r(30),n=r(32),o="".endsWith
a(a.P+a.F*r(39)("endsWith"),"String",{endsWith:function(e){var t=n(this,e,"endsWith"),r=arguments.length>1?arguments[1]:void 0,a=i(t.length),s=void 0===r?a:Math.min(i(r),a),c=String(e)
return o?o.call(t,c,s):t.slice(s-c.length,s)===c}})},function(e,t,r){"use strict"
r(43),e.exports=r(14).String.includes},function(e,t,r){"use strict"
var a=r(12),i=r(32)
a(a.P+a.F*r(39)("includes"),"String",{includes:function(e){return!!~i(this,e,"includes").indexOf(e,arguments.length>1?arguments[1]:void 0)}})},function(e,t,r){"use strict"
r(45),e.exports=r(14).Array.includes},function(e,t,r){"use strict"
var a=r(12),i=r(46)(!0)
a(a.P,"Array",{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r(50)("includes")},function(e,t,r){"use strict"
var a=r(47),i=r(30),n=r(49)
e.exports=function(e){return function(t,r,o){var s,c=a(t),l=i(c.length),u=n(o,l)
if(e&&r!=r){for(;l>u;)if((s=c[u++])!=s)return!0}else for(;l>u;u++)if((e||u in c)&&c[u]===r)return e||u||0
return!e&&-1}}},function(e,t,r){"use strict"
var a=r(48),i=r(38)
e.exports=function(e){return a(i(e))}},function(e,t,r){"use strict"
var a=r(34)
e.exports=Object("z").propertyIsEnumerable(0)?Object:function(e){return"String"==a(e)?e.split(""):Object(e)}},function(e,t,r){"use strict"
var a=r(31),i=Math.max,n=Math.min
e.exports=function(e,t){return(e=a(e))<0?i(e+t,0):n(e,t)}},function(e,t,r){"use strict"
var a=r(35)("unscopables"),i=Array.prototype
null==i[a]&&r(15)(i,a,{}),e.exports=function(e){i[a][e]=!0}},function(e,t,r){"use strict"
r(52),r(67),e.exports=r(14).Array.from},function(e,t,r){"use strict"
var a=r(53)(!0)
r(54)(String,"String",function(e){this._t=String(e),this._i=0},function(){var e,t=this._t,r=this._i
return r>=t.length?{value:void 0,done:!0}:(e=a(t,r),this._i+=e.length,{value:e,done:!1})})},function(e,t,r){"use strict"
var a=r(31),i=r(38)
e.exports=function(e){return function(t,r){var n,o,s=String(i(t)),c=a(r),l=s.length
return c<0||c>=l?e?"":void 0:(n=s.charCodeAt(c))<55296||n>56319||c+1===l||(o=s.charCodeAt(c+1))<56320||o>57343?e?s.charAt(c):n:e?s.slice(c,c+2):o-56320+(n-55296<<10)+65536}}},function(e,t,r){"use strict"
var a=r(37),i=r(12),n=r(25),o=r(15),s=r(55),c=r(56),l=r(64),u=r(65),h=r(35)("iterator"),f=!([].keys&&"next"in[].keys()),d=function(){return this}
e.exports=function(e,t,r,g,m,p,v){c(r,t,g)
var b,y,w,k=function(e){if(!f&&e in A)return A[e]
switch(e){case"keys":case"values":return function(){return new r(this,e)}}return function(){return new r(this,e)}},S=t+" Iterator",C="values"==m,x=!1,A=e.prototype,_=A[h]||A["@@iterator"]||m&&A[m],P=_||k(m),I=m?C?k("entries"):P:void 0,O="Array"==t&&A.entries||_
if(O&&(w=u(O.call(new e)))!==Object.prototype&&w.next&&(l(w,S,!0),a||"function"==typeof w[h]||o(w,h,d)),C&&_&&"values"!==_.name&&(x=!0,P=function(){return _.call(this)}),a&&!v||!f&&!x&&A[h]||o(A,h,P),s[t]=P,s[S]=d,m)if(b={values:C?P:k("values"),keys:p?P:k("keys"),entries:I},v)for(y in b)y in A||n(A,y,b[y])
else i(i.P+i.F*(f||x),t,b)
return b}},function(e,t,r){"use strict"
e.exports={}},function(e,t,r){"use strict"
var a=r(57),i=r(24),n=r(64),o={}
r(15)(o,r(35)("iterator"),function(){return this}),e.exports=function(e,t,r){e.prototype=a(o,{next:i(1,r)}),n(e,t+" Iterator")}},function(e,t,r){"use strict"
var a=r(17),i=r(58),n=r(62),o=r(61)("IE_PROTO"),s=function(){},c=function(){var e,t=r(22)("iframe"),a=n.length
for(t.style.display="none",r(63).appendChild(t),t.src="javascript:",(e=t.contentWindow.document).open(),e.write("<script>document.F=Object<\/script>"),e.close(),c=e.F;a--;)delete c.prototype[n[a]]
return c()}
e.exports=Object.create||function(e,t){var r
return null!==e?(s.prototype=a(e),r=new s,s.prototype=null,r[o]=e):r=c(),void 0===t?r:i(r,t)}},function(e,t,r){"use strict"
var a=r(16),i=r(17),n=r(59)
e.exports=r(20)?Object.defineProperties:function(e,t){i(e)
for(var r,o=n(t),s=o.length,c=0;s>c;)a.f(e,r=o[c++],t[r])
return e}},function(e,t,r){"use strict"
var a=r(60),i=r(62)
e.exports=Object.keys||function(e){return a(e,i)}},function(e,t,r){"use strict"
var a=r(26),i=r(47),n=r(46)(!1),o=r(61)("IE_PROTO")
e.exports=function(e,t){var r,s=i(e),c=0,l=[]
for(r in s)r!=o&&a(s,r)&&l.push(r)
for(;t.length>c;)a(s,r=t[c++])&&(~n(l,r)||l.push(r))
return l}},function(e,t,r){"use strict"
var a=r(36)("keys"),i=r(27)
e.exports=function(e){return a[e]||(a[e]=i(e))}},function(e,t,r){"use strict"
e.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(e,t,r){"use strict"
var a=r(13).document
e.exports=a&&a.documentElement},function(e,t,r){"use strict"
var a=r(16).f,i=r(26),n=r(35)("toStringTag")
e.exports=function(e,t,r){e&&!i(e=r?e:e.prototype,n)&&a(e,n,{configurable:!0,value:t})}},function(e,t,r){"use strict"
var a=r(26),i=r(66),n=r(61)("IE_PROTO"),o=Object.prototype
e.exports=Object.getPrototypeOf||function(e){return e=i(e),a(e,n)?e[n]:"function"==typeof e.constructor&&e instanceof e.constructor?e.constructor.prototype:e instanceof Object?o:null}},function(e,t,r){"use strict"
var a=r(38)
e.exports=function(e){return Object(a(e))}},function(e,t,r){"use strict"
var a=r(28),i=r(12),n=r(66),o=r(68),s=r(69),c=r(30),l=r(70),u=r(71)
i(i.S+i.F*!r(73)(function(e){Array.from(e)}),"Array",{from:function(e){var t,r,i,h,f=n(e),d="function"==typeof this?this:Array,g=arguments.length,m=g>1?arguments[1]:void 0,p=void 0!==m,v=0,b=u(f)
if(p&&(m=a(m,g>2?arguments[2]:void 0,2)),null==b||d==Array&&s(b))for(r=new d(t=c(f.length));t>v;v++)l(r,v,p?m(f[v],v):f[v])
else for(h=b.call(f),r=new d;!(i=h.next()).done;v++)l(r,v,p?o(h,m,[i.value,v],!0):i.value)
return r.length=v,r}})},function(e,t,r){"use strict"
var a=r(17)
e.exports=function(e,t,r,i){try{return i?t(a(r)[0],r[1]):t(r)}catch(t){var n=e.return
throw void 0!==n&&a(n.call(e)),t}}},function(e,t,r){"use strict"
var a=r(55),i=r(35)("iterator"),n=Array.prototype
e.exports=function(e){return void 0!==e&&(a.Array===e||n[i]===e)}},function(e,t,r){"use strict"
var a=r(16),i=r(24)
e.exports=function(e,t,r){t in e?a.f(e,t,i(0,r)):e[t]=r}},function(e,t,r){"use strict"
var a=r(72),i=r(35)("iterator"),n=r(55)
e.exports=r(14).getIteratorMethod=function(e){if(null!=e)return e[i]||e["@@iterator"]||n[a(e)]}},function(e,t,r){"use strict"
var a=r(34),i=r(35)("toStringTag"),n="Arguments"==a(function(){return arguments}())
e.exports=function(e){var t,r,o
return void 0===e?"Undefined":null===e?"Null":"string"==typeof(r=function(e,t){try{return e[t]}catch(e){}}(t=Object(e),i))?r:n?a(t):"Object"==(o=a(t))&&"function"==typeof t.callee?"Arguments":o}},function(e,t,r){"use strict"
var a=r(35)("iterator"),i=!1
try{var n=[7][a]()
n.return=function(){i=!0},Array.from(n,function(){throw 2})}catch(e){}e.exports=function(e,t){if(!t&&!i)return!1
var r=!1
try{var n=[7],o=n[a]()
o.next=function(){return{done:r=!0}},n[a]=function(){return o},e(n)}catch(e){}return r}},function(e,t,r){"use strict"
r(75),e.exports=r(14).Object.assign},function(e,t,r){"use strict"
var a=r(12)
a(a.S+a.F,"Object",{assign:r(76)})},function(e,t,r){"use strict"
var a=r(59),i=r(77),n=r(78),o=r(66),s=r(48),c=Object.assign
e.exports=!c||r(21)(function(){var e={},t={},r=Symbol(),a="abcdefghijklmnopqrst"
return e[r]=7,a.split("").forEach(function(e){t[e]=e}),7!=c({},e)[r]||Object.keys(c({},t)).join("")!=a})?function(e,t){for(var r=o(e),c=arguments.length,l=1,u=i.f,h=n.f;c>l;)for(var f,d=s(arguments[l++]),g=u?a(d).concat(u(d)):a(d),m=g.length,p=0;m>p;)h.call(d,f=g[p++])&&(r[f]=d[f])
return r}:c},function(e,t,r){"use strict"
t.f=Object.getOwnPropertySymbols},function(e,t,r){"use strict"
t.f={}.propertyIsEnumerable},function(e,t,r){"use strict"
r(80),e.exports=r(14).Math.log2},function(e,t,r){"use strict"
var a=r(12)
a(a.S,"Math",{log2:function(e){return Math.log(e)/Math.LN2}})},function(e,t,r){"use strict"
r(82),e.exports=r(14).Number.isNaN},function(e,t,r){"use strict"
var a=r(12)
a(a.S,"Number",{isNaN:function(e){return e!=e}})},function(e,t,r){"use strict"
r(84),e.exports=r(14).Number.isInteger},function(e,t,r){"use strict"
var a=r(12)
a(a.S,"Number",{isInteger:r(85)})},function(e,t,r){"use strict"
var a=r(18),i=Math.floor
e.exports=function(e){return!a(e)&&isFinite(e)&&i(e)===e}},function(e,t,r){"use strict"
r(87),r(52),r(88),r(91),r(104),r(105),e.exports=r(14).Promise},function(e,t,r){"use strict"
var a=r(72),i={}
i[r(35)("toStringTag")]="z",i+""!="[object z]"&&r(25)(Object.prototype,"toString",function(){return"[object "+a(this)+"]"},!0)},function(e,t,r){"use strict"
for(var a=r(89),i=r(59),n=r(25),o=r(13),s=r(15),c=r(55),l=r(35),u=l("iterator"),h=l("toStringTag"),f=c.Array,d={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},g=i(d),m=0;m<g.length;m++){var p,v=g[m],b=d[v],y=o[v],w=y&&y.prototype
if(w&&(w[u]||s(w,u,f),w[h]||s(w,h,v),c[v]=f,b))for(p in a)w[p]||n(w,p,a[p],!0)}},function(e,t,r){"use strict"
var a=r(50),i=r(90),n=r(55),o=r(47)
e.exports=r(54)(Array,"Array",function(e,t){this._t=o(e),this._i=0,this._k=t},function(){var e=this._t,t=this._k,r=this._i++
return!e||r>=e.length?(this._t=void 0,i(1)):i(0,"keys"==t?r:"values"==t?e[r]:[r,e[r]])},"values"),n.Arguments=n.Array,a("keys"),a("values"),a("entries")},function(e,t,r){"use strict"
e.exports=function(e,t){return{value:t,done:!!e}}},function(e,t,r){"use strict"
var a,i,n,o,s=r(37),c=r(13),l=r(28),u=r(72),h=r(12),f=r(18),d=r(29),g=r(92),m=r(93),p=r(94),v=r(95).set,b=r(97)(),y=r(98),w=r(99),k=r(100),S=r(101),C=c.TypeError,x=c.process,A=x&&x.versions,_=A&&A.v8||"",P=c.Promise,I="process"==u(x),O=function(){},E=i=y.f,T=!!function(){try{var e=P.resolve(1),t=(e.constructor={})[r(35)("species")]=function(e){e(O,O)}
return(I||"function"==typeof PromiseRejectionEvent)&&e.then(O)instanceof t&&0!==_.indexOf("6.6")&&-1===k.indexOf("Chrome/66")}catch(e){}}(),F=function(e){var t
return!(!f(e)||"function"!=typeof(t=e.then))&&t},R=function(e,t){if(!e._n){e._n=!0
var r=e._c
b(function(){for(var a=e._v,i=1==e._s,n=0,o=function(t){var r,n,o,s=i?t.ok:t.fail,c=t.resolve,l=t.reject,u=t.domain
try{s?(i||(2==e._h&&M(e),e._h=1),!0===s?r=a:(u&&u.enter(),r=s(a),u&&(u.exit(),o=!0)),r===t.promise?l(C("Promise-chain cycle")):(n=F(r))?n.call(r,c,l):c(r)):l(a)}catch(e){u&&!o&&u.exit(),l(e)}};r.length>n;)o(r[n++])
e._c=[],e._n=!1,t&&!e._h&&B(e)})}},B=function(e){v.call(c,function(){var t,r,a,i=e._v,n=D(e)
if(n&&(t=w(function(){I?x.emit("unhandledRejection",i,e):(r=c.onunhandledrejection)?r({promise:e,reason:i}):(a=c.console)&&a.error&&a.error("Unhandled promise rejection",i)}),e._h=I||D(e)?2:1),e._a=void 0,n&&t.e)throw t.v})},D=function(e){return 1!==e._h&&0===(e._a||e._c).length},M=function(e){v.call(c,function(){var t
I?x.emit("rejectionHandled",e):(t=c.onrejectionhandled)&&t({promise:e,reason:e._v})})},L=function(e){var t=this
t._d||(t._d=!0,(t=t._w||t)._v=e,t._s=2,t._a||(t._a=t._c.slice()),R(t,!0))},N=function e(t){var r,a=this
if(!a._d){a._d=!0,a=a._w||a
try{if(a===t)throw C("Promise can't be resolved itself");(r=F(t))?b(function(){var i={_w:a,_d:!1}
try{r.call(t,l(e,i,1),l(L,i,1))}catch(e){L.call(i,e)}}):(a._v=t,a._s=1,R(a,!1))}catch(e){L.call({_w:a,_d:!1},e)}}}
T||(P=function(e){g(this,P,"Promise","_h"),d(e),a.call(this)
try{e(l(N,this,1),l(L,this,1))}catch(e){L.call(this,e)}},(a=function(e){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=r(102)(P.prototype,{then:function(e,t){var r=E(p(this,P))
return r.ok="function"!=typeof e||e,r.fail="function"==typeof t&&t,r.domain=I?x.domain:void 0,this._c.push(r),this._a&&this._a.push(r),this._s&&R(this,!1),r.promise},catch:function(e){return this.then(void 0,e)}}),n=function(){var e=new a
this.promise=e,this.resolve=l(N,e,1),this.reject=l(L,e,1)},y.f=E=function(e){return e===P||e===o?new n(e):i(e)}),h(h.G+h.W+h.F*!T,{Promise:P}),r(64)(P,"Promise"),r(103)("Promise"),o=r(14).Promise,h(h.S+h.F*!T,"Promise",{reject:function(e){var t=E(this)
return(0,t.reject)(e),t.promise}}),h(h.S+h.F*(s||!T),"Promise",{resolve:function(e){return S(s&&this===o?P:this,e)}}),h(h.S+h.F*!(T&&r(73)(function(e){P.all(e).catch(O)})),"Promise",{all:function(e){var t=this,r=E(t),a=r.resolve,i=r.reject,n=w(function(){var r=[],n=0,o=1
m(e,!1,function(e){var s=n++,c=!1
r.push(void 0),o++,t.resolve(e).then(function(e){c||(c=!0,r[s]=e,--o||a(r))},i)}),--o||a(r)})
return n.e&&i(n.v),r.promise},race:function(e){var t=this,r=E(t),a=r.reject,i=w(function(){m(e,!1,function(e){t.resolve(e).then(r.resolve,a)})})
return i.e&&a(i.v),r.promise}})},function(e,t,r){"use strict"
e.exports=function(e,t,r,a){if(!(e instanceof t)||void 0!==a&&a in e)throw TypeError(r+": incorrect invocation!")
return e}},function(e,t,r){"use strict"
var a=r(28),i=r(68),n=r(69),o=r(17),s=r(30),c=r(71),l={},u={},h=e.exports=function(e,t,r,h,f){var d,g,m,p,v=f?function(){return e}:c(e),b=a(r,h,t?2:1),y=0
if("function"!=typeof v)throw TypeError(e+" is not iterable!")
if(n(v)){for(d=s(e.length);d>y;y++)if((p=t?b(o(g=e[y])[0],g[1]):b(e[y]))===l||p===u)return p}else for(m=v.call(e);!(g=m.next()).done;)if((p=i(m,b,g.value,t))===l||p===u)return p}
h.BREAK=l,h.RETURN=u},function(e,t,r){"use strict"
var a=r(17),i=r(29),n=r(35)("species")
e.exports=function(e,t){var r,o=a(e).constructor
return void 0===o||null==(r=a(o)[n])?t:i(r)}},function(e,t,r){"use strict"
var a,i,n,o=r(28),s=r(96),c=r(63),l=r(22),u=r(13),h=u.process,f=u.setImmediate,d=u.clearImmediate,g=u.MessageChannel,m=u.Dispatch,p=0,v={},b=function(){var e=+this
if(v.hasOwnProperty(e)){var t=v[e]
delete v[e],t()}},y=function(e){b.call(e.data)}
f&&d||(f=function(e){for(var t=[],r=1;arguments.length>r;)t.push(arguments[r++])
return v[++p]=function(){s("function"==typeof e?e:Function(e),t)},a(p),p},d=function(e){delete v[e]},"process"==r(34)(h)?a=function(e){h.nextTick(o(b,e,1))}:m&&m.now?a=function(e){m.now(o(b,e,1))}:g?(n=(i=new g).port2,i.port1.onmessage=y,a=o(n.postMessage,n,1)):u.addEventListener&&"function"==typeof postMessage&&!u.importScripts?(a=function(e){u.postMessage(e+"","*")},u.addEventListener("message",y,!1)):a="onreadystatechange"in l("script")?function(e){c.appendChild(l("script")).onreadystatechange=function(){c.removeChild(this),b.call(e)}}:function(e){setTimeout(o(b,e,1),0)}),e.exports={set:f,clear:d}},function(e,t,r){"use strict"
e.exports=function(e,t,r){var a=void 0===r
switch(t.length){case 0:return a?e():e.call(r)
case 1:return a?e(t[0]):e.call(r,t[0])
case 2:return a?e(t[0],t[1]):e.call(r,t[0],t[1])
case 3:return a?e(t[0],t[1],t[2]):e.call(r,t[0],t[1],t[2])
case 4:return a?e(t[0],t[1],t[2],t[3]):e.call(r,t[0],t[1],t[2],t[3])}return e.apply(r,t)}},function(e,t,r){"use strict"
var a=r(13),i=r(95).set,n=a.MutationObserver||a.WebKitMutationObserver,o=a.process,s=a.Promise,c="process"==r(34)(o)
e.exports=function(){var e,t,r,l=function(){var a,i
for(c&&(a=o.domain)&&a.exit();e;){i=e.fn,e=e.next
try{i()}catch(a){throw e?r():t=void 0,a}}t=void 0,a&&a.enter()}
if(c)r=function(){o.nextTick(l)}
else if(!n||a.navigator&&a.navigator.standalone)if(s&&s.resolve){var u=s.resolve(void 0)
r=function(){u.then(l)}}else r=function(){i.call(a,l)}
else{var h=!0,f=document.createTextNode("")
new n(l).observe(f,{characterData:!0}),r=function(){f.data=h=!h}}return function(a){var i={fn:a,next:void 0}
t&&(t.next=i),e||(e=i,r()),t=i}}},function(e,t,r){"use strict"
var a=r(29)
function i(e){var t,r
this.promise=new e(function(e,a){if(void 0!==t||void 0!==r)throw TypeError("Bad Promise constructor")
t=e,r=a}),this.resolve=a(t),this.reject=a(r)}e.exports.f=function(e){return new i(e)}},function(e,t,r){"use strict"
e.exports=function(e){try{return{e:!1,v:e()}}catch(e){return{e:!0,v:e}}}},function(e,t,r){"use strict"
var a=r(13).navigator
e.exports=a&&a.userAgent||""},function(e,t,r){"use strict"
var a=r(17),i=r(18),n=r(98)
e.exports=function(e,t){if(a(e),i(t)&&t.constructor===e)return t
var r=n.f(e)
return(0,r.resolve)(t),r.promise}},function(e,t,r){"use strict"
var a=r(25)
e.exports=function(e,t,r){for(var i in t)a(e,i,t[i],r)
return e}},function(e,t,r){"use strict"
var a=r(13),i=r(16),n=r(20),o=r(35)("species")
e.exports=function(e){var t=a[e]
n&&t&&!t[o]&&i.f(t,o,{configurable:!0,get:function(){return this}})}},function(e,t,r){"use strict"
var a=r(12),i=r(14),n=r(13),o=r(94),s=r(101)
a(a.P+a.R,"Promise",{finally:function(e){var t=o(this,i.Promise||n.Promise),r="function"==typeof e
return this.then(r?function(r){return s(t,e()).then(function(){return r})}:e,r?function(r){return s(t,e()).then(function(){throw r})}:e)}})},function(e,t,r){"use strict"
var a=r(12),i=r(98),n=r(99)
a(a.S,"Promise",{try:function(e){var t=i.f(this),r=n(e)
return(r.e?t.reject:t.resolve)(r.v),t.promise}})},function(e,t,r){"use strict"
r(87),r(88),r(107),r(119),r(121),e.exports=r(14).WeakMap},function(e,t,r){"use strict"
var a,i=r(108)(0),n=r(25),o=r(112),s=r(76),c=r(113),l=r(18),u=r(21),h=r(114),f=o.getWeak,d=Object.isExtensible,g=c.ufstore,m={},p=function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},v={get:function(e){if(l(e)){var t=f(e)
return!0===t?g(h(this,"WeakMap")).get(e):t?t[this._i]:void 0}},set:function(e,t){return c.def(h(this,"WeakMap"),e,t)}},b=e.exports=r(115)("WeakMap",p,v,c,!0,!0)
u(function(){return 7!=(new b).set((Object.freeze||Object)(m),7).get(m)})&&(s((a=c.getConstructor(p,"WeakMap")).prototype,v),o.NEED=!0,i(["delete","has","get","set"],function(e){var t=b.prototype,r=t[e]
n(t,e,function(t,i){if(l(t)&&!d(t)){this._f||(this._f=new a)
var n=this._f[e](t,i)
return"set"==e?this:n}return r.call(this,t,i)})}))},function(e,t,r){"use strict"
var a=r(28),i=r(48),n=r(66),o=r(30),s=r(109)
e.exports=function(e,t){var r=1==e,c=2==e,l=3==e,u=4==e,h=6==e,f=5==e||h,d=t||s
return function(t,s,g){for(var m,p,v=n(t),b=i(v),y=a(s,g,3),w=o(b.length),k=0,S=r?d(t,w):c?d(t,0):void 0;w>k;k++)if((f||k in b)&&(p=y(m=b[k],k,v),e))if(r)S[k]=p
else if(p)switch(e){case 3:return!0
case 5:return m
case 6:return k
case 2:S.push(m)}else if(u)return!1
return h?-1:l||u?u:S}}},function(e,t,r){"use strict"
var a=r(110)
e.exports=function(e,t){return new(a(e))(t)}},function(e,t,r){"use strict"
var a=r(18),i=r(111),n=r(35)("species")
e.exports=function(e){var t
return i(e)&&("function"!=typeof(t=e.constructor)||t!==Array&&!i(t.prototype)||(t=void 0),a(t)&&null===(t=t[n])&&(t=void 0)),void 0===t?Array:t}},function(e,t,r){"use strict"
var a=r(34)
e.exports=Array.isArray||function(e){return"Array"==a(e)}},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=r(27)("meta"),n=r(18),o=r(26),s=r(16).f,c=0,l=Object.isExtensible||function(){return!0},u=!r(21)(function(){return l(Object.preventExtensions({}))}),h=function(e){s(e,i,{value:{i:"O"+ ++c,w:{}}})},f=e.exports={KEY:i,NEED:!1,fastKey:function(e,t){if(!n(e))return"symbol"==a(e)?e:("string"==typeof e?"S":"P")+e
if(!o(e,i)){if(!l(e))return"F"
if(!t)return"E"
h(e)}return e[i].i},getWeak:function(e,t){if(!o(e,i)){if(!l(e))return!0
if(!t)return!1
h(e)}return e[i].w},onFreeze:function(e){return u&&f.NEED&&l(e)&&!o(e,i)&&h(e),e}}},function(e,t,r){"use strict"
var a=r(102),i=r(112).getWeak,n=r(17),o=r(18),s=r(92),c=r(93),l=r(108),u=r(26),h=r(114),f=l(5),d=l(6),g=0,m=function(e){return e._l||(e._l=new p)},p=function(){this.a=[]},v=function(e,t){return f(e.a,function(e){return e[0]===t})}
p.prototype={get:function(e){var t=v(this,e)
if(t)return t[1]},has:function(e){return!!v(this,e)},set:function(e,t){var r=v(this,e)
r?r[1]=t:this.a.push([e,t])},delete:function(e){var t=d(this.a,function(t){return t[0]===e})
return~t&&this.a.splice(t,1),!!~t}},e.exports={getConstructor:function(e,t,r,n){var l=e(function(e,a){s(e,l,t,"_i"),e._t=t,e._i=g++,e._l=void 0,null!=a&&c(a,r,e[n],e)})
return a(l.prototype,{delete:function(e){if(!o(e))return!1
var r=i(e)
return!0===r?m(h(this,t)).delete(e):r&&u(r,this._i)&&delete r[this._i]},has:function(e){if(!o(e))return!1
var r=i(e)
return!0===r?m(h(this,t)).has(e):r&&u(r,this._i)}}),l},def:function(e,t,r){var a=i(n(t),!0)
return!0===a?m(e).set(t,r):a[e._i]=r,e},ufstore:m}},function(e,t,r){"use strict"
var a=r(18)
e.exports=function(e,t){if(!a(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!")
return e}},function(e,t,r){"use strict"
var a=r(13),i=r(12),n=r(25),o=r(102),s=r(112),c=r(93),l=r(92),u=r(18),h=r(21),f=r(73),d=r(64),g=r(116)
e.exports=function(e,t,r,m,p,v){var b=a[e],y=b,w=p?"set":"add",k=y&&y.prototype,S={},C=function(e){var t=k[e]
n(k,e,"delete"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:"has"==e?function(e){return!(v&&!u(e))&&t.call(this,0===e?0:e)}:"get"==e?function(e){return v&&!u(e)?void 0:t.call(this,0===e?0:e)}:"add"==e?function(e){return t.call(this,0===e?0:e),this}:function(e,r){return t.call(this,0===e?0:e,r),this})}
if("function"==typeof y&&(v||k.forEach&&!h(function(){(new y).entries().next()}))){var x=new y,A=x[w](v?{}:-0,1)!=x,_=h(function(){x.has(1)}),P=f(function(e){new y(e)}),I=!v&&h(function(){for(var e=new y,t=5;t--;)e[w](t,t)
return!e.has(-0)})
P||((y=t(function(t,r){l(t,y,e)
var a=g(new b,t,y)
return null!=r&&c(r,p,a[w],a),a})).prototype=k,k.constructor=y),(_||I)&&(C("delete"),C("has"),p&&C("get")),(I||A)&&C(w),v&&k.clear&&delete k.clear}else y=m.getConstructor(t,e,p,w),o(y.prototype,r),s.NEED=!0
return d(y,e),S[e]=y,i(i.G+i.W+i.F*(y!=b),S),v||m.setStrong(y,e,p),y}},function(e,t,r){"use strict"
var a=r(18),i=r(117).set
e.exports=function(e,t,r){var n,o=t.constructor
return o!==r&&"function"==typeof o&&(n=o.prototype)!==r.prototype&&a(n)&&i&&i(e,n),e}},function(e,t,r){"use strict"
var a=r(18),i=r(17),n=function(e,t){if(i(e),!a(t)&&null!==t)throw TypeError(t+": can't set as prototype!")}
e.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(e,t,a){try{(a=r(28)(Function.call,r(118).f(Object.prototype,"__proto__").set,2))(e,[]),t=!(e instanceof Array)}catch(e){t=!0}return function(e,r){return n(e,r),t?e.__proto__=r:a(e,r),e}}({},!1):void 0),check:n}},function(e,t,r){"use strict"
var a=r(78),i=r(24),n=r(47),o=r(23),s=r(26),c=r(19),l=Object.getOwnPropertyDescriptor
t.f=r(20)?l:function(e,t){if(e=n(e),t=o(t,!0),c)try{return l(e,t)}catch(e){}if(s(e,t))return i(!a.f.call(e,t),e[t])}},function(e,t,r){"use strict"
r(120)("WeakMap")},function(e,t,r){"use strict"
var a=r(12)
e.exports=function(e){a(a.S,e,{of:function(){for(var e=arguments.length,t=new Array(e);e--;)t[e]=arguments[e]
return new this(t)}})}},function(e,t,r){"use strict"
r(122)("WeakMap")},function(e,t,r){"use strict"
var a=r(12),i=r(29),n=r(28),o=r(93)
e.exports=function(e){a(a.S,e,{from:function(e){var t,r,a,s,c=arguments[1]
return i(this),(t=void 0!==c)&&i(c),null==e?new this:(r=[],t?(a=0,s=n(c,arguments[2],2),o(e,!1,function(e){r.push(s(e,a++))})):o(e,!1,r.push,r),new this(r))}})}},function(e,t,r){"use strict"
r(87),r(88),r(124),r(125),r(126),e.exports=r(14).WeakSet},function(e,t,r){"use strict"
var a=r(113),i=r(114)
r(115)("WeakSet",function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}},{add:function(e){return a.def(i(this,"WeakSet"),e,!0)}},a,!1,!0)},function(e,t,r){"use strict"
r(120)("WeakSet")},function(e,t,r){"use strict"
r(122)("WeakSet")},function(e,t,r){"use strict"
r(128),e.exports=r(14).String.codePointAt},function(e,t,r){"use strict"
var a=r(12),i=r(53)(!1)
a(a.P,"String",{codePointAt:function(e){return i(this,e)}})},function(e,t,r){"use strict"
r(130),e.exports=r(14).String.fromCodePoint},function(e,t,r){"use strict"
var a=r(12),i=r(49),n=String.fromCharCode,o=String.fromCodePoint
a(a.S+a.F*(!!o&&1!=o.length),"String",{fromCodePoint:function(e){for(var t,r=[],a=arguments.length,o=0;a>o;){if(t=+arguments[o++],i(t,1114111)!==t)throw RangeError(t+" is not a valid code point")
r.push(t<65536?n(t):n(55296+((t-=65536)>>10),t%1024+56320))}return r.join("")}})},function(e,t,r){"use strict"
r(132),r(87),e.exports=r(14).Symbol},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=r(13),n=r(26),o=r(20),s=r(12),c=r(25),l=r(112).KEY,u=r(21),h=r(36),f=r(64),d=r(27),g=r(35),m=r(133),p=r(134),v=r(135),b=r(111),y=r(17),w=r(18),k=r(47),S=r(23),C=r(24),x=r(57),A=r(136),_=r(118),P=r(16),I=r(59),O=_.f,E=P.f,T=A.f,F=i.Symbol,R=i.JSON,B=R&&R.stringify,D=g("_hidden"),M=g("toPrimitive"),L={}.propertyIsEnumerable,N=h("symbol-registry"),U=h("symbols"),q=h("op-symbols"),j=Object.prototype,z="function"==typeof F,H=i.QObject,W=!H||!H.prototype||!H.prototype.findChild,G=o&&u(function(){return 7!=x(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(e,t,r){var a=O(j,t)
a&&delete j[t],E(e,t,r),a&&e!==j&&E(j,t,a)}:E,X=function(e){var t=U[e]=x(F.prototype)
return t._k=e,t},V=z&&"symbol"==a(F.iterator)?function(e){return"symbol"==a(e)}:function(e){return e instanceof F},K=function(e,t,r){return e===j&&K(q,t,r),y(e),t=S(t,!0),y(r),n(U,t)?(r.enumerable?(n(e,D)&&e[D][t]&&(e[D][t]=!1),r=x(r,{enumerable:C(0,!1)})):(n(e,D)||E(e,D,C(1,{})),e[D][t]=!0),G(e,t,r)):E(e,t,r)},Y=function(e,t){y(e)
for(var r,a=v(t=k(t)),i=0,n=a.length;n>i;)K(e,r=a[i++],t[r])
return e},J=function(e){var t=L.call(this,e=S(e,!0))
return!(this===j&&n(U,e)&&!n(q,e))&&(!(t||!n(this,e)||!n(U,e)||n(this,D)&&this[D][e])||t)},Z=function(e,t){if(e=k(e),t=S(t,!0),e!==j||!n(U,t)||n(q,t)){var r=O(e,t)
return!r||!n(U,t)||n(e,D)&&e[D][t]||(r.enumerable=!0),r}},Q=function(e){for(var t,r=T(k(e)),a=[],i=0;r.length>i;)n(U,t=r[i++])||t==D||t==l||a.push(t)
return a},$=function(e){for(var t,r=e===j,a=T(r?q:k(e)),i=[],o=0;a.length>o;)!n(U,t=a[o++])||r&&!n(j,t)||i.push(U[t])
return i}
z||(c((F=function(){if(this instanceof F)throw TypeError("Symbol is not a constructor!")
var e=d(arguments.length>0?arguments[0]:void 0)
return o&&W&&G(j,e,{configurable:!0,set:function t(r){this===j&&t.call(q,r),n(this,D)&&n(this[D],e)&&(this[D][e]=!1),G(this,e,C(1,r))}}),X(e)}).prototype,"toString",function(){return this._k}),_.f=Z,P.f=K,r(137).f=A.f=Q,r(78).f=J,r(77).f=$,o&&!r(37)&&c(j,"propertyIsEnumerable",J,!0),m.f=function(e){return X(g(e))}),s(s.G+s.W+s.F*!z,{Symbol:F})
for(var ee="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),te=0;ee.length>te;)g(ee[te++])
for(var re=I(g.store),ae=0;re.length>ae;)p(re[ae++])
s(s.S+s.F*!z,"Symbol",{for:function(e){return n(N,e+="")?N[e]:N[e]=F(e)},keyFor:function(e){if(!V(e))throw TypeError(e+" is not a symbol!")
for(var t in N)if(N[t]===e)return t},useSetter:function(){W=!0},useSimple:function(){W=!1}}),s(s.S+s.F*!z,"Object",{create:function(e,t){return void 0===t?x(e):Y(x(e),t)},defineProperty:K,defineProperties:Y,getOwnPropertyDescriptor:Z,getOwnPropertyNames:Q,getOwnPropertySymbols:$}),R&&s(s.S+s.F*(!z||u(function(){var e=F()
return"[null]"!=B([e])||"{}"!=B({a:e})||"{}"!=B(Object(e))})),"JSON",{stringify:function(e){for(var t,r,a=[e],i=1;arguments.length>i;)a.push(arguments[i++])
if(r=t=a[1],(w(t)||void 0!==e)&&!V(e))return b(t)||(t=function(e,t){if("function"==typeof r&&(t=r.call(this,e,t)),!V(t))return t}),a[1]=t,B.apply(R,a)}}),F.prototype[M]||r(15)(F.prototype,M,F.prototype.valueOf),f(F,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},function(e,t,r){"use strict"
t.f=r(35)},function(e,t,r){"use strict"
var a=r(13),i=r(14),n=r(37),o=r(133),s=r(16).f
e.exports=function(e){var t=i.Symbol||(i.Symbol=n?{}:a.Symbol||{})
"_"==e.charAt(0)||e in t||s(t,e,{value:o.f(e)})}},function(e,t,r){"use strict"
var a=r(59),i=r(77),n=r(78)
e.exports=function(e){var t=a(e),r=i.f
if(r)for(var o,s=r(e),c=n.f,l=0;s.length>l;)c.call(e,o=s[l++])&&t.push(o)
return t}},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=r(47),n=r(137).f,o={}.toString,s="object"==("undefined"==typeof window?"undefined":a(window))&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[]
e.exports.f=function(e){return s&&"[object Window]"==o.call(e)?function(e){try{return n(e)}catch(e){return s.slice()}}(e):n(i(e))}},function(e,t,r){"use strict"
var a=r(60),i=r(62).concat("length","prototype")
t.f=Object.getOwnPropertyNames||function(e){return a(e,i)}},function(e,t,r){"use strict"
r(139),e.exports=r(14).String.padStart},function(e,t,r){"use strict"
var a=r(12),i=r(140),n=r(100)
a(a.P+a.F*/Version\/10\.\d+(\.\d+)? Safari\//.test(n),"String",{padStart:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0,!0)}})},function(e,t,r){"use strict"
var a=r(30),i=r(141),n=r(38)
e.exports=function(e,t,r,o){var s=String(n(e)),c=s.length,l=void 0===r?" ":String(r),u=a(t)
if(u<=c||""==l)return s
var h=u-c,f=i.call(l,Math.ceil(h/l.length))
return f.length>h&&(f=f.slice(0,h)),o?f+s:s+f}},function(e,t,r){"use strict"
var a=r(31),i=r(38)
e.exports=function(e){var t=String(i(this)),r="",n=a(e)
if(n<0||n==1/0)throw RangeError("Count can't be negative")
for(;n>0;(n>>>=1)&&(t+=t))1&n&&(r+=t)
return r}},function(e,t,r){"use strict"
r(143),e.exports=r(14).String.padEnd},function(e,t,r){"use strict"
var a=r(12),i=r(140),n=r(100)
a(a.P+a.F*/Version\/10\.\d+(\.\d+)? Safari\//.test(n),"String",{padEnd:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0,!1)}})},function(e,t,r){"use strict"
r(145),e.exports=r(14).Object.values},function(e,t,r){"use strict"
var a=r(12),i=r(146)(!1)
a(a.S,"Object",{values:function(e){return i(e)}})},function(e,t,r){"use strict"
var a=r(59),i=r(47),n=r(78).f
e.exports=function(e){return function(t){for(var r,o=i(t),s=a(o),c=s.length,l=0,u=[];c>l;)n.call(o,r=s[l++])&&u.push(e?[r,o[r]]:o[r])
return u}}},function(e,t,r){"use strict"
var a=!1
if("undefined"!=typeof ReadableStream)try{new ReadableStream({start:function(e){e.close()}}),a=!0}catch(e){}t.ReadableStream=a?ReadableStream:r(148).ReadableStream},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}!function(e,t){for(var r in t)e[r]=t[r]}(t,function(e){var t={}
function r(a){if(t[a])return t[a].exports
var i=t[a]={i:a,l:!1,exports:{}}
return e[a].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.i=function(e){return e},r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:a})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=7)}([function(e,t,r){var i="function"==typeof Symbol&&"symbol"===a(Symbol.iterator)?function(e){return a(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":a(e)},n=r(1).assert
function o(e){return"string"==typeof e||"symbol"===(void 0===e?"undefined":i(e))}function s(e,t,r){if("function"!=typeof e)throw new TypeError("Argument is not a function")
return Function.prototype.apply.call(e,t,r)}t.typeIsObject=function(e){return"object"===(void 0===e?"undefined":i(e))&&null!==e||"function"==typeof e},t.createDataProperty=function(e,r,a){n(t.typeIsObject(e)),Object.defineProperty(e,r,{value:a,writable:!0,enumerable:!0,configurable:!0})},t.createArrayFromList=function(e){return e.slice()},t.ArrayBufferCopy=function(e,t,r,a,i){new Uint8Array(e).set(new Uint8Array(r,a,i),t)},t.CreateIterResultObject=function(e,t){n("boolean"==typeof t)
var r={}
return Object.defineProperty(r,"value",{value:e,enumerable:!0,writable:!0,configurable:!0}),Object.defineProperty(r,"done",{value:t,enumerable:!0,writable:!0,configurable:!0}),r},t.IsFiniteNonNegativeNumber=function(e){return!(Number.isNaN(e)||e===1/0||e<0)},t.InvokeOrNoop=function(e,t,r){n(void 0!==e),n(o(t)),n(Array.isArray(r))
var a=e[t]
if(void 0!==a)return s(a,e,r)},t.PromiseInvokeOrNoop=function(e,r,a){n(void 0!==e),n(o(r)),n(Array.isArray(a))
try{return Promise.resolve(t.InvokeOrNoop(e,r,a))}catch(e){return Promise.reject(e)}},t.PromiseInvokeOrPerformFallback=function(e,t,r,a,i){n(void 0!==e),n(o(t)),n(Array.isArray(r)),n(Array.isArray(i))
var c=void 0
try{c=e[t]}catch(e){return Promise.reject(e)}if(void 0===c)return a.apply(null,i)
try{return Promise.resolve(s(c,e,r))}catch(e){return Promise.reject(e)}},t.TransferArrayBuffer=function(e){return e.slice()},t.ValidateAndNormalizeHighWaterMark=function(e){if(e=Number(e),Number.isNaN(e)||e<0)throw new RangeError("highWaterMark property of a queuing strategy must be non-negative and non-NaN")
return e},t.ValidateAndNormalizeQueuingStrategy=function(e,r){if(void 0!==e&&"function"!=typeof e)throw new TypeError("size property of a queuing strategy must be a function")
return{size:e,highWaterMark:r=t.ValidateAndNormalizeHighWaterMark(r)}}},function(e,t,r){function a(e){this.name="AssertionError",this.message=e||"",this.stack=(new Error).stack}a.prototype=Object.create(Error.prototype),a.prototype.constructor=a,e.exports={rethrowAssertionErrorRejection:function(e){e&&e.constructor===a&&setTimeout(function(){throw e},0)},AssertionError:a,assert:function(e,t){if(!e)throw new a(t)}}},function(e,t,r){var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}()
function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=r(0),o=n.InvokeOrNoop,s=n.PromiseInvokeOrNoop,c=n.ValidateAndNormalizeQueuingStrategy,l=n.typeIsObject,u=r(1),h=u.assert,f=u.rethrowAssertionErrorRejection,d=r(3),g=d.DequeueValue,m=d.EnqueueValueWithSize,p=d.PeekQueueValue,v=d.ResetQueue,b=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.size,n=r.highWaterMark,o=void 0===n?1:n
if(i(this,e),this._state="writable",this._storedError=void 0,this._writer=void 0,this._writableStreamController=void 0,this._writeRequests=[],this._inFlightWriteRequest=void 0,this._closeRequest=void 0,this._inFlightCloseRequest=void 0,this._pendingAbortRequest=void 0,this._backpressure=!1,void 0!==t.type)throw new RangeError("Invalid type is specified")
this._writableStreamController=new M(this,t,a,o),this._writableStreamController.__startSteps()}return a(e,[{key:"abort",value:function(e){return!1===w(this)?Promise.reject(z("abort")):!0===k(this)?Promise.reject(new TypeError("Cannot abort a stream that already has a writer")):S(this,e)}},{key:"getWriter",value:function(){if(!1===w(this))throw z("getWriter")
return y(this)}},{key:"locked",get:function(){if(!1===w(this))throw z("locked")
return k(this)}}]),e}()
function y(e){return new E(e)}function w(e){return!!l(e)&&!!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")}function k(e){return h(!0===w(e),"IsWritableStreamLocked should only be used on known writable streams"),void 0!==e._writer}function S(e,t){var r=e._state
if("closed"===r)return Promise.resolve(void 0)
if("errored"===r)return Promise.reject(e._storedError)
var a=new TypeError("Requested to abort")
if(void 0!==e._pendingAbortRequest)return Promise.reject(a)
h("writable"===r||"erroring"===r,"state must be writable or erroring")
var i=!1
"erroring"===r&&(i=!0,t=void 0)
var n=new Promise(function(r,a){e._pendingAbortRequest={_resolve:r,_reject:a,_reason:t,_wasAlreadyErroring:i}})
return!1===i&&x(e,a),n}function C(e,t){var r=e._state
"writable"!==r?(h("erroring"===r),A(e)):x(e,t)}function x(e,t){h(void 0===e._storedError,"stream._storedError === undefined"),h("writable"===e._state,"state must be writable")
var r=e._writableStreamController
h(void 0!==r,"controller must not be undefined"),e._state="erroring",e._storedError=t
var a=e._writer
void 0!==a&&R(a,t),!1===P(e)&&!0===r._started&&A(e)}function A(e){h("erroring"===e._state,"stream._state === erroring"),h(!1===P(e),"WritableStreamHasOperationMarkedInFlight(stream) === false"),e._state="errored",e._writableStreamController.__errorSteps()
for(var t=e._storedError,r=0;r<e._writeRequests.length;r++)e._writeRequests[r]._reject(t)
if(e._writeRequests=[],void 0!==e._pendingAbortRequest){var a=e._pendingAbortRequest
e._pendingAbortRequest=void 0,!0!==a._wasAlreadyErroring?e._writableStreamController.__abortSteps(a._reason).then(function(){a._resolve(),I(e)},function(t){a._reject(t),I(e)}):(a._reject(t),I(e))}else I(e)}function _(e){return void 0!==e._closeRequest||void 0!==e._inFlightCloseRequest}function P(e){return void 0!==e._inFlightWriteRequest||void 0!==e._inFlightCloseRequest}function I(e){h("errored"===e._state,'_stream_.[[state]] is `"errored"`'),void 0!==e._closeRequest&&(h(void 0===e._inFlightCloseRequest),e._closeRequest._reject(e._storedError),e._closeRequest=void 0)
var t=e._writer
void 0!==t&&(X(t,e._storedError),t._closedPromise.catch(function(){}))}function O(e,t){h("writable"===e._state),h(!1===_(e))
var r=e._writer
void 0!==r&&t!==e._backpressure&&(!0===t?function(e){h(void 0===e._readyPromise_resolve,"writer._readyPromise_resolve === undefined"),h(void 0===e._readyPromise_reject,"writer._readyPromise_reject === undefined"),e._readyPromise=new Promise(function(t,r){e._readyPromise_resolve=t,e._readyPromise_reject=r}),e._readyPromiseState="pending"}(r):(h(!1===t),Y(r))),e._backpressure=t}e.exports={AcquireWritableStreamDefaultWriter:y,IsWritableStream:w,IsWritableStreamLocked:k,WritableStream:b,WritableStreamAbort:S,WritableStreamDefaultControllerError:j,WritableStreamDefaultWriterCloseWithErrorPropagation:function(e){var t=e._ownerWritableStream
h(void 0!==t)
var r=t._state
return!0===_(t)||"closed"===r?Promise.resolve():"errored"===r?Promise.reject(t._storedError):(h("writable"===r||"erroring"===r),F(e))},WritableStreamDefaultWriterRelease:B,WritableStreamDefaultWriterWrite:D,WritableStreamCloseQueuedOrInFlight:_}
var E=function(){function e(t){if(i(this,e),!1===w(t))throw new TypeError("WritableStreamDefaultWriter can only be constructed with a WritableStream instance")
if(!0===k(t))throw new TypeError("This stream has already been locked for exclusive writing by another writer")
this._ownerWritableStream=t,t._writer=this
var r=t._state
if("writable"===r)!1===_(t)&&!0===t._backpressure?function(e){e._readyPromise=new Promise(function(t,r){e._readyPromise_resolve=t,e._readyPromise_reject=r}),e._readyPromiseState="pending"}(this):K(this),G(this)
else if("erroring"===r)V(this,t._storedError),this._readyPromise.catch(function(){}),G(this)
else if("closed"===r)K(this),function(e){e._closedPromise=Promise.resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved"}(this)
else{h("errored"===r,"state must be errored")
var a=t._storedError
V(this,a),this._readyPromise.catch(function(){}),function(e,t){e._closedPromise=Promise.reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected"}(this,a),this._closedPromise.catch(function(){})}}return a(e,[{key:"abort",value:function(e){return!1===T(this)?Promise.reject(H("abort")):void 0===this._ownerWritableStream?Promise.reject(W("abort")):function(e,t){var r=e._ownerWritableStream
return h(void 0!==r),S(r,t)}(this,e)}},{key:"close",value:function(){if(!1===T(this))return Promise.reject(H("close"))
var e=this._ownerWritableStream
return void 0===e?Promise.reject(W("close")):!0===_(e)?Promise.reject(new TypeError("cannot close an already-closing stream")):F(this)}},{key:"releaseLock",value:function(){if(!1===T(this))throw H("releaseLock")
var e=this._ownerWritableStream
void 0!==e&&(h(void 0!==e._writer),B(this))}},{key:"write",value:function(e){return!1===T(this)?Promise.reject(H("write")):void 0===this._ownerWritableStream?Promise.reject(W("write to")):D(this,e)}},{key:"closed",get:function(){return!1===T(this)?Promise.reject(H("closed")):this._closedPromise}},{key:"desiredSize",get:function(){if(!1===T(this))throw H("desiredSize")
if(void 0===this._ownerWritableStream)throw W("desiredSize")
return e=this._ownerWritableStream,"errored"===(t=e._state)||"erroring"===t?null:"closed"===t?0:L(e._writableStreamController)
var e,t}},{key:"ready",get:function(){return!1===T(this)?Promise.reject(H("ready")):this._readyPromise}}]),e}()
function T(e){return!!l(e)&&!!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")}function F(e){var t=e._ownerWritableStream
h(void 0!==t)
var r=t._state
if("closed"===r||"errored"===r)return Promise.reject(new TypeError("The stream (in "+r+" state) is not in the writable state and cannot be closed"))
h("writable"===r||"erroring"===r),h(!1===_(t))
var a=new Promise(function(e,r){var a={_resolve:e,_reject:r}
t._closeRequest=a})
return!0===t._backpressure&&"writable"===r&&Y(e),function(e){m(e,"close",0),N(e)}(t._writableStreamController),a}function R(e,t){"pending"===e._readyPromiseState?function(e,t){h(void 0!==e._readyPromise_resolve,"writer._readyPromise_resolve !== undefined"),h(void 0!==e._readyPromise_reject,"writer._readyPromise_reject !== undefined"),e._readyPromise_reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected"}(e,t):function(e,t){h(void 0===e._readyPromise_resolve,"writer._readyPromise_resolve === undefined"),h(void 0===e._readyPromise_reject,"writer._readyPromise_reject === undefined"),e._readyPromise=Promise.reject(t),e._readyPromiseState="rejected"}(e,t),e._readyPromise.catch(function(){})}function B(e){var t=e._ownerWritableStream
h(void 0!==t),h(t._writer===e)
var r=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness")
R(e,r),function(e,t){"pending"===e._closedPromiseState?X(e,t):function(e,t){h(void 0===e._closedPromise_resolve,"writer._closedPromise_resolve === undefined"),h(void 0===e._closedPromise_reject,"writer._closedPromise_reject === undefined"),h("pending"!==e._closedPromiseState,"writer._closedPromiseState is not pending"),e._closedPromise=Promise.reject(t),e._closedPromiseState="rejected"}(e,t),e._closedPromise.catch(function(){})}(e,r),t._writer=void 0,e._ownerWritableStream=void 0}function D(e,t){var r=e._ownerWritableStream
h(void 0!==r)
var a=r._writableStreamController,i=function(e,t){var r=e._strategySize
if(void 0===r)return 1
try{return r(t)}catch(t){return U(e,t),1}}(a,t)
if(r!==e._ownerWritableStream)return Promise.reject(W("write to"))
var n=r._state
if("errored"===n)return Promise.reject(r._storedError)
if(!0===_(r)||"closed"===n)return Promise.reject(new TypeError("The stream is closing or closed and cannot be written to"))
if("erroring"===n)return Promise.reject(r._storedError)
h("writable"===n)
var o=function(e){return h(!0===k(e)),h("writable"===e._state),new Promise(function(t,r){var a={_resolve:t,_reject:r}
e._writeRequests.push(a)})}(r)
return function(e,t,r){var a={chunk:t}
try{m(e,a,r)}catch(t){return void U(e,t)}var i=e._controlledWritableStream
!1===_(i)&&"writable"===i._state&&O(i,q(e))
N(e)}(a,t,i),o}var M=function(){function e(t,r,a,n){if(i(this,e),!1===w(t))throw new TypeError("WritableStreamDefaultController can only be constructed with a WritableStream instance")
if(void 0!==t._writableStreamController)throw new TypeError("WritableStreamDefaultController instances can only be created by the WritableStream constructor")
this._controlledWritableStream=t,this._underlyingSink=r,this._queue=void 0,this._queueTotalSize=void 0,v(this),this._started=!1
var o=c(a,n)
this._strategySize=o.size,this._strategyHWM=o.highWaterMark,O(t,q(this))}return a(e,[{key:"error",value:function(e){if(!1===function(e){return!!l(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingSink")}(this))throw new TypeError("WritableStreamDefaultController.prototype.error can only be used on a WritableStreamDefaultController")
"writable"===this._controlledWritableStream._state&&j(this,e)}},{key:"__abortSteps",value:function(e){return s(this._underlyingSink,"abort",[e])}},{key:"__errorSteps",value:function(){v(this)}},{key:"__startSteps",value:function(){var e=this,t=o(this._underlyingSink,"start",[this]),r=this._controlledWritableStream
Promise.resolve(t).then(function(){h("writable"===r._state||"erroring"===r._state),e._started=!0,N(e)},function(t){h("writable"===r._state||"erroring"===r._state),e._started=!0,C(r,t)}).catch(f)}}]),e}()
function L(e){return e._strategyHWM-e._queueTotalSize}function N(e){var t=e._controlledWritableStream
if(!1!==e._started&&void 0===t._inFlightWriteRequest){var r=t._state
if("closed"!==r&&"errored"!==r)if("erroring"!==r){if(0!==e._queue.length){var a=p(e)
"close"===a?function(e){var t=e._controlledWritableStream
!function(e){h(void 0===e._inFlightCloseRequest),h(void 0!==e._closeRequest),e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0}(t),g(e),h(0===e._queue.length,"queue must be empty once the final write record is dequeued"),s(e._underlyingSink,"close",[]).then(function(){(function(e){h(void 0!==e._inFlightCloseRequest),e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0
var t=e._state
h("writable"===t||"erroring"===t),"erroring"===t&&(e._storedError=void 0,void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed"
var r=e._writer
void 0!==r&&function(e){h(void 0!==e._closedPromise_resolve,"writer._closedPromise_resolve !== undefined"),h(void 0!==e._closedPromise_reject,"writer._closedPromise_reject !== undefined"),h("pending"===e._closedPromiseState,"writer._closedPromiseState is pending"),e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved"}(r),h(void 0===e._pendingAbortRequest,"stream._pendingAbortRequest === undefined"),h(void 0===e._storedError,"stream._storedError === undefined")})(t)},function(e){!function(e,t){h(void 0!==e._inFlightCloseRequest),e._inFlightCloseRequest._reject(t),e._inFlightCloseRequest=void 0,h("writable"===e._state||"erroring"===e._state),void 0!==e._pendingAbortRequest&&(e._pendingAbortRequest._reject(t),e._pendingAbortRequest=void 0),C(e,t)}(t,e)}).catch(f)}(e):function(e,t){var r=e._controlledWritableStream
!function(e){h(void 0===e._inFlightWriteRequest,"there must be no pending write request"),h(0!==e._writeRequests.length,"writeRequests must not be empty"),e._inFlightWriteRequest=e._writeRequests.shift()}(r),s(e._underlyingSink,"write",[t,e]).then(function(){!function(e){h(void 0!==e._inFlightWriteRequest),e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0}(r)
var t=r._state
if(h("writable"===t||"erroring"===t),g(e),!1===_(r)&&"writable"===t){var a=q(e)
O(r,a)}N(e)},function(e){!function(e,t){h(void 0!==e._inFlightWriteRequest),e._inFlightWriteRequest._reject(t),e._inFlightWriteRequest=void 0,h("writable"===e._state||"erroring"===e._state),C(e,t)}(r,e)}).catch(f)}(e,a.chunk)}}else A(t)}}function U(e,t){"writable"===e._controlledWritableStream._state&&j(e,t)}function q(e){return L(e)<=0}function j(e,t){var r=e._controlledWritableStream
h("writable"===r._state),x(r,t)}function z(e){return new TypeError("WritableStream.prototype."+e+" can only be used on a WritableStream")}function H(e){return new TypeError("WritableStreamDefaultWriter.prototype."+e+" can only be used on a WritableStreamDefaultWriter")}function W(e){return new TypeError("Cannot "+e+" a stream using a released writer")}function G(e){e._closedPromise=new Promise(function(t,r){e._closedPromise_resolve=t,e._closedPromise_reject=r,e._closedPromiseState="pending"})}function X(e,t){h(void 0!==e._closedPromise_resolve,"writer._closedPromise_resolve !== undefined"),h(void 0!==e._closedPromise_reject,"writer._closedPromise_reject !== undefined"),h("pending"===e._closedPromiseState,"writer._closedPromiseState is pending"),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected"}function V(e,t){e._readyPromise=Promise.reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected"}function K(e){e._readyPromise=Promise.resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled"}function Y(e){h(void 0!==e._readyPromise_resolve,"writer._readyPromise_resolve !== undefined"),h(void 0!==e._readyPromise_reject,"writer._readyPromise_reject !== undefined"),e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled"}},function(e,t,r){var a=r(0).IsFiniteNonNegativeNumber,i=r(1).assert
t.DequeueValue=function(e){i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: DequeueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."),i(e._queue.length>0,"Spec-level failure: should never dequeue from an empty queue.")
var t=e._queue.shift()
return e._queueTotalSize-=t.size,e._queueTotalSize<0&&(e._queueTotalSize=0),t.value},t.EnqueueValueWithSize=function(e,t,r){if(i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: EnqueueValueWithSize should only be used on containers with [[queue]] and [[queueTotalSize]]."),r=Number(r),!a(r))throw new RangeError("Size must be a finite, non-NaN, non-negative number.")
e._queue.push({value:t,size:r}),e._queueTotalSize+=r},t.PeekQueueValue=function(e){return i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: PeekQueueValue should only be used on containers with [[queue]] and [[queueTotalSize]]."),i(e._queue.length>0,"Spec-level failure: should never peek at an empty queue."),e._queue[0].value},t.ResetQueue=function(e){i("_queue"in e&&"_queueTotalSize"in e,"Spec-level failure: ResetQueue should only be used on containers with [[queue]] and [[queueTotalSize]]."),e._queue=[],e._queueTotalSize=0}},function(e,t,r){var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}()
function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=r(0),o=n.ArrayBufferCopy,s=n.CreateIterResultObject,c=n.IsFiniteNonNegativeNumber,l=n.InvokeOrNoop,u=n.PromiseInvokeOrNoop,h=n.TransferArrayBuffer,f=n.ValidateAndNormalizeQueuingStrategy,d=n.ValidateAndNormalizeHighWaterMark,g=r(0),m=g.createArrayFromList,p=g.createDataProperty,v=g.typeIsObject,b=r(1),y=b.assert,w=b.rethrowAssertionErrorRejection,k=r(3),S=k.DequeueValue,C=k.EnqueueValueWithSize,x=k.ResetQueue,A=r(2),_=A.AcquireWritableStreamDefaultWriter,P=A.IsWritableStream,I=A.IsWritableStreamLocked,O=A.WritableStreamAbort,E=A.WritableStreamDefaultWriterCloseWithErrorPropagation,T=A.WritableStreamDefaultWriterRelease,F=A.WritableStreamDefaultWriterWrite,R=A.WritableStreamCloseQueuedOrInFlight,B=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.size,n=r.highWaterMark
i(this,e),this._state="readable",this._reader=void 0,this._storedError=void 0,this._disturbed=!1,this._readableStreamController=void 0
var o=t.type
if("bytes"===String(o))void 0===n&&(n=0),this._readableStreamController=new he(this,t,n)
else{if(void 0!==o)throw new RangeError("Invalid type is specified")
void 0===n&&(n=1),this._readableStreamController=new re(this,t,a,n)}}return a(e,[{key:"cancel",value:function(e){return!1===M(this)?Promise.reject(Ie("cancel")):!0===L(this)?Promise.reject(new TypeError("Cannot cancel a stream that already has a reader")):q(this,e)}},{key:"getReader",value:function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).mode
if(!1===M(this))throw Ie("getReader")
if(void 0===e)return D(this)
if("byob"===(e=String(e)))return new Y(this)
throw new RangeError("Invalid mode is specified")}},{key:"pipeThrough",value:function(e,t){var r=e.writable,a=e.readable
return function(e){try{Promise.prototype.then.call(e,void 0,function(){})}catch(e){}}(this.pipeTo(r,t)),a}},{key:"pipeTo",value:function(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=r.preventClose,i=r.preventAbort,n=r.preventCancel
if(!1===M(this))return Promise.reject(Ie("pipeTo"))
if(!1===P(e))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"))
if(a=Boolean(a),i=Boolean(i),n=Boolean(n),!0===L(this))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"))
if(!0===I(e))return Promise.reject(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"))
var o=D(this),s=_(e),c=!1,l=Promise.resolve()
return new Promise(function(r,u){var h,f,d
if(p(t,o._closedPromise,function(t){!1===i?v(function(){return O(e,t)},!0,t):b(!0,t)}),p(e,s._closedPromise,function(e){!1===n?v(function(){return q(t,e)},!0,e):b(!0,e)}),h=t,f=o._closedPromise,d=function(){!1===a?v(function(){return E(s)}):b()},"closed"===h._state?d():f.then(d).catch(w),!0===R(e)||"closed"===e._state){var g=new TypeError("the destination writable stream closed before all data could be piped to it")
!1===n?v(function(){return q(t,g)},!0,g):b(!0,g)}function m(){var e=l
return l.then(function(){return e!==l?m():void 0})}function p(e,t,r){"errored"===e._state?r(e._storedError):t.catch(r).catch(w)}function v(t,r,a){function i(){t().then(function(){return y(r,a)},function(e){return y(!0,e)}).catch(w)}!0!==c&&(c=!0,"writable"===e._state&&!1===R(e)?m().then(i):i())}function b(t,r){!0!==c&&(c=!0,"writable"===e._state&&!1===R(e)?m().then(function(){return y(t,r)}).catch(w):y(t,r))}function y(e,t){T(s),ee(o),e?u(t):r(void 0)}(function e(){return l=Promise.resolve(),!0===c?Promise.resolve():s._readyPromise.then(function(){return te(o).then(function(e){var t=e.value
!0!==e.done&&(l=F(s,t).catch(function(){}))})}).then(e)})().catch(function(e){l=Promise.resolve(),w(e)})})}},{key:"tee",value:function(){if(!1===M(this))throw Ie("tee")
var e=function(e,t){y(!0===M(e)),y("boolean"==typeof t)
var r=D(e),a={closedOrErrored:!1,canceled1:!1,canceled2:!1,reason1:void 0,reason2:void 0}
a.promise=new Promise(function(e){a._resolve=e})
var i=function e(){var t=e._reader,r=e._branch1,a=e._branch2,i=e._teeState
return te(t).then(function(e){y(v(e))
var t=e.value,n=e.done
if(y("boolean"==typeof n),!0===n&&!1===i.closedOrErrored&&(!1===i.canceled1&&ne(r),!1===i.canceled2&&ne(a),i.closedOrErrored=!0),!0!==i.closedOrErrored){var o=t,s=t
!1===i.canceled1&&oe(r,o),!1===i.canceled2&&oe(a,s)}})}
i._reader=r,i._teeState=a,i._cloneForBranch2=t
var n=function e(t){var r=e._stream,a=e._teeState
if(a.canceled1=!0,a.reason1=t,!0===a.canceled2){var i=m([a.reason1,a.reason2]),n=q(r,i)
a._resolve(n)}return a.promise}
n._stream=e,n._teeState=a
var o=function e(t){var r=e._stream,a=e._teeState
if(a.canceled2=!0,a.reason2=t,!0===a.canceled1){var i=m([a.reason1,a.reason2]),n=q(r,i)
a._resolve(n)}return a.promise}
o._stream=e,o._teeState=a
var s=Object.create(Object.prototype)
p(s,"pull",i),p(s,"cancel",n)
var c=new B(s),l=Object.create(Object.prototype)
p(l,"pull",i),p(l,"cancel",o)
var u=new B(l)
return i._branch1=c._readableStreamController,i._branch2=u._readableStreamController,r._closedPromise.catch(function(e){!0!==a.closedOrErrored&&(se(i._branch1,e),se(i._branch2,e),a.closedOrErrored=!0)}),[c,u]}(this,!1)
return m(e)}},{key:"locked",get:function(){if(!1===M(this))throw Ie("locked")
return L(this)}}]),e}()
function D(e){return new K(e)}function M(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")}function L(e){return y(!0===M(e),"IsReadableStreamLocked should only be used on known readable streams"),void 0!==e._reader}function N(e){return y(!0===J(e._reader)),y("readable"===e._state||"closed"===e._state),new Promise(function(t,r){var a={_resolve:t,_reject:r}
e._reader._readIntoRequests.push(a)})}function U(e){return y(!0===Z(e._reader)),y("readable"===e._state),new Promise(function(t,r){var a={_resolve:t,_reject:r}
e._reader._readRequests.push(a)})}function q(e,t){return e._disturbed=!0,"closed"===e._state?Promise.resolve(void 0):"errored"===e._state?Promise.reject(e._storedError):(j(e),e._readableStreamController.__cancelSteps(t).then(function(){}))}function j(e){y("readable"===e._state),e._state="closed"
var t=e._reader
if(void 0!==t){if(!0===Z(t)){for(var r=0;r<t._readRequests.length;r++)(0,t._readRequests[r]._resolve)(s(void 0,!0))
t._readRequests=[]}!function(e){y(void 0!==e._closedPromise_resolve),y(void 0!==e._closedPromise_reject),e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}(t)}}function z(e,t){y(!0===M(e),"stream must be ReadableStream"),y("readable"===e._state,"state must be readable"),e._state="errored",e._storedError=t
var r=e._reader
if(void 0!==r){if(!0===Z(r)){for(var a=0;a<r._readRequests.length;a++)r._readRequests[a]._reject(t)
r._readRequests=[]}else{y(J(r),"reader must be ReadableStreamBYOBReader")
for(var i=0;i<r._readIntoRequests.length;i++)r._readIntoRequests[i]._reject(t)
r._readIntoRequests=[]}Te(r,t),r._closedPromise.catch(function(){})}}function H(e,t,r){var a=e._reader
y(a._readRequests.length>0),a._readRequests.shift()._resolve(s(t,r))}function W(e){return e._reader._readIntoRequests.length}function G(e){return e._reader._readRequests.length}function X(e){var t=e._reader
return void 0!==t&&!1!==J(t)}function V(e){var t=e._reader
return void 0!==t&&!1!==Z(t)}e.exports={ReadableStream:B,IsReadableStreamDisturbed:function(e){return y(!0===M(e),"IsReadableStreamDisturbed should only be used on known readable streams"),e._disturbed},ReadableStreamDefaultControllerClose:ne,ReadableStreamDefaultControllerEnqueue:oe,ReadableStreamDefaultControllerError:se,ReadableStreamDefaultControllerGetDesiredSize:le}
var K=function(){function e(t){if(i(this,e),!1===M(t))throw new TypeError("ReadableStreamDefaultReader can only be constructed with a ReadableStream instance")
if(!0===L(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader")
Q(this,t),this._readRequests=[]}return a(e,[{key:"cancel",value:function(e){return!1===Z(this)?Promise.reject(Ee("cancel")):void 0===this._ownerReadableStream?Promise.reject(Oe("cancel")):$(this,e)}},{key:"read",value:function(){return!1===Z(this)?Promise.reject(Ee("read")):void 0===this._ownerReadableStream?Promise.reject(Oe("read from")):te(this)}},{key:"releaseLock",value:function(){if(!1===Z(this))throw Ee("releaseLock")
if(void 0!==this._ownerReadableStream){if(this._readRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled")
ee(this)}}},{key:"closed",get:function(){return!1===Z(this)?Promise.reject(Ee("closed")):this._closedPromise}}]),e}(),Y=function(){function e(t){if(i(this,e),!M(t))throw new TypeError("ReadableStreamBYOBReader can only be constructed with a ReadableStream instance given a byte source")
if(!1===fe(t._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source")
if(L(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader")
Q(this,t),this._readIntoRequests=[]}return a(e,[{key:"cancel",value:function(e){return J(this)?void 0===this._ownerReadableStream?Promise.reject(Oe("cancel")):$(this,e):Promise.reject(Fe("cancel"))}},{key:"read",value:function(e){return J(this)?void 0===this._ownerReadableStream?Promise.reject(Oe("read from")):ArrayBuffer.isView(e)?0===e.byteLength?Promise.reject(new TypeError("view must have non-zero byteLength")):function(e,t){var r=e._ownerReadableStream
return y(void 0!==r),r._disturbed=!0,"errored"===r._state?Promise.reject(r._storedError):function(e,t){var r=e._controlledReadableStream,a=1
t.constructor!==DataView&&(a=t.constructor.BYTES_PER_ELEMENT)
var i=t.constructor,n={buffer:t.buffer,byteOffset:t.byteOffset,byteLength:t.byteLength,bytesFilled:0,elementSize:a,ctor:i,readerType:"byob"}
if(e._pendingPullIntos.length>0)return n.buffer=h(n.buffer),e._pendingPullIntos.push(n),N(r)
if("closed"===r._state){var o=new t.constructor(n.buffer,n.byteOffset,0)
return Promise.resolve(s(o,!0))}if(e._queueTotalSize>0){if(!0===ye(e,n)){var c=ve(n)
return ke(e),Promise.resolve(s(c,!1))}if(!0===e._closeRequested){var l=new TypeError("Insufficient bytes to fill elements in the given buffer")
return _e(e,l),Promise.reject(l)}}n.buffer=h(n.buffer),e._pendingPullIntos.push(n)
var u=N(r)
return ge(e),u}(r._readableStreamController,t)}(this,e):Promise.reject(new TypeError("view must be an array buffer view")):Promise.reject(Fe("read"))}},{key:"releaseLock",value:function(){if(!J(this))throw Fe("releaseLock")
if(void 0!==this._ownerReadableStream){if(this._readIntoRequests.length>0)throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled")
ee(this)}}},{key:"closed",get:function(){return J(this)?this._closedPromise:Promise.reject(Fe("closed"))}}]),e}()
function J(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")}function Z(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_readRequests")}function Q(e,t){e._ownerReadableStream=t,t._reader=e,"readable"===t._state?function(e){e._closedPromise=new Promise(function(t,r){e._closedPromise_resolve=t,e._closedPromise_reject=r})}(e):"closed"===t._state?function(e){e._closedPromise=Promise.resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}(e):(y("errored"===t._state,"state must be errored"),function(e,t){e._closedPromise=Promise.reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}(e,t._storedError),e._closedPromise.catch(function(){}))}function $(e,t){var r=e._ownerReadableStream
return y(void 0!==r),q(r,t)}function ee(e){y(void 0!==e._ownerReadableStream),y(e._ownerReadableStream._reader===e),"readable"===e._ownerReadableStream._state?Te(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):function(e,t){y(void 0===e._closedPromise_resolve),y(void 0===e._closedPromise_reject),e._closedPromise=Promise.reject(t)}(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),e._closedPromise.catch(function(){}),e._ownerReadableStream._reader=void 0,e._ownerReadableStream=void 0}function te(e){var t=e._ownerReadableStream
return y(void 0!==t),t._disturbed=!0,"closed"===t._state?Promise.resolve(s(void 0,!0)):"errored"===t._state?Promise.reject(t._storedError):(y("readable"===t._state),t._readableStreamController.__pullSteps())}var re=function(){function e(t,r,a,n){if(i(this,e),!1===M(t))throw new TypeError("ReadableStreamDefaultController can only be constructed with a ReadableStream instance")
if(void 0!==t._readableStreamController)throw new TypeError("ReadableStreamDefaultController instances can only be created by the ReadableStream constructor")
this._controlledReadableStream=t,this._underlyingSource=r,this._queue=void 0,this._queueTotalSize=void 0,x(this),this._started=!1,this._closeRequested=!1,this._pullAgain=!1,this._pulling=!1
var o=f(a,n)
this._strategySize=o.size,this._strategyHWM=o.highWaterMark
var s=this,c=l(r,"start",[this])
Promise.resolve(c).then(function(){s._started=!0,y(!1===s._pulling),y(!1===s._pullAgain),ie(s)},function(e){ce(s,e)}).catch(w)}return a(e,[{key:"close",value:function(){if(!1===ae(this))throw Re("close")
if(!0===this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!")
var e=this._controlledReadableStream._state
if("readable"!==e)throw new TypeError("The stream (in "+e+" state) is not in the readable state and cannot be closed")
ne(this)}},{key:"enqueue",value:function(e){if(!1===ae(this))throw Re("enqueue")
if(!0===this._closeRequested)throw new TypeError("stream is closed or draining")
var t=this._controlledReadableStream._state
if("readable"!==t)throw new TypeError("The stream (in "+t+" state) is not in the readable state and cannot be enqueued to")
return oe(this,e)}},{key:"error",value:function(e){if(!1===ae(this))throw Re("error")
var t=this._controlledReadableStream
if("readable"!==t._state)throw new TypeError("The stream is "+t._state+" and so cannot be errored")
se(this,e)}},{key:"__cancelSteps",value:function(e){return x(this),u(this._underlyingSource,"cancel",[e])}},{key:"__pullSteps",value:function(){var e=this._controlledReadableStream
if(this._queue.length>0){var t=S(this)
return!0===this._closeRequested&&0===this._queue.length?j(e):ie(this),Promise.resolve(s(t,!1))}var r=U(e)
return ie(this),r}},{key:"desiredSize",get:function(){if(!1===ae(this))throw Re("desiredSize")
return le(this)}}]),e}()
function ae(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingSource")}function ie(e){!1!==function(e){var t=e._controlledReadableStream
return"closed"!==t._state&&"errored"!==t._state&&(!0!==e._closeRequested&&(!1!==e._started&&(!0===L(t)&&G(t)>0||le(e)>0)))}(e)&&(!0!==e._pulling?(y(!1===e._pullAgain),e._pulling=!0,u(e._underlyingSource,"pull",[e]).then(function(){if(e._pulling=!1,!0===e._pullAgain)return e._pullAgain=!1,ie(e)},function(t){ce(e,t)}).catch(w)):e._pullAgain=!0)}function ne(e){var t=e._controlledReadableStream
y(!1===e._closeRequested),y("readable"===t._state),e._closeRequested=!0,0===e._queue.length&&j(t)}function oe(e,t){var r=e._controlledReadableStream
if(y(!1===e._closeRequested),y("readable"===r._state),!0===L(r)&&G(r)>0)H(r,t,!1)
else{var a=1
if(void 0!==e._strategySize){var i=e._strategySize
try{a=i(t)}catch(t){throw ce(e,t),t}}try{C(e,t,a)}catch(t){throw ce(e,t),t}}ie(e)}function se(e,t){var r=e._controlledReadableStream
y("readable"===r._state),x(e),z(r,t)}function ce(e,t){"readable"===e._controlledReadableStream._state&&se(e,t)}function le(e){var t=e._controlledReadableStream._state
return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}var ue=function(){function e(t,r){i(this,e),this._associatedReadableByteStreamController=t,this._view=r}return a(e,[{key:"respond",value:function(e){if(!1===de(this))throw Be("respond")
if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated")
!function(e,t){if(t=Number(t),!1===c(t))throw new RangeError("bytesWritten must be a finite")
y(e._pendingPullIntos.length>0),xe(e,t)}(this._associatedReadableByteStreamController,e)}},{key:"respondWithNewView",value:function(e){if(!1===de(this))throw Be("respond")
if(void 0===this._associatedReadableByteStreamController)throw new TypeError("This BYOB request has been invalidated")
if(!ArrayBuffer.isView(e))throw new TypeError("You can only respond with array buffer views")
!function(e,t){y(e._pendingPullIntos.length>0)
var r=e._pendingPullIntos[0]
if(r.byteOffset+r.bytesFilled!==t.byteOffset)throw new RangeError("The region specified by view does not match byobRequest")
if(r.byteLength!==t.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest")
r.buffer=t.buffer,xe(e,t.byteLength)}(this._associatedReadableByteStreamController,e)}},{key:"view",get:function(){return this._view}}]),e}(),he=function(){function e(t,r,a){if(i(this,e),!1===M(t))throw new TypeError("ReadableByteStreamController can only be constructed with a ReadableStream instance given a byte source")
if(void 0!==t._readableStreamController)throw new TypeError("ReadableByteStreamController instances can only be created by the ReadableStream constructor given a byte source")
this._controlledReadableStream=t,this._underlyingByteSource=r,this._pullAgain=!1,this._pulling=!1,me(this),this._queue=this._queueTotalSize=void 0,x(this),this._closeRequested=!1,this._started=!1,this._strategyHWM=d(a)
var n=r.autoAllocateChunkSize
if(void 0!==n&&(!1===Number.isInteger(n)||n<=0))throw new RangeError("autoAllocateChunkSize must be a positive integer")
this._autoAllocateChunkSize=n,this._pendingPullIntos=[]
var o=this,s=l(r,"start",[this])
Promise.resolve(s).then(function(){o._started=!0,y(!1===o._pulling),y(!1===o._pullAgain),ge(o)},function(e){"readable"===t._state&&_e(o,e)}).catch(w)}return a(e,[{key:"close",value:function(){if(!1===fe(this))throw De("close")
if(!0===this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!")
var e=this._controlledReadableStream._state
if("readable"!==e)throw new TypeError("The stream (in "+e+" state) is not in the readable state and cannot be closed")
!function(e){var t=e._controlledReadableStream
if(y(!1===e._closeRequested),y("readable"===t._state),e._queueTotalSize>0)e._closeRequested=!0
else{if(e._pendingPullIntos.length>0)if(e._pendingPullIntos[0].bytesFilled>0){var r=new TypeError("Insufficient bytes to fill elements in the given buffer")
throw _e(e,r),r}j(t)}}(this)}},{key:"enqueue",value:function(e){if(!1===fe(this))throw De("enqueue")
if(!0===this._closeRequested)throw new TypeError("stream is closed or draining")
var t=this._controlledReadableStream._state
if("readable"!==t)throw new TypeError("The stream (in "+t+" state) is not in the readable state and cannot be enqueued to")
if(!ArrayBuffer.isView(e))throw new TypeError("You can only enqueue array buffer views when using a ReadableByteStreamController")
!function(e,t){var r=e._controlledReadableStream
y(!1===e._closeRequested),y("readable"===r._state)
var a=t.buffer,i=t.byteOffset,n=t.byteLength,o=h(a)
if(!0===V(r))if(0===G(r))be(e,o,i,n)
else{y(0===e._queue.length),H(r,new Uint8Array(o,i,n),!1)}else!0===X(r)?(be(e,o,i,n),Ce(e)):(y(!1===L(r),"stream must not be locked"),be(e,o,i,n))}(this,e)}},{key:"error",value:function(e){if(!1===fe(this))throw De("error")
var t=this._controlledReadableStream
if("readable"!==t._state)throw new TypeError("The stream is "+t._state+" and so cannot be errored")
_e(this,e)}},{key:"__cancelSteps",value:function(e){return this._pendingPullIntos.length>0&&(this._pendingPullIntos[0].bytesFilled=0),x(this),u(this._underlyingByteSource,"cancel",[e])}},{key:"__pullSteps",value:function(){var e=this._controlledReadableStream
if(y(!0===V(e)),this._queueTotalSize>0){y(0===G(e))
var t=this._queue.shift()
this._queueTotalSize-=t.byteLength,ke(this)
var r=void 0
try{r=new Uint8Array(t.buffer,t.byteOffset,t.byteLength)}catch(e){return Promise.reject(e)}return Promise.resolve(s(r,!1))}var a=this._autoAllocateChunkSize
if(void 0!==a){var i=void 0
try{i=new ArrayBuffer(a)}catch(e){return Promise.reject(e)}var n={buffer:i,byteOffset:0,byteLength:a,bytesFilled:0,elementSize:1,ctor:Uint8Array,readerType:"default"}
this._pendingPullIntos.push(n)}var o=U(e)
return ge(this),o}},{key:"byobRequest",get:function(){if(!1===fe(this))throw De("byobRequest")
if(void 0===this._byobRequest&&this._pendingPullIntos.length>0){var e=this._pendingPullIntos[0],t=new Uint8Array(e.buffer,e.byteOffset+e.bytesFilled,e.byteLength-e.bytesFilled)
this._byobRequest=new ue(this,t)}return this._byobRequest}},{key:"desiredSize",get:function(){if(!1===fe(this))throw De("desiredSize")
return Pe(this)}}]),e}()
function fe(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_underlyingByteSource")}function de(e){return!!v(e)&&!!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")}function ge(e){!1!==function(e){var t=e._controlledReadableStream
return"readable"===t._state&&(!0!==e._closeRequested&&(!1!==e._started&&(!0===V(t)&&G(t)>0||(!0===X(t)&&W(t)>0||Pe(e)>0))))}(e)&&(!0!==e._pulling?(y(!1===e._pullAgain),e._pulling=!0,u(e._underlyingByteSource,"pull",[e]).then(function(){e._pulling=!1,!0===e._pullAgain&&(e._pullAgain=!1,ge(e))},function(t){"readable"===e._controlledReadableStream._state&&_e(e,t)}).catch(w)):e._pullAgain=!0)}function me(e){Se(e),e._pendingPullIntos=[]}function pe(e,t){y("errored"!==e._state,"state must not be errored")
var r=!1
"closed"===e._state&&(y(0===t.bytesFilled),r=!0)
var a=ve(t)
"default"===t.readerType?H(e,a,r):(y("byob"===t.readerType),function(e,t,r){var a=e._reader
y(a._readIntoRequests.length>0),a._readIntoRequests.shift()._resolve(s(t,r))}(e,a,r))}function ve(e){var t=e.bytesFilled,r=e.elementSize
return y(t<=e.byteLength),y(t%r==0),new e.ctor(e.buffer,e.byteOffset,t/r)}function be(e,t,r,a){e._queue.push({buffer:t,byteOffset:r,byteLength:a}),e._queueTotalSize+=a}function ye(e,t){var r=t.elementSize,a=t.bytesFilled-t.bytesFilled%r,i=Math.min(e._queueTotalSize,t.byteLength-t.bytesFilled),n=t.bytesFilled+i,s=n-n%r,c=i,l=!1
s>a&&(c=s-t.bytesFilled,l=!0)
for(var u=e._queue;c>0;){var h=u[0],f=Math.min(c,h.byteLength),d=t.byteOffset+t.bytesFilled
o(t.buffer,d,h.buffer,h.byteOffset,f),h.byteLength===f?u.shift():(h.byteOffset+=f,h.byteLength-=f),e._queueTotalSize-=f,we(e,f,t),c-=f}return!1===l&&(y(0===e._queueTotalSize,"queue must be empty"),y(t.bytesFilled>0),y(t.bytesFilled<t.elementSize)),l}function we(e,t,r){y(0===e._pendingPullIntos.length||e._pendingPullIntos[0]===r),Se(e),r.bytesFilled+=t}function ke(e){y("readable"===e._controlledReadableStream._state),0===e._queueTotalSize&&!0===e._closeRequested?j(e._controlledReadableStream):ge(e)}function Se(e){void 0!==e._byobRequest&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=void 0,e._byobRequest=void 0)}function Ce(e){for(y(!1===e._closeRequested);e._pendingPullIntos.length>0;){if(0===e._queueTotalSize)return
var t=e._pendingPullIntos[0]
!0===ye(e,t)&&(Ae(e),pe(e._controlledReadableStream,t))}}function xe(e,t){var r=e._pendingPullIntos[0],a=e._controlledReadableStream
if("closed"===a._state){if(0!==t)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")
!function(e,t){t.buffer=h(t.buffer),y(0===t.bytesFilled,"bytesFilled must be 0")
var r=e._controlledReadableStream
if(!0===X(r))for(;W(r)>0;)pe(r,Ae(e))}(e,r)}else y("readable"===a._state),function(e,t,r){if(r.bytesFilled+t>r.byteLength)throw new RangeError("bytesWritten out of range")
if(we(e,t,r),!(r.bytesFilled<r.elementSize)){Ae(e)
var a=r.bytesFilled%r.elementSize
if(a>0){var i=r.byteOffset+r.bytesFilled,n=r.buffer.slice(i-a,i)
be(e,n,0,n.byteLength)}r.buffer=h(r.buffer),r.bytesFilled-=a,pe(e._controlledReadableStream,r),Ce(e)}}(e,t,r)}function Ae(e){var t=e._pendingPullIntos.shift()
return Se(e),t}function _e(e,t){var r=e._controlledReadableStream
y("readable"===r._state),me(e),x(e),z(r,t)}function Pe(e){var t=e._controlledReadableStream._state
return"errored"===t?null:"closed"===t?0:e._strategyHWM-e._queueTotalSize}function Ie(e){return new TypeError("ReadableStream.prototype."+e+" can only be used on a ReadableStream")}function Oe(e){return new TypeError("Cannot "+e+" a stream using a released reader")}function Ee(e){return new TypeError("ReadableStreamDefaultReader.prototype."+e+" can only be used on a ReadableStreamDefaultReader")}function Te(e,t){y(void 0!==e._closedPromise_resolve),y(void 0!==e._closedPromise_reject),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0}function Fe(e){return new TypeError("ReadableStreamBYOBReader.prototype."+e+" can only be used on a ReadableStreamBYOBReader")}function Re(e){return new TypeError("ReadableStreamDefaultController.prototype."+e+" can only be used on a ReadableStreamDefaultController")}function Be(e){return new TypeError("ReadableStreamBYOBRequest.prototype."+e+" can only be used on a ReadableStreamBYOBRequest")}function De(e){return new TypeError("ReadableByteStreamController.prototype."+e+" can only be used on a ReadableByteStreamController")}},function(e,t,r){var a=r(6),i=r(4),n=r(2)
t.TransformStream=a.TransformStream,t.ReadableStream=i.ReadableStream,t.IsReadableStreamDisturbed=i.IsReadableStreamDisturbed,t.ReadableStreamDefaultControllerClose=i.ReadableStreamDefaultControllerClose,t.ReadableStreamDefaultControllerEnqueue=i.ReadableStreamDefaultControllerEnqueue,t.ReadableStreamDefaultControllerError=i.ReadableStreamDefaultControllerError,t.ReadableStreamDefaultControllerGetDesiredSize=i.ReadableStreamDefaultControllerGetDesiredSize,t.AcquireWritableStreamDefaultWriter=n.AcquireWritableStreamDefaultWriter,t.IsWritableStream=n.IsWritableStream,t.IsWritableStreamLocked=n.IsWritableStreamLocked,t.WritableStream=n.WritableStream,t.WritableStreamAbort=n.WritableStreamAbort,t.WritableStreamDefaultControllerError=n.WritableStreamDefaultControllerError,t.WritableStreamDefaultWriterCloseWithErrorPropagation=n.WritableStreamDefaultWriterCloseWithErrorPropagation,t.WritableStreamDefaultWriterRelease=n.WritableStreamDefaultWriterRelease,t.WritableStreamDefaultWriterWrite=n.WritableStreamDefaultWriterWrite},function(e,t,r){var a=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}()
function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=r(1).assert,o=r(0),s=o.InvokeOrNoop,c=o.PromiseInvokeOrPerformFallback,l=o.PromiseInvokeOrNoop,u=o.typeIsObject,h=r(4),f=h.ReadableStream,d=h.ReadableStreamDefaultControllerClose,g=h.ReadableStreamDefaultControllerEnqueue,m=h.ReadableStreamDefaultControllerError,p=h.ReadableStreamDefaultControllerGetDesiredSize,v=r(2),b=v.WritableStream,y=v.WritableStreamDefaultControllerError
function w(e,t){if(!0===e._errored)throw new TypeError("TransformStream is already errored")
if(!0===e._readableClosed)throw new TypeError("Readable side is already closed")
var r=e._readableController
try{g(r,t)}catch(t){throw e._readableClosed=!0,S(e,t),e._storedError}!0==p(r)<=0&&!1===e._backpressure&&A(e,!0)}function k(e){n(!1===e._errored),n(!1===e._readableClosed)
try{d(e._readableController)}catch(e){n(!1)}e._readableClosed=!0}function S(e,t){!1===e._errored&&C(e,t)}function C(e,t){n(!1===e._errored),e._errored=!0,e._storedError=t,!1===e._writableDone&&y(e._writableController,t),!1===e._readableClosed&&m(e._readableController,t)}function x(e){return n(void 0!==e._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),!1===e._backpressure?Promise.resolve():(n(!0===e._backpressure,"_backpressure should have been initialized"),e._backpressureChangePromise)}function A(e,t){n(e._backpressure!==t,"TransformStreamSetBackpressure() should be called only when backpressure is changed"),void 0!==e._backpressureChangePromise&&e._backpressureChangePromise_resolve(t),e._backpressureChangePromise=new Promise(function(t){e._backpressureChangePromise_resolve=t}),e._backpressureChangePromise.then(function(e){n(e!==t,"_backpressureChangePromise should be fulfilled only when backpressure is changed")}),e._backpressure=t}function _(e,t){return w(t._controlledTransformStream,e),Promise.resolve()}function P(e){return!!u(e)&&!!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")}function I(e){return!!u(e)&&!!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")}var O=function(){function e(t,r){i(this,e),this._transformStream=t,this._startPromise=r}return a(e,[{key:"start",value:function(e){var t=this._transformStream
return t._writableController=e,this._startPromise.then(function(){return x(t)})}},{key:"write",value:function(e){return function(e,t){n(!1===e._errored),n(!1===e._transforming),n(!1===e._backpressure),e._transforming=!0
var r=e._transformer,a=e._transformStreamController
return c(r,"transform",[t,a],_,[t,a]).then(function(){return e._transforming=!1,x(e)},function(t){return S(e,t),Promise.reject(t)})}(this._transformStream,e)}},{key:"abort",value:function(){var e=this._transformStream
e._writableDone=!0,C(e,new TypeError("Writable side aborted"))}},{key:"close",value:function(){var e=this._transformStream
return n(!1===e._transforming),e._writableDone=!0,l(e._transformer,"flush",[e._transformStreamController]).then(function(){return!0===e._errored?Promise.reject(e._storedError):(!1===e._readableClosed&&k(e),Promise.resolve())}).catch(function(t){return S(e,t),Promise.reject(e._storedError)})}}]),e}(),E=function(){function e(t,r){i(this,e),this._transformStream=t,this._startPromise=r}return a(e,[{key:"start",value:function(e){var t=this._transformStream
return t._readableController=e,this._startPromise.then(function(){return n(void 0!==t._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),!0===t._backpressure?Promise.resolve():(n(!1===t._backpressure,"_backpressure should have been initialized"),t._backpressureChangePromise)})}},{key:"pull",value:function(){var e=this._transformStream
return n(!0===e._backpressure,"pull() should be never called while _backpressure is false"),n(void 0!==e._backpressureChangePromise,"_backpressureChangePromise should have been initialized"),A(e,!1),e._backpressureChangePromise}},{key:"cancel",value:function(){var e=this._transformStream
e._readableClosed=!0,C(e,new TypeError("Readable side canceled"))}}]),e}(),T=function(){function e(t){if(i(this,e),!1===I(t))throw new TypeError("TransformStreamDefaultController can only be constructed with a TransformStream instance")
if(void 0!==t._transformStreamController)throw new TypeError("TransformStreamDefaultController instances can only be created by the TransformStream constructor")
this._controlledTransformStream=t}return a(e,[{key:"enqueue",value:function(e){if(!1===P(this))throw R("enqueue")
w(this._controlledTransformStream,e)}},{key:"close",value:function(){if(!1===P(this))throw R("close")
!function(e){if(!0===e._errored)throw new TypeError("TransformStream is already errored")
if(!0===e._readableClosed)throw new TypeError("Readable side is already closed")
k(e)}(this._controlledTransformStream)}},{key:"error",value:function(e){if(!1===P(this))throw R("error")
!function(e,t){if(!0===e._errored)throw new TypeError("TransformStream is already errored")
C(e,t)}(this._controlledTransformStream,e)}},{key:"desiredSize",get:function(){if(!1===P(this))throw R("desiredSize")
var e=this._controlledTransformStream._readableController
return p(e)}}]),e}(),F=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
i(this,e),this._transformer=t
var r=t.readableStrategy,a=t.writableStrategy
this._transforming=!1,this._errored=!1,this._storedError=void 0,this._writableController=void 0,this._readableController=void 0,this._transformStreamController=void 0,this._writableDone=!1,this._readableClosed=!1,this._backpressure=void 0,this._backpressureChangePromise=void 0,this._backpressureChangePromise_resolve=void 0,this._transformStreamController=new T(this)
var o=void 0,c=new Promise(function(e){o=e}),l=new E(this,c)
this._readable=new f(l,r)
var u=new O(this,c)
this._writable=new b(u,a),n(void 0!==this._writableController),n(void 0!==this._readableController),A(this,p(this._readableController)<=0)
var h=this,d=s(t,"start",[h._transformStreamController])
o(d),c.catch(function(e){!1===h._errored&&(h._errored=!0,h._storedError=e)})}return a(e,[{key:"readable",get:function(){if(!1===I(this))throw B("readable")
return this._readable}},{key:"writable",get:function(){if(!1===I(this))throw B("writable")
return this._writable}}]),e}()
function R(e){return new TypeError("TransformStreamDefaultController.prototype."+e+" can only be used on a TransformStreamDefaultController")}function B(e){return new TypeError("TransformStream.prototype."+e+" can only be used on a TransformStream")}e.exports={TransformStream:F}},function(e,t,r){e.exports=r(5)}]))},function(e,t,r){"use strict"
function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var i=!1
try{if("function"==typeof URL&&"object"===a(URL.prototype)&&"origin"in URL.prototype){var n=new URL("b","http://a")
n.pathname="c%20d",i="http://a/c%20d"===n.href}}catch(e){}if(i)t.URL=URL
else{var o=r(150).URL,s=r(8).URL
s&&(o.createObjectURL=function(e){return s.createObjectURL.apply(s,arguments)},o.revokeObjectURL=function(e){s.revokeObjectURL(e)}),t.URL=o}},function(e,t,r){"use strict"
!function(){var e=Object.create(null)
e.ftp=21,e.file=0,e.gopher=70,e.http=80,e.https=443,e.ws=80,e.wss=443
var r=Object.create(null)
function a(t){return void 0!==e[t]}function i(){f.call(this),this._isInvalid=!0}function n(e){return""===e&&i.call(this),e.toLowerCase()}function o(e){var t=e.charCodeAt(0)
return t>32&&t<127&&-1===[34,35,60,62,63,96].indexOf(t)?e:encodeURIComponent(e)}function s(e){var t=e.charCodeAt(0)
return t>32&&t<127&&-1===[34,35,60,62,96].indexOf(t)?e:encodeURIComponent(e)}r["%2e"]=".",r[".%2e"]="..",r["%2e."]="..",r["%2e%2e"]=".."
var c,l=/[a-zA-Z]/,u=/[a-zA-Z0-9\+\-\.]/
function h(t,h,f){function d(e){y.push(e)}var g=h||"scheme start",m=0,p="",v=!1,b=!1,y=[]
e:for(;(t[m-1]!==c||0===m)&&!this._isInvalid;){var w=t[m]
switch(g){case"scheme start":if(!w||!l.test(w)){if(h){d("Invalid scheme.")
break e}p="",g="no scheme"
continue}p+=w.toLowerCase(),g="scheme"
break
case"scheme":if(w&&u.test(w))p+=w.toLowerCase()
else{if(":"!==w){if(h){if(w===c)break e
d("Code point not allowed in scheme: "+w)
break e}p="",m=0,g="no scheme"
continue}if(this._scheme=p,p="",h)break e
a(this._scheme)&&(this._isRelative=!0),g="file"===this._scheme?"relative":this._isRelative&&f&&f._scheme===this._scheme?"relative or authority":this._isRelative?"authority first slash":"scheme data"}break
case"scheme data":"?"===w?(this._query="?",g="query"):"#"===w?(this._fragment="#",g="fragment"):w!==c&&"\t"!==w&&"\n"!==w&&"\r"!==w&&(this._schemeData+=o(w))
break
case"no scheme":if(f&&a(f._scheme)){g="relative"
continue}d("Missing scheme."),i.call(this)
break
case"relative or authority":if("/"!==w||"/"!==t[m+1]){d("Expected /, got: "+w),g="relative"
continue}g="authority ignore slashes"
break
case"relative":if(this._isRelative=!0,"file"!==this._scheme&&(this._scheme=f._scheme),w===c){this._host=f._host,this._port=f._port,this._path=f._path.slice(),this._query=f._query,this._username=f._username,this._password=f._password
break e}if("/"===w||"\\"===w)"\\"===w&&d("\\ is an invalid code point."),g="relative slash"
else if("?"===w)this._host=f._host,this._port=f._port,this._path=f._path.slice(),this._query="?",this._username=f._username,this._password=f._password,g="query"
else{if("#"!==w){var k=t[m+1],S=t[m+2];("file"!==this._scheme||!l.test(w)||":"!==k&&"|"!==k||S!==c&&"/"!==S&&"\\"!==S&&"?"!==S&&"#"!==S)&&(this._host=f._host,this._port=f._port,this._username=f._username,this._password=f._password,this._path=f._path.slice(),this._path.pop()),g="relative path"
continue}this._host=f._host,this._port=f._port,this._path=f._path.slice(),this._query=f._query,this._fragment="#",this._username=f._username,this._password=f._password,g="fragment"}break
case"relative slash":if("/"!==w&&"\\"!==w){"file"!==this._scheme&&(this._host=f._host,this._port=f._port,this._username=f._username,this._password=f._password),g="relative path"
continue}"\\"===w&&d("\\ is an invalid code point."),g="file"===this._scheme?"file host":"authority ignore slashes"
break
case"authority first slash":if("/"!==w){d("Expected '/', got: "+w),g="authority ignore slashes"
continue}g="authority second slash"
break
case"authority second slash":if(g="authority ignore slashes","/"!==w){d("Expected '/', got: "+w)
continue}break
case"authority ignore slashes":if("/"!==w&&"\\"!==w){g="authority"
continue}d("Expected authority, got: "+w)
break
case"authority":if("@"===w){v&&(d("@ already seen."),p+="%40"),v=!0
for(var C=0;C<p.length;C++){var x=p[C]
if("\t"!==x&&"\n"!==x&&"\r"!==x)if(":"!==x||null!==this._password){var A=o(x)
null!==this._password?this._password+=A:this._username+=A}else this._password=""
else d("Invalid whitespace in authority.")}p=""}else{if(w===c||"/"===w||"\\"===w||"?"===w||"#"===w){m-=p.length,p="",g="host"
continue}p+=w}break
case"file host":if(w===c||"/"===w||"\\"===w||"?"===w||"#"===w){2!==p.length||!l.test(p[0])||":"!==p[1]&&"|"!==p[1]?0===p.length?g="relative path start":(this._host=n.call(this,p),p="",g="relative path start"):g="relative path"
continue}"\t"===w||"\n"===w||"\r"===w?d("Invalid whitespace in file host."):p+=w
break
case"host":case"hostname":if(":"!==w||b){if(w===c||"/"===w||"\\"===w||"?"===w||"#"===w){if(this._host=n.call(this,p),p="",g="relative path start",h)break e
continue}"\t"!==w&&"\n"!==w&&"\r"!==w?("["===w?b=!0:"]"===w&&(b=!1),p+=w):d("Invalid code point in host/hostname: "+w)}else if(this._host=n.call(this,p),p="",g="port","hostname"===h)break e
break
case"port":if(/[0-9]/.test(w))p+=w
else{if(w===c||"/"===w||"\\"===w||"?"===w||"#"===w||h){if(""!==p){var _=parseInt(p,10)
_!==e[this._scheme]&&(this._port=_+""),p=""}if(h)break e
g="relative path start"
continue}"\t"===w||"\n"===w||"\r"===w?d("Invalid code point in port: "+w):i.call(this)}break
case"relative path start":if("\\"===w&&d("'\\' not allowed in path."),g="relative path","/"!==w&&"\\"!==w)continue
break
case"relative path":var P
if(w!==c&&"/"!==w&&"\\"!==w&&(h||"?"!==w&&"#"!==w))"\t"!==w&&"\n"!==w&&"\r"!==w&&(p+=o(w))
else"\\"===w&&d("\\ not allowed in relative path."),(P=r[p.toLowerCase()])&&(p=P),".."===p?(this._path.pop(),"/"!==w&&"\\"!==w&&this._path.push("")):"."===p&&"/"!==w&&"\\"!==w?this._path.push(""):"."!==p&&("file"===this._scheme&&0===this._path.length&&2===p.length&&l.test(p[0])&&"|"===p[1]&&(p=p[0]+":"),this._path.push(p)),p="","?"===w?(this._query="?",g="query"):"#"===w&&(this._fragment="#",g="fragment")
break
case"query":h||"#"!==w?w!==c&&"\t"!==w&&"\n"!==w&&"\r"!==w&&(this._query+=s(w)):(this._fragment="#",g="fragment")
break
case"fragment":w!==c&&"\t"!==w&&"\n"!==w&&"\r"!==w&&(this._fragment+=w)}m++}}function f(){this._scheme="",this._schemeData="",this._username="",this._password=null,this._host="",this._port="",this._path=[],this._query="",this._fragment="",this._isInvalid=!1,this._isRelative=!1}function d(e,t){void 0===t||t instanceof d||(t=new d(String(t))),this._url=e,f.call(this)
var r=e.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"")
h.call(this,r,null,t)}d.prototype={toString:function(){return this.href},get href(){if(this._isInvalid)return this._url
var e=""
return""===this._username&&null===this._password||(e=this._username+(null!==this._password?":"+this._password:"")+"@"),this.protocol+(this._isRelative?"//"+e+this.host:"")+this.pathname+this._query+this._fragment},set href(e){f.call(this),h.call(this,e)},get protocol(){return this._scheme+":"},set protocol(e){this._isInvalid||h.call(this,e+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(e){!this._isInvalid&&this._isRelative&&h.call(this,e,"host")},get hostname(){return this._host},set hostname(e){!this._isInvalid&&this._isRelative&&h.call(this,e,"hostname")},get port(){return this._port},set port(e){!this._isInvalid&&this._isRelative&&h.call(this,e,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(e){!this._isInvalid&&this._isRelative&&(this._path=[],h.call(this,e,"relative path start"))},get search(){return this._isInvalid||!this._query||"?"===this._query?"":this._query},set search(e){!this._isInvalid&&this._isRelative&&(this._query="?","?"===e[0]&&(e=e.slice(1)),h.call(this,e,"query"))},get hash(){return this._isInvalid||!this._fragment||"#"===this._fragment?"":this._fragment},set hash(e){this._isInvalid||(this._fragment="#","#"===e[0]&&(e=e.slice(1)),h.call(this,e,"fragment"))},get origin(){var e
if(this._isInvalid||!this._scheme)return""
switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"
case"blob":try{return new d(this._schemeData).origin||"null"}catch(e){}return"null"}return(e=this.host)?this._scheme+"://"+e:""}},t.URL=d}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.NetworkPdfManager=t.LocalPdfManager=void 0
var a,i=(a=r(2))&&a.__esModule?a:{default:a},n=r(6),o=r(152),s=r(153),c=r(157)
function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?d(e):t}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function d(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}function g(e,t,r,a,i,n,o){try{var s=e[n](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(a,i)}function m(e){return function(){var t=this,r=arguments
return new Promise(function(a,i){var n=e.apply(t,r)
function o(e){g(n,a,i,o,s,"next",e)}function s(e){g(n,a,i,o,s,"throw",e)}o(void 0)})}}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function v(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function b(e,t,r){return t&&v(e.prototype,t),r&&v(e,r),e}var y=function(){function e(){p(this,e),this.constructor===e&&(0,n.unreachable)("Cannot initialize BasePdfManager.")}return b(e,[{key:"onLoadedStream",value:function(){(0,n.unreachable)("Abstract method `onLoadedStream` called")}},{key:"ensureDoc",value:function(e,t){return this.ensure(this.pdfDocument,e,t)}},{key:"ensureXRef",value:function(e,t){return this.ensure(this.pdfDocument.xref,e,t)}},{key:"ensureCatalog",value:function(e,t){return this.ensure(this.pdfDocument.catalog,e,t)}},{key:"getPage",value:function(e){return this.pdfDocument.getPage(e)}},{key:"fontFallback",value:function(e,t){return this.pdfDocument.fontFallback(e,t)}},{key:"cleanup",value:function(){return this.pdfDocument.cleanup()}},{key:"ensure",value:function(){var e=m(i.default.mark(function e(t,r,a){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,n.unreachable)("Abstract method `ensure` called")
case 1:case"end":return e.stop()}},e,this)}))
return function(t,r,a){return e.apply(this,arguments)}}()},{key:"requestRange",value:function(e,t){(0,n.unreachable)("Abstract method `requestRange` called")}},{key:"requestLoadedStream",value:function(){(0,n.unreachable)("Abstract method `requestLoadedStream` called")}},{key:"sendProgressiveData",value:function(e){(0,n.unreachable)("Abstract method `sendProgressiveData` called")}},{key:"updatePassword",value:function(e){this._password=e}},{key:"terminate",value:function(){(0,n.unreachable)("Abstract method `terminate` called")}},{key:"docId",get:function(){return this._docId}},{key:"password",get:function(){return this._password}},{key:"docBaseUrl",get:function(){var e=null
if(this._docBaseUrl){var t=(0,n.createValidAbsoluteUrl)(this._docBaseUrl)
t?e=t.href:(0,n.warn)('Invalid absolute docBaseUrl: "'.concat(this._docBaseUrl,'".'))}return(0,n.shadow)(this,"docBaseUrl",e)}}]),e}(),w=function(e){function t(e,r,a,i,n){var o
p(this,t),(o=u(this,h(t).call(this)))._docId=e,o._password=a,o._docBaseUrl=n,o.evaluatorOptions=i
var l=new c.Stream(r)
return o.pdfDocument=new s.PDFDocument(d(d(o)),l),o._loadedStreamPromise=Promise.resolve(l),o}return f(t,y),b(t,[{key:"ensure",value:function(){var e=m(i.default.mark(function e(t,r,a){var n
return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if("function"!=typeof(n=t[r])){e.next=3
break}return e.abrupt("return",n.apply(t,a))
case 3:return e.abrupt("return",n)
case 4:case"end":return e.stop()}},e,this)}))
return function(t,r,a){return e.apply(this,arguments)}}()},{key:"requestRange",value:function(e,t){return Promise.resolve()}},{key:"requestLoadedStream",value:function(){}},{key:"onLoadedStream",value:function(){return this._loadedStreamPromise}},{key:"terminate",value:function(){}}]),t}()
t.LocalPdfManager=w
var k=function(e){function t(e,r,a,i,n){var c
return p(this,t),(c=u(this,h(t).call(this)))._docId=e,c._password=a.password,c._docBaseUrl=n,c.msgHandler=a.msgHandler,c.evaluatorOptions=i,c.streamManager=new o.ChunkedStreamManager(r,{msgHandler:a.msgHandler,length:a.length,disableAutoFetch:a.disableAutoFetch,rangeChunkSize:a.rangeChunkSize}),c.pdfDocument=new s.PDFDocument(d(d(c)),c.streamManager.getStream()),c}return f(t,y),b(t,[{key:"ensure",value:function(){var e=m(i.default.mark(function e(t,r,a){var o
return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,"function"!=typeof(o=t[r])){e.next=4
break}return e.abrupt("return",o.apply(t,a))
case 4:return e.abrupt("return",o)
case 7:if(e.prev=7,e.t0=e.catch(0),e.t0 instanceof n.MissingDataException){e.next=11
break}throw e.t0
case 11:return e.next=13,this.requestRange(e.t0.begin,e.t0.end)
case 13:return e.abrupt("return",this.ensure(t,r,a))
case 14:case"end":return e.stop()}},e,this,[[0,7]])}))
return function(t,r,a){return e.apply(this,arguments)}}()},{key:"requestRange",value:function(e,t){return this.streamManager.requestRange(e,t)}},{key:"requestLoadedStream",value:function(){this.streamManager.requestAllChunks()}},{key:"sendProgressiveData",value:function(e){this.streamManager.onReceiveData({chunk:e})}},{key:"onLoadedStream",value:function(){return this.streamManager.onLoadedStream()}},{key:"terminate",value:function(){this.streamManager.abort()}}]),t}()
t.NetworkPdfManager=k},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.ChunkedStreamManager=t.ChunkedStream=void 0
var a=r(6)
function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function o(e,t,r){return t&&n(e.prototype,t),r&&n(e,r),e}var s=function(){function e(t,r,a){i(this,e),this.bytes=new Uint8Array(t),this.start=0,this.pos=0,this.end=t,this.chunkSize=r,this.loadedChunks=[],this.numChunksLoaded=0,this.numChunks=Math.ceil(t/r),this.manager=a,this.progressiveDataLength=0,this.lastSuccessfulEnsureByteChunk=-1}return o(e,[{key:"getMissingChunks",value:function(){for(var e=[],t=0,r=this.numChunks;t<r;++t)this.loadedChunks[t]||e.push(t)
return e}},{key:"getBaseStreams",value:function(){return[this]}},{key:"allChunksLoaded",value:function(){return this.numChunksLoaded===this.numChunks}},{key:"onReceiveData",value:function(e,t){var r=this.chunkSize
if(e%r!=0)throw new Error("Bad begin offset: ".concat(e))
var a=e+t.byteLength
if(a%r!=0&&a!==this.bytes.length)throw new Error("Bad end offset: ".concat(a))
this.bytes.set(new Uint8Array(t),e)
for(var i=Math.floor(e/r),n=Math.floor((a-1)/r)+1,o=i;o<n;++o)this.loadedChunks[o]||(this.loadedChunks[o]=!0,++this.numChunksLoaded)}},{key:"onReceiveProgressiveData",value:function(e){var t=this.progressiveDataLength,r=Math.floor(t/this.chunkSize)
this.bytes.set(new Uint8Array(e),t),t+=e.byteLength,this.progressiveDataLength=t
for(var a=t>=this.end?this.numChunks:Math.floor(t/this.chunkSize),i=r;i<a;++i)this.loadedChunks[i]||(this.loadedChunks[i]=!0,++this.numChunksLoaded)}},{key:"ensureByte",value:function(e){var t=Math.floor(e/this.chunkSize)
if(t!==this.lastSuccessfulEnsureByteChunk){if(!this.loadedChunks[t])throw new a.MissingDataException(e,e+1)
this.lastSuccessfulEnsureByteChunk=t}}},{key:"ensureRange",value:function(e,t){if(!(e>=t||t<=this.progressiveDataLength))for(var r=this.chunkSize,i=Math.floor(e/r),n=Math.floor((t-1)/r)+1,o=i;o<n;++o)if(!this.loadedChunks[o])throw new a.MissingDataException(e,t)}},{key:"nextEmptyChunk",value:function(e){for(var t=this.numChunks,r=0;r<t;++r){var a=(e+r)%t
if(!this.loadedChunks[a])return a}return null}},{key:"hasChunk",value:function(e){return!!this.loadedChunks[e]}},{key:"getByte",value:function(){var e=this.pos
return e>=this.end?-1:(this.ensureByte(e),this.bytes[this.pos++])}},{key:"getUint16",value:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t}},{key:"getInt32",value:function(){return(this.getByte()<<24)+(this.getByte()<<16)+(this.getByte()<<8)+this.getByte()}},{key:"getBytes",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.bytes,a=this.pos,i=this.end
if(!e){this.ensureRange(a,i)
var n=r.subarray(a,i)
return t?new Uint8ClampedArray(n):n}var o=a+e
o>i&&(o=i),this.ensureRange(a,o),this.pos=o
var s=r.subarray(a,o)
return t?new Uint8ClampedArray(s):s}},{key:"peekByte",value:function(){var e=this.getByte()
return this.pos--,e}},{key:"peekBytes",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getBytes(e,t)
return this.pos-=r.length,r}},{key:"getByteRange",value:function(e,t){return this.ensureRange(e,t),this.bytes.subarray(e,t)}},{key:"skip",value:function(e){e||(e=1),this.pos+=e}},{key:"reset",value:function(){this.pos=this.start}},{key:"moveStart",value:function(){this.start=this.pos}},{key:"makeSubStream",value:function(e,t,r){function a(){}this.ensureRange(e,e+t),a.prototype=Object.create(this),a.prototype.getMissingChunks=function(){for(var e=this.chunkSize,t=Math.floor(this.start/e),r=Math.floor((this.end-1)/e)+1,a=[],i=t;i<r;++i)this.loadedChunks[i]||a.push(i)
return a}
var i=new a
return i.pos=i.start=e,i.end=e+t||this.end,i.dict=r,i}},{key:"length",get:function(){return this.end-this.start}},{key:"isEmpty",get:function(){return 0===this.length}}]),e}()
t.ChunkedStream=s
var c=function(){function e(t,r){i(this,e),this.length=r.length,this.chunkSize=r.rangeChunkSize,this.stream=new s(this.length,this.chunkSize,this),this.pdfNetworkStream=t,this.disableAutoFetch=r.disableAutoFetch,this.msgHandler=r.msgHandler,this.currRequestId=0,this.chunksNeededByRequest=Object.create(null),this.requestsByChunk=Object.create(null),this.promisesByRequest=Object.create(null),this.progressiveDataLength=0,this.aborted=!1,this._loadedStreamCapability=(0,a.createPromiseCapability)()}return o(e,[{key:"onLoadedStream",value:function(){return this._loadedStreamCapability.promise}},{key:"sendRequest",value:function(e,t){var r=this,i=this.pdfNetworkStream.getRangeReader(e,t)
i.isStreamingSupported||(i.onProgress=this.onProgress.bind(this))
var n=[],o=0
new Promise(function(e,t){i.read().then(function s(c){try{if(!c.done){var l=c.value
return n.push(l),o+=(0,a.arrayByteLength)(l),i.isStreamingSupported&&r.onProgress({loaded:o}),void i.read().then(s,t)}var u=(0,a.arraysToBytes)(n)
n=null,e(u)}catch(e){t(e)}},t)}).then(function(t){r.aborted||r.onReceiveData({chunk:t,begin:e})})}},{key:"requestAllChunks",value:function(){var e=this.stream.getMissingChunks()
return this._requestChunks(e),this._loadedStreamCapability.promise}},{key:"_requestChunks",value:function(e){var t=this.currRequestId++,r=Object.create(null)
this.chunksNeededByRequest[t]=r
var i=!0,n=!1,o=void 0
try{for(var s,c=e[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var l=s.value
this.stream.hasChunk(l)||(r[l]=!0)}}catch(e){n=!0,o=e}finally{try{i||null==c.return||c.return()}finally{if(n)throw o}}if((0,a.isEmptyObj)(r))return Promise.resolve()
var u=(0,a.createPromiseCapability)()
this.promisesByRequest[t]=u
var h=[]
for(var f in r)(f|=0)in this.requestsByChunk||(this.requestsByChunk[f]=[],h.push(f)),this.requestsByChunk[f].push(t)
if(!h.length)return u.promise
var d=this.groupChunks(h),g=!0,m=!1,p=void 0
try{for(var v,b=d[Symbol.iterator]();!(g=(v=b.next()).done);g=!0){var y=v.value,w=y.beginChunk*this.chunkSize,k=Math.min(y.endChunk*this.chunkSize,this.length)
this.sendRequest(w,k)}}catch(e){m=!0,p=e}finally{try{g||null==b.return||b.return()}finally{if(m)throw p}}return u.promise}},{key:"getStream",value:function(){return this.stream}},{key:"requestRange",value:function(e,t){t=Math.min(t,this.length)
for(var r=this.getBeginChunk(e),a=this.getEndChunk(t),i=[],n=r;n<a;++n)i.push(n)
return this._requestChunks(i)}},{key:"requestRanges",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=[],r=!0,a=!1,i=void 0
try{for(var n,o=e[Symbol.iterator]();!(r=(n=o.next()).done);r=!0)for(var s=n.value,c=this.getBeginChunk(s.begin),l=this.getEndChunk(s.end),u=c;u<l;++u)t.includes(u)||t.push(u)}catch(e){a=!0,i=e}finally{try{r||null==o.return||o.return()}finally{if(a)throw i}}return t.sort(function(e,t){return e-t}),this._requestChunks(t)}},{key:"groupChunks",value:function(e){for(var t=[],r=-1,a=-1,i=0,n=e.length;i<n;++i){var o=e[i]
r<0&&(r=o),a>=0&&a+1!==o&&(t.push({beginChunk:r,endChunk:a+1}),r=o),i+1===e.length&&t.push({beginChunk:r,endChunk:o+1}),a=o}return t}},{key:"onProgress",value:function(e){this.msgHandler.send("DocProgress",{loaded:this.stream.numChunksLoaded*this.chunkSize+e.loaded,total:this.length})}},{key:"onReceiveData",value:function(e){var t=e.chunk,r=void 0===e.begin,i=r?this.progressiveDataLength:e.begin,n=i+t.byteLength,o=Math.floor(i/this.chunkSize),s=n<this.length?Math.floor(n/this.chunkSize):Math.ceil(n/this.chunkSize)
r?(this.stream.onReceiveProgressiveData(t),this.progressiveDataLength=n):this.stream.onReceiveData(i,t),this.stream.allChunksLoaded()&&this._loadedStreamCapability.resolve(this.stream)
for(var c=[],l=o;l<s;++l){var u=this.requestsByChunk[l]||[]
delete this.requestsByChunk[l]
var h=!0,f=!1,d=void 0
try{for(var g,m=u[Symbol.iterator]();!(h=(g=m.next()).done);h=!0){var p=g.value,v=this.chunksNeededByRequest[p]
l in v&&delete v[l],(0,a.isEmptyObj)(v)&&c.push(p)}}catch(e){f=!0,d=e}finally{try{h||null==m.return||m.return()}finally{if(f)throw d}}}if(!this.disableAutoFetch&&(0,a.isEmptyObj)(this.requestsByChunk)){var b
if(1===this.stream.numChunksLoaded){var y=this.stream.numChunks-1
this.stream.hasChunk(y)||(b=y)}else b=this.stream.nextEmptyChunk(s)
Number.isInteger(b)&&this._requestChunks([b])}for(var w=0;w<c.length;w++){var k=c[w],S=this.promisesByRequest[k]
delete this.promisesByRequest[k],S.resolve()}this.msgHandler.send("DocProgress",{loaded:this.stream.numChunksLoaded*this.chunkSize,total:this.length})}},{key:"onError",value:function(e){this._loadedStreamCapability.reject(e)}},{key:"getBeginChunk",value:function(e){return Math.floor(e/this.chunkSize)}},{key:"getEndChunk",value:function(e){return Math.floor((e-1)/this.chunkSize)+1}},{key:"abort",value:function(){for(var e in this.aborted=!0,this.pdfNetworkStream&&this.pdfNetworkStream.cancelAllRequests("abort"),this.promisesByRequest)this.promisesByRequest[e].reject(new Error("Request was aborted"))}}]),e}()
t.ChunkedStreamManager=c},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.PDFDocument=t.Page=void 0
var a=r(6),i=r(154),n=r(155),o=r(157),s=r(169),c=r(167),l=r(156),u=r(170),h=r(171),f=r(185)
function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],a=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function p(e,t,r){return t&&m(e.prototype,t),r&&m(e,r),e}var v=[0,0,612,792]
function b(e,t){return"display"===t&&e.viewable||"print"===t&&e.printable}var y=function(){function e(t){var r=t.pdfManager,a=t.xref,i=t.pageIndex,n=t.pageDict,o=t.ref,s=t.fontCache,c=t.builtInCMapCache,l=t.pdfFunctionFactory
g(this,e),this.pdfManager=r,this.pageIndex=i,this.pageDict=n,this.xref=a,this.ref=o,this.fontCache=s,this.builtInCMapCache=c,this.pdfFunctionFactory=l,this.evaluatorOptions=r.evaluatorOptions,this.resourcesPromise=null
var u="p".concat(this.pageIndex,"_"),h={obj:0}
this.idFactory={createObjId:function(){return u+ ++h.obj}}}return p(e,[{key:"_getInheritableProperty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=(0,a.getInheritableProperty)({dict:this.pageDict,key:e,getArray:t,stopWhenFound:!1})
return Array.isArray(r)?1!==r.length&&(0,n.isDict)(r[0])?n.Dict.merge(this.xref,r):r[0]:r}},{key:"getContentStream",value:function(){var e,t=this.content
if(Array.isArray(t)){var r=this.xref,a=[],i=!0,s=!1,c=void 0
try{for(var l,u=t[Symbol.iterator]();!(i=(l=u.next()).done);i=!0){var h=l.value
a.push(r.fetchIfRef(h))}}catch(e){s=!0,c=e}finally{try{i||null==u.return||u.return()}finally{if(s)throw c}}e=new o.StreamsSequenceStream(a)}else e=(0,n.isStream)(t)?t:new o.NullStream
return e}},{key:"loadResources",value:function(e){var t=this
return this.resourcesPromise||(this.resourcesPromise=this.pdfManager.ensure(this,"resources")),this.resourcesPromise.then(function(){return new i.ObjectLoader(t.resources,e,t.xref).load()})}},{key:"getOperatorList",value:function(e){var t=this,r=e.handler,i=e.task,n=e.intent,o=e.renderInteractiveForms,s=this.pdfManager.ensure(this,"getContentStream"),c=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),l=new h.PartialEvaluator({pdfManager:this.pdfManager,xref:this.xref,handler:r,pageIndex:this.pageIndex,idFactory:this.idFactory,fontCache:this.fontCache,builtInCMapCache:this.builtInCMapCache,options:this.evaluatorOptions,pdfFunctionFactory:this.pdfFunctionFactory}),f=Promise.all([s,c]).then(function(e){var a=d(e,1)[0],o=new u.OperatorList(n,r,t.pageIndex)
return r.send("StartRenderPage",{transparency:l.hasBlendModes(t.resources),pageIndex:t.pageIndex,intent:n}),l.getOperatorList({stream:a,task:i,resources:t.resources,operatorList:o}).then(function(){return o})})
return Promise.all([f,this._parsedAnnotations]).then(function(e){var t=d(e,2),r=t[0],s=t[1]
if(0===s.length)return r.flush(!0),r
var c=[],u=!0,h=!1,f=void 0
try{for(var g,m=s[Symbol.iterator]();!(u=(g=m.next()).done);u=!0){var p=g.value
b(p,n)&&c.push(p.getOperatorList(l,i,o))}}catch(e){h=!0,f=e}finally{try{u||null==m.return||m.return()}finally{if(h)throw f}}return Promise.all(c).then(function(e){r.addOp(a.OPS.beginAnnotations,[])
var t=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(t=(o=s.next()).done);t=!0){var c=o.value
r.addOpList(c)}}catch(e){i=!0,n=e}finally{try{t||null==s.return||s.return()}finally{if(i)throw n}}return r.addOp(a.OPS.endAnnotations,[]),r.flush(!0),r})})}},{key:"extractTextContent",value:function(e){var t=this,r=e.handler,a=e.task,i=e.normalizeWhitespace,n=e.sink,o=e.combineTextItems,s=this.pdfManager.ensure(this,"getContentStream"),c=this.loadResources(["ExtGState","XObject","Font"])
return Promise.all([s,c]).then(function(e){var s=d(e,1)[0]
return new h.PartialEvaluator({pdfManager:t.pdfManager,xref:t.xref,handler:r,pageIndex:t.pageIndex,idFactory:t.idFactory,fontCache:t.fontCache,builtInCMapCache:t.builtInCMapCache,options:t.evaluatorOptions,pdfFunctionFactory:t.pdfFunctionFactory}).getTextContent({stream:s,task:a,resources:t.resources,normalizeWhitespace:i,combineTextItems:o,sink:n})})}},{key:"getAnnotationsData",value:function(e){return this._parsedAnnotations.then(function(t){for(var r=[],a=0,i=t.length;a<i;a++)e&&!b(t[a],e)||r.push(t[a].data)
return r})}},{key:"content",get:function(){return this.pageDict.get("Contents")}},{key:"resources",get:function(){return(0,a.shadow)(this,"resources",this._getInheritableProperty("Resources")||n.Dict.empty)}},{key:"mediaBox",get:function(){var e=this._getInheritableProperty("MediaBox",!0)
return Array.isArray(e)&&4===e.length?(0,a.shadow)(this,"mediaBox",e):(0,a.shadow)(this,"mediaBox",v)}},{key:"cropBox",get:function(){var e=this._getInheritableProperty("CropBox",!0)
return Array.isArray(e)&&4===e.length?(0,a.shadow)(this,"cropBox",e):(0,a.shadow)(this,"cropBox",this.mediaBox)}},{key:"userUnit",get:function(){var e=this.pageDict.get("UserUnit")
return(!(0,a.isNum)(e)||e<=0)&&(e=1),(0,a.shadow)(this,"userUnit",e)}},{key:"view",get:function(){var e=this.mediaBox,t=this.cropBox
if(e===t)return(0,a.shadow)(this,"view",e)
var r=a.Util.intersect(t,e)
return(0,a.shadow)(this,"view",r||e)}},{key:"rotate",get:function(){var e=this._getInheritableProperty("Rotate")||0
return e%90!=0?e=0:e>=360?e%=360:e<0&&(e=(e%360+360)%360),(0,a.shadow)(this,"rotate",e)}},{key:"annotations",get:function(){return(0,a.shadow)(this,"annotations",this._getInheritableProperty("Annots")||[])}},{key:"_parsedAnnotations",get:function(){var e=this,t=this.pdfManager.ensure(this,"annotations").then(function(){for(var t=e.annotations,r=[],i=0,n=t.length;i<n;i++)r.push(s.AnnotationFactory.create(e.xref,t[i],e.pdfManager,e.idFactory))
return Promise.all(r).then(function(e){return e.filter(function(e){return!!e})},function(e){return(0,a.warn)('_parsedAnnotations: "'.concat(e,'".')),[]})})
return(0,a.shadow)(this,"_parsedAnnotations",t)}}]),e}()
function w(e,t,r,a){var i=e.pos,n=e.end
i+r>n&&(r=n-i)
for(var o=[],s=0;s<r;++s)o.push(String.fromCharCode(e.getByte()))
var c=o.join("")
e.pos=i
var l=a?c.lastIndexOf(t):c.indexOf(t)
return-1!==l&&(e.pos+=l,!0)}t.Page=y
var k=function(){function e(t,r){var s
if(g(this,e),(0,n.isStream)(r))s=r
else{if(!(0,a.isArrayBuffer)(r))throw new Error("PDFDocument: Unknown argument type")
s=new o.Stream(r)}if(s.length<=0)throw new Error("PDFDocument: Stream must have data")
this.pdfManager=t,this.stream=s,this.xref=new i.XRef(s,t),this.pdfFunctionFactory=new f.PDFFunctionFactory({xref:this.xref,isEvalSupported:t.evaluatorOptions.isEvalSupported}),this._pagePromises=[]}return p(e,[{key:"parse",value:function(e){this.setup(e)
var t=this.catalog.catDict.get("Version");(0,n.isName)(t)&&(this.pdfFormatVersion=t.name)
try{if(this.acroForm=this.catalog.catDict.get("AcroForm"),this.acroForm){this.xfa=this.acroForm.get("XFA")
var r=this.acroForm.get("Fields")
r&&Array.isArray(r)&&0!==r.length||this.xfa||(this.acroForm=null)}}catch(e){if(e instanceof a.MissingDataException)throw e;(0,a.info)("Cannot fetch AcroForm entry; assuming no AcroForms are present"),this.acroForm=null}}},{key:"checkHeader",value:function(){var e=this.stream
if(e.reset(),w(e,"%PDF-",1024)){e.moveStart()
for(var t,r="";(t=e.getByte())>32&&!(r.length>=12);)r+=String.fromCharCode(t)
this.pdfFormatVersion||(this.pdfFormatVersion=r.substring(5))}}},{key:"parseStartXRef",value:function(){this.xref.setStartXRef(this.startXRef)}},{key:"setup",value:function(e){this.xref.parse(e),this.catalog=new i.Catalog(this.pdfManager,this.xref)}},{key:"_getLinearizationPage",value:function(e){var t=this.catalog,r=this.linearization;(0,a.assert)(r&&r.pageFirst===e)
var i=new n.Ref(r.objectNumberFirst,0)
return this.xref.fetchAsync(i).then(function(e){if((0,n.isDict)(e,"Page")||(0,n.isDict)(e)&&!e.has("Type")&&e.has("Contents"))return i&&!t.pageKidsCountCache.has(i)&&t.pageKidsCountCache.put(i,1),[e,i]
throw new a.FormatError("The Linearization dictionary doesn't point to a valid Page dictionary.")}).catch(function(r){return(0,a.info)(r),t.getPageDict(e)})}},{key:"getPage",value:function(e){var t=this
if(void 0!==this._pagePromises[e])return this._pagePromises[e]
var r=this.catalog,a=this.linearization,i=a&&a.pageFirst===e?this._getLinearizationPage(e):r.getPageDict(e)
return this._pagePromises[e]=i.then(function(a){var i=d(a,2),n=i[0],o=i[1]
return new y({pdfManager:t.pdfManager,xref:t.xref,pageIndex:e,pageDict:n,ref:o,fontCache:r.fontCache,builtInCMapCache:r.builtInCMapCache,pdfFunctionFactory:t.pdfFunctionFactory})})}},{key:"checkFirstPage",value:function(){var e=this
return this.getPage(0).catch(function(t){if(t instanceof a.XRefEntryException)throw e._pagePromises.length=0,e.cleanup(),new a.XRefParseException})}},{key:"fontFallback",value:function(e,t){return this.catalog.fontFallback(e,t)}},{key:"cleanup",value:function(){return this.catalog.cleanup()}},{key:"linearization",get:function(){var e=null
try{e=l.Linearization.create(this.stream)}catch(e){if(e instanceof a.MissingDataException)throw e;(0,a.info)(e)}return(0,a.shadow)(this,"linearization",e)}},{key:"startXRef",get:function(){var e=this.stream,t=0
if(this.linearization)e.reset(),w(e,"endobj",1024)&&(t=e.pos+6)
else{for(var r="startxref".length,i=!1,n=e.end;!i&&n>0;)(n-=1024-r)<0&&(n=0),e.pos=n,i=w(e,"startxref",1024,!0)
if(i){var o
e.skip(9)
do{o=e.getByte()}while((0,a.isSpace)(o))
for(var s="";o>=32&&o<=57;)s+=String.fromCharCode(o),o=e.getByte()
t=parseInt(s,10),isNaN(t)&&(t=0)}}return(0,a.shadow)(this,"startXRef",t)}},{key:"numPages",get:function(){var e=this.linearization,t=e?e.numPages:this.catalog.numPages
return(0,a.shadow)(this,"numPages",t)}},{key:"documentInfo",get:function(){var e,t={Title:a.isString,Author:a.isString,Subject:a.isString,Keywords:a.isString,Creator:a.isString,Producer:a.isString,CreationDate:a.isString,ModDate:a.isString,Trapped:n.isName},r={PDFFormatVersion:this.pdfFormatVersion,IsLinearized:!!this.linearization,IsAcroFormPresent:!!this.acroForm,IsXFAPresent:!!this.xfa}
try{e=this.xref.trailer.get("Info")}catch(e){if(e instanceof a.MissingDataException)throw e;(0,a.info)("The document information dictionary is invalid.")}if((0,n.isDict)(e)){var i=!0,o=!1,s=void 0
try{for(var c,l=e.getKeys()[Symbol.iterator]();!(i=(c=l.next()).done);i=!0){var u=c.value,h=e.get(u)
if(t[u])t[u](h)?r[u]="string"!=typeof h?h:(0,a.stringToPDFString)(h):(0,a.info)('Bad value in document info for "'.concat(u,'".'))
else if("string"==typeof u){var f=void 0
if((0,a.isString)(h))f=(0,a.stringToPDFString)(h)
else{if(!((0,n.isName)(h)||(0,a.isNum)(h)||(0,a.isBool)(h))){(0,a.info)('Unsupported value in document info for (custom) "'.concat(u,'".'))
continue}f=h}r.Custom||(r.Custom=Object.create(null)),r.Custom[u]=f}}}catch(e){o=!0,s=e}finally{try{i||null==l.return||l.return()}finally{if(o)throw s}}}return(0,a.shadow)(this,"documentInfo",r)}},{key:"fingerprint",get:function(){var e,t=this.xref.trailer.get("ID")
Array.isArray(t)&&t[0]&&(0,a.isString)(t[0])&&"\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"!==t[0]?e=(0,a.stringToBytes)(t[0]):(this.stream.ensureRange&&this.stream.ensureRange(0,Math.min(1024,this.stream.end)),e=(0,c.calculateMD5)(this.stream.bytes.subarray(0,1024),0,1024))
for(var r="",i=0,n=e.length;i<n;i++){var o=e[i].toString(16)
r+=1===o.length?"0"+o:o}return(0,a.shadow)(this,"fingerprint",r)}}]),e}()
t.PDFDocument=k},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.FileSpec=t.XRef=t.ObjectLoader=t.Catalog=void 0
var a,i=(a=r(2))&&a.__esModule?a:{default:a},n=r(6),o=r(155),s=r(156),c=r(152),l=r(167),u=r(168)
function h(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function g(e,t,r,a,i,n,o){try{var s=e[n](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(a,i)}function m(e){return function(){var t=this,r=arguments
return new Promise(function(a,i){var n=e.apply(t,r)
function o(e){g(n,a,i,o,s,"next",e)}function s(e){g(n,a,i,o,s,"throw",e)}o(void 0)})}}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function b(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function y(e,t,r){return t&&b(e.prototype,t),r&&b(e,r),e}function w(e){return(0,o.isDict)(e)?e.get("D"):e}var k=function(){function e(t,r){if(v(this,e),this.pdfManager=t,this.xref=r,this.catDict=r.getCatalogObj(),!(0,o.isDict)(this.catDict))throw new n.FormatError("Catalog object is not a dictionary.")
this.fontCache=new o.RefSetCache,this.builtInCMapCache=new Map,this.pageKidsCountCache=new o.RefSetCache}return y(e,[{key:"_readDocumentOutline",value:function(){var t=this.catDict.get("Outlines")
if(!(0,o.isDict)(t))return null
if(t=t.getRaw("First"),!(0,o.isRef)(t))return null
var r={items:[]},a=[{obj:t,parent:r}],i=new o.RefSet
i.put(t)
for(var s=this.xref,c=new Uint8ClampedArray(3);a.length>0;){var l=a.shift(),h=s.fetchIfRef(l.obj)
if(null!==h){if(!h.has("Title"))throw new n.FormatError("Invalid outline item encountered.")
var f={url:null,dest:null}
e.parseDestDictionary({destDict:h,resultObj:f,docBaseUrl:this.pdfManager.docBaseUrl})
var d=h.get("Title"),g=h.get("F")||0,m=h.getArray("C"),p=c
!Array.isArray(m)||3!==m.length||0===m[0]&&0===m[1]&&0===m[2]||(p=u.ColorSpace.singletons.rgb.getRgb(m,0))
var v={dest:f.dest,url:f.url,unsafeUrl:f.unsafeUrl,newWindow:f.newWindow,title:(0,n.stringToPDFString)(d),color:p,count:h.get("Count"),bold:!!(2&g),italic:!!(1&g),items:[]}
l.parent.items.push(v),t=h.getRaw("First"),(0,o.isRef)(t)&&!i.has(t)&&(a.push({obj:t,parent:v}),i.put(t)),t=h.getRaw("Next"),(0,o.isRef)(t)&&!i.has(t)&&(a.push({obj:t,parent:l.parent}),i.put(t))}}return r.items.length>0?r.items:null}},{key:"_readPermissions",value:function(){var e=this.xref.trailer.get("Encrypt")
if(!(0,o.isDict)(e))return null
var t=e.get("P")
if(!(0,n.isNum)(t))return null
t+=Math.pow(2,32)
var r=[]
for(var a in n.PermissionFlag){var i=n.PermissionFlag[a]
t&i&&r.push(i)}return r}},{key:"getDestination",value:function(e){var t=this._readDests()
return t instanceof x||t instanceof o.Dict?w(t.get(e)||null):null}},{key:"_readDests",value:function(){var e=this.catDict.get("Names")
return e&&e.has("Dests")?new x(e.getRaw("Dests"),this.xref):this.catDict.has("Dests")?this.catDict.get("Dests"):void 0}},{key:"_readPageLabels",value:function(){var e=this.catDict.getRaw("PageLabels")
if(!e)return null
for(var t=new Array(this.numPages),r=null,a="",i=new A(e,this.xref).getAll(),s="",c=1,l=0,u=this.numPages;l<u;l++){if(l in i){var h=i[l]
if(!(0,o.isDict)(h))throw new n.FormatError("PageLabel is not a dictionary.")
if(h.has("Type")&&!(0,o.isName)(h.get("Type"),"PageLabel"))throw new n.FormatError("Invalid type in PageLabel dictionary.")
if(h.has("S")){var f=h.get("S")
if(!(0,o.isName)(f))throw new n.FormatError("Invalid style in PageLabel dictionary.")
r=f.name}else r=null
if(h.has("P")){var d=h.get("P")
if(!(0,n.isString)(d))throw new n.FormatError("Invalid prefix in PageLabel dictionary.")
a=(0,n.stringToPDFString)(d)}else a=""
if(h.has("St")){var g=h.get("St")
if(!(Number.isInteger(g)&&g>=1))throw new n.FormatError("Invalid start in PageLabel dictionary.")
c=g}else c=1}switch(r){case"D":s=c
break
case"R":case"r":s=(0,n.toRomanNumerals)(c,"r"===r)
break
case"A":case"a":for(var m="a"===r?97:65,p=c-1,v=String.fromCharCode(m+p%26),b=[],y=0,w=p/26|0;y<=w;y++)b.push(v)
s=b.join("")
break
default:if(r)throw new n.FormatError('Invalid style "'.concat(r,'" in PageLabel dictionary.'))
s=""}t[l]=a+s,c++}return t}},{key:"fontFallback",value:function(e,t){var r=[]
return this.fontCache.forEach(function(e){r.push(e)}),Promise.all(r).then(function(r){var a=!0,i=!1,n=void 0
try{for(var o,s=r[Symbol.iterator]();!(a=(o=s.next()).done);a=!0){var c=o.value
if(c.loadedName===e)return void c.fallback(t)}}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}})}},{key:"cleanup",value:function(){var e=this
this.pageKidsCountCache.clear()
var t=[]
return this.fontCache.forEach(function(e){t.push(e)}),Promise.all(t).then(function(t){for(var r=0,a=t.length;r<a;r++)delete t[r].dict.translated
e.fontCache.clear(),e.builtInCMapCache.clear()})}},{key:"getPageDict",value:function(e){var t,r=(0,n.createPromiseCapability)(),a=[this.catDict.getRaw("Pages")],i=this.xref,s=this.pageKidsCountCache,c=0
return function l(){for(var u=function(){var u=a.pop()
if((0,o.isRef)(u))return(t=s.get(u))>0&&c+t<e?(c+=t,"continue"):(i.fetchAsync(u).then(function(t){(0,o.isDict)(t,"Page")||(0,o.isDict)(t)&&!t.has("Kids")?e===c?(u&&!s.has(u)&&s.put(u,1),r.resolve([t,u])):(c++,l()):(a.push(t),l())},r.reject),{v:void 0})
if(!(0,o.isDict)(u))return r.reject(new n.FormatError("Page dictionary kid reference points to wrong type of object.")),{v:void 0}
if(t=u.get("Count"),Number.isInteger(t)&&t>=0){var h=u.objId
if(h&&!s.has(h)&&s.put(h,t),c+t<=e)return c+=t,"continue"}var f=u.get("Kids")
if(!Array.isArray(f))return(0,o.isName)(u.get("Type"),"Page")||!u.has("Type")&&u.has("Contents")?c===e?(r.resolve([u,null]),{v:void 0}):(c++,"continue"):(r.reject(new n.FormatError("Page dictionary kids object is not an array.")),{v:void 0})
for(var d=f.length-1;d>=0;d--)a.push(f[d])};a.length;){var h=u()
switch(h){case"continue":continue
default:if("object"===p(h))return h.v}}r.reject(new Error("Page index ".concat(e," not found.")))}(),r.promise}},{key:"getPageIndex",value:function(e){var t=this.xref,r=0
return function a(i){return function(r){var a,i=0
return t.fetchAsync(r).then(function(t){if((0,o.isRefsEqual)(r,e)&&!(0,o.isDict)(t,"Page")&&(!(0,o.isDict)(t)||t.has("Type")||!t.has("Contents")))throw new n.FormatError("The reference does not point to a /Page dictionary.")
if(!t)return null
if(!(0,o.isDict)(t))throw new n.FormatError("Node must be a dictionary.")
return a=t.getRaw("Parent"),t.getAsync("Parent")}).then(function(e){if(!e)return null
if(!(0,o.isDict)(e))throw new n.FormatError("Parent must be a dictionary.")
return e.getAsync("Kids")}).then(function(e){if(!e)return null
for(var s=[],c=!1,l=0,u=e.length;l<u;l++){var h=e[l]
if(!(0,o.isRef)(h))throw new n.FormatError("Kid must be a reference.")
if((0,o.isRefsEqual)(h,r)){c=!0
break}s.push(t.fetchAsync(h).then(function(e){if(!(0,o.isDict)(e))throw new n.FormatError("Kid node must be a dictionary.")
e.has("Count")?i+=e.get("Count"):i++}))}if(!c)throw new n.FormatError("Kid reference not found in parent's kids.")
return Promise.all(s).then(function(){return[i,a]})})}(i).then(function(e){if(!e)return r
var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],a=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(e,2),i=t[0],n=t[1]
return r+=i,a(n)})}(e)}},{key:"metadata",get:function(){var e=this.catDict.getRaw("Metadata")
if(!(0,o.isRef)(e))return(0,n.shadow)(this,"metadata",null)
var t,r=!(this.xref.encrypt&&this.xref.encrypt.encryptMetadata),a=this.xref.fetch(e,r)
if(a&&(0,o.isDict)(a.dict)){var i=a.dict.get("Type"),s=a.dict.get("Subtype")
if((0,o.isName)(i,"Metadata")&&(0,o.isName)(s,"XML"))try{t=(0,n.stringToUTF8String)((0,n.bytesToString)(a.getBytes()))}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.info)("Skipping invalid metadata.")}}return(0,n.shadow)(this,"metadata",t)}},{key:"toplevelPagesDict",get:function(){var e=this.catDict.get("Pages")
if(!(0,o.isDict)(e))throw new n.FormatError("Invalid top-level pages dictionary.")
return(0,n.shadow)(this,"toplevelPagesDict",e)}},{key:"documentOutline",get:function(){var e=null
try{e=this._readDocumentOutline()}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.warn)("Unable to read document outline.")}return(0,n.shadow)(this,"documentOutline",e)}},{key:"permissions",get:function(){var e=null
try{e=this._readPermissions()}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.warn)("Unable to read permissions.")}return(0,n.shadow)(this,"permissions",e)}},{key:"numPages",get:function(){var e=this.toplevelPagesDict.get("Count")
if(!Number.isInteger(e))throw new n.FormatError("Page count in top-level pages dictionary is not an integer.")
return(0,n.shadow)(this,"numPages",e)}},{key:"destinations",get:function(){var e=this._readDests(),t=Object.create(null)
if(e instanceof x){var r=e.getAll()
for(var a in r)t[a]=w(r[a])}else e instanceof o.Dict&&e.forEach(function(e,r){r&&(t[e]=w(r))})
return(0,n.shadow)(this,"destinations",t)}},{key:"pageLabels",get:function(){var e=null
try{e=this._readPageLabels()}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.warn)("Unable to read page labels.")}return(0,n.shadow)(this,"pageLabels",e)}},{key:"pageMode",get:function(){var e=this.catDict.get("PageMode"),t="UseNone"
if((0,o.isName)(e))switch(e.name){case"UseNone":case"UseOutlines":case"UseThumbs":case"FullScreen":case"UseOC":case"UseAttachments":t=e.name}return(0,n.shadow)(this,"pageMode",t)}},{key:"openActionDestination",get:function(){var t=this.catDict.get("OpenAction"),r=null
if((0,o.isDict)(t)){var a=new o.Dict(this.xref)
a.set("A",t)
var i={url:null,dest:null}
e.parseDestDictionary({destDict:a,resultObj:i}),Array.isArray(i.dest)&&(r=i.dest)}else Array.isArray(t)&&(r=t)
return(0,n.shadow)(this,"openActionDestination",r)}},{key:"attachments",get:function(){var e=this.catDict.get("Names"),t=null
if(e&&e.has("EmbeddedFiles")){var r=new x(e.getRaw("EmbeddedFiles"),this.xref).getAll()
for(var a in r){var i=new _(r[a],this.xref)
t||(t=Object.create(null)),t[(0,n.stringToPDFString)(a)]=i.serializable}}return(0,n.shadow)(this,"attachments",t)}},{key:"javaScript",get:function(){var e=this.catDict.get("Names"),t=null
function r(e){var r=e.get("S")
if((0,o.isName)(r,"JavaScript")){var a=e.get("JS")
if((0,o.isStream)(a))a=(0,n.bytesToString)(a.getBytes())
else if(!(0,n.isString)(a))return
t||(t=[]),t.push((0,n.stringToPDFString)(a))}}if(e&&e.has("JavaScript")){var a=new x(e.getRaw("JavaScript"),this.xref).getAll()
for(var i in a){var s=a[i];(0,o.isDict)(s)&&r(s)}}var c=this.catDict.get("OpenAction")
if((0,o.isDict)(c,"Action")){var l=c.get("S")
if((0,o.isName)(l,"Named")){var u=c.get("N");(0,o.isName)(u,"Print")&&(t||(t=[]),t.push("print({});"))}else r(c)}return(0,n.shadow)(this,"javaScript",t)}}],[{key:"parseDestDictionary",value:function(e){var t=e.destDict
if((0,o.isDict)(t)){var r=e.resultObj
if("object"===p(r)){var a,i,s=e.docBaseUrl||null,c=t.get("A")
if(!(0,o.isDict)(c)&&t.has("Dest")&&(c=t.get("Dest")),(0,o.isDict)(c)){var l=c.get("S")
if(!(0,o.isName)(l))return void(0,n.warn)("parseDestDictionary: Invalid type in Action dictionary.")
var u=l.name
switch(u){case"URI":a=c.get("URI"),(0,o.isName)(a)?a="/"+a.name:(0,n.isString)(a)&&(a=function(e){return e.startsWith("www.")?"http://".concat(e):e}(a))
break
case"GoTo":i=c.get("D")
break
case"Launch":case"GoToR":var h=c.get("F");(0,o.isDict)(h)?a=h.get("F")||null:(0,n.isString)(h)&&(a=h)
var f=c.get("D")
if(f&&((0,o.isName)(f)&&(f=f.name),(0,n.isString)(a))){var d=a.split("#")[0];(0,n.isString)(f)?a=d+"#"+f:Array.isArray(f)&&(a=d+"#"+JSON.stringify(f))}var g=c.get("NewWindow");(0,n.isBool)(g)&&(r.newWindow=g)
break
case"Named":var m=c.get("N");(0,o.isName)(m)&&(r.action=m.name)
break
case"JavaScript":var v,b=c.get("JS")
if((0,o.isStream)(b)?v=(0,n.bytesToString)(b.getBytes()):(0,n.isString)(b)&&(v=b),v){var y=new RegExp("^\\s*("+["app.launchURL","window.open"].join("|").split(".").join("\\.")+")\\((?:'|\")([^'\"]*)(?:'|\")(?:,\\s*(\\w+)\\)|\\))","i").exec((0,n.stringToPDFString)(v))
if(y&&y[2]){a=y[2],"true"===y[3]&&"app.launchURL"===y[1]&&(r.newWindow=!0)
break}}default:(0,n.warn)('parseDestDictionary: unsupported action type "'.concat(u,'".'))}}else t.has("Dest")&&(i=t.get("Dest"))
if((0,n.isString)(a)){a=function(e){try{return(0,n.stringToUTF8String)(e)}catch(t){return e}}(a)
var w=(0,n.createValidAbsoluteUrl)(a,s)
w&&(r.url=w.href),r.unsafeUrl=a}i&&((0,o.isName)(i)&&(i=i.name),((0,n.isString)(i)||Array.isArray(i))&&(r.dest=i))}else(0,n.warn)("parseDestDictionary: `resultObj` must be an object.")}else(0,n.warn)("parseDestDictionary: `destDict` must be a dictionary.")}}]),e}()
t.Catalog=k
var S=function(){function e(e,t){this.stream=e,this.pdfManager=t,this.entries=[],this.xrefstms=Object.create(null),this.cache=[],this.stats={streamTypes:[],fontTypes:[]}}return e.prototype={setStartXRef:function(e){this.startXRefQueue=[e]},parse:function(e){var t,r,a
e?((0,n.warn)("Indexing all PDF objects"),t=this.indexObjects()):t=this.readXRef(),t.assignXref(this),this.trailer=t
try{r=t.get("Encrypt")}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.warn)('XRef.parse - Invalid "Encrypt" reference: "'.concat(e,'".'))}if((0,o.isDict)(r)){var i=t.get("ID"),s=i&&i.length?i[0]:""
r.suppressEncryption=!0,this.encrypt=new l.CipherTransformFactory(r,s,this.pdfManager.password)}try{a=t.get("Root")}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.warn)('XRef.parse - Invalid "Root" reference: "'.concat(e,'".'))}if(!(0,o.isDict)(a)||!a.has("Pages")){if(!e)throw new n.XRefParseException
throw new n.FormatError("Invalid root reference")}this.root=a},processXRefTable:function(e){"tableState"in this||(this.tableState={entryNum:0,streamPos:e.lexer.stream.pos,parserBuf1:e.buf1,parserBuf2:e.buf2})
var t=this.readXRefTable(e)
if(!(0,o.isCmd)(t,"trailer"))throw new n.FormatError("Invalid XRef table: could not find trailer dictionary")
var r=e.getObj()
if(!(0,o.isDict)(r)&&r.dict&&(r=r.dict),!(0,o.isDict)(r))throw new n.FormatError("Invalid XRef table: could not parse trailer dictionary")
return delete this.tableState,r},readXRefTable:function(e){var t,r=e.lexer.stream,a=this.tableState
for(r.pos=a.streamPos,e.buf1=a.parserBuf1,e.buf2=a.parserBuf2;;){if(!("firstEntryNum"in a&&"entryCount"in a)){if((0,o.isCmd)(t=e.getObj(),"trailer"))break
a.firstEntryNum=t,a.entryCount=e.getObj()}var i=a.firstEntryNum,s=a.entryCount
if(!Number.isInteger(i)||!Number.isInteger(s))throw new n.FormatError("Invalid XRef table: wrong types in subsection header")
for(var c=a.entryNum;c<s;c++){a.streamPos=r.pos,a.entryNum=c,a.parserBuf1=e.buf1,a.parserBuf2=e.buf2
var l={}
l.offset=e.getObj(),l.gen=e.getObj()
var u=e.getObj()
if((0,o.isCmd)(u,"f")?l.free=!0:(0,o.isCmd)(u,"n")&&(l.uncompressed=!0),!Number.isInteger(l.offset)||!Number.isInteger(l.gen)||!l.free&&!l.uncompressed)throw new n.FormatError("Invalid entry in XRef subsection: ".concat(i,", ").concat(s))
0===c&&l.free&&1===i&&(i=0),this.entries[c+i]||(this.entries[c+i]=l)}a.entryNum=0,a.streamPos=r.pos,a.parserBuf1=e.buf1,a.parserBuf2=e.buf2,delete a.firstEntryNum,delete a.entryCount}if(this.entries[0]&&!this.entries[0].free)throw new n.FormatError("Invalid XRef table: unexpected first object")
return t},processXRefStream:function(e){if(!("streamState"in this)){var t=e.dict,r=t.get("W"),a=t.get("Index")
a||(a=[0,t.get("Size")]),this.streamState={entryRanges:a,byteWidths:r,entryNum:0,streamPos:e.pos}}return this.readXRefStream(e),delete this.streamState,e.dict},readXRefStream:function(e){var t,r,a=this.streamState
e.pos=a.streamPos
for(var i=a.byteWidths,o=i[0],s=i[1],c=i[2],l=a.entryRanges;l.length>0;){var u=l[0],h=l[1]
if(!Number.isInteger(u)||!Number.isInteger(h))throw new n.FormatError("Invalid XRef range fields: ".concat(u,", ").concat(h))
if(!Number.isInteger(o)||!Number.isInteger(s)||!Number.isInteger(c))throw new n.FormatError("Invalid XRef entry fields length: ".concat(u,", ").concat(h))
for(t=a.entryNum;t<h;++t){a.entryNum=t,a.streamPos=e.pos
var f=0,d=0,g=0
for(r=0;r<o;++r)f=f<<8|e.getByte()
for(0===o&&(f=1),r=0;r<s;++r)d=d<<8|e.getByte()
for(r=0;r<c;++r)g=g<<8|e.getByte()
var m={}
switch(m.offset=d,m.gen=g,f){case 0:m.free=!0
break
case 1:m.uncompressed=!0
break
case 2:break
default:throw new n.FormatError("Invalid XRef entry type: ".concat(f))}this.entries[u+t]||(this.entries[u+t]=m)}a.entryNum=0,a.streamPos=e.pos,l.splice(0,2)}},indexObjects:function(){var e=10,t=13,r=60
function a(a,i){for(var n="",o=a[i];o!==e&&o!==t&&o!==r&&!(++i>=a.length);)n+=String.fromCharCode(o),o=a[i]
return n}function i(e,t,r){for(var a=r.length,i=e.length,n=0;t<i;){for(var o=0;o<a&&e[t+o]===r[o];)++o
if(o>=a)break
t++,n++}return n}var c=/^(\d+)\s+(\d+)\s+obj\b/,l=/\bendobj[\b\s]$/,u=/\s+(\d+\s+\d+\s+obj[\b\s<])$/,h=new Uint8Array([116,114,97,105,108,101,114]),f=new Uint8Array([115,116,97,114,116,120,114,101,102]),d=new Uint8Array([111,98,106]),g=new Uint8Array([47,88,82,101,102])
this.entries.length=0
var m=this.stream
m.pos=0
for(var p,v,b,y=m.getBytes(),w=m.start,k=y.length,S=[],C=[];w<k;){var x=y[w]
if(9!==x&&x!==e&&x!==t&&32!==x)if(37!==x){var A,_=a(y,w)
if(_.startsWith("xref")&&(4===_.length||/\s/.test(_[4])))w+=i(y,w,h),S.push(w),w+=i(y,w,f)
else if(A=c.exec(_)){var P=0|A[1],I=0|A[2]
void 0===this.entries[P]&&(this.entries[P]={offset:w-m.start,gen:I,uncompressed:!0})
for(var O=void 0,E=w+_.length;E<y.length;){var T=E+i(y,E,d)+4
O=T-w
var F=Math.max(T-25,E),R=(0,n.bytesToString)(y.subarray(F,T))
if(l.test(R))break
var B=u.exec(R)
if(B&&B[1]){(0,n.warn)('indexObjects: Found new "obj" inside of another "obj", caused by missing "endobj" -- trying to recover.'),O-=B[1].length
break}E=T}var D=y.subarray(w,w+O),M=i(D,0,g)
M<O&&D[M+5]<64&&(C.push(w-m.start),this.xrefstms[w-m.start]=1),w+=O}else _.startsWith("trailer")&&(7===_.length||/\s/.test(_[7]))?(S.push(w),w+=i(y,w,f)):w+=_.length+1}else do{if(++w>=k)break
x=y[w]}while(x!==e&&x!==t)
else++w}for(p=0,v=C.length;p<v;++p)this.startXRefQueue.push(C[p]),this.readXRef(!0)
for(p=0,v=S.length;p<v;++p){m.pos=S[p]
var L=new s.Parser(new s.Lexer(m),!0,this,!0),N=L.getObj()
if((0,o.isCmd)(N,"trailer")){var U=L.getObj()
if((0,o.isDict)(U)){var q=void 0
try{q=U.get("Root")}catch(e){if(e instanceof n.MissingDataException)throw e
continue}if((0,o.isDict)(q)&&q.has("Pages")){if(U.has("ID"))return U
b=U}}}}if(b)return b
throw new n.InvalidPDFException("Invalid PDF structure")},readXRef:function(e){var t=this.stream,r=Object.create(null)
try{for(;this.startXRefQueue.length;){var a=this.startXRefQueue[0]
if(r[a])(0,n.warn)("readXRef - skipping XRef table since it was already parsed."),this.startXRefQueue.shift()
else{r[a]=!0,t.pos=a+t.start
var i,c=new s.Parser(new s.Lexer(t),!0,this),l=c.getObj()
if((0,o.isCmd)(l,"xref")){if(i=this.processXRefTable(c),this.topDict||(this.topDict=i),l=i.get("XRefStm"),Number.isInteger(l)){var u=l
u in this.xrefstms||(this.xrefstms[u]=1,this.startXRefQueue.push(u))}}else{if(!Number.isInteger(l))throw new n.FormatError("Invalid XRef stream header")
if(!Number.isInteger(c.getObj())||!(0,o.isCmd)(c.getObj(),"obj")||!(0,o.isStream)(l=c.getObj()))throw new n.FormatError("Invalid XRef stream")
if(i=this.processXRefStream(l),this.topDict||(this.topDict=i),!i)throw new n.FormatError("Failed to read XRef stream")}l=i.get("Prev"),Number.isInteger(l)?this.startXRefQueue.push(l):(0,o.isRef)(l)&&this.startXRefQueue.push(l.num),this.startXRefQueue.shift()}}return this.topDict}catch(e){if(e instanceof n.MissingDataException)throw e;(0,n.info)("(while reading XRef): "+e)}if(!e)throw new n.XRefParseException},getEntry:function(e){var t=this.entries[e]
return t&&!t.free&&t.offset?t:null},fetchIfRef:function(e,t){return(0,o.isRef)(e)?this.fetch(e,t):e},fetch:function(e,t){if(!(0,o.isRef)(e))throw new Error("ref object is not a reference")
var r=e.num
if(r in this.cache){var a=this.cache[r]
return a instanceof o.Dict&&!a.objId&&(a.objId=e.toString()),a}var i=this.getEntry(r)
return null===i?this.cache[r]=null:(i=i.uncompressed?this.fetchUncompressed(e,i,t):this.fetchCompressed(e,i,t),(0,o.isDict)(i)?i.objId=e.toString():(0,o.isStream)(i)&&(i.dict.objId=e.toString()),i)},fetchUncompressed:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=e.gen,i=e.num
if(t.gen!==a)throw new n.XRefEntryException("Inconsistent generation in XRef: ".concat(e))
var c=this.stream.makeSubStream(t.offset+this.stream.start),l=new s.Parser(new s.Lexer(c),!0,this),u=l.getObj(),h=l.getObj(),f=l.getObj()
if(Number.isInteger(u)||(u=parseInt(u,10)),Number.isInteger(h)||(h=parseInt(h,10)),u!==i||h!==a||!(0,o.isCmd)(f))throw new n.XRefEntryException("Bad (uncompressed) XRef entry: ".concat(e))
if("obj"!==f.cmd){if(f.cmd.startsWith("obj")&&(i=parseInt(f.cmd.substring(3),10),!Number.isNaN(i)))return i
throw new n.XRefEntryException("Bad (uncompressed) XRef entry: ".concat(e))}return t=this.encrypt&&!r?l.getObj(this.encrypt.createCipherTransform(i,a)):l.getObj(),(0,o.isStream)(t)||(this.cache[i]=t),t},fetchCompressed:function(e,t){arguments.length>2&&void 0!==arguments[2]&&arguments[2]
var r=t.offset,a=this.fetch(new o.Ref(r,0))
if(!(0,o.isStream)(a))throw new n.FormatError("bad ObjStm stream")
var i=a.dict.get("First"),c=a.dict.get("N")
if(!Number.isInteger(i)||!Number.isInteger(c))throw new n.FormatError("invalid first and n parameters for ObjStm stream")
var l=new s.Parser(new s.Lexer(a),!1,this)
l.allowStreams=!0
var u,h,f=[],d=[]
for(u=0;u<c;++u){if(h=l.getObj(),!Number.isInteger(h))throw new n.FormatError("invalid object number in the ObjStm stream: ".concat(h))
d.push(h)
var g=l.getObj()
if(!Number.isInteger(g))throw new n.FormatError("invalid object offset in the ObjStm stream: ".concat(g))}for(u=0;u<c;++u){f.push(l.getObj()),(0,o.isCmd)(l.buf1,"endobj")&&l.shift(),h=d[u]
var m=this.entries[h]
m&&m.offset===r&&m.gen===u&&(this.cache[h]=f[u])}if(void 0===(t=f[t.gen]))throw new n.XRefEntryException("Bad (compressed) XRef entry: ".concat(e))
return t},fetchIfRefAsync:function(){var e=m(i.default.mark(function e(t,r){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if((0,o.isRef)(t)){e.next=2
break}return e.abrupt("return",t)
case 2:return e.abrupt("return",this.fetchAsync(t,r))
case 3:case"end":return e.stop()}},e,this)}))
return function(t,r){return e.apply(this,arguments)}}(),fetchAsync:function(){var e=m(i.default.mark(function e(t,r){return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.abrupt("return",this.fetch(t,r))
case 4:if(e.prev=4,e.t0=e.catch(0),e.t0 instanceof n.MissingDataException){e.next=8
break}throw e.t0
case 8:return e.next=10,this.pdfManager.requestRange(e.t0.begin,e.t0.end)
case 10:return e.abrupt("return",this.fetchAsync(t,r))
case 11:case"end":return e.stop()}},e,this,[[0,4]])}))
return function(t,r){return e.apply(this,arguments)}}(),getCatalogObj:function(){return this.root}},e}()
t.XRef=S
var C=function(){function e(t,r,a){v(this,e),this.constructor===e&&(0,n.unreachable)("Cannot initialize NameOrNumberTree."),this.root=t,this.xref=r,this._type=a}return y(e,[{key:"getAll",value:function(){var e=Object.create(null)
if(!this.root)return e
var t=this.xref,r=new o.RefSet
r.put(this.root)
for(var a=[this.root];a.length>0;){var i=t.fetchIfRef(a.shift())
if((0,o.isDict)(i))if(i.has("Kids"))for(var s=i.get("Kids"),c=0,l=s.length;c<l;c++){var u=s[c]
if(r.has(u))throw new n.FormatError('Duplicate entry in "'.concat(this._type,'" tree.'))
a.push(u),r.put(u)}else{var h=i.get(this._type)
if(Array.isArray(h))for(var f=0,d=h.length;f<d;f+=2)e[t.fetchIfRef(h[f])]=t.fetchIfRef(h[f+1])}}return e}},{key:"get",value:function(e){if(!this.root)return null
for(var t=this.xref,r=t.fetchIfRef(this.root),a=0;r.has("Kids");){if(++a>10)return(0,n.warn)('Search depth limit reached for "'.concat(this._type,'" tree.')),null
var i=r.get("Kids")
if(!Array.isArray(i))return null
for(var o=0,s=i.length-1;o<=s;){var c=o+s>>1,l=t.fetchIfRef(i[c]).get("Limits")
if(e<t.fetchIfRef(l[0]))s=c-1
else{if(!(e>t.fetchIfRef(l[1]))){r=t.fetchIfRef(i[c])
break}o=c+1}}if(o>s)return null}var u=r.get(this._type)
if(Array.isArray(u)){for(var h=0,f=u.length-2;h<=f;){var d=h+f>>1,g=d+(1&d),m=t.fetchIfRef(u[g])
if(e<m)f=g-2
else{if(!(e>m))return t.fetchIfRef(u[g+1])
h=g+2}}(0,n.info)('Falling back to an exhaustive search, for key "'.concat(e,'", ')+'in "'.concat(this._type,'" tree.'))
for(var p=0,v=u.length;p<v;p+=2)if(t.fetchIfRef(u[p])===e)return(0,n.warn)('The "'.concat(e,'" key was found at an incorrect, ')+'i.e. out-of-order, position in "'.concat(this._type,'" tree.')),t.fetchIfRef(u[p+1])}return null}}]),e}(),x=function(e){function t(e,r){return v(this,t),h(this,f(t).call(this,e,r,"Names"))}return d(t,C),t}(),A=function(e){function t(e,r){return v(this,t),h(this,f(t).call(this,e,r,"Nums"))}return d(t,C),t}(),_=function(){function e(e,t){e&&(0,o.isDict)(e)&&(this.xref=t,this.root=e,e.has("FS")&&(this.fs=e.get("FS")),this.description=e.has("Desc")?(0,n.stringToPDFString)(e.get("Desc")):"",e.has("RF")&&(0,n.warn)("Related file specifications are not supported"),this.contentAvailable=!0,e.has("EF")||(this.contentAvailable=!1,(0,n.warn)("Non-embedded file specifications are not supported")))}function t(e){return e.has("UF")?e.get("UF"):e.has("F")?e.get("F"):e.has("Unix")?e.get("Unix"):e.has("Mac")?e.get("Mac"):e.has("DOS")?e.get("DOS"):null}return e.prototype={get filename(){if(!this._filename&&this.root){var e=t(this.root)||"unnamed"
this._filename=(0,n.stringToPDFString)(e).replace(/\\\\/g,"\\").replace(/\\\//g,"/").replace(/\\/g,"/")}return this._filename},get content(){if(!this.contentAvailable)return null
!this.contentRef&&this.root&&(this.contentRef=t(this.root.get("EF")))
var e=null
if(this.contentRef){var r=this.xref.fetchIfRef(this.contentRef)
r&&(0,o.isStream)(r)?e=r.getBytes():(0,n.warn)("Embedded file specification points to non-existing/invalid content")}else(0,n.warn)("Embedded file specification does not have a content")
return e},get serializable(){return{filename:this.filename,content:this.content}}},e}()
t.FileSpec=_
var P=function(){function e(e){return(0,o.isRef)(e)||(0,o.isDict)(e)||Array.isArray(e)||(0,o.isStream)(e)}function t(t,r){if((0,o.isDict)(t)||(0,o.isStream)(t))for(var a=(0,o.isDict)(t)?t:t.dict,i=a.getKeys(),n=0,s=i.length;n<s;n++){var c=a.getRaw(i[n])
e(c)&&r.push(c)}else if(Array.isArray(t))for(var l=0,u=t.length;l<u;l++){var h=t[l]
e(h)&&r.push(h)}}function r(e,t,r){this.dict=e,this.keys=t,this.xref=r,this.refSet=null,this.capability=null}return r.prototype={load:function(){if(this.capability=(0,n.createPromiseCapability)(),!(this.xref.stream instanceof c.ChunkedStream)||0===this.xref.stream.getMissingChunks().length)return this.capability.resolve(),this.capability.promise
var e=this.keys,t=this.dict
this.refSet=new o.RefSet
for(var r=[],a=0,i=e.length;a<i;a++){var s=t.getRaw(e[a])
void 0!==s&&r.push(s)}return this._walk(r),this.capability.promise},_walk:function(e){for(var r=this,a=[],i=[];e.length;){var s=e.pop()
if((0,o.isRef)(s)){if(this.refSet.has(s))continue
try{this.refSet.put(s),s=this.xref.fetch(s)}catch(e){if(!(e instanceof n.MissingDataException))throw e
a.push(s),i.push({begin:e.begin,end:e.end})}}if(s&&s.getBaseStreams){for(var c=s.getBaseStreams(),l=!1,u=0,h=c.length;u<h;u++){var f=c[u]
f.getMissingChunks&&f.getMissingChunks().length&&(l=!0,i.push({begin:f.start,end:f.end}))}l&&a.push(s)}t(s,e)}i.length?this.xref.stream.manager.requestRanges(i).then(function(){for(var e=0,t=a.length;e<t;e++){var i=a[e];(0,o.isRef)(i)&&r.refSet.remove(i)}r._walk(a)},this.capability.reject):(this.refSet=null,this.capability.resolve())}},r}()
t.ObjectLoader=P},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.isEOF=function(e){return e===a},t.isCmd=function(e,t){return e instanceof n&&(void 0===t||e.cmd===t)},t.isDict=h,t.isName=u,t.isRef=f,t.isRefsEqual=function(e,t){return e.num===t.num&&e.gen===t.gen},t.isStream=function(e){return"object"===function(e){return("function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}(e)&&null!==e&&void 0!==e.getBytes},t.RefSetCache=t.RefSet=t.Ref=t.Name=t.Dict=t.Cmd=t.EOF=void 0
var a={}
t.EOF=a
var i=function(){function e(e){this.name=e}e.prototype={}
var t=Object.create(null)
return e.get=function(r){return t[r]||(t[r]=new e(r))},e}()
t.Name=i
var n=function(){function e(e){this.cmd=e}e.prototype={}
var t=Object.create(null)
return e.get=function(r){return t[r]||(t[r]=new e(r))},e}()
t.Cmd=n
var o=function(){var e=function(){return e}
function t(t){this._map=Object.create(null),this.xref=t,this.objId=null,this.suppressEncryption=!1,this.__nonSerializable__=e}return t.prototype={assignXref:function(e){this.xref=e},get:function(e,t,r){var a,i=this.xref,n=this.suppressEncryption
return void 0!==(a=this._map[e])||e in this._map||void 0===t?i?i.fetchIfRef(a,n):a:void 0!==(a=this._map[t])||t in this._map||void 0===r?i?i.fetchIfRef(a,n):a:(a=this._map[r]||null,i?i.fetchIfRef(a,n):a)},getAsync:function(e,t,r){var a,i=this.xref,n=this.suppressEncryption
return void 0!==(a=this._map[e])||e in this._map||void 0===t?i?i.fetchIfRefAsync(a,n):Promise.resolve(a):void 0!==(a=this._map[t])||t in this._map||void 0===r?i?i.fetchIfRefAsync(a,n):Promise.resolve(a):(a=this._map[r]||null,i?i.fetchIfRefAsync(a,n):Promise.resolve(a))},getArray:function(e,t,r){var a=this.get(e,t,r),i=this.xref,n=this.suppressEncryption
if(!Array.isArray(a)||!i)return a
for(var o=0,s=(a=a.slice()).length;o<s;o++)f(a[o])&&(a[o]=i.fetch(a[o],n))
return a},getRaw:function(e){return this._map[e]},getKeys:function(){return Object.keys(this._map)},set:function(e,t){this._map[e]=t},has:function(e){return e in this._map},forEach:function(e){for(var t in this._map)e(t,this.get(t))}},t.empty=new t(null),t.merge=function(e,r){for(var a=new t(e),i=0,n=r.length;i<n;i++){var o=r[i]
if(h(o))for(var s in o._map)void 0===a._map[s]&&(a._map[s]=o._map[s])}return a},t}()
t.Dict=o
var s=function(){function e(e,t){this.num=e,this.gen=t}return e.prototype={toString:function(){return 0!==this.gen?"".concat(this.num,"R").concat(this.gen):"".concat(this.num,"R")}},e}()
t.Ref=s
var c=function(){function e(){this.dict=Object.create(null)}return e.prototype={has:function(e){return e.toString()in this.dict},put:function(e){this.dict[e.toString()]=!0},remove:function(e){delete this.dict[e.toString()]}},e}()
t.RefSet=c
var l=function(){function e(){this.dict=Object.create(null)}return e.prototype={get:function(e){return this.dict[e.toString()]},has:function(e){return e.toString()in this.dict},put:function(e,t){this.dict[e.toString()]=t},putAlias:function(e,t){this.dict[e.toString()]=this.get(t)},forEach:function(e,t){for(var r in this.dict)e.call(t,this.dict[r])},clear:function(){this.dict=Object.create(null)}},e}()
function u(e,t){return e instanceof i&&(void 0===t||e.name===t)}function h(e,t){return e instanceof o&&(void 0===t||u(e.get("Type"),t))}function f(e){return e instanceof s}t.RefSetCache=l},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Parser=t.Linearization=t.Lexer=void 0
var a=r(157),i=r(6),n=r(155),o=r(158),s=r(160),c=r(163),l=r(165)
function u(e){for(var t=e.length,r=1,a=0,i=0;i<t;++i)a+=r+=255&e[i]
return a%65521<<16|r%65521}var h=function(){function e(e,t,r,a){this.lexer=e,this.allowStreams=t,this.xref=r,this.recoveryMode=a||!1,this.imageCache=Object.create(null),this.refill()}return e.prototype={refill:function(){this.buf1=this.lexer.getObj(),this.buf2=this.lexer.getObj()},shift:function(){(0,n.isCmd)(this.buf2,"ID")?(this.buf1=this.buf2,this.buf2=null):(this.buf1=this.buf2,this.buf2=this.lexer.getObj())},tryShift:function(){try{return this.shift(),!0}catch(e){if(e instanceof i.MissingDataException)throw e
return!1}},getObj:function(e){var t=this.buf1
if(this.shift(),t instanceof n.Cmd)switch(t.cmd){case"BI":return this.makeInlineImage(e)
case"[":for(var r=[];!(0,n.isCmd)(this.buf1,"]")&&!(0,n.isEOF)(this.buf1);)r.push(this.getObj(e))
if((0,n.isEOF)(this.buf1)){if(!this.recoveryMode)throw new i.FormatError("End of file inside array")
return r}return this.shift(),r
case"<<":for(var a=new n.Dict(this.xref);!(0,n.isCmd)(this.buf1,">>")&&!(0,n.isEOF)(this.buf1);)if((0,n.isName)(this.buf1)){var o=this.buf1.name
if(this.shift(),(0,n.isEOF)(this.buf1))break
a.set(o,this.getObj(e))}else(0,i.info)("Malformed dictionary: key must be a name object"),this.shift()
if((0,n.isEOF)(this.buf1)){if(!this.recoveryMode)throw new i.FormatError("End of file inside dictionary")
return a}return(0,n.isCmd)(this.buf2,"stream")?this.allowStreams?this.makeStream(a,e):a:(this.shift(),a)
default:return t}if(Number.isInteger(t)){var s=t
if(Number.isInteger(this.buf1)&&(0,n.isCmd)(this.buf2,"R")){var c=new n.Ref(s,this.buf1)
return this.shift(),this.shift(),c}return s}if((0,i.isString)(t)){var l=t
return e&&(l=e.decryptString(l)),l}return t},findDefaultInlineStreamEnd:function(e){for(var t,r,a=e.pos,n=0;-1!==(t=e.getByte());)if(0===n)n=69===t?1:0
else if(1===n)n=73===t?2:0
else if((0,i.assert)(2===n),32===t||10===t||13===t){r=e.pos
for(var o=e.peekBytes(10),s=0,c=o.length;s<c;s++)if((0!==(t=o[s])||0===o[s+1])&&10!==t&&13!==t&&(t<32||t>127)){n=0
break}if(2===n)break}else n=0;-1===t&&((0,i.warn)("findDefaultInlineStreamEnd: Reached the end of the stream without finding a valid EI marker"),r&&((0,i.warn)('... trying to recover by using the last "EI" occurrence.'),e.skip(-(e.pos-r))))
var l=4
return e.skip(-l),t=e.peekByte(),e.skip(l),(0,i.isSpace)(t)||l--,e.pos-l-a},findDCTDecodeInlineStreamEnd:function(e){for(var t,r,a,n=e.pos,o=!1;-1!==(t=e.getByte());)if(255===t){switch(e.getByte()){case 0:break
case 255:e.skip(-1)
break
case 217:o=!0
break
case 192:case 193:case 194:case 195:case 197:case 198:case 199:case 201:case 202:case 203:case 205:case 206:case 207:case 196:case 204:case 218:case 219:case 220:case 221:case 222:case 223:case 224:case 225:case 226:case 227:case 228:case 229:case 230:case 231:case 232:case 233:case 234:case 235:case 236:case 237:case 238:case 239:case 254:(r=e.getUint16())>2?e.skip(r-2):e.skip(-2)}if(o)break}return a=e.pos-n,-1===t?((0,i.warn)("Inline DCTDecode image stream: EOI marker not found, searching for /EI/ instead."),e.skip(-a),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),a)},findASCII85DecodeInlineStreamEnd:function(e){for(var t,r,a=e.pos;-1!==(t=e.getByte());)if(126===t&&62===e.peekByte()){e.skip()
break}return r=e.pos-a,-1===t?((0,i.warn)("Inline ASCII85Decode image stream: EOD marker not found, searching for /EI/ instead."),e.skip(-r),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),r)},findASCIIHexDecodeInlineStreamEnd:function(e){for(var t,r,a=e.pos;-1!==(t=e.getByte())&&62!==t;);return r=e.pos-a,-1===t?((0,i.warn)("Inline ASCIIHexDecode image stream: EOD marker not found, searching for /EI/ instead."),e.skip(-r),this.findDefaultInlineStreamEnd(e)):(this.inlineStreamSkipEI(e),r)},inlineStreamSkipEI:function(e){for(var t,r=0;-1!==(t=e.getByte());)if(0===r)r=69===t?1:0
else if(1===r)r=73===t?2:0
else if(2===r)break},makeInlineImage:function(e){for(var t,r=this.lexer,a=r.stream,o=new n.Dict(this.xref);!(0,n.isCmd)(this.buf1,"ID")&&!(0,n.isEOF)(this.buf1);){if(!(0,n.isName)(this.buf1))throw new i.FormatError("Dictionary key must be a name object")
var s=this.buf1.name
if(this.shift(),(0,n.isEOF)(this.buf1))break
o.set(s,this.getObj(e))}-1!==r.beginInlineImagePos&&(t=a.pos-r.beginInlineImagePos)
var c,l=o.get("Filter","F")
if((0,n.isName)(l))c=l.name
else if(Array.isArray(l)){var h=this.xref.fetchIfRef(l[0]);(0,n.isName)(h)&&(c=h.name)}var f,d=a.pos
f="DCTDecode"===c||"DCT"===c?this.findDCTDecodeInlineStreamEnd(a):"ASCII85Decode"===c||"A85"===c?this.findASCII85DecodeInlineStreamEnd(a):"ASCIIHexDecode"===c||"AHx"===c?this.findASCIIHexDecodeInlineStreamEnd(a):this.findDefaultInlineStreamEnd(a)
var g,m=a.makeSubStream(d,f,o)
if(f<1e3&&t<5552){var p=m.getBytes()
m.reset()
var v=a.pos
a.pos=r.beginInlineImagePos
var b=a.getBytes(t)
a.pos=v,g=u(p)+"_"+u(b)
var y=this.imageCache[g]
if(void 0!==y)return this.buf2=n.Cmd.get("EI"),this.shift(),y.reset(),y}return e&&(m=e.createStream(m,f)),(m=this.filter(m,o,f)).dict=o,void 0!==g&&(m.cacheKey="inline_"+f+"_"+g,this.imageCache[g]=m),this.buf2=n.Cmd.get("EI"),this.shift(),m},_findStreamLength:function(e,t){var r=this.lexer.stream
r.pos=e
for(var a=t.length;r.pos<r.end;){var i=r.peekBytes(2048),n=i.length-a
if(n<=0)break
for(var o=0;o<n;){for(var s=0;s<a&&i[o+s]===t[s];)s++
if(s>=a)return r.pos+=o,r.pos-e
o++}r.pos+=n}return-1},makeStream:function(e,t){var r=this.lexer,a=r.stream
r.skipToNextLine()
var o=a.pos-1,s=e.get("Length")
if(Number.isInteger(s)||((0,i.info)("Bad "+s+" attribute in stream"),s=0),a.pos=o+s,r.nextChar(),this.tryShift()&&(0,n.isCmd)(this.buf2,"endstream"))this.shift()
else{var c=new Uint8Array([101,110,100,115,116,114,101,97,109]),l=this._findStreamLength(o,c)
if(l<0){for(var u=1;u<=1;u++){var h=c.length-u,f=c.slice(0,h),d=this._findStreamLength(o,f)
if(d>=0){var g=a.peekBytes(h+1)[h]
if(!(0,i.isSpace)(g))break;(0,i.info)('Found "'.concat((0,i.bytesToString)(f),'" when ')+"searching for endstream command."),l=d
break}}if(l<0)throw new i.FormatError("Missing endstream command.")}s=l,r.nextChar(),this.shift(),this.shift()}return this.shift(),a=a.makeSubStream(o,s,e),t&&(a=t.createStream(a,s)),(a=this.filter(a,e,s)).dict=e,a},filter:function(e,t,r){var a=t.get("Filter","F"),o=t.get("DecodeParms","DP")
if((0,n.isName)(a))return Array.isArray(o)&&(0,i.warn)("/DecodeParms should not contain an Array, when /Filter contains a Name."),this.makeFilter(e,a.name,r,o)
var s=r
if(Array.isArray(a))for(var c=a,l=o,u=0,h=c.length;u<h;++u){if(a=this.xref.fetchIfRef(c[u]),!(0,n.isName)(a))throw new i.FormatError("Bad filter name: "+a)
o=null,Array.isArray(l)&&u in l&&(o=this.xref.fetchIfRef(l[u])),e=this.makeFilter(e,a.name,s,o),s=null}return e},makeFilter:function(e,t,r,n){if(0===r)return(0,i.warn)('Empty "'+t+'" stream.'),new a.NullStream
try{var u=this.xref.stats.streamTypes
if("FlateDecode"===t||"Fl"===t)return u[i.StreamType.FLATE]=!0,n?new a.PredictorStream(new a.FlateStream(e,r),r,n):new a.FlateStream(e,r)
if("LZWDecode"===t||"LZW"===t){u[i.StreamType.LZW]=!0
var h=1
return n?(n.has("EarlyChange")&&(h=n.get("EarlyChange")),new a.PredictorStream(new a.LZWStream(e,r,h),r,n)):new a.LZWStream(e,r,h)}return"DCTDecode"===t||"DCT"===t?(u[i.StreamType.DCT]=!0,new c.JpegStream(e,r,e.dict,n)):"JPXDecode"===t||"JPX"===t?(u[i.StreamType.JPX]=!0,new l.JpxStream(e,r,e.dict,n)):"ASCII85Decode"===t||"A85"===t?(u[i.StreamType.A85]=!0,new a.Ascii85Stream(e,r)):"ASCIIHexDecode"===t||"AHx"===t?(u[i.StreamType.AHX]=!0,new a.AsciiHexStream(e,r)):"CCITTFaxDecode"===t||"CCF"===t?(u[i.StreamType.CCF]=!0,new o.CCITTFaxStream(e,r,n)):"RunLengthDecode"===t||"RL"===t?(u[i.StreamType.RL]=!0,new a.RunLengthStream(e,r)):"JBIG2Decode"===t?(u[i.StreamType.JBIG]=!0,new s.Jbig2Stream(e,r,e.dict,n)):((0,i.warn)('filter "'+t+'" not supported yet'),e)}catch(e){if(e instanceof i.MissingDataException)throw e
return(0,i.warn)('Invalid stream: "'+e+'"'),new a.NullStream}}},e}()
t.Parser=h
var f=function(){function e(e,t){this.stream=e,this.nextChar(),this.strBuf=[],this.knownCommands=t,this.beginInlineImagePos=-1}var t=[1,0,0,0,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,2,0,0,2,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
function r(e){return e>=48&&e<=57?15&e:e>=65&&e<=70||e>=97&&e<=102?9+(15&e):-1}return e.prototype={nextChar:function(){return this.currentChar=this.stream.getByte()},peekChar:function(){return this.stream.peekByte()},getNumber:function(){var e=this.currentChar,t=!1,r=0,a=0
if(45===e?(a=-1,45===(e=this.nextChar())&&(e=this.nextChar())):43===e&&(a=1,e=this.nextChar()),10===e||13===e)do{e=this.nextChar()}while(10===e||13===e)
if(46===e&&(r=10,e=this.nextChar()),e<48||e>57){if(10===r&&0===a&&((0,i.isSpace)(e)||-1===e))return(0,i.warn)("Lexer.getNumber - treating a single decimal point as zero."),0
throw new i.FormatError("Invalid number: ".concat(String.fromCharCode(e)," (charCode ").concat(e,")"))}a=a||1
for(var n=e-48,o=0,s=1;(e=this.nextChar())>=0;)if(48<=e&&e<=57){var c=e-48
t?o=10*o+c:(0!==r&&(r*=10),n=10*n+c)}else if(46===e){if(0!==r)break
r=1}else if(45===e)(0,i.warn)("Badly formatted number")
else{if(69!==e&&101!==e)break
if(43===(e=this.peekChar())||45===e)s=45===e?-1:1,this.nextChar()
else if(e<48||e>57)break
t=!0}return 0!==r&&(n/=r),t&&(n*=Math.pow(10,s*o)),a*n},getString:function(){var e=1,t=!1,r=this.strBuf
r.length=0
for(var a=this.nextChar();;){var n=!1
switch(0|a){case-1:(0,i.warn)("Unterminated string"),t=!0
break
case 40:++e,r.push("(")
break
case 41:0==--e?(this.nextChar(),t=!0):r.push(")")
break
case 92:switch(a=this.nextChar()){case-1:(0,i.warn)("Unterminated string"),t=!0
break
case 110:r.push("\n")
break
case 114:r.push("\r")
break
case 116:r.push("\t")
break
case 98:r.push("\b")
break
case 102:r.push("\f")
break
case 92:case 40:case 41:r.push(String.fromCharCode(a))
break
case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:var o=15&a
n=!0,(a=this.nextChar())>=48&&a<=55&&(o=(o<<3)+(15&a),(a=this.nextChar())>=48&&a<=55&&(n=!1,o=(o<<3)+(15&a))),r.push(String.fromCharCode(o))
break
case 13:10===this.peekChar()&&this.nextChar()
break
case 10:break
default:r.push(String.fromCharCode(a))}break
default:r.push(String.fromCharCode(a))}if(t)break
n||(a=this.nextChar())}return r.join("")},getName:function(){var e,a,o=this.strBuf
for(o.length=0;(e=this.nextChar())>=0&&!t[e];)if(35===e){if(e=this.nextChar(),t[e]){(0,i.warn)("Lexer_getName: NUMBER SIGN (#) should be followed by a hexadecimal number."),o.push("#")
break}var s=r(e)
if(-1!==s){a=e
var c=r(e=this.nextChar())
if(-1===c){if((0,i.warn)("Lexer_getName: Illegal digit ("+String.fromCharCode(e)+") in hexadecimal number."),o.push("#",String.fromCharCode(a)),t[e])break
o.push(String.fromCharCode(e))
continue}o.push(String.fromCharCode(s<<4|c))}else o.push("#",String.fromCharCode(e))}else o.push(String.fromCharCode(e))
return o.length>127&&(0,i.warn)("name token is longer than allowed by the spec: "+o.length),n.Name.get(o.join(""))},getHexString:function(){var e=this.strBuf
e.length=0
for(var a,n,o=this.currentChar,s=!0;;){if(o<0){(0,i.warn)("Unterminated hex string")
break}if(62===o){this.nextChar()
break}if(1!==t[o]){if(s){if(-1===(a=r(o))){(0,i.warn)('Ignoring invalid character "'+o+'" in hex string'),o=this.nextChar()
continue}}else{if(-1===(n=r(o))){(0,i.warn)('Ignoring invalid character "'+o+'" in hex string'),o=this.nextChar()
continue}e.push(String.fromCharCode(a<<4|n))}s=!s,o=this.nextChar()}else o=this.nextChar()}return e.join("")},getObj:function(){for(var e=!1,r=this.currentChar;;){if(r<0)return n.EOF
if(e)10!==r&&13!==r||(e=!1)
else if(37===r)e=!0
else if(1!==t[r])break
r=this.nextChar()}switch(0|r){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 43:case 45:case 46:return this.getNumber()
case 40:return this.getString()
case 47:return this.getName()
case 91:return this.nextChar(),n.Cmd.get("[")
case 93:return this.nextChar(),n.Cmd.get("]")
case 60:return 60===(r=this.nextChar())?(this.nextChar(),n.Cmd.get("<<")):this.getHexString()
case 62:return 62===(r=this.nextChar())?(this.nextChar(),n.Cmd.get(">>")):n.Cmd.get(">")
case 123:return this.nextChar(),n.Cmd.get("{")
case 125:return this.nextChar(),n.Cmd.get("}")
case 41:throw this.nextChar(),new i.FormatError("Illegal character: ".concat(r))}for(var a=String.fromCharCode(r),o=this.knownCommands,s=o&&void 0!==o[a];(r=this.nextChar())>=0&&!t[r];){var c=a+String.fromCharCode(r)
if(s&&void 0===o[c])break
if(128===a.length)throw new i.FormatError("Command token too long: ".concat(a.length))
a=c,s=o&&void 0!==o[a]}return"true"===a||"false"!==a&&("null"===a?null:("BI"===a&&(this.beginInlineImagePos=this.stream.pos),n.Cmd.get(a)))},skipToNextLine:function(){for(var e=this.currentChar;e>=0;){if(13===e){10===(e=this.nextChar())&&this.nextChar()
break}if(10===e){this.nextChar()
break}e=this.nextChar()}}},e}()
t.Lexer=f
var d={create:function(e){function t(e,t){var r=u.get(e)
if(Number.isInteger(r)&&(t?r>=0:r>0))return r
throw new Error('The "'+e+'" parameter in the linearization dictionary is invalid.')}var r,a,o=new h(new f(e),!1,null),s=o.getObj(),c=o.getObj(),l=o.getObj(),u=o.getObj()
if(!(Number.isInteger(s)&&Number.isInteger(c)&&(0,n.isCmd)(l,"obj")&&(0,n.isDict)(u)&&(0,i.isNum)(r=u.get("Linearized"))&&r>0))return null
if((a=t("L"))!==e.length)throw new Error('The "L" parameter in the linearization dictionary does not equal the stream length.')
return{length:a,hints:function(){var e,t,r=u.get("H")
if(Array.isArray(r)&&(2===(e=r.length)||4===e)){for(var a=0;a<e;a++)if(!(Number.isInteger(t=r[a])&&t>0))throw new Error("Hint ("+a+") in the linearization dictionary is invalid.")
return r}throw new Error("Hint array in the linearization dictionary is invalid.")}(),objectNumberFirst:t("O"),endFirst:t("E"),numPages:t("N"),mainXRefEntriesOffset:t("T"),pageFirst:u.has("P")?t("P",!0):0}}}
t.Linearization=d},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.LZWStream=t.StringStream=t.StreamsSequenceStream=t.Stream=t.RunLengthStream=t.PredictorStream=t.NullStream=t.FlateStream=t.DecodeStream=t.DecryptStream=t.AsciiHexStream=t.Ascii85Stream=void 0
var a=r(6),i=r(155)
function n(e){return function(e){if(Array.isArray(e)){for(var t=0,r=new Array(e.length);t<e.length;t++)r[t]=e[t]
return r}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}var o=function(){function e(e,t,r,a){this.bytes=e instanceof Uint8Array?e:new Uint8Array(e),this.start=t||0,this.pos=this.start,this.end=t+r||this.bytes.length,this.dict=a}return e.prototype={get length(){return this.end-this.start},get isEmpty(){return 0===this.length},getByte:function(){return this.pos>=this.end?-1:this.bytes[this.pos++]},getUint16:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t},getInt32:function(){return(this.getByte()<<24)+(this.getByte()<<16)+(this.getByte()<<8)+this.getByte()},getBytes:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.bytes,a=this.pos,i=this.end
if(!e){var n=r.subarray(a,i)
return t?new Uint8ClampedArray(n):n}var o=a+e
o>i&&(o=i),this.pos=o
var s=r.subarray(a,o)
return t?new Uint8ClampedArray(s):s},peekByte:function(){var e=this.getByte()
return this.pos--,e},peekBytes:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getBytes(e,t)
return this.pos-=r.length,r},skip:function(e){e||(e=1),this.pos+=e},reset:function(){this.pos=this.start},moveStart:function(){this.start=this.pos},makeSubStream:function(t,r,a){return new e(this.bytes.buffer,t,r,a)}},e}()
t.Stream=o
var s=function(){function e(e){var t=(0,a.stringToBytes)(e)
o.call(this,t)}return e.prototype=o.prototype,e}()
t.StringStream=s
var c=function(){var e=new Uint8Array(0)
function t(t){if(this._rawMinBufferLength=t||0,this.pos=0,this.bufferLength=0,this.eof=!1,this.buffer=e,this.minBufferLength=512,t)for(;this.minBufferLength<t;)this.minBufferLength*=2}return t.prototype={get isEmpty(){for(;!this.eof&&0===this.bufferLength;)this.readBlock()
return 0===this.bufferLength},ensureBuffer:function(e){var t=this.buffer
if(e<=t.byteLength)return t
for(var r=this.minBufferLength;r<e;)r*=2
var a=new Uint8Array(r)
return a.set(t),this.buffer=a},getByte:function(){for(var e=this.pos;this.bufferLength<=e;){if(this.eof)return-1
this.readBlock()}return this.buffer[this.pos++]},getUint16:function(){var e=this.getByte(),t=this.getByte()
return-1===e||-1===t?-1:(e<<8)+t},getInt32:function(){return(this.getByte()<<24)+(this.getByte()<<16)+(this.getByte()<<8)+this.getByte()},getBytes:function(e){var t,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=this.pos
if(e){for(this.ensureBuffer(a+e),t=a+e;!this.eof&&this.bufferLength<t;)this.readBlock()
var i=this.bufferLength
t>i&&(t=i)}else{for(;!this.eof;)this.readBlock()
t=this.bufferLength}this.pos=t
var n=this.buffer.subarray(a,t)
return!r||n instanceof Uint8ClampedArray?n:new Uint8ClampedArray(n)},peekByte:function(){var e=this.getByte()
return this.pos--,e},peekBytes:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.getBytes(e,t)
return this.pos-=r.length,r},makeSubStream:function(e,t,r){for(var a=e+t;this.bufferLength<=a&&!this.eof;)this.readBlock()
return new o(this.buffer,e,t,r)},skip:function(e){e||(e=1),this.pos+=e},reset:function(){this.pos=0},getBaseStreams:function(){return this.str&&this.str.getBaseStreams?this.str.getBaseStreams():[]}},t}()
t.DecodeStream=c
var l=function(){function e(e){this.streams=e
for(var t=0,r=0,a=e.length;r<a;r++){var i=e[r]
t+=i instanceof c?i._rawMinBufferLength:i.length}c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBlock=function(){var e=this.streams
if(0!==e.length){var t=e.shift().getBytes(),r=this.bufferLength,a=r+t.length
this.ensureBuffer(a).set(t,r),this.bufferLength=a}else this.eof=!0},e.prototype.getBaseStreams=function(){for(var e=[],t=0,r=this.streams.length;t<r;t++){var a=this.streams[t]
a.getBaseStreams&&e.push.apply(e,n(a.getBaseStreams()))}return e},e}()
t.StreamsSequenceStream=l
var u=function(){var e=new Int32Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),t=new Int32Array([3,4,5,6,7,8,9,10,65547,65549,65551,65553,131091,131095,131099,131103,196643,196651,196659,196667,262211,262227,262243,262259,327811,327843,327875,327907,258,258,258]),r=new Int32Array([1,2,3,4,65541,65543,131081,131085,196625,196633,262177,262193,327745,327777,393345,393409,459009,459137,524801,525057,590849,591361,657409,658433,724993,727041,794625,798721,868353,876545]),i=[new Int32Array([459008,524368,524304,524568,459024,524400,524336,590016,459016,524384,524320,589984,524288,524416,524352,590048,459012,524376,524312,589968,459028,524408,524344,590032,459020,524392,524328,59e4,524296,524424,524360,590064,459010,524372,524308,524572,459026,524404,524340,590024,459018,524388,524324,589992,524292,524420,524356,590056,459014,524380,524316,589976,459030,524412,524348,590040,459022,524396,524332,590008,524300,524428,524364,590072,459009,524370,524306,524570,459025,524402,524338,590020,459017,524386,524322,589988,524290,524418,524354,590052,459013,524378,524314,589972,459029,524410,524346,590036,459021,524394,524330,590004,524298,524426,524362,590068,459011,524374,524310,524574,459027,524406,524342,590028,459019,524390,524326,589996,524294,524422,524358,590060,459015,524382,524318,589980,459031,524414,524350,590044,459023,524398,524334,590012,524302,524430,524366,590076,459008,524369,524305,524569,459024,524401,524337,590018,459016,524385,524321,589986,524289,524417,524353,590050,459012,524377,524313,589970,459028,524409,524345,590034,459020,524393,524329,590002,524297,524425,524361,590066,459010,524373,524309,524573,459026,524405,524341,590026,459018,524389,524325,589994,524293,524421,524357,590058,459014,524381,524317,589978,459030,524413,524349,590042,459022,524397,524333,590010,524301,524429,524365,590074,459009,524371,524307,524571,459025,524403,524339,590022,459017,524387,524323,589990,524291,524419,524355,590054,459013,524379,524315,589974,459029,524411,524347,590038,459021,524395,524331,590006,524299,524427,524363,590070,459011,524375,524311,524575,459027,524407,524343,590030,459019,524391,524327,589998,524295,524423,524359,590062,459015,524383,524319,589982,459031,524415,524351,590046,459023,524399,524335,590014,524303,524431,524367,590078,459008,524368,524304,524568,459024,524400,524336,590017,459016,524384,524320,589985,524288,524416,524352,590049,459012,524376,524312,589969,459028,524408,524344,590033,459020,524392,524328,590001,524296,524424,524360,590065,459010,524372,524308,524572,459026,524404,524340,590025,459018,524388,524324,589993,524292,524420,524356,590057,459014,524380,524316,589977,459030,524412,524348,590041,459022,524396,524332,590009,524300,524428,524364,590073,459009,524370,524306,524570,459025,524402,524338,590021,459017,524386,524322,589989,524290,524418,524354,590053,459013,524378,524314,589973,459029,524410,524346,590037,459021,524394,524330,590005,524298,524426,524362,590069,459011,524374,524310,524574,459027,524406,524342,590029,459019,524390,524326,589997,524294,524422,524358,590061,459015,524382,524318,589981,459031,524414,524350,590045,459023,524398,524334,590013,524302,524430,524366,590077,459008,524369,524305,524569,459024,524401,524337,590019,459016,524385,524321,589987,524289,524417,524353,590051,459012,524377,524313,589971,459028,524409,524345,590035,459020,524393,524329,590003,524297,524425,524361,590067,459010,524373,524309,524573,459026,524405,524341,590027,459018,524389,524325,589995,524293,524421,524357,590059,459014,524381,524317,589979,459030,524413,524349,590043,459022,524397,524333,590011,524301,524429,524365,590075,459009,524371,524307,524571,459025,524403,524339,590023,459017,524387,524323,589991,524291,524419,524355,590055,459013,524379,524315,589975,459029,524411,524347,590039,459021,524395,524331,590007,524299,524427,524363,590071,459011,524375,524311,524575,459027,524407,524343,590031,459019,524391,524327,589999,524295,524423,524359,590063,459015,524383,524319,589983,459031,524415,524351,590047,459023,524399,524335,590015,524303,524431,524367,590079]),9],n=[new Int32Array([327680,327696,327688,327704,327684,327700,327692,327708,327682,327698,327690,327706,327686,327702,327694,0,327681,327697,327689,327705,327685,327701,327693,327709,327683,327699,327691,327707,327687,327703,327695,0]),5]
function o(e,t){this.str=e,this.dict=e.dict
var r=e.getByte(),i=e.getByte()
if(-1===r||-1===i)throw new a.FormatError("Invalid header in flate stream: ".concat(r,", ").concat(i))
if(8!=(15&r))throw new a.FormatError("Unknown compression method in flate stream: ".concat(r,", ").concat(i))
if(((r<<8)+i)%31!=0)throw new a.FormatError("Bad FCHECK in flate stream: ".concat(r,", ").concat(i))
if(32&i)throw new a.FormatError("FDICT bit set in flate stream: ".concat(r,", ").concat(i))
this.codeSize=0,this.codeBuf=0,c.call(this,t)}return o.prototype=Object.create(c.prototype),o.prototype.getBits=function(e){for(var t,r=this.str,i=this.codeSize,n=this.codeBuf;i<e;){if(-1===(t=r.getByte()))throw new a.FormatError("Bad encoding in flate stream")
n|=t<<i,i+=8}return t=n&(1<<e)-1,this.codeBuf=n>>e,this.codeSize=i-=e,t},o.prototype.getCode=function(e){for(var t,r=this.str,i=e[0],n=e[1],o=this.codeSize,s=this.codeBuf;o<n&&-1!==(t=r.getByte());)s|=t<<o,o+=8
var c=i[s&(1<<n)-1],l=c>>16,u=65535&c
if(l<1||o<l)throw new a.FormatError("Bad encoding in flate stream")
return this.codeBuf=s>>l,this.codeSize=o-l,u},o.prototype.generateHuffmanTable=function(e){var t,r=e.length,a=0
for(t=0;t<r;++t)e[t]>a&&(a=e[t])
for(var i=1<<a,n=new Int32Array(i),o=1,s=0,c=2;o<=a;++o,s<<=1,c<<=1)for(var l=0;l<r;++l)if(e[l]===o){var u=0,h=s
for(t=0;t<o;++t)u=u<<1|1&h,h>>=1
for(t=u;t<i;t+=c)n[t]=o<<16|l;++s}return[n,a]},o.prototype.readBlock=function(){var o,s,c=this.str,l=this.getBits(3)
if(1&l&&(this.eof=!0),0!=(l>>=1)){var u,h
if(1===l)u=i,h=n
else{if(2!==l)throw new a.FormatError("Unknown block type in flate stream")
var f,d=this.getBits(5)+257,g=this.getBits(5)+1,m=this.getBits(4)+4,p=new Uint8Array(e.length)
for(f=0;f<m;++f)p[e[f]]=this.getBits(3)
var v=this.generateHuffmanTable(p)
s=0,f=0
for(var b,y,w,k=d+g,S=new Uint8Array(k);f<k;){var C=this.getCode(v)
if(16===C)b=2,y=3,w=s
else if(17===C)b=3,y=3,w=s=0
else{if(18!==C){S[f++]=s=C
continue}b=7,y=11,w=s=0}for(var x=this.getBits(b)+y;x-- >0;)S[f++]=w}u=this.generateHuffmanTable(S.subarray(0,d)),h=this.generateHuffmanTable(S.subarray(d,k))}for(var A=(o=this.buffer)?o.length:0,_=this.bufferLength;;){var P=this.getCode(u)
if(P<256)_+1>=A&&(A=(o=this.ensureBuffer(_+1)).length),o[_++]=P
else{if(256===P)return void(this.bufferLength=_)
var I=(P=t[P-=257])>>16
I>0&&(I=this.getBits(I)),s=(65535&P)+I,P=this.getCode(h),(I=(P=r[P])>>16)>0&&(I=this.getBits(I))
var O=(65535&P)+I
_+s>=A&&(A=(o=this.ensureBuffer(_+s)).length)
for(var E=0;E<s;++E,++_)o[_]=o[_-O]}}}else{var T
if(-1===(T=c.getByte()))throw new a.FormatError("Bad block header in flate stream")
var F=T
if(-1===(T=c.getByte()))throw new a.FormatError("Bad block header in flate stream")
if(F|=T<<8,-1===(T=c.getByte()))throw new a.FormatError("Bad block header in flate stream")
var R=T
if(-1===(T=c.getByte()))throw new a.FormatError("Bad block header in flate stream")
if((R|=T<<8)!=(65535&~F)&&(0!==F||0!==R))throw new a.FormatError("Bad uncompressed block length in flate stream")
this.codeBuf=0,this.codeSize=0
var B=this.bufferLength
o=this.ensureBuffer(B+F)
var D=B+F
if(this.bufferLength=D,0===F)-1===c.peekByte()&&(this.eof=!0)
else for(var M=B;M<D;++M){if(-1===(T=c.getByte())){this.eof=!0
break}o[M]=T}}},o}()
t.FlateStream=u
var h=function(){function e(e,t,r){if(!(0,i.isDict)(r))return e
var n=this.predictor=r.get("Predictor")||1
if(n<=1)return e
if(2!==n&&(n<10||n>15))throw new a.FormatError("Unsupported predictor: ".concat(n))
this.readBlock=2===n?this.readBlockTiff:this.readBlockPng,this.str=e,this.dict=e.dict
var o=this.colors=r.get("Colors")||1,s=this.bits=r.get("BitsPerComponent")||8,l=this.columns=r.get("Columns")||1
return this.pixBytes=o*s+7>>3,this.rowBytes=l*o*s+7>>3,c.call(this,t),this}return e.prototype=Object.create(c.prototype),e.prototype.readBlockTiff=function(){var e=this.rowBytes,t=this.bufferLength,r=this.ensureBuffer(t+e),a=this.bits,i=this.colors,n=this.str.getBytes(e)
if(this.eof=!n.length,!this.eof){var o,s=0,c=0,l=0,u=0,h=t
if(1===a&&1===i)for(o=0;o<e;++o){var f=n[o]^s
f^=f>>1,f^=f>>2,s=(1&(f^=f>>4))<<7,r[h++]=f}else if(8===a){for(o=0;o<i;++o)r[h++]=n[o]
for(;o<e;++o)r[h]=r[h-i]+n[o],h++}else if(16===a){var d=2*i
for(o=0;o<d;++o)r[h++]=n[o]
for(;o<e;o+=2){var g=((255&n[o])<<8)+(255&n[o+1])+((255&r[h-d])<<8)+(255&r[h-d+1])
r[h++]=g>>8&255,r[h++]=255&g}}else{var m=new Uint8Array(i+1),p=(1<<a)-1,v=0,b=t,y=this.columns
for(o=0;o<y;++o)for(var w=0;w<i;++w)l<a&&(s=s<<8|255&n[v++],l+=8),m[w]=m[w]+(s>>l-a)&p,l-=a,c=c<<a|m[w],(u+=a)>=8&&(r[b++]=c>>u-8&255,u-=8)
u>0&&(r[b++]=(c<<8-u)+(s&(1<<8-u)-1))}this.bufferLength+=e}},e.prototype.readBlockPng=function(){var e=this.rowBytes,t=this.pixBytes,r=this.str.getByte(),i=this.str.getBytes(e)
if(this.eof=!i.length,!this.eof){var n=this.bufferLength,o=this.ensureBuffer(n+e),s=o.subarray(n-e,n)
0===s.length&&(s=new Uint8Array(e))
var c,l,u,h=n
switch(r){case 0:for(c=0;c<e;++c)o[h++]=i[c]
break
case 1:for(c=0;c<t;++c)o[h++]=i[c]
for(;c<e;++c)o[h]=o[h-t]+i[c]&255,h++
break
case 2:for(c=0;c<e;++c)o[h++]=s[c]+i[c]&255
break
case 3:for(c=0;c<t;++c)o[h++]=(s[c]>>1)+i[c]
for(;c<e;++c)o[h]=(s[c]+o[h-t]>>1)+i[c]&255,h++
break
case 4:for(c=0;c<t;++c)l=s[c],u=i[c],o[h++]=l+u
for(;c<e;++c){l=s[c]
var f=s[c-t],d=o[h-t],g=d+l-f,m=g-d
m<0&&(m=-m)
var p=g-l
p<0&&(p=-p)
var v=g-f
v<0&&(v=-v),u=i[c],o[h++]=m<=p&&m<=v?d+u:p<=v?l+u:f+u}break
default:throw new a.FormatError("Unsupported predictor: ".concat(r))}this.bufferLength+=e}},e}()
t.PredictorStream=h
var f=function(){function e(e,t,r){this.str=e,this.dict=e.dict,this.decrypt=r,this.nextChunk=null,this.initialized=!1,c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBlock=function(){var e
if(this.initialized?e=this.nextChunk:(e=this.str.getBytes(512),this.initialized=!0),e&&0!==e.length){this.nextChunk=this.str.getBytes(512)
var t=this.nextChunk&&this.nextChunk.length>0
e=(0,this.decrypt)(e,!t)
var r,a=this.bufferLength,i=e.length,n=this.ensureBuffer(a+i)
for(r=0;r<i;r++)n[a++]=e[r]
this.bufferLength=a}else this.eof=!0},e}()
t.DecryptStream=f
var d=function(){function e(e,t){this.str=e,this.dict=e.dict,this.input=new Uint8Array(5),t&&(t*=.8),c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBlock=function(){for(var e=this.str,t=e.getByte();(0,a.isSpace)(t);)t=e.getByte()
if(-1!==t&&126!==t){var r,i,n=this.bufferLength
if(122===t){for(r=this.ensureBuffer(n+4),i=0;i<4;++i)r[n+i]=0
this.bufferLength+=4}else{var o=this.input
for(o[0]=t,i=1;i<5;++i){for(t=e.getByte();(0,a.isSpace)(t);)t=e.getByte()
if(o[i]=t,-1===t||126===t)break}if(r=this.ensureBuffer(n+i-1),this.bufferLength+=i-1,i<5){for(;i<5;++i)o[i]=117
this.eof=!0}var s=0
for(i=0;i<5;++i)s=85*s+(o[i]-33)
for(i=3;i>=0;--i)r[n+i]=255&s,s>>=8}}else this.eof=!0},e}()
t.Ascii85Stream=d
var g=function(){function e(e,t){this.str=e,this.dict=e.dict,this.firstDigit=-1,t&&(t*=.5),c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBlock=function(){var e=this.str.getBytes(8e3)
if(e.length){for(var t=e.length+1>>1,r=this.ensureBuffer(this.bufferLength+t),a=this.bufferLength,i=this.firstDigit,n=0,o=e.length;n<o;n++){var s,c=e[n]
if(c>=48&&c<=57)s=15&c
else{if(!(c>=65&&c<=70||c>=97&&c<=102)){if(62===c){this.eof=!0
break}continue}s=9+(15&c)}i<0?i=s:(r[a++]=i<<4|s,i=-1)}i>=0&&this.eof&&(r[a++]=i<<4,i=-1),this.firstDigit=i,this.bufferLength=a}else this.eof=!0},e}()
t.AsciiHexStream=g
var m=function(){function e(e,t){this.str=e,this.dict=e.dict,c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBlock=function(){var e=this.str.getBytes(2)
if(!e||e.length<2||128===e[0])this.eof=!0
else{var t,r=this.bufferLength,a=e[0]
if(a<128){if((t=this.ensureBuffer(r+a+1))[r++]=e[1],a>0){var i=this.str.getBytes(a)
t.set(i,r),r+=a}}else{a=257-a
var n=e[1]
t=this.ensureBuffer(r+a+1)
for(var o=0;o<a;o++)t[r++]=n}this.bufferLength=r}},e}()
t.RunLengthStream=m
var p=function(){function e(e,t,r){this.str=e,this.dict=e.dict,this.cachedData=0,this.bitsCached=0
for(var a={earlyChange:r,codeLength:9,nextCode:258,dictionaryValues:new Uint8Array(4096),dictionaryLengths:new Uint16Array(4096),dictionaryPrevCodes:new Uint16Array(4096),currentSequence:new Uint8Array(4096),currentSequenceLength:0},i=0;i<256;++i)a.dictionaryValues[i]=i,a.dictionaryLengths[i]=1
this.lzwState=a,c.call(this,t)}return e.prototype=Object.create(c.prototype),e.prototype.readBits=function(e){for(var t=this.bitsCached,r=this.cachedData;t<e;){var a=this.str.getByte()
if(-1===a)return this.eof=!0,null
r=r<<8|a,t+=8}return this.bitsCached=t-=e,this.cachedData=r,this.lastCode=null,r>>>t&(1<<e)-1},e.prototype.readBlock=function(){var e,t,r,a=1024,i=this.lzwState
if(i){var n=i.earlyChange,o=i.nextCode,s=i.dictionaryValues,c=i.dictionaryLengths,l=i.dictionaryPrevCodes,u=i.codeLength,h=i.prevCode,f=i.currentSequence,d=i.currentSequenceLength,g=0,m=this.bufferLength,p=this.ensureBuffer(this.bufferLength+a)
for(e=0;e<512;e++){var v=this.readBits(u),b=d>0
if(v<256)f[0]=v,d=1
else{if(!(v>=258)){if(256===v){u=9,o=258,d=0
continue}this.eof=!0,delete this.lzwState
break}if(v<o)for(t=(d=c[v])-1,r=v;t>=0;t--)f[t]=s[r],r=l[r]
else f[d++]=f[0]}if(b&&(l[o]=h,c[o]=c[h]+1,s[o]=f[0],u=++o+n&o+n-1?u:0|Math.min(Math.log(o+n)/.6931471805599453+1,12)),h=v,a<(g+=d)){do{a+=512}while(a<g)
p=this.ensureBuffer(this.bufferLength+a)}for(t=0;t<d;t++)p[m++]=f[t]}i.nextCode=o,i.codeLength=u,i.prevCode=h,i.currentSequenceLength=d,this.bufferLength=m}},e}()
t.LZWStream=p
var v=function(){function e(){o.call(this,new Uint8Array(0))}return e.prototype=o.prototype,e}()
t.NullStream=v},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.CCITTFaxStream=void 0
var a=r(155),i=r(159),n=r(157),o=function(){function e(e,t,r){this.str=e,this.dict=e.dict,(0,a.isDict)(r)||(r=a.Dict.empty)
var o={next:function(){return e.getByte()}}
this.ccittFaxDecoder=new i.CCITTFaxDecoder(o,{K:r.get("K"),EndOfLine:r.get("EndOfLine"),EncodedByteAlign:r.get("EncodedByteAlign"),Columns:r.get("Columns"),Rows:r.get("Rows"),EndOfBlock:r.get("EndOfBlock"),BlackIs1:r.get("BlackIs1")}),n.DecodeStream.call(this,t)}return e.prototype=Object.create(n.DecodeStream.prototype),e.prototype.readBlock=function(){for(;!this.eof;){var e=this.ccittFaxDecoder.readNextChar()
if(-1===e)return void(this.eof=!0)
this.ensureBuffer(this.bufferLength+1),this.buffer[this.bufferLength++]=e}},e}()
t.CCITTFaxStream=o},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.CCITTFaxDecoder=void 0
var a=r(6),i=function(){var e=[[-1,-1],[-1,-1],[7,8],[7,7],[6,6],[6,6],[6,5],[6,5],[4,0],[4,0],[4,0],[4,0],[4,0],[4,0],[4,0],[4,0],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[3,3],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2],[1,2]],t=[[-1,-1],[12,-2],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[11,1792],[11,1792],[12,1984],[12,2048],[12,2112],[12,2176],[12,2240],[12,2304],[11,1856],[11,1856],[11,1920],[11,1920],[12,2368],[12,2432],[12,2496],[12,2560]],r=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],[8,29],[8,29],[8,30],[8,30],[8,45],[8,45],[8,46],[8,46],[7,22],[7,22],[7,22],[7,22],[7,23],[7,23],[7,23],[7,23],[8,47],[8,47],[8,48],[8,48],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[6,13],[7,20],[7,20],[7,20],[7,20],[8,33],[8,33],[8,34],[8,34],[8,35],[8,35],[8,36],[8,36],[8,37],[8,37],[8,38],[8,38],[7,19],[7,19],[7,19],[7,19],[8,31],[8,31],[8,32],[8,32],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,1],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[6,12],[8,53],[8,53],[8,54],[8,54],[7,26],[7,26],[7,26],[7,26],[8,39],[8,39],[8,40],[8,40],[8,41],[8,41],[8,42],[8,42],[8,43],[8,43],[8,44],[8,44],[7,21],[7,21],[7,21],[7,21],[7,28],[7,28],[7,28],[7,28],[8,61],[8,61],[8,62],[8,62],[8,63],[8,63],[8,0],[8,0],[8,320],[8,320],[8,384],[8,384],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,10],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[5,11],[7,27],[7,27],[7,27],[7,27],[8,59],[8,59],[8,60],[8,60],[9,1472],[9,1536],[9,1600],[9,1728],[7,18],[7,18],[7,18],[7,18],[7,24],[7,24],[7,24],[7,24],[8,49],[8,49],[8,50],[8,50],[8,51],[8,51],[8,52],[8,52],[7,25],[7,25],[7,25],[7,25],[8,55],[8,55],[8,56],[8,56],[8,57],[8,57],[8,58],[8,58],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,192],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[6,1664],[8,448],[8,448],[8,512],[8,512],[9,704],[9,768],[8,640],[8,640],[8,576],[8,576],[9,832],[9,896],[9,960],[9,1024],[9,1088],[9,1152],[9,1216],[9,1280],[9,1344],[9,1408],[7,256],[7,256],[7,256],[7,256],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,2],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[4,3],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,128],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,8],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[5,9],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,16],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[6,17],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,4],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[4,5],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,14],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[6,15],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[5,64],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,6],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7],[4,7]],i=[[-1,-1],[-1,-1],[12,-2],[12,-2],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[-1,-1],[11,1792],[11,1792],[11,1792],[11,1792],[12,1984],[12,1984],[12,2048],[12,2048],[12,2112],[12,2112],[12,2176],[12,2176],[12,2240],[12,2240],[12,2304],[12,2304],[11,1856],[11,1856],[11,1856],[11,1856],[11,1920],[11,1920],[11,1920],[11,1920],[12,2368],[12,2368],[12,2432],[12,2432],[12,2496],[12,2496],[12,2560],[12,2560],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[10,18],[12,52],[12,52],[13,640],[13,704],[13,768],[13,832],[12,55],[12,55],[12,56],[12,56],[13,1280],[13,1344],[13,1408],[13,1472],[12,59],[12,59],[12,60],[12,60],[13,1536],[13,1600],[11,24],[11,24],[11,24],[11,24],[11,25],[11,25],[11,25],[11,25],[13,1664],[13,1728],[12,320],[12,320],[12,384],[12,384],[12,448],[12,448],[13,512],[13,576],[12,53],[12,53],[12,54],[12,54],[13,896],[13,960],[13,1024],[13,1088],[13,1152],[13,1216],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64],[10,64]],n=[[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[8,13],[11,23],[11,23],[12,50],[12,51],[12,44],[12,45],[12,46],[12,47],[12,57],[12,58],[12,61],[12,256],[10,16],[10,16],[10,16],[10,16],[10,17],[10,17],[10,17],[10,17],[12,48],[12,49],[12,62],[12,63],[12,30],[12,31],[12,32],[12,33],[12,40],[12,41],[11,22],[11,22],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[8,14],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,10],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[7,11],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[9,15],[12,128],[12,192],[12,26],[12,27],[12,28],[12,29],[11,19],[11,19],[11,20],[11,20],[12,34],[12,35],[12,36],[12,37],[12,38],[12,39],[11,21],[11,21],[12,42],[12,43],[10,0],[10,0],[10,0],[10,0],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12],[7,12]],o=[[-1,-1],[-1,-1],[-1,-1],[-1,-1],[6,9],[6,8],[5,7],[5,7],[4,6],[4,6],[4,6],[4,6],[4,5],[4,5],[4,5],[4,5],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,1],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[3,4],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,3],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2],[2,2]]
function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}
if(!e||"function"!=typeof e.next)throw new Error('CCITTFaxDecoder - invalid "source" parameter.')
this.source=e,this.eof=!1,this.encoding=t.K||0,this.eoline=t.EndOfLine||!1,this.byteAlign=t.EncodedByteAlign||!1,this.columns=t.Columns||1728,this.rows=t.Rows||0
var r,a=t.EndOfBlock
for(null==a&&(a=!0),this.eoblock=a,this.black=t.BlackIs1||!1,this.codingLine=new Uint32Array(this.columns+1),this.refLine=new Uint32Array(this.columns+2),this.codingLine[0]=this.columns,this.codingPos=0,this.row=0,this.nextLine2D=this.encoding<0,this.inputBits=0,this.inputBuf=0,this.outputBits=0,this.rowsDone=!1;0===(r=this._lookBits(12));)this._eatBits(1)
1===r&&this._eatBits(12),this.encoding>0&&(this.nextLine2D=!this._lookBits(1),this._eatBits(1))}return s.prototype={readNextChar:function(){if(this.eof)return-1
var e,t,r,i,n,o=this.refLine,s=this.codingLine,c=this.columns
if(0===this.outputBits){if(this.rowsDone&&(this.eof=!0),this.eof)return-1
var l,u,h
if(this.err=!1,this.nextLine2D){for(i=0;s[i]<c;++i)o[i]=s[i]
for(o[i++]=c,o[i]=c,s[0]=0,this.codingPos=0,e=0,t=0;s[this.codingPos]<c;)switch(l=this._getTwoDimCode()){case 0:this._addPixels(o[e+1],t),o[e+1]<c&&(e+=2)
break
case 1:if(l=u=0,t){do{l+=h=this._getBlackCode()}while(h>=64)
do{u+=h=this._getWhiteCode()}while(h>=64)}else{do{l+=h=this._getWhiteCode()}while(h>=64)
do{u+=h=this._getBlackCode()}while(h>=64)}for(this._addPixels(s[this.codingPos]+l,t),s[this.codingPos]<c&&this._addPixels(s[this.codingPos]+u,1^t);o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 7:if(this._addPixels(o[e]+3,t),t^=1,s[this.codingPos]<c)for(++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 5:if(this._addPixels(o[e]+2,t),t^=1,s[this.codingPos]<c)for(++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 3:if(this._addPixels(o[e]+1,t),t^=1,s[this.codingPos]<c)for(++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 2:if(this._addPixels(o[e],t),t^=1,s[this.codingPos]<c)for(++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 8:if(this._addPixelsNeg(o[e]-3,t),t^=1,s[this.codingPos]<c)for(e>0?--e:++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 6:if(this._addPixelsNeg(o[e]-2,t),t^=1,s[this.codingPos]<c)for(e>0?--e:++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case 4:if(this._addPixelsNeg(o[e]-1,t),t^=1,s[this.codingPos]<c)for(e>0?--e:++e;o[e]<=s[this.codingPos]&&o[e]<c;)e+=2
break
case-1:this._addPixels(c,0),this.eof=!0
break
default:(0,a.info)("bad 2d code"),this._addPixels(c,0),this.err=!0}}else for(s[0]=0,this.codingPos=0,t=0;s[this.codingPos]<c;){if(l=0,t)do{l+=h=this._getBlackCode()}while(h>=64)
else do{l+=h=this._getWhiteCode()}while(h>=64)
this._addPixels(s[this.codingPos]+l,t),t^=1}var f=!1
if(this.byteAlign&&(this.inputBits&=-8),this.eoblock||this.row!==this.rows-1){if(l=this._lookBits(12),this.eoline)for(;-1!==l&&1!==l;)this._eatBits(1),l=this._lookBits(12)
else for(;0===l;)this._eatBits(1),l=this._lookBits(12)
1===l?(this._eatBits(12),f=!0):-1===l&&(this.eof=!0)}else this.rowsDone=!0
if(!this.eof&&this.encoding>0&&!this.rowsDone&&(this.nextLine2D=!this._lookBits(1),this._eatBits(1)),this.eoblock&&f&&this.byteAlign){if(1===(l=this._lookBits(12))){if(this._eatBits(12),this.encoding>0&&(this._lookBits(1),this._eatBits(1)),this.encoding>=0)for(i=0;i<4;++i)1!==(l=this._lookBits(12))&&(0,a.info)("bad rtc code: "+l),this._eatBits(12),this.encoding>0&&(this._lookBits(1),this._eatBits(1))
this.eof=!0}}else if(this.err&&this.eoline){for(;;){if(-1===(l=this._lookBits(13)))return this.eof=!0,-1
if(l>>1==1)break
this._eatBits(1)}this._eatBits(12),this.encoding>0&&(this._eatBits(1),this.nextLine2D=!(1&l))}s[0]>0?this.outputBits=s[this.codingPos=0]:this.outputBits=s[this.codingPos=1],this.row++}if(this.outputBits>=8)n=1&this.codingPos?0:255,this.outputBits-=8,0===this.outputBits&&s[this.codingPos]<c&&(this.codingPos++,this.outputBits=s[this.codingPos]-s[this.codingPos-1])
else{r=8,n=0
do{this.outputBits>r?(n<<=r,1&this.codingPos||(n|=255>>8-r),this.outputBits-=r,r=0):(n<<=this.outputBits,1&this.codingPos||(n|=255>>8-this.outputBits),r-=this.outputBits,this.outputBits=0,s[this.codingPos]<c?(this.codingPos++,this.outputBits=s[this.codingPos]-s[this.codingPos-1]):r>0&&(n<<=r,r=0))}while(r)}return this.black&&(n^=255),n},_addPixels:function(e,t){var r=this.codingLine,i=this.codingPos
e>r[i]&&(e>this.columns&&((0,a.info)("row is wrong length"),this.err=!0,e=this.columns),1&i^t&&++i,r[i]=e),this.codingPos=i},_addPixelsNeg:function(e,t){var r=this.codingLine,i=this.codingPos
if(e>r[i])e>this.columns&&((0,a.info)("row is wrong length"),this.err=!0,e=this.columns),1&i^t&&++i,r[i]=e
else if(e<r[i]){for(e<0&&((0,a.info)("invalid code"),this.err=!0,e=0);i>0&&e<r[i-1];)--i
r[i]=e}this.codingPos=i},_findTableCode:function(e,t,r,a){for(var i=a||0,n=e;n<=t;++n){var o=this._lookBits(n)
if(-1===o)return[!0,1,!1]
if(n<t&&(o<<=t-n),!i||o>=i){var s=r[o-i]
if(s[0]===n)return this._eatBits(n),[!0,s[1],!0]}}return[!1,0,!1]},_getTwoDimCode:function(){var t,r=0
if(this.eoblock){if(r=this._lookBits(7),(t=e[r])&&t[0]>0)return this._eatBits(t[0]),t[1]}else{var i=this._findTableCode(1,7,e)
if(i[0]&&i[2])return i[1]}return(0,a.info)("Bad two dim code"),-1},_getWhiteCode:function(){var e,i=0
if(this.eoblock){if(-1===(i=this._lookBits(12)))return 1
if((e=i>>5==0?t[i]:r[i>>3])[0]>0)return this._eatBits(e[0]),e[1]}else{var n=this._findTableCode(1,9,r)
if(n[0])return n[1]
if((n=this._findTableCode(11,12,t))[0])return n[1]}return(0,a.info)("bad white code"),this._eatBits(1),1},_getBlackCode:function(){var e,t
if(this.eoblock){if(-1===(e=this._lookBits(13)))return 1
if((t=e>>7==0?i[e]:e>>9==0&&e>>7!=0?n[(e>>1)-64]:o[e>>7])[0]>0)return this._eatBits(t[0]),t[1]}else{var r=this._findTableCode(2,6,o)
if(r[0])return r[1]
if((r=this._findTableCode(7,12,n,64))[0])return r[1]
if((r=this._findTableCode(10,13,i))[0])return r[1]}return(0,a.info)("bad black code"),this._eatBits(1),1},_lookBits:function(e){for(var t;this.inputBits<e;){if(-1===(t=this.source.next()))return 0===this.inputBits?-1:this.inputBuf<<e-this.inputBits&65535>>16-e
this.inputBuf=this.inputBuf<<8|t,this.inputBits+=8}return this.inputBuf>>this.inputBits-e&65535>>16-e},_eatBits:function(e){(this.inputBits-=e)<0&&(this.inputBits=0)}},s}()
t.CCITTFaxDecoder=i},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Jbig2Stream=void 0
var a=r(155),i=r(157),n=r(161),o=r(6),s=function(){function e(e,t,r,a){this.stream=e,this.maybeLength=t,this.dict=r,this.params=a,i.DecodeStream.call(this,t)}return e.prototype=Object.create(i.DecodeStream.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return(0,o.shadow)(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){},e.prototype.readBlock=function(){if(!this.eof){var e=new n.Jbig2Image,t=[]
if((0,a.isDict)(this.params)){var r=this.params.get("JBIG2Globals")
if((0,a.isStream)(r)){var i=r.getBytes()
t.push({data:i,start:0,end:i.length})}}t.push({data:this.bytes,start:0,end:this.bytes.length})
for(var o=e.parseChunks(t),s=o.length,c=0;c<s;c++)o[c]^=255
this.buffer=o,this.bufferLength=s,this.eof=!0}},e}()
t.Jbig2Stream=s},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Jbig2Image=void 0
var a=r(6),i=r(162),n=r(159),o=function(){function e(e){this.message="JBIG2 error: "+e}return e.prototype=new Error,e.prototype.name="Jbig2Error",e.constructor=e,e}(),s=function(){function e(){}function t(e,t,r){this.data=e,this.start=t,this.end=r}function r(e,t,r){var a=e.getContexts(t),i=1
function n(e){for(var t=0,n=0;n<e;n++){var o=r.readBit(a,i)
i=i<256?i<<1|o:511&(i<<1|o)|256,t=t<<1|o}return t>>>0}var o=n(1),s=n(1)?n(1)?n(1)?n(1)?n(1)?n(32)+4436:n(12)+340:n(8)+84:n(6)+20:n(4)+4:n(2)
return 0===o?s:s>0?-s:null}function s(e,t,r){for(var a=e.getContexts("IAID"),i=1,n=0;n<r;n++)i=i<<1|t.readBit(a,i)
return r<31?i&(1<<r)-1:2147483647&i}e.prototype={getContexts:function(e){return e in this?this[e]:this[e]=new Int8Array(65536)}},t.prototype={get decoder(){var e=new i.ArithmeticDecoder(this.data,this.start,this.end)
return(0,a.shadow)(this,"decoder",e)},get contextCache(){var t=new e
return(0,a.shadow)(this,"contextCache",t)}}
var c=["SymbolDictionary",null,null,null,"IntermediateTextRegion",null,"ImmediateTextRegion","ImmediateLosslessTextRegion",null,null,null,null,null,null,null,null,"PatternDictionary",null,null,null,"IntermediateHalftoneRegion",null,"ImmediateHalftoneRegion","ImmediateLosslessHalftoneRegion",null,null,null,null,null,null,null,null,null,null,null,null,"IntermediateGenericRegion",null,"ImmediateGenericRegion","ImmediateLosslessGenericRegion","IntermediateGenericRefinementRegion",null,"ImmediateGenericRefinementRegion","ImmediateLosslessGenericRefinementRegion",null,null,null,null,"PageInformation","EndOfPage","EndOfStripe","EndOfFile","Profiles","Tables",null,null,null,null,null,null,null,null,"Extension"],l=[[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:2,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:2,y:-1},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}],[{x:-1,y:-2},{x:0,y:-2},{x:1,y:-2},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-2,y:0},{x:-1,y:0}],[{x:-3,y:-1},{x:-2,y:-1},{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-4,y:0},{x:-3,y:0},{x:-2,y:0},{x:-1,y:0}]],u=[{coding:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:1,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1}]},{coding:[{x:-1,y:-1},{x:0,y:-1},{x:1,y:-1},{x:-1,y:0}],reference:[{x:0,y:-1},{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}]}],h=[39717,1941,229,405],f=[32,8]
function d(e,t,r,a,i,n,o,s){if(e)return T(new I(s.data,s.start,s.end),t,r,!1)
if(0===a&&!n&&!i&&4===o.length&&3===o[0].x&&-1===o[0].y&&-3===o[1].x&&-1===o[1].y&&2===o[2].x&&-2===o[2].y&&-2===o[3].x&&-2===o[3].y)return function(e,t,r){var a,i,n,o,s,c,l,u=r.decoder,h=r.contextCache.getContexts("GB"),f=[]
for(i=0;i<t;i++)for(s=f[i]=new Uint8Array(e),c=i<1?s:f[i-1],a=(l=i<2?s:f[i-2])[0]<<13|l[1]<<12|l[2]<<11|c[0]<<7|c[1]<<6|c[2]<<5|c[3]<<4,n=0;n<e;n++)s[n]=o=u.readBit(h,a),a=(31735&a)<<1|(n+3<e?l[n+3]<<11:0)|(n+4<e?c[n+4]<<4:0)|o
return f}(t,r,s)
var c=!!n,u=l[a].concat(o)
u.sort(function(e,t){return e.y-t.y||e.x-t.x})
var f,d,g=u.length,m=new Int8Array(g),p=new Int8Array(g),v=[],b=0,y=0,w=0,k=0
for(d=0;d<g;d++)m[d]=u[d].x,p[d]=u[d].y,y=Math.min(y,u[d].x),w=Math.max(w,u[d].x),k=Math.min(k,u[d].y),d<g-1&&u[d].y===u[d+1].y&&u[d].x===u[d+1].x-1?b|=1<<g-1-d:v.push(d)
var S=v.length,C=new Int8Array(S),x=new Int8Array(S),A=new Uint16Array(S)
for(f=0;f<S;f++)d=v[f],C[f]=u[d].x,x[f]=u[d].y,A[f]=1<<g-1-d
for(var _,P,O,E,F,R=-y,B=-k,D=t-w,M=h[a],L=new Uint8Array(t),N=[],U=s.decoder,q=s.contextCache.getContexts("GB"),j=0,z=0,H=0;H<r;H++)if(i&&(j^=U.readBit(q,M)))N.push(L)
else for(L=new Uint8Array(L),N.push(L),_=0;_<t;_++)if(c&&n[H][_])L[_]=0
else{if(_>=R&&_<D&&H>=B)for(z=z<<1&b,d=0;d<S;d++)P=H+x[d],O=_+C[d],(E=N[P][O])&&(z|=E=A[d])
else for(z=0,F=g-1,d=0;d<g;d++,F--)(O=_+m[d])>=0&&O<t&&(P=H+p[d])>=0&&(E=N[P][O])&&(z|=E<<F)
var W=U.readBit(q,z)
L[_]=W}return N}function g(e,t,r,a,i,n,s,c,l){var h=u[r].coding
0===r&&(h=h.concat([c[0]]))
var d,g=h.length,m=new Int32Array(g),p=new Int32Array(g)
for(d=0;d<g;d++)m[d]=h[d].x,p[d]=h[d].y
var v=u[r].reference
0===r&&(v=v.concat([c[1]]))
var b=v.length,y=new Int32Array(b),w=new Int32Array(b)
for(d=0;d<b;d++)y[d]=v[d].x,w[d]=v[d].y
for(var k=a[0].length,S=a.length,C=f[r],x=[],A=l.decoder,_=l.contextCache.getContexts("GR"),P=0,I=0;I<t;I++){if(s&&(P^=A.readBit(_,C)))throw new o("prediction is not supported")
var O=new Uint8Array(e)
x.push(O)
for(var E=0;E<e;E++){var T,F,R=0
for(d=0;d<g;d++)T=I+p[d],F=E+m[d],T<0||F<0||F>=e?R<<=1:R=R<<1|x[T][F]
for(d=0;d<b;d++)T=I+w[d]-n,F=E+y[d]-i,T<0||T>=S||F<0||F>=k?R<<=1:R=R<<1|a[T][F]
var B=A.readBit(_,R)
O[E]=B}}return x}function m(e,t,a,i,n,c,l,u,h,f,d,m,p,v,b,y,w,k,S){if(e&&t)throw new o("refinement with Huffman is not supported")
var C,x,A=[]
for(C=0;C<i;C++){if(x=new Uint8Array(a),n)for(var _=0;_<a;_++)x[_]=n
A.push(x)}var P=w.decoder,I=w.contextCache,O=e?-v.tableDeltaT.decode(S):-r(I,"IADT",P),E=0
for(C=0;C<c;){O+=e?v.tableDeltaT.decode(S):r(I,"IADT",P)
for(var T=E+=e?v.tableFirstS.decode(S):r(I,"IAFS",P);;){var F=0
l>1&&(F=e?S.readBits(k):r(I,"IAIT",P))
var R=l*O+F,B=e?v.symbolIDTable.decode(S):s(I,P,h),D=t&&(e?S.readBit():r(I,"IARI",P)),M=u[B],L=M[0].length,N=M.length
if(D){var U=r(I,"IARDW",P),q=r(I,"IARDH",P)
M=g(L+=U,N+=q,b,M,(U>>1)+r(I,"IARDX",P),(q>>1)+r(I,"IARDY",P),!1,y,w)}var j,z,H,W=R-(1&m?0:N-1),G=T-(2&m?L-1:0)
if(f){for(j=0;j<N;j++)if(x=A[G+j]){H=M[j]
var X=Math.min(a-W,L)
switch(p){case 0:for(z=0;z<X;z++)x[W+z]|=H[z]
break
case 2:for(z=0;z<X;z++)x[W+z]^=H[z]
break
default:throw new o("operator ".concat(p," is not supported"))}}T+=N-1}else{for(z=0;z<N;z++)if(x=A[W+z])switch(H=M[z],p){case 0:for(j=0;j<L;j++)x[G+j]|=H[j]
break
case 2:for(j=0;j<L;j++)x[G+j]^=H[j]
break
default:throw new o("operator ".concat(p," is not supported"))}T+=L-1}C++
var V=e?v.tableDeltaS.decode(S):r(I,"IADS",P)
if(null===V)break
T+=V+d}}return A}function p(e,t){var r={}
r.number=(0,a.readUint32)(e,t)
var i=e[t+4],n=63&i
if(!c[n])throw new o("invalid segment type: "+n)
r.type=n,r.typeName=c[n],r.deferredNonRetain=!!(128&i)
var s=!!(64&i),l=e[t+5],u=l>>5&7,h=[31&l],f=t+6
if(7===l){u=536870911&(0,a.readUint32)(e,f-1),f+=3
var d=u+7>>3
for(h[0]=e[f++];--d>0;)h.push(e[f++])}else if(5===l||6===l)throw new o("invalid referred-to flags")
r.retainBits=h
var g,m,p=r.number<=256?1:r.number<=65536?2:4,v=[]
for(g=0;g<u;g++){var w=1===p?e[f]:2===p?(0,a.readUint16)(e,f):(0,a.readUint32)(e,f)
v.push(w),f+=p}if(r.referredTo=v,s?(r.pageAssociation=(0,a.readUint32)(e,f),f+=4):r.pageAssociation=e[f++],r.length=(0,a.readUint32)(e,f),f+=4,4294967295===r.length){if(38!==n)throw new o("invalid unknown segment length")
var k=b(e,f),S=!!(1&e[f+y]),C=new Uint8Array(6)
for(S||(C[0]=255,C[1]=172),C[2]=k.height>>>24&255,C[3]=k.height>>16&255,C[4]=k.height>>8&255,C[5]=255&k.height,g=f,m=e.length;g<m;g++){for(var x=0;x<6&&C[x]===e[g+x];)x++
if(6===x){r.length=g+6
break}}if(4294967295===r.length)throw new o("segment end was not found")}return r.headerEnd=f,r}function v(e,t,r,a){for(var i=[],n=r;n<a;){var o=p(t,n)
n=o.headerEnd
var s={header:o,data:t}
if(e.randomAccess||(s.start=n,n+=o.length,s.end=n),i.push(s),51===o.type)break}if(e.randomAccess)for(var c=0,l=i.length;c<l;c++)i[c].start=n,n+=i[c].header.length,i[c].end=n
return i}function b(e,t){return{width:(0,a.readUint32)(e,t),height:(0,a.readUint32)(e,t+4),x:(0,a.readUint32)(e,t+8),y:(0,a.readUint32)(e,t+12),combinationOperator:7&e[t+16]}}var y=17
function w(e,t){var r,i,n,s,c=e.header,l=e.data,u=e.start,h=e.end
switch(c.type){case 0:var f={},d=(0,a.readUint16)(l,u)
if(f.huffman=!!(1&d),f.refinement=!!(2&d),f.huffmanDHSelector=d>>2&3,f.huffmanDWSelector=d>>4&3,f.bitmapSizeSelector=d>>6&1,f.aggregationInstancesSelector=d>>7&1,f.bitmapCodingContextUsed=!!(256&d),f.bitmapCodingContextRetained=!!(512&d),f.template=d>>10&3,f.refinementTemplate=d>>12&1,u+=2,!f.huffman){for(s=0===f.template?4:1,i=[],n=0;n<s;n++)i.push({x:(0,a.readInt8)(l,u),y:(0,a.readInt8)(l,u+1)}),u+=2
f.at=i}if(f.refinement&&!f.refinementTemplate){for(i=[],n=0;n<2;n++)i.push({x:(0,a.readInt8)(l,u),y:(0,a.readInt8)(l,u+1)}),u+=2
f.refinementAt=i}f.numberOfExportedSymbols=(0,a.readUint32)(l,u),u+=4,f.numberOfNewSymbols=(0,a.readUint32)(l,u),u+=4,r=[f,c.number,c.referredTo,l,u,h]
break
case 6:case 7:var g={}
g.info=b(l,u),u+=y
var m=(0,a.readUint16)(l,u)
if(u+=2,g.huffman=!!(1&m),g.refinement=!!(2&m),g.logStripSize=m>>2&3,g.stripSize=1<<g.logStripSize,g.referenceCorner=m>>4&3,g.transposed=!!(64&m),g.combinationOperator=m>>7&3,g.defaultPixelValue=m>>9&1,g.dsOffset=m<<17>>27,g.refinementTemplate=m>>15&1,g.huffman){var p=(0,a.readUint16)(l,u)
u+=2,g.huffmanFS=3&p,g.huffmanDS=p>>2&3,g.huffmanDT=p>>4&3,g.huffmanRefinementDW=p>>6&3,g.huffmanRefinementDH=p>>8&3,g.huffmanRefinementDX=p>>10&3,g.huffmanRefinementDY=p>>12&3,g.huffmanRefinementSizeSelector=!!(16384&p)}if(g.refinement&&!g.refinementTemplate){for(i=[],n=0;n<2;n++)i.push({x:(0,a.readInt8)(l,u),y:(0,a.readInt8)(l,u+1)}),u+=2
g.refinementAt=i}g.numberOfSymbolInstances=(0,a.readUint32)(l,u),u+=4,r=[g,c.referredTo,l,u,h]
break
case 16:var v={},w=l[u++]
v.mmr=!!(1&w),v.template=w>>1&3,v.patternWidth=l[u++],v.patternHeight=l[u++],v.maxPatternIndex=(0,a.readUint32)(l,u),u+=4,r=[v,c.number,l,u,h]
break
case 22:case 23:var k={}
k.info=b(l,u),u+=y
var S=l[u++]
k.mmr=!!(1&S),k.template=S>>1&3,k.enableSkip=!!(8&S),k.combinationOperator=S>>4&7,k.defaultPixelValue=S>>7&1,k.gridWidth=(0,a.readUint32)(l,u),u+=4,k.gridHeight=(0,a.readUint32)(l,u),u+=4,k.gridOffsetX=4294967295&(0,a.readUint32)(l,u),u+=4,k.gridOffsetY=4294967295&(0,a.readUint32)(l,u),u+=4,k.gridVectorX=(0,a.readUint16)(l,u),u+=2,k.gridVectorY=(0,a.readUint16)(l,u),u+=2,r=[k,c.referredTo,l,u,h]
break
case 38:case 39:var C={}
C.info=b(l,u),u+=y
var x=l[u++]
if(C.mmr=!!(1&x),C.template=x>>1&3,C.prediction=!!(8&x),!C.mmr){for(s=0===C.template?4:1,i=[],n=0;n<s;n++)i.push({x:(0,a.readInt8)(l,u),y:(0,a.readInt8)(l,u+1)}),u+=2
C.at=i}r=[C,l,u,h]
break
case 48:var A={width:(0,a.readUint32)(l,u),height:(0,a.readUint32)(l,u+4),resolutionX:(0,a.readUint32)(l,u+8),resolutionY:(0,a.readUint32)(l,u+12)}
4294967295===A.height&&delete A.height
var _=l[u+16];(0,a.readUint16)(l,u+17),A.lossless=!!(1&_),A.refinement=!!(2&_),A.defaultPixelValue=_>>2&1,A.combinationOperator=_>>3&3,A.requiresBuffer=!!(32&_),A.combinationOperatorOverride=!!(64&_),r=[A]
break
case 49:case 50:case 51:break
case 53:r=[c.number,l,u,h]
break
case 62:break
default:throw new o("segment type ".concat(c.typeName,"(").concat(c.type,")")+" is not implemented")}var P="on"+c.typeName
P in t&&t[P].apply(t,r)}function k(e,t){for(var r=0,a=e.length;r<a;r++)w(e[r],t)}function S(){}function C(e){2===e.length?(this.isOOB=!0,this.rangeLow=0,this.prefixLength=e[0],this.rangeLength=0,this.prefixCode=e[1],this.isLowerRange=!1):(this.isOOB=!1,this.rangeLow=e[0],this.prefixLength=e[1],this.rangeLength=e[2],this.prefixCode=e[3],this.isLowerRange="lower"===e[4])}function x(e){this.children=[],e?(this.isLeaf=!0,this.rangeLength=e.rangeLength,this.rangeLow=e.rangeLow,this.isLowerRange=e.isLowerRange,this.isOOB=e.isOOB):this.isLeaf=!1}function A(e,t){t||this.assignPrefixCodes(e),this.rootNode=new x(null)
var r,a,i=e.length
for(r=0;r<i;r++)(a=e[r]).prefixLength>0&&this.rootNode.buildTree(a,a.prefixLength-1)}S.prototype={onPageInformation:function(e){this.currentPageInfo=e
var t=e.width+7>>3,r=new Uint8ClampedArray(t*e.height)
if(e.defaultPixelValue)for(var a=0,i=r.length;a<i;a++)r[a]=255
this.buffer=r},drawBitmap:function(e,t){var r,a,i,n,s=this.currentPageInfo,c=e.width,l=e.height,u=s.width+7>>3,h=s.combinationOperatorOverride?e.combinationOperator:s.combinationOperator,f=this.buffer,d=128>>(7&e.x),g=e.y*u+(e.x>>3)
switch(h){case 0:for(r=0;r<l;r++){for(i=d,n=g,a=0;a<c;a++)t[r][a]&&(f[n]|=i),(i>>=1)||(i=128,n++)
g+=u}break
case 2:for(r=0;r<l;r++){for(i=d,n=g,a=0;a<c;a++)t[r][a]&&(f[n]^=i),(i>>=1)||(i=128,n++)
g+=u}break
default:throw new o("operator ".concat(h," is not supported"))}},onImmediateGenericRegion:function(e,r,a,i){var n=e.info,o=new t(r,a,i),s=d(e.mmr,n.width,n.height,e.template,e.prediction,null,e.at,o)
this.drawBitmap(n,s)},onImmediateLosslessGenericRegion:function(){this.onImmediateGenericRegion.apply(this,arguments)},onSymbolDictionary:function(e,i,n,c,l,u){var h,f
e.huffman&&(h=function(e,t,r){var a,i,n,s=0
switch(e.huffmanDHSelector){case 0:case 1:a=P(e.huffmanDHSelector+4)
break
case 3:a=O(s,t,r),s++
break
default:throw new o("invalid Huffman DH selector")}switch(e.huffmanDWSelector){case 0:case 1:i=P(e.huffmanDWSelector+2)
break
case 3:i=O(s,t,r),s++
break
default:throw new o("invalid Huffman DW selector")}return e.bitmapSizeSelector?(n=O(s,t,r),s++):n=P(1),{tableDeltaHeight:a,tableDeltaWidth:i,tableBitmapSize:n,tableAggregateInstances:e.aggregationInstancesSelector?O(s,t,r):P(1)}}(e,n,this.customTables),f=new I(c,l,u))
var p=this.symbols
p||(this.symbols=p={})
for(var v=[],b=0,y=n.length;b<y;b++){var w=p[n[b]]
w&&(v=v.concat(w))}var k=new t(c,l,u)
p[i]=function(e,t,i,n,c,l,u,h,f,p,v,b){if(e&&t)throw new o("symbol refinement with Huffman is not supported")
var y,w,k=[],S=0,C=(0,a.log2)(i.length+n),x=v.decoder,A=v.contextCache
for(e&&(y=P(1),w=[],C=Math.max(C,1));k.length<n;){S+=e?l.tableDeltaHeight.decode(b):r(A,"IADH",x)
for(var _=0,I=0,O=e?w.length:0;;){var F,R=e?l.tableDeltaWidth.decode(b):r(A,"IADW",x)
if(null===R)break
if(I+=_+=R,t){var B=r(A,"IAAI",x)
if(B>1)F=m(e,t,_,S,0,B,1,i.concat(k),C,0,0,1,0,l,f,p,v,0,b)
else{var D=s(A,x,C),M=r(A,"IARDX",x),L=r(A,"IARDY",x)
F=g(_,S,f,D<i.length?i[D]:k[D-i.length],M,L,!1,p,v)}k.push(F)}else e?w.push(_):(F=d(!1,_,S,u,!1,null,h,v),k.push(F))}if(e&&!t){var N=l.tableBitmapSize.decode(b)
b.byteAlign()
var U=void 0
if(0===N)U=E(b,I,S)
else{var q=b.end,j=b.position+N
b.end=j,U=T(b,I,S,!1),b.end=q,b.position=j}var z=w.length
if(O===z-1)k.push(U)
else{var H=void 0,W=void 0,G=0,X=void 0,V=void 0
for(H=O;H<z;H++){for(X=G+w[H],V=[],W=0;W<S;W++)V.push(U[W].subarray(G,X))
k.push(V),G=X}}}}for(var K=[],Y=[],J=!1,Z=i.length+n;Y.length<Z;){for(var Q=e?y.decode(b):r(A,"IAEX",x);Q--;)Y.push(J)
J=!J}for(var $=0,ee=i.length;$<ee;$++)Y[$]&&K.push(i[$])
for(var te=0;te<n;$++,te++)Y[$]&&K.push(k[te])
return K}(e.huffman,e.refinement,v,e.numberOfNewSymbols,e.numberOfExportedSymbols,h,e.template,e.at,e.refinementTemplate,e.refinementAt,k,f)},onImmediateTextRegion:function(e,r,i,n,s){for(var c,l,u=e.info,h=this.symbols,f=[],d=0,g=r.length;d<g;d++){var p=h[r[d]]
p&&(f=f.concat(p))}var v=(0,a.log2)(f.length)
e.huffman&&(l=new I(i,n,s),c=function(e,t,r,a,i){var n,s,c=[]
for(n=0;n<=34;n++)s=i.readBits(4),c.push(new C([n,s,0,0]))
var l=new A(c,!1)
for(c.length=0,n=0;n<a;)if((s=l.decode(i))>=32){var u=void 0,h=void 0,f=void 0
switch(s){case 32:if(0===n)throw new o("no previous value in symbol ID table")
h=i.readBits(2)+3,u=c[n-1].prefixLength
break
case 33:h=i.readBits(3)+3,u=0
break
case 34:h=i.readBits(7)+11,u=0
break
default:throw new o("invalid code length in symbol ID table")}for(f=0;f<h;f++)c.push(new C([n,u,0,0])),n++}else c.push(new C([n,s,0,0])),n++
i.byteAlign()
var d,g,m,p=new A(c,!1),v=0
switch(e.huffmanFS){case 0:case 1:d=P(e.huffmanFS+6)
break
case 3:d=O(v,t,r),v++
break
default:throw new o("invalid Huffman FS selector")}switch(e.huffmanDS){case 0:case 1:case 2:g=P(e.huffmanDS+8)
break
case 3:g=O(v,t,r),v++
break
default:throw new o("invalid Huffman DS selector")}switch(e.huffmanDT){case 0:case 1:case 2:m=P(e.huffmanDT+11)
break
case 3:m=O(v,t,r),v++
break
default:throw new o("invalid Huffman DT selector")}if(e.refinement)throw new o("refinement with Huffman is not supported")
return{symbolIDTable:p,tableFirstS:d,tableDeltaS:g,tableDeltaT:m}}(e,r,this.customTables,f.length,l))
var b=new t(i,n,s),y=m(e.huffman,e.refinement,u.width,u.height,e.defaultPixelValue,e.numberOfSymbolInstances,e.stripSize,f,v,e.transposed,e.dsOffset,e.referenceCorner,e.combinationOperator,c,e.refinementTemplate,e.refinementAt,b,e.logStripSize,l)
this.drawBitmap(u,y)},onImmediateLosslessTextRegion:function(){this.onImmediateTextRegion.apply(this,arguments)},onPatternDictionary:function(e,r,a,i,n){var o=this.patterns
o||(this.patterns=o={})
var s=new t(a,i,n)
o[r]=function(e,t,r,a,i,n){var o=[]
e||(o.push({x:-t,y:0}),0===i&&(o.push({x:-3,y:-1}),o.push({x:2,y:-2}),o.push({x:-2,y:-2})))
for(var s,c,l,u,h=d(e,(a+1)*t,r,i,!1,null,o,n),f=[],g=0;g<=a;){for(s=[],l=(c=t*g)+t,u=0;u<r;u++)s.push(h[u].subarray(c,l))
f.push(s),g++}return f}(e.mmr,e.patternWidth,e.patternHeight,e.maxPatternIndex,e.template,s)},onImmediateHalftoneRegion:function(e,r,i,n,s){var c=this.patterns[r[0]],l=e.info,u=new t(i,n,s),h=function(e,t,r,i,n,s,c,l,u,h,f,g,m,p,v){if(c)throw new o("skip is not supported")
if(0!==l)throw new o("operator "+l+" is not supported in halftone region")
var b,y,w,k=[]
for(b=0;b<n;b++){if(w=new Uint8Array(i),s)for(y=0;y<i;y++)w[y]=s
k.push(w)}var S=t.length,C=t[0],x=C[0].length,A=C.length,_=(0,a.log2)(S),P=[]
e||(P.push({x:r<=1?3:2,y:-1}),0===r&&(P.push({x:-3,y:-1}),P.push({x:2,y:-2}),P.push({x:-2,y:-2})))
var O,E,F,R,B,D,M,L,N,U,q,j=[]
for(e&&(O=new I(v.data,v.start,v.end)),b=_-1;b>=0;b--)E=e?T(O,u,h,!0):d(!1,u,h,r,!1,null,P,v),j[b]=E
for(F=0;F<h;F++)for(R=0;R<u;R++){for(B=0,D=0,y=_-1;y>=0;y--)D|=(B=j[y][F][R]^B)<<y
if(M=t[D],N=g+F*m-R*p>>8,(L=f+F*p+R*m>>8)>=0&&L+x<=i&&N>=0&&N+A<=n)for(b=0;b<A;b++)for(q=k[N+b],U=M[b],y=0;y<x;y++)q[L+y]|=U[y]
else{var z=void 0,H=void 0
for(b=0;b<A;b++)if(!((H=N+b)<0||H>=n))for(q=k[H],U=M[b],y=0;y<x;y++)(z=L+y)>=0&&z<i&&(q[z]|=U[y])}}return k}(e.mmr,c,e.template,l.width,l.height,e.defaultPixelValue,e.enableSkip,e.combinationOperator,e.gridWidth,e.gridHeight,e.gridOffsetX,e.gridOffsetY,e.gridVectorX,e.gridVectorY,u)
this.drawBitmap(l,h)},onImmediateLosslessHalftoneRegion:function(){this.onImmediateHalftoneRegion.apply(this,arguments)},onTables:function(e,t,r,i){var n=this.customTables
n||(this.customTables=n={}),n[e]=function(e,t,r){var i,n,o=e[t],s=4294967295&(0,a.readUint32)(e,t+1),c=4294967295&(0,a.readUint32)(e,t+5),l=new I(e,t+9,r),u=1+(o>>1&7),h=1+(o>>4&7),f=[],d=s
do{i=l.readBits(u),n=l.readBits(h),f.push(new C([d,i,n,0])),d+=1<<n}while(d<c)
return i=l.readBits(u),f.push(new C([s-1,i,32,0,"lower"])),i=l.readBits(u),f.push(new C([c,i,32,0])),1&o&&(i=l.readBits(u),f.push(new C([i,0]))),new A(f,!1)}(t,r,i)}},x.prototype={buildTree:function(e,t){var r=e.prefixCode>>t&1
if(t<=0)this.children[r]=new x(e)
else{var a=this.children[r]
a||(this.children[r]=a=new x(null)),a.buildTree(e,t-1)}},decodeNode:function(e){if(this.isLeaf){if(this.isOOB)return null
var t=e.readBits(this.rangeLength)
return this.rangeLow+(this.isLowerRange?-t:t)}var r=this.children[e.readBit()]
if(!r)throw new o("invalid Huffman data")
return r.decodeNode(e)}},A.prototype={decode:function(e){return this.rootNode.decodeNode(e)},assignPrefixCodes:function(e){var t,r=e.length,a=0
for(t=0;t<r;t++)a=Math.max(a,e[t].prefixLength)
var i=new Uint32Array(a+1)
for(t=0;t<r;t++)i[e[t].prefixLength]++
var n,o,s,c=1,l=0
for(i[0]=0;c<=a;){for(n=l=l+i[c-1]<<1,o=0;o<r;)(s=e[o]).prefixLength===c&&(s.prefixCode=n,n++),o++
c++}}}
var _={}
function P(e){var t,r=_[e]
if(r)return r
switch(e){case 1:t=[[0,1,4,0],[16,2,8,2],[272,3,16,6],[65808,3,32,7]]
break
case 2:t=[[0,1,0,0],[1,2,0,2],[2,3,0,6],[3,4,3,14],[11,5,6,30],[75,6,32,62],[6,63]]
break
case 3:t=[[-256,8,8,254],[0,1,0,0],[1,2,0,2],[2,3,0,6],[3,4,3,14],[11,5,6,30],[-257,8,32,255,"lower"],[75,7,32,126],[6,62]]
break
case 4:t=[[1,1,0,0],[2,2,0,2],[3,3,0,6],[4,4,3,14],[12,5,6,30],[76,5,32,31]]
break
case 5:t=[[-255,7,8,126],[1,1,0,0],[2,2,0,2],[3,3,0,6],[4,4,3,14],[12,5,6,30],[-256,7,32,127,"lower"],[76,6,32,62]]
break
case 6:t=[[-2048,5,10,28],[-1024,4,9,8],[-512,4,8,9],[-256,4,7,10],[-128,5,6,29],[-64,5,5,30],[-32,4,5,11],[0,2,7,0],[128,3,7,2],[256,3,8,3],[512,4,9,12],[1024,4,10,13],[-2049,6,32,62,"lower"],[2048,6,32,63]]
break
case 7:t=[[-1024,4,9,8],[-512,3,8,0],[-256,4,7,9],[-128,5,6,26],[-64,5,5,27],[-32,4,5,10],[0,4,5,11],[32,5,5,28],[64,5,6,29],[128,4,7,12],[256,3,8,1],[512,3,9,2],[1024,3,10,3],[-1025,5,32,30,"lower"],[2048,5,32,31]]
break
case 8:t=[[-15,8,3,252],[-7,9,1,508],[-5,8,1,253],[-3,9,0,509],[-2,7,0,124],[-1,4,0,10],[0,2,1,0],[2,5,0,26],[3,6,0,58],[4,3,4,4],[20,6,1,59],[22,4,4,11],[38,4,5,12],[70,5,6,27],[134,5,7,28],[262,6,7,60],[390,7,8,125],[646,6,10,61],[-16,9,32,510,"lower"],[1670,9,32,511],[2,1]]
break
case 9:t=[[-31,8,4,252],[-15,9,2,508],[-11,8,2,253],[-7,9,1,509],[-5,7,1,124],[-3,4,1,10],[-1,3,1,2],[1,3,1,3],[3,5,1,26],[5,6,1,58],[7,3,5,4],[39,6,2,59],[43,4,5,11],[75,4,6,12],[139,5,7,27],[267,5,8,28],[523,6,8,60],[779,7,9,125],[1291,6,11,61],[-32,9,32,510,"lower"],[3339,9,32,511],[2,0]]
break
case 10:t=[[-21,7,4,122],[-5,8,0,252],[-4,7,0,123],[-3,5,0,24],[-2,2,2,0],[2,5,0,25],[3,6,0,54],[4,7,0,124],[5,8,0,253],[6,2,6,1],[70,5,5,26],[102,6,5,55],[134,6,6,56],[198,6,7,57],[326,6,8,58],[582,6,9,59],[1094,6,10,60],[2118,7,11,125],[-22,8,32,254,"lower"],[4166,8,32,255],[2,2]]
break
case 11:t=[[1,1,0,0],[2,2,1,2],[4,4,0,12],[5,4,1,13],[7,5,1,28],[9,5,2,29],[13,6,2,60],[17,7,2,122],[21,7,3,123],[29,7,4,124],[45,7,5,125],[77,7,6,126],[141,7,32,127]]
break
case 12:t=[[1,1,0,0],[2,2,0,2],[3,3,1,6],[5,5,0,28],[6,5,1,29],[8,6,1,60],[10,7,0,122],[11,7,1,123],[13,7,2,124],[17,7,3,125],[25,7,4,126],[41,8,5,254],[73,8,32,255]]
break
case 13:t=[[1,1,0,0],[2,3,0,4],[3,4,0,12],[4,5,0,28],[5,4,1,13],[7,3,3,5],[15,6,1,58],[17,6,2,59],[21,6,3,60],[29,6,4,61],[45,6,5,62],[77,7,6,126],[141,7,32,127]]
break
case 14:t=[[-2,3,0,4],[-1,3,0,5],[0,1,0,0],[1,3,0,6],[2,3,0,7]]
break
case 15:t=[[-24,7,4,124],[-8,6,2,60],[-4,5,1,28],[-2,4,0,12],[-1,3,0,4],[0,1,0,0],[1,3,0,5],[2,4,0,13],[3,5,1,29],[5,6,2,61],[9,7,4,125],[-25,7,32,126,"lower"],[25,7,32,127]]
break
default:throw new o("standard table B.".concat(e," does not exist"))}var a,i=t.length
for(a=0;a<i;a++)t[a]=new C(t[a])
return r=new A(t,!0),_[e]=r,r}function I(e,t,r){this.data=e,this.start=t,this.end=r,this.position=t,this.shift=-1,this.currentByte=0}function O(e,t,r){var a,i,n=0,s=t.length
for(a=0;a<s;a++)if(i=r[t[a]]){if(e===n)return i
n++}throw new o("can't find custom Huffman table")}function E(e,t,r){var a,i,n,o=[]
for(i=0;i<r;i++){for(n=new Uint8Array(t),o.push(n),a=0;a<t;a++)n[a]=e.readBit()
e.byteAlign()}return o}function T(e,t,r,a){var i,o,s,c,l,u={K:-1,Columns:t,Rows:r,BlackIs1:!0,EndOfBlock:a},h=new n.CCITTFaxDecoder(e,u),f=[],d=!1
for(o=0;o<r;o++)for(s=new Uint8Array(t),f.push(s),l=-1,i=0;i<t;i++)l<0&&(-1===(c=h.readNextChar())&&(c=0,d=!0),l=7),s[i]=c>>l&1,l--
if(a&&!d)for(var g=0;g<5&&-1!==h.readNextChar();g++);return f}function F(){}return I.prototype={readBit:function(){if(this.shift<0){if(this.position>=this.end)throw new o("end of data while reading bit")
this.currentByte=this.data[this.position++],this.shift=7}var e=this.currentByte>>this.shift&1
return this.shift--,e},readBits:function(e){var t,r=0
for(t=e-1;t>=0;t--)r|=this.readBit()<<t
return r},byteAlign:function(){this.shift=-1},next:function(){return this.position>=this.end?-1:this.data[this.position++]}},F.prototype={parseChunks:function(e){return function(e){for(var t=new S,r=0,a=e.length;r<a;r++){var i=e[r]
k(v({},i.data,i.start,i.end),t)}return t.buffer}(e)},parse:function(e){var t=function(e){var t=0,r=e.length
if(151!==e[t]||74!==e[t+1]||66!==e[t+2]||50!==e[t+3]||13!==e[t+4]||10!==e[t+5]||26!==e[t+6]||10!==e[t+7])throw new o("parseJbig2 - invalid header.")
var i=Object.create(null)
t+=8
var n=e[t++]
i.randomAccess=!(1&n),2&n||(i.numberOfPages=(0,a.readUint32)(e,t),t+=4)
var s=v(i,e,t,r),c=new S
k(s,c)
for(var l=c.currentPageInfo,u=l.width,h=l.height,f=c.buffer,d=new Uint8ClampedArray(u*h),g=0,m=0,p=0;p<h;p++)for(var b=0,y=void 0,w=0;w<u;w++)b||(b=128,y=f[m++]),d[g++]=y&b?0:255,b>>=1
return{imgData:d,width:u,height:h}}(e),r=t.imgData,i=t.width,n=t.height
return this.width=i,this.height=n,r}},F}()
t.Jbig2Image=s},function(e,t,r){"use strict"
function a(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}Object.defineProperty(t,"__esModule",{value:!0}),t.ArithmeticDecoder=void 0
var i=[{qe:22017,nmps:1,nlps:1,switchFlag:1},{qe:13313,nmps:2,nlps:6,switchFlag:0},{qe:6145,nmps:3,nlps:9,switchFlag:0},{qe:2753,nmps:4,nlps:12,switchFlag:0},{qe:1313,nmps:5,nlps:29,switchFlag:0},{qe:545,nmps:38,nlps:33,switchFlag:0},{qe:22017,nmps:7,nlps:6,switchFlag:1},{qe:21505,nmps:8,nlps:14,switchFlag:0},{qe:18433,nmps:9,nlps:14,switchFlag:0},{qe:14337,nmps:10,nlps:14,switchFlag:0},{qe:12289,nmps:11,nlps:17,switchFlag:0},{qe:9217,nmps:12,nlps:18,switchFlag:0},{qe:7169,nmps:13,nlps:20,switchFlag:0},{qe:5633,nmps:29,nlps:21,switchFlag:0},{qe:22017,nmps:15,nlps:14,switchFlag:1},{qe:21505,nmps:16,nlps:14,switchFlag:0},{qe:20737,nmps:17,nlps:15,switchFlag:0},{qe:18433,nmps:18,nlps:16,switchFlag:0},{qe:14337,nmps:19,nlps:17,switchFlag:0},{qe:13313,nmps:20,nlps:18,switchFlag:0},{qe:12289,nmps:21,nlps:19,switchFlag:0},{qe:10241,nmps:22,nlps:19,switchFlag:0},{qe:9217,nmps:23,nlps:20,switchFlag:0},{qe:8705,nmps:24,nlps:21,switchFlag:0},{qe:7169,nmps:25,nlps:22,switchFlag:0},{qe:6145,nmps:26,nlps:23,switchFlag:0},{qe:5633,nmps:27,nlps:24,switchFlag:0},{qe:5121,nmps:28,nlps:25,switchFlag:0},{qe:4609,nmps:29,nlps:26,switchFlag:0},{qe:4353,nmps:30,nlps:27,switchFlag:0},{qe:2753,nmps:31,nlps:28,switchFlag:0},{qe:2497,nmps:32,nlps:29,switchFlag:0},{qe:2209,nmps:33,nlps:30,switchFlag:0},{qe:1313,nmps:34,nlps:31,switchFlag:0},{qe:1089,nmps:35,nlps:32,switchFlag:0},{qe:673,nmps:36,nlps:33,switchFlag:0},{qe:545,nmps:37,nlps:34,switchFlag:0},{qe:321,nmps:38,nlps:35,switchFlag:0},{qe:273,nmps:39,nlps:36,switchFlag:0},{qe:133,nmps:40,nlps:37,switchFlag:0},{qe:73,nmps:41,nlps:38,switchFlag:0},{qe:37,nmps:42,nlps:39,switchFlag:0},{qe:21,nmps:43,nlps:40,switchFlag:0},{qe:9,nmps:44,nlps:41,switchFlag:0},{qe:5,nmps:45,nlps:42,switchFlag:0},{qe:1,nmps:45,nlps:43,switchFlag:0},{qe:22017,nmps:46,nlps:46,switchFlag:0}],n=function(){function e(t,r,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.data=t,this.bp=r,this.dataEnd=a,this.chigh=t[r],this.clow=0,this.byteIn(),this.chigh=this.chigh<<7&65535|this.clow>>9&127,this.clow=this.clow<<7&65535,this.ct-=7,this.a=32768}return function(e,t,r){t&&a(e.prototype,t)}(e,[{key:"byteIn",value:function(){var e=this.data,t=this.bp
255===e[t]?e[t+1]>143?(this.clow+=65280,this.ct=8):(t++,this.clow+=e[t]<<9,this.ct=7,this.bp=t):(t++,this.clow+=t<this.dataEnd?e[t]<<8:65280,this.ct=8,this.bp=t),this.clow>65535&&(this.chigh+=this.clow>>16,this.clow&=65535)}},{key:"readBit",value:function(e,t){var r,a=e[t]>>1,n=1&e[t],o=i[a],s=o.qe,c=this.a-s
if(this.chigh<s)c<s?(c=s,r=n,a=o.nmps):(c=s,r=1^n,1===o.switchFlag&&(n=r),a=o.nlps)
else{if(this.chigh-=s,0!=(32768&c))return this.a=c,n
c<s?(r=1^n,1===o.switchFlag&&(n=r),a=o.nlps):(r=n,a=o.nmps)}do{0===this.ct&&this.byteIn(),c<<=1,this.chigh=this.chigh<<1&65535|this.clow>>15&1,this.clow=this.clow<<1&65535,this.ct--}while(0==(32768&c))
return this.a=c,e[t]=a<<1|n,r}}]),e}()
t.ArithmeticDecoder=n},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.JpegStream=void 0
var a=r(6),i=r(157),n=r(155),o=r(164),s=function(){function e(e,t,r,a){for(var n;-1!==(n=e.getByte());)if(255===n){e.skip(-1)
break}this.stream=e,this.maybeLength=t,this.dict=r,this.params=a,i.DecodeStream.call(this,t)}return e.prototype=Object.create(i.DecodeStream.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return(0,a.shadow)(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){},e.prototype.readBlock=function(){if(!this.eof){var e={decodeTransform:void 0,colorTransform:void 0},t=this.dict.getArray("Decode","D")
if(this.forceRGB&&Array.isArray(t)){for(var r=this.dict.get("BitsPerComponent")||8,a=t.length,i=new Int32Array(a),s=!1,c=(1<<r)-1,l=0;l<a;l+=2)i[l]=256*(t[l+1]-t[l])|0,i[l+1]=t[l]*c|0,256===i[l]&&0===i[l+1]||(s=!0)
s&&(e.decodeTransform=i)}if((0,n.isDict)(this.params)){var u=this.params.get("ColorTransform")
Number.isInteger(u)&&(e.colorTransform=u)}var h=new o.JpegImage(e)
h.parse(this.bytes)
var f=h.getData({width:this.drawWidth,height:this.drawHeight,forceRGB:this.forceRGB,isSourcePDF:!0})
this.buffer=f,this.bufferLength=f.length,this.eof=!0}},e.prototype.getIR=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
return(0,a.createObjectURL)(this.bytes,"image/jpeg",e)},e}()
t.JpegStream=s},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.JpegImage=void 0
var a=r(6)
function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=function(){function e(e){this.message="JPEG error: "+e}return e.prototype=new Error,e.prototype.name="JpegError",e.constructor=e,e}(),o=function(){function e(e,t){this.message=e,this.scanLines=t}return e.prototype=new Error,e.prototype.name="DNLMarkerError",e.constructor=e,e}(),s=function(){function e(e){this.message=e}return e.prototype=new Error,e.prototype.name="EOIMarkerError",e.constructor=e,e}(),c=function(){var e=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),t=4017,r=799,c=3406,l=2276,u=1567,h=3784,f=5793,d=2896
function g(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.decodeTransform,r=void 0===t?null:t,a=e.colorTransform,i=void 0===a?-1:a
this._decodeTransform=r,this._colorTransform=i}function m(e,t){for(var r,a,i=0,n=[],o=16;o>0&&!e[o-1];)o--
n.push({children:[],index:0})
var s,c=n[0]
for(r=0;r<o;r++){for(a=0;a<e[r];a++){for((c=n.pop()).children[c.index]=t[i];c.index>0;)c=n.pop()
for(c.index++,n.push(c);n.length<=r;)n.push(s={children:[],index:0}),c.children[c.index]=s.children,c=s
i++}r+1<o&&(n.push(s={children:[],index:0}),c.children[c.index]=s.children,c=s)}return n[0].children}function p(e,t,r){return 64*((e.blocksPerLine+1)*t+r)}function v(t,r,c,l,u,h,f,d,g){var m=arguments.length>9&&void 0!==arguments[9]&&arguments[9],v=c.mcusPerLine,b=c.progressive,y=r,k=0,S=0
function C(){if(S>0)return k>>--S&1
if(255===(k=t[r++])){var e=t[r++]
if(e){if(220===e&&m){r+=2
var a=t[r++]<<8|t[r++]
if(a>0&&a!==c.scanLines)throw new o("Found DNL marker (0xFFDC) while parsing scan data",a)}else if(217===e)throw new s("Found EOI marker (0xFFD9) while parsing scan data")
throw new n("unexpected marker ".concat((k<<8|e).toString(16)))}}return S=7,k>>>7}function x(e){for(var t=e;;){if("number"==typeof(t=t[C()]))return t
if("object"!==i(t))throw new n("invalid huffman sequence")}}function A(e){for(var t=0;e>0;)t=t<<1|C(),e--
return t}function _(e){if(1===e)return 1===C()?1:-1
var t=A(e)
return t>=1<<e-1?t:t+(-1<<e)+1}var P,I=0,O=0
function E(e,t,r,a,i){var n=r%v
t(e,p(e,(r/v|0)*e.v+a,n*e.h+i))}function T(e,t,r){t(e,p(e,r/e.blocksPerLine|0,r%e.blocksPerLine))}var F,R,B,D,M,L,N=l.length
L=b?0===h?0===d?function(e,t){var r=x(e.huffmanTableDC),a=0===r?0:_(r)<<g
e.blockData[t]=e.pred+=a}:function(e,t){e.blockData[t]|=C()<<g}:0===d?function(t,r){if(I>0)I--
else for(var a=h,i=f;a<=i;){var n=x(t.huffmanTableAC),o=15&n,s=n>>4
if(0!==o){var c=e[a+=s]
t.blockData[r+c]=_(o)*(1<<g),a++}else{if(s<15){I=A(s)+(1<<s)-1
break}a+=16}}}:function(t,r){for(var a,i,o=h,s=f,c=0;o<=s;){var l=r+e[o],u=t.blockData[l]<0?-1:1
switch(O){case 0:if(c=(i=x(t.huffmanTableAC))>>4,0==(a=15&i))c<15?(I=A(c)+(1<<c),O=4):(c=16,O=1)
else{if(1!==a)throw new n("invalid ACn encoding")
P=_(a),O=c?2:3}continue
case 1:case 2:t.blockData[l]?t.blockData[l]+=u*(C()<<g):0==--c&&(O=2===O?3:0)
break
case 3:t.blockData[l]?t.blockData[l]+=u*(C()<<g):(t.blockData[l]=P<<g,O=0)
break
case 4:t.blockData[l]&&(t.blockData[l]+=u*(C()<<g))}o++}4===O&&0==--I&&(O=0)}:function(t,r){var a=x(t.huffmanTableDC),i=0===a?0:_(a)
t.blockData[r]=t.pred+=i
for(var n=1;n<64;){var o=x(t.huffmanTableAC),s=15&o,c=o>>4
if(0!==s){var l=e[n+=c]
t.blockData[r+l]=_(s),n++}else{if(c<15)break
n+=16}}}
var U,q,j,z,H=0
for(q=1===N?l[0].blocksPerLine*l[0].blocksPerColumn:v*c.mcusPerColumn;H<q;){var W=u?Math.min(q-H,u):q
for(R=0;R<N;R++)l[R].pred=0
if(I=0,1===N)for(F=l[0],M=0;M<W;M++)T(F,L,H),H++
else for(M=0;M<W;M++){for(R=0;R<N;R++)for(j=(F=l[R]).h,z=F.v,B=0;B<z;B++)for(D=0;D<j;D++)E(F,L,H,B,D)
H++}S=0,(U=w(t,r))&&U.invalid&&((0,a.warn)("decodeScan - unexpected MCU data, current marker is: "+U.invalid),r=U.offset)
var G=U&&U.marker
if(!G||G<=65280)throw new n("marker was not found")
if(!(G>=65488&&G<=65495))break
r+=2}return(U=w(t,r))&&U.invalid&&((0,a.warn)("decodeScan - unexpected Scan data, current marker is: "+U.invalid),r=U.offset),r-y}function b(e,a,i){var o,s,g,m,p,v,b,y,w,k,S,C,x,A,_,P,I,O=e.quantizationTable,E=e.blockData
if(!O)throw new n("missing required Quantization Table.")
for(var T=0;T<64;T+=8)w=E[a+T],k=E[a+T+1],S=E[a+T+2],C=E[a+T+3],x=E[a+T+4],A=E[a+T+5],_=E[a+T+6],P=E[a+T+7],w*=O[T],0!=(k|S|C|x|A|_|P)?(k*=O[T+1],S*=O[T+2],C*=O[T+3],x*=O[T+4],A*=O[T+5],_*=O[T+6],P*=O[T+7],s=(o=(o=f*w+128>>8)+(s=f*x+128>>8)+1>>1)-s,I=(g=S)*h+(m=_)*u+128>>8,g=g*u-m*h+128>>8,b=(p=(p=d*(k-P)+128>>8)+(b=A<<4)+1>>1)-b,v=(y=(y=d*(k+P)+128>>8)+(v=C<<4)+1>>1)-v,m=(o=o+(m=I)+1>>1)-m,g=(s=s+g+1>>1)-g,I=p*l+y*c+2048>>12,p=p*c-y*l+2048>>12,y=I,I=v*r+b*t+2048>>12,v=v*t-b*r+2048>>12,b=I,i[T]=o+y,i[T+7]=o-y,i[T+1]=s+b,i[T+6]=s-b,i[T+2]=g+v,i[T+5]=g-v,i[T+3]=m+p,i[T+4]=m-p):(I=f*w+512>>10,i[T]=I,i[T+1]=I,i[T+2]=I,i[T+3]=I,i[T+4]=I,i[T+5]=I,i[T+6]=I,i[T+7]=I)
for(var F=0;F<8;++F)w=i[F],0!=((k=i[F+8])|(S=i[F+16])|(C=i[F+24])|(x=i[F+32])|(A=i[F+40])|(_=i[F+48])|(P=i[F+56]))?(s=(o=4112+((o=f*w+2048>>12)+(s=f*x+2048>>12)+1>>1))-s,I=(g=S)*h+(m=_)*u+2048>>12,g=g*u-m*h+2048>>12,m=I,b=(p=(p=d*(k-P)+2048>>12)+(b=A)+1>>1)-b,v=(y=(y=d*(k+P)+2048>>12)+(v=C)+1>>1)-v,I=p*l+y*c+2048>>12,p=p*c-y*l+2048>>12,y=I,I=v*r+b*t+2048>>12,v=v*t-b*r+2048>>12,w=(w=(o=o+m+1>>1)+y)<16?0:w>=4080?255:w>>4,k=(k=(s=s+g+1>>1)+(b=I))<16?0:k>=4080?255:k>>4,S=(S=(g=s-g)+v)<16?0:S>=4080?255:S>>4,C=(C=(m=o-m)+p)<16?0:C>=4080?255:C>>4,x=(x=m-p)<16?0:x>=4080?255:x>>4,A=(A=g-v)<16?0:A>=4080?255:A>>4,_=(_=s-b)<16?0:_>=4080?255:_>>4,P=(P=o-y)<16?0:P>=4080?255:P>>4,E[a+F]=w,E[a+F+8]=k,E[a+F+16]=S,E[a+F+24]=C,E[a+F+32]=x,E[a+F+40]=A,E[a+F+48]=_,E[a+F+56]=P):(I=(I=f*w+8192>>14)<-2040?0:I>=2024?255:I+2056>>4,E[a+F]=I,E[a+F+8]=I,E[a+F+16]=I,E[a+F+24]=I,E[a+F+32]=I,E[a+F+40]=I,E[a+F+48]=I,E[a+F+56]=I)}function y(e,t){for(var r=t.blocksPerLine,a=t.blocksPerColumn,i=new Int16Array(64),n=0;n<a;n++)for(var o=0;o<r;o++)b(t,p(t,n,o),i)
return t.blockData}function w(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t
function a(t){return e[t]<<8|e[t+1]}var i=e.length-1,n=r<t?r:t
if(t>=i)return null
var o=a(t)
if(o>=65472&&o<=65534)return{invalid:null,marker:o,offset:t}
for(var s=a(n);!(s>=65472&&s<=65534);){if(++n>=i)return null
s=a(n)}return{invalid:o.toString(16),marker:s,offset:n}}return g.prototype={parse:function(t){var r=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).dnlScanLines,i=void 0===r?null:r
function c(){var e=t[d]<<8|t[d+1]
return d+=2,e}function l(){var e=c(),r=d+e-2,i=w(t,r,d)
i&&i.invalid&&((0,a.warn)("readDataBlock - incorrect length, current marker is: "+i.invalid),r=i.offset)
var n=t.subarray(d,r)
return d+=n.length,n}function u(e){for(var t=Math.ceil(e.samplesPerLine/8/e.maxH),r=Math.ceil(e.scanLines/8/e.maxV),a=0;a<e.components.length;a++){X=e.components[a]
var i=Math.ceil(Math.ceil(e.samplesPerLine/8)*X.h/e.maxH),n=Math.ceil(Math.ceil(e.scanLines/8)*X.v/e.maxV),o=t*X.h,s=r*X.v*64*(o+1)
X.blockData=new Int16Array(s),X.blocksPerLine=i,X.blocksPerColumn=n}e.mcusPerLine=t,e.mcusPerColumn=r}var h,f,d=0,g=null,p=null,b=0,k=[],S=[],C=[],x=c()
if(65496!==x)throw new n("SOI not found")
x=c()
e:for(;65497!==x;){var A,_,P
switch(x){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var I=l()
65504===x&&74===I[0]&&70===I[1]&&73===I[2]&&70===I[3]&&0===I[4]&&(g={version:{major:I[5],minor:I[6]},densityUnits:I[7],xDensity:I[8]<<8|I[9],yDensity:I[10]<<8|I[11],thumbWidth:I[12],thumbHeight:I[13],thumbData:I.subarray(14,14+3*I[12]*I[13])}),65518===x&&65===I[0]&&100===I[1]&&111===I[2]&&98===I[3]&&101===I[4]&&(p={version:I[5]<<8|I[6],flags0:I[7]<<8|I[8],flags1:I[9]<<8|I[10],transformCode:I[11]})
break
case 65499:for(var O=c()+d-2;d<O;){var E=t[d++],T=new Uint16Array(64)
if(E>>4==0)for(_=0;_<64;_++)T[e[_]]=t[d++]
else{if(E>>4!=1)throw new n("DQT - invalid table spec")
for(_=0;_<64;_++)T[e[_]]=c()}k[15&E]=T}break
case 65472:case 65473:case 65474:if(h)throw new n("Only single frame JPEGs supported")
c(),(h={}).extended=65473===x,h.progressive=65474===x,h.precision=t[d++]
var F=c()
h.scanLines=i||F,h.samplesPerLine=c(),h.components=[],h.componentIds={}
var R,B=t[d++],D=0,M=0
for(A=0;A<B;A++){R=t[d]
var L=t[d+1]>>4,N=15&t[d+1]
D<L&&(D=L),M<N&&(M=N)
var U=t[d+2]
P=h.components.push({h:L,v:N,quantizationId:U,quantizationTable:null}),h.componentIds[R]=P-1,d+=3}h.maxH=D,h.maxV=M,u(h)
break
case 65476:var q=c()
for(A=2;A<q;){var j=t[d++],z=new Uint8Array(16),H=0
for(_=0;_<16;_++,d++)H+=z[_]=t[d]
var W=new Uint8Array(H)
for(_=0;_<H;_++,d++)W[_]=t[d]
A+=17+H,(j>>4==0?C:S)[15&j]=m(z,W)}break
case 65501:c(),f=c()
break
case 65498:var G=1==++b&&!i
c()
var X,V=t[d++],K=[]
for(A=0;A<V;A++){var Y=h.componentIds[t[d++]]
X=h.components[Y]
var J=t[d++]
X.huffmanTableDC=C[J>>4],X.huffmanTableAC=S[15&J],K.push(X)}var Z=t[d++],Q=t[d++],$=t[d++]
try{var ee=v(t,d,h,K,f,Z,Q,$>>4,15&$,G)
d+=ee}catch(e){if(e instanceof o)return(0,a.warn)("".concat(e.message," -- attempting to re-parse the JPEG image.")),this.parse(t,{dnlScanLines:e.scanLines})
if(e instanceof s){(0,a.warn)("".concat(e.message," -- ignoring the rest of the image data."))
break e}throw e}break
case 65500:d+=4
break
case 65535:255!==t[d]&&d--
break
default:if(255===t[d-3]&&t[d-2]>=192&&t[d-2]<=254){d-=3
break}var te=w(t,d-2)
if(te&&te.invalid){(0,a.warn)("JpegImage.parse - unexpected data, current marker is: "+te.invalid),d=te.offset
break}throw new n("unknown marker "+x.toString(16))}x=c()}for(this.width=h.samplesPerLine,this.height=h.scanLines,this.jfif=g,this.adobe=p,this.components=[],A=0;A<h.components.length;A++){var re=k[(X=h.components[A]).quantizationId]
re&&(X.quantizationTable=re),this.components.push({output:y(0,X),scaleX:X.h/h.maxH,scaleY:X.v/h.maxV,blocksPerLine:X.blocksPerLine,blocksPerColumn:X.blocksPerColumn})}this.numComponents=this.components.length},_getLinearizedBlockData:function(e,t){var r,a,i,n,o,s,c,l,u,h,f,d=arguments.length>2&&void 0!==arguments[2]&&arguments[2],g=this.width/e,m=this.height/t,p=0,v=this.components.length,b=e*t*v,y=new Uint8ClampedArray(b),w=new Uint32Array(e)
for(c=0;c<v;c++){for(a=(r=this.components[c]).scaleX*g,i=r.scaleY*m,p=c,f=r.output,n=r.blocksPerLine+1<<3,o=0;o<e;o++)l=0|o*a,w[o]=(4294967288&l)<<3|7&l
for(s=0;s<t;s++)for(h=n*(4294967288&(l=0|s*i))|(7&l)<<3,o=0;o<e;o++)y[p]=f[h+w[o]],p+=v}var k=this._decodeTransform
if(d||4!==v||k||(k=new Int32Array([-256,255,-256,255,-256,255,-256,255])),k)for(c=0;c<b;)for(l=0,u=0;l<v;l++,c++,u+=2)y[c]=(y[c]*k[u]>>8)+k[u+1]
return y},get _isColorConversionNeeded(){return this.adobe?!!this.adobe.transformCode:3===this.numComponents?0!==this._colorTransform:1===this._colorTransform},_convertYccToRgb:function(e){for(var t,r,a,i=0,n=e.length;i<n;i+=3)t=e[i],r=e[i+1],a=e[i+2],e[i]=t-179.456+1.402*a,e[i+1]=t+135.459-.344*r-.714*a,e[i+2]=t-226.816+1.772*r
return e},_convertYcckToRgb:function(e){for(var t,r,a,i,n=0,o=0,s=e.length;o<s;o+=4)t=e[o],r=e[o+1],a=e[o+2],i=e[o+3],e[n++]=r*(-660635669420364e-19*r+.000437130475926232*a-54080610064599e-18*t+.00048449797120281*i-.154362151871126)-122.67195406894+a*(-.000957964378445773*a+.000817076911346625*t-.00477271405408747*i+1.53380253221734)+t*(.000961250184130688*t-.00266257332283933*i+.48357088451265)+i*(-.000336197177618394*i+.484791561490776),e[n++]=107.268039397724+r*(219927104525741e-19*r-.000640992018297945*a+.000659397001245577*t+.000426105652938837*i-.176491792462875)+a*(-.000778269941513683*a+.00130872261408275*t+.000770482631801132*i-.151051492775562)+t*(.00126935368114843*t-.00265090189010898*i+.25802910206845)+i*(-.000318913117588328*i-.213742400323665),e[n++]=r*(-.000570115196973677*r-263409051004589e-19*a+.0020741088115012*t-.00288260236853442*i+.814272968359295)-20.810012546947+a*(-153496057440975e-19*a-.000132689043961446*t+.000560833691242812*i-.195152027534049)+t*(.00174418132927582*t-.00255243321439347*i+.116935020465145)+i*(-.000343531996510555*i+.24165260232407)
return e.subarray(0,n)},_convertYcckToCmyk:function(e){for(var t,r,a,i=0,n=e.length;i<n;i+=4)t=e[i],r=e[i+1],a=e[i+2],e[i]=434.456-t-1.402*a,e[i+1]=119.541-t+.344*r+.714*a,e[i+2]=481.816-t-1.772*r
return e},_convertCmykToRgb:function(e){for(var t,r,a,i,n=0,o=0,s=e.length;o<s;o+=4)t=e[o]*(1/255),r=e[o+1]*(1/255),a=e[o+2]*(1/255),i=e[o+3]*(1/255),e[n++]=255+t*(-4.387332384609988*t+54.48615194189176*r+18.82290502165302*a+212.25662451639585*i-285.2331026137004)+r*(1.7149763477362134*r-5.6096736904047315*a-17.873870861415444*i-5.497006427196366)+a*(-2.5217340131683033*a-21.248923337353073*i+17.5119270841813)-i*(21.86122147463605*i+189.48180835922747),e[n++]=255+t*(8.841041422036149*t+60.118027045597366*r+6.871425592049007*a+31.159100130055922*i-79.2970844816548)+r*(-15.310361306967817*r+17.575251261109482*a+131.35250912493976*i-190.9453302588951)+a*(4.444339102852739*a+9.8632861493405*i-24.86741582555878)-i*(20.737325471181034*i+187.80453709719578),e[n++]=255+t*(.8842522430003296*t+8.078677503112928*r+30.89978309703729*a-.23883238689178934*i-14.183576799673286)+r*(10.49593273432072*r+63.02378494754052*a+50.606957656360734*i-112.23884253719248)+a*(.03296041114873217*a+115.60384449646641*i-193.58209356861505)-i*(22.33816807309886*i+180.12613974708367)
return e.subarray(0,n)},getData:function(e){var t=e.width,r=e.height,a=e.forceRGB,i=void 0!==a&&a,o=e.isSourcePDF,s=void 0!==o&&o
if(this.numComponents>4)throw new n("Unsupported color mode")
var c=this._getLinearizedBlockData(t,r,s)
if(1===this.numComponents&&i){for(var l=c.length,u=new Uint8ClampedArray(3*l),h=0,f=0;f<l;f++){var d=c[f]
u[h++]=d,u[h++]=d,u[h++]=d}return u}if(3===this.numComponents&&this._isColorConversionNeeded)return this._convertYccToRgb(c)
if(4===this.numComponents){if(this._isColorConversionNeeded)return i?this._convertYcckToRgb(c):this._convertYcckToCmyk(c)
if(i)return this._convertCmykToRgb(c)}return c}},g}()
t.JpegImage=c},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.JpxStream=void 0
var a=r(157),i=r(166),n=r(6),o=function(){function e(e,t,r,i){this.stream=e,this.maybeLength=t,this.dict=r,this.params=i,a.DecodeStream.call(this,t)}return e.prototype=Object.create(a.DecodeStream.prototype),Object.defineProperty(e.prototype,"bytes",{get:function(){return(0,n.shadow)(this,"bytes",this.stream.getBytes(this.maybeLength))},configurable:!0}),e.prototype.ensureBuffer=function(e){},e.prototype.readBlock=function(){if(!this.eof){var e=new i.JpxImage
e.parse(this.bytes)
var t=e.width,r=e.height,a=e.componentsCount,n=e.tiles.length
if(1===n)this.buffer=e.tiles[0].items
else{for(var o=new Uint8ClampedArray(t*r*a),s=0;s<n;s++)for(var c=e.tiles[s],l=c.width,u=c.height,h=c.left,f=c.top,d=c.items,g=0,m=(t*f+h)*a,p=t*a,v=l*a,b=0;b<u;b++){var y=d.subarray(g,g+v)
o.set(y,m),g+=v,m+=p}this.buffer=o}this.bufferLength=this.buffer.length,this.eof=!0}},e}()
t.JpxStream=o},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.JpxImage=void 0
var a=r(6),i=r(162),n=function(){function e(e){this.message="JPX error: "+e}return e.prototype=new Error,e.prototype.name="JpxError",e.constructor=e,e}(),o=function(){var e={LL:0,LH:1,HL:1,HH:2}
function t(){this.failOnCorruptedImage=!1}function r(e,t){e.x0=Math.ceil(t.XOsiz/e.XRsiz),e.x1=Math.ceil(t.Xsiz/e.XRsiz),e.y0=Math.ceil(t.YOsiz/e.YRsiz),e.y1=Math.ceil(t.Ysiz/e.YRsiz),e.width=e.x1-e.x0,e.height=e.y1-e.y0}function o(e,t){for(var r,a=e.SIZ,i=[],n=Math.ceil((a.Xsiz-a.XTOsiz)/a.XTsiz),o=Math.ceil((a.Ysiz-a.YTOsiz)/a.YTsiz),s=0;s<o;s++)for(var c=0;c<n;c++)(r={}).tx0=Math.max(a.XTOsiz+c*a.XTsiz,a.XOsiz),r.ty0=Math.max(a.YTOsiz+s*a.YTsiz,a.YOsiz),r.tx1=Math.min(a.XTOsiz+(c+1)*a.XTsiz,a.Xsiz),r.ty1=Math.min(a.YTOsiz+(s+1)*a.YTsiz,a.Ysiz),r.width=r.tx1-r.tx0,r.height=r.ty1-r.ty0,r.components=[],i.push(r)
e.tiles=i
for(var l=0,u=a.Csiz;l<u;l++)for(var h=t[l],f=0,d=i.length;f<d;f++){var g={}
r=i[f],g.tcx0=Math.ceil(r.tx0/h.XRsiz),g.tcy0=Math.ceil(r.ty0/h.YRsiz),g.tcx1=Math.ceil(r.tx1/h.XRsiz),g.tcy1=Math.ceil(r.ty1/h.YRsiz),g.width=g.tcx1-g.tcx0,g.height=g.tcy1-g.tcy0,r.components[l]=g}}function s(e,t,r){var a=t.codingStyleParameters,i={}
return a.entropyCoderWithCustomPrecincts?(i.PPx=a.precinctsSizes[r].PPx,i.PPy=a.precinctsSizes[r].PPy):(i.PPx=15,i.PPy=15),i.xcb_=r>0?Math.min(a.xcb,i.PPx-1):Math.min(a.xcb,i.PPx),i.ycb_=r>0?Math.min(a.ycb,i.PPy-1):Math.min(a.ycb,i.PPy),i}function c(e,t,r){var a=1<<r.PPx,i=1<<r.PPy,n=0===t.resLevel,o=1<<r.PPx+(n?0:-1),s=1<<r.PPy+(n?0:-1),c=t.trx1>t.trx0?Math.ceil(t.trx1/a)-Math.floor(t.trx0/a):0,l=t.try1>t.try0?Math.ceil(t.try1/i)-Math.floor(t.try0/i):0,u=c*l
t.precinctParameters={precinctWidth:a,precinctHeight:i,numprecinctswide:c,numprecinctshigh:l,numprecincts:u,precinctWidthInSubband:o,precinctHeightInSubband:s}}function l(e,t,r){var a,i,n,o,s=r.xcb_,c=r.ycb_,l=1<<s,u=1<<c,h=t.tbx0>>s,f=t.tby0>>c,d=t.tbx1+l-1>>s,g=t.tby1+u-1>>c,m=t.resolution.precinctParameters,p=[],v=[]
for(i=f;i<g;i++)for(a=h;a<d;a++)if((n={cbx:a,cby:i,tbx0:l*a,tby0:u*i,tbx1:l*(a+1),tby1:u*(i+1)}).tbx0_=Math.max(t.tbx0,n.tbx0),n.tby0_=Math.max(t.tby0,n.tby0),n.tbx1_=Math.min(t.tbx1,n.tbx1),n.tby1_=Math.min(t.tby1,n.tby1),o=Math.floor((n.tbx0_-t.tbx0)/m.precinctWidthInSubband)+Math.floor((n.tby0_-t.tby0)/m.precinctHeightInSubband)*m.numprecinctswide,n.precinctNumber=o,n.subbandType=t.type,n.Lblock=3,!(n.tbx1_<=n.tbx0_||n.tby1_<=n.tby0_)){p.push(n)
var b=v[o]
void 0!==b?(a<b.cbxMin?b.cbxMin=a:a>b.cbxMax&&(b.cbxMax=a),i<b.cbyMin?b.cbxMin=i:i>b.cbyMax&&(b.cbyMax=i)):v[o]=b={cbxMin:a,cbyMin:i,cbxMax:a,cbyMax:i},n.precinct=b}t.codeblockParameters={codeblockWidth:s,codeblockHeight:c,numcodeblockwide:d-h+1,numcodeblockhigh:g-f+1},t.codeblocks=p,t.precincts=v}function u(e,t,r){for(var a=[],i=e.subbands,n=0,o=i.length;n<o;n++)for(var s=i[n].codeblocks,c=0,l=s.length;c<l;c++){var u=s[c]
u.precinctNumber===t&&a.push(u)}return{layerNumber:r,codeblocks:a}}function h(e){for(var t=e.SIZ,r=e.currentTile.index,a=e.tiles[r],i=a.codingStyleDefaultParameters.layersCount,o=t.Csiz,s=0,c=0;c<o;c++)s=Math.max(s,a.components[c].codingStyleParameters.decompositionLevelsCount)
var l=0,h=0,f=0,d=0
this.nextPacket=function(){for(;l<i;l++){for(;h<=s;h++){for(;f<o;f++){var e=a.components[f]
if(!(h>e.codingStyleParameters.decompositionLevelsCount)){for(var t=e.resolutions[h],r=t.precinctParameters.numprecincts;d<r;){var c=u(t,d,l)
return d++,c}d=0}}f=0}h=0}throw new n("Out of packets")}}function f(e){for(var t=e.SIZ,r=e.currentTile.index,a=e.tiles[r],i=a.codingStyleDefaultParameters.layersCount,o=t.Csiz,s=0,c=0;c<o;c++)s=Math.max(s,a.components[c].codingStyleParameters.decompositionLevelsCount)
var l=0,h=0,f=0,d=0
this.nextPacket=function(){for(;l<=s;l++){for(;h<i;h++){for(;f<o;f++){var e=a.components[f]
if(!(l>e.codingStyleParameters.decompositionLevelsCount)){for(var t=e.resolutions[l],r=t.precinctParameters.numprecincts;d<r;){var c=u(t,d,h)
return d++,c}d=0}}f=0}h=0}throw new n("Out of packets")}}function d(e){var t,r,a,i,o=e.SIZ,s=e.currentTile.index,c=e.tiles[s],l=c.codingStyleDefaultParameters.layersCount,h=o.Csiz,f=0
for(a=0;a<h;a++){var d=c.components[a]
f=Math.max(f,d.codingStyleParameters.decompositionLevelsCount)}var g=new Int32Array(f+1)
for(r=0;r<=f;++r){var m=0
for(a=0;a<h;++a){var p=c.components[a].resolutions
r<p.length&&(m=Math.max(m,p[r].precinctParameters.numprecincts))}g[r]=m}t=0,r=0,a=0,i=0,this.nextPacket=function(){for(;r<=f;r++){for(;i<g[r];i++){for(;a<h;a++){var e=c.components[a]
if(!(r>e.codingStyleParameters.decompositionLevelsCount)){var o=e.resolutions[r],s=o.precinctParameters.numprecincts
if(!(i>=s)){for(;t<l;){var d=u(o,i,t)
return t++,d}t=0}}}a=0}i=0}throw new n("Out of packets")}}function g(e){var t=e.SIZ,r=e.currentTile.index,a=e.tiles[r],i=a.codingStyleDefaultParameters.layersCount,o=t.Csiz,s=v(a),c=s,l=0,h=0,f=0,d=0,g=0
this.nextPacket=function(){for(;g<c.maxNumHigh;g++){for(;d<c.maxNumWide;d++){for(;f<o;f++){for(var e=a.components[f],t=e.codingStyleParameters.decompositionLevelsCount;h<=t;h++){var r=e.resolutions[h],m=s.components[f].resolutions[h],v=p(d,g,m,c,r)
if(null!==v){for(;l<i;){var b=u(r,v,l)
return l++,b}l=0}}h=0}f=0}d=0}throw new n("Out of packets")}}function m(e){var t=e.SIZ,r=e.currentTile.index,a=e.tiles[r],i=a.codingStyleDefaultParameters.layersCount,o=t.Csiz,s=v(a),c=0,l=0,h=0,f=0,d=0
this.nextPacket=function(){for(;h<o;++h){for(var e=a.components[h],t=s.components[h],r=e.codingStyleParameters.decompositionLevelsCount;d<t.maxNumHigh;d++){for(;f<t.maxNumWide;f++){for(;l<=r;l++){var g=e.resolutions[l],m=t.resolutions[l],v=p(f,d,m,t,g)
if(null!==v){for(;c<i;){var b=u(g,v,c)
return c++,b}c=0}}l=0}f=0}d=0}throw new n("Out of packets")}}function p(e,t,r,a,i){var n=e*a.minWidth,o=t*a.minHeight
if(n%r.width!=0||o%r.height!=0)return null
var s=o/r.width*i.precinctParameters.numprecinctswide
return n/r.height+s}function v(e){for(var t=e.components.length,r=Number.MAX_VALUE,a=Number.MAX_VALUE,i=0,n=0,o=new Array(t),s=0;s<t;s++){for(var c=e.components[s],l=c.codingStyleParameters.decompositionLevelsCount,u=new Array(l+1),h=Number.MAX_VALUE,f=Number.MAX_VALUE,d=0,g=0,m=1,p=l;p>=0;--p){var v=c.resolutions[p],b=m*v.precinctParameters.precinctWidth,y=m*v.precinctParameters.precinctHeight
h=Math.min(h,b),f=Math.min(f,y),d=Math.max(d,v.precinctParameters.numprecinctswide),g=Math.max(g,v.precinctParameters.numprecinctshigh),u[p]={width:b,height:y},m<<=1}r=Math.min(r,h),a=Math.min(a,f),i=Math.max(i,d),n=Math.max(n,g),o[s]={resolutions:u,minWidth:h,minHeight:f,maxNumWide:d,maxNumHigh:g}}return{components:o,minWidth:r,minHeight:a,maxNumWide:i,maxNumHigh:n}}function b(e){for(var t=e.SIZ,r=e.currentTile.index,a=e.tiles[r],i=t.Csiz,o=0;o<i;o++){for(var u=a.components[o],p=u.codingStyleParameters.decompositionLevelsCount,v=[],b=[],y=0;y<=p;y++){var w,k=s(0,u,y),S={},C=1<<p-y
if(S.trx0=Math.ceil(u.tcx0/C),S.try0=Math.ceil(u.tcy0/C),S.trx1=Math.ceil(u.tcx1/C),S.try1=Math.ceil(u.tcy1/C),S.resLevel=y,c(0,S,k),v.push(S),0===y)(w={}).type="LL",w.tbx0=Math.ceil(u.tcx0/C),w.tby0=Math.ceil(u.tcy0/C),w.tbx1=Math.ceil(u.tcx1/C),w.tby1=Math.ceil(u.tcy1/C),w.resolution=S,l(0,w,k),b.push(w),S.subbands=[w]
else{var x=1<<p-y+1,A=[];(w={}).type="HL",w.tbx0=Math.ceil(u.tcx0/x-.5),w.tby0=Math.ceil(u.tcy0/x),w.tbx1=Math.ceil(u.tcx1/x-.5),w.tby1=Math.ceil(u.tcy1/x),w.resolution=S,l(0,w,k),b.push(w),A.push(w),(w={}).type="LH",w.tbx0=Math.ceil(u.tcx0/x),w.tby0=Math.ceil(u.tcy0/x-.5),w.tbx1=Math.ceil(u.tcx1/x),w.tby1=Math.ceil(u.tcy1/x-.5),w.resolution=S,l(0,w,k),b.push(w),A.push(w),(w={}).type="HH",w.tbx0=Math.ceil(u.tcx0/x-.5),w.tby0=Math.ceil(u.tcy0/x-.5),w.tbx1=Math.ceil(u.tcx1/x-.5),w.tby1=Math.ceil(u.tcy1/x-.5),w.resolution=S,l(0,w,k),b.push(w),A.push(w),S.subbands=A}}u.resolutions=v,u.subbands=b}var _=a.codingStyleDefaultParameters.progressionOrder
switch(_){case 0:a.packetsIterator=new h(e)
break
case 1:a.packetsIterator=new f(e)
break
case 2:a.packetsIterator=new d(e)
break
case 3:a.packetsIterator=new g(e)
break
case 4:a.packetsIterator=new m(e)
break
default:throw new n("Unsupported progression order ".concat(_))}}function y(e,t,r,i){var n,o=0,s=0,c=!1
function l(e){for(;s<e;){var a=t[r+o]
o++,c?(n=n<<7|a,s+=7,c=!1):(n=n<<8|a,s+=8),255===a&&(c=!0)}return n>>>(s-=e)&(1<<e)-1}function u(e){return 255===t[r+o-1]&&t[r+o]===e?(h(1),!0):255===t[r+o]&&t[r+o+1]===e&&(h(2),!0)}function h(e){o+=e}function f(){s=0,c&&(o++,c=!1)}function d(){if(0===l(1))return 1
if(0===l(1))return 2
var e=l(2)
return e<3?e+3:(e=l(5))<31?e+6:(e=l(7))+37}for(var g=e.currentTile.index,m=e.tiles[g],p=e.COD.sopMarkerUsed,v=e.COD.ephMarkerUsed,b=m.packetsIterator;o<i;){f(),p&&u(145)&&h(4)
var y=b.nextPacket()
if(l(1)){for(var w,k=y.layerNumber,S=[],A=0,_=y.codeblocks.length;A<_;A++){var P=(w=y.codeblocks[A]).precinct,I=w.cbx-P.cbxMin,O=w.cby-P.cbyMin,E=!1,T=!1
if(void 0!==w.included)E=!!l(1)
else{var F,R
if(void 0!==(P=w.precinct).inclusionTree)F=P.inclusionTree
else{var B=P.cbxMax-P.cbxMin+1,D=P.cbyMax-P.cbyMin+1
F=new x(B,D,k),R=new C(B,D),P.inclusionTree=F,P.zeroBitPlanesTree=R}if(F.reset(I,O,k))for(;;){if(!l(1)){F.incrementValue(k)
break}if(!F.nextLevel()){w.included=!0,E=T=!0
break}}}if(E){if(T){for((R=P.zeroBitPlanesTree).reset(I,O);;)if(l(1)){if(!R.nextLevel())break}else R.incrementValue()
w.zeroBitPlanes=R.value}for(var M=d();l(1);)w.Lblock++
var L=(0,a.log2)(M),N=l((M<1<<L?L-1:L)+w.Lblock)
S.push({codeblock:w,codingpasses:M,dataLength:N})}}for(f(),v&&u(146);S.length>0;){var U=S.shift()
void 0===(w=U.codeblock).data&&(w.data=[]),w.data.push({data:t,start:r+o,end:r+o+U.dataLength,codingpasses:U.codingpasses}),o+=U.dataLength}}}return o}function w(e,t,r,a,n,o,s,c){for(var l=a.tbx0,u=a.tby0,h=a.tbx1-a.tbx0,f=a.codeblocks,d="H"===a.type.charAt(0)?1:0,g="H"===a.type.charAt(1)?t:0,m=0,p=f.length;m<p;++m){var v=f[m],b=v.tbx1_-v.tbx0_,y=v.tby1_-v.tby0_
if(0!==b&&0!==y&&void 0!==v.data){var w,k
w=new A(b,y,v.subbandType,v.zeroBitPlanes,o),k=2
var S,C,x,_=v.data,P=0,I=0
for(S=0,C=_.length;S<C;S++)P+=(x=_[S]).end-x.start,I+=x.codingpasses
var O=new Uint8Array(P),E=0
for(S=0,C=_.length;S<C;S++){var T=(x=_[S]).data.subarray(x.start,x.end)
O.set(T,E),E+=T.length}var F=new i.ArithmeticDecoder(O,0,P)
for(w.setDecoder(F),S=0;S<I;S++){switch(k){case 0:w.runSignificancePropagationPass()
break
case 1:w.runMagnitudeRefinementPass()
break
case 2:w.runCleanupPass(),c&&w.checkSegmentationSymbol()}k=(k+1)%3}var R,B,D,M=v.tbx0_-l+(v.tby0_-u)*h,L=w.coefficentsSign,N=w.coefficentsMagnitude,U=w.bitsDecoded,q=s?0:.5
E=0
var j="LL"!==a.type
for(S=0;S<y;S++){var z=2*(M/h|0)*(t-h)+d+g
for(R=0;R<b;R++){if(0!==(B=N[E]))B=(B+q)*n,0!==L[E]&&(B=-B),D=U[E],e[j?z+(M<<1):M]=s&&D>=o?B:B*(1<<o-D)
M++,E++}M+=h-b}}}}function k(t,r,a){for(var i=r.components[a],n=i.codingStyleParameters,o=i.quantizationParameters,s=n.decompositionLevelsCount,c=o.SPqcds,l=o.scalarExpounded,u=o.guardBits,h=n.segmentationSymbolUsed,f=t.components[a].precision,d=n.reversibleTransformation,g=d?new I:new P,m=[],p=0,v=0;v<=s;v++){for(var b=i.resolutions[v],y=b.trx1-b.trx0,k=b.try1-b.try0,S=new Float32Array(y*k),C=0,x=b.subbands.length;C<x;C++){var A,_
l?(A=c[p].mu,_=c[p].epsilon,p++):(A=c[0].mu,_=c[0].epsilon+(v>0?1-v:0))
var O=b.subbands[C],E=e[O.type]
w(S,y,0,O,d?1:Math.pow(2,f+E-_)*(1+A/2048),u+_-1,d,h)}m.push({width:y,height:k,items:S})}var T=g.calculate(m,i.tcx0,i.tcy0)
return{left:i.tcx0,top:i.tcy0,width:T.width,height:T.height,items:T.items}}function S(e,t){for(var r=e.SIZ.Csiz,a=e.tiles[t],i=0;i<r;i++){var n=a.components[i],o=void 0!==e.currentTile.QCC[i]?e.currentTile.QCC[i]:e.currentTile.QCD
n.quantizationParameters=o
var s=void 0!==e.currentTile.COC[i]?e.currentTile.COC[i]:e.currentTile.COD
n.codingStyleParameters=s}a.codingStyleDefaultParameters=e.currentTile.COD}t.prototype={parse:function(e){if(65359!==(0,a.readUint16)(e,0))for(var t=0,r=e.length;t<r;){var i=8,o=(0,a.readUint32)(e,t),s=(0,a.readUint32)(e,t+4)
if(t+=i,1===o&&(o=4294967296*(0,a.readUint32)(e,t)+(0,a.readUint32)(e,t+4),t+=8,i+=8),0===o&&(o=r-t+i),o<i)throw new n("Invalid box field size")
var c=o-i,l=!0
switch(s){case 1785737832:l=!1
break
case 1668246642:var u=e[t]
if(1===u){var h=(0,a.readUint32)(e,t+3)
switch(h){case 16:case 17:case 18:break
default:(0,a.warn)("Unknown colorspace "+h)}}else 2===u&&(0,a.info)("ICC profile not supported")
break
case 1785737827:this.parseCodestream(e,t,t+c)
break
case 1783636e3:218793738!==(0,a.readUint32)(e,t)&&(0,a.warn)("Invalid JP2 signature")
break
case 1783634458:case 1718909296:case 1920099697:case 1919251232:case 1768449138:break
default:var f=String.fromCharCode(s>>24&255,s>>16&255,s>>8&255,255&s);(0,a.warn)("Unsupported header type "+s+" ("+f+")")}l&&(t+=c)}else this.parseCodestream(e,0,e.length)},parseImageProperties:function(e){for(var t=e.getByte();t>=0;)if(65361==(t<<8|(t=e.getByte()))){e.skip(4)
var r=e.getInt32()>>>0,a=e.getInt32()>>>0,i=e.getInt32()>>>0,o=e.getInt32()>>>0
e.skip(16)
var s=e.getUint16()
return this.width=r-i,this.height=a-o,this.componentsCount=s,void(this.bitsPerComponent=8)}throw new n("No size marker found in JPX stream")},parseCodestream:function(e,t,i){var s={},c=!1
try{for(var l=t;l+1<i;){var u=(0,a.readUint16)(e,l)
l+=2
var h,f,d,g,m,p,v=0
switch(u){case 65359:s.mainHeader=!0
break
case 65497:break
case 65361:v=(0,a.readUint16)(e,l)
var w={}
w.Xsiz=(0,a.readUint32)(e,l+4),w.Ysiz=(0,a.readUint32)(e,l+8),w.XOsiz=(0,a.readUint32)(e,l+12),w.YOsiz=(0,a.readUint32)(e,l+16),w.XTsiz=(0,a.readUint32)(e,l+20),w.YTsiz=(0,a.readUint32)(e,l+24),w.XTOsiz=(0,a.readUint32)(e,l+28),w.YTOsiz=(0,a.readUint32)(e,l+32)
var C=(0,a.readUint16)(e,l+36)
w.Csiz=C
var x=[]
h=l+38
for(var A=0;A<C;A++){var _={precision:1+(127&e[h]),isSigned:!!(128&e[h]),XRsiz:e[h+1],YRsiz:e[h+2]}
h+=3,r(_,w),x.push(_)}s.SIZ=w,s.components=x,o(s,x),s.QCC=[],s.COC=[]
break
case 65372:v=(0,a.readUint16)(e,l)
var P={}
switch(h=l+2,31&(f=e[h++])){case 0:g=8,m=!0
break
case 1:g=16,m=!1
break
case 2:g=16,m=!0
break
default:throw new Error("Invalid SQcd value "+f)}for(P.noQuantization=8===g,P.scalarExpounded=m,P.guardBits=f>>5,d=[];h<v+l;){var I={}
8===g?(I.epsilon=e[h++]>>3,I.mu=0):(I.epsilon=e[h]>>3,I.mu=(7&e[h])<<8|e[h+1],h+=2),d.push(I)}P.SPqcds=d,s.mainHeader?s.QCD=P:(s.currentTile.QCD=P,s.currentTile.QCC=[])
break
case 65373:v=(0,a.readUint16)(e,l)
var O,E={}
switch(h=l+2,s.SIZ.Csiz<257?O=e[h++]:(O=(0,a.readUint16)(e,h),h+=2),31&(f=e[h++])){case 0:g=8,m=!0
break
case 1:g=16,m=!1
break
case 2:g=16,m=!0
break
default:throw new Error("Invalid SQcd value "+f)}for(E.noQuantization=8===g,E.scalarExpounded=m,E.guardBits=f>>5,d=[];h<v+l;)I={},8===g?(I.epsilon=e[h++]>>3,I.mu=0):(I.epsilon=e[h]>>3,I.mu=(7&e[h])<<8|e[h+1],h+=2),d.push(I)
E.SPqcds=d,s.mainHeader?s.QCC[O]=E:s.currentTile.QCC[O]=E
break
case 65362:v=(0,a.readUint16)(e,l)
var T={}
h=l+2
var F=e[h++]
T.entropyCoderWithCustomPrecincts=!!(1&F),T.sopMarkerUsed=!!(2&F),T.ephMarkerUsed=!!(4&F),T.progressionOrder=e[h++],T.layersCount=(0,a.readUint16)(e,h),h+=2,T.multipleComponentTransform=e[h++],T.decompositionLevelsCount=e[h++],T.xcb=2+(15&e[h++]),T.ycb=2+(15&e[h++])
var R=e[h++]
if(T.selectiveArithmeticCodingBypass=!!(1&R),T.resetContextProbabilities=!!(2&R),T.terminationOnEachCodingPass=!!(4&R),T.verticallyStripe=!!(8&R),T.predictableTermination=!!(16&R),T.segmentationSymbolUsed=!!(32&R),T.reversibleTransformation=e[h++],T.entropyCoderWithCustomPrecincts){for(var B=[];h<v+l;){var D=e[h++]
B.push({PPx:15&D,PPy:D>>4})}T.precinctsSizes=B}var M=[]
if(T.selectiveArithmeticCodingBypass&&M.push("selectiveArithmeticCodingBypass"),T.resetContextProbabilities&&M.push("resetContextProbabilities"),T.terminationOnEachCodingPass&&M.push("terminationOnEachCodingPass"),T.verticallyStripe&&M.push("verticallyStripe"),T.predictableTermination&&M.push("predictableTermination"),M.length>0)throw c=!0,new Error("Unsupported COD options ("+M.join(", ")+")")
s.mainHeader?s.COD=T:(s.currentTile.COD=T,s.currentTile.COC=[])
break
case 65424:v=(0,a.readUint16)(e,l),(p={}).index=(0,a.readUint16)(e,l+2),p.length=(0,a.readUint32)(e,l+4),p.dataEnd=p.length+l-2,p.partIndex=e[l+8],p.partsCount=e[l+9],s.mainHeader=!1,0===p.partIndex&&(p.COD=s.COD,p.COC=s.COC.slice(0),p.QCD=s.QCD,p.QCC=s.QCC.slice(0)),s.currentTile=p
break
case 65427:0===(p=s.currentTile).partIndex&&(S(s,p.index),b(s)),y(s,e,l,v=p.dataEnd-l)
break
case 65365:case 65367:case 65368:case 65380:v=(0,a.readUint16)(e,l)
break
case 65363:throw new Error("Codestream code 0xFF53 (COC) is not implemented")
default:throw new Error("Unknown codestream code: "+u.toString(16))}l+=v}}catch(e){if(c||this.failOnCorruptedImage)throw new n(e.message);(0,a.warn)("JPX: Trying to recover from: "+e.message)}this.tiles=function(e){for(var t=e.SIZ,r=e.components,a=t.Csiz,i=[],n=0,o=e.tiles.length;n<o;n++){var s,c=e.tiles[n],l=[]
for(s=0;s<a;s++)l[s]=k(e,c,s)
var u,h,f,d,g,m,p,v=l[0],b=new Uint8ClampedArray(v.items.length*a),y={left:v.left,top:v.top,width:v.width,height:v.height,items:b},w=0
if(c.codingStyleDefaultParameters.multipleComponentTransform){var S=4===a,C=l[0].items,x=l[1].items,A=l[2].items,_=S?l[3].items:null
h=.5+(128<<(u=r[0].precision-8))
var P=c.components[0],I=a-3
if(d=C.length,P.codingStyleParameters.reversibleTransformation)for(f=0;f<d;f++,w+=I){g=C[f]+h,m=x[f]
var O=g-((p=A[f])+m>>2)
b[w++]=O+p>>u,b[w++]=O>>u,b[w++]=O+m>>u}else for(f=0;f<d;f++,w+=I)g=C[f]+h,m=x[f],p=A[f],b[w++]=g+1.402*p>>u,b[w++]=g-.34413*m-.71414*p>>u,b[w++]=g+1.772*m>>u
if(S)for(f=0,w=3;f<d;f++,w+=4)b[w]=_[f]+h>>u}else for(s=0;s<a;s++){var E=l[s].items
for(h=.5+(128<<(u=r[s].precision-8)),w=s,f=0,d=E.length;f<d;f++)b[w]=E[f]+h>>u,w+=a}i.push(y)}return i}(s),this.width=s.SIZ.Xsiz-s.SIZ.XOsiz,this.height=s.SIZ.Ysiz-s.SIZ.YOsiz,this.componentsCount=s.SIZ.Csiz}}
var C=function(){function e(e,t){var r=(0,a.log2)(Math.max(e,t))+1
this.levels=[]
for(var i=0;i<r;i++){var n={width:e,height:t,items:[]}
this.levels.push(n),e=Math.ceil(e/2),t=Math.ceil(t/2)}}return e.prototype={reset:function(e,t){for(var r,a=0,i=0;a<this.levels.length;){var n=e+t*(r=this.levels[a]).width
if(void 0!==r.items[n]){i=r.items[n]
break}r.index=n,e>>=1,t>>=1,a++}a--,(r=this.levels[a]).items[r.index]=i,this.currentLevel=a,delete this.value},incrementValue:function(){var e=this.levels[this.currentLevel]
e.items[e.index]++},nextLevel:function(){var e=this.currentLevel,t=this.levels[e],r=t.items[t.index]
return--e<0?(this.value=r,!1):(this.currentLevel=e,(t=this.levels[e]).items[t.index]=r,!0)}},e}(),x=function(){function e(e,t,r){var i=(0,a.log2)(Math.max(e,t))+1
this.levels=[]
for(var n=0;n<i;n++){for(var o=new Uint8Array(e*t),s=0,c=o.length;s<c;s++)o[s]=r
var l={width:e,height:t,items:o}
this.levels.push(l),e=Math.ceil(e/2),t=Math.ceil(t/2)}}return e.prototype={reset:function(e,t,r){for(var a=0;a<this.levels.length;){var i=this.levels[a],n=e+t*i.width
i.index=n
var o=i.items[n]
if(255===o)break
if(o>r)return this.currentLevel=a,this.propagateValues(),!1
e>>=1,t>>=1,a++}return this.currentLevel=a-1,!0},incrementValue:function(e){var t=this.levels[this.currentLevel]
t.items[t.index]=e+1,this.propagateValues()},propagateValues:function(){for(var e=this.currentLevel,t=this.levels[e],r=t.items[t.index];--e>=0;)(t=this.levels[e]).items[t.index]=r},nextLevel:function(){var e=this.currentLevel,t=this.levels[e],r=t.items[t.index]
return t.items[t.index]=255,!(--e<0)&&(this.currentLevel=e,(t=this.levels[e]).items[t.index]=r,!0)}},e}(),A=function(){var e=new Uint8Array([0,5,8,0,3,7,8,0,4,7,8,0,0,0,0,0,1,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8,0,0,0,0,0,2,6,8,0,3,7,8,0,4,7,8]),t=new Uint8Array([0,3,4,0,5,7,7,0,8,8,8,0,0,0,0,0,1,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8,0,0,0,0,0,2,3,4,0,6,7,7,0,8,8,8]),r=new Uint8Array([0,1,2,0,1,2,2,0,2,2,2,0,0,0,0,0,3,4,5,0,4,5,5,0,5,5,5,0,0,0,0,0,6,7,7,0,7,7,7,0,7,7,7,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8,0,0,0,0,0,8,8,8,0,8,8,8,0,8,8,8])
function a(a,i,n,o,s){this.width=a,this.height=i,this.contextLabelTable="HH"===n?r:"HL"===n?t:e
var c=a*i
this.neighborsSignificance=new Uint8Array(c),this.coefficentsSign=new Uint8Array(c),this.coefficentsMagnitude=s>14?new Uint32Array(c):s>6?new Uint16Array(c):new Uint8Array(c),this.processingFlags=new Uint8Array(c)
var l=new Uint8Array(c)
if(0!==o)for(var u=0;u<c;u++)l[u]=o
this.bitsDecoded=l,this.reset()}return a.prototype={setDecoder:function(e){this.decoder=e},reset:function(){this.contexts=new Int8Array(19),this.contexts[0]=8,this.contexts[17]=92,this.contexts[18]=6},setNeighborsSignificance:function(e,t,r){var a,i=this.neighborsSignificance,n=this.width,o=this.height,s=t>0,c=t+1<n
e>0&&(a=r-n,s&&(i[a-1]+=16),c&&(i[a+1]+=16),i[a]+=4),e+1<o&&(a=r+n,s&&(i[a-1]+=16),c&&(i[a+1]+=16),i[a]+=4),s&&(i[r-1]+=1),c&&(i[r+1]+=1),i[r]|=128},runSignificancePropagationPass:function(){for(var e=this.decoder,t=this.width,r=this.height,a=this.coefficentsMagnitude,i=this.coefficentsSign,n=this.neighborsSignificance,o=this.processingFlags,s=this.contexts,c=this.contextLabelTable,l=this.bitsDecoded,u=0;u<r;u+=4)for(var h=0;h<t;h++)for(var f=u*t+h,d=0;d<4;d++,f+=t){var g=u+d
if(g>=r)break
if(o[f]&=-2,!a[f]&&n[f]){var m=c[n[f]]
if(e.readBit(s,m)){var p=this.decodeSignBit(g,h,f)
i[f]=p,a[f]=1,this.setNeighborsSignificance(g,h,f),o[f]|=2}l[f]++,o[f]|=1}}},decodeSignBit:function(e,t,r){var a,i,n,o,s,c,l=this.width,u=this.height,h=this.coefficentsMagnitude,f=this.coefficentsSign
o=t>0&&0!==h[r-1],t+1<l&&0!==h[r+1]?(n=f[r+1],a=o?1-n-(i=f[r-1]):1-n-n):a=o?1-(i=f[r-1])-i:0
var d=3*a
return o=e>0&&0!==h[r-l],e+1<u&&0!==h[r+l]?(n=f[r+l],a=o?1-n-(i=f[r-l])+d:1-n-n+d):a=o?1-(i=f[r-l])-i+d:d,a>=0?(s=9+a,c=this.decoder.readBit(this.contexts,s)):(s=9-a,c=1^this.decoder.readBit(this.contexts,s)),c},runMagnitudeRefinementPass:function(){for(var e,t=this.decoder,r=this.width,a=this.height,i=this.coefficentsMagnitude,n=this.neighborsSignificance,o=this.contexts,s=this.bitsDecoded,c=this.processingFlags,l=r*a,u=4*r,h=0;h<l;h=e){e=Math.min(l,h+u)
for(var f=0;f<r;f++)for(var d=h+f;d<e;d+=r)if(i[d]&&0==(1&c[d])){var g=16
0!=(2&c[d])&&(c[d]^=2,g=0==(127&n[d])?15:14)
var m=t.readBit(o,g)
i[d]=i[d]<<1|m,s[d]++,c[d]|=1}}},runCleanupPass:function(){for(var e,t=this.decoder,r=this.width,a=this.height,i=this.neighborsSignificance,n=this.coefficentsMagnitude,o=this.coefficentsSign,s=this.contexts,c=this.contextLabelTable,l=this.bitsDecoded,u=this.processingFlags,h=r,f=2*r,d=3*r,g=0;g<a;g=e){e=Math.min(g+4,a)
for(var m=g*r,p=g+3<a,v=0;v<r;v++){var b,y=m+v,w=0,k=y,S=g
if(p&&0===u[y]&&0===u[y+h]&&0===u[y+f]&&0===u[y+d]&&0===i[y]&&0===i[y+h]&&0===i[y+f]&&0===i[y+d]){if(!t.readBit(s,18)){l[y]++,l[y+h]++,l[y+f]++,l[y+d]++
continue}0!=(w=t.readBit(s,17)<<1|t.readBit(s,17))&&(S=g+w,k+=w*r),b=this.decodeSignBit(S,v,k),o[k]=b,n[k]=1,this.setNeighborsSignificance(S,v,k),u[k]|=2,k=y
for(var C=g;C<=S;C++,k+=r)l[k]++
w++}for(S=g+w;S<e;S++,k+=r)if(!n[k]&&0==(1&u[k])){var x=c[i[k]]
1===t.readBit(s,x)&&(b=this.decodeSignBit(S,v,k),o[k]=b,n[k]=1,this.setNeighborsSignificance(S,v,k),u[k]|=2),l[k]++}}}},checkSegmentationSymbol:function(){var e=this.decoder,t=this.contexts
if(10!=(e.readBit(t,17)<<3|e.readBit(t,17)<<2|e.readBit(t,17)<<1|e.readBit(t,17)))throw new n("Invalid segmentation symbol")}},a}(),_=function(){function e(){}return e.prototype.calculate=function(e,t,r){for(var a=e[0],i=1,n=e.length;i<n;i++)a=this.iterate(a,e[i],t,r)
return a},e.prototype.extend=function(e,t,r){var a=t-1,i=t+1,n=t+r-2,o=t+r
e[a--]=e[i++],e[o++]=e[n--],e[a--]=e[i++],e[o++]=e[n--],e[a--]=e[i++],e[o++]=e[n--],e[a]=e[i],e[o]=e[n]},e.prototype.iterate=function(e,t,r,a){var i,n,o,s,c,l,u=e.width,h=e.height,f=e.items,d=t.width,g=t.height,m=t.items
for(o=0,i=0;i<h;i++)for(s=2*i*d,n=0;n<u;n++,o++,s+=2)m[s]=f[o]
f=e.items=null
var p=new Float32Array(d+8)
if(1===d){if(0!=(1&r))for(l=0,o=0;l<g;l++,o+=d)m[o]*=.5}else for(l=0,o=0;l<g;l++,o+=d)p.set(m.subarray(o,o+d),4),this.extend(p,4,d),this.filter(p,4,d),m.set(p.subarray(4,4+d),o)
var v=16,b=[]
for(i=0;i<v;i++)b.push(new Float32Array(g+8))
var y,w=0
if(e=4+g,1===g){if(0!=(1&a))for(c=0;c<d;c++)m[c]*=.5}else for(c=0;c<d;c++){if(0===w){for(v=Math.min(d-c,v),o=c,s=4;s<e;o+=d,s++)for(y=0;y<v;y++)b[y][s]=m[o+y]
w=v}var k=b[--w]
if(this.extend(k,4,g),this.filter(k,4,g),0===w)for(o=c-v+1,s=4;s<e;o+=d,s++)for(y=0;y<v;y++)m[o+y]=b[y][s]}return{width:d,height:g,items:m}},e}(),P=function(){function e(){_.call(this)}return e.prototype=Object.create(_.prototype),e.prototype.filter=function(e,t,r){var a,i,n,o,s=r>>1,c=-1.586134342059924,l=-.052980118572961,u=.882911075530934,h=.443506852043971,f=1.230174104914001
for(a=(t|=0)-3,i=s+4;i--;a+=2)e[a]*=.8128930661159609
for(n=h*e[(a=t-2)-1],i=s+3;i--&&(o=h*e[a+1],e[a]=f*e[a]-n-o,i--);a+=2)n=h*e[(a+=2)+1],e[a]=f*e[a]-n-o
for(n=u*e[(a=t-1)-1],i=s+2;i--&&(o=u*e[a+1],e[a]-=n+o,i--);a+=2)n=u*e[(a+=2)+1],e[a]-=n+o
for(n=l*e[(a=t)-1],i=s+1;i--&&(o=l*e[a+1],e[a]-=n+o,i--);a+=2)n=l*e[(a+=2)+1],e[a]-=n+o
if(0!==s)for(n=c*e[(a=t+1)-1],i=s;i--&&(o=c*e[a+1],e[a]-=n+o,i--);a+=2)n=c*e[(a+=2)+1],e[a]-=n+o},e}(),I=function(){function e(){_.call(this)}return e.prototype=Object.create(_.prototype),e.prototype.filter=function(e,t,r){var a,i,n=r>>1
for(a=t|=0,i=n+1;i--;a+=2)e[a]-=e[a-1]+e[a+1]+2>>2
for(a=t+1,i=n;i--;a+=2)e[a]+=e[a-1]+e[a+1]>>1},e}()
return t}()
t.JpxImage=o},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.calculateSHA512=t.calculateSHA384=t.calculateSHA256=t.calculateMD5=t.PDF20=t.PDF17=t.CipherTransformFactory=t.ARCFourCipher=t.AES256Cipher=t.AES128Cipher=void 0
var a=r(6),i=r(155),n=r(157)
function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t){return!t||"object"!==o(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t,r){return t&&h(e.prototype,t),r&&h(e,r),e}var d=function(){function e(e){this.a=0,this.b=0
var t,r,a=new Uint8Array(256),i=0,n=e.length
for(t=0;t<256;++t)a[t]=t
for(t=0;t<256;++t)i=i+(r=a[t])+e[t%n]&255,a[t]=a[i],a[i]=r
this.s=a}return e.prototype={encryptBlock:function(e){var t,r,a,i=e.length,n=this.a,o=this.b,s=this.s,c=new Uint8Array(i)
for(t=0;t<i;++t)a=s[o=o+(r=s[n=n+1&255])&255],s[n]=a,s[o]=r,c[t]=e[t]^s[r+a&255]
return this.a=n,this.b=o,c}},e.prototype.decryptBlock=e.prototype.encryptBlock,e}()
t.ARCFourCipher=d
var g=function(){var e=new Uint8Array([7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]),t=new Int32Array([-680876936,-389564586,606105819,-1044525330,-176418897,1200080426,-1473231341,-45705983,1770035416,-1958414417,-42063,-1990404162,1804603682,-40341101,-1502002290,1236535329,-165796510,-1069501632,643717713,-373897302,-701558691,38016083,-660478335,-405537848,568446438,-1019803690,-187363961,1163531501,-1444681467,-51403784,1735328473,-1926607734,-378558,-2022574463,1839030562,-35309556,-1530992060,1272893353,-155497632,-1094730640,681279174,-358537222,-722521979,76029189,-640364487,-421815835,530742520,-995338651,-198630844,1126891415,-1416354905,-57434055,1700485571,-1894986606,-1051523,-2054922799,1873313359,-30611744,-1560198380,1309151649,-145523070,-1120210379,718787259,-343485551])
return function(r,a,i){var n,o,s,c=1732584193,l=-271733879,u=-1732584194,h=271733878,f=i+72&-64,d=new Uint8Array(f)
for(n=0;n<i;++n)d[n]=r[a++]
for(d[n++]=128,s=f-8;n<s;)d[n++]=0
d[n++]=i<<3&255,d[n++]=i>>5&255,d[n++]=i>>13&255,d[n++]=i>>21&255,d[n++]=i>>>29&255,d[n++]=0,d[n++]=0,d[n++]=0
var g=new Int32Array(16)
for(n=0;n<f;){for(o=0;o<16;++o,n+=4)g[o]=d[n]|d[n+1]<<8|d[n+2]<<16|d[n+3]<<24
var m,p,v=c,b=l,y=u,w=h
for(o=0;o<64;++o){o<16?(m=b&y|~b&w,p=o):o<32?(m=w&b|~w&y,p=5*o+1&15):o<48?(m=b^y^w,p=3*o+5&15):(m=y^(b|~w),p=7*o&15)
var k=w,S=v+m+t[o]+g[p]|0,C=e[o]
w=y,y=b,b=b+(S<<C|S>>>32-C)|0,v=k}c=c+v|0,l=l+b|0,u=u+y|0,h=h+w|0}return new Uint8Array([255&c,c>>8&255,c>>16&255,c>>>24&255,255&l,l>>8&255,l>>16&255,l>>>24&255,255&u,u>>8&255,u>>16&255,u>>>24&255,255&h,h>>8&255,h>>16&255,h>>>24&255])}}()
t.calculateMD5=g
var m=function(){function e(e,t){this.high=0|e,this.low=0|t}return e.prototype={and:function(e){this.high&=e.high,this.low&=e.low},xor:function(e){this.high^=e.high,this.low^=e.low},or:function(e){this.high|=e.high,this.low|=e.low},shiftRight:function(e){e>=32?(this.low=this.high>>>e-32|0,this.high=0):(this.low=this.low>>>e|this.high<<32-e,this.high=this.high>>>e|0)},shiftLeft:function(e){e>=32?(this.high=this.low<<e-32,this.low=0):(this.high=this.high<<e|this.low>>>32-e,this.low=this.low<<e)},rotateRight:function(e){var t,r
32&e?(r=this.low,t=this.high):(t=this.low,r=this.high),e&=31,this.low=t>>>e|r<<32-e,this.high=r>>>e|t<<32-e},not:function(){this.high=~this.high,this.low=~this.low},add:function(e){var t=(this.low>>>0)+(e.low>>>0),r=(this.high>>>0)+(e.high>>>0)
t>4294967295&&(r+=1),this.low=0|t,this.high=0|r},copyTo:function(e,t){e[t]=this.high>>>24&255,e[t+1]=this.high>>16&255,e[t+2]=this.high>>8&255,e[t+3]=255&this.high,e[t+4]=this.low>>>24&255,e[t+5]=this.low>>16&255,e[t+6]=this.low>>8&255,e[t+7]=255&this.low},assign:function(e){this.high=e.high,this.low=e.low}},e}(),p=function(){function e(e,t){return e>>>t|e<<32-t}function t(e,t,r){return e&t^~e&r}function r(e,t,r){return e&t^e&r^t&r}function a(t){return e(t,2)^e(t,13)^e(t,22)}function i(t){return e(t,6)^e(t,11)^e(t,25)}function n(t){return e(t,7)^e(t,18)^t>>>3}var o=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]
return function(s,c,l){var u,h,f,d=1779033703,g=3144134277,m=1013904242,p=2773480762,v=1359893119,b=2600822924,y=528734635,w=1541459225,k=64*Math.ceil((l+9)/64),S=new Uint8Array(k)
for(u=0;u<l;++u)S[u]=s[c++]
for(S[u++]=128,f=k-8;u<f;)S[u++]=0
S[u++]=0,S[u++]=0,S[u++]=0,S[u++]=l>>>29&255,S[u++]=l>>21&255,S[u++]=l>>13&255,S[u++]=l>>5&255,S[u++]=l<<3&255
var C,x=new Uint32Array(64)
for(u=0;u<k;){for(h=0;h<16;++h)x[h]=S[u]<<24|S[u+1]<<16|S[u+2]<<8|S[u+3],u+=4
for(h=16;h<64;++h)x[h]=(e(C=x[h-2],17)^e(C,19)^C>>>10)+x[h-7]+n(x[h-15])+x[h-16]|0
var A,_,P=d,I=g,O=m,E=p,T=v,F=b,R=y,B=w
for(h=0;h<64;++h)A=B+i(T)+t(T,F,R)+o[h]+x[h],_=a(P)+r(P,I,O),B=R,R=F,F=T,T=E+A|0,E=O,O=I,I=P,P=A+_|0
d=d+P|0,g=g+I|0,m=m+O|0,p=p+E|0,v=v+T|0,b=b+F|0,y=y+R|0,w=w+B|0}return new Uint8Array([d>>24&255,d>>16&255,d>>8&255,255&d,g>>24&255,g>>16&255,g>>8&255,255&g,m>>24&255,m>>16&255,m>>8&255,255&m,p>>24&255,p>>16&255,p>>8&255,255&p,v>>24&255,v>>16&255,v>>8&255,255&v,b>>24&255,b>>16&255,b>>8&255,255&b,y>>24&255,y>>16&255,y>>8&255,255&y,w>>24&255,w>>16&255,w>>8&255,255&w])}}()
t.calculateSHA256=p
var v=function(){function e(e,t,r,a,i){e.assign(t),e.and(r),i.assign(t),i.not(),i.and(a),e.xor(i)}function t(e,t,r,a,i){e.assign(t),e.and(r),i.assign(t),i.and(a),e.xor(i),i.assign(r),i.and(a),e.xor(i)}function r(e,t,r){e.assign(t),e.rotateRight(28),r.assign(t),r.rotateRight(34),e.xor(r),r.assign(t),r.rotateRight(39),e.xor(r)}function a(e,t,r){e.assign(t),e.rotateRight(14),r.assign(t),r.rotateRight(18),e.xor(r),r.assign(t),r.rotateRight(41),e.xor(r)}function i(e,t,r){e.assign(t),e.rotateRight(1),r.assign(t),r.rotateRight(8),e.xor(r),r.assign(t),r.shiftRight(7),e.xor(r)}function n(e,t,r){e.assign(t),e.rotateRight(19),r.assign(t),r.rotateRight(61),e.xor(r),r.assign(t),r.shiftRight(6),e.xor(r)}var o=[new m(1116352408,3609767458),new m(1899447441,602891725),new m(3049323471,3964484399),new m(3921009573,2173295548),new m(961987163,4081628472),new m(1508970993,3053834265),new m(2453635748,2937671579),new m(2870763221,3664609560),new m(3624381080,2734883394),new m(310598401,1164996542),new m(607225278,1323610764),new m(1426881987,3590304994),new m(1925078388,4068182383),new m(2162078206,991336113),new m(2614888103,633803317),new m(3248222580,3479774868),new m(3835390401,2666613458),new m(4022224774,944711139),new m(264347078,2341262773),new m(604807628,2007800933),new m(770255983,1495990901),new m(1249150122,1856431235),new m(1555081692,3175218132),new m(1996064986,2198950837),new m(2554220882,3999719339),new m(2821834349,766784016),new m(2952996808,2566594879),new m(3210313671,3203337956),new m(3336571891,1034457026),new m(3584528711,2466948901),new m(113926993,3758326383),new m(338241895,168717936),new m(666307205,1188179964),new m(773529912,1546045734),new m(1294757372,1522805485),new m(1396182291,2643833823),new m(1695183700,2343527390),new m(1986661051,1014477480),new m(2177026350,1206759142),new m(2456956037,344077627),new m(2730485921,1290863460),new m(2820302411,3158454273),new m(3259730800,3505952657),new m(3345764771,106217008),new m(3516065817,3606008344),new m(3600352804,1432725776),new m(4094571909,1467031594),new m(275423344,851169720),new m(430227734,3100823752),new m(506948616,1363258195),new m(659060556,3750685593),new m(883997877,3785050280),new m(958139571,3318307427),new m(1322822218,3812723403),new m(1537002063,2003034995),new m(1747873779,3602036899),new m(1955562222,1575990012),new m(2024104815,1125592928),new m(2227730452,2716904306),new m(2361852424,442776044),new m(2428436474,593698344),new m(2756734187,3733110249),new m(3204031479,2999351573),new m(3329325298,3815920427),new m(3391569614,3928383900),new m(3515267271,566280711),new m(3940187606,3454069534),new m(4118630271,4000239992),new m(116418474,1914138554),new m(174292421,2731055270),new m(289380356,3203993006),new m(460393269,320620315),new m(685471733,587496836),new m(852142971,1086792851),new m(1017036298,365543100),new m(1126000580,2618297676),new m(1288033470,3409855158),new m(1501505948,4234509866),new m(1607167915,987167468),new m(1816402316,1246189591)]
return function(s,c,l,u){var h,f,d,g,p,v,b,y;(u=!!u)?(h=new m(3418070365,3238371032),f=new m(1654270250,914150663),d=new m(2438529370,812702999),g=new m(355462360,4144912697),p=new m(1731405415,4290775857),v=new m(2394180231,1750603025),b=new m(3675008525,1694076839),y=new m(1203062813,3204075428)):(h=new m(1779033703,4089235720),f=new m(3144134277,2227873595),d=new m(1013904242,4271175723),g=new m(2773480762,1595750129),p=new m(1359893119,2917565137),v=new m(2600822924,725511199),b=new m(528734635,4215389547),y=new m(1541459225,327033209))
var w,k,S,C=128*Math.ceil((l+17)/128),x=new Uint8Array(C)
for(w=0;w<l;++w)x[w]=s[c++]
for(x[w++]=128,S=C-16;w<S;)x[w++]=0
x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=0,x[w++]=l>>>29&255,x[w++]=l>>21&255,x[w++]=l>>13&255,x[w++]=l>>5&255,x[w++]=l<<3&255
var A=new Array(80)
for(w=0;w<80;w++)A[w]=new m(0,0)
var _,P,I=new m(0,0),O=new m(0,0),E=new m(0,0),T=new m(0,0),F=new m(0,0),R=new m(0,0),B=new m(0,0),D=new m(0,0),M=new m(0,0),L=new m(0,0),N=new m(0,0),U=new m(0,0)
for(w=0;w<C;){for(k=0;k<16;++k)A[k].high=x[w]<<24|x[w+1]<<16|x[w+2]<<8|x[w+3],A[k].low=x[w+4]<<24|x[w+5]<<16|x[w+6]<<8|x[w+7],w+=8
for(k=16;k<80;++k)n(_=A[k],A[k-2],U),_.add(A[k-7]),i(N,A[k-15],U),_.add(N),_.add(A[k-16])
for(I.assign(h),O.assign(f),E.assign(d),T.assign(g),F.assign(p),R.assign(v),B.assign(b),D.assign(y),k=0;k<80;++k)M.assign(D),a(N,F,U),M.add(N),e(N,F,R,B,U),M.add(N),M.add(o[k]),M.add(A[k]),r(L,I,U),t(N,I,O,E,U),L.add(N),_=D,D=B,B=R,R=F,T.add(M),F=T,T=E,E=O,O=I,_.assign(M),_.add(L),I=_
h.add(I),f.add(O),d.add(E),g.add(T),p.add(F),v.add(R),b.add(B),y.add(D)}return u?(P=new Uint8Array(48),h.copyTo(P,0),f.copyTo(P,8),d.copyTo(P,16),g.copyTo(P,24),p.copyTo(P,32),v.copyTo(P,40)):(P=new Uint8Array(64),h.copyTo(P,0),f.copyTo(P,8),d.copyTo(P,16),g.copyTo(P,24),p.copyTo(P,32),v.copyTo(P,40),b.copyTo(P,48),y.copyTo(P,56)),P}}()
t.calculateSHA512=v
var b=function(e,t,r){return v(e,t,r,!0)}
t.calculateSHA384=b
var y=function(){function e(){}return e.prototype={decryptBlock:function(e){return e}},e}(),w=function(){function e(){u(this,e),this.constructor===e&&(0,a.unreachable)("Cannot initialize AESBaseCipher."),this._s=new Uint8Array([99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22]),this._inv_s=new Uint8Array([82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125]),this._mix=new Uint32Array([0,235474187,470948374,303765277,941896748,908933415,607530554,708780849,1883793496,2118214995,1817866830,1649639237,1215061108,1181045119,1417561698,1517767529,3767586992,4003061179,4236429990,4069246893,3635733660,3602770327,3299278474,3400528769,2430122216,2664543715,2362090238,2193862645,2835123396,2801107407,3035535058,3135740889,3678124923,3576870512,3341394285,3374361702,3810496343,3977675356,4279080257,4043610186,2876494627,2776292904,3076639029,3110650942,2472011535,2640243204,2403728665,2169303058,1001089995,899835584,666464733,699432150,59727847,226906860,530400753,294930682,1273168787,1172967064,1475418501,1509430414,1942435775,2110667444,1876241833,1641816226,2910219766,2743034109,2976151520,3211623147,2505202138,2606453969,2302690252,2269728455,3711829422,3543599269,3240894392,3475313331,3843699074,3943906441,4178062228,4144047775,1306967366,1139781709,1374988112,1610459739,1975683434,2076935265,1775276924,1742315127,1034867998,866637845,566021896,800440835,92987698,193195065,429456164,395441711,1984812685,2017778566,1784663195,1683407248,1315562145,1080094634,1383856311,1551037884,101039829,135050206,437757123,337553864,1042385657,807962610,573804783,742039012,2531067453,2564033334,2328828971,2227573024,2935566865,2700099354,3001755655,3168937228,3868552805,3902563182,4203181171,4102977912,3736164937,3501741890,3265478751,3433712980,1106041591,1340463100,1576976609,1408749034,2043211483,2009195472,1708848333,1809054150,832877231,1068351396,766945465,599762354,159417987,126454664,361929877,463180190,2709260871,2943682380,3178106961,3009879386,2572697195,2538681184,2236228733,2336434550,3509871135,3745345300,3441850377,3274667266,3910161971,3877198648,4110568485,4211818798,2597806476,2497604743,2261089178,2295101073,2733856160,2902087851,3202437046,2968011453,3936291284,3835036895,4136440770,4169408201,3535486456,3702665459,3467192302,3231722213,2051518780,1951317047,1716890410,1750902305,1113818384,1282050075,1584504582,1350078989,168810852,67556463,371049330,404016761,841739592,1008918595,775550814,540080725,3969562369,3801332234,4035489047,4269907996,3569255213,3669462566,3366754619,3332740144,2631065433,2463879762,2160117071,2395588676,2767645557,2868897406,3102011747,3069049960,202008497,33778362,270040487,504459436,875451293,975658646,675039627,641025152,2084704233,1917518562,1615861247,1851332852,1147550661,1248802510,1484005843,1451044056,933301370,967311729,733156972,632953703,260388950,25965917,328671808,496906059,1206477858,1239443753,1543208500,1441952575,2144161806,1908694277,1675577880,1842759443,3610369226,3644379585,3408119516,3307916247,4011190502,3776767469,4077384432,4245618683,2809771154,2842737049,3144396420,3043140495,2673705150,2438237621,2203032232,2370213795]),this._mixCol=new Uint8Array(256)
for(var t=0;t<256;t++)this._mixCol[t]=t<128?t<<1:t<<1^27
this.buffer=new Uint8Array(16),this.bufferPosition=0}return f(e,[{key:"_expandKey",value:function(e){(0,a.unreachable)("Cannot call `_expandKey` on the base class")}},{key:"_decrypt",value:function(e,t){var r,a,i,n=new Uint8Array(16)
n.set(e)
for(var o=0,s=this._keySize;o<16;++o,++s)n[o]^=t[s]
for(var c=this._cyclesOfRepetition-1;c>=1;--c){r=n[13],n[13]=n[9],n[9]=n[5],n[5]=n[1],n[1]=r,r=n[14],a=n[10],n[14]=n[6],n[10]=n[2],n[6]=r,n[2]=a,r=n[15],a=n[11],i=n[7],n[15]=n[3],n[11]=r,n[7]=a,n[3]=i
for(var l=0;l<16;++l)n[l]=this._inv_s[n[l]]
for(var u=0,h=16*c;u<16;++u,++h)n[u]^=t[h]
for(var f=0;f<16;f+=4){var d=this._mix[n[f]],g=this._mix[n[f+1]],m=this._mix[n[f+2]],p=this._mix[n[f+3]]
r=d^g>>>8^g<<24^m>>>16^m<<16^p>>>24^p<<8,n[f]=r>>>24&255,n[f+1]=r>>16&255,n[f+2]=r>>8&255,n[f+3]=255&r}}r=n[13],n[13]=n[9],n[9]=n[5],n[5]=n[1],n[1]=r,r=n[14],a=n[10],n[14]=n[6],n[10]=n[2],n[6]=r,n[2]=a,r=n[15],a=n[11],i=n[7],n[15]=n[3],n[11]=r,n[7]=a,n[3]=i
for(var v=0;v<16;++v)n[v]=this._inv_s[n[v]],n[v]^=t[v]
return n}},{key:"_encrypt",value:function(e,t){var r,a,i,n=this._s,o=new Uint8Array(16)
o.set(e)
for(var s=0;s<16;++s)o[s]^=t[s]
for(var c=1;c<this._cyclesOfRepetition;c++){for(var l=0;l<16;++l)o[l]=n[o[l]]
i=o[1],o[1]=o[5],o[5]=o[9],o[9]=o[13],o[13]=i,i=o[2],a=o[6],o[2]=o[10],o[6]=o[14],o[10]=i,o[14]=a,i=o[3],a=o[7],r=o[11],o[3]=o[15],o[7]=i,o[11]=a,o[15]=r
for(var u=0;u<16;u+=4){var h=o[u+0],f=o[u+1],d=o[u+2],g=o[u+3]
r=h^f^d^g,o[u+0]^=r^this._mixCol[h^f],o[u+1]^=r^this._mixCol[f^d],o[u+2]^=r^this._mixCol[d^g],o[u+3]^=r^this._mixCol[g^h]}for(var m=0,p=16*c;m<16;++m,++p)o[m]^=t[p]}for(var v=0;v<16;++v)o[v]=n[o[v]]
i=o[1],o[1]=o[5],o[5]=o[9],o[9]=o[13],o[13]=i,i=o[2],a=o[6],o[2]=o[10],o[6]=o[14],o[10]=i,o[14]=a,i=o[3],a=o[7],r=o[11],o[3]=o[15],o[7]=i,o[11]=a,o[15]=r
for(var b=0,y=this._keySize;b<16;++b,++y)o[b]^=t[y]
return o}},{key:"_decryptBlock2",value:function(e,t){for(var r=e.length,a=this.buffer,i=this.bufferPosition,n=[],o=this.iv,s=0;s<r;++s)if(a[i]=e[s],!(++i<16)){for(var c=this._decrypt(a,this._key),l=0;l<16;++l)c[l]^=o[l]
o=a,n.push(c),a=new Uint8Array(16),i=0}if(this.buffer=a,this.bufferLength=i,this.iv=o,0===n.length)return new Uint8Array(0)
var u=16*n.length
if(t){var h=n[n.length-1],f=h[15]
if(f<=16){for(var d=15,g=16-f;d>=g;--d)if(h[d]!==f){f=0
break}u-=f,n[n.length-1]=h.subarray(0,16-f)}}for(var m=new Uint8Array(u),p=0,v=0,b=n.length;p<b;++p,v+=16)m.set(n[p],v)
return m}},{key:"decryptBlock",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,a=e.length,i=this.buffer,n=this.bufferPosition
if(r)this.iv=r
else{for(var o=0;n<16&&o<a;++o,++n)i[n]=e[o]
if(n<16)return this.bufferLength=n,new Uint8Array(0)
this.iv=i,e=e.subarray(16)}return this.buffer=new Uint8Array(16),this.bufferLength=0,this.decryptBlock=this._decryptBlock2,this.decryptBlock(e,t)}},{key:"encrypt",value:function(e,t){var r=e.length,a=this.buffer,i=this.bufferPosition,n=[]
t||(t=new Uint8Array(16))
for(var o=0;o<r;++o)if(a[i]=e[o],!(++i<16)){for(var s=0;s<16;++s)a[s]^=t[s]
var c=this._encrypt(a,this._key)
t=c,n.push(c),a=new Uint8Array(16),i=0}if(this.buffer=a,this.bufferLength=i,this.iv=t,0===n.length)return new Uint8Array(0)
for(var l=16*n.length,u=new Uint8Array(l),h=0,f=0,d=n.length;h<d;++h,f+=16)u.set(n[h],f)
return u}}]),e}(),k=function(e){function t(e){var r
return u(this,t),(r=s(this,c(t).call(this)))._cyclesOfRepetition=10,r._keySize=160,r._rcon=new Uint8Array([141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141,1,2,4,8,16,32,64,128,27,54,108,216,171,77,154,47,94,188,99,198,151,53,106,212,179,125,250,239,197,145,57,114,228,211,189,97,194,159,37,74,148,51,102,204,131,29,58,116,232,203,141]),r._key=r._expandKey(e),r}return l(t,w),f(t,[{key:"_expandKey",value:function(e){var t=this._s,r=this._rcon,a=new Uint8Array(176)
a.set(e)
for(var i=16,n=1;i<176;++n){var o=a[i-3],s=a[i-2],c=a[i-1],l=a[i-4]
o=t[o],s=t[s],c=t[c],l=t[l],o^=r[n]
for(var u=0;u<4;++u)a[i]=o^=a[i-16],a[++i]=s^=a[i-16],a[++i]=c^=a[i-16],a[++i]=l^=a[i-16],i++}return a}}]),t}()
t.AES128Cipher=k
var S=function(e){function t(e){var r
return u(this,t),(r=s(this,c(t).call(this)))._cyclesOfRepetition=14,r._keySize=224,r._key=r._expandKey(e),r}return l(t,w),f(t,[{key:"_expandKey",value:function(e){var t=this._s,r=new Uint8Array(240)
r.set(e)
for(var a,i,n,o,s=1,c=32,l=1;c<240;++l){c%32==16?(a=t[a],i=t[i],n=t[n],o=t[o]):c%32==0&&(a=r[c-3],i=r[c-2],n=r[c-1],o=r[c-4],a=t[a],i=t[i],n=t[n],o=t[o],a^=s,(s<<=1)>=256&&(s=255&(27^s)))
for(var u=0;u<4;++u)r[c]=a^=r[c-32],r[++c]=i^=r[c-32],r[++c]=n^=r[c-32],r[++c]=o^=r[c-32],c++}return r}}]),t}()
t.AES256Cipher=S
var C=function(){function e(e,t){if(e.length!==t.length)return!1
for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1
return!0}function t(){}return t.prototype={checkOwnerPassword:function(t,r,a,i){var n=new Uint8Array(t.length+56)
return n.set(t,0),n.set(r,t.length),n.set(a,t.length+r.length),e(p(n,0,n.length),i)},checkUserPassword:function(t,r,a){var i=new Uint8Array(t.length+8)
return i.set(t,0),i.set(r,t.length),e(p(i,0,i.length),a)},getOwnerKey:function(e,t,r,a){var i=new Uint8Array(e.length+56)
i.set(e,0),i.set(t,e.length),i.set(r,e.length+t.length)
var n=p(i,0,i.length)
return new S(n).decryptBlock(a,!1,new Uint8Array(16))},getUserKey:function(e,t,r){var a=new Uint8Array(e.length+8)
a.set(e,0),a.set(t,e.length)
var i=p(a,0,a.length)
return new S(i).decryptBlock(r,!1,new Uint8Array(16))}},t}()
t.PDF17=C
var x=function(){function e(e,t){var r=new Uint8Array(e.length+t.length)
return r.set(e,0),r.set(t,e.length),r}function t(t,r,a){for(var i=p(r,0,r.length).subarray(0,32),n=[0],o=0;o<64||n[n.length-1]>o-32;){var s=t.length+i.length+a.length,c=new Uint8Array(64*s),l=e(t,i)
l=e(l,a)
for(var u=0,h=0;u<64;u++,h+=s)c.set(l,h)
n=new k(i.subarray(0,16)).encrypt(c,i.subarray(16,32))
for(var f=0,d=0;d<16;d++)f*=1,f%=3,f+=(n[d]>>>0)%3,f%=3
0===f?i=p(n,0,n.length):1===f?i=b(n,0,n.length):2===f&&(i=v(n,0,n.length)),o++}return i.subarray(0,32)}function r(){}function a(e,t){if(e.length!==t.length)return!1
for(var r=0;r<e.length;r++)if(e[r]!==t[r])return!1
return!0}return r.prototype={hash:function(e,r,a){return t(e,r,a)},checkOwnerPassword:function(e,r,i,n){var o=new Uint8Array(e.length+56)
return o.set(e,0),o.set(r,e.length),o.set(i,e.length+r.length),a(t(e,o,i),n)},checkUserPassword:function(e,r,i){var n=new Uint8Array(e.length+8)
return n.set(e,0),n.set(r,e.length),a(t(e,n,[]),i)},getOwnerKey:function(e,r,a,i){var n=new Uint8Array(e.length+56)
n.set(e,0),n.set(r,e.length),n.set(a,e.length+r.length)
var o=t(e,n,a)
return new S(o).decryptBlock(i,!1,new Uint8Array(16))},getUserKey:function(e,r,a){var i=new Uint8Array(e.length+8)
i.set(e,0),i.set(r,e.length)
var n=t(e,i,[])
return new S(n).decryptBlock(a,!1,new Uint8Array(16))}},r}()
t.PDF20=x
var A=function(){function e(e,t){this.StringCipherConstructor=e,this.StreamCipherConstructor=t}return e.prototype={createStream:function(e,t){var r=new this.StreamCipherConstructor
return new n.DecryptStream(e,t,function(e,t){return r.decryptBlock(e,t)})},decryptString:function(e){var t=new this.StringCipherConstructor,r=(0,a.stringToBytes)(e)
return r=t.decryptBlock(r,!0),(0,a.bytesToString)(r)}},e}(),_=function(){var e=new Uint8Array([40,191,78,94,78,117,138,65,100,0,78,86,255,250,1,8,46,46,0,182,208,104,62,128,47,12,169,254,100,83,105,122])
function t(t,r,a,i,n,o,s,c){var l,u,h=40+a.length+t.length,f=new Uint8Array(h),m=0
if(r)for(u=Math.min(32,r.length);m<u;++m)f[m]=r[m]
for(l=0;m<32;)f[m++]=e[l++]
for(l=0,u=a.length;l<u;++l)f[m++]=a[l]
for(f[m++]=255&n,f[m++]=n>>8&255,f[m++]=n>>16&255,f[m++]=n>>>24&255,l=0,u=t.length;l<u;++l)f[m++]=t[l]
o>=4&&!c&&(f[m++]=255,f[m++]=255,f[m++]=255,f[m++]=255)
var p=g(f,0,m),v=s>>3
if(o>=3)for(l=0;l<50;++l)p=g(p,0,v)
var b,y=p.subarray(0,v)
if(o>=3){for(m=0;m<32;++m)f[m]=e[m]
for(l=0,u=t.length;l<u;++l)f[m++]=t[l]
b=new d(y).encryptBlock(g(f,0,m)),u=y.length
var w,k=new Uint8Array(u)
for(l=1;l<=19;++l){for(w=0;w<u;++w)k[w]=y[w]^l
b=new d(k).encryptBlock(b)}for(l=0,u=b.length;l<u;++l)if(i[l]!==b[l])return null}else for(l=0,u=(b=new d(y).encryptBlock(e)).length;l<u;++l)if(i[l]!==b[l])return null
return y}var r=i.Name.get("Identity")
function n(n,o,s){var c=n.get("Filter")
if(!(0,i.isName)(c,"Standard"))throw new a.FormatError("unknown encryption method")
this.dict=n
var l=n.get("V")
if(!Number.isInteger(l)||1!==l&&2!==l&&4!==l&&5!==l)throw new a.FormatError("unsupported encryption algorithm")
this.algorithm=l
var u=n.get("Length")
if(!u)if(l<=3)u=40
else{var h=n.get("CF"),f=n.get("StmF")
if((0,i.isDict)(h)&&(0,i.isName)(f)){h.suppressEncryption=!0
var m=h.get(f.name);(u=m&&m.get("Length")||128)<40&&(u<<=3)}}if(!Number.isInteger(u)||u<40||u%8!=0)throw new a.FormatError("invalid key length")
var p=(0,a.stringToBytes)(n.get("O")).subarray(0,32),v=(0,a.stringToBytes)(n.get("U")).subarray(0,32),b=n.get("P"),y=n.get("R"),w=(4===l||5===l)&&!1!==n.get("EncryptMetadata")
this.encryptMetadata=w
var k,S,A=(0,a.stringToBytes)(o)
if(s){if(6===y)try{s=(0,a.utf8StringToString)(s)}catch(e){(0,a.warn)("CipherTransformFactory: Unable to convert UTF8 encoded password.")}k=(0,a.stringToBytes)(s)}if(5!==l)S=t(A,k,p,v,b,y,u,w)
else{var _=(0,a.stringToBytes)(n.get("O")).subarray(32,40),P=(0,a.stringToBytes)(n.get("O")).subarray(40,48),I=(0,a.stringToBytes)(n.get("U")).subarray(0,48),O=(0,a.stringToBytes)(n.get("U")).subarray(32,40),E=(0,a.stringToBytes)(n.get("U")).subarray(40,48),T=(0,a.stringToBytes)(n.get("OE")),F=(0,a.stringToBytes)(n.get("UE"));(0,a.stringToBytes)(n.get("Perms")),S=function(e,t,r,a,i,n,o,s,c,l,u,h){if(t){var f=Math.min(127,t.length)
t=t.subarray(0,f)}else t=[]
var d
return(d=6===e?new x:new C).checkUserPassword(t,s,o)?d.getUserKey(t,c,u):t.length&&d.checkOwnerPassword(t,a,n,r)?d.getOwnerKey(t,i,n,l):null}(y,k,p,_,P,I,v,O,E,T,F)}if(!S&&!s)throw new a.PasswordException("No password given",a.PasswordResponses.NEED_PASSWORD)
if(!S&&s&&(S=t(A,function(t,r,a,i){var n,o,s=new Uint8Array(32),c=0
for(o=Math.min(32,t.length);c<o;++c)s[c]=t[c]
for(n=0;c<32;)s[c++]=e[n++]
var l,u=g(s,0,c),h=i>>3
if(a>=3)for(n=0;n<50;++n)u=g(u,0,u.length)
if(a>=3){l=r
var f,m=new Uint8Array(h)
for(n=19;n>=0;n--){for(f=0;f<h;++f)m[f]=u[f]^n
l=new d(m).encryptBlock(l)}}else l=new d(u.subarray(0,h)).encryptBlock(r)
return l}(k,p,y,u),p,v,b,y,u,w)),!S)throw new a.PasswordException("Incorrect Password",a.PasswordResponses.INCORRECT_PASSWORD)
if(this.encryptionKey=S,l>=4){var R=n.get("CF");(0,i.isDict)(R)&&(R.suppressEncryption=!0),this.cf=R,this.stmf=n.get("StmF")||r,this.strf=n.get("StrF")||r,this.eff=n.get("EFF")||this.stmf}}function o(e,t,r,a){var i,n,o=new Uint8Array(r.length+9)
for(i=0,n=r.length;i<n;++i)o[i]=r[i]
return o[i++]=255&e,o[i++]=e>>8&255,o[i++]=e>>16&255,o[i++]=255&t,o[i++]=t>>8&255,a&&(o[i++]=115,o[i++]=65,o[i++]=108,o[i++]=84),g(o,0,i).subarray(0,Math.min(r.length+5,16))}function s(e,t,r,n,s){if(!(0,i.isName)(t))throw new a.FormatError("Invalid crypt filter name.")
var c,l=e.get(t.name)
if(null!=l&&(c=l.get("CFM")),!c||"None"===c.name)return function(){return new y}
if("V2"===c.name)return function(){return new d(o(r,n,s,!1))}
if("AESV2"===c.name)return function(){return new k(o(r,n,s,!0))}
if("AESV3"===c.name)return function(){return new S(s)}
throw new a.FormatError("Unknown crypto method")}return n.prototype={createCipherTransform:function(e,t){if(4===this.algorithm||5===this.algorithm)return new A(s(this.cf,this.stmf,e,t,this.encryptionKey),s(this.cf,this.strf,e,t,this.encryptionKey))
var r=o(e,t,this.encryptionKey,!1),a=function(){return new d(r)}
return new A(a,a)}},n}()
t.CipherTransformFactory=_},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.ColorSpace=void 0
var a=r(6),i=r(155)
function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function o(e,t){return!t||"object"!==n(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function s(e){return(s=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function h(e,t,r){return t&&u(e.prototype,t),r&&u(e,r),e}var f=function(){function e(t,r){l(this,e),this.constructor===e&&(0,a.unreachable)("Cannot initialize ColorSpace."),this.name=t,this.numComps=r}return h(e,[{key:"getRgb",value:function(e,t){var r=new Uint8ClampedArray(3)
return this.getRgbItem(e,t,r,0),r}},{key:"getRgbItem",value:function(e,t,r,i){(0,a.unreachable)("Should not call ColorSpace.getRgbItem")}},{key:"getRgbBuffer",value:function(e,t,r,i,n,o,s){(0,a.unreachable)("Should not call ColorSpace.getRgbBuffer")}},{key:"getOutputLength",value:function(e,t){(0,a.unreachable)("Should not call ColorSpace.getOutputLength")}},{key:"isPassthrough",value:function(e){return!1}},{key:"isDefaultDecode",value:function(t,r){return e.isDefaultDecode(t,this.numComps)}},{key:"fillRgb",value:function(e,t,r,a,i,n,o,s,c){var l=t*r,u=null,h=1<<o,f=r!==i||t!==a
if(this.isPassthrough(o))u=s
else if(1===this.numComps&&l>h&&"DeviceGray"!==this.name&&"DeviceRGB"!==this.name){for(var d=o<=8?new Uint8Array(h):new Uint16Array(h),g=0;g<h;g++)d[g]=g
var m=new Uint8ClampedArray(3*h)
if(this.getRgbBuffer(d,0,h,m,0,o,0),f){u=new Uint8Array(3*l)
for(var p=0,v=0;v<l;++v){var b=3*s[v]
u[p++]=m[b],u[p++]=m[b+1],u[p++]=m[b+2]}}else for(var y=0,w=0;w<l;++w){var k=3*s[w]
e[y++]=m[k],e[y++]=m[k+1],e[y++]=m[k+2],y+=c}}else f?(u=new Uint8ClampedArray(3*l),this.getRgbBuffer(s,0,l,u,0,o,0)):this.getRgbBuffer(s,0,a*n,e,0,o,c)
if(u)if(f)!function(e,t,r,a,i,n,o){o=1!==o?0:o
for(var s,c=r/i,l=a/n,u=0,h=new Uint16Array(i),f=3*r,d=0;d<i;d++)h[d]=3*Math.floor(d*c)
for(var g=0;g<n;g++)for(var m=Math.floor(g*l)*f,p=0;p<i;p++)s=m+h[p],t[u++]=e[s++],t[u++]=e[s++],t[u++]=e[s++],u+=o}(u,e,t,r,a,i,c)
else for(var S=0,C=0,x=0,A=a*n;x<A;x++)e[S++]=u[C++],e[S++]=u[C++],e[S++]=u[C++],S+=c}},{key:"usesZeroToOneRange",get:function(){return(0,a.shadow)(this,"usesZeroToOneRange",!0)}}],[{key:"parse",value:function(e,t,r,a){var i=this.parseToIR(e,t,r,a)
return this.fromIR(i)}},{key:"fromIR",value:function(e){var t,r,i,n=Array.isArray(e)?e[0]:e
switch(n){case"DeviceGrayCS":return this.singletons.gray
case"DeviceRgbCS":return this.singletons.rgb
case"DeviceCmykCS":return this.singletons.cmyk
case"CalGrayCS":return t=e[1],r=e[2],i=e[3],new y(t,r,i)
case"CalRGBCS":t=e[1],r=e[2],i=e[3]
var o=e[4]
return new w(t,r,i,o)
case"PatternCS":var s=e[1]
return s&&(s=this.fromIR(s)),new g(s)
case"IndexedCS":var c=e[1],l=e[2],u=e[3]
return new m(this.fromIR(c),l,u)
case"AlternateCS":var h=e[1],f=e[2],p=e[3]
return new d(h,this.fromIR(f),p)
case"LabCS":t=e[1],r=e[2]
var v=e[3]
return new k(t,r,v)
default:throw new a.FormatError("Unknown colorspace name: ".concat(n))}}},{key:"parseToIR",value:function(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3?arguments[3]:void 0
if(e=t.fetchIfRef(e),(0,i.isName)(e))switch(e.name){case"DeviceGray":case"G":return"DeviceGrayCS"
case"DeviceRGB":case"RGB":return"DeviceRgbCS"
case"DeviceCMYK":case"CMYK":return"DeviceCmykCS"
case"Pattern":return["PatternCS",null]
default:if((0,i.isDict)(r)){var o=r.get("ColorSpace")
if((0,i.isDict)(o)){var s=o.get(e.name)
if(s){if((0,i.isName)(s))return this.parseToIR(s,t,r,n)
e=s
break}}}throw new a.FormatError("unrecognized colorspace ".concat(e.name))}if(Array.isArray(e)){var c,l,u,h=t.fetchIfRef(e[0]).name
switch(h){case"DeviceGray":case"G":return"DeviceGrayCS"
case"DeviceRGB":case"RGB":return"DeviceRgbCS"
case"DeviceCMYK":case"CMYK":return"DeviceCmykCS"
case"CalGray":return["CalGrayCS",(l=t.fetchIfRef(e[1])).getArray("WhitePoint"),l.getArray("BlackPoint"),l.get("Gamma")]
case"CalRGB":return["CalRGBCS",(l=t.fetchIfRef(e[1])).getArray("WhitePoint"),l.getArray("BlackPoint"),l.getArray("Gamma"),l.getArray("Matrix")]
case"ICCBased":var f=t.fetchIfRef(e[1]).dict
if(c=f.get("N"),u=f.get("Alternate")){var d=this.parseToIR(u,t,r,n)
if(this.fromIR(d,n).numComps===c)return d;(0,a.warn)("ICCBased color space: Ignoring incorrect /Alternate entry.")}if(1===c)return"DeviceGrayCS"
if(3===c)return"DeviceRgbCS"
if(4===c)return"DeviceCmykCS"
break
case"Pattern":var g=e[1]||null
return g&&(g=this.parseToIR(g,t,r,n)),["PatternCS",g]
case"Indexed":case"I":var m=this.parseToIR(e[1],t,r,n),p=t.fetchIfRef(e[2])+1,v=t.fetchIfRef(e[3])
return(0,i.isStream)(v)&&(v=v.getBytes()),["IndexedCS",m,p,v]
case"Separation":case"DeviceN":var b=t.fetchIfRef(e[1])
return["AlternateCS",c=Array.isArray(b)?b.length:1,u=this.parseToIR(e[2],t,r,n),n.create(t.fetchIfRef(e[3]))]
case"Lab":return["LabCS",(l=t.fetchIfRef(e[1])).getArray("WhitePoint"),l.getArray("BlackPoint"),l.getArray("Range")]
default:throw new a.FormatError('unimplemented color space object "'.concat(h,'"'))}}throw new a.FormatError('unrecognized color space object: "'.concat(e,'"'))}},{key:"isDefaultDecode",value:function(e,t){if(!Array.isArray(e))return!0
if(2*t!==e.length)return(0,a.warn)("The decode map is not the correct length"),!0
for(var r=0,i=e.length;r<i;r+=2)if(0!==e[r]||1!==e[r+1])return!1
return!0}},{key:"singletons",get:function(){return(0,a.shadow)(this,"singletons",{get gray(){return(0,a.shadow)(this,"gray",new p)},get rgb(){return(0,a.shadow)(this,"rgb",new v)},get cmyk(){return(0,a.shadow)(this,"cmyk",new b)}})}}]),e}()
t.ColorSpace=f
var d=function(e){function t(e,r,a){var i
return l(this,t),(i=o(this,s(t).call(this,"Alternate",e))).base=r,i.tintFn=a,i.tmpBuf=new Float32Array(r.numComps),i}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,r,a){var i=this.tmpBuf
this.tintFn(e,t,i,0),this.base.getRgbItem(i,0,r,a)}},{key:"getRgbBuffer",value:function(e,t,r,a,i,n,o){var s,c,l=this.tintFn,u=this.base,h=1/((1<<n)-1),f=u.numComps,d=u.usesZeroToOneRange,g=(u.isPassthrough(8)||!d)&&0===o,m=g?i:0,p=g?a:new Uint8ClampedArray(f*r),v=this.numComps,b=new Float32Array(v),y=new Float32Array(f)
for(s=0;s<r;s++){for(c=0;c<v;c++)b[c]=e[t++]*h
if(l(b,0,y,0),d)for(c=0;c<f;c++)p[m++]=255*y[c]
else u.getRgbItem(y,0,p,m),m+=f}g||u.getRgbBuffer(p,0,r,a,i,8,o)}},{key:"getOutputLength",value:function(e,t){return this.base.getOutputLength(e*this.base.numComps/this.numComps,t)}}]),t}(),g=function(e){function t(e){var r
return l(this,t),(r=o(this,s(t).call(this,"Pattern",null))).base=e,r}return c(t,f),h(t,[{key:"isDefaultDecode",value:function(e,t){(0,a.unreachable)("Should not call PatternCS.isDefaultDecode")}}]),t}(),m=function(e){function t(e,r,n){var c
l(this,t),(c=o(this,s(t).call(this,"Indexed",1))).base=e,c.highVal=r
var u=e.numComps*r
if((0,i.isStream)(n)){c.lookup=new Uint8Array(u)
var h=n.getBytes(u)
c.lookup.set(h)}else if((0,a.isString)(n)){c.lookup=new Uint8Array(u)
for(var f=0;f<u;++f)c.lookup[f]=n.charCodeAt(f)}else{if(!(n instanceof Uint8Array))throw new a.FormatError("Unrecognized lookup table: ".concat(n))
c.lookup=n}return c}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,r,a){var i=this.base.numComps,n=e[t]*i
this.base.getRgbBuffer(this.lookup,n,1,r,a,8,0)}},{key:"getRgbBuffer",value:function(e,t,r,a,i,n,o){for(var s=this.base,c=s.numComps,l=s.getOutputLength(c,o),u=this.lookup,h=0;h<r;++h){var f=e[t++]*c
s.getRgbBuffer(u,f,1,a,i,8,o),i+=l}}},{key:"getOutputLength",value:function(e,t){return this.base.getOutputLength(e*this.base.numComps,t)}},{key:"isDefaultDecode",value:function(e,t){return!Array.isArray(e)||(2!==e.length?((0,a.warn)("Decode map length is not correct"),!0):!Number.isInteger(t)||t<1?((0,a.warn)("Bits per component is not correct"),!0):0===e[0]&&e[1]===(1<<t)-1)}}]),t}(),p=function(e){function t(){return l(this,t),o(this,s(t).call(this,"DeviceGray",1))}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,r,a){var i=255*e[t]
r[a]=r[a+1]=r[a+2]=i}},{key:"getRgbBuffer",value:function(e,t,r,a,i,n,o){for(var s=255/((1<<n)-1),c=t,l=i,u=0;u<r;++u){var h=s*e[c++]
a[l++]=h,a[l++]=h,a[l++]=h,l+=o}}},{key:"getOutputLength",value:function(e,t){return e*(3+t)}}]),t}(),v=function(e){function t(){return l(this,t),o(this,s(t).call(this,"DeviceRGB",3))}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,r,a){r[a]=255*e[t],r[a+1]=255*e[t+1],r[a+2]=255*e[t+2]}},{key:"getRgbBuffer",value:function(e,t,r,a,i,n,o){if(8!==n||0!==o)for(var s=255/((1<<n)-1),c=t,l=i,u=0;u<r;++u)a[l++]=s*e[c++],a[l++]=s*e[c++],a[l++]=s*e[c++],l+=o
else a.set(e.subarray(t,t+3*r),i)}},{key:"getOutputLength",value:function(e,t){return e*(3+t)/3|0}},{key:"isPassthrough",value:function(e){return 8===e}}]),t}(),b=function(){function e(e,t,r,a,i){var n=e[t]*r,o=e[t+1]*r,s=e[t+2]*r,c=e[t+3]*r
a[i]=255+n*(-4.387332384609988*n+54.48615194189176*o+18.82290502165302*s+212.25662451639585*c-285.2331026137004)+o*(1.7149763477362134*o-5.6096736904047315*s+-17.873870861415444*c-5.497006427196366)+s*(-2.5217340131683033*s-21.248923337353073*c+17.5119270841813)+c*(-21.86122147463605*c-189.48180835922747),a[i+1]=255+n*(8.841041422036149*n+60.118027045597366*o+6.871425592049007*s+31.159100130055922*c-79.2970844816548)+o*(-15.310361306967817*o+17.575251261109482*s+131.35250912493976*c-190.9453302588951)+s*(4.444339102852739*s+9.8632861493405*c-24.86741582555878)+c*(-20.737325471181034*c-187.80453709719578),a[i+2]=255+n*(.8842522430003296*n+8.078677503112928*o+30.89978309703729*s-.23883238689178934*c-14.183576799673286)+o*(10.49593273432072*o+63.02378494754052*s+50.606957656360734*c-112.23884253719248)+s*(.03296041114873217*s+115.60384449646641*c-193.58209356861505)+c*(-22.33816807309886*c-180.12613974708367)}return function(t){function r(){return l(this,r),o(this,s(r).call(this,"DeviceCMYK",4))}return c(r,f),h(r,[{key:"getRgbItem",value:function(t,r,a,i){e(t,r,1,a,i)}},{key:"getRgbBuffer",value:function(t,r,a,i,n,o,s){for(var c=1/((1<<o)-1),l=0;l<a;l++)e(t,r,c,i,n),r+=4,n+=3+s}},{key:"getOutputLength",value:function(e,t){return e/4*(3+t)|0}}]),r}()}(),y=function(){function e(e,t,r,a,i,n){var o=t[r]*n,s=Math.pow(o,e.G),c=e.YW*s,l=Math.max(295.8*Math.pow(c,.3333333333333333)-40.8,0)
a[i]=l,a[i+1]=l,a[i+2]=l}return function(t){function r(e,t,i){var n
if(l(this,r),n=o(this,s(r).call(this,"CalGray",1)),!e)throw new a.FormatError("WhitePoint missing - required for color space CalGray")
if(t=t||[0,0,0],i=i||1,n.XW=e[0],n.YW=e[1],n.ZW=e[2],n.XB=t[0],n.YB=t[1],n.ZB=t[2],n.G=i,n.XW<0||n.ZW<0||1!==n.YW)throw new a.FormatError("Invalid WhitePoint components for ".concat(n.name)+", no fallback available")
return(n.XB<0||n.YB<0||n.ZB<0)&&((0,a.info)("Invalid BlackPoint for ".concat(n.name,", falling back to default.")),n.XB=n.YB=n.ZB=0),0===n.XB&&0===n.YB&&0===n.ZB||(0,a.warn)("".concat(n.name,", BlackPoint: XB: ").concat(n.XB,", YB: ").concat(n.YB,", ")+"ZB: ".concat(n.ZB,", only default values are supported.")),n.G<1&&((0,a.info)("Invalid Gamma: ".concat(n.G," for ").concat(n.name,", ")+"falling back to default."),n.G=1),n}return c(r,f),h(r,[{key:"getRgbItem",value:function(t,r,a,i){e(this,t,r,a,i,1)}},{key:"getRgbBuffer",value:function(t,r,a,i,n,o,s){for(var c=1/((1<<o)-1),l=0;l<a;++l)e(this,t,r,i,n,c),r+=1,n+=3+s}},{key:"getOutputLength",value:function(e,t){return e*(3+t)}}]),r}()}(),w=function(){var e=new Float32Array([.8951,.2664,-.1614,-.7502,1.7135,.0367,.0389,-.0685,1.0296]),t=new Float32Array([.9869929,-.1470543,.1599627,.4323053,.5183603,.0492912,-.0085287,.0400428,.9684867]),r=new Float32Array([3.2404542,-1.5371385,-.4985314,-.969266,1.8760108,.041556,.0556434,-.2040259,1.0572252]),i=new Float32Array([1,1,1]),n=new Float32Array(3),u=new Float32Array(3),d=new Float32Array(3),g=Math.pow(24/116,3)/8
function m(e,t,r){r[0]=e[0]*t[0]+e[1]*t[1]+e[2]*t[2],r[1]=e[3]*t[0]+e[4]*t[1]+e[5]*t[2],r[2]=e[6]*t[0]+e[7]*t[1]+e[8]*t[2]}function p(e){return v(0,1,e<=.0031308?12.92*e:1.055*Math.pow(e,1/2.4)-.055)}function v(e,t,r){return Math.max(e,Math.min(t,r))}function b(e){return e<0?-b(-e):e>8?Math.pow((e+16)/116,3):e*g}function y(a,o,s,c,l,h){var f=v(0,1,o[s]*h),g=v(0,1,o[s+1]*h),y=v(0,1,o[s+2]*h),w=Math.pow(f,a.GR),k=Math.pow(g,a.GG),S=Math.pow(y,a.GB),C=a.MXA*w+a.MXB*k+a.MXC*S,x=a.MYA*w+a.MYB*k+a.MYC*S,A=a.MZA*w+a.MZB*k+a.MZC*S,_=u
_[0]=C,_[1]=x,_[2]=A
var P=d
!function(r,a,i){if(1!==r[0]||1!==r[2]){var o=i
m(e,a,o)
var s=n
!function(e,t,r){r[0]=1*t[0]/e[0],r[1]=1*t[1]/e[1],r[2]=1*t[2]/e[2]}(r,o,s),m(t,s,i)}else i[0]=a[0],i[1]=a[1],i[2]=a[2]}(a.whitePoint,_,P)
var I=u
!function(e,t,r){if(0!==e[0]||0!==e[1]||0!==e[2]){var a=b(0),i=(1-a)/(1-b(e[0])),n=1-i,o=(1-a)/(1-b(e[1])),s=1-o,c=(1-a)/(1-b(e[2])),l=1-c
r[0]=t[0]*i+n,r[1]=t[1]*o+s,r[2]=t[2]*c+l}else r[0]=t[0],r[1]=t[1],r[2]=t[2]}(a.blackPoint,P,I)
var O=d
!function(r,a,i){var o=i
m(e,I,o)
var s=n
!function(e,t,r){r[0]=.95047*t[0]/e[0],r[1]=1*t[1]/e[1],r[2]=1.08883*t[2]/e[2]}(r,o,s),m(t,s,i)}(i,0,O)
var E=u
m(r,O,E),c[l]=255*p(E[0]),c[l+1]=255*p(E[1]),c[l+2]=255*p(E[2])}return function(e){function t(e,r,i,n){var c
if(l(this,t),c=o(this,s(t).call(this,"CalRGB",3)),!e)throw new a.FormatError("WhitePoint missing - required for color space CalRGB")
r=r||new Float32Array(3),i=i||new Float32Array([1,1,1]),n=n||new Float32Array([1,0,0,0,1,0,0,0,1])
var u=e[0],h=e[1],f=e[2]
c.whitePoint=e
var d=r[0],g=r[1],m=r[2]
if(c.blackPoint=r,c.GR=i[0],c.GG=i[1],c.GB=i[2],c.MXA=n[0],c.MYA=n[1],c.MZA=n[2],c.MXB=n[3],c.MYB=n[4],c.MZB=n[5],c.MXC=n[6],c.MYC=n[7],c.MZC=n[8],u<0||f<0||1!==h)throw new a.FormatError("Invalid WhitePoint components for ".concat(c.name)+", no fallback available")
return(d<0||g<0||m<0)&&((0,a.info)("Invalid BlackPoint for ".concat(c.name," [").concat(d,", ").concat(g,", ").concat(m,"], ")+"falling back to default."),c.blackPoint=new Float32Array(3)),(c.GR<0||c.GG<0||c.GB<0)&&((0,a.info)("Invalid Gamma [".concat(c.GR,", ").concat(c.GG,", ").concat(c.GB,"] for ")+"".concat(c.name,", falling back to default.")),c.GR=c.GG=c.GB=1),c}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,r,a){y(this,e,t,r,a,1)}},{key:"getRgbBuffer",value:function(e,t,r,a,i,n,o){for(var s=1/((1<<n)-1),c=0;c<r;++c)y(this,e,t,a,i,s),t+=3,i+=3+o}},{key:"getOutputLength",value:function(e,t){return e*(3+t)/3|0}}]),t}()}(),k=function(){function e(e){return e>=6/29?e*e*e:108/841*(e-4/29)}function t(e,t,r,a){return r+e*(a-r)/t}function r(r,a,i,n,o,s){var c=a[i],l=a[i+1],u=a[i+2]
!1!==n&&(c=t(c,n,0,100),l=t(l,n,r.amin,r.amax),u=t(u,n,r.bmin,r.bmax))
var h,f,d,g=(c+16)/116,m=g+(l=l>r.amax?r.amax:l<r.amin?r.amin:l)/500,p=g-(u=u>r.bmax?r.bmax:u<r.bmin?r.bmin:u)/200,v=r.XW*e(m),b=r.YW*e(g),y=r.ZW*e(p)
r.ZW<1?(h=3.1339*v+-1.617*b+-.4906*y,f=-.9785*v+1.916*b+.0333*y,d=.072*v+-.229*b+1.4057*y):(h=3.2406*v+-1.5372*b+-.4986*y,f=-.9689*v+1.8758*b+.0415*y,d=.0557*v+-.204*b+1.057*y),o[s]=255*Math.sqrt(h),o[s+1]=255*Math.sqrt(f),o[s+2]=255*Math.sqrt(d)}return function(e){function t(e,r,i){var n
if(l(this,t),n=o(this,s(t).call(this,"Lab",3)),!e)throw new a.FormatError("WhitePoint missing - required for color space Lab")
if(r=r||[0,0,0],i=i||[-100,100,-100,100],n.XW=e[0],n.YW=e[1],n.ZW=e[2],n.amin=i[0],n.amax=i[1],n.bmin=i[2],n.bmax=i[3],n.XB=r[0],n.YB=r[1],n.ZB=r[2],n.XW<0||n.ZW<0||1!==n.YW)throw new a.FormatError("Invalid WhitePoint components, no fallback available")
return(n.XB<0||n.YB<0||n.ZB<0)&&((0,a.info)("Invalid BlackPoint, falling back to default"),n.XB=n.YB=n.ZB=0),(n.amin>n.amax||n.bmin>n.bmax)&&((0,a.info)("Invalid Range, falling back to defaults"),n.amin=-100,n.amax=100,n.bmin=-100,n.bmax=100),n}return c(t,f),h(t,[{key:"getRgbItem",value:function(e,t,a,i){r(this,e,t,!1,a,i)}},{key:"getRgbBuffer",value:function(e,t,a,i,n,o,s){for(var c=(1<<o)-1,l=0;l<a;l++)r(this,e,t,c,i,n),t+=3,n+=3+s}},{key:"getOutputLength",value:function(e,t){return e*(3+t)/3|0}},{key:"isDefaultDecode",value:function(e,t){return!0}},{key:"usesZeroToOneRange",get:function(){return(0,a.shadow)(this,"usesZeroToOneRange",!1)}}]),t}()}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.AnnotationFactory=t.AnnotationBorderStyle=t.Annotation=void 0
var a=r(6),i=r(154),n=r(155),o=r(168),s=r(170),c=r(157)
function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function u(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function h(e,t,r){return(h="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,r){var a=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=f(e)););return e}(e,t)
if(a){var i=Object.getOwnPropertyDescriptor(a,t)
return i.get?i.get.call(r):i.value}})(e,t,r||e)}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function d(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function g(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function m(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function p(e,t,r){return t&&m(e.prototype,t),r&&m(e,r),e}var v=function(){function e(){g(this,e)}return p(e,null,[{key:"create",value:function(e,t,r,a){return r.ensure(this,"_create",[e,t,r,a])}},{key:"_create",value:function(e,t,r,i){var o=e.fetchIfRef(t)
if((0,n.isDict)(o)){var s=(0,n.isRef)(t)?t.toString():"annot_"+i.createObjId(),c=o.get("Subtype")
c=(0,n.isName)(c)?c.name:null
var l={xref:e,dict:o,ref:(0,n.isRef)(t)?t:null,subtype:c,id:s,pdfManager:r}
switch(c){case"Link":return new A(l)
case"Text":return new x(l)
case"Widget":var u=(0,a.getInheritableProperty)({dict:o,key:"FT"})
switch(u=(0,n.isName)(u)?u.name:null){case"Tx":return new k(l)
case"Btn":return new S(l)
case"Ch":return new C(l)}return(0,a.warn)('Unimplemented widget field type "'+u+'", falling back to base field type.'),new w(l)
case"Popup":return new _(l)
case"Line":return new P(l)
case"Square":return new I(l)
case"Circle":return new O(l)
case"PolyLine":return new E(l)
case"Polygon":return new T(l)
case"Ink":return new F(l)
case"Highlight":return new R(l)
case"Underline":return new B(l)
case"Squiggly":return new D(l)
case"StrikeOut":return new M(l)
case"Stamp":return new L(l)
case"FileAttachment":return new N(l)
default:return c?(0,a.warn)('Unimplemented annotation type "'+c+'", falling back to base annotation.'):(0,a.warn)("Annotation is missing the required /Subtype."),new b(l)}}}}]),e}()
t.AnnotationFactory=v
var b=function(){function e(t){g(this,e)
var r=t.dict
this.setFlags(r.get("F")),this.setRectangle(r.getArray("Rect")),this.setColor(r.getArray("C")),this.setBorderStyle(r),this.setAppearance(r),this.data={annotationFlags:this.flags,borderStyle:this.borderStyle,color:this.color,hasAppearance:!!this.appearance,id:t.id,rect:this.rectangle,subtype:t.subtype}}return p(e,[{key:"_hasFlag",value:function(e,t){return!!(e&t)}},{key:"_isViewable",value:function(e){return!this._hasFlag(e,a.AnnotationFlag.INVISIBLE)&&!this._hasFlag(e,a.AnnotationFlag.HIDDEN)&&!this._hasFlag(e,a.AnnotationFlag.NOVIEW)}},{key:"_isPrintable",value:function(e){return this._hasFlag(e,a.AnnotationFlag.PRINT)&&!this._hasFlag(e,a.AnnotationFlag.INVISIBLE)&&!this._hasFlag(e,a.AnnotationFlag.HIDDEN)}},{key:"setFlags",value:function(e){this.flags=Number.isInteger(e)&&e>0?e:0}},{key:"hasFlag",value:function(e){return this._hasFlag(this.flags,e)}},{key:"setRectangle",value:function(e){Array.isArray(e)&&4===e.length?this.rectangle=a.Util.normalizeRect(e):this.rectangle=[0,0,0,0]}},{key:"setColor",value:function(e){var t=new Uint8ClampedArray(3)
if(Array.isArray(e))switch(e.length){case 0:this.color=null
break
case 1:o.ColorSpace.singletons.gray.getRgbItem(e,0,t,0),this.color=t
break
case 3:o.ColorSpace.singletons.rgb.getRgbItem(e,0,t,0),this.color=t
break
case 4:o.ColorSpace.singletons.cmyk.getRgbItem(e,0,t,0),this.color=t
break
default:this.color=t}else this.color=t}},{key:"setBorderStyle",value:function(e){if(this.borderStyle=new y,(0,n.isDict)(e))if(e.has("BS")){var t=e.get("BS"),r=t.get("Type")
r&&!(0,n.isName)(r,"Border")||(this.borderStyle.setWidth(t.get("W")),this.borderStyle.setStyle(t.get("S")),this.borderStyle.setDashArray(t.getArray("D")))}else if(e.has("Border")){var a=e.getArray("Border")
Array.isArray(a)&&a.length>=3&&(this.borderStyle.setHorizontalCornerRadius(a[0]),this.borderStyle.setVerticalCornerRadius(a[1]),this.borderStyle.setWidth(a[2]),4===a.length&&this.borderStyle.setDashArray(a[3]))}else this.borderStyle.setWidth(0)}},{key:"setAppearance",value:function(e){this.appearance=null
var t=e.get("AP")
if((0,n.isDict)(t)){var r=t.get("N")
if((0,n.isStream)(r))this.appearance=r
else if((0,n.isDict)(r)){var a=e.get("AS");(0,n.isName)(a)&&r.has(a.name)&&(this.appearance=r.get(a.name))}}}},{key:"_preparePopup",value:function(e){e.has("C")||(this.data.color=null),this.data.hasPopup=e.has("Popup"),this.data.title=(0,a.stringToPDFString)(e.get("T")||""),this.data.contents=(0,a.stringToPDFString)(e.get("Contents")||"")}},{key:"loadResources",value:function(e){return this.appearance.dict.getAsync("Resources").then(function(t){if(t)return new i.ObjectLoader(t,e,t.xref).load().then(function(){return t})})}},{key:"getOperatorList",value:function(e,t,r){var i=this
if(!this.appearance)return Promise.resolve(new s.OperatorList)
var n=this.data,o=this.appearance.dict,c=this.loadResources(["ExtGState","ColorSpace","Pattern","Shading","XObject","Font"]),l=o.getArray("BBox")||[0,0,1,1],u=o.getArray("Matrix")||[1,0,0,1,0,0],h=function(e,t,r){var i=a.Util.getAxialAlignedBoundingBox(t,r),n=i[0],o=i[1],s=i[2],c=i[3]
if(n===s||o===c)return[1,0,0,1,e[0],e[1]]
var l=(e[2]-e[0])/(s-n),u=(e[3]-e[1])/(c-o)
return[l,0,0,u,e[0]-n*l,e[1]-o*u]}(n.rect,l,u)
return c.then(function(r){var o=new s.OperatorList
return o.addOp(a.OPS.beginAnnotation,[n.rect,h,u]),e.getOperatorList({stream:i.appearance,task:t,resources:r,operatorList:o}).then(function(){return o.addOp(a.OPS.endAnnotation,[]),i.appearance.reset(),o})})}},{key:"viewable",get:function(){return 0===this.flags||this._isViewable(this.flags)}},{key:"printable",get:function(){return 0!==this.flags&&this._isPrintable(this.flags)}}]),e}()
t.Annotation=b
var y=function(){function e(){g(this,e),this.width=1,this.style=a.AnnotationBorderStyleType.SOLID,this.dashArray=[3],this.horizontalCornerRadius=0,this.verticalCornerRadius=0}return p(e,[{key:"setWidth",value:function(e){(0,n.isName)(e)?this.width=0:Number.isInteger(e)&&(this.width=e)}},{key:"setStyle",value:function(e){if((0,n.isName)(e))switch(e.name){case"S":this.style=a.AnnotationBorderStyleType.SOLID
break
case"D":this.style=a.AnnotationBorderStyleType.DASHED
break
case"B":this.style=a.AnnotationBorderStyleType.BEVELED
break
case"I":this.style=a.AnnotationBorderStyleType.INSET
break
case"U":this.style=a.AnnotationBorderStyleType.UNDERLINE}}},{key:"setDashArray",value:function(e){if(Array.isArray(e)&&e.length>0){for(var t=!0,r=!0,a=0,i=e.length;a<i;a++){var n=e[a]
if(!(+n>=0)){t=!1
break}n>0&&(r=!1)}t&&!r?this.dashArray=e:this.width=0}else e&&(this.width=0)}},{key:"setHorizontalCornerRadius",value:function(e){Number.isInteger(e)&&(this.horizontalCornerRadius=e)}},{key:"setVerticalCornerRadius",value:function(e){Number.isInteger(e)&&(this.verticalCornerRadius=e)}}]),e}()
t.AnnotationBorderStyle=y
var w=function(e){function t(e){var r
g(this,t),r=u(this,f(t).call(this,e))
var i=e.dict,o=r.data
o.annotationType=a.AnnotationType.WIDGET,o.fieldName=r._constructFieldName(i),o.fieldValue=(0,a.getInheritableProperty)({dict:i,key:"V",getArray:!0}),o.alternativeText=(0,a.stringToPDFString)(i.get("TU")||""),o.defaultAppearance=(0,a.getInheritableProperty)({dict:i,key:"DA"})||""
var s=(0,a.getInheritableProperty)({dict:i,key:"FT"})
return o.fieldType=(0,n.isName)(s)?s.name:null,r.fieldResources=(0,a.getInheritableProperty)({dict:i,key:"DR"})||n.Dict.empty,o.fieldFlags=(0,a.getInheritableProperty)({dict:i,key:"Ff"}),(!Number.isInteger(o.fieldFlags)||o.fieldFlags<0)&&(o.fieldFlags=0),o.readOnly=r.hasFieldFlag(a.AnnotationFieldFlag.READONLY),"Sig"===o.fieldType&&(o.fieldValue=null,r.setFlags(a.AnnotationFlag.HIDDEN)),r}return d(t,b),p(t,[{key:"_constructFieldName",value:function(e){if(!e.has("T")&&!e.has("Parent"))return(0,a.warn)("Unknown field name, falling back to empty field name."),""
if(!e.has("Parent"))return(0,a.stringToPDFString)(e.get("T"))
var t=[]
e.has("T")&&t.unshift((0,a.stringToPDFString)(e.get("T")))
for(var r=e;r.has("Parent")&&(r=r.get("Parent"),(0,n.isDict)(r));)r.has("T")&&t.unshift((0,a.stringToPDFString)(r.get("T")))
return t.join(".")}},{key:"hasFieldFlag",value:function(e){return!!(this.data.fieldFlags&e)}},{key:"getOperatorList",value:function(e,r,a){return a?Promise.resolve(new s.OperatorList):h(f(t.prototype),"getOperatorList",this).call(this,e,r,a)}}]),t}(),k=function(e){function t(e){var r
g(this,t),r=u(this,f(t).call(this,e))
var i=e.dict
r.data.fieldValue=(0,a.stringToPDFString)(r.data.fieldValue||"")
var n=(0,a.getInheritableProperty)({dict:i,key:"Q"});(!Number.isInteger(n)||n<0||n>2)&&(n=null),r.data.textAlignment=n
var o=(0,a.getInheritableProperty)({dict:i,key:"MaxLen"})
return(!Number.isInteger(o)||o<0)&&(o=null),r.data.maxLen=o,r.data.multiLine=r.hasFieldFlag(a.AnnotationFieldFlag.MULTILINE),r.data.comb=r.hasFieldFlag(a.AnnotationFieldFlag.COMB)&&!r.hasFieldFlag(a.AnnotationFieldFlag.MULTILINE)&&!r.hasFieldFlag(a.AnnotationFieldFlag.PASSWORD)&&!r.hasFieldFlag(a.AnnotationFieldFlag.FILESELECT)&&null!==r.data.maxLen,r}return d(t,w),p(t,[{key:"getOperatorList",value:function(e,r,i){if(i||this.appearance)return h(f(t.prototype),"getOperatorList",this).call(this,e,r,i)
var n=new s.OperatorList
if(!this.data.defaultAppearance)return Promise.resolve(n)
var o=new c.Stream((0,a.stringToBytes)(this.data.defaultAppearance))
return e.getOperatorList({stream:o,task:r,resources:this.fieldResources,operatorList:n}).then(function(){return n})}}]),t}(),S=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.checkBox=!r.hasFieldFlag(a.AnnotationFieldFlag.RADIO)&&!r.hasFieldFlag(a.AnnotationFieldFlag.PUSHBUTTON),r.data.radioButton=r.hasFieldFlag(a.AnnotationFieldFlag.RADIO)&&!r.hasFieldFlag(a.AnnotationFieldFlag.PUSHBUTTON),r.data.pushButton=r.hasFieldFlag(a.AnnotationFieldFlag.PUSHBUTTON),r.data.checkBox?r._processCheckBox(e):r.data.radioButton?r._processRadioButton(e):r.data.pushButton?r._processPushButton(e):(0,a.warn)("Invalid field flags for button widget annotation"),r}return d(t,w),p(t,[{key:"_processCheckBox",value:function(e){(0,n.isName)(this.data.fieldValue)&&(this.data.fieldValue=this.data.fieldValue.name)
var t=e.dict.get("AP")
if((0,n.isDict)(t)){var r=t.get("D")
if((0,n.isDict)(r)){var a=r.getKeys()
2===a.length&&(this.data.exportValue="Off"===a[0]?a[1]:a[0])}}}},{key:"_processRadioButton",value:function(e){this.data.fieldValue=this.data.buttonValue=null
var t=e.dict.get("Parent")
if((0,n.isDict)(t)&&t.has("V")){var r=t.get("V");(0,n.isName)(r)&&(this.data.fieldValue=r.name)}var a=e.dict.get("AP")
if((0,n.isDict)(a)){var i=a.get("N")
if((0,n.isDict)(i))for(var o=i.getKeys(),s=0,c=o.length;s<c;s++)if("Off"!==o[s]){this.data.buttonValue=o[s]
break}}}},{key:"_processPushButton",value:function(e){e.dict.has("A")?i.Catalog.parseDestDictionary({destDict:e.dict,resultObj:this.data,docBaseUrl:e.pdfManager.docBaseUrl}):(0,a.warn)("Push buttons without action dictionaries are not supported")}}]),t}(),C=function(e){function t(e){var r
g(this,t),(r=u(this,f(t).call(this,e))).data.options=[]
var i=(0,a.getInheritableProperty)({dict:e.dict,key:"Opt"})
if(Array.isArray(i))for(var n=e.xref,o=0,s=i.length;o<s;o++){var c=n.fetchIfRef(i[o]),l=Array.isArray(c)
r.data.options[o]={exportValue:l?n.fetchIfRef(c[0]):c,displayValue:(0,a.stringToPDFString)(l?n.fetchIfRef(c[1]):c)}}return Array.isArray(r.data.fieldValue)||(r.data.fieldValue=[r.data.fieldValue]),r.data.combo=r.hasFieldFlag(a.AnnotationFieldFlag.COMBO),r.data.multiSelect=r.hasFieldFlag(a.AnnotationFieldFlag.MULTISELECT),r}return d(t,w),t}(),x=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.TEXT,r.data.hasAppearance?r.data.name="NoIcon":(r.data.rect[1]=r.data.rect[3]-22,r.data.rect[2]=r.data.rect[0]+22,r.data.name=e.dict.has("Name")?e.dict.get("Name").name:"Note"),r._preparePopup(e.dict),r}return d(t,b),t}(),A=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.LINK,i.Catalog.parseDestDictionary({destDict:e.dict,resultObj:r.data,docBaseUrl:e.pdfManager.docBaseUrl}),r}return d(t,b),t}(),_=function(e){function t(e){var r
g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.POPUP
var i=e.dict,o=i.get("Parent")
if(!o)return(0,a.warn)("Popup annotation has a missing or invalid parent annotation."),u(r)
var s=o.get("Subtype")
if(r.data.parentType=(0,n.isName)(s)?s.name:null,r.data.parentId=i.getRaw("Parent").toString(),r.data.title=(0,a.stringToPDFString)(o.get("T")||""),r.data.contents=(0,a.stringToPDFString)(o.get("Contents")||""),o.has("C")?(r.setColor(o.getArray("C")),r.data.color=r.color):r.data.color=null,!r.viewable){var c=o.get("F")
r._isViewable(c)&&r.setFlags(c)}return r}return d(t,b),t}(),P=function(e){function t(e){var r
g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.LINE
var i=e.dict
return r.data.lineCoordinates=a.Util.normalizeRect(i.getArray("L")),r._preparePopup(i),r}return d(t,b),t}(),I=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.SQUARE,r._preparePopup(e.dict),r}return d(t,b),t}(),O=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.CIRCLE,r._preparePopup(e.dict),r}return d(t,b),t}(),E=function(e){function t(e){var r
g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.POLYLINE
var i=e.dict,n=i.getArray("Vertices")
r.data.vertices=[]
for(var o=0,s=n.length;o<s;o+=2)r.data.vertices.push({x:n[o],y:n[o+1]})
return r._preparePopup(i),r}return d(t,b),t}(),T=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.POLYGON,r}return d(t,E),t}(),F=function(e){function t(e){var r
g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.INK
var i=e.dict,n=e.xref,o=i.getArray("InkList")
r.data.inkLists=[]
for(var s=0,c=o.length;s<c;++s){r.data.inkLists.push([])
for(var l=0,h=o[s].length;l<h;l+=2)r.data.inkLists[s].push({x:n.fetchIfRef(o[s][l]),y:n.fetchIfRef(o[s][l+1])})}return r._preparePopup(i),r}return d(t,b),t}(),R=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.HIGHLIGHT,r._preparePopup(e.dict),r}return d(t,b),t}(),B=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.UNDERLINE,r._preparePopup(e.dict),r}return d(t,b),t}(),D=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.SQUIGGLY,r._preparePopup(e.dict),r}return d(t,b),t}(),M=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.STRIKEOUT,r._preparePopup(e.dict),r}return d(t,b),t}(),L=function(e){function t(e){var r
return g(this,t),(r=u(this,f(t).call(this,e))).data.annotationType=a.AnnotationType.STAMP,r._preparePopup(e.dict),r}return d(t,b),t}(),N=function(e){function t(e){var r
g(this,t),r=u(this,f(t).call(this,e))
var n=new i.FileSpec(e.dict.get("FS"),e.xref)
return r.data.annotationType=a.AnnotationType.FILEATTACHMENT,r.data.file=n.serializable,r._preparePopup(e.dict),r}return d(t,b),t}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.OperatorList=void 0
var a=r(6),i=function(){function e(e,t,r,a,i){for(var n=e,o=0,s=t.length-1;o<s;o++){var c=t[o]
n=n[c]||(n[c]=[])}n[t[t.length-1]]={checkFn:r,iterateFn:a,processFn:i}}var t=[]
function r(e){this.queue=e,this.state=null,this.context={iCurr:0,fnArray:e.fnArray,argsArray:e.argsArray},this.match=null,this.lastProcessed=0}return e(t,[a.OPS.save,a.OPS.transform,a.OPS.paintInlineImageXObject,a.OPS.restore],null,function(e,t){var r=e.fnArray
switch((t-(e.iCurr-3))%4){case 0:return r[t]===a.OPS.save
case 1:return r[t]===a.OPS.transform
case 2:return r[t]===a.OPS.paintInlineImageXObject
case 3:return r[t]===a.OPS.restore}},function(e,t){var r=e.fnArray,i=e.argsArray,n=e.iCurr,o=n-3,s=n-2,c=n-1,l=Math.min(Math.floor((t-o)/4),200)
if(l<10)return t-(t-o)%4
var u,h=0,f=[],d=0,g=1,m=1
for(u=0;u<l;u++){var p=i[s+(u<<2)],v=i[c+(u<<2)][0]
g+v.width>1e3&&(h=Math.max(h,g),m+=d+2,g=0,d=0),f.push({transform:p,x:g,y:m,w:v.width,h:v.height}),g+=v.width+2,d=Math.max(d,v.height)}var b=Math.max(h,g)+1,y=m+d+1,w=new Uint8ClampedArray(b*y*4),k=b<<2
for(u=0;u<l;u++){var S=i[c+(u<<2)][0].data,C=f[u].w<<2,x=0,A=f[u].x+f[u].y*b<<2
w.set(S.subarray(0,C),A-k)
for(var _=0,P=f[u].h;_<P;_++)w.set(S.subarray(x,x+C),A),x+=C,A+=k
for(w.set(S.subarray(x-C,x),A);A>=0;)S[A-4]=S[A],S[A-3]=S[A+1],S[A-2]=S[A+2],S[A-1]=S[A+3],S[A+C]=S[A+C-4],S[A+C+1]=S[A+C-3],S[A+C+2]=S[A+C-2],S[A+C+3]=S[A+C-1],A-=k}return r.splice(o,4*l,a.OPS.paintInlineImageXObjectGroup),i.splice(o,4*l,[{width:b,height:y,kind:a.ImageKind.RGBA_32BPP,data:w},f]),o+1}),e(t,[a.OPS.save,a.OPS.transform,a.OPS.paintImageMaskXObject,a.OPS.restore],null,function(e,t){var r=e.fnArray
switch((t-(e.iCurr-3))%4){case 0:return r[t]===a.OPS.save
case 1:return r[t]===a.OPS.transform
case 2:return r[t]===a.OPS.paintImageMaskXObject
case 3:return r[t]===a.OPS.restore}},function(e,t){var r,i=e.fnArray,n=e.argsArray,o=e.iCurr,s=o-3,c=o-2,l=o-1,u=Math.floor((t-s)/4)
if((u=function(e,t,r,i){for(var n=e+2,o=0;o<t;o++){var s=i[n+4*o],c=1===s.length&&s[0]
if(!c||1!==c.width||1!==c.height||c.data.length&&(1!==c.data.length||0!==c.data[0]))break
r[n+4*o]=a.OPS.paintSolidColorImageMask}return t-o}(s,u,i,n))<10)return t-(t-s)%4
var h,f,d=!1,g=n[l][0]
if(0===n[c][1]&&0===n[c][2]){d=!0
var m=n[c][0],p=n[c][3]
h=c+4
var v=l+4
for(r=1;r<u;r++,h+=4,v+=4)if(f=n[h],n[v][0]!==g||f[0]!==m||0!==f[1]||0!==f[2]||f[3]!==p){r<10?d=!1:u=r
break}}if(d){u=Math.min(u,1e3)
var b=new Float32Array(2*u)
for(h=c,r=0;r<u;r++,h+=4)f=n[h],b[r<<1]=f[4],b[1+(r<<1)]=f[5]
i.splice(s,4*u,a.OPS.paintImageMaskXObjectRepeat),n.splice(s,4*u,[g,m,p,b])}else{u=Math.min(u,100)
var y=[]
for(r=0;r<u;r++){f=n[c+(r<<2)]
var w=n[l+(r<<2)][0]
y.push({data:w.data,width:w.width,height:w.height,transform:f})}i.splice(s,4*u,a.OPS.paintImageMaskXObjectGroup),n.splice(s,4*u,[y])}return s+1}),e(t,[a.OPS.save,a.OPS.transform,a.OPS.paintImageXObject,a.OPS.restore],function(e){var t=e.argsArray,r=e.iCurr-2
return 0===t[r][1]&&0===t[r][2]},function(e,t){var r=e.fnArray,i=e.argsArray
switch((t-(e.iCurr-3))%4){case 0:return r[t]===a.OPS.save
case 1:if(r[t]!==a.OPS.transform)return!1
var n=e.iCurr-2,o=i[n][0],s=i[n][3]
return i[t][0]===o&&0===i[t][1]&&0===i[t][2]&&i[t][3]===s
case 2:if(r[t]!==a.OPS.paintImageXObject)return!1
var c=i[e.iCurr-1][0]
return i[t][0]===c
case 3:return r[t]===a.OPS.restore}},function(e,t){var r=e.fnArray,i=e.argsArray,n=e.iCurr,o=n-3,s=n-2,c=i[n-1][0],l=i[s][0],u=i[s][3],h=Math.min(Math.floor((t-o)/4),1e3)
if(h<3)return t-(t-o)%4
for(var f=new Float32Array(2*h),d=s,g=0;g<h;g++,d+=4){var m=i[d]
f[g<<1]=m[4],f[1+(g<<1)]=m[5]}var p=[c,l,u,f]
return r.splice(o,4*h,a.OPS.paintImageXObjectRepeat),i.splice(o,4*h,p),o+1}),e(t,[a.OPS.beginText,a.OPS.setFont,a.OPS.setTextMatrix,a.OPS.showText,a.OPS.endText],null,function(e,t){var r=e.fnArray,i=e.argsArray
switch((t-(e.iCurr-4))%5){case 0:return r[t]===a.OPS.beginText
case 1:return r[t]===a.OPS.setFont
case 2:return r[t]===a.OPS.setTextMatrix
case 3:if(r[t]!==a.OPS.showText)return!1
var n=e.iCurr-3,o=i[n][0],s=i[n][1]
return i[t][0]===o&&i[t][1]===s
case 4:return r[t]===a.OPS.endText}},function(e,t){var r=e.fnArray,a=e.argsArray,i=e.iCurr,n=i-4,o=i-3,s=i-2,c=i-1,l=i,u=a[o][0],h=a[o][1],f=Math.min(Math.floor((t-n)/5),1e3)
if(f<3)return t-(t-n)%5
var d=n
n>=4&&r[n-4]===r[o]&&r[n-3]===r[s]&&r[n-2]===r[c]&&r[n-1]===r[l]&&a[n-4][0]===u&&a[n-4][1]===h&&(f++,d-=5)
for(var g=d+4,m=1;m<f;m++)r.splice(g,3),a.splice(g,3),g+=2
return g+1}),r.prototype={_optimize:function(){var e=this.queue.fnArray,r=this.lastProcessed,a=e.length,i=this.state,n=this.match
if(i||n||r+1!==a||t[e[r]]){for(var o=this.context;r<a;){if(n){if((0,n.iterateFn)(o,r)){r++
continue}if(r=(0,n.processFn)(o,r+1),n=null,i=null,r>=(a=e.length))break}(i=(i||t)[e[r]])&&!Array.isArray(i)?(o.iCurr=r,r++,!i.checkFn||(0,i.checkFn)(o)?(n=i,i=null):i=null):r++}this.state=i,this.match=n,this.lastProcessed=r}else this.lastProcessed=a},push:function(e,t){this.queue.fnArray.push(e),this.queue.argsArray.push(t),this._optimize()},flush:function(){for(;this.match;){var e=this.queue.fnArray.length
this.lastProcessed=(0,this.match.processFn)(this.context,e),this.match=null,this.state=null,this._optimize()}},reset:function(){this.state=null,this.match=null,this.lastProcessed=0}},r}(),n=function(){function e(e){this.queue=e}return e.prototype={push:function(e,t){this.queue.fnArray.push(e),this.queue.argsArray.push(t)},flush:function(){}},e}(),o=function(){function e(e,t,r){this.messageHandler=t,this.fnArray=[],this.argsArray=[],t&&"oplist"!==this.intent?this.optimizer=new i(this):this.optimizer=new n(this),this.dependencies=Object.create(null),this._totalLength=0,this.pageIndex=r,this.intent=e,this.weight=0}return e.prototype={get length(){return this.argsArray.length},get totalLength(){return this._totalLength+this.length},addOp:function(e,t){this.optimizer.push(e,t),this.weight++,this.messageHandler&&(this.weight>=1e3?this.flush():this.weight>=995&&(e===a.OPS.restore||e===a.OPS.endText)&&this.flush())},addDependency:function(e){e in this.dependencies||(this.dependencies[e]=!0,this.addOp(a.OPS.dependency,[e]))},addDependencies:function(e){for(var t in e)this.addDependency(t)},addOpList:function(e){Object.assign(this.dependencies,e.dependencies)
for(var t=0,r=e.length;t<r;t++)this.addOp(e.fnArray[t],e.argsArray[t])},getIR:function(){return{fnArray:this.fnArray,argsArray:this.argsArray,length:this.length}},flush:function(e){this.optimizer.flush()
var t=function(e){for(var t=[],r=e.fnArray,i=e.argsArray,n=0,o=e.length;n<o;n++)switch(r[n]){case a.OPS.paintInlineImageXObject:case a.OPS.paintInlineImageXObjectGroup:case a.OPS.paintImageMaskXObject:var s=i[n][0]
s.cached||t.push(s.data.buffer)}return t}(this),r=this.length
this._totalLength+=r,this.messageHandler.send("RenderPageChunk",{operatorList:{fnArray:this.fnArray,argsArray:this.argsArray,lastChunk:e,length:r},pageIndex:this.pageIndex,intent:this.intent},t),this.dependencies=Object.create(null),this.fnArray.length=0,this.argsArray.length=0,this.weight=0,this.optimizer.reset()}},e}()
t.OperatorList=o},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.PartialEvaluator=void 0
var a,i=(a=r(2))&&a.__esModule?a:{default:a},n=r(6),o=r(172),s=r(157),c=r(155),l=r(173),u=r(176),h=r(179),f=r(178),d=r(182),g=r(156),m=r(183),p=r(168),v=r(177),b=r(184),y=r(185),w=r(163),k=r(187),S=r(170),C=r(188)
function x(e,t,r,a,i,n,o){try{var s=e[n](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(a,i)}var A=function(){var e={forceDataSchema:!1,maxImageSize:-1,disableFontFace:!1,nativeImageDecoderSupport:n.NativeImageDecoding.DECODE,ignoreErrors:!1,isEvalSupported:!0}
function t(e){var t=e.xref,r=e.resources,a=e.handler,i=e.forceDataSchema,n=void 0!==i&&i,o=e.pdfFunctionFactory
this.xref=t,this.resources=r,this.handler=a,this.forceDataSchema=n,this.pdfFunctionFactory=o}function r(t){var r=this,a=t.pdfManager,o=t.xref,s=t.handler,c=t.pageIndex,l=t.idFactory,u=t.fontCache,h=t.builtInCMapCache,f=t.options,d=void 0===f?null:f,g=t.pdfFunctionFactory
this.pdfManager=a,this.xref=o,this.handler=s,this.pageIndex=c,this.idFactory=l,this.fontCache=u,this.builtInCMapCache=h,this.options=d||e,this.pdfFunctionFactory=g,this.fetchBuiltInCMap=function(){var e,t=(e=i.default.mark(function e(t){var a
return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.builtInCMapCache.has(t)){e.next=2
break}return e.abrupt("return",r.builtInCMapCache.get(t))
case 2:return e.next=4,r.handler.sendWithPromise("FetchBuiltInCMap",{name:t})
case 4:return(a=e.sent).compressionType!==n.CMapCompressionType.NONE&&r.builtInCMapCache.set(t,a),e.abrupt("return",a)
case 7:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var n=e.apply(t,r)
function o(e){x(n,a,i,o,s,"next",e)}function s(e){x(n,a,i,o,s,"throw",e)}o(void 0)})})
return function(e){return t.apply(this,arguments)}}()}function a(){this.reset()}function g(e){if(!(0,c.isName)(e))return"source-over"
switch(e.name){case"Normal":case"Compatible":return"source-over"
case"Multiply":return"multiply"
case"Screen":return"screen"
case"Overlay":return"overlay"
case"Darken":return"darken"
case"Lighten":return"lighten"
case"ColorDodge":return"color-dodge"
case"ColorBurn":return"color-burn"
case"HardLight":return"hard-light"
case"SoftLight":return"soft-light"
case"Difference":return"difference"
case"Exclusion":return"exclusion"
case"Hue":return"hue"
case"Saturation":return"saturation"
case"Color":return"color"
case"Luminosity":return"luminosity"}return(0,n.warn)("Unsupported blend mode: "+e.name),"source-over"}t.prototype={canDecode:function(e){return e instanceof w.JpegStream&&t.isDecodable(e,this.xref,this.resources,this.pdfFunctionFactory)},decode:function(e){var t=e.dict.get("ColorSpace","CS")
return t=p.ColorSpace.parse(t,this.xref,this.resources,this.pdfFunctionFactory),this.handler.sendWithPromise("JpegDecode",[e.getIR(this.forceDataSchema),t.numComps]).then(function(t){var r=t.data
return t.width,t.height,new s.Stream(r,0,r.length,e.dict)})}},t.isSupported=function(e,t,r,a){var i=e.dict
if(i.has("DecodeParms")||i.has("DP"))return!1
var n=p.ColorSpace.parse(i.get("ColorSpace","CS"),t,r,a)
return("DeviceGray"===n.name||"DeviceRGB"===n.name)&&n.isDefaultDecode(i.getArray("Decode","D"))},t.isDecodable=function(e,t,r,a){var i=e.dict
if(i.has("DecodeParms")||i.has("DP"))return!1
var n=p.ColorSpace.parse(i.get("ColorSpace","CS"),t,r,a),o=i.get("BitsPerComponent","BPC")||1
return(1===n.numComps||3===n.numComps)&&n.isDefaultDecode(i.getArray("Decode","D"),o)},a.prototype={check:function(){return!(++this.checked<100)&&(this.checked=0,this.endTime<=Date.now())},reset:function(){this.endTime=Date.now()+20,this.checked=0}}
var A=Promise.resolve()
return r.prototype={clone:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e,r=Object.create(this)
return r.options=t,r},hasBlendModes:function(e){if(!(0,c.isDict)(e))return!1
var t=Object.create(null)
e.objId&&(t[e.objId]=!0)
for(var r=[e],a=this.xref;r.length;){var i,n,o,s=r.shift(),l=s.get("ExtGState")
if((0,c.isDict)(l)){var u=l.getKeys()
for(n=0,o=u.length;n<o;n++){i=u[n]
var h=l.get(i).get("BM")
if((0,c.isName)(h)&&"Normal"!==h.name)return!0}}var f=s.get("XObject")
if((0,c.isDict)(f)){var d=f.getKeys()
for(n=0,o=d.length;n<o;n++){i=d[n]
var g=f.getRaw(i)
if((0,c.isRef)(g)){if(t[g.toString()])continue
g=a.fetch(g)}if((0,c.isStream)(g)){if(g.dict.objId){if(t[g.dict.objId])continue
t[g.dict.objId]=!0}var m=g.dict.get("Resources")
!(0,c.isDict)(m)||m.objId&&t[m.objId]||(r.push(m),m.objId&&(t[m.objId]=!0))}}}}return!1},buildFormXObject:function(e,t,r,a,i,o){var s=t.dict,l=s.getArray("Matrix"),u=s.getArray("BBox")
u=Array.isArray(u)&&4===u.length?n.Util.normalizeRect(u):null
var h=s.get("Group")
if(h){var f={matrix:l,bbox:u,smask:r,isolated:!1,knockout:!1},d=h.get("S"),g=null;(0,c.isName)(d,"Transparency")&&(f.isolated=h.get("I")||!1,f.knockout=h.get("K")||!1,h.has("CS")&&(g=p.ColorSpace.parse(h.get("CS"),this.xref,e,this.pdfFunctionFactory))),r&&r.backdrop&&(g=g||p.ColorSpace.singletons.rgb,r.backdrop=g.getRgb(r.backdrop,0)),a.addOp(n.OPS.beginGroup,[f])}return a.addOp(n.OPS.paintFormXObjectBegin,[l,u]),this.getOperatorList({stream:t,task:i,resources:s.get("Resources")||e,operatorList:a,initialState:o}).then(function(){a.addOp(n.OPS.paintFormXObjectEnd,[]),h&&a.addOp(n.OPS.endGroup,[f])})},buildPaintImageXObject:function(e){var r=this,a=e.resources,i=e.image,o=e.isInline,c=void 0!==o&&o,l=e.operatorList,u=e.cacheKey,h=e.imageCache,f=e.forceDisableNativeImageDecoder,d=void 0!==f&&f,g=i.dict,m=g.get("Width","W"),p=g.get("Height","H")
if(!(m&&(0,n.isNum)(m)&&p&&(0,n.isNum)(p)))return(0,n.warn)("Image dimensions are missing, or not numbers."),Promise.resolve()
var v,b,y=this.options.maxImageSize
if(-1!==y&&m*p>y)return(0,n.warn)("Image exceeded maximum allowed size and was removed."),Promise.resolve()
if(g.get("ImageMask","IM")){var k=g.get("Width","W"),S=g.get("Height","H"),x=k+7>>3,A=i.getBytes(x*S,!0),_=g.getArray("Decode","D")
return(v=C.PDFImage.createMask({imgArray:A,width:k,height:S,imageIsFromDecodeStream:i instanceof s.DecodeStream,inverseDecode:!!_&&_[0]>0})).cached=!0,b=[v],l.addOp(n.OPS.paintImageMaskXObject,b),u&&(h[u]={fn:n.OPS.paintImageMaskXObject,args:b}),Promise.resolve()}var P=g.get("SMask","SM")||!1,I=g.get("Mask")||!1
if(c&&!P&&!I&&!(i instanceof w.JpegStream)&&m+p<200)return v=new C.PDFImage({xref:this.xref,res:a,image:i,isInline:c,pdfFunctionFactory:this.pdfFunctionFactory}).createImageData(!0),l.addOp(n.OPS.paintInlineImageXObject,[v]),Promise.resolve()
var O=d?n.NativeImageDecoding.NONE:this.options.nativeImageDecoderSupport,E="img_"+this.idFactory.createObjId()
if(O!==n.NativeImageDecoding.NONE&&!P&&!I&&i instanceof w.JpegStream&&t.isSupported(i,this.xref,a,this.pdfFunctionFactory))return this.handler.sendWithPromise("obj",[E,this.pageIndex,"JpegStream",i.getIR(this.options.forceDataSchema)]).then(function(){l.addDependency(E),b=[E,m,p],l.addOp(n.OPS.paintJpegXObject,b),u&&(h[u]={fn:n.OPS.paintJpegXObject,args:b})},function(e){return(0,n.warn)("Native JPEG decoding failed -- trying to recover: "+(e&&e.message)),r.buildPaintImageXObject({resources:a,image:i,isInline:c,operatorList:l,cacheKey:u,imageCache:h,forceDisableNativeImageDecoder:!0})})
var T=null
return O===n.NativeImageDecoding.DECODE&&(i instanceof w.JpegStream||I instanceof w.JpegStream||P instanceof w.JpegStream)&&(T=new t({xref:this.xref,resources:a,handler:this.handler,forceDataSchema:this.options.forceDataSchema,pdfFunctionFactory:this.pdfFunctionFactory})),l.addDependency(E),b=[E,m,p],C.PDFImage.buildImage({handler:this.handler,xref:this.xref,res:a,image:i,isInline:c,nativeDecoder:T,pdfFunctionFactory:this.pdfFunctionFactory}).then(function(e){var t=e.createImageData(!1)
r.handler.send("obj",[E,r.pageIndex,"Image",t],[t.data.buffer])}).catch(function(e){(0,n.warn)("Unable to decode image: "+e),r.handler.send("obj",[E,r.pageIndex,"Image",null])}),l.addOp(n.OPS.paintImageXObject,b),u&&(h[u]={fn:n.OPS.paintImageXObject,args:b}),Promise.resolve()},handleSMask:function(e,t,r,a,i){var n=e.get("G"),o={subtype:e.get("S").name,backdrop:e.get("BC")},s=e.get("TR")
if((0,y.isPDFFunction)(s)){for(var c=this.pdfFunctionFactory.create(s),l=new Uint8Array(256),u=new Float32Array(1),h=0;h<256;h++)u[0]=h/255,c(u,0,u,0),l[h]=255*u[0]|0
o.transferMap=l}return this.buildFormXObject(t,n,o,r,a,i.state.clone())},handleTilingType:function(e,t,r,a,i,o,s){var l=this,u=new S.OperatorList,h=[i.get("Resources"),r],f=c.Dict.merge(this.xref,h)
return this.getOperatorList({stream:a,task:s,resources:f,operatorList:u}).then(function(){return(0,d.getTilingPatternIR)({fnArray:u.fnArray,argsArray:u.argsArray},i,t)}).then(function(t){o.addDependencies(u.dependencies),o.addOp(e,t)},function(e){if(!l.options.ignoreErrors)throw e
l.handler.send("UnsupportedFeature",{featureId:n.UNSUPPORTED_FEATURES.unknown}),(0,n.warn)('handleTilingType - ignoring pattern: "'.concat(e,'".'))})},handleSetFont:function(e,t,r,a,i,o){var s,c=this
return t&&(s=(t=t.slice())[0].name),this.loadFont(s,r,e).then(function(t){return t.font.isType3Font?t.loadType3Data(c,e,a,i).then(function(){return t}).catch(function(e){return c.handler.send("UnsupportedFeature",{featureId:n.UNSUPPORTED_FEATURES.font}),new _("g_font_error",new l.ErrorFont("Type3 font load error: "+e),t.font)}):t}).then(function(e){return o.font=e.font,e.send(c.handler),e.loadedName})},handleText:function(e,t){var a=t.font,i=a.charsToGlyphs(e)
return a.data&&(t.textRenderingMode&n.TextRenderingMode.ADD_TO_PATH_FLAG||"Pattern"===t.fillColorSpace.name||a.disableFontFace||this.options.disableFontFace)&&r.buildFontPaths(a,i,this.handler),i},setGState:function(e,t,r,a,i){for(var o=this,s=[],l=t.getKeys(),u=Promise.resolve(),h=function(){var h=l[f],d=t.get(h)
switch(h){case"Type":break
case"LW":case"LC":case"LJ":case"ML":case"D":case"RI":case"FL":case"CA":case"ca":s.push([h,d])
break
case"Font":u=u.then(function(){return o.handleSetFont(e,null,d[0],r,a,i.state).then(function(e){r.addDependency(e),s.push([h,[e,d[1]]])})})
break
case"BM":s.push([h,g(d)])
break
case"SMask":if((0,c.isName)(d,"None")){s.push([h,!1])
break}(0,c.isDict)(d)?(u=u.then(function(){return o.handleSMask(d,e,r,a,i)}),s.push([h,!0])):(0,n.warn)("Unsupported SMask type")
break
case"OP":case"op":case"OPM":case"BG":case"BG2":case"UCR":case"UCR2":case"TR":case"TR2":case"HT":case"SM":case"SA":case"AIS":case"TK":(0,n.info)("graphic state operator "+h)
break
default:(0,n.info)("Unknown graphic state operator "+h)}},f=0,d=l.length;f<d;f++)h()
return u.then(function(){s.length>0&&r.addOp(n.OPS.setGState,[s])})},loadFont:function(e,t,r){var a=this
function i(){return Promise.resolve(new _("g_font_error",new l.ErrorFont("Font "+e+" is not available"),t))}var o,s=this.xref
if(t){if(!(0,c.isRef)(t))throw new Error('The "font" object should be a reference.')
o=t}else{var u=r.get("Font")
if(!u)return(0,n.warn)("fontRes not available"),i()
o=u.getRaw(e)}if(!o)return(0,n.warn)("fontRef not available"),i()
if(this.fontCache.has(o))return this.fontCache.get(o)
if(t=s.fetchIfRef(o),!(0,c.isDict)(t))return i()
if(t.translated)return t.translated
var h,f,d=(0,n.createPromiseCapability)(),g=this.preEvaluateFont(t),m=g.descriptor,p=(0,c.isRef)(o)
if(p&&(h=o.toString()),(0,c.isDict)(m)){m.fontAliases||(m.fontAliases=Object.create(null))
var v=m.fontAliases,b=g.hash
if(v[b]){var y=v[b].aliasRef
if(p&&y&&this.fontCache.has(y))return this.fontCache.putAlias(o,y),this.fontCache.get(o)}else v[b]={fontID:l.Font.getFontID()}
p&&(v[b].aliasRef=o),h=v[b].fontID}p?this.fontCache.put(o,d.promise):(h||(h=this.idFactory.createObjId()),this.fontCache.put("id_"+h,d.promise)),(0,n.assert)(h,'The "fontID" must be defined.'),t.loadedName="g_"+this.pdfManager.docId+"_f"+h,t.translated=d.promise
try{f=this.translateFont(g)}catch(e){f=Promise.reject(e)}return f.then(function(e){void 0!==e.fontType&&(s.stats.fontTypes[e.fontType]=!0),d.resolve(new _(t.loadedName,e,t))}).catch(function(e){a.handler.send("UnsupportedFeature",{featureId:n.UNSUPPORTED_FEATURES.font})
try{var r=g.descriptor,i=r&&r.get("FontFile3"),o=i&&i.get("Subtype"),c=(0,l.getFontType)(g.type,o&&o.name)
s.stats.fontTypes[c]=!0}catch(e){}d.resolve(new _(t.loadedName,new l.ErrorFont(e instanceof Error?e.message:e),t))}),d.promise},buildPath:function(e,t,r){var a=e.length-1
if(r||(r=[]),a<0||e.fnArray[a]!==n.OPS.constructPath)e.addOp(n.OPS.constructPath,[[t],r])
else{var i=e.argsArray[a]
i[0].push(t),Array.prototype.push.apply(i[1],r)}},handleColorN:function(e,t,r,a,i,n,o){var s,l=r[r.length-1]
if((0,c.isName)(l)&&(s=i.get(l.name))){var u=(0,c.isStream)(s)?s.dict:s,h=u.get("PatternType")
if(1===h){var f=a.base?a.base.getRgb(r,0):null
return this.handleTilingType(t,f,n,s,u,e,o)}if(2===h){var g=u.get("Shading"),m=u.getArray("Matrix")
return s=d.Pattern.parseShading(g,m,this.xref,n,this.handler,this.pdfFunctionFactory),e.addOp(t,s.getIR()),Promise.resolve()}return Promise.reject(new Error("Unknown PatternType: "+h))}return e.addOp(t,r),Promise.resolve()},getOperatorList:function(e){var t=this,r=e.stream,i=e.task,o=e.resources,s=e.operatorList,l=e.initialState,u=void 0===l?null:l
if(o=o||c.Dict.empty,u=u||new O,!s)throw new Error('getOperatorList: missing "operatorList" parameter')
var h=this,f=this.xref,g=Object.create(null),m=o.get("XObject")||c.Dict.empty,v=o.get("Pattern")||c.Dict.empty,b=new P(u),y=new E(r,f,b),w=new a
function k(e){for(var t=0,r=y.savedStatesDepth;t<r;t++)s.addOp(n.OPS.restore,[])}return new Promise(function e(t,r){var a=function(a){a.then(function(){try{e(t,r)}catch(e){r(e)}},r)}
i.ensureNotTerminated(),w.reset()
for(var l,u,S,C,x={};!(l=w.check())&&(x.args=null,y.read(x));){var _=x.args,P=x.fn
switch(0|P){case n.OPS.paintXObject:var I=_[0].name
if(I&&void 0!==g[I]){s.addOp(g[I].fn,g[I].args),_=null
continue}return void a(new Promise(function(e,t){if(!I)throw new n.FormatError("XObject must be referred to by name.")
var r=m.get(I)
if(r){if(!(0,c.isStream)(r))throw new n.FormatError("XObject should be a stream")
var a=r.dict.get("Subtype")
if(!(0,c.isName)(a))throw new n.FormatError("XObject should have a Name subtype")
if("Form"!==a.name)if("Image"!==a.name){if("PS"!==a.name)throw new n.FormatError("Unhandled XObject subtype ".concat(a.name));(0,n.info)("Ignored XObject subtype PS"),e()}else h.buildPaintImageXObject({resources:o,image:r,operatorList:s,cacheKey:I,imageCache:g}).then(e,t)
else b.save(),h.buildFormXObject(o,r,null,s,i,b.state.clone()).then(function(){b.restore(),e()},t)}else s.addOp(P,_),e()}).catch(function(e){if(!h.options.ignoreErrors)throw e
h.handler.send("UnsupportedFeature",{featureId:n.UNSUPPORTED_FEATURES.unknown}),(0,n.warn)('getOperatorList - ignoring XObject: "'.concat(e,'".'))}))
case n.OPS.setFont:var O=_[1]
return void a(h.handleSetFont(o,_,null,s,i,b.state).then(function(e){s.addDependency(e),s.addOp(n.OPS.setFont,[e,O])}))
case n.OPS.endInlineImage:var E=_[0].cacheKey
if(E){var T=g[E]
if(void 0!==T){s.addOp(T.fn,T.args),_=null
continue}}return void a(h.buildPaintImageXObject({resources:o,image:_[0],isInline:!0,operatorList:s,cacheKey:E,imageCache:g}))
case n.OPS.showText:_[0]=h.handleText(_[0],b.state)
break
case n.OPS.showSpacedText:var F=_[0],R=[],B=F.length,D=b.state
for(u=0;u<B;++u){var M=F[u];(0,n.isString)(M)?Array.prototype.push.apply(R,h.handleText(M,D)):(0,n.isNum)(M)&&R.push(M)}_[0]=R,P=n.OPS.showText
break
case n.OPS.nextLineShowText:s.addOp(n.OPS.nextLine),_[0]=h.handleText(_[0],b.state),P=n.OPS.showText
break
case n.OPS.nextLineSetSpacingShowText:s.addOp(n.OPS.nextLine),s.addOp(n.OPS.setWordSpacing,[_.shift()]),s.addOp(n.OPS.setCharSpacing,[_.shift()]),_[0]=h.handleText(_[0],b.state),P=n.OPS.showText
break
case n.OPS.setTextRenderingMode:b.state.textRenderingMode=_[0]
break
case n.OPS.setFillColorSpace:b.state.fillColorSpace=p.ColorSpace.parse(_[0],f,o,h.pdfFunctionFactory)
continue
case n.OPS.setStrokeColorSpace:b.state.strokeColorSpace=p.ColorSpace.parse(_[0],f,o,h.pdfFunctionFactory)
continue
case n.OPS.setFillColor:C=b.state.fillColorSpace,_=C.getRgb(_,0),P=n.OPS.setFillRGBColor
break
case n.OPS.setStrokeColor:C=b.state.strokeColorSpace,_=C.getRgb(_,0),P=n.OPS.setStrokeRGBColor
break
case n.OPS.setFillGray:b.state.fillColorSpace=p.ColorSpace.singletons.gray,_=p.ColorSpace.singletons.gray.getRgb(_,0),P=n.OPS.setFillRGBColor
break
case n.OPS.setStrokeGray:b.state.strokeColorSpace=p.ColorSpace.singletons.gray,_=p.ColorSpace.singletons.gray.getRgb(_,0),P=n.OPS.setStrokeRGBColor
break
case n.OPS.setFillCMYKColor:b.state.fillColorSpace=p.ColorSpace.singletons.cmyk,_=p.ColorSpace.singletons.cmyk.getRgb(_,0),P=n.OPS.setFillRGBColor
break
case n.OPS.setStrokeCMYKColor:b.state.strokeColorSpace=p.ColorSpace.singletons.cmyk,_=p.ColorSpace.singletons.cmyk.getRgb(_,0),P=n.OPS.setStrokeRGBColor
break
case n.OPS.setFillRGBColor:b.state.fillColorSpace=p.ColorSpace.singletons.rgb,_=p.ColorSpace.singletons.rgb.getRgb(_,0)
break
case n.OPS.setStrokeRGBColor:b.state.strokeColorSpace=p.ColorSpace.singletons.rgb,_=p.ColorSpace.singletons.rgb.getRgb(_,0)
break
case n.OPS.setFillColorN:if("Pattern"===(C=b.state.fillColorSpace).name)return void a(h.handleColorN(s,n.OPS.setFillColorN,_,C,v,o,i))
_=C.getRgb(_,0),P=n.OPS.setFillRGBColor
break
case n.OPS.setStrokeColorN:if("Pattern"===(C=b.state.strokeColorSpace).name)return void a(h.handleColorN(s,n.OPS.setStrokeColorN,_,C,v,o,i))
_=C.getRgb(_,0),P=n.OPS.setStrokeRGBColor
break
case n.OPS.shadingFill:var L=o.get("Shading")
if(!L)throw new n.FormatError("No shading resource found")
var N=L.get(_[0].name)
if(!N)throw new n.FormatError("No shading object found")
var U=d.Pattern.parseShading(N,null,f,o,h.handler,h.pdfFunctionFactory).getIR()
_=[U],P=n.OPS.shadingFill
break
case n.OPS.setGState:var q=_[0],j=o.get("ExtGState")
if(!(0,c.isDict)(j)||!j.has(q.name))break
var z=j.get(q.name)
return void a(h.setGState(o,z,s,i,b))
case n.OPS.moveTo:case n.OPS.lineTo:case n.OPS.curveTo:case n.OPS.curveTo2:case n.OPS.curveTo3:case n.OPS.closePath:case n.OPS.rectangle:h.buildPath(s,P,_)
continue
case n.OPS.markPoint:case n.OPS.markPointProps:case n.OPS.beginMarkedContent:case n.OPS.beginMarkedContentProps:case n.OPS.endMarkedContent:case n.OPS.beginCompat:case n.OPS.endCompat:continue
default:if(null!==_){for(u=0,S=_.length;u<S&&!(_[u]instanceof c.Dict);u++);if(u<S){(0,n.warn)("getOperatorList - ignoring operator: "+P)
continue}}}s.addOp(P,_)}l?a(A):(k(),t())}).catch(function(e){if(!t.options.ignoreErrors)throw e
t.handler.send("UnsupportedFeature",{featureId:n.UNSUPPORTED_FEATURES.unknown}),(0,n.warn)('getOperatorList - ignoring errors during "'.concat(i.name,'" ')+'task: "'.concat(e,'".')),k()})},getTextContent:function(e){var t=this,r=e.stream,i=e.task,o=e.resources,s=e.stateManager,l=void 0===s?null:s,u=e.normalizeWhitespace,f=void 0!==u&&u,d=e.combineTextItems,g=void 0!==d&&d,p=e.sink,v=e.seenStyles,b=void 0===v?Object.create(null):v
o=o||c.Dict.empty,l=l||new P(new I)
var y,w=/\s/g,k={items:[],styles:Object.create(null)},S={initialized:!1,str:[],width:0,height:0,vertical:!1,lastAdvanceWidth:0,lastAdvanceHeight:0,textAdvanceScale:0,spaceWidth:0,fakeSpaceMin:1/0,fakeMultiSpaceMin:1/0,fakeMultiSpaceMax:-0,textRunBreakAllowed:!1,transform:null,fontName:null},C=.3,x=1.5,_=4,O=this,T=this.xref,F=null,R=Object.create(null),B=new E(r,T,l)
function D(){if(S.initialized)return S
var e=y.font
e.loadedName in b||(b[e.loadedName]=!0,k.styles[e.loadedName]={fontFamily:e.fallbackName,ascent:e.ascent,descent:e.descent,vertical:!!e.vertical}),S.fontName=e.loadedName
var t=[y.fontSize*y.textHScale,0,0,y.fontSize,0,y.textRise]
if(e.isType3Font&&y.fontMatrix!==n.FONT_IDENTITY_MATRIX&&1===y.fontSize){var r=e.bbox[3]-e.bbox[1]
r>0&&(r*=y.fontMatrix[3],t[3]*=r)}var a=n.Util.transform(y.ctm,n.Util.transform(y.textMatrix,t))
S.transform=a,e.vertical?(S.width=Math.sqrt(a[0]*a[0]+a[1]*a[1]),S.height=0,S.vertical=!0):(S.width=0,S.height=Math.sqrt(a[2]*a[2]+a[3]*a[3]),S.vertical=!1)
var i=y.textLineMatrix[0],o=y.textLineMatrix[1],s=Math.sqrt(i*i+o*o)
i=y.ctm[0],o=y.ctm[1]
var c=Math.sqrt(i*i+o*o)
S.textAdvanceScale=c*s,S.lastAdvanceWidth=0,S.lastAdvanceHeight=0
var l=e.spaceWidth/1e3*y.fontSize
return l?(S.spaceWidth=l,S.fakeSpaceMin=l*C,S.fakeMultiSpaceMin=l*x,S.fakeMultiSpaceMax=l*_,S.textRunBreakAllowed=!e.isMonospace):(S.spaceWidth=0,S.fakeSpaceMin=1/0,S.fakeMultiSpaceMin=1/0,S.fakeMultiSpaceMax=0,S.textRunBreakAllowed=!1),S.initialized=!0,S}function M(e){for(var t,r=0,a=e.length;r<a&&(t=e.charCodeAt(r))>=32&&t<=127;)r++
return r<a?e.replace(w," "):e}function L(e,t){return O.loadFont(e,t,o).then(function(e){y.font=e.font,y.fontMatrix=e.font.fontMatrix||n.FONT_IDENTITY_MATRIX})}function N(e){for(var t=y.font,r=D(),a=0,i=0,n=t.charsToGlyphs(e),o=0;o<n.length;o++){var s,c=n[o]
s=t.vertical&&c.vmetric?c.vmetric[0]:c.width
var l=c.unicode,u=(0,h.getNormalizedUnicodes)()
void 0!==u[l]&&(l=u[l]),l=(0,h.reverseIfRtl)(l)
var f=y.charSpacing
if(c.isSpace){var d=y.wordSpacing
f+=d,d>0&&U(d,r.str)}var g=0,m=0
t.vertical?i+=m=s*y.fontMatrix[0]*y.fontSize+f:a+=g=(s*y.fontMatrix[0]*y.fontSize+f)*y.textHScale,y.translateTextMatrix(g,m),r.str.push(l)}return t.vertical?(r.lastAdvanceHeight=i,r.height+=Math.abs(i)):(r.lastAdvanceWidth=a,r.width+=a),r}function U(e,t){if(!(e<S.fakeSpaceMin))if(e<S.fakeMultiSpaceMin)t.push(" ")
else for(var r=Math.round(e/S.spaceWidth);r-- >0;)t.push(" ")}function q(){var e,t,r
S.initialized&&(S.vertical?S.height*=S.textAdvanceScale:S.width*=S.textAdvanceScale,k.items.push((t=(e=S).str.join(""),r=(0,m.bidi)(t,-1,e.vertical),{str:f?M(r.str):r.str,dir:r.dir,width:e.width,height:e.height,transform:e.transform,fontName:e.fontName})),S.initialized=!1,S.str.length=0)}function j(){var e=k.items.length
e>0&&(p.enqueue(k,e),k.items=[],k.styles=Object.create(null))}var z=new a
return new Promise(function e(t,r){var a=function(a){j(),Promise.all([a,p.ready]).then(function(){try{e(t,r)}catch(e){r(e)}},r)}
i.ensureNotTerminated(),z.reset()
for(var s,u={},h=[];!(s=z.check())&&(h.length=0,u.args=h,B.read(u));){y=l.state
var d,m=u.fn
switch(h=u.args,0|m){case n.OPS.setFont:var v=h[0].name,w=h[1]
if(y.font&&v===y.fontName&&w===y.fontSize)break
return q(),y.fontName=v,y.fontSize=w,void a(L(v,null))
case n.OPS.setTextRise:q(),y.textRise=h[0]
break
case n.OPS.setHScale:q(),y.textHScale=h[0]/100
break
case n.OPS.setLeading:q(),y.leading=h[0]
break
case n.OPS.moveText:var C=!!y.font&&0===(y.font.vertical?h[0]:h[1])
if(d=h[0]-h[1],g&&C&&S.initialized&&d>0&&d<=S.fakeMultiSpaceMax){y.translateTextLineMatrix(h[0],h[1]),S.width+=h[0]-S.lastAdvanceWidth,S.height+=h[1]-S.lastAdvanceHeight,U(h[0]-S.lastAdvanceWidth-(h[1]-S.lastAdvanceHeight),S.str)
break}q(),y.translateTextLineMatrix(h[0],h[1]),y.textMatrix=y.textLineMatrix.slice()
break
case n.OPS.setLeadingMoveText:q(),y.leading=-h[1],y.translateTextLineMatrix(h[0],h[1]),y.textMatrix=y.textLineMatrix.slice()
break
case n.OPS.nextLine:q(),y.carriageReturn()
break
case n.OPS.setTextMatrix:if(d=y.calcTextLineMatrixAdvance(h[0],h[1],h[2],h[3],h[4],h[5]),g&&null!==d&&S.initialized&&d.value>0&&d.value<=S.fakeMultiSpaceMax){y.translateTextLineMatrix(d.width,d.height),S.width+=d.width-S.lastAdvanceWidth,S.height+=d.height-S.lastAdvanceHeight,U(d.width-S.lastAdvanceWidth-(d.height-S.lastAdvanceHeight),S.str)
break}q(),y.setTextMatrix(h[0],h[1],h[2],h[3],h[4],h[5]),y.setTextLineMatrix(h[0],h[1],h[2],h[3],h[4],h[5])
break
case n.OPS.setCharSpacing:y.charSpacing=h[0]
break
case n.OPS.setWordSpacing:y.wordSpacing=h[0]
break
case n.OPS.beginText:q(),y.textMatrix=n.IDENTITY_MATRIX.slice(),y.textLineMatrix=n.IDENTITY_MATRIX.slice()
break
case n.OPS.showSpacedText:for(var x,_=h[0],I=0,E=_.length;I<E;I++)if("string"==typeof _[I])N(_[I])
else if((0,n.isNum)(_[I])){D(),d=_[I]*y.fontSize/1e3
var T=!1
y.font.vertical?(x=d,y.translateTextMatrix(0,x),(T=S.textRunBreakAllowed&&d>S.fakeMultiSpaceMax)||(S.height+=x)):(x=(d=-d)*y.textHScale,y.translateTextMatrix(x,0),(T=S.textRunBreakAllowed&&d>S.fakeMultiSpaceMax)||(S.width+=x)),T?q():d>0&&U(d,S.str)}break
case n.OPS.showText:N(h[0])
break
case n.OPS.nextLineShowText:q(),y.carriageReturn(),N(h[0])
break
case n.OPS.nextLineSetSpacingShowText:q(),y.wordSpacing=h[0],y.charSpacing=h[1],y.carriageReturn(),N(h[2])
break
case n.OPS.paintXObject:q(),F||(F=o.get("XObject")||c.Dict.empty)
var M=h[0].name
if(M&&void 0!==R[M])break
return void a(new Promise(function(e,t){if(!M)throw new n.FormatError("XObject must be referred to by name.")
var r=F.get(M)
if(r){if(!(0,c.isStream)(r))throw new n.FormatError("XObject should be a stream")
var a=r.dict.get("Subtype")
if(!(0,c.isName)(a))throw new n.FormatError("XObject should have a Name subtype")
if("Form"===a.name){var s=l.state.clone(),u=new P(s),h=r.dict.getArray("Matrix")
Array.isArray(h)&&6===h.length&&u.transform(h),j()
var d={enqueueInvoked:!1,enqueue:function(e,t){this.enqueueInvoked=!0,p.enqueue(e,t)},get desiredSize(){return p.desiredSize},get ready(){return p.ready}}
O.getTextContent({stream:r,task:i,resources:r.dict.get("Resources")||o,stateManager:u,normalizeWhitespace:f,combineTextItems:g,sink:d,seenStyles:b}).then(function(){d.enqueueInvoked||(R[M]=!0),e()},t)}else R[M]=!0,e()}else e()}).catch(function(e){if(!(e instanceof n.AbortException)){if(!O.options.ignoreErrors)throw e;(0,n.warn)('getTextContent - ignoring XObject: "'.concat(e,'".'))}}))
case n.OPS.setGState:q()
var H=h[0],W=o.get("ExtGState")
if(!(0,c.isDict)(W)||!(0,c.isName)(H))break
var G=W.get(H.name)
if(!(0,c.isDict)(G))break
var X=G.get("Font")
if(X)return y.fontName=null,y.fontSize=X[1],void a(L(null,X[0]))}if(k.items.length>=p.desiredSize){s=!0
break}}s?a(A):(q(),j(),t())}).catch(function(e){if(!(e instanceof n.AbortException)){if(!t.options.ignoreErrors)throw e;(0,n.warn)('getTextContent - ignoring errors during "'.concat(i.name,'" ')+'task: "'.concat(e,'".')),q(),j()}})},extractDataStructures:function(e,t,r){var a=this,i=this.xref,o=e.get("ToUnicode")||t.get("ToUnicode"),s=o?this.readToUnicode(o):Promise.resolve(void 0)
if(r.composite){var h=e.get("CIDSystemInfo");(0,c.isDict)(h)&&(r.cidSystemInfo={registry:(0,n.stringToPDFString)(h.get("Registry")),ordering:(0,n.stringToPDFString)(h.get("Ordering")),supplement:h.get("Supplement")})
var f=e.get("CIDToGIDMap");(0,c.isStream)(f)&&(r.cidToGidMap=this.readCidToGidMap(f))}var d,g=[],m=null
if(e.has("Encoding")){if(d=e.get("Encoding"),(0,c.isDict)(d)){if(m=d.get("BaseEncoding"),m=(0,c.isName)(m)?m.name:null,d.has("Differences"))for(var p=d.get("Differences"),v=0,b=0,y=p.length;b<y;b++){var w=i.fetchIfRef(p[b])
if((0,n.isNum)(w))v=w
else{if(!(0,c.isName)(w))throw new n.FormatError("Invalid entry in 'Differences' array: ".concat(w))
g[v++]=w.name}}}else{if(!(0,c.isName)(d))throw new n.FormatError("Encoding is not a Name nor a Dict")
m=d.name}"MacRomanEncoding"!==m&&"MacExpertEncoding"!==m&&"WinAnsiEncoding"!==m&&(m=null)}if(m)r.defaultEncoding=(0,u.getEncoding)(m).slice()
else{var k=!!(r.flags&l.FontFlags.Symbolic),S=!!(r.flags&l.FontFlags.Nonsymbolic)
d=u.StandardEncoding,"TrueType"!==r.type||S||(d=u.WinAnsiEncoding),k&&(d=u.MacRomanEncoding,r.file||(/Symbol/i.test(r.name)?d=u.SymbolSetEncoding:/Dingbats/i.test(r.name)&&(d=u.ZapfDingbatsEncoding))),r.defaultEncoding=d}return r.differences=g,r.baseEncodingName=m,r.hasEncoding=!!m||g.length>0,r.dict=e,s.then(function(e){return r.toUnicode=e,a.buildToUnicode(r)}).then(function(e){return r.toUnicode=e,r})},_buildSimpleFontToUnicode:function(e){(0,n.assert)(!e.composite,"Must be a simple font.")
var t,r,a=[],i=e.defaultEncoding.slice(),o=e.baseEncodingName,s=e.differences
for(t in s)".notdef"!==(r=s[t])&&(i[t]=r)
var c=(0,v.getGlyphsUnicode)()
for(t in i)if(""!==(r=i[t]))if(void 0!==c[r])a[t]=String.fromCharCode(c[r])
else{var f=0
switch(r[0]){case"G":3===r.length&&(f=parseInt(r.substring(1),16))
break
case"g":5===r.length&&(f=parseInt(r.substring(1),16))
break
case"C":case"c":r.length>=3&&(f=+r.substring(1))
break
default:var d=(0,h.getUnicodeForGlyph)(r,c);-1!==d&&(f=d)}if(f){if(o&&f===+t){var g=(0,u.getEncoding)(o)
if(g&&(r=g[t])){a[t]=String.fromCharCode(c[r])
continue}}a[t]=String.fromCodePoint(f)}}return new l.ToUnicodeMap(a)},buildToUnicode:function(e){if(e.hasIncludedToUnicodeMap=!!e.toUnicode&&e.toUnicode.length>0,e.hasIncludedToUnicodeMap)return!e.composite&&e.hasEncoding&&(e.fallbackToUnicode=this._buildSimpleFontToUnicode(e)),Promise.resolve(e.toUnicode)
if(!e.composite)return Promise.resolve(this._buildSimpleFontToUnicode(e))
if(e.composite&&(e.cMap.builtInCMap&&!(e.cMap instanceof o.IdentityCMap)||"Adobe"===e.cidSystemInfo.registry&&("GB1"===e.cidSystemInfo.ordering||"CNS1"===e.cidSystemInfo.ordering||"Japan1"===e.cidSystemInfo.ordering||"Korea1"===e.cidSystemInfo.ordering))){var t=e.cidSystemInfo.registry,r=e.cidSystemInfo.ordering,a=c.Name.get(t+"-"+r+"-UCS2")
return o.CMapFactory.create({encoding:a,fetchBuiltInCMap:this.fetchBuiltInCMap,useCMap:null}).then(function(t){var r=e.cMap,a=[]
return r.forEach(function(e,r){if(r>65535)throw new n.FormatError("Max size of CID is 65,535")
var i=t.lookup(r)
i&&(a[e]=String.fromCharCode((i.charCodeAt(0)<<8)+i.charCodeAt(1)))}),new l.ToUnicodeMap(a)})}return Promise.resolve(new l.IdentityToUnicodeMap(e.firstChar,e.lastChar))},readToUnicode:function(e){var t=e
return(0,c.isName)(t)?o.CMapFactory.create({encoding:t,fetchBuiltInCMap:this.fetchBuiltInCMap,useCMap:null}).then(function(e){return e instanceof o.IdentityCMap?new l.IdentityToUnicodeMap(0,65535):new l.ToUnicodeMap(e.getMap())}):(0,c.isStream)(t)?o.CMapFactory.create({encoding:t,fetchBuiltInCMap:this.fetchBuiltInCMap,useCMap:null}).then(function(e){if(e instanceof o.IdentityCMap)return new l.IdentityToUnicodeMap(0,65535)
var t=new Array(e.length)
return e.forEach(function(e,r){for(var a=[],i=0;i<r.length;i+=2){var n=r.charCodeAt(i)<<8|r.charCodeAt(i+1)
if(55296==(63488&n)){i+=2
var o=r.charCodeAt(i)<<8|r.charCodeAt(i+1)
a.push(((1023&n)<<10)+(1023&o)+65536)}else a.push(n)}t[e]=String.fromCodePoint.apply(String,a)}),new l.ToUnicodeMap(t)}):Promise.resolve(null)},readCidToGidMap:function(e){for(var t=e.getBytes(),r=[],a=0,i=t.length;a<i;a++){var n=t[a++]<<8|t[a]
0!==n&&(r[a>>1]=n)}return r},extractWidths:function(e,t,r){var a,i,n,o,s,u,h,f,d=this.xref,g=[],m=0,p=[]
if(r.composite){if(m=e.has("DW")?e.get("DW"):1e3,f=e.get("W"))for(i=0,n=f.length;i<n;i++)if(u=d.fetchIfRef(f[i++]),h=d.fetchIfRef(f[i]),Array.isArray(h))for(o=0,s=h.length;o<s;o++)g[u++]=d.fetchIfRef(h[o])
else{var v=d.fetchIfRef(f[++i])
for(o=u;o<=h;o++)g[o]=v}if(r.vertical){var b=e.getArray("DW2")||[880,-1e3]
if(a=[b[1],.5*m,b[0]],b=e.get("W2"))for(i=0,n=b.length;i<n;i++)if(u=d.fetchIfRef(b[i++]),h=d.fetchIfRef(b[i]),Array.isArray(h))for(o=0,s=h.length;o<s;o++)p[u++]=[d.fetchIfRef(h[o++]),d.fetchIfRef(h[o++]),d.fetchIfRef(h[o])]
else{var y=[d.fetchIfRef(b[++i]),d.fetchIfRef(b[++i]),d.fetchIfRef(b[++i])]
for(o=u;o<=h;o++)p[o]=y}}}else{var w=r.firstChar
if(f=e.get("Widths")){for(o=w,i=0,n=f.length;i<n;i++)g[o++]=d.fetchIfRef(f[i])
m=parseFloat(t.get("MissingWidth"))||0}else{var k=e.get("BaseFont")
if((0,c.isName)(k)){var S=this.getBaseFontMetrics(k.name)
g=this.buildCharCodeToWidth(S.widths,r),m=S.defaultWidth}}}var C=!0,x=m
for(var A in g){var _=g[A]
if(_)if(x){if(x!==_){C=!1
break}}else x=_}C&&(r.flags|=l.FontFlags.FixedPitch),r.defaultWidth=m,r.widths=g,r.defaultVMetrics=a,r.vmetrics=p},isSerifFont:function(e){var t=e.split("-")[0]
return t in(0,f.getSerifFonts)()||-1!==t.search(/serif/gi)},getBaseFontMetrics:function(e){var t=0,r=[],a=!1,i=(0,f.getStdFontMap)()[e]||e,o=(0,b.getMetrics)()
i in o||(i=this.isSerifFont(e)?"Times-Roman":"Helvetica")
var s=o[i]
return(0,n.isNum)(s)?(t=s,a=!0):r=s(),{defaultWidth:t,monospace:a,widths:r}},buildCharCodeToWidth:function(e,t){for(var r=Object.create(null),a=t.differences,i=t.defaultEncoding,n=0;n<256;n++)n in a&&e[a[n]]?r[n]=e[a[n]]:n in i&&e[i[n]]&&(r[n]=e[i[n]])
return r},preEvaluateFont:function(e){var t=e,r=e.get("Subtype")
if(!(0,c.isName)(r))throw new n.FormatError("invalid font Subtype")
var a,i=!1
if("Type0"===r.name){var o=e.get("DescendantFonts")
if(!o)throw new n.FormatError("Descendant fonts are not specified")
if(r=(e=Array.isArray(o)?this.xref.fetchIfRef(o[0]):o).get("Subtype"),!(0,c.isName)(r))throw new n.FormatError("invalid font Subtype")
i=!0}var s=e.get("FontDescriptor")
if(s){var l=new k.MurmurHash3_64,u=t.getRaw("Encoding")
if((0,c.isName)(u))l.update(u.name)
else if((0,c.isRef)(u))l.update(u.toString())
else if((0,c.isDict)(u))for(var h=u.getKeys(),f=0,d=h.length;f<d;f++){var g=u.getRaw(h[f])
if((0,c.isName)(g))l.update(g.name)
else if((0,c.isRef)(g))l.update(g.toString())
else if(Array.isArray(g)){for(var m=g.length,p=new Array(m),v=0;v<m;v++){var b=g[v];(0,c.isName)(b)?p[v]=b.name:((0,n.isNum)(b)||(0,c.isRef)(b))&&(p[v]=b.toString())}l.update(p.join())}}var y=e.get("ToUnicode")||t.get("ToUnicode")
if((0,c.isStream)(y)){var w=y.str||y
a=w.buffer?new Uint8Array(w.buffer.buffer,0,w.bufferLength):new Uint8Array(w.bytes.buffer,w.start,w.end-w.start),l.update(a)}else(0,c.isName)(y)&&l.update(y.name)
var S=e.get("Widths")||t.get("Widths")
S&&(a=new Uint8Array(new Uint32Array(S).buffer),l.update(a))}return{descriptor:s,dict:e,baseDict:t,composite:i,type:r.name,hash:l?l.hexdigest():""}},translateFont:function(e){var t,r=this,a=e.baseDict,i=e.dict,s=e.composite,u=e.descriptor,h=e.type,d=s?65535:255
if(!u){if("Type3"!==h){var g=i.get("BaseFont")
if(!(0,c.isName)(g))throw new n.FormatError("Base font is not specified")
g=g.name.replace(/[,_]/g,"-")
var m=this.getBaseFontMetrics(g),p=g.split("-")[0],v=(this.isSerifFont(p)?l.FontFlags.Serif:0)|(m.monospace?l.FontFlags.FixedPitch:0)|((0,f.getSymbolsFonts)()[p]?l.FontFlags.Symbolic:l.FontFlags.Nonsymbolic)
return t={type:h,name:g,widths:m.widths,defaultWidth:m.defaultWidth,flags:v,firstChar:0,lastChar:d},this.extractDataStructures(i,i,t).then(function(e){return e.widths=r.buildCharCodeToWidth(m.widths,e),new l.Font(g,null,e)})}(u=new c.Dict(null)).set("FontName",c.Name.get(h)),u.set("FontBBox",i.getArray("FontBBox"))}var b=i.get("FirstChar")||0,y=i.get("LastChar")||d,w=u.get("FontName"),k=i.get("BaseFont")
if((0,n.isString)(w)&&(w=c.Name.get(w)),(0,n.isString)(k)&&(k=c.Name.get(k)),"Type3"!==h){var S=w&&w.name,C=k&&k.name
S!==C&&((0,n.info)("The FontDescriptor's FontName is \"".concat(S,'" but ')+"should be the same as the Font's BaseFont \"".concat(C,'".')),S&&C&&C.startsWith(S)&&(w=k))}if(w=w||k,!(0,c.isName)(w))throw new n.FormatError("invalid font name")
var x,A=u.get("FontFile","FontFile2","FontFile3")
if(A&&A.dict){var _=A.dict.get("Subtype")
_&&(_=_.name)
var P=A.dict.get("Length1"),I=A.dict.get("Length2"),O=A.dict.get("Length3")}if(t={type:h,name:w.name,subtype:_,file:A,length1:P,length2:I,length3:O,loadedName:a.loadedName,composite:s,wideChars:s,fixedPitch:!1,fontMatrix:i.getArray("FontMatrix")||n.FONT_IDENTITY_MATRIX,firstChar:b||0,lastChar:y||d,bbox:u.getArray("FontBBox"),ascent:u.get("Ascent"),descent:u.get("Descent"),xHeight:u.get("XHeight"),capHeight:u.get("CapHeight"),flags:u.get("Flags"),italicAngle:u.get("ItalicAngle"),isType3Font:!1},s){var E=a.get("Encoding");(0,c.isName)(E)&&(t.cidEncoding=E.name),x=o.CMapFactory.create({encoding:E,fetchBuiltInCMap:this.fetchBuiltInCMap,useCMap:null}).then(function(e){t.cMap=e,t.vertical=t.cMap.vertical})}else x=Promise.resolve(void 0)
return x.then(function(){return r.extractDataStructures(i,a,t)}).then(function(e){return r.extractWidths(i,u,e),"Type3"===h&&(e.isType3Font=!0),new l.Font(w.name,A,e)})}},r.buildFontPaths=function(e,t,r){function a(t){e.renderer.hasBuiltPath(t)||r.send("commonobj",["".concat(e.loadedName,"_path_").concat(t),"FontPath",e.renderer.getPathJs(t)])}var i=!0,n=!1,o=void 0
try{for(var s,c=t[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var l=s.value
a(l.fontChar)
var u=l.accent
u&&u.fontChar&&a(u.fontChar)}}catch(e){n=!0,o=e}finally{try{i||null==c.return||c.return()}finally{if(n)throw o}}},r}()
t.PartialEvaluator=A
var _=function(){function e(e,t,r){this.loadedName=e,this.font=t,this.dict=r,this.type3Loaded=null,this.sent=!1}return e.prototype={send:function(e){this.sent||(this.sent=!0,e.send("commonobj",[this.loadedName,"Font",this.font.exportData()]))},fallback:function(e){if(this.font.data){this.font.disableFontFace=!0
var t=this.font.glyphCacheValues
A.buildFontPaths(this.font,t,e)}},loadType3Data:function(e,t,r,a){if(!this.font.isType3Font)throw new Error("Must be a Type3 font.")
if(this.type3Loaded)return this.type3Loaded
var i=Object.create(e.options)
i.ignoreErrors=!1
for(var o=e.clone(i),s=this.font,c=Promise.resolve(),l=this.dict.get("CharProcs"),u=this.dict.get("Resources")||t,h=l.getKeys(),f=Object.create(null),d=function(){var e=h[g]
c=c.then(function(){var t=l.get(e),i=new S.OperatorList
return o.getOperatorList({stream:t,task:a,resources:u,operatorList:i}).then(function(){f[e]=i.getIR(),r.addDependencies(i.dependencies)}).catch(function(t){(0,n.warn)('Type3 font resource "'.concat(e,'" is not available.'))
var r=new S.OperatorList
f[e]=r.getIR()})})},g=0,m=h.length;g<m;++g)d()
return this.type3Loaded=c.then(function(){s.charProcOperatorList=f}),this.type3Loaded}},e}(),P=function(){function e(e){this.state=e,this.stateStack=[]}return e.prototype={save:function(){var e=this.state
this.stateStack.push(this.state),this.state=e.clone()},restore:function(){var e=this.stateStack.pop()
e&&(this.state=e)},transform:function(e){this.state.ctm=n.Util.transform(this.state.ctm,e)}},e}(),I=function(){function e(){this.ctm=new Float32Array(n.IDENTITY_MATRIX),this.fontName=null,this.fontSize=0,this.font=null,this.fontMatrix=n.FONT_IDENTITY_MATRIX,this.textMatrix=n.IDENTITY_MATRIX.slice(),this.textLineMatrix=n.IDENTITY_MATRIX.slice(),this.charSpacing=0,this.wordSpacing=0,this.leading=0,this.textHScale=1,this.textRise=0}return e.prototype={setTextMatrix:function(e,t,r,a,i,n){var o=this.textMatrix
o[0]=e,o[1]=t,o[2]=r,o[3]=a,o[4]=i,o[5]=n},setTextLineMatrix:function(e,t,r,a,i,n){var o=this.textLineMatrix
o[0]=e,o[1]=t,o[2]=r,o[3]=a,o[4]=i,o[5]=n},translateTextMatrix:function(e,t){var r=this.textMatrix
r[4]=r[0]*e+r[2]*t+r[4],r[5]=r[1]*e+r[3]*t+r[5]},translateTextLineMatrix:function(e,t){var r=this.textLineMatrix
r[4]=r[0]*e+r[2]*t+r[4],r[5]=r[1]*e+r[3]*t+r[5]},calcTextLineMatrixAdvance:function(e,t,r,a,i,n){var o=this.font
if(!o)return null
var s=this.textLineMatrix
if(e!==s[0]||t!==s[1]||r!==s[2]||a!==s[3])return null
var c=i-s[4],l=n-s[5]
if(o.vertical&&0!==c||!o.vertical&&0!==l)return null
var u,h,f=e*a-t*r
return o.vertical?(u=-l*r/f,h=l*e/f):(u=c*a/f,h=-c*t/f),{width:u,height:h,value:o.vertical?h:u}},calcRenderMatrix:function(e){var t=[this.fontSize*this.textHScale,0,0,this.fontSize,0,this.textRise]
return n.Util.transform(e,n.Util.transform(this.textMatrix,t))},carriageReturn:function(){this.translateTextLineMatrix(0,-this.leading),this.textMatrix=this.textLineMatrix.slice()},clone:function(){var e=Object.create(this)
return e.textMatrix=this.textMatrix.slice(),e.textLineMatrix=this.textLineMatrix.slice(),e.fontMatrix=this.fontMatrix.slice(),e}},e}(),O=function(){function e(){this.ctm=new Float32Array(n.IDENTITY_MATRIX),this.font=null,this.textRenderingMode=n.TextRenderingMode.FILL,this.fillColorSpace=p.ColorSpace.singletons.gray,this.strokeColorSpace=p.ColorSpace.singletons.gray}return e.prototype={clone:function(){return Object.create(this)}},e}(),E=function(){var e=(0,n.getLookupTableFactory)(function(e){e.w={id:n.OPS.setLineWidth,numArgs:1,variableArgs:!1},e.J={id:n.OPS.setLineCap,numArgs:1,variableArgs:!1},e.j={id:n.OPS.setLineJoin,numArgs:1,variableArgs:!1},e.M={id:n.OPS.setMiterLimit,numArgs:1,variableArgs:!1},e.d={id:n.OPS.setDash,numArgs:2,variableArgs:!1},e.ri={id:n.OPS.setRenderingIntent,numArgs:1,variableArgs:!1},e.i={id:n.OPS.setFlatness,numArgs:1,variableArgs:!1},e.gs={id:n.OPS.setGState,numArgs:1,variableArgs:!1},e.q={id:n.OPS.save,numArgs:0,variableArgs:!1},e.Q={id:n.OPS.restore,numArgs:0,variableArgs:!1},e.cm={id:n.OPS.transform,numArgs:6,variableArgs:!1},e.m={id:n.OPS.moveTo,numArgs:2,variableArgs:!1},e.l={id:n.OPS.lineTo,numArgs:2,variableArgs:!1},e.c={id:n.OPS.curveTo,numArgs:6,variableArgs:!1},e.v={id:n.OPS.curveTo2,numArgs:4,variableArgs:!1},e.y={id:n.OPS.curveTo3,numArgs:4,variableArgs:!1},e.h={id:n.OPS.closePath,numArgs:0,variableArgs:!1},e.re={id:n.OPS.rectangle,numArgs:4,variableArgs:!1},e.S={id:n.OPS.stroke,numArgs:0,variableArgs:!1},e.s={id:n.OPS.closeStroke,numArgs:0,variableArgs:!1},e.f={id:n.OPS.fill,numArgs:0,variableArgs:!1},e.F={id:n.OPS.fill,numArgs:0,variableArgs:!1},e["f*"]={id:n.OPS.eoFill,numArgs:0,variableArgs:!1},e.B={id:n.OPS.fillStroke,numArgs:0,variableArgs:!1},e["B*"]={id:n.OPS.eoFillStroke,numArgs:0,variableArgs:!1},e.b={id:n.OPS.closeFillStroke,numArgs:0,variableArgs:!1},e["b*"]={id:n.OPS.closeEOFillStroke,numArgs:0,variableArgs:!1},e.n={id:n.OPS.endPath,numArgs:0,variableArgs:!1},e.W={id:n.OPS.clip,numArgs:0,variableArgs:!1},e["W*"]={id:n.OPS.eoClip,numArgs:0,variableArgs:!1}
e.BT={id:n.OPS.beginText,numArgs:0,variableArgs:!1},e.ET={id:n.OPS.endText,numArgs:0,variableArgs:!1},e.Tc={id:n.OPS.setCharSpacing,numArgs:1,variableArgs:!1},e.Tw={id:n.OPS.setWordSpacing,numArgs:1,variableArgs:!1},e.Tz={id:n.OPS.setHScale,numArgs:1,variableArgs:!1},e.TL={id:n.OPS.setLeading,numArgs:1,variableArgs:!1},e.Tf={id:n.OPS.setFont,numArgs:2,variableArgs:!1},e.Tr={id:n.OPS.setTextRenderingMode,numArgs:1,variableArgs:!1},e.Ts={id:n.OPS.setTextRise,numArgs:1,variableArgs:!1},e.Td={id:n.OPS.moveText,numArgs:2,variableArgs:!1},e.TD={id:n.OPS.setLeadingMoveText,numArgs:2,variableArgs:!1},e.Tm={id:n.OPS.setTextMatrix,numArgs:6,variableArgs:!1},e["T*"]={id:n.OPS.nextLine,numArgs:0,variableArgs:!1},e.Tj={id:n.OPS.showText,numArgs:1,variableArgs:!1},e.TJ={id:n.OPS.showSpacedText,numArgs:1,variableArgs:!1},e["'"]={id:n.OPS.nextLineShowText,numArgs:1,variableArgs:!1},e['"']={id:n.OPS.nextLineSetSpacingShowText,numArgs:3,variableArgs:!1},e.d0={id:n.OPS.setCharWidth,numArgs:2,variableArgs:!1},e.d1={id:n.OPS.setCharWidthAndBounds,numArgs:6,variableArgs:!1},e.CS={id:n.OPS.setStrokeColorSpace,numArgs:1,variableArgs:!1},e.cs={id:n.OPS.setFillColorSpace,numArgs:1,variableArgs:!1},e.SC={id:n.OPS.setStrokeColor,numArgs:4,variableArgs:!0},e.SCN={id:n.OPS.setStrokeColorN,numArgs:33,variableArgs:!0},e.sc={id:n.OPS.setFillColor,numArgs:4,variableArgs:!0},e.scn={id:n.OPS.setFillColorN,numArgs:33,variableArgs:!0},e.G={id:n.OPS.setStrokeGray,numArgs:1,variableArgs:!1},e.g={id:n.OPS.setFillGray,numArgs:1,variableArgs:!1},e.RG={id:n.OPS.setStrokeRGBColor,numArgs:3,variableArgs:!1},e.rg={id:n.OPS.setFillRGBColor,numArgs:3,variableArgs:!1},e.K={id:n.OPS.setStrokeCMYKColor,numArgs:4,variableArgs:!1}
e.k={id:n.OPS.setFillCMYKColor,numArgs:4,variableArgs:!1},e.sh={id:n.OPS.shadingFill,numArgs:1,variableArgs:!1},e.BI={id:n.OPS.beginInlineImage,numArgs:0,variableArgs:!1},e.ID={id:n.OPS.beginImageData,numArgs:0,variableArgs:!1},e.EI={id:n.OPS.endInlineImage,numArgs:1,variableArgs:!1},e.Do={id:n.OPS.paintXObject,numArgs:1,variableArgs:!1},e.MP={id:n.OPS.markPoint,numArgs:1,variableArgs:!1},e.DP={id:n.OPS.markPointProps,numArgs:2,variableArgs:!1},e.BMC={id:n.OPS.beginMarkedContent,numArgs:1,variableArgs:!1},e.BDC={id:n.OPS.beginMarkedContentProps,numArgs:2,variableArgs:!1},e.EMC={id:n.OPS.endMarkedContent,numArgs:0,variableArgs:!1},e.BX={id:n.OPS.beginCompat,numArgs:0,variableArgs:!1},e.EX={id:n.OPS.endCompat,numArgs:0,variableArgs:!1},e.BM=null,e.BD=null,e.true=null,e.fa=null,e.fal=null,e.fals=null,e.false=null,e.nu=null,e.nul=null,e.null=null})
function t(t,r,a){this.opMap=e(),this.parser=new g.Parser(new g.Lexer(t,this.opMap),!1,r),this.stateManager=a,this.nonProcessedArgs=[],this._numInvalidPathOPS=0}return t.prototype={get savedStatesDepth(){return this.stateManager.stateStack.length},read:function(e){for(var t=e.args;;){var r=this.parser.getObj()
if((0,c.isCmd)(r)){var a=r.cmd,i=this.opMap[a]
if(!i){(0,n.warn)('Unknown command "'.concat(a,'".'))
continue}var o=i.id,s=i.numArgs,l=null!==t?t.length:0
if(i.variableArgs)l>s&&(0,n.info)("Command ".concat(a,": expected [0, ").concat(s,"] args, ")+"but received ".concat(l," args."))
else{if(l!==s){for(var u=this.nonProcessedArgs;l>s;)u.push(t.shift()),l--
for(;l<s&&0!==u.length;)null===t&&(t=[]),t.unshift(u.pop()),l++}if(l<s){var h="command ".concat(a,": expected ").concat(s," args, ")+"but received ".concat(l," args.")
if(o>=n.OPS.moveTo&&o<=n.OPS.endPath&&++this._numInvalidPathOPS>20)throw new n.FormatError("Invalid ".concat(h));(0,n.warn)("Skipping ".concat(h)),null!==t&&(t.length=0)
continue}}return this.preprocessCommand(o,t),e.fn=o,e.args=t,!0}if((0,c.isEOF)(r))return!1
if(null!==r&&(null===t&&(t=[]),t.push(r),t.length>33))throw new n.FormatError("Too many arguments")}},preprocessCommand:function(e,t){switch(0|e){case n.OPS.save:this.stateManager.save()
break
case n.OPS.restore:this.stateManager.restore()
break
case n.OPS.transform:this.stateManager.transform(t)}}},t}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.CMapFactory=t.IdentityCMap=t.CMap=void 0
var a=r(6),i=r(155),n=r(156),o=r(157)
function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function l(e,t){return(l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e,t,r){return t&&h(e.prototype,t),r&&h(e,r),e}var d=["Adobe-GB1-UCS2","Adobe-CNS1-UCS2","Adobe-Japan1-UCS2","Adobe-Korea1-UCS2","78-EUC-H","78-EUC-V","78-H","78-RKSJ-H","78-RKSJ-V","78-V","78ms-RKSJ-H","78ms-RKSJ-V","83pv-RKSJ-H","90ms-RKSJ-H","90ms-RKSJ-V","90msp-RKSJ-H","90msp-RKSJ-V","90pv-RKSJ-H","90pv-RKSJ-V","Add-H","Add-RKSJ-H","Add-RKSJ-V","Add-V","Adobe-CNS1-0","Adobe-CNS1-1","Adobe-CNS1-2","Adobe-CNS1-3","Adobe-CNS1-4","Adobe-CNS1-5","Adobe-CNS1-6","Adobe-GB1-0","Adobe-GB1-1","Adobe-GB1-2","Adobe-GB1-3","Adobe-GB1-4","Adobe-GB1-5","Adobe-Japan1-0","Adobe-Japan1-1","Adobe-Japan1-2","Adobe-Japan1-3","Adobe-Japan1-4","Adobe-Japan1-5","Adobe-Japan1-6","Adobe-Korea1-0","Adobe-Korea1-1","Adobe-Korea1-2","B5-H","B5-V","B5pc-H","B5pc-V","CNS-EUC-H","CNS-EUC-V","CNS1-H","CNS1-V","CNS2-H","CNS2-V","ETHK-B5-H","ETHK-B5-V","ETen-B5-H","ETen-B5-V","ETenms-B5-H","ETenms-B5-V","EUC-H","EUC-V","Ext-H","Ext-RKSJ-H","Ext-RKSJ-V","Ext-V","GB-EUC-H","GB-EUC-V","GB-H","GB-V","GBK-EUC-H","GBK-EUC-V","GBK2K-H","GBK2K-V","GBKp-EUC-H","GBKp-EUC-V","GBT-EUC-H","GBT-EUC-V","GBT-H","GBT-V","GBTpc-EUC-H","GBTpc-EUC-V","GBpc-EUC-H","GBpc-EUC-V","H","HKdla-B5-H","HKdla-B5-V","HKdlb-B5-H","HKdlb-B5-V","HKgccs-B5-H","HKgccs-B5-V","HKm314-B5-H","HKm314-B5-V","HKm471-B5-H","HKm471-B5-V","HKscs-B5-H","HKscs-B5-V","Hankaku","Hiragana","KSC-EUC-H","KSC-EUC-V","KSC-H","KSC-Johab-H","KSC-Johab-V","KSC-V","KSCms-UHC-H","KSCms-UHC-HW-H","KSCms-UHC-HW-V","KSCms-UHC-V","KSCpc-EUC-H","KSCpc-EUC-V","Katakana","NWP-H","NWP-V","RKSJ-H","RKSJ-V","Roman","UniCNS-UCS2-H","UniCNS-UCS2-V","UniCNS-UTF16-H","UniCNS-UTF16-V","UniCNS-UTF32-H","UniCNS-UTF32-V","UniCNS-UTF8-H","UniCNS-UTF8-V","UniGB-UCS2-H","UniGB-UCS2-V","UniGB-UTF16-H","UniGB-UTF16-V","UniGB-UTF32-H","UniGB-UTF32-V","UniGB-UTF8-H","UniGB-UTF8-V","UniJIS-UCS2-H","UniJIS-UCS2-HW-H","UniJIS-UCS2-HW-V","UniJIS-UCS2-V","UniJIS-UTF16-H","UniJIS-UTF16-V","UniJIS-UTF32-H","UniJIS-UTF32-V","UniJIS-UTF8-H","UniJIS-UTF8-V","UniJIS2004-UTF16-H","UniJIS2004-UTF16-V","UniJIS2004-UTF32-H","UniJIS2004-UTF32-V","UniJIS2004-UTF8-H","UniJIS2004-UTF8-V","UniJISPro-UCS2-HW-V","UniJISPro-UCS2-V","UniJISPro-UTF8-V","UniJISX0213-UTF32-H","UniJISX0213-UTF32-V","UniJISX02132004-UTF32-H","UniJISX02132004-UTF32-V","UniKS-UCS2-H","UniKS-UCS2-V","UniKS-UTF16-H","UniKS-UTF16-V","UniKS-UTF32-H","UniKS-UTF32-V","UniKS-UTF8-H","UniKS-UTF8-V","V","WP-Symbol"],g=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0]
u(this,e),this.codespaceRanges=[[],[],[],[]],this.numCodespaceRanges=0,this._map=[],this.name="",this.vertical=!1,this.useCMap=null,this.builtInCMap=t}return f(e,[{key:"addCodespaceRange",value:function(e,t,r){this.codespaceRanges[e-1].push(t,r),this.numCodespaceRanges++}},{key:"mapCidRange",value:function(e,t,r){for(;e<=t;)this._map[e++]=r++}},{key:"mapBfRange",value:function(e,t,r){for(var a=r.length-1;e<=t;)this._map[e++]=r,r=r.substring(0,a)+String.fromCharCode(r.charCodeAt(a)+1)}},{key:"mapBfRangeToArray",value:function(e,t,r){for(var a=0,i=r.length;e<=t&&a<i;)this._map[e]=r[a++],++e}},{key:"mapOne",value:function(e,t){this._map[e]=t}},{key:"lookup",value:function(e){return this._map[e]}},{key:"contains",value:function(e){return void 0!==this._map[e]}},{key:"forEach",value:function(e){var t=this._map,r=t.length
if(r<=65536)for(var a=0;a<r;a++)void 0!==t[a]&&e(a,t[a])
else for(var i in t)e(i,t[i])}},{key:"charCodeOf",value:function(e){var t=this._map
if(t.length<=65536)return t.indexOf(e)
for(var r in t)if(t[r]===e)return 0|r
return-1}},{key:"getMap",value:function(){return this._map}},{key:"readCharCode",value:function(e,t,r){for(var a=0,i=this.codespaceRanges,n=0,o=i.length;n<o;n++){a=(a<<8|e.charCodeAt(t+n))>>>0
for(var s=i[n],c=0,l=s.length;c<l;){var u=s[c++],h=s[c++]
if(a>=u&&a<=h)return r.charcode=a,void(r.length=n+1)}}r.charcode=0,r.length=1}},{key:"length",get:function(){return this._map.length}},{key:"isIdentityCMap",get:function(){if("Identity-H"!==this.name&&"Identity-V"!==this.name)return!1
if(65536!==this._map.length)return!1
for(var e=0;e<65536;e++)if(this._map[e]!==e)return!1
return!0}}]),e}()
t.CMap=g
var m=function(e){function t(e,r){var a
return u(this,t),(a=function(e,t){return!t||"object"!==s(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}(this,c(t).call(this))).vertical=e,a.addCodespaceRange(r,0,65535),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&l(e,t)}(t,g),f(t,[{key:"mapCidRange",value:function(e,t,r){(0,a.unreachable)("should not call mapCidRange")}},{key:"mapBfRange",value:function(e,t,r){(0,a.unreachable)("should not call mapBfRange")}},{key:"mapBfRangeToArray",value:function(e,t,r){(0,a.unreachable)("should not call mapBfRangeToArray")}},{key:"mapOne",value:function(e,t){(0,a.unreachable)("should not call mapCidOne")}},{key:"lookup",value:function(e){return Number.isInteger(e)&&e<=65535?e:void 0}},{key:"contains",value:function(e){return Number.isInteger(e)&&e<=65535}},{key:"forEach",value:function(e){for(var t=0;t<=65535;t++)e(t,t)}},{key:"charCodeOf",value:function(e){return Number.isInteger(e)&&e<=65535?e:-1}},{key:"getMap",value:function(){for(var e=new Array(65536),t=0;t<=65535;t++)e[t]=t
return e}},{key:"length",get:function(){return 65536}},{key:"isIdentityCMap",get:function(){(0,a.unreachable)("should not access .isIdentityCMap")}}]),t}()
t.IdentityCMap=m
var p=function(){function e(e,t){for(var r=0,a=0;a<=t;a++)r=r<<8|e[a]
return r>>>0}function t(e,t){return 1===t?String.fromCharCode(e[0],e[1]):3===t?String.fromCharCode(e[0],e[1],e[2],e[3]):String.fromCharCode.apply(null,e.subarray(0,t+1))}function r(e,t,r){for(var a=0,i=r;i>=0;i--)a+=e[i]+t[i],e[i]=255&a,a>>=8}function i(e,t){for(var r=1,a=t;a>=0&&r>0;a--)r+=e[a],e[a]=255&r,r>>=8}var n=16,o=19
function s(e){this.buffer=e,this.pos=0,this.end=e.length,this.tmpBuf=new Uint8Array(o)}function c(){}return s.prototype={readByte:function(){return this.pos>=this.end?-1:this.buffer[this.pos++]},readNumber:function(){var e,t=0
do{var r=this.readByte()
if(r<0)throw new a.FormatError("unexpected EOF in bcmap")
e=!(128&r),t=t<<7|127&r}while(!e)
return t},readSigned:function(){var e=this.readNumber()
return 1&e?~(e>>>1):e>>>1},readHex:function(e,t){e.set(this.buffer.subarray(this.pos,this.pos+t+1)),this.pos+=t+1},readHexNumber:function(e,t){var r,i=this.tmpBuf,n=0
do{var o=this.readByte()
if(o<0)throw new a.FormatError("unexpected EOF in bcmap")
r=!(128&o),i[n++]=127&o}while(!r)
for(var s=t,c=0,l=0;s>=0;){for(;l<8&&i.length>0;)c=i[--n]<<l|c,l+=7
e[s]=255&c,s--,c>>=8,l-=8}},readHexSigned:function(e,t){this.readHexNumber(e,t)
for(var r=1&e[t]?255:0,a=0,i=0;i<=t;i++)a=(1&a)<<8|e[i],e[i]=a>>1^r},readString:function(){for(var e=this.readNumber(),t="",r=0;r<e;r++)t+=String.fromCharCode(this.readNumber())
return t}},c.prototype={process:function(a,o,c){return new Promise(function(l,u){var h=new s(a),f=h.readByte()
o.vertical=!!(1&f)
for(var d,g,m=null,p=new Uint8Array(n),v=new Uint8Array(n),b=new Uint8Array(n),y=new Uint8Array(n),w=new Uint8Array(n);(g=h.readByte())>=0;){var k=g>>5
if(7!==k){var S=!!(16&g),C=15&g
if(C+1>n)throw new Error("processBinaryCMap: Invalid dataSize.")
var x,A=h.readNumber()
switch(k){case 0:for(h.readHex(p,C),h.readHexNumber(v,C),r(v,p,C),o.addCodespaceRange(C+1,e(p,C),e(v,C)),x=1;x<A;x++)i(v,C),h.readHexNumber(p,C),r(p,v,C),h.readHexNumber(v,C),r(v,p,C),o.addCodespaceRange(C+1,e(p,C),e(v,C))
break
case 1:for(h.readHex(p,C),h.readHexNumber(v,C),r(v,p,C),h.readNumber(),x=1;x<A;x++)i(v,C),h.readHexNumber(p,C),r(p,v,C),h.readHexNumber(v,C),r(v,p,C),h.readNumber()
break
case 2:for(h.readHex(b,C),d=h.readNumber(),o.mapOne(e(b,C),d),x=1;x<A;x++)i(b,C),S||(h.readHexNumber(w,C),r(b,w,C)),d=h.readSigned()+(d+1),o.mapOne(e(b,C),d)
break
case 3:for(h.readHex(p,C),h.readHexNumber(v,C),r(v,p,C),d=h.readNumber(),o.mapCidRange(e(p,C),e(v,C),d),x=1;x<A;x++)i(v,C),S?p.set(v):(h.readHexNumber(p,C),r(p,v,C)),h.readHexNumber(v,C),r(v,p,C),d=h.readNumber(),o.mapCidRange(e(p,C),e(v,C),d)
break
case 4:for(h.readHex(b,1),h.readHex(y,C),o.mapOne(e(b,1),t(y,C)),x=1;x<A;x++)i(b,1),S||(h.readHexNumber(w,1),r(b,w,1)),i(y,C),h.readHexSigned(w,C),r(y,w,C),o.mapOne(e(b,1),t(y,C))
break
case 5:for(h.readHex(p,1),h.readHexNumber(v,1),r(v,p,1),h.readHex(y,C),o.mapBfRange(e(p,1),e(v,1),t(y,C)),x=1;x<A;x++)i(v,1),S?p.set(v):(h.readHexNumber(p,1),r(p,v,1)),h.readHexNumber(v,1),r(v,p,1),h.readHex(y,C),o.mapBfRange(e(p,1),e(v,1),t(y,C))
break
default:return void u(new Error("processBinaryCMap: Unknown type: "+k))}}else switch(31&g){case 0:h.readString()
break
case 1:m=h.readString()}}l(m?c(m):o)})}},c}(),v=function(){function e(e){for(var t=0,r=0;r<e.length;r++)t=t<<8|e.charCodeAt(r)
return t>>>0}function t(e){if(!(0,a.isString)(e))throw new a.FormatError("Malformed CMap: expected string.")}function r(e){if(!Number.isInteger(e))throw new a.FormatError("Malformed CMap: expected int.")}function s(r,a){for(;;){var n=a.getObj()
if((0,i.isEOF)(n))break
if((0,i.isCmd)(n,"endbfchar"))return
t(n)
var o=e(n)
t(n=a.getObj())
var s=n
r.mapOne(o,s)}}function c(r,n){for(;;){var o=n.getObj()
if((0,i.isEOF)(o))break
if((0,i.isCmd)(o,"endbfrange"))return
t(o)
var s=e(o)
t(o=n.getObj())
var c=e(o)
if(o=n.getObj(),Number.isInteger(o)||(0,a.isString)(o)){var l=Number.isInteger(o)?String.fromCharCode(o):o
r.mapBfRange(s,c,l)}else{if(!(0,i.isCmd)(o,"["))break
o=n.getObj()
for(var u=[];!(0,i.isCmd)(o,"]")&&!(0,i.isEOF)(o);)u.push(o),o=n.getObj()
r.mapBfRangeToArray(s,c,u)}}throw new a.FormatError("Invalid bf range.")}function l(a,n){for(;;){var o=n.getObj()
if((0,i.isEOF)(o))break
if((0,i.isCmd)(o,"endcidchar"))return
t(o)
var s=e(o)
r(o=n.getObj())
var c=o
a.mapOne(s,c)}}function u(a,n){for(;;){var o=n.getObj()
if((0,i.isEOF)(o))break
if((0,i.isCmd)(o,"endcidrange"))return
t(o)
var s=e(o)
t(o=n.getObj())
var c=e(o)
r(o=n.getObj())
var l=o
a.mapCidRange(s,c,l)}}function h(t,r){for(;;){var n=r.getObj()
if((0,i.isEOF)(n))break
if((0,i.isCmd)(n,"endcodespacerange"))return
if(!(0,a.isString)(n))break
var o=e(n)
if(n=r.getObj(),!(0,a.isString)(n))break
var s=e(n)
t.addCodespaceRange(n.length,o,s)}throw new a.FormatError("Invalid codespace range.")}function f(e,t){var r=t.getObj()
Number.isInteger(r)&&(e.vertical=!!r)}function v(e,t){var r=t.getObj();(0,i.isName)(r)&&(0,a.isString)(r.name)&&(e.name=r.name)}function b(e,t,r,n){var o,d
e:for(;;)try{var g=t.getObj()
if((0,i.isEOF)(g))break
if((0,i.isName)(g))"WMode"===g.name?f(e,t):"CMapName"===g.name&&v(e,t),o=g
else if((0,i.isCmd)(g))switch(g.cmd){case"endcmap":break e
case"usecmap":(0,i.isName)(o)&&(d=o.name)
break
case"begincodespacerange":h(e,t)
break
case"beginbfchar":s(e,t)
break
case"begincidchar":l(e,t)
break
case"beginbfrange":c(e,t)
break
case"begincidrange":u(e,t)}}catch(e){if(e instanceof a.MissingDataException)throw e;(0,a.warn)("Invalid cMap data: "+e)
continue}return!n&&d&&(n=d),n?y(e,r,n):Promise.resolve(e)}function y(e,t,r){return w(r,t).then(function(t){if(e.useCMap=t,0===e.numCodespaceRanges){for(var r=e.useCMap.codespaceRanges,a=0;a<r.length;a++)e.codespaceRanges[a]=r[a].slice()
e.numCodespaceRanges=e.useCMap.numCodespaceRanges}return e.useCMap.forEach(function(t,r){e.contains(t)||e.mapOne(t,e.useCMap.lookup(t))}),e})}function w(e,t){return"Identity-H"===e?Promise.resolve(new m(!1,2)):"Identity-V"===e?Promise.resolve(new m(!0,2)):d.includes(e)?t?t(e).then(function(e){var r=e.cMapData,i=e.compressionType,s=new g(!0)
if(i===a.CMapCompressionType.BINARY)return(new p).process(r,s,function(e){return y(s,t,e)})
if(i===a.CMapCompressionType.NONE){var c=new n.Lexer(new o.Stream(r))
return b(s,c,t,null)}return Promise.reject(new Error("TODO: Only BINARY/NONE CMap compression is currently supported."))}):Promise.reject(new Error("Built-in CMap parameters are not provided.")):Promise.reject(new Error("Unknown CMap name: "+e))}return{create:function(e){var t=e.encoding,r=e.fetchBuiltInCMap,a=e.useCMap
return(0,i.isName)(t)?w(t.name,r):(0,i.isStream)(t)?b(new g,new n.Lexer(t),r,a).then(function(e){return e.isIdentityCMap?w(e.name,r):e}):Promise.reject(new Error("Encoding required."))}}}()
t.CMapFactory=v},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getFontType=y,t.IdentityToUnicodeMap=t.ToUnicodeMap=t.FontFlags=t.Font=t.ErrorFont=t.SEAC_ANALYSIS_ENABLED=void 0
var a=r(6),i=r(174),n=r(177),o=r(176),s=r(178),c=r(179),l=r(180),u=r(172),h=r(157),f=r(181)
var d=[[57344,63743],[1048576,1114109]],g=1e3,m=!0
t.SEAC_ANALYSIS_ENABLED=m
var p={FixedPitch:1,Serif:2,Symbolic:4,Script:8,Nonsymbolic:32,Italic:64,AllCap:65536,SmallCap:131072,ForceBold:262144}
t.FontFlags=p
var v=[".notdef",".null","nonmarkingreturn","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","nonbreakingspace","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron","Lslash","lslash","Scaron","scaron","Zcaron","zcaron","brokenbar","Eth","eth","Yacute","yacute","Thorn","thorn","minus","multiply","onesuperior","twosuperior","threesuperior","onehalf","onequarter","threequarters","franc","Gbreve","gbreve","Idotaccent","Scedilla","scedilla","Cacute","cacute","Ccaron","ccaron","dcroat"]
function b(e){if(e.fontMatrix&&e.fontMatrix[0]!==a.FONT_IDENTITY_MATRIX[0]){var t=.001/e.fontMatrix[0],r=e.widths
for(var i in r)r[i]*=t
e.defaultWidth*=t}}function y(e,t){switch(e){case"Type1":return"Type1C"===t?a.FontType.TYPE1C:a.FontType.TYPE1
case"CIDFontType0":return"CIDFontType0C"===t?a.FontType.CIDFONTTYPE0C:a.FontType.CIDFONTTYPE0
case"OpenType":return a.FontType.OPENTYPE
case"TrueType":return a.FontType.TRUETYPE
case"CIDFontType2":return a.FontType.CIDFONTTYPE2
case"MMType1":return a.FontType.MMTYPE1
case"Type0":return a.FontType.TYPE0
default:return a.FontType.UNKNOWN}}function w(e,t){if(void 0!==t[e])return e
var r=(0,c.getUnicodeForGlyph)(e,t)
if(-1!==r)for(var i in t)if(t[i]===r)return i
return(0,a.info)("Unable to recover a standard glyph name for: "+e),e}var k=function(){function e(e,t,r,a,i,n,o,s){this.fontChar=e,this.unicode=t,this.accent=r,this.width=a,this.vmetric=i,this.operatorListId=n,this.isSpace=o,this.isInFont=s}return e.prototype.matchesForCache=function(e,t,r,a,i,n,o,s){return this.fontChar===e&&this.unicode===t&&this.accent===r&&this.width===a&&this.vmetric===i&&this.operatorListId===n&&this.isSpace===o&&this.isInFont===s},e}(),S=function(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]
this._map=e}return e.prototype={get length(){return this._map.length},forEach:function(e){for(var t in this._map)e(t,this._map[t].charCodeAt(0))},has:function(e){return void 0!==this._map[e]},get:function(e){return this._map[e]},charCodeOf:function(e){var t=this._map
if(t.length<=65536)return t.indexOf(e)
for(var r in t)if(t[r]===e)return 0|r
return-1},amend:function(e){for(var t in e)this._map[t]=e[t]}},e}()
t.ToUnicodeMap=S
var C=function(){function e(e,t){this.firstChar=e,this.lastChar=t}return e.prototype={get length(){return this.lastChar+1-this.firstChar},forEach:function(e){for(var t=this.firstChar,r=this.lastChar;t<=r;t++)e(t,t)},has:function(e){return this.firstChar<=e&&e<=this.lastChar},get:function(e){if(this.firstChar<=e&&e<=this.lastChar)return String.fromCharCode(e)},charCodeOf:function(e){return Number.isInteger(e)&&e>=this.firstChar&&e<=this.lastChar?e:-1},amend:function(e){(0,a.unreachable)("Should not call amend()")}},e}()
t.IdentityToUnicodeMap=C
var x=function(){function e(e,t,r){e[t]=r>>8&255,e[t+1]=255&r}function t(e,t,r){e[t]=r>>24&255,e[t+1]=r>>16&255,e[t+2]=r>>8&255,e[t+3]=255&r}function r(e,t,r){var a,i
if(r instanceof Uint8Array)e.set(r,t)
else if("string"==typeof r)for(a=0,i=r.length;a<i;a++)e[t++]=255&r.charCodeAt(a)
else for(a=0,i=r.length;a<i;a++)e[t++]=255&r[a]}function i(e){this.sfnt=e,this.tables=Object.create(null)}return i.getSearchParams=function(e,t){for(var r=1,a=0;(r^e)>r;)r<<=1,a++
var i=r*t
return{range:i,entry:a,rangeShift:t*e-i}},i.prototype={toArray:function(){var n=this.sfnt,o=this.tables,s=Object.keys(o)
s.sort()
var c,l,u,h,f,d=s.length,g=12+16*d,m=[g]
for(c=0;c<d;c++)g+=((h=o[s[c]]).length+3&-4)>>>0,m.push(g)
var p=new Uint8Array(g)
for(c=0;c<d;c++)h=o[s[c]],r(p,m[c],h)
"true"===n&&(n=(0,a.string32)(65536)),p[0]=255&n.charCodeAt(0),p[1]=255&n.charCodeAt(1),p[2]=255&n.charCodeAt(2),p[3]=255&n.charCodeAt(3),e(p,4,d)
var v=i.getSearchParams(d,16)
for(e(p,6,v.range),e(p,8,v.entry),e(p,10,v.rangeShift),g=12,c=0;c<d;c++){f=s[c],p[g]=255&f.charCodeAt(0),p[g+1]=255&f.charCodeAt(1),p[g+2]=255&f.charCodeAt(2),p[g+3]=255&f.charCodeAt(3)
var b=0
for(l=m[c],u=m[c+1];l<u;l+=4)b=b+(0,a.readUint32)(p,l)>>>0
t(p,g+4,b),t(p,g+8,m[c]),t(p,g+12,o[f].length),g+=16}return p},addTable:function(e,t){if(e in this.tables)throw new Error("Table "+e+" already exists")
this.tables[e]=t}},i}(),A=function(){function e(e,t,r){var i
this.name=e,this.loadedName=r.loadedName,this.isType3Font=r.isType3Font,this.sizes=[],this.missingFile=!1,this.glyphCache=Object.create(null),this.isSerifFont=!!(r.flags&p.Serif),this.isSymbolicFont=!!(r.flags&p.Symbolic),this.isMonospace=!!(r.flags&p.FixedPitch)
var n=r.type,o=r.subtype
if(this.type=n,this.subtype=o,this.fallbackName=this.isMonospace?"monospace":this.isSerifFont?"serif":"sans-serif",this.differences=r.differences,this.widths=r.widths,this.defaultWidth=r.defaultWidth,this.composite=r.composite,this.wideChars=r.wideChars,this.cMap=r.cMap,this.ascent=r.ascent/g,this.descent=r.descent/g,this.fontMatrix=r.fontMatrix,this.bbox=r.bbox,this.defaultEncoding=r.defaultEncoding,this.toUnicode=r.toUnicode,this.fallbackToUnicode=r.fallbackToUnicode||new S,this.toFontChar=[],"Type3"!==r.type)if(this.cidEncoding=r.cidEncoding,this.vertical=r.vertical,this.vertical&&(this.vmetrics=r.vmetrics,this.defaultVMetrics=r.defaultVMetrics),t&&!t.isEmpty){var s=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],a=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(function(e,t){var r,i,n=t.type,o=t.subtype,s=t.composite
return function(e){var t=e.peekBytes(4)
return 65536===(0,a.readUint32)(t,0)||"true"===(0,a.bytesToString)(t)}(e)||P(e)?r=s?"CIDFontType2":"TrueType":!function(e){var t=e.peekBytes(4)
return"OTTO"===(0,a.bytesToString)(t)}(e)?!function(e){var t=e.peekBytes(2)
return 37===t[0]&&33===t[1]||128===t[0]&&1===t[1]}(e)?!function(e){var t=e.peekBytes(4)
return t[0]>=1&&t[3]>=1&&t[3]<=4}(e)?((0,a.warn)("getFontFileType: Unable to detect correct font file Type/Subtype."),r=n,i=o):s?(r="CIDFontType0",i="CIDFontType0C"):(r="MMType1"===n?"MMType1":"Type1",i="Type1C"):r=s?"CIDFontType0":"MMType1"===n?"MMType1":"Type1":r=s?"CIDFontType2":"OpenType",[r,i]}(t,r),2)
n=s[0],o=s[1],n===this.type&&o===this.subtype||(0,a.info)("Inconsistent font file Type/SubType, expected: "+"".concat(this.type,"/").concat(this.subtype," but found: ").concat(n,"/").concat(o,"."))
try{var c
switch(n){case"MMType1":(0,a.info)("MMType1 font ("+e+"), falling back to Type1.")
case"Type1":case"CIDFontType0":this.mimetype="font/opentype"
var l="Type1C"===o||"CIDFontType0C"===o?new O(t,r):new I(e,t,r)
b(r),c=this.convert(e,l,r)
break
case"OpenType":case"TrueType":case"CIDFontType2":this.mimetype="font/opentype",c=this.checkAndRepair(e,t,r),this.isOpenType&&(b(r),n="OpenType")
break
default:throw new a.FormatError("Font ".concat(n," is not supported"))}}catch(e){return(0,a.warn)(e),void this.fallbackToSystemFont()}this.data=c,this.fontType=y(n,o),this.fontMatrix=r.fontMatrix,this.widths=r.widths,this.defaultWidth=r.defaultWidth,this.toUnicode=r.toUnicode,this.encoding=r.baseEncoding,this.seacMap=r.seacMap}else t&&(0,a.warn)('Font file is empty in "'+e+'" ('+this.loadedName+")"),this.fallbackToSystemFont()
else{for(i=0;i<256;i++)this.toFontChar[i]=this.differences[i]||r.defaultEncoding[i]
this.fontType=a.FontType.TYPE3}}var t
function r(e,t){return(e<<8)+t}function f(e,t){var r=(e<<8)+t
return 32768&r?r-65536:r}function A(e){return String.fromCharCode(e>>8&255,255&e)}function _(e){return e=e>32767?32767:e<-32768?-32768:e,String.fromCharCode(e>>8&255,255&e)}function P(e){var t=e.peekBytes(4)
return"ttcf"===(0,a.bytesToString)(t)}function E(e,t,r){for(var a,i=[],n=0,o=e.length;n<o;n++)-1!==(a=(0,c.getUnicodeForGlyph)(e[n],t))&&(i[n]=a)
for(var s in r)-1!==(a=(0,c.getUnicodeForGlyph)(r[s],t))&&(i[+s]=a)
return i}function T(e,t,r){var i=Object.create(null),n=[],o=0,s=d[o][0],c=d[o][1]
for(var l in e){var u=e[l|=0]
if(t(u)){if(s>c){if(++o>=d.length){(0,a.warn)("Ran out of space in font private use area.")
break}s=d[o][0],c=d[o][1]}var h=s++
0===u&&(u=r),i[h]=u,n[l]=h}}return{toFontChar:n,charCodeToGlyphId:i,nextAvailableFontCharCode:s}}function F(e,t){var r,i,n,o,s=function(e,t){var r=[]
for(var a in e)e[a]>=t||r.push({fontCharCode:0|a,glyphId:e[a]})
0===r.length&&r.push({fontCharCode:0,glyphId:0}),r.sort(function(e,t){return e.fontCharCode-t.fontCharCode})
for(var i=[],n=r.length,o=0;o<n;){var s=r[o].fontCharCode,c=[r[o].glyphId];++o
for(var l=s;o<n&&l+1===r[o].fontCharCode&&(c.push(r[o].glyphId),++o,65535!=++l););i.push([s,l,c])}return i}(e,t),c=s[s.length-1][1]>65535?2:1,l="\0\0"+A(c)+"\0\0"+(0,a.string32)(4+8*c)
for(r=s.length-1;r>=0&&!(s[r][0]<=65535);--r);var u=r+1
s[r][0]<65535&&65535===s[r][1]&&(s[r][1]=65534)
var h,f,d,g,m=s[r][1]<65535?1:0,p=u+m,v=x.getSearchParams(p,2),b="",y="",w="",k="",S="",C=0
for(r=0,i=u;r<i;r++){f=(h=s[r])[0],d=h[1],b+=A(f),y+=A(d)
var _=!0
for(n=1,o=(g=h[2]).length;n<o;++n)if(g[n]!==g[n-1]+1){_=!1
break}if(_)w+=A(g[0]-f&65535),k+=A(0)
else{var P=2*(p-r)+2*C
for(C+=d-f+1,w+=A(0),k+=A(P),n=0,o=g.length;n<o;++n)S+=A(g[n])}}m>0&&(y+="ÿÿ",b+="ÿÿ",w+="\0",k+="\0\0")
var I="\0\0"+A(2*p)+A(v.range)+A(v.entry)+A(v.rangeShift)+y+"\0\0"+b+w+k+S,O="",E=""
if(c>1){for(l+="\0\0\n"+(0,a.string32)(4+8*c+4+I.length),O="",r=0,i=s.length;r<i;r++){f=(h=s[r])[0]
var T=(g=h[2])[0]
for(n=1,o=g.length;n<o;++n)g[n]!==g[n-1]+1&&(d=h[0]+n-1,O+=(0,a.string32)(f)+(0,a.string32)(d)+(0,a.string32)(T),f=d+1,T=g[n])
O+=(0,a.string32)(f)+(0,a.string32)(h[1])+(0,a.string32)(T)}E="\0\f\0\0"+(0,a.string32)(O.length+16)+"\0\0\0\0"+(0,a.string32)(O.length/12)}return l+"\0"+A(I.length+4)+I+E+O}function R(e,t,r){r=r||{unitsPerEm:0,yMax:0,yMin:0,ascent:0,descent:0}
var i=0,n=0,o=0,s=0,l=null,u=0
if(t){for(var h in t){(l>(h|=0)||!l)&&(l=h),u<h&&(u=h)
var f=(0,c.getUnicodeRangeFor)(h)
if(f<32)i|=1<<f
else if(f<64)n|=1<<f-32
else if(f<96)o|=1<<f-64
else{if(!(f<123))throw new a.FormatError("Unicode ranges Bits > 123 are reserved for internal usage")
s|=1<<f-96}}u>65535&&(u=65535)}else l=0,u=255
var d=e.bbox||[0,0,0,0],m=r.unitsPerEm||1/(e.fontMatrix||a.FONT_IDENTITY_MATRIX)[0],p=e.ascentScaled?1:m/g,v=r.ascent||Math.round(p*(e.ascent||d[3])),b=r.descent||Math.round(p*(e.descent||d[1]))
b>0&&e.descent>0&&d[1]<0&&(b=-b)
var y=r.yMax||v,w=-r.yMin||-b
return"\0$ô\0\0\0»\0\0\0»\0\0ß\x001\0\0\0\0"+String.fromCharCode(e.fixedPitch?9:0)+"\0\0\0\0\0\0"+(0,a.string32)(i)+(0,a.string32)(n)+(0,a.string32)(o)+(0,a.string32)(s)+"*21*"+A(e.italicAngle?1:0)+A(l||e.firstChar)+A(u||e.lastChar)+A(v)+A(b)+"\0d"+A(y)+A(w)+"\0\0\0\0\0\0\0\0"+A(e.xHeight)+A(e.capHeight)+A(0)+A(l||e.firstChar)+"\0"}function B(e){var t=Math.floor(e.italicAngle*Math.pow(2,16))
return"\0\0\0"+(0,a.string32)(t)+"\0\0\0\0"+(0,a.string32)(e.fixedPitch)+"\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0"}function D(e,t){t||(t=[[],[]])
var r,a,i,n,o,s=[t[0][0]||"Original licence",t[0][1]||e,t[0][2]||"Unknown",t[0][3]||"uniqueID",t[0][4]||e,t[0][5]||"Version 0.11",t[0][6]||"",t[0][7]||"Unknown",t[0][8]||"Unknown",t[0][9]||"Unknown"],c=[]
for(r=0,a=s.length;r<a;r++){var l=[]
for(i=0,n=(o=t[1][r]||s[r]).length;i<n;i++)l.push(A(o.charCodeAt(i)))
c.push(l.join(""))}var u=[s,c],h=["\0","\0"],f=["\0\0","\0"],d=["\0\0","\t"],g=s.length*h.length,m="\0\0"+A(g)+A(12*g+6),p=0
for(r=0,a=h.length;r<a;r++){var v=u[r]
for(i=0,n=v.length;i<n;i++)o=v[i],m+=h[r]+f[r]+d[r]+A(i)+A(o.length)+A(p),p+=o.length}return m+(s.join("")+c.join(""))}return e.getFontID=(t=1,function(){return String(t++)}),e.prototype={name:null,font:null,mimetype:null,encoding:null,disableFontFace:!1,get renderer(){var e=l.FontRendererFactory.create(this,m)
return(0,a.shadow)(this,"renderer",e)},exportData:function(){var e={}
for(var t in this)this.hasOwnProperty(t)&&(e[t]=this[t])
return e},fallbackToSystemFont:function(){var e,t,r=this
this.missingFile=!0
var i=this.name,l=this.type,u=this.subtype,h=i.replace(/[,_]/g,"-"),f=(0,s.getStdFontMap)(),d=(0,s.getNonStdFontMap)(),g=!!f[h]||!(!d[h]||!f[d[h]])
if(h=f[h]||d[h]||h,this.bold=-1!==h.search(/bold/gi),this.italic=-1!==h.search(/oblique/gi)||-1!==h.search(/italic/gi),this.black=-1!==i.search(/Black/g),this.remeasure=Object.keys(this.widths).length>0,g&&"CIDFontType2"===l&&this.cidEncoding.startsWith("Identity-")){var m=(0,s.getGlyphMapForStandardFonts)(),p=[]
for(e in m)p[+e]=m[e]
if(/Arial-?Black/i.test(i)){var v=(0,s.getSupplementalGlyphMapForArialBlack)()
for(e in v)p[+e]=v[e]}else if(/Calibri/i.test(i)){var b=(0,s.getSupplementalGlyphMapForCalibri)()
for(e in b)p[+e]=b[e]}this.toUnicode instanceof C||this.toUnicode.forEach(function(e,t){p[+e]=t}),this.toFontChar=p,this.toUnicode=new S(p)}else if(/Symbol/i.test(h))this.toFontChar=E(o.SymbolSetEncoding,(0,n.getGlyphsUnicode)(),this.differences)
else if(/Dingbats/i.test(h))/Wingdings/i.test(i)&&(0,a.warn)("Non-embedded Wingdings font, falling back to ZapfDingbats."),this.toFontChar=E(o.ZapfDingbatsEncoding,(0,n.getDingbatsGlyphsUnicode)(),this.differences)
else if(g)this.toFontChar=E(this.defaultEncoding,(0,n.getGlyphsUnicode)(),this.differences)
else{var w=(0,n.getGlyphsUnicode)()
this.toUnicode.forEach(function(e,a){if(!r.composite){var i=r.differences[e]||r.defaultEncoding[e];-1!==(t=(0,c.getUnicodeForGlyph)(i,w))&&(a=t)}r.toFontChar[e]=a})}this.loadedName=h.split("-")[0],this.fontType=y(l,u)},checkAndRepair:function(e,t,s){var c=["OS/2","cmap","head","hhea","hmtx","maxp","name","post","loca","glyf","fpgm","prep","cvt ","CFF "]
function l(e,r){var a=Object.create(null)
a["OS/2"]=null,a.cmap=null,a.head=null,a.hhea=null,a.hmtx=null,a.maxp=null,a.name=null,a.post=null
for(var i=0;i<r;i++){var n=d(t)
c.includes(n.tag)&&0!==n.length&&(a[n.tag]=n)}return a}function d(e){var t=(0,a.bytesToString)(e.getBytes(4)),r=e.getInt32()>>>0,i=e.getInt32()>>>0,n=e.getInt32()>>>0,o=e.pos
e.pos=e.start?e.start:0,e.skip(i)
var s=e.getBytes(n)
return e.pos=o,"head"===t&&(s[8]=s[9]=s[10]=s[11]=0,s[17]|=32),{tag:t,checksum:r,length:n,offset:i,data:s}}function g(e){return{version:(0,a.bytesToString)(e.getBytes(4)),numTables:e.getUint16(),searchRange:e.getUint16(),entrySelector:e.getUint16(),rangeShift:e.getUint16()}}function p(e,t,r,a,i,n){var o={length:0,sizeOfInstructions:0}
if(r-t<=12)return o
var s=e.subarray(t,r),c=f(s[0],s[1])
if(c<0)return function(e,t,r){e[1]=r,e[0]=r>>>8}(s,0,c=-1),a.set(s,i),o.length=s.length,o
var l,u=10,h=0
for(l=0;l<c;l++)h=1+(s[u]<<8|s[u+1]),u+=2
var d=u,g=s[u]<<8|s[u+1]
o.sizeOfInstructions=g
var m=u+=2+g,p=0
for(l=0;l<h;l++){var v=s[u++]
192&v&&(s[u-1]=63&v)
var b=(2&v?1:16&v?0:2)+(4&v?1:32&v?0:2)
if(p+=b,8&v){var y=s[u++]
l+=y,p+=y*b}}if(0===p)return o
var w=u+p
return w>s.length?o:!n&&g>0?(a.set(s.subarray(0,d),i),a.set([0,0],i+d),a.set(s.subarray(m,w),i+d+2),w-=g,s.length-w>3&&(w=w+3&-4),o.length=w,o):s.length-w>3?(w=w+3&-4,a.set(s.subarray(0,w),i),o.length=w,o):(a.set(s,i),o.length=s.length,o)}function y(e){var r=(t.start?t.start:0)+e.offset
t.pos=r
var i=[[],[]],n=e.length,o=r+n
if(0!==t.getUint16()||n<6)return i
var s,c,l=t.getUint16(),u=t.getUint16(),h=[]
for(s=0;s<l&&t.pos+12<=o;s++){var f={platform:t.getUint16(),encoding:t.getUint16(),language:t.getUint16(),name:t.getUint16(),length:t.getUint16(),offset:t.getUint16()};(1===f.platform&&0===f.encoding&&0===f.language||3===f.platform&&1===f.encoding&&1033===f.language)&&h.push(f)}for(s=0,c=h.length;s<c;s++){var d=h[s]
if(!(d.length<=0)){var g=r+u+d.offset
if(!(g+d.length>o)){t.pos=g
var m=d.name
if(d.encoding){for(var p="",v=0,b=d.length;v<b;v+=2)p+=String.fromCharCode(t.getUint16())
i[1][m]=p}else i[0][m]=(0,a.bytesToString)(t.getBytes(d.length))}}}return i}var k,S,C,A,_=[0,0,0,0,0,0,0,0,-2,-2,-2,-2,0,0,-2,-5,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,-1,-1,1,-1,-999,0,1,0,-1,-2,0,-1,-2,-1,-1,0,-1,-1,0,0,-999,-999,-1,-1,-1,-1,-2,-999,-2,-2,-999,0,-2,-2,0,0,-2,0,-2,0,0,0,-2,-1,-1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,-1,0,-1,-1,0,-999,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,-2,-999,-999,-999,-999,-999,-1,-1,-2,-2,0,0,0,0,-1,-1,-999,-2,-2,0,0,-1,-2,-2,0,0,0,-1,-1,-1,-2]
function I(e,t){for(var r,i,n,o,s,c=e.data,l=0,u=0,h=0,f=[],d=[],g=[],m=t.tooComplexToFollowFunctions,p=!1,v=0,b=0,y=c.length;l<y;){var w=c[l++]
if(64===w)if(i=c[l++],p||b)l+=i
else for(r=0;r<i;r++)f.push(c[l++])
else if(65===w)if(i=c[l++],p||b)l+=2*i
else for(r=0;r<i;r++)n=c[l++],f.push(n<<8|c[l++])
else if(176==(248&w))if(i=w-176+1,p||b)l+=i
else for(r=0;r<i;r++)f.push(c[l++])
else if(184==(248&w))if(i=w-184+1,p||b)l+=2*i
else for(r=0;r<i;r++)n=c[l++],f.push(n<<8|c[l++])
else if(43!==w||m)if(44!==w||m){if(45===w)if(p)p=!1,u=l
else{if(!(s=d.pop()))return(0,a.warn)("TT: ENDF bad stack"),void(t.hintsValid=!1)
o=g.pop(),c=s.data,l=s.i,t.functionsStackDeltas[o]=f.length-s.stackTop}else if(137===w)(p||b)&&((0,a.warn)("TT: nested IDEFs not allowed"),m=!0),p=!0,h=l
else if(88===w)++v
else if(27===w)b=v
else if(89===w)b===v&&(b=0),--v
else if(28===w&&!p&&!b){var k=f[f.length-1]
k>0&&(l+=k-1)}}else(p||b)&&((0,a.warn)("TT: nested FDEFs not allowed"),m=!0),p=!0,h=l,o=f.pop(),t.functionsDefined[o]={data:c,i:l}
else if(!p&&!b)if(o=f[f.length-1],isNaN(o))(0,a.info)("TT: CALL empty stack (or invalid entry).")
else if(t.functionsUsed[o]=!0,o in t.functionsStackDeltas){var S=f.length+t.functionsStackDeltas[o]
if(S<0)return(0,a.warn)("TT: CALL invalid functions stack delta."),void(t.hintsValid=!1)
f.length=S}else if(o in t.functionsDefined&&!g.includes(o)){if(d.push({data:c,i:l,stackTop:f.length-1}),g.push(o),!(s=t.functionsDefined[o]))return(0,a.warn)("TT: CALL non-existent function"),void(t.hintsValid=!1)
c=s.data,l=s.i}if(!p&&!b){var C=w<=142?_[w]:w>=192&&w<=223?-1:w>=224?-2:0
for(w>=113&&w<=117&&(i=f.pop(),isNaN(i)||(C=2*-i));C<0&&f.length>0;)f.pop(),C++
for(;C>0;)f.push(NaN),C--}}t.tooComplexToFollowFunctions=m
var x=[c]
l>c.length&&x.push(new Uint8Array(l-c.length)),h>u&&((0,a.warn)("TT: complementing a missing function tail"),x.push(new Uint8Array([34,45]))),function(e,t){if(t.length>1){var r,a,i=0
for(r=0,a=t.length;r<a;r++)i+=t[r].length
i=i+3&-4
var n=new Uint8Array(i),o=0
for(r=0,a=t.length;r<a;r++)n.set(t[r],o),o+=t[r].length
e.data=n,e.length=i}}(e,x)}if(P(t=new h.Stream(new Uint8Array(t.getBytes())))){var E=function(e,t){for(var r=function(e){var t=(0,a.bytesToString)(e.getBytes(4));(0,a.assert)("ttcf"===t,"Must be a TrueType Collection font.")
for(var r=e.getUint16(),i=e.getUint16(),n=e.getInt32()>>>0,o=[],s=0;s<n;s++)o.push(e.getInt32()>>>0)
var c={ttcTag:t,majorVersion:r,minorVersion:i,numFonts:n,offsetTable:o}
switch(r){case 1:return c
case 2:return c.dsigTag=e.getInt32()>>>0,c.dsigLength=e.getInt32()>>>0,c.dsigOffset=e.getInt32()>>>0,c}throw new a.FormatError("Invalid TrueType Collection majorVersion: ".concat(r,"."))}(e),i=r.numFonts,n=r.offsetTable,o=0;o<i;o++){e.pos=(e.start||0)+n[o]
var s=g(e),c=l(0,s.numTables)
if(!c.name)throw new a.FormatError('TrueType Collection font must contain a "name" table.')
for(var u=y(c.name),h=0,f=u.length;h<f;h++)for(var d=0,m=u[h].length;d<m;d++){var p=u[h][d]
if(p&&p.replace(/\s/g,"")===t)return{header:s,tables:c}}}throw new a.FormatError('TrueType Collection does not contain "'.concat(t,'" font.'))}(t,this.name)
k=E.header,S=E.tables}else S=l(0,(k=g(t)).numTables)
var M=!S["CFF "]
if(M){if(!S.loca)throw new a.FormatError('Required "loca" table is not found')
S.glyf||((0,a.warn)('Required "glyf" table is not found -- trying to recover.'),S.glyf={tag:"glyf",data:new Uint8Array(0)}),this.isOpenType=!1}else{var L=s.composite&&((s.cidToGidMap||[]).length>0||!(s.cMap instanceof u.IdentityCMap))
if("OTTO"===k.version&&!L||!S.head||!S.hhea||!S.maxp||!S.post)return A=new h.Stream(S["CFF "].data),C=new O(A,s),b(s),this.convert(e,C,s)
delete S.glyf,delete S.loca,delete S.fpgm,delete S.prep,delete S["cvt "],this.isOpenType=!0}if(!S.maxp)throw new a.FormatError('Required "maxp" table is not found')
t.pos=(t.start||0)+S.maxp.offset
var N=t.getInt32(),U=t.getUint16(),q=U+1,j=!0
q>65535&&(j=!1,q=U,(0,a.warn)("Not enough space in glyfs to duplicate first glyph."))
var z=0,H=0
N>=65536&&S.maxp.length>=22&&(t.pos+=8,t.getUint16()>2&&(S.maxp.data[14]=0,S.maxp.data[15]=2),t.pos+=4,z=t.getUint16(),t.pos+=4,H=t.getUint16()),S.maxp.data[4]=q>>8,S.maxp.data[5]=255&q
var W=function(e,t,r,i){var n={functionsDefined:[],functionsUsed:[],functionsStackDeltas:[],tooComplexToFollowFunctions:!1,hintsValid:!0}
if(e&&I(e,n),t&&I(t,n),e&&function(e,t){if(!e.tooComplexToFollowFunctions)if(e.functionsDefined.length>t)(0,a.warn)("TT: more functions defined than expected"),e.hintsValid=!1
else for(var r=0,i=e.functionsUsed.length;r<i;r++){if(r>t)return(0,a.warn)("TT: invalid function id: "+r),void(e.hintsValid=!1)
if(e.functionsUsed[r]&&!e.functionsDefined[r])return(0,a.warn)("TT: undefined function: "+r),void(e.hintsValid=!1)}}(n,i),r&&1&r.length){var o=new Uint8Array(r.length+1)
o.set(r.data),r.data=o}return n.hintsValid}(S.fpgm,S.prep,S["cvt "],z)
if(W||(delete S.fpgm,delete S.prep,delete S["cvt "]),function(e,t,r,i){if(t){e.pos=(e.start?e.start:0)+t.offset,e.pos+=4,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=2,e.pos+=8,e.pos+=2
var n=e.getUint16()
n>i&&((0,a.info)("The numOfMetrics ("+n+") should not be greater than the numGlyphs ("+i+")"),n=i,t.data[34]=(65280&n)>>8,t.data[35]=255&n)
var o=i-n-(r.length-4*n>>1)
if(o>0){var s=new Uint8Array(r.length+2*o)
s.set(r.data),r.data=s}}else r&&(r.data=null)}(t,S.hhea,S.hmtx,q),!S.head)throw new a.FormatError('Required "head" table is not found')
!function(e,t,i){var n=e.data,o=(n[0]<<24)+(n[1]<<16)+(n[2]<<8)+n[3]
o>>16!=1&&((0,a.info)("Attempting to fix invalid version in head table: "+o),n[0]=0,n[1]=1,n[2]=0,n[3]=0)
var s=r(n[50],n[51])
if(s<0||s>1){(0,a.info)("Attempting to fix invalid indexToLocFormat in head table: "+s)
var c=t+1
if(i===c<<1)n[50]=0,n[51]=0
else{if(i!==c<<2)throw new a.FormatError("Could not fix indexToLocFormat: "+s)
n[50]=0,n[51]=1}}}(S.head,U,M?S.loca.length:0)
var G=Object.create(null)
if(M){var X=r(S.head.data[50],S.head.data[51]),V=function(e,t,r,a,i,n,o){var s,c,l
X?(s=4,c=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]},l=function(e,t,r){e[t]=r>>>24&255,e[t+1]=r>>16&255,e[t+2]=r>>8&255,e[t+3]=255&r}):(s=2,c=function(e,t){return e[t]<<9|e[t+1]<<1},l=function(e,t,r){e[t]=r>>9&255,e[t+1]=r>>1&255})
var u=n?r+1:r,h=e.data,f=s*(1+u);(h=new Uint8Array(f)).set(e.data.subarray(0,f)),e.data=h
var d,g,m=t.data,v=m.length,b=new Uint8Array(v),y=c(h,0),w=0,k=Object.create(null)
for(l(h,0,w),d=0,g=s;d<r;d++,g+=s){var S=c(h,g)
0===S&&(S=y),S>v&&(v+3&-4)===S&&(S=v),S>v&&(y=S)
var C=p(m,y,S,b,w,i),x=C.length
0===x&&(k[d]=!0),C.sizeOfInstructions>o&&(o=C.sizeOfInstructions),l(h,g,w+=x),y=S}if(0===w){var A=new Uint8Array([0,1,0,0,0,0,0,0,0,0,0,0,0,0,49,0])
for(d=0,g=s;d<u;d++,g+=s)l(h,g,A.length)
t.data=A}else if(n){var _=c(h,s)
b.length>_+w?t.data=b.subarray(0,_+w):(t.data=new Uint8Array(_+w),t.data.set(b.subarray(0,w))),t.data.set(b.subarray(0,_),w),l(e.data,h.length-s,w+_)}else t.data=b.subarray(0,w)
return{missingGlyphs:k,maxSizeOfInstructions:o}}(S.loca,S.glyf,U,0,W,j,H)
G=V.missingGlyphs,N>=65536&&S.maxp.length>=22&&(S.maxp.data[26]=V.maxSizeOfInstructions>>8,S.maxp.data[27]=255&V.maxSizeOfInstructions)}if(!S.hhea)throw new a.FormatError('Required "hhea" table is not found')
0===S.hhea.data[10]&&0===S.hhea.data[11]&&(S.hhea.data[10]=255,S.hhea.data[11]=255)
var K={unitsPerEm:r(S.head.data[18],S.head.data[19]),yMax:r(S.head.data[42],S.head.data[43]),yMin:f(S.head.data[38],S.head.data[39]),ascent:r(S.hhea.data[4],S.hhea.data[5]),descent:f(S.hhea.data[6],S.hhea.data[7])}
this.ascent=K.ascent/K.unitsPerEm,this.descent=K.descent/K.unitsPerEm,S.post&&function(e,r,i){var n=(t.start?t.start:0)+e.offset
t.pos=n
var o,s=n+e.length,c=t.getInt32()
t.getBytes(28)
var l,u=!0
switch(c){case 65536:o=v
break
case 131072:var h=t.getUint16()
if(h!==i){u=!1
break}var f=[]
for(l=0;l<h;++l){var d=t.getUint16()
if(d>=32768){u=!1
break}f.push(d)}if(!u)break
for(var g=[],m=[];t.pos<s;){var p=t.getByte()
for(m.length=p,l=0;l<p;++l)m[l]=String.fromCharCode(t.getByte())
g.push(m.join(""))}for(o=[],l=0;l<h;++l){var b=f[l]
b<258?o.push(v[b]):o.push(g[b-258])}break
case 196608:break
default:(0,a.warn)("Unknown/unsupported post table version "+c),u=!1,r.defaultEncoding&&(o=r.defaultEncoding)}r.glyphNames=o}(S.post,s,U),S.post={tag:"post",data:B(s)}
var Y,J=[]
function Z(e){return!G[e]}if(s.composite){var Q=s.cidToGidMap||[],$=0===Q.length
s.cMap.forEach(function(e,t){if(t>65535)throw new a.FormatError("Max size of CID is 65,535")
var r=-1
$?r=t:void 0!==Q[t]&&(r=Q[t]),r>=0&&r<U&&Z(r)&&(J[e]=r)})}else{var ee=function(e,t,r,i){if(!e)return(0,a.warn)("No cmap table available."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var n,o=(t.start?t.start:0)+e.offset
t.pos=o,t.getUint16()
for(var s,c=t.getUint16(),l=!1,u=0;u<c;u++){var h=t.getUint16(),f=t.getUint16(),d=t.getInt32()>>>0,g=!1
if((!s||s.platformId!==h||s.encodingId!==f)&&(0===h&&0===f?g=!0:1===h&&0===f?g=!0:3!==h||1!==f||!i&&s?r&&3===h&&0===f&&(g=!0,l=!0):(g=!0,r||(l=!0)),g&&(s={platformId:h,encodingId:f,offset:d}),l))break}if(s&&(t.pos=o+s.offset),!s||-1===t.peekByte())return(0,a.warn)("Could not find a preferred cmap table."),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var m=t.getUint16()
t.getUint16(),t.getUint16()
var p,v,b=!1,y=[]
if(0===m){for(p=0;p<256;p++){var w=t.getByte()
w&&y.push({charCode:p,glyphId:w})}b=!0}else if(4===m){var k=t.getUint16()>>1
t.getBytes(6)
var S,C=[]
for(S=0;S<k;S++)C.push({end:t.getUint16()})
for(t.getUint16(),S=0;S<k;S++)C[S].start=t.getUint16()
for(S=0;S<k;S++)C[S].delta=t.getUint16()
var x=0
for(S=0;S<k;S++){n=C[S]
var A=t.getUint16()
if(A){var _=(A>>1)-(k-S)
n.offsetIndex=_,x=Math.max(x,_+n.end-n.start+1)}else n.offsetIndex=-1}var P=[]
for(p=0;p<x;p++)P.push(t.getUint16())
for(S=0;S<k;S++){o=(n=C[S]).start
var I=n.end,O=n.delta
for(_=n.offsetIndex,p=o;p<=I;p++)65535!==p&&(v=(v=_<0?p:P[_+p-o])+O&65535,y.push({charCode:p,glyphId:v}))}}else{if(6!==m)return(0,a.warn)("cmap table has unsupported format: "+m),{platformId:-1,encodingId:-1,mappings:[],hasShortCmap:!1}
var E=t.getUint16(),T=t.getUint16()
for(p=0;p<T;p++){v=t.getUint16()
var F=E+p
y.push({charCode:F,glyphId:v})}}for(y.sort(function(e,t){return e.charCode-t.charCode}),u=1;u<y.length;u++)y[u-1].charCode===y[u].charCode&&(y.splice(u,1),u--)
return{platformId:s.platformId,encodingId:s.encodingId,mappings:y,hasShortCmap:b}}(S.cmap,t,this.isSymbolicFont,s.hasEncoding),te=ee.platformId,re=ee.encodingId,ae=ee.mappings,ie=ae.length
if(s.hasEncoding&&(3===te&&1===re||1===te&&0===re)||-1===te&&-1===re&&(0,o.getEncoding)(s.baseEncodingName)){var ne=[]
"MacRomanEncoding"!==s.baseEncodingName&&"WinAnsiEncoding"!==s.baseEncodingName||(ne=(0,o.getEncoding)(s.baseEncodingName))
var oe=(0,n.getGlyphsUnicode)()
for(Y=0;Y<256;Y++){var se,ce
if(se=this.differences&&Y in this.differences?this.differences[Y]:Y in ne&&""!==ne[Y]?ne[Y]:o.StandardEncoding[Y]){var le
ce=w(se,oe),3===te&&1===re?le=oe[ce]:1===te&&0===re&&(le=o.MacRomanEncoding.indexOf(ce))
for(var ue=!1,he=0;he<ie;++he)if(ae[he].charCode===le){J[Y]=ae[he].glyphId,ue=!0
break}if(!ue&&s.glyphNames){var fe=s.glyphNames.indexOf(se);-1===fe&&ce!==se&&(fe=s.glyphNames.indexOf(ce)),fe>0&&Z(fe)&&(J[Y]=fe)}}}}else if(0===te&&0===re)for(var de=0;de<ie;++de)J[ae[de].charCode]=ae[de].glyphId
else for(var ge=0;ge<ie;++ge)Y=ae[ge].charCode,3===te&&Y>=61440&&Y<=61695&&(Y&=255),J[Y]=ae[ge].glyphId}0===J.length&&(J[0]=0)
var me=q-1
j||(me=0)
var pe=T(J,Z,me)
if(this.toFontChar=pe.toFontChar,S.cmap={tag:"cmap",data:F(pe.charCodeToGlyphId,q)},S["OS/2"]&&function(e){var t=new h.Stream(e.data),r=t.getUint16()
t.getBytes(60)
var a=t.getUint16()
return!(r<4&&768&a)&&(!(t.getUint16()>t.getUint16())&&(t.getBytes(6),0!==t.getUint16()&&(e.data[8]=e.data[9]=0,!0)))}(S["OS/2"])||(S["OS/2"]={tag:"OS/2",data:R(s,pe.charCodeToGlyphId,K)}),!M)try{A=new h.Stream(S["CFF "].data),(C=new i.CFFParser(A,s,m).parse()).duplicateFirstGlyph()
var ve=new i.CFFCompiler(C)
S["CFF "].data=ve.compile()}catch(e){(0,a.warn)("Failed to compile font "+s.loadedName)}if(S.name){var be=y(S.name)
S.name.data=D(e,be)}else S.name={tag:"name",data:D(this.name)}
var ye=new x(k.version)
for(var we in S)ye.addTable(we,S[we].data)
return ye.toArray()},convert:function(e,t,r){r.fixedPitch=!1,r.builtInEncoding&&function(e,t){if(!e.hasIncludedToUnicodeMap&&!(e.hasEncoding||t===e.defaultEncoding||e.toUnicode instanceof C)){var r=[],a=(0,n.getGlyphsUnicode)()
for(var i in t){var o=t[i],s=(0,c.getUnicodeForGlyph)(o,a);-1!==s&&(r[i]=String.fromCharCode(s))}e.toUnicode.amend(r)}}(r,r.builtInEncoding)
var i=1
t instanceof O&&(i=t.numGlyphs-1)
var s=t.getGlyphMapping(r),l=T(s,t.hasGlyphId.bind(t),i)
this.toFontChar=l.toFontChar
var u=t.numGlyphs
function h(e,t){var r=null
for(var a in e)t===e[a]&&(r||(r=[]),r.push(0|a))
return r}function f(e,t){for(var r in e)if(t===e[r])return 0|r
return l.charCodeToGlyphId[l.nextAvailableFontCharCode]=t,l.nextAvailableFontCharCode++}var d=t.seacs
if(m&&d&&d.length){var g=r.fontMatrix||a.FONT_IDENTITY_MATRIX,p=t.getCharset(),v=Object.create(null)
for(var b in d){var y=d[b|=0],w=o.StandardEncoding[y[2]],k=o.StandardEncoding[y[3]],S=p.indexOf(w),P=p.indexOf(k)
if(!(S<0||P<0)){var I={x:y[0]*g[0]+y[1]*g[2]+g[4],y:y[0]*g[1]+y[1]*g[3]+g[5]},E=h(s,b)
if(E)for(var M=0,L=E.length;M<L;M++){var N=E[M],U=l.charCodeToGlyphId,q=f(U,S),j=f(U,P)
v[N]={baseFontCharCode:q,accentFontCharCode:j,accentOffset:I}}}}r.seacMap=v}var z=1/(r.fontMatrix||a.FONT_IDENTITY_MATRIX)[0],H=new x("OTTO")
return H.addTable("CFF ",t.data),H.addTable("OS/2",R(r,l.charCodeToGlyphId)),H.addTable("cmap",F(l.charCodeToGlyphId,u)),H.addTable("head","\0\0\0\0\0\0\0\0\0\0_<õ\0\0"+_(z)+"\0\0\0\0\v~'\0\0\0\0\v~'\0\0"+_(r.descent)+"ÿ"+_(r.ascent)+A(r.italicAngle?2:0)+"\0\0\0\0\0\0\0"),H.addTable("hhea","\0\0\0"+_(r.ascent)+_(r.descent)+"\0\0ÿÿ\0\0\0\0\0\0"+_(r.capHeight)+_(Math.tan(r.italicAngle)*r.xHeight)+"\0\0\0\0\0\0\0\0\0\0\0\0"+A(u)),H.addTable("hmtx",function(){for(var e=t.charstrings,r=t.cff?t.cff.widths:null,a="\0\0\0\0",i=1,n=u;i<n;i++){var o=0
if(e){var s=e[i-1]
o="width"in s?s.width:0}else r&&(o=Math.ceil(r[i]||0))
a+=A(o)+A(0)}return a}()),H.addTable("maxp","\0\0P\0"+A(u)),H.addTable("name",D(e)),H.addTable("post",B(r)),H.toArray()},get spaceWidth(){if("_shadowWidth"in this)return this._shadowWidth
for(var e,t=["space","minus","one","i","I"],r=0,a=t.length;r<a;r++){var i=t[r]
if(i in this.widths){e=this.widths[i]
break}var o=(0,n.getGlyphsUnicode)()[i],s=0
if(this.composite&&this.cMap.contains(o)&&(s=this.cMap.lookup(o)),!s&&this.toUnicode&&(s=this.toUnicode.charCodeOf(o)),s<=0&&(s=o),e=this.widths[s])break}return e=e||this.defaultWidth,this._shadowWidth=e,e},charToGlyph:function(e,t){var r,i,n,o=e
this.cMap&&this.cMap.contains(e)&&(o=this.cMap.lookup(e)),i=this.widths[o],i=(0,a.isNum)(i)?i:this.defaultWidth
var s=this.vmetrics&&this.vmetrics[o],l=this.toUnicode.get(e)||this.fallbackToUnicode.get(e)||e
"number"==typeof l&&(l=String.fromCharCode(l))
var u=e in this.toFontChar
r=this.toFontChar[e]||e,this.missingFile&&(r=(0,c.mapSpecialUnicodeValues)(r)),this.isType3Font&&(n=r)
var h=null
if(this.seacMap&&this.seacMap[e]){u=!0
var f=this.seacMap[e]
r=f.baseFontCharCode,h={fontChar:String.fromCodePoint(f.accentFontCharCode),offset:f.accentOffset}}var d="number"==typeof r?String.fromCodePoint(r):"",g=this.glyphCache[e]
return g&&g.matchesForCache(d,l,h,i,s,n,t,u)||(g=new k(d,l,h,i,s,n,t,u),this.glyphCache[e]=g),g},charsToGlyphs:function(e){var t,r,a,i=this.charsCache
if(i&&(t=i[e]))return t
i||(i=this.charsCache=Object.create(null)),t=[]
var n,o=e,s=0
if(this.cMap)for(var c=Object.create(null);s<e.length;){this.cMap.readCharCode(e,s,c),a=c.charcode
var l=c.length
s+=l
var u=1===l&&32===e.charCodeAt(s-1)
r=this.charToGlyph(a,u),t.push(r)}else for(s=0,n=e.length;s<n;++s)a=e.charCodeAt(s),r=this.charToGlyph(a,32===a),t.push(r)
return i[o]=t},get glyphCacheValues(){return Object.values(this.glyphCache)}},e}()
t.Font=A
var _=function(){function e(e){this.error=e,this.loadedName="g_font_error",this.missingFile=!0}return e.prototype={charsToGlyphs:function(){return[]},exportData:function(){return{error:this.error}}},e}()
function P(e,t,r){var a,i,s,c=Object.create(null),l=!!(e.flags&p.Symbolic)
if(e.baseEncodingName)for(s=(0,o.getEncoding)(e.baseEncodingName),i=0;i<s.length;i++)a=r.indexOf(s[i]),c[i]=a>=0?a:0
else if(l)for(i in t)c[i]=t[i]
else for(s=o.StandardEncoding,i=0;i<s.length;i++)a=r.indexOf(s[i]),c[i]=a>=0?a:0
var u,h=e.differences
if(h)for(i in h){var f=h[i]
if(-1===(a=r.indexOf(f))){u||(u=(0,n.getGlyphsUnicode)())
var d=w(f,u)
d!==f&&(a=r.indexOf(d))}c[i]=a>=0?a:0}return c}t.ErrorFont=_
var I=function(){function e(e,t,r){for(var i,n=e.length,o=t.length,s=n-o,c=r,l=!1;c<s;){for(i=0;i<o&&e[c+i]===t[i];)i++
if(i>=o){for(c+=i;c<n&&(0,a.isSpace)(e[c]);)c++
l=!0
break}c++}return{found:l,length:c}}function t(t,r,i){var n=i.length1,o=(i.length2,r.peekBytes(6)),s=128===o[0]&&1===o[1]
s&&(r.skip(6),n=o[5]<<24|o[4]<<16|o[3]<<8|o[2])
var c=function(t,r){var i,n,o,s,c=[101,101,120,101,99],l=t.pos
try{n=(i=t.getBytes(r)).length}catch(e){if(e instanceof a.MissingDataException)throw e}if(n===r&&(o=e(i,c,r-2*c.length)).found&&o.length===r)return{stream:new h.Stream(i),length:r}
for((0,a.warn)('Invalid "Length1" property in Type1 font -- trying to recover.'),t.pos=l;0!==(o=e(t.peekBytes(2048),c,0)).length;)if(t.pos+=o.length,o.found){s=t.pos-l
break}return t.pos=l,s?{stream:new h.Stream(t.getBytes(s)),length:s}:((0,a.warn)('Unable to recover "Length1" property in Type1 font -- using as is.'),{stream:new h.Stream(t.getBytes(r)),length:r})}(r,n)
new f.Type1Parser(c.stream,!1,m).extractFontHeader(i),s&&((o=r.getBytes(6))[5],o[4],o[3],o[2])
var l,u=(l=r.getBytes(),{stream:new h.Stream(l),length:l.length}),d=new f.Type1Parser(u.stream,!0,m).extractFontProgram()
for(var g in d.properties)i[g]=d.properties[g]
var p=d.charstrings,v=this.getType2Charstrings(p),b=this.getType2Subrs(d.subrs)
this.charstrings=p,this.data=this.wrap(t,v,this.charstrings,b,i),this.seacs=this.getSeacs(d.charstrings)}return t.prototype={get numGlyphs(){return this.charstrings.length+1},getCharset:function(){for(var e=[".notdef"],t=this.charstrings,r=0;r<t.length;r++)e.push(t[r].glyphName)
return e},getGlyphMapping:function(e){var t,r=this.charstrings,a=[".notdef"]
for(t=0;t<r.length;t++)a.push(r[t].glyphName)
var i=e.builtInEncoding
if(i){var n=Object.create(null)
for(var o in i)(t=a.indexOf(i[o]))>=0&&(n[o]=t)}return P(e,n,a)},hasGlyphId:function(e){return!(e<0||e>=this.numGlyphs)&&(0===e||this.charstrings[e-1].charstring.length>0)},getSeacs:function(e){var t,r,a=[]
for(t=0,r=e.length;t<r;t++){var i=e[t]
i.seac&&(a[t+1]=i.seac)}return a},getType2Charstrings:function(e){for(var t=[],r=0,a=e.length;r<a;r++)t.push(e[r].charstring)
return t},getType2Subrs:function(e){var t,r=e.length
t=r<1133?107:r<33769?1131:32768
var a,i=[]
for(a=0;a<t;a++)i.push([11])
for(a=0;a<r;a++)i.push(e[a])
return i},wrap:function(e,t,r,a,n){var o=new i.CFF
o.header=new i.CFFHeader(1,0,4,4),o.names=[e]
var s=new i.CFFTopDict
s.setByName("version",391),s.setByName("Notice",392),s.setByName("FullName",393),s.setByName("FamilyName",394),s.setByName("Weight",395),s.setByName("Encoding",null),s.setByName("FontMatrix",n.fontMatrix),s.setByName("FontBBox",n.bbox),s.setByName("charset",null),s.setByName("CharStrings",null),s.setByName("Private",null),o.topDict=s
var c=new i.CFFStrings
c.add("Version 0.11"),c.add("See original notice"),c.add(e),c.add(e),c.add("Medium"),o.strings=c,o.globalSubrIndex=new i.CFFIndex
var l,u,h=t.length,f=[0]
for(l=0;l<h;l++){var d=i.CFFStandardStrings.indexOf(r[l].glyphName);-1===d&&(d=0),f.push(d>>8&255,255&d)}o.charset=new i.CFFCharset(!1,0,[],f)
var g=new i.CFFIndex
for(g.add([139,14]),l=0;l<h;l++)g.add(t[l])
o.charStrings=g
var m=new i.CFFPrivateDict
m.setByName("Subrs",null)
var p=["BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StemSnapH","StemSnapV","BlueShift","BlueFuzz","BlueScale","LanguageGroup","ExpansionFactor","ForceBold","StdHW","StdVW"]
for(l=0,u=p.length;l<u;l++){var v=p[l]
if(v in n.privateData){var b=n.privateData[v]
if(Array.isArray(b))for(var y=b.length-1;y>0;y--)b[y]-=b[y-1]
m.setByName(v,b)}}o.topDict.privateDict=m
var w=new i.CFFIndex
for(l=0,u=a.length;l<u;l++)w.add(a[l])
return m.subrsIndex=w,new i.CFFCompiler(o).compile()}},t}(),O=function(){function e(e,t){this.properties=t
var r=new i.CFFParser(e,t,m)
this.cff=r.parse(),this.cff.duplicateFirstGlyph()
var n=new i.CFFCompiler(this.cff)
this.seacs=this.cff.seacs
try{this.data=n.compile()}catch(r){(0,a.warn)("Failed to compile font "+t.loadedName),this.data=e}}return e.prototype={get numGlyphs(){return this.cff.charStrings.count},getCharset:function(){return this.cff.charset.charset},getGlyphMapping:function(){var e,t,r=this.cff,a=this.properties,i=r.charset.charset
if(a.composite){if(e=Object.create(null),r.isCIDFont)for(t=0;t<i.length;t++){var n=i[t]
e[a.cMap.charCodeOf(n)]=t}else for(t=0;t<r.charStrings.count;t++)e[t]=t
return e}return P(a,r.encoding?r.encoding.encoding:null,i)},hasGlyphId:function(e){return this.cff.hasGlyphId(e)}},e}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.CFFFDSelect=t.CFFCompiler=t.CFFPrivateDict=t.CFFTopDict=t.CFFCharset=t.CFFIndex=t.CFFStrings=t.CFFHeader=t.CFF=t.CFFParser=t.CFFStandardStrings=void 0
var a=r(6),i=r(175),n=r(176),o=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall","001.000","001.001","001.002","001.003","Black","Bold","Book","Light","Medium","Regular","Roman","Semibold"]
t.CFFStandardStrings=o
var s=function(){var e=[null,{id:"hstem",min:2,stackClearing:!0,stem:!0},null,{id:"vstem",min:2,stackClearing:!0,stem:!0},{id:"vmoveto",min:1,stackClearing:!0},{id:"rlineto",min:2,resetStack:!0},{id:"hlineto",min:1,resetStack:!0},{id:"vlineto",min:1,resetStack:!0},{id:"rrcurveto",min:6,resetStack:!0},null,{id:"callsubr",min:1,undefStack:!0},{id:"return",min:0,undefStack:!0},null,null,{id:"endchar",min:0,stackClearing:!0},null,null,null,{id:"hstemhm",min:2,stackClearing:!0,stem:!0},{id:"hintmask",min:0,stackClearing:!0},{id:"cntrmask",min:0,stackClearing:!0},{id:"rmoveto",min:2,stackClearing:!0},{id:"hmoveto",min:1,stackClearing:!0},{id:"vstemhm",min:2,stackClearing:!0,stem:!0},{id:"rcurveline",min:8,resetStack:!0},{id:"rlinecurve",min:8,resetStack:!0},{id:"vvcurveto",min:4,resetStack:!0},{id:"hhcurveto",min:4,resetStack:!0},null,{id:"callgsubr",min:1,undefStack:!0},{id:"vhcurveto",min:4,resetStack:!0},{id:"hvcurveto",min:4,resetStack:!0}],t=[null,null,null,{id:"and",min:2,stackDelta:-1},{id:"or",min:2,stackDelta:-1},{id:"not",min:1,stackDelta:0},null,null,null,{id:"abs",min:1,stackDelta:0},{id:"add",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]+e[t-1]}},{id:"sub",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]-e[t-1]}},{id:"div",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]/e[t-1]}},null,{id:"neg",min:1,stackDelta:0,stackFn:function(e,t){e[t-1]=-e[t-1]}},{id:"eq",min:2,stackDelta:-1},null,null,{id:"drop",min:1,stackDelta:-1},null,{id:"put",min:2,stackDelta:-2},{id:"get",min:1,stackDelta:0},{id:"ifelse",min:4,stackDelta:-3},{id:"random",min:0,stackDelta:1},{id:"mul",min:2,stackDelta:-1,stackFn:function(e,t){e[t-2]=e[t-2]*e[t-1]}},null,{id:"sqrt",min:1,stackDelta:0},{id:"dup",min:1,stackDelta:1},{id:"exch",min:2,stackDelta:0},{id:"index",min:2,stackDelta:0},{id:"roll",min:3,stackDelta:-2},null,null,null,{id:"hflex",min:7,resetStack:!0},{id:"flex",min:13,resetStack:!0},{id:"hflex1",min:9,resetStack:!0},{id:"flex1",min:11,resetStack:!0}]
function r(e,t,r){this.bytes=e.getBytes(),this.properties=t,this.seacAnalysisEnabled=!!r}return r.prototype={parse:function(){var e=this.properties,t=new c
this.cff=t
var r=this.parseHeader(),a=this.parseIndex(r.endPos),i=this.parseIndex(a.endPos),n=this.parseIndex(i.endPos),o=this.parseIndex(n.endPos),s=this.parseDict(i.obj.get(0)),l=this.createDict(d,s,t.strings)
t.header=r.obj,t.names=this.parseNameIndex(a.obj),t.strings=this.parseStringIndex(n.obj),t.topDict=l,t.globalSubrIndex=o.obj,this.parsePrivateDict(t.topDict),t.isCIDFont=l.hasName("ROS")
var u=l.getByName("CharStrings"),h=this.parseIndex(u).obj,f=l.getByName("FontMatrix")
f&&(e.fontMatrix=f)
var g,m,p=l.getByName("FontBBox")
if(p&&(e.ascent=Math.max(p[3],p[1]),e.descent=Math.min(p[1],p[3]),e.ascentScaled=!0),t.isCIDFont){for(var v=this.parseIndex(l.getByName("FDArray")).obj,b=0,y=v.count;b<y;++b){var w=v.get(b),k=this.createDict(d,this.parseDict(w),t.strings)
this.parsePrivateDict(k),t.fdArray.push(k)}m=null,g=this.parseCharsets(l.getByName("charset"),h.count,t.strings,!0),t.fdSelect=this.parseFDSelect(l.getByName("FDSelect"),h.count)}else g=this.parseCharsets(l.getByName("charset"),h.count,t.strings,!1),m=this.parseEncoding(l.getByName("Encoding"),e,t.strings,g.charset)
t.charset=g,t.encoding=m
var S=this.parseCharStrings({charStrings:h,localSubrIndex:l.privateDict.subrsIndex,globalSubrIndex:o.obj,fdSelect:t.fdSelect,fdArray:t.fdArray,privateDict:l.privateDict})
return t.charStrings=S.charStrings,t.seacs=S.seacs,t.widths=S.widths,t},parseHeader:function(){for(var e=this.bytes,t=e.length,r=0;r<t&&1!==e[r];)++r
if(r>=t)throw new a.FormatError("Invalid CFF header")
0!==r&&((0,a.info)("cff data is shifted"),e=e.subarray(r),this.bytes=e)
var i=e[0],n=e[1],o=e[2],s=e[3]
return{obj:new l(i,n,o,s),endPos:o}},parseDict:function(e){var t=0
function r(){var r=e[t++]
return 30===r?function(){for(var r="",a=["0","1","2","3","4","5","6","7","8","9",".","E","E-",null,"-"],i=e.length;t<i;){var n=e[t++],o=n>>4,s=15&n
if(15===o)break
if(r+=a[o],15===s)break
r+=a[s]}return parseFloat(r)}():28===r?((r=e[t++])<<24|e[t++]<<16)>>16:29===r?(r=(r=(r=e[t++])<<8|e[t++])<<8|e[t++])<<8|e[t++]:r>=32&&r<=246?r-139:r>=247&&r<=250?256*(r-247)+e[t++]+108:r>=251&&r<=254?-256*(r-251)-e[t++]-108:((0,a.warn)('CFFParser_parseDict: "'+r+'" is a reserved command.'),NaN)}var i=[],n=[]
t=0
for(var o=e.length;t<o;){var s=e[t]
s<=21?(12===s&&(s=s<<8|e[++t]),n.push([s,i]),i=[],++t):i.push(r())}return n},parseIndex:function(e){var t,r,a=new h,i=this.bytes,n=i[e++]<<8|i[e++],o=[],s=e
if(0!==n){var c=i[e++],l=e+(n+1)*c-1
for(t=0,r=n+1;t<r;++t){for(var u=0,f=0;f<c;++f)u<<=8,u+=i[e++]
o.push(l+u)}s=o[n]}for(t=0,r=o.length-1;t<r;++t){var d=o[t],g=o[t+1]
a.add(i.subarray(d,g))}return{obj:a,endPos:s}},parseNameIndex:function(e){for(var t=[],r=0,i=e.count;r<i;++r){var n=e.get(r)
t.push((0,a.bytesToString)(n))}return t},parseStringIndex:function(e){for(var t=new u,r=0,i=e.count;r<i;++r){var n=e.get(r)
t.add((0,a.bytesToString)(n))}return t},createDict:function(e,t,r){for(var a=new e(r),i=0,n=t.length;i<n;++i){var o=t[i],s=o[0],c=o[1]
a.setByKey(s,c)}return a},parseCharString:function(r,i,n,o){if(!i||r.callDepth>10)return!1
for(var s=r.stackSize,c=r.stack,l=i.length,u=0;u<l;){var h=i[u++],f=null
if(12===h){var d=i[u++]
0===d?(i[u-2]=139,i[u-1]=22,s=0):f=t[d]}else if(28===h)c[s]=(i[u]<<24|i[u+1]<<16)>>16,u+=2,s++
else if(14===h){if(s>=4&&(s-=4,this.seacAnalysisEnabled))return r.seac=c.slice(s,s+4),!1
f=e[h]}else if(h>=32&&h<=246)c[s]=h-139,s++
else if(h>=247&&h<=254)c[s]=h<251?(h-247<<8)+i[u]+108:-(h-251<<8)-i[u]-108,u++,s++
else if(255===h)c[s]=(i[u]<<24|i[u+1]<<16|i[u+2]<<8|i[u+3])/65536,u+=4,s++
else if(19===h||20===h)r.hints+=s>>1,u+=r.hints+7>>3,s%=2,f=e[h]
else{if(10===h||29===h){var g
if(!(g=10===h?n:o))return f=e[h],(0,a.warn)("Missing subrsIndex for "+f.id),!1
var m=32768
g.count<1240?m=107:g.count<33900&&(m=1131)
var p=c[--s]+m
if(p<0||p>=g.count||isNaN(p))return f=e[h],(0,a.warn)("Out of bounds subrIndex for "+f.id),!1
if(r.stackSize=s,r.callDepth++,!this.parseCharString(r,g.get(p),n,o))return!1
r.callDepth--,s=r.stackSize
continue}if(11===h)return r.stackSize=s,!0
f=e[h]}if(f){if(f.stem&&(r.hints+=s>>1,3===h||23===h?r.hasVStems=!0:!r.hasVStems||1!==h&&18!==h||((0,a.warn)("CFF stem hints are in wrong order"),i[u-1]=1===h?3:23)),"min"in f&&!r.undefStack&&s<f.min)return(0,a.warn)("Not enough parameters for "+f.id+"; actual: "+s+", expected: "+f.min),!1
r.firstStackClearing&&f.stackClearing&&(r.firstStackClearing=!1,(s-=f.min)>=2&&f.stem?s%=2:s>1&&(0,a.warn)("Found too many parameters for stack-clearing command"),s>0&&c[s-1]>=0&&(r.width=c[s-1])),"stackDelta"in f?("stackFn"in f&&f.stackFn(c,s),s+=f.stackDelta):f.stackClearing?s=0:f.resetStack?(s=0,r.undefStack=!1):f.undefStack&&(s=0,r.undefStack=!0,r.firstStackClearing=!1)}}return r.stackSize=s,!0},parseCharStrings:function(e){for(var t=e.charStrings,r=e.localSubrIndex,i=e.globalSubrIndex,n=e.fdSelect,o=e.fdArray,s=e.privateDict,c=[],l=[],u=t.count,h=0;h<u;h++){var f=t.get(h),d={callDepth:0,stackSize:0,stack:[],undefStack:!0,hints:0,firstStackClearing:!0,seac:null,width:null,hasVStems:!1},g=!0,m=null,p=s
if(n&&o.length){var v=n.getFDIndex(h);-1===v&&((0,a.warn)("Glyph index is not in fd select."),g=!1),v>=o.length&&((0,a.warn)("Invalid fd index for glyph index."),g=!1),g&&(m=(p=o[v].privateDict).subrsIndex)}else r&&(m=r)
if(g&&(g=this.parseCharString(d,f,m,i)),null!==d.width){var b=p.getByName("nominalWidthX")
l[h]=b+d.width}else{var y=p.getByName("defaultWidthX")
l[h]=y}null!==d.seac&&(c[h]=d.seac),g||t.set(h,new Uint8Array([14]))}return{charStrings:t,seacs:c,widths:l}},emptyPrivateDictionary:function(e){var t=this.createDict(g,[],e.strings)
e.setByKey(18,[0,0]),e.privateDict=t},parsePrivateDict:function(e){if(e.hasName("Private")){var t=e.getByName("Private")
if(Array.isArray(t)&&2===t.length){var r=t[0],a=t[1]
if(0===r||a>=this.bytes.length)this.emptyPrivateDictionary(e)
else{var i=a+r,n=this.bytes.subarray(a,i),o=this.parseDict(n),s=this.createDict(g,o,e.strings)
if(e.privateDict=s,s.getByName("Subrs")){var c=s.getByName("Subrs"),l=a+c
if(0===c||l>=this.bytes.length)this.emptyPrivateDictionary(e)
else{var u=this.parseIndex(l)
s.subrsIndex=u.obj}}}}else e.removeByName("Private")}else this.emptyPrivateDictionary(e)},parseCharsets:function(e,t,r,n){if(0===e)return new p(!0,m.ISO_ADOBE,i.ISOAdobeCharset)
if(1===e)return new p(!0,m.EXPERT,i.ExpertCharset)
if(2===e)return new p(!0,m.EXPERT_SUBSET,i.ExpertSubsetCharset)
var o,s,c,l=this.bytes,u=e,h=l[e++],f=[".notdef"]
switch(t-=1,h){case 0:for(c=0;c<t;c++)o=l[e++]<<8|l[e++],f.push(n?o:r.get(o))
break
case 1:for(;f.length<=t;)for(o=l[e++]<<8|l[e++],s=l[e++],c=0;c<=s;c++)f.push(n?o++:r.get(o++))
break
case 2:for(;f.length<=t;)for(o=l[e++]<<8|l[e++],s=l[e++]<<8|l[e++],c=0;c<=s;c++)f.push(n?o++:r.get(o++))
break
default:throw new a.FormatError("Unknown charset format")}var d=e,g=l.subarray(u,d)
return new p(!1,h,f,g)},parseEncoding:function(e,t,r,i){var o,s,c,l=Object.create(null),u=this.bytes,h=!1,f=null
if(0===e||1===e){h=!0,o=e
var d=e?n.ExpertEncoding:n.StandardEncoding
for(s=0,c=i.length;s<c;s++){var g=d.indexOf(i[s]);-1!==g&&(l[g]=s)}}else{var m=e
switch(127&(o=u[e++])){case 0:var p=u[e++]
for(s=1;s<=p;s++)l[u[e++]]=s
break
case 1:var b=u[e++],y=1
for(s=0;s<b;s++)for(var w=u[e++],k=u[e++],S=w;S<=w+k;S++)l[S]=y++
break
default:throw new a.FormatError("Unknown encoding format: ".concat(o," in CFF"))}var C=e
128&o&&(u[m]&=127,function(){var t=u[e++]
for(s=0;s<t;s++){var a=u[e++],n=(u[e++]<<8)+(255&u[e++])
l[a]=i.indexOf(r.get(n))}}()),f=u.subarray(m,C)}return new v(h,o&=127,l,f)},parseFDSelect:function(e,t){var r,i=this.bytes,n=i[e++],o=[]
switch(n){case 0:for(r=0;r<t;++r){var s=i[e++]
o.push(s)}break
case 3:var c=i[e++]<<8|i[e++]
for(r=0;r<c;++r){var l=i[e++]<<8|i[e++]
0===r&&0!==l&&((0,a.warn)("parseFDSelect: The first range must have a first GID of 0 -- trying to recover."),l=0)
for(var u=i[e++],h=i[e]<<8|i[e+1],f=l;f<h;++f)o.push(u)}e+=2
break
default:throw new a.FormatError('parseFDSelect: Unknown format "'.concat(n,'".'))}if(o.length!==t)throw new a.FormatError("parseFDSelect: Invalid font data.")
return new b(n,o)}},r}()
t.CFFParser=s
var c=function(){function e(){this.header=null,this.names=[],this.topDict=null,this.strings=new u,this.globalSubrIndex=null,this.encoding=null,this.charset=null,this.charStrings=null,this.fdArray=[],this.fdSelect=null,this.isCIDFont=!1}return e.prototype={duplicateFirstGlyph:function(){if(this.charStrings.count>=65535)(0,a.warn)("Not enough space in charstrings to duplicate first glyph.")
else{var e=this.charStrings.get(0)
this.charStrings.add(e),this.isCIDFont&&this.fdSelect.fdSelect.push(this.fdSelect.fdSelect[0])}},hasGlyphId:function(e){return!(e<0||e>=this.charStrings.count)&&this.charStrings.get(e).length>0}},e}()
t.CFF=c
var l=function(e,t,r,a){this.major=e,this.minor=t,this.hdrSize=r,this.offSize=a}
t.CFFHeader=l
var u=function(){function e(){this.strings=[]}return e.prototype={get:function(e){return e>=0&&e<=390?o[e]:e-391<=this.strings.length?this.strings[e-391]:o[0]},add:function(e){this.strings.push(e)},get count(){return this.strings.length}},e}()
t.CFFStrings=u
var h=function(){function e(){this.objects=[],this.length=0}return e.prototype={add:function(e){this.length+=e.length,this.objects.push(e)},set:function(e,t){this.length+=t.length-this.objects[e].length,this.objects[e]=t},get:function(e){return this.objects[e]},get count(){return this.objects.length}},e}()
t.CFFIndex=h
var f=function(){function e(e,t){this.keyToNameMap=e.keyToNameMap,this.nameToKeyMap=e.nameToKeyMap,this.defaults=e.defaults,this.types=e.types,this.opcodes=e.opcodes,this.order=e.order,this.strings=t,this.values=Object.create(null)}return e.prototype={setByKey:function(e,t){if(!(e in this.keyToNameMap))return!1
var r=t.length
if(0===r)return!0
for(var i=0;i<r;i++)if(isNaN(t[i]))return(0,a.warn)('Invalid CFFDict value: "'+t+'" for key "'+e+'".'),!0
var n=this.types[e]
return"num"!==n&&"sid"!==n&&"offset"!==n||(t=t[0]),this.values[e]=t,!0},setByName:function(e,t){if(!(e in this.nameToKeyMap))throw new a.FormatError('Invalid dictionary name "'.concat(e,'"'))
this.values[this.nameToKeyMap[e]]=t},hasName:function(e){return this.nameToKeyMap[e]in this.values},getByName:function(e){if(!(e in this.nameToKeyMap))throw new a.FormatError("Invalid dictionary name ".concat(e,'"'))
var t=this.nameToKeyMap[e]
return t in this.values?this.values[t]:this.defaults[t]},removeByName:function(e){delete this.values[this.nameToKeyMap[e]]}},e.createTables=function(e){for(var t={keyToNameMap:{},nameToKeyMap:{},defaults:{},types:{},opcodes:{},order:[]},r=0,a=e.length;r<a;++r){var i=e[r],n=Array.isArray(i[0])?(i[0][0]<<8)+i[0][1]:i[0]
t.keyToNameMap[n]=i[1],t.nameToKeyMap[i[1]]=n,t.types[n]=i[2],t.defaults[n]=i[3],t.opcodes[n]=Array.isArray(i[0])?i[0]:[i[0]],t.order.push(n)}return t},e}(),d=function(){var e=[[[12,30],"ROS",["sid","sid","num"],null],[[12,20],"SyntheticBase","num",null],[0,"version","sid",null],[1,"Notice","sid",null],[[12,0],"Copyright","sid",null],[2,"FullName","sid",null],[3,"FamilyName","sid",null],[4,"Weight","sid",null],[[12,1],"isFixedPitch","num",0],[[12,2],"ItalicAngle","num",0],[[12,3],"UnderlinePosition","num",-100],[[12,4],"UnderlineThickness","num",50],[[12,5],"PaintType","num",0],[[12,6],"CharstringType","num",2],[[12,7],"FontMatrix",["num","num","num","num","num","num"],[.001,0,0,.001,0,0]],[13,"UniqueID","num",null],[5,"FontBBox",["num","num","num","num"],[0,0,0,0]],[[12,8],"StrokeWidth","num",0],[14,"XUID","array",null],[15,"charset","offset",0],[16,"Encoding","offset",0],[17,"CharStrings","offset",0],[18,"Private",["offset","offset"],null],[[12,21],"PostScript","sid",null],[[12,22],"BaseFontName","sid",null],[[12,23],"BaseFontBlend","delta",null],[[12,31],"CIDFontVersion","num",0],[[12,32],"CIDFontRevision","num",0],[[12,33],"CIDFontType","num",0],[[12,34],"CIDCount","num",8720],[[12,35],"UIDBase","num",null],[[12,37],"FDSelect","offset",null],[[12,36],"FDArray","offset",null],[[12,38],"FontName","sid",null]],t=null
function r(r){null===t&&(t=f.createTables(e)),f.call(this,t,r),this.privateDict=null}return r.prototype=Object.create(f.prototype),r}()
t.CFFTopDict=d
var g=function(){var e=[[6,"BlueValues","delta",null],[7,"OtherBlues","delta",null],[8,"FamilyBlues","delta",null],[9,"FamilyOtherBlues","delta",null],[[12,9],"BlueScale","num",.039625],[[12,10],"BlueShift","num",7],[[12,11],"BlueFuzz","num",1],[10,"StdHW","num",null],[11,"StdVW","num",null],[[12,12],"StemSnapH","delta",null],[[12,13],"StemSnapV","delta",null],[[12,14],"ForceBold","num",0],[[12,17],"LanguageGroup","num",0],[[12,18],"ExpansionFactor","num",.06],[[12,19],"initialRandomSeed","num",0],[20,"defaultWidthX","num",0],[21,"nominalWidthX","num",0],[19,"Subrs","offset",null]],t=null
function r(r){null===t&&(t=f.createTables(e)),f.call(this,t,r),this.subrsIndex=null}return r.prototype=Object.create(f.prototype),r}()
t.CFFPrivateDict=g
var m={ISO_ADOBE:0,EXPERT:1,EXPERT_SUBSET:2},p=function(e,t,r,a){this.predefined=e,this.format=t,this.charset=r,this.raw=a}
t.CFFCharset=p
var v=function(e,t,r,a){this.predefined=e,this.format=t,this.encoding=r,this.raw=a},b=function(){function e(e,t){this.format=e,this.fdSelect=t}return e.prototype={getFDIndex:function(e){return e<0||e>=this.fdSelect.length?-1:this.fdSelect[e]}},e}()
t.CFFFDSelect=b
var y=function(){function e(){this.offsets=Object.create(null)}return e.prototype={isTracking:function(e){return e in this.offsets},track:function(e,t){if(e in this.offsets)throw new a.FormatError("Already tracking location of ".concat(e))
this.offsets[e]=t},offset:function(e){for(var t in this.offsets)this.offsets[t]+=e},setEntryLocation:function(e,t,r){if(!(e in this.offsets))throw new a.FormatError("Not tracking location of ".concat(e))
for(var i=r.data,n=this.offsets[e],o=0,s=t.length;o<s;++o){var c=5*o+n,l=c+1,u=c+2,h=c+3,f=c+4
if(29!==i[c]||0!==i[l]||0!==i[u]||0!==i[h]||0!==i[f])throw new a.FormatError("writing to an offset that is not empty")
var d=t[o]
i[c]=29,i[l]=d>>24&255,i[u]=d>>16&255,i[h]=d>>8&255,i[f]=255&d}}},e}(),w=function(){function e(e){this.cff=e}return e.prototype={compile:function(){var e=this.cff,t={data:[],length:0,add:function(e){this.data=this.data.concat(e),this.length=this.data.length}},r=this.compileHeader(e.header)
t.add(r)
var i=this.compileNameIndex(e.names)
if(t.add(i),e.isCIDFont&&e.topDict.hasName("FontMatrix")){var n=e.topDict.getByName("FontMatrix")
e.topDict.removeByName("FontMatrix")
for(var o=0,s=e.fdArray.length;o<s;o++){var c=e.fdArray[o],l=n.slice(0)
c.hasName("FontMatrix")&&(l=a.Util.transform(l,c.getByName("FontMatrix"))),c.setByName("FontMatrix",l)}}e.topDict.setByName("charset",0)
var u=this.compileTopDicts([e.topDict],t.length,e.isCIDFont)
t.add(u.output)
var h=u.trackers[0],f=this.compileStringIndex(e.strings.strings)
t.add(f)
var d=this.compileIndex(e.globalSubrIndex)
if(t.add(d),e.encoding&&e.topDict.hasName("Encoding"))if(e.encoding.predefined)h.setEntryLocation("Encoding",[e.encoding.format],t)
else{var g=this.compileEncoding(e.encoding)
h.setEntryLocation("Encoding",[t.length],t),t.add(g)}var m=this.compileCharset(e.charset)
h.setEntryLocation("charset",[t.length],t),t.add(m)
var p=this.compileCharStrings(e.charStrings)
if(h.setEntryLocation("CharStrings",[t.length],t),t.add(p),e.isCIDFont){h.setEntryLocation("FDSelect",[t.length],t)
var v=this.compileFDSelect(e.fdSelect)
t.add(v),u=this.compileTopDicts(e.fdArray,t.length,!0),h.setEntryLocation("FDArray",[t.length],t),t.add(u.output)
var b=u.trackers
this.compilePrivateDicts(e.fdArray,b,t)}return this.compilePrivateDicts([e.topDict],[h],t),t.add([0]),t.data},encodeNumber:function(e){return parseFloat(e)!==parseInt(e,10)||isNaN(e)?this.encodeFloat(e):this.encodeInteger(e)},encodeFloat:function(e){var t=e.toString(),r=/\.(\d*?)(?:9{5,20}|0{5,20})\d{0,2}(?:e(.+)|$)/.exec(t)
if(r){var a=parseFloat("1e"+((r[2]?+r[2]:0)+r[1].length))
t=(Math.round(e*a)/a).toString()}var i,n,o=""
for(i=0,n=t.length;i<n;++i){var s=t[i]
o+="e"===s?"-"===t[++i]?"c":"b":"."===s?"a":"-"===s?"e":s}var c=[30]
for(i=0,n=(o+=1&o.length?"f":"ff").length;i<n;i+=2)c.push(parseInt(o.substring(i,i+2),16))
return c},encodeInteger:function(e){return e>=-107&&e<=107?[e+139]:e>=108&&e<=1131?[247+((e-=108)>>8),255&e]:e>=-1131&&e<=-108?[251+((e=-e-108)>>8),255&e]:e>=-32768&&e<=32767?[28,e>>8&255,255&e]:[29,e>>24&255,e>>16&255,e>>8&255,255&e]},compileHeader:function(e){return[e.major,e.minor,e.hdrSize,e.offSize]},compileNameIndex:function(e){for(var t=new h,r=0,i=e.length;r<i;++r){for(var n=e[r],o=Math.min(n.length,127),s=new Array(o),c=0;c<o;c++){var l=n[c];(l<"!"||l>"~"||"["===l||"]"===l||"("===l||")"===l||"{"===l||"}"===l||"<"===l||">"===l||"/"===l||"%"===l)&&(l="_"),s[c]=l}""===(s=s.join(""))&&(s="Bad_Font_Name"),t.add((0,a.stringToBytes)(s))}return this.compileIndex(t)},compileTopDicts:function(e,t,r){for(var a=[],i=new h,n=0,o=e.length;n<o;++n){var s=e[n]
r&&(s.removeByName("CIDFontVersion"),s.removeByName("CIDFontRevision"),s.removeByName("CIDFontType"),s.removeByName("CIDCount"),s.removeByName("UIDBase"))
var c=new y,l=this.compileDict(s,c)
a.push(c),i.add(l),c.offset(t)}return{trackers:a,output:i=this.compileIndex(i,a)}},compilePrivateDicts:function(e,t,r){for(var i=0,n=e.length;i<n;++i){var o=e[i],s=o.privateDict
if(!s||!o.hasName("Private"))throw new a.FormatError("There must be a private dictionary.")
var c=new y,l=this.compileDict(s,c),u=r.length
if(c.offset(u),l.length||(u=0),t[i].setEntryLocation("Private",[l.length,u],r),r.add(l),s.subrsIndex&&s.hasName("Subrs")){var h=this.compileIndex(s.subrsIndex)
c.setEntryLocation("Subrs",[l.length],r),r.add(h)}}},compileDict:function(e,t){for(var r=[],i=e.order,n=0;n<i.length;++n){var o=i[n]
if(o in e.values){var s=e.values[o],c=e.types[o]
if(Array.isArray(c)||(c=[c]),Array.isArray(s)||(s=[s]),0!==s.length){for(var l=0,u=c.length;l<u;++l){var h=c[l],f=s[l]
switch(h){case"num":case"sid":r=r.concat(this.encodeNumber(f))
break
case"offset":var d=e.keyToNameMap[o]
t.isTracking(d)||t.track(d,r.length),r=r.concat([29,0,0,0,0])
break
case"array":case"delta":r=r.concat(this.encodeNumber(f))
for(var g=1,m=s.length;g<m;++g)r=r.concat(this.encodeNumber(s[g]))
break
default:throw new a.FormatError("Unknown data type of ".concat(h))}}r=r.concat(e.opcodes[o])}}}return r},compileStringIndex:function(e){for(var t=new h,r=0,i=e.length;r<i;++r)t.add((0,a.stringToBytes)(e[r]))
return this.compileIndex(t)},compileGlobalSubrIndex:function(){var e=this.cff.globalSubrIndex
this.out.writeByteArray(this.compileIndex(e))},compileCharStrings:function(e){for(var t=new h,r=0;r<e.count;r++){var a=e.get(r)
0!==a.length?t.add(a):t.add(new Uint8Array([139,14]))}return this.compileIndex(t)},compileCharset:function(e){var t=1+2*(this.cff.charStrings.count-1),r=new Uint8Array(t)
return this.compileTypedArray(r)},compileEncoding:function(e){return this.compileTypedArray(e.raw)},compileFDSelect:function(e){var t,r,a=e.format
switch(a){case 0:for((t=new Uint8Array(1+e.fdSelect.length))[0]=a,r=0;r<e.fdSelect.length;r++)t[r+1]=e.fdSelect[r]
break
case 3:var i=e.fdSelect[0],n=[a,0,0,0,0,i]
for(r=1;r<e.fdSelect.length;r++){var o=e.fdSelect[r]
o!==i&&(n.push(r>>8&255,255&r,o),i=o)}var s=(n.length-3)/3
n[1]=s>>8&255,n[2]=255&s,n.push(r>>8&255,255&r),t=new Uint8Array(n)}return this.compileTypedArray(t)},compileTypedArray:function(e){for(var t=[],r=0,a=e.length;r<a;++r)t[r]=e[r]
return t},compileIndex:function(e,t){t=t||[]
var r=e.objects,a=r.length
if(0===a)return[0,0,0]
var i,n,o=[a>>8&255,255&a],s=1
for(i=0;i<a;++i)s+=r[i].length
n=s<256?1:s<65536?2:s<16777216?3:4,o.push(n)
var c=1
for(i=0;i<a+1;i++)1===n?o.push(255&c):2===n?o.push(c>>8&255,255&c):3===n?o.push(c>>16&255,c>>8&255,255&c):o.push(c>>>24&255,c>>16&255,c>>8&255,255&c),r[i]&&(c+=r[i].length)
for(i=0;i<a;i++){t[i]&&t[i].offset(o.length)
for(var l=0,u=r[i].length;l<u;l++)o.push(r[i][l])}return o}},e}()
t.CFFCompiler=w},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.ExpertSubsetCharset=t.ExpertCharset=t.ISOAdobeCharset=void 0,t.ISOAdobeCharset=[".notdef","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","endash","dagger","daggerdbl","periodcentered","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","questiondown","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","ring","cedilla","hungarumlaut","ogonek","caron","emdash","AE","ordfeminine","Lslash","Oslash","OE","ordmasculine","ae","dotlessi","lslash","oslash","oe","germandbls","onesuperior","logicalnot","mu","trademark","Eth","onehalf","plusminus","Thorn","onequarter","divide","brokenbar","degree","thorn","threequarters","twosuperior","registered","minus","eth","multiply","threesuperior","copyright","Aacute","Acircumflex","Adieresis","Agrave","Aring","Atilde","Ccedilla","Eacute","Ecircumflex","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Ntilde","Oacute","Ocircumflex","Odieresis","Ograve","Otilde","Scaron","Uacute","Ucircumflex","Udieresis","Ugrave","Yacute","Ydieresis","Zcaron","aacute","acircumflex","adieresis","agrave","aring","atilde","ccedilla","eacute","ecircumflex","edieresis","egrave","iacute","icircumflex","idieresis","igrave","ntilde","oacute","ocircumflex","odieresis","ograve","otilde","scaron","uacute","ucircumflex","udieresis","ugrave","yacute","ydieresis","zcaron"],t.ExpertCharset=[".notdef","space","exclamsmall","Hungarumlautsmall","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","exclamdownsmall","centoldstyle","Lslashsmall","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","Dotaccentsmall","Macronsmall","figuredash","hypheninferior","Ogoneksmall","Ringsmall","Cedillasmall","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"],t.ExpertSubsetCharset=[".notdef","space","dollaroldstyle","dollarsuperior","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","asuperior","bsuperior","centsuperior","dsuperior","esuperior","isuperior","lsuperior","msuperior","nsuperior","osuperior","rsuperior","ssuperior","tsuperior","ff","fi","fl","ffi","ffl","parenleftinferior","parenrightinferior","hyphensuperior","colonmonetary","onefitted","rupiah","centoldstyle","figuredash","hypheninferior","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior"]},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getEncoding=function(e){switch(e){case"WinAnsiEncoding":return s
case"StandardEncoding":return o
case"MacRomanEncoding":return n
case"SymbolSetEncoding":return c
case"ZapfDingbatsEncoding":return l
case"ExpertEncoding":return a
case"MacExpertEncoding":return i
default:return null}},t.ExpertEncoding=t.ZapfDingbatsEncoding=t.SymbolSetEncoding=t.MacRomanEncoding=t.StandardEncoding=t.WinAnsiEncoding=void 0
var a=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","commasuperior","threequartersemdash","periodsuperior","questionsmall","","asuperior","bsuperior","centsuperior","dsuperior","esuperior","","","","isuperior","","","lsuperior","msuperior","nsuperior","osuperior","","","rsuperior","ssuperior","tsuperior","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hyphensuperior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdownsmall","centoldstyle","Lslashsmall","","","Scaronsmall","Zcaronsmall","Dieresissmall","Brevesmall","Caronsmall","","Dotaccentsmall","","","Macronsmall","","","figuredash","hypheninferior","","","Ogoneksmall","Ringsmall","Cedillasmall","","","","onequarter","onehalf","threequarters","questiondownsmall","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","zerosuperior","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","eightsuperior","ninesuperior","zeroinferior","oneinferior","twoinferior","threeinferior","fourinferior","fiveinferior","sixinferior","seveninferior","eightinferior","nineinferior","centinferior","dollarinferior","periodinferior","commainferior","Agravesmall","Aacutesmall","Acircumflexsmall","Atildesmall","Adieresissmall","Aringsmall","AEsmall","Ccedillasmall","Egravesmall","Eacutesmall","Ecircumflexsmall","Edieresissmall","Igravesmall","Iacutesmall","Icircumflexsmall","Idieresissmall","Ethsmall","Ntildesmall","Ogravesmall","Oacutesmall","Ocircumflexsmall","Otildesmall","Odieresissmall","OEsmall","Oslashsmall","Ugravesmall","Uacutesmall","Ucircumflexsmall","Udieresissmall","Yacutesmall","Thornsmall","Ydieresissmall"]
t.ExpertEncoding=a
var i=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclamsmall","Hungarumlautsmall","centoldstyle","dollaroldstyle","dollarsuperior","ampersandsmall","Acutesmall","parenleftsuperior","parenrightsuperior","twodotenleader","onedotenleader","comma","hyphen","period","fraction","zerooldstyle","oneoldstyle","twooldstyle","threeoldstyle","fouroldstyle","fiveoldstyle","sixoldstyle","sevenoldstyle","eightoldstyle","nineoldstyle","colon","semicolon","","threequartersemdash","","questionsmall","","","","","Ethsmall","","","onequarter","onehalf","threequarters","oneeighth","threeeighths","fiveeighths","seveneighths","onethird","twothirds","","","","","","","ff","fi","fl","ffi","ffl","parenleftinferior","","parenrightinferior","Circumflexsmall","hypheninferior","Gravesmall","Asmall","Bsmall","Csmall","Dsmall","Esmall","Fsmall","Gsmall","Hsmall","Ismall","Jsmall","Ksmall","Lsmall","Msmall","Nsmall","Osmall","Psmall","Qsmall","Rsmall","Ssmall","Tsmall","Usmall","Vsmall","Wsmall","Xsmall","Ysmall","Zsmall","colonmonetary","onefitted","rupiah","Tildesmall","","","asuperior","centsuperior","","","","","Aacutesmall","Agravesmall","Acircumflexsmall","Adieresissmall","Atildesmall","Aringsmall","Ccedillasmall","Eacutesmall","Egravesmall","Ecircumflexsmall","Edieresissmall","Iacutesmall","Igravesmall","Icircumflexsmall","Idieresissmall","Ntildesmall","Oacutesmall","Ogravesmall","Ocircumflexsmall","Odieresissmall","Otildesmall","Uacutesmall","Ugravesmall","Ucircumflexsmall","Udieresissmall","","eightsuperior","fourinferior","threeinferior","sixinferior","eightinferior","seveninferior","Scaronsmall","","centinferior","twoinferior","","Dieresissmall","","Caronsmall","osuperior","fiveinferior","","commainferior","periodinferior","Yacutesmall","","dollarinferior","","","Thornsmall","","nineinferior","zeroinferior","Zcaronsmall","AEsmall","Oslashsmall","questiondownsmall","oneinferior","Lslashsmall","","","","","","","Cedillasmall","","","","","","OEsmall","figuredash","hyphensuperior","","","","","exclamdownsmall","","Ydieresissmall","","onesuperior","twosuperior","threesuperior","foursuperior","fivesuperior","sixsuperior","sevensuperior","ninesuperior","zerosuperior","","esuperior","rsuperior","tsuperior","","","isuperior","ssuperior","dsuperior","","","","","","lsuperior","Ogoneksmall","Brevesmall","Macronsmall","bsuperior","nsuperior","msuperior","commasuperior","periodsuperior","Dotaccentsmall","Ringsmall","","","",""],n=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","Adieresis","Aring","Ccedilla","Eacute","Ntilde","Odieresis","Udieresis","aacute","agrave","acircumflex","adieresis","atilde","aring","ccedilla","eacute","egrave","ecircumflex","edieresis","iacute","igrave","icircumflex","idieresis","ntilde","oacute","ograve","ocircumflex","odieresis","otilde","uacute","ugrave","ucircumflex","udieresis","dagger","degree","cent","sterling","section","bullet","paragraph","germandbls","registered","copyright","trademark","acute","dieresis","notequal","AE","Oslash","infinity","plusminus","lessequal","greaterequal","yen","mu","partialdiff","summation","product","pi","integral","ordfeminine","ordmasculine","Omega","ae","oslash","questiondown","exclamdown","logicalnot","radical","florin","approxequal","Delta","guillemotleft","guillemotright","ellipsis","space","Agrave","Atilde","Otilde","OE","oe","endash","emdash","quotedblleft","quotedblright","quoteleft","quoteright","divide","lozenge","ydieresis","Ydieresis","fraction","currency","guilsinglleft","guilsinglright","fi","fl","daggerdbl","periodcentered","quotesinglbase","quotedblbase","perthousand","Acircumflex","Ecircumflex","Aacute","Edieresis","Egrave","Iacute","Icircumflex","Idieresis","Igrave","Oacute","Ocircumflex","apple","Ograve","Uacute","Ucircumflex","Ugrave","dotlessi","circumflex","tilde","macron","breve","dotaccent","ring","cedilla","hungarumlaut","ogonek","caron"]
t.MacRomanEncoding=n
var o=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quoteright","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","quoteleft","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","exclamdown","cent","sterling","fraction","yen","florin","section","currency","quotesingle","quotedblleft","guillemotleft","guilsinglleft","guilsinglright","fi","fl","","endash","dagger","daggerdbl","periodcentered","","paragraph","bullet","quotesinglbase","quotedblbase","quotedblright","guillemotright","ellipsis","perthousand","","questiondown","","grave","acute","circumflex","tilde","macron","breve","dotaccent","dieresis","","ring","cedilla","","hungarumlaut","ogonek","caron","emdash","","","","","","","","","","","","","","","","","AE","","ordfeminine","","","","","Lslash","Oslash","OE","ordmasculine","","","","","","ae","","","","dotlessi","","","lslash","oslash","oe","germandbls","","","",""]
t.StandardEncoding=o
var s=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","quotedbl","numbersign","dollar","percent","ampersand","quotesingle","parenleft","parenright","asterisk","plus","comma","hyphen","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","at","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","bracketleft","backslash","bracketright","asciicircum","underscore","grave","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","braceleft","bar","braceright","asciitilde","bullet","Euro","bullet","quotesinglbase","florin","quotedblbase","ellipsis","dagger","daggerdbl","circumflex","perthousand","Scaron","guilsinglleft","OE","bullet","Zcaron","bullet","bullet","quoteleft","quoteright","quotedblleft","quotedblright","bullet","endash","emdash","tilde","trademark","scaron","guilsinglright","oe","bullet","zcaron","Ydieresis","space","exclamdown","cent","sterling","currency","yen","brokenbar","section","dieresis","copyright","ordfeminine","guillemotleft","logicalnot","hyphen","registered","macron","degree","plusminus","twosuperior","threesuperior","acute","mu","paragraph","periodcentered","cedilla","onesuperior","ordmasculine","guillemotright","onequarter","onehalf","threequarters","questiondown","Agrave","Aacute","Acircumflex","Atilde","Adieresis","Aring","AE","Ccedilla","Egrave","Eacute","Ecircumflex","Edieresis","Igrave","Iacute","Icircumflex","Idieresis","Eth","Ntilde","Ograve","Oacute","Ocircumflex","Otilde","Odieresis","multiply","Oslash","Ugrave","Uacute","Ucircumflex","Udieresis","Yacute","Thorn","germandbls","agrave","aacute","acircumflex","atilde","adieresis","aring","ae","ccedilla","egrave","eacute","ecircumflex","edieresis","igrave","iacute","icircumflex","idieresis","eth","ntilde","ograve","oacute","ocircumflex","otilde","odieresis","divide","oslash","ugrave","uacute","ucircumflex","udieresis","yacute","thorn","ydieresis"]
t.WinAnsiEncoding=s
var c=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","exclam","universal","numbersign","existential","percent","ampersand","suchthat","parenleft","parenright","asteriskmath","plus","comma","minus","period","slash","zero","one","two","three","four","five","six","seven","eight","nine","colon","semicolon","less","equal","greater","question","congruent","Alpha","Beta","Chi","Delta","Epsilon","Phi","Gamma","Eta","Iota","theta1","Kappa","Lambda","Mu","Nu","Omicron","Pi","Theta","Rho","Sigma","Tau","Upsilon","sigma1","Omega","Xi","Psi","Zeta","bracketleft","therefore","bracketright","perpendicular","underscore","radicalex","alpha","beta","chi","delta","epsilon","phi","gamma","eta","iota","phi1","kappa","lambda","mu","nu","omicron","pi","theta","rho","sigma","tau","upsilon","omega1","omega","xi","psi","zeta","braceleft","bar","braceright","similar","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","Euro","Upsilon1","minute","lessequal","fraction","infinity","florin","club","diamond","heart","spade","arrowboth","arrowleft","arrowup","arrowright","arrowdown","degree","plusminus","second","greaterequal","multiply","proportional","partialdiff","bullet","divide","notequal","equivalence","approxequal","ellipsis","arrowvertex","arrowhorizex","carriagereturn","aleph","Ifraktur","Rfraktur","weierstrass","circlemultiply","circleplus","emptyset","intersection","union","propersuperset","reflexsuperset","notsubset","propersubset","reflexsubset","element","notelement","angle","gradient","registerserif","copyrightserif","trademarkserif","product","radical","dotmath","logicalnot","logicaland","logicalor","arrowdblboth","arrowdblleft","arrowdblup","arrowdblright","arrowdbldown","lozenge","angleleft","registersans","copyrightsans","trademarksans","summation","parenlefttp","parenleftex","parenleftbt","bracketlefttp","bracketleftex","bracketleftbt","bracelefttp","braceleftmid","braceleftbt","braceex","","angleright","integral","integraltp","integralex","integralbt","parenrighttp","parenrightex","parenrightbt","bracketrighttp","bracketrightex","bracketrightbt","bracerighttp","bracerightmid","bracerightbt",""]
t.SymbolSetEncoding=c
var l=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","space","a1","a2","a202","a3","a4","a5","a119","a118","a117","a11","a12","a13","a14","a15","a16","a105","a17","a18","a19","a20","a21","a22","a23","a24","a25","a26","a27","a28","a6","a7","a8","a9","a10","a29","a30","a31","a32","a33","a34","a35","a36","a37","a38","a39","a40","a41","a42","a43","a44","a45","a46","a47","a48","a49","a50","a51","a52","a53","a54","a55","a56","a57","a58","a59","a60","a61","a62","a63","a64","a65","a66","a67","a68","a69","a70","a71","a72","a73","a74","a203","a75","a204","a76","a77","a78","a79","a81","a82","a83","a84","a97","a98","a99","a100","","a89","a90","a93","a94","a91","a92","a205","a85","a206","a86","a87","a88","a95","a96","","","","","","","","","","","","","","","","","","","","a101","a102","a103","a104","a106","a107","a108","a112","a111","a110","a109","a120","a121","a122","a123","a124","a125","a126","a127","a128","a129","a130","a131","a132","a133","a134","a135","a136","a137","a138","a139","a140","a141","a142","a143","a144","a145","a146","a147","a148","a149","a150","a151","a152","a153","a154","a155","a156","a157","a158","a159","a160","a161","a163","a164","a196","a165","a192","a166","a167","a168","a169","a170","a171","a172","a173","a162","a174","a175","a176","a177","a178","a179","a193","a180","a199","a181","a200","a182","","a201","a183","a184","a197","a185","a194","a198","a186","a195","a187","a188","a189","a190","a191",""]
t.ZapfDingbatsEncoding=l},function(e,t,r){var a=r(6).getLookupTableFactory,i=a(function(e){e.A=65,e.AE=198,e.AEacute=508,e.AEmacron=482,e.AEsmall=63462,e.Aacute=193,e.Aacutesmall=63457,e.Abreve=258,e.Abreveacute=7854,e.Abrevecyrillic=1232,e.Abrevedotbelow=7862,e.Abrevegrave=7856,e.Abrevehookabove=7858,e.Abrevetilde=7860,e.Acaron=461,e.Acircle=9398,e.Acircumflex=194,e.Acircumflexacute=7844,e.Acircumflexdotbelow=7852,e.Acircumflexgrave=7846,e.Acircumflexhookabove=7848,e.Acircumflexsmall=63458,e.Acircumflextilde=7850,e.Acute=63177,e.Acutesmall=63412,e.Acyrillic=1040,e.Adblgrave=512,e.Adieresis=196,e.Adieresiscyrillic=1234,e.Adieresismacron=478
e.Adieresissmall=63460,e.Adotbelow=7840,e.Adotmacron=480,e.Agrave=192,e.Agravesmall=63456,e.Ahookabove=7842,e.Aiecyrillic=1236,e.Ainvertedbreve=514,e.Alpha=913,e.Alphatonos=902,e.Amacron=256,e.Amonospace=65313,e.Aogonek=260,e.Aring=197,e.Aringacute=506,e.Aringbelow=7680,e.Aringsmall=63461,e.Asmall=63329,e.Atilde=195,e.Atildesmall=63459,e.Aybarmenian=1329,e.B=66,e.Bcircle=9399,e.Bdotaccent=7682,e.Bdotbelow=7684,e.Becyrillic=1041,e.Benarmenian=1330,e.Beta=914,e.Bhook=385,e.Blinebelow=7686
e.Bmonospace=65314,e.Brevesmall=63220,e.Bsmall=63330,e.Btopbar=386,e.C=67,e.Caarmenian=1342,e.Cacute=262,e.Caron=63178,e.Caronsmall=63221,e.Ccaron=268,e.Ccedilla=199,e.Ccedillaacute=7688,e.Ccedillasmall=63463,e.Ccircle=9400,e.Ccircumflex=264,e.Cdot=266,e.Cdotaccent=266,e.Cedillasmall=63416,e.Chaarmenian=1353,e.Cheabkhasiancyrillic=1212,e.Checyrillic=1063,e.Chedescenderabkhasiancyrillic=1214,e.Chedescendercyrillic=1206,e.Chedieresiscyrillic=1268,e.Cheharmenian=1347,e.Chekhakassiancyrillic=1227,e.Cheverticalstrokecyrillic=1208,e.Chi=935,e.Chook=391,e.Circumflexsmall=63222
e.Cmonospace=65315,e.Coarmenian=1361,e.Csmall=63331,e.D=68,e.DZ=497,e.DZcaron=452,e.Daarmenian=1332,e.Dafrican=393,e.Dcaron=270,e.Dcedilla=7696,e.Dcircle=9401,e.Dcircumflexbelow=7698,e.Dcroat=272,e.Ddotaccent=7690,e.Ddotbelow=7692,e.Decyrillic=1044,e.Deicoptic=1006,e.Delta=8710,e.Deltagreek=916,e.Dhook=394,e.Dieresis=63179,e.DieresisAcute=63180,e.DieresisGrave=63181,e.Dieresissmall=63400,e.Digammagreek=988,e.Djecyrillic=1026,e.Dlinebelow=7694,e.Dmonospace=65316,e.Dotaccentsmall=63223,e.Dslash=272
e.Dsmall=63332,e.Dtopbar=395,e.Dz=498,e.Dzcaron=453,e.Dzeabkhasiancyrillic=1248,e.Dzecyrillic=1029,e.Dzhecyrillic=1039,e.E=69,e.Eacute=201,e.Eacutesmall=63465,e.Ebreve=276,e.Ecaron=282,e.Ecedillabreve=7708,e.Echarmenian=1333,e.Ecircle=9402,e.Ecircumflex=202,e.Ecircumflexacute=7870,e.Ecircumflexbelow=7704,e.Ecircumflexdotbelow=7878,e.Ecircumflexgrave=7872,e.Ecircumflexhookabove=7874,e.Ecircumflexsmall=63466,e.Ecircumflextilde=7876,e.Ecyrillic=1028,e.Edblgrave=516,e.Edieresis=203,e.Edieresissmall=63467,e.Edot=278,e.Edotaccent=278,e.Edotbelow=7864
e.Efcyrillic=1060,e.Egrave=200,e.Egravesmall=63464,e.Eharmenian=1335,e.Ehookabove=7866,e.Eightroman=8551,e.Einvertedbreve=518,e.Eiotifiedcyrillic=1124,e.Elcyrillic=1051,e.Elevenroman=8554,e.Emacron=274,e.Emacronacute=7702,e.Emacrongrave=7700,e.Emcyrillic=1052,e.Emonospace=65317,e.Encyrillic=1053,e.Endescendercyrillic=1186,e.Eng=330,e.Enghecyrillic=1188,e.Enhookcyrillic=1223,e.Eogonek=280,e.Eopen=400,e.Epsilon=917,e.Epsilontonos=904,e.Ercyrillic=1056,e.Ereversed=398,e.Ereversedcyrillic=1069,e.Escyrillic=1057,e.Esdescendercyrillic=1194,e.Esh=425
e.Esmall=63333,e.Eta=919,e.Etarmenian=1336,e.Etatonos=905,e.Eth=208,e.Ethsmall=63472,e.Etilde=7868,e.Etildebelow=7706,e.Euro=8364,e.Ezh=439,e.Ezhcaron=494,e.Ezhreversed=440,e.F=70,e.Fcircle=9403,e.Fdotaccent=7710,e.Feharmenian=1366,e.Feicoptic=996,e.Fhook=401,e.Fitacyrillic=1138,e.Fiveroman=8548,e.Fmonospace=65318,e.Fourroman=8547,e.Fsmall=63334,e.G=71,e.GBsquare=13191,e.Gacute=500,e.Gamma=915,e.Gammaafrican=404,e.Gangiacoptic=1002,e.Gbreve=286
e.Gcaron=486,e.Gcedilla=290,e.Gcircle=9404,e.Gcircumflex=284,e.Gcommaaccent=290,e.Gdot=288,e.Gdotaccent=288,e.Gecyrillic=1043,e.Ghadarmenian=1346,e.Ghemiddlehookcyrillic=1172,e.Ghestrokecyrillic=1170,e.Gheupturncyrillic=1168,e.Ghook=403,e.Gimarmenian=1331,e.Gjecyrillic=1027,e.Gmacron=7712,e.Gmonospace=65319,e.Grave=63182,e.Gravesmall=63328,e.Gsmall=63335,e.Gsmallhook=667,e.Gstroke=484,e.H=72,e.H18533=9679,e.H18543=9642,e.H18551=9643,e.H22073=9633,e.HPsquare=13259,e.Haabkhasiancyrillic=1192,e.Hadescendercyrillic=1202
e.Hardsigncyrillic=1066,e.Hbar=294,e.Hbrevebelow=7722,e.Hcedilla=7720,e.Hcircle=9405,e.Hcircumflex=292,e.Hdieresis=7718,e.Hdotaccent=7714,e.Hdotbelow=7716,e.Hmonospace=65320,e.Hoarmenian=1344,e.Horicoptic=1e3,e.Hsmall=63336,e.Hungarumlaut=63183,e.Hungarumlautsmall=63224,e.Hzsquare=13200,e.I=73,e.IAcyrillic=1071,e.IJ=306,e.IUcyrillic=1070,e.Iacute=205,e.Iacutesmall=63469,e.Ibreve=300,e.Icaron=463,e.Icircle=9406,e.Icircumflex=206,e.Icircumflexsmall=63470,e.Icyrillic=1030,e.Idblgrave=520,e.Idieresis=207
e.Idieresisacute=7726,e.Idieresiscyrillic=1252,e.Idieresissmall=63471,e.Idot=304,e.Idotaccent=304,e.Idotbelow=7882,e.Iebrevecyrillic=1238,e.Iecyrillic=1045,e.Ifraktur=8465,e.Igrave=204,e.Igravesmall=63468,e.Ihookabove=7880,e.Iicyrillic=1048,e.Iinvertedbreve=522,e.Iishortcyrillic=1049,e.Imacron=298,e.Imacroncyrillic=1250,e.Imonospace=65321,e.Iniarmenian=1339,e.Iocyrillic=1025,e.Iogonek=302,e.Iota=921,e.Iotaafrican=406,e.Iotadieresis=938,e.Iotatonos=906,e.Ismall=63337,e.Istroke=407,e.Itilde=296,e.Itildebelow=7724,e.Izhitsacyrillic=1140
e.Izhitsadblgravecyrillic=1142,e.J=74,e.Jaarmenian=1345,e.Jcircle=9407,e.Jcircumflex=308,e.Jecyrillic=1032,e.Jheharmenian=1355,e.Jmonospace=65322,e.Jsmall=63338,e.K=75,e.KBsquare=13189,e.KKsquare=13261,e.Kabashkircyrillic=1184,e.Kacute=7728,e.Kacyrillic=1050,e.Kadescendercyrillic=1178,e.Kahookcyrillic=1219,e.Kappa=922,e.Kastrokecyrillic=1182,e.Kaverticalstrokecyrillic=1180,e.Kcaron=488,e.Kcedilla=310,e.Kcircle=9408,e.Kcommaaccent=310,e.Kdotbelow=7730,e.Keharmenian=1364,e.Kenarmenian=1343,e.Khacyrillic=1061,e.Kheicoptic=998,e.Khook=408
e.Kjecyrillic=1036,e.Klinebelow=7732,e.Kmonospace=65323,e.Koppacyrillic=1152,e.Koppagreek=990,e.Ksicyrillic=1134,e.Ksmall=63339,e.L=76,e.LJ=455,e.LL=63167,e.Lacute=313,e.Lambda=923,e.Lcaron=317,e.Lcedilla=315,e.Lcircle=9409,e.Lcircumflexbelow=7740,e.Lcommaaccent=315,e.Ldot=319,e.Ldotaccent=319,e.Ldotbelow=7734,e.Ldotbelowmacron=7736,e.Liwnarmenian=1340,e.Lj=456,e.Ljecyrillic=1033,e.Llinebelow=7738,e.Lmonospace=65324,e.Lslash=321,e.Lslashsmall=63225,e.Lsmall=63340,e.M=77
e.MBsquare=13190,e.Macron=63184,e.Macronsmall=63407,e.Macute=7742,e.Mcircle=9410,e.Mdotaccent=7744,e.Mdotbelow=7746,e.Menarmenian=1348,e.Mmonospace=65325,e.Msmall=63341,e.Mturned=412,e.Mu=924,e.N=78,e.NJ=458,e.Nacute=323,e.Ncaron=327,e.Ncedilla=325,e.Ncircle=9411,e.Ncircumflexbelow=7754,e.Ncommaaccent=325,e.Ndotaccent=7748,e.Ndotbelow=7750,e.Nhookleft=413,e.Nineroman=8552,e.Nj=459,e.Njecyrillic=1034,e.Nlinebelow=7752,e.Nmonospace=65326,e.Nowarmenian=1350,e.Nsmall=63342
e.Ntilde=209,e.Ntildesmall=63473,e.Nu=925,e.O=79,e.OE=338,e.OEsmall=63226,e.Oacute=211,e.Oacutesmall=63475,e.Obarredcyrillic=1256,e.Obarreddieresiscyrillic=1258,e.Obreve=334,e.Ocaron=465,e.Ocenteredtilde=415,e.Ocircle=9412,e.Ocircumflex=212,e.Ocircumflexacute=7888,e.Ocircumflexdotbelow=7896,e.Ocircumflexgrave=7890,e.Ocircumflexhookabove=7892,e.Ocircumflexsmall=63476,e.Ocircumflextilde=7894,e.Ocyrillic=1054,e.Odblacute=336,e.Odblgrave=524,e.Odieresis=214,e.Odieresiscyrillic=1254,e.Odieresissmall=63478,e.Odotbelow=7884,e.Ogoneksmall=63227,e.Ograve=210
e.Ogravesmall=63474,e.Oharmenian=1365,e.Ohm=8486,e.Ohookabove=7886,e.Ohorn=416,e.Ohornacute=7898,e.Ohorndotbelow=7906,e.Ohorngrave=7900,e.Ohornhookabove=7902,e.Ohorntilde=7904,e.Ohungarumlaut=336,e.Oi=418,e.Oinvertedbreve=526,e.Omacron=332,e.Omacronacute=7762,e.Omacrongrave=7760,e.Omega=8486,e.Omegacyrillic=1120,e.Omegagreek=937,e.Omegaroundcyrillic=1146,e.Omegatitlocyrillic=1148,e.Omegatonos=911,e.Omicron=927,e.Omicrontonos=908,e.Omonospace=65327,e.Oneroman=8544,e.Oogonek=490,e.Oogonekmacron=492,e.Oopen=390,e.Oslash=216
e.Oslashacute=510,e.Oslashsmall=63480,e.Osmall=63343,e.Ostrokeacute=510,e.Otcyrillic=1150,e.Otilde=213,e.Otildeacute=7756,e.Otildedieresis=7758,e.Otildesmall=63477,e.P=80,e.Pacute=7764,e.Pcircle=9413,e.Pdotaccent=7766,e.Pecyrillic=1055,e.Peharmenian=1354,e.Pemiddlehookcyrillic=1190,e.Phi=934,e.Phook=420,e.Pi=928,e.Piwrarmenian=1363,e.Pmonospace=65328,e.Psi=936,e.Psicyrillic=1136,e.Psmall=63344,e.Q=81,e.Qcircle=9414,e.Qmonospace=65329,e.Qsmall=63345,e.R=82,e.Raarmenian=1356
e.Racute=340,e.Rcaron=344,e.Rcedilla=342,e.Rcircle=9415,e.Rcommaaccent=342,e.Rdblgrave=528,e.Rdotaccent=7768,e.Rdotbelow=7770,e.Rdotbelowmacron=7772,e.Reharmenian=1360,e.Rfraktur=8476,e.Rho=929,e.Ringsmall=63228,e.Rinvertedbreve=530,e.Rlinebelow=7774,e.Rmonospace=65330,e.Rsmall=63346,e.Rsmallinverted=641,e.Rsmallinvertedsuperior=694,e.S=83,e.SF010000=9484,e.SF020000=9492,e.SF030000=9488,e.SF040000=9496,e.SF050000=9532,e.SF060000=9516,e.SF070000=9524,e.SF080000=9500,e.SF090000=9508,e.SF100000=9472
e.SF110000=9474,e.SF190000=9569,e.SF200000=9570,e.SF210000=9558,e.SF220000=9557,e.SF230000=9571,e.SF240000=9553,e.SF250000=9559,e.SF260000=9565,e.SF270000=9564,e.SF280000=9563,e.SF360000=9566,e.SF370000=9567,e.SF380000=9562,e.SF390000=9556,e.SF400000=9577,e.SF410000=9574,e.SF420000=9568,e.SF430000=9552,e.SF440000=9580,e.SF450000=9575,e.SF460000=9576,e.SF470000=9572,e.SF480000=9573,e.SF490000=9561,e.SF500000=9560,e.SF510000=9554,e.SF520000=9555,e.SF530000=9579,e.SF540000=9578
e.Sacute=346,e.Sacutedotaccent=7780,e.Sampigreek=992,e.Scaron=352,e.Scarondotaccent=7782,e.Scaronsmall=63229,e.Scedilla=350,e.Schwa=399,e.Schwacyrillic=1240,e.Schwadieresiscyrillic=1242,e.Scircle=9416,e.Scircumflex=348,e.Scommaaccent=536,e.Sdotaccent=7776,e.Sdotbelow=7778,e.Sdotbelowdotaccent=7784,e.Seharmenian=1357,e.Sevenroman=8550,e.Shaarmenian=1351,e.Shacyrillic=1064,e.Shchacyrillic=1065,e.Sheicoptic=994,e.Shhacyrillic=1210,e.Shimacoptic=1004,e.Sigma=931,e.Sixroman=8549,e.Smonospace=65331,e.Softsigncyrillic=1068,e.Ssmall=63347,e.Stigmagreek=986
e.T=84,e.Tau=932,e.Tbar=358,e.Tcaron=356,e.Tcedilla=354,e.Tcircle=9417,e.Tcircumflexbelow=7792,e.Tcommaaccent=354,e.Tdotaccent=7786,e.Tdotbelow=7788,e.Tecyrillic=1058,e.Tedescendercyrillic=1196,e.Tenroman=8553,e.Tetsecyrillic=1204,e.Theta=920,e.Thook=428,e.Thorn=222,e.Thornsmall=63486,e.Threeroman=8546,e.Tildesmall=63230,e.Tiwnarmenian=1359,e.Tlinebelow=7790,e.Tmonospace=65332,e.Toarmenian=1337,e.Tonefive=444,e.Tonesix=388,e.Tonetwo=423,e.Tretroflexhook=430,e.Tsecyrillic=1062,e.Tshecyrillic=1035
e.Tsmall=63348,e.Twelveroman=8555,e.Tworoman=8545,e.U=85,e.Uacute=218,e.Uacutesmall=63482,e.Ubreve=364,e.Ucaron=467,e.Ucircle=9418,e.Ucircumflex=219,e.Ucircumflexbelow=7798,e.Ucircumflexsmall=63483,e.Ucyrillic=1059,e.Udblacute=368,e.Udblgrave=532,e.Udieresis=220,e.Udieresisacute=471,e.Udieresisbelow=7794,e.Udieresiscaron=473,e.Udieresiscyrillic=1264,e.Udieresisgrave=475,e.Udieresismacron=469,e.Udieresissmall=63484,e.Udotbelow=7908,e.Ugrave=217,e.Ugravesmall=63481,e.Uhookabove=7910,e.Uhorn=431,e.Uhornacute=7912,e.Uhorndotbelow=7920
e.Uhorngrave=7914,e.Uhornhookabove=7916,e.Uhorntilde=7918,e.Uhungarumlaut=368,e.Uhungarumlautcyrillic=1266,e.Uinvertedbreve=534,e.Ukcyrillic=1144,e.Umacron=362,e.Umacroncyrillic=1262,e.Umacrondieresis=7802,e.Umonospace=65333,e.Uogonek=370,e.Upsilon=933,e.Upsilon1=978,e.Upsilonacutehooksymbolgreek=979,e.Upsilonafrican=433,e.Upsilondieresis=939,e.Upsilondieresishooksymbolgreek=980,e.Upsilonhooksymbol=978,e.Upsilontonos=910,e.Uring=366,e.Ushortcyrillic=1038,e.Usmall=63349,e.Ustraightcyrillic=1198,e.Ustraightstrokecyrillic=1200,e.Utilde=360,e.Utildeacute=7800,e.Utildebelow=7796,e.V=86,e.Vcircle=9419
e.Vdotbelow=7806,e.Vecyrillic=1042,e.Vewarmenian=1358,e.Vhook=434,e.Vmonospace=65334,e.Voarmenian=1352,e.Vsmall=63350,e.Vtilde=7804,e.W=87,e.Wacute=7810,e.Wcircle=9420,e.Wcircumflex=372,e.Wdieresis=7812,e.Wdotaccent=7814,e.Wdotbelow=7816,e.Wgrave=7808,e.Wmonospace=65335,e.Wsmall=63351,e.X=88,e.Xcircle=9421,e.Xdieresis=7820,e.Xdotaccent=7818,e.Xeharmenian=1341,e.Xi=926,e.Xmonospace=65336,e.Xsmall=63352,e.Y=89,e.Yacute=221,e.Yacutesmall=63485,e.Yatcyrillic=1122
e.Ycircle=9422,e.Ycircumflex=374,e.Ydieresis=376,e.Ydieresissmall=63487,e.Ydotaccent=7822,e.Ydotbelow=7924,e.Yericyrillic=1067,e.Yerudieresiscyrillic=1272,e.Ygrave=7922,e.Yhook=435,e.Yhookabove=7926,e.Yiarmenian=1349,e.Yicyrillic=1031,e.Yiwnarmenian=1362,e.Ymonospace=65337,e.Ysmall=63353,e.Ytilde=7928,e.Yusbigcyrillic=1130,e.Yusbigiotifiedcyrillic=1132,e.Yuslittlecyrillic=1126,e.Yuslittleiotifiedcyrillic=1128,e.Z=90,e.Zaarmenian=1334,e.Zacute=377,e.Zcaron=381,e.Zcaronsmall=63231,e.Zcircle=9423,e.Zcircumflex=7824,e.Zdot=379,e.Zdotaccent=379
e.Zdotbelow=7826,e.Zecyrillic=1047,e.Zedescendercyrillic=1176,e.Zedieresiscyrillic=1246,e.Zeta=918,e.Zhearmenian=1338,e.Zhebrevecyrillic=1217,e.Zhecyrillic=1046,e.Zhedescendercyrillic=1174,e.Zhedieresiscyrillic=1244,e.Zlinebelow=7828,e.Zmonospace=65338,e.Zsmall=63354,e.Zstroke=437,e.a=97,e.aabengali=2438,e.aacute=225,e.aadeva=2310,e.aagujarati=2694,e.aagurmukhi=2566,e.aamatragurmukhi=2622,e.aarusquare=13059,e.aavowelsignbengali=2494,e.aavowelsigndeva=2366,e.aavowelsigngujarati=2750,e.abbreviationmarkarmenian=1375,e.abbreviationsigndeva=2416,e.abengali=2437,e.abopomofo=12570,e.abreve=259
e.abreveacute=7855,e.abrevecyrillic=1233,e.abrevedotbelow=7863,e.abrevegrave=7857,e.abrevehookabove=7859,e.abrevetilde=7861,e.acaron=462,e.acircle=9424,e.acircumflex=226,e.acircumflexacute=7845,e.acircumflexdotbelow=7853,e.acircumflexgrave=7847,e.acircumflexhookabove=7849,e.acircumflextilde=7851,e.acute=180,e.acutebelowcmb=791,e.acutecmb=769,e.acutecomb=769,e.acutedeva=2388,e.acutelowmod=719,e.acutetonecmb=833,e.acyrillic=1072,e.adblgrave=513,e.addakgurmukhi=2673,e.adeva=2309,e.adieresis=228,e.adieresiscyrillic=1235,e.adieresismacron=479,e.adotbelow=7841,e.adotmacron=481
e.ae=230,e.aeacute=509,e.aekorean=12624,e.aemacron=483,e.afii00208=8213,e.afii08941=8356,e.afii10017=1040,e.afii10018=1041,e.afii10019=1042,e.afii10020=1043,e.afii10021=1044,e.afii10022=1045,e.afii10023=1025,e.afii10024=1046,e.afii10025=1047,e.afii10026=1048,e.afii10027=1049,e.afii10028=1050,e.afii10029=1051,e.afii10030=1052,e.afii10031=1053,e.afii10032=1054,e.afii10033=1055,e.afii10034=1056,e.afii10035=1057,e.afii10036=1058,e.afii10037=1059,e.afii10038=1060,e.afii10039=1061,e.afii10040=1062
e.afii10041=1063,e.afii10042=1064,e.afii10043=1065,e.afii10044=1066,e.afii10045=1067,e.afii10046=1068,e.afii10047=1069,e.afii10048=1070,e.afii10049=1071,e.afii10050=1168,e.afii10051=1026,e.afii10052=1027,e.afii10053=1028,e.afii10054=1029,e.afii10055=1030,e.afii10056=1031,e.afii10057=1032,e.afii10058=1033,e.afii10059=1034,e.afii10060=1035,e.afii10061=1036,e.afii10062=1038,e.afii10063=63172,e.afii10064=63173,e.afii10065=1072,e.afii10066=1073,e.afii10067=1074,e.afii10068=1075,e.afii10069=1076,e.afii10070=1077
e.afii10071=1105,e.afii10072=1078,e.afii10073=1079,e.afii10074=1080,e.afii10075=1081,e.afii10076=1082,e.afii10077=1083,e.afii10078=1084,e.afii10079=1085,e.afii10080=1086,e.afii10081=1087,e.afii10082=1088,e.afii10083=1089,e.afii10084=1090,e.afii10085=1091,e.afii10086=1092,e.afii10087=1093,e.afii10088=1094,e.afii10089=1095,e.afii10090=1096,e.afii10091=1097,e.afii10092=1098,e.afii10093=1099,e.afii10094=1100,e.afii10095=1101,e.afii10096=1102,e.afii10097=1103,e.afii10098=1169,e.afii10099=1106,e.afii10100=1107
e.afii10101=1108,e.afii10102=1109,e.afii10103=1110,e.afii10104=1111,e.afii10105=1112,e.afii10106=1113,e.afii10107=1114,e.afii10108=1115,e.afii10109=1116,e.afii10110=1118,e.afii10145=1039,e.afii10146=1122,e.afii10147=1138,e.afii10148=1140,e.afii10192=63174,e.afii10193=1119,e.afii10194=1123,e.afii10195=1139,e.afii10196=1141,e.afii10831=63175,e.afii10832=63176,e.afii10846=1241,e.afii299=8206,e.afii300=8207,e.afii301=8205,e.afii57381=1642,e.afii57388=1548,e.afii57392=1632,e.afii57393=1633,e.afii57394=1634
e.afii57395=1635,e.afii57396=1636,e.afii57397=1637,e.afii57398=1638,e.afii57399=1639,e.afii57400=1640,e.afii57401=1641,e.afii57403=1563,e.afii57407=1567,e.afii57409=1569,e.afii57410=1570,e.afii57411=1571,e.afii57412=1572,e.afii57413=1573,e.afii57414=1574,e.afii57415=1575,e.afii57416=1576,e.afii57417=1577,e.afii57418=1578,e.afii57419=1579,e.afii57420=1580,e.afii57421=1581,e.afii57422=1582,e.afii57423=1583,e.afii57424=1584,e.afii57425=1585,e.afii57426=1586,e.afii57427=1587,e.afii57428=1588,e.afii57429=1589
e.afii57430=1590,e.afii57431=1591,e.afii57432=1592,e.afii57433=1593,e.afii57434=1594,e.afii57440=1600,e.afii57441=1601,e.afii57442=1602,e.afii57443=1603,e.afii57444=1604,e.afii57445=1605,e.afii57446=1606,e.afii57448=1608,e.afii57449=1609,e.afii57450=1610,e.afii57451=1611,e.afii57452=1612,e.afii57453=1613,e.afii57454=1614,e.afii57455=1615,e.afii57456=1616,e.afii57457=1617,e.afii57458=1618,e.afii57470=1607,e.afii57505=1700,e.afii57506=1662,e.afii57507=1670,e.afii57508=1688,e.afii57509=1711,e.afii57511=1657
e.afii57512=1672,e.afii57513=1681,e.afii57514=1722,e.afii57519=1746,e.afii57534=1749,e.afii57636=8362,e.afii57645=1470,e.afii57658=1475,e.afii57664=1488,e.afii57665=1489,e.afii57666=1490,e.afii57667=1491,e.afii57668=1492,e.afii57669=1493,e.afii57670=1494,e.afii57671=1495,e.afii57672=1496,e.afii57673=1497,e.afii57674=1498,e.afii57675=1499,e.afii57676=1500,e.afii57677=1501,e.afii57678=1502,e.afii57679=1503,e.afii57680=1504,e.afii57681=1505,e.afii57682=1506,e.afii57683=1507,e.afii57684=1508,e.afii57685=1509
e.afii57686=1510,e.afii57687=1511,e.afii57688=1512,e.afii57689=1513,e.afii57690=1514,e.afii57694=64298,e.afii57695=64299,e.afii57700=64331,e.afii57705=64287,e.afii57716=1520,e.afii57717=1521,e.afii57718=1522,e.afii57723=64309,e.afii57793=1460,e.afii57794=1461,e.afii57795=1462,e.afii57796=1467,e.afii57797=1464,e.afii57798=1463,e.afii57799=1456,e.afii57800=1458,e.afii57801=1457,e.afii57802=1459,e.afii57803=1474,e.afii57804=1473,e.afii57806=1465,e.afii57807=1468,e.afii57839=1469,e.afii57841=1471,e.afii57842=1472
e.afii57929=700,e.afii61248=8453,e.afii61289=8467,e.afii61352=8470,e.afii61573=8236,e.afii61574=8237,e.afii61575=8238,e.afii61664=8204,e.afii63167=1645,e.afii64937=701,e.agrave=224,e.agujarati=2693,e.agurmukhi=2565,e.ahiragana=12354,e.ahookabove=7843,e.aibengali=2448,e.aibopomofo=12574,e.aideva=2320,e.aiecyrillic=1237,e.aigujarati=2704,e.aigurmukhi=2576,e.aimatragurmukhi=2632,e.ainarabic=1593,e.ainfinalarabic=65226,e.aininitialarabic=65227,e.ainmedialarabic=65228,e.ainvertedbreve=515,e.aivowelsignbengali=2504,e.aivowelsigndeva=2376,e.aivowelsigngujarati=2760
e.akatakana=12450,e.akatakanahalfwidth=65393,e.akorean=12623,e.alef=1488,e.alefarabic=1575,e.alefdageshhebrew=64304,e.aleffinalarabic=65166,e.alefhamzaabovearabic=1571,e.alefhamzaabovefinalarabic=65156,e.alefhamzabelowarabic=1573,e.alefhamzabelowfinalarabic=65160,e.alefhebrew=1488,e.aleflamedhebrew=64335,e.alefmaddaabovearabic=1570,e.alefmaddaabovefinalarabic=65154,e.alefmaksuraarabic=1609,e.alefmaksurafinalarabic=65264,e.alefmaksurainitialarabic=65267,e.alefmaksuramedialarabic=65268,e.alefpatahhebrew=64302,e.alefqamatshebrew=64303,e.aleph=8501,e.allequal=8780,e.alpha=945,e.alphatonos=940,e.amacron=257,e.amonospace=65345,e.ampersand=38,e.ampersandmonospace=65286,e.ampersandsmall=63270
e.amsquare=13250,e.anbopomofo=12578,e.angbopomofo=12580,e.angbracketleft=12296,e.angbracketright=12297,e.angkhankhuthai=3674,e.angle=8736,e.anglebracketleft=12296,e.anglebracketleftvertical=65087,e.anglebracketright=12297,e.anglebracketrightvertical=65088,e.angleleft=9001,e.angleright=9002,e.angstrom=8491,e.anoteleia=903,e.anudattadeva=2386,e.anusvarabengali=2434,e.anusvaradeva=2306,e.anusvaragujarati=2690,e.aogonek=261,e.apaatosquare=13056,e.aparen=9372,e.apostrophearmenian=1370,e.apostrophemod=700,e.apple=63743,e.approaches=8784,e.approxequal=8776,e.approxequalorimage=8786,e.approximatelyequal=8773,e.araeaekorean=12686
e.araeakorean=12685,e.arc=8978,e.arighthalfring=7834,e.aring=229,e.aringacute=507,e.aringbelow=7681,e.arrowboth=8596,e.arrowdashdown=8675,e.arrowdashleft=8672,e.arrowdashright=8674,e.arrowdashup=8673,e.arrowdblboth=8660,e.arrowdbldown=8659,e.arrowdblleft=8656,e.arrowdblright=8658,e.arrowdblup=8657,e.arrowdown=8595,e.arrowdownleft=8601,e.arrowdownright=8600,e.arrowdownwhite=8681,e.arrowheaddownmod=709,e.arrowheadleftmod=706,e.arrowheadrightmod=707,e.arrowheadupmod=708,e.arrowhorizex=63719,e.arrowleft=8592,e.arrowleftdbl=8656,e.arrowleftdblstroke=8653,e.arrowleftoverright=8646,e.arrowleftwhite=8678
e.arrowright=8594,e.arrowrightdblstroke=8655,e.arrowrightheavy=10142,e.arrowrightoverleft=8644,e.arrowrightwhite=8680,e.arrowtableft=8676,e.arrowtabright=8677,e.arrowup=8593,e.arrowupdn=8597,e.arrowupdnbse=8616,e.arrowupdownbase=8616,e.arrowupleft=8598,e.arrowupleftofdown=8645,e.arrowupright=8599,e.arrowupwhite=8679,e.arrowvertex=63718,e.asciicircum=94,e.asciicircummonospace=65342,e.asciitilde=126,e.asciitildemonospace=65374,e.ascript=593,e.ascriptturned=594,e.asmallhiragana=12353,e.asmallkatakana=12449,e.asmallkatakanahalfwidth=65383,e.asterisk=42,e.asteriskaltonearabic=1645,e.asteriskarabic=1645,e.asteriskmath=8727,e.asteriskmonospace=65290
e.asterisksmall=65121,e.asterism=8258,e.asuperior=63209,e.asymptoticallyequal=8771,e.at=64,e.atilde=227,e.atmonospace=65312,e.atsmall=65131,e.aturned=592,e.aubengali=2452,e.aubopomofo=12576,e.audeva=2324,e.augujarati=2708,e.augurmukhi=2580,e.aulengthmarkbengali=2519,e.aumatragurmukhi=2636,e.auvowelsignbengali=2508,e.auvowelsigndeva=2380,e.auvowelsigngujarati=2764,e.avagrahadeva=2365,e.aybarmenian=1377,e.ayin=1506,e.ayinaltonehebrew=64288,e.ayinhebrew=1506,e.b=98,e.babengali=2476,e.backslash=92,e.backslashmonospace=65340,e.badeva=2348,e.bagujarati=2732
e.bagurmukhi=2604,e.bahiragana=12400,e.bahtthai=3647,e.bakatakana=12496,e.bar=124,e.barmonospace=65372,e.bbopomofo=12549,e.bcircle=9425,e.bdotaccent=7683,e.bdotbelow=7685,e.beamedsixteenthnotes=9836,e.because=8757,e.becyrillic=1073,e.beharabic=1576,e.behfinalarabic=65168,e.behinitialarabic=65169,e.behiragana=12409,e.behmedialarabic=65170,e.behmeeminitialarabic=64671,e.behmeemisolatedarabic=64520,e.behnoonfinalarabic=64621,e.bekatakana=12505,e.benarmenian=1378,e.bet=1489,e.beta=946,e.betasymbolgreek=976,e.betdagesh=64305,e.betdageshhebrew=64305,e.bethebrew=1489,e.betrafehebrew=64332
e.bhabengali=2477,e.bhadeva=2349,e.bhagujarati=2733,e.bhagurmukhi=2605,e.bhook=595,e.bihiragana=12403,e.bikatakana=12499,e.bilabialclick=664,e.bindigurmukhi=2562,e.birusquare=13105,e.blackcircle=9679,e.blackdiamond=9670,e.blackdownpointingtriangle=9660,e.blackleftpointingpointer=9668,e.blackleftpointingtriangle=9664,e.blacklenticularbracketleft=12304,e.blacklenticularbracketleftvertical=65083,e.blacklenticularbracketright=12305,e.blacklenticularbracketrightvertical=65084,e.blacklowerlefttriangle=9699,e.blacklowerrighttriangle=9698,e.blackrectangle=9644,e.blackrightpointingpointer=9658,e.blackrightpointingtriangle=9654,e.blacksmallsquare=9642,e.blacksmilingface=9787,e.blacksquare=9632,e.blackstar=9733,e.blackupperlefttriangle=9700,e.blackupperrighttriangle=9701
e.blackuppointingsmalltriangle=9652,e.blackuppointingtriangle=9650,e.blank=9251,e.blinebelow=7687,e.block=9608,e.bmonospace=65346,e.bobaimaithai=3610,e.bohiragana=12412,e.bokatakana=12508,e.bparen=9373,e.bqsquare=13251,e.braceex=63732,e.braceleft=123,e.braceleftbt=63731,e.braceleftmid=63730,e.braceleftmonospace=65371,e.braceleftsmall=65115,e.bracelefttp=63729,e.braceleftvertical=65079,e.braceright=125,e.bracerightbt=63742,e.bracerightmid=63741,e.bracerightmonospace=65373,e.bracerightsmall=65116,e.bracerighttp=63740,e.bracerightvertical=65080,e.bracketleft=91,e.bracketleftbt=63728,e.bracketleftex=63727,e.bracketleftmonospace=65339
e.bracketlefttp=63726,e.bracketright=93,e.bracketrightbt=63739,e.bracketrightex=63738,e.bracketrightmonospace=65341,e.bracketrighttp=63737,e.breve=728,e.brevebelowcmb=814,e.brevecmb=774,e.breveinvertedbelowcmb=815,e.breveinvertedcmb=785,e.breveinverteddoublecmb=865,e.bridgebelowcmb=810,e.bridgeinvertedbelowcmb=826,e.brokenbar=166,e.bstroke=384,e.bsuperior=63210,e.btopbar=387,e.buhiragana=12406,e.bukatakana=12502,e.bullet=8226,e.bulletinverse=9688,e.bulletoperator=8729,e.bullseye=9678,e.c=99,e.caarmenian=1390,e.cabengali=2458,e.cacute=263,e.cadeva=2330,e.cagujarati=2714
e.cagurmukhi=2586,e.calsquare=13192,e.candrabindubengali=2433,e.candrabinducmb=784,e.candrabindudeva=2305,e.candrabindugujarati=2689,e.capslock=8682,e.careof=8453,e.caron=711,e.caronbelowcmb=812,e.caroncmb=780,e.carriagereturn=8629,e.cbopomofo=12568,e.ccaron=269,e.ccedilla=231,e.ccedillaacute=7689,e.ccircle=9426,e.ccircumflex=265,e.ccurl=597,e.cdot=267,e.cdotaccent=267,e.cdsquare=13253,e.cedilla=184,e.cedillacmb=807,e.cent=162,e.centigrade=8451,e.centinferior=63199,e.centmonospace=65504,e.centoldstyle=63394,e.centsuperior=63200
e.chaarmenian=1401,e.chabengali=2459,e.chadeva=2331,e.chagujarati=2715,e.chagurmukhi=2587,e.chbopomofo=12564,e.cheabkhasiancyrillic=1213,e.checkmark=10003,e.checyrillic=1095,e.chedescenderabkhasiancyrillic=1215,e.chedescendercyrillic=1207,e.chedieresiscyrillic=1269,e.cheharmenian=1395,e.chekhakassiancyrillic=1228,e.cheverticalstrokecyrillic=1209,e.chi=967,e.chieuchacirclekorean=12919,e.chieuchaparenkorean=12823,e.chieuchcirclekorean=12905,e.chieuchkorean=12618,e.chieuchparenkorean=12809,e.chochangthai=3594,e.chochanthai=3592,e.chochingthai=3593,e.chochoethai=3596,e.chook=392,e.cieucacirclekorean=12918,e.cieucaparenkorean=12822,e.cieuccirclekorean=12904,e.cieuckorean=12616
e.cieucparenkorean=12808,e.cieucuparenkorean=12828,e.circle=9675,e.circlecopyrt=169,e.circlemultiply=8855,e.circleot=8857,e.circleplus=8853,e.circlepostalmark=12342,e.circlewithlefthalfblack=9680,e.circlewithrighthalfblack=9681,e.circumflex=710,e.circumflexbelowcmb=813,e.circumflexcmb=770,e.clear=8999,e.clickalveolar=450,e.clickdental=448,e.clicklateral=449,e.clickretroflex=451,e.club=9827,e.clubsuitblack=9827,e.clubsuitwhite=9831,e.cmcubedsquare=13220,e.cmonospace=65347,e.cmsquaredsquare=13216,e.coarmenian=1409,e.colon=58,e.colonmonetary=8353,e.colonmonospace=65306,e.colonsign=8353,e.colonsmall=65109
e.colontriangularhalfmod=721,e.colontriangularmod=720,e.comma=44,e.commaabovecmb=787,e.commaaboverightcmb=789,e.commaaccent=63171,e.commaarabic=1548,e.commaarmenian=1373,e.commainferior=63201,e.commamonospace=65292,e.commareversedabovecmb=788,e.commareversedmod=701,e.commasmall=65104,e.commasuperior=63202,e.commaturnedabovecmb=786,e.commaturnedmod=699,e.compass=9788,e.congruent=8773,e.contourintegral=8750,e.control=8963,e.controlACK=6,e.controlBEL=7,e.controlBS=8,e.controlCAN=24,e.controlCR=13,e.controlDC1=17,e.controlDC2=18,e.controlDC3=19,e.controlDC4=20,e.controlDEL=127
e.controlDLE=16,e.controlEM=25,e.controlENQ=5,e.controlEOT=4,e.controlESC=27,e.controlETB=23,e.controlETX=3,e.controlFF=12,e.controlFS=28,e.controlGS=29,e.controlHT=9,e.controlLF=10,e.controlNAK=21,e.controlNULL=0,e.controlRS=30,e.controlSI=15,e.controlSO=14,e.controlSOT=2,e.controlSTX=1,e.controlSUB=26,e.controlSYN=22,e.controlUS=31,e.controlVT=11,e.copyright=169,e.copyrightsans=63721,e.copyrightserif=63193,e.cornerbracketleft=12300,e.cornerbracketlefthalfwidth=65378,e.cornerbracketleftvertical=65089,e.cornerbracketright=12301
e.cornerbracketrighthalfwidth=65379,e.cornerbracketrightvertical=65090,e.corporationsquare=13183,e.cosquare=13255,e.coverkgsquare=13254,e.cparen=9374,e.cruzeiro=8354,e.cstretched=663,e.curlyand=8911,e.curlyor=8910,e.currency=164,e.cyrBreve=63185,e.cyrFlex=63186,e.cyrbreve=63188,e.cyrflex=63189,e.d=100,e.daarmenian=1380,e.dabengali=2470,e.dadarabic=1590,e.dadeva=2342,e.dadfinalarabic=65214,e.dadinitialarabic=65215,e.dadmedialarabic=65216,e.dagesh=1468,e.dageshhebrew=1468,e.dagger=8224,e.daggerdbl=8225,e.dagujarati=2726,e.dagurmukhi=2598,e.dahiragana=12384
e.dakatakana=12480,e.dalarabic=1583,e.dalet=1491,e.daletdagesh=64307,e.daletdageshhebrew=64307,e.dalethebrew=1491,e.dalfinalarabic=65194,e.dammaarabic=1615,e.dammalowarabic=1615,e.dammatanaltonearabic=1612,e.dammatanarabic=1612,e.danda=2404,e.dargahebrew=1447,e.dargalefthebrew=1447,e.dasiapneumatacyrilliccmb=1157,e.dblGrave=63187,e.dblanglebracketleft=12298,e.dblanglebracketleftvertical=65085,e.dblanglebracketright=12299,e.dblanglebracketrightvertical=65086,e.dblarchinvertedbelowcmb=811,e.dblarrowleft=8660,e.dblarrowright=8658,e.dbldanda=2405,e.dblgrave=63190,e.dblgravecmb=783,e.dblintegral=8748,e.dbllowline=8215,e.dbllowlinecmb=819,e.dbloverlinecmb=831
e.dblprimemod=698,e.dblverticalbar=8214,e.dblverticallineabovecmb=782,e.dbopomofo=12553,e.dbsquare=13256,e.dcaron=271,e.dcedilla=7697,e.dcircle=9427,e.dcircumflexbelow=7699,e.dcroat=273,e.ddabengali=2465,e.ddadeva=2337,e.ddagujarati=2721,e.ddagurmukhi=2593,e.ddalarabic=1672,e.ddalfinalarabic=64393,e.dddhadeva=2396,e.ddhabengali=2466,e.ddhadeva=2338,e.ddhagujarati=2722,e.ddhagurmukhi=2594,e.ddotaccent=7691,e.ddotbelow=7693,e.decimalseparatorarabic=1643,e.decimalseparatorpersian=1643,e.decyrillic=1076,e.degree=176,e.dehihebrew=1453,e.dehiragana=12391,e.deicoptic=1007
e.dekatakana=12487,e.deleteleft=9003,e.deleteright=8998,e.delta=948,e.deltaturned=397,e.denominatorminusonenumeratorbengali=2552,e.dezh=676,e.dhabengali=2471,e.dhadeva=2343,e.dhagujarati=2727,e.dhagurmukhi=2599,e.dhook=599,e.dialytikatonos=901,e.dialytikatonoscmb=836,e.diamond=9830,e.diamondsuitwhite=9826,e.dieresis=168,e.dieresisacute=63191,e.dieresisbelowcmb=804,e.dieresiscmb=776,e.dieresisgrave=63192,e.dieresistonos=901,e.dihiragana=12386,e.dikatakana=12482,e.dittomark=12291,e.divide=247,e.divides=8739,e.divisionslash=8725,e.djecyrillic=1106,e.dkshade=9619
e.dlinebelow=7695,e.dlsquare=13207,e.dmacron=273,e.dmonospace=65348,e.dnblock=9604,e.dochadathai=3598,e.dodekthai=3604,e.dohiragana=12393,e.dokatakana=12489,e.dollar=36,e.dollarinferior=63203,e.dollarmonospace=65284,e.dollaroldstyle=63268,e.dollarsmall=65129,e.dollarsuperior=63204,e.dong=8363,e.dorusquare=13094,e.dotaccent=729,e.dotaccentcmb=775,e.dotbelowcmb=803,e.dotbelowcomb=803,e.dotkatakana=12539,e.dotlessi=305,e.dotlessj=63166,e.dotlessjstrokehook=644,e.dotmath=8901,e.dottedcircle=9676,e.doubleyodpatah=64287,e.doubleyodpatahhebrew=64287,e.downtackbelowcmb=798
e.downtackmod=725,e.dparen=9375,e.dsuperior=63211,e.dtail=598,e.dtopbar=396,e.duhiragana=12389,e.dukatakana=12485,e.dz=499,e.dzaltone=675,e.dzcaron=454,e.dzcurl=677,e.dzeabkhasiancyrillic=1249,e.dzecyrillic=1109,e.dzhecyrillic=1119,e.e=101,e.eacute=233,e.earth=9793,e.ebengali=2447,e.ebopomofo=12572,e.ebreve=277,e.ecandradeva=2317,e.ecandragujarati=2701,e.ecandravowelsigndeva=2373,e.ecandravowelsigngujarati=2757,e.ecaron=283,e.ecedillabreve=7709,e.echarmenian=1381,e.echyiwnarmenian=1415,e.ecircle=9428,e.ecircumflex=234
e.ecircumflexacute=7871,e.ecircumflexbelow=7705,e.ecircumflexdotbelow=7879,e.ecircumflexgrave=7873,e.ecircumflexhookabove=7875,e.ecircumflextilde=7877,e.ecyrillic=1108,e.edblgrave=517,e.edeva=2319,e.edieresis=235,e.edot=279,e.edotaccent=279,e.edotbelow=7865,e.eegurmukhi=2575,e.eematragurmukhi=2631,e.efcyrillic=1092,e.egrave=232,e.egujarati=2703,e.eharmenian=1383,e.ehbopomofo=12573,e.ehiragana=12360,e.ehookabove=7867,e.eibopomofo=12575,e.eight=56,e.eightarabic=1640,e.eightbengali=2542,e.eightcircle=9319,e.eightcircleinversesansserif=10129,e.eightdeva=2414,e.eighteencircle=9329
e.eighteenparen=9349,e.eighteenperiod=9369,e.eightgujarati=2798,e.eightgurmukhi=2670,e.eighthackarabic=1640,e.eighthangzhou=12328,e.eighthnotebeamed=9835,e.eightideographicparen=12839,e.eightinferior=8328,e.eightmonospace=65304,e.eightoldstyle=63288,e.eightparen=9339,e.eightperiod=9359,e.eightpersian=1784,e.eightroman=8567,e.eightsuperior=8312,e.eightthai=3672,e.einvertedbreve=519,e.eiotifiedcyrillic=1125,e.ekatakana=12456,e.ekatakanahalfwidth=65396,e.ekonkargurmukhi=2676,e.ekorean=12628,e.elcyrillic=1083,e.element=8712,e.elevencircle=9322,e.elevenparen=9342,e.elevenperiod=9362,e.elevenroman=8570,e.ellipsis=8230
e.ellipsisvertical=8942,e.emacron=275,e.emacronacute=7703,e.emacrongrave=7701,e.emcyrillic=1084,e.emdash=8212,e.emdashvertical=65073,e.emonospace=65349,e.emphasismarkarmenian=1371,e.emptyset=8709,e.enbopomofo=12579,e.encyrillic=1085,e.endash=8211,e.endashvertical=65074,e.endescendercyrillic=1187,e.eng=331,e.engbopomofo=12581,e.enghecyrillic=1189,e.enhookcyrillic=1224,e.enspace=8194,e.eogonek=281,e.eokorean=12627,e.eopen=603,e.eopenclosed=666,e.eopenreversed=604,e.eopenreversedclosed=606,e.eopenreversedhook=605,e.eparen=9376,e.epsilon=949,e.epsilontonos=941
e.equal=61,e.equalmonospace=65309,e.equalsmall=65126,e.equalsuperior=8316,e.equivalence=8801,e.erbopomofo=12582,e.ercyrillic=1088,e.ereversed=600,e.ereversedcyrillic=1101,e.escyrillic=1089,e.esdescendercyrillic=1195,e.esh=643,e.eshcurl=646,e.eshortdeva=2318,e.eshortvowelsigndeva=2374,e.eshreversedloop=426,e.eshsquatreversed=645,e.esmallhiragana=12359,e.esmallkatakana=12455,e.esmallkatakanahalfwidth=65386,e.estimated=8494,e.esuperior=63212,e.eta=951,e.etarmenian=1384,e.etatonos=942,e.eth=240,e.etilde=7869,e.etildebelow=7707,e.etnahtafoukhhebrew=1425,e.etnahtafoukhlefthebrew=1425
e.etnahtahebrew=1425,e.etnahtalefthebrew=1425,e.eturned=477,e.eukorean=12641,e.euro=8364,e.evowelsignbengali=2503,e.evowelsigndeva=2375,e.evowelsigngujarati=2759,e.exclam=33,e.exclamarmenian=1372,e.exclamdbl=8252,e.exclamdown=161,e.exclamdownsmall=63393,e.exclammonospace=65281,e.exclamsmall=63265,e.existential=8707,e.ezh=658,e.ezhcaron=495,e.ezhcurl=659,e.ezhreversed=441,e.ezhtail=442,e.f=102,e.fadeva=2398,e.fagurmukhi=2654,e.fahrenheit=8457,e.fathaarabic=1614,e.fathalowarabic=1614,e.fathatanarabic=1611,e.fbopomofo=12552,e.fcircle=9429
e.fdotaccent=7711,e.feharabic=1601,e.feharmenian=1414,e.fehfinalarabic=65234,e.fehinitialarabic=65235,e.fehmedialarabic=65236,e.feicoptic=997,e.female=9792,e.ff=64256,e.ffi=64259,e.ffl=64260,e.fi=64257,e.fifteencircle=9326,e.fifteenparen=9346,e.fifteenperiod=9366,e.figuredash=8210,e.filledbox=9632,e.filledrect=9644,e.finalkaf=1498,e.finalkafdagesh=64314,e.finalkafdageshhebrew=64314,e.finalkafhebrew=1498,e.finalmem=1501,e.finalmemhebrew=1501,e.finalnun=1503,e.finalnunhebrew=1503,e.finalpe=1507,e.finalpehebrew=1507,e.finaltsadi=1509,e.finaltsadihebrew=1509
e.firsttonechinese=713,e.fisheye=9673,e.fitacyrillic=1139,e.five=53,e.fivearabic=1637,e.fivebengali=2539,e.fivecircle=9316,e.fivecircleinversesansserif=10126,e.fivedeva=2411,e.fiveeighths=8541,e.fivegujarati=2795,e.fivegurmukhi=2667,e.fivehackarabic=1637,e.fivehangzhou=12325,e.fiveideographicparen=12836,e.fiveinferior=8325,e.fivemonospace=65301,e.fiveoldstyle=63285,e.fiveparen=9336,e.fiveperiod=9356,e.fivepersian=1781,e.fiveroman=8564,e.fivesuperior=8309,e.fivethai=3669,e.fl=64258,e.florin=402,e.fmonospace=65350,e.fmsquare=13209,e.fofanthai=3615,e.fofathai=3613
e.fongmanthai=3663,e.forall=8704,e.four=52,e.fourarabic=1636,e.fourbengali=2538,e.fourcircle=9315,e.fourcircleinversesansserif=10125,e.fourdeva=2410,e.fourgujarati=2794,e.fourgurmukhi=2666,e.fourhackarabic=1636,e.fourhangzhou=12324,e.fourideographicparen=12835,e.fourinferior=8324,e.fourmonospace=65300,e.fournumeratorbengali=2551,e.fouroldstyle=63284,e.fourparen=9335,e.fourperiod=9355,e.fourpersian=1780,e.fourroman=8563,e.foursuperior=8308,e.fourteencircle=9325,e.fourteenparen=9345,e.fourteenperiod=9365,e.fourthai=3668,e.fourthtonechinese=715,e.fparen=9377,e.fraction=8260,e.franc=8355
e.g=103,e.gabengali=2455,e.gacute=501,e.gadeva=2327,e.gafarabic=1711,e.gaffinalarabic=64403,e.gafinitialarabic=64404,e.gafmedialarabic=64405,e.gagujarati=2711,e.gagurmukhi=2583,e.gahiragana=12364,e.gakatakana=12460,e.gamma=947,e.gammalatinsmall=611,e.gammasuperior=736,e.gangiacoptic=1003,e.gbopomofo=12557,e.gbreve=287,e.gcaron=487,e.gcedilla=291,e.gcircle=9430,e.gcircumflex=285,e.gcommaaccent=291,e.gdot=289,e.gdotaccent=289,e.gecyrillic=1075,e.gehiragana=12370,e.gekatakana=12466,e.geometricallyequal=8785,e.gereshaccenthebrew=1436
e.gereshhebrew=1523,e.gereshmuqdamhebrew=1437,e.germandbls=223,e.gershayimaccenthebrew=1438,e.gershayimhebrew=1524,e.getamark=12307,e.ghabengali=2456,e.ghadarmenian=1394,e.ghadeva=2328,e.ghagujarati=2712,e.ghagurmukhi=2584,e.ghainarabic=1594,e.ghainfinalarabic=65230,e.ghaininitialarabic=65231,e.ghainmedialarabic=65232,e.ghemiddlehookcyrillic=1173,e.ghestrokecyrillic=1171,e.gheupturncyrillic=1169,e.ghhadeva=2394,e.ghhagurmukhi=2650,e.ghook=608,e.ghzsquare=13203,e.gihiragana=12366,e.gikatakana=12462,e.gimarmenian=1379,e.gimel=1490,e.gimeldagesh=64306,e.gimeldageshhebrew=64306,e.gimelhebrew=1490,e.gjecyrillic=1107
e.glottalinvertedstroke=446,e.glottalstop=660,e.glottalstopinverted=662,e.glottalstopmod=704,e.glottalstopreversed=661,e.glottalstopreversedmod=705,e.glottalstopreversedsuperior=740,e.glottalstopstroke=673,e.glottalstopstrokereversed=674,e.gmacron=7713,e.gmonospace=65351,e.gohiragana=12372,e.gokatakana=12468,e.gparen=9378,e.gpasquare=13228,e.gradient=8711,e.grave=96,e.gravebelowcmb=790,e.gravecmb=768,e.gravecomb=768,e.gravedeva=2387,e.gravelowmod=718,e.gravemonospace=65344,e.gravetonecmb=832,e.greater=62,e.greaterequal=8805,e.greaterequalorless=8923,e.greatermonospace=65310,e.greaterorequivalent=8819,e.greaterorless=8823
e.greateroverequal=8807,e.greatersmall=65125,e.gscript=609,e.gstroke=485,e.guhiragana=12368,e.guillemotleft=171,e.guillemotright=187,e.guilsinglleft=8249,e.guilsinglright=8250,e.gukatakana=12464,e.guramusquare=13080,e.gysquare=13257,e.h=104,e.haabkhasiancyrillic=1193,e.haaltonearabic=1729,e.habengali=2489,e.hadescendercyrillic=1203,e.hadeva=2361,e.hagujarati=2745,e.hagurmukhi=2617,e.haharabic=1581,e.hahfinalarabic=65186,e.hahinitialarabic=65187,e.hahiragana=12399,e.hahmedialarabic=65188,e.haitusquare=13098,e.hakatakana=12495,e.hakatakanahalfwidth=65418,e.halantgurmukhi=2637,e.hamzaarabic=1569
e.hamzalowarabic=1569,e.hangulfiller=12644,e.hardsigncyrillic=1098,e.harpoonleftbarbup=8636,e.harpoonrightbarbup=8640,e.hasquare=13258,e.hatafpatah=1458,e.hatafpatah16=1458,e.hatafpatah23=1458,e.hatafpatah2f=1458,e.hatafpatahhebrew=1458,e.hatafpatahnarrowhebrew=1458,e.hatafpatahquarterhebrew=1458,e.hatafpatahwidehebrew=1458,e.hatafqamats=1459,e.hatafqamats1b=1459,e.hatafqamats28=1459,e.hatafqamats34=1459,e.hatafqamatshebrew=1459,e.hatafqamatsnarrowhebrew=1459,e.hatafqamatsquarterhebrew=1459,e.hatafqamatswidehebrew=1459,e.hatafsegol=1457,e.hatafsegol17=1457,e.hatafsegol24=1457,e.hatafsegol30=1457,e.hatafsegolhebrew=1457,e.hatafsegolnarrowhebrew=1457,e.hatafsegolquarterhebrew=1457,e.hatafsegolwidehebrew=1457
e.hbar=295,e.hbopomofo=12559,e.hbrevebelow=7723,e.hcedilla=7721,e.hcircle=9431,e.hcircumflex=293,e.hdieresis=7719,e.hdotaccent=7715,e.hdotbelow=7717,e.he=1492,e.heart=9829,e.heartsuitblack=9829,e.heartsuitwhite=9825,e.hedagesh=64308,e.hedageshhebrew=64308,e.hehaltonearabic=1729,e.heharabic=1607,e.hehebrew=1492,e.hehfinalaltonearabic=64423,e.hehfinalalttwoarabic=65258,e.hehfinalarabic=65258,e.hehhamzaabovefinalarabic=64421,e.hehhamzaaboveisolatedarabic=64420,e.hehinitialaltonearabic=64424,e.hehinitialarabic=65259,e.hehiragana=12408,e.hehmedialaltonearabic=64425,e.hehmedialarabic=65260,e.heiseierasquare=13179,e.hekatakana=12504
e.hekatakanahalfwidth=65421,e.hekutaarusquare=13110,e.henghook=615,e.herutusquare=13113,e.het=1495,e.hethebrew=1495,e.hhook=614,e.hhooksuperior=689,e.hieuhacirclekorean=12923,e.hieuhaparenkorean=12827,e.hieuhcirclekorean=12909,e.hieuhkorean=12622,e.hieuhparenkorean=12813,e.hihiragana=12402,e.hikatakana=12498,e.hikatakanahalfwidth=65419,e.hiriq=1460,e.hiriq14=1460,e.hiriq21=1460,e.hiriq2d=1460,e.hiriqhebrew=1460,e.hiriqnarrowhebrew=1460,e.hiriqquarterhebrew=1460,e.hiriqwidehebrew=1460,e.hlinebelow=7830,e.hmonospace=65352,e.hoarmenian=1392,e.hohipthai=3627,e.hohiragana=12411,e.hokatakana=12507
e.hokatakanahalfwidth=65422,e.holam=1465,e.holam19=1465,e.holam26=1465,e.holam32=1465,e.holamhebrew=1465,e.holamnarrowhebrew=1465,e.holamquarterhebrew=1465,e.holamwidehebrew=1465,e.honokhukthai=3630,e.hookabovecomb=777,e.hookcmb=777,e.hookpalatalizedbelowcmb=801,e.hookretroflexbelowcmb=802,e.hoonsquare=13122,e.horicoptic=1001,e.horizontalbar=8213,e.horncmb=795,e.hotsprings=9832,e.house=8962,e.hparen=9379,e.hsuperior=688,e.hturned=613,e.huhiragana=12405,e.huiitosquare=13107,e.hukatakana=12501,e.hukatakanahalfwidth=65420,e.hungarumlaut=733,e.hungarumlautcmb=779,e.hv=405
e.hyphen=45,e.hypheninferior=63205,e.hyphenmonospace=65293,e.hyphensmall=65123,e.hyphensuperior=63206,e.hyphentwo=8208,e.i=105,e.iacute=237,e.iacyrillic=1103,e.ibengali=2439,e.ibopomofo=12583,e.ibreve=301,e.icaron=464,e.icircle=9432,e.icircumflex=238,e.icyrillic=1110,e.idblgrave=521,e.ideographearthcircle=12943,e.ideographfirecircle=12939,e.ideographicallianceparen=12863,e.ideographiccallparen=12858,e.ideographiccentrecircle=12965,e.ideographicclose=12294,e.ideographiccomma=12289,e.ideographiccommaleft=65380,e.ideographiccongratulationparen=12855,e.ideographiccorrectcircle=12963,e.ideographicearthparen=12847,e.ideographicenterpriseparen=12861,e.ideographicexcellentcircle=12957
e.ideographicfestivalparen=12864,e.ideographicfinancialcircle=12950,e.ideographicfinancialparen=12854,e.ideographicfireparen=12843,e.ideographichaveparen=12850,e.ideographichighcircle=12964,e.ideographiciterationmark=12293,e.ideographiclaborcircle=12952,e.ideographiclaborparen=12856,e.ideographicleftcircle=12967,e.ideographiclowcircle=12966,e.ideographicmedicinecircle=12969,e.ideographicmetalparen=12846,e.ideographicmoonparen=12842,e.ideographicnameparen=12852,e.ideographicperiod=12290,e.ideographicprintcircle=12958,e.ideographicreachparen=12867,e.ideographicrepresentparen=12857,e.ideographicresourceparen=12862,e.ideographicrightcircle=12968,e.ideographicsecretcircle=12953,e.ideographicselfparen=12866,e.ideographicsocietyparen=12851,e.ideographicspace=12288,e.ideographicspecialparen=12853,e.ideographicstockparen=12849,e.ideographicstudyparen=12859,e.ideographicsunparen=12848,e.ideographicsuperviseparen=12860
e.ideographicwaterparen=12844,e.ideographicwoodparen=12845,e.ideographiczero=12295,e.ideographmetalcircle=12942,e.ideographmooncircle=12938,e.ideographnamecircle=12948,e.ideographsuncircle=12944,e.ideographwatercircle=12940,e.ideographwoodcircle=12941,e.ideva=2311,e.idieresis=239,e.idieresisacute=7727,e.idieresiscyrillic=1253,e.idotbelow=7883,e.iebrevecyrillic=1239,e.iecyrillic=1077,e.ieungacirclekorean=12917,e.ieungaparenkorean=12821,e.ieungcirclekorean=12903,e.ieungkorean=12615,e.ieungparenkorean=12807,e.igrave=236,e.igujarati=2695,e.igurmukhi=2567,e.ihiragana=12356,e.ihookabove=7881,e.iibengali=2440,e.iicyrillic=1080,e.iideva=2312,e.iigujarati=2696
e.iigurmukhi=2568,e.iimatragurmukhi=2624,e.iinvertedbreve=523,e.iishortcyrillic=1081,e.iivowelsignbengali=2496,e.iivowelsigndeva=2368,e.iivowelsigngujarati=2752,e.ij=307,e.ikatakana=12452,e.ikatakanahalfwidth=65394,e.ikorean=12643,e.ilde=732,e.iluyhebrew=1452,e.imacron=299,e.imacroncyrillic=1251,e.imageorapproximatelyequal=8787,e.imatragurmukhi=2623,e.imonospace=65353,e.increment=8710,e.infinity=8734,e.iniarmenian=1387,e.integral=8747,e.integralbottom=8993,e.integralbt=8993,e.integralex=63733,e.integraltop=8992,e.integraltp=8992,e.intersection=8745,e.intisquare=13061,e.invbullet=9688
e.invcircle=9689,e.invsmileface=9787,e.iocyrillic=1105,e.iogonek=303,e.iota=953,e.iotadieresis=970,e.iotadieresistonos=912,e.iotalatin=617,e.iotatonos=943,e.iparen=9380,e.irigurmukhi=2674,e.ismallhiragana=12355,e.ismallkatakana=12451,e.ismallkatakanahalfwidth=65384,e.issharbengali=2554,e.istroke=616,e.isuperior=63213,e.iterationhiragana=12445,e.iterationkatakana=12541,e.itilde=297,e.itildebelow=7725,e.iubopomofo=12585,e.iucyrillic=1102,e.ivowelsignbengali=2495,e.ivowelsigndeva=2367,e.ivowelsigngujarati=2751,e.izhitsacyrillic=1141,e.izhitsadblgravecyrillic=1143,e.j=106,e.jaarmenian=1393
e.jabengali=2460,e.jadeva=2332,e.jagujarati=2716,e.jagurmukhi=2588,e.jbopomofo=12560,e.jcaron=496,e.jcircle=9433,e.jcircumflex=309,e.jcrossedtail=669,e.jdotlessstroke=607,e.jecyrillic=1112,e.jeemarabic=1580,e.jeemfinalarabic=65182,e.jeeminitialarabic=65183,e.jeemmedialarabic=65184,e.jeharabic=1688,e.jehfinalarabic=64395,e.jhabengali=2461,e.jhadeva=2333,e.jhagujarati=2717,e.jhagurmukhi=2589,e.jheharmenian=1403,e.jis=12292,e.jmonospace=65354,e.jparen=9381,e.jsuperior=690,e.k=107,e.kabashkircyrillic=1185,e.kabengali=2453,e.kacute=7729
e.kacyrillic=1082,e.kadescendercyrillic=1179,e.kadeva=2325,e.kaf=1499,e.kafarabic=1603,e.kafdagesh=64315,e.kafdageshhebrew=64315,e.kaffinalarabic=65242,e.kafhebrew=1499,e.kafinitialarabic=65243,e.kafmedialarabic=65244,e.kafrafehebrew=64333,e.kagujarati=2709,e.kagurmukhi=2581,e.kahiragana=12363,e.kahookcyrillic=1220,e.kakatakana=12459,e.kakatakanahalfwidth=65398,e.kappa=954,e.kappasymbolgreek=1008,e.kapyeounmieumkorean=12657,e.kapyeounphieuphkorean=12676,e.kapyeounpieupkorean=12664,e.kapyeounssangpieupkorean=12665,e.karoriisquare=13069,e.kashidaautoarabic=1600,e.kashidaautonosidebearingarabic=1600,e.kasmallkatakana=12533,e.kasquare=13188,e.kasraarabic=1616
e.kasratanarabic=1613,e.kastrokecyrillic=1183,e.katahiraprolongmarkhalfwidth=65392,e.kaverticalstrokecyrillic=1181,e.kbopomofo=12558,e.kcalsquare=13193,e.kcaron=489,e.kcedilla=311,e.kcircle=9434,e.kcommaaccent=311,e.kdotbelow=7731,e.keharmenian=1412,e.kehiragana=12369,e.kekatakana=12465,e.kekatakanahalfwidth=65401,e.kenarmenian=1391,e.kesmallkatakana=12534,e.kgreenlandic=312,e.khabengali=2454,e.khacyrillic=1093,e.khadeva=2326,e.khagujarati=2710,e.khagurmukhi=2582,e.khaharabic=1582,e.khahfinalarabic=65190,e.khahinitialarabic=65191,e.khahmedialarabic=65192,e.kheicoptic=999,e.khhadeva=2393,e.khhagurmukhi=2649
e.khieukhacirclekorean=12920,e.khieukhaparenkorean=12824,e.khieukhcirclekorean=12906,e.khieukhkorean=12619,e.khieukhparenkorean=12810,e.khokhaithai=3586,e.khokhonthai=3589,e.khokhuatthai=3587,e.khokhwaithai=3588,e.khomutthai=3675,e.khook=409,e.khorakhangthai=3590,e.khzsquare=13201,e.kihiragana=12365,e.kikatakana=12461,e.kikatakanahalfwidth=65399,e.kiroguramusquare=13077,e.kiromeetorusquare=13078,e.kirosquare=13076,e.kiyeokacirclekorean=12910,e.kiyeokaparenkorean=12814,e.kiyeokcirclekorean=12896,e.kiyeokkorean=12593,e.kiyeokparenkorean=12800,e.kiyeoksioskorean=12595,e.kjecyrillic=1116,e.klinebelow=7733,e.klsquare=13208,e.kmcubedsquare=13222,e.kmonospace=65355
e.kmsquaredsquare=13218,e.kohiragana=12371,e.kohmsquare=13248,e.kokaithai=3585,e.kokatakana=12467,e.kokatakanahalfwidth=65402,e.kooposquare=13086,e.koppacyrillic=1153,e.koreanstandardsymbol=12927,e.koroniscmb=835,e.kparen=9382,e.kpasquare=13226,e.ksicyrillic=1135,e.ktsquare=13263,e.kturned=670,e.kuhiragana=12367,e.kukatakana=12463,e.kukatakanahalfwidth=65400,e.kvsquare=13240,e.kwsquare=13246,e.l=108,e.labengali=2482,e.lacute=314,e.ladeva=2354,e.lagujarati=2738,e.lagurmukhi=2610,e.lakkhangyaothai=3653,e.lamaleffinalarabic=65276,e.lamalefhamzaabovefinalarabic=65272,e.lamalefhamzaaboveisolatedarabic=65271
e.lamalefhamzabelowfinalarabic=65274,e.lamalefhamzabelowisolatedarabic=65273,e.lamalefisolatedarabic=65275,e.lamalefmaddaabovefinalarabic=65270,e.lamalefmaddaaboveisolatedarabic=65269,e.lamarabic=1604,e.lambda=955,e.lambdastroke=411,e.lamed=1500,e.lameddagesh=64316,e.lameddageshhebrew=64316,e.lamedhebrew=1500,e.lamfinalarabic=65246,e.lamhahinitialarabic=64714,e.laminitialarabic=65247,e.lamjeeminitialarabic=64713,e.lamkhahinitialarabic=64715,e.lamlamhehisolatedarabic=65010,e.lammedialarabic=65248,e.lammeemhahinitialarabic=64904,e.lammeeminitialarabic=64716,e.largecircle=9711,e.lbar=410,e.lbelt=620,e.lbopomofo=12556,e.lcaron=318,e.lcedilla=316,e.lcircle=9435,e.lcircumflexbelow=7741,e.lcommaaccent=316
e.ldot=320,e.ldotaccent=320,e.ldotbelow=7735,e.ldotbelowmacron=7737,e.leftangleabovecmb=794,e.lefttackbelowcmb=792,e.less=60,e.lessequal=8804,e.lessequalorgreater=8922,e.lessmonospace=65308,e.lessorequivalent=8818,e.lessorgreater=8822,e.lessoverequal=8806,e.lesssmall=65124,e.lezh=622,e.lfblock=9612,e.lhookretroflex=621,e.lira=8356,e.liwnarmenian=1388,e.lj=457,e.ljecyrillic=1113,e.ll=63168,e.lladeva=2355,e.llagujarati=2739,e.llinebelow=7739,e.llladeva=2356,e.llvocalicbengali=2529,e.llvocalicdeva=2401,e.llvocalicvowelsignbengali=2531,e.llvocalicvowelsigndeva=2403
e.lmiddletilde=619,e.lmonospace=65356,e.lmsquare=13264,e.lochulathai=3628,e.logicaland=8743,e.logicalnot=172,e.logicalnotreversed=8976,e.logicalor=8744,e.lolingthai=3621,e.longs=383,e.lowlinecenterline=65102,e.lowlinecmb=818,e.lowlinedashed=65101,e.lozenge=9674,e.lparen=9383,e.lslash=322,e.lsquare=8467,e.lsuperior=63214,e.ltshade=9617,e.luthai=3622,e.lvocalicbengali=2444,e.lvocalicdeva=2316,e.lvocalicvowelsignbengali=2530,e.lvocalicvowelsigndeva=2402,e.lxsquare=13267,e.m=109,e.mabengali=2478,e.macron=175,e.macronbelowcmb=817,e.macroncmb=772
e.macronlowmod=717,e.macronmonospace=65507,e.macute=7743,e.madeva=2350,e.magujarati=2734,e.magurmukhi=2606,e.mahapakhhebrew=1444,e.mahapakhlefthebrew=1444,e.mahiragana=12414,e.maichattawalowleftthai=63637,e.maichattawalowrightthai=63636,e.maichattawathai=3659,e.maichattawaupperleftthai=63635,e.maieklowleftthai=63628,e.maieklowrightthai=63627,e.maiekthai=3656,e.maiekupperleftthai=63626,e.maihanakatleftthai=63620,e.maihanakatthai=3633,e.maitaikhuleftthai=63625,e.maitaikhuthai=3655,e.maitholowleftthai=63631,e.maitholowrightthai=63630,e.maithothai=3657,e.maithoupperleftthai=63629,e.maitrilowleftthai=63634,e.maitrilowrightthai=63633,e.maitrithai=3658,e.maitriupperleftthai=63632,e.maiyamokthai=3654
e.makatakana=12510,e.makatakanahalfwidth=65423,e.male=9794,e.mansyonsquare=13127,e.maqafhebrew=1470,e.mars=9794,e.masoracirclehebrew=1455,e.masquare=13187,e.mbopomofo=12551,e.mbsquare=13268,e.mcircle=9436,e.mcubedsquare=13221,e.mdotaccent=7745,e.mdotbelow=7747,e.meemarabic=1605,e.meemfinalarabic=65250,e.meeminitialarabic=65251,e.meemmedialarabic=65252,e.meemmeeminitialarabic=64721,e.meemmeemisolatedarabic=64584,e.meetorusquare=13133,e.mehiragana=12417,e.meizierasquare=13182,e.mekatakana=12513,e.mekatakanahalfwidth=65426,e.mem=1502,e.memdagesh=64318,e.memdageshhebrew=64318,e.memhebrew=1502,e.menarmenian=1396
e.merkhahebrew=1445,e.merkhakefulahebrew=1446,e.merkhakefulalefthebrew=1446,e.merkhalefthebrew=1445,e.mhook=625,e.mhzsquare=13202,e.middledotkatakanahalfwidth=65381,e.middot=183,e.mieumacirclekorean=12914,e.mieumaparenkorean=12818,e.mieumcirclekorean=12900,e.mieumkorean=12609,e.mieumpansioskorean=12656,e.mieumparenkorean=12804,e.mieumpieupkorean=12654,e.mieumsioskorean=12655,e.mihiragana=12415,e.mikatakana=12511,e.mikatakanahalfwidth=65424,e.minus=8722,e.minusbelowcmb=800,e.minuscircle=8854,e.minusmod=727,e.minusplus=8723,e.minute=8242,e.miribaarusquare=13130,e.mirisquare=13129,e.mlonglegturned=624,e.mlsquare=13206,e.mmcubedsquare=13219
e.mmonospace=65357,e.mmsquaredsquare=13215,e.mohiragana=12418,e.mohmsquare=13249,e.mokatakana=12514,e.mokatakanahalfwidth=65427,e.molsquare=13270,e.momathai=3617,e.moverssquare=13223,e.moverssquaredsquare=13224,e.mparen=9384,e.mpasquare=13227,e.mssquare=13235,e.msuperior=63215,e.mturned=623,e.mu=181,e.mu1=181,e.muasquare=13186,e.muchgreater=8811,e.muchless=8810,e.mufsquare=13196,e.mugreek=956,e.mugsquare=13197,e.muhiragana=12416,e.mukatakana=12512,e.mukatakanahalfwidth=65425,e.mulsquare=13205,e.multiply=215,e.mumsquare=13211,e.munahhebrew=1443
e.munahlefthebrew=1443,e.musicalnote=9834,e.musicalnotedbl=9835,e.musicflatsign=9837,e.musicsharpsign=9839,e.mussquare=13234,e.muvsquare=13238,e.muwsquare=13244,e.mvmegasquare=13241,e.mvsquare=13239,e.mwmegasquare=13247,e.mwsquare=13245,e.n=110,e.nabengali=2472,e.nabla=8711,e.nacute=324,e.nadeva=2344,e.nagujarati=2728,e.nagurmukhi=2600,e.nahiragana=12394,e.nakatakana=12490,e.nakatakanahalfwidth=65413,e.napostrophe=329,e.nasquare=13185,e.nbopomofo=12555,e.nbspace=160,e.ncaron=328,e.ncedilla=326,e.ncircle=9437,e.ncircumflexbelow=7755
e.ncommaaccent=326,e.ndotaccent=7749,e.ndotbelow=7751,e.nehiragana=12397,e.nekatakana=12493,e.nekatakanahalfwidth=65416,e.newsheqelsign=8362,e.nfsquare=13195,e.ngabengali=2457,e.ngadeva=2329,e.ngagujarati=2713,e.ngagurmukhi=2585,e.ngonguthai=3591,e.nhiragana=12435,e.nhookleft=626,e.nhookretroflex=627,e.nieunacirclekorean=12911,e.nieunaparenkorean=12815,e.nieuncieuckorean=12597,e.nieuncirclekorean=12897,e.nieunhieuhkorean=12598,e.nieunkorean=12596,e.nieunpansioskorean=12648,e.nieunparenkorean=12801,e.nieunsioskorean=12647,e.nieuntikeutkorean=12646,e.nihiragana=12395,e.nikatakana=12491,e.nikatakanahalfwidth=65414,e.nikhahitleftthai=63641
e.nikhahitthai=3661,e.nine=57,e.ninearabic=1641,e.ninebengali=2543,e.ninecircle=9320,e.ninecircleinversesansserif=10130,e.ninedeva=2415,e.ninegujarati=2799,e.ninegurmukhi=2671,e.ninehackarabic=1641,e.ninehangzhou=12329,e.nineideographicparen=12840,e.nineinferior=8329,e.ninemonospace=65305,e.nineoldstyle=63289,e.nineparen=9340,e.nineperiod=9360,e.ninepersian=1785,e.nineroman=8568,e.ninesuperior=8313,e.nineteencircle=9330,e.nineteenparen=9350,e.nineteenperiod=9370,e.ninethai=3673,e.nj=460,e.njecyrillic=1114,e.nkatakana=12531,e.nkatakanahalfwidth=65437,e.nlegrightlong=414,e.nlinebelow=7753
e.nmonospace=65358,e.nmsquare=13210,e.nnabengali=2467,e.nnadeva=2339,e.nnagujarati=2723,e.nnagurmukhi=2595,e.nnnadeva=2345,e.nohiragana=12398,e.nokatakana=12494,e.nokatakanahalfwidth=65417,e.nonbreakingspace=160,e.nonenthai=3603,e.nonuthai=3609,e.noonarabic=1606,e.noonfinalarabic=65254,e.noonghunnaarabic=1722,e.noonghunnafinalarabic=64415,e.nooninitialarabic=65255,e.noonjeeminitialarabic=64722,e.noonjeemisolatedarabic=64587,e.noonmedialarabic=65256,e.noonmeeminitialarabic=64725,e.noonmeemisolatedarabic=64590,e.noonnoonfinalarabic=64653,e.notcontains=8716,e.notelement=8713,e.notelementof=8713,e.notequal=8800,e.notgreater=8815,e.notgreaternorequal=8817
e.notgreaternorless=8825,e.notidentical=8802,e.notless=8814,e.notlessnorequal=8816,e.notparallel=8742,e.notprecedes=8832,e.notsubset=8836,e.notsucceeds=8833,e.notsuperset=8837,e.nowarmenian=1398,e.nparen=9385,e.nssquare=13233,e.nsuperior=8319,e.ntilde=241,e.nu=957,e.nuhiragana=12396,e.nukatakana=12492,e.nukatakanahalfwidth=65415,e.nuktabengali=2492,e.nuktadeva=2364,e.nuktagujarati=2748,e.nuktagurmukhi=2620,e.numbersign=35,e.numbersignmonospace=65283,e.numbersignsmall=65119,e.numeralsigngreek=884,e.numeralsignlowergreek=885,e.numero=8470,e.nun=1504,e.nundagesh=64320
e.nundageshhebrew=64320,e.nunhebrew=1504,e.nvsquare=13237,e.nwsquare=13243,e.nyabengali=2462,e.nyadeva=2334,e.nyagujarati=2718,e.nyagurmukhi=2590,e.o=111,e.oacute=243,e.oangthai=3629,e.obarred=629,e.obarredcyrillic=1257,e.obarreddieresiscyrillic=1259,e.obengali=2451,e.obopomofo=12571,e.obreve=335,e.ocandradeva=2321,e.ocandragujarati=2705,e.ocandravowelsigndeva=2377,e.ocandravowelsigngujarati=2761,e.ocaron=466,e.ocircle=9438,e.ocircumflex=244,e.ocircumflexacute=7889,e.ocircumflexdotbelow=7897,e.ocircumflexgrave=7891,e.ocircumflexhookabove=7893,e.ocircumflextilde=7895,e.ocyrillic=1086
e.odblacute=337,e.odblgrave=525,e.odeva=2323,e.odieresis=246,e.odieresiscyrillic=1255,e.odotbelow=7885,e.oe=339,e.oekorean=12634,e.ogonek=731,e.ogonekcmb=808,e.ograve=242,e.ogujarati=2707,e.oharmenian=1413,e.ohiragana=12362,e.ohookabove=7887,e.ohorn=417,e.ohornacute=7899,e.ohorndotbelow=7907,e.ohorngrave=7901,e.ohornhookabove=7903,e.ohorntilde=7905,e.ohungarumlaut=337,e.oi=419,e.oinvertedbreve=527,e.okatakana=12458,e.okatakanahalfwidth=65397,e.okorean=12631,e.olehebrew=1451,e.omacron=333,e.omacronacute=7763
e.omacrongrave=7761,e.omdeva=2384,e.omega=969,e.omega1=982,e.omegacyrillic=1121,e.omegalatinclosed=631,e.omegaroundcyrillic=1147,e.omegatitlocyrillic=1149,e.omegatonos=974,e.omgujarati=2768,e.omicron=959,e.omicrontonos=972,e.omonospace=65359,e.one=49,e.onearabic=1633,e.onebengali=2535,e.onecircle=9312,e.onecircleinversesansserif=10122,e.onedeva=2407,e.onedotenleader=8228,e.oneeighth=8539,e.onefitted=63196,e.onegujarati=2791,e.onegurmukhi=2663,e.onehackarabic=1633,e.onehalf=189,e.onehangzhou=12321,e.oneideographicparen=12832,e.oneinferior=8321,e.onemonospace=65297
e.onenumeratorbengali=2548,e.oneoldstyle=63281,e.oneparen=9332,e.oneperiod=9352,e.onepersian=1777,e.onequarter=188,e.oneroman=8560,e.onesuperior=185,e.onethai=3665,e.onethird=8531,e.oogonek=491,e.oogonekmacron=493,e.oogurmukhi=2579,e.oomatragurmukhi=2635,e.oopen=596,e.oparen=9386,e.openbullet=9702,e.option=8997,e.ordfeminine=170,e.ordmasculine=186,e.orthogonal=8735,e.oshortdeva=2322,e.oshortvowelsigndeva=2378,e.oslash=248,e.oslashacute=511,e.osmallhiragana=12361,e.osmallkatakana=12457,e.osmallkatakanahalfwidth=65387,e.ostrokeacute=511,e.osuperior=63216
e.otcyrillic=1151,e.otilde=245,e.otildeacute=7757,e.otildedieresis=7759,e.oubopomofo=12577,e.overline=8254,e.overlinecenterline=65098,e.overlinecmb=773,e.overlinedashed=65097,e.overlinedblwavy=65100,e.overlinewavy=65099,e.overscore=175,e.ovowelsignbengali=2507,e.ovowelsigndeva=2379,e.ovowelsigngujarati=2763,e.p=112,e.paampssquare=13184,e.paasentosquare=13099,e.pabengali=2474,e.pacute=7765,e.padeva=2346,e.pagedown=8671,e.pageup=8670,e.pagujarati=2730,e.pagurmukhi=2602,e.pahiragana=12401,e.paiyannoithai=3631,e.pakatakana=12497,e.palatalizationcyrilliccmb=1156,e.palochkacyrillic=1216
e.pansioskorean=12671,e.paragraph=182,e.parallel=8741,e.parenleft=40,e.parenleftaltonearabic=64830,e.parenleftbt=63725,e.parenleftex=63724,e.parenleftinferior=8333,e.parenleftmonospace=65288,e.parenleftsmall=65113,e.parenleftsuperior=8317,e.parenlefttp=63723,e.parenleftvertical=65077,e.parenright=41,e.parenrightaltonearabic=64831,e.parenrightbt=63736,e.parenrightex=63735,e.parenrightinferior=8334,e.parenrightmonospace=65289,e.parenrightsmall=65114,e.parenrightsuperior=8318,e.parenrighttp=63734,e.parenrightvertical=65078,e.partialdiff=8706,e.paseqhebrew=1472,e.pashtahebrew=1433,e.pasquare=13225,e.patah=1463,e.patah11=1463,e.patah1d=1463
e.patah2a=1463,e.patahhebrew=1463,e.patahnarrowhebrew=1463,e.patahquarterhebrew=1463,e.patahwidehebrew=1463,e.pazerhebrew=1441,e.pbopomofo=12550,e.pcircle=9439,e.pdotaccent=7767,e.pe=1508,e.pecyrillic=1087,e.pedagesh=64324,e.pedageshhebrew=64324,e.peezisquare=13115,e.pefinaldageshhebrew=64323,e.peharabic=1662,e.peharmenian=1402,e.pehebrew=1508,e.pehfinalarabic=64343,e.pehinitialarabic=64344,e.pehiragana=12410,e.pehmedialarabic=64345,e.pekatakana=12506,e.pemiddlehookcyrillic=1191,e.perafehebrew=64334,e.percent=37,e.percentarabic=1642,e.percentmonospace=65285,e.percentsmall=65130,e.period=46
e.periodarmenian=1417,e.periodcentered=183,e.periodhalfwidth=65377,e.periodinferior=63207,e.periodmonospace=65294,e.periodsmall=65106,e.periodsuperior=63208,e.perispomenigreekcmb=834,e.perpendicular=8869,e.perthousand=8240,e.peseta=8359,e.pfsquare=13194,e.phabengali=2475,e.phadeva=2347,e.phagujarati=2731,e.phagurmukhi=2603,e.phi=966,e.phi1=981,e.phieuphacirclekorean=12922,e.phieuphaparenkorean=12826,e.phieuphcirclekorean=12908,e.phieuphkorean=12621,e.phieuphparenkorean=12812,e.philatin=632,e.phinthuthai=3642,e.phisymbolgreek=981,e.phook=421,e.phophanthai=3614,e.phophungthai=3612,e.phosamphaothai=3616
e.pi=960,e.pieupacirclekorean=12915,e.pieupaparenkorean=12819,e.pieupcieuckorean=12662,e.pieupcirclekorean=12901,e.pieupkiyeokkorean=12658,e.pieupkorean=12610,e.pieupparenkorean=12805,e.pieupsioskiyeokkorean=12660,e.pieupsioskorean=12612,e.pieupsiostikeutkorean=12661,e.pieupthieuthkorean=12663,e.pieuptikeutkorean=12659,e.pihiragana=12404,e.pikatakana=12500,e.pisymbolgreek=982,e.piwrarmenian=1411,e.plus=43,e.plusbelowcmb=799,e.pluscircle=8853,e.plusminus=177,e.plusmod=726,e.plusmonospace=65291,e.plussmall=65122,e.plussuperior=8314,e.pmonospace=65360,e.pmsquare=13272,e.pohiragana=12413,e.pointingindexdownwhite=9759,e.pointingindexleftwhite=9756
e.pointingindexrightwhite=9758,e.pointingindexupwhite=9757,e.pokatakana=12509,e.poplathai=3611,e.postalmark=12306,e.postalmarkface=12320,e.pparen=9387,e.precedes=8826,e.prescription=8478,e.primemod=697,e.primereversed=8245,e.product=8719,e.projective=8965,e.prolongedkana=12540,e.propellor=8984,e.propersubset=8834,e.propersuperset=8835,e.proportion=8759,e.proportional=8733,e.psi=968,e.psicyrillic=1137,e.psilipneumatacyrilliccmb=1158,e.pssquare=13232,e.puhiragana=12407,e.pukatakana=12503,e.pvsquare=13236,e.pwsquare=13242,e.q=113,e.qadeva=2392,e.qadmahebrew=1448
e.qafarabic=1602,e.qaffinalarabic=65238,e.qafinitialarabic=65239,e.qafmedialarabic=65240,e.qamats=1464,e.qamats10=1464,e.qamats1a=1464,e.qamats1c=1464,e.qamats27=1464,e.qamats29=1464,e.qamats33=1464,e.qamatsde=1464,e.qamatshebrew=1464,e.qamatsnarrowhebrew=1464,e.qamatsqatanhebrew=1464,e.qamatsqatannarrowhebrew=1464,e.qamatsqatanquarterhebrew=1464,e.qamatsqatanwidehebrew=1464,e.qamatsquarterhebrew=1464,e.qamatswidehebrew=1464,e.qarneyparahebrew=1439,e.qbopomofo=12561,e.qcircle=9440,e.qhook=672,e.qmonospace=65361,e.qof=1511,e.qofdagesh=64327,e.qofdageshhebrew=64327,e.qofhebrew=1511,e.qparen=9388
e.quarternote=9833,e.qubuts=1467,e.qubuts18=1467,e.qubuts25=1467,e.qubuts31=1467,e.qubutshebrew=1467,e.qubutsnarrowhebrew=1467,e.qubutsquarterhebrew=1467,e.qubutswidehebrew=1467,e.question=63,e.questionarabic=1567,e.questionarmenian=1374,e.questiondown=191,e.questiondownsmall=63423,e.questiongreek=894,e.questionmonospace=65311,e.questionsmall=63295,e.quotedbl=34,e.quotedblbase=8222,e.quotedblleft=8220,e.quotedblmonospace=65282,e.quotedblprime=12318,e.quotedblprimereversed=12317,e.quotedblright=8221,e.quoteleft=8216,e.quoteleftreversed=8219,e.quotereversed=8219,e.quoteright=8217,e.quoterightn=329,e.quotesinglbase=8218
e.quotesingle=39,e.quotesinglemonospace=65287,e.r=114,e.raarmenian=1404,e.rabengali=2480,e.racute=341,e.radeva=2352,e.radical=8730,e.radicalex=63717,e.radoverssquare=13230,e.radoverssquaredsquare=13231,e.radsquare=13229,e.rafe=1471,e.rafehebrew=1471,e.ragujarati=2736,e.ragurmukhi=2608,e.rahiragana=12425,e.rakatakana=12521,e.rakatakanahalfwidth=65431,e.ralowerdiagonalbengali=2545,e.ramiddlediagonalbengali=2544,e.ramshorn=612,e.ratio=8758,e.rbopomofo=12566,e.rcaron=345,e.rcedilla=343,e.rcircle=9441,e.rcommaaccent=343,e.rdblgrave=529,e.rdotaccent=7769
e.rdotbelow=7771,e.rdotbelowmacron=7773,e.referencemark=8251,e.reflexsubset=8838,e.reflexsuperset=8839,e.registered=174,e.registersans=63720,e.registerserif=63194,e.reharabic=1585,e.reharmenian=1408,e.rehfinalarabic=65198,e.rehiragana=12428,e.rekatakana=12524,e.rekatakanahalfwidth=65434,e.resh=1512,e.reshdageshhebrew=64328,e.reshhebrew=1512,e.reversedtilde=8765,e.reviahebrew=1431,e.reviamugrashhebrew=1431,e.revlogicalnot=8976,e.rfishhook=638,e.rfishhookreversed=639,e.rhabengali=2525,e.rhadeva=2397,e.rho=961,e.rhook=637,e.rhookturned=635,e.rhookturnedsuperior=693,e.rhosymbolgreek=1009
e.rhotichookmod=734,e.rieulacirclekorean=12913,e.rieulaparenkorean=12817,e.rieulcirclekorean=12899,e.rieulhieuhkorean=12608,e.rieulkiyeokkorean=12602,e.rieulkiyeoksioskorean=12649,e.rieulkorean=12601,e.rieulmieumkorean=12603,e.rieulpansioskorean=12652,e.rieulparenkorean=12803,e.rieulphieuphkorean=12607,e.rieulpieupkorean=12604,e.rieulpieupsioskorean=12651,e.rieulsioskorean=12605,e.rieulthieuthkorean=12606,e.rieultikeutkorean=12650,e.rieulyeorinhieuhkorean=12653,e.rightangle=8735,e.righttackbelowcmb=793,e.righttriangle=8895,e.rihiragana=12426,e.rikatakana=12522,e.rikatakanahalfwidth=65432,e.ring=730,e.ringbelowcmb=805,e.ringcmb=778,e.ringhalfleft=703,e.ringhalfleftarmenian=1369,e.ringhalfleftbelowcmb=796
e.ringhalfleftcentered=723,e.ringhalfright=702,e.ringhalfrightbelowcmb=825,e.ringhalfrightcentered=722,e.rinvertedbreve=531,e.rittorusquare=13137,e.rlinebelow=7775,e.rlongleg=636,e.rlonglegturned=634,e.rmonospace=65362,e.rohiragana=12429,e.rokatakana=12525,e.rokatakanahalfwidth=65435,e.roruathai=3619,e.rparen=9389,e.rrabengali=2524,e.rradeva=2353,e.rragurmukhi=2652,e.rreharabic=1681,e.rrehfinalarabic=64397,e.rrvocalicbengali=2528,e.rrvocalicdeva=2400,e.rrvocalicgujarati=2784,e.rrvocalicvowelsignbengali=2500,e.rrvocalicvowelsigndeva=2372,e.rrvocalicvowelsigngujarati=2756,e.rsuperior=63217,e.rtblock=9616,e.rturned=633,e.rturnedsuperior=692
e.ruhiragana=12427,e.rukatakana=12523,e.rukatakanahalfwidth=65433,e.rupeemarkbengali=2546,e.rupeesignbengali=2547,e.rupiah=63197,e.ruthai=3620,e.rvocalicbengali=2443,e.rvocalicdeva=2315,e.rvocalicgujarati=2699,e.rvocalicvowelsignbengali=2499,e.rvocalicvowelsigndeva=2371,e.rvocalicvowelsigngujarati=2755,e.s=115,e.sabengali=2488,e.sacute=347,e.sacutedotaccent=7781,e.sadarabic=1589,e.sadeva=2360,e.sadfinalarabic=65210,e.sadinitialarabic=65211,e.sadmedialarabic=65212,e.sagujarati=2744,e.sagurmukhi=2616,e.sahiragana=12373,e.sakatakana=12469,e.sakatakanahalfwidth=65403,e.sallallahoualayhewasallamarabic=65018,e.samekh=1505,e.samekhdagesh=64321
e.samekhdageshhebrew=64321,e.samekhhebrew=1505,e.saraaathai=3634,e.saraaethai=3649,e.saraaimaimalaithai=3652,e.saraaimaimuanthai=3651,e.saraamthai=3635,e.saraathai=3632,e.saraethai=3648,e.saraiileftthai=63622,e.saraiithai=3637,e.saraileftthai=63621,e.saraithai=3636,e.saraothai=3650,e.saraueeleftthai=63624,e.saraueethai=3639,e.saraueleftthai=63623,e.sarauethai=3638,e.sarauthai=3640,e.sarauuthai=3641,e.sbopomofo=12569,e.scaron=353,e.scarondotaccent=7783,e.scedilla=351,e.schwa=601,e.schwacyrillic=1241,e.schwadieresiscyrillic=1243,e.schwahook=602,e.scircle=9442,e.scircumflex=349
e.scommaaccent=537,e.sdotaccent=7777,e.sdotbelow=7779,e.sdotbelowdotaccent=7785,e.seagullbelowcmb=828,e.second=8243,e.secondtonechinese=714,e.section=167,e.seenarabic=1587,e.seenfinalarabic=65202,e.seeninitialarabic=65203,e.seenmedialarabic=65204,e.segol=1462,e.segol13=1462,e.segol1f=1462,e.segol2c=1462,e.segolhebrew=1462,e.segolnarrowhebrew=1462,e.segolquarterhebrew=1462,e.segoltahebrew=1426,e.segolwidehebrew=1462,e.seharmenian=1405,e.sehiragana=12379,e.sekatakana=12475,e.sekatakanahalfwidth=65406,e.semicolon=59,e.semicolonarabic=1563,e.semicolonmonospace=65307,e.semicolonsmall=65108,e.semivoicedmarkkana=12444
e.semivoicedmarkkanahalfwidth=65439,e.sentisquare=13090,e.sentosquare=13091,e.seven=55,e.sevenarabic=1639,e.sevenbengali=2541,e.sevencircle=9318,e.sevencircleinversesansserif=10128,e.sevendeva=2413,e.seveneighths=8542,e.sevengujarati=2797,e.sevengurmukhi=2669,e.sevenhackarabic=1639,e.sevenhangzhou=12327,e.sevenideographicparen=12838,e.seveninferior=8327,e.sevenmonospace=65303,e.sevenoldstyle=63287,e.sevenparen=9338,e.sevenperiod=9358,e.sevenpersian=1783,e.sevenroman=8566,e.sevensuperior=8311,e.seventeencircle=9328,e.seventeenparen=9348,e.seventeenperiod=9368,e.seventhai=3671,e.sfthyphen=173,e.shaarmenian=1399,e.shabengali=2486
e.shacyrillic=1096,e.shaddaarabic=1617,e.shaddadammaarabic=64609,e.shaddadammatanarabic=64606,e.shaddafathaarabic=64608,e.shaddakasraarabic=64610,e.shaddakasratanarabic=64607,e.shade=9618,e.shadedark=9619,e.shadelight=9617,e.shademedium=9618,e.shadeva=2358,e.shagujarati=2742,e.shagurmukhi=2614,e.shalshelethebrew=1427,e.shbopomofo=12565,e.shchacyrillic=1097,e.sheenarabic=1588,e.sheenfinalarabic=65206,e.sheeninitialarabic=65207,e.sheenmedialarabic=65208,e.sheicoptic=995,e.sheqel=8362,e.sheqelhebrew=8362,e.sheva=1456,e.sheva115=1456,e.sheva15=1456,e.sheva22=1456,e.sheva2e=1456,e.shevahebrew=1456
e.shevanarrowhebrew=1456,e.shevaquarterhebrew=1456,e.shevawidehebrew=1456,e.shhacyrillic=1211,e.shimacoptic=1005,e.shin=1513,e.shindagesh=64329,e.shindageshhebrew=64329,e.shindageshshindot=64300,e.shindageshshindothebrew=64300,e.shindageshsindot=64301,e.shindageshsindothebrew=64301,e.shindothebrew=1473,e.shinhebrew=1513,e.shinshindot=64298,e.shinshindothebrew=64298,e.shinsindot=64299,e.shinsindothebrew=64299,e.shook=642,e.sigma=963,e.sigma1=962,e.sigmafinal=962,e.sigmalunatesymbolgreek=1010,e.sihiragana=12375,e.sikatakana=12471,e.sikatakanahalfwidth=65404,e.siluqhebrew=1469,e.siluqlefthebrew=1469,e.similar=8764,e.sindothebrew=1474
e.siosacirclekorean=12916,e.siosaparenkorean=12820,e.sioscieuckorean=12670,e.sioscirclekorean=12902,e.sioskiyeokkorean=12666,e.sioskorean=12613,e.siosnieunkorean=12667,e.siosparenkorean=12806,e.siospieupkorean=12669,e.siostikeutkorean=12668,e.six=54,e.sixarabic=1638,e.sixbengali=2540,e.sixcircle=9317,e.sixcircleinversesansserif=10127,e.sixdeva=2412,e.sixgujarati=2796,e.sixgurmukhi=2668,e.sixhackarabic=1638,e.sixhangzhou=12326,e.sixideographicparen=12837,e.sixinferior=8326,e.sixmonospace=65302,e.sixoldstyle=63286,e.sixparen=9337,e.sixperiod=9357,e.sixpersian=1782,e.sixroman=8565,e.sixsuperior=8310,e.sixteencircle=9327
e.sixteencurrencydenominatorbengali=2553,e.sixteenparen=9347,e.sixteenperiod=9367,e.sixthai=3670,e.slash=47,e.slashmonospace=65295,e.slong=383,e.slongdotaccent=7835,e.smileface=9786,e.smonospace=65363,e.sofpasuqhebrew=1475,e.softhyphen=173,e.softsigncyrillic=1100,e.sohiragana=12381,e.sokatakana=12477,e.sokatakanahalfwidth=65407,e.soliduslongoverlaycmb=824,e.solidusshortoverlaycmb=823,e.sorusithai=3625,e.sosalathai=3624,e.sosothai=3595,e.sosuathai=3626,e.space=32,e.spacehackarabic=32,e.spade=9824,e.spadesuitblack=9824,e.spadesuitwhite=9828,e.sparen=9390,e.squarebelowcmb=827,e.squarecc=13252
e.squarecm=13213,e.squarediagonalcrosshatchfill=9641,e.squarehorizontalfill=9636,e.squarekg=13199,e.squarekm=13214,e.squarekmcapital=13262,e.squareln=13265,e.squarelog=13266,e.squaremg=13198,e.squaremil=13269,e.squaremm=13212,e.squaremsquared=13217,e.squareorthogonalcrosshatchfill=9638,e.squareupperlefttolowerrightfill=9639,e.squareupperrighttolowerleftfill=9640,e.squareverticalfill=9637,e.squarewhitewithsmallblack=9635,e.srsquare=13275,e.ssabengali=2487,e.ssadeva=2359,e.ssagujarati=2743,e.ssangcieuckorean=12617,e.ssanghieuhkorean=12677,e.ssangieungkorean=12672,e.ssangkiyeokkorean=12594,e.ssangnieunkorean=12645,e.ssangpieupkorean=12611,e.ssangsioskorean=12614,e.ssangtikeutkorean=12600,e.ssuperior=63218
e.sterling=163,e.sterlingmonospace=65505,e.strokelongoverlaycmb=822,e.strokeshortoverlaycmb=821,e.subset=8834,e.subsetnotequal=8842,e.subsetorequal=8838,e.succeeds=8827,e.suchthat=8715,e.suhiragana=12377,e.sukatakana=12473,e.sukatakanahalfwidth=65405,e.sukunarabic=1618,e.summation=8721,e.sun=9788,e.superset=8835,e.supersetnotequal=8843,e.supersetorequal=8839,e.svsquare=13276,e.syouwaerasquare=13180,e.t=116,e.tabengali=2468,e.tackdown=8868,e.tackleft=8867,e.tadeva=2340,e.tagujarati=2724,e.tagurmukhi=2596,e.taharabic=1591,e.tahfinalarabic=65218,e.tahinitialarabic=65219
e.tahiragana=12383,e.tahmedialarabic=65220,e.taisyouerasquare=13181,e.takatakana=12479,e.takatakanahalfwidth=65408,e.tatweelarabic=1600,e.tau=964,e.tav=1514,e.tavdages=64330,e.tavdagesh=64330,e.tavdageshhebrew=64330,e.tavhebrew=1514,e.tbar=359,e.tbopomofo=12554,e.tcaron=357,e.tccurl=680,e.tcedilla=355,e.tcheharabic=1670,e.tchehfinalarabic=64379,e.tchehinitialarabic=64380,e.tchehmedialarabic=64381,e.tcircle=9443,e.tcircumflexbelow=7793,e.tcommaaccent=355,e.tdieresis=7831,e.tdotaccent=7787,e.tdotbelow=7789,e.tecyrillic=1090,e.tedescendercyrillic=1197,e.teharabic=1578
e.tehfinalarabic=65174,e.tehhahinitialarabic=64674,e.tehhahisolatedarabic=64524,e.tehinitialarabic=65175,e.tehiragana=12390,e.tehjeeminitialarabic=64673,e.tehjeemisolatedarabic=64523,e.tehmarbutaarabic=1577,e.tehmarbutafinalarabic=65172,e.tehmedialarabic=65176,e.tehmeeminitialarabic=64676,e.tehmeemisolatedarabic=64526,e.tehnoonfinalarabic=64627,e.tekatakana=12486,e.tekatakanahalfwidth=65411,e.telephone=8481,e.telephoneblack=9742,e.telishagedolahebrew=1440,e.telishaqetanahebrew=1449,e.tencircle=9321,e.tenideographicparen=12841,e.tenparen=9341,e.tenperiod=9361,e.tenroman=8569,e.tesh=679,e.tet=1496,e.tetdagesh=64312,e.tetdageshhebrew=64312,e.tethebrew=1496,e.tetsecyrillic=1205
e.tevirhebrew=1435,e.tevirlefthebrew=1435,e.thabengali=2469,e.thadeva=2341,e.thagujarati=2725,e.thagurmukhi=2597,e.thalarabic=1584,e.thalfinalarabic=65196,e.thanthakhatlowleftthai=63640,e.thanthakhatlowrightthai=63639,e.thanthakhatthai=3660,e.thanthakhatupperleftthai=63638,e.theharabic=1579,e.thehfinalarabic=65178,e.thehinitialarabic=65179,e.thehmedialarabic=65180,e.thereexists=8707,e.therefore=8756,e.theta=952,e.theta1=977,e.thetasymbolgreek=977,e.thieuthacirclekorean=12921,e.thieuthaparenkorean=12825,e.thieuthcirclekorean=12907,e.thieuthkorean=12620,e.thieuthparenkorean=12811,e.thirteencircle=9324,e.thirteenparen=9344,e.thirteenperiod=9364,e.thonangmonthothai=3601
e.thook=429,e.thophuthaothai=3602,e.thorn=254,e.thothahanthai=3607,e.thothanthai=3600,e.thothongthai=3608,e.thothungthai=3606,e.thousandcyrillic=1154,e.thousandsseparatorarabic=1644,e.thousandsseparatorpersian=1644,e.three=51,e.threearabic=1635,e.threebengali=2537,e.threecircle=9314,e.threecircleinversesansserif=10124,e.threedeva=2409,e.threeeighths=8540,e.threegujarati=2793,e.threegurmukhi=2665,e.threehackarabic=1635,e.threehangzhou=12323,e.threeideographicparen=12834,e.threeinferior=8323,e.threemonospace=65299,e.threenumeratorbengali=2550,e.threeoldstyle=63283,e.threeparen=9334,e.threeperiod=9354,e.threepersian=1779,e.threequarters=190
e.threequartersemdash=63198,e.threeroman=8562,e.threesuperior=179,e.threethai=3667,e.thzsquare=13204,e.tihiragana=12385,e.tikatakana=12481,e.tikatakanahalfwidth=65409,e.tikeutacirclekorean=12912,e.tikeutaparenkorean=12816,e.tikeutcirclekorean=12898,e.tikeutkorean=12599,e.tikeutparenkorean=12802,e.tilde=732,e.tildebelowcmb=816,e.tildecmb=771,e.tildecomb=771,e.tildedoublecmb=864,e.tildeoperator=8764,e.tildeoverlaycmb=820,e.tildeverticalcmb=830,e.timescircle=8855,e.tipehahebrew=1430,e.tipehalefthebrew=1430,e.tippigurmukhi=2672,e.titlocyrilliccmb=1155,e.tiwnarmenian=1407,e.tlinebelow=7791,e.tmonospace=65364,e.toarmenian=1385
e.tohiragana=12392,e.tokatakana=12488,e.tokatakanahalfwidth=65412,e.tonebarextrahighmod=741,e.tonebarextralowmod=745,e.tonebarhighmod=742,e.tonebarlowmod=744,e.tonebarmidmod=743,e.tonefive=445,e.tonesix=389,e.tonetwo=424,e.tonos=900,e.tonsquare=13095,e.topatakthai=3599,e.tortoiseshellbracketleft=12308,e.tortoiseshellbracketleftsmall=65117,e.tortoiseshellbracketleftvertical=65081,e.tortoiseshellbracketright=12309,e.tortoiseshellbracketrightsmall=65118,e.tortoiseshellbracketrightvertical=65082,e.totaothai=3605,e.tpalatalhook=427,e.tparen=9391,e.trademark=8482,e.trademarksans=63722,e.trademarkserif=63195,e.tretroflexhook=648,e.triagdn=9660,e.triaglf=9668,e.triagrt=9658
e.triagup=9650,e.ts=678,e.tsadi=1510,e.tsadidagesh=64326,e.tsadidageshhebrew=64326,e.tsadihebrew=1510,e.tsecyrillic=1094,e.tsere=1461,e.tsere12=1461,e.tsere1e=1461,e.tsere2b=1461,e.tserehebrew=1461,e.tserenarrowhebrew=1461,e.tserequarterhebrew=1461,e.tserewidehebrew=1461,e.tshecyrillic=1115,e.tsuperior=63219,e.ttabengali=2463,e.ttadeva=2335,e.ttagujarati=2719,e.ttagurmukhi=2591,e.tteharabic=1657,e.ttehfinalarabic=64359,e.ttehinitialarabic=64360,e.ttehmedialarabic=64361,e.tthabengali=2464,e.tthadeva=2336,e.tthagujarati=2720,e.tthagurmukhi=2592,e.tturned=647
e.tuhiragana=12388,e.tukatakana=12484,e.tukatakanahalfwidth=65410,e.tusmallhiragana=12387,e.tusmallkatakana=12483,e.tusmallkatakanahalfwidth=65391,e.twelvecircle=9323,e.twelveparen=9343,e.twelveperiod=9363,e.twelveroman=8571,e.twentycircle=9331,e.twentyhangzhou=21316,e.twentyparen=9351,e.twentyperiod=9371,e.two=50,e.twoarabic=1634,e.twobengali=2536,e.twocircle=9313,e.twocircleinversesansserif=10123,e.twodeva=2408,e.twodotenleader=8229,e.twodotleader=8229,e.twodotleadervertical=65072,e.twogujarati=2792,e.twogurmukhi=2664,e.twohackarabic=1634,e.twohangzhou=12322,e.twoideographicparen=12833,e.twoinferior=8322,e.twomonospace=65298
e.twonumeratorbengali=2549,e.twooldstyle=63282,e.twoparen=9333,e.twoperiod=9353,e.twopersian=1778,e.tworoman=8561,e.twostroke=443,e.twosuperior=178,e.twothai=3666,e.twothirds=8532,e.u=117,e.uacute=250,e.ubar=649,e.ubengali=2441,e.ubopomofo=12584,e.ubreve=365,e.ucaron=468,e.ucircle=9444,e.ucircumflex=251,e.ucircumflexbelow=7799,e.ucyrillic=1091,e.udattadeva=2385,e.udblacute=369,e.udblgrave=533,e.udeva=2313,e.udieresis=252,e.udieresisacute=472,e.udieresisbelow=7795,e.udieresiscaron=474,e.udieresiscyrillic=1265
e.udieresisgrave=476,e.udieresismacron=470,e.udotbelow=7909,e.ugrave=249,e.ugujarati=2697,e.ugurmukhi=2569,e.uhiragana=12358,e.uhookabove=7911,e.uhorn=432,e.uhornacute=7913,e.uhorndotbelow=7921,e.uhorngrave=7915,e.uhornhookabove=7917,e.uhorntilde=7919,e.uhungarumlaut=369,e.uhungarumlautcyrillic=1267,e.uinvertedbreve=535,e.ukatakana=12454,e.ukatakanahalfwidth=65395,e.ukcyrillic=1145,e.ukorean=12636,e.umacron=363,e.umacroncyrillic=1263,e.umacrondieresis=7803,e.umatragurmukhi=2625,e.umonospace=65365,e.underscore=95,e.underscoredbl=8215,e.underscoremonospace=65343,e.underscorevertical=65075
e.underscorewavy=65103,e.union=8746,e.universal=8704,e.uogonek=371,e.uparen=9392,e.upblock=9600,e.upperdothebrew=1476,e.upsilon=965,e.upsilondieresis=971,e.upsilondieresistonos=944,e.upsilonlatin=650,e.upsilontonos=973,e.uptackbelowcmb=797,e.uptackmod=724,e.uragurmukhi=2675,e.uring=367,e.ushortcyrillic=1118,e.usmallhiragana=12357,e.usmallkatakana=12453,e.usmallkatakanahalfwidth=65385,e.ustraightcyrillic=1199,e.ustraightstrokecyrillic=1201,e.utilde=361,e.utildeacute=7801,e.utildebelow=7797,e.uubengali=2442,e.uudeva=2314,e.uugujarati=2698,e.uugurmukhi=2570,e.uumatragurmukhi=2626
e.uuvowelsignbengali=2498,e.uuvowelsigndeva=2370,e.uuvowelsigngujarati=2754,e.uvowelsignbengali=2497,e.uvowelsigndeva=2369,e.uvowelsigngujarati=2753,e.v=118,e.vadeva=2357,e.vagujarati=2741,e.vagurmukhi=2613,e.vakatakana=12535,e.vav=1493,e.vavdagesh=64309,e.vavdagesh65=64309,e.vavdageshhebrew=64309,e.vavhebrew=1493,e.vavholam=64331,e.vavholamhebrew=64331,e.vavvavhebrew=1520,e.vavyodhebrew=1521,e.vcircle=9445,e.vdotbelow=7807,e.vecyrillic=1074,e.veharabic=1700,e.vehfinalarabic=64363,e.vehinitialarabic=64364,e.vehmedialarabic=64365,e.vekatakana=12537,e.venus=9792,e.verticalbar=124
e.verticallineabovecmb=781,e.verticallinebelowcmb=809,e.verticallinelowmod=716,e.verticallinemod=712,e.vewarmenian=1406,e.vhook=651,e.vikatakana=12536,e.viramabengali=2509,e.viramadeva=2381,e.viramagujarati=2765,e.visargabengali=2435,e.visargadeva=2307,e.visargagujarati=2691,e.vmonospace=65366,e.voarmenian=1400,e.voicediterationhiragana=12446,e.voicediterationkatakana=12542,e.voicedmarkkana=12443,e.voicedmarkkanahalfwidth=65438,e.vokatakana=12538,e.vparen=9393,e.vtilde=7805,e.vturned=652,e.vuhiragana=12436,e.vukatakana=12532,e.w=119,e.wacute=7811,e.waekorean=12633,e.wahiragana=12431,e.wakatakana=12527
e.wakatakanahalfwidth=65436,e.wakorean=12632,e.wasmallhiragana=12430,e.wasmallkatakana=12526,e.wattosquare=13143,e.wavedash=12316,e.wavyunderscorevertical=65076,e.wawarabic=1608,e.wawfinalarabic=65262,e.wawhamzaabovearabic=1572,e.wawhamzaabovefinalarabic=65158,e.wbsquare=13277,e.wcircle=9446,e.wcircumflex=373,e.wdieresis=7813,e.wdotaccent=7815,e.wdotbelow=7817,e.wehiragana=12433,e.weierstrass=8472,e.wekatakana=12529,e.wekorean=12638,e.weokorean=12637,e.wgrave=7809,e.whitebullet=9702,e.whitecircle=9675,e.whitecircleinverse=9689,e.whitecornerbracketleft=12302,e.whitecornerbracketleftvertical=65091,e.whitecornerbracketright=12303,e.whitecornerbracketrightvertical=65092
e.whitediamond=9671,e.whitediamondcontainingblacksmalldiamond=9672,e.whitedownpointingsmalltriangle=9663,e.whitedownpointingtriangle=9661,e.whiteleftpointingsmalltriangle=9667,e.whiteleftpointingtriangle=9665,e.whitelenticularbracketleft=12310,e.whitelenticularbracketright=12311,e.whiterightpointingsmalltriangle=9657,e.whiterightpointingtriangle=9655,e.whitesmallsquare=9643,e.whitesmilingface=9786,e.whitesquare=9633,e.whitestar=9734,e.whitetelephone=9743,e.whitetortoiseshellbracketleft=12312,e.whitetortoiseshellbracketright=12313,e.whiteuppointingsmalltriangle=9653,e.whiteuppointingtriangle=9651,e.wihiragana=12432,e.wikatakana=12528,e.wikorean=12639,e.wmonospace=65367,e.wohiragana=12434,e.wokatakana=12530,e.wokatakanahalfwidth=65382,e.won=8361,e.wonmonospace=65510,e.wowaenthai=3623,e.wparen=9394
e.wring=7832,e.wsuperior=695,e.wturned=653,e.wynn=447,e.x=120,e.xabovecmb=829,e.xbopomofo=12562,e.xcircle=9447,e.xdieresis=7821,e.xdotaccent=7819,e.xeharmenian=1389,e.xi=958,e.xmonospace=65368,e.xparen=9395,e.xsuperior=739,e.y=121,e.yaadosquare=13134,e.yabengali=2479,e.yacute=253,e.yadeva=2351,e.yaekorean=12626,e.yagujarati=2735,e.yagurmukhi=2607,e.yahiragana=12420,e.yakatakana=12516,e.yakatakanahalfwidth=65428,e.yakorean=12625,e.yamakkanthai=3662,e.yasmallhiragana=12419,e.yasmallkatakana=12515
e.yasmallkatakanahalfwidth=65388,e.yatcyrillic=1123,e.ycircle=9448,e.ycircumflex=375,e.ydieresis=255,e.ydotaccent=7823,e.ydotbelow=7925,e.yeharabic=1610,e.yehbarreearabic=1746,e.yehbarreefinalarabic=64431,e.yehfinalarabic=65266,e.yehhamzaabovearabic=1574,e.yehhamzaabovefinalarabic=65162,e.yehhamzaaboveinitialarabic=65163,e.yehhamzaabovemedialarabic=65164,e.yehinitialarabic=65267,e.yehmedialarabic=65268,e.yehmeeminitialarabic=64733,e.yehmeemisolatedarabic=64600,e.yehnoonfinalarabic=64660,e.yehthreedotsbelowarabic=1745,e.yekorean=12630,e.yen=165,e.yenmonospace=65509,e.yeokorean=12629,e.yeorinhieuhkorean=12678,e.yerahbenyomohebrew=1450,e.yerahbenyomolefthebrew=1450,e.yericyrillic=1099,e.yerudieresiscyrillic=1273
e.yesieungkorean=12673,e.yesieungpansioskorean=12675,e.yesieungsioskorean=12674,e.yetivhebrew=1434,e.ygrave=7923,e.yhook=436,e.yhookabove=7927,e.yiarmenian=1397,e.yicyrillic=1111,e.yikorean=12642,e.yinyang=9775,e.yiwnarmenian=1410,e.ymonospace=65369,e.yod=1497,e.yoddagesh=64313,e.yoddageshhebrew=64313,e.yodhebrew=1497,e.yodyodhebrew=1522,e.yodyodpatahhebrew=64287,e.yohiragana=12424,e.yoikorean=12681,e.yokatakana=12520,e.yokatakanahalfwidth=65430,e.yokorean=12635,e.yosmallhiragana=12423,e.yosmallkatakana=12519,e.yosmallkatakanahalfwidth=65390,e.yotgreek=1011,e.yoyaekorean=12680,e.yoyakorean=12679
e.yoyakthai=3618,e.yoyingthai=3597,e.yparen=9396,e.ypogegrammeni=890,e.ypogegrammenigreekcmb=837,e.yr=422,e.yring=7833,e.ysuperior=696,e.ytilde=7929,e.yturned=654,e.yuhiragana=12422,e.yuikorean=12684,e.yukatakana=12518,e.yukatakanahalfwidth=65429,e.yukorean=12640,e.yusbigcyrillic=1131,e.yusbigiotifiedcyrillic=1133,e.yuslittlecyrillic=1127,e.yuslittleiotifiedcyrillic=1129,e.yusmallhiragana=12421,e.yusmallkatakana=12517,e.yusmallkatakanahalfwidth=65389,e.yuyekorean=12683,e.yuyeokorean=12682,e.yyabengali=2527,e.yyadeva=2399,e.z=122,e.zaarmenian=1382,e.zacute=378,e.zadeva=2395
e.zagurmukhi=2651,e.zaharabic=1592,e.zahfinalarabic=65222,e.zahinitialarabic=65223,e.zahiragana=12374,e.zahmedialarabic=65224,e.zainarabic=1586,e.zainfinalarabic=65200,e.zakatakana=12470,e.zaqefgadolhebrew=1429,e.zaqefqatanhebrew=1428,e.zarqahebrew=1432,e.zayin=1494,e.zayindagesh=64310,e.zayindageshhebrew=64310,e.zayinhebrew=1494,e.zbopomofo=12567,e.zcaron=382,e.zcircle=9449,e.zcircumflex=7825,e.zcurl=657,e.zdot=380,e.zdotaccent=380,e.zdotbelow=7827,e.zecyrillic=1079,e.zedescendercyrillic=1177,e.zedieresiscyrillic=1247,e.zehiragana=12380,e.zekatakana=12476,e.zero=48
e.zeroarabic=1632,e.zerobengali=2534,e.zerodeva=2406,e.zerogujarati=2790,e.zerogurmukhi=2662,e.zerohackarabic=1632,e.zeroinferior=8320,e.zeromonospace=65296,e.zerooldstyle=63280,e.zeropersian=1776,e.zerosuperior=8304,e.zerothai=3664,e.zerowidthjoiner=65279,e.zerowidthnonjoiner=8204,e.zerowidthspace=8203,e.zeta=950,e.zhbopomofo=12563,e.zhearmenian=1386,e.zhebrevecyrillic=1218,e.zhecyrillic=1078,e.zhedescendercyrillic=1175,e.zhedieresiscyrillic=1245,e.zihiragana=12376,e.zikatakana=12472,e.zinorhebrew=1454,e.zlinebelow=7829,e.zmonospace=65370,e.zohiragana=12382,e.zokatakana=12478,e.zparen=9397
e.zretroflexhook=656,e.zstroke=438,e.zuhiragana=12378,e.zukatakana=12474,e[".notdef"]=0,e.angbracketleftbig=9001,e.angbracketleftBig=9001,e.angbracketleftbigg=9001,e.angbracketleftBigg=9001,e.angbracketrightBig=9002,e.angbracketrightbig=9002,e.angbracketrightBigg=9002,e.angbracketrightbigg=9002,e.arrowhookleft=8618,e.arrowhookright=8617,e.arrowlefttophalf=8636,e.arrowleftbothalf=8637,e.arrownortheast=8599,e.arrownorthwest=8598,e.arrowrighttophalf=8640,e.arrowrightbothalf=8641,e.arrowsoutheast=8600,e.arrowsouthwest=8601,e.backslashbig=8726,e.backslashBig=8726,e.backslashBigg=8726,e.backslashbigg=8726,e.bardbl=8214,e.bracehtipdownleft=65079,e.bracehtipdownright=65079
e.bracehtipupleft=65080,e.bracehtipupright=65080,e.braceleftBig=123,e.braceleftbig=123,e.braceleftbigg=123,e.braceleftBigg=123,e.bracerightBig=125,e.bracerightbig=125,e.bracerightbigg=125,e.bracerightBigg=125,e.bracketleftbig=91,e.bracketleftBig=91,e.bracketleftbigg=91,e.bracketleftBigg=91,e.bracketrightBig=93,e.bracketrightbig=93,e.bracketrightbigg=93,e.bracketrightBigg=93,e.ceilingleftbig=8968,e.ceilingleftBig=8968,e.ceilingleftBigg=8968,e.ceilingleftbigg=8968,e.ceilingrightbig=8969,e.ceilingrightBig=8969,e.ceilingrightbigg=8969,e.ceilingrightBigg=8969,e.circledotdisplay=8857,e.circledottext=8857,e.circlemultiplydisplay=8855,e.circlemultiplytext=8855
e.circleplusdisplay=8853,e.circleplustext=8853,e.contintegraldisplay=8750,e.contintegraltext=8750,e.coproductdisplay=8720,e.coproducttext=8720,e.floorleftBig=8970,e.floorleftbig=8970,e.floorleftbigg=8970,e.floorleftBigg=8970,e.floorrightbig=8971,e.floorrightBig=8971,e.floorrightBigg=8971,e.floorrightbigg=8971,e.hatwide=770,e.hatwider=770,e.hatwidest=770,e.intercal=7488,e.integraldisplay=8747,e.integraltext=8747,e.intersectiondisplay=8898,e.intersectiontext=8898,e.logicalanddisplay=8743,e.logicalandtext=8743,e.logicalordisplay=8744,e.logicalortext=8744,e.parenleftBig=40,e.parenleftbig=40,e.parenleftBigg=40,e.parenleftbigg=40
e.parenrightBig=41,e.parenrightbig=41,e.parenrightBigg=41,e.parenrightbigg=41,e.prime=8242,e.productdisplay=8719,e.producttext=8719,e.radicalbig=8730,e.radicalBig=8730,e.radicalBigg=8730,e.radicalbigg=8730,e.radicalbt=8730,e.radicaltp=8730,e.radicalvertex=8730,e.slashbig=47,e.slashBig=47,e.slashBigg=47,e.slashbigg=47,e.summationdisplay=8721,e.summationtext=8721,e.tildewide=732,e.tildewider=732,e.tildewidest=732,e.uniondisplay=8899,e.unionmultidisplay=8846,e.unionmultitext=8846,e.unionsqdisplay=8852,e.unionsqtext=8852,e.uniontext=8899,e.vextenddouble=8741
e.vextendsingle=8739}),n=a(function(e){e.space=32,e.a1=9985,e.a2=9986,e.a202=9987,e.a3=9988,e.a4=9742,e.a5=9990,e.a119=9991,e.a118=9992,e.a117=9993,e.a11=9755,e.a12=9758,e.a13=9996,e.a14=9997,e.a15=9998,e.a16=9999,e.a105=1e4,e.a17=10001,e.a18=10002,e.a19=10003,e.a20=10004,e.a21=10005,e.a22=10006,e.a23=10007,e.a24=10008,e.a25=10009,e.a26=10010,e.a27=10011,e.a28=10012,e.a6=10013
e.a7=10014,e.a8=10015,e.a9=10016,e.a10=10017,e.a29=10018,e.a30=10019,e.a31=10020,e.a32=10021,e.a33=10022,e.a34=10023,e.a35=9733,e.a36=10025,e.a37=10026,e.a38=10027,e.a39=10028,e.a40=10029,e.a41=10030,e.a42=10031,e.a43=10032,e.a44=10033,e.a45=10034,e.a46=10035,e.a47=10036,e.a48=10037,e.a49=10038,e.a50=10039,e.a51=10040,e.a52=10041,e.a53=10042,e.a54=10043
e.a55=10044,e.a56=10045,e.a57=10046,e.a58=10047,e.a59=10048,e.a60=10049,e.a61=10050,e.a62=10051,e.a63=10052,e.a64=10053,e.a65=10054,e.a66=10055,e.a67=10056,e.a68=10057,e.a69=10058,e.a70=10059,e.a71=9679,e.a72=10061,e.a73=9632,e.a74=10063,e.a203=10064,e.a75=10065,e.a204=10066,e.a76=9650,e.a77=9660,e.a78=9670,e.a79=10070,e.a81=9687,e.a82=10072,e.a83=10073
e.a84=10074,e.a97=10075,e.a98=10076,e.a99=10077,e.a100=10078,e.a101=10081,e.a102=10082,e.a103=10083,e.a104=10084,e.a106=10085,e.a107=10086,e.a108=10087,e.a112=9827,e.a111=9830,e.a110=9829,e.a109=9824,e.a120=9312,e.a121=9313,e.a122=9314,e.a123=9315,e.a124=9316,e.a125=9317,e.a126=9318,e.a127=9319,e.a128=9320,e.a129=9321,e.a130=10102,e.a131=10103,e.a132=10104,e.a133=10105
e.a134=10106,e.a135=10107,e.a136=10108,e.a137=10109,e.a138=10110,e.a139=10111,e.a140=10112,e.a141=10113,e.a142=10114,e.a143=10115,e.a144=10116,e.a145=10117,e.a146=10118,e.a147=10119,e.a148=10120,e.a149=10121,e.a150=10122,e.a151=10123,e.a152=10124,e.a153=10125,e.a154=10126,e.a155=10127,e.a156=10128,e.a157=10129,e.a158=10130,e.a159=10131,e.a160=10132,e.a161=8594,e.a163=8596,e.a164=8597
e.a196=10136,e.a165=10137,e.a192=10138,e.a166=10139,e.a167=10140,e.a168=10141,e.a169=10142,e.a170=10143,e.a171=10144,e.a172=10145,e.a173=10146,e.a162=10147,e.a174=10148,e.a175=10149,e.a176=10150,e.a177=10151,e.a178=10152,e.a179=10153,e.a193=10154,e.a180=10155,e.a199=10156,e.a181=10157,e.a200=10158,e.a182=10159,e.a201=10161,e.a183=10162,e.a184=10163,e.a197=10164,e.a185=10165,e.a194=10166
e.a198=10167,e.a186=10168,e.a195=10169,e.a187=10170,e.a188=10171,e.a189=10172,e.a190=10173,e.a191=10174,e.a89=10088,e.a90=10089,e.a93=10090,e.a94=10091,e.a91=10092,e.a92=10093,e.a205=10094,e.a85=10095,e.a206=10096,e.a86=10097,e.a87=10098,e.a88=10099,e.a95=10100,e.a96=10101,e[".notdef"]=0})
t.getGlyphsUnicode=i,t.getDingbatsGlyphsUnicode=n},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getSupplementalGlyphMapForCalibri=t.getSupplementalGlyphMapForArialBlack=t.getGlyphMapForStandardFonts=t.getSymbolsFonts=t.getSerifFonts=t.getNonStdFontMap=t.getStdFontMap=void 0
var a=r(6),i=(0,a.getLookupTableFactory)(function(e){e.ArialNarrow="Helvetica",e["ArialNarrow-Bold"]="Helvetica-Bold",e["ArialNarrow-BoldItalic"]="Helvetica-BoldOblique",e["ArialNarrow-Italic"]="Helvetica-Oblique",e.ArialBlack="Helvetica",e["ArialBlack-Bold"]="Helvetica-Bold",e["ArialBlack-BoldItalic"]="Helvetica-BoldOblique",e["ArialBlack-Italic"]="Helvetica-Oblique",e["Arial-Black"]="Helvetica",e["Arial-Black-Bold"]="Helvetica-Bold",e["Arial-Black-BoldItalic"]="Helvetica-BoldOblique",e["Arial-Black-Italic"]="Helvetica-Oblique",e.Arial="Helvetica",e["Arial-Bold"]="Helvetica-Bold",e["Arial-BoldItalic"]="Helvetica-BoldOblique",e["Arial-Italic"]="Helvetica-Oblique",e["Arial-BoldItalicMT"]="Helvetica-BoldOblique",e["Arial-BoldMT"]="Helvetica-Bold",e["Arial-ItalicMT"]="Helvetica-Oblique",e.ArialMT="Helvetica",e["Courier-Bold"]="Courier-Bold",e["Courier-BoldItalic"]="Courier-BoldOblique",e["Courier-Italic"]="Courier-Oblique",e.CourierNew="Courier",e["CourierNew-Bold"]="Courier-Bold",e["CourierNew-BoldItalic"]="Courier-BoldOblique",e["CourierNew-Italic"]="Courier-Oblique",e["CourierNewPS-BoldItalicMT"]="Courier-BoldOblique",e["CourierNewPS-BoldMT"]="Courier-Bold",e["CourierNewPS-ItalicMT"]="Courier-Oblique"
e.CourierNewPSMT="Courier",e.Helvetica="Helvetica",e["Helvetica-Bold"]="Helvetica-Bold",e["Helvetica-BoldItalic"]="Helvetica-BoldOblique",e["Helvetica-BoldOblique"]="Helvetica-BoldOblique",e["Helvetica-Italic"]="Helvetica-Oblique",e["Helvetica-Oblique"]="Helvetica-Oblique",e.SegoeUISymbol="Helvetica",e["Symbol-Bold"]="Symbol",e["Symbol-BoldItalic"]="Symbol",e["Symbol-Italic"]="Symbol",e.TimesNewRoman="Times-Roman",e["TimesNewRoman-Bold"]="Times-Bold",e["TimesNewRoman-BoldItalic"]="Times-BoldItalic",e["TimesNewRoman-Italic"]="Times-Italic",e.TimesNewRomanPS="Times-Roman",e["TimesNewRomanPS-Bold"]="Times-Bold",e["TimesNewRomanPS-BoldItalic"]="Times-BoldItalic",e["TimesNewRomanPS-BoldItalicMT"]="Times-BoldItalic",e["TimesNewRomanPS-BoldMT"]="Times-Bold",e["TimesNewRomanPS-Italic"]="Times-Italic",e["TimesNewRomanPS-ItalicMT"]="Times-Italic",e.TimesNewRomanPSMT="Times-Roman",e["TimesNewRomanPSMT-Bold"]="Times-Bold",e["TimesNewRomanPSMT-BoldItalic"]="Times-BoldItalic",e["TimesNewRomanPSMT-Italic"]="Times-Italic"})
t.getStdFontMap=i
var n=(0,a.getLookupTableFactory)(function(e){e.Calibri="Helvetica",e["Calibri-Bold"]="Helvetica-Bold",e["Calibri-BoldItalic"]="Helvetica-BoldOblique",e["Calibri-Italic"]="Helvetica-Oblique",e.CenturyGothic="Helvetica",e["CenturyGothic-Bold"]="Helvetica-Bold",e["CenturyGothic-BoldItalic"]="Helvetica-BoldOblique",e["CenturyGothic-Italic"]="Helvetica-Oblique",e.ComicSansMS="Comic Sans MS",e["ComicSansMS-Bold"]="Comic Sans MS-Bold",e["ComicSansMS-BoldItalic"]="Comic Sans MS-BoldItalic",e["ComicSansMS-Italic"]="Comic Sans MS-Italic",e.LucidaConsole="Courier",e["LucidaConsole-Bold"]="Courier-Bold",e["LucidaConsole-BoldItalic"]="Courier-BoldOblique",e["LucidaConsole-Italic"]="Courier-Oblique",e["LucidaSans-Demi"]="Helvetica-Bold",e["MS-Gothic"]="MS Gothic",e["MS-Gothic-Bold"]="MS Gothic-Bold",e["MS-Gothic-BoldItalic"]="MS Gothic-BoldItalic",e["MS-Gothic-Italic"]="MS Gothic-Italic",e["MS-Mincho"]="MS Mincho",e["MS-Mincho-Bold"]="MS Mincho-Bold",e["MS-Mincho-BoldItalic"]="MS Mincho-BoldItalic",e["MS-Mincho-Italic"]="MS Mincho-Italic",e["MS-PGothic"]="MS PGothic",e["MS-PGothic-Bold"]="MS PGothic-Bold",e["MS-PGothic-BoldItalic"]="MS PGothic-BoldItalic",e["MS-PGothic-Italic"]="MS PGothic-Italic",e["MS-PMincho"]="MS PMincho"
e["MS-PMincho-Bold"]="MS PMincho-Bold",e["MS-PMincho-BoldItalic"]="MS PMincho-BoldItalic",e["MS-PMincho-Italic"]="MS PMincho-Italic",e.NuptialScript="Times-Italic",e.Wingdings="ZapfDingbats"})
t.getNonStdFontMap=n
var o=(0,a.getLookupTableFactory)(function(e){e["Adobe Jenson"]=!0,e["Adobe Text"]=!0,e.Albertus=!0,e.Aldus=!0,e.Alexandria=!0,e.Algerian=!0,e["American Typewriter"]=!0,e.Antiqua=!0,e.Apex=!0,e.Arno=!0,e.Aster=!0,e.Aurora=!0,e.Baskerville=!0,e.Bell=!0,e.Bembo=!0,e["Bembo Schoolbook"]=!0,e.Benguiat=!0,e["Berkeley Old Style"]=!0,e["Bernhard Modern"]=!0,e["Berthold City"]=!0,e.Bodoni=!0,e["Bauer Bodoni"]=!0,e["Book Antiqua"]=!0,e.Bookman=!0,e["Bordeaux Roman"]=!0,e["Californian FB"]=!0,e.Calisto=!0,e.Calvert=!0,e.Capitals=!0,e.Cambria=!0
e.Cartier=!0,e.Caslon=!0,e.Catull=!0,e.Centaur=!0,e["Century Old Style"]=!0,e["Century Schoolbook"]=!0,e.Chaparral=!0,e["Charis SIL"]=!0,e.Cheltenham=!0,e["Cholla Slab"]=!0,e.Clarendon=!0,e.Clearface=!0,e.Cochin=!0,e.Colonna=!0,e["Computer Modern"]=!0,e["Concrete Roman"]=!0,e.Constantia=!0,e["Cooper Black"]=!0,e.Corona=!0,e.Ecotype=!0,e.Egyptienne=!0,e.Elephant=!0,e.Excelsior=!0,e.Fairfield=!0,e["FF Scala"]=!0,e.Folkard=!0,e.Footlight=!0,e.FreeSerif=!0,e["Friz Quadrata"]=!0,e.Garamond=!0
e.Gentium=!0,e.Georgia=!0,e.Gloucester=!0,e["Goudy Old Style"]=!0,e["Goudy Schoolbook"]=!0,e["Goudy Pro Font"]=!0,e.Granjon=!0,e["Guardian Egyptian"]=!0,e.Heather=!0,e.Hercules=!0,e["High Tower Text"]=!0,e.Hiroshige=!0,e["Hoefler Text"]=!0,e["Humana Serif"]=!0,e.Imprint=!0,e["Ionic No. 5"]=!0,e.Janson=!0,e.Joanna=!0,e.Korinna=!0,e.Lexicon=!0,e["Liberation Serif"]=!0,e["Linux Libertine"]=!0,e.Literaturnaya=!0,e.Lucida=!0,e["Lucida Bright"]=!0,e.Melior=!0,e.Memphis=!0,e.Miller=!0,e.Minion=!0,e.Modern=!0
e["Mona Lisa"]=!0,e["Mrs Eaves"]=!0,e["MS Serif"]=!0,e["Museo Slab"]=!0,e["New York"]=!0,e["Nimbus Roman"]=!0,e["NPS Rawlinson Roadway"]=!0,e.NuptialScript=!0,e.Palatino=!0,e.Perpetua=!0,e.Plantin=!0,e["Plantin Schoolbook"]=!0,e.Playbill=!0,e["Poor Richard"]=!0,e["Rawlinson Roadway"]=!0,e.Renault=!0,e.Requiem=!0,e.Rockwell=!0,e.Roman=!0,e["Rotis Serif"]=!0,e.Sabon=!0,e.Scala=!0,e.Seagull=!0,e.Sistina=!0,e.Souvenir=!0,e.STIX=!0,e["Stone Informal"]=!0,e["Stone Serif"]=!0,e.Sylfaen=!0,e.Times=!0
e.Trajan=!0,e["Trinité"]=!0,e["Trump Mediaeval"]=!0,e.Utopia=!0,e["Vale Type"]=!0,e["Bitstream Vera"]=!0,e["Vera Serif"]=!0,e.Versailles=!0,e.Wanted=!0,e.Weiss=!0,e["Wide Latin"]=!0,e.Windsor=!0,e.XITS=!0})
t.getSerifFonts=o
var s=(0,a.getLookupTableFactory)(function(e){e.Dingbats=!0,e.Symbol=!0,e.ZapfDingbats=!0})
t.getSymbolsFonts=s
var c=(0,a.getLookupTableFactory)(function(e){e[2]=10,e[3]=32,e[4]=33,e[5]=34,e[6]=35,e[7]=36,e[8]=37,e[9]=38,e[10]=39,e[11]=40,e[12]=41,e[13]=42,e[14]=43,e[15]=44,e[16]=45,e[17]=46,e[18]=47,e[19]=48,e[20]=49,e[21]=50,e[22]=51,e[23]=52,e[24]=53,e[25]=54,e[26]=55,e[27]=56,e[28]=57,e[29]=58,e[30]=894,e[31]=60
e[32]=61,e[33]=62,e[34]=63,e[35]=64,e[36]=65,e[37]=66,e[38]=67,e[39]=68,e[40]=69,e[41]=70,e[42]=71,e[43]=72,e[44]=73,e[45]=74,e[46]=75,e[47]=76,e[48]=77,e[49]=78,e[50]=79,e[51]=80,e[52]=81,e[53]=82,e[54]=83,e[55]=84,e[56]=85,e[57]=86,e[58]=87,e[59]=88,e[60]=89,e[61]=90
e[62]=91,e[63]=92,e[64]=93,e[65]=94,e[66]=95,e[67]=96,e[68]=97,e[69]=98,e[70]=99,e[71]=100,e[72]=101,e[73]=102,e[74]=103,e[75]=104,e[76]=105,e[77]=106,e[78]=107,e[79]=108,e[80]=109,e[81]=110,e[82]=111,e[83]=112,e[84]=113,e[85]=114,e[86]=115,e[87]=116,e[88]=117,e[89]=118,e[90]=119,e[91]=120
e[92]=121,e[93]=122,e[94]=123,e[95]=124,e[96]=125,e[97]=126,e[98]=196,e[99]=197,e[100]=199,e[101]=201,e[102]=209,e[103]=214,e[104]=220,e[105]=225,e[106]=224,e[107]=226,e[108]=228,e[109]=227,e[110]=229,e[111]=231,e[112]=233,e[113]=232,e[114]=234,e[115]=235,e[116]=237,e[117]=236,e[118]=238,e[119]=239,e[120]=241,e[121]=243
e[122]=242,e[123]=244,e[124]=246,e[125]=245,e[126]=250,e[127]=249,e[128]=251,e[129]=252,e[130]=8224,e[131]=176,e[132]=162,e[133]=163,e[134]=167,e[135]=8226,e[136]=182,e[137]=223,e[138]=174,e[139]=169,e[140]=8482,e[141]=180,e[142]=168,e[143]=8800,e[144]=198,e[145]=216,e[146]=8734,e[147]=177,e[148]=8804,e[149]=8805,e[150]=165,e[151]=181
e[152]=8706,e[153]=8721,e[154]=8719,e[156]=8747,e[157]=170,e[158]=186,e[159]=8486,e[160]=230,e[161]=248,e[162]=191,e[163]=161,e[164]=172,e[165]=8730,e[166]=402,e[167]=8776,e[168]=8710,e[169]=171,e[170]=187,e[171]=8230,e[210]=218,e[223]=711,e[224]=321,e[225]=322,e[227]=353,e[229]=382,e[234]=253,e[252]=263,e[253]=268,e[254]=269,e[258]=258
e[260]=260,e[261]=261,e[265]=280,e[266]=281,e[268]=283,e[269]=313,e[275]=323,e[276]=324,e[278]=328,e[284]=345,e[285]=346,e[286]=347,e[292]=367,e[295]=377,e[296]=378,e[298]=380,e[305]=963,e[306]=964,e[307]=966,e[308]=8215,e[309]=8252,e[310]=8319,e[311]=8359,e[312]=8592,e[313]=8593,e[337]=9552,e[493]=1039,e[494]=1040,e[705]=1524,e[706]=8362
e[710]=64288,e[711]=64298,e[759]=1617,e[761]=1776,e[763]=1778,e[775]=1652,e[777]=1764,e[778]=1780,e[779]=1781,e[780]=1782,e[782]=771,e[783]=64726,e[786]=8363,e[788]=8532,e[790]=768,e[791]=769,e[792]=768,e[795]=803,e[797]=64336,e[798]=64337,e[799]=64342,e[800]=64343,e[801]=64344,e[802]=64345,e[803]=64362,e[804]=64363,e[805]=64364,e[2424]=7821,e[2425]=7822,e[2426]=7823
e[2427]=7824,e[2428]=7825,e[2429]=7826,e[2430]=7827,e[2433]=7682,e[2678]=8045,e[2679]=8046,e[2830]=1552,e[2838]=686,e[2840]=751,e[2842]=753,e[2843]=754,e[2844]=755,e[2846]=757,e[2856]=767,e[2857]=848,e[2858]=849,e[2862]=853,e[2863]=854,e[2864]=855,e[2865]=861,e[2866]=862,e[2906]=7460,e[2908]=7462,e[2909]=7463,e[2910]=7464,e[2912]=7466,e[2913]=7467,e[2914]=7468,e[2916]=7470
e[2917]=7471,e[2918]=7472,e[2920]=7474,e[2921]=7475,e[2922]=7476,e[2924]=7478,e[2925]=7479,e[2926]=7480,e[2928]=7482,e[2929]=7483,e[2930]=7484,e[2932]=7486,e[2933]=7487,e[2934]=7488,e[2936]=7490,e[2937]=7491,e[2938]=7492,e[2940]=7494,e[2941]=7495,e[2942]=7496,e[2944]=7498,e[2946]=7500,e[2948]=7502,e[2950]=7504,e[2951]=7505,e[2952]=7506,e[2954]=7508,e[2955]=7509,e[2956]=7510,e[2958]=7512
e[2959]=7513,e[2960]=7514,e[2962]=7516,e[2963]=7517,e[2964]=7518,e[2966]=7520,e[2967]=7521,e[2968]=7522,e[2970]=7524,e[2971]=7525,e[2972]=7526,e[2974]=7528,e[2975]=7529,e[2976]=7530,e[2978]=1537,e[2979]=1538,e[2980]=1539,e[2982]=1549,e[2983]=1551,e[2984]=1552,e[2986]=1554,e[2987]=1555,e[2988]=1556,e[2990]=1623,e[2991]=1624,e[2995]=1775,e[2999]=1791,e[3002]=64290,e[3003]=64291,e[3004]=64292
e[3006]=64294,e[3007]=64295,e[3008]=64296,e[3011]=1900,e[3014]=8223,e[3015]=8244,e[3017]=7532,e[3018]=7533,e[3019]=7534,e[3075]=7590,e[3076]=7591,e[3079]=7594,e[3080]=7595,e[3083]=7598,e[3084]=7599,e[3087]=7602,e[3088]=7603,e[3091]=7606,e[3092]=7607,e[3095]=7610,e[3096]=7611,e[3099]=7614,e[3100]=7615,e[3103]=7618,e[3104]=7619,e[3107]=8337,e[3108]=8338,e[3116]=1884,e[3119]=1885,e[3120]=1885
e[3123]=1886,e[3124]=1886,e[3127]=1887,e[3128]=1887,e[3131]=1888,e[3132]=1888,e[3135]=1889,e[3136]=1889,e[3139]=1890,e[3140]=1890,e[3143]=1891,e[3144]=1891,e[3147]=1892,e[3148]=1892,e[3153]=580,e[3154]=581,e[3157]=584,e[3158]=585,e[3161]=588,e[3162]=589,e[3165]=891,e[3166]=892,e[3169]=1274,e[3170]=1275,e[3173]=1278,e[3174]=1279,e[3181]=7622,e[3182]=7623,e[3282]=11799,e[3316]=578
e[3379]=42785,e[3393]=1159,e[3416]=8377})
t.getGlyphMapForStandardFonts=c
var l=(0,a.getLookupTableFactory)(function(e){e[227]=322,e[264]=261,e[291]=346})
t.getSupplementalGlyphMapForArialBlack=l
var u=(0,a.getLookupTableFactory)(function(e){e[1]=32,e[4]=65,e[17]=66,e[18]=67,e[24]=68,e[28]=69,e[38]=70,e[39]=71,e[44]=72,e[47]=73,e[58]=74,e[60]=75,e[62]=76,e[68]=77,e[69]=78,e[75]=79,e[87]=80,e[89]=81,e[90]=82,e[94]=83,e[100]=84,e[104]=85,e[115]=86,e[116]=87,e[121]=88,e[122]=89,e[127]=90,e[258]=97,e[268]=261,e[271]=98
e[272]=99,e[273]=263,e[282]=100,e[286]=101,e[295]=281,e[296]=102,e[336]=103,e[346]=104,e[349]=105,e[361]=106,e[364]=107,e[367]=108,e[371]=322,e[373]=109,e[374]=110,e[381]=111,e[383]=243,e[393]=112,e[395]=113,e[396]=114,e[400]=115,e[401]=347,e[410]=116,e[437]=117,e[448]=118,e[449]=119,e[454]=120,e[455]=121,e[460]=122,e[463]=380
e[853]=44,e[855]=58,e[856]=46,e[876]=47,e[878]=45,e[882]=45,e[894]=40,e[895]=41,e[896]=91,e[897]=93,e[923]=64,e[1004]=48,e[1005]=49,e[1006]=50,e[1007]=51,e[1008]=52,e[1009]=53,e[1010]=54,e[1011]=55,e[1012]=56,e[1013]=57,e[1081]=37,e[1085]=43,e[1086]=45})
t.getSupplementalGlyphMapForCalibri=u},function(e,t,r){var a=r(6).getLookupTableFactory,i=a(function(e){e[63721]=169,e[63193]=169,e[63720]=174,e[63194]=174,e[63722]=8482,e[63195]=8482,e[63729]=9127,e[63730]=9128,e[63731]=9129,e[63740]=9131,e[63741]=9132,e[63742]=9133,e[63726]=9121,e[63727]=9122,e[63728]=9123,e[63737]=9124,e[63738]=9125,e[63739]=9126,e[63723]=9115,e[63724]=9116,e[63725]=9117,e[63734]=9118,e[63735]=9119,e[63736]=9120}),n=[{begin:0,end:127},{begin:128,end:255},{begin:256,end:383},{begin:384,end:591},{begin:592,end:687},{begin:688,end:767},{begin:768,end:879},{begin:880,end:1023},{begin:11392,end:11519},{begin:1024,end:1279},{begin:1328,end:1423},{begin:1424,end:1535},{begin:42240,end:42559},{begin:1536,end:1791},{begin:1984,end:2047},{begin:2304,end:2431},{begin:2432,end:2559},{begin:2560,end:2687},{begin:2688,end:2815},{begin:2816,end:2943},{begin:2944,end:3071},{begin:3072,end:3199},{begin:3200,end:3327},{begin:3328,end:3455},{begin:3584,end:3711},{begin:3712,end:3839},{begin:4256,end:4351},{begin:6912,end:7039},{begin:4352,end:4607},{begin:7680,end:7935},{begin:7936,end:8191},{begin:8192,end:8303},{begin:8304,end:8351},{begin:8352,end:8399},{begin:8400,end:8447},{begin:8448,end:8527},{begin:8528,end:8591},{begin:8592,end:8703},{begin:8704,end:8959},{begin:8960,end:9215},{begin:9216,end:9279},{begin:9280,end:9311},{begin:9312,end:9471},{begin:9472,end:9599},{begin:9600,end:9631},{begin:9632,end:9727},{begin:9728,end:9983},{begin:9984,end:10175},{begin:12288,end:12351},{begin:12352,end:12447},{begin:12448,end:12543},{begin:12544,end:12591},{begin:12592,end:12687},{begin:43072,end:43135},{begin:12800,end:13055},{begin:13056,end:13311},{begin:44032,end:55215},{begin:55296,end:57343},{begin:67840,end:67871},{begin:19968,end:40959},{begin:57344,end:63743},{begin:12736,end:12783},{begin:64256,end:64335},{begin:64336,end:65023},{begin:65056,end:65071},{begin:65040,end:65055},{begin:65104,end:65135},{begin:65136,end:65279},{begin:65280,end:65519},{begin:65520,end:65535},{begin:3840,end:4095},{begin:1792,end:1871},{begin:1920,end:1983},{begin:3456,end:3583},{begin:4096,end:4255},{begin:4608,end:4991},{begin:5024,end:5119},{begin:5120,end:5759},{begin:5760,end:5791},{begin:5792,end:5887},{begin:6016,end:6143},{begin:6144,end:6319},{begin:10240,end:10495},{begin:40960,end:42127},{begin:5888,end:5919},{begin:66304,end:66351},{begin:66352,end:66383},{begin:66560,end:66639},{begin:118784,end:119039},{begin:119808,end:120831},{begin:1044480,end:1048573},{begin:65024,end:65039},{begin:917504,end:917631},{begin:6400,end:6479},{begin:6480,end:6527},{begin:6528,end:6623},{begin:6656,end:6687},{begin:11264,end:11359},{begin:11568,end:11647},{begin:19904,end:19967},{begin:43008,end:43055},{begin:65536,end:65663},{begin:65856,end:65935},{begin:66432,end:66463},{begin:66464,end:66527},{begin:66640,end:66687},{begin:66688,end:66735},{begin:67584,end:67647},{begin:68096,end:68191},{begin:119552,end:119647},{begin:73728,end:74751},{begin:119648,end:119679},{begin:7040,end:7103},{begin:7168,end:7247},{begin:7248,end:7295},{begin:43136,end:43231},{begin:43264,end:43311},{begin:43312,end:43359},{begin:43520,end:43615},{begin:65936,end:65999},{begin:66e3,end:66047},{begin:66208,end:66271},{begin:127024,end:127135}],o=a(function(e){e["¨"]=" ̈",e["¯"]=" ̄",e["´"]=" ́",e["µ"]="μ",e["¸"]=" ̧",e["Ĳ"]="IJ",e["ĳ"]="ij",e["Ŀ"]="L·",e["ŀ"]="l·",e["ŉ"]="ʼn",e["ſ"]="s",e["Ǆ"]="DŽ",e["ǅ"]="Dž",e["ǆ"]="dž",e["Ǉ"]="LJ",e["ǈ"]="Lj",e["ǉ"]="lj",e["Ǌ"]="NJ",e["ǋ"]="Nj",e["ǌ"]="nj",e["Ǳ"]="DZ",e["ǲ"]="Dz",e["ǳ"]="dz",e["˘"]=" ̆",e["˙"]=" ̇",e["˚"]=" ̊",e["˛"]=" ̨",e["˜"]=" ̃",e["˝"]=" ̋",e["ͺ"]=" ͅ"
e["΄"]=" ́",e["ϐ"]="β",e["ϑ"]="θ",e["ϒ"]="Υ",e["ϕ"]="φ",e["ϖ"]="π",e["ϰ"]="κ",e["ϱ"]="ρ",e["ϲ"]="ς",e["ϴ"]="Θ",e["ϵ"]="ε",e["Ϲ"]="Σ",e["և"]="եւ",e["ٵ"]="اٴ",e["ٶ"]="وٴ",e["ٷ"]="ۇٴ",e["ٸ"]="يٴ",e["ำ"]="ํา",e["ຳ"]="ໍາ",e["ໜ"]="ຫນ",e["ໝ"]="ຫມ",e["ཷ"]="ྲཱྀ",e["ཹ"]="ླཱྀ",e["ẚ"]="aʾ",e["᾽"]=" ̓",e["᾿"]=" ̓",e["῀"]=" ͂",e["῾"]=" ̔",e[" "]=" ",e[" "]=" "
e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e[" "]=" ",e["‗"]=" ̳",e["․"]=".",e["‥"]="..",e["…"]="...",e["″"]="′′",e["‴"]="′′′",e["‶"]="‵‵",e["‷"]="‵‵‵",e["‼"]="!!",e["‾"]=" ̅",e["⁇"]="??",e["⁈"]="?!",e["⁉"]="!?",e["⁗"]="′′′′",e[" "]=" ",e["₨"]="Rs",e["℀"]="a/c",e["℁"]="a/s",e["℃"]="°C",e["℅"]="c/o",e["℆"]="c/u",e["ℇ"]="Ɛ",e["℉"]="°F",e["№"]="No"
e["℡"]="TEL",e["ℵ"]="א",e["ℶ"]="ב",e["ℷ"]="ג",e["ℸ"]="ד",e["℻"]="FAX",e["Ⅰ"]="I",e["Ⅱ"]="II",e["Ⅲ"]="III",e["Ⅳ"]="IV",e["Ⅴ"]="V",e["Ⅵ"]="VI",e["Ⅶ"]="VII",e["Ⅷ"]="VIII",e["Ⅸ"]="IX",e["Ⅹ"]="X",e["Ⅺ"]="XI",e["Ⅻ"]="XII",e["Ⅼ"]="L",e["Ⅽ"]="C",e["Ⅾ"]="D",e["Ⅿ"]="M",e["ⅰ"]="i",e["ⅱ"]="ii",e["ⅲ"]="iii",e["ⅳ"]="iv",e["ⅴ"]="v",e["ⅵ"]="vi",e["ⅶ"]="vii",e["ⅷ"]="viii"
e["ⅸ"]="ix",e["ⅹ"]="x",e["ⅺ"]="xi",e["ⅻ"]="xii",e["ⅼ"]="l",e["ⅽ"]="c",e["ⅾ"]="d",e["ⅿ"]="m",e["∬"]="∫∫",e["∭"]="∫∫∫",e["∯"]="∮∮",e["∰"]="∮∮∮",e["⑴"]="(1)",e["⑵"]="(2)",e["⑶"]="(3)",e["⑷"]="(4)",e["⑸"]="(5)",e["⑹"]="(6)",e["⑺"]="(7)",e["⑻"]="(8)",e["⑼"]="(9)",e["⑽"]="(10)",e["⑾"]="(11)",e["⑿"]="(12)",e["⒀"]="(13)",e["⒁"]="(14)",e["⒂"]="(15)",e["⒃"]="(16)",e["⒄"]="(17)",e["⒅"]="(18)"
e["⒆"]="(19)",e["⒇"]="(20)",e["⒈"]="1.",e["⒉"]="2.",e["⒊"]="3.",e["⒋"]="4.",e["⒌"]="5.",e["⒍"]="6.",e["⒎"]="7.",e["⒏"]="8.",e["⒐"]="9.",e["⒑"]="10.",e["⒒"]="11.",e["⒓"]="12.",e["⒔"]="13.",e["⒕"]="14.",e["⒖"]="15.",e["⒗"]="16.",e["⒘"]="17.",e["⒙"]="18.",e["⒚"]="19.",e["⒛"]="20.",e["⒜"]="(a)",e["⒝"]="(b)",e["⒞"]="(c)",e["⒟"]="(d)",e["⒠"]="(e)",e["⒡"]="(f)",e["⒢"]="(g)",e["⒣"]="(h)"
e["⒤"]="(i)",e["⒥"]="(j)",e["⒦"]="(k)",e["⒧"]="(l)",e["⒨"]="(m)",e["⒩"]="(n)",e["⒪"]="(o)",e["⒫"]="(p)",e["⒬"]="(q)",e["⒭"]="(r)",e["⒮"]="(s)",e["⒯"]="(t)",e["⒰"]="(u)",e["⒱"]="(v)",e["⒲"]="(w)",e["⒳"]="(x)",e["⒴"]="(y)",e["⒵"]="(z)",e["⨌"]="∫∫∫∫",e["⩴"]="::=",e["⩵"]="==",e["⩶"]="===",e["⺟"]="母",e["⻳"]="龟",e["⼀"]="一",e["⼁"]="丨",e["⼂"]="丶",e["⼃"]="丿",e["⼄"]="乙",e["⼅"]="亅"
e["⼆"]="二",e["⼇"]="亠",e["⼈"]="人",e["⼉"]="儿",e["⼊"]="入",e["⼋"]="八",e["⼌"]="冂",e["⼍"]="冖",e["⼎"]="冫",e["⼏"]="几",e["⼐"]="凵",e["⼑"]="刀",e["⼒"]="力",e["⼓"]="勹",e["⼔"]="匕",e["⼕"]="匚",e["⼖"]="匸",e["⼗"]="十",e["⼘"]="卜",e["⼙"]="卩",e["⼚"]="厂",e["⼛"]="厶",e["⼜"]="又",e["⼝"]="口",e["⼞"]="囗",e["⼟"]="土",e["⼠"]="士",e["⼡"]="夂",e["⼢"]="夊",e["⼣"]="夕"
e["⼤"]="大",e["⼥"]="女",e["⼦"]="子",e["⼧"]="宀",e["⼨"]="寸",e["⼩"]="小",e["⼪"]="尢",e["⼫"]="尸",e["⼬"]="屮",e["⼭"]="山",e["⼮"]="巛",e["⼯"]="工",e["⼰"]="己",e["⼱"]="巾",e["⼲"]="干",e["⼳"]="幺",e["⼴"]="广",e["⼵"]="廴",e["⼶"]="廾",e["⼷"]="弋",e["⼸"]="弓",e["⼹"]="彐",e["⼺"]="彡",e["⼻"]="彳",e["⼼"]="心",e["⼽"]="戈",e["⼾"]="戶",e["⼿"]="手",e["⽀"]="支",e["⽁"]="攴"
e["⽂"]="文",e["⽃"]="斗",e["⽄"]="斤",e["⽅"]="方",e["⽆"]="无",e["⽇"]="日",e["⽈"]="曰",e["⽉"]="月",e["⽊"]="木",e["⽋"]="欠",e["⽌"]="止",e["⽍"]="歹",e["⽎"]="殳",e["⽏"]="毋",e["⽐"]="比",e["⽑"]="毛",e["⽒"]="氏",e["⽓"]="气",e["⽔"]="水",e["⽕"]="火",e["⽖"]="爪",e["⽗"]="父",e["⽘"]="爻",e["⽙"]="爿",e["⽚"]="片",e["⽛"]="牙",e["⽜"]="牛",e["⽝"]="犬",e["⽞"]="玄",e["⽟"]="玉"
e["⽠"]="瓜",e["⽡"]="瓦",e["⽢"]="甘",e["⽣"]="生",e["⽤"]="用",e["⽥"]="田",e["⽦"]="疋",e["⽧"]="疒",e["⽨"]="癶",e["⽩"]="白",e["⽪"]="皮",e["⽫"]="皿",e["⽬"]="目",e["⽭"]="矛",e["⽮"]="矢",e["⽯"]="石",e["⽰"]="示",e["⽱"]="禸",e["⽲"]="禾",e["⽳"]="穴",e["⽴"]="立",e["⽵"]="竹",e["⽶"]="米",e["⽷"]="糸",e["⽸"]="缶",e["⽹"]="网",e["⽺"]="羊",e["⽻"]="羽",e["⽼"]="老",e["⽽"]="而"
e["⽾"]="耒",e["⽿"]="耳",e["⾀"]="聿",e["⾁"]="肉",e["⾂"]="臣",e["⾃"]="自",e["⾄"]="至",e["⾅"]="臼",e["⾆"]="舌",e["⾇"]="舛",e["⾈"]="舟",e["⾉"]="艮",e["⾊"]="色",e["⾋"]="艸",e["⾌"]="虍",e["⾍"]="虫",e["⾎"]="血",e["⾏"]="行",e["⾐"]="衣",e["⾑"]="襾",e["⾒"]="見",e["⾓"]="角",e["⾔"]="言",e["⾕"]="谷",e["⾖"]="豆",e["⾗"]="豕",e["⾘"]="豸",e["⾙"]="貝",e["⾚"]="赤",e["⾛"]="走"
e["⾜"]="足",e["⾝"]="身",e["⾞"]="車",e["⾟"]="辛",e["⾠"]="辰",e["⾡"]="辵",e["⾢"]="邑",e["⾣"]="酉",e["⾤"]="釆",e["⾥"]="里",e["⾦"]="金",e["⾧"]="長",e["⾨"]="門",e["⾩"]="阜",e["⾪"]="隶",e["⾫"]="隹",e["⾬"]="雨",e["⾭"]="靑",e["⾮"]="非",e["⾯"]="面",e["⾰"]="革",e["⾱"]="韋",e["⾲"]="韭",e["⾳"]="音",e["⾴"]="頁",e["⾵"]="風",e["⾶"]="飛",e["⾷"]="食",e["⾸"]="首",e["⾹"]="香"
e["⾺"]="馬",e["⾻"]="骨",e["⾼"]="高",e["⾽"]="髟",e["⾾"]="鬥",e["⾿"]="鬯",e["⿀"]="鬲",e["⿁"]="鬼",e["⿂"]="魚",e["⿃"]="鳥",e["⿄"]="鹵",e["⿅"]="鹿",e["⿆"]="麥",e["⿇"]="麻",e["⿈"]="黃",e["⿉"]="黍",e["⿊"]="黑",e["⿋"]="黹",e["⿌"]="黽",e["⿍"]="鼎",e["⿎"]="鼓",e["⿏"]="鼠",e["⿐"]="鼻",e["⿑"]="齊",e["⿒"]="齒",e["⿓"]="龍",e["⿔"]="龜",e["⿕"]="龠",e["〶"]="〒",e["〸"]="十"
e["〹"]="卄",e["〺"]="卅",e["゛"]=" ゙",e["゜"]=" ゚",e["ㄱ"]="ᄀ",e["ㄲ"]="ᄁ",e["ㄳ"]="ᆪ",e["ㄴ"]="ᄂ",e["ㄵ"]="ᆬ",e["ㄶ"]="ᆭ",e["ㄷ"]="ᄃ",e["ㄸ"]="ᄄ",e["ㄹ"]="ᄅ",e["ㄺ"]="ᆰ",e["ㄻ"]="ᆱ",e["ㄼ"]="ᆲ",e["ㄽ"]="ᆳ",e["ㄾ"]="ᆴ",e["ㄿ"]="ᆵ",e["ㅀ"]="ᄚ",e["ㅁ"]="ᄆ",e["ㅂ"]="ᄇ",e["ㅃ"]="ᄈ",e["ㅄ"]="ᄡ",e["ㅅ"]="ᄉ",e["ㅆ"]="ᄊ",e["ㅇ"]="ᄋ",e["ㅈ"]="ᄌ",e["ㅉ"]="ᄍ",e["ㅊ"]="ᄎ"
e["ㅋ"]="ᄏ",e["ㅌ"]="ᄐ",e["ㅍ"]="ᄑ",e["ㅎ"]="ᄒ",e["ㅏ"]="ᅡ",e["ㅐ"]="ᅢ",e["ㅑ"]="ᅣ",e["ㅒ"]="ᅤ",e["ㅓ"]="ᅥ",e["ㅔ"]="ᅦ",e["ㅕ"]="ᅧ",e["ㅖ"]="ᅨ",e["ㅗ"]="ᅩ",e["ㅘ"]="ᅪ",e["ㅙ"]="ᅫ",e["ㅚ"]="ᅬ",e["ㅛ"]="ᅭ",e["ㅜ"]="ᅮ",e["ㅝ"]="ᅯ",e["ㅞ"]="ᅰ",e["ㅟ"]="ᅱ",e["ㅠ"]="ᅲ",e["ㅡ"]="ᅳ",e["ㅢ"]="ᅴ",e["ㅣ"]="ᅵ",e["ㅤ"]="ᅠ",e["ㅥ"]="ᄔ",e["ㅦ"]="ᄕ",e["ㅧ"]="ᇇ",e["ㅨ"]="ᇈ"
e["ㅩ"]="ᇌ",e["ㅪ"]="ᇎ",e["ㅫ"]="ᇓ",e["ㅬ"]="ᇗ",e["ㅭ"]="ᇙ",e["ㅮ"]="ᄜ",e["ㅯ"]="ᇝ",e["ㅰ"]="ᇟ",e["ㅱ"]="ᄝ",e["ㅲ"]="ᄞ",e["ㅳ"]="ᄠ",e["ㅴ"]="ᄢ",e["ㅵ"]="ᄣ",e["ㅶ"]="ᄧ",e["ㅷ"]="ᄩ",e["ㅸ"]="ᄫ",e["ㅹ"]="ᄬ",e["ㅺ"]="ᄭ",e["ㅻ"]="ᄮ",e["ㅼ"]="ᄯ",e["ㅽ"]="ᄲ",e["ㅾ"]="ᄶ",e["ㅿ"]="ᅀ",e["ㆀ"]="ᅇ",e["ㆁ"]="ᅌ",e["ㆂ"]="ᇱ",e["ㆃ"]="ᇲ",e["ㆄ"]="ᅗ",e["ㆅ"]="ᅘ",e["ㆆ"]="ᅙ"
e["ㆇ"]="ᆄ",e["ㆈ"]="ᆅ",e["ㆉ"]="ᆈ",e["ㆊ"]="ᆑ",e["ㆋ"]="ᆒ",e["ㆌ"]="ᆔ",e["ㆍ"]="ᆞ",e["ㆎ"]="ᆡ",e["㈀"]="(ᄀ)",e["㈁"]="(ᄂ)",e["㈂"]="(ᄃ)",e["㈃"]="(ᄅ)",e["㈄"]="(ᄆ)",e["㈅"]="(ᄇ)",e["㈆"]="(ᄉ)",e["㈇"]="(ᄋ)",e["㈈"]="(ᄌ)",e["㈉"]="(ᄎ)",e["㈊"]="(ᄏ)",e["㈋"]="(ᄐ)",e["㈌"]="(ᄑ)",e["㈍"]="(ᄒ)",e["㈎"]="(가)",e["㈏"]="(나)",e["㈐"]="(다)",e["㈑"]="(라)",e["㈒"]="(마)",e["㈓"]="(바)",e["㈔"]="(사)",e["㈕"]="(아)"
e["㈖"]="(자)",e["㈗"]="(차)",e["㈘"]="(카)",e["㈙"]="(타)",e["㈚"]="(파)",e["㈛"]="(하)",e["㈜"]="(주)",e["㈝"]="(오전)",e["㈞"]="(오후)",e["㈠"]="(一)",e["㈡"]="(二)",e["㈢"]="(三)",e["㈣"]="(四)",e["㈤"]="(五)",e["㈥"]="(六)",e["㈦"]="(七)",e["㈧"]="(八)",e["㈨"]="(九)",e["㈩"]="(十)",e["㈪"]="(月)",e["㈫"]="(火)",e["㈬"]="(水)",e["㈭"]="(木)",e["㈮"]="(金)",e["㈯"]="(土)",e["㈰"]="(日)",e["㈱"]="(株)",e["㈲"]="(有)",e["㈳"]="(社)",e["㈴"]="(名)"
e["㈵"]="(特)",e["㈶"]="(財)",e["㈷"]="(祝)",e["㈸"]="(労)",e["㈹"]="(代)",e["㈺"]="(呼)",e["㈻"]="(学)",e["㈼"]="(監)",e["㈽"]="(企)",e["㈾"]="(資)",e["㈿"]="(協)",e["㉀"]="(祭)",e["㉁"]="(休)",e["㉂"]="(自)",e["㉃"]="(至)",e["㋀"]="1月",e["㋁"]="2月",e["㋂"]="3月",e["㋃"]="4月",e["㋄"]="5月",e["㋅"]="6月",e["㋆"]="7月",e["㋇"]="8月",e["㋈"]="9月",e["㋉"]="10月",e["㋊"]="11月",e["㋋"]="12月",e["㍘"]="0点",e["㍙"]="1点",e["㍚"]="2点"
e["㍛"]="3点",e["㍜"]="4点",e["㍝"]="5点",e["㍞"]="6点",e["㍟"]="7点",e["㍠"]="8点",e["㍡"]="9点",e["㍢"]="10点",e["㍣"]="11点",e["㍤"]="12点",e["㍥"]="13点",e["㍦"]="14点",e["㍧"]="15点",e["㍨"]="16点",e["㍩"]="17点",e["㍪"]="18点",e["㍫"]="19点",e["㍬"]="20点",e["㍭"]="21点",e["㍮"]="22点",e["㍯"]="23点",e["㍰"]="24点",e["㏠"]="1日",e["㏡"]="2日",e["㏢"]="3日",e["㏣"]="4日",e["㏤"]="5日",e["㏥"]="6日",e["㏦"]="7日",e["㏧"]="8日"
e["㏨"]="9日",e["㏩"]="10日",e["㏪"]="11日",e["㏫"]="12日",e["㏬"]="13日",e["㏭"]="14日",e["㏮"]="15日",e["㏯"]="16日",e["㏰"]="17日",e["㏱"]="18日",e["㏲"]="19日",e["㏳"]="20日",e["㏴"]="21日",e["㏵"]="22日",e["㏶"]="23日",e["㏷"]="24日",e["㏸"]="25日",e["㏹"]="26日",e["㏺"]="27日",e["㏻"]="28日",e["㏼"]="29日",e["㏽"]="30日",e["㏾"]="31日",e["ﬀ"]="ff",e["ﬁ"]="fi",e["ﬂ"]="fl",e["ﬃ"]="ffi",e["ﬄ"]="ffl",e["ﬅ"]="ſt",e["ﬆ"]="st"
e["ﬓ"]="մն",e["ﬔ"]="մե",e["ﬕ"]="մի",e["ﬖ"]="վն",e["ﬗ"]="մխ",e["ﭏ"]="אל",e["ﭐ"]="ٱ",e["ﭑ"]="ٱ",e["ﭒ"]="ٻ",e["ﭓ"]="ٻ",e["ﭔ"]="ٻ",e["ﭕ"]="ٻ",e["ﭖ"]="پ",e["ﭗ"]="پ",e["ﭘ"]="پ",e["ﭙ"]="پ",e["ﭚ"]="ڀ",e["ﭛ"]="ڀ",e["ﭜ"]="ڀ",e["ﭝ"]="ڀ",e["ﭞ"]="ٺ",e["ﭟ"]="ٺ",e["ﭠ"]="ٺ",e["ﭡ"]="ٺ",e["ﭢ"]="ٿ",e["ﭣ"]="ٿ",e["ﭤ"]="ٿ",e["ﭥ"]="ٿ",e["ﭦ"]="ٹ",e["ﭧ"]="ٹ"
e["ﭨ"]="ٹ",e["ﭩ"]="ٹ",e["ﭪ"]="ڤ",e["ﭫ"]="ڤ",e["ﭬ"]="ڤ",e["ﭭ"]="ڤ",e["ﭮ"]="ڦ",e["ﭯ"]="ڦ",e["ﭰ"]="ڦ",e["ﭱ"]="ڦ",e["ﭲ"]="ڄ",e["ﭳ"]="ڄ",e["ﭴ"]="ڄ",e["ﭵ"]="ڄ",e["ﭶ"]="ڃ",e["ﭷ"]="ڃ",e["ﭸ"]="ڃ",e["ﭹ"]="ڃ",e["ﭺ"]="چ",e["ﭻ"]="چ",e["ﭼ"]="چ",e["ﭽ"]="چ",e["ﭾ"]="ڇ",e["ﭿ"]="ڇ",e["ﮀ"]="ڇ",e["ﮁ"]="ڇ",e["ﮂ"]="ڍ",e["ﮃ"]="ڍ",e["ﮄ"]="ڌ",e["ﮅ"]="ڌ"
e["ﮆ"]="ڎ",e["ﮇ"]="ڎ",e["ﮈ"]="ڈ",e["ﮉ"]="ڈ",e["ﮊ"]="ژ",e["ﮋ"]="ژ",e["ﮌ"]="ڑ",e["ﮍ"]="ڑ",e["ﮎ"]="ک",e["ﮏ"]="ک",e["ﮐ"]="ک",e["ﮑ"]="ک",e["ﮒ"]="گ",e["ﮓ"]="گ",e["ﮔ"]="گ",e["ﮕ"]="گ",e["ﮖ"]="ڳ",e["ﮗ"]="ڳ",e["ﮘ"]="ڳ",e["ﮙ"]="ڳ",e["ﮚ"]="ڱ",e["ﮛ"]="ڱ",e["ﮜ"]="ڱ",e["ﮝ"]="ڱ",e["ﮞ"]="ں",e["ﮟ"]="ں",e["ﮠ"]="ڻ",e["ﮡ"]="ڻ",e["ﮢ"]="ڻ",e["ﮣ"]="ڻ"
e["ﮤ"]="ۀ",e["ﮥ"]="ۀ",e["ﮦ"]="ہ",e["ﮧ"]="ہ",e["ﮨ"]="ہ",e["ﮩ"]="ہ",e["ﮪ"]="ھ",e["ﮫ"]="ھ",e["ﮬ"]="ھ",e["ﮭ"]="ھ",e["ﮮ"]="ے",e["ﮯ"]="ے",e["ﮰ"]="ۓ",e["ﮱ"]="ۓ",e["ﯓ"]="ڭ",e["ﯔ"]="ڭ",e["ﯕ"]="ڭ",e["ﯖ"]="ڭ",e["ﯗ"]="ۇ",e["ﯘ"]="ۇ",e["ﯙ"]="ۆ",e["ﯚ"]="ۆ",e["ﯛ"]="ۈ",e["ﯜ"]="ۈ",e["ﯝ"]="ٷ",e["ﯞ"]="ۋ",e["ﯟ"]="ۋ",e["ﯠ"]="ۅ",e["ﯡ"]="ۅ",e["ﯢ"]="ۉ"
e["ﯣ"]="ۉ",e["ﯤ"]="ې",e["ﯥ"]="ې",e["ﯦ"]="ې",e["ﯧ"]="ې",e["ﯨ"]="ى",e["ﯩ"]="ى",e["ﯪ"]="ئا",e["ﯫ"]="ئا",e["ﯬ"]="ئە",e["ﯭ"]="ئە",e["ﯮ"]="ئو",e["ﯯ"]="ئو",e["ﯰ"]="ئۇ",e["ﯱ"]="ئۇ",e["ﯲ"]="ئۆ",e["ﯳ"]="ئۆ",e["ﯴ"]="ئۈ",e["ﯵ"]="ئۈ",e["ﯶ"]="ئې",e["ﯷ"]="ئې",e["ﯸ"]="ئې",e["ﯹ"]="ئى",e["ﯺ"]="ئى",e["ﯻ"]="ئى",e["ﯼ"]="ی",e["ﯽ"]="ی",e["ﯾ"]="ی",e["ﯿ"]="ی",e["ﰀ"]="ئج"
e["ﰁ"]="ئح",e["ﰂ"]="ئم",e["ﰃ"]="ئى",e["ﰄ"]="ئي",e["ﰅ"]="بج",e["ﰆ"]="بح",e["ﰇ"]="بخ",e["ﰈ"]="بم",e["ﰉ"]="بى",e["ﰊ"]="بي",e["ﰋ"]="تج",e["ﰌ"]="تح",e["ﰍ"]="تخ",e["ﰎ"]="تم",e["ﰏ"]="تى",e["ﰐ"]="تي",e["ﰑ"]="ثج",e["ﰒ"]="ثم",e["ﰓ"]="ثى",e["ﰔ"]="ثي",e["ﰕ"]="جح",e["ﰖ"]="جم",e["ﰗ"]="حج",e["ﰘ"]="حم",e["ﰙ"]="خج",e["ﰚ"]="خح",e["ﰛ"]="خم",e["ﰜ"]="سج",e["ﰝ"]="سح",e["ﰞ"]="سخ"
e["ﰟ"]="سم",e["ﰠ"]="صح",e["ﰡ"]="صم",e["ﰢ"]="ضج",e["ﰣ"]="ضح",e["ﰤ"]="ضخ",e["ﰥ"]="ضم",e["ﰦ"]="طح",e["ﰧ"]="طم",e["ﰨ"]="ظم",e["ﰩ"]="عج",e["ﰪ"]="عم",e["ﰫ"]="غج",e["ﰬ"]="غم",e["ﰭ"]="فج",e["ﰮ"]="فح",e["ﰯ"]="فخ",e["ﰰ"]="فم",e["ﰱ"]="فى",e["ﰲ"]="في",e["ﰳ"]="قح",e["ﰴ"]="قم",e["ﰵ"]="قى",e["ﰶ"]="قي",e["ﰷ"]="كا",e["ﰸ"]="كج",e["ﰹ"]="كح",e["ﰺ"]="كخ",e["ﰻ"]="كل",e["ﰼ"]="كم"
e["ﰽ"]="كى",e["ﰾ"]="كي",e["ﰿ"]="لج",e["ﱀ"]="لح",e["ﱁ"]="لخ",e["ﱂ"]="لم",e["ﱃ"]="لى",e["ﱄ"]="لي",e["ﱅ"]="مج",e["ﱆ"]="مح",e["ﱇ"]="مخ",e["ﱈ"]="مم",e["ﱉ"]="مى",e["ﱊ"]="مي",e["ﱋ"]="نج",e["ﱌ"]="نح",e["ﱍ"]="نخ",e["ﱎ"]="نم",e["ﱏ"]="نى",e["ﱐ"]="ني",e["ﱑ"]="هج",e["ﱒ"]="هم",e["ﱓ"]="هى",e["ﱔ"]="هي",e["ﱕ"]="يج",e["ﱖ"]="يح",e["ﱗ"]="يخ",e["ﱘ"]="يم",e["ﱙ"]="يى",e["ﱚ"]="يي"
e["ﱛ"]="ذٰ",e["ﱜ"]="رٰ",e["ﱝ"]="ىٰ",e["ﱞ"]=" ٌّ",e["ﱟ"]=" ٍّ",e["ﱠ"]=" َّ",e["ﱡ"]=" ُّ",e["ﱢ"]=" ِّ",e["ﱣ"]=" ّٰ",e["ﱤ"]="ئر",e["ﱥ"]="ئز",e["ﱦ"]="ئم",e["ﱧ"]="ئن",e["ﱨ"]="ئى",e["ﱩ"]="ئي",e["ﱪ"]="بر",e["ﱫ"]="بز",e["ﱬ"]="بم",e["ﱭ"]="بن",e["ﱮ"]="بى",e["ﱯ"]="بي",e["ﱰ"]="تر",e["ﱱ"]="تز",e["ﱲ"]="تم",e["ﱳ"]="تن",e["ﱴ"]="تى",e["ﱵ"]="تي",e["ﱶ"]="ثر",e["ﱷ"]="ثز",e["ﱸ"]="ثم"
e["ﱹ"]="ثن",e["ﱺ"]="ثى",e["ﱻ"]="ثي",e["ﱼ"]="فى",e["ﱽ"]="في",e["ﱾ"]="قى",e["ﱿ"]="قي",e["ﲀ"]="كا",e["ﲁ"]="كل",e["ﲂ"]="كم",e["ﲃ"]="كى",e["ﲄ"]="كي",e["ﲅ"]="لم",e["ﲆ"]="لى",e["ﲇ"]="لي",e["ﲈ"]="ما",e["ﲉ"]="مم",e["ﲊ"]="نر",e["ﲋ"]="نز",e["ﲌ"]="نم",e["ﲍ"]="نن",e["ﲎ"]="نى",e["ﲏ"]="ني",e["ﲐ"]="ىٰ",e["ﲑ"]="ير",e["ﲒ"]="يز",e["ﲓ"]="يم",e["ﲔ"]="ين",e["ﲕ"]="يى",e["ﲖ"]="يي"
e["ﲗ"]="ئج",e["ﲘ"]="ئح",e["ﲙ"]="ئخ",e["ﲚ"]="ئم",e["ﲛ"]="ئه",e["ﲜ"]="بج",e["ﲝ"]="بح",e["ﲞ"]="بخ",e["ﲟ"]="بم",e["ﲠ"]="به",e["ﲡ"]="تج",e["ﲢ"]="تح",e["ﲣ"]="تخ",e["ﲤ"]="تم",e["ﲥ"]="ته",e["ﲦ"]="ثم",e["ﲧ"]="جح",e["ﲨ"]="جم",e["ﲩ"]="حج",e["ﲪ"]="حم",e["ﲫ"]="خج",e["ﲬ"]="خم",e["ﲭ"]="سج",e["ﲮ"]="سح",e["ﲯ"]="سخ",e["ﲰ"]="سم",e["ﲱ"]="صح",e["ﲲ"]="صخ",e["ﲳ"]="صم",e["ﲴ"]="ضج"
e["ﲵ"]="ضح",e["ﲶ"]="ضخ",e["ﲷ"]="ضم",e["ﲸ"]="طح",e["ﲹ"]="ظم",e["ﲺ"]="عج",e["ﲻ"]="عم",e["ﲼ"]="غج",e["ﲽ"]="غم",e["ﲾ"]="فج",e["ﲿ"]="فح",e["ﳀ"]="فخ",e["ﳁ"]="فم",e["ﳂ"]="قح",e["ﳃ"]="قم",e["ﳄ"]="كج",e["ﳅ"]="كح",e["ﳆ"]="كخ",e["ﳇ"]="كل",e["ﳈ"]="كم",e["ﳉ"]="لج",e["ﳊ"]="لح",e["ﳋ"]="لخ",e["ﳌ"]="لم",e["ﳍ"]="له",e["ﳎ"]="مج",e["ﳏ"]="مح",e["ﳐ"]="مخ",e["ﳑ"]="مم",e["ﳒ"]="نج"
e["ﳓ"]="نح",e["ﳔ"]="نخ",e["ﳕ"]="نم",e["ﳖ"]="نه",e["ﳗ"]="هج",e["ﳘ"]="هم",e["ﳙ"]="هٰ",e["ﳚ"]="يج",e["ﳛ"]="يح",e["ﳜ"]="يخ",e["ﳝ"]="يم",e["ﳞ"]="يه",e["ﳟ"]="ئم",e["ﳠ"]="ئه",e["ﳡ"]="بم",e["ﳢ"]="به",e["ﳣ"]="تم",e["ﳤ"]="ته",e["ﳥ"]="ثم",e["ﳦ"]="ثه",e["ﳧ"]="سم",e["ﳨ"]="سه",e["ﳩ"]="شم",e["ﳪ"]="شه",e["ﳫ"]="كل",e["ﳬ"]="كم",e["ﳭ"]="لم",e["ﳮ"]="نم",e["ﳯ"]="نه",e["ﳰ"]="يم"
e["ﳱ"]="يه",e["ﳲ"]="ـَّ",e["ﳳ"]="ـُّ",e["ﳴ"]="ـِّ",e["ﳵ"]="طى",e["ﳶ"]="طي",e["ﳷ"]="عى",e["ﳸ"]="عي",e["ﳹ"]="غى",e["ﳺ"]="غي",e["ﳻ"]="سى",e["ﳼ"]="سي",e["ﳽ"]="شى",e["ﳾ"]="شي",e["ﳿ"]="حى",e["ﴀ"]="حي",e["ﴁ"]="جى",e["ﴂ"]="جي",e["ﴃ"]="خى",e["ﴄ"]="خي",e["ﴅ"]="صى",e["ﴆ"]="صي",e["ﴇ"]="ضى",e["ﴈ"]="ضي",e["ﴉ"]="شج",e["ﴊ"]="شح",e["ﴋ"]="شخ",e["ﴌ"]="شم",e["ﴍ"]="شر",e["ﴎ"]="سر"
e["ﴏ"]="صر",e["ﴐ"]="ضر",e["ﴑ"]="طى",e["ﴒ"]="طي",e["ﴓ"]="عى",e["ﴔ"]="عي",e["ﴕ"]="غى",e["ﴖ"]="غي",e["ﴗ"]="سى",e["ﴘ"]="سي",e["ﴙ"]="شى",e["ﴚ"]="شي",e["ﴛ"]="حى",e["ﴜ"]="حي",e["ﴝ"]="جى",e["ﴞ"]="جي",e["ﴟ"]="خى",e["ﴠ"]="خي",e["ﴡ"]="صى",e["ﴢ"]="صي",e["ﴣ"]="ضى",e["ﴤ"]="ضي",e["ﴥ"]="شج",e["ﴦ"]="شح",e["ﴧ"]="شخ",e["ﴨ"]="شم",e["ﴩ"]="شر",e["ﴪ"]="سر",e["ﴫ"]="صر",e["ﴬ"]="ضر"
e["ﴭ"]="شج",e["ﴮ"]="شح",e["ﴯ"]="شخ",e["ﴰ"]="شم",e["ﴱ"]="سه",e["ﴲ"]="شه",e["ﴳ"]="طم",e["ﴴ"]="سج",e["ﴵ"]="سح",e["ﴶ"]="سخ",e["ﴷ"]="شج",e["ﴸ"]="شح",e["ﴹ"]="شخ",e["ﴺ"]="طم",e["ﴻ"]="ظم",e["ﴼ"]="اً",e["ﴽ"]="اً",e["ﵐ"]="تجم",e["ﵑ"]="تحج",e["ﵒ"]="تحج",e["ﵓ"]="تحم",e["ﵔ"]="تخم",e["ﵕ"]="تمج",e["ﵖ"]="تمح",e["ﵗ"]="تمخ",e["ﵘ"]="جمح",e["ﵙ"]="جمح",e["ﵚ"]="حمي",e["ﵛ"]="حمى",e["ﵜ"]="سحج"
e["ﵝ"]="سجح",e["ﵞ"]="سجى",e["ﵟ"]="سمح",e["ﵠ"]="سمح",e["ﵡ"]="سمج",e["ﵢ"]="سمم",e["ﵣ"]="سمم",e["ﵤ"]="صحح",e["ﵥ"]="صحح",e["ﵦ"]="صمم",e["ﵧ"]="شحم",e["ﵨ"]="شحم",e["ﵩ"]="شجي",e["ﵪ"]="شمخ",e["ﵫ"]="شمخ",e["ﵬ"]="شمم",e["ﵭ"]="شمم",e["ﵮ"]="ضحى",e["ﵯ"]="ضخم",e["ﵰ"]="ضخم",e["ﵱ"]="طمح",e["ﵲ"]="طمح",e["ﵳ"]="طمم",e["ﵴ"]="طمي",e["ﵵ"]="عجم",e["ﵶ"]="عمم",e["ﵷ"]="عمم",e["ﵸ"]="عمى",e["ﵹ"]="غمم",e["ﵺ"]="غمي"
e["ﵻ"]="غمى",e["ﵼ"]="فخم",e["ﵽ"]="فخم",e["ﵾ"]="قمح",e["ﵿ"]="قمم",e["ﶀ"]="لحم",e["ﶁ"]="لحي",e["ﶂ"]="لحى",e["ﶃ"]="لجج",e["ﶄ"]="لجج",e["ﶅ"]="لخم",e["ﶆ"]="لخم",e["ﶇ"]="لمح",e["ﶈ"]="لمح",e["ﶉ"]="محج",e["ﶊ"]="محم",e["ﶋ"]="محي",e["ﶌ"]="مجح",e["ﶍ"]="مجم",e["ﶎ"]="مخج",e["ﶏ"]="مخم",e["ﶒ"]="مجخ",e["ﶓ"]="همج",e["ﶔ"]="همم",e["ﶕ"]="نحم",e["ﶖ"]="نحى",e["ﶗ"]="نجم",e["ﶘ"]="نجم",e["ﶙ"]="نجى",e["ﶚ"]="نمي"
e["ﶛ"]="نمى",e["ﶜ"]="يمم",e["ﶝ"]="يمم",e["ﶞ"]="بخي",e["ﶟ"]="تجي",e["ﶠ"]="تجى",e["ﶡ"]="تخي",e["ﶢ"]="تخى",e["ﶣ"]="تمي",e["ﶤ"]="تمى",e["ﶥ"]="جمي",e["ﶦ"]="جحى",e["ﶧ"]="جمى",e["ﶨ"]="سخى",e["ﶩ"]="صحي",e["ﶪ"]="شحي",e["ﶫ"]="ضحي",e["ﶬ"]="لجي",e["ﶭ"]="لمي",e["ﶮ"]="يحي",e["ﶯ"]="يجي",e["ﶰ"]="يمي",e["ﶱ"]="ممي",e["ﶲ"]="قمي",e["ﶳ"]="نحي",e["ﶴ"]="قمح",e["ﶵ"]="لحم",e["ﶶ"]="عمي",e["ﶷ"]="كمي",e["ﶸ"]="نجح"
e["ﶹ"]="مخي",e["ﶺ"]="لجم",e["ﶻ"]="كمم",e["ﶼ"]="لجم",e["ﶽ"]="نجح",e["ﶾ"]="جحي",e["ﶿ"]="حجي",e["ﷀ"]="مجي",e["ﷁ"]="فمي",e["ﷂ"]="بحي",e["ﷃ"]="كمم",e["ﷄ"]="عجم",e["ﷅ"]="صمم",e["ﷆ"]="سخي",e["ﷇ"]="نجي",e["﹉"]="‾",e["﹊"]="‾",e["﹋"]="‾",e["﹌"]="‾",e["﹍"]="_",e["﹎"]="_",e["﹏"]="_",e["ﺀ"]="ء",e["ﺁ"]="آ",e["ﺂ"]="آ",e["ﺃ"]="أ",e["ﺄ"]="أ",e["ﺅ"]="ؤ",e["ﺆ"]="ؤ",e["ﺇ"]="إ"
e["ﺈ"]="إ",e["ﺉ"]="ئ",e["ﺊ"]="ئ",e["ﺋ"]="ئ",e["ﺌ"]="ئ",e["ﺍ"]="ا",e["ﺎ"]="ا",e["ﺏ"]="ب",e["ﺐ"]="ب",e["ﺑ"]="ب",e["ﺒ"]="ب",e["ﺓ"]="ة",e["ﺔ"]="ة",e["ﺕ"]="ت",e["ﺖ"]="ت",e["ﺗ"]="ت",e["ﺘ"]="ت",e["ﺙ"]="ث",e["ﺚ"]="ث",e["ﺛ"]="ث",e["ﺜ"]="ث",e["ﺝ"]="ج",e["ﺞ"]="ج",e["ﺟ"]="ج",e["ﺠ"]="ج",e["ﺡ"]="ح",e["ﺢ"]="ح",e["ﺣ"]="ح",e["ﺤ"]="ح",e["ﺥ"]="خ"
e["ﺦ"]="خ",e["ﺧ"]="خ",e["ﺨ"]="خ",e["ﺩ"]="د",e["ﺪ"]="د",e["ﺫ"]="ذ",e["ﺬ"]="ذ",e["ﺭ"]="ر",e["ﺮ"]="ر",e["ﺯ"]="ز",e["ﺰ"]="ز",e["ﺱ"]="س",e["ﺲ"]="س",e["ﺳ"]="س",e["ﺴ"]="س",e["ﺵ"]="ش",e["ﺶ"]="ش",e["ﺷ"]="ش",e["ﺸ"]="ش",e["ﺹ"]="ص",e["ﺺ"]="ص",e["ﺻ"]="ص",e["ﺼ"]="ص",e["ﺽ"]="ض",e["ﺾ"]="ض",e["ﺿ"]="ض",e["ﻀ"]="ض",e["ﻁ"]="ط",e["ﻂ"]="ط",e["ﻃ"]="ط"
e["ﻄ"]="ط",e["ﻅ"]="ظ",e["ﻆ"]="ظ",e["ﻇ"]="ظ",e["ﻈ"]="ظ",e["ﻉ"]="ع",e["ﻊ"]="ع",e["ﻋ"]="ع",e["ﻌ"]="ع",e["ﻍ"]="غ",e["ﻎ"]="غ",e["ﻏ"]="غ",e["ﻐ"]="غ",e["ﻑ"]="ف",e["ﻒ"]="ف",e["ﻓ"]="ف",e["ﻔ"]="ف",e["ﻕ"]="ق",e["ﻖ"]="ق",e["ﻗ"]="ق",e["ﻘ"]="ق",e["ﻙ"]="ك",e["ﻚ"]="ك",e["ﻛ"]="ك",e["ﻜ"]="ك",e["ﻝ"]="ل",e["ﻞ"]="ل",e["ﻟ"]="ل",e["ﻠ"]="ل",e["ﻡ"]="م"
e["ﻢ"]="م",e["ﻣ"]="م",e["ﻤ"]="م",e["ﻥ"]="ن",e["ﻦ"]="ن",e["ﻧ"]="ن",e["ﻨ"]="ن",e["ﻩ"]="ه",e["ﻪ"]="ه",e["ﻫ"]="ه",e["ﻬ"]="ه",e["ﻭ"]="و",e["ﻮ"]="و",e["ﻯ"]="ى",e["ﻰ"]="ى",e["ﻱ"]="ي",e["ﻲ"]="ي",e["ﻳ"]="ي",e["ﻴ"]="ي",e["ﻵ"]="لآ",e["ﻶ"]="لآ",e["ﻷ"]="لأ",e["ﻸ"]="لأ",e["ﻹ"]="لإ",e["ﻺ"]="لإ",e["ﻻ"]="لا",e["ﻼ"]="لا"})
t.mapSpecialUnicodeValues=function(e){return e>=65520&&e<=65535?0:e>=62976&&e<=63743?i()[e]||e:173===e?45:e},t.reverseIfRtl=function(e){var t,r,a=e.length
if(a<=1||!((t=e.charCodeAt(0))>=(r=n[13]).begin&&t<r.end||t>=(r=n[11]).begin&&t<r.end))return e
for(var i="",o=a-1;o>=0;o--)i+=e[o]
return i},t.getUnicodeRangeFor=function(e){for(var t=0,r=n.length;t<r;t++){var a=n[t]
if(e>=a.begin&&e<a.end)return t}return-1},t.getNormalizedUnicodes=o,t.getUnicodeForGlyph=function(e,t){var r=t[e]
if(void 0!==r)return r
if(!e)return-1
if("u"===e[0]){var a,i=e.length
if(7===i&&"n"===e[1]&&"i"===e[2])a=e.substring(3)
else{if(!(i>=5&&i<=7))return-1
a=e.substring(1)}if(a===a.toUpperCase()&&(r=parseInt(a,16))>=0)return r}return-1}},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.FontRendererFactory=void 0
var a=r(6),i=r(174),n=r(177),o=r(176),s=r(157)
function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}function u(e){return(u=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&function(e,t){(Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}(e,t)}function f(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function d(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function g(e,t,r){return t&&d(e.prototype,t),r&&d(e,r),e}var m=function(){function e(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}function t(e,t){return e[t]<<8|e[t+1]}function r(r,i,n){var o,s,c,l=1===t(r,i+2)?e(r,i+8):e(r,i+16),u=t(r,i+l)
if(4===u){t(r,i+l+2)
var h=t(r,i+l+6)>>1
for(s=i+l+14,o=[],c=0;c<h;c++,s+=2)o[c]={end:t(r,s)}
for(s+=2,c=0;c<h;c++,s+=2)o[c].start=t(r,s)
for(c=0;c<h;c++,s+=2)o[c].idDelta=t(r,s)
for(c=0;c<h;c++,s+=2){var f=t(r,s)
if(0!==f){o[c].ids=[]
for(var d=0,g=o[c].end-o[c].start+1;d<g;d++)o[c].ids[d]=t(r,s+f),f+=2}}return o}if(12===u){e(r,i+l+4)
var m=e(r,i+l+12)
for(s=i+l+16,o=[],c=0;c<m;c++)o.push({start:e(r,s),end:e(r,s+4),idDelta:e(r,s+8)-e(r,s)}),s+=12
return o}throw new a.FormatError("unsupported cmap: ".concat(u))}function c(e,t,r,a){var n=new i.CFFParser(new s.Stream(e,t,r-t),{},a).parse()
return{glyphs:n.charStrings.objects,subrs:n.topDict.privateDict&&n.topDict.privateDict.subrsIndex&&n.topDict.privateDict.subrsIndex.objects,gsubrs:n.globalSubrIndex&&n.globalSubrIndex.objects,isCFFCIDFont:n.isCIDFont,fdSelect:n.fdSelect,fdArray:n.fdArray}}function d(e,t){for(var r=t.codePointAt(0),a=0,i=0,n=e.length-1;i<n;){var o=i+n+1>>1
r<e[o].start?n=o-1:i=o}return e[i].start<=r&&r<=e[i].end&&(a=e[i].idDelta+(e[i].ids?e[i].ids[r-e[i].start]:r)&65535),{charCode:r,glyphId:a}}var m=[],p=function(){function e(t){f(this,e),this.constructor===e&&(0,a.unreachable)("Cannot initialize CompiledFont."),this.fontMatrix=t,this.compiledGlyphs=Object.create(null),this.compiledCharCodeToGlyphId=Object.create(null)}return g(e,[{key:"getPathJs",value:function(e){var t=d(this.cmap,e),r=this.compiledGlyphs[t.glyphId]
return r||(r=this.compileGlyph(this.glyphs[t.glyphId],t.glyphId),this.compiledGlyphs[t.glyphId]=r),void 0===this.compiledCharCodeToGlyphId[t.charCode]&&(this.compiledCharCodeToGlyphId[t.charCode]=t.glyphId),r}},{key:"compileGlyph",value:function(e,t){if(!e||0===e.length||14===e[0])return m
var r=this.fontMatrix
if(this.isCFFCIDFont){var i=this.fdSelect.getFDIndex(t)
i>=0&&i<this.fdArray.length?r=this.fdArray[i].getByName("FontMatrix")||a.FONT_IDENTITY_MATRIX:(0,a.warn)("Invalid fd index for glyph index.")}var n=[]
return n.push({cmd:"save"}),n.push({cmd:"transform",args:r.slice()}),n.push({cmd:"scale",args:["size","-size"]}),this.compileGlyphImpl(e,n,t),n.push({cmd:"restore"}),n}},{key:"compileGlyphImpl",value:function(){(0,a.unreachable)("Children classes should implement this.")}},{key:"hasBuiltPath",value:function(e){var t=d(this.cmap,e)
return void 0!==this.compiledGlyphs[t.glyphId]&&void 0!==this.compiledCharCodeToGlyphId[t.charCode]}}]),e}(),v=function(e){function t(e,r,a){var i
return f(this,t),(i=l(this,u(t).call(this,a||[488e-6,0,0,488e-6,0,0]))).glyphs=e,i.cmap=r,i}return h(t,p),g(t,[{key:"compileGlyphImpl",value:function(e,t){!function e(t,r,a){function i(e,t){r.push({cmd:"moveTo",args:[e,t]})}function n(e,t){r.push({cmd:"lineTo",args:[e,t]})}function o(e,t,a,i){r.push({cmd:"quadraticCurveTo",args:[e,t,a,i]})}var s,c=0,l=(t[c]<<24|t[c+1]<<16)>>16,u=0,h=0
if(c+=10,l<0)do{s=t[c]<<8|t[c+1]
var f,d,g=t[c+2]<<8|t[c+3]
c+=4,1&s?(f=(t[c]<<24|t[c+1]<<16)>>16,d=(t[c+2]<<24|t[c+3]<<16)>>16,c+=4):(f=t[c++],d=t[c++]),2&s?(u=f,h=d):(u=0,h=0)
var m=1,p=1,v=0,b=0
8&s?(m=p=(t[c]<<24|t[c+1]<<16)/1073741824,c+=2):64&s?(m=(t[c]<<24|t[c+1]<<16)/1073741824,p=(t[c+2]<<24|t[c+3]<<16)/1073741824,c+=4):128&s&&(m=(t[c]<<24|t[c+1]<<16)/1073741824,v=(t[c+2]<<24|t[c+3]<<16)/1073741824,b=(t[c+4]<<24|t[c+5]<<16)/1073741824,p=(t[c+6]<<24|t[c+7]<<16)/1073741824,c+=8)
var y=a.glyphs[g]
y&&(r.push({cmd:"save"}),r.push({cmd:"transform",args:[m,v,b,p,u,h]}),e(y,r,a),r.push({cmd:"restore"}))}while(32&s)
else{var w,k,S=[]
for(w=0;w<l;w++)S.push(t[c]<<8|t[c+1]),c+=2
c+=2+(t[c]<<8|t[c+1])
for(var C=S[S.length-1]+1,x=[];x.length<C;){var A=1
for(8&(s=t[c++])&&(A+=t[c++]);A-- >0;)x.push({flags:s})}for(w=0;w<C;w++){switch(18&x[w].flags){case 0:u+=(t[c]<<24|t[c+1]<<16)>>16,c+=2
break
case 2:u-=t[c++]
break
case 18:u+=t[c++]}x[w].x=u}for(w=0;w<C;w++){switch(36&x[w].flags){case 0:h+=(t[c]<<24|t[c+1]<<16)>>16,c+=2
break
case 4:h-=t[c++]
break
case 36:h+=t[c++]}x[w].y=h}var _=0
for(c=0;c<l;c++){var P=S[c],I=x.slice(_,P+1)
if(1&I[0].flags)I.push(I[0])
else if(1&I[I.length-1].flags)I.unshift(I[I.length-1])
else{var O={flags:1,x:(I[0].x+I[I.length-1].x)/2,y:(I[0].y+I[I.length-1].y)/2}
I.unshift(O),I.push(O)}for(i(I[0].x,I[0].y),w=1,k=I.length;w<k;w++)1&I[w].flags?n(I[w].x,I[w].y):1&I[w+1].flags?(o(I[w].x,I[w].y,I[w+1].x,I[w+1].y),w++):o(I[w].x,I[w].y,(I[w].x+I[w+1].x)/2,(I[w].y+I[w+1].y)/2)
_=P+1}}}(e,t,this)}}]),t}(),b=function(e){function t(e,r,a,i){var o
return f(this,t),(o=l(this,u(t).call(this,a||[.001,0,0,.001,0,0]))).glyphs=e.glyphs,o.gsubrs=e.gsubrs||[],o.subrs=e.subrs||[],o.cmap=r,o.glyphNameMap=i||(0,n.getGlyphsUnicode)(),o.gsubrsBias=o.gsubrs.length<1240?107:o.gsubrs.length<33900?1131:32768,o.subrsBias=o.subrs.length<1240?107:o.subrs.length<33900?1131:32768,o.isCFFCIDFont=e.isCFFCIDFont,o.fdSelect=e.fdSelect,o.fdArray=e.fdArray,o}return h(t,p),g(t,[{key:"compileGlyphImpl",value:function(e,t,r){!function e(t,r,i,n){var s=[],c=0,l=0,u=0
function h(e,t){r.push({cmd:"moveTo",args:[e,t]})}function f(e,t){r.push({cmd:"lineTo",args:[e,t]})}function g(e,t,a,i,n,o){r.push({cmd:"bezierCurveTo",args:[e,t,a,i,n,o]})}!function t(m){for(var p=0;p<m.length;){var v,b,y,w,k,S,C,x,A=!1,_=m[p++]
switch(_){case 1:case 3:u+=s.length>>1,A=!0
break
case 4:l+=s.pop(),h(c,l),A=!0
break
case 5:for(;s.length>0;)c+=s.shift(),l+=s.shift(),f(c,l)
break
case 6:for(;s.length>0&&(f(c+=s.shift(),l),0!==s.length);)l+=s.shift(),f(c,l)
break
case 7:for(;s.length>0&&(l+=s.shift(),f(c,l),0!==s.length);)f(c+=s.shift(),l)
break
case 8:for(;s.length>0;)v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l)
break
case 10:if(C=s.pop(),x=null,i.isCFFCIDFont){var P=i.fdSelect.getFDIndex(n)
if(P>=0&&P<i.fdArray.length){var I=i.fdArray[P],O=void 0
if(I.privateDict&&I.privateDict.subrsIndex&&(O=I.privateDict.subrsIndex.objects),O){var E=O.length
x=O[C+=E<1240?107:E<33900?1131:32768]}}else(0,a.warn)("Invalid fd index for glyph index.")}else x=i.subrs[C+i.subrsBias]
x&&t(x)
break
case 11:return
case 12:switch(_=m[p++]){case 34:b=(v=c+s.shift())+s.shift(),k=l+s.shift(),c=b+s.shift(),g(v,l,b,k,c,k),b=(v=c+s.shift())+s.shift(),c=b+s.shift(),g(v,k,b,l,c,l)
break
case 35:v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l),v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l),s.pop()
break
case 36:g(v=c+s.shift(),k=l+s.shift(),b=v+s.shift(),S=k+s.shift(),c=b+s.shift(),S),g(v=c+s.shift(),S,b=v+s.shift(),S+s.shift(),c=b+s.shift(),l)
break
case 37:var T=c,F=l
v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l),v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b,l=w,Math.abs(c-T)>Math.abs(l-F)?c+=s.shift():l+=s.shift(),g(v,y,b,w,c,l)
break
default:throw new a.FormatError("unknown operator: 12 ".concat(_))}break
case 14:if(s.length>=4){var R=s.pop(),B=s.pop()
l=s.pop(),c=s.pop(),r.push({cmd:"save"}),r.push({cmd:"translate",args:[c,l]})
var D=d(i.cmap,String.fromCharCode(i.glyphNameMap[o.StandardEncoding[R]]))
e(i.glyphs[D.glyphId],r,i,D.glyphId),r.push({cmd:"restore"}),D=d(i.cmap,String.fromCharCode(i.glyphNameMap[o.StandardEncoding[B]])),e(i.glyphs[D.glyphId],r,i,D.glyphId)}return
case 18:u+=s.length>>1,A=!0
break
case 19:case 20:p+=(u+=s.length>>1)+7>>3,A=!0
break
case 21:l+=s.pop(),h(c+=s.pop(),l),A=!0
break
case 22:h(c+=s.pop(),l),A=!0
break
case 23:u+=s.length>>1,A=!0
break
case 24:for(;s.length>2;)v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l)
c+=s.shift(),l+=s.shift(),f(c,l)
break
case 25:for(;s.length>6;)c+=s.shift(),l+=s.shift(),f(c,l)
v=c+s.shift(),y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+s.shift(),g(v,y,b,w,c,l)
break
case 26:for(s.length%2&&(c+=s.shift());s.length>0;)v=c,y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b,l=w+s.shift(),g(v,y,b,w,c,l)
break
case 27:for(s.length%2&&(l+=s.shift());s.length>0;)g(v=c+s.shift(),y=l,b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w)
break
case 28:s.push((m[p]<<24|m[p+1]<<16)>>16),p+=2
break
case 29:C=s.pop()+i.gsubrsBias,(x=i.gsubrs[C])&&t(x)
break
case 30:for(;s.length>0&&(v=c,y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+(1===s.length?s.shift():0),g(v,y,b,w,c,l),0!==s.length);)v=c+s.shift(),y=l,b=v+s.shift(),w=y+s.shift(),l=w+s.shift(),g(v,y,b,w,c=b+(1===s.length?s.shift():0),l)
break
case 31:for(;s.length>0&&(v=c+s.shift(),y=l,b=v+s.shift(),w=y+s.shift(),l=w+s.shift(),g(v,y,b,w,c=b+(1===s.length?s.shift():0),l),0!==s.length);)v=c,y=l+s.shift(),b=v+s.shift(),w=y+s.shift(),c=b+s.shift(),l=w+(1===s.length?s.shift():0),g(v,y,b,w,c,l)
break
default:if(_<32)throw new a.FormatError("unknown operator: ".concat(_))
_<247?s.push(_-139):_<251?s.push(256*(_-247)+m[p++]+108):_<255?s.push(256*-(_-251)-m[p++]-108):(s.push((m[p]<<24|m[p+1]<<16|m[p+2]<<8|m[p+3])/65536),p+=4)}A&&(s.length=0)}}(t)}(e,t,this,r)}}]),t}()
return{create:function(i,n){for(var o,s,l,u,h,f,d=new Uint8Array(i.data),g=t(d,4),m=0,p=12;m<g;m++,p+=16){var y=(0,a.bytesToString)(d.subarray(p,p+4)),w=e(d,p+8),k=e(d,p+12)
switch(y){case"cmap":o=r(d,w)
break
case"glyf":s=d.subarray(w,w+k)
break
case"loca":l=d.subarray(w,w+k)
break
case"head":f=t(d,w+18),h=t(d,w+50)
break
case"CFF ":u=c(d,w,w+k,n)}}if(s){var S=f?[1/f,0,0,1/f,0,0]:i.fontMatrix
return new v(function(e,t,r){var a,i
h?(a=4,i=function(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}):(a=2,i=function(e,t){return e[t]<<9|e[t+1]<<1})
for(var n=[],o=i(t,0),s=a;s<t.length;s+=a){var c=i(t,s)
n.push(e.subarray(o,c)),o=c}return n}(s,l),o,S)}return new b(u,o,i.fontMatrix,i.glyphNameMap)}}}()
t.FontRendererFactory=m},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.Type1Parser=void 0
var a=r(6),i=r(176),n=r(157),o=function(){var e=[4],t=[5],r=[6],i=[7],n=[8],o=[12,35],s=[14],c=[21],l=[22],u=[30],h=[31]
function f(){this.width=0,this.lsb=0,this.flexing=!1,this.output=[],this.stack=[]}return f.prototype={convert:function(f,d,g){for(var m,p,v,b=f.length,y=!1,w=0;w<b;w++){var k=f[w]
if(k<32){switch(12===k&&(k=(k<<8)+f[++w]),k){case 1:case 3:this.stack=[]
break
case 4:if(this.flexing){if(this.stack.length<1){y=!0
break}var S=this.stack.pop()
this.stack.push(0,S)
break}y=this.executeCommand(1,e)
break
case 5:y=this.executeCommand(2,t)
break
case 6:y=this.executeCommand(1,r)
break
case 7:y=this.executeCommand(1,i)
break
case 8:y=this.executeCommand(6,n)
break
case 9:this.stack=[]
break
case 10:if(this.stack.length<1){y=!0
break}if(!d[v=this.stack.pop()]){y=!0
break}y=this.convert(d[v],d,g)
break
case 11:return y
case 13:if(this.stack.length<2){y=!0
break}m=this.stack.pop(),p=this.stack.pop(),this.lsb=p,this.width=m,this.stack.push(m,p),y=this.executeCommand(2,l)
break
case 14:this.output.push(s[0])
break
case 21:if(this.flexing)break
y=this.executeCommand(2,c)
break
case 22:if(this.flexing){this.stack.push(0)
break}y=this.executeCommand(1,l)
break
case 30:y=this.executeCommand(4,u)
break
case 31:y=this.executeCommand(4,h)
break
case 3072:case 3073:case 3074:this.stack=[]
break
case 3078:g?(this.seac=this.stack.splice(-4,4),y=this.executeCommand(0,s)):y=this.executeCommand(4,s)
break
case 3079:if(this.stack.length<4){y=!0
break}this.stack.pop(),m=this.stack.pop()
var C=this.stack.pop()
p=this.stack.pop(),this.lsb=p,this.width=m,this.stack.push(m,p,C),y=this.executeCommand(3,c)
break
case 3084:if(this.stack.length<2){y=!0
break}var x=this.stack.pop(),A=this.stack.pop()
this.stack.push(A/x)
break
case 3088:if(this.stack.length<2){y=!0
break}v=this.stack.pop()
var _=this.stack.pop()
if(0===v&&3===_){var P=this.stack.splice(this.stack.length-17,17)
this.stack.push(P[2]+P[0],P[3]+P[1],P[4],P[5],P[6],P[7],P[8],P[9],P[10],P[11],P[12],P[13],P[14]),y=this.executeCommand(13,o,!0),this.flexing=!1,this.stack.push(P[15],P[16])}else 1===v&&0===_&&(this.flexing=!0)
break
case 3089:break
case 3105:this.stack=[]
break
default:(0,a.warn)('Unknown type 1 charstring command of "'+k+'"')}if(y)break}else k<=246?k-=139:k=k<=250?256*(k-247)+f[++w]+108:k<=254?-256*(k-251)-f[++w]-108:(255&f[++w])<<24|(255&f[++w])<<16|(255&f[++w])<<8|(255&f[++w])<<0,this.stack.push(k)}return y},executeCommand:function(e,t,r){var a=this.stack.length
if(e>a)return!0
for(var i=a-e,n=i;n<a;n++){var o=this.stack[n]
Number.isInteger(o)?this.output.push(28,o>>8&255,255&o):(o=65536*o|0,this.output.push(255,o>>24&255,o>>16&255,o>>8&255,255&o))}return this.output.push.apply(this.output,t),r?this.stack.splice(i,e):this.stack.length=0,!1}},f}(),s=function(){var e=55665
function t(e){return e>=48&&e<=57||e>=65&&e<=70||e>=97&&e<=102}function r(e,t,r){if(r>=e.length)return new Uint8Array(0)
var a,i,n=0|t
for(a=0;a<r;a++)n=52845*(e[a]+n)+22719&65535
var o=e.length-r,s=new Uint8Array(o)
for(a=r,i=0;i<o;a++,i++){var c=e[a]
s[i]=c^n>>8,n=52845*(c+n)+22719&65535}return s}function s(e){return 47===e||91===e||93===e||123===e||125===e||40===e||41===e}function c(a,i,o){if(i){var s=a.getBytes(),c=!(t(s[0])&&t(s[1])&&t(s[2])&&t(s[3]))
a=new n.Stream(c?r(s,e,4):function(e,r,a){var i,n,o=0|r,s=e.length,c=new Uint8Array(s>>>1)
for(i=0,n=0;i<s;i++){var l=e[i]
if(t(l)){i++
for(var u;i<s&&!t(u=e[i]);)i++
if(i<s){var h=parseInt(String.fromCharCode(l,u),16)
c[n++]=h^o>>8,o=52845*(h+o)+22719&65535}}}return Array.prototype.slice.call(c,4,n)}(s,e))}this.seacAnalysisEnabled=!!o,this.stream=a,this.nextChar()}return c.prototype={readNumberArray:function(){this.getToken()
for(var e=[];;){var t=this.getToken()
if(null===t||"]"===t||"}"===t)break
e.push(parseFloat(t||0))}return e},readNumber:function(){var e=this.getToken()
return parseFloat(e||0)},readInt:function(){var e=this.getToken()
return 0|parseInt(e||0,10)},readBoolean:function(){return"true"===this.getToken()?1:0},nextChar:function(){return this.currentChar=this.stream.getByte()},getToken:function(){for(var e=!1,t=this.currentChar;;){if(-1===t)return null
if(e)10!==t&&13!==t||(e=!1)
else if(37===t)e=!0
else if(!(0,a.isSpace)(t))break
t=this.nextChar()}if(s(t))return this.nextChar(),String.fromCharCode(t)
var r=""
do{r+=String.fromCharCode(t),t=this.nextChar()}while(t>=0&&!(0,a.isSpace)(t)&&!s(t))
return r},readCharStrings:function(e,t){return-1===t?e:r(e,4330,t)},extractFontProgram:function(){var e=this.stream,t=[],r=[],a=Object.create(null)
a.lenIV=4
for(var i,n,s,c,l,u={subrs:[],charstrings:[],properties:{privateData:a}};null!==(i=this.getToken());)if("/"===i)switch(i=this.getToken()){case"CharStrings":for(this.getToken(),this.getToken(),this.getToken(),this.getToken();null!==(i=this.getToken())&&"end"!==i;)if("/"===i){var h=this.getToken()
n=this.readInt(),this.getToken(),s=n>0?e.getBytes(n):new Uint8Array(0),c=u.properties.privateData.lenIV,l=this.readCharStrings(s,c),this.nextChar(),"noaccess"===(i=this.getToken())&&this.getToken(),r.push({glyph:h,encoded:l})}break
case"Subrs":for(this.readInt(),this.getToken();"dup"===this.getToken();){var f=this.readInt()
n=this.readInt(),this.getToken(),s=n>0?e.getBytes(n):new Uint8Array(0),c=u.properties.privateData.lenIV,l=this.readCharStrings(s,c),this.nextChar(),"noaccess"===(i=this.getToken())&&this.getToken(),t[f]=l}break
case"BlueValues":case"OtherBlues":case"FamilyBlues":case"FamilyOtherBlues":var d=this.readNumberArray()
d.length>0&&d.length
break
case"StemSnapH":case"StemSnapV":u.properties.privateData[i]=this.readNumberArray()
break
case"StdHW":case"StdVW":u.properties.privateData[i]=this.readNumberArray()[0]
break
case"BlueShift":case"lenIV":case"BlueFuzz":case"BlueScale":case"LanguageGroup":case"ExpansionFactor":u.properties.privateData[i]=this.readNumber()
break
case"ForceBold":u.properties.privateData[i]=this.readBoolean()}for(var g=0;g<r.length;g++){h=r[g].glyph,l=r[g].encoded
var m=new o,p=m.convert(l,t,this.seacAnalysisEnabled),v=m.output
p&&(v=[14]),u.charstrings.push({glyphName:h,charstring:v,width:m.width,lsb:m.lsb,seac:m.seac})}return u},extractFontHeader:function(e){for(var t;null!==(t=this.getToken());)if("/"===t)switch(t=this.getToken()){case"FontMatrix":var r=this.readNumberArray()
e.fontMatrix=r
break
case"Encoding":var a,n=this.getToken()
if(/^\d+$/.test(n)){a=[]
var o=0|parseInt(n,10)
this.getToken()
for(var s=0;s<o;s++){for(t=this.getToken();"dup"!==t&&"def"!==t;)if(null===(t=this.getToken()))return
if("def"===t)break
var c=this.readInt()
this.getToken()
var l=this.getToken()
a[c]=l,this.getToken()}}else a=(0,i.getEncoding)(n)
e.builtInEncoding=a
break
case"FontBBox":var u=this.readNumberArray()
e.ascent=Math.max(u[3],u[1]),e.descent=Math.min(u[1],u[3]),e.ascentScaled=!0}}},c}()
t.Type1Parser=s},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getTilingPatternIR=function(e,t,r){var i=t.getArray("Matrix"),n=a.Util.normalizeRect(t.getArray("BBox")),o=t.get("XStep"),s=t.get("YStep"),c=t.get("PaintType"),l=t.get("TilingType")
if(n[2]-n[0]==0||n[3]-n[1]==0)throw new a.FormatError("Invalid getTilingPatternIR /BBox array: [".concat(n,"]."))
return["TilingPattern",r,e,i,n,o,s,c,l]},t.Pattern=void 0
var a=r(6),i=r(168),n=r(155),o={FUNCTION_BASED:1,AXIAL:2,RADIAL:3,FREE_FORM_MESH:4,LATTICE_FORM_MESH:5,COONS_PATCH_MESH:6,TENSOR_PATCH_MESH:7},s=function(){function e(){(0,a.unreachable)("should not call Pattern constructor")}return e.prototype={getPattern:function(e){(0,a.unreachable)("Should not call Pattern.getStyle: ".concat(e))}},e.parseShading=function(e,t,r,i,s,l){var u=(0,n.isStream)(e)?e.dict:e,h=u.get("ShadingType")
try{switch(h){case o.AXIAL:case o.RADIAL:return new c.RadialAxial(u,t,r,i,l)
case o.FREE_FORM_MESH:case o.LATTICE_FORM_MESH:case o.COONS_PATCH_MESH:case o.TENSOR_PATCH_MESH:return new c.Mesh(e,t,r,i,l)
default:throw new a.FormatError("Unsupported ShadingType: "+h)}}catch(e){if(e instanceof a.MissingDataException)throw e
return s.send("UnsupportedFeature",{featureId:a.UNSUPPORTED_FEATURES.shadingPattern}),(0,a.warn)(e),new c.Dummy}},e}()
t.Pattern=s
var c={SMALL_NUMBER:1e-6}
c.RadialAxial=function(){function e(e,t,r,n,s){this.matrix=t,this.coordsArr=e.getArray("Coords"),this.shadingType=e.get("ShadingType"),this.type="Pattern"
var l=e.get("ColorSpace","CS")
l=i.ColorSpace.parse(l,r,n,s),this.cs=l
var u=0,h=1
if(e.has("Domain")){var f=e.getArray("Domain")
u=f[0],h=f[1]}var d=!1,g=!1
if(e.has("Extend")){var m=e.getArray("Extend")
d=m[0],g=m[1]}if(!(this.shadingType!==o.RADIAL||d&&g)){var p=this.coordsArr[0],v=this.coordsArr[1],b=this.coordsArr[2],y=this.coordsArr[3],w=this.coordsArr[4],k=this.coordsArr[5],S=Math.sqrt((p-y)*(p-y)+(v-w)*(v-w))
b<=k+S&&k<=b+S&&(0,a.warn)("Unsupported radial gradient.")}this.extendStart=d,this.extendEnd=g
var C=e.get("Function"),x=s.createFromArray(C),A=h-u,_=A/10,P=this.colorStops=[]
if(u>=h||_<=0)(0,a.info)("Bad shading domain.")
else{for(var I,O=new Float32Array(l.numComps),E=new Float32Array(1),T=u;T<=h;T+=_){E[0]=T,x(E,0,O,0),I=l.getRgb(O,0)
var F=a.Util.makeCssRgb(I[0],I[1],I[2])
P.push([(T-u)/A,F])}var R="transparent"
e.has("Background")&&(I=l.getRgb(e.get("Background"),0),R=a.Util.makeCssRgb(I[0],I[1],I[2])),d||(P.unshift([0,R]),P[1][0]+=c.SMALL_NUMBER),g||(P[P.length-1][0]-=c.SMALL_NUMBER,P.push([1,R])),this.colorStops=P}}return e.prototype={getIR:function(){var e,t,r,i,n,s=this.coordsArr,c=this.shadingType
c===o.AXIAL?(t=[s[0],s[1]],r=[s[2],s[3]],i=null,n=null,e="axial"):c===o.RADIAL?(t=[s[0],s[1]],r=[s[3],s[4]],i=s[2],n=s[5],e="radial"):(0,a.unreachable)("getPattern type unknown: ".concat(c))
var l=this.matrix
if(l&&(t=a.Util.applyTransform(t,l),r=a.Util.applyTransform(r,l),c===o.RADIAL)){var u=a.Util.singularValueDecompose2dScale(l)
i*=u[0],n*=u[1]}return["RadialAxial",e,this.colorStops,t,r,i,n]}},e}(),c.Mesh=function(){function e(e,t){this.stream=e,this.context=t,this.buffer=0,this.bufferLength=0
var r=t.numComps
this.tmpCompsBuf=new Float32Array(r)
var a=t.colorSpace.numComps
this.tmpCsCompsBuf=t.colorFn?new Float32Array(a):this.tmpCompsBuf}e.prototype={get hasData(){if(this.stream.end)return this.stream.pos<this.stream.end
if(this.bufferLength>0)return!0
var e=this.stream.getByte()
return!(e<0)&&(this.buffer=e,this.bufferLength=8,!0)},readBits:function(e){var t=this.buffer,r=this.bufferLength
if(32===e){if(0===r)return(this.stream.getByte()<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte())>>>0
t=t<<24|this.stream.getByte()<<16|this.stream.getByte()<<8|this.stream.getByte()
var a=this.stream.getByte()
return this.buffer=a&(1<<r)-1,(t<<8-r|(255&a)>>r)>>>0}if(8===e&&0===r)return this.stream.getByte()
for(;r<e;)t=t<<8|this.stream.getByte(),r+=8
return r-=e,this.bufferLength=r,this.buffer=t&(1<<r)-1,t>>r},align:function(){this.buffer=0,this.bufferLength=0},readFlag:function(){return this.readBits(this.context.bitsPerFlag)},readCoordinate:function(){var e=this.context.bitsPerCoordinate,t=this.readBits(e),r=this.readBits(e),a=this.context.decode,i=e<32?1/((1<<e)-1):2.3283064365386963e-10
return[t*i*(a[1]-a[0])+a[0],r*i*(a[3]-a[2])+a[2]]},readComponents:function(){for(var e=this.context.numComps,t=this.context.bitsPerComponent,r=t<32?1/((1<<t)-1):2.3283064365386963e-10,a=this.context.decode,i=this.tmpCompsBuf,n=0,o=4;n<e;n++,o+=2){var s=this.readBits(t)
i[n]=s*r*(a[o+1]-a[o])+a[o]}var c=this.tmpCsCompsBuf
return this.context.colorFn&&this.context.colorFn(i,0,c,0),this.context.colorSpace.getRgb(c,0)}}
var t=3,r=20,s=20,c=function(){var e=[]
return function(t){return e[t]||(e[t]=function(e){for(var t=[],r=0;r<=e;r++){var a=r/e,i=1-a
t.push(new Float32Array([i*i*i,3*a*i*i,3*a*a*i,a*a*a]))}return t}(t)),e[t]}}()
function l(e,i){var n=e.figures[i];(0,a.assert)("patch"===n.type,"Unexpected patch mesh figure")
var o=e.coords,l=e.colors,u=n.coords,h=n.colors,f=Math.min(o[u[0]][0],o[u[3]][0],o[u[12]][0],o[u[15]][0]),d=Math.min(o[u[0]][1],o[u[3]][1],o[u[12]][1],o[u[15]][1]),g=Math.max(o[u[0]][0],o[u[3]][0],o[u[12]][0],o[u[15]][0]),m=Math.max(o[u[0]][1],o[u[3]][1],o[u[12]][1],o[u[15]][1]),p=Math.ceil((g-f)*s/(e.bounds[2]-e.bounds[0]))
p=Math.max(t,Math.min(r,p))
var v=Math.ceil((m-d)*s/(e.bounds[3]-e.bounds[1]))
v=Math.max(t,Math.min(r,v))
for(var b=p+1,y=new Int32Array((v+1)*b),w=new Int32Array((v+1)*b),k=0,S=new Uint8Array(3),C=new Uint8Array(3),x=l[h[0]],A=l[h[1]],_=l[h[2]],P=l[h[3]],I=c(v),O=c(p),E=0;E<=v;E++){S[0]=(x[0]*(v-E)+_[0]*E)/v|0,S[1]=(x[1]*(v-E)+_[1]*E)/v|0,S[2]=(x[2]*(v-E)+_[2]*E)/v|0,C[0]=(A[0]*(v-E)+P[0]*E)/v|0,C[1]=(A[1]*(v-E)+P[1]*E)/v|0,C[2]=(A[2]*(v-E)+P[2]*E)/v|0
for(var T=0;T<=p;T++,k++)if(0!==E&&E!==v||0!==T&&T!==p){for(var F=0,R=0,B=0,D=0;D<=3;D++)for(var M=0;M<=3;M++,B++){var L=I[E][D]*O[T][M]
F+=o[u[B]][0]*L,R+=o[u[B]][1]*L}y[k]=o.length,o.push([F,R]),w[k]=l.length
var N=new Uint8Array(3)
N[0]=(S[0]*(p-T)+C[0]*T)/p|0,N[1]=(S[1]*(p-T)+C[1]*T)/p|0,N[2]=(S[2]*(p-T)+C[2]*T)/p|0,l.push(N)}}y[0]=u[0],w[0]=h[0],y[p]=u[3],w[p]=h[1],y[b*v]=u[12],w[b*v]=h[2],y[b*v+p]=u[15],w[b*v+p]=h[3],e.figures[i]={type:"lattice",coords:y,colors:w,verticesPerRow:b}}function u(e){for(var t=e.coords[0][0],r=e.coords[0][1],a=t,i=r,n=1,o=e.coords.length;n<o;n++){var s=e.coords[n][0],c=e.coords[n][1]
t=t>s?s:t,r=r>c?c:r,a=a<s?s:a,i=i<c?c:i}e.bounds=[t,r,a,i]}function h(t,r,s,c,h){if(!(0,n.isStream)(t))throw new a.FormatError("Mesh data is not a stream")
var f=t.dict
this.matrix=r,this.shadingType=f.get("ShadingType"),this.type="Pattern",this.bbox=f.getArray("BBox")
var d=f.get("ColorSpace","CS")
d=i.ColorSpace.parse(d,s,c,h),this.cs=d,this.background=f.has("Background")?d.getRgb(f.get("Background"),0):null
var g=f.get("Function"),m=g?h.createFromArray(g):null
this.coords=[],this.colors=[],this.figures=[]
var p=new e(t,{bitsPerCoordinate:f.get("BitsPerCoordinate"),bitsPerComponent:f.get("BitsPerComponent"),bitsPerFlag:f.get("BitsPerFlag"),decode:f.getArray("Decode"),colorFn:m,colorSpace:d,numComps:m?1:d.numComps}),v=!1
switch(this.shadingType){case o.FREE_FORM_MESH:!function(e,t){for(var r=e.coords,i=e.colors,n=[],o=[],s=0;t.hasData;){var c=t.readFlag(),l=t.readCoordinate(),u=t.readComponents()
if(0===s){if(!(0<=c&&c<=2))throw new a.FormatError("Unknown type4 flag")
switch(c){case 0:s=3
break
case 1:o.push(o[o.length-2],o[o.length-1]),s=1
break
case 2:o.push(o[o.length-3],o[o.length-1]),s=1}n.push(c)}o.push(r.length),r.push(l),i.push(u),s--,t.align()}e.figures.push({type:"triangles",coords:new Int32Array(o),colors:new Int32Array(o)})}(this,p)
break
case o.LATTICE_FORM_MESH:var b=0|f.get("VerticesPerRow")
if(b<2)throw new a.FormatError("Invalid VerticesPerRow")
!function(e,t,r){for(var a=e.coords,i=e.colors,n=[];t.hasData;){var o=t.readCoordinate(),s=t.readComponents()
n.push(a.length),a.push(o),i.push(s)}e.figures.push({type:"lattice",coords:new Int32Array(n),colors:new Int32Array(n),verticesPerRow:r})}(this,p,b)
break
case o.COONS_PATCH_MESH:!function(e,t){for(var r=e.coords,i=e.colors,n=new Int32Array(16),o=new Int32Array(4);t.hasData;){var s,c,l=t.readFlag()
if(!(0<=l&&l<=3))throw new a.FormatError("Unknown type6 flag")
var u=r.length
for(s=0,c=0!==l?8:12;s<c;s++)r.push(t.readCoordinate())
var h,f,d,g,m=i.length
for(s=0,c=0!==l?2:4;s<c;s++)i.push(t.readComponents())
switch(l){case 0:n[12]=u+3,n[13]=u+4,n[14]=u+5,n[15]=u+6,n[8]=u+2,n[11]=u+7,n[4]=u+1,n[7]=u+8,n[0]=u,n[1]=u+11,n[2]=u+10,n[3]=u+9,o[2]=m+1,o[3]=m+2,o[0]=m,o[1]=m+3
break
case 1:h=n[12],f=n[13],d=n[14],g=n[15],n[12]=g,n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=d,n[11]=u+3,n[4]=f,n[7]=u+4,n[0]=h,n[1]=u+7,n[2]=u+6,n[3]=u+5,h=o[2],f=o[3],o[2]=f,o[3]=m,o[0]=h,o[1]=m+1
break
case 2:h=n[15],f=n[11],n[12]=n[3],n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=n[7],n[11]=u+3,n[4]=f,n[7]=u+4,n[0]=h,n[1]=u+7,n[2]=u+6,n[3]=u+5,h=o[3],o[2]=o[1],o[3]=m,o[0]=h,o[1]=m+1
break
case 3:n[12]=n[0],n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=n[1],n[11]=u+3,n[4]=n[2],n[7]=u+4,n[0]=n[3],n[1]=u+7,n[2]=u+6,n[3]=u+5,o[2]=o[0],o[3]=m,o[0]=o[1],o[1]=m+1}n[5]=r.length,r.push([(-4*r[n[0]][0]-r[n[15]][0]+6*(r[n[4]][0]+r[n[1]][0])-2*(r[n[12]][0]+r[n[3]][0])+3*(r[n[13]][0]+r[n[7]][0]))/9,(-4*r[n[0]][1]-r[n[15]][1]+6*(r[n[4]][1]+r[n[1]][1])-2*(r[n[12]][1]+r[n[3]][1])+3*(r[n[13]][1]+r[n[7]][1]))/9]),n[6]=r.length,r.push([(-4*r[n[3]][0]-r[n[12]][0]+6*(r[n[2]][0]+r[n[7]][0])-2*(r[n[0]][0]+r[n[15]][0])+3*(r[n[4]][0]+r[n[14]][0]))/9,(-4*r[n[3]][1]-r[n[12]][1]+6*(r[n[2]][1]+r[n[7]][1])-2*(r[n[0]][1]+r[n[15]][1])+3*(r[n[4]][1]+r[n[14]][1]))/9]),n[9]=r.length,r.push([(-4*r[n[12]][0]-r[n[3]][0]+6*(r[n[8]][0]+r[n[13]][0])-2*(r[n[0]][0]+r[n[15]][0])+3*(r[n[11]][0]+r[n[1]][0]))/9,(-4*r[n[12]][1]-r[n[3]][1]+6*(r[n[8]][1]+r[n[13]][1])-2*(r[n[0]][1]+r[n[15]][1])+3*(r[n[11]][1]+r[n[1]][1]))/9]),n[10]=r.length,r.push([(-4*r[n[15]][0]-r[n[0]][0]+6*(r[n[11]][0]+r[n[14]][0])-2*(r[n[12]][0]+r[n[3]][0])+3*(r[n[2]][0]+r[n[8]][0]))/9,(-4*r[n[15]][1]-r[n[0]][1]+6*(r[n[11]][1]+r[n[14]][1])-2*(r[n[12]][1]+r[n[3]][1])+3*(r[n[2]][1]+r[n[8]][1]))/9]),e.figures.push({type:"patch",coords:new Int32Array(n),colors:new Int32Array(o)})}}(this,p),v=!0
break
case o.TENSOR_PATCH_MESH:!function(e,t){for(var r=e.coords,i=e.colors,n=new Int32Array(16),o=new Int32Array(4);t.hasData;){var s,c,l=t.readFlag()
if(!(0<=l&&l<=3))throw new a.FormatError("Unknown type7 flag")
var u=r.length
for(s=0,c=0!==l?12:16;s<c;s++)r.push(t.readCoordinate())
var h,f,d,g,m=i.length
for(s=0,c=0!==l?2:4;s<c;s++)i.push(t.readComponents())
switch(l){case 0:n[12]=u+3,n[13]=u+4,n[14]=u+5,n[15]=u+6,n[8]=u+2,n[9]=u+13,n[10]=u+14,n[11]=u+7,n[4]=u+1,n[5]=u+12,n[6]=u+15,n[7]=u+8,n[0]=u,n[1]=u+11,n[2]=u+10,n[3]=u+9,o[2]=m+1,o[3]=m+2,o[0]=m,o[1]=m+3
break
case 1:h=n[12],f=n[13],d=n[14],g=n[15],n[12]=g,n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=d,n[9]=u+9,n[10]=u+10,n[11]=u+3,n[4]=f,n[5]=u+8,n[6]=u+11,n[7]=u+4,n[0]=h,n[1]=u+7,n[2]=u+6,n[3]=u+5,h=o[2],f=o[3],o[2]=f,o[3]=m,o[0]=h,o[1]=m+1
break
case 2:h=n[15],f=n[11],n[12]=n[3],n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=n[7],n[9]=u+9,n[10]=u+10,n[11]=u+3,n[4]=f,n[5]=u+8,n[6]=u+11,n[7]=u+4,n[0]=h,n[1]=u+7,n[2]=u+6,n[3]=u+5,h=o[3],o[2]=o[1],o[3]=m,o[0]=h,o[1]=m+1
break
case 3:n[12]=n[0],n[13]=u+0,n[14]=u+1,n[15]=u+2,n[8]=n[1],n[9]=u+9,n[10]=u+10,n[11]=u+3,n[4]=n[2],n[5]=u+8,n[6]=u+11,n[7]=u+4,n[0]=n[3],n[1]=u+7,n[2]=u+6,n[3]=u+5,o[2]=o[0],o[3]=m,o[0]=o[1],o[1]=m+1}e.figures.push({type:"patch",coords:new Int32Array(n),colors:new Int32Array(o)})}}(this,p),v=!0
break
default:(0,a.unreachable)("Unsupported mesh type.")}if(v){u(this)
for(var y=0,w=this.figures.length;y<w;y++)l(this,y)}u(this),function(e){var t,r,a,i,n=e.coords,o=new Float32Array(2*n.length)
for(t=0,a=0,r=n.length;t<r;t++){var s=n[t]
o[a++]=s[0],o[a++]=s[1]}e.coords=o
var c=e.colors,l=new Uint8Array(3*c.length)
for(t=0,a=0,r=c.length;t<r;t++){var u=c[t]
l[a++]=u[0],l[a++]=u[1],l[a++]=u[2]}e.colors=l
var h=e.figures
for(t=0,r=h.length;t<r;t++){var f=h[t],d=f.coords,g=f.colors
for(a=0,i=d.length;a<i;a++)d[a]*=2,g[a]*=3}}(this)}return h.prototype={getIR:function(){return["Mesh",this.shadingType,this.coords,this.colors,this.figures,this.bounds,this.matrix,this.bbox,this.background]}},h}(),c.Dummy=function(){function e(){this.type="Pattern"}return e.prototype={getIR:function(){return["Dummy"]}},e}()},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.bidi=function(e,t,r){var g=!0,m=e.length
if(0===m||r)return h(e,g,r)
f.length=m,d.length=m
var p,v,b=0
for(p=0;p<m;++p){f[p]=e.charAt(p)
var y=e.charCodeAt(p),w="L"
y<=255?w=i[y]:1424<=y&&y<=1524?w="R":1536<=y&&y<=1791?(w=n[255&y])||(0,a.warn)("Bidi: invalid Unicode character "+y.toString(16)):1792<=y&&y<=2220&&(w="AL"),"R"!==w&&"AL"!==w&&"AN"!==w||b++,d[p]=w}if(0===b)return h(e,g=!0);-1===t&&(b/m<.3?(g=!0,t=0):(g=!1,t=1))
var k=[]
for(p=0;p<m;++p)k[p]=t
var S,C=o(t)?"R":"L",x=C,A=x,_=x
for(p=0;p<m;++p)"NSM"===d[p]?d[p]=_:_=d[p]
for(_=x,p=0;p<m;++p)"EN"===(S=d[p])?d[p]="AL"===_?"AN":"EN":"R"!==S&&"L"!==S&&"AL"!==S||(_=S)
for(p=0;p<m;++p)"AL"===(S=d[p])&&(d[p]="R")
for(p=1;p<m-1;++p)"ES"===d[p]&&"EN"===d[p-1]&&"EN"===d[p+1]&&(d[p]="EN"),"CS"!==d[p]||"EN"!==d[p-1]&&"AN"!==d[p-1]||d[p+1]!==d[p-1]||(d[p]=d[p-1])
for(p=0;p<m;++p)if("EN"===d[p]){var P
for(P=p-1;P>=0&&"ET"===d[P];--P)d[P]="EN"
for(P=p+1;P<m&&"ET"===d[P];++P)d[P]="EN"}for(p=0;p<m;++p)"WS"!==(S=d[p])&&"ES"!==S&&"ET"!==S&&"CS"!==S||(d[p]="ON")
for(_=x,p=0;p<m;++p)"EN"===(S=d[p])?d[p]="L"===_?"L":"EN":"R"!==S&&"L"!==S||(_=S)
for(p=0;p<m;++p)if("ON"===d[p]){var I=c(d,p+1,"ON"),O=x
p>0&&(O=d[p-1])
var E=A
I+1<m&&(E=d[I+1]),"L"!==O&&(O="R"),"L"!==E&&(E="R"),O===E&&l(d,p,I,O),p=I-1}for(p=0;p<m;++p)"ON"===d[p]&&(d[p]=C)
for(p=0;p<m;++p)S=d[p],s(k[p])?"R"===S?k[p]+=1:"AN"!==S&&"EN"!==S||(k[p]+=2):"L"!==S&&"AN"!==S&&"EN"!==S||(k[p]+=1)
var T,F=-1,R=99
for(p=0,v=k.length;p<v;++p)F<(T=k[p])&&(F=T),R>T&&o(T)&&(R=T)
for(T=F;T>=R;--T){var B=-1
for(p=0,v=k.length;p<v;++p)k[p]<T?B>=0&&(u(f,B,p),B=-1):B<0&&(B=p)
B>=0&&u(f,B,k.length)}for(p=0,v=f.length;p<v;++p){var D=f[p]
"<"!==D&&">"!==D||(f[p]="")}return h(f.join(""),g)}
var a=r(6),i=["BN","BN","BN","BN","BN","BN","BN","BN","BN","S","B","S","WS","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","B","B","B","S","WS","ON","ON","ET","ET","ET","ON","ON","ON","ON","ON","ES","CS","ES","CS","CS","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","CS","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","ON","ON","ON","BN","BN","BN","BN","BN","BN","B","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","BN","CS","ON","ET","ET","ET","ET","ON","ON","ON","ON","L","ON","ON","BN","ON","ON","ET","ET","EN","EN","ON","L","ON","ON","ON","EN","L","ON","ON","ON","ON","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","L","ON","L","L","L","L","L","L","L","L"],n=["AN","AN","AN","AN","AN","AN","ON","ON","AL","ET","ET","AL","CS","AL","ON","ON","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","AN","AN","AN","AN","AN","AN","AN","AN","AN","ET","AN","AN","AL","AL","AL","NSM","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","AL","NSM","NSM","NSM","NSM","NSM","NSM","NSM","AN","ON","NSM","NSM","NSM","NSM","NSM","NSM","AL","AL","NSM","NSM","ON","NSM","NSM","NSM","NSM","AL","AL","EN","EN","EN","EN","EN","EN","EN","EN","EN","EN","AL","AL","AL","AL","AL","AL"]
function o(e){return 0!=(1&e)}function s(e){return 0==(1&e)}function c(e,t,r){for(var a=t,i=e.length;a<i;++a)if(e[a]!==r)return a
return a}function l(e,t,r,a){for(var i=t;i<r;++i)e[i]=a}function u(e,t,r){for(var a=t,i=r-1;a<i;++a,--i){var n=e[a]
e[a]=e[i],e[i]=n}}function h(e,t,r){return{str:e,dir:r?"ttb":t?"ltr":"rtl"}}var f=[],d=[]},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getMetrics=void 0
var a=r(6),i=(0,a.getLookupTableFactory)(function(e){e.Courier=600,e["Courier-Bold"]=600,e["Courier-BoldOblique"]=600,e["Courier-Oblique"]=600,e.Helvetica=(0,a.getLookupTableFactory)(function(e){e.space=278,e.exclam=278,e.quotedbl=355,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=667,e.quoteright=222,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=278,e.semicolon=278,e.less=584,e.equal=584
e.greater=584,e.question=556,e.at=1015,e.A=667,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=500,e.K=667,e.L=556,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=278
e.backslash=278,e.bracketright=278,e.asciicircum=469,e.underscore=556,e.quoteleft=222,e.a=556,e.b=556,e.c=500,e.d=556,e.e=556,e.f=278,e.g=556,e.h=556,e.i=222,e.j=222,e.k=500,e.l=222,e.m=833,e.n=556,e.o=556,e.p=556,e.q=556,e.r=333,e.s=500,e.t=278,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500
e.z=500,e.braceleft=334,e.bar=260,e.braceright=334,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=191,e.quotedblleft=333,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=537,e.bullet=350,e.quotesinglbase=222,e.quotedblbase=333,e.quotedblright=333,e.guillemotright=556
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=556,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=222,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278
e.eacute=556,e.abreve=556,e.uhungarumlaut=556,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=667,e.aacute=556,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=500,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=500,e.aring=556,e.Ncommaaccent=722,e.lacute=222,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722
e.atilde=556,e.Edotaccent=667,e.scaron=500,e.scedilla=500,e.iacute=278,e.lozenge=471,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=556,e.Amacron=667,e.rcaron=333,e.ccedilla=500,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=643,e.Umacron=722,e.uring=556,e.threesuperior=333,e.Ograve=778,e.Agrave=667,e.Abreve=667,e.multiply=584,e.uacute=556,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=500,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=260,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=333,e.omacron=556,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=222,e.tcaron=317,e.eogonek=556,e.Uogonek=722,e.Aacute=667,e.Adieresis=667
e.egrave=556,e.zacute=500,e.iogonek=222,e.Oacute=778,e.oacute=556,e.amacron=556,e.sacute=500,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=333,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=556,e.Eogonek=667,e.dcroat=556,e.threequarters=834,e.Scedilla=667,e.lcaron=299,e.Kcommaaccent=667,e.Lacute=556,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=556,e.onehalf=834
e.lessequal=549,e.ocircumflex=556,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=556,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=556,e.Ccaron=722,e.ugrave=556,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=556,e.Rcommaaccent=722,e.Lcommaaccent=556,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=500
e.minus=584,e.Icircumflex=278,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=584,e.odieresis=556,e.udieresis=556,e.notequal=549,e.gcommaaccent=556,e.eth=556,e.zcaron=500,e.ncommaaccent=556,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-Bold"]=(0,a.getLookupTableFactory)(function(e){e.space=278,e.exclam=333,e.quotedbl=474,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=722,e.quoteright=278,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=333,e.semicolon=333,e.less=584,e.equal=584
e.greater=584,e.question=611,e.at=975,e.A=722,e.B=722,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=556,e.K=722,e.L=611,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=333
e.backslash=278,e.bracketright=333,e.asciicircum=584,e.underscore=556,e.quoteleft=278,e.a=556,e.b=611,e.c=556,e.d=611,e.e=556,e.f=333,e.g=611,e.h=611,e.i=278,e.j=278,e.k=556,e.l=278,e.m=889,e.n=611,e.o=611,e.p=611,e.q=611,e.r=389,e.s=556,e.t=333,e.u=611,e.v=556,e.w=778,e.x=556,e.y=556
e.z=500,e.braceleft=389,e.bar=280,e.braceright=389,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=238,e.quotedblleft=500,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=611,e.fl=611,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=556,e.bullet=350,e.quotesinglbase=278,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=556
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=611,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=278,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278
e.eacute=556,e.abreve=556,e.uhungarumlaut=611,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=722,e.aacute=556,e.Ucircumflex=722,e.yacute=556,e.scommaaccent=556,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=611,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=556,e.aring=556,e.Ncommaaccent=722,e.lacute=278,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722
e.atilde=556,e.Edotaccent=667,e.scaron=556,e.scedilla=556,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=611,e.acircumflex=556,e.Amacron=722,e.rcaron=389,e.ccedilla=556,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=743,e.Umacron=722,e.uring=611,e.threesuperior=333,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=584,e.uacute=611,e.Tcaron=611,e.partialdiff=494,e.ydieresis=556
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=556,e.nacute=611,e.umacron=611,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=280,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=611,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=389,e.eogonek=556,e.Uogonek=722,e.Aacute=722,e.Adieresis=722
e.egrave=556,e.zacute=500,e.iogonek=278,e.Oacute=778,e.oacute=611,e.amacron=556,e.sacute=556,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=611,e.twosuperior=333,e.Odieresis=778,e.mu=611,e.igrave=278,e.ohungarumlaut=611,e.Eogonek=667,e.dcroat=611,e.threequarters=834,e.Scedilla=667,e.lcaron=400,e.Kcommaaccent=722,e.Lacute=611,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=611,e.onehalf=834
e.lessequal=549,e.ocircumflex=611,e.ntilde=611,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=611,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=611,e.Ccaron=722,e.ugrave=611,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=611,e.Rcommaaccent=722,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=556
e.minus=584,e.Icircumflex=278,e.ncaron=611,e.tcommaaccent=333,e.logicalnot=584,e.odieresis=611,e.udieresis=611,e.notequal=549,e.gcommaaccent=611,e.eth=611,e.zcaron=500,e.ncommaaccent=611,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-BoldOblique"]=(0,a.getLookupTableFactory)(function(e){e.space=278,e.exclam=333,e.quotedbl=474,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=722,e.quoteright=278,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=333,e.semicolon=333,e.less=584,e.equal=584
e.greater=584,e.question=611,e.at=975,e.A=722,e.B=722,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=556,e.K=722,e.L=611,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=333
e.backslash=278,e.bracketright=333,e.asciicircum=584,e.underscore=556,e.quoteleft=278,e.a=556,e.b=611,e.c=556,e.d=611,e.e=556,e.f=333,e.g=611,e.h=611,e.i=278,e.j=278,e.k=556,e.l=278,e.m=889,e.n=611,e.o=611,e.p=611,e.q=611,e.r=389,e.s=556,e.t=333,e.u=611,e.v=556,e.w=778,e.x=556,e.y=556
e.z=500,e.braceleft=389,e.bar=280,e.braceright=389,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=238,e.quotedblleft=500,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=611,e.fl=611,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=556,e.bullet=350,e.quotesinglbase=278,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=556
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=611,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=278,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278
e.eacute=556,e.abreve=556,e.uhungarumlaut=611,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=722,e.aacute=556,e.Ucircumflex=722,e.yacute=556,e.scommaaccent=556,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=611,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=556,e.aring=556,e.Ncommaaccent=722,e.lacute=278,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722
e.atilde=556,e.Edotaccent=667,e.scaron=556,e.scedilla=556,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=611,e.acircumflex=556,e.Amacron=722,e.rcaron=389,e.ccedilla=556,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=743,e.Umacron=722,e.uring=611,e.threesuperior=333,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=584,e.uacute=611,e.Tcaron=611,e.partialdiff=494,e.ydieresis=556
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=556,e.nacute=611,e.umacron=611,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=280,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=611,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=389,e.eogonek=556,e.Uogonek=722,e.Aacute=722,e.Adieresis=722
e.egrave=556,e.zacute=500,e.iogonek=278,e.Oacute=778,e.oacute=611,e.amacron=556,e.sacute=556,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=611,e.twosuperior=333,e.Odieresis=778,e.mu=611,e.igrave=278,e.ohungarumlaut=611,e.Eogonek=667,e.dcroat=611,e.threequarters=834,e.Scedilla=667,e.lcaron=400,e.Kcommaaccent=722,e.Lacute=611,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=611,e.onehalf=834
e.lessequal=549,e.ocircumflex=611,e.ntilde=611,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=611,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=611,e.Ccaron=722,e.ugrave=611,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=611,e.Rcommaaccent=722,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=556
e.minus=584,e.Icircumflex=278,e.ncaron=611,e.tcommaaccent=333,e.logicalnot=584,e.odieresis=611,e.udieresis=611,e.notequal=549,e.gcommaaccent=611,e.eth=611,e.zcaron=500,e.ncommaaccent=611,e.onesuperior=333,e.imacron=278,e.Euro=556}),e["Helvetica-Oblique"]=(0,a.getLookupTableFactory)(function(e){e.space=278,e.exclam=278,e.quotedbl=355,e.numbersign=556,e.dollar=556,e.percent=889,e.ampersand=667,e.quoteright=222,e.parenleft=333,e.parenright=333,e.asterisk=389,e.plus=584,e.comma=278,e.hyphen=333,e.period=278,e.slash=278,e.zero=556,e.one=556,e.two=556,e.three=556,e.four=556,e.five=556,e.six=556,e.seven=556,e.eight=556,e.nine=556,e.colon=278,e.semicolon=278,e.less=584,e.equal=584
e.greater=584,e.question=556,e.at=1015,e.A=667,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=722,e.I=278,e.J=500,e.K=667,e.L=556,e.M=833,e.N=722,e.O=778,e.P=667,e.Q=778,e.R=722,e.S=667,e.T=611,e.U=722,e.V=667,e.W=944,e.X=667,e.Y=667,e.Z=611,e.bracketleft=278
e.backslash=278,e.bracketright=278,e.asciicircum=469,e.underscore=556,e.quoteleft=222,e.a=556,e.b=556,e.c=500,e.d=556,e.e=556,e.f=278,e.g=556,e.h=556,e.i=222,e.j=222,e.k=500,e.l=222,e.m=833,e.n=556,e.o=556,e.p=556,e.q=556,e.r=333,e.s=500,e.t=278,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500
e.z=500,e.braceleft=334,e.bar=260,e.braceright=334,e.asciitilde=584,e.exclamdown=333,e.cent=556,e.sterling=556,e.fraction=167,e.yen=556,e.florin=556,e.section=556,e.currency=556,e.quotesingle=191,e.quotedblleft=333,e.guillemotleft=556,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=556,e.dagger=556,e.daggerdbl=556,e.periodcentered=278,e.paragraph=537,e.bullet=350,e.quotesinglbase=222,e.quotedblbase=333,e.quotedblright=333,e.guillemotright=556
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=611,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=370,e.Lslash=556,e.Oslash=778,e.OE=1e3,e.ordmasculine=365,e.ae=889,e.dotlessi=278,e.lslash=222,e.oslash=611,e.oe=944,e.germandbls=611,e.Idieresis=278
e.eacute=556,e.abreve=556,e.uhungarumlaut=556,e.ecaron=556,e.Ydieresis=667,e.divide=584,e.Yacute=667,e.Acircumflex=667,e.aacute=556,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=500,e.ecircumflex=556,e.Uring=722,e.Udieresis=722,e.aogonek=556,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=737,e.Emacron=667,e.ccaron=500,e.aring=556,e.Ncommaaccent=722,e.lacute=222,e.agrave=556,e.Tcommaaccent=611,e.Cacute=722
e.atilde=556,e.Edotaccent=667,e.scaron=500,e.scedilla=500,e.iacute=278,e.lozenge=471,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=556,e.Amacron=667,e.rcaron=333,e.ccedilla=500,e.Zdotaccent=611,e.Thorn=667,e.Omacron=778,e.Racute=722,e.Sacute=667,e.dcaron=643,e.Umacron=722,e.uring=556,e.threesuperior=333,e.Ograve=778,e.Agrave=667,e.Abreve=667,e.multiply=584,e.uacute=556,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=556,e.edieresis=556,e.cacute=500,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=278,e.plusminus=584,e.brokenbar=260,e.registered=737,e.Gbreve=778,e.Idotaccent=278,e.summation=600,e.Egrave=667,e.racute=333,e.omacron=556,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=222,e.tcaron=317,e.eogonek=556,e.Uogonek=722,e.Aacute=667,e.Adieresis=667
e.egrave=556,e.zacute=500,e.iogonek=222,e.Oacute=778,e.oacute=556,e.amacron=556,e.sacute=500,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=333,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=556,e.Eogonek=667,e.dcroat=556,e.threequarters=834,e.Scedilla=667,e.lcaron=299,e.Kcommaaccent=667,e.Lacute=556,e.trademark=1e3,e.edotaccent=556,e.Igrave=278,e.Imacron=278,e.Lcaron=556,e.onehalf=834
e.lessequal=549,e.ocircumflex=556,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=556,e.gbreve=556,e.onequarter=834,e.Scaron=667,e.Scommaaccent=667,e.Ohungarumlaut=778,e.degree=400,e.ograve=556,e.Ccaron=722,e.ugrave=556,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=556,e.Rcommaaccent=722,e.Lcommaaccent=556,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=778,e.zdotaccent=500,e.Ecaron=667,e.Iogonek=278,e.kcommaaccent=500
e.minus=584,e.Icircumflex=278,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=584,e.odieresis=556,e.udieresis=556,e.notequal=549,e.gcommaaccent=556,e.eth=556,e.zcaron=500,e.ncommaaccent=556,e.onesuperior=333,e.imacron=278,e.Euro=556}),e.Symbol=(0,a.getLookupTableFactory)(function(e){e.space=250,e.exclam=333,e.universal=713,e.numbersign=500,e.existential=549,e.percent=833,e.ampersand=778,e.suchthat=439,e.parenleft=333,e.parenright=333,e.asteriskmath=500,e.plus=549,e.comma=250,e.minus=549,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=278,e.semicolon=278,e.less=549,e.equal=549
e.greater=549,e.question=444,e.congruent=549,e.Alpha=722,e.Beta=667,e.Chi=722,e.Delta=612,e.Epsilon=611,e.Phi=763,e.Gamma=603,e.Eta=722,e.Iota=333,e.theta1=631,e.Kappa=722,e.Lambda=686,e.Mu=889,e.Nu=722,e.Omicron=722,e.Pi=768,e.Theta=741,e.Rho=556,e.Sigma=592,e.Tau=611,e.Upsilon=690,e.sigma1=439,e.Omega=768,e.Xi=645,e.Psi=795,e.Zeta=611,e.bracketleft=333
e.therefore=863,e.bracketright=333,e.perpendicular=658,e.underscore=500,e.radicalex=500,e.alpha=631,e.beta=549,e.chi=549,e.delta=494,e.epsilon=439,e.phi=521,e.gamma=411,e.eta=603,e.iota=329,e.phi1=603,e.kappa=549,e.lambda=549,e.mu=576,e.nu=521,e.omicron=549,e.pi=549,e.theta=521,e.rho=549,e.sigma=603,e.tau=439,e.upsilon=576,e.omega1=713,e.omega=686,e.xi=493,e.psi=686
e.zeta=494,e.braceleft=480,e.bar=200,e.braceright=480,e.similar=549,e.Euro=750,e.Upsilon1=620,e.minute=247,e.lessequal=549,e.fraction=167,e.infinity=713,e.florin=500,e.club=753,e.diamond=753,e.heart=753,e.spade=753,e.arrowboth=1042,e.arrowleft=987,e.arrowup=603,e.arrowright=987,e.arrowdown=603,e.degree=400,e.plusminus=549,e.second=411,e.greaterequal=549,e.multiply=549,e.proportional=713,e.partialdiff=494,e.bullet=460,e.divide=549
e.notequal=549,e.equivalence=549,e.approxequal=549,e.ellipsis=1e3,e.arrowvertex=603,e.arrowhorizex=1e3,e.carriagereturn=658,e.aleph=823,e.Ifraktur=686,e.Rfraktur=795,e.weierstrass=987,e.circlemultiply=768,e.circleplus=768,e.emptyset=823,e.intersection=768,e.union=768,e.propersuperset=713,e.reflexsuperset=713,e.notsubset=713,e.propersubset=713,e.reflexsubset=713,e.element=713,e.notelement=713,e.angle=768,e.gradient=713,e.registerserif=790,e.copyrightserif=790,e.trademarkserif=890,e.product=823,e.radical=549
e.dotmath=250,e.logicalnot=713,e.logicaland=603,e.logicalor=603,e.arrowdblboth=1042,e.arrowdblleft=987,e.arrowdblup=603,e.arrowdblright=987,e.arrowdbldown=603,e.lozenge=494,e.angleleft=329,e.registersans=790,e.copyrightsans=790,e.trademarksans=786,e.summation=713,e.parenlefttp=384,e.parenleftex=384,e.parenleftbt=384,e.bracketlefttp=384,e.bracketleftex=384,e.bracketleftbt=384,e.bracelefttp=494,e.braceleftmid=494,e.braceleftbt=494,e.braceex=494,e.angleright=329,e.integral=274,e.integraltp=686,e.integralex=686,e.integralbt=686
e.parenrighttp=384,e.parenrightex=384,e.parenrightbt=384,e.bracketrighttp=384,e.bracketrightex=384,e.bracketrightbt=384,e.bracerighttp=494,e.bracerightmid=494,e.bracerightbt=494,e.apple=790}),e["Times-Roman"]=(0,a.getLookupTableFactory)(function(e){e.space=250,e.exclam=333,e.quotedbl=408,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=564,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=278,e.semicolon=278,e.less=564,e.equal=564
e.greater=564,e.question=444,e.at=921,e.A=722,e.B=667,e.C=667,e.D=722,e.E=611,e.F=556,e.G=722,e.H=722,e.I=333,e.J=389,e.K=722,e.L=611,e.M=889,e.N=722,e.O=722,e.P=556,e.Q=722,e.R=667,e.S=556,e.T=611,e.U=722,e.V=722,e.W=944,e.X=722,e.Y=722,e.Z=611,e.bracketleft=333
e.backslash=278,e.bracketright=333,e.asciicircum=469,e.underscore=500,e.quoteleft=333,e.a=444,e.b=500,e.c=444,e.d=500,e.e=444,e.f=333,e.g=500,e.h=500,e.i=278,e.j=278,e.k=500,e.l=278,e.m=778,e.n=500,e.o=500,e.p=500,e.q=500,e.r=333,e.s=389,e.t=278,e.u=500,e.v=500,e.w=722,e.x=500,e.y=500
e.z=444,e.braceleft=480,e.bar=200,e.braceright=480,e.asciitilde=541,e.exclamdown=333,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=180,e.quotedblleft=444,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=453,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=444,e.quotedblright=444,e.guillemotright=500
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=444,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=889,e.ordfeminine=276,e.Lslash=611,e.Oslash=722,e.OE=889,e.ordmasculine=310,e.ae=667,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=500,e.Idieresis=333
e.eacute=444,e.abreve=444,e.uhungarumlaut=500,e.ecaron=444,e.Ydieresis=722,e.divide=564,e.Yacute=722,e.Acircumflex=722,e.aacute=444,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=444,e.Uacute=722,e.uogonek=500,e.Edieresis=611,e.Dcroat=722,e.commaaccent=250,e.copyright=760,e.Emacron=611,e.ccaron=444,e.aring=444,e.Ncommaaccent=722,e.lacute=278,e.agrave=444,e.Tcommaaccent=611,e.Cacute=667
e.atilde=444,e.Edotaccent=611,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=471,e.Rcaron=667,e.Gcommaaccent=722,e.ucircumflex=500,e.acircumflex=444,e.Amacron=722,e.rcaron=333,e.ccedilla=444,e.Zdotaccent=611,e.Thorn=556,e.Omacron=722,e.Racute=667,e.Sacute=556,e.dcaron=588,e.Umacron=722,e.uring=500,e.threesuperior=300,e.Ograve=722,e.Agrave=722,e.Abreve=722,e.multiply=564,e.uacute=500,e.Tcaron=611,e.partialdiff=476,e.ydieresis=500
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=611,e.adieresis=444,e.edieresis=444,e.cacute=444,e.nacute=500,e.umacron=500,e.Ncaron=722,e.Iacute=333,e.plusminus=564,e.brokenbar=200,e.registered=760,e.Gbreve=722,e.Idotaccent=333,e.summation=600,e.Egrave=611,e.racute=333,e.omacron=500,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=326,e.eogonek=444,e.Uogonek=722,e.Aacute=722,e.Adieresis=722
e.egrave=444,e.zacute=444,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=444,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=500,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=611,e.dcroat=500,e.threequarters=750,e.Scedilla=556,e.lcaron=344,e.Kcommaaccent=722,e.Lacute=611,e.trademark=980,e.edotaccent=444,e.Igrave=333,e.Imacron=333,e.Lcaron=611,e.onehalf=750
e.lessequal=549,e.ocircumflex=500,e.ntilde=500,e.Uhungarumlaut=722,e.Eacute=611,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=500,e.radical=453,e.Dcaron=722,e.rcommaaccent=333,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=667,e.Lcommaaccent=611,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=722,e.zdotaccent=444,e.Ecaron=611,e.Iogonek=333,e.kcommaaccent=500
e.minus=564,e.Icircumflex=333,e.ncaron=500,e.tcommaaccent=278,e.logicalnot=564,e.odieresis=500,e.udieresis=500,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=444,e.ncommaaccent=500,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-Bold"]=(0,a.getLookupTableFactory)(function(e){e.space=250,e.exclam=333,e.quotedbl=555,e.numbersign=500,e.dollar=500,e.percent=1e3,e.ampersand=833,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=570,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=570,e.equal=570
e.greater=570,e.question=500,e.at=930,e.A=722,e.B=667,e.C=722,e.D=722,e.E=667,e.F=611,e.G=778,e.H=778,e.I=389,e.J=500,e.K=778,e.L=667,e.M=944,e.N=722,e.O=778,e.P=611,e.Q=778,e.R=722,e.S=556,e.T=667,e.U=722,e.V=722,e.W=1e3,e.X=722,e.Y=722,e.Z=667,e.bracketleft=333
e.backslash=278,e.bracketright=333,e.asciicircum=581,e.underscore=500,e.quoteleft=333,e.a=500,e.b=556,e.c=444,e.d=556,e.e=444,e.f=333,e.g=500,e.h=556,e.i=278,e.j=333,e.k=556,e.l=278,e.m=833,e.n=556,e.o=500,e.p=556,e.q=556,e.r=444,e.s=389,e.t=333,e.u=556,e.v=500,e.w=722,e.x=500,e.y=500
e.z=444,e.braceleft=394,e.bar=220,e.braceright=394,e.asciitilde=520,e.exclamdown=333,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=278,e.quotedblleft=500,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=540,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=500
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=1e3,e.ordfeminine=300,e.Lslash=667,e.Oslash=778,e.OE=1e3,e.ordmasculine=330,e.ae=722,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=556,e.Idieresis=389
e.eacute=444,e.abreve=500,e.uhungarumlaut=556,e.ecaron=444,e.Ydieresis=722,e.divide=570,e.Yacute=722,e.Acircumflex=722,e.aacute=500,e.Ucircumflex=722,e.yacute=500,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=747,e.Emacron=667,e.ccaron=444,e.aring=500,e.Ncommaaccent=722,e.lacute=278,e.agrave=500,e.Tcommaaccent=667,e.Cacute=722
e.atilde=500,e.Edotaccent=667,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=494,e.Rcaron=722,e.Gcommaaccent=778,e.ucircumflex=556,e.acircumflex=500,e.Amacron=722,e.rcaron=444,e.ccedilla=444,e.Zdotaccent=667,e.Thorn=611,e.Omacron=778,e.Racute=722,e.Sacute=556,e.dcaron=672,e.Umacron=722,e.uring=556,e.threesuperior=300,e.Ograve=778,e.Agrave=722,e.Abreve=722,e.multiply=570,e.uacute=556,e.Tcaron=667,e.partialdiff=494,e.ydieresis=500
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=389,e.plusminus=570,e.brokenbar=220,e.registered=747,e.Gbreve=778,e.Idotaccent=389,e.summation=600,e.Egrave=667,e.racute=444,e.omacron=500,e.Zacute=667,e.Zcaron=667,e.greaterequal=549,e.Eth=722,e.Ccedilla=722,e.lcommaaccent=278,e.tcaron=416,e.eogonek=444,e.Uogonek=722,e.Aacute=722,e.Adieresis=722
e.egrave=444,e.zacute=444,e.iogonek=278,e.Oacute=778,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=778,e.Ugrave=722,e.Delta=612,e.thorn=556,e.twosuperior=300,e.Odieresis=778,e.mu=556,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=667,e.dcroat=556,e.threequarters=750,e.Scedilla=556,e.lcaron=394,e.Kcommaaccent=778,e.Lacute=667,e.trademark=1e3,e.edotaccent=444,e.Igrave=389,e.Imacron=389,e.Lcaron=667,e.onehalf=750
e.lessequal=549,e.ocircumflex=500,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=778,e.degree=400,e.ograve=500,e.Ccaron=722,e.ugrave=556,e.radical=549,e.Dcaron=722,e.rcommaaccent=444,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=722,e.Lcommaaccent=667,e.Atilde=722,e.Aogonek=722,e.Aring=722,e.Otilde=778,e.zdotaccent=444,e.Ecaron=667,e.Iogonek=389,e.kcommaaccent=556
e.minus=570,e.Icircumflex=389,e.ncaron=556,e.tcommaaccent=333,e.logicalnot=570,e.odieresis=500,e.udieresis=556,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=444,e.ncommaaccent=556,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-BoldItalic"]=(0,a.getLookupTableFactory)(function(e){e.space=250,e.exclam=389,e.quotedbl=555,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=570,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=570,e.equal=570
e.greater=570,e.question=500,e.at=832,e.A=667,e.B=667,e.C=667,e.D=722,e.E=667,e.F=667,e.G=722,e.H=778,e.I=389,e.J=500,e.K=667,e.L=611,e.M=889,e.N=722,e.O=722,e.P=611,e.Q=722,e.R=667,e.S=556,e.T=611,e.U=722,e.V=667,e.W=889,e.X=667,e.Y=611,e.Z=611,e.bracketleft=333
e.backslash=278,e.bracketright=333,e.asciicircum=570,e.underscore=500,e.quoteleft=333,e.a=500,e.b=500,e.c=444,e.d=500,e.e=444,e.f=333,e.g=500,e.h=556,e.i=278,e.j=278,e.k=500,e.l=278,e.m=778,e.n=556,e.o=500,e.p=500,e.q=500,e.r=389,e.s=389,e.t=278,e.u=556,e.v=444,e.w=667,e.x=500,e.y=444
e.z=389,e.braceleft=348,e.bar=220,e.braceright=348,e.asciitilde=570,e.exclamdown=389,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=278,e.quotedblleft=500,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=556,e.fl=556,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=500,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=500,e.quotedblright=500,e.guillemotright=500
e.ellipsis=1e3,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=1e3,e.AE=944,e.ordfeminine=266,e.Lslash=611,e.Oslash=722,e.OE=944,e.ordmasculine=300,e.ae=722,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=722,e.germandbls=500,e.Idieresis=389
e.eacute=444,e.abreve=500,e.uhungarumlaut=556,e.ecaron=444,e.Ydieresis=611,e.divide=570,e.Yacute=611,e.Acircumflex=667,e.aacute=500,e.Ucircumflex=722,e.yacute=444,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=556,e.Edieresis=667,e.Dcroat=722,e.commaaccent=250,e.copyright=747,e.Emacron=667,e.ccaron=444,e.aring=500,e.Ncommaaccent=722,e.lacute=278,e.agrave=500,e.Tcommaaccent=611,e.Cacute=667
e.atilde=500,e.Edotaccent=667,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=494,e.Rcaron=667,e.Gcommaaccent=722,e.ucircumflex=556,e.acircumflex=500,e.Amacron=667,e.rcaron=389,e.ccedilla=444,e.Zdotaccent=611,e.Thorn=611,e.Omacron=722,e.Racute=667,e.Sacute=556,e.dcaron=608,e.Umacron=722,e.uring=556,e.threesuperior=300,e.Ograve=722,e.Agrave=667,e.Abreve=667,e.multiply=570,e.uacute=556,e.Tcaron=611,e.partialdiff=494,e.ydieresis=444
e.Nacute=722,e.icircumflex=278,e.Ecircumflex=667,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=556,e.umacron=556,e.Ncaron=722,e.Iacute=389,e.plusminus=570,e.brokenbar=220,e.registered=747,e.Gbreve=722,e.Idotaccent=389,e.summation=600,e.Egrave=667,e.racute=389,e.omacron=500,e.Zacute=611,e.Zcaron=611,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=366,e.eogonek=444,e.Uogonek=722,e.Aacute=667,e.Adieresis=667
e.egrave=444,e.zacute=389,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=576,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=667,e.dcroat=500,e.threequarters=750,e.Scedilla=556,e.lcaron=382,e.Kcommaaccent=667,e.Lacute=611,e.trademark=1e3,e.edotaccent=444,e.Igrave=389,e.Imacron=389,e.Lcaron=611,e.onehalf=750
e.lessequal=549,e.ocircumflex=500,e.ntilde=556,e.Uhungarumlaut=722,e.Eacute=667,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=556,e.Scommaaccent=556,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=556,e.radical=549,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=722,e.otilde=500,e.Rcommaaccent=667,e.Lcommaaccent=611,e.Atilde=667,e.Aogonek=667,e.Aring=667,e.Otilde=722,e.zdotaccent=389,e.Ecaron=667,e.Iogonek=389,e.kcommaaccent=500
e.minus=606,e.Icircumflex=389,e.ncaron=556,e.tcommaaccent=278,e.logicalnot=606,e.odieresis=500,e.udieresis=556,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=389,e.ncommaaccent=556,e.onesuperior=300,e.imacron=278,e.Euro=500}),e["Times-Italic"]=(0,a.getLookupTableFactory)(function(e){e.space=250,e.exclam=333,e.quotedbl=420,e.numbersign=500,e.dollar=500,e.percent=833,e.ampersand=778,e.quoteright=333,e.parenleft=333,e.parenright=333,e.asterisk=500,e.plus=675,e.comma=250,e.hyphen=333,e.period=250,e.slash=278,e.zero=500,e.one=500,e.two=500,e.three=500,e.four=500,e.five=500,e.six=500,e.seven=500,e.eight=500,e.nine=500,e.colon=333,e.semicolon=333,e.less=675,e.equal=675
e.greater=675,e.question=500,e.at=920,e.A=611,e.B=611,e.C=667,e.D=722,e.E=611,e.F=611,e.G=722,e.H=722,e.I=333,e.J=444,e.K=667,e.L=556,e.M=833,e.N=667,e.O=722,e.P=611,e.Q=722,e.R=611,e.S=500,e.T=556,e.U=722,e.V=611,e.W=833,e.X=611,e.Y=556,e.Z=556,e.bracketleft=389
e.backslash=278,e.bracketright=389,e.asciicircum=422,e.underscore=500,e.quoteleft=333,e.a=500,e.b=500,e.c=444,e.d=500,e.e=444,e.f=278,e.g=500,e.h=500,e.i=278,e.j=278,e.k=444,e.l=278,e.m=722,e.n=500,e.o=500,e.p=500,e.q=500,e.r=389,e.s=389,e.t=278,e.u=500,e.v=444,e.w=667,e.x=444,e.y=444
e.z=389,e.braceleft=400,e.bar=275,e.braceright=400,e.asciitilde=541,e.exclamdown=389,e.cent=500,e.sterling=500,e.fraction=167,e.yen=500,e.florin=500,e.section=500,e.currency=500,e.quotesingle=214,e.quotedblleft=556,e.guillemotleft=500,e.guilsinglleft=333,e.guilsinglright=333,e.fi=500,e.fl=500,e.endash=500,e.dagger=500,e.daggerdbl=500,e.periodcentered=250,e.paragraph=523,e.bullet=350,e.quotesinglbase=333,e.quotedblbase=556,e.quotedblright=556,e.guillemotright=500
e.ellipsis=889,e.perthousand=1e3,e.questiondown=500,e.grave=333,e.acute=333,e.circumflex=333,e.tilde=333,e.macron=333,e.breve=333,e.dotaccent=333,e.dieresis=333,e.ring=333,e.cedilla=333,e.hungarumlaut=333,e.ogonek=333,e.caron=333,e.emdash=889,e.AE=889,e.ordfeminine=276,e.Lslash=556,e.Oslash=722,e.OE=944,e.ordmasculine=310,e.ae=667,e.dotlessi=278,e.lslash=278,e.oslash=500,e.oe=667,e.germandbls=500,e.Idieresis=333
e.eacute=444,e.abreve=500,e.uhungarumlaut=500,e.ecaron=444,e.Ydieresis=556,e.divide=675,e.Yacute=556,e.Acircumflex=611,e.aacute=500,e.Ucircumflex=722,e.yacute=444,e.scommaaccent=389,e.ecircumflex=444,e.Uring=722,e.Udieresis=722,e.aogonek=500,e.Uacute=722,e.uogonek=500,e.Edieresis=611,e.Dcroat=722,e.commaaccent=250,e.copyright=760,e.Emacron=611,e.ccaron=444,e.aring=500,e.Ncommaaccent=667,e.lacute=278,e.agrave=500,e.Tcommaaccent=556,e.Cacute=667
e.atilde=500,e.Edotaccent=611,e.scaron=389,e.scedilla=389,e.iacute=278,e.lozenge=471,e.Rcaron=611,e.Gcommaaccent=722,e.ucircumflex=500,e.acircumflex=500,e.Amacron=611,e.rcaron=389,e.ccedilla=444,e.Zdotaccent=556,e.Thorn=611,e.Omacron=722,e.Racute=611,e.Sacute=500,e.dcaron=544,e.Umacron=722,e.uring=500,e.threesuperior=300,e.Ograve=722,e.Agrave=611,e.Abreve=611,e.multiply=675,e.uacute=500,e.Tcaron=556,e.partialdiff=476,e.ydieresis=444
e.Nacute=667,e.icircumflex=278,e.Ecircumflex=611,e.adieresis=500,e.edieresis=444,e.cacute=444,e.nacute=500,e.umacron=500,e.Ncaron=667,e.Iacute=333,e.plusminus=675,e.brokenbar=275,e.registered=760,e.Gbreve=722,e.Idotaccent=333,e.summation=600,e.Egrave=611,e.racute=389,e.omacron=500,e.Zacute=556,e.Zcaron=556,e.greaterequal=549,e.Eth=722,e.Ccedilla=667,e.lcommaaccent=278,e.tcaron=300,e.eogonek=444,e.Uogonek=722,e.Aacute=611,e.Adieresis=611
e.egrave=444,e.zacute=389,e.iogonek=278,e.Oacute=722,e.oacute=500,e.amacron=500,e.sacute=389,e.idieresis=278,e.Ocircumflex=722,e.Ugrave=722,e.Delta=612,e.thorn=500,e.twosuperior=300,e.Odieresis=722,e.mu=500,e.igrave=278,e.ohungarumlaut=500,e.Eogonek=611,e.dcroat=500,e.threequarters=750,e.Scedilla=500,e.lcaron=300,e.Kcommaaccent=667,e.Lacute=556,e.trademark=980,e.edotaccent=444,e.Igrave=333,e.Imacron=333,e.Lcaron=611,e.onehalf=750
e.lessequal=549,e.ocircumflex=500,e.ntilde=500,e.Uhungarumlaut=722,e.Eacute=611,e.emacron=444,e.gbreve=500,e.onequarter=750,e.Scaron=500,e.Scommaaccent=500,e.Ohungarumlaut=722,e.degree=400,e.ograve=500,e.Ccaron=667,e.ugrave=500,e.radical=453,e.Dcaron=722,e.rcommaaccent=389,e.Ntilde=667,e.otilde=500,e.Rcommaaccent=611,e.Lcommaaccent=556,e.Atilde=611,e.Aogonek=611,e.Aring=611,e.Otilde=722,e.zdotaccent=389,e.Ecaron=611,e.Iogonek=333,e.kcommaaccent=444
e.minus=675,e.Icircumflex=333,e.ncaron=500,e.tcommaaccent=278,e.logicalnot=675,e.odieresis=500,e.udieresis=500,e.notequal=549,e.gcommaaccent=500,e.eth=500,e.zcaron=389,e.ncommaaccent=500,e.onesuperior=300,e.imacron=278,e.Euro=500}),e.ZapfDingbats=(0,a.getLookupTableFactory)(function(e){e.space=278,e.a1=974,e.a2=961,e.a202=974,e.a3=980,e.a4=719,e.a5=789,e.a119=790,e.a118=791,e.a117=690,e.a11=960,e.a12=939,e.a13=549,e.a14=855,e.a15=911,e.a16=933,e.a105=911,e.a17=945,e.a18=974,e.a19=755,e.a20=846,e.a21=762,e.a22=761,e.a23=571,e.a24=677,e.a25=763,e.a26=760,e.a27=759,e.a28=754,e.a6=494
e.a7=552,e.a8=537,e.a9=577,e.a10=692,e.a29=786,e.a30=788,e.a31=788,e.a32=790,e.a33=793,e.a34=794,e.a35=816,e.a36=823,e.a37=789,e.a38=841,e.a39=823,e.a40=833,e.a41=816,e.a42=831,e.a43=923,e.a44=744,e.a45=723,e.a46=749,e.a47=790,e.a48=792,e.a49=695,e.a50=776,e.a51=768,e.a52=792,e.a53=759,e.a54=707
e.a55=708,e.a56=682,e.a57=701,e.a58=826,e.a59=815,e.a60=789,e.a61=789,e.a62=707,e.a63=687,e.a64=696,e.a65=689,e.a66=786,e.a67=787,e.a68=713,e.a69=791,e.a70=785,e.a71=791,e.a72=873,e.a73=761,e.a74=762,e.a203=762,e.a75=759,e.a204=759,e.a76=892,e.a77=892,e.a78=788,e.a79=784,e.a81=438,e.a82=138,e.a83=277
e.a84=415,e.a97=392,e.a98=392,e.a99=668,e.a100=668,e.a89=390,e.a90=390,e.a93=317,e.a94=317,e.a91=276,e.a92=276,e.a205=509,e.a85=509,e.a206=410,e.a86=410,e.a87=234,e.a88=234,e.a95=334,e.a96=334,e.a101=732,e.a102=544,e.a103=544,e.a104=910,e.a106=667,e.a107=760,e.a108=760,e.a112=776,e.a111=595,e.a110=694,e.a109=626
e.a120=788,e.a121=788,e.a122=788,e.a123=788,e.a124=788,e.a125=788,e.a126=788,e.a127=788,e.a128=788,e.a129=788,e.a130=788,e.a131=788,e.a132=788,e.a133=788,e.a134=788,e.a135=788,e.a136=788,e.a137=788,e.a138=788,e.a139=788,e.a140=788,e.a141=788,e.a142=788,e.a143=788,e.a144=788,e.a145=788,e.a146=788,e.a147=788,e.a148=788,e.a149=788
e.a150=788,e.a151=788,e.a152=788,e.a153=788,e.a154=788,e.a155=788,e.a156=788,e.a157=788,e.a158=788,e.a159=788,e.a160=894,e.a161=838,e.a163=1016,e.a164=458,e.a196=748,e.a165=924,e.a192=748,e.a166=918,e.a167=927,e.a168=928,e.a169=928,e.a170=834,e.a171=873,e.a172=828,e.a173=924,e.a162=924,e.a174=917,e.a175=930,e.a176=931,e.a177=463
e.a178=883,e.a179=836,e.a193=836,e.a180=867,e.a199=867,e.a181=696,e.a200=696,e.a182=874,e.a201=874,e.a183=760,e.a184=946,e.a197=771,e.a185=865,e.a194=771,e.a198=888,e.a186=967,e.a195=888,e.a187=831,e.a188=873,e.a189=927,e.a190=970,e.a191=918})})
t.getMetrics=i},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.isPDFFunction=function(e){var t
if("object"!==function(e){return("function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}(e))return!1
if((0,i.isDict)(e))t=e
else{if(!(0,i.isStream)(e))return!1
t=e.dict}return t.has("FunctionType")},t.PostScriptCompiler=t.PostScriptEvaluator=t.PDFFunctionFactory=void 0
var a=r(6),i=r(155),n=r(186)
function o(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}var s={get value(){return(0,a.shadow)(this,"value",(0,a.isEvalSupported)())}},c=function(){function e(t){var r=t.xref,a=t.isEvalSupported,i=void 0===a||a
!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.xref=r,this.isEvalSupported=!1!==i}return function(e,t,r){t&&o(e.prototype,t)}(e,[{key:"create",value:function(e){return u.parse({xref:this.xref,isEvalSupported:this.isEvalSupported,fn:e})}},{key:"createFromArray",value:function(e){return u.parseArray({xref:this.xref,isEvalSupported:this.isEvalSupported,fnObj:e})}}]),e}()
function l(e){if(!Array.isArray(e))return null
for(var t=e.length,r=0;r<t;r++)if("number"!=typeof e[r]){for(var a=new Array(t),i=0;i<t;i++)a[i]=+e[i]
return a}return e}t.PDFFunctionFactory=c
var u={getSampleArray:function(e,t,r,a){var i,n,o=1
for(i=0,n=e.length;i<n;i++)o*=e[i]
o*=t
var s=new Array(o),c=0,l=0,u=1/(Math.pow(2,r)-1),h=a.getBytes((o*r+7)/8),f=0
for(i=0;i<o;i++){for(;c<r;)l<<=8,l|=h[f++],c+=8
c-=r,s[i]=(l>>c)*u,l&=(1<<c)-1}return s},getIR:function(e){var t=e.xref,r=e.isEvalSupported,i=e.fn,n=i.dict
n||(n=i)
var o=[this.constructSampled,null,this.constructInterpolated,this.constructStiched,this.constructPostScript][n.get("FunctionType")]
if(!o)throw new a.FormatError("Unknown type of function")
return o.call(this,{xref:t,isEvalSupported:r,fn:i,dict:n})},fromIR:function(e){var t=e.xref,r=e.isEvalSupported,a=e.IR
switch(a[0]){case 0:return this.constructSampledFromIR({xref:t,isEvalSupported:r,IR:a})
case 2:return this.constructInterpolatedFromIR({xref:t,isEvalSupported:r,IR:a})
case 3:return this.constructStichedFromIR({xref:t,isEvalSupported:r,IR:a})
default:return this.constructPostScriptFromIR({xref:t,isEvalSupported:r,IR:a})}},parse:function(e){var t=e.xref,r=e.isEvalSupported,a=e.fn,i=this.getIR({xref:t,isEvalSupported:r,fn:a})
return this.fromIR({xref:t,isEvalSupported:r,IR:i})},parseArray:function(e){var t=e.xref,r=e.isEvalSupported,a=e.fnObj
if(!Array.isArray(a))return this.parse({xref:t,isEvalSupported:r,fn:a})
for(var i=[],n=0,o=a.length;n<o;n++)i.push(this.parse({xref:t,isEvalSupported:r,fn:t.fetchIfRef(a[n])}))
return function(e,t,r,a){for(var n=0,o=i.length;n<o;n++)i[n](e,t,r,a+n)}},constructSampled:function(e){e.xref,e.isEvalSupported
var t=e.fn,r=e.dict
function i(e){for(var t=e.length,r=[],a=0,i=0;i<t;i+=2)r[a]=[e[i],e[i+1]],++a
return r}var n=l(r.getArray("Domain")),o=l(r.getArray("Range"))
if(!n||!o)throw new a.FormatError("No domain or range")
var s=n.length/2,c=o.length/2
n=i(n),o=i(o)
var u=l(r.getArray("Size")),h=r.get("BitsPerSample"),f=r.get("Order")||1
1!==f&&(0,a.info)("No support for cubic spline interpolation: "+f)
var d=l(r.getArray("Encode"))
if(d)d=i(d)
else{d=[]
for(var g=0;g<s;++g)d.push([0,u[g]-1])}var m=l(r.getArray("Decode"))
return[0,s,n,d,m=m?i(m):o,this.getSampleArray(u,c,h,t),u,c,Math.pow(2,h)-1,o]},constructSampledFromIR:function(e){e.xref,e.isEvalSupported
var t=e.IR
function r(e,t,r,a,i){return a+(i-a)/(r-t)*(e-t)}return function(e,a,i,n){var o,s,c=t[1],l=t[2],u=t[3],h=t[4],f=t[5],d=t[6],g=t[7],m=t[9],p=1<<c,v=new Float64Array(p),b=new Uint32Array(p)
for(s=0;s<p;s++)v[s]=1
var y=g,w=1
for(o=0;o<c;++o){var k=l[o][0],S=l[o][1],C=r(Math.min(Math.max(e[a+o],k),S),k,S,u[o][0],u[o][1]),x=d[o],A=(C=Math.min(Math.max(C,0),x-1))<x-1?Math.floor(C):C-1,_=A+1-C,P=C-A,I=A*y,O=I+y
for(s=0;s<p;s++)s&w?(v[s]*=P,b[s]+=O):(v[s]*=_,b[s]+=I)
y*=x,w<<=1}for(s=0;s<g;++s){var E=0
for(o=0;o<p;o++)E+=f[b[o]+s]*v[o]
E=r(E,0,1,h[s][0],h[s][1]),i[n+s]=Math.min(Math.max(E,m[s][0]),m[s][1])}}},constructInterpolated:function(e){e.xref,e.isEvalSupported,e.fn
for(var t=e.dict,r=l(t.getArray("C0"))||[0],a=l(t.getArray("C1"))||[1],i=t.get("N"),n=r.length,o=[],s=0;s<n;++s)o.push(a[s]-r[s])
return[2,r,o,i]},constructInterpolatedFromIR:function(e){e.xref,e.isEvalSupported
var t=e.IR,r=t[1],a=t[2],i=t[3],n=a.length
return function(e,t,o,s){for(var c=1===i?e[t]:Math.pow(e[t],i),l=0;l<n;++l)o[s+l]=r[l]+c*a[l]}},constructStiched:function(e){var t=e.xref,r=e.isEvalSupported,i=(e.fn,e.dict),n=l(i.getArray("Domain"))
if(!n)throw new a.FormatError("No domain")
if(1!=n.length/2)throw new a.FormatError("Bad domain for stiched function")
for(var o=i.get("Functions"),s=[],c=0,u=o.length;c<u;++c)s.push(this.parse({xref:t,isEvalSupported:r,fn:t.fetchIfRef(o[c])}))
return[3,n,l(i.getArray("Bounds")),l(i.getArray("Encode")),s]},constructStichedFromIR:function(e){e.xref,e.isEvalSupported
var t=e.IR,r=t[1],a=t[2],i=t[3],n=t[4],o=new Float32Array(1)
return function(e,t,s,c){for(var l=function(e,t,r){return e>r?e=r:e<t&&(e=t),e}(e[t],r[0],r[1]),u=0,h=a.length;u<h&&!(l<a[u]);++u);var f=r[0]
u>0&&(f=a[u-1])
var d=r[1]
u<a.length&&(d=a[u])
var g=i[2*u],m=i[2*u+1]
o[0]=f===d?g:g+(l-f)*(m-g)/(d-f),n[u](o,0,s,c)}},constructPostScript:function(e){e.xref,e.isEvalSupported
var t=e.fn,r=e.dict,i=l(r.getArray("Domain")),o=l(r.getArray("Range"))
if(!i)throw new a.FormatError("No domain.")
if(!o)throw new a.FormatError("No range.")
var s=new n.PostScriptLexer(t)
return[4,i,o,new n.PostScriptParser(s).parse()]},constructPostScriptFromIR:function(e){e.xref
var t=e.isEvalSupported,r=e.IR,i=r[1],n=r[2],o=r[3]
if(t&&s.value){var c=(new d).compile(o,i,n)
if(c)return new Function("src","srcOffset","dest","destOffset",c)}(0,a.info)("Unable to compile PS function")
var l=n.length>>1,u=i.length>>1,h=new f(o),g=Object.create(null),m=8192,p=new Float32Array(u)
return function(e,t,r,a){var i,o,s="",c=p
for(i=0;i<u;i++)o=e[t+i],c[i]=o,s+=o+"_"
var f=g[s]
if(void 0===f){var d=new Float32Array(l),v=h.execute(c),b=v.length-l
for(i=0;i<l;i++){o=v[b+i]
var y=n[2*i]
o<y?o=y:o>(y=n[2*i+1])&&(o=y),d[i]=o}m>0&&(m--,g[s]=d),r.set(d,a)}else r.set(f,a)}}},h=function(){function e(e){this.stack=e?Array.prototype.slice.call(e,0):[]}return e.prototype={push:function(e){if(this.stack.length>=100)throw new Error("PostScript function stack overflow.")
this.stack.push(e)},pop:function(){if(this.stack.length<=0)throw new Error("PostScript function stack underflow.")
return this.stack.pop()},copy:function(e){if(this.stack.length+e>=100)throw new Error("PostScript function stack overflow.")
for(var t=this.stack,r=t.length-e,a=e-1;a>=0;a--,r++)t.push(t[r])},index:function(e){this.push(this.stack[this.stack.length-e-1])},roll:function(e,t){var r,a,i,n=this.stack,o=n.length-e,s=n.length-1,c=o+(t-Math.floor(t/e)*e)
for(r=o,a=s;r<a;r++,a--)i=n[r],n[r]=n[a],n[a]=i
for(r=o,a=c-1;r<a;r++,a--)i=n[r],n[r]=n[a],n[a]=i
for(r=c,a=s;r<a;r++,a--)i=n[r],n[r]=n[a],n[a]=i}},e}(),f=function(){function e(e){this.operators=e}return e.prototype={execute:function(e){for(var t,r,i,n=new h(e),o=0,s=this.operators,c=s.length;o<c;)if("number"!=typeof(t=s[o++]))switch(t){case"jz":i=n.pop(),(r=n.pop())||(o=i)
break
case"j":o=r=n.pop()
break
case"abs":r=n.pop(),n.push(Math.abs(r))
break
case"add":i=n.pop(),r=n.pop(),n.push(r+i)
break
case"and":i=n.pop(),r=n.pop(),(0,a.isBool)(r)&&(0,a.isBool)(i)?n.push(r&&i):n.push(r&i)
break
case"atan":r=n.pop(),n.push(Math.atan(r))
break
case"bitshift":i=n.pop(),(r=n.pop())>0?n.push(r<<i):n.push(r>>i)
break
case"ceiling":r=n.pop(),n.push(Math.ceil(r))
break
case"copy":r=n.pop(),n.copy(r)
break
case"cos":r=n.pop(),n.push(Math.cos(r))
break
case"cvi":r=0|n.pop(),n.push(r)
break
case"cvr":break
case"div":i=n.pop(),r=n.pop(),n.push(r/i)
break
case"dup":n.copy(1)
break
case"eq":i=n.pop(),r=n.pop(),n.push(r===i)
break
case"exch":n.roll(2,1)
break
case"exp":i=n.pop(),r=n.pop(),n.push(Math.pow(r,i))
break
case"false":n.push(!1)
break
case"floor":r=n.pop(),n.push(Math.floor(r))
break
case"ge":i=n.pop(),r=n.pop(),n.push(r>=i)
break
case"gt":i=n.pop(),r=n.pop(),n.push(r>i)
break
case"idiv":i=n.pop(),r=n.pop(),n.push(r/i|0)
break
case"index":r=n.pop(),n.index(r)
break
case"le":i=n.pop(),r=n.pop(),n.push(r<=i)
break
case"ln":r=n.pop(),n.push(Math.log(r))
break
case"log":r=n.pop(),n.push(Math.log(r)/Math.LN10)
break
case"lt":i=n.pop(),r=n.pop(),n.push(r<i)
break
case"mod":i=n.pop(),r=n.pop(),n.push(r%i)
break
case"mul":i=n.pop(),r=n.pop(),n.push(r*i)
break
case"ne":i=n.pop(),r=n.pop(),n.push(r!==i)
break
case"neg":r=n.pop(),n.push(-r)
break
case"not":r=n.pop(),(0,a.isBool)(r)?n.push(!r):n.push(~r)
break
case"or":i=n.pop(),r=n.pop(),(0,a.isBool)(r)&&(0,a.isBool)(i)?n.push(r||i):n.push(r|i)
break
case"pop":n.pop()
break
case"roll":i=n.pop(),r=n.pop(),n.roll(r,i)
break
case"round":r=n.pop(),n.push(Math.round(r))
break
case"sin":r=n.pop(),n.push(Math.sin(r))
break
case"sqrt":r=n.pop(),n.push(Math.sqrt(r))
break
case"sub":i=n.pop(),r=n.pop(),n.push(r-i)
break
case"true":n.push(!0)
break
case"truncate":r=(r=n.pop())<0?Math.ceil(r):Math.floor(r),n.push(r)
break
case"xor":i=n.pop(),r=n.pop(),(0,a.isBool)(r)&&(0,a.isBool)(i)?n.push(r!==i):n.push(r^i)
break
default:throw new a.FormatError("Unknown operator ".concat(t))}else n.push(t)
return n.stack}},e}()
t.PostScriptEvaluator=f
var d=function(){function e(e){this.type=e}function t(t,r,a){e.call(this,"args"),this.index=t,this.min=r,this.max=a}function r(t){e.call(this,"literal"),this.number=t,this.min=t,this.max=t}function i(t,r,a,i,n){e.call(this,"binary"),this.op=t,this.arg1=r,this.arg2=a,this.min=i,this.max=n}function n(t,r){e.call(this,"max"),this.arg=t,this.min=t.min,this.max=r}function o(t,r,a){e.call(this,"var"),this.index=t,this.min=r,this.max=a}function s(t,r){e.call(this,"definition"),this.variable=t,this.arg=r}function c(){this.parts=[]}function l(e,t){return"literal"===t.type&&0===t.number?e:"literal"===e.type&&0===e.number?t:"literal"===t.type&&"literal"===e.type?new r(e.number+t.number):new i("+",e,t,e.min+t.min,e.max+t.max)}function u(e,t){if("literal"===t.type){if(0===t.number)return new r(0)
if(1===t.number)return e
if("literal"===e.type)return new r(e.number*t.number)}if("literal"===e.type){if(0===e.number)return new r(0)
if(1===e.number)return t}return new i("*",e,t,Math.min(e.min*t.min,e.min*t.max,e.max*t.min,e.max*t.max),Math.max(e.min*t.min,e.min*t.max,e.max*t.min,e.max*t.max))}function h(e,t){if("literal"===t.type){if(0===t.number)return e
if("literal"===e.type)return new r(e.number-t.number)}return"binary"===t.type&&"-"===t.op&&"literal"===e.type&&1===e.number&&"literal"===t.arg1.type&&1===t.arg1.number?t.arg2:new i("-",e,t,e.min-t.max,e.max-t.min)}function f(e,t){return e.min>=t?new r(t):e.max<=t?e:new n(e,t)}function d(){}return e.prototype.visit=function(e){(0,a.unreachable)("abstract method")},t.prototype=Object.create(e.prototype),t.prototype.visit=function(e){e.visitArgument(this)},r.prototype=Object.create(e.prototype),r.prototype.visit=function(e){e.visitLiteral(this)},i.prototype=Object.create(e.prototype),i.prototype.visit=function(e){e.visitBinaryOperation(this)},n.prototype=Object.create(e.prototype),n.prototype.visit=function(e){e.visitMin(this)},o.prototype=Object.create(e.prototype),o.prototype.visit=function(e){e.visitVariable(this)},s.prototype=Object.create(e.prototype),s.prototype.visit=function(e){e.visitVariableDefinition(this)},c.prototype={visitArgument:function(e){this.parts.push("Math.max(",e.min,", Math.min(",e.max,", src[srcOffset + ",e.index,"]))")},visitVariable:function(e){this.parts.push("v",e.index)},visitLiteral:function(e){this.parts.push(e.number)},visitBinaryOperation:function(e){this.parts.push("("),e.arg1.visit(this),this.parts.push(" ",e.op," "),e.arg2.visit(this),this.parts.push(")")},visitVariableDefinition:function(e){this.parts.push("var "),e.variable.visit(this),this.parts.push(" = "),e.arg.visit(this),this.parts.push(";")},visitMin:function(e){this.parts.push("Math.min("),e.arg.visit(this),this.parts.push(", ",e.max,")")},toString:function(){return this.parts.join("")}},d.prototype={compile:function(e,a,i){var n,d,g,m,p,v,b,y,w,k,S=[],C=[],x=a.length>>1,A=i.length>>1,_=0
for(n=0;n<x;n++)S.push(new t(n,a[2*n],a[2*n+1]))
for(n=0,d=e.length;n<d;n++)if("number"!=typeof(k=e[n]))switch(k){case"add":if(S.length<2)return null
v=S.pop(),p=S.pop(),S.push(l(p,v))
break
case"cvr":if(S.length<1)return null
break
case"mul":if(S.length<2)return null
v=S.pop(),p=S.pop(),S.push(u(p,v))
break
case"sub":if(S.length<2)return null
v=S.pop(),p=S.pop(),S.push(h(p,v))
break
case"exch":if(S.length<2)return null
b=S.pop(),y=S.pop(),S.push(b,y)
break
case"pop":if(S.length<1)return null
S.pop()
break
case"index":if(S.length<1)return null
if("literal"!==(p=S.pop()).type)return null
if((g=p.number)<0||!Number.isInteger(g)||S.length<g)return null
if("literal"===(b=S[S.length-g-1]).type||"var"===b.type){S.push(b)
break}w=new o(_++,b.min,b.max),S[S.length-g-1]=w,S.push(w),C.push(new s(w,b))
break
case"dup":if(S.length<1)return null
if("number"==typeof e[n+1]&&"gt"===e[n+2]&&e[n+3]===n+7&&"jz"===e[n+4]&&"pop"===e[n+5]&&e[n+6]===e[n+1]){p=S.pop(),S.push(f(p,e[n+1])),n+=6
break}if("literal"===(b=S[S.length-1]).type||"var"===b.type){S.push(b)
break}w=new o(_++,b.min,b.max),S[S.length-1]=w,S.push(w),C.push(new s(w,b))
break
case"roll":if(S.length<2)return null
if(v=S.pop(),p=S.pop(),"literal"!==v.type||"literal"!==p.type)return null
if(m=v.number,(g=p.number)<=0||!Number.isInteger(g)||!Number.isInteger(m)||S.length<g)return null
if(0==(m=(m%g+g)%g))break
Array.prototype.push.apply(S,S.splice(S.length-g,g-m))
break
default:return null}else S.push(new r(k))
if(S.length!==A)return null
var P=[]
return C.forEach(function(e){var t=new c
e.visit(t),P.push(t.toString())}),S.forEach(function(e,t){var r=new c
e.visit(r)
var a=i[2*t],n=i[2*t+1],o=[r.toString()]
a>e.min&&(o.unshift("Math.max(",a,", "),o.push(")")),n<e.max&&(o.unshift("Math.min(",n,", "),o.push(")")),o.unshift("dest[destOffset + ",t,"] = "),o.push(";"),P.push(o.join(""))}),P.join("\n")}},d}()
t.PostScriptCompiler=d},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.PostScriptParser=t.PostScriptLexer=void 0
var a=r(6),i=r(155)
function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){for(var r=0;r<t.length;r++){var a=t[r]
a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function s(e,t,r){return t&&o(e.prototype,t),r&&o(e,r),e}var c=function(){function e(t){n(this,e),this.lexer=t,this.operators=[],this.token=null,this.prev=null}return s(e,[{key:"nextToken",value:function(){this.prev=this.token,this.token=this.lexer.getToken()}},{key:"accept",value:function(e){return this.token.type===e&&(this.nextToken(),!0)}},{key:"expect",value:function(e){if(this.accept(e))return!0
throw new a.FormatError("Unexpected symbol: found ".concat(this.token.type," expected ").concat(e,"."))}},{key:"parse",value:function(){return this.nextToken(),this.expect(u.LBRACE),this.parseBlock(),this.expect(u.RBRACE),this.operators}},{key:"parseBlock",value:function(){for(;;)if(this.accept(u.NUMBER))this.operators.push(this.prev.value)
else if(this.accept(u.OPERATOR))this.operators.push(this.prev.value)
else{if(!this.accept(u.LBRACE))return
this.parseCondition()}}},{key:"parseCondition",value:function(){var e=this.operators.length
if(this.operators.push(null,null),this.parseBlock(),this.expect(u.RBRACE),this.accept(u.IF))this.operators[e]=this.operators.length,this.operators[e+1]="jz"
else{if(!this.accept(u.LBRACE))throw new a.FormatError("PS Function: error parsing conditional.")
var t=this.operators.length
this.operators.push(null,null)
var r=this.operators.length
this.parseBlock(),this.expect(u.RBRACE),this.expect(u.IFELSE),this.operators[t]=this.operators.length,this.operators[t+1]="j",this.operators[e]=r,this.operators[e+1]="jz"}}}]),e}()
t.PostScriptParser=c
var l,u={LBRACE:0,RBRACE:1,NUMBER:2,OPERATOR:3,IF:4,IFELSE:5},h=(l=Object.create(null),function(){function e(t,r){n(this,e),this.type=t,this.value=r}return s(e,null,[{key:"getOperator",value:function(t){return l[t]||(l[t]=new e(u.OPERATOR,t))}},{key:"LBRACE",get:function(){return(0,a.shadow)(this,"LBRACE",new e(u.LBRACE,"{"))}},{key:"RBRACE",get:function(){return(0,a.shadow)(this,"RBRACE",new e(u.RBRACE,"}"))}},{key:"IF",get:function(){return(0,a.shadow)(this,"IF",new e(u.IF,"IF"))}},{key:"IFELSE",get:function(){return(0,a.shadow)(this,"IFELSE",new e(u.IFELSE,"IFELSE"))}}]),e}()),f=function(){function e(t){n(this,e),this.stream=t,this.nextChar(),this.strBuf=[]}return s(e,[{key:"nextChar",value:function(){return this.currentChar=this.stream.getByte()}},{key:"getToken",value:function(){for(var e=!1,t=this.currentChar;;){if(t<0)return i.EOF
if(e)10!==t&&13!==t||(e=!1)
else if(37===t)e=!0
else if(!(0,a.isSpace)(t))break
t=this.nextChar()}switch(0|t){case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 43:case 45:case 46:return new h(u.NUMBER,this.getNumber())
case 123:return this.nextChar(),h.LBRACE
case 125:return this.nextChar(),h.RBRACE}var r=this.strBuf
for(r.length=0,r[0]=String.fromCharCode(t);(t=this.nextChar())>=0&&(t>=65&&t<=90||t>=97&&t<=122);)r.push(String.fromCharCode(t))
var n=r.join("")
switch(n.toLowerCase()){case"if":return h.IF
case"ifelse":return h.IFELSE
default:return h.getOperator(n)}}},{key:"getNumber",value:function(){var e=this.currentChar,t=this.strBuf
for(t.length=0,t[0]=String.fromCharCode(e);(e=this.nextChar())>=0&&(e>=48&&e<=57||45===e||46===e);)t.push(String.fromCharCode(e))
var r=parseFloat(t.join(""))
if(isNaN(r))throw new a.FormatError("Invalid floating point number: ".concat(r))
return r}}]),e}()
t.PostScriptLexer=f},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.MurmurHash3_64=void 0
var a=r(6),i=function(e){function t(e){this.h1=e?4294967295&e:3285377520,this.h2=e?4294967295&e:3285377520}return t.prototype={update:function(e){var t,r
if((0,a.isString)(e)){t=new Uint8Array(2*e.length),r=0
for(var i=0,n=e.length;i<n;i++){var o=e.charCodeAt(i)
o<=255?t[r++]=o:(t[r++]=o>>>8,t[r++]=255&o)}}else{if(!(0,a.isArrayBuffer)(e))throw new Error("Wrong data format in MurmurHash3_64_update. Input must be a string or array.")
r=(t=e).byteLength}for(var s=r>>2,c=r-4*s,l=new Uint32Array(t.buffer,0,s),u=0,h=0,f=this.h1,d=this.h2,g=3432918353,m=461845907,p=0;p<s;p++)1&p?f=5*(f=(f^=u=(u=(u=(u=l[p])*g&4294901760|11601*u&65535)<<15|u>>>17)*m&4294901760|13715*u&65535)<<13|f>>>19)+3864292196:d=5*(d=(d^=h=(h=(h=(h=l[p])*g&4294901760|11601*h&65535)<<15|h>>>17)*m&4294901760|13715*h&65535)<<13|d>>>19)+3864292196
switch(u=0,c){case 3:u^=t[4*s+2]<<16
case 2:u^=t[4*s+1]<<8
case 1:u=(u=(u=(u^=t[4*s])*g&4294901760|11601*u&65535)<<15|u>>>17)*m&4294901760|13715*u&65535,1&s?f^=u:d^=u}return this.h1=f,this.h2=d,this},hexdigest:function(){var e=this.h1,t=this.h2
e=3981806797*(e^=t>>>1)&4294901760|36045*e&65535,e=444984403*(e^=(t=4283543511*t&4294901760|(2950163797*(t<<16|e>>>16)&4294901760)>>>16)>>>1)&4294901760|60499*e&65535
for(var r=0,a=[e^=(t=3301882366*t&4294901760|(3120437893*(t<<16|e>>>16)&4294901760)>>>16)>>>1,t],i="";r<a.length;r++){for(var n=(a[r]>>>0).toString(16);n.length<8;)n="0"+n
i+=n}return i}},t}()
t.MurmurHash3_64=i},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.PDFImage=void 0
var a=r(6),i=r(155),n=r(168),o=r(157),s=r(163),c=r(166)
var l=function(){function e(e,t){return t&&t.canDecode(e)?t.decode(e).catch(function(t){return(0,a.warn)("Native image decoding failed -- trying to recover: "+(t&&t.message)),e}):Promise.resolve(e)}function t(e,t,r,a){return(e=t+e*r)<0?0:e>a?a:e}function r(e,t,r,a,i,n){var o,s,c,l,u=i*n,h=t<=8?new Uint8Array(u):t<=16?new Uint16Array(u):new Uint32Array(u),f=r/i,d=a/n,g=0,m=new Uint16Array(i),p=r
for(o=0;o<i;o++)m[o]=Math.floor(o*f)
for(o=0;o<n;o++)for(c=Math.floor(o*d)*p,s=0;s<i;s++)l=c+m[s],h[g++]=e[l]
return h}function l(e){var t=e.xref,r=e.res,o=e.image,s=e.isInline,u=void 0!==s&&s,h=e.smask,f=void 0===h?null:h,d=e.mask,g=void 0===d?null:d,m=e.isMask,p=void 0!==m&&m,v=e.pdfFunctionFactory
this.image=o
var b=o.dict,y=b.get("Filter")
if((0,i.isName)(y))switch(y.name){case"JPXDecode":var w=new c.JpxImage
w.parseImageProperties(o.stream),o.stream.reset(),o.width=w.width,o.height=w.height,o.bitsPerComponent=w.bitsPerComponent,o.numComps=w.componentsCount
break
case"JBIG2Decode":o.bitsPerComponent=1,o.numComps=1}var k=b.get("Width","W"),S=b.get("Height","H")
if(Number.isInteger(o.width)&&o.width>0&&Number.isInteger(o.height)&&o.height>0&&(o.width!==k||o.height!==S)&&((0,a.warn)("PDFImage - using the Width/Height of the image data, rather than the image dictionary."),k=o.width,S=o.height),k<1||S<1)throw new a.FormatError("Invalid image width: ".concat(k," or ")+"height: ".concat(S))
this.width=k,this.height=S,this.interpolate=b.get("Interpolate","I")||!1,this.imageMask=b.get("ImageMask","IM")||!1,this.matte=b.get("Matte")||!1
var C=o.bitsPerComponent
if(!C&&!(C=b.get("BitsPerComponent","BPC"))){if(!this.imageMask)throw new a.FormatError("Bits per component missing in image: ".concat(this.imageMask))
C=1}if(this.bpc=C,!this.imageMask){var x=b.get("ColorSpace","CS")
if(!x)switch((0,a.info)("JPX images (which do not require color spaces)"),o.numComps){case 1:x=i.Name.get("DeviceGray")
break
case 3:x=i.Name.get("DeviceRGB")
break
case 4:x=i.Name.get("DeviceCMYK")
break
default:throw new Error("JPX images with ".concat(o.numComps," ")+"color components not supported.")}var A=u?r:null
this.colorSpace=n.ColorSpace.parse(x,t,A,v),this.numComps=this.colorSpace.numComps}if(this.decode=b.getArray("Decode","D"),this.needsDecode=!1,this.decode&&(this.colorSpace&&!this.colorSpace.isDefaultDecode(this.decode,C)||p&&!n.ColorSpace.isDefaultDecode(this.decode,1))){this.needsDecode=!0
var _=(1<<C)-1
this.decodeCoefficients=[],this.decodeAddends=[]
for(var P=this.colorSpace&&"Indexed"===this.colorSpace.name,I=0,O=0;I<this.decode.length;I+=2,++O){var E=this.decode[I],T=this.decode[I+1]
this.decodeCoefficients[O]=P?(T-E)/_:T-E,this.decodeAddends[O]=P?E:_*E}}f?this.smask=new l({xref:t,res:r,image:f,isInline:u,pdfFunctionFactory:v}):g&&((0,i.isStream)(g)?g.dict.get("ImageMask","IM")?this.mask=new l({xref:t,res:r,image:g,isInline:u,isMask:!0,pdfFunctionFactory:v}):(0,a.warn)("Ignoring /Mask in image without /ImageMask."):this.mask=g)}return l.buildImage=function(t){t.handler
var r,n,o=t.xref,s=t.res,c=t.image,u=t.isInline,h=void 0!==u&&u,f=t.nativeDecoder,d=void 0===f?null:f,g=t.pdfFunctionFactory,m=e(c,d),p=c.dict.get("SMask"),v=c.dict.get("Mask")
return p?(r=e(p,d),n=Promise.resolve(null)):(r=Promise.resolve(null),v?(0,i.isStream)(v)?n=e(v,d):Array.isArray(v)?n=Promise.resolve(v):((0,a.warn)("Unsupported mask format."),n=Promise.resolve(null)):n=Promise.resolve(null)),Promise.all([m,r,n]).then(function(e){var t=function(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=[],a=!0,i=!1,n=void 0
try{for(var o,s=e[Symbol.iterator]();!(a=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);a=!0);}catch(e){i=!0,n=e}finally{try{a||null==s.return||s.return()}finally{if(i)throw n}}return r}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}(e,3),r=t[0],a=t[1],i=t[2]
return new l({xref:o,res:s,image:r,isInline:h,smask:a,mask:i,pdfFunctionFactory:g})})},l.createMask=function(e){var t,r,a=e.imgArray,i=e.width,n=e.height,o=e.imageIsFromDecodeStream,s=e.inverseDecode,c=(i+7>>3)*n,l=a.byteLength
if(!o||s&&c!==l)if(s)for((t=new Uint8ClampedArray(c)).set(a),r=l;r<c;r++)t[r]=255
else(t=new Uint8ClampedArray(l)).set(a)
else t=a
if(s)for(r=0;r<l;r++)t[r]^=255
return{data:t,width:i,height:n}},l.prototype={get drawWidth(){return Math.max(this.width,this.smask&&this.smask.width||0,this.mask&&this.mask.width||0)},get drawHeight(){return Math.max(this.height,this.smask&&this.smask.height||0,this.mask&&this.mask.height||0)},decodeBuffer:function(e){var r,a,i=this.bpc,n=this.numComps,o=this.decodeAddends,s=this.decodeCoefficients,c=(1<<i)-1
if(1!==i){var l=0
for(r=0,a=this.width*this.height;r<a;r++)for(var u=0;u<n;u++)e[l]=t(e[l],o[u],s[u],c),l++}else for(r=0,a=e.length;r<a;r++)e[r]=+!e[r]},getComponents:function(e){var t=this.bpc
if(8===t)return e
var r,a,i=this.width,n=this.height,o=this.numComps,s=i*n*o,c=0,l=t<=8?new Uint8Array(s):t<=16?new Uint16Array(s):new Uint32Array(s),u=i*o,h=(1<<t)-1,f=0
if(1===t)for(var d,g,m,p=0;p<n;p++){for(g=f+(-8&u),m=f+u;f<g;)a=e[c++],l[f]=a>>7&1,l[f+1]=a>>6&1,l[f+2]=a>>5&1,l[f+3]=a>>4&1,l[f+4]=a>>3&1,l[f+5]=a>>2&1,l[f+6]=a>>1&1,l[f+7]=1&a,f+=8
if(f<m)for(a=e[c++],d=128;f<m;)l[f++]=+!!(a&d),d>>=1}else{var v=0
for(a=0,f=0,r=s;f<r;++f){for(f%u==0&&(a=0,v=0);v<t;)a=a<<8|e[c++],v+=8
var b=v-t,y=a>>b
l[f]=y<0?0:y>h?h:y,a&=(1<<b)-1,v=b}}return l},fillOpacity:function(e,t,i,n,o){var s,c,u,h,f,d,g=this.smask,m=this.mask
if(g)c=g.width,u=g.height,s=new Uint8ClampedArray(c*u),g.fillGrayBuffer(s),c===t&&u===i||(s=r(s,g.bpc,c,u,t,i))
else if(m)if(m instanceof l){for(c=m.width,u=m.height,s=new Uint8ClampedArray(c*u),m.numComps=1,m.fillGrayBuffer(s),h=0,f=c*u;h<f;++h)s[h]=255-s[h]
c===t&&u===i||(s=r(s,m.bpc,c,u,t,i))}else{if(!Array.isArray(m))throw new a.FormatError("Unknown mask format.")
s=new Uint8ClampedArray(t*i)
var p=this.numComps
for(h=0,f=t*i;h<f;++h){var v=0,b=h*p
for(d=0;d<p;++d){var y=o[b+d],w=2*d
if(y<m[w]||y>m[w+1]){v=255
break}}s[h]=v}}if(s)for(h=0,d=3,f=t*n;h<f;++h,d+=4)e[d]=s[h]
else for(h=0,d=3,f=t*n;h<f;++h,d+=4)e[d]=255},undoPreblend:function(e,t,r){var a=this.smask&&this.smask.matte
if(a)for(var i=this.colorSpace.getRgb(a,0),n=i[0],o=i[1],s=i[2],c=t*r*4,l=0;l<c;l+=4){var u=e[l+3]
if(0!==u){var h=255/u
e[l]=(e[l]-n)*h+n,e[l+1]=(e[l+1]-o)*h+o,e[l+2]=(e[l+2]-s)*h+s}else e[l]=255,e[l+1]=255,e[l+2]=255}},createImageData:function(){var e,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],r=this.drawWidth,i=this.drawHeight,n={width:r,height:i,kind:0,data:null},c=this.numComps,l=this.width,u=this.height,h=this.bpc,f=l*c*h+7>>3
if(!t){var d
if("DeviceGray"===this.colorSpace.name&&1===h?d=a.ImageKind.GRAYSCALE_1BPP:"DeviceRGB"!==this.colorSpace.name||8!==h||this.needsDecode||(d=a.ImageKind.RGB_24BPP),d&&!this.smask&&!this.mask&&r===l&&i===u){if(n.kind=d,e=this.getImageBytes(u*f),this.image instanceof o.DecodeStream)n.data=e
else{var g=new Uint8ClampedArray(e.length)
g.set(e),n.data=g}if(this.needsDecode){(0,a.assert)(d===a.ImageKind.GRAYSCALE_1BPP,"PDFImage.createImageData: The image must be grayscale.")
for(var m=n.data,p=0,v=m.length;p<v;p++)m[p]^=255}return n}if(this.image instanceof s.JpegStream&&!this.smask&&!this.mask){var b=u*f
switch(this.colorSpace.name){case"DeviceGray":b*=3
case"DeviceRGB":case"DeviceCMYK":return n.kind=a.ImageKind.RGB_24BPP,n.data=this.getImageBytes(b,r,i,!0),n}}}var y,w,k=0|(e=this.getImageBytes(u*f)).length/f*i/u,S=this.getComponents(e)
return t||this.smask||this.mask?(n.kind=a.ImageKind.RGBA_32BPP,n.data=new Uint8ClampedArray(r*i*4),y=1,w=!0,this.fillOpacity(n.data,r,i,k,S)):(n.kind=a.ImageKind.RGB_24BPP,n.data=new Uint8ClampedArray(r*i*3),y=0,w=!1),this.needsDecode&&this.decodeBuffer(S),this.colorSpace.fillRgb(n.data,l,u,r,i,k,h,S,y),w&&this.undoPreblend(n.data,r,k),n},fillGrayBuffer:function(e){var t=this.numComps
if(1!==t)throw new a.FormatError("Reading gray scale from a color image: ".concat(t))
var r,i,n=this.width,o=this.height,s=this.bpc,c=n*t*s+7>>3,l=this.getImageBytes(o*c),u=this.getComponents(l)
if(1!==s){this.needsDecode&&this.decodeBuffer(u),i=n*o
var h=255/((1<<s)-1)
for(r=0;r<i;++r)e[r]=h*u[r]}else if(i=n*o,this.needsDecode)for(r=0;r<i;++r)e[r]=u[r]-1&255
else for(r=0;r<i;++r)e[r]=255&-u[r]},getImageBytes:function(e,t,r){var a=arguments.length>3&&void 0!==arguments[3]&&arguments[3]
return this.image.reset(),this.image.drawWidth=t||this.width,this.image.drawHeight=r||this.height,this.image.forceRGB=!!a,this.image.getBytes(e,!0)}},l}()
t.PDFImage=l},function(e,t,r){"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.MessageHandler=f
var a,i=(a=r(2))&&a.__esModule?a:{default:a},n=r(6)
function o(e){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t,r,a,i,n,o){try{var s=e[n](o),c=s.value}catch(e){return void r(e)}s.done?t(c):Promise.resolve(c).then(a,i)}function c(e,t){return function(){var e
return(e=i.default.mark(function e(t,r){var a,n=arguments
return i.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.length>2&&void 0!==n[2]?n[2]:null,t){e.next=3
break}return e.abrupt("return")
case 3:return e.abrupt("return",t.apply(a,r))
case 4:case"end":return e.stop()}},e,this)}),function(){var t=this,r=arguments
return new Promise(function(a,i){var n=e.apply(t,r)
function o(e){s(n,a,i,o,c,"next",e)}function c(e){s(n,a,i,o,c,"throw",e)}o(void 0)})}).apply(this,arguments)}.apply(this,arguments)}function l(e){if("object"!==o(e))return e
switch(e.name){case"AbortException":return new n.AbortException(e.message)
case"MissingPDFException":return new n.MissingPDFException(e.message)
case"UnexpectedResponseException":return new n.UnexpectedResponseException(e.message,e.status)
default:return new n.UnknownErrorException(e.message,e.details)}}function u(e){return!(e instanceof Error)||e instanceof n.AbortException||e instanceof n.MissingPDFException||e instanceof n.UnexpectedResponseException||e instanceof n.UnknownErrorException?e:new n.UnknownErrorException(e.message,e.toString())}function h(e,t,r){t?e.resolve():e.reject(r)}function f(e,t,r){var a=this
this.sourceName=e,this.targetName=t,this.comObj=r,this.callbackId=1,this.streamId=1,this.postMessageTransfers=!0,this.streamSinks=Object.create(null),this.streamControllers=Object.create(null)
var i=this.callbacksCapabilities=Object.create(null),n=this.actionHandler=Object.create(null)
this._onComObjOnMessage=function(e){var t=e.data
if(t.targetName===a.sourceName)if(t.stream)a._processStreamMessage(t)
else if(t.isReply){var o=t.callbackId
if(!(t.callbackId in i))throw new Error("Cannot resolve callback ".concat(o))
var s=i[o]
delete i[o],"error"in t?s.reject(l(t.error)):s.resolve(t.data)}else{if(!(t.action in n))throw new Error("Unknown action from worker: ".concat(t.action))
var c=n[t.action]
if(t.callbackId){var h=a.sourceName,f=t.sourceName
Promise.resolve().then(function(){return c[0].call(c[1],t.data)}).then(function(e){r.postMessage({sourceName:h,targetName:f,isReply:!0,callbackId:t.callbackId,data:e})},function(e){r.postMessage({sourceName:h,targetName:f,isReply:!0,callbackId:t.callbackId,error:u(e)})})}else t.streamId?a._createStreamSink(t):c[0].call(c[1],t.data)}},r.addEventListener("message",this._onComObjOnMessage)}f.prototype={on:function(e,t,r){var a=this.actionHandler
if(a[e])throw new Error('There is already an actionName called "'.concat(e,'"'))
a[e]=[t,r]},send:function(e,t,r){var a={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t}
this.postMessage(a,r)},sendWithPromise:function(e,t,r){var a=this.callbackId++,i={sourceName:this.sourceName,targetName:this.targetName,action:e,data:t,callbackId:a},o=(0,n.createPromiseCapability)()
this.callbacksCapabilities[a]=o
try{this.postMessage(i,r)}catch(e){o.reject(e)}return o.promise},sendWithStream:function(e,t,r,a){var i=this,o=this.streamId++,s=this.sourceName,c=this.targetName
return new n.ReadableStream({start:function(r){var a=(0,n.createPromiseCapability)()
return i.streamControllers[o]={controller:r,startCall:a,isClosed:!1},i.postMessage({sourceName:s,targetName:c,action:e,streamId:o,data:t,desiredSize:r.desiredSize}),a.promise},pull:function(e){var t=(0,n.createPromiseCapability)()
return i.streamControllers[o].pullCall=t,i.postMessage({sourceName:s,targetName:c,stream:"pull",streamId:o,desiredSize:e.desiredSize}),t.promise},cancel:function(e){var t=(0,n.createPromiseCapability)()
return i.streamControllers[o].cancelCall=t,i.streamControllers[o].isClosed=!0,i.postMessage({sourceName:s,targetName:c,stream:"cancel",reason:e,streamId:o}),t.promise}},r)},_createStreamSink:function(e){var t=this,r=this,a=this.actionHandler[e.action],i=e.streamId,o=e.desiredSize,s=this.sourceName,l=e.sourceName,u=(0,n.createPromiseCapability)(),h=function(e){var r=e.stream,a=e.chunk,n=e.transfers,o=e.success,c=e.reason
t.postMessage({sourceName:s,targetName:l,stream:r,streamId:i,chunk:a,success:o,reason:c},n)},f={enqueue:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,r=arguments.length>2?arguments[2]:void 0
if(!this.isCancelled){var a=this.desiredSize
this.desiredSize-=t,a>0&&this.desiredSize<=0&&(this.sinkCapability=(0,n.createPromiseCapability)(),this.ready=this.sinkCapability.promise),h({stream:"enqueue",chunk:e,transfers:r})}},close:function(){this.isCancelled||(this.isCancelled=!0,h({stream:"close"}),delete r.streamSinks[i])},error:function(e){this.isCancelled||(this.isCancelled=!0,h({stream:"error",reason:e}))},sinkCapability:u,onPull:null,onCancel:null,isCancelled:!1,desiredSize:o,ready:null}
f.sinkCapability.resolve(),f.ready=f.sinkCapability.promise,this.streamSinks[i]=f,c(a[0],[e.data,f],a[1]).then(function(){h({stream:"start_complete",success:!0})},function(e){h({stream:"start_complete",success:!1,reason:e})})},_processStreamMessage:function(e){var t=this,r=this.sourceName,a=e.sourceName,i=e.streamId,o=function(e){var n=e.stream,o=e.success,s=e.reason
t.comObj.postMessage({sourceName:r,targetName:a,stream:n,success:o,streamId:i,reason:s})},s=function(){Promise.all([t.streamControllers[e.streamId].startCall,t.streamControllers[e.streamId].pullCall,t.streamControllers[e.streamId].cancelCall].map(function(e){return e&&(t=e.promise,Promise.resolve(t).catch(function(){}))
var t})).then(function(){delete t.streamControllers[e.streamId]})}
switch(e.stream){case"start_complete":h(this.streamControllers[e.streamId].startCall,e.success,l(e.reason))
break
case"pull_complete":h(this.streamControllers[e.streamId].pullCall,e.success,l(e.reason))
break
case"pull":if(!this.streamSinks[e.streamId]){o({stream:"pull_complete",success:!0})
break}this.streamSinks[e.streamId].desiredSize<=0&&e.desiredSize>0&&this.streamSinks[e.streamId].sinkCapability.resolve(),this.streamSinks[e.streamId].desiredSize=e.desiredSize,c(this.streamSinks[e.streamId].onPull).then(function(){o({stream:"pull_complete",success:!0})},function(e){o({stream:"pull_complete",success:!1,reason:e})})
break
case"enqueue":(0,n.assert)(this.streamControllers[e.streamId],"enqueue should have stream controller"),this.streamControllers[e.streamId].isClosed||this.streamControllers[e.streamId].controller.enqueue(e.chunk)
break
case"close":if((0,n.assert)(this.streamControllers[e.streamId],"close should have stream controller"),this.streamControllers[e.streamId].isClosed)break
this.streamControllers[e.streamId].isClosed=!0,this.streamControllers[e.streamId].controller.close(),s()
break
case"error":(0,n.assert)(this.streamControllers[e.streamId],"error should have stream controller"),this.streamControllers[e.streamId].controller.error(l(e.reason)),s()
break
case"cancel_complete":h(this.streamControllers[e.streamId].cancelCall,e.success,l(e.reason)),s()
break
case"cancel":if(!this.streamSinks[e.streamId])break
c(this.streamSinks[e.streamId].onCancel,[l(e.reason)]).then(function(){o({stream:"cancel_complete",success:!0})},function(e){o({stream:"cancel_complete",success:!1,reason:e})}),this.streamSinks[e.streamId].sinkCapability.reject(l(e.reason)),this.streamSinks[e.streamId].isCancelled=!0,delete this.streamSinks[e.streamId]
break
default:throw new Error("Unexpected stream case")}},postMessage:function(e,t){t&&this.postMessageTransfers?this.comObj.postMessage(e,t):this.comObj.postMessage(e)},destroy:function(){this.comObj.removeEventListener("message",this._onComObjOnMessage)}}}])})
