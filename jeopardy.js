const ROUNDS=8,TIME=20; // tiles per game, seconds for a clue's points to hit 0
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={
  get(k){try{return localStorage.getItem(k)}catch(e){return null}},
  set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
};
let used,picked,total,hits,cur,startT,raf,locked,player;

const show=id=>['start','play','end'].forEach(x=>$(x).classList.toggle('hide',x!==id));
$('pName').value=store.get('jp_name')||'';
$('pId').value=store.get('jp_id')||'';
$('go').onclick=begin;
$('pId').addEventListener('keydown',e=>{if(e.key==='Enter')begin()});
$('again').onclick=()=>show('start');
$('next').onclick=backToBoard;

function begin(){
  const name=$('pName').value.trim(),id=$('pId').value.trim();
  if(!name||!id){$('err').textContent='Enter both your name and your ID.';return}
  $('err').textContent='';
  player={name,id};store.set('jp_name',name);store.set('jp_id',id);
  $('who').textContent=name+' · '+id;
  used=new Set();picked=0;total=0;hits=0;$('tot').textContent=0;
  show('play');buildBoard();
}

function buildBoard(){
  $('boardView').classList.remove('hide');$('clueView').classList.add('hide');
  $('qn').textContent='Tile '+Math.min(picked+1,ROUNDS)+'/'+ROUNDS;
  $('hint').textContent='Pick a tile';
  let h=CATS.map(c=>'<div class="cat">'+esc(c.name)+'</div>').join('');
  for(let r=0;r<5;r++)for(let c=0;c<CATS.length;c++){
    const k=c+'-'+r;
    h+='<button class="tile" data-c="'+c+'" data-r="'+r+'"'+(used.has(k)?' disabled':'')+'>'+CATS[c].clues[r][0]+'</button>';
  }
  $('board').innerHTML=h;
  $('board').querySelectorAll('.tile').forEach(t=>t.onclick=()=>openClue(+t.dataset.c,+t.dataset.r));
}

function openClue(c,r){
  used.add(c+'-'+r);picked++;locked=false;
  const [v,q,a,w]=CATS[c].clues[r];
  cur={v,a,opts:[a,...w].sort(()=>Math.random()-.5)};
  $('boardView').classList.add('hide');$('clueView').classList.remove('hide');
  $('qn').textContent='Tile '+picked+'/'+ROUNDS;
  $('cname').textContent=CATS[c].name+' · '+v;
  $('ctext').textContent=q;
  $('opts').innerHTML=cur.opts.map((o,i)=>'<button class="opt" data-i="'+i+'">'+esc(o)+'</button>').join('');
  $('opts').querySelectorAll('.opt').forEach(b=>b.onclick=()=>answer(+b.dataset.i));
  $('fb').className='fb';$('fb').innerHTML='';$('next').classList.add('hide');
  startT=performance.now();cancelAnimationFrame(raf);tick();
}

const pts=()=>Math.max(0,Math.round(cur.v*(1-(performance.now()-startT)/1000/TIME)));

function tick(){
  const p=pts();
  $('pts').textContent=p;$('fill').style.width=(p/cur.v*100)+'%';
  if(p<=0&&!locked)return answer(null);
  if(!locked)raf=requestAnimationFrame(tick);
}

function answer(i){
  if(locked)return;locked=true;cancelAnimationFrame(raf);
  const picks=i===null?null:cur.opts[i],ok=picks===cur.a;
  const gain=ok?pts():(picks===null?0:-Math.round(cur.v/2));
  total+=gain;if(ok)hits++;
  const f=document.createElement('div');f.className='flash '+(ok?'g':'r');
  document.body.appendChild(f);setTimeout(()=>f.remove(),800);
  $('opts').querySelectorAll('.opt').forEach((b,k)=>{
    b.disabled=true;
    if(cur.opts[k]===cur.a)b.classList.add('ok');
    else if(k===i)b.classList.add('bad');
  });
  $('fb').className='fb '+(ok?'g':'r');
  $('fb').innerHTML='<b>'+(ok?'CORRECT +'+gain:picks===null?"TIME'S UP":'WRONG '+gain)+'</b>'+(ok?'':'Answer: '+esc(cur.a));
  countTo($('tot'),total-gain,total,600);
  $('next').textContent=picked>=ROUNDS?'SEE RESULTS':'BACK TO BOARD';
  $('next').classList.remove('hide');
}

function backToBoard(){picked>=ROUNDS?finish():buildBoard()}

function countTo(el,a,b,d){
  const s=performance.now();
  (function f(n){const k=Math.min(1,(n-s)/d);el.textContent=Math.round(a+(b-a)*k);if(k<1)requestAnimationFrame(f)})(s);
}

function finish(){
  show('end');
  countTo($('fin'),0,total,1200);
  const pc=hits/ROUNDS;
  $('rank').innerHTML=esc(player.name)+' <small>('+esc(player.id)+')</small><br>'+hits+'/'+ROUNDS+' correct · '+
    (pc>=.88?'🏆 IEEE Fellow material':pc>=.63?'⚡ Senior Member':pc>=.38?'🔧 Rising Engineer':'📚 Time to study');
  let lb=[];
  try{lb=JSON.parse(store.get('jp_lb')||'[]')}catch(e){}
  lb.push({name:player.name,id:player.id,score:total});
  lb.sort((a,b)=>b.score-a.score);lb=lb.slice(0,10);
  store.set('jp_lb',JSON.stringify(lb));
  $('lb').innerHTML=lb.map((e,i)=>'<div><span>'+(i+1)+'. '+esc(e.name)+' <small>'+esc(e.id)+'</small></span><b>'+e.score+'</b></div>').join('');
}
