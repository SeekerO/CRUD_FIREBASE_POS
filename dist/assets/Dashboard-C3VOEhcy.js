import{G as _,j as e,r as x,M as L,w as M,a as A,u as z,b as q,d as E}from"./index-BiUQ1WVI.js";import{I as w,a as O,v as S,S as P,F as I}from"./index-CUFJvlJu.js";function T(t){return _({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h6v6h-6zm10 0h6v6h-6zm-10 10h6v6h-6zm10 3h6m-3 -3v6"},child:[]}]})(t)}const B=({handleSizeChange:t,handleOptionalSizes_function:i,handlePriceChange:f,sizePrices:v,selectedSizes:l,isOptional:d})=>e.jsxs("div",{className:"flex flex-col gap-1 ",children:[e.jsxs("div",{className:"flex gap-1 items-center",children:[e.jsx("span",{children:"Opional Sizes"}),e.jsx("input",{checked:d,onChange:()=>i(),type:"checkbox",className:"flex h-[15px] w-[15px]"})]}),d&&e.jsxs("div",{className:"flex justify-evenly flex-wrap",children:[e.jsxs("div",{className:"items-center flex gap-1",children:[e.jsx("span",{children:"Small"}),e.jsx("input",{type:"checkbox",className:"flex h-[15px] w-[15px]",checked:l.includes("Small"),onChange:()=>t("Small")})]}),e.jsxs("div",{className:"items-center flex gap-1",children:[e.jsx("span",{children:"Medium"}),e.jsx("input",{type:"checkbox",className:"flex h-[15px] w-[15px]",checked:l.includes("Medium"),onChange:()=>t("Medium")})]}),e.jsxs("div",{className:"items-center flex gap-1",children:[e.jsx("span",{children:"Large"}),e.jsx("input",{type:"checkbox",className:"flex h-[15px] w-[15px]",checked:l.includes("Large"),onChange:()=>t("Large")})]}),e.jsxs("div",{className:"items-center flex gap-1",children:[e.jsx("span",{children:"Extra Large"}),e.jsx("input",{type:"checkbox",className:"flex h-[15px] w-[15px]",checked:l.includes("Extra Large"),onChange:()=>t("Extra Large")})]})]})]}),F=({metaData_Category:t})=>{const[i,f]=x.useState(!1),[v,l]=x.useState(""),[d,m]=x.useState(!1),[p,h]=x.useState([]),[j,g]=x.useState([]),[y,C]=x.useState({item_name:"",item_price:"",item_quantity:"",item_category:""}),N=s=>{const{name:c,value:b}=s.target;C({...y,[c]:b})},n=s=>{s.preventDefault();var c=S();y.item_category!==""&&(M(y,c,C,j),C({item_name:"",item_price:"",item_quantity:"",item_category:""}),m(!1),h([]),g([]),l(""))},o=s=>{s.preventDefault();const c=S();A(v,c),alert("New Category Added Succesfuly!"),l("")},a=s=>{p.includes(s)?(h(p.filter(c=>c!==s)),g(j.filter(c=>c.size!==s))):(h([...p,s]),g([...j,{size:s,price:"",stock:""}]))},r=()=>{m(!d),h([]),g([])},u=(s,c,b)=>{const D=j.map(k=>k.size===s?{...k,[c]:b}:k);g(D)};return e.jsxs("div",{className:"w-[500px] h-full py-5 px-1 bg-slate-300 rounded-md shadow-md flex flex-col items-center",children:[e.jsx("label",{className:"w-full text-center font-semibold text-[20px] underline underline-offset-2",children:"ADD ITEMS"}),e.jsxs("form",{className:"px-2 mt-5 space-y-3 w-full h-[70vh] overflow-y-auto",children:[e.jsxs("div",{className:"gap-1 flex items-center justify-between",children:[e.jsx("label",{children:"CATEGORY:"}),e.jsx("div",{className:"flex items-center justify-between",children:i?e.jsxs("div",{className:"w-full flex",children:[e.jsx("input",{required:!0,type:"text",className:"ItemInput",value:v,onChange:s=>l(s.target.value)}),e.jsx(w,{onClick:()=>f(!i),className:"text-[30px] MainTextColor hover:text-blue-600 cursor-pointer"})]}):e.jsxs(e.Fragment,{children:[e.jsxs("select",{onChange:N,required:!0,className:"p-1 outline-none rounded-md",name:"item_category",value:y.item_category,children:[e.jsx("option",{}),t.map((s,c)=>e.jsx("option",{value:s.category,children:s.category},c))]}),e.jsx(L,{onClick:()=>f(!i),className:"text-[30px] MainTextColor hover:text-blue-600 cursor-pointer"})]})})]}),!i&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ItemCard",children:[e.jsx("label",{children:"NAME:"}),e.jsx("input",{required:!0,name:"item_name",value:y.item_name,type:"text",className:"ItemInput",onChange:N})]}),!d&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ItemCard",children:[e.jsx("label",{children:"PRICE:"}),e.jsx("input",{required:!0,onKeyDown:s=>{!/[0-9]/.test(s.key)&&s.key!=="."&&s.key!=="Backspace"&&s.preventDefault()},name:"item_price",value:y.item_price,type:"number",className:"ItemInput",onChange:N})]}),e.jsxs("div",{className:"ItemCard",children:[e.jsx("label",{children:"STOCK:"}),e.jsx("input",{required:!0,onKeyDown:s=>{!/[0-9]/.test(s.key)&&s.key!=="."&&s.key!=="Backspace"&&s.preventDefault()},name:"item_quantity",value:y.item_quantity,type:"number",className:"ItemInput",onChange:N})]})]}),e.jsx(B,{handleSizeChange:a,handleOptionalSizes_function:r,handlePriceChange:u,sizePrices:j,selectedSizes:p,isOptional:d}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-2",children:"Prizes:"}),j.map((s,c)=>e.jsxs("div",{className:"mb-2 flex items-center gap-2",children:[e.jsx("input",{type:"text",placeholder:"Size",value:s.size,readOnly:!0,className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx("input",{type:"number",placeholder:"Price",value:s.price,onChange:b=>u(s.size,"price",b.target.value),className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx("input",{type:"number",placeholder:"Stock",value:s.stock,onChange:b=>u(s.size,"stock",b.target.value),className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx(w,{onClick:()=>a(s.size),className:"text-[20px] cursor-pointer text-red-500"})]},c))]})]}),i?e.jsxs("button",{onClick:o,className:"w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-slate-100 hover:shadow-md",children:["ADD CATEGORY ",e.jsx(T,{className:"text-[20px]"})]}):e.jsxs("button",{onClick:n,className:"w-full p-2 MainBgColor rounded-md flex gap-1 items-center justify-center mt-3 hover:text-slate-100 hover:shadow-md",children:["ADD ITEM ",e.jsx(O,{className:"text-[20px]"})]})]})]})};function R(t){return _({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"},child:[]},{tag:"path",attr:{d:"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"},child:[]}]})(t)}function U(t){return _({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",strokeWidth:"2",d:"M2.99787498,6.99999999 L2.99787498,0.999999992 L17.4999998,0.999999992 L20.9999998,4.50000005 L21,23 L15,23 M16,1 L16,6 L21,6 M8,23 C11.8659932,23 15,19.8659932 15,16 C15,12.1340068 11.8659932,9 8,9 C4.13400675,9 1,12.1340068 1,16 C1,19.8659932 4.13400675,23 8,23 Z M4.5,16.5 L8,13 L11.5,16.5 M8,13.5 L8,20"},child:[]}]})(t)}const K=({item:t,setisEdit:i,isEdit:f,metaData_Category:v})=>{const[l,d]=x.useState({item_name:"",item_price:"",item_quantity:"",item_category:""}),[m,p]=x.useState([]),[h,j]=x.useState(!1);x.useEffect(()=>{Array.isArray(t.item_sizes)&&p(t.item_sizes),d({id:t.id,item_name:t.item_name,item_price:t.item_price,item_quantity:t.item_quantity,item_category:t.item_category}),m.length!==0?j(!0):j(!1)},[t,f]);const g=a=>{const{name:r,value:u}=a.target;d({...l,[r]:u})},y=async()=>{const a={...l,item_sizes:m};await z(t.id,a),i(!1)},C=a=>{a.preventDefault(),p(r=>[...r,{size:"",price:"",stock:""}])},N=a=>{p(r=>r.filter((u,s)=>s!==a))},n=(a,r,u)=>{p(s=>s.map((c,b)=>b===a?{...c,[r]:u}:c))},o=()=>{j(!h)};return f?e.jsx("div",{className:"h-full w-full bg-gray-800 fixed inset-0 bg-opacity-10 backdrop-blur-[3px] flex justify-center",children:e.jsxs("div",{className:"w-auto h-fit bg-slate-100 rounded-md mt-40 shadow-md p-2",children:[e.jsx("div",{className:"justify-end flex",children:e.jsx(w,{className:"text-[30px] cursor-pointer hover:text-red-500",onClick:()=>i(!f)})}),e.jsxs("form",{className:"flex flex-col gap-2",children:[e.jsxs("div",{className:"flex gap-2 w-full",children:[e.jsxs("div",{className:"flex flex-col gap-2 w-full",children:[e.jsx("label",{className:"font-semibold",children:"Categories"}),e.jsx("select",{required:!0,className:"p-1 outline-none rounded-md",name:"item_category",value:l.item_category,onChange:g,children:v.map((a,r)=>e.jsx("option",{value:a.category,className:"lowercase",children:a.category},r))}),e.jsx("label",{className:"font-semibold",children:"Name"}),e.jsx("input",{required:!0,type:"text",onChange:g,name:"item_name",value:l.item_name,className:"ItemInput"}),!h&&e.jsxs(e.Fragment,{children:[e.jsx("label",{className:"font-semibold",children:"Price"}),e.jsx("input",{required:!0,type:"number",onKeyDown:a=>{!/[0-9]/.test(a.key)&&a.key!=="."&&a.key!=="Backspace"&&a.preventDefault()},onChange:g,name:"item_price",value:l.item_price,className:"ItemInput"}),e.jsx("label",{className:"font-semibold",children:"Quantity"}),e.jsx("input",{required:!0,type:"number",onKeyDown:a=>{!/[0-9]/.test(a.key)&&a.key!=="."&&a.key!=="Backspace"&&a.preventDefault()},onChange:g,name:"item_quantity",value:l.item_quantity,className:"ItemInput"})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("span",{children:"Optional Sizes"}),e.jsx("input",{type:"checkbox",checked:h,onChange:o,className:"w-4 h-4"})]})]}),(h||m.length)!==0&&e.jsxs("div",{className:"border-s-2 border-gray-200 px-2",children:[e.jsx("label",{className:"font-semibold",children:"Optional Sizes"}),e.jsxs("div",{className:"",children:[m.map((a,r)=>e.jsxs("div",{className:"flex gap-x-2 mt-5",children:[e.jsx("input",{type:"text",placeholder:"Size",value:a.size,onChange:u=>n(r,"size",u.target.value),className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx("input",{type:"text",placeholder:"Price",value:a.price,onChange:u=>n(r,"price",u.target.value),className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx("input",{type:"text",placeholder:"Stock",value:a.stock,onChange:u=>n(r,"stock",u.target.value),className:"w-[100px] px-1 py-1 rounded-md"}),e.jsx("button",{onClick:()=>N(r),className:"px-2 py-1 bg-red-500 text-white rounded-md hover:scale-105 duration-300",children:"Remove"})]},r)),e.jsx("button",{onClick:C,className:"mt-5 px-2 py-1 bg-green-500 text-white rounded-md",children:"Add Size"})]})]})]}),e.jsxs("button",{onClick:y,className:"flex items-center gap-2 bg-blue-500 p-1 font-semibold rounded-md justify-center text-white hover:text-black hover:bg-opacity-80 duration-300",children:["UPDATE ITEM ",e.jsx(U,{})]})]})]})}):null},G=({item:t,index:i,metaData_Category:f})=>{const[v,l]=x.useState(!1),[d,m]=x.useState(!1),p=h=>{E(h),m(!1)};return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:" mt-1 w-full px-2 grid items-center grid-cols-4 justify-between MainBgColor rounded-md py-2 font-semibold text-white hover:py-3 duration-300 ",children:[e.jsx("label",{className:"w-[100px]",children:i+1}),e.jsx("label",{className:"truncate overflow-hidden",children:t.item_name}),e.jsx("label",{children:t.item_price}),e.jsxs("div",{className:"w-full justify-between flex items-center",children:[e.jsx("label",{children:t.item_quantity}),e.jsxs("div",{className:"flex gap-2 text-[25px]",children:[e.jsx(R,{onClick:()=>l(!v),className:"hover:text-blue-500 cursor-pointer"}),e.jsx(q,{onClick:()=>m(!d),className:"hover:text-red-500 cursor-pointer"})]})]})]},i),d&&e.jsx("div",{className:"fixed inset-0 w-full h-full backdrop-blur-[1px] items-center justify-center flex",children:e.jsxs("div",{className:"bg-slate-100 w-[320px] h-[150px] flex flex-col p-2 text-center rounded-md shadow-md",children:[e.jsx("div",{className:"justify-end flex",children:e.jsx(w,{className:"text-[20px] cursor-pointer hover:text-red-500",onClick:()=>m(!d)})}),e.jsxs(e.Fragment,{children:["Are you sure you want to delete this item?",e.jsxs("span",{children:["Confirm to ",e.jsx("strong",{children:"DELETE"}),"."]})]}),e.jsx("div",{className:"w-full flex gap-2 justify-center mt-3",children:e.jsx("button",{onClick:()=>p(t==null?void 0:t.id),className:"px-2 py-1 bg-blue-500 rounded-md hover:text-white",children:"CONFIRM"})})]})}),e.jsx(K,{item:t,setisEdit:l,isEdit:v,metaData_Category:f})]})},W=({isFetch_Data:t,metaData_Category:i})=>{const[f,v]=x.useState(""),[l,d]=x.useState({field:"",order:""}),[m,p]=x.useState("ALL"),h=n=>{p(n.target.value)},j=n=>m==="ALL"?n:n.filter(o=>o.item_category===m),g=t==null?void 0:t.filter(n=>{const o=f.toLowerCase();return n.item_name.toLowerCase().includes(o)}),y=j(g),C=n=>{d(o=>{const r=o.field===n&&o.order==="asc"?"desc":"asc";return{field:n,order:r}})},N=[...y].sort((n,o)=>{if(l.field){const a=n[l.field],r=o[l.field];return a<r?l.order==="asc"?-1:1:a>r?l.order==="asc"?1:-1:0}return 0});return e.jsxs("div",{className:"w-full h-full",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("div",{children:e.jsxs("select",{required:!0,className:"p-1 outline-none rounded-md",name:"item_category",onChange:h,value:m,children:[e.jsx("option",{value:"ALL",children:"ALL"}),i.map((n,o)=>e.jsx("option",{value:n.category,className:"lowercase",children:n.category},o))]})}),e.jsx(P,{setSearchTerm:v,searchTerm:f})]}),e.jsxs("div",{className:"mt-2 w-full px-2 grid items-center grid-cols-4 justify-between MainBgColor rounded-md py-2 font-semibold text-white",children:[e.jsx("span",{className:"w-[100px]",children:"ID"}),e.jsxs("span",{className:"flex gap-2 items-center",onClick:()=>C("item_name"),children:["ITEM ",e.jsx(I,{className:"hover:text-blue-600 cursor-pointer"})]}),e.jsx("span",{children:"PRICE"}),e.jsxs("span",{className:"flex gap-2 items-center",onClick:()=>C("item_quantity"),children:["STOCK ",e.jsx(I,{className:"hover:text-blue-600 cursor-pointer"})]})]}),e.jsx("div",{children:N.length===0?e.jsx(e.Fragment,{children:"NO DATA"}):e.jsx(e.Fragment,{children:N.map((n,o)=>e.jsx(G,{item:n,index:o,metaData_Category:i},o))})})]})},Q=({isFetch_Data:t,metaData_Category:i})=>e.jsxs("div",{className:"w-full h-full bg-slate-200 rounded-md p-2 flex flex-col",children:[e.jsx("h1",{className:"Title",children:"DASHBOARD"}),e.jsxs("main",{className:"mt-4 gap-2 h-full flex",children:[e.jsx(F,{metaData_Category:i}),e.jsx(W,{isFetch_Data:t,metaData_Category:i})]})]});export{Q as default};
