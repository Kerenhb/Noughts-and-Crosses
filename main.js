import React from 'react';
import ReactDOM from 'react-dom';

let crossTurn = true;
const boxSize = 100;
function drawLine(x1, y1, x2, y2) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2}
strokeWidth="4" stroke="black"/>
}

class Symbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCross: null};
    };

    handleNullClick() {
        this.setState({isCross: crossTurn});
        crossTurn = !crossTurn;
    };

    render() {
        const padding = 15;
        const drawCross = isCross => {
            return (
                    <svg width={3 * boxSize} height={3 * boxSize}>
                        <rect x={this.props.position[0] + 2}
                        y={this.props.position[1] + 2}
                        width={boxSize - 4} height={boxSize - 4}
                        fillOpacity="0"/>

                        <line x1={this.props.position[0] + padding}
                        y1={this.props.position[1] + padding}
                        x2={this.props.position[0] + boxSize - padding}
                        y2={this.props.position[1] + boxSize - padding}
                        strokeWidth="3" stroke="red"/>

                        <line x1={this.props.position[0] + boxSize - padding}
                        y1={this.props.position[1] + padding}
                        x2={this.props.position[0] + padding}
                        y2={this.props.position[1] + boxSize - padding}
                        strokeWidth="3" stroke="red"/>
                    </svg>
                );
        };

        const drawCircle = isCross => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <rect x={this.props.position[0] + 2}
                    y={this.props.position[1] + 2}
                    width={boxSize - 4} height={boxSize - 4}
                    fillOpacity="0"/>

                    <circle cx={this.props.position[0] + boxSize/2}
                    cy={this.props.position[1] + boxSize/2}
                    r={boxSize/2 - padding}
                    strokeWidth="3" stroke="blue" fillOpacity="0"/>
                </svg>
            );
        };

        const drawNull = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}
                onClick={() => this.handleNullClick()}>
                    <rect x={this.props.position[0] + 2}
                    y={this.props.position[1] + 2}
                    width={boxSize - 4} height={boxSize - 4}
                    fillOpacity="0"/>
                </svg>
            );
        };

        const isCross = this.state.isCross;
        // Draws only if visible, aka isCross != null
        return (
            isCross === null ? drawNull() :
            (isCross ? drawCross() : drawCircle()));
    };
}

const grid = <svg width={3 * boxSize} height={3 * boxSize}>
    {drawLine(0, boxSize, 3 * boxSize, boxSize)}
    {drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
    {drawLine(boxSize, 0, boxSize, 3 * boxSize)}
    {drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}

    <Symbol position = {[0, 0]} />
    <Symbol position = {[boxSize, 0]} />
    <Symbol position = {[2 * boxSize, 0]} />

    <Symbol position = {[0, boxSize]} />
    <Symbol position = {[boxSize, boxSize]} />
    <Symbol position = {[2 * boxSize, boxSize]} />

    <Symbol position = {[0, 2 * boxSize]} />
    <Symbol position = {[boxSize, 2 * boxSize]} />
    <Symbol position = {[2 * boxSize, 2 * boxSize]} />
</svg>

const rootElement = document.getElementById('root');
ReactDOM.render(grid, rootElement)
