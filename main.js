import React from 'react';
import ReactDOM from 'react-dom';

class Symbol extends React.Component {
    shouldComponentUpdate () {
        return this.props.playing;
      };

    render() {
        const boxSize = this.props.scale;
        const padding = this.props.scale / 7;
        const strokeSize = this.props.scale / 30;
        const lineSize = this.props.scale / 25;
        const position = this.props.position;

        const drawCross = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <line x1={position[0] + padding}
                    y1={position[1] + padding}
                    x2={position[0] + boxSize - padding}
                    y2={position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke="red"/>

                    <line x1={position[0] + boxSize - padding}
                    y1={position[1] + padding}
                    x2={position[0] + padding}
                    y2={position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke="red"/>
                </svg>
            );
        };

        const drawCircle = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <circle cx={position[0] + boxSize/2}
                    cy={position[1] + boxSize/2}
                    r={boxSize/2 - padding}
                    strokeWidth={strokeSize} stroke="blue" fillOpacity="0"/>
                </svg>
            );
        };

        const drawNull = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}
                    onClick={() => {
                        this.props.mainClickHandler(
                            position[0] / boxSize,
                            position[1] / boxSize
                        );
                    }}>
                    <rect x={position[0] + lineSize / 2}
                    y={position[1] + lineSize / 2}
                    width={boxSize - lineSize} height={boxSize - lineSize}
                    fillOpacity="0"/>
                </svg>
            );
        };

        const isCross = this.props.isCross;
        // Draws only if visible, aka isCross != null
        return (
            isCross === null ? drawNull() :
            (isCross ? drawCross() : drawCircle()));
    };
}

class Slider extends React.Component {
    render () {
        return (<input
        type = "range"
        min={10} max={200} step={1}
        value={this.props.scale}
        onChange={event => {
            this.props.Eventhandler(event);
            }}>
        </input>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);

        this.state = {
            crossTurn: true, // Who goes first
            scale: 100, // Overall relative scale (100 is normal)
            playing: true, // has the game ended?
            gameState: [[null, null, null], [null, null, null], [null, null, null]],
        };
    }

    drawLine(x1, y1, x2, y2) {
        const scale = this.state.scale;
        return <line x1={x1} y1={y1} x2={x2} y2={y2}
        strokeWidth={scale / 25}
        stroke="black"/>
    }

    handleNullClick(x, y) {
        const crossTurn = this.state.crossTurn;
        const gameState = this.state.gameState;
        gameState[y][x] = crossTurn;
        this.setState({
            crossTurn: !crossTurn, // Change turn
            gameState: gameState, // update symbol
            playing: !this.hasWon(),
        });
    };

    hasWon() {
        const gameState = this.state.gameState;
        if (gameState[0][0] === gameState[1][1] && gameState[0][0]  === gameState[2][2] && gameState[0][0] != null)
            return true
        if (gameState[2][0] === gameState[1][1] && gameState[0][2]  === gameState[0][2] && gameState[2][0] != null)
            return true
        for (let i = 0; i < 3; i++) {
            if (gameState[0][i] === gameState[1][i] && gameState[0][i] === gameState[2][i] && gameState[0][i] != null)
                return true
            if (gameState[i][0] === gameState[i][1] && gameState[i][0] === gameState[i][2] && gameState[i][0] != null)
                return true
        }
        return false
    }

    sliderHandler(event) {
        const scale = Number(event.target.value);
        this.setState({scale: scale});
    }

    render () {
        const scale = this.state.scale;
        const boxSize = this.state.scale; // Size of each space
        const crossTurn = this.state.crossTurn;
        const playing = this.state.playing;
        const gameState = this.state.gameState;

        return (
            <div>
                <svg width={3 * boxSize} height={3 * boxSize}>
                    {this.drawLine(0, boxSize, 3 * boxSize, boxSize)}
                    {this.drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
                    {this.drawLine(boxSize, 0, boxSize, 3 * boxSize)}
                    {this.drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}

                    <Symbol
                        scale = {scale}
                        position = {[0, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[0][0]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[0][1]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[0][2]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[0, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[1][0]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[1][1]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[1][2]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[0, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[2][0]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[2][1]}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                        playing = {playing}
                        isCross = {gameState[2][2]}
                    />
                </svg>

                <br />
                <Slider
                    Eventhandler = {this.sliderHandler}
                    scale = {scale}
                ></Slider>
            </div>
        );
    }
}

const element = <Game />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
