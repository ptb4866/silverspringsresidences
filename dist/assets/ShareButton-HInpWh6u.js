import{c as n,r as g,B as u,j as e,Q as b,U as j,W as v,Y as f,M as z}from"./index-Dg2gyS32.js";import{B as h}from"./button-CISuye6k.js";/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=n("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=n("Facebook",[["path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",key:"1jg4f8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=n("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=n("Linkedin",[["path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",key:"c2jq9f"}],["rect",{width:"4",height:"12",x:"2",y:"9",key:"mk3on5"}],["circle",{cx:"4",cy:"4",r:"2",key:"bt5ra8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=n("Share2",[["circle",{cx:"18",cy:"5",r:"3",key:"gq8acd"}],["circle",{cx:"6",cy:"12",r:"3",key:"w7nqdw"}],["circle",{cx:"18",cy:"19",r:"3",key:"1xt0gg"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49",key:"47mynk"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49",key:"1n3mei"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=n("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=n("Twitter",[["path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z",key:"pff0z6"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=n("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);function F({title:s,url:a,description:i="",image:L="",variant:k="default"}){const[c,r]=g.useState(!1),{toast:l}=u(),p=async()=>{try{await navigator.clipboard.writeText(a),r(!0),l({title:"Link Copied!",description:"The link has been copied to your clipboard."}),setTimeout(()=>r(!1),2e3)}catch{l({title:"Copy Failed",description:"Unable to copy link. Please try again.",variant:"destructive"})}},y=()=>{const t=encodeURIComponent(`Check out this article: ${s}`),o=encodeURIComponent(`I thought you might be interested in this article:

${s}

${i}

Read more: ${a}`);window.open(`mailto:?subject=${t}&body=${o}`)},x=()=>{const t=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(a)}`;window.open(t,"_blank","width=600,height=400")},m=()=>{const o=`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${s} - ${i}`)}&url=${encodeURIComponent(a)}`;window.open(o,"_blank","width=600,height=400")},w=()=>{const t=`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(a)}`;window.open(t,"_blank","width=600,height=400")},C=[{label:"Copy Link",icon:c?e.jsx($,{size:16}):e.jsx(M,{size:16}),onClick:p,className:c?"text-green-600":""},{label:"Email",icon:e.jsx(z,{size:16}),onClick:y},{label:"Facebook",icon:e.jsx(U,{size:16}),onClick:x},{label:"Twitter",icon:e.jsx(T,{size:16}),onClick:m},{label:"LinkedIn",icon:e.jsx(I,{size:16}),onClick:w}];return e.jsxs(b,{children:[e.jsx(j,{asChild:!0,children:k==="compact"?e.jsx(h,{variant:"ghost",size:"sm",className:"h-6 w-6 p-0 hover:bg-gray-100",children:e.jsx(d,{size:14})}):e.jsxs(h,{variant:"outline",size:"sm",className:"flex items-center gap-2",children:[e.jsx(d,{size:16}),c?"Copied!":"Share"]})}),e.jsx(v,{align:"end",className:"w-48",children:C.map((t,o)=>e.jsxs(f,{onClick:t.onClick,className:`flex items-center gap-2 cursor-pointer ${t.className||""}`,children:[t.icon,t.label]},o))})]})}export{F as S,q as T,N as U};
