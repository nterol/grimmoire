import React from "react";

import { Switch, Route } from "react-router-dom";

import Hello from "../components/Hello";

import { GraphView } from "../views/graph-view";
import { NoteView } from "../views/note-view";
import { Page } from "./styles";

function Navigation() {
  return (
    <Page>
      <Switch>
        <Route path="/" exact component={Hello} />
        <Route
          path="/graphs/:slug"
          render={props => <GraphView {...props} />}
        />
        <Route path="/summit/:slug" render={props => <NoteView {...props} />} />
      </Switch>
    </Page>
  );
}

export default Navigation;
