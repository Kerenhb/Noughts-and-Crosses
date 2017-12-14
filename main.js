import React from 'react';
import ReactDOM from 'react-dom';

const boxSize = 100;
function drawLine(x1, y1, x2, y2) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2}
strokeWidth="3" stroke="black"/>
}

const element = <svg 
width={3 * boxSize} height={3 * boxSize}>
    {drawLine(0, boxSize, 3 * boxSize, boxSize)}
    {drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
    {drawLine(boxSize, 0, boxSize, 3 * boxSize)}
    {drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}
</svg>

const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
