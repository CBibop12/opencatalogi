"use strict";(self.webpackChunkopen_register_docs=self.webpackChunkopen_register_docs||[]).push([[976],{5436:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(8168),o=(n(6540),n(5680));const a={sidebar_position:1},i="Open Catalogi Documentation",l={unversionedId:"intro",id:"intro",title:"Open Catalogi Documentation",description:"This directory contains the documentation website for Open Catalogi, built with Docusaurus 2.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/docs/intro",draft:!1,editUrl:"https://github.com/conductionnl/opencatalogi/tree/main/website/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar"},c={},s=[{value:"Installation",id:"installation",level:2},{value:"Local Development",id:"local-development",level:2},{value:"Build",id:"build",level:2},{value:"Deployment",id:"deployment",level:2},{value:"Project Structure",id:"project-structure",level:2},{value:"Contributing",id:"contributing",level:2}],u={toc:s},p="wrapper";function d(e){let{components:t,...n}=e;return(0,o.yg)(p,(0,r.A)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"open-catalogi-documentation"},"Open Catalogi Documentation"),(0,o.yg)("p",null,"This directory contains the documentation website for Open Catalogi, built with ",(0,o.yg)("a",{parentName:"p",href:"https://docusaurus.io/"},"Docusaurus 2"),"."),(0,o.yg)("h2",{id:"installation"},"Installation"),(0,o.yg)("p",null,"Install the dependencies:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"npm install\n")),(0,o.yg)("h2",{id:"local-development"},"Local Development"),(0,o.yg)("p",null,"Start the development server:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"npm start\n")),(0,o.yg)("p",null,"This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server."),(0,o.yg)("h2",{id:"build"},"Build"),(0,o.yg)("p",null,"Build the static files:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"npm run build\n")),(0,o.yg)("p",null,"This command generates static content into the ",(0,o.yg)("inlineCode",{parentName:"p"},"build")," directory and can be served using any static contents hosting service."),(0,o.yg)("h2",{id:"deployment"},"Deployment"),(0,o.yg)("p",null,"The documentation is automatically deployed to GitHub Pages when changes are pushed to the ",(0,o.yg)("inlineCode",{parentName:"p"},"documentation")," branch."),(0,o.yg)("h2",{id:"project-structure"},"Project Structure"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"website/\n\u251c\u2500\u2500 docs/              # Documentation markdown files\n\u251c\u2500\u2500 src/               # React components and pages\n\u251c\u2500\u2500 static/            # Static files (images, etc)\n\u251c\u2500\u2500 docusaurus.config.js   # Site configuration\n\u251c\u2500\u2500 package.json       # Project dependencies\n\u251c\u2500\u2500 README.md         # This file\n\u2514\u2500\u2500 sidebars.js       # Sidebar configuration\n")),(0,o.yg)("h2",{id:"contributing"},"Contributing"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},"Create a new branch from ",(0,o.yg)("inlineCode",{parentName:"li"},"documentation")),(0,o.yg)("li",{parentName:"ol"},"Make your changes"),(0,o.yg)("li",{parentName:"ol"},"Test locally using ",(0,o.yg)("inlineCode",{parentName:"li"},"npm start")),(0,o.yg)("li",{parentName:"ol"},"Create a Pull Request to the ",(0,o.yg)("inlineCode",{parentName:"li"},"documentation")," branch")))}d.isMDXComponent=!0},5680:(e,t,n)=>{n.d(t,{xA:()=>u,yg:()=>g});var r=n(6540);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),m=o,g=p["".concat(c,".").concat(m)]||p[m]||d[m]||a;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function g(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[p]="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);