(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[797],{4889:function(e,t,r){Promise.resolve().then(r.bind(r,9629)),Promise.resolve().then(r.bind(r,4347)),Promise.resolve().then(r.t.bind(r,894,23)),Promise.resolve().then(r.t.bind(r,4236,23)),Promise.resolve().then(r.t.bind(r,8173,23)),Promise.resolve().then(r.t.bind(r,231,23)),Promise.resolve().then(r.bind(r,6e3)),Promise.resolve().then(r.bind(r,408))},9629:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return f}});var n=r(7437),o=r(473),a=r(2265),i=e=>{let{shortname:t,slug:r}=e,{theme:i}=(0,o.F)(),s=(0,a.useCallback)(()=>{window.disqus_config=function(){this.page.url=window.location.href,this.page.identifier=r};let e=document.createElement("script");e.src="https://"+t+".disqus.com/embed.js",e.setAttribute("data-timestamp",Date.now().toString()),e.async=!0,document.body.appendChild(e)},[t,r,i]);return(0,a.useEffect)(()=>{s()},[s]),(0,n.jsx)("div",{className:"disqus-frame",id:"disqus_thread"})};function s({id:e,host:t,repo:o,repoId:i,category:s,categoryId:c,mapping:l,term:u,strict:d,reactionsEnabled:m,emitMetadata:h,inputPosition:f,theme:g,lang:p,loading:v}){let[y,b]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{y||(r.e(894).then(r.bind(r,3894)),b(!0))},[]),y?(0,n.jsx)("giscus-widget",{id:e,host:t,repo:o,repoid:i,category:s,categoryid:c,mapping:l,term:u,strict:d,reactionsenabled:m,emitmetadata:h,inputposition:f,theme:g,lang:p,loading:v}):null}var c=e=>{let{themeURL:t,theme:r,darkTheme:a,repo:i,repositoryId:c,category:l,categoryId:u,reactions:d,metadata:m,inputPosition:h,lang:f,mapping:g}=e,{theme:p,resolvedTheme:v}=(0,o.F)();return(0,n.jsx)(s,{id:"comments-container",repo:i,repoId:c,category:l,categoryId:u,mapping:g,reactionsEnabled:d,emitMetadata:m,inputPosition:h,theme:""===t?"dark"===p||"dark"===v?a:r:t,lang:f,loading:"lazy"})},l=e=>{let{theme:t,darkTheme:r,repo:i,label:s,issueTerm:c}=e,{theme:l,resolvedTheme:u}=(0,o.F)(),d="dark"===l||"dark"===u?r:t,m="comments-container",h=(0,a.useCallback)(()=>{let e=document.createElement("script");e.src="https://utteranc.es/client.js",e.setAttribute("repo",i),e.setAttribute("issue-term",c),e.setAttribute("label",s),e.setAttribute("theme",d),e.setAttribute("crossorigin","anonymous"),e.async=!0;let t=document.getElementById(m);return t&&t.appendChild(e),()=>{let e=document.getElementById(m);e&&(e.innerHTML="")}},[d,c,s,i]);return(0,a.useEffect)(()=>{h()},[h]),(0,n.jsx)("div",{className:"utterances-frame relative",id:m})},u=r(6338),d=({commentsConfig:e,slug:t})=>{switch(e.provider){case"giscus":return(0,n.jsx)(c,(0,u.ih)({},e.giscusConfig));case"utterances":return(0,n.jsx)(l,(0,u.ih)({},e.utterancesConfig));case"disqus":return(0,n.jsx)(i,(0,u.ih)({slug:t},e.disqusConfig))}},m=r(4450),h=r.n(m);function f(e){var t;let{slug:r}=e,[o,i]=(0,a.useState)(!1);return(null===(t=h().comments)||void 0===t?void 0:t.provider)?(0,n.jsx)(n.Fragment,{children:o?(0,n.jsx)(d,{commentsConfig:h().comments,slug:r}):(0,n.jsx)("button",{onClick:()=>i(!0),children:"Load Comments"})}):null}},4347:function(e,t,r){"use strict";r.r(t);var n=r(7437),o=r(4450),a=r.n(o),i=r(2265);t.default=()=>{var e;let[t,r]=(0,i.useState)(!1);return(0,i.useEffect)(()=>{let e=()=>{window.scrollY>50?r(!0):r(!1)};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),(0,n.jsxs)("div",{className:"fixed bottom-8 right-8 hidden flex-col gap-3 ".concat(t?"md:flex":"md:hidden"),children:[(null===(e=a().comments)||void 0===e?void 0:e.provider)&&(0,n.jsx)("button",{"aria-label":"Scroll To Comment",onClick:()=>{var e;null===(e=document.getElementById("comment"))||void 0===e||e.scrollIntoView()},className:"rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600",children:(0,n.jsx)("svg",{className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z",clipRule:"evenodd"})})}),(0,n.jsx)("button",{"aria-label":"Scroll To Top",onClick:()=>{window.scrollTo({top:0})},className:"rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600",children:(0,n.jsx)("svg",{className:"h-5 w-5",viewBox:"0 0 20 20",fill:"currentColor",children:(0,n.jsx)("path",{fillRule:"evenodd",d:"M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z",clipRule:"evenodd"})})})]})}},4450:function(e,t,r){"use strict";let n={title:"디디의 개발일지",author:"CDD",headerTitle:"9성급 프론트 개발자가 되기 위해 오늘도 달린다",description:"개발, 회고",language:"ko-kr",theme:"system",siteUrl:"https://example.com",siteRepo:"https://github.com/devcdd/devlog",siteLogo:"/static/images/logo.png",image:"/static/images/avatar.png",youtube:"https://youtube.com/@cdd_world",instagram:"https://www.instagram.com/cdd_world",github:"https://github.com/devcdd",locale:"ko-kr",analytics:{umamiAnalytics:{umamiWebsiteId:r(357).env.NEXT_UMAMI_ID}},newsletter:{provider:"buttondown"},comments:{provider:"giscus",giscusConfig:{repo:"devcdd/devcdd.github.io",repositoryId:"R_kgDOMQ309g",category:"General",categoryId:"DIC_kwDOMQ309s4Cgh__",mapping:"pathname",reactions:"1",metadata:"0",theme:"light",darkTheme:"transparent_dark",themeURL:"",lang:"en"}},search:{provider:"kbar",kbarConfig:{searchDocumentsPath:"search.json"}}};e.exports=n},473:function(e,t,r){"use strict";r.d(t,{F:function(){return l},f:function(){return u}});var n=r(2265),o=["light","dark"],a="(prefers-color-scheme: dark)",i="undefined"==typeof window,s=n.createContext(void 0),c={setTheme:e=>{},themes:[]},l=()=>{var e;return null!=(e=n.useContext(s))?e:c},u=e=>n.useContext(s)?e.children:n.createElement(m,{...e}),d=["light","dark"],m=e=>{let{forcedTheme:t,disableTransitionOnChange:r=!1,enableSystem:i=!0,enableColorScheme:c=!0,storageKey:l="theme",themes:u=d,defaultTheme:m=i?"system":"light",attribute:v="data-theme",value:y,children:b,nonce:x}=e,[w,k]=n.useState(()=>f(l,m)),[j,C]=n.useState(()=>f(l)),T=y?Object.values(y):u,E=n.useCallback(e=>{let t=e;if(!t)return;"system"===e&&i&&(t=p());let n=y?y[t]:t,a=r?g():null,s=document.documentElement;if("class"===v?(s.classList.remove(...T),n&&s.classList.add(n)):n?s.setAttribute(v,n):s.removeAttribute(v),c){let e=o.includes(m)?m:null,r=o.includes(t)?t:e;s.style.colorScheme=r}null==a||a()},[]),S=n.useCallback(e=>{let t="function"==typeof e?e(e):e;k(t);try{localStorage.setItem(l,t)}catch(e){}},[t]),L=n.useCallback(e=>{C(p(e)),"system"===w&&i&&!t&&E("system")},[w,t]);n.useEffect(()=>{let e=window.matchMedia(a);return e.addListener(L),L(e),()=>e.removeListener(L)},[L]),n.useEffect(()=>{let e=e=>{e.key===l&&S(e.newValue||m)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[S]),n.useEffect(()=>{E(null!=t?t:w)},[t,w]);let N=n.useMemo(()=>({theme:w,setTheme:S,forcedTheme:t,resolvedTheme:"system"===w?j:w,themes:i?[...u,"system"]:u,systemTheme:i?j:void 0}),[w,S,t,j,i,u]);return n.createElement(s.Provider,{value:N},n.createElement(h,{forcedTheme:t,disableTransitionOnChange:r,enableSystem:i,enableColorScheme:c,storageKey:l,themes:u,defaultTheme:m,attribute:v,value:y,children:b,attrs:T,nonce:x}),b)},h=n.memo(e=>{let{forcedTheme:t,storageKey:r,attribute:i,enableSystem:s,enableColorScheme:c,defaultTheme:l,value:u,attrs:d,nonce:m}=e,h="system"===l,f="class"===i?"var d=document.documentElement,c=d.classList;".concat("c.remove(".concat(d.map(e=>"'".concat(e,"'")).join(","),")"),";"):"var d=document.documentElement,n='".concat(i,"',s='setAttribute';"),g=c?(o.includes(l)?l:null)?"if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'".concat(l,"'"):"if(e==='light'||e==='dark')d.style.colorScheme=e":"",p=function(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=!(arguments.length>2)||void 0===arguments[2]||arguments[2],n=u?u[e]:e,a=t?e+"|| ''":"'".concat(n,"'"),s="";return c&&r&&!t&&o.includes(e)&&(s+="d.style.colorScheme = '".concat(e,"';")),"class"===i?t||n?s+="c.add(".concat(a,")"):s+="null":n&&(s+="d[s](n,".concat(a,")")),s},v=t?"!function(){".concat(f).concat(p(t),"}()"):s?"!function(){try{".concat(f,"var e=localStorage.getItem('").concat(r,"');if('system'===e||(!e&&").concat(h,")){var t='").concat(a,"',m=window.matchMedia(t);if(m.media!==t||m.matches){").concat(p("dark"),"}else{").concat(p("light"),"}}else if(e){").concat(u?"var x=".concat(JSON.stringify(u),";"):"").concat(p(u?"x[e]":"e",!0),"}").concat(h?"":"else{"+p(l,!1,!1)+"}").concat(g,"}catch(e){}}()"):"!function(){try{".concat(f,"var e=localStorage.getItem('").concat(r,"');if(e){").concat(u?"var x=".concat(JSON.stringify(u),";"):"").concat(p(u?"x[e]":"e",!0),"}else{").concat(p(l,!1,!1),";}").concat(g,"}catch(t){}}();");return n.createElement("script",{nonce:m,dangerouslySetInnerHTML:{__html:v}})}),f=(e,t)=>{let r;if(!i){try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t}},g=()=>{let e=document.createElement("style");return e.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(e),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(e)},1)}},p=e=>(e||(e=window.matchMedia(a)),e.matches?"dark":"light")},357:function(e,t,r){"use strict";var n,o;e.exports=(null==(n=r.g.process)?void 0:n.env)&&"object"==typeof(null==(o=r.g.process)?void 0:o.env)?r.g.process:r(8081)},8081:function(e){!function(){var t={229:function(e){var t,r,n,o=e.exports={};function a(){throw Error("setTimeout has not been defined")}function i(){throw Error("clearTimeout has not been defined")}function s(e){if(t===setTimeout)return setTimeout(e,0);if((t===a||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(r){try{return t.call(null,e,0)}catch(r){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:a}catch(e){t=a}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var c=[],l=!1,u=-1;function d(){l&&n&&(l=!1,n.length?c=n.concat(c):u=-1,c.length&&m())}function m(){if(!l){var e=s(d);l=!0;for(var t=c.length;t;){for(n=c,c=[];++u<t;)n&&n[u].run();u=-1,t=c.length}n=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function f(){}o.nextTick=function(e){var t=Array(arguments.length-1);if(arguments.length>1)for(var r=1;r<arguments.length;r++)t[r-1]=arguments[r];c.push(new h(e,t)),1!==c.length||l||s(m)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=f,o.addListener=f,o.once=f,o.off=f,o.removeListener=f,o.removeAllListeners=f,o.emit=f,o.prependListener=f,o.prependOnceListener=f,o.listeners=function(e){return[]},o.binding=function(e){throw Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw Error("process.chdir is not supported")},o.umask=function(){return 0}}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={exports:{}},i=!0;try{t[e](a,a.exports,n),i=!1}finally{i&&delete r[e]}return a.exports}n.ab="//";var o=n(229);e.exports=o}()},6338:function(e,t,r){"use strict";r.d(t,{Cr:function(){return h},EZ:function(){return d},S0:function(){return m},ih:function(){return u}});var n=Object.defineProperty,o=Object.defineProperties,a=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,c=Object.prototype.propertyIsEnumerable,l=(e,t,r)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,u=(e,t)=>{for(var r in t||(t={}))s.call(t,r)&&l(e,r,t[r]);if(i)for(var r of i(t))c.call(t,r)&&l(e,r,t[r]);return e},d=(e,t)=>o(e,a(t)),m=(e,t)=>{var r={};for(var n in e)s.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&i)for(var n of i(e))0>t.indexOf(n)&&c.call(e,n)&&(r[n]=e[n]);return r},h=(e,t,r)=>new Promise((n,o)=>{var a=e=>{try{s(r.next(e))}catch(e){o(e)}},i=e=>{try{s(r.throw(e))}catch(e){o(e)}},s=e=>e.done?n(e.value):Promise.resolve(e.value).then(a,i);s((r=r.apply(e,t)).next())})},6e3:function(e,t,r){"use strict";r.d(t,{default:function(){return s}});var n=r(2265),o=r(7437),a=(e,t,r)=>new Promise((n,o)=>{var a=e=>{try{s(r.next(e))}catch(e){o(e)}},i=e=>{try{s(r.throw(e))}catch(e){o(e)}},s=e=>e.done?n(e.value):Promise.resolve(e.value).then(a,i);s((r=r.apply(e,t)).next())}),i=e=>{let{title:t="Subscribe to the newsletter",apiUrl:r="/api/newsletter"}=e,i=(0,n.useRef)(null),[s,c]=(0,n.useState)(!1),[l,u]=(0,n.useState)(""),[d,m]=(0,n.useState)(!1);return(0,o.jsxs)("div",{children:[(0,o.jsx)("div",{className:"pb-1 text-lg font-semibold text-gray-800 dark:text-gray-100",children:t}),(0,o.jsxs)("form",{className:"flex flex-col sm:flex-row",onSubmit:e=>a(void 0,null,function*(){e.preventDefault();let t=yield fetch(r,{body:JSON.stringify({email:i.current.value}),headers:{"Content-Type":"application/json"},method:"POST"}),{error:n}=yield t.json();if(n){c(!0),u("Your e-mail address is invalid or you are already subscribed!");return}i.current.value="",c(!1),m(!0)}),children:[(0,o.jsx)("div",{children:(0,o.jsxs)("label",{htmlFor:"email-input",children:[(0,o.jsx)("span",{className:"sr-only",children:"Email address"}),(0,o.jsx)("input",{autoComplete:"email",className:"focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black",id:"email-input",name:"email",placeholder:d?"You're subscribed !  \uD83C\uDF89":"Enter your email",ref:i,required:!0,type:"email",disabled:d})]})}),(0,o.jsx)("div",{className:"mt-2 flex w-full rounded-md shadow-sm sm:mt-0 sm:ml-3",children:(0,o.jsx)("button",{className:"bg-primary-500 w-full rounded-md py-2 px-4 font-medium text-white sm:py-0 ".concat(d?"cursor-default":"hover:bg-primary-700 dark:hover:bg-primary-400"," focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"),type:"submit",disabled:d,children:d?"Thank you!":"Sign up"})})]}),s&&(0,o.jsx)("div",{className:"w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96",children:l})]})},s=e=>{let{title:t,apiUrl:r}=e;return(0,o.jsx)("div",{className:"flex items-center justify-center",children:(0,o.jsx)("div",{className:"bg-gray-100 p-6 dark:bg-gray-800 sm:px-14 sm:py-8",children:(0,o.jsx)(i,{title:t,apiUrl:r})})})}},408:function(e,t,r){"use strict";r.d(t,{default:function(){return a}});var n=r(2265),o=r(7437),a=e=>{let{children:t}=e,r=(0,n.useRef)(null),[a,i]=(0,n.useState)(!1),[s,c]=(0,n.useState)(!1);return(0,o.jsxs)("div",{ref:r,onMouseEnter:()=>{i(!0)},onMouseLeave:()=>{i(!1),c(!1)},className:"relative",children:[a&&(0,o.jsx)("button",{"aria-label":"Copy code",className:"absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800 ".concat(s?"border-green-400 focus:border-green-400 focus:outline-none":"border-gray-300"),onClick:()=>{c(!0),navigator.clipboard.writeText(r.current.textContent),setTimeout(()=>{c(!1)},2e3)},children:(0,o.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",stroke:"currentColor",fill:"none",className:s?"text-green-400":"text-gray-300",children:s?(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}):(0,o.jsx)(o.Fragment,{children:(0,o.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"})})})}),(0,o.jsx)("pre",{children:t})]})}},894:function(){},4236:function(){}},function(e){e.O(0,[329,231,173,971,23,744],function(){return e(e.s=4889)}),_N_E=e.O()}]);