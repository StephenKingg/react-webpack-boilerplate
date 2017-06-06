import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PAGE } from '../../Routes';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      elem: '',
    };
  }

  handleClick(e) {
    this.setState({
      elem: e,
    });
    console.log(this.state.elem);
  }

  render() {
    let pageTitle = '登录';
    const { location } = this.props;

    switch (location.pathname) {
      case '/':
        pageTitle = '登录';
        break;
      case '/page1':
        pageTitle = '页面一';
        break;
      case '/page2':
        pageTitle = '页面二';
        break;
      case '/page3':
        pageTitle = '页面三';
        break;
      case '/page4':
        pageTitle = '页面四';
        break;
      default:
        pageTitle = '欢迎';
        break;
    }

    document.title = pageTitle;

    const elem = (
      <div>
        <div>Hello, Home</div>
        <div className="menu">
          <Link to={`${PAGE.home}`} onClick={this.handleClick}>{PAGE.home}</Link>
          <Link to={`${PAGE.page1}`} onClick={this.handleClick}>{PAGE.page1}</Link>
          <Link to={`${PAGE.page2}`} onClick={this.handleClick}>{PAGE.page2}</Link>
          <Link to={`${PAGE.page3}`} onClick={this.handleClick}>{PAGE.page3}</Link>
          <Link to={`${PAGE.page4}`} onClick={this.handleClick}>{PAGE.page4}</Link>
        </div>
      </div>
    );

    return elem;
  }
}
