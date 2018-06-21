import React, {Component} from 'react';
import ApiCall from "source/app/services/api-call";
import Select from 'react-select';
import SelectCustomArrow from "source/app/components/helper-components/select-custom-arrow";
import IndexQueryConfigEditor from "source/app/components/index-query-config/index-query-config-editor";
import PropertyQueryConfig from "source/app/components/index-query-config/property-query-config";

export default class IndexQueryConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {searchOptions: [], selectedSearch: null, indexedType: null, queryConfigEditor: true};

  }

  componentWillMount() {
    let metaDataContainer = document.getElementById('search-live-edit-meta');
    let indexConfig = metaDataContainer.getAttribute('data-indexconfig');
    let indexType = metaDataContainer.getAttribute('data-indexedtype');
    Promise.all([ApiCall.get(`https://solar.local:8112/storefront/facade/search/indexQueryConfigs/${indexConfig}/${indexType}`), ApiCall.get(`https://solar.local:8112/storefront/facade/search/indexedProperties/${indexConfig}/${indexType}`)])
    .then(result => {
      this.setState({searchOptions: result[0].data, indexedProperties: result[1].data, indexedType: indexType})
    });

  }

  render() {
    return (
      <div className="index-query-config">
        {this.state.selectedSearch ?
          <div>
            {this.state.selectedSearch.code}
            <button onClick={() => this.setState({queryConfigEditor: !this.state.queryConfigEditor})}>Switch</button>
            {this.state.queryConfigEditor ?
              <IndexQueryConfigEditor data={this.state.selectedSearch}/>
              :
              <PropertyQueryConfig selectedSearch={this.state.selectedSearch.code} indexedProperties={this.state.indexedProperties} data={this.state.properties} />
            }
          </div> :
          <Select style={{width: '100%'}}
                  clearable={false}
                  className={this.props.selectClassName}
                  arrowRenderer={() => <SelectCustomArrow/>}
                  onChange={(item) => this.onSearchSelect(item.value)}
                  options={this.state.searchOptions.map(this.getOptionFields.bind(this))}/>
        }
      </div>
    );
  }

  onSearchSelect(search) {
    console.log(this.state)
    let url = `https://solar.local:8112/storefront/facade/search/propertyQueryConfigs/relevant/${this.state.indexedType}/${search.code}`
    ApiCall.get(url).then(result => {
      console.log(result.data);
      let data = result.data;
      let properties = Object.keys(data).map(key => {
        return {name: key, data: data[key]};
      })
      this.setState({selectedSearch: search, properties: properties});
    })

  }


  getOptionFields(searchOption) {
    return {value: searchOption, label: searchOption.code};
  }
}