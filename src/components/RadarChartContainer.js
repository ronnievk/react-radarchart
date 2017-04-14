import React from 'react';
import RadarChart from './RadarChart';
import ResponsiveWrapper from './ResponsiveWrapper'

const axes = [
    { dataKey: 'socialeActiviteit', label: 'Sociale activiteit', domain: [0, 100] },
    { dataKey: 'energie', label: 'Energie', domain: [0, 100] },
    { dataKey: 'mobiliteit', label: 'Mobiliteit', domain: [0, 100] },
    { dataKey: 'blaascontrole', label: 'Blaascontrole', domain: [0, 100] },
    { dataKey: 'cognitie', label: 'Cognitie', domain: [0, 100] },
];

function getRandomData() {
    return {
      mobiliteit: Math.round(Math.random()*100),
      blaascontrole: Math.round(Math.random()*100),
      socialeActiviteit: Math.round(Math.random()*100),
      energie: Math.round(Math.random()*100),
      cognitie: Math.round(Math.random()*100)
  };
}

class RadarChartContainer extends React.Component {
        
    constructor(props) {
        super(props);
        this.state = { data: props.testdata };
    }
    
    randomizeData() {
        this.setState({ data: [getRandomData()] });
    }
    
    render() {  
        //console.log('width: ' + this.props.parentWidth);
        const chartProps = {
            axes: axes,
            options: { 
                parentWidth: this.props.parentWidth
            },
            data: this.state.data
        }
        return <div className="chart-container">
                <RadarChart {...chartProps} />
                <button className="btn randomize" onClick={() => this.randomizeData()}>
                    Randomize Data
                </button>
            </div>
    }
}

export default ResponsiveWrapper(RadarChartContainer)