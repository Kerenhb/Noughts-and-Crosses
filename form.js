import React from 'react';

export default class Form extends React.Component {
    render() {
        return(
            <div>
                <h3>Player 1</h3>
                Name: <input type="text" onChange = {event => {this.props.updateName(event, 0)}}/>

                <h3>Player 2</h3>
                Name: <input type="text" onChange = {event => {this.props.updateName(event, 1)}}/>
            </div>
        )
    }
    // Choose color
    // Choose name
    // Swap who's X (and therefore starts) each time there's a new game (toggable?)

}