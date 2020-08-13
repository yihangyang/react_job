import React, { Component } from 'react';
import { List, Grid } from 'antd-mobile'


export default class HeaderSelector extends Component {
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
  render() {
    const listHeader = 'Pleasr choose header'
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}></Grid>
      </List>
    )
  }
}