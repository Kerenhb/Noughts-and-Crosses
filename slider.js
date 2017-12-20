import React from 'react';
export default class Slider extends React.Component { // To change size of game
    render () {
        return (<input
        type = "range"
        min={40} max={340} step={1}
        value={this.props.scale}
        onChange={event => {
            this.props.Eventhandler(event);
            }}>
        </input>
        );
    }
}