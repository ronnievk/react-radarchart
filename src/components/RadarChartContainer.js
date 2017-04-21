import React from 'react';
import RadarChart from './RadarChart';
import ResponsiveWrapper from './ResponsiveWrapper';
import {
  gql,
  graphql
} from 'react-apollo';

const radarChartQuery = gql`
    query RadarChartQuery {
        values {
            socialeActiviteit
            energie
            mobiliteit
            blaascontrole
            cognitie
        }
    }
`;

const axes = [
    { dataKey: 'socialeActiviteit', label: 'Sociale activiteit', domain: [0, 100] },
    { dataKey: 'energie', label: 'Energie', domain: [0, 100] },
    { dataKey: 'mobiliteit', label: 'Mobiliteit', domain: [0, 100] },
    { dataKey: 'blaascontrole', label: 'Blaascontrole', domain: [0, 100] },
    { dataKey: 'cognitie', label: 'Cognitie', domain: [0, 70] },
];

/*function getRandomData() {
    return {
      mobiliteit: Math.round(Math.random()*100),
      blaascontrole: Math.round(Math.random()*100),
      socialeActiviteit: Math.round(Math.random()*100),
      energie: Math.round(Math.random()*100),
      cognitie: Math.round(Math.random()*100)
  };
}*/

class RadarChartContainer extends React.Component {   
    render() { 
        const chartProps = {
            axes: axes,
            options: { 
                parentWidth: this.props.parentWidth
            },
            data: this.props.data
        }
        return <div className="chart-container">
                <RadarChart {...chartProps} />
            </div>
    }
}

export default graphql(radarChartQuery)(ResponsiveWrapper(RadarChartContainer));