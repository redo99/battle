import React from 'react';
import ReactDOM from 'react-dom';
import Game from './component/Game';

export default function init(node) {
  ReactDOM.render(<Game />, node);
}
