import React, { Component } from 'react';

import { DatePicker } from 'antd';

import style from './style.scss';

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      isToggleOn: false,
    });
    console.log('clicked', e);
  }

  render() {
    return (
      <div className={style.btn} role="menuitem" onClick={this.handleClick} tabIndex={0}>
        <div>Hello, world!JavaScript</div>
        <div>
          <DatePicker />
        </div>
      </div>
    );
  }
}

export default Root;
