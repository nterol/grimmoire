import React from "react";
import { createGlobalStyle } from "styled-components";

import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import "./components/styles/app.scss";

import Navigation from "./navigation/Navigation";
import { Menu } from "./views/menu/";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  resolvers: {
    Mutation: {
      toggleReduce: (_root, variables, { cache, getCacheKey }) => {
        const id = getCacheKey({ __typename: "reduce", id: variables.id });
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
  uri: "https://afternoon-dusk-85001.herokuapp.com/"
});

const Globalstyle = createGlobalStyle`

`;

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider connectToDevTools client={client}>
        <Globalstyle />
        <Menu />
        <Navigation />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
