import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import RadarChart from './RadarChart';

function getTestData(cognitieValue = 23) {
    return {
      mobiliteit: 89,
      blaascontrole: 61,
      socialeActiviteit: 48,
      energie: 55,
      cognitie: cognitieValue
  };
}

const axes = [
    { dataKey: 'socialeActiviteit', label: 'Sociale activiteit', domain: [0, 100] },
    { dataKey: 'energie', label: 'Energie', domain: [0, 100] },
    { dataKey: 'mobiliteit', label: 'Mobiliteit', domain: [0, 100] },
    { dataKey: 'blaascontrole', label: 'Blaascontrole', domain: [0, 100] },
    { dataKey: 'cognitie', label: 'Cognitie', domain: [0, 70] },
];

function buildStory(attrs) {
    const radarProps = {
        axes: axes,
        data: { error: null, loading: false, values: attrs.testdata }
    };
  return <RadarChart {...radarProps} />;
}

storiesOf('RadarChart', module)
  .addDecorator(story => (
    <div style={{ background: 'rgb(41, 171, 226)', width: '100%' }}>{story()}</div>
  ))
  .add('no data', () => buildStory({ testdata: [] }))
  .add('with data', () => buildStory({ testdata: [getTestData()] }))
  .add('multiple datarecords', () => buildStory({ testdata: [getTestData(), getTestData(89)] }));