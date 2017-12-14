import React from 'react';
import ReactDOM from 'react-dom';

const boxSize = 100;

const element = <svg 
width={3 * boxSize} height={3 * boxSize}>
<line x1="0" y1={boxSize} x2={3 * boxSize} y2={boxSize}
  strokeWidth="3" stroke="black"/>
</svg>

const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
