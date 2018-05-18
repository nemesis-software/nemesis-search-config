import React, { Component } from 'react';
import NavigationBar from './navigation-bar/navigation-bar';
import $ from 'jquery';

import 'react-select/dist/react-select.css';

import '../../styles/style.less';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLiveEditEnabled: false, showAllSlots: false}
  }

  componentWillMount() {
    let urlVars = this.getUrlVars();
    if (urlVars['token']) {
      localStorage.setItem('privateToken', urlVars['token']);
    }
  }

  render() {
    return (
      <div style={{zIndex: 100000000}}>
        <NavigationBar/>
      </div>
    );
  }

  getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      vars[key] = value;
    });
    return vars;
  }
}