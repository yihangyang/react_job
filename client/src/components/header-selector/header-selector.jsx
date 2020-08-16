import React, { Component } from 'react';
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'


export default class HeaderSelector extends Component {

  static propsTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null
  }

  constructor(props) {
    super(props)
    this.headerList = []
    for (let i = 0; i < 20; i++) {
      this.headerList.push({
        text: 'Head' + (i+1),
        icon: require(`../../assets/images/head${i+1}.png`)
      })
    }
  }
  handleClick = ({text, icon}) => {
    // update current component state
    this.setState({icon})
    // call function update father component state
    this.props.setHeader(text)

  }

  render() {
    const {icon} = this.state
    const listHeader = !icon ? 'Please choose header': (
      <div>
        Your Icon: <img src={icon} />
      </div>
    )
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}