import { useState } from "react";
// import {Tile} from "./components/Tile";
import Tile from "./components/tile";
import "./App.css"
import aStar from "./Astar";

const random = [[1, 2, 3], [4, 5, 6], [7, 0, 8]];

function App() {
  const [board, setBoard] = useState(random)

  // setBoard()
  const moveTile = (i, j) => {
    console.log("moving tile: ", i, j)
    const newBoard = board.map(row => [...row]);
    if (i - 1 >= 0 && board[i - 1][j] === 0) {
      newBoard[i - 1][j] = board[i][j]
      newBoard[i][j] = 0
    } else if (j - 1 >= 0 && board[i][j - 1] === 0) {
      newBoard[i][j - 1] = board[i][j]
      newBoard[i][j] = 0
    } else if (i + 1 < 3 && board[i + 1][j] === 0) {
      newBoard[i + 1][j] = board[i][j]
      newBoard[i][j] = 0
    } else if (j + 1 < 3 && board[i][j + 1] === 0) {
      newBoard[i][j + 1] = board[i][j]
      newBoard[i][j] = 0
    } else {
      console.log("Invalid Move")
    }

    setBoard(newBoard)
  }

  // const getNextBoards = (board) => {
  //   const nextBoards = []
  //   // find '0'
  //   let i=0
  //   let j=0
  //   outer:for(let a=0; a<3; a++){
  //     for(let b=0; b<3; b++){
  //       if(board[a][b]===0){
  //         i=a
  //         j=b
  //         break outer
  //   }}}
  //   let newBoard = board.map(row => [...row])
  //   if(i-1>=0){
  //     newBoard[i][j]=board[i-1][j]
  //     newBoard[i-1][j]=0
  //     nextBoards.push(newBoard)
  //   }newBoard = board.map(row => [...row])
  //   if(j-1>=0){
  //     newBoard[i][j]=board[i][j-1]
  //     newBoard[i][j-1]=0
  //     nextBoards.push(newBoard)
  //   }newBoard = board.map(row => [...row])
  //   if(i+1<3){
  //     newBoard[i][j]=board[i+1][j]
  //     newBoard[i+1][j]=0
  //     nextBoards.push(newBoard)
  //   }newBoard = board.map(row => [...row])
  //   if(j+1<3){
  //     newBoard[i][j]=board[i][j+1]
  //     newBoard[i][j+1]=0
  //     nextBoards.push(newBoard)
  //   }
  //   return nextBoards
  // }

  // const getLeastHeuristic = (nextBoards) => {
  //   let ans=0
  //   let minH = 32
  //   nextBoards.forEach((board, boardIndex) => {
  //     let H = 0
  //     board.forEach((row, i) => {
  //       row.forEach((ele, j) => {
  //         H+=(Math.abs(ele/3-i)+Math.abs(ele%3-j))
  //       })
  //     })
  //     if(H<minH){
  //       H=minH
  //       ans=boardIndex
  //     }
  //   });
  //   return ans;
  // }

  const automate = () => {
    console.log("atomating")
    console.log("getting path")
    const path = aStar(board)
    if (path !== null) {
      console.log("path found, path length: ", path.length)
      console.log("simulating...")
      path.forEach(currState => {
        setTimeout(() => setBoard(currState), 1000)
      })
    }else{
      console.log("no solution found")
    }
  }

  return <div id="main">
    <h1 style={{ color: "whitesmoke" }}>8 Puzzle</h1>
    <div id="board">
      {board && board.map((row, rowIndex) => {
        return row.map((tileVal, colIndex) => {
          return (tileVal !== 0 && <Tile
            val={tileVal}
            i={rowIndex}
            j={colIndex}
            key={`${rowIndex}-${colIndex}`}
            onClick={() => { moveTile(rowIndex, colIndex) }}>
            {tileVal}
          </Tile>)
        })
      })};
    </div>
    <button
      onClick={() => automate()}
      style={{
        backgroundColor: "purple",
        color: "white"
      }}
    >Use AI</button>
  </div>
}

export default App;
