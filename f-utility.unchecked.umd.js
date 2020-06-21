!function(n,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(n=n||self).F=t()}(this,(function(){"use strict";function mash(n,t){return Object.assign({},n,t)}function memoizeWith(n){return function memoize(t){const e={};return function memoized(){const r=Array.from(arguments),o=n(r);return o&&e[o]||(e[o]=t.apply(null,r)),e[o]}}}function defaultMemoizer(n){let[t,e]=n;return t.concat(e).map(n=>"symbol"==typeof n?function symbolToString(n){return""+n.toString()}(n):n&&"object"==typeof n?Object.entries(n).reduce((n,[t,e])=>n+"-"+t+":"+e,""):n)}function makeTypechecker(n,t=defaultMemoizer){return memoizeWith(t)((function rawMakeTypeChecker(t,e){if(!Array.isArray(t)||!Array.isArray(t))throw new TypeError("makeTypechecker needs two valid lists of types to run");const r=t[t.length-1],o=t.slice(0,t.length-1);return o.slice(0,e.length).map((function typeCheckParam(t,r){const o=n(e[r]),i=c(o,t);return{idx:r,raw:Object.freeze({value:e[r]}),actual:o,expected:t,success:i}})).reduce((function typeCheckOutcomes(n,t){const e=t.success?"valid":"invalid",r=mash(n,{[e]:n[e].concat([t]),rawParams:n.rawParams.concat([t])});return mash(r,{failures:n.failures||r.invalid.length>0})}),{rawParams:[],invalid:[],valid:[],signature:t.join(" -> "),params:o,returnType:r,given:e})}))}function checkParamsWith(n){return function checkParams(t,e){return!makeTypechecker(n)(t,e).failures}}function checkReturnWith(n){return function checkReturn(t){return function checkReturnTypeValidoutcomeAB(e,r){const o=n(t),i=makeTypechecker(n)(e,r).returnType;return c(i,o)}}}function system(n){let t=n&&n.constructor&&n.constructor.name||"Global",e=typeof n;return n||("string"===e?t="String":"undefined"===e||"object"===e?e="nil":t="Boolean"),`${t}${u}${e}`}function toString(n,t=[]){return function functionToString(){return`curry(${n.name||"fn"})${t.length>0?`(${t.join(",")})`:""}`}}function hmError(n,t,e){return`Given ${n}( ${t&&t.join(", ")} ) but expected ${n}( ${e.map(n=>Array.isArray(n)?n.join("|"):n).slice(0,t.length).join(", ")} )`}function DEFAULT_PLACEHOLDER_TEST(n){return n===p}function fabricate(n){const{test:t=DEFAULT_PLACEHOLDER_TEST}=n,e=function defineFunctionWithParameterTest(n){return function funcfunc({ts:t=system,n:e,hm:r,check:o}){if(o){if("function"!=typeof t)throw new TypeError("Expected typeSystem to be a function.");if(!r||!Array.isArray(r))throw new TypeError("Expected hm to be an array of strings.")}return function currified(i){function curried(){function saucy(){const t=Array.from(arguments);return curried.apply(this,u(n,t))}const n=Array.from(arguments),s=r&&Array.isArray(r)?r.length-1:e&&"number"==typeof e?e:i.length,f=a(n)?c(n):n.length;if(saucy.toString=toString(i,n),f>=s){const e=i.apply(this,n);if(o){const o=makeTypechecker(t)(r,n);if(!checkParamsWith(t)(r,n)){const{rawParams:n,params:t}=o;throw new TypeError(hmError(i.name,n.map(n=>n.actual),t.map(l)))}if(!checkReturnWith(t)(e)(r,n)){const{returnType:n}=o;throw new TypeError(`Expected ${i.name} to return ${l(n)} but got ${system(e)}.`)}}return e}return saucy}const c=function testCurryGaps(n){return function testCurryCapsByTaste(t){return t.reduce((function doesCurryTasteGood(t,e){return n(e)?t:t+1}),0)}}(n),u=function makeParamMerger(n){return function compareParams(t,e){return t.map((function testGaps(t){return n(t)&&e[0]?e.shift():t})).concat(e)}}(n),a=function some(n){return function someInList(t){return t.some(n)}}(n);return curried.toString=toString(i),curried}}}(t),r=e(mash(n,{n:!1,check:!1})),o=r((function _curryN(t,r){return e(mash(n,{n:t,check:!1}))(r)}));return{def:e,curry:r,curryN:o}}function ofConstructor(n){return function ofConstructorsAndMagic(t){return t&&t.constructor===n||t instanceof n}}function isUnmatched(n){return n===N}function makeAliases(n){return n.temper(n,{I:n.identity,K:n.constant,PLACEHOLDER:n.$,__:n.$,always:n.constant,entries:n.toPairs,every:n.all,fromEntries:n.fromPairs,merge:n.mash,mergeAll:n.smash,mergeRight:n.jam,sideEffect2:n.binarySideEffect,some:n.any,sortBy:n.sort,tap:n.sideEffect,head:n.first})}function pipe(){const n=Array.from(arguments),t=n.filter(n=>"function"!=typeof n);if(0!==t.length)throw new TypeError("Expected to receive functions as arguments, but received: "+t.map((n,t)=>`[${t}] = ${n}`).join(" ; "));return function piped(t){const e=n.length;let r=0,o=t;for(;r<e;){o=(0,n[r])(o),r+=1}return o}}function length(n){return n&&"object"==typeof n?Object.keys(n).length:n.length}function makeIterable(n){const t=Array.isArray(n);if(!t&&!(n&&"object"==typeof n))throw new TypeError("Expected iterable initial value to be either an array or an object.");const e=length(n),r=t?Array(e):{},o=!t&&Object.keys(n);return{length:e,iterate:function iterate(e){const r=t?e:o[e];return{key:r,value:n[r]}},init:r,isArray:t}}function temper(n,t){return Object.freeze(Object.assign({},n,t))}function extendDerived(n){return n.pipe(n.toPairs,n.reduce((function extendFUtility(n,[t,e]){const r=e(n);return n.mash(n,t.includes("__")?r:{[t]:r})}),n))(V)}function extendBinary(n){const t={add:fn,all:hn,and:dn,any:yn,ap:gn,apply:mn,applyTo:Q,concat:bn,cond:kn,divide:En,endsWith:X,equals:On,filter:vn,find:ln,findLast:pn,findIndex:Z,findLastIndex:nn,forEach:jn,gt:Tn,gte:In,hasIn:tn,identical:en,includes:An,indexOf:rn,join:_n,lastIndexOf:on,lt:Nn,lte:xn,map:Pn,match:cn,max:wn,min:Cn,multiply:Ln,none:un,nth:Un,or:Sn,pickBy:an,range:Bn,sort:Fn,split:Dn,startsWith:sn,subtract:qn,toJSON:$n};return n.temper(n,t)}function extendTernary(n){return n.temper(n,{both:zn,either:Hn,eqBy:Mn,innerJoin:Rn,reduce:Yn,replace:Wn,slice:Gn})}function extendQuaternary(n){return n.temper(n,{ifElse:Jn})}const n=Object.freeze({$:"@@FUTILITY::constant.magic",UNMATCHED:"@@FUTILITY::constant.unmatched",b:"\b",f:"\f",n:"\n",t:"\t",r:"\r",q:"'",qq:'"',s:"\\",__of__:"∋",UNION_TYPE_DELIMITER:"|"}),t=memoizeWith((function basicMemo(n){return n}))((function unionType(n){return n.split("|")})),{__of__:e}=n,r=memoizeWith(n=>n)(n=>{const t=n.indexOf(e);return t>-1?n.slice(0,t):n}),{__of__:o}=n,i=memoizeWith(n=>n)(n=>{const t=n.indexOf(o);return t>-1?n.slice(t+1):n}),c=memoizeWith(n=>n)((function _compareTypes(n,e){const[o,c]=[n,e].map(t),u=o.length>1,a=c.length>1,s=o.map(n=>c.map(t=>"any"===n||"any"===t||n===t||r(n)===r(t)||i(n)===i(t))),f=s.reduce((n,t)=>n.concat(0===t.filter(n=>!n).length),[]).filter(Boolean);if(!u&&!a)return f.length>0;return s.reduce((n,t)=>n.concat(t),[]).reduce((n,t)=>n||t,!1)})),{__of__:u}=n,a=Object.freeze({string:"String∋string",number:"Number∋number",boolean:"Boolean∋boolean",function:"Function∋function",object:"Object∋object",undefined:"Global∋nil",symbol:"Symbol∋symbol",nil:"Global∋nil"}),{UNION_TYPE_DELIMITER:s,__of__:f}=n,l=function unionArchetype(n){return function arch(t){if(t&&t.indexOf&&t.indexOf(s)>-1&&n)return t.split(s).map(n=>unionArchetype(!1)(n));const e=a[t];return e||(t[0].toUpperCase()===t[0]?`${t}${f}object`:t)}}(!0),{$:p}=n;fabricate(DEFAULT_PLACEHOLDER_TEST);const[m,d,y,h,g,b]=[String,Number,Function,Boolean,Symbol,Object].map(ofConstructor),k=function ofType(n){return function compareTypeofs(t){return typeof t===n}}("undefined"),E=m,O=d,v=y,j=h,A=g,I=b,_=Array.isArray,{UNMATCHED:N}=n,x=Array.isArray,P=Object.keys,w=Object.freeze,C=Math.round;var L=Object.freeze({__proto__:null,isArray:x,keys:P,freeze:w,round:C});const U=Object.freeze({"String∋string":"","Array∋object":[],"Object∋object":{}}),S=temper(L,{F:function F(){return!0},T:function T(){return!0},adjust:function adjust(n,t,e){const r=[].concat(e),o=n<0?r.length+n:n;return r[o]=t(r[o]),r},append:function append(n,t){const e=[].concat(t);return e.splice(e.length,0,n),e},assoc:function assoc(n,t,e){return Object.assign({},e,{[n]:t})},box:function box(n){return[n]},call:function call(n){return n[0].apply(null,n.slice(1))},complement:function complement(n){return function subtleComplement(){const t=Array.from(arguments);return!n.apply(null,t)}},compose:function compose(){return pipe.apply(null,Array.from(arguments).reverse())},constant:function constant(n){return function forever(){return n}},dec:function dec(n){return n-1},dissoc:function dissoc(n,t){const e=Object.assign({},t);return delete e[n],e},drop:function drop(n,t){return t&&v(t.drop)?t.drop(n):t.slice(n,1/0)},dropLast:function dropLast(n,t){return t&&v(t.dropLast)?t.dropLast(n):t.slice(0,t.length-n)},empty:function empty(n){if(n&&v(n.empty))return n.empty();const t=system(n),e=U[t];return void 0!==e?e:void 0},first:function first(n){return n[0]},fromPairs:function fromPairs(n){return n.reduce((function pairing(n,[t,e]){return Object.assign({},n,{[t]:e})}),{})},identity:function identity(n){return n},inc:function inc(n){return n+1},init:function init(n){return n.slice(0,-1)},invert:function invert(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:o}=t.iterate(r),i=e[o]||!1,c=Array.isArray(i);e[o]=i&&c?i.concat(n):i&&!c?[i,n]:n,r+=1}return e},invertObj:function invertObj(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:o}=t.iterate(r);e[o]=n,r+=1}return e},jam:function jam(n,t){return Object.assign({},t,n)},juxt:function juxt(n){return function juxtapose(){const t=Array.from(arguments);let e=0;const r=makeIterable(n),o=[];for(;e<r.length;){const{value:n}=r.iterate(e),i=t.slice(1,1/0).reduce((t,e)=>[n.apply(null,t.concat(e))],[t[0]])[0];o.push(i),e+=1}return o}},keysIn:function keysIn(n){const t=[];for(let e in n)t.push(e);return t},last:function last(n){return n[n.length-1]},length:length,mash:mash,mean:function mean(n){let t=0,e=0;for(;t<n.length;)e+=n[t],t+=1;return e/n.length},mode:function mode(n){const t={};let e=0,r=-1,o=-1;for(;e<n.length;){const r=n[e];t[r]||(t[r]=0),t[r]+=1,e+=1}e=0;const i=Object.keys(t);for(;e<i.length;){const n=t[i[e]];n>r&&(r=n,o=i[e]),e+=1}const c=parseInt(o);return isNaN(c)?o:c},move:function move(n,t,e){function outOfBounds(n){return n<0||n>=r}const r=e.length,o=e.slice(),[i,c]=[n,t].map((function wrap(n){return n<0?r+n:n})),u=o.splice(i,1);return outOfBounds(i)||outOfBounds(c)?e:[].concat(o.slice(0,c)).concat(u).concat(o.slice(c,e.length))},negate:function negate(n){return-n},not:function not(n){return!n},nthArg:function nthArg(n){return function grabNth(){return arguments[n]}},objOf:function objOf(n,t){return{[n]:t}},once:function once(n){let t,e=!1;return function oneTime(){return e||(t=n.apply(null,arguments),e=!0),t}},pair:function pair(n,t){return[n,t]},partial:function partial(n,t){return function partiallyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e))}},partialRight:function partialRight(n,t){return function partialRightlyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e).reverse())}},pipe:pipe,prepend:function prepend(n,t){const e=[].concat(t);return e.splice(0,0,n),e},repeat:function repeat(n,t){return t.repeat(n)},reverse:function reverse(n){const t=makeIterable(n);let e=t.length;const r=t.init;for(;e>-1;){const{value:n}=t.iterate(e);r[t.length-1-e]=n,e-=1}return r},smash:function smash(n){return n.reduce((n,t)=>Object.assign({},n,t),{})},smooth:function smooth(n){return n.filter(Boolean)},splitAt:function splitAt(n,t){return[t.slice(0,n),t.slice(n,1/0)]},sum:function sum(n){return n.reduce((function adding(n,t){return n+t}),0)},tail:function tail(n){return n.slice(1)},take:function take(n,t){return t&&v(t.take)?t.take(n):t.slice(0,n)},takeLast:function takeLast(n,t){return t&&v(t.takeLast)?t.takeLast(n):t.slice(t.length-n,1/0)},temper:temper,test:function regexTest(n,t){return n.test(t)},toLower:function toLower(n){return n.toLowerCase()},toPairs:function toPairs(n){return Object.keys(n).map((function enpair(t){return[t,n[t]]}))},toUpper:function toUpper(n){return n.toUpperCase()},update:function update(n,t,e){const r=[].concat(e);return r[n<0?r.length+n:n]=t,r}}),B=2,D=2,q=2,$=3,z=2,W=2,R=2,M=3,H=2,Y=2,G=2,J=2,K=2,V={j2:function makeJ2({toJSON:n}){return n(2)},addIndex:function makeAddIndex({curryN:n}){return function addIndex(t){return n(t.length,(function indexAddedIter(){let n=0;const e=Array.prototype.slice.call(arguments,0),[r]=e,o=e[e.length-1];return e[0]=function indexAdded(){const t=r.apply(this,[].concat(arguments).concat([n,o]));return n+=1,t},t.apply(this,e)}))}},pick:function makePick({pickBy:n,includes:t,curryN:e}){return e(J,(function pick(e,r){return n((n,r)=>t(r,e),r)}))},bind:function makeBind({curryN:n}){return n(2,(function bind(t,e){function bound(){return t.apply(e,arguments)}return t.length>1?n(t.length,bound):bound}))},flip:function makeFlip({curryN:n}){return function flip(t){return n(2,(function flipped(n,e){return t(e,n)}))}},liftN:function makeLiftN({curryN:n,reduce:t,ap:e,map:r}){return n(2,(function liftN(o,i){const c=n(o,i);return n(o,(function liftedN(){return t(e,r(c,arguments[0]),Array.prototype.slice.call(arguments,1))}))}))},lift:function makeLift({liftN:n}){return function lift(t){return n(t.length,t)}},thunkify:function makeThunkify({curryN:n}){return function thunkify(t){return n(t.length,(function think(){const n=arguments;return function thank(){return t.apply(this,n)}}))}},groupBy:function makeGroupBy({reduce:n,mash:t,objOf:e,curryN:r}){return r(H,(function groupBy(r,o){return n((function groupingBy(n,o){const i=t({},n),c=r(o);if(i[c])return i[c]=i[c].concat(o),i;const u=e(c,[o]);return t(i,u)}),{})(o)}))},isEmpty:function makeIsEmpty({equals:n,empty:t,isArray:e,isRawObject:r,keys:o,length:i,pipe:c}){return function isEmpty(u){const a=t(u);return void 0!==a&&(e(u)?0===u.length:r(u)?0===c(o,i)(u):n(a,u))}},__ifElse:function makeIfElseDerivatives({ifElse:n,identity:t,$:e}){return{when:n(e,e,t),unless:n(e,t)}},flatten:function makeFlatten({isArray:n,forEach:t}){return function flatten(e){let r=0;const o=makeIterable(e);let i=[];for(;r<o.length;){let{value:e}=o.iterate(r);n(e)?(e=flatten(e),t(n=>i.push(n),e)):i.push(e),r+=1}return i}},chain:function makeChain({curryN:n,map:t,pipe:e,reduce:r,concat:o}){return n(D,(function chain(n,i){return i&&"function"==typeof i.chain?i.chain(n):"function"==typeof i?t=>n(i(t),t):e(t(n),r(o,[]))(i)}))},reject:function makeReject({curryN:n,filter:t,complement:e}){return n(z,(function reject(n,r){return t(e(n),r)}))},omit:function makeOmit({curryN:n,pickBy:t,includes:e}){return n(G,(function omit(n,r){return t((t,r)=>!e(r,n),r)}))},uniq:function makeUniq({reduce:n}){return n((function unique(n,t){return n.includes(t)?n:n.concat(t)}),[])},intersection:function makeIntersection({uniq:n,concat:t,curryN:e}){return e(Y,(function intersection(e,r){return n(t(e,r))}))},isObject:function makeIsObject({both:n,isRawObject:t}){return function isObject(e){return n(t,Boolean)(e)}},median:function makeMedian({$:n,dec:t,pipe:e,length:r,nth:o,sort:i,divide:c}){return e(i((n,t)=>n-t),i=>e(r,t,c(2),Math.round,o(n,i))(i))},union:function makeUnion({uniq:n,curryN:t,pipe:e,concat:r}){return t(R,(function union(t,o){return e(r(o),n)(t)}))},difference:function makeDifference({curryN:n,filter:t,flip:e,includes:r,complement:o}){return n(q,(function difference(n,i){return t(o(e(r)(i)),n)}))},symmetricDifference:function makeSymmetricDifference({curryN:n}){return n(W,(function symmetricDifference(n,t){const e=makeIterable(n),r=makeIterable(t),o=[];let i=0;for(;i<e.length;){const{value:n}=e.iterate(i);t.includes(n)||o.push(n),i+=1}let c=0;for(;c<r.length;){const{value:t}=r.iterate(c);n.includes(t)||o.push(t),c+=1}return o}))},__predicatesPass:function makePredicatesPass({curryN:n,pipe:t,map:e,flip:r,any:o,all:i,smooth:c,length:u,gt:a}){function predFor(o){return n(2,(function predPass(n,i){return t(e(r(o)(i)),c,u,a(0))(n)}))}return{anyPass:predFor(o),allPass:predFor(i)}},pathOr:function makePathOr({curryN:n,reduce:t}){return n($,(function pathOr(n,e,r){return t((function walkPathOr(t,e){return t&&t[e]||n}),r,e)}))},__pathOrDerivatives:function makePathOrDerivatives({equals:t,is:e,curryN:r,complement:o,isUnmatched:i,pipe:c,pathOr:u}){function deriveFromAccessor(u){const a=u(n.UNMATCHED);return{hasAcc:r(2,(function hasProperty(n,t){return c(a(n),o(i))(t)})),accIs:r(3,(function pathIsOfConstructor(n,t,r){return c(a(t),e(n))(r)})),unsafe:u(null),eq:r(3,(function equivalence(n,e,r){return c(a(n),t(e))(r)})),satisfies:r(3,(function satisfaction(n,t,e){return c(a(t),n,Boolean)(e)}))}}const{hasAcc:a,unsafe:s,eq:f,satisfies:l,accIs:p}=deriveFromAccessor(u),m=r(3,(function _propOr(n,t,e){return u(n,[t],e)})),{hasAcc:d,unsafe:y,eq:h,satisfies:g,accIs:b}=deriveFromAccessor(m);return{hasPath:a,path:s,pathEq:f,pathSatisfies:l,pathIs:p,hasProp:d,propOr:m,prop:y,propEq:h,propSatisfies:g,propIs:b}},props:function makeProps({pipe:n,ap:t,prop:e,box:r,map:o,curryN:i}){return i(K,(function props(i,c){return n(r,t(o(e,i)))(c)}))},eqProps:function makeEqProps({curryN:n,pipe:t,map:e,prop:r,equals:o}){return n(M,(function eqProps(n,i,c){return t(e(r(n)),([n,t])=>o(n,t))([i,c])}))},pluck:function makePluck({curryN:n,map:t,prop:e}){return n(B,(function pluck(n,r){return t(e(n),r)}))}},Q=function applyTo(n,t){return t(n)},X=function endsWith(n,t){return t&&v(t.endsWith)?t.endsWith(n):t[t.length-1]===n},Z=function findIndex(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return e;e+=1}return-1},nn=function findLastIndex(n,t){const e=makeIterable(t);let r=e.length;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return r;r-=1}return-1},tn=function hasIn(n,t){return n in t},en=function identical(n,t){return Object.is(n,t)},rn=function indexOf(n,t){return t.indexOf(n)},on=function lastIndexOf(n,t){return t.lastIndexOf(n)},cn=function match(n,t){return t.match(n)},un=function none(n,t){let e=0;const r=makeIterable(t);let o=!0;for(;e<r.length&&o;){const{value:t}=r.iterate(e);n(t)||(o=!1),e+=1}return o},an=function pickBy(n,t){const e=makeIterable(t),r=e.init;let o=0;for(;o<e.length;){const{key:t,value:i}=e.iterate(o);n(i,t)&&(r[t]=i),o+=1}return r},sn=function startsWith(n,t){return t&&v(t.startsWith)?t.startsWith(n):t[0]===n},fn=function add(n,t){return t+n},ln=function find(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return t;e+=1}},pn=function findLast(n,t){const e=makeIterable(t);let r=e.length-1;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return t;r-=1}},mn=function apply(n,t){return n.apply(null,t)},dn=function and(n,t){return n&&t},yn=function any(n,t){let e=0,r=!1;const o=length(t);for(;e<o&&!r;)n(t[e])&&(r=!0),e+=1;return r},hn=function all(n,t){let e=0;const r=makeIterable(t);let o=!0;for(;e<r.length&&o;){const{value:t}=r.iterate(e);n(t)||(o=!1),e+=1}return o},gn=function ap(n,t){if(v(n)&&v(t))return function sCombinator(e){return n(e,t(e))};if(!_(n)||!_(t))throw new TypeError("Expected to receive an array of functions and an array of values.");if(!n.length||n.filter(v).length!==n.length)throw new TypeError("Expected to receive an array of functions to apply.");return n.reduce((function apReduce(n,e){return n.concat(t.map(n=>e(n)))}),[])},bn=function concat(n,t){return n.concat(t)},kn=function cond(n,t){let e,r=0,o=!1;const i=length(n);for(;r<i&&!o;){const[i,c]=n[r];i(t)&&(o=!0,e=c(t)),r+=1}return e},En=function divide(n,t){return t/n},On=function equals(n,t){return n&&v(n.equals)?n.equals(t):n===t},vn=function filter(n,t){let e=0;const r=makeIterable(t),{length:o,isArray:i}=r,c=i?[]:{};for(;e<o;){const{key:t,value:o}=r.iterate(e);n(o)&&(i?c.push(o):c[t]=o),e+=1}return c},jn=function forEach(n,t){let e=0;const r=makeIterable(t),{length:o}=r;for(;e<o;){const{value:t}=r.iterate(e);n(t),e+=1}},An=function includes(n,t){return t&&v(t.includes)?t.includes(n):!(!t||!v(t.indexOf))&&t.indexOf(n)>-1},Tn=function gt(n,t){return t>n},In=function gte(n,t){return t>=n},_n=function join(n,t){return t.join(n)},Nn=function lt(n,t){return t<n},xn=function lte(n,t){return t<=n},Pn=function map(n,t){let e=0;const r=makeIterable(t),{length:o,init:i}=r,c=i;for(;e<o;){const{key:t,value:o}=r.iterate(e);c[t]=n(o),e+=1}return c},wn=function max(n,t){return Math.max(n,t)},Cn=function min(n,t){return Math.min(n,t)},Ln=function multiply(n,t){return t*n},Un=function nth(n,t){return n<0&&t.length+n?t[t.length+n]:t[n]},Sn=function or(n,t){return n||t},Bn=function range(n,t){const e=[],r=t<n;for(let o=n;r?o>=t:o<=t;r?o--:o++)e.push(o);return e},Dn=function split(n,t){return t.split(n)},Fn=function sort(n,t){const e=[].concat(t);return e.sort(n),e},qn=function subtract(n,t){return t-n},$n=function toJSON(n,t){return JSON.stringify(t,null,n)},zn=function both(n,t,e){return n(e)&&t(e)},Wn=function replace(n,t,e){return e.replace(n,t)},Rn=function innerJoin(n,t,e){const r=makeIterable(t),o=[],i=makeIterable(e);let c=0;for(;c<r.length;){const{value:t}=r.iterate(c);let e=0;for(;e<i.length;){const{value:r}=i.iterate(e);n(t,r)&&o.push(t),e+=1}c+=1}return o},Mn=function eqBy(n,t,e){return Boolean(n(t,e))},Hn=function either(n,t,e){return n(e)||t(e)},Yn=function reduce(n,t,e){const r=makeIterable(e);let o=0;const{length:i}=r;let c=t;for(;o<i;){const{value:t}=r.iterate(o);c=n(c,t),o+=1}return c},Gn=function slice(n,t,e){return e.slice(n,t)},Jn=function ifElse(n,t,e,r){return n(r)?t(r):e(r)},Kn=Object.freeze({UNCHECKED:{name:"@@FUTILITY::config.unchecked",ts:()=>"any",check:!1},CHECKED:{name:"@@FUTILITY::config.checked",ts:system,check:!0},AUTO:{name:"@@FUTILITY::config.auto",ts:system,check:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.NODE_ENV&&"production"!==process.env.NODE_ENV||"undefined"!=typeof window&&"boolean"==typeof window.__FUTILITY_TYPE_CHECK&&window.__FUTILITY_TYPE_CHECK}}),Vn=function core(t){return S.pipe(fabricate,(function basicDefinitions({def:t,curry:e,curryN:r}){const o=function makeSideEffectsFromEnv(n){const t=n((function _sideEffect(n,t){return n(t),t})),e=n((function _binarySideEffect(n,t,e){return n(t,e),e})),r=e(console.log);return{sideEffect:t,binarySideEffect:e,trace:r,inspect:n((function _inspect(n,t,e,r){return n(e,t(r)),r}))}}(e),i=function autoCurryUsing(n){return function autoCurry(t){return Object.keys(t).map((function wrapCurry(e){const r=t[e];return[e,"function"==typeof r&&r.length?n(r.length,r):r]})).reduce((n,[t,e])=>Object.assign({},n,{[t]:e}),{})}}(r),c=S.smash([i(S),o,{memoizeWith:memoizeWith,def:t,curry:e,curryN:r,C:n,$:n.$,is:ofConstructor,isArray:_,isBoolean:j,isFunction:v,isNumber:O,isRawObject:I,isString:E,isSymbol:A,isUndefined:k,isUnmatched:isUnmatched}]);return c.pipe(extendBinary,i,extendTernary,i,extendQuaternary,i,extendDerived,makeAliases)(c)}))(t)}(Kn.UNCHECKED);return Vn.temper(Vn,{version:"4.0.0",configuration:Kn.UNCHECKED})}));
