function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},o={},r=t.parcelRequired7c6;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in o){var t=o[e];delete o[e];var r={id:e,exports:{}};return n[e]=r,t.call(r.exports,r,r.exports),r.exports}var l=new Error("Cannot find module '"+e+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(e,t){o[e]=t},t.parcelRequired7c6=r);var l=r("7Y9D8");const i=document.querySelector("form");function u(t,n){Math.random()>.3?e(l).Notify.success(`✅ Fulfilled promise ${t} in ${n}ms`):e(l).Notify.failure(`❌ Rejected promise ${t} in ${n}ms`)}document.querySelector('[type="submit"]').addEventListener("click",(function(e){e.preventDefault();let t=parseInt(i.elements.delay.value),n=parseInt(i.elements.step.value),o=parseInt(i.elements.amount.value);console.log(t,n,o);for(let e=1;e<=o;e+=1,t+=n)setTimeout((()=>u(e,t)),t)}));
//# sourceMappingURL=03-promises.8a6f3950.js.map