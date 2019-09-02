import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Hello from "../Hello";
import WorkPlace from "../WorkPlace";
import WorkStation from "../WorkStation";

const Page = styled.main`
  margin-left: 200px;
`;

const Navigation = () => (
  <Page>
    <Switch>
      <Route path="/" exact component={Hello} />
      <Route path="/graphs/:slug" render={props => <WorkPlace {...props} />} />
      <Route
        path="/summit/:slug"
        render={props => <WorkStation {...props} />}
      />
    </Switch>
  </Page>
);

export default Navigation;
