"use strict";function mash(n,e){return Object.assign({},n,e)}function memoizeWith(n){return function memoize(e){const t={};return function memoized(){const r=Array.from(arguments),o=n(r);return o&&t[o]||(t[o]=e.apply(null,r)),t[o]}}}function defaultMemoizer(n){let[e,t]=n;return e.concat(t).map(n=>"symbol"==typeof n?function symbolToString(n){return""+n.toString()}(n):n&&"object"==typeof n?Object.entries(n).reduce((n,[e,t])=>n+"-"+e+":"+t,""):n)}function makeTypechecker(n,e=defaultMemoizer){return memoizeWith(e)((function rawMakeTypeChecker(e,t){if(!Array.isArray(e)||!Array.isArray(e))throw new TypeError("makeTypechecker needs two valid lists of types to run");const r=e[e.length-1],o=e.slice(0,e.length-1);return o.slice(0,t.length).map((function typeCheckParam(e,r){const o=n(t[r]),c=a(o,e);return{idx:r,raw:Object.freeze({value:t[r]}),actual:o,expected:e,success:c}})).reduce((function typeCheckOutcomes(n,e){const t=e.success?"valid":"invalid",r=mash(n,{[t]:n[t].concat([e]),rawParams:n.rawParams.concat([e])});return mash(r,{failures:n.failures||r.invalid.length>0})}),{rawParams:[],invalid:[],valid:[],signature:e.join(" -> "),params:o,returnType:r,given:t})}))}function checkParamsWith(n){return function checkParams(e,t){return!makeTypechecker(n)(e,t).failures}}function checkReturnWith(n){return function checkReturn(e){return function checkReturnTypeValidoutcomeAB(t,r){const o=n(e),c=makeTypechecker(n)(t,r).returnType;return a(c,o)}}}function system(n){let e=n&&n.constructor&&n.constructor.name||"Global",t=typeof n;return n||("undefined"===t||"object"===t?t="nil":e="Boolean"),`${e}${f}${t}`}function toString(n,e=[]){return function functionToString(){return`curry(${n.name||"fn"})${e.length>0?`(${e.join(",")})`:""}`}}function hmError(n,e,t){return`Given ${n}( ${e&&e.join(", ")} ) but expected ${n}( ${t.map(n=>Array.isArray(n)?n.join("|"):n).slice(0,e.length).join(", ")} )`}function DEFAULT_PLACEHOLDER_TEST(n){return n===p}function fabricate(n){const{test:e=DEFAULT_PLACEHOLDER_TEST}=n,t=function defineFunctionWithParameterTest(n){return function funcfunc({ts:e=system,n:t,hm:r,check:o}){if(o){if("function"!=typeof e)throw new TypeError("Expected typeSystem to be a function.");if(!r||!Array.isArray(r))throw new TypeError("Expected hm to be an array of strings.")}return function currified(c){function curried(){function saucy(){const e=Array.from(arguments);return curried.apply(this,i(n,e))}const n=Array.from(arguments),f=r&&Array.isArray(r)?r.length-1:t&&"number"==typeof t?t:c.length,s=a(n)?u(n):n.length;if(saucy.toString=toString(c,n),s>=f){const t=c.apply(this,n);if(o){const o=makeTypechecker(e)(r,n);if(!checkParamsWith(e)(r,n)){const{rawParams:n,params:e}=o;throw new TypeError(hmError(c.name,n.map(n=>n.actual),e.map(m)))}if(!checkReturnWith(e)(t)(r,n)){const{returnType:n}=o;throw new TypeError(`Expected ${c.name} to return ${m(n)} but got ${system(t)}.`)}}return t}return saucy}const u=function testCurryGaps(n){return function testCurryCapsByTaste(e){return e.reduce((function doesCurryTasteGood(e,t){return n(t)?e:e+1}),0)}}(n),i=function makeParamMerger(n){return function compareParams(e,t){return e.map((function testGaps(e){return n(e)&&t[0]?t.shift():e})).concat(t)}}(n),a=function some(n){return function someInList(e){return e.some(n)}}(n);return curried.toString=toString(c),curried}}}(e),r=t(mash(n,{n:!1,check:!1})),o=r((function _curryN(e,r){return t(mash(n,{n:e,check:!1}))(r)}));return{def:t,curry:r,curryN:o}}function ofConstructor(n){return function ofConstructorsAndMagic(e){return e&&e.constructor===n||e instanceof n}}function isUnmatched(n){return n===N}function pipe(){const n=Array.from(arguments),e=n.filter(n=>"function"!=typeof n);if(0!==e.length)throw new TypeError("Expected to receive functions as arguments, but received: "+e.map((n,e)=>`[${e}] = ${n}`).join(" ; "));return function piped(e){const t=n.length;let r=0,o=e;for(;r<t;){o=(0,n[r])(o),r+=1}return o}}function makeAliases(n){return n.temper(n,{I:n.identity,K:n.constant,PLACEHOLDER:n.$,__:n.$,always:n.constant,entries:n.toPairs,every:n.all,fromEntries:n.fromPairs,merge:n.mash,mergeAll:n.smash,mergeRight:n.jam,sideEffect2:n.binarySideEffect,some:n.any})}function length(n){return n&&"object"==typeof n?Object.keys(n).length:n.length}function makeIterable(n){const e=Array.isArray(n);if(!e&&!(n&&"object"==typeof n))throw new TypeError("Expected iterable initial value to be either an array or an object.");const t=length(n),r=e?Array(t):{},o=!e&&Object.keys(n);return{length:t,iterate:function iterate(t){const r=e?t:o[t];return{key:r,value:n[r]}},init:r,isArray:e}}function extendDerived(n){return n.reduce((function extendFUtility(e,[t,r,o]){const c=r(e);if(!t.includes("__")){const r=n.def({check:!0,hm:o})(c);return e.mash(e,{[t]:r})}return e.mash(e,c)}),n,En)}function extendBinaryWithSignatures(n){return n.temper(n,Tn.reduce((e,[t,r])=>n.mash(e,{[r.name]:n.def({n:2,check:!0,hm:t})(r)}),{}))}function extendTernaryWithSignatures(n){return n.temper(n,_n.reduce((e,[t,r])=>n.mash(e,{[r.name]:n.def({n:3,check:!0,hm:t})(r)}),{}))}function extendQuaternaryWithSignatures(n){return n.temper(n,On.reduce((e,[t,r])=>n.mash(e,{[r.name]:n.def({n:4,check:!0,hm:t})(r)}),{}))}function coreWithTypes(t){return pipe(fabricate,(function basicDefinitions({def:t,curry:r,curryN:o}){const c=function makeSignedCore(n){return un.reduce((function petition(t,[r,o]){return e(t,{[o.name]:n({hm:r,check:!0})(o)})}),cn)}(t),u=function makeSideEffectsFromEnvWithTypes(n){const e=n({check:!0,hm:["function","any","any"]})((function _sideEffect(n,e){return n(e),e})),t=n({check:!0,hm:["function","any","any","any"]})((function _binarySideEffect(n,e,t){return n(e,t),t})),r=t(console.log);return{sideEffect:e,binarySideEffect:t,trace:r,inspect:n({check:!0,hm:["function","function","any","any","any"]})((function _inspect(n,e,t,r){return n(t,e(r)),r}))}}(t),i=function autoCurryUsing(n){return function autoCurry(e){return Object.keys(e).map((function wrapCurry(t){const r=e[t];return[t,"function"==typeof r&&r.length?n(r.length,r):r]})).reduce((n,[e,t])=>Object.assign({},n,{[e]:t}),{})}}(o),a=c.smash([i(c),u,{memoizeWith:memoizeWith,def:t,curry:r,curryN:o,C:n,$:n.$,is:ofConstructor,isArray:w,isBoolean:v,isFunction:O,isNumber:_,isRawObject:C,isString:E,isSymbol:I,isUndefined:k,isUnmatched:isUnmatched}]);return a.pipe(extendBinaryWithSignatures,i,extendTernaryWithSignatures,i,extendQuaternaryWithSignatures,i,extendDerived,makeAliases)(a)}))(t)}const n=Object.freeze({$:"@@FUTILITY::constant.magic",UNMATCHED:"@@FUTILITY::constant.unmatched",b:"\b",f:"\f",n:"\n",t:"\t",r:"\r",q:"'",qq:'"',s:"\\",__of__:"∋",UNION_TYPE_DELIMITER:"|"}),e=mash,t=memoizeWith,r=memoizeWith((function basicMemo(n){return n}))((function unionType(n){return n.split("|")})),{__of__:o}=n,c=memoizeWith(n=>n)(n=>{const e=n.indexOf(o);return e>-1?n.slice(0,e):n}),{__of__:u}=n,i=memoizeWith(n=>n)(n=>{const e=n.indexOf(u);return e>-1?n.slice(e+1):n}),a=memoizeWith(n=>n)((function _compareTypes(n,e){const[t,o]=[n,e].map(r),u=t.length>1,a=o.length>1,f=t.map(n=>o.map(e=>"any"===n||"any"===e||n===e||c(n)===c(e)||i(n)===i(e))),s=f.reduce((n,e)=>n.concat(0===e.filter(n=>!n).length),[]).filter(Boolean);if(!u&&!a)return s.length>0;return f.reduce((n,e)=>n.concat(e),[]).reduce((n,e)=>n||e,!1)})),{__of__:f}=n,s=Object.freeze({string:"String∋string",number:"Number∋number",boolean:"Boolean∋boolean",function:"Function∋function",object:"Object∋object",undefined:"Global∋nil",symbol:"Symbol∋symbol",nil:"Global∋nil"}),{UNION_TYPE_DELIMITER:y,__of__:l}=n,m=function unionArchetype(n){return function arch(e){if(e&&e.indexOf&&e.indexOf(y)>-1&&n)return e.split(y).map(n=>unionArchetype(!1)(n));const t=s[e];return t||(e[0].toUpperCase()===e[0]?`${e}${l}object`:e)}}(!0),{$:p}=n;fabricate(DEFAULT_PLACEHOLDER_TEST);const[h,b,d,g,A,j]=[String,Number,Function,Boolean,Symbol,Object].map(ofConstructor),k=function ofType(n){return function compareTypeofs(e){return typeof e===n}}("undefined"),E=h,_=b,O=d,v=g,I=A,C=j,w=Array.isArray,{UNMATCHED:N}=n,S=pipe,P=function box(n){return[n]},x=function dissoc(n,e){const t=Object.assign({},e);return delete t[n],t},D=function assoc(n,e,t){return Object.assign({},t,{[n]:e})},U=function init(n){return n.slice(0,-1)},$=function tail(n){return n.slice(1)},W=function append(n,e){const t=[].concat(e);return t.splice(t.length,0,n),t},L=function prepend(n,e){const t=[].concat(e);return t.splice(0,0,n),t},z=function adjust(n,e,t){const r=[].concat(t),o=n<0?r.length+n:n;return r[o]=e(r[o]),r},M=function update(n,e,t){const r=[].concat(t);return r[n<0?r.length+n:n]=e,r},q=function inc(n){return n+1},H=function dec(n){return n-1},R=function call(n){return n[0].apply(null,n.slice(1))},B=function mode(n){const e={};let t=0,r=-1,o=-1;for(;t<n.length;){const r=n[t];e[r]||(e[r]=0),e[r]+=1,t+=1}t=0;const c=Object.keys(e);for(;t<c.length;){const n=e[c[t]];n>r&&(r=n,o=c[t]),t+=1}const u=parseInt(o);return isNaN(u)?o:u},Y=function complement(n){return function subtleComplement(){const e=Array.from(arguments);return!n.apply(null,e)}},G=function constant(n){return function forever(){return n}},K=function F(){return!0},J=function first(n){return n[0]},V=function fromPairs(n){return n.reduce((function pairing(n,[e,t]){return Object.assign({},n,{[e]:t})}),{})},Q=function identity(n){return n},X=function jam(n,e){return Object.assign({},e,n)},Z=function last(n){return n[n.length-1]},nn=length,en=Array.isArray,tn=Object.keys,rn=Object.freeze,on=Math.round;var cn=Object.freeze({__proto__:null,isArray:en,keys:tn,freeze:rn,round:on});const un=[[["boolean"],K],[["boolean"],function T(){return!0}],[["number","function","Array","Array"],z],[["any","Array","Array"],W],[["any","string|number","object","object"],D],[["string|number","object","object"],x],[["any","Array"],P],[["Array","any"],R],[["function","function"],Y],[["any","function"],G],[["number","number"],H],[["Array","any"],J],[["Array","object"],V],[["any","any"],Q],[["number","number"],q],[["object","object","object"],X],[["Array","any"],Z],[["Array","Array"],U],[["Array","Array"],$],[["any","number|nil"],nn],[["object","object","object"],e],[["Array","number"],function mean(n){let e=0,t=0;for(;e<n.length;)t+=n[e],e+=1;return t/n.length}],[["Array","any"],B],[["function","function"],t],[["any","boolean"],function not(n){return!n}],[["any","any"],S],[["any","Array","Array"],L],[["Array","Array"],function reverse(n){const e=makeIterable(n);let t=e.length;const r=e.init;for(;t>-1;){const{value:n}=e.iterate(t);r[e.length-1-t]=n,t-=1}return r}],[["Array","object"],function smash(n){return n.reduce((n,e)=>Object.assign({},n,e),{})}],[["Array","any"],function smooth(n){return n.filter(Boolean)}],[["object","object","object"],function temper(n,e){return Object.freeze(Object.assign({},n,e))}],[["string","string"],function toLower(n){return n.toLowerCase()}],[["object","Array"],function toPairs(n){return Object.keys(n).map((function enpair(e){return[e,n[e]]}))}],[["string","string"],function toUpper(n){return n.toUpperCase()}],[["number","any","Array","Array"],M]],an=function makeChain({curryN:n,map:e,pipe:t,reduce:r,concat:o}){return n(fn,(function chain(n,c){return c&&"function"==typeof c.chain?c.chain(n):"function"==typeof c?e=>n(c(e),e):t(e(n),r(o,[]))(c)}))},fn=2,sn=function makePluck({curryN:n,map:e,prop:t}){return n(yn,(function pluck(n,r){return e(t(n),r)}))},yn=2,ln=function makeDifference({curryN:n,filter:e,includes:t,complement:r}){return n(mn,(function difference(n,o){return e(r(t(o)),n)}))},mn=2,pn=function makePathOr({curryN:n,reduce:e}){return n(hn,(function pathOr(n,t,r){return e((function walkPathOr(e,t){return e&&e[t]||n}),r,t)}))},hn=3,bn=function makeReject({curryN:n,filter:e,complement:t}){return n(dn,(function reject(n,r){return e(t(n),r)}))},dn=2,gn=function makeSymmetricDifference({curryN:n}){return n(An,(function symmetricDifference(n,e){const t=makeIterable(n),r=makeIterable(e),o=[];let c=0;for(;c<t.length;){const{value:n}=t.iterate(c);e.includes(n)||o.push(n),c+=1}let u=0;for(;u<r.length;){const{value:e}=r.iterate(u);n.includes(e)||o.push(e),u+=1}return o}))},An=2,jn=function makeUnion({uniq:n,curryN:e,pipe:t,concat:r}){return e(kn,(function union(e,o){return t(r(o),n)(e)}))},kn=2,En=[["j2",function makeJ2({toJSON:n}){return n(2)},["any","string"]],["addIndex",function makeAddIndex({curryN:n}){return function addIndex(e){return n(e.length,(function indexAddedIter(){let n=0;const t=Array.prototype.slice.call(arguments,0),[r]=t,o=t[t.length-1];return t[0]=function indexAdded(){const e=r.apply(this,[].concat(arguments).concat([n,o]));return n+=1,e},e.apply(this,t)}))}},["function","function"]],["bind",function makeBind({curryN:n}){return n(2,(function bind(e,t){function bound(){return e.apply(t,arguments)}return e.length>1?n(e.length,bound):bound}))},["function","object","function"]],["flip",function makeFlip({curryN:n}){return function flip(e){return n(2,(function flipped(n,t){return e(t,n)}))}},["function","function"]],["__ifElse",function makeIfElseDerivatives({ifElse:n,identity:e,$:t}){return{when:n(t,t,e),unless:n(t,e)}},!1],["flatten",function makeFlatten({isArray:n,forEach:e}){return function flatten(t){let r=0;const o=makeIterable(t);let c=[];for(;r<o.length;){let{value:t}=o.iterate(r);n(t)?(t=flatten(t),e(n=>c.push(n),t)):c.push(t),r+=1}return c}},["Array","Array"]],["chain",an,["function","function|Array|object","function|Array"]],["reject",bn,["function","object","object"]],["uniq",function makeUniq({reduce:n}){return n((function unique(n,e){return n.includes(e)?n:n.concat(e)}),[])},["Array","Array"]],["median",function makeMedian({$:n,dec:e,pipe:t,length:r,nth:o,sort:c,divide:u}){return t(c((n,e)=>n-e),c=>t(r,e,u(2),Math.round,o(n,c))(c))},["Array","number"]],["isObject",function makeIsObject({both:n,isRawObject:e}){return function isObject(t){return n(e,Boolean)(t)}},["any","boolean"]],["union",jn,["Array","Array","Array"]],["difference",ln,["Array","Array","Array"]],["symmetricDifference",gn,["Array","Array","Array"]],["__predicatesPass",function makePredicatesPass({def:n,pipe:e,map:t,flip:r,any:o,all:c,smooth:u,length:i,gt:a}){function predFor(o){return n({check:!0,hm:["Array","Array","boolean"]})((function predPass(n,c){return e(t(r(o)(c)),u,i,a(0))(n)}))}return{anyPass:predFor(o),allPass:predFor(c)}},!1],["pathOr",pn,["any","Array","Array|object","any"]],["__pathOrDerivatives",function makePathOrDerivatives({equals:e,is:t,def:r,pipe:o,pathOr:c}){function deriveFromAccessor(c){return{accIs:r({check:!0,hm:["function","Array|string","object","boolean"]})((function pathIsOfConstructor(e,r,u){return o(c(n.UNMATCHED,r),t(e))(u)})),unsafe:c(null),eq:r({check:!0,hm:["Array|string","any","object","boolean"]})((function equivalence(t,r,u){return o(c(n.UNMATCHED,t),e(r))(u)})),satisfies:r({check:!0,hm:["function","Array|string","object","boolean"]})((function satisfaction(e,t,r){return o(c(n.UNMATCHED,t),e,Boolean)(r)}))}}const{unsafe:u,eq:i,satisfies:a,accIs:f}=deriveFromAccessor(c),s=r({check:!0,hm:["any","number|string","object","any"]})((function _propOr(n,e,t){return c(n,[e],t)})),{unsafe:y,eq:l,satisfies:m,accIs:p}=deriveFromAccessor(s);return{path:u,pathEq:i,pathSatisfies:a,pathIs:f,propOr:s,prop:y,propEq:l,propSatisfies:m,propIs:p}},!1],["pluck",sn,["string","Array|object","Array|object"]]],Tn=[[["number","number","boolean"],function gt(n,e){return e>n}],[["number","number","boolean"],function gte(n,e){return e>=n}],[["number","number","boolean"],function lt(n,e){return e<n}],[["number","number","boolean"],function lte(n,e){return e<=n}],[["any","any","boolean"],function and(n,e){return n&&e}],[["any","any","boolean"],function equals(n,e){return n===e}],[["any","any","boolean"],function or(n,e){return n||e}],[["number","number","number"],function subtract(n,e){return e-n}],[["number","number","number"],function add(n,e){return e+n}],[["number","number","number"],function divide(n,e){return e/n}],[["number","number","number"],function multiply(n,e){return e*n}],[["function","Array|object","boolean"],function all(n,e){let t=0;const r=makeIterable(e);let o=!0;for(;t<r.length&&o;){const{value:e}=r.iterate(t);n(e)||(o=!1),t+=1}return o}],[["function","object","boolean"],function any(n,e){let t=0,r=!1;const o=length(e);for(;t<o&&!r;)n(e[t])&&(r=!0),t+=1;return r}],[["function","object","object"],function filter(n,e){let t=0;const r=makeIterable(e),{length:o,isArray:c}=r,u=c?[]:{};for(;t<o;){const{key:e,value:o}=r.iterate(t);n(o)&&(c?u.push(o):u[e]=o),t+=1}return u}],[["function","object","any"],function find(n,e){let t=0;const r=makeIterable(e);for(;t<r.length;){const{value:e}=r.iterate(t);if(n(e))return e;t+=1}}],[["function","object","nil"],function forEach(n,e){let t=0;const r=makeIterable(e),{length:o}=r;for(;t<o;){const{value:e}=r.iterate(t);n(e),t+=1}}],[["Array|string","Array|string","boolean"],function includes(n,e){return n.includes(e)}],[["number","number"],function min(n,e){return Math.min(n,e)}],[["number","number"],function max(n,e){return Math.max(n,e)}],[["function|Array","function|Array","function|Array"],function ap(n,e){if(O(n)&&O(e))return function sCombinator(t){return n(t,e(t))};if(!w(n)||!w(e))throw new TypeError("Expected to receive an array of functions and an array of values.");if(!n.length||n.filter(O).length!==n.length)throw new TypeError("Expected to receive an array of functions to apply.");return n.reduce((function apReduce(n,t){return n.concat(e.map(t))}),[])}],[["any","any","Array|String"],function concat(n,e){return n.concat(e)}],[["function","object","object"],function map(n,e){let t=0;const r=makeIterable(e),{length:o,init:c}=r,u=c;for(;t<o;){const{key:e,value:o}=r.iterate(t);u[e]=n(o),t+=1}return u}],[["Array","any","any"],function cond(n,e){let t,r=0,o=!1;const c=length(n);for(;r<c&&!o;){const[c,u]=n[r];c(e)&&(o=!0,t=u(e)),r+=1}return t}],[["function","Array","any"],function apply(n,e){return n.apply(null,e)}],[["number","Array","any"],function nth(n,e){return n<0&&e.length+n?e[e.length+n]:e[n]}],[["number","number","Array"],function range(n,e){const t=[],r=e<n;for(let o=n;r?o>=e:o<=e;r?o--:o++)t.push(o);return t}],[["string","Array","string"],function join(n,e){return e.join(n)}],[["function","Array","Array"],function sort(n,e){const t=[].concat(e);return t.sort(n),t}],[["string","string","Array"],function split(n,e){return e.split(n)}],[["number","any","string"],function toJSON(n,e){return JSON.stringify(e,null,n)}]],_n=[[["function","function","any","boolean"],function both(n,e,t){return n(t)&&e(t)}],[["function","function","any"],function either(n,e,t){return n(t)||e(t)}],[["function","any","object","any"],function reduce(n,e,t){const r=makeIterable(t);let o=0;const{length:c}=r;let u=e;for(;o<c;){const{value:e}=r.iterate(o);u=n(u,e),o+=1}return u}],[["number","number","object","object"],function slice(n,e,t){return t.slice(n,e)}]],On=[[["function","function","function","any","any"],function ifElse(n,e,t,r){return n(r)?e(r):t(r)}]],vn=Object.freeze({UNCHECKED:{name:"@@FUTILITY::config.unchecked",ts:()=>"any",check:!1},CHECKED:{name:"@@FUTILITY::config.checked",ts:system,check:!0},AUTO:{name:"@@FUTILITY::config.auto",ts:system,check:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.NODE_ENV&&"production"!==process.env.NODE_ENV||"undefined"!=typeof window&&"boolean"==typeof window.__FUTILITY_TYPE_CHECK&&window.__FUTILITY_TYPE_CHECK}}),In=coreWithTypes(vn.CHECKED);var Cn=In.temper(In,{custom:coreWithTypes,version:"4.0.0",configuration:vn.CHECKED});module.exports=Cn;
