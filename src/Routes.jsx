import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { createStore, combineReducers } from 'redux';
// import { Provider } from 'react-redux';
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

// import * as reducers from './reducers';

import Home from './components/Home/index';
import Page1 from './components/Page1/index';
import Page2 from './components/Page2/index';
import Page3 from './components/Page3/index';
import Page4 from './components/Page4/index';

const publicPath = '/';

export const PAGE = {
  home: publicPath,
  page1: `${publicPath}page1`,
  page2: `${publicPath}page2`,
  page3: `${publicPath}page3`,
  page4: `${publicPath}page4`,
};

const Routes = () =>
  (<Router basename={publicPath}>
    <div>
      <Route exact path={publicPath} component={Home} />
      <Route path={PAGE.page1} component={Page1} />
      <Route path={PAGE.page2} component={Page2} />
      <Route path={PAGE.page3} component={Page3} />
      <Route path={PAGE.page4} component={Page4} />
    </div>
  </Router>);

export default Routes;
