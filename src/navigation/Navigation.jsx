import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Hello from '../components/Hello';

import Graph from '../components/Graph';
import Note from '../components/Note';
import { Page } from './styles';

function Navigation() {
  return (
    <Page>
      <Switch>
        <Route path="/" exact component={Hello} />
        <Route path="/graphs/:slug" render={props => <Graph {...props} />} />
        <Route path="/summit/:slug" render={props => <Note {...props} />} />
      </Switch>
    </Page>
  );
}

export default Navigation;
