import React, {PropTypes} from 'react';

const polygonStyle = {
    stroke: 'none',
    fill: 'rgb(106,255,255)',
    fillOpacity: 0.8
};

const RadarArea = (props) => {
        const d = props.data;
        const dataValues = props.axes.map(axis => 
            d.hasOwnProperty(axis.dataKey) ? axis.scale(d[axis.dataKey]) : axis.scale(0));
        const points = dataValues.map(p => p.x+','+p.y).join(' ');
        
        return <polygon points={points} style={polygonStyle}>
            </polygon>  
};

RadarArea.propTypes = {
    data: PropTypes.object.isRequired,
    axes: PropTypes.arrayOf(PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        label: PropTypes.string,
        domain: PropTypes.arrayOf(PropTypes.number)
    })).isRequired, 
    
};

export default RadarArea;