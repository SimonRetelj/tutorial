import React from "react";
import Square from "./Square";


class Board extends React.Component {
    renderSquare(i, win) {
      return (
        <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            winner={win}
        />
      );
    }
    render() {
        let output = [];
        for(let i = 0; i < 3; i++){
            let sq = [];
            for(let j = i*3; j < i*3+3; j++){
                 if(this.props.win && this.props.win.includes(j)){
                    sq.push(this.renderSquare(j, true))
                } else {
                    sq.push(this.renderSquare(j, false));
                }
            }
            output.push(<div key={i} className="board-row">{sq}</div>);
        }

        return (
            <div>
                {output}
            </div>
        );
    }
}

export default Board;

