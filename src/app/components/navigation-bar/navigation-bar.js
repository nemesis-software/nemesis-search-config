import React, { Component } from 'react';
import IndexQueryConfig from "source/app/components/index-query-config/index-query-config";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {topBarX: 20, topBarY: 100, isPersonalizationView: false};
    this.mouseY = 0;
    this.mouseX = 0;
    this.isHoldOnTopBar = false;
  }

  componentWillMount() {
    let that = this;
    document.onmousemove = (e) => {
      if (that.isHoldOnTopBar) {
        let actualX = that.getValidActualX(that.state.topBarX + (e.pageX - that.mouseX));
        let actualY = that.getValidActualY(that.state.topBarY + (e.pageY - that.mouseY));
        that.setState({...that.state, topBarX: actualX, topBarY: actualY});
      }
      that.mouseX = e.pageX;
      that.mouseY = e.pageY;
    };

    document.onmouseup = (e) => {
      if (that.isHoldOnTopBar) {
        that.isHoldOnTopBar = false;
      }
    }
  }

  getValidActualX(value) {
    if (value < 0) {
      return 0;
    }
    let windowWidth = $(window).width();

    if (windowWidth < 260) {
      return 0;
    }

    if (value > (windowWidth - 260)) {
      return windowWidth - 260;
    }

    return value;
  }

  getValidActualY(value) {
    if (value < 0) {
      return 0;
    }
    let windowHeight = $(window).height();

    if (value > (windowHeight - 60)) {
      return windowHeight - 60;
    }

    return value;
  }

  render() {
    return (
      <div className="search-config-nav-bar" style={{top: this.state.topBarY, left: this.state.topBarX, lineHeight: '1em'}}>
        <div className="top-bar"
             onMouseDown={() => this.isHoldOnTopBar = true}
             onMouseUp={() => this.isHoldOnTopBar = false}>
          Search config
        </div>
        <IndexQueryConfig/>
      </div>
    );
  }
}