import React from 'react';
import ReactDOM from 'react-dom';

class Symbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCross: null}; // Each symbol is either: blank, cross or a circle
    };

    render() {
        const padding = 15;
        const boxSize = this.props.boxSize;
        const drawCross = () => {
            return (
                    <svg width={3 * boxSize} height={3 * boxSize}>
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

        const drawCircle = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
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
                onClick={() => this.props.clickHandler()}>
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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);

        this.state = {
            crossTurn: true,
            boxSize: 100 // Size of each spot in the grid
        };
    }

    drawLine(x1, y1, x2, y2) {
        return <line x1={x1} y1={y1} x2={x2} y2={y2}
        strokeWidth="4" stroke="black"/>
    }

    handleNullClick() {
        const crossTurn = this.state.crossTurn;
        this.setState({crossTurn: !crossTurn}); // Change turn
    };

    render () {
        const boxSize = this.state.boxSize;

        return (
            <svg width={3 * boxSize} height={3 * boxSize}>
                {this.drawLine(0, boxSize, 3 * boxSize, boxSize)}
                {this.drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
                {this.drawLine(boxSize, 0, boxSize, 3 * boxSize)}
                {this.drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}

                <Symbol
                    boxSize = {boxSize}
                    position = {[0, 0]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[boxSize, 0]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[2 * boxSize, 0]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[0, boxSize]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[boxSize, boxSize]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[2 * boxSize, boxSize]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[0, 2 * boxSize]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[boxSize, 2 * boxSize]}
                    clickHandler = {this.handleNullClick}
                />
                <Symbol
                    boxSize = {boxSize}
                    position = {[2 * boxSize, 2 * boxSize]}
                    clickHandler = {this.handleNullClick}
                />
            </svg>
        );
    }
}

const element = <Game />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
