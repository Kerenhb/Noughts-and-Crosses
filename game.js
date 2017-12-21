import React from 'react';
import Symbol from './symbol'
import Slider from './slider'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);

        const gridSize = this.props.gridSize;
        this.state = {
            crossTurn: this.props.player1starts, // Who goes first
            scale: 100, // Overall relative scale (100 is normal)
            playing: true, // has the game ended?
            draw: false,
            gameState: Array.from({length: gridSize}, row => Array(gridSize).fill(null)),
            winLineParams: [null, null, null, null],
            p1Score: 0,
            p2Score: 0,
            numberOfGamesPlayed: 0, // can't just add scores due to draws
        };
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
        const gridSize = this.props.gridSize;

        if (this.arrayEquality(gameState.map((element, index) => element[index]))) {
            this.setState({winLineParams: [0, 0, gridSize, gridSize]});
            this.incrementScore()
            return true
        }
        if (this.arrayEquality(gameState.map((element, index, array) => element[array.length - index - 1]))) {
            this.setState({winLineParams: [gridSize, 0, 0, gridSize]});
            this.incrementScore()
            return true
        }
        for (let i = 0; i < gridSize; i++) {
            if (this.arrayEquality(gameState.map(element => element[i]))) {
                this.setState({winLineParams: [1/2 + i, 0, 1/2 + i, gridSize]});
                this.incrementScore()
                return true
            }
            if (this.arrayEquality(gameState[i])) {
                this.setState({winLineParams: [0, 1/2 + i, gridSize, 1/2 + i]});
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

    arrayEquality(array) {
        const first = array[0];
        if (first === null) {
            return false;
        }
        return array.every(element => {return element === first});
     }

    incrementScore() {
        if (this.state.crossTurn) // X won (called before crossTurn changes again)
        {
            this.setState({p1Score: this.state.p1Score += 1});
        }
        else // o won
        {
            this.setState({p2Score: this.state.p2Score += 1});
        }
    }

    sliderHandler(event) {
        const scale = Number(event.target.value);
        this.setState({scale: scale});
    }

    drawSymbols(playerColors) { // Dynamically create all the symbols
        const scale = this.state.scale;
        const crossTurn = this.state.crossTurn;
        const gameState = this.state.gameState;
        const gridSize = this.props.gridSize;
        let element = [];

        for (let i = 0; i < gridSize * gridSize; i++) {
            element[i] = {X: Math.floor(i/gridSize), Y: i % gridSize};
        }

        return element.map((element, index) => (
            <Symbol
            scale = {scale}
            position = {[element.Y * scale, element.X * scale]}
            mainClickHandler = {this.handleNullClick}
            crossTurn = {crossTurn}
            isCross = {gameState[element.X] [element.Y]}
            key = {index}
            playerColors = {playerColors}
            gridSize = {gridSize}
            />
        ));
    }

    drawLines() {
        const gridSize = this.props.gridSize;
        const scale = this.state.scale;

        let element = [];
        for (let i = 1; i < gridSize; i++)
        {
            element.push(
                [0, i * scale, gridSize * scale, i * scale], // horizontal lines
                [i * scale, 0, i * scale, gridSize * scale] // vertial lines
            );
        }

        return element.map((element, index) => (
            <line x1={element[0]} y1={element[1]} x2={element[2]} y2={element[3]}
                strokeWidth={scale / 25} stroke="black" key={index}/>
            ));
    }

    newGame() {
        const gridSize = this.props.gridSize;
        const numberOfGamesPlayed = this.state.numberOfGamesPlayed + 1;
        const numberOfGamesToPlay = this.props.numberOfGames;

        if (numberOfGamesPlayed >= numberOfGamesToPlay) {// Time to stop
            this.props.matchOver(this.state.p1Score, this.state.p2Score);
        } else {
            this.setState({
                playing: true,
                draw: false,
                crossTurn: (this.props.startToggle) ? this.whoStarts() : this.props.player1starts,
                gameState: Array.from({length: gridSize}, row => Array(gridSize).fill(null)),
                winLineParams: [null, null, null, null],
                numberOfGamesPlayed: numberOfGamesPlayed,
            });
        }
    }

    whoStarts() { // toggle is on
        return (this.state.numberOfGamesPlayed % 2) ? this.props.player1starts : !this.props.player1starts;
    }

    render () {
        const playerNames = this.props.playerNames;
        const gridSize = this.props.gridSize;

        const scale = this.state.scale; // Size of each space
        const winLineParams = this.state.winLineParams; // For line though winning set
        const crossTurn = this.state.crossTurn;
        const fontSize = Math.max((gridSize * scale) / 30, 10); // Ensures readable text
        let scaledWinLineParams = [];

        for (let i = 0; i < winLineParams.length; i++) {
            scaledWinLineParams.push(winLineParams[i] * scale);
        }

        return (
            <div>
                <table style={{fontSize: `${fontSize}px`}} padding="0"><tbody>
                    <tr>
                        <td width={(gridSize * scale) / 3} align="center">{playerNames[0]} (<span style={{"color":this.props.playerColors[0]}}>x</span>)</td>
                        <td width={(gridSize * scale) / 3}></td>
                        <td width={(gridSize * scale) / 3} align="center">{playerNames[1]} (<span style={{"color":this.props.playerColors[1]}}>o</span>)</td>
                    </tr>
                    <tr>
                        <td width={(gridSize * scale) / 3}></td>
                            {this.state.playing ?
                                <td width={(gridSize * scale) / 3} align="center">{crossTurn ? // Whoose turn is it?
                                    playerNames[0] : playerNames[1]}'s turn</td>
                                : (this.state.draw ? // Is it a draw?
                                    <td width={(gridSize * scale) / 3} align="center" style={{fontWeight:"bold"}}>It's a draw</td>
                                    :
                                    <td width={(gridSize * scale) / 3} align="center" style={{fontWeight:"bold"}}>{!crossTurn ? // Who won?
                                        playerNames[0] : playerNames[1]}&nbsp;won!</td>
                                )}

                    </tr>
                    <tr>
                        <td width={(gridSize * scale) / 3} align="center">{this.state.p1Score}</td>
                        <td width={(gridSize * scale) / 3}></td>
                        <td width={(gridSize * scale) / 3} align="center">{this.state.p2Score}</td>
                    </tr>
                </tbody></table><br/>

                <svg width={gridSize * scale} height={gridSize * scale}>
                    {this.drawLines()}
                    {this.drawSymbols(this.props.playerColors)}
                    <line x1={scaledWinLineParams[0]} y1={scaledWinLineParams[1]}
                    x2={scaledWinLineParams[2]} y2={scaledWinLineParams[3]}
                    strokeWidth={scale / 25}
                    stroke="black"/>
                </svg>

                <br />
                Scale: <Slider
                    Eventhandler = {this.sliderHandler}
                    scale = {scale}
                ></Slider>
                <span style={{"paddingLeft":`${(gridSize * scale) / 3}px`}}>
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