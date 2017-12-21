import React from 'react';

export default class Form extends React.Component {
    render() {
        return(
            <div>
                <h2>Game Settings</h2>
                <h3>Player 1 (<span style={{"color":this.props.playerColors[0]}}>x</span>)</h3>
                <table><tbody>
                    <tr><td>Name:</td>
                    <td>
                        <input type="text" value = {this.props.playerNames[0]}
                        onChange = {event => {this.props.updateName(event, 0)}}/>
                    </td></tr>

                    <tr><td>Color:</td>
                    <td>
                        <input type="color" value = {this.props.playerColors[0]}
                        onChange = {event => {this.props.updateColor(event, 0)}}/>
                    </td></tr>
                </tbody></table>

                <h3>Player 2 (<span style={{"color":this.props.playerColors[1]}}>o</span>)</h3>
                <table><tbody>
                    <tr><td>Name:</td>
                    <td>
                        <input type="text" value = {this.props.playerNames[1]}
                        onChange = {event => {this.props.updateName(event, 1)}}/>
                    </td></tr>

                    <tr><td>Color:</td>
                    <td>
                        <input type="color" value = {this.props.playerColors[1]}
                        onChange = {event => {this.props.updateColor(event, 1)}}/>
                    </td></tr>
                </tbody></table>

                <h3>Misc Settings</h3>
                <table><tbody>
                    <tr><td>Grid Size:</td>
                    <td>
                        <input type="number" value = {this.props.gridSize}
                        onChange = {event => {this.props.updateGridSize(event)}} />
                    </td></tr>

                    <tr><td> Number of games to play:</td>
                    <td>
                        <input type="number" value = {this.props.numberOfGames}
                        onChange = {event => {this.props.updateNumberOfGames(event)}} />
                    </td></tr>
                </tbody></table>

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