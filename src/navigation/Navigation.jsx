import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Hello from "../components/Hello";

import { GraphView } from "../views/graph-view";
import { NoteView } from "../views/note-view";

const Page = styled.main`
  margin-left: 200px;
`;

const Navigation = () => (
  <Page>
    <Switch>
      <Route path="/" exact component={Hello} />
      <Route path="/graphs/:slug" render={props => <GraphView {...props} />} />
      <Route path="/summit/:slug" render={props => <NoteView {...props} />} />
    </Switch>
  </Page>
);

export default Navigation;
