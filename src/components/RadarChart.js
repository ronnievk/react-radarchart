import React, {PropTypes} from 'react';
import {scaleLinear} from "d3-scale";

import AllAxes from './AllAxes.js';
import RadarArea from './RadarArea.js';

function xyScale(scale, fraction, origin = { x: 0, y: 0} ) {
    let result = function(value, pixelOffset = 0) {
        let scaledValue = scale(value) + pixelOffset;
        let x = origin.x - scaledValue * Math.sin(fraction*2*Math.PI);
        let y = origin.y + scaledValue * Math.cos(fraction*2*Math.PI);
        return { x: x, y: y };
    };
    return result;
}

function defaultScale(radius, domain) {
    return scaleLinear()
        .domain(domain)
        .range([0, radius]);
}

const sizeConfig = {
    defaultRadius: 125,
    minRadius: 50,
    maxRadius: 200 //only for 'responsive mode'
} ;

// props.options will be merged with this default options:
const defaultOptions = {
    numberOfGridlines: 5,
    margin: {top: 40, bottom: 40, left: 90, right: 90}
}; 

/** takes width, height and/or radius and calculates missing values on basis of margin-settings
 * calculate svg size from the given options, the possibilities are:
 *  - no input: calculate width and height from default radius
 *  - give parentWidth: w, h and r are calculated responsive within min and max boundaries
 *  - give width and or height: radius is calculated
 *  - give radius: width and height are calculated
 **/
function calculateSize(options) {
    if (!(options.radius || options.width || options.height || options.parentWidth)) {
        //use default value
        options.radius = sizeConfig.defaultRadius;
    }
    if (options.width || options.height) {
        //calculate radius to fit (with margins) inside given width and/or height
        if (options.width) {
            var radiusW = Math.round((options.width - options.margin.left - options.margin.right)/2);
        }
        if (options.height) {
            var radiusH = Math.round((options.height - options.margin.top - options.margin.bottom)/2);
        }
        if ((options.width && options.height)) {
            options.radius = Math.min(radiusW, radiusH);
        } else if (options.width) {
            options.radius = radiusW;
            options.height = 2 * options.radius + options.margin.top + options.margin.bottom;
        } else {
            options.radius = radiusH;
        }
        options.radius = Math.max(options.radius, sizeConfig.minRadius);
    } 
    if (!options.radius && options.parentWidth) {
        //responsive mode, maximize width to parentWidth within min/max boundaries
        let radius = Math.round((options.parentWidth - options.margin.left - options.margin.right)/2);
        if (radius > sizeConfig.minRadius && radius < sizeConfig.maxRadius) {
            options.width = options.parentWidth;
        } else {
            radius = Math.min(radius, sizeConfig.maxRadius);
            radius = Math.max(radius, sizeConfig.minRadius);
        }
        options.radius = radius;        
    }
    // if width or height is still missing, calculate it from radius and margins
    if (!options.width) {
        options.width = 2 * options.radius + options.margin.left + options.margin.right;
    }
    if (!options.height) {
        options.height = 2 * options.radius + options.margin.top + options.margin.bottom;
    }
}

function mergeInDefaultOptions(options) {
    for (var option in defaultOptions) {
        if (!(option in options)) {
            options[option] = defaultOptions[option];
        }
    }
}
 
const RadarChart = props => {
    mergeInDefaultOptions(props.options);
    calculateSize(props.options);
    const options = props.options;
    props.axes.forEach(function(axis, index) {
            const fraction = index/props.axes.length;
            props.axes[index].scale = xyScale(defaultScale(options.radius, axis.domain), fraction);
            props.axes[index].labelAnchor = (fraction === 0 || fraction === 0.5) ? 'middle' : fraction < 0.5 ? 'end' : 'start';
        });
    const translate = `translate(${options.margin.left+options.radius}, ${options.margin.top+options.radius})`;
    if (props.data.loading) {
        return <p>Loading...</p>;
    }
    if (props.data.error) {
        return <p>{props.data.error.message}</p>;
    }
    return <svg className="d3-chart radar-chart" width={options.width} height={options.height}>
      <g transform={translate}>
        <AllAxes {...props} />
        {props.data.values.map((d,i) => 
            <RadarArea {...props} data={d} dataIndex={props.data.values.length - 1 - i} key={i} />
        )}
      </g>
    </svg>
};

RadarChart.defaultProps = {
    data: { loading: true, error: null, values: []},
    options: defaultOptions
};

RadarChart.propTypes = {
    axes: PropTypes.arrayOf(PropTypes.shape({
        dataKey: PropTypes.string.isRequired,
        label: PropTypes.string,
        domain: PropTypes.arrayOf(PropTypes.number).isRequired
    })).isRequired, 
    data: PropTypes.shape({
        loading: PropTypes.boolean,
        error: PropTypes.object,
        values: PropTypes.array
    }),
    options: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number,
        radius: PropTypes.number,
        numberOfGridlines: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number.isRequired,
            bottom: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
        }),
    }),
  };

export default RadarChart;