import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RadarChartContainer from './components/RadarChartContainer';
import {
  ApolloClient,
  ApolloProvider,
} from 'react-apollo';
import { 
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils';
import { typeDefs } from './schema';

/*const mocks = {
  Int: () => Math.floor(Math.random() * 91)
};*/
const mocks = {
  characteristics: () => ({
        mobiliteit: Math.ceil(Math.random() * 100),
        blaascontrole: Math.ceil(Math.random() * 100),
        socialeActiviteit: Math.ceil(Math.random() * 100),
        energie: Math.ceil(Math.random() * 100),
        cognitie: Math.floor(Math.random() * 71)
      })
};
const schema = makeExecutableSchema({ typeDefs });
addMockFunctionsToSchema({ schema, mocks });
const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

const client = new ApolloClient({
    networkInterface: mockNetworkInterface,
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h2>Radarchart component with mocked context</h2>
            </div>
            <div className="App-content">
                <RadarChartContainer />
            </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
