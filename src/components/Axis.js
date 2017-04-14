import React, {PropTypes} from 'react';

const lineStyle = {
    stroke: 'white',
    strokeWidth: 2
};
const textStyle = {
    fill: 'white',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '14px'
}

const Axis = (props) => {
    const labelMargin = 20;
    //const center = props.scale(props.domain[0]);
    const center = { x: 0, y: 0 };
    const end = props.scale(props.domain[1]);
    const labelPos = props.scale(props.domain[1], labelMargin);
    return <g className="axis">
        <line x1={center.x} y1={center.y} x2={end.x} y2={end.y} style={lineStyle} />
        <text className="axis-label" x={labelPos.x} y={labelPos.y} textAnchor={props.labelAnchor} style={textStyle}>{props.label}</text>  
    </g>
};

Axis.propTypes = {
    scale: PropTypes.func.isRequired,
    domain: PropTypes.arrayOf(PropTypes.number).isRequired,
    labelAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
    label: PropTypes.string
};

export default Axis;