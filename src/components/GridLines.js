import React, {PropTypes} from 'react';

const circleStyle = {
    stroke: 'white',
    strokeWidth: 2,
    fill: 'none'
};

const GridLines = (props) => {
    return <g className="chart-grid">
        {[...Array(props.options.numberOfGridlines).keys()].map(i => 
            <circle key={i} cx="0" cy="0" r={props.options.radius*(i+1)/props.options.numberOfGridlines} style={circleStyle} />
            )}
    </g>
}

GridLines.propTypes = {
    options: PropTypes.shape({
        radius: PropTypes.number.isRequired,
        numberOfGridlines: PropTypes.number.isRequired
    }),
};

export default GridLines;