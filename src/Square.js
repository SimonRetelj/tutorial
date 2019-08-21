import React from "react";

function Square(props) {
    let name = "square";
    if(props.winner){
        name += " winner";
    }
    return (
      <button className={name} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

export default Square;