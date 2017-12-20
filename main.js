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
            gridSize: 3, // n * n grid
            showForm: true, // Display the form rather than the game
        };

        this.updateName = this.updateName.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.updateWhoStarts = this.updateWhoStarts.bind(this);
        this.updateGridSize = this.updateGridSize.bind(this);
        this.onSumbit = this.onSumbit.bind(this);
    }

    updateName(event, playerNumber){
        let playerNames = this.state.playerNames;
        playerNames[playerNumber] = event.target.value;
        this.setState({playerNames});
    }

    updateColor(event, playerNumber){
        let playerColors = this.state.playerColors;
        playerColors[playerNumber] = event.target.value;
        this.setState({playerColors});
    }

    updateWhoStarts(playerNumber) {
        this.setState({player1starts: !playerNumber}) // 0 = player 1, 1 = player 2
    }

    updateGridSize(event) {
        this.setState({gridSize: event.target.value})
    }

    onSumbit() {
        const playerNames = this.state.playerNames;
        const playerColors = this.state.playerColors;
        let errorString = "";

        // Validation
        if (playerNames[0].length == 0) {
            errorString += "No player name entered for player 1\n";
        }
        if (playerNames[1].length == 0) {
            errorString += "No player name entered for player 2\n";
        }
        if (playerNames[0].length != 0 && (playerNames[1].length != 0) && playerNames[0] == playerNames[1]){
            errorString += "Player names cannot be indentical\n";
        }

        if (playerColors[0] == "#ffffff") {
            errorString += "Can not choose white as a color for player 2\n";
        }
        if (playerColors[1] == "#ffffff") {
            errorString += "Can not choose white as a color for player 2\n";
        }
        if (playerColors[0] != "#ffffff" && (playerColors[1] != "#ffffff") && playerColors[0] == playerColors[1]){
            errorString += "Player colors cannot be indentical\n";
        }

        if (this.state.gridSize <= 1) {
            errorString += "Grid size needs to be at least 2\n";
        }
        if (this.state.gridSize > 20) {
            errorString += "Grid size needs to smaller than 20\n";
        }

        if (errorString.length == 0) {
            this.setState({showForm: false}); // switch to game
        } else {
            alert(errorString);
        }
    }

    render() {
        return (this.state.showForm ?
            <Form
                playerNames = {this.state.playerNames}
                updateName = {this.updateName}
                playerColors = {this.state.playerColors}
                updateColor = {this.updateColor}
                player1starts = {this.state.player1starts}
                updateWhoStarts = {this.updateWhoStarts}
                updateGridSize = {this.updateGridSize}
                gridSize = {this.state.gridSize}
                onSumbit = {this.onSumbit}
            />
            : <Game
                playerNames = {this.state.playerNames}
                player1starts = {this.state.player1starts}
                playerColors = {this.state.playerColors}
                gridSize = {Number(this.state.gridSize)}
            />
        )
    };
}

const element = <App />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
