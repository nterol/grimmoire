import React from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import "./components/styles/app.scss";

import Navigation from "./components/navigation/Navigation";

import Menu from "./components/Menu/Menu";

const client = new ApolloClient({
  uri: "https://afternoon-dusk-85001.herokuapp.com/"
});

const App = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Menu />
      <Navigation />
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
