import React from 'react';
export default class Slider extends React.Component { // To change size of game
    render () {
        const { scale, Eventhandler } = this.props;
        return (<input
        type = "range"
        min={40} max={340} step={1}
        value={scale}
        onChange={event => {Eventhandler(event)}}>
        </input>
        );
    }
}