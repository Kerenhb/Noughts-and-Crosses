import React from 'react';

export default class Form extends React.Component {
    render() {
        return(
            <div>
                <h2>Game Settings</h2>
                <h3>Player 1 (<span style={{"color":this.props.playerColors[0]}}>x</span>)</h3>
                Name: <input type="text" value = {this.props.playerNames[0]}
                onChange = {event => {this.props.updateName(event, 0)}}/>
                <br />
                Color: <input type="color" value = {this.props.playerColors[0]}
                onChange = {event => {this.props.updateColor(event, 0)}}/>

                <h3>Player 2 (<span style={{"color":this.props.playerColors[1]}}>o</span>)</h3>
                Name: <input type="text" value = {this.props.playerNames[1]}
                onChange = {event => {this.props.updateName(event, 1)}}/>
                <br />
                Color: <input type="color" value = {this.props.playerColors[1]}
                onChange = {event => {this.props.updateColor(event, 1)}}/>

                <h3>Misc Settings</h3>
                Grid size: <input type="number" value = {this.props.gridSize}
                onChange = {event => {this.props.updateGridSize(event)}} />
                <br />
                Number of games to play: <input type="number" value = {this.props.numberOfGames}
                onChange = {event => {this.props.updateNumberOfGames(event)}} />

                <h4>Who starts?</h4>
                Player 1: <input type = 'radio' name = "start" checked = {this.props.player1starts}
                onChange = {event => {this.props.updateWhoStarts(0)}}/>&nbsp;&nbsp;
                Player 2: <input type = 'radio' name = "start" checked = {!this.props.player1starts}
                onChange = {event => {this.props.updateWhoStarts(1)}}/>
                <br />
                Change every game: yes <input type = 'radio' name = "change" checked = {this.props.startToggle}
                onChange = {() => {this.props.toggleOn(true)}}/>&nbsp;&nbsp;
                no <input type = 'radio' name = "change" checked = {!this.props.startToggle}
                onChange = {() => {this.props.toggleOn(false)}}/>
                <br />

                <br /><br />
                <button onClick = {this.props.onSumbit}>Sumbit</button>
            </div>
        )
    }
}