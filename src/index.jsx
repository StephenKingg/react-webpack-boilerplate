import 'babel-polyfill';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './Routes';

import './global/reset.css';
import './global/base.css';

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
    renderAPP(Routes);
  });
}
