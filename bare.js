"use strict";function mash(n,t){return Object.assign({},n,t)}function memoizeWith(n){return function memoize(t){const e={};return function memoized(){const r=Array.from(arguments),i=n(r);return i&&e[i]||(e[i]=t.apply(null,r)),e[i]}}}function defaultMemoizer(n){let[t,e]=n;return t.concat(e).map(n=>"symbol"==typeof n?function symbolToString(n){return""+n.toString()}(n):n&&"object"==typeof n?Object.entries(n).reduce((n,[t,e])=>n+"-"+t+":"+e,""):n)}function makeTypechecker(n,t=defaultMemoizer){return memoizeWith(t)((function rawMakeTypeChecker(t,e){if(!Array.isArray(t)||!Array.isArray(t))throw new TypeError("makeTypechecker needs two valid lists of types to run");const r=t[t.length-1],i=t.slice(0,t.length-1);return i.slice(0,e.length).map((function typeCheckParam(t,r){const i=n(e[r]),c=o(i,t);return{idx:r,raw:Object.freeze({value:e[r]}),actual:i,expected:t,success:c}})).reduce((function typeCheckOutcomes(n,t){const e=t.success?"valid":"invalid",r=mash(n,{[e]:n[e].concat([t]),rawParams:n.rawParams.concat([t])});return mash(r,{failures:n.failures||r.invalid.length>0})}),{rawParams:[],invalid:[],valid:[],signature:t.join(" -> "),params:i,returnType:r,given:e})}))}function checkParamsWith(n){return function checkParams(t,e){return!makeTypechecker(n)(t,e).failures}}function checkReturnWith(n){return function checkReturn(t){return function checkReturnTypeValidoutcomeAB(e,r){const i=n(t),c=makeTypechecker(n)(e,r).returnType;return o(c,i)}}}function system(n){let t=n&&n.constructor&&n.constructor.name||"Global",e=typeof n;return n||("string"===e?t="String":"undefined"===e||"object"===e?e="nil":t="Boolean"),`${t}${u}${e}`}function toString(n,t=[]){return function functionToString(e){return e?n:`curry(${n})${t.length>0?`(${t.join(",")})`:""}`}}function hmError(n,t,e){return`Given ${n}( ${t&&t.join(", ")} ) but expected ${n}( ${e.map(n=>Array.isArray(n)?n.join("|"):n).slice(0,t.length).join(", ")} )`}function cleaned(n){if(n&&n.stack){const{stack:t}=n;n.stack=t.replace(p,(n,t,e,r,i,c)=>{const o=`(${e}:${r}:${i})`;return m.includes(t)?"":`\n\t-> ${"piped"===t?"pipe":t} ${e.includes("f-utility")?"":o}`})}return n}function DEFAULT_PLACEHOLDER_TEST(n){return n===d}function fabricate(n){const{test:t=DEFAULT_PLACEHOLDER_TEST}=n,e=function defineFunctionWithParameterTest(n){return function funcfunc({ts:t=system,n:e,hm:r,check:i,tryCatch:c=(()=>{})}){if(i){if("function"!=typeof t)throw new TypeError("Expected typeSystem to be a function.");if(!r||!Array.isArray(r))throw new TypeError("Expected hm to be an array of strings.")}return function currified(c){function curried(){function saucy(){const t=Array.from(arguments);return curried.apply(this,a(n,t))}const n=Array.from(arguments),f=r&&Array.isArray(r)?r.length-1:e&&"number"==typeof e?e:c.length,p=s(n)?u(n):n.length;if(i&&(saucy.toString=toString(o,n),saucy.hm=r),p>=f){let e;try{e=c.apply(this,n)}catch(n){throw cleaned(n)}if(i){const i=makeTypechecker(t)(r,n);if(!checkParamsWith(t)(r,n)){const{rawParams:n,params:t}=i;throw new TypeError(hmError(o,n.map(n=>n.actual),t.map(l)))}if(!checkReturnWith(t)(e)(r,n)){const{returnType:n}=i;throw new TypeError(`Expected ${o} to return ${l(n)} but got ${system(e)}.`)}}return e}return saucy}const o=c&&void 0!==c.hm?c.toString(!0):c.name?c.name:"fn",u=function testCurryGaps(n){return function testCurryCapsByTaste(t){return t.reduce((function doesCurryTasteGood(t,e){return n(e)?t:t+1}),0)}}(n),a=function makeParamMerger(n){return function compareParams(t,e){return t.map((function testGaps(t){return n(t)&&e[0]?e.shift():t})).concat(e)}}(n),s=function some(n){return function someInList(t){return t.some(n)}}(n);return i&&(curried.toString=toString(o),curried.hm=r),curried}}}(t),r=e(mash(n,{n:!1,check:!1})),i=r((function _curryN(t,r){return e(mash(n,{n:t,check:!1}))(r)}));return{def:e,curry:r,curryN:i}}function ofConstructor(n){return function ofConstructorsAndMagic(t){return t&&t.constructor===n||t instanceof n}}function isUnmatched(n){return n===x}function makeAliases(n){return n.weld(n,{I:n.identity,K:n.constant,PLACEHOLDER:n.$,__:n.$,always:n.constant,entries:n.toPairs,every:n.all,fromEntries:n.fromPairs,merge:n.mash,mergeAll:n.smash,mergeRight:n.jam,sideEffect2:n.binarySideEffect,some:n.any,sortBy:n.sort,tap:n.sideEffect,head:n.first,of:n.box})}function pipe(){const n=Array.from(arguments),t=n.filter(n=>"function"!=typeof n);if(0!==t.length)throw new TypeError("Expected to receive functions as arguments, but received: "+t.map((n,t)=>`[${t}] = ${n}`).join(" ; "));return function piped(t){const e=n.length;let r=0,i=t;for(;r<e;){i=(0,n[r])(i),r+=1}return i}}function length(n){return n&&"object"==typeof n?Object.keys(n).length:n.length}function makeIterable(n){const t=Array.isArray(n);if(!t&&!(n&&"object"==typeof n))throw new TypeError("Expected iterable initial value to be either an array or an object.");const e=length(n),r=t?Array(e):{},i=!t&&Object.keys(n);return{length:e,iterate:function iterate(e){const r=t?e:i[e];return{key:r,value:n[r]}},init:r,isArray:t}}function weld(n,t){return Object.freeze(Object.assign({},n,t))}function extendDerived(n){return n.pipe(n.toPairs,n.reduce((function extendFUtility(n,[t,e]){const r=e(n);return n.mash(n,t.includes("__")?r:{[t]:r})}),n))(nn)}function extendBinary(n){const t={add:hn,all:On,and:bn,any:En,ap:vn,apply:kn,applyTo:tn,concat:An,cond:jn,divide:Tn,endsWith:en,equals:In,filter:_n,find:yn,findLast:gn,findIndex:rn,findLastIndex:cn,forEach:Nn,gt:xn,gte:Pn,hasIn:on,has:un,identical:an,includes:wn,indexOf:sn,join:Cn,lastIndexOf:fn,lt:Ln,lte:Sn,map:Un,match:ln,max:Dn,min:$n,multiply:Bn,none:pn,nth:Fn,or:qn,pickBy:mn,range:zn,sort:Rn,split:Wn,startsWith:dn,subtract:Mn,toJSON:Hn};return n.weld(n,t)}function extendTernary(n){return n.weld(n,{both:Yn,either:Xn,eqBy:Qn,innerJoin:Jn,insert:Kn,insertAll:Vn,reduce:Zn,replace:Gn,slice:nt})}function extendQuaternary(n){return n.weld(n,{ifElse:tt})}const n=Object.freeze({$:"@@FUTILITY::constant.magic",UNMATCHED:"@@FUTILITY::constant.unmatched",b:"\b",f:"\f",n:"\n",t:"\t",r:"\r",q:"'",qq:'"',s:"\\",__of__:"∋",UNION_TYPE_DELIMITER:"|"}),t=memoizeWith((function basicMemo(n){return n}))((function unionType(n){return n.split("|")})),{__of__:e}=n,r=memoizeWith(n=>n)(n=>{const t=n.indexOf(e);return t>-1?n.slice(0,t):n}),{__of__:i}=n,c=memoizeWith(n=>n)(n=>{const t=n.indexOf(i);return t>-1?n.slice(t+1):n}),o=memoizeWith(n=>n)((function _compareTypes(n,e){const[i,o]=[n,e].map(t),u=i.length>1,a=o.length>1,s=i.map(n=>o.map(t=>"any"===n||"any"===t||n===t||r(n)===r(t)||c(n)===c(t))),f=s.reduce((n,t)=>n.concat(0===t.filter(n=>!n).length),[]).filter(Boolean);if(!u&&!a)return f.length>0;return s.reduce((n,t)=>n.concat(t),[]).reduce((n,t)=>n||t,!1)})),{__of__:u}=n,a=Object.freeze({string:"String∋string",number:"Number∋number",boolean:"Boolean∋boolean",function:"Function∋function",object:"Object∋object",undefined:"Global∋nil",symbol:"Symbol∋symbol",nil:"Global∋nil"}),{UNION_TYPE_DELIMITER:s,__of__:f}=n,l=function unionArchetype(n){return function arch(t){if(t&&t.indexOf&&t.indexOf(s)>-1&&n)return t.split(s).map(n=>unionArchetype(!1)(n));const e=a[t];return e||(t[0].toUpperCase()===t[0]?`${t}${f}object`:t)}}(!0),p=/\n {4}at (\w+) \((.*):(\d+):(\d+)\)/g,m=["null","curried","saucy"],{$:d}=n;fabricate(DEFAULT_PLACEHOLDER_TEST);const[h,y,g,k,b,E]=[String,Number,Function,Boolean,Symbol,Object].map(ofConstructor),O=function ofType(n){return function compareTypeofs(t){return typeof t===n}}("undefined"),v=h,A=y,j=g,I=k,_=b,N=E,w=Array.isArray,{UNMATCHED:x}=n,P=Array.isArray,C=Object.keys,L=Object.values,S=Object.freeze,U=Math.round;var D=Object.freeze({__proto__:null,isArray:P,keys:C,values:L,freeze:S,round:U,trim:function trim(n){return n.trim()}});const $=Object.freeze({"String∋string":"","Array∋object":[],"Object∋object":{}}),B=weld(D,{F:function F(){return!0},T:function T(){return!0},adjust:function adjust(n,t,e){const r=[].concat(e),i=n<0?r.length+n:n;return r[i]=t(r[i]),r},append:function append(n,t){const e=[].concat(t);return e.splice(e.length,0,n),e},assoc:function assoc(n,t,e){return Object.assign({},e,{[n]:t})},box:function box(n){return[n]},call:function call(n){return n[0].apply(null,n.slice(1))},complement:function complement(n){return function subtleComplement(){const t=Array.from(arguments);return!n.apply(null,t)}},compose:function compose(){return pipe.apply(null,Array.from(arguments).reverse())},constant:function constant(n){return function forever(){return n}},dec:function dec(n){return n-1},dissoc:function dissoc(n,t){const e=Object.assign({},t);return delete e[n],e},drop:function drop(n,t){return t&&j(t.drop)?t.drop(n):t.slice(n,1/0)},dropLast:function dropLast(n,t){return t&&j(t.dropLast)?t.dropLast(n):t.slice(0,t.length-n)},empty:function empty(n){if(n&&j(n.empty))return n.empty();const t=system(n),e=$[t];return void 0!==e?e:void 0},first:function first(n){return n[0]},fromPairs:function fromPairs(n){return n.reduce((function pairing(n,[t,e]){return Object.assign({},n,{[t]:e})}),{})},identity:function identity(n){return n},inc:function inc(n){return n+1},init:function init(n){return n.slice(0,-1)},invert:function invert(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:i}=t.iterate(r),c=e[i]||!1,o=Array.isArray(c);e[i]=c&&o?c.concat(n):c&&!o?[c,n]:n,r+=1}return e},invertObj:function invertObj(n){const t=makeIterable(n),e=t.init;let r=0;for(;r<t.length;){const{key:n,value:i}=t.iterate(r);e[i]=n,r+=1}return e},jam:function jam(n,t){return Object.assign({},t,n)},juxt:function juxt(n){return function juxtapose(){const t=Array.from(arguments);let e=0;const r=makeIterable(n),i=[];for(;e<r.length;){const{value:n}=r.iterate(e),c=t.slice(1,1/0).reduce((t,e)=>[n.apply(null,t.concat(e))],[t[0]])[0];i.push(c),e+=1}return i}},keysIn:function keysIn(n){const t=[];for(let e in n)t.push(e);return t},last:function last(n){return n[n.length-1]},length:length,mash:mash,mean:function mean(n){let t=0,e=0;for(;t<n.length;)e+=n[t],t+=1;return e/n.length},mode:function mode(n){const t={};let e=0,r=-1,i=-1;for(;e<n.length;){const r=n[e];t[r]||(t[r]=0),t[r]+=1,e+=1}e=0;const c=Object.keys(t);for(;e<c.length;){const n=t[c[e]];n>r&&(r=n,i=c[e]),e+=1}const o=parseInt(i);return isNaN(o)?i:o},move:function move(n,t,e){function outOfBounds(n){return n<0||n>=r}const r=e.length,i=e.slice(),[c,o]=[n,t].map((function wrap(n){return n<0?r+n:n})),u=i.splice(c,1);return outOfBounds(c)||outOfBounds(o)?e:[].concat(i.slice(0,o)).concat(u).concat(i.slice(o,e.length))},negate:function negate(n){return-n},not:function not(n){return!n},nthArg:function nthArg(n){return function grabNth(){return arguments[n]}},objOf:function objOf(n,t){return{[n]:t}},once:function once(n){let t,e=!1;return function oneTime(){return e||(t=n.apply(null,arguments),e=!0),t}},pair:function pair(n,t){return[n,t]},partial:function partial(n,t){return function partiallyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e))}},partialRight:function partialRight(n,t){return function partialRightlyApplied(){const e=Array.from(arguments);return n.apply(null,t.concat(e).reverse())}},pipe:pipe,prepend:function prepend(n,t){const e=[].concat(t);return e.splice(0,0,n),e},repeat:function repeat(n,t){return t.repeat(n)},reverse:function reverse(n){const t=makeIterable(n);let e=t.length;const r=t.init;for(;e>-1;){const{value:n}=t.iterate(e);r[t.length-1-e]=n,e-=1}return r},smash:function smash(n){return n.reduce((n,t)=>Object.assign({},n,t),{})},splitAt:function splitAt(n,t){return[t.slice(0,n),t.slice(n,1/0)]},sum:function sum(n){return n.reduce((function adding(n,t){return n+t}),0)},product:function product(n){return n.reduce((function multiplying(n,t){return n*t}),1)},tail:function tail(n){return n.slice(1)},take:function take(n,t){return t&&j(t.take)?t.take(n):t.slice(0,n)},takeLast:function takeLast(n,t){return t&&j(t.takeLast)?t.takeLast(n):t.slice(t.length-n,1/0)},weld:weld,test:function regexTest(n,t){return n.test(t)},toLower:function toLower(n){return n.toLowerCase()},toPairs:function toPairs(n){return Object.keys(n).map((function enpair(t){return[t,n[t]]}))},toUpper:function toUpper(n){return n.toUpperCase()},update:function update(n,t,e){const r=[].concat(e);return r[n<0?r.length+n:n]=t,r}}),q=2,z=2,W=2,R=2,M=3,H=2,Y=2,G=2,J=3,K=2,V=2,Q=2,X=2,Z=2,nn={orDefault:function makeOrDefault({curryN:n}){return n(q,(function orDefault(n,t){return t||n}))},smooth:function makeSmooth({filter:n}){return function smooth(t){return n(Boolean,t)}},j2:function makeJ2({toJSON:n}){return n(2)},addIndex:function makeAddIndex({curryN:n}){return function addIndex(t){return n(t.length,(function indexAddedIter(){let n=0;const e=[].slice.call(arguments,0),[r]=e,i=e[e.length-1];return e[0]=function indexAdded(){const t=r.apply(this,[].concat([].slice.call(arguments,0)).concat([n,i]));return n+=1,t},t.apply(this,e)}))}},pick:function makePick({pickBy:n,includes:t,curryN:e}){return e(X,(function pick(e,r){return n((n,r)=>t(r,e),r)}))},bind:function makeBind({curryN:n}){return n(2,(function bind(t,e){function bound(){return t.apply(e,arguments)}return t.length>1?n(t.length,bound):bound}))},flip:function makeFlip({curryN:n}){return function flip(t){return n(2,(function flipped(n,e){return t(e,n)}))}},liftN:function makeLiftN({curryN:n,reduce:t,ap:e,map:r}){return n(2,(function liftN(i,c){const o=n(i,c);return n(i,(function liftedN(){return t(e,r(o,arguments[0]),Array.prototype.slice.call(arguments,1))}))}))},lift:function makeLift({liftN:n}){return function lift(t){return n(t.length,t)}},thunkify:function makeThunkify({curryN:n}){return function thunkify(t){return n(t.length,(function think(){const n=arguments;return function thank(){return t.apply(this,n)}}))}},groupBy:function makeGroupBy({reduce:n,mash:t,objOf:e,curryN:r}){return r(K,(function groupBy(r,i){return n((function groupingBy(n,i){const c=t({},n),o=r(i);if(c[o])return c[o]=c[o].concat(i),c;const u=e(o,[i]);return t(c,u)}),{})(i)}))},isEmpty:function makeIsEmpty({equals:n,empty:t,isArray:e,isRawObject:r,keys:i,length:c,pipe:o}){return function isEmpty(u){const a=t(u);return void 0!==a&&(e(u)?0===u.length:r(u)?0===o(i,c)(u):n(a,u))}},__ifElse:function makeIfElseDerivatives({ifElse:n,identity:t,$:e}){return{when:n(e,e,t),unless:n(e,t)}},flatten:function makeFlatten({isArray:n,forEach:t}){return function flatten(e){let r=0;const i=makeIterable(e);let c=[];for(;r<i.length;){let{value:e}=i.iterate(r);n(e)?(e=flatten(e),t(n=>c.push(n),e)):c.push(e),r+=1}return c}},chain:function makeChain({curryN:n,map:t,pipe:e,reduce:r,concat:i}){return n(W,(function chain(n,c){return c&&"function"==typeof c.chain?c.chain(n):"function"==typeof c?t=>n(c(t),t):e(t(n),r(i,[]))(c)}))},reject:function makeReject({curryN:n,filter:t,complement:e}){return n(H,(function reject(n,r){return t(e(n),r)}))},omit:function makeOmit({curryN:n,pickBy:t,includes:e}){return n(Q,(function omit(n,r){return t((t,r)=>!e(r,n),r)}))},uniq:function makeUniq({reduce:n}){return n((function unique(n,t){return n.includes(t)?n:n.concat(t)}),[])},intersection:function makeIntersection({uniq:n,concat:t,curryN:e}){return e(V,(function intersection(e,r){return n(t(e,r))}))},isObject:function makeIsObject({both:n,isRawObject:t}){return function isObject(e){return n(t,Boolean)(e)}},median:function makeMedian({$:n,dec:t,pipe:e,length:r,nth:i,sort:c,divide:o}){return e(c((n,t)=>n-t),c=>e(r,t,o(2),Math.round,i(n,c))(c))},union:function makeUnion({uniq:n,curryN:t,pipe:e,concat:r}){return t(G,(function union(t,i){return e(r(i),n)(t)}))},difference:function makeDifference({curryN:n,filter:t,flip:e,includes:r,complement:i}){return n(R,(function difference(n,c){return t(i(e(r)(c)),n)}))},symmetricDifference:function makeSymmetricDifference({curryN:n}){return n(Y,(function symmetricDifference(n,t){const e=makeIterable(n),r=makeIterable(t),i=[];let c=0;for(;c<e.length;){const{value:n}=e.iterate(c);t.includes(n)||i.push(n),c+=1}let o=0;for(;o<r.length;){const{value:t}=r.iterate(o);n.includes(t)||i.push(t),o+=1}return i}))},__predicatesPass:function makePredicatesPass({curryN:n,pipe:t,map:e,flip:r,any:i,all:c,smooth:o,length:u,gt:a}){function predFor(i){return n(2,(function predPass(n,c){return t(e(r(i)(c)),o,u,a(0))(n)}))}return{anyPass:predFor(i),allPass:predFor(c)}},pathOr:function makePathOr({curryN:n,reduce:t}){return n(M,(function pathOr(n,e,r){return t((function walkPathOr(t,e){return t&&t[e]||n}),r,e)}))},__pathOrDerivatives:function makePathOrDerivatives({equals:t,is:e,curryN:r,complement:i,isUnmatched:c,pipe:o,pathOr:u}){function deriveFromAccessor(u){const a=u(n.UNMATCHED);return{hasAcc:r(2,(function _hasPath(n,t){return o(a(n),i(c))(t)})),accIs:r(3,(function _pathIs(n,t,r){return o(a(t),e(n))(r)})),unsafe:u(null),eq:r(3,(function _pathEq(n,e,r){return o(a(n),t(e))(r)})),satisfies:r(3,(function _pathSatisifes(n,t,e){return o(a(t),n,Boolean)(e)}))}}const{hasAcc:a,unsafe:s,eq:f,satisfies:l,accIs:p}=deriveFromAccessor(u),m=r(3,(function _propOr(n,t,e){return u(n,[t],e)})),{hasAcc:d,unsafe:h,eq:y,satisfies:g,accIs:k}=deriveFromAccessor(m);return{hasPath:a,path:s,pathEq:f,pathSatisfies:l,pathIs:p,hasProp:d,propOr:m,prop:h,propEq:y,propSatisfies:g,propIs:k}},props:function makeProps({pipe:n,ap:t,prop:e,box:r,map:i,curryN:c}){return c(Z,(function props(c,o){return n(r,t(i(e,c)))(o)}))},eqProps:function makeEqProps({curryN:n,pipe:t,map:e,prop:r,equals:i}){return n(J,(function eqProps(n,c,o){return t(e(r(n)),([n,t])=>i(n,t))([c,o])}))},pluck:function makePluck({curryN:n,map:t,prop:e}){return n(z,(function pluck(n,r){return t(e(n),r)}))},applySpecN:function makeApplySpecN({isFunction:n,keys:t,curryN:e,apply:r}){function mapper(n,e){return t(e).reduce((t,r)=>(t[r]=n(e[r]),t),{})}return e(2,(function applySpecN(t,i){const c=mapper(e=>n(e)?e:applySpecN(t,e),i);return e(t,(function specificationApplication(){const n=Array.from(arguments);return mapper(t=>r(t,n),c)}))}))}},tn=function applyTo(n,t){return t(n)},en=function endsWith(n,t){return t&&j(t.endsWith)?t.endsWith(n):t[t.length-1]===n},rn=function findIndex(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return e;e+=1}return-1},cn=function findLastIndex(n,t){const e=makeIterable(t);let r=e.length;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return r;r-=1}return-1},on=function hasIn(n,t){return n in t},un=function has(n,t){return t&&void 0!==t[n]},an=function identical(n,t){return Object.is(n,t)},sn=function indexOf(n,t){return t.indexOf(n)},fn=function lastIndexOf(n,t){return t.lastIndexOf(n)},ln=function match(n,t){return t.match(n)},pn=function none(n,t){let e=0;const r=makeIterable(t);let i=!0;for(;e<r.length&&i;){const{value:t}=r.iterate(e);n(t)||(i=!1),e+=1}return i},mn=function pickBy(n,t){const e=makeIterable(t),r=e.init;let i=0;for(;i<e.length;){const{key:t,value:c}=e.iterate(i);n(c,t)&&(r[t]=c),i+=1}return r},dn=function startsWith(n,t){return t&&j(t.startsWith)?t.startsWith(n):t[0]===n},hn=function add(n,t){return t+n},yn=function find(n,t){let e=0;const r=makeIterable(t);for(;e<r.length;){const{value:t}=r.iterate(e);if(n(t))return t;e+=1}},gn=function findLast(n,t){const e=makeIterable(t);let r=e.length-1;for(;r>-1;){const{value:t}=e.iterate(r);if(n(t))return t;r-=1}},kn=function apply(n,t){return n.apply(null,t)},bn=function and(n,t){return n&&t},En=function any(n,t){let e=0,r=!1;const i=length(t);for(;e<i&&!r;)n(t[e])&&(r=!0),e+=1;return r},On=function all(n,t){let e=0;const r=makeIterable(t);let i=!0;for(;e<r.length&&i;){const{value:t}=r.iterate(e);n(t)||(i=!1),e+=1}return i},vn=function ap(n,t){if(j(n)&&j(t))return function sCombinator(e){return n(e,t(e))};if(!w(n)||!w(t))throw new TypeError("Expected to receive an array of functions and an array of values.");if(!n.length||n.filter(j).length!==n.length)throw new TypeError("Expected to receive an array of functions to apply.");return n.reduce((function apReduce(n,e){return n.concat(t.map(n=>e(n)))}),[])},An=function concat(n,t){return n.concat(t)},jn=function cond(n,t){let e,r=0,i=!1;const c=length(n);for(;r<c&&!i;){const[c,o]=n[r];c(t)&&(i=!0,e=o(t)),r+=1}return e},Tn=function divide(n,t){return t/n},In=function equals(n,t){return n&&j(n.equals)?n.equals(t):n===t},_n=function filter(n,t){let e=0;const r=makeIterable(t),{length:i,isArray:c}=r,o=c?[]:{};for(;e<i;){const{key:t,value:i}=r.iterate(e);n(i)&&(c?o.push(i):o[t]=i),e+=1}return o},Nn=function forEach(n,t){let e=0;const r=makeIterable(t),{length:i}=r;for(;e<i;){const{value:t}=r.iterate(e);n(t),e+=1}},wn=function includes(n,t){return t&&j(t.includes)?t.includes(n):!(!t||!j(t.indexOf))&&t.indexOf(n)>-1},xn=function gt(n,t){return t>n},Pn=function gte(n,t){return t>=n},Cn=function join(n,t){return t.join(n)},Ln=function lt(n,t){return t<n},Sn=function lte(n,t){return t<=n},Un=function map(n,t){let e=0;const r=makeIterable(t),{length:i,init:c}=r,o=c;for(;e<i;){const{key:t,value:i}=r.iterate(e);o[t]=n(i),e+=1}return o},Dn=function max(n,t){return Math.max(n,t)},$n=function min(n,t){return Math.min(n,t)},Bn=function multiply(n,t){return t*n},Fn=function nth(n,t){return n<0&&t.length+n?t[t.length+n]:t[n]},qn=function or(n,t){return n||t},zn=function range(n,t){const e=[],r=t<n;for(let i=n;r?i>=t:i<=t;r?i--:i++)e.push(i);return e},Wn=function split(n,t){return t.split(n)},Rn=function sort(n,t){const e=[].concat(t);return e.sort(n),e},Mn=function subtract(n,t){return t-n},Hn=function toJSON(n,t){return JSON.stringify(t,null,n)},Yn=function both(n,t,e){return n(e)&&t(e)},Gn=function replace(n,t,e){return e.replace(n,t)},Jn=function innerJoin(n,t,e){const r=makeIterable(t),i=[],c=makeIterable(e);let o=0;for(;o<r.length;){const{value:t}=r.iterate(o);let e=0;for(;e<c.length;){const{value:r}=c.iterate(e);n(t,r)&&i.push(t),e+=1}o+=1}return i},Kn=function insert(n,t,e){const r=[].concat(e);return r.splice(n,0,t),r},Vn=function insertAll(n,t,e){return[].concat(e.slice(0,n),t,e.slice(n,1/0))},Qn=function eqBy(n,t,e){return Boolean(n(t,e))},Xn=function either(n,t,e){return n(e)||t(e)},Zn=function reduce(n,t,e){const r=makeIterable(e);let i=0;const{length:c}=r;let o=t;for(;i<c;){const{value:t}=r.iterate(i);o=n(o,t),i+=1}return o},nt=function slice(n,t,e){return e.slice(n,t)},tt=function ifElse(n,t,e,r){return n(r)?t(r):e(r)},et=Object.freeze({UNCHECKED:{name:"@@FUTILITY::config.unchecked",ts:()=>"any",check:!1},CHECKED:{name:"@@FUTILITY::config.checked",ts:system,check:!0},AUTO:{name:"@@FUTILITY::config.auto",ts:system,check:"undefined"!=typeof process&&void 0!==process.env&&void 0!==process.env.NODE_ENV&&"production"!==process.env.NODE_ENV||"undefined"!=typeof window&&"boolean"==typeof window.__FUTILITY_TYPE_CHECK&&window.__FUTILITY_TYPE_CHECK}}),rt=function core(t){return B.pipe(fabricate,(function basicDefinitions({def:t,curry:e,curryN:r}){const i=function makeSideEffectsFromEnv(n){const t=n((function _sideEffect(n,t){return n(t),t})),e=n((function _binarySideEffect(n,t,e){return n(t,e),e})),r=e(console.log);return{sideEffect:t,binarySideEffect:e,trace:r,inspect:n((function _inspect(n,t,e,r){return n(e,t(r)),r}))}}(e),c=function autoCurryUsing(n){return function autoCurry(t){return Object.keys(t).map((function wrapCurry(e){const r=t[e];return[e,"function"==typeof r&&r.length?n(r.length,r):r]})).reduce((n,[t,e])=>Object.assign({},n,{[t]:e}),{})}}(r),o=B.smash([c(B),i,{memoizeWith:memoizeWith,def:t,curry:e,curryN:r,C:n,$:n.$,is:ofConstructor,isArray:w,isBoolean:I,isFunction:j,isNumber:A,isRawObject:N,isString:v,isSymbol:_,isUndefined:O,isUnmatched:isUnmatched}]);return o.pipe(extendBinary,c,extendTernary,c,extendQuaternary,c,extendDerived,makeAliases)(o)}))(t)}(et.UNCHECKED);var it=rt.weld(rt,{version:"4.0.0",configuration:et.UNCHECKED});module.exports=it;
