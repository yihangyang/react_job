import React, { Component } from 'react';
import { connect } from 'react-redux'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'

class GeberInfo extends Component {
  state = {
    header: "", 
    post: "", 
    info: "",
    company: "", 
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
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <NavBar>GeberInfo</NavBar>
        <HeaderSelector setHeader={this.setHeader}/>
        <InputItem placeholder="place enter job" onChange={val => {this.handleChange('post', val)}}>Job:</InputItem>
        <InputItem placeholder="place enter company" onChange={val => {this.handleChange('company', val)}}>Company:</InputItem>
        <InputItem placeholder="place enter salary" onChange={val => {this.handleChange('salary', val)}}>Salary:</InputItem>
        <TextareaItem title="Skills" rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type="primary" onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(GeberInfo)