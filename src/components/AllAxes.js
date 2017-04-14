import React, {PropTypes} from 'react';
import Axis         from './Axis';
import GridLines    from './GridLines';


const AllAxes = (props)  => {
  return <g className="axes-group">
    {props.axes.map(axis => 
        <Axis key={axis.dataKey} {...axis} />
        )}
        <GridLines {...props} />
  </g>
}

AllAxes.propTypes = {
    axes: PropTypes.arrayOf(PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        label: PropTypes.string,
        labelAnchor: PropTypes.oneOf(['start', 'middle', 'end']),
        domain: PropTypes.arrayOf(PropTypes.number).isRequired,
        scale: PropTypes.func.isRequired,
    })).isRequired,
    options: PropTypes.shape({
        radius: PropTypes.number.isRequired,
        numberOfGridlines: PropTypes.number.isRequired
    }),
};

export default AllAxes;