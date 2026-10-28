const ROUNDS=7,START=1000,DRAIN=40; // DRAIN = points lost per second
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={
  get(k){try{return localStorage.getItem(k)}catch(e){return null}},
  set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
};
let deck,idx,total,hits,startT,raf,locked,cur,player;

const show=id=>['start','game','end'].forEach(x=>$(x).classList.toggle('hide',x!==id));
$('pName').value=store.get('roa_name')||'';
$('pId').value=store.get('roa_id')||'';
$('go').onclick=begin;
$('pId').addEventListener('keydown',e=>{if(e.key==='Enter')begin()});
$('bReal').onclick=()=>answer('real');
$('bAi').onclick=()=>answer('ai');
$('next').onclick=nextQ;
$('again').onclick=()=>show('start');

function begin(){
  const name=$('pName').value.trim(),id=$('pId').value.trim();
  if(!name||!id){$('err').textContent='Enter both your name and your ID.';return}
  $('err').textContent='';
  player={name,id};store.set('roa_name',name);store.set('roa_id',id);
  $('who').textContent=name+' · '+id;
  deck=[...QUESTIONS].sort(()=>Math.random()-.5).slice(0,ROUNDS);
  idx=-1;total=0;hits=0;$('tot').textContent=0;
  show('game');nextQ();
}

const pts=()=>Math.max(0,Math.round(START-(performance.now()-startT)/1000*DRAIN));

function nextQ(){
  idx++;
  if(idx>=deck.length)return finish();
  cur=deck[idx];locked=false;
  $('qn').textContent='Q '+(idx+1)+'/'+deck.length;
  const ph=$('photo');ph.className='photo';
  ph.innerHTML=cur.img?'<img src="'+esc(cur.img)+'" alt="">':'<div class="ph">Photo goes here<br>(add link in data.js)</div>';
  ['bReal','bAi'].forEach(b=>{$(b).disabled=false;$(b).classList.remove('ok','bad')});
  $('fb').className='fb';$('fb').innerHTML='';$('next').classList.add('hide');
  startT=performance.now();cancelAnimationFrame(raf);tick();
}

function tick(){
  const p=pts();
  $('pts').textContent=p;$('fill').style.width=(p/START*100)+'%';
  if(p<=0&&!locked)return answer(null);
  if(!locked)raf=requestAnimationFrame(tick);
}

function answer(choice){
  if(locked)return;locked=true;cancelAnimationFrame(raf);
  const ok=choice===cur.answer,gain=ok?pts():0;
  total+=gain;if(ok)hits++;
  // flash
  const f=document.createElement('div');f.className='flash '+(ok?'g':'r');
  document.body.appendChild(f);setTimeout(()=>f.remove(),800);
  // buttons + photo
  $('bReal').disabled=$('bAi').disabled=true;
  $(cur.answer==='real'?'bReal':'bAi').classList.add('ok');
  if(choice&&!ok)$(choice==='real'?'bReal':'bAi').classList.add('bad');
  const ph=$('photo');ph.classList.add(cur.answer);
  ph.insertAdjacentHTML('beforeend','<span class="tag">'+cur.answer.toUpperCase()+'</span>');
  // feedback
  $('fb').className='fb '+(ok?'g':'r');
  $('fb').innerHTML='<b>'+(ok?'CORRECT +'+gain:choice?'WRONG':"TIME'S UP")+'</b>'+esc(cur.note||'');
  countTo($('tot'),total-gain,total,600);
  $('next').textContent=idx===deck.length-1?'SEE RESULTS':'NEXT';
  $('next').classList.remove('hide');
}

function countTo(el,a,b,d){
  const s=performance.now();
  (function f(n){const k=Math.min(1,(n-s)/d);el.textContent=Math.round(a+(b-a)*k);if(k<1)requestAnimationFrame(f)})(s);
}

function finish(){
  show('end');
  const pc=total/(ROUNDS*START);
  countTo($('fin'),0,total,1200);
  $('rank').innerHTML=esc(player.name)+' <small>('+esc(player.id)+')</small><br>'+hits+'/'+ROUNDS+' correct · '+
    (pc>.8?'🔥 AI Detector Legend':pc>.55?'⚡ Sharp Eyes':pc>.3?'🤔 Getting There':'🤖 The AI fooled you');
  let lb=[];
  try{lb=JSON.parse(store.get('roa_lb')||'[]')}catch(e){}
  lb.push({name:player.name,id:player.id,score:total});
  lb.sort((a,b)=>b.score-a.score);lb=lb.slice(0,10);
  store.set('roa_lb',JSON.stringify(lb));
  $('lb').innerHTML=lb.map((e,i)=>'<div><span>'+(i+1)+'. '+esc(e.name)+' <small>'+esc(e.id)+'</small></span><b>'+e.score+'</b></div>').join('');
}
