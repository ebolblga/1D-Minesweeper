var H=Object.defineProperty;var Q=(b,f,d)=>f in b?H(b,f,{enumerable:!0,configurable:!0,writable:!0,value:d}):b[f]=d;var E=(b,f,d)=>(Q(b,typeof f!="symbol"?f+"":f,d),d);import{a as J,b as K,r as c,w as W,h as Z,e as m,i as l,j,v as G,t as u,k as B,l as ee,m as L,o as w}from"./entry.37f4c793.js";const te=""+globalThis.__publicAssetsURL("assets/bar.png"),se=""+globalThis.__publicAssetsURL("assets/default.png"),le=""+globalThis.__publicAssetsURL("assets/won.png"),ne=""+globalThis.__publicAssetsURL("assets/lost.png"),ae={class:"flex justify-center flex-wrap pt-2 flex-col items-center min-w-[300px] select-none"},ie={class:"border-4 border-[#0855DD] w-[95vw] rounded-lg bg-[#C0C0C0] min-w-[300px] mt-5"},oe=l("div",{class:"w-full h-6 bg-[#0855DD] text-white font-bold px-3 flex flex-row justify-between"},[L(" 1D Minesweeper "),l("a",{href:"https://youtu.be/Gb2jGy76v0Y",target:"_blank",rel:"noopener noreferrer"},[l("img",{src:te,style:{"image-rendering":"pixelated"},class:"cursor-pointer h-4 mt-1"})])],-1),re={class:"bg-[#ECE9D8] text-left flex flex-row"},ue={class:"text-left h-6 w-full flex flex-row-reverse"},ce=["disabled"],fe=["disabled"],ve={class:"bg-white p-1"},de={class:"border-4 border-[#808080] bg-[#C0C0C0] flex flex-row"},pe={class:"w-[33%] h-[64px] text-center my-auto text-[#FF0000] text-lg font-black"},he={class:"w-[33%] h-[64px]"},me={class:"w-[33%] h-[64px] text-center my-auto text-[#FF0000] text-lg font-black flex flex-col"},we={class:"bg-[#808080] p-1"},ge={key:0,class:"mt-3"},_e={key:0,class:"text-center text-lg mb-3"},be={key:1,class:"text-center text-lg mb-3"},ye={key:2,class:"select-text"},xe={href:"http://www.stephan-bechtel.de/3bv.htm",target:"_blank",rel:"noopener noreferrer",class:"underline"},ke=l("br",null,null,-1),Ce={href:"https://minesweepergame.com/website/authoritative-minesweeper/wiki/3BV#3BV_and_3BV.2Fs",target:"_blank",rel:"noopener noreferrer",class:"underline"},Me={href:"https://minesweepergame.com/statistics.php",target:"_blank",rel:"noopener noreferrer",class:"underline"},Ee=l("br",null,null,-1),Be={href:"https://minesweepergame.com/statistics.php",target:"_blank",rel:"noopener noreferrer",class:"underline"},De=l("br",null,null,-1),$e=J({__name:"index",async setup(b){let f,d;K({title:"1D Minesweeper"});const i=c(16),r=c(3),y=c(!1);let p=[],x,U,n=[];const h=c(!1);let $=!0;const k=c(0),C=c(0),A=c(),g=c(0),M=c(!1),_=c(0),D=c(3),R=new Image;R.src="./assets/texture_atlas.png",[f,d]=W(()=>new Promise(s=>{R.onload=()=>s(1)})),await f,d();let V=document.createElement("canvas");V.width=16,V.height=16;let N=V.getContext("2d");async function I(s){const e=new Image;switch(s){case 0:{e.src="./favicon.ico";break}case 1:{e.src="./favicon_1.ico";break}case 2:{e.src="./favicon_2.ico";break}case 3:{e.src="./favicon_3.ico";break}}await new Promise(a=>{e.onload=()=>a(1)}),N.drawImage(e,0,0,16,16),document.getElementById("favicon").setAttribute("href",V.toDataURL()),history.replaceState(null,null,window.location.hash=="#1"?"#0":"#1")}class F{constructor(e,t,a){E(this,"position");E(this,"isMine");E(this,"type");E(this,"width");E(this,"height");this.position=e,this.isMine=t,this.type=a,this.width=16,this.height=16}draw(){U.drawImage(R,this.type*this.width,0,this.width,this.height,this.position*this.width,0,this.width,this.height)}}Z(async()=>{v()});async function v(){I(1),h.value=!1,$=!0,k.value=0,C.value=0,g.value=0,M.value=!1,_.value=0,D.value=r.value,r.value>Math.floor(i.value/3)&&(r.value=Math.floor(i.value/3),r.value<1&&(r.value=1)),x=document.querySelector("canvas"),x.width=16*i.value,x.height=17,U=x.getContext("2d"),n=[],p=[],await S(),p.forEach((s,e)=>{switch(s){case!1:n.push(new F(e,!1,3));break;case!0:n.push(new F(e,!0,3));break}}),n.forEach(s=>{s.draw()})}async function S(){for(let t=0;t<i.value;t++)p[t]=!1;let s,e;for(let t=0;t<r.value;t++)for(s=!1;!s;)e=Math.floor(Math.random()*i.value),p[e]||(p[e]=!0,s=!0)}async function O(s){if(h.value)return;const e=P(x,s),t=Math.floor(e.x/16);if(n[t].type!==4){if($){if(A.value=Date.now(),n[t].isMine){for(let a=0;a<i.value;a++)if(!n[a].isMine){n[a].isMine=!0,p[a]=!0;break}n[t].isMine=!1,p[t]=!1,n[t].type=T(t)}$=!1}if(n[t].isMine)n[t].isMine&&n[t].type>2&&n[t].type<5&&(n[t].type=6,Y());else{let a=T(t);if(n[t].type=a,a===0){let o=t-1;for(a=0;a===0&&o>=0;)a=T(o),n[o].type=a,n[o].draw(),o--;for(o=t+1,a=0;a===0&&o<i.value;)a=T(o),n[o].type=a,n[o].draw(),o++}}n[t].draw(),k.value++,q()&&Y(!0)}}async function X(s){if(h.value)return;const e=P(x,s),t=Math.floor(e.x/16);n[t].type===3?(n[t].type=4,D.value--):n[t].type===4&&(n[t].type=3,D.value++),n[t].draw(),C.value++}function P(s,e){var t=s.getBoundingClientRect(),a=s.width/t.width,o=s.height/t.height;return{x:(e.clientX-t.left)*a,y:(e.clientY-t.top)*o}}async function Y(s=!1){g.value=Date.now()-A.value,I(s?2:3),h.value=!0,M.value=s,n.forEach((e,t)=>{e.isMine&&e.type===3?e.type=5:!e.isMine&&e.type===4&&(e.type=7),e.draw()}),_.value=z()}function T(s){let e=0;return s>0&&n[s-1].isMine&&e++,s<i.value-1&&n[s+1].isMine&&e++,e}function q(){let s=0;return n.forEach(e=>{(e.isMine&&e.type>2&&e.type<5||!e.isMine&&e.type<3)&&s++}),s===i.value}function z(){let s=0,e=0;for(let t=0;t<i.value;t++)p[t]?(e>2?s++:e===2?t===2?s++:s+=2:e===1&&s++,e=0):e++;return e&&s++,s}return(s,e)=>(w(),m("div",ae,[l("div",ie,[oe,l("div",re,[l("p",{class:"ml-2 cursor-pointer",onClick:e[0]||(e[0]=t=>{i.value=8,r.value=1,v(),y.value=!1})},"Beginner"),l("p",{class:"ml-2 cursor-pointer",onClick:e[1]||(e[1]=t=>{i.value=16,r.value=3,v(),y.value=!1})},"Intermediate"),l("p",{class:"ml-2 cursor-pointer",onClick:e[2]||(e[2]=t=>{i.value=30,r.value=6,v(),y.value=!1})},"Expert"),l("div",ue,[j(l("input",{class:"mr-2 border-2 w-10 cursor-pointer",type:"number","onUpdate:modelValue":e[3]||(e[3]=t=>r.value=t),disabled:!y.value,onChange:e[4]||(e[4]=t=>v()),min:"1",max:"200"},null,40,ce),[[G,r.value]]),j(l("input",{class:"mr-2 border-2 w-10 cursor-pointer",type:"number","onUpdate:modelValue":e[5]||(e[5]=t=>i.value=t),disabled:!y.value,onChange:e[6]||(e[6]=t=>v()),min:"1",max:"200"},null,40,fe),[[G,i.value]]),l("p",{class:"mr-2",onClick:e[7]||(e[7]=t=>{v(),y.value=!0})},"Custom")])]),l("div",ve,[l("div",de,[l("div",pe,[l("p",null,u(D.value),1)]),l("div",he,[h.value?B("",!0):(w(),m("img",{key:0,onClick:e[8]||(e[8]=t=>v()),src:se,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})),h.value&&M.value?(w(),m("img",{key:1,onClick:e[9]||(e[9]=t=>v()),src:le,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})):B("",!0),h.value&&!M.value?(w(),m("img",{key:2,onClick:e[10]||(e[10]=t=>v()),src:ne,style:{"image-rendering":"pixelated"},class:"ml-auto mr-auto my-2 cursor-pointer"})):B("",!0)]),l("div",me,[l("p",null,u(i.value)+"x1",1)])]),l("div",we,[l("canvas",{onClick:e[11]||(e[11]=t=>O(t)),onContextmenu:e[12]||(e[12]=ee(t=>X(t),["prevent"])),class:"w-full",style:{"image-rendering":"pixelated"},width:"256",height:"16"},null,32)])])]),h.value?(w(),m("div",ge,[M.value?(w(),m("p",_e,"You won!")):(w(),m("p",be,"You lost...")),M.value?(w(),m("div",ye,[l("p",null,[L("Time: "),l("b",null,u(g.value/1e3),1),L(" sec")]),l("a",xe,"3BV: "+u(_.value),1),ke,l("a",Ce,"3BV/sec: "+u(Math.round(_.value/(g.value/1e3)*1e4)/1e4),1),l("p",null,"Clicks: "+u(k.value)+" + "+u(C.value),1),l("p",null,"Efficiency: "+u(Math.round(_.value/(k.value+C.value)*100*1e4)/1e4)+"%",1),l("p",null,"CL/s: "+u(Math.round((k.value+C.value)/(g.value/1e3)*1e4)/1e4),1),l("p",null,"Mine density: "+u(Math.round(r.value/i.value*100*1e4)/1e4)+"%",1),l("a",Me,"IOE: "+u(Math.round(_.value/(k.value+C.value)*1e4)/1e4),1),Ee,l("a",Be,"RQP: "+u(Math.round(g.value/1e3/_.value/(g.value/1e3)*1e4)/1e4),1),De])):B("",!0)])):B("",!0)]))}});export{$e as default};
