var te=Object.defineProperty;var se=(_,d,p)=>d in _?te(_,d,{enumerable:!0,configurable:!0,writable:!0,value:p}):_[d]=p;var E=(_,d,p)=>(se(_,typeof d!="symbol"?d+"":d,p),p);import{a as ae,b as le,r as c,w as ne,h as ie,e as g,i as n,j as q,v as z,k as T,l as re,m as j,t as v,o as w}from"./entry.2d1fe20c.js";const oe=""+globalThis.__publicAssetsURL("assets/bar.png"),ue=""+globalThis.__publicAssetsURL("assets/default.png"),ce=""+globalThis.__publicAssetsURL("assets/won.png"),de=""+globalThis.__publicAssetsURL("assets/lost.png"),fe={class:"flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px] select-none"},ve={class:"border-4 border-[#0855DD] w-[95vw] rounded-lg bg-[#C0C0C0] min-w-[300px] mt-5"},pe=n("div",{class:"w-full h-6 bg-[#0855DD] text-white font-bold px-3 flex flex-row justify-between"},[j(" 1D Minesweeper "),n("a",{href:"https://youtu.be/Gb2jGy76v0Y",target:"_blank",rel:"noopener noreferrer"},[n("img",{src:oe,style:{"image-rendering":"pixelated"},class:"cursor-pointer h-4 mt-1"})])],-1),he={class:"bg-[#ECE9D8] text-left flex flex-row"},me={class:"text-left h-6 w-full flex flex-row-reverse"},ge=["disabled"],we=["disabled"],be={class:"bg-[#ECE9D8] p-1"},ye={class:"border-4 border-t-[#808080] border-l-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] bg-[#C0C0C0] flex flex-row h-[92px]"},_e={class:"w-[33%] h-[66px] my-auto"},xe=["src"],Fe={class:"w-[33%] h-[66px] my-auto"},Ce={class:"w-[33%] h-[66px] my-auto"},ke=["src"],Me={class:"mt-1 border-4 border-t-[#808080] border-l-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF]"},Ee={key:0,class:"mt-3"},De={key:0,class:"text-center text-lg mb-3"},Te={key:1,class:"text-center text-lg mb-3"},Ie={key:2,class:"select-text"},Be={href:"http://www.stephan-bechtel.de/3bv.htm",target:"_blank",rel:"noopener noreferrer",class:"underline"},Ve=n("br",null,null,-1),Re={href:"https://minesweepergame.com/website/authoritative-minesweeper/wiki/3BV#3BV_and_3BV.2Fs",target:"_blank",rel:"noopener noreferrer",class:"underline"},Le={href:"https://minesweepergame.com/statistics.php",target:"_blank",rel:"noopener noreferrer",class:"underline"},Ue=n("br",null,null,-1),$e={href:"https://minesweepergame.com/statistics.php",target:"_blank",rel:"noopener noreferrer",class:"underline"},Pe=n("br",null,null,-1),je=ae({__name:"index",async setup(_){let d,p;le({title:"1D Minesweeper"});const r=c(16),u=c(3),x=c(!1);let h=[],F,G,l=[];const m=c(!1);let R=!0;const C=c(0),k=c(0),N=c(),b=c(0),M=c(!1),y=c(0),D=c(3),L=c("./assets/000.png"),S=c("./assets/000.png");let I=!1;const U=new Image;U.src="./assets/texture_atlas.png",[d,p]=ne(()=>new Promise(t=>{U.onload=()=>t(1)})),await d,p();let B=document.createElement("canvas");B.width=16,B.height=16;let H=B.getContext("2d");async function $(t){const e=document.createElement("canvas");e.width=117,e.height=64;const s=e.getContext("2d");for(let a=0;a<3;a++){const i=new Image;i.src="./assets/display/"+t%10+".png",await new Promise(o=>{i.onload=()=>o(1)}),s.drawImage(i,78-a*39,0),t=Math.floor(t/10)}S.value=e.toDataURL()}async function Q(t){const e=document.createElement("canvas");e.width=117,e.height=64;const s=e.getContext("2d");for(let a=0;a<3;a++){const i=new Image;i.src="./assets/display/"+t%10+".png",await new Promise(o=>{i.onload=()=>o(1)}),s.drawImage(i,78-a*39,0),t=Math.floor(t/10)}L.value=e.toDataURL()}async function J(){let t=0;var e=setInterval(()=>{if(!I){clearInterval(e);return}if(t++,t>999){Y();return}Q(t)},1e3)}async function P(t){const e=new Image;switch(t){case 0:{e.src="./favicon.ico";break}case 1:{e.src="./favicon_1.ico";break}case 2:{e.src="./favicon_2.ico";break}case 3:{e.src="./favicon_3.ico";break}}await new Promise(a=>{e.onload=()=>a(1)}),H.drawImage(e,0,0,16,16),document.getElementById("favicon").setAttribute("href",B.toDataURL()),history.replaceState(null,null,window.location.hash=="#1"?"#0":"#1")}class O{constructor(e,s,a){E(this,"position");E(this,"isMine");E(this,"type");E(this,"width");E(this,"height");this.position=e,this.isMine=s,this.type=a,this.width=16,this.height=16}draw(){G.drawImage(U,this.type*this.width,0,this.width,this.height,this.position*this.width,0,this.width,this.height)}}ie(async()=>{f()});async function f(){P(1),m.value=!1,R=!0,C.value=0,k.value=0,b.value=0,M.value=!1,y.value=0,D.value=u.value,I=!1,L.value="./assets/000.png",u.value>Math.floor(r.value/3)&&(u.value=Math.floor(r.value/3),u.value<1&&(u.value=1)),F=document.querySelector("canvas"),G=F.getContext("2d"),F.width=16*r.value,F.height=17,l=[],h=[],await K(),h.forEach((t,e)=>{switch(t){case!1:l.push(new O(e,!1,3));break;case!0:l.push(new O(e,!0,3));break}}),l.forEach(t=>{t.draw()}),$(u.value)}async function K(){for(let s=0;s<r.value;s++)h[s]=!1;let t,e;for(let s=0;s<u.value;s++)for(t=!1;!t;)e=Math.floor(Math.random()*r.value),h[e]||(h[e]=!0,t=!0)}async function A(t,e=-1){if(m.value)return;const s=X(F,t);let a=Math.floor(s.x/16);if(e>=0&&(a=e),l[a].type!==4){if(l[a].type===1&&a>0&&a<r.value-1){let i=0;l[a-1].type===4&&i++,l[a+1].type===4&&i++,i!=0&&i===l[a].type&&(A(t,a-1),A(t,a+1))}if(R){if(I=!0,J(),N.value=Date.now(),l[a].isMine){for(let i=0;i<r.value;i++)if(!l[i].isMine){l[i].isMine=!0,h[i]=!0;break}l[a].isMine=!1,h[a]=!1,l[a].type=V(a)}R=!1}if(l[a].isMine)l[a].isMine&&l[a].type>2&&l[a].type<5&&(l[a].type=6,Y());else{let i=V(a);if(l[a].type=i,i===0){let o=a-1;for(i=0;i===0&&o>=0;)i=V(o),l[o].type=i,l[o].draw(),o--;for(o=a+1,i=0;i===0&&o<r.value;)i=V(o),l[o].type=i,l[o].draw(),o++}}l[a].draw(),C.value++,Z()&&Y(!0)}}async function W(t){if(m.value)return;const e=X(F,t),s=Math.floor(e.x/16);l[s].type===3?(l[s].type=4,D.value--,$(D.value)):l[s].type===4&&(l[s].type=3,D.value++,$(D.value)),l[s].draw(),k.value++}function X(t,e){var s=t.getBoundingClientRect(),a=t.width/s.width,i=t.height/s.height;return{x:(e.clientX-s.left)*a,y:(e.clientY-s.top)*i}}async function Y(t=!1){b.value=Date.now()-N.value,I=!1,P(t?2:3),m.value=!0,M.value=t,l.forEach((e,s)=>{e.isMine&&e.type===3?e.type=5:!e.isMine&&e.type===4&&(e.type=7),e.draw()}),y.value=ee()}function V(t){let e=0;return t>0&&l[t-1].isMine&&e++,t<r.value-1&&l[t+1].isMine&&e++,e}function Z(){let t=0;return l.forEach(e=>{(e.isMine&&e.type>2&&e.type<5||!e.isMine&&e.type<3)&&t++}),t===r.value}function ee(){let t=0,e=0;for(let s=0;s<r.value;s++)h[s]?(e>2?t++:e===2?s===2?t++:t+=2:e===1&&t++,e=0):e++;return e&&t++,t}return(t,e)=>(w(),g("div",fe,[n("div",ve,[pe,n("div",he,[n("p",{class:"ml-2 cursor-pointer",onClick:e[0]||(e[0]=s=>{r.value=8,u.value=1,f(),x.value=!1})},"Beginner"),n("p",{class:"ml-2 cursor-pointer",onClick:e[1]||(e[1]=s=>{r.value=16,u.value=3,f(),x.value=!1})},"Intermediate"),n("p",{class:"ml-2 cursor-pointer",onClick:e[2]||(e[2]=s=>{r.value=30,u.value=6,f(),x.value=!1})},"Expert"),n("div",me,[q(n("input",{class:"mr-2 border-2 w-10 cursor-pointer",type:"number","onUpdate:modelValue":e[3]||(e[3]=s=>u.value=s),disabled:!x.value,onChange:e[4]||(e[4]=s=>f()),min:"1",max:"200"},null,40,ge),[[z,u.value]]),q(n("input",{class:"mr-2 border-2 w-10 cursor-pointer",type:"number","onUpdate:modelValue":e[5]||(e[5]=s=>r.value=s),disabled:!x.value,onChange:e[6]||(e[6]=s=>f()),min:"1",max:"200"},null,40,we),[[z,r.value]]),n("p",{class:"mr-2",onClick:e[7]||(e[7]=s=>{f(),x.value=!0})},"Custom")])]),n("div",be,[n("div",ye,[n("div",_e,[n("img",{src:S.value,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto w-[117px] h-[68px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF]"},null,8,xe)]),n("div",Fe,[m.value?T("",!0):(w(),g("img",{key:0,onClick:e[8]||(e[8]=s=>f()),src:ue,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})),m.value&&M.value?(w(),g("img",{key:1,onClick:e[9]||(e[9]=s=>f()),src:ce,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})):T("",!0),m.value&&!M.value?(w(),g("img",{key:2,onClick:e[10]||(e[10]=s=>f()),src:de,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})):T("",!0)]),n("div",Ce,[n("img",{src:L.value,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto w-[117px] h-[68px] border-2 border-t-[#808080] border-l-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF]"},null,8,ke)])]),n("div",Me,[n("canvas",{onClick:e[11]||(e[11]=s=>A(s)),onContextmenu:e[12]||(e[12]=re(s=>W(s),["prevent"])),class:"w-full",style:{"image-rendering":"pixelated"},width:"256",height:"16"},null,32)])])]),m.value?(w(),g("div",Ee,[M.value?(w(),g("p",De,"You won!")):(w(),g("p",Te,"You lost...")),M.value?(w(),g("div",Ie,[n("p",null,[j("Time: "),n("b",null,v(b.value/1e3),1),j(" sec")]),n("a",Be,"3BV: "+v(y.value),1),Ve,n("a",Re,"3BV/sec: "+v(Math.round(y.value/(b.value/1e3)*1e4)/1e4),1),n("p",null,"Clicks: "+v(C.value)+" + "+v(k.value),1),n("p",null,"Efficiency: "+v(Math.round(y.value/(C.value+k.value)*100*1e4)/1e4)+"%",1),n("p",null,"CL/s: "+v(Math.round((C.value+k.value)/(b.value/1e3)*1e4)/1e4),1),n("p",null,"Mine density: "+v(Math.round(u.value/r.value*100*1e4)/1e4)+"%",1),n("a",Le,"IOE: "+v(Math.round(y.value/(C.value+k.value)*1e4)/1e4),1),Ue,n("a",$e,"RQP: "+v(Math.round(b.value/1e3/y.value/(b.value/1e3)*1e4)/1e4),1),Pe])):T("",!0)])):T("",!0)]))}});export{je as default};
