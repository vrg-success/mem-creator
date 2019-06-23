import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/index';
import { Main } from './pages/main/main';
import { Create } from './pages/create/create';

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route path="/create" component={Create} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);