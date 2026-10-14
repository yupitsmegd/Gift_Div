'use strict';
const cfg = window.WISH_CONFIG;
const $ = id => document.getElementById(id);
const visited = new Set();
const scatter = [[13,24],[40,12],[73,16],[90,38],[60,36],[31,44],[10,64],[46,69],[78,68],[64,90]];
const heart = [[50,25],[32,12],[12,28],[17,53],[33,73],[50,90],[67,73],[83,53],[88,28],[68,12]];
let formed = false, birthdayShown = false, still = matchMedia('(prefers-reduced-motion: reduce)').matches;
let meteorTimers = [];
const birthdayTime = Date.parse(cfg.birthday);
const pad = n => String(n).padStart(2,'0');
function renderMotion(){ document.body.classList.toggle('still',still); $('motion').textContent=still?'Resume motion':'Pause motion'; $('motion').setAttribute('aria-pressed',String(still)); }
renderMotion();
$('motion').onclick=()=>{still=!still;renderMotion();if(still){meteorTimers.forEach(clearTimeout);document.querySelectorAll('.meteor').forEach(n=>n.remove());}paint();};
function shower(count=32){
  if(still) return;
  meteorTimers.forEach(clearTimeout);meteorTimers=[];
  for(let i=0;i<count;i++) meteorTimers.push(setTimeout(()=>{
    if(still)return;
    const star=document.createElement('i');star.className='meteor';star.style.left=(25+Math.random()*100)+'vw';star.style.top=(-20+Math.random()*50)+'vh';document.body.append(star);setTimeout(()=>star.remove(),2100);
  },i*150));
}
function formHeart(){
  if(formed)return;formed=true;
  document.querySelectorAll('.star').forEach((star,i)=>{star.style.left=heart[i][0]+'%';star.style.top=heart[i][1]+'%';});
  $('heart-line').setAttribute('d',heart.map((p,i)=>(i?'L':'M')+p.join(',')).join(' ')+' Z');
  setTimeout(()=>{$('constellation').classList.add('complete');$('heart-note').hidden=false;shower(1);},still?0:2800);
}
function closeMemory(){ $('memory').close(); if(visited.size===10) formHeart(); }
cfg.stars.slice(0,10).forEach((note,i)=>{
  const star=document.createElement('button');star.className='star';star.style.left=scatter[i][0]+'%';star.style.top=scatter[i][1]+'%';star.setAttribute('aria-label',`Open star ${i+1}: ${note.title}`);star.setAttribute('aria-pressed','false');
  const spark=document.createElement('span');spark.className='spark';spark.textContent='✦';spark.setAttribute('aria-hidden','true');const number=document.createElement('small');number.textContent=pad(i+1);star.append(spark,number);
  star.onclick=()=>{visited.add(i);star.classList.add('lit');star.setAttribute('aria-pressed','true');$('progress').textContent=`${pad(visited.size)} / 10 LITTLE SECRETS FOUND`;$('memory-number').textContent=`A LITTLE REASON · ${pad(i+1)}`;$('memory-title').textContent=note.title;$('memory-text').textContent=note.text;$('memory').showModal();};
  $('constellation').append(star);
});
$('back').onclick=closeMemory;$('memory').querySelector('.close').onclick=closeMemory;
$('memory').addEventListener('cancel',e=>{e.preventDefault();closeMemory();});
$('memory').addEventListener('click',e=>{if(e.target===$('memory')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeMemory();}});
function celebrate(){
  if($('memory').open)closeMemory();
  $('birthday-message').textContent=cfg.message;
  if(!$('birthday').open)$('birthday').showModal();
  shower();
}
function tick(now=Date.now()){
  const remaining=Math.max(0,Math.ceil((birthdayTime-now)/1000));
  $('days').textContent=pad(Math.floor(remaining/86400));$('hours').textContent=pad(Math.floor(remaining/3600)%24);$('minutes').textContent=pad(Math.floor(remaining/60)%60);$('seconds').textContent=pad(remaining%60);
  if(now>=birthdayTime&&!birthdayShown){birthdayShown=true;$('clock-label').textContent='THE WAIT IS OVER. HAPPY BIRTHDAY, MY LOVE.';$('replay').hidden=false;celebrate();}
}
$('birthday-back').onclick=()=>$('birthday').close();$('birthday').querySelector('.close').onclick=()=>$('birthday').close();$('replay').onclick=celebrate;
tick();setInterval(()=>tick(),1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)tick();});window.addEventListener('focus',()=>tick());
cfg.photos.slice(0,3).forEach((photo,i)=>{
  const figure=document.createElement('figure');figure.className='photo';const img=document.createElement('img');img.alt=photo.alt;img.loading='lazy';
  const placeholder=document.createElement('div');placeholder.className='placeholder';const symbol=document.createElement('span');symbol.textContent='✧';const label=document.createElement('div');label.textContent=['A moment, suspended.','A page from our story.','A little forever.'][i];placeholder.append(symbol,label);placeholder.hidden=true;
  img.onerror=()=>{img.hidden=true;placeholder.hidden=false;};img.src=photo.src;
  const caption=document.createElement('figcaption');caption.textContent=photo.caption;figure.append(img,placeholder,caption);$('gallery').append(figure);
});
const video=$('memory-video');video.hidden=true;video.addEventListener('loadedmetadata',()=>{video.hidden=false;$('video-placeholder').hidden=true;});video.addEventListener('error',()=>{video.hidden=true;$('video-placeholder').hidden=false;});video.src=cfg.video;
// Procedural star field: no image downloads, fonts, libraries or API keys.
const canvas=$('sky'),ctx=canvas.getContext('2d');let points=[],width=0,height=0;
function resize(){width=innerWidth;height=innerHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=width*dpr;canvas.height=height*dpr;canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);points=Array.from({length:Math.min(240,Math.round(width*height/4500))},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.1+.2,phase:Math.random()*7}));paint();}
function paint(time=0){ctx.clearRect(0,0,width,height);points.forEach(p=>{ctx.globalAlpha=still?.42:.25+(Math.sin(time/1800+p.phase)+1)*.18;ctx.fillStyle='#e7d7b4';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();});ctx.globalAlpha=1;}
function animate(time){if(!still&&!document.hidden)paint(time);requestAnimationFrame(animate);}addEventListener('resize',resize);resize();requestAnimationFrame(animate);
