import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routes from './Routes';

import './css/reset.css';
import './css/base.css';

const renderAPP = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Routes routes={Component} />
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderAPP(Routes);

if (module.hot) {
  module.hot.accept('./Routes', () => {
    const next = require('./Routes').default;
    renderAPP(next);
  });
}
