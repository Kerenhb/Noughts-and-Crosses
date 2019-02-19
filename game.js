import React from 'react';
import Symbol from './symbol'
import Slider from './slider'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);

        const { gridSize, player1starts } = this.props;
        this.state = {
            crossTurn : player1starts, // Who goes first
            scale : 100, // Overall relative scale (100 is normal)
            playing : true, // has the game ended?
            draw : false,
            gameState : Array.from({ length: gridSize }, row => Array(gridSize).fill(null)), // Makes a 2D array of length gridSize
            winLineParams : [null, null, null, null],
            p1Score : 0,
            p2Score : 0,
            numberOfGamesPlayed : 0, // can't just add scores due to draws
        };
    }

    handleNullClick(x, y) {
        const { crossTurn, gameState, playing } = this.state;
        if (playing) {
            gameState[y][x] = crossTurn; // true === x
            this.setState({
                crossTurn: !crossTurn, // Change turn
                gameState, // update board
                playing: !this.hasWon(),
            });
        }
    };

    hasWon() {
        const { gameState } = this.state;
        const { gridSize } = this.props;

        // Diagonal line: Top left to bottom right
        if (this.arrayEquality(gameState.map((element, index) => element[index]))) {
            this.setState({winLineParams: [0, 0, gridSize, gridSize]});
            this.incrementScore()
            return true
        }

        // Diagonal line: Top right to bottom left
        if (this.arrayEquality(gameState.map((element, index, array) => element[array.length - index - 1]))) {
            this.setState({winLineParams: [gridSize, 0, 0, gridSize]});
            this.incrementScore()
            return true
        }
        for (let i = 0; i < gridSize; i++) {
            // Vertical line
            if (this.arrayEquality(gameState.map(element => element[i]))) {
                this.setState({winLineParams: [1/2 + i, 0, 1/2 + i, gridSize]});
                this.incrementScore()
                return true
            }
            // Horizontal line
            if (this.arrayEquality(gameState[i])) {
                this.setState({winLineParams: [0, 1/2 + i, gridSize, 1/2 + i]});
                this.incrementScore()
                return true
            }
        }
        if (gameState.every((row) => row.every((elm) => elm !== null))) {
            // check that board is completely full, aka draw - therefore no score update
            this.setState({ draw: true });
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
        const { crossTurn, p1Score, p2Score } = this.state; 
        if (crossTurn) // X won (called before crossTurn changes again)
        {
            this.setState({p1Score: p1Score += 1});
        }
        else // O won
        {
            this.setState({p2Score: p2Score += 1});
        }
    }

    sliderHandler(event) {
        const scale = Number(event.target.value);
        this.setState({ scale });
    }

    drawSymbols(playerColors) { // Dynamically create all the symbols
        const { scale, crossTurn, gameState }  = this.state;
        const { gridSize } = this.props;
        let element = [];

        for (let i = 0; i < gridSize * gridSize; i++) {
            element[i] = { X : Math.floor(i / gridSize), Y : i % gridSize };
        }

        return element.map((element, index) => (
            <Symbol
                scale = {scale}
                position = {[element.Y * scale, element.X * scale]}
                mainClickHandler = {this.handleNullClick}
                crossTurn = {crossTurn}
                isCross = {gameState[element.X][element.Y]}
                key = {index}
                playerColors = {playerColors}
                gridSize = {gridSize}
            />
        ));
    }

    drawLines() {
        const { scale } = this.state;
        const { gridSize }  = this.props;

        let element = [];
        for (let i = 1; i < gridSize; i++)
        {
            element.push(
                [0, i * scale, gridSize * scale, i * scale], // horizontal lines
                [i * scale, 0, i * scale, gridSize * scale] // vertical lines
            );
        }

        return element.map((element, index) => (
            <line
                x1 = {element[0]} y1 = {element[1]} x2 = {element[2]} y2 = {element[3]}
                strokeWidth = {scale / 25} stroke = "black" key = {index}/>
            ));
    }

    newGame() {
        const { gridSize, numberOfGames : numberOfGamesToPlay, matchOver, startToggle, player1starts } = this.props;
        const { numberOfGamesPlayed, p1Score, p2Score } = this.state;
        const updatedNumberOfGamesPlayed = numberOfGamesPlayed + 1;

        if (updatedNumberOfGamesPlayed >= numberOfGamesToPlay) {// Time to stop
            matchOver(p1Score, p2Score);
        } else {
            this.setState({
                playing: true,
                draw: false,
                crossTurn: (startToggle) ? this.whoStarts() : player1starts,
                gameState: Array.from({ length: gridSize }, row => Array(gridSize).fill(null)),
                winLineParams: [null, null, null, null],
                numberOfGamesPlayed: updatedNumberOfGamesPlayed,
            });
        }
    }

    whoStarts() { // toggle is on
        const { player1starts } = this.props;
        return (this.state.numberOfGamesPlayed % 2) ? player1starts : !player1starts;
    }

    render () {
        const { playerNames, gridSize, playerColors } = this.props;
        const { scale, winLineParams, crossTurn, playing, draw, p1Score,  p2Score } = this.state; 
        const fontSize = Math.max((gridSize * scale) / 30, 10); // Ensures readable text
        let scaledWinLineParams = [];

        for (let i = 0; i < winLineParams.length; i++) {
            scaledWinLineParams.push(winLineParams[i] * scale);
        }

        return (
            <div>
                <table style={{fontSize: `${fontSize}px`}} padding="0"><tbody>
                    <tr>
                        <td width={(gridSize * scale) / 3} align="center">{playerNames[0]} (<span style={{"color" : playerColors[0]}}>x</span>)</td>
                        <td width={(gridSize * scale) / 3}></td>
                        <td width={(gridSize * scale) / 3} align="center">{playerNames[1]} (<span style={{"color" : playerColors[1]}}>o</span>)</td>
                    </tr>
                    <tr>
                        <td width={(gridSize * scale) / 3}></td>
                            {playing ?
                                <td width={(gridSize * scale) / 3} align="center">{crossTurn ? // Whose turn is it?
                                    playerNames[0] : playerNames[1]}'s turn</td>
                                : (draw ? // Is it a draw?
                                    <td width={(gridSize * scale) / 3} align="center" style={{fontWeight:"bold"}}>It's a draw</td>
                                    :
                                    <td width={(gridSize * scale) / 3} align="center" style={{fontWeight:"bold"}}>{!crossTurn ? // Who won?
                                        playerNames[0] : playerNames[1]}&nbsp;won!</td>
                                )}

                    </tr>
                    <tr>
                        <td width={(gridSize * scale) / 3} align="center">{p1Score}</td>
                        <td width={(gridSize * scale) / 3}></td>
                        <td width={(gridSize * scale) / 3} align="center">{p2Score}</td>
                    </tr>
                </tbody></table><br/>

                <svg width={gridSize * scale} height={gridSize * scale}>
                    {this.drawLines()}
                    {this.drawSymbols(playerColors)}
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
                    {playing ?
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