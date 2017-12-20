import React from 'react';

export default class Form extends React.Component {
    render() {
        return(
            <div>
                <h3>Player 1</h3>
                Name: <input type="text" value = {this.props.playerNames[0]}
                onChange = {event => {this.props.updateName(event, 0)}}/><br />
                Color: <input type="color" value = {this.props.playerColors[0]}
                onChange = {event => {this.props.updateColor(event, 0)}}/>

                <h3>Player 2</h3>
                Name: <input type="text" value = {this.props.playerNames[1]}
                onChange = {event => {this.props.updateName(event, 1)}}/><br />
                Color: <input type="color" value = {this.props.playerColors[1]}
                onChange = {event => {this.props.updateColor(event, 1)}}/>
            </div>
        )
    }
    // Choose color
    // Choose name
    // Swap who's X (and therefore starts) each time there's a new game (toggable?)

}