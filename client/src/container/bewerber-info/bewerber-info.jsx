import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

import { updateUser } from '../../redux/actions'

class BewerberInfo extends Component {
  state = {
    header: "", 
    post: "", 
    info: "", 
    salary: ""
  }

  setHeader = (header) => {
    this.setState({
      header
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render() {
    // if info completed, redirect to geber oder bewerber's main page
    const { header, type} = this.props.user
    if (header) { // info completed
      const path = type === 'geber' ? '/geber' : '/bewerber'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>BewerberInfo</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder="place enter job" onChange={val => {this.handleChange('post', val)}}>Job:</InputItem>
        <InputItem placeholder="place enter salary" onChange={val => {this.handleChange('salary', val)}}>Salary:</InputItem>
        <TextareaItem title="Intros" rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type="primary" onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  { updateUser }
)(BewerberInfo)