import React, { Component } from 'react';

import style from './style.scss';

export default class Home extends Component {
  render() {
    const elem = <div className={style.header}>Hello, Page2</div>;

    return elem;
  }
}
