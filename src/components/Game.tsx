import { useState } from "react";
import { IHistoryBoard } from "../interfaces";
import Board from "./Board";

const Game = (): JSX.Element => {

  const [historyBoard, setHistoryBoard] = useState<IHistoryBoard[]>([{ squares: Array(9).fill('') }]);
  const [stepNumber, setStepNumber] = useState<number>(0)
  const [xIsNext, setXisNext] = useState<boolean>(true);

  const handleClick = (i: number) => {
      const copyHistoryBoard: IHistoryBoard[] = historyBoard.slice(0, stepNumber + 1);
      const currentBoard: IHistoryBoard = copyHistoryBoard[copyHistoryBoard.length - 1];
      const squares: string[] = currentBoard.squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    
    setHistoryBoard(copyHistoryBoard.concat([{ squares: squares }]));
    setStepNumber(copyHistoryBoard.length);
    setXisNext(!xIsNext);
  }

  const jumpTo = (step: number) => {
      setStepNumber(step);
      setXisNext((step % 2) === 0);
  }

  const currentBoard: IHistoryBoard = historyBoard[stepNumber];
  const winner = calculateWinner(currentBoard.squares);

  const moves = historyBoard.map((step, move) => {
  const desc = move
    ? "Revenir au tour n°" + move
    : "Revenir au début de la partie";
        return (
          <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>
        );
      });

  let status;
    if (winner) {
      status = winner + ' a gagné';
    } else {
      status = 'Prochain joueur : ' + (xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">   
        <Board
            squares = {currentBoard.squares}
            onClick = {(i:number) => handleClick(i)}
          />
        </div>
        <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  
  const calculateWinner = (squares: string[]): any => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default Game;