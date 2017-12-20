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
            player1Cross: true, // Player 1 is X and therefore starts
            showForm: true, // Display the form rather than the game
        };

        this.updateName = this.updateName.bind(this);
        this.updateColor = this.updateColor.bind(this);
        this.updateWhoStarts = this.updateWhoStarts.bind(this);
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
        this.setState({player1Cross: !playerNumber}) // 0 = player 1, 1 = player 2
    }

    onSumbit() {
        this.setState({showForm: false})
    }

    render() {
        return (this.state.showForm ?
            <Form
                playerNames = {this.state.playerNames}
                updateName = {this.updateName}
                playerColors = {this.state.playerColors}
                updateColor = {this.updateColor}
                whoStarts = {this.state.player1Cross}
                updateWhoStarts = {this.updateWhoStarts}
                onSumbit = {this.onSumbit}
            />
            : <Game />
        )
    };
}

const element = <App />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
