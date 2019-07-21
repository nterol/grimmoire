import React from "react";
import styled from "styled-components";
import { Switch, Route } from "react-router-dom";

import Hello from "../Hello";
import WorkPlace from "../WorkPlace";

const Page = styled.main`
  background: #fffefc;
  margin-left: 200px;
`;

const Navigation = () => (
  <Page>
    <Switch>
      <Route path="/" exact component={Hello} />
      <Route path="/graphs/:slug" render={props => <WorkPlace {...props} />} />
    </Switch>
  </Page>
);

export default Navigation;
