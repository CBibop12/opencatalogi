"use strict";(self.webpackChunkopen_register_docs=self.webpackChunkopen_register_docs||[]).push([[9607],{5680:(e,n,t)=>{t.d(n,{xA:()=>s,yg:()=>m});var a=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=a.createContext({}),c=function(e){var n=a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},s=function(e){var n=c(e.components);return a.createElement(d.Provider,{value:n},e.children)},u="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},g=a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,d=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),u=c(t),g=r,m=u["".concat(d,".").concat(g)]||u[g]||p[g]||i;return t?a.createElement(m,o(o({ref:n},s),{},{components:t})):a.createElement(m,o({ref:n},s))}));function m(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,o=new Array(i);o[0]=g;var l={};for(var d in n)hasOwnProperty.call(n,d)&&(l[d]=n[d]);l.originalType=e,l[u]="string"==typeof e?e:r,o[1]=l;for(var c=2;c<i;c++)o[c]=t[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,t)}g.displayName="MDXCreateElement"},6765:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>o,default:()=>p,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var a=t(8168),r=(t(6540),t(5680));const i={},o="Waarom we overstappen naar Nextcloud",l={unversionedId:"handleidingen/Nextcloud",id:"handleidingen/Nextcloud",title:"Waarom we overstappen naar Nextcloud",description:"Alle eerste iteraties van Open Catalogi draaiden op het https://api-platform.com/ framework van digital state. Recentenlijk zijn we begonnen met de overstap naar nextcloud, waarom zou je dat in hemelsnaam doen?",source:"@site/docs/handleidingen/Nextcloud.md",sourceDirName:"handleidingen",slug:"/handleidingen/Nextcloud",permalink:"/docs/handleidingen/Nextcloud",draft:!1,editUrl:"https://github.com/conductionnl/opencatalogi/tree/main/website/docs/handleidingen/Nextcloud.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Installatie",permalink:"/docs/handleidingen/Installatie"},next:{title:"In productie nemen",permalink:"/docs/handleidingen/Productie"}},d={},c=[{value:"Redenen voor de Overstap",id:"redenen-voor-de-overstap",level:2},{value:"Veiligheid en Privacy",id:"veiligheid-en-privacy",level:3},{value:"Schaalbaarheid",id:"schaalbaarheid",level:3},{value:"Controle en Data Soevereiniteit",id:"controle-en-data-soevereiniteit",level:3},{value:"Functionaliteit",id:"functionaliteit",level:3},{value:"Betrouwbaarheid",id:"betrouwbaarheid",level:3},{value:"Samenvatting",id:"samenvatting",level:2}],s={toc:c},u="wrapper";function p(e){let{components:n,...t}=e;return(0,r.yg)(u,(0,a.A)({},s,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"waarom-we-overstappen-naar-nextcloud"},"Waarom we overstappen naar Nextcloud"),(0,r.yg)("p",null,"Alle eerste iteraties van Open Catalogi draaiden op het ","[https://api-platform.com/]","(api platform) framework van ",(0,r.yg)("a",{parentName:"p",href:"https://digitalstate.io/"},"digital state"),". Recentenlijk zijn we begonnen met de overstap naar ",(0,r.yg)("a",{parentName:"p",href:"https://nextcloud.com/"},"nextcloud"),", waarom zou je dat in hemelsnaam doen?"),(0,r.yg)("p",null,"Wel innovatie betekend experimenteren, 5 dingen proberen en er 4 loslaten. En helaas is API platform voor ons een van de dingen die we los gaan laten. Niet omdat het een slecht framework is. In tegendeel, het is een technisch sterk framework voor register ontwikkeling. Maar het is ook abstract, technisch niet super makelijk uit te rollen."),(0,r.yg)("p",null,"Daarnaast zien we dat nextcloud (met europese steun) een sterke opmars maakt bij (buitenlandse) overheden"),(0,r.yg)("h2",{id:"redenen-voor-de-overstap"},"Redenen voor de Overstap"),(0,r.yg)("h3",{id:"veiligheid-en-privacy"},"Veiligheid en Privacy"),(0,r.yg)("p",null,"Nextcloud biedt sterke beveiliging met end-to-end encryptie, Nextcloud Guard monitoring en videoverificatie voor gedeelde bestanden. Deze maatregelen verminderen datalekrisico\u2019s en verhogen de betrouwbaarheid van onze diensten\u200b."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://nextcloud.com/blog/nextcloud-for-cloud-and-service-providers/"},"Service providers"),"\u200b"),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://nextcloud.com/blog/unique-sharing-security-video-verification/"},"Video Security")),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://nextcloud.com/c/uploads/2022/03/Nextcloud_Customer_Story_HackerOne.pdf"},"Security proofing"))),(0,r.yg)("h3",{id:"schaalbaarheid"},"Schaalbaarheid"),(0,r.yg)("p",null,"De multitenancy-architectuur van Nextcloud stelt ons in staat om eenvoudig en kosteneffectief te schalen, wat essentieel is voor toekomstige groei."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://aws.amazon.com/marketplace/pp/prodview-yzsld5oe2x3me/"},"Amazon Web Services, Inc."),"\u200b.")),(0,r.yg)("h3",{id:"controle-en-data-soevereiniteit"},"Controle en Data Soevereiniteit"),(0,r.yg)("p",null,"Door Nextcloud op eigen servers te hosten, behouden we volledige controle over onze gegevens, wat cruciaal is voor GDPR-compliance en transparantie\u200b."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://nextcloud.com/blog/press_releases/european-governments-work-with-nextcloud-to-build-digitally-sovereign-office/"},"Nextcloud"),"\u200b.")),(0,r.yg)("h3",{id:"functionaliteit"},"Functionaliteit"),(0,r.yg)("p",null,"Nextcloud integreert bestandssynchronisatie, documentbewerking, e-mail, chat, videoconferenties en projectplanning in \xe9\xe9n platform. Dit vereenvoudigt ons beheer en vermindert de behoefte aan losse apps, wat effici\xebntie en kostenbesparing oplevert."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"\u200b ",(0,r.yg)("a",{parentName:"li",href:"https://aws.amazon.com/marketplace/pp/prodview-yzsld5oe2x3me"},"Amazon Web Services, Inc."),"\u200b")),(0,r.yg)("h3",{id:"betrouwbaarheid"},"Betrouwbaarheid"),(0,r.yg)("p",null,"Europese overheden, universiteiten en ziekenhuizen gebruiken Nextcloud voor digitale soevereiniteit, wat het platform betrouwbaar en toekomstbestendig maakt\u200b."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("a",{parentName:"li",href:"https://nextcloud.com/whitepapers/"},"Nextcloud"),"\u200b.")),(0,r.yg)("h2",{id:"samenvatting"},"Samenvatting"),(0,r.yg)("p",null,"Bij Conduction hebben we gekozen voor Nextcloud om onze dienstverlening veiliger, effici\xebnter en schaalbaarder te maken. De uitgebreide beveiligingsmaatregelen, volledige controle over data, en integratie van diverse functionaliteiten maken Nextcloud de ideale keuze. De samenwerking met Europese overheden bevestigt de betrouwbaarheid van Nextcloud, waardoor wij onze klanten met vertrouwen blijven bedienen."),(0,r.yg)("p",null,"Nextcloud stelt ons in staat om trouw te blijven aan onze kernwaarden van veiligheid, effici\xebntie en onafhankelijkheid, terwijl we ons voorbereiden op toekomstige groei en innovatie."))}p.isMDXComponent=!0}}]);