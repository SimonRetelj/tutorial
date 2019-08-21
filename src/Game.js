import React from "react";
import Board from "./Board";
import "./Game.css";

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          position: [0,0]
        }],
        stepNumber: 0,
        xIsNext: true,
        toggle: false
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          position: this.checkPosition(i)
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
    checkPosition(i) {
        let row = Math.floor(i/3) +1;
        let column = (i%3) +1;
        return([column, row]);
        
    }
    reverseMoves() {
        this.setState({...this.state, toggle: !this.state.toggle})
    }
    
    render() {
        let winnerSquares = null;
        const {toggle, history, stepNumber} = this.state;
        const current = history[stepNumber];
        const winner = calculateWinner(current.squares);
        let desc = "Go to game start";
        const moves = history.map((step, move) =>{ 
            if(move && move === stepNumber){
                desc = <strong>{`Go to move #${move} (${step.position[0]}, ${step.position[1]})`}</strong>; 
            } else if(move){
                desc = `Go to move #${move} (${step.position[0]}, ${step.position[1]})`;
            }
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = `Winner: ${winner[0]}`;
            winnerSquares = winner[1];
        } else if (stepNumber === 9){
            status = "Nobody wins, it's a draw";
        } else {
            status = `Next player:  ${(this.state.xIsNext ? 'X' : 'O')}`;
        }
        return (
            <div className="game">
            <div className="game-board">
                <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                win={winnerSquares}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <button className="reverse-button" onClick={() => this.reverseMoves()}>Reverse order</button>
                {toggle ? <ol reversed>{moves.reverse()}</ol>: <ol>{moves}</ol>}
            </div>
            </div>
        );
    }
}

export default Game;

function calculateWinner(squares) {
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
        return [squares[a],[a,b,c]];
      }
    }
    return null;
}