(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7882],{66485:function(e){function t(){return new DOMException("The request is not allowed","NotAllowedError")}e.exports=async function(e){try{await async function(e){if(!navigator.clipboard)throw t();return navigator.clipboard.writeText(e)}(e)}catch(r){try{await async function(e){const r=document.createElement("span");r.textContent=e,r.style.whiteSpace="pre",r.style.webkitUserSelect="auto",r.style.userSelect="all",document.body.appendChild(r);const o=window.getSelection(),n=window.document.createRange();o.removeAllRanges(),n.selectNode(r),o.addRange(n);let a=!1;try{a=window.document.execCommand("copy")}finally{o.removeAllRanges(),window.document.body.removeChild(r)}if(!a)throw t()}(e)}catch(o){throw o||r||t()}}}},99770:function(e,t,r){"use strict";var o;t.Z=void 0;var n=(0,((o=r(65129))&&o.__esModule?o:{default:o}).default)("M14.6,16.6L19.2,12L14.6,7.4L16,6L22,12L16,18L14.6,16.6M9.4,16.6L4.8,12L9.4,7.4L8,6L2,12L8,18L9.4,16.6Z","CodeTags");t.Z=n},90738:function(e,t,r){"use strict";var o;t.Z=void 0;var n=(0,((o=r(65129))&&o.__esModule?o:{default:o}).default)("M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z","ContentCopy");t.Z=n},53917:function(e,t,r){"use strict";var o;t.Z=void 0;var n=(0,((o=r(65129))&&o.__esModule?o:{default:o}).default)("M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.08 10.2,18.08C9.62,18.08 9.38,17.68 9.11,17.21L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z","LanguageJavascript");t.Z=n},93031:function(e,t,r){"use strict";var o;t.Z=void 0;var n=(0,((o=r(65129))&&o.__esModule?o:{default:o}).default)("M3,3H21V21H3V3M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86M13,11.25H8V12.75H9.5V20H11.25V12.75H13V11.25Z","LanguageTypescript");t.Z=n},23207:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forms/form-elements/editor",function(){return r(14317)}])},11534:function(e,t,r){"use strict";r.d(t,{Z:function(){return P}});var o=r(85893),n=r(67294),a=r(87357),i=r(66242),d=r(34386),l=r(67720),c=r(57922),s=r(93946),u=r(78445),p=r(44267),m=r(96420),f=r(98396),w=r(33454),h=r(99770),g=r(90738),x=r(53917),b=r(93031),y=r(15660),C=r.n(y),v=r(74931),j=r(66485),Z=r.n(j),S=function(e){return e&&("TEXTAREA"===e.nodeName||"INPUT"===e.nodeName)},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,n.useRef)(null),r=function(){e.onSuccess&&e.onSuccess(),e.selectOnCopy&&S(t.current)&&t.current.select()},o=function(){e.onError&&e.onError(),!1!==e.selectOnError&&S(t.current)&&t.current.select()},a=function(e){Z()(e).then(r).catch(o)},i=(0,n.useCallback)((function(e){"string"===typeof e?a(e):t.current&&a(t.current.value)}),[]);return{copy:i,target:t}};function E(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function L(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),o.forEach((function(t){E(e,t,r[t])}))}return e}var P=function(e){var t=e.id,r=e.sx,y=e.code,j=e.title,Z=e.children,S=e.className,E=(0,n.useState)(!1),P=E[0],H=E[1],N=(0,n.useState)(null!==y.tsx?"tsx":"jsx"),O=N[0],R=N[1],_=k(),V=(0,f.Z)((function(e){return e.breakpoints.down("md")}));(0,n.useEffect)((function(){C().highlightAll()}),[P,O]);return(0,o.jsxs)(i.Z,{className:S,sx:L({"& .MuiCardHeader-action":{lineHeight:.8}},r),id:t||"card-snippet--".concat(j.toLowerCase().replace(/ /g,"-")),children:[(0,o.jsx)(u.Z,L({title:j,titleTypographyProps:{variant:"h6"}},V?{}:{action:(0,o.jsx)(s.Z,{onClick:function(){return H(!P)},children:(0,o.jsx)(h.Z,{fontSize:"small"})})})),(0,o.jsx)(p.Z,{children:Z}),V?null:(0,o.jsxs)(c.Z,{in:P,children:[(0,o.jsx)(l.Z,{sx:{my:0}}),(0,o.jsxs)(p.Z,{sx:{position:"relative","& pre":{m:"0 !important",maxHeight:500}},children:[(0,o.jsx)(a.Z,{sx:{mb:4,display:"flex",alignItems:"center",justifyContent:"flex-end"},children:(0,o.jsxs)(w.Z,{exclusive:!0,size:"small",color:"primary",value:O,onChange:function(e,t){return null!==t?R(t):null},children:[null!==y.tsx?(0,o.jsx)(m.Z,{value:"tsx",children:(0,o.jsx)(b.Z,{fontSize:"small"})}):null,null!==y.jsx?(0,o.jsx)(m.Z,{value:"jsx",children:(0,o.jsx)(x.Z,{fontSize:"small"})}):null]})}),(0,o.jsx)(d.Z,{title:"Copy the source",placement:"top",children:(0,o.jsx)(s.Z,{onClick:function(){_.copy(null!==y.tsx&&"tsx"===O?y.tsx.props.children.props.children:null!==y.jsx&&"jsx"===O?y.jsx.props.children.props.children:""),v.ZP.success("The source code has been copied to your clipboard.",{duration:2e3})},sx:{top:"5rem",right:"2.5625rem",position:"absolute",color:function(e){return e.palette.grey[100]}},children:(0,o.jsx)(g.Z,{fontSize:"small"})})}),(0,o.jsx)(a.Z,{children:null!==y[O]?y[O]:null})]})]})]})}},72794:function(e,t,r){"use strict";var o=r(85893),n=r(86886);t.Z=function(e){var t=e.title,r=e.subtitle;return(0,o.jsxs)(n.ZP,{item:!0,xs:12,children:[t,r||null]})}},10934:function(e,t,r){"use strict";var o=r(5152),n=r.n(o)()((function(){return r.e(6925).then(r.t.bind(r,35108,23)).then((function(e){return e.Editor}))}),{loadableGenerated:{webpack:function(){return[35108]}},ssr:!1});t.Z=n},7845:function(e,t,r){"use strict";r.d(t,{cP:function(){return i}});var o=r(11496);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},o=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),o.forEach((function(t){n(e,t,r[t])}))}return e}var i=(0,o.ZP)("div")((function(e){var t=e.theme;return{"& .rdw-editor-wrapper":{border:"1px solid ".concat(t.palette.divider),"& .rdw-editor-toolbar":{border:0,marginBottom:0,background:t.palette.background.paper,borderBottom:"1px solid ".concat(t.palette.divider),"& .rdw-fontsize-dropdown":{minWidth:50},"& .rdw-link-modal":{height:"auto"},"& .rdw-colorpicker-modal, & .rdw-link-modal, & .rdw-embedded-modal, & .rdw-emoji-modal, & .rdw-image-modal":{boxShadow:t.shadows[8],borderColor:t.palette.divider,backgroundColor:t.palette.background.paper},"& .rdw-dropdown-optionwrapper":{boxShadow:t.shadows[8],borderColor:t.palette.divider,backgroundColor:t.palette.background.paper,"& .rdw-dropdownoption-highlighted":{backgroundColor:t.palette.action.hover},"& .rdw-dropdownoption-active":{backgroundColor:t.palette.action.selected}},"& .rdw-option-wrapper, & .rdw-dropdown-wrapper":a({borderColor:t.palette.divider,background:t.palette.background.paper,"& .rdw-dropdown-carettoopen":{left:"auto",right:"10%",borderTopColor:t.palette.text.disabled},"& .rdw-dropdown-carettoclose":{left:"auto",right:"10%",borderBottomColor:t.palette.text.disabled}},"dark"===t.palette.mode?{"& img":{filter:"invert(1)"}}:{}),"& .rdw-embedded-modal-size-input, & .rdw-image-modal-size-input":{width:"60%",minHeight:30},"& .rdw-link-modal-input, & .rdw-embedded-modal-link-input, & .rdw-image-modal-url-input":{minHeight:38},"& .rdw-link-modal-input, & .rdw-embedded-modal-link-input, & .rdw-image-modal-url-input, & .rdw-embedded-modal-size-input, & .rdw-image-modal-size-input":{fontSize:"1rem",background:"none",padding:t.spacing(0,3.5),color:t.palette.text.primary,borderColor:t.palette.divider,borderRadius:t.shape.borderRadius,"&:focus":{borderColor:t.palette.primary.main},"&::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder":{color:t.palette.text.disabled}},"& .rdw-link-modal-btn, & .rdw-embedded-modal-btn, & .rdw-image-modal-btn":{border:0,lineHeight:1.71,borderRadius:"5px",letterSpacing:"0.3px",textTransform:"uppercase",fontWeight:t.typography.fontWeightMedium,"&:first-of-type:not([disabled])":{boxShadow:t.shadows[3],color:t.palette.primary.contrastText,backgroundColor:t.palette.primary.main,"&:hover":{boxShadow:t.shadows[4],backgroundColor:t.palette.primary.dark},"&:active":{boxShadow:t.shadows[3]}},"&:last-child":{boxShadow:t.shadows[3],color:t.palette.secondary.contrastText,backgroundColor:t.palette.secondary.main,"&:hover":{boxShadow:t.shadows[4],backgroundColor:t.palette.secondary.dark},"&:active":{boxShadow:t.shadows[3]}},"&[disabled]":{cursor:"default",boxShadow:"none",color:t.palette.text.disabled,backgroundColor:t.palette.action.disabledBackground}}},"& .rdw-editor-main":a({cursor:"text",padding:"0 1rem",minHeight:"10rem",color:t.palette.text.primary},"rtl"===t.direction?{"& .public-DraftStyleDefault-block":{direction:"ltr !important",textAlign:"left !important"}}:{})}}}));(0,o.ZP)("div")((function(){return{"& .rdw-editor-wrapper":{display:"flex",flexDirection:"column-reverse"}}})),(0,o.ZP)("div")((function(){return{"& .rdw-editor-wrapper, & .rdw-editor-toolbar":{border:"0 !important"}}}))},14317:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return b}});var o=r(85893),n=r(86886),a=r(50122),i=r(15861),d=r(72794),l=r(11534),c=r(7845),s=r(67294),u=r(9041),p=r(10934),m=function(){var e=(0,s.useState)(u.EditorState.createEmpty()),t=e[0],r=e[1];return(0,o.jsx)(p.Z,{editorState:t,onEditorStateChange:function(e){return r(e)}})},f=function(){return(0,o.jsx)(p.Z,{})},w=(0,o.jsx)("pre",{className:"language-jsx",children:(0,o.jsx)("code",{className:"language-jsx",children:"// ** React Imports\nimport { useState } from 'react'\n\n// ** Third Party Imports\nimport { EditorState } from 'draft-js'\n\n// ** Component Import\nimport ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'\n\nconst EditorControlled = () => {\n  // ** State\n  const [value, setValue] = useState(EditorState.createEmpty())\n\n  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />\n}\n\nexport default EditorControlled\n"})}),h=(0,o.jsx)("pre",{className:"language-jsx",children:(0,o.jsx)("code",{className:"language-jsx",children:"// ** Component Import\nimport ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'\n\nconst EditorUncontrolled = () => <ReactDraftWysiwyg />\n\nexport default EditorUncontrolled\n"})}),g=(0,o.jsx)("pre",{className:"language-jsx",children:(0,o.jsx)("code",{className:"language-jsx",children:"// ** React Imports\nimport { useState } from 'react'\n\n// ** Third Party Imports\nimport { EditorState } from 'draft-js'\n\n// ** Component Import\nimport ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'\n\nconst EditorControlled = () => {\n  // ** State\n  const [value, setValue] = useState(EditorState.createEmpty())\n\n  return <ReactDraftWysiwyg editorState={value} onEditorStateChange={data => setValue(data)} />\n}\n\nexport default EditorControlled\n"})}),x=(0,o.jsx)("pre",{className:"language-jsx",children:(0,o.jsx)("code",{className:"language-jsx",children:"// ** Component Import\nimport ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'\n\nconst EditorUncontrolled = () => <ReactDraftWysiwyg />\n\nexport default EditorUncontrolled\n"})}),b=(r(49552),function(){return(0,o.jsx)(c.cP,{children:(0,o.jsxs)(n.ZP,{container:!0,spacing:6,className:"match-height",children:[(0,o.jsx)(d.Z,{title:(0,o.jsx)(i.Z,{variant:"h5",children:(0,o.jsx)(a.Z,{href:"https://jpuri.github.io/react-draft-wysiwyg/#/",target:"_blank",children:"React Draft Wysiwyg"})}),subtitle:(0,o.jsx)(i.Z,{variant:"body2",children:"A Wysiwyg Built on ReactJS and DraftJS"})}),(0,o.jsx)(n.ZP,{item:!0,xs:12,children:(0,o.jsx)(l.Z,{sx:{overflow:"visible"},title:"Controlled Wysiwyg Editor",code:{tsx:g,jsx:w},children:(0,o.jsx)(m,{})})}),(0,o.jsx)(n.ZP,{item:!0,xs:12,children:(0,o.jsx)(l.Z,{sx:{overflow:"visible"},title:"Uncontrolled Wysiwyg Editor",code:{tsx:x,jsx:h},children:(0,o.jsx)(f,{})})})]})})})}},function(e){e.O(0,[4386,5878,5152,7168,9774,2888,179],(function(){return t=23207,e(e.s=t);var t}));var t=e.O();_N_E=t}]);