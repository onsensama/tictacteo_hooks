import React from 'react';
import { SquareProps } from '../interfaces';


function Square({ onClick, value }: SquareProps): JSX.Element {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;