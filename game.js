import React from 'react';
import Symbol from './symbol'
import Slider from './slider'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);

        this.state = {
            crossTurn: true, // Who goes first
            scale: 200, // Overall relative scale (100 is normal)
            playing: true, // has the game ended?
            draw: false,
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
        if (gameState.every((row) => row.every((elm) => elm !== null))) {
            // check that board is completly full, aka draw - therefore no score update
            this.setState({draw: true});
            return true;
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
            draw: false,
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
                            {this.state.playing ?
                                <td width={scale} align="center">{crossTurn ? // Whoose turn is it?
                                    <span style={{"color":"red"}}>x</span> : <span style={{"color":"blue"}}>o</span>}
                                's' turn</td>
                                : (this.state.draw ? // Is it a draw?
                                    <td width={scale} align="center" style={{fontWeight:"bold"}}>It's a draw</td>
                                    :
                                    <td width={scale} align="center" style={{fontWeight:"bold"}}>{!crossTurn ? // Who won?
                                    <span style={{"color":"red"}}>x</span> : <span style={{"color":"blue"}}>o</span>}
                                    &nbsp;won!</td>
                                )}

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