"use strict";(self.webpackChunkopen_register_docs=self.webpackChunkopen_register_docs||[]).push([[9047],{5680:(e,t,n)=>{n.d(t,{xA:()=>p,yg:()=>c});var a=n(6540);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var g=a.createContext({}),d=function(e){var t=a.useContext(g),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(g.Provider,{value:t},e.children)},m="mdxType",y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,l=e.originalType,g=e.parentName,p=o(e,["components","mdxType","originalType","parentName"]),m=d(n),u=r,c=m["".concat(g,".").concat(u)]||m[u]||y[u]||l;return n?a.createElement(c,i(i({ref:t},p),{},{components:n})):a.createElement(c,i({ref:t},p))}));function c(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=n.length,i=new Array(l);i[0]=u;var o={};for(var g in t)hasOwnProperty.call(t,g)&&(o[g]=t[g]);o.originalType=e,o[m]="string"==typeof e?e:r,i[1]=o;for(var d=2;d<l;d++)i[d]=n[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8274:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>g,contentTitle:()=>i,default:()=>y,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var a=n(8168),r=(n(6540),n(5680));const l={},i="Ratingssysteem voor OpenCatalogi",o={unversionedId:"handleidingen/Rating",id:"handleidingen/Rating",title:"Ratingssysteem voor OpenCatalogi",description:"Overzicht",source:"@site/docs/handleidingen/Rating.md",sourceDirName:"handleidingen",slug:"/handleidingen/Rating",permalink:"/docs/handleidingen/Rating",draft:!1,editUrl:"https://github.com/conductionnl/opencatalogi/tree/main/website/docs/handleidingen/Rating.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Specificatie YAML voor Openbare Organisaties",permalink:"/docs/handleidingen/Publicorganisation"},next:{title:"Software Catalogus",permalink:"/docs/handleidingen/Software"}},g={},d=[{value:"Overzicht",id:"overzicht",level:2},{value:"Rating Mechanisme",id:"rating-mechanisme",level:2},{value:"Beoordelingscriteria",id:"beoordelingscriteria",level:2},{value:"Aanwezigheid van documenten",id:"aanwezigheid-van-documenten",level:3},{value:"Inrichting van de repository",id:"inrichting-van-de-repository",level:3},{value:"Inrichting van de publiccode.yml",id:"inrichting-van-de-publiccodeyml",level:3},{value:"Security en afhankelijkheden",id:"security-en-afhankelijkheden",level:3},{value:"Installatie mogelijkheden",id:"installatie-mogelijkheden",level:3},{value:"Community",id:"community",level:3}],p={toc:d},m="wrapper";function y(e){let{components:t,...n}=e;return(0,r.yg)(m,(0,a.A)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"ratingssysteem-voor-opencatalogi"},"Ratingssysteem voor OpenCatalogi"),(0,r.yg)("h2",{id:"overzicht"},"Overzicht"),(0,r.yg)("p",null,"Voor OpenCatalogi hanteert een ratingssysteem gebaseerd op de kwaliteit van de documentatie. Een goed gedocumenteerd product ontvangt meer punten, wat bijdraagt aan een hogere rating. Dit systeem stimuleert ontwikkelaars om hun documentatie te verbeteren, waardoor de kwaliteit van OpenCatalogi als geheel toeneemt. Een hogere rating leidt tot een betere zichtbaarheid in OpenCatalogi, waardoor de kans groter is dat het product gebruikt wordt. Dit systeem moedigt ontwikkelaars aan om te investeren in de kwaliteit van hun documentatie."),(0,r.yg)("h2",{id:"rating-mechanisme"},"Rating Mechanisme"),(0,r.yg)("p",null,"De rating wordt berekend op basis van een x/y schaal, waarbij:"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"x")," staat voor het aantal verdiende punten."),(0,r.yg)("li",{parentName:"ul"},(0,r.yg)("strong",{parentName:"li"},"y")," staat voor het totaal aantal mogelijk te verdienen punten, afhankelijk van het type publicatie (bijvoorbeeld applicaties, componenten, configuraties en API's).")),(0,r.yg)("p",null,"De verhouding tussen x en y resulteert in een percentage dat de score van de documentatie weergeeft. Dit percentage bepaalt de volgorde van weergave in de OpenCatalogi frontend en wordt getoond aan bezoekers."),(0,r.yg)("h2",{id:"beoordelingscriteria"},"Beoordelingscriteria"),(0,r.yg)("p",null,"De rating wordt vastgesteld door een repository te scannen op de aanwezigheid van specifieke documentatie, de inrichting van de repository zelf en de aanwezigheid van velden binnen de ",(0,r.yg)("inlineCode",{parentName:"p"},"publiccode.yaml"),"."),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Aspect"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"),(0,r.yg)("th",{parentName:"tr",align:null},"Max. Punten"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Aanwezigheid van bestanden")),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezigheid bestanden"),(0,r.yg)("td",{parentName:"tr",align:null},"8")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Inrichting van de repository")),(0,r.yg)("td",{parentName:"tr",align:null},"Configuratie repository"),(0,r.yg)("td",{parentName:"tr",align:null},"8")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Inrichting van de publiccode.yml")),(0,r.yg)("td",{parentName:"tr",align:null},"Properties in publiccode"),(0,r.yg)("td",{parentName:"tr",align:null},"24")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Security en afhankenlijkheden")),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezigheid bestand"),(0,r.yg)("td",{parentName:"tr",align:null},"1")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Installatie mogelijkheden")),(0,r.yg)("td",{parentName:"tr",align:null},"Aangemeld voor installatie hubs"),(0,r.yg)("td",{parentName:"tr",align:null},"2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Community")),(0,r.yg)("td",{parentName:"tr",align:null},"Aangemeld voor etalages"),(0,r.yg)("td",{parentName:"tr",align:null},"2")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("strong",{parentName:"td"},"Totaal")),(0,r.yg)("td",{parentName:"tr",align:null},"45")))),(0,r.yg)("h3",{id:"aanwezigheid-van-documenten"},"Aanwezigheid van documenten"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"We controleren of de volgende documenten als ",(0,r.yg)("inlineCode",{parentName:"li"},".md")," bestand in de repository aanwezig zijn."),(0,r.yg)("li",{parentName:"ul"},"Dat doen we aan de hand van de bestandsnaam, zonder hoofdlettergevoeligheid"),(0,r.yg)("li",{parentName:"ul"},"We volgen hierin zowel ",(0,r.yg)("a",{parentName:"li",href:"https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/about-community-profiles-for-public-repositories"},"GitHub aanbevelingen")," als algemene standaarden en bijzondere ",(0,r.yg)("a",{parentName:"li",href:"https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/creating-a-default-community-health-file"},"GitHub bestanden"),"."),(0,r.yg)("li",{parentName:"ul"},"Er wordt alleen gecontroleerd op de aanwezigheid van bestanden, niet op de inhoud daarvan."),(0,r.yg)("li",{parentName:"ul"},"De bestanden mogen zich op ",(0,r.yg)("inlineCode",{parentName:"li"},"root")," niveau bevinden of binnen de ",(0,r.yg)("inlineCode",{parentName:"li"},"docs/")," folder"),(0,r.yg)("li",{parentName:"ul"},"Als het een 'multi-repository' betreft (meerdere publicaties uit \xe9\xe9n repository) controleren we de bestanden alleen op repository niveau"),(0,r.yg)("li",{parentName:"ul"},"Voor ieder aanwezig bestand wordt 1 punt toegekend"),(0,r.yg)("li",{parentName:"ul"},"We kijken wel naar de ",(0,r.yg)("inlineCode",{parentName:"li"},"funding.yaml")," voor weergave van de ",(0,r.yg)("inlineCode",{parentName:"li"},"bijdragen")," knop, maar nemen deze niet mee als rating factor"),(0,r.yg)("li",{parentName:"ul"},"We controleren altijd op de aanwezigheid van deze documenten, ongeacht het type publicatie")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Bestand"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"README.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Biedt een overzicht van het project, gebruiksinstructies, installatieprocedure, en bijdrage richtlijnen."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"LICENCE.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Bevat de licentie-informatie voor het project, wat duidelijk maakt onder welke voorwaarden de software gebruikt en gedistribueerd mag worden."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"CONTRIBUTING.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Geeft richtlijnen voor hoe anderen kunnen bijdragen aan het project, inclusief codebijdragen, documentatie updates, en issue rapportage."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"CODE_OF_CONDUCT.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Beschrijft de gedragscode voor deelname aan het project, waarmee een inclusieve en respectvolle gemeenschap wordt bevorderd."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"GOVERNANCE.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Legt de bestuurlijke structuur van het project uit, inclusief besluitvormingsprocessen en rollen binnen het projectteam."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"SECURITY.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Biedt informatie over hoe beveiligingsproblemen in het project gemeld kunnen worden en beschrijft het beleid voor het afhandelen van beveiligingsissues."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"SUPPORT.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Geeft aan waar gebruikers ondersteuning kunnen vinden (bijvoorbeeld via forums, chatkanalen, of e-mail), inclusief veelgestelde vragen."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"ROADMAP.md")),(0,r.yg)("td",{parentName:"tr",align:null},"Biedt inzicht in de toekomstplannen en ontwikkelingsrichting van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"PUBLICCODE.yml")),(0,r.yg)("td",{parentName:"tr",align:null},"Een bestand specifiek ontworpen om openbare software te beschrijven, met metadata die het project categoriseert en helpt bij de vindbaarheid."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")))),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"[!TIP]","\nWil je je rating snel verbeteren? Zorg er dan voor dat de bovenstaande documenten in je repository aanwezig zijn. Omdat we de documenten niet inhoudelijk beoordelen, kan je daarbij ook prima beginnen met een korte uitleg die je later uitbreidt.")),(0,r.yg)("h3",{id:"inrichting-van-de-repository"},"Inrichting van de repository"),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"We kijken of bepaalde properties zijn ingericht voor de repository aan de hand van de GitHub/GitLab API."),(0,r.yg)("li",{parentName:"ul"},"Per property/criterium is er \xe9\xe9n punt te verdienen"),(0,r.yg)("li",{parentName:"ul"},"Als het een 'multi-repository' betreft (meerdere publicaties uit \xe9\xe9n repository) controleren we de bestanden alleen op repository niveau")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Property"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Name"),(0,r.yg)("td",{parentName:"tr",align:null},"De naam van de repository biedt een duidelijke identificatie van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"Ingesteld, meer dan 5 tekens")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Description"),(0,r.yg)("td",{parentName:"tr",align:null},"Een korte beschrijving van het project maakt direct duidelijk wat het doel en de functie van het project zijn."),(0,r.yg)("td",{parentName:"tr",align:null},"Ingesteld, meer dan 35 tekens")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Website"),(0,r.yg)("td",{parentName:"tr",align:null},"Een link naar een projectwebsite of documentatie voor meer informatie."),(0,r.yg)("td",{parentName:"tr",align:null},"Ingesteld, geldige url")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Tags"),(0,r.yg)("td",{parentName:"tr",align:null},"Tags helpen bij het categoriseren en vinden van het project binnen OpenCatalogi en andere zoekplatforms."),(0,r.yg)("td",{parentName:"tr",align:null},"Er zijn meer dan 3 tags")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Releases"),(0,r.yg)("td",{parentName:"tr",align:null},"Releases tonen de voortgang en de beschikbaarheid van stabiele versies van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"Er is meer dan 1 release")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Packages"),(0,r.yg)("td",{parentName:"tr",align:null},"Packages bieden gecontaineriseerde versies van de software voor gemakkelijke distributie en installatie."),(0,r.yg)("td",{parentName:"tr",align:null},"Er is meer dan 1 package")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Deployments"),(0,r.yg)("td",{parentName:"tr",align:null},"Deployments tonen aan dat het project actief wordt gebruikt en onderhouden."),(0,r.yg)("td",{parentName:"tr",align:null},"Er is meer dan 1 deployment")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Contributors"),(0,r.yg)("td",{parentName:"tr",align:null},"Een actieve gemeenschap van bijdragers geeft aan dat het project levendig en in ontwikkeling is."),(0,r.yg)("td",{parentName:"tr",align:null},"Er zijn meer dan 5 contributors")))),(0,r.yg)("blockquote",null,(0,r.yg)("p",{parentName:"blockquote"},"[!TIP]","\nJe kan de beschrijving van je repository gemakkelijk in GitHub aanpassen via de repository pagina.")),(0,r.yg)("h3",{id:"inrichting-van-de-publiccodeyml"},"Inrichting van de publiccode.yml"),(0,r.yg)("p",null,'De beoordeling van de publiccode is publicatietype afhankelijk. Dat wil zeggen dat bepaalde properties alleen worden "gewogen" als ze relevant zijn voor het publicatietype. Zo zal een configuratiebestand bijvoorbeeld niet worden beoordeeld op het beschikbaar hebben van een API.'),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Property"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Publicatie Type"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"publiccodeYmlVersion"),(0,r.yg)("td",{parentName:"tr",align:null},"Specificatie van de gebruikte versie van de publiccode.yml standaard."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"name"),(0,r.yg)("td",{parentName:"tr",align:null},"De naam van het project zoals bekend bij het publiek."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"applicationSuite"),(0,r.yg)("td",{parentName:"tr",align:null},"Geeft aan of het project deel uitmaakt van een grotere suite van applicaties."),(0,r.yg)("td",{parentName:"tr",align:null},"configuratie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"url"),(0,r.yg)("td",{parentName:"tr",align:null},"De URL naar de broncode repository van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"landingURL"),(0,r.yg)("td",{parentName:"tr",align:null},"Een landingspagina voor het project voor meer informatie buiten de repository."),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"isBasedOn"),(0,r.yg)("td",{parentName:"tr",align:null},"Geeft aan of het project is gebaseerd op of een fork is van een ander project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"softwareVersion"),(0,r.yg)("td",{parentName:"tr",align:null},"De huidige stabiele versie van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"releaseDate"),(0,r.yg)("td",{parentName:"tr",align:null},"De datum van de laatste stabiele release."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"createdDate"),(0,r.yg)("td",{parentName:"tr",align:null},"De datum van creatie."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"logo"),(0,r.yg)("td",{parentName:"tr",align:null},"Een logo dat het project visueel identificeert."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"monochromeLogo"),(0,r.yg)("td",{parentName:"tr",align:null},"Een monochroom logo voor gebruik in beperkte grafische contexten."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"platforms"),(0,r.yg)("td",{parentName:"tr",align:null},"De platformen waarop het project kan draaien."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"categories"),(0,r.yg)("td",{parentName:"tr",align:null},"Categorie\xebn die helpen bij het classificeren van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"usedBy"),(0,r.yg)("td",{parentName:"tr",align:null},"Organisaties die dit component gebruiken"),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"supportedBy"),(0,r.yg)("td",{parentName:"tr",align:null},"Organisaties die services en diensten afgeven op dit component"),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"roadmap"),(0,r.yg)("td",{parentName:"tr",align:null},"Een link naar de roadmap van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"developmentStatus"),(0,r.yg)("td",{parentName:"tr",align:null},"De huidige ontwikkelingsstatus van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"softwareType"),(0,r.yg)("td",{parentName:"tr",align:null},"Het type software (bijvoorbeeld standalone, library, etc.)."),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"intendedaudience"),(0,r.yg)("td",{parentName:"tr",align:null},"De doelgroep voor wie het project is ontworpen."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"description"),(0,r.yg)("td",{parentName:"tr",align:null},"Een beschrijving van het project in verschillende talen."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"legal"),(0,r.yg)("td",{parentName:"tr",align:null},"Juridische informatie en licentiestatus van het project."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"maintenance"),(0,r.yg)("td",{parentName:"tr",align:null},"Informatie over hoe en tot wanneer het project wordt onderhouden."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"localisation"),(0,r.yg)("td",{parentName:"tr",align:null},"Beschikbare talen van de software."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"dependsOn"),(0,r.yg)("td",{parentName:"tr",align:null},"Andere projecten of software waarvan dit project afhankelijk is."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"nl"),(0,r.yg)("td",{parentName:"tr",align:null},"Lokalisatie-informatie specifiek voor Nederlandse gebruikers."),(0,r.yg)("td",{parentName:"tr",align:null},"component, configuratie, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"inputTypes"),(0,r.yg)("td",{parentName:"tr",align:null},"De types van input die de software kan verwerken."),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"outputTypes"),(0,r.yg)("td",{parentName:"tr",align:null},"De types van output die de software produceert."),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"hidden"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null})),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"downloads"),(0,r.yg)("td",{parentName:"tr",align:null}),(0,r.yg)("td",{parentName:"tr",align:null})))),(0,r.yg)("h3",{id:"security-en-afhankelijkheden"},"Security en afhankelijkheden"),(0,r.yg)("p",null,"Voor security en afhankelijkheden gebruiken we de SBOM standaard."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Voor ieder aanwezig bestand wordt 1 punt toegekend.")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Bestand"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},(0,r.yg)("inlineCode",{parentName:"td"},"sbom.xml")),(0,r.yg)("td",{parentName:"tr",align:null},"Biedt een overzicht van afhankelijkheden en risico's van een repository."),(0,r.yg)("td",{parentName:"tr",align:null},"Aanwezig in repository")))),(0,r.yg)("h3",{id:"installatie-mogelijkheden"},"Installatie mogelijkheden"),(0,r.yg)("p",null,"Vanuit Common Ground verwachten we dat publicaties gemakkelijk te installeren zijn op Haven/Kubernetes en daarvoor over de juiste Helm installatiebestanden beschikken. We controleren dit door op Artifact Hub en Bitnami te controleren of de Helm bestanden zijn aangeleverd. Voor beide is 1 punt te verdienen."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Per overzicht wordt 1 punt toegekend.")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Helm Repository"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Artifact Hub"),(0,r.yg)("td",{parentName:"tr",align:null},"Overzicht van de Kubernetes stichting voor installeerbare Kubernetes software"),(0,r.yg)("td",{parentName:"tr",align:null},"Is vindbaar via API")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"Bitnami"),(0,r.yg)("td",{parentName:"tr",align:null},"Commercieel overzicht met installatietool voor Kubernetes"),(0,r.yg)("td",{parentName:"tr",align:null},"Is vindbaar via API")))),(0,r.yg)("h3",{id:"community"},"Community"),(0,r.yg)("p",null,"Vanuit een community perspectief vinden we het belangrijk dat een repository zichzelf ook in de 'etalage' zet, we controleren dit door etalages te bevragen en te kijken of de repository hierin voorkomt."),(0,r.yg)("ul",null,(0,r.yg)("li",{parentName:"ul"},"Per etalage wordt 1 punt toegekend.")),(0,r.yg)("table",null,(0,r.yg)("thead",{parentName:"table"},(0,r.yg)("tr",{parentName:"thead"},(0,r.yg)("th",{parentName:"tr",align:null},"Portfolio"),(0,r.yg)("th",{parentName:"tr",align:null},"Doel"),(0,r.yg)("th",{parentName:"tr",align:null},"Publicatie Type"),(0,r.yg)("th",{parentName:"tr",align:null},"Criteria"))),(0,r.yg)("tbody",{parentName:"table"},(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"developer.overheid.nl"),(0,r.yg)("td",{parentName:"tr",align:null},"Overzicht alle door Nederlandse overheden gemaakte repositories"),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie"),(0,r.yg)("td",{parentName:"tr",align:null},"Is vindbaar via API")),(0,r.yg)("tr",{parentName:"tbody"},(0,r.yg)("td",{parentName:"tr",align:null},"componentencatalogus.commonground.nl"),(0,r.yg)("td",{parentName:"tr",align:null},"Overzicht alle door Nederlandse gemeenten gemaakte repositories"),(0,r.yg)("td",{parentName:"tr",align:null},"component, applicatie"),(0,r.yg)("td",{parentName:"tr",align:null},"Is vindbaar via API")))))}y.isMDXComponent=!0}}]);