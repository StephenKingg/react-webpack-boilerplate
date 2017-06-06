import React, { Component } from 'react';

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
        Hello, world!
      </div>
    );
  }
}

export default Root;
