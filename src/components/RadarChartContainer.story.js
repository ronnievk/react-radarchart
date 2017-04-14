import React from 'react';

import { storiesOf, action } from '@kadira/storybook';

import RadarChartContainer from './RadarChartContainer';

function getTestData(cognitieValue = 23) {
    return {
      mobiliteit: 89,
      blaascontrole: 61,
      socialeActiviteit: 48,
      energie: 55,
      cognitie: cognitieValue
  };
}

function buildStory(attrs) {
    const radarProps = {
        ...attrs
    };
  return <RadarChartContainer {...radarProps} />;
}

storiesOf('RadarChartContainer', module)
  .addDecorator(story => (
    <div style={{ background: 'rgb(41, 171, 226)', width: '100%' }}>{story()}</div>
  ))
  .add('no data', () => buildStory({ testdata: [] }))
  .add('with data', () => buildStory({ testdata: [getTestData()] }))
  .add('multiple datarecords', () => buildStory({ testdata: [getTestData(), getTestData(89)] }));


