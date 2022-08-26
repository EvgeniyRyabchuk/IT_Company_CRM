(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6190],{51107:function(a,e,t){"use strict";t.d(e,{Z:function(){return f}});var r=t(63366),n=t(87462),s=t(67294),i=(t(59864),t(86010)),o=t(94780),m=t(11496),l=t(71657),c=t(54801),d=t(87952),u=t(34867);function p(a){return(0,u.Z)("MuiAvatarGroup",a)}var x=(0,t(1588).Z)("MuiAvatarGroup",["root","avatar"]),v=t(85893);const g=["children","className","componentsProps","max","spacing","total","variant"],h={small:-16,medium:null},j=(0,m.ZP)("div",{name:"MuiAvatarGroup",slot:"Root",overridesResolver:(a,e)=>(0,n.Z)({[`& .${x.avatar}`]:e.avatar},e.root)})((({theme:a})=>({[`& .${c.Z.root}`]:{border:`2px solid ${(a.vars||a).palette.background.default}`,boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}},display:"flex",flexDirection:"row-reverse"}))),A=(0,m.ZP)(d.Z,{name:"MuiAvatarGroup",slot:"Avatar",overridesResolver:(a,e)=>e.avatar})((({theme:a})=>({border:`2px solid ${(a.vars||a).palette.background.default}`,boxSizing:"content-box",marginLeft:-8,"&:last-child":{marginLeft:0}})));var f=s.forwardRef((function(a,e){var t,m;const c=(0,l.Z)({props:a,name:"MuiAvatarGroup"}),{children:d,className:u,componentsProps:x={},max:f=5,spacing:C="medium",total:Z,variant:y="circular"}=c,b=(0,r.Z)(c,g);let z=f<2?2:f;const B=(0,n.Z)({},c,{max:f,spacing:C,variant:y}),N=(a=>{const{classes:e}=a;return(0,o.Z)({root:["root"],avatar:["avatar"]},p,e)})(B),M=s.Children.toArray(d).filter((a=>s.isValidElement(a))),w=Z||M.length;w===z&&(z+=1),z=Math.min(w+1,z);const k=Math.min(M.length,z-1),O=Math.max(w-z,w-k,0),I=C&&void 0!==h[C]?h[C]:-C;return(0,v.jsxs)(j,(0,n.Z)({ownerState:B,className:(0,i.Z)(N.root,u),ref:e},b,{children:[O?(0,v.jsxs)(A,(0,n.Z)({ownerState:B,variant:y},x.additionalAvatar,{className:(0,i.Z)(N.avatar,null==(t=x.additionalAvatar)?void 0:t.className),style:(0,n.Z)({marginLeft:I},null==(m=x.additionalAvatar)?void 0:m.style),children:["+",O]})):null,M.slice(0,k).reverse().map(((a,e)=>s.cloneElement(a,{className:(0,i.Z)(a.props.className,N.avatar),style:(0,n.Z)({marginLeft:e===k-1?void 0:I},a.props.style),variant:a.props.variant||y})))]}))}))},66485:function(a){function e(){return new DOMException("The request is not allowed","NotAllowedError")}a.exports=async function(a){try{await async function(a){if(!navigator.clipboard)throw e();return navigator.clipboard.writeText(a)}(a)}catch(t){try{await async function(a){const t=document.createElement("span");t.textContent=a,t.style.whiteSpace="pre",t.style.webkitUserSelect="auto",t.style.userSelect="all",document.body.appendChild(t);const r=window.getSelection(),n=window.document.createRange();r.removeAllRanges(),n.selectNode(t),r.addRange(n);let s=!1;try{s=window.document.execCommand("copy")}finally{r.removeAllRanges(),window.document.body.removeChild(t)}if(!s)throw e()}(a)}catch(r){throw r||t||e()}}}},98207:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M19,8L15,12H18A6,6 0 0,1 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20A8,8 0 0,0 20,12H23M6,12A6,6 0 0,1 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4A8,8 0 0,0 4,12H1L5,16L9,12","Cached");e.Z=n},99770:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z","CodeTags");e.Z=n},90738:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z","ContentCopy");e.Z=n},14529:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3M19 19H5V5H16.17L19 7.83V19M12 12C10.34 12 9 13.34 9 15S10.34 18 12 18 15 16.66 15 15 13.66 12 12 12M6 6H15V10H6V6Z","ContentSaveOutline");e.Z=n},27492:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M20,18H4V8H20M20,6H12L10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6Z","FolderOutline");e.Z=n},53917:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z","LanguageJavascript");e.Z=n},93031:function(a,e,t){"use strict";var r;e.Z=void 0;var n=(0,((r=t(65129))&&r.__esModule?r:{default:r}).default)("M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z","LanguageTypescript");e.Z=n},99385:function(a,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/components/avatars",function(){return t(9875)}])},11534:function(a,e,t){"use strict";t.d(e,{Z:function(){return w}});var r=t(85893),n=t(67294),s=t(87357),i=t(66242),o=t(34386),m=t(67720),l=t(57922),c=t(93946),d=t(78445),u=t(44267),p=t(96420),x=t(98396),v=t(33454),g=t(99770),h=t(90738),j=t(53917),A=t(93031),f=t(15660),C=t.n(f),Z=t(74931),y=t(66485),b=t.n(y),z=function(a){return a&&("TEXTAREA"===a.nodeName||"INPUT"===a.nodeName)},B=function(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=(0,n.useRef)(null),t=function(){a.onSuccess&&a.onSuccess(),a.selectOnCopy&&z(e.current)&&e.current.select()},r=function(){a.onError&&a.onError(),!1!==a.selectOnError&&z(e.current)&&e.current.select()},s=function(a){b()(a).then(t).catch(r)},i=(0,n.useCallback)((function(a){"string"===typeof a?s(a):e.current&&s(e.current.value)}),[]);return{copy:i,target:e}};function N(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function M(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})))),r.forEach((function(e){N(a,e,t[e])}))}return a}var w=function(a){var e=a.id,t=a.sx,f=a.code,y=a.title,b=a.children,z=a.className,N=(0,n.useState)(!1),w=N[0],k=N[1],O=(0,n.useState)(null!==f.tsx?"tsx":"jsx"),I=O[0],H=O[1],S=B(),L=(0,x.Z)((function(a){return a.breakpoints.down("md")}));(0,n.useEffect)((function(){C().highlightAll()}),[w,I]);return(0,r.jsxs)(i.Z,{className:z,sx:M({"& .MuiCardHeader-action":{lineHeight:.8}},t),id:e||"card-snippet--".concat(y.toLowerCase().replace(/ /g,"-")),children:[(0,r.jsx)(d.Z,M({title:y,titleTypographyProps:{variant:"h6"}},L?{}:{action:(0,r.jsx)(c.Z,{onClick:function(){return k(!w)},children:(0,r.jsx)(g.Z,{fontSize:"small"})})})),(0,r.jsx)(u.Z,{children:b}),L?null:(0,r.jsxs)(l.Z,{in:w,children:[(0,r.jsx)(m.Z,{sx:{my:0}}),(0,r.jsxs)(u.Z,{sx:{position:"relative","& pre":{m:"0 !important",maxHeight:500}},children:[(0,r.jsx)(s.Z,{sx:{mb:4,display:"flex",alignItems:"center",justifyContent:"flex-end"},children:(0,r.jsxs)(v.Z,{exclusive:!0,size:"small",color:"primary",value:I,onChange:function(a,e){return null!==e?H(e):null},children:[null!==f.tsx?(0,r.jsx)(p.Z,{value:"tsx",children:(0,r.jsx)(A.Z,{fontSize:"small"})}):null,null!==f.jsx?(0,r.jsx)(p.Z,{value:"jsx",children:(0,r.jsx)(j.Z,{fontSize:"small"})}):null]})}),(0,r.jsx)(o.Z,{title:"Copy the source",placement:"top",children:(0,r.jsx)(c.Z,{onClick:function(){S.copy(null!==f.tsx&&"tsx"===I?f.tsx.props.children.props.children:null!==f.jsx&&"jsx"===I?f.jsx.props.children.props.children:""),Z.ZP.success("The source code has been copied to your clipboard.",{duration:2e3})},sx:{top:"5rem",right:"2.5625rem",position:"absolute",color:function(a){return a.palette.grey[100]}},children:(0,r.jsx)(h.Z,{fontSize:"small"})})}),(0,r.jsx)(s.Z,{children:null!==f[I]?f[I]:null})]})]})]})}},9875:function(a,e,t){"use strict";t.r(e),t.d(e,{default:function(){return _}});var r=t(85893),n=t(86886),s=t(15861),i=t(11534),o=t(87357),m=t(87952),l=t(98207),c=t(27492),d=t(52510),u=t(86836),p=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex"},children:[(0,r.jsx)(m.Z,{children:(0,r.jsx)(c.Z,{})}),(0,r.jsx)(u.Z,{color:"success",children:(0,r.jsx)(l.Z,{})}),(0,r.jsx)(u.Z,{skin:"light",color:"info",children:(0,r.jsx)(d.Z,{})})]})},x=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex"},children:[(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png",alt:"Victor Anderson"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png",alt:"Alice Cobb"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png",alt:"Jeffery Warner"})]})},v=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex",alignItems:"center"},children:[(0,r.jsx)(m.Z,{alt:"Victor Anderson",sx:{width:25,height:25},src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png"}),(0,r.jsx)(m.Z,{alt:"Victor Anderson",src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png"}),(0,r.jsx)(m.Z,{alt:"Victor Anderson",sx:{width:56,height:56},src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png"})]})},g=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex"},children:[(0,r.jsx)(m.Z,{children:"H"}),(0,r.jsx)(u.Z,{children:"N"}),(0,r.jsx)(u.Z,{skin:"light",color:"error",children:"OP"}),(0,r.jsx)(u.Z,{skin:"light-static",color:"error",children:"AB"})]})},h=t(51107),j=function(){return(0,r.jsxs)("div",{className:"demo-space-y",children:[(0,r.jsxs)(h.Z,{max:4,children:[(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png",alt:"Olivia Sparks"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png",alt:"Howard Lloyd"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png",alt:"Hallie Richards"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png",alt:"Alice Cobb"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png",alt:"Jeffery Warner"})]}),(0,r.jsxs)(h.Z,{max:4,sx:{justifyContent:"center"},children:[(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png",alt:"Olivia Sparks"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png",alt:"Howard Lloyd"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png",alt:"Hallie Richards"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png",alt:"Alice Cobb"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png",alt:"Jeffery Warner"})]}),(0,r.jsxs)(h.Z,{max:4,sx:{justifyContent:"flex-start"},children:[(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png",alt:"Olivia Sparks"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png",alt:"Howard Lloyd"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png",alt:"Hallie Richards"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png",alt:"Alice Cobb"}),(0,r.jsx)(m.Z,{src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png",alt:"Jeffery Warner"})]})]})},A=t(37142),f=t(14529),C=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex"},children:[(0,r.jsx)(u.Z,{variant:"square",children:(0,r.jsx)(A.Z,{})}),(0,r.jsx)(u.Z,{color:"success",variant:"rounded",children:(0,r.jsx)(f.Z,{})}),(0,r.jsx)(u.Z,{skin:"light",variant:"square",children:(0,r.jsx)(A.Z,{})}),(0,r.jsx)(u.Z,{skin:"light",color:"success",variant:"rounded",children:(0,r.jsx)(f.Z,{})})]})},Z=t(71236),y=(0,t(11496).ZP)("span")((function(a){var e=a.theme;return{width:8,height:8,borderRadius:"50%",backgroundColor:e.palette.success.main,boxShadow:"0 0 0 2px ".concat(e.palette.background.paper)}})),b=function(){return(0,r.jsxs)(o.Z,{className:"demo-space-x",sx:{display:"flex"},children:[(0,r.jsx)(Z.Z,{overlap:"circular",badgeContent:(0,r.jsx)(y,{}),anchorOrigin:{vertical:"bottom",horizontal:"right"},children:(0,r.jsx)(m.Z,{alt:"Marie Garza",src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png"})}),(0,r.jsx)(Z.Z,{overlap:"circular",anchorOrigin:{vertical:"bottom",horizontal:"right"},badgeContent:(0,r.jsx)(m.Z,{alt:"Marie Garza",src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png",sx:{width:22,height:22,border:function(a){return"2px solid ".concat(a.palette.background.paper)}}}),children:(0,r.jsx)(m.Z,{alt:"Olivia Sparks",src:"/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png"})})]})},z=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Avatar from '@mui/material/Avatar'\nimport AvatarGroup from '@mui/material/AvatarGroup'\n\nconst AvatarsGrouped = () => {\n  return (\n    <div className='demo-space-y'>\n      <AvatarGroup max={4}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n      <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n      <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n    </div>\n  )\n}\n\nexport default AvatarsGrouped\n"})}),B=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport MuiAvatar from '@mui/material/Avatar'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsLetter = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <MuiAvatar>H</MuiAvatar>\n      <CustomAvatar>N</CustomAvatar>\n      <CustomAvatar skin='light' color='error'>\n        OP\n      </CustomAvatar>\n      <CustomAvatar skin='light-static' color='error'>\n        AB\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsLetter\n"})}),N=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\nconst AvatarsImage = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' alt='Victor Anderson' />\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n    </Box>\n  )\n}\n\nexport default AvatarsImage\n"})}),M=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\n// ** Icons Imports\nimport Cached from 'mdi-material-ui/Cached'\nimport FolderOutline from 'mdi-material-ui/FolderOutline'\nimport CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsIcon = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Avatar>\n        <FolderOutline />\n      </Avatar>\n      <CustomAvatar color='success'>\n        <Cached />\n      </CustomAvatar>\n      <CustomAvatar skin='light' color='info'>\n        <CheckboxMarkedCircleOutline />\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsIcon\n"})}),w=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\n\n// ** Icons Imports\nimport BellOutline from 'mdi-material-ui/BellOutline'\nimport ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsVariants = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <CustomAvatar variant='square'>\n        <BellOutline />\n      </CustomAvatar>\n      <CustomAvatar color='success' variant='rounded'>\n        <ContentSaveOutline />\n      </CustomAvatar>\n      <CustomAvatar skin='light' variant='square'>\n        <BellOutline />\n      </CustomAvatar>\n      <CustomAvatar skin='light' color='success' variant='rounded'>\n        <ContentSaveOutline />\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsVariants\n"})}),k=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Badge from '@mui/material/Badge'\nimport Avatar from '@mui/material/Avatar'\nimport { styled } from '@mui/material/styles'\n\n// Styled component for badge content area\nconst BadgeContentSpan = styled('span')(({ theme }) => ({\n  width: 8,\n  height: 8,\n  borderRadius: '50%',\n  backgroundColor: theme.palette.success.main,\n  boxShadow: 0 0 0 2px {theme.palette.background.paper}\n}))\n\nconst AvatarsWithBadge = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Badge\n        overlap='circular'\n        badgeContent={<BadgeContentSpan />}\n        anchorOrigin={{\n          vertical: 'bottom',\n          horizontal: 'right'\n        }}\n      >\n        <Avatar alt='Marie Garza' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png' />\n      </Badge>\n      <Badge\n        overlap='circular'\n        anchorOrigin={{\n          vertical: 'bottom',\n          horizontal: 'right'\n        }}\n        badgeContent={\n          <Avatar\n            alt='Marie Garza'\n            src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png'\n            sx={{ width: 22, height: 22, border: theme => 2px solid {theme.palette.background.paper} }}\n          />\n        }\n      >\n        <Avatar alt='Olivia Sparks' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' />\n      </Badge>\n    </Box>\n  )\n}\n\nexport default AvatarsWithBadge\n"})}),O=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\nconst AvatarsSizes = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex', alignItems: 'center' }}>\n      <Avatar alt='Victor Anderson' sx={{ width: 25, height: 25 }} src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n      <Avatar alt='Victor Anderson' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n      <Avatar alt='Victor Anderson' sx={{ width: 56, height: 56 }} src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n    </Box>\n  )\n}\n\nexport default AvatarsSizes\n"})}),I=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport MuiAvatar from '@mui/material/Avatar'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsLetter = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <MuiAvatar>H</MuiAvatar>\n      <CustomAvatar>N</CustomAvatar>\n      <CustomAvatar skin='light' color='error'>\n        OP\n      </CustomAvatar>\n      <CustomAvatar skin='light-static' color='error'>\n        AB\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsLetter\n"})}),H=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\n// ** Icons Imports\nimport Cached from 'mdi-material-ui/Cached'\nimport FolderOutline from 'mdi-material-ui/FolderOutline'\nimport CheckboxMarkedCircleOutline from 'mdi-material-ui/CheckboxMarkedCircleOutline'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsIcon = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Avatar>\n        <FolderOutline />\n      </Avatar>\n      <CustomAvatar color='success'>\n        <Cached />\n      </CustomAvatar>\n      <CustomAvatar skin='light' color='info'>\n        <CheckboxMarkedCircleOutline />\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsIcon\n"})}),S=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\n\n// ** Icons Imports\nimport BellOutline from 'mdi-material-ui/BellOutline'\nimport ContentSaveOutline from 'mdi-material-ui/ContentSaveOutline'\n\n// ** Custom Components Imports\nimport CustomAvatar from 'src/@core/components/mui/avatar'\n\nconst AvatarsVariants = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <CustomAvatar variant='square'>\n        <BellOutline />\n      </CustomAvatar>\n      <CustomAvatar color='success' variant='rounded'>\n        <ContentSaveOutline />\n      </CustomAvatar>\n      <CustomAvatar skin='light' variant='square'>\n        <BellOutline />\n      </CustomAvatar>\n      <CustomAvatar skin='light' color='success' variant='rounded'>\n        <ContentSaveOutline />\n      </CustomAvatar>\n    </Box>\n  )\n}\n\nexport default AvatarsVariants\n"})}),L=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Avatar from '@mui/material/Avatar'\nimport AvatarGroup from '@mui/material/AvatarGroup'\n\nconst AvatarsGrouped = () => {\n  return (\n    <div className='demo-space-y'>\n      <AvatarGroup max={4}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n      <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n      <AvatarGroup max={4} sx={{ justifyContent: 'flex-start' }}>\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' alt='Olivia Sparks' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/5.png' alt='Howard Lloyd' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/6.png' alt='Hallie Richards' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n        <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n      </AvatarGroup>\n    </div>\n  )\n}\n\nexport default AvatarsGrouped\n"})}),V=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\nconst AvatarsImage = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/1.png' alt='Victor Anderson' />\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/8.png' alt='Alice Cobb' />\n      <Avatar src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/7.png' alt='Jeffery Warner' />\n    </Box>\n  )\n}\n\nexport default AvatarsImage\n"})}),G=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Avatar from '@mui/material/Avatar'\n\nconst AvatarsSizes = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex', alignItems: 'center' }}>\n      <Avatar alt='Victor Anderson' sx={{ width: 25, height: 25 }} src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n      <Avatar alt='Victor Anderson' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n      <Avatar alt='Victor Anderson' sx={{ width: 56, height: 56 }} src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/3.png' />\n    </Box>\n  )\n}\n\nexport default AvatarsSizes\n"})}),P=(0,r.jsx)("pre",{className:"language-jsx",children:(0,r.jsx)("code",{className:"language-jsx",children:"// ** MUI Imports\nimport Box from '@mui/material/Box'\nimport Badge from '@mui/material/Badge'\nimport Avatar from '@mui/material/Avatar'\nimport { styled } from '@mui/material/styles'\n\n// Styled component for badge content area\nconst BadgeContentSpan = styled('span')(({ theme }) => ({\n  width: 8,\n  height: 8,\n  borderRadius: '50%',\n  backgroundColor: theme.palette.success.main,\n  boxShadow: 0 0 0 2px {theme.palette.background.paper}\n}))\n\nconst AvatarsWithBadge = () => {\n  return (\n    <Box className='demo-space-x' sx={{ display: 'flex' }}>\n      <Badge\n        overlap='circular'\n        badgeContent={<BadgeContentSpan />}\n        anchorOrigin={{\n          vertical: 'bottom',\n          horizontal: 'right'\n        }}\n      >\n        <Avatar alt='Marie Garza' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png' />\n      </Badge>\n      <Badge\n        overlap='circular'\n        anchorOrigin={{\n          vertical: 'bottom',\n          horizontal: 'right'\n        }}\n        badgeContent={\n          <Avatar\n            alt='Marie Garza'\n            src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/2.png'\n            sx={{ width: 22, height: 22, border: theme => 2px solid {theme.palette.background.paper} }}\n          />\n        }\n      >\n        <Avatar alt='Olivia Sparks' src='/demo/materialize-mui-react-nextjs-admin-template/demo-1/images/avatars/4.png' />\n      </Badge>\n    </Box>\n  )\n}\n\nexport default AvatarsWithBadge\n"})}),_=function(){return(0,r.jsxs)(n.ZP,{container:!0,spacing:6,className:"match-height",children:[(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Image Avatars",code:{tsx:V,jsx:N},children:[(0,r.jsxs)(s.Z,{children:["Use ",(0,r.jsx)("code",{children:"src"})," and ",(0,r.jsx)("code",{children:"alt"})," props with ",(0,r.jsx)("code",{children:"Avatar"})," component for basic image avatar."]}),(0,r.jsx)(x,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Letter Avatars",code:{tsx:I,jsx:B},children:[(0,r.jsxs)(s.Z,{children:["Write some letters inside ",(0,r.jsx)("code",{children:"Avatar"})," component to have letter avatar. Use our custom component for colored avatar and use ",(0,r.jsx)("code",{children:"skin='light'"})," prop for light variant with opacity and"," ",(0,r.jsx)("code",{children:"skin='light-static'"})," prop for light variant without opacity."]}),(0,r.jsx)(g,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Sizes",code:{tsx:G,jsx:O},children:[(0,r.jsxs)(s.Z,{children:["You can set any size of an avatar using ",(0,r.jsx)("code",{children:"styled"})," hook."]}),(0,r.jsx)(v,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Icon Avatars",code:{tsx:H,jsx:M},children:[(0,r.jsxs)(s.Z,{children:["Pass an icon as a child of ",(0,r.jsx)("code",{children:"Avatar"})," component to make an icon avatar."]}),(0,r.jsx)(p,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Variants",code:{tsx:S,jsx:w},children:[(0,r.jsxs)(s.Z,{children:["Use ",(0,r.jsxs)("code",{children:["variant=","{'square' | 'rounded'}"]})," prop with ",(0,r.jsx)("code",{children:"Avatar"})," component for different variants."]}),(0,r.jsx)(C,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,sm:6,children:(0,r.jsxs)(i.Z,{title:"Avatars With Badge",code:{tsx:P,jsx:k},children:[(0,r.jsxs)(s.Z,{children:["Use ",(0,r.jsx)("code",{children:"Avatar"})," component as a child of ",(0,r.jsx)("code",{children:"Badge"})," component."]}),(0,r.jsx)(b,{})]})}),(0,r.jsx)(n.ZP,{item:!0,xs:12,children:(0,r.jsxs)(i.Z,{title:"Grouped Avatars",code:{tsx:L,jsx:z},children:[(0,r.jsxs)(s.Z,{sx:{mb:4},children:["Wrap all your avatars with ",(0,r.jsx)("code",{children:"AvatarGroup"})," component to have grouped avatars. Use ",(0,r.jsx)("code",{children:"max"})," ","prop with ",(0,r.jsx)("code",{children:"AvatarGroup"})," component to restrict maximum number of avatars shown."]}),(0,r.jsx)(j,{})]})})]})}}},function(a){a.O(0,[4386,5878,9774,2888,179],(function(){return e=99385,a(a.s=e);var e}));var e=a.O();_N_E=e}]);