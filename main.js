import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import Form from './form';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerNames: ['Player 1', 'Player 2'],
            playerColors: ['#ff0000', '#0000ff'],
            player1starts: true,
            startToggle: true, // change who starts each game
            gridSize: 3, // n * n grid
            numberOfGames: 1, // number of games to play
            showForm: true, // Display the form rather than the game
            matchOver: false, // true when all the games have been played
            p1Score: 0,
            p2Score: 0,
        };

        this.updateName = this.updateName.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.updateWhoStarts = this.updateWhoStarts.bind(this);
        this.updateGridSize = this.updateGridSize.bind(this);
        this.updateNumberOfGames = this.updateNumberOfGames.bind(this);
        this.toggleOn = this.toggleOn.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.matchOver = this.matchOver.bind(this);
    }

    updateName(event, playerNumber){
        let { playerNames } = this.state;
        playerNames[playerNumber] = event.target.value;
        this.setState({ playerNames });
    }

    updateColor(event, playerNumber){
        let { playerColors } = this.state;
        playerColors[playerNumber] = event.target.value;
        this.setState({ playerColors });
    }

    updateWhoStarts(playerNumber) {
        this.setState({ player1starts: !playerNumber }) // 0 = player 1, 1 = player 2
    }

    updateGridSize(event) {
        this.setState({ gridSize: event.target.value })
    }

    updateNumberOfGames(event) {
        this.setState({ numberOfGames: event.target.value })
    }

    toggleOn(state) {
        this.setState({ startToggle: state });
    }

    onSubmit() {
        const { playerNames, playerColors, gridSize, numberOfGames } = this.state;
        let errorString = "";

        // Validation
        if (playerNames[0].length == 0) {
            errorString += "No player name entered for player 1\n";
        }
        if (playerNames[1].length == 0) {
            errorString += "No player name entered for player 2\n";
        }
        if (playerNames[0].length != 0 && (playerNames[1].length != 0) && playerNames[0] == playerNames[1]){
            errorString += "Player names cannot be identical\n";
        }

        if (playerColors[0] == "#ffffff") {
            errorString += "Can not choose white as a color for player 1\n";
        }
        if (playerColors[1] == "#ffffff") {
            errorString += "Can not choose white as a color for player 2\n";
        }
        if (playerColors[0] != "#ffffff" && (playerColors[1] != "#ffffff") && playerColors[0] == playerColors[1]){
            errorString += "Player colors cannot be identical\n";
        }

        if (gridSize <= 1) {
            errorString += "Grid size needs to be at least 2\n";
        }
        if (gridSize > 20) {
            errorString += "Grid size needs to smaller than 20\n";
        }
        if (!Number.isInteger(Number(gridSize))) {
            errorString += "Need to have an integer grid size\n";
        }

        if (numberOfGames <= 0) {
            errorString += "Need to play at least one game\n";
        }
        if (!Number.isInteger(Number(numberOfGames))) {
            errorString += "Need to have an integer number of games\n";
        }

        if (errorString.length == 0) {
            this.setState({ showForm: false }); // switch to game
        } else {
            alert(errorString);
        }
    }

    matchOver(p1Score, p2Score) {
        this.setState({
            matchOver: true,
            p1Score,
            p2Score,
        });
    }

    drawEndScreen() {
        const { playerNames, p1Score, p2Score } = this.state;

        return (
            <div>
                <table style={{fontSize: "20px"}} padding="0">
                    <thead><tr>
                        <th width="250px"></th>
                        <th width="250px" align="center" style={{fontWeight: "strong"}}>GAME OVER</th>
                        <th width="250px"></th>
                    </tr></thead>
                    <tbody>
                        <tr>
                            <td width="250px" align="center">{playerNames[0]}'s final score is: {p1Score}</td>
                            <td width="250px"></td>
                            <td width="250px" align="center">{playerNames[1]}'s final score is: {p2Score}</td>
                        </tr>
                        <tr>
                            <td width="250px"></td>
                            <td width="250px" align="center">
                                {p1Score == p2Score ? "It's a draw!" :
                                    ((p1Score > p2Score ? playerNames[0] : playerNames[1]) + " won!")}
                                </td>
                            <td width="250px"></td>
                        </tr>
                        <tr><td><br /></td></tr>
                        <tr>
                            <td width="250px"></td>
                            <td width="250px" align="center">
                                <button onClick={() => {location.reload()}}>Reset Everything</button>
                                </td>
                            <td width="250px"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
         );
    }

    render() {
        const { matchOver, showForm, playerNames, playerColors, player1starts, gridSize, numberOfGames, startToggle } = this.state;
        return (!matchOver ?
                    showForm ?
                        <Form
                            playerNames = {playerNames}
                            updateName = {this.updateName}
                            playerColors = {playerColors}
                            updateColor = {this.updateColor}
                            player1starts = {player1starts}
                            updateWhoStarts = {this.updateWhoStarts}
                            updateGridSize = {this.updateGridSize}
                            gridSize = {gridSize}
                            updateNumberOfGames = {this.updateNumberOfGames}
                            numberOfGames = {numberOfGames}
                            startToggle = {startToggle}
                            toggleOn = {this.toggleOn}
                            onSubmit = {this.onSubmit}
                        />
                        : <Game
                            playerNames = {playerNames}
                            player1starts = {player1starts}
                            playerColors = {playerColors}
                            gridSize = {Number(gridSize)}
                            numberOfGames = {Number(numberOfGames)}
                            startToggle = {startToggle}
                            matchOver = {this.matchOver}
                        />
                    : this.drawEndScreen()
        )};
}

const element = <App />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
