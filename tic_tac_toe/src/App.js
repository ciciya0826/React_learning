import { useState } from "react"

function Square({value,onhandleClick}){
  return <button className="square" onClick={onhandleClick}>
            {value}
          </button>
}

function Board({xIsNext,squares,onPlay}) {
  function handleclick(i){
    //判断这个方块上有没有落子+有没有人胜出
    if(squares[i] || calculateWinner(squares))  return;
    //修改方块中的数值
    const nextSquares=squares.slice();
      if(xIsNext){
        nextSquares[i]='X'
      }else{
        nextSquares[i]='O'
      }
    onPlay(nextSquares)
  }
  //是否有人胜出+下一个落子者
  const winner=calculateWinner(squares);
  let status;
  if(winner){
    status = 'Winner:'+ winner;
  }else{
    status = 'Next palyer:' + (xIsNext ? 'X' : 'O')
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onhandleClick={()=>handleclick(0)}></Square>
        <Square value={squares[1]} onhandleClick={()=>handleclick(1)}></Square>
        <Square value={squares[2]} onhandleClick={()=>handleclick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onhandleClick={()=>handleclick(3)}></Square>
        <Square value={squares[4]} onhandleClick={()=>handleclick(4)}></Square>
        <Square value={squares[5]} onhandleClick={()=>handleclick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onhandleClick={()=>handleclick(6)}></Square>
        <Square value={squares[7]} onhandleClick={()=>handleclick(7)}></Square>
        <Square value={squares[8]} onhandleClick={()=>handleclick(8)}></Square>
      </div>
    </>
  )
}

export default function Game(){
  const[history,setHistory]=useState([Array(9).fill(null)]);
  const[xIsNext,setXIsNext]=useState(true)
  const currentSquares = history[history.length-1]

  //状态提升
  function handlePlay(nextSquares){
    setHistory([...history,nextSquares])
    setXIsNext(!xIsNext);
  }

  return(
    <div className="game">
      <div className="game-board">
        {/*从这里把xIsNext,squares和onPlay传给Board*/}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/> 
      </div>
      <div className="game-info">

      </div>
    </div>
  )
}


  //判断赢家
  function calculateWinner(squares){
    const lines=[
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let i=0;i<lines.length;i++){
      const[a,b,c]=lines[i]
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){
        return squares[a]
      }
    }
    return null;
  }