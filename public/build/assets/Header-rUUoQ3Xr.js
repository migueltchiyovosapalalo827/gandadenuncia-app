import{m as i,j as e,Y as a}from"./app-aEolSpHz.js";import{B as n}from"./button-Dkwouc6J.js";import{c}from"./createLucideIcon-D5YUeAK2.js";import{L as o}from"./log-out-FPLVxt3U.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],d=c("Bell",l);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],h=c("User",m);function x(){var t;const s=(t=window.auth)==null?void 0:t.user;return{usuario:s,logout:()=>{i.post("/logout")},isAuthenticated:!!s}}const g=()=>{const{usuario:s,logout:r,isAuthenticated:t}=x();return e.jsx("header",{className:"bg-white border-b border-gray-200 sticky top-0 z-10",children:e.jsxs("div",{className:"container mx-auto px-4 py-3 flex justify-between items-center",children:[e.jsx(a,{href:"/",className:"text-2xl font-bold text-brand-blue",children:"Ganda Denúncia"}),e.jsx("div",{className:"flex items-center gap-4",children:t?e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"text-gray-600",children:["Olá, ",s==null?void 0:s.nome]}),e.jsx(a,{href:"/admin/notificacoes",children:e.jsx(n,{variant:"ghost",size:"icon",children:e.jsx(d,{className:"h-5 w-5"})})}),e.jsxs(n,{variant:"outline",size:"sm",onClick:r,className:"flex items-center gap-2",children:[e.jsx(o,{className:"h-4 w-4"}),"Sair"]})]}):e.jsx(a,{href:"/login",children:e.jsxs(n,{variant:"outline",size:"sm",className:"flex items-center gap-2",children:[e.jsx(h,{className:"h-4 w-4"}),"Entrar"]})})})]})})};export{g as H};
