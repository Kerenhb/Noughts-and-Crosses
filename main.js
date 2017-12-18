import React from 'react';
import ReactDOM from 'react-dom';

class Symbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCross: null}; // Each symbol is either: blank, cross or a circle
    };

    ownClickHandler(props) {
        const crossTurn = props.crossTurn;
        this.setState({isCross: crossTurn});
    };

    render() {
        const boxSize = this.props.scale;
        const padding = this.props.scale / 7;
        const strokeSize = this.props.scale /30;
        const lineSize = this.props.scale / 25;

        const drawCross = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <line x1={this.props.position[0] + padding}
                    y1={this.props.position[1] + padding}
                    x2={this.props.position[0] + boxSize - padding}
                    y2={this.props.position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke="red"/>

                    <line x1={this.props.position[0] + boxSize - padding}
                    y1={this.props.position[1] + padding}
                    x2={this.props.position[0] + padding}
                    y2={this.props.position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke="red"/>
                </svg>
            );
        };

        const drawCircle = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <circle cx={this.props.position[0] + boxSize/2}
                    cy={this.props.position[1] + boxSize/2}
                    r={boxSize/2 - padding}
                    strokeWidth={strokeSize} stroke="blue" fillOpacity="0"/>
                </svg>
            );
        };

        const drawNull = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}
                    onClick={() => {
                        this.props.mainClickHandler();
                        this.ownClickHandler(this.props);
                    }}>
                    <rect x={this.props.position[0] + lineSize / 2}
                    y={this.props.position[1] + lineSize / 2}
                    width={boxSize - lineSize} height={boxSize - lineSize}
                    fillOpacity="0"/>
                </svg>
            );
        };

        const isCross = this.state.isCross;
        // Draws only if visible, aka isCross != null
        return (
            isCross === null ? drawNull() :
            (isCross ? drawCross() : drawCircle()));
    };
}

class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.state = { value: 105 };
      }

    render () {
        return (<input
        type = "range"
        min={10} max={200} step={1}
        value={this.state.value}
        onChange={event => {
            this.setState({value: event.target.value});
            this.props.Eventhandler(this.state.value);
            }}>
        </input>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.handleNullClick = this.handleNullClick.bind(this);
        this.sliderHandler = this.sliderHandler.bind(this);

        this.state = {
            crossTurn: true, // Who goes first
            scale: 100 // Overall relative scale (100 is normal)
        };
    }

    drawLine(x1, y1, x2, y2) {
        const scale = this.state.scale;
        return <line x1={x1} y1={y1} x2={x2} y2={y2}
        strokeWidth={scale / 25}
        stroke="black"/>
    }

    handleNullClick() {
        const crossTurn = this.state.crossTurn;
        this.setState({crossTurn: !crossTurn}); // Change turn
    };

    sliderHandler(value) {
        this.setState({scale: value});
    }

    render () {
        const scale = this.state.scale;
        const boxSize = this.state.scale; // Size of each space
        const crossTurn = this.state.crossTurn;

        return (
            <div>
                <svg width={3 * boxSize} height={3 * boxSize}>
                    {this.drawLine(0, boxSize, 3 * boxSize, boxSize)}
                    {this.drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
                    {this.drawLine(boxSize, 0, boxSize, 3 * boxSize)}
                    {this.drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}

                    <Symbol
                        scale = {scale}
                        position = {[0, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, 0]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[0, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[0, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[boxSize, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                    <Symbol
                        scale = {scale}
                        position = {[2 * boxSize, 2 * boxSize]}
                        mainClickHandler = {this.handleNullClick}
                        crossTurn = {crossTurn}
                    />
                </svg>

                <br />
                <Slider
                    Eventhandler = {this.sliderHandler}
                ></Slider>
            </div>
        );
    }
}

const element = <Game />;
const rootElement = document.getElementById('root');
ReactDOM.render(element, rootElement)
