import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import ApolloClient, { gql } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import theme from './components/theme';

import Navigation from './pages/Navigation';
import Menu from './components/Menu/';

require('typeface-roboto');

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      toggleReduce: (_root, variables, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: 'reduce', id: variables.id });
        const fragment = gql`
          fragment toggleReduceState  {
            true
          }
        `;

        const toggle = cache.readFragment({ fragment, id });
        const data = {};
      }
    }
  },
  uri: 'https://afternoon-dusk-85001.herokuapp.com/'
});

const GlobalStyle = createGlobalStyle`
html {
  font-family: roboto;
}

body {
  margin: 0px;
}
a {text-decoration: none}
a:visited { text-decoration: none; }
a:hover { text-decoration: none; color:blue; }
a:focus { text-decoration: none; color:yellow; }
a:hover, a:active { text-decoration: none; color:black }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ApolloProvider connectToDevTools client={client}>
          <GlobalStyle />
          <Menu reduce={true} />
          <Navigation />
        </ApolloProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
