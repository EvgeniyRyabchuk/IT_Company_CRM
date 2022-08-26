(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9943],{66242:function(e,n,t){"use strict";t.d(n,{Z:function(){return g}});var r=t(87462),a=t(63366),o=t(67294),s=t(86010),i=t(94780),c=t(11496),u=t(71657),l=t(55113),d=t(34867);function m(e){return(0,d.Z)("MuiCard",e)}(0,t(1588).Z)("MuiCard",["root"]);var h=t(85893);const p=["className","raised"],f=(0,c.ZP)(l.Z,{name:"MuiCard",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({overflow:"hidden"})));var g=o.forwardRef((function(e,n){const t=(0,u.Z)({props:e,name:"MuiCard"}),{className:o,raised:c=!1}=t,l=(0,a.Z)(t,p),d=(0,r.Z)({},t,{raised:c}),g=(e=>{const{classes:n}=e;return(0,i.Z)({root:["root"]},m,n)})(d);return(0,h.jsx)(f,(0,r.Z)({className:(0,s.Z)(g.root,o),elevation:c?8:void 0,ref:n,ownerState:d},l))}))},44267:function(e,n,t){"use strict";t.d(n,{Z:function(){return f}});var r=t(87462),a=t(63366),o=t(67294),s=t(86010),i=t(94780),c=t(11496),u=t(71657),l=t(34867);function d(e){return(0,l.Z)("MuiCardContent",e)}(0,t(1588).Z)("MuiCardContent",["root"]);var m=t(85893);const h=["className","component"],p=(0,c.ZP)("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(e,n)=>n.root})((()=>({padding:16,"&:last-child":{paddingBottom:24}})));var f=o.forwardRef((function(e,n){const t=(0,u.Z)({props:e,name:"MuiCardContent"}),{className:o,component:c="div"}=t,l=(0,a.Z)(t,h),f=(0,r.Z)({},t,{component:c}),g=(e=>{const{classes:n}=e;return(0,i.Z)({root:["root"]},d,n)})(f);return(0,m.jsx)(p,(0,r.Z)({as:c,className:(0,s.Z)(g.root,o),ownerState:f,ref:n},l))}))},74496:function(e,n,t){"use strict";var r;n.Z=void 0;var a=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z","InformationOutline");n.Z=a},28150:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/pages/knowledge-base",function(){return t(30783)}])},30783:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return j}});var r=t(85893),a=t(67294),o=t(41664),s=t.n(o),i=t(86886),c=t(66242),u=t(11496),l=t(15861),d=t(87357),m=t(44267),h=t(44737),p=t(74496),f=t(9669),g=t.n(f),Z=t(82689),x=(0,u.ZP)("a")({textDecoration:"none"}),v=(0,u.ZP)(d.Z)((function(e){var n=e.theme;return{display:"flex",justifyContent:"center",paddingTop:n.spacing(5),backgroundColor:n.palette.action.hover}})),j=!0;n.default=function(e){var n=e.apiData,t=(0,a.useState)(""),o=t[0],u=t[1],f=(0,a.useState)(null),j=f[0],b=f[1];(0,a.useEffect)((function(){""!==o?g().get("/pages/knowledge-base",{params:{q:o}}).then((function(e){e.data&&e.data.length?b(e.data):b(null)})):b(n)}),[o,n]);var C=(0,r.jsxs)(d.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)(h.Z,{sx:{mr:2}}),(0,r.jsx)(l.Z,{variant:"h6",children:"No Results Found!"})]});return(0,r.jsxs)(a.Fragment,{children:[(0,r.jsx)(Z.Z,{searchTerm:o,setSearchTerm:u}),null!==j?(0,r.jsx)(i.ZP,{container:!0,spacing:6,className:"match-height",children:null!==j&&Array.isArray(j)?j.map((function(e,n){return(0,r.jsx)(i.ZP,{item:!0,xs:12,sm:6,md:4,children:(0,r.jsx)(c.Z,{children:(0,r.jsx)(s(),{passHref:!0,href:"/pages/knowledge-base/[category]",as:"/pages/knowledge-base/".concat(e.category),children:(0,r.jsxs)(x,{children:[(0,r.jsx)(v,{children:(0,r.jsx)("img",{src:e.imgSrc,alt:"knowledge-base-".concat(e.category)})}),(0,r.jsxs)(m.Z,{sx:{pt:4,textAlign:"center"},children:[(0,r.jsx)(l.Z,{variant:"h6",sx:{mb:3},children:e.title}),(0,r.jsx)(l.Z,{variant:"body2",children:e.desc})]})]})})})},n)})):(0,r.jsx)(i.ZP,{item:!0,xs:12,children:(0,r.jsxs)(d.Z,{sx:{display:"flex",alignItems:"center",justifyContent:"center"},children:[(0,r.jsx)(p.Z,{sx:{mr:2}}),(0,r.jsx)(l.Z,{variant:"h6",children:"Data is not an array!"})]})})}):C]})}},82689:function(e,n,t){"use strict";var r=t(85893),a=t(11496),o=t(15861),s=t(44267),i=t(66242),c=t(87109),u=t(50135),l=t(69497);var d=(0,a.ZP)(i.Z)((function(e){var n=e.theme;return{border:0,boxShadow:"none",backgroundSize:"cover",marginBottom:n.spacing(6),backgroundImage:"light"===n.palette.mode?"url(/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/pages/pages-header-bg-light.png)":"url(/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/pages/pages-header-bg-dark.png)"}})),m=(0,a.ZP)(u.Z)((function(e){var n,t,r,a=e.theme;return n={width:"100%","& .MuiOutlinedInput-root":{backgroundColor:a.palette.background.paper}},t=a.breakpoints.up("sm"),r={width:450},t in n?Object.defineProperty(n,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):n[t]=r,n}));n.Z=function(e){var n=e.searchTerm,t=e.setSearchTerm;return(0,r.jsx)(d,{children:(0,r.jsxs)(s.Z,{sx:{pt:20,textAlign:"center",pb:function(e){return"".concat(e.spacing(25)," !important")}},children:[(0,r.jsx)(o.Z,{variant:"h5",sx:{mb:2.5,color:"primary.main",fontWeight:600,fontSize:"1.5rem !important"},children:"Hello, how can we help?"}),(0,r.jsx)(o.Z,{variant:"body2",sx:{mb:6.5},children:"or choose a category to quickly find the help you need"}),(0,r.jsx)(m,{value:n,placeholder:"Ask a question....",onChange:function(e){return function(e){t(e.target.value)}(e)},InputProps:{startAdornment:(0,r.jsx)(c.Z,{position:"start",children:(0,r.jsx)(l.Z,{})})}})]})})}}},function(e){e.O(0,[9774,2888,179],(function(){return n=28150,e(e.s=n);var n}));var n=e.O();_N_E=n}]);