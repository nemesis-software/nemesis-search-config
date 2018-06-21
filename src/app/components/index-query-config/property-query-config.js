import React, {Component} from 'react';
import PropertyQueryConfigEditor from "source/app/components/index-query-config/property-query-config-editor";

export default class PropertyQueryConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedProperty: null};
  }

  render() {
    return (
      <div className="property-query-config">
        {this.state.selectedProperty ?
          <PropertyQueryConfigEditor data={this.state.selectedProperty}/> :
          this.props.data.map(prop => <div onClick={() => this.setState({selectedProperty: prop})}
                                           key={prop.name}>{prop.name}</div>)
        }
      </div>
    );
  }


}