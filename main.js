import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import Form from './form';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerNames: ['Player 1', 'Player 2'],
            playerColors: ['red', 'blue'],
            player1Cross: true, // Player 1 is X and therefore starts
        };

        this.updateName = this.updateName.bind(this);
    }

    updateName(event, playerNumber){
        let playerNames = this.state.playerNames;
        playerNames[playerNumber] = event.target.value;
        this.setState({playerNames});
    }

    render() {
        return (
            <Form
                updateName = {this.updateName}
            />
        )
    };
}

const element = <App />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
