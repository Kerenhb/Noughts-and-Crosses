import React from 'react';

export default class Form extends React.Component {
    render() {
        return(
            <div>
                <h3>Player 1</h3>
                Name: <input type="text" value = {this.props.playerNames[0]}
                onChange = {event => {this.props.updateName(event, 0)}}/>
                <br />
                Color: <input type="color" value = {this.props.playerColors[0]}
                onChange = {event => {this.props.updateColor(event, 0)}}/>
                <br />
                Starts first: <input type = 'radio' name = "start" checked = {this.props.whoStarts}
                onChange = {event => {this.props.updateWhoStarts(0)}}/>

                <h3>Player 2</h3>
                Name: <input type="text" value = {this.props.playerNames[1]}
                onChange = {event => {this.props.updateName(event, 1)}}/>
                <br />
                Color: <input type="color" value = {this.props.playerColors[1]}
                onChange = {event => {this.props.updateColor(event, 1)}}/>
                <br />
                Starts first: <input type = 'radio' name = "start" checked = {!this.props.whoStarts}
                onChange = {event => {this.props.updateWhoStarts(1)}}/>

                <br /><br />
                <button onClick = {this.props.onSumbit}>Sumbit</button>
            </div>
        )
    }
}