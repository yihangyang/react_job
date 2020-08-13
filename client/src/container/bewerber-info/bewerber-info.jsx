import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

class BewerberInfo extends Component {
  render() {
    return (
      <div>
        <NavBar>BewerberInfo</NavBar>
        <HeaderSelector />
        <InputItem placeholder="place enter job">Job:</InputItem>
        <InputItem placeholder="place enter salary">Salary:</InputItem>
        <TextareaItem title="Intro" rows={3} />
        <Button type="primary">Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(BewerberInfo)