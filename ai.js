/* Tic Tac Toe AI: minimax with alpha-beta pruning. AI = 'O', human = 'X'. */
const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function winner(b){
  for(const l of LINES){
    const [a,c,d]=l;
    if(b[a]&&b[a]===b[c]&&b[a]===b[d])return{w:b[a],line:l,draw:false};
  }
  return{w:null,line:[],draw:b.every(Boolean)};
}

function minimax(b,aiTurn,depth,alpha,beta){
  const r=winner(b);
  if(r.w==='O')return 10-depth;   // faster wins score higher
  if(r.w==='X')return depth-10;   // slower losses score higher
  if(r.draw)return 0;
  let best=aiTurn?-Infinity:Infinity;
  for(let i=0;i<9;i++){
    if(b[i])continue;
    b[i]=aiTurn?'O':'X';
    const s=minimax(b,!aiTurn,depth+1,alpha,beta);
    b[i]=null;
    if(aiTurn){best=Math.max(best,s);alpha=Math.max(alpha,s)}
    else{best=Math.min(best,s);beta=Math.min(beta,s)}
    if(beta<=alpha)break;
  }
  return best;
}

function bestMove(b){
  let top=-Infinity,moves=[];
  for(let i=0;i<9;i++){
    if(b[i])continue;
    b[i]='O';
    const s=minimax(b,false,1,-Infinity,Infinity);
    b[i]=null;
    if(s>top){top=s;moves=[i]}else if(s===top)moves.push(i);
  }
  return moves[Math.floor(Math.random()*moves.length)];
}

/* chance the AI plays the perfect move; otherwise a random square */
const SMARTNESS={normal:0.3,hard:0.8,extreme:1};

function aiMove(board,level){
  const b=[...board];
  if(Math.random()<SMARTNESS[level])return bestMove(b);
  const empty=b.map((c,i)=>c?-1:i).filter(i=>i>=0);
  return empty[Math.floor(Math.random()*empty.length)];
}
