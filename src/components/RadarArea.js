import React, {PropTypes} from 'react';

const polygonStyle = {
    stroke: 'none',
    fill: 'rgb(106,255,255)',
    fillOpacity: 0.6
};

function getStyle(i) {
    let style = Object.assign({}, polygonStyle);
    if (i) {
        style.fill = "grey";
        if (i > 1) {
            style.fillOpacity = 0.2;
        }
    }
    return style;
}

const RadarArea = (props) => {
        const d = props.data;
        const i = props.dataIndex;
        
        const dataValues = props.axes.map(axis => 
            d.hasOwnProperty(axis.dataKey) ? axis.scale(d[axis.dataKey]) : axis.scale(0));
        const points = dataValues.map(p => p.x+','+p.y).join(' ');
        
        return <polygon points={points} style={getStyle(i)}>
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