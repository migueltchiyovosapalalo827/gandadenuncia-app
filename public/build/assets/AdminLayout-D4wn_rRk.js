import{j as e,Y as c}from"./app-aEolSpHz.js";import{c as s}from"./createLucideIcon-D5YUeAK2.js";import{L as o}from"./log-out-FPLVxt3U.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=[["line",{x1:"18",x2:"18",y1:"20",y2:"10",key:"1xfpm4"}],["line",{x1:"12",x2:"12",y1:"20",y2:"4",key:"be30l9"}],["line",{x1:"6",x2:"6",y1:"20",y2:"14",key:"1r4le6"}]],r=s("ChartNoAxesColumn",l);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const t=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]],i=s("CircleAlert",t);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]],h=s("House",d);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]],m=s("Users",x),y=()=>{const n=[{path:"/admin",icon:h,label:"Dashboard"},{path:"/admin/denuncias",icon:i,label:"Denúncias"},{path:"/admin/usuarios",icon:m,label:"Usuários"},{path:"/admin/relatorios",icon:r,label:"Relatórios"},{path:"/logout",icon:o,label:"Sair",method:"post"}];return e.jsx("aside",{className:"w-64 bg-white border-r h-screen",children:e.jsxs("div",{className:"p-4",children:[e.jsx("h1",{className:"text-xl font-bold mb-6",children:"Ganda Denúncia"}),e.jsx("nav",{className:"space-y-2",children:n.map(a=>e.jsxs(c,{href:a.path,method:a.method||"get",className:"flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md",children:[e.jsx(a.icon,{className:"w-5 h-5"}),e.jsx("span",{children:a.label})]},a.path))})]})})},b=({children:n})=>e.jsx("div",{className:"min-h-screen bg-gray-100",children:e.jsxs("div",{className:"flex",children:[e.jsx(y,{}),e.jsx("main",{className:"flex-1 p-6",children:n})]})});export{b as A};
