import React from 'react';
export default class Symbol extends React.Component {
    render() {
        const boxSize = this.props.scale;
        const padding = this.props.scale / 7;
        const strokeSize = this.props.scale / 30;
        const lineSize = this.props.scale / 25;
        const position = this.props.position; // Top left x and y coords

        const drawCross = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <line x1={position[0] + padding}
                    y1={position[1] + padding}
                    x2={position[0] + boxSize - padding}
                    y2={position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke={this.props.playerColors[0]}/>

                    <line x1={position[0] + boxSize - padding}
                    y1={position[1] + padding}
                    x2={position[0] + padding}
                    y2={position[1] + boxSize - padding}
                    strokeWidth={strokeSize} stroke={this.props.playerColors[0]}/>
                </svg>
            );
        };

        const drawCircle = () => {
            return (
                <svg width={3 * boxSize} height={3 * boxSize}>
                    <circle cx={position[0] + boxSize/2}
                    cy={position[1] + boxSize/2}
                    r={boxSize/2 - padding}
                    strokeWidth={strokeSize} stroke={this.props.playerColors[1]} fillOpacity="0"/>
                </svg>
            );
        };

        const drawNull = () => { // Draws an invisible clickable square to later become an X or O
            return (
                <svg width={3 * boxSize} height={3 * boxSize}
                    onClick={() => {
                        this.props.mainClickHandler(
                            position[0] / boxSize,
                            position[1] / boxSize
                        );
                    }}>
                    <rect x={position[0] + lineSize / 2}
                    y={position[1] + lineSize / 2}
                    width={boxSize - lineSize} height={boxSize - lineSize}
                    fillOpacity="0"/>
                </svg>
            );
        };

        const isCross = this.props.isCross;
        // Draws only if visible, aka isCross != null
        return (
            isCross === null ? drawNull() :
            (isCross ? drawCross() : drawCircle()));
    };
}