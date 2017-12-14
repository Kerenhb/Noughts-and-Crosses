import React from 'react';
import ReactDOM from 'react-dom';

const boxSize = 100;
function drawLine(x1, y1, x2, y2) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2}
strokeWidth="4" stroke="black"/>
}

class Symbol extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isCross: true};
    };

    handleClick(isCross) {
        this.setState({isCross: isCross});
    };

    render() {
        const drawCross = () => {
            const padding = 10;
            return (
                    <svg width={3 * boxSize} height={3 * boxSize}>
                        <line x1={this.props.position[0] + padding} y1={this.props.position[1] + padding}
                        x2={this.props.position[0] + boxSize - padding} y2={this.props.position[1] + boxSize - padding}
                        strokeWidth="3" stroke="red"/>

                        <line x1={this.props.position[0] + boxSize - padding} y1={this.props.position[1] + padding}
                        x2={this.props.position[0] + padding} y2={this.props.position[1] + boxSize - padding}
                        strokeWidth="3" stroke="red"/>
                    </svg>
                );
        };

        const drawCircle = () => {
            console.log('Circle')
            return ('circle');
        };

        const {active, isCross} = this.state;
        // Draws only if visible, aka isCross != null
        return (isCross != null && (isCross ? drawCross() : drawCircle()));
    };
}

const grid = <svg width={3 * boxSize} height={3 * boxSize}>
    {drawLine(0, boxSize, 3 * boxSize, boxSize)}
    {drawLine(0, 2 * boxSize, 3 * boxSize, 2 * boxSize)}
    {drawLine(boxSize, 0, boxSize, 3 * boxSize)}
    {drawLine(2 * boxSize, 0, 2 * boxSize, 3 * boxSize)}

    <Symbol position = {[0, 0]} />
    <Symbol position = {[boxSize, 0]} />
    <Symbol position = {[2 * boxSize, 0]} />

    <Symbol position = {[0, boxSize]} />
    <Symbol position = {[boxSize, boxSize]} />
    <Symbol position = {[2 * boxSize, boxSize]} />

    <Symbol position = {[0, 2 * boxSize]} />
    <Symbol position = {[boxSize, 2 * boxSize]} />
    <Symbol position = {[2 * boxSize, 2 * boxSize]} />
</svg>

const rootElement = document.getElementById('root');
ReactDOM.render(grid, rootElement)
