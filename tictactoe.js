const DESC={normal:'Makes mistakes. You can win.',hard:'Rarely slips up.',extreme:'Perfect minimax. Best you can do is draw.'};
const $=id=>document.getElementById(id);
let level='normal',board=Array(9).fill(null),turn='X',score={w:0,l:0,d:0},timer=null;

const grid=$('grid');
for(let i=0;i<9;i++){
  const b=document.createElement('button');
  b.className='sq';b.onclick=()=>humanMove(i);grid.appendChild(b);
}
const cells=[...grid.children];

function over(){const r=winner(board);return !!r.w||r.draw}

function render(){
  const r=winner(board);
  document.querySelectorAll('.lvl').forEach(b=>b.classList.toggle('on',b.dataset.l===level));
  $('desc').textContent=DESC[level];
  $('w').textContent=score.w;$('d').textContent=score.d;$('l').textContent=score.l;
  cells.forEach((el,i)=>{
    el.textContent=board[i]||'';
    el.className='sq'+(board[i]?' '+board[i]:'')+(r.line.includes(i)?(r.w==='X'?' winG':' winR'):'');
  });
  const st=$('status');
  st.textContent=r.w==='X'?'🎉 YOU WIN!':r.w==='O'?'🤖 AI WINS':r.draw?'🤝 DRAW':turn==='X'?'Your turn (X)':'AI thinking…';
  st.className='status '+(r.w==='X'?'g':r.w==='O'?'r':'');
  $('again').classList.toggle('hide',!over());
}

function place(i,p){
  board[i]=p;turn=p==='X'?'O':'X';
  const r=winner(board);
  if(r.w==='X')score.w++;else if(r.w==='O')score.l++;else if(r.draw)score.d++;
  render();
  if(turn==='O'&&!over())timer=setTimeout(()=>place(aiMove(board,level),'O'),500);
}

function humanMove(i){
  if(over()||turn!=='X'||board[i])return;
  place(i,'X');
}

function reset(){clearTimeout(timer);board=Array(9).fill(null);turn='X';render()}

document.querySelectorAll('.lvl').forEach(b=>b.onclick=()=>{level=b.dataset.l;score={w:0,l:0,d:0};reset()});
$('again').onclick=reset;
render();
