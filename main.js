import React from 'react';
import ReactDOM from 'react-dom';

class Symbol extends React.Component {
    render() {
        const boxSize = this.props.scale;
        const padding = this.props.scale / 7;
        const strokeSize = this.props.scale / 30;
        const lineSize = this.props.scale / 25;
        const position = this.props.position; // Top left x and y coords

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

        const drawNull = () => { // Draws an invisible clickable square to later become an X or O
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

class Slider extends React.Component { // To change size of game
    render () {
        return (<input
        type = "range"
        min={40} max={340} step={1}
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
            scale: 200, // Overall relative scale (100 is normal)
            playing: true, // has the game ended?
            gameState: [[null, null, null], [null, null, null], [null, null, null]],
            winLineParams: [null, null, null, null],
            xScore: 0,
            oScore: 0,
        };
    }

    drawLine(params) {
        const scale = this.state.scale;
        return <line x1={params[0]} y1={params[1]} x2={params[2]} y2={params[3]}
        strokeWidth={scale / 25}
        stroke="black"/>
    }

    handleNullClick(x, y) {
        const crossTurn = this.state.crossTurn;
        const gameState = this.state.gameState;

        if (this.state.playing) {
            gameState[y][x] = crossTurn;
            this.setState({
                crossTurn: !crossTurn, // Change turn
                gameState: gameState, // update symbol
                playing: !this.hasWon(),
            });
        }
    };

    hasWon() {
        const gameState = this.state.gameState;
        if (gameState[0][0] === gameState[1][1] && gameState[0][0]  === gameState[2][2] && gameState[0][0] != null) {
            this.setState({winLineParams: [0, 0, 3, 3]});
            this.incrementScore()
            return true
        }
        if (gameState[2][0] === gameState[1][1] && gameState[2][0]  === gameState[0][2] && gameState[2][0] != null) {
            this.setState({winLineParams: [3, 0, 0, 3]});
            this.incrementScore()
            return true
        }
        for (let i = 0; i < 3; i++) {
            if (gameState[0][i] === gameState[1][i] && gameState[0][i] === gameState[2][i] && gameState[0][i] != null) {
                this.setState({winLineParams: [1/2 + i, 0, 1/2 + i, 3]});
                this.incrementScore()
                return true
            }
            if (gameState[i][0] === gameState[i][1] && gameState[i][0] === gameState[i][2] && gameState[i][0] != null) {
                this.setState({winLineParams: [0, 1/2 + i, 3, 1/2 + i]});
                this.incrementScore()
                return true
            }
        }
        return false
    }

    incrementScore() {
        if (this.state.crossTurn) // X won (called before crossTurn changes again)
        {
            this.setState({xScore: this.state.xScore += 1});
        }
        else // o won
        {
            this.setState({oScore: this.state.oScore += 1});
        }
    }

    sliderHandler(event) {
        const scale = Number(event.target.value);
        this.setState({scale: scale});
    }

    drawSymbols() { // Dynamically create all the symbols
        const scale = this.state.scale;
        const crossTurn = this.state.crossTurn;
        const gameState = this.state.gameState;
        let element = [];

        for (let i = 0; i < 9; i++) {
            element[i] = {X: Math.floor(i/3), Y: i % 3};
        }

        return element.map((element, index) => (
            <Symbol
            scale = {scale}
            position = {[element.Y * scale, element.X * scale]}
            mainClickHandler = {this.handleNullClick}
            crossTurn = {crossTurn}
            isCross = {gameState[element.X] [element.Y]}
            key = {index}
            />
        ));
    }

    newGame() {
        this.setState({
            playing: true,
            crossTurn: true,
            gameState: [[null, null, null], [null, null, null], [null, null, null]],
            winLineParams: [null, null, null, null],
        });

    }

    render () {
        const scale = this.state.scale; // Size of each space
        const winLineParams = this.state.winLineParams; // For line though winning set
        const crossTurn = this.state.crossTurn;
        const fontSize = Math.max(scale / 10, 10); // Ensures readable text
        let scaledWinLineParams = [];

        for (let i = 0; i < winLineParams.length; i++) {
            scaledWinLineParams.push(winLineParams[i] * scale);
        }

        return (
            <div>
                <table style={{fontSize: `${fontSize}px`}} padding="0"><tbody>
                    <tr>
                        <td width={scale} align="center" >Player 1 (<span style={{"color":"red"}}>x</span>)</td>
                        <td width={scale}></td>
                        <td width={scale} align="center">Player 2 (<span style={{"color":"blue"}}>o</span>)</td>
                    </tr>
                    <tr>
                        <td width={scale}></td>
                            {this.state.playing ? // Whose turn it is or whoose won
                                <td width={scale} align="center">{crossTurn ?
                                    <span style={{"color":"red"}}>x</span> : <span style={{"color":"blue"}}>o</span>}
                                's' turn</td>
                                :
                                <td width={scale} align="center" style={{fontWeight:"bold"}}>{!crossTurn ?
                                    <span style={{"color":"red"}}>x</span> : <span style={{"color":"blue"}}>o</span>}
                                &nbsp;won!</td>}

                    </tr>
                    <tr>
                        <td width={scale} align="center">{this.state.xScore}</td>
                        <td width={scale}></td>
                        <td width={scale} align="center">{this.state.oScore}</td>
                    </tr>
                </tbody></table><br/>

                <svg width={3 * scale} height={3 * scale}>
                    {this.drawLine([0, scale, 3 * scale, scale])}
                    {this.drawLine([0, 2 * scale, 3 * scale, 2 * scale])}
                    {this.drawLine([scale, 0, scale, 3 * scale])}
                    {this.drawLine([2 * scale, 0, 2 * scale, 3 * scale])}
                    {this.drawSymbols()}
                    {this.drawLine(scaledWinLineParams)}
                </svg>

                <br />
                <Slider
                    Eventhandler = {this.sliderHandler}
                    scale = {scale}
                ></Slider>
                <span style={{"paddingLeft":`${scale}px`}}>
                    {this.state.playing ?
                        <button style={{fontSize: `${fontSize}px`}} type="reset"
                        onClick={() => {location.reload()}}>Reset Everything</button>
                        :
                        <button style={{fontSize: `${fontSize}px`}}
                        onClick={() => {this.newGame()}}>New Game</button>
                    }
                </span>
            </div>
        );
    }
}

const element = <Game />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
