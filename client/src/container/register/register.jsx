import React, { Component } from 'react';
import {
  NavBar, WingBlank, List, InputItem, WhiteSpace, Radio, Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/actions'
import Logo from '../../components/logo/logo'
const Item = List.Item

class Register extends Component {
  state = {
    username: '',
    password: '',
    password2: '',
    type: 'geber',
  }

  register = () => {
    this.props.register(this.state)
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }
  render(){
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    if(redirectTo) {
      return <Redirect to={redirectTo} />
    }
    return(
      <div>
        <NavBar>Job</NavBar>
        <Logo />
        <WingBlank>
          <List>
            {msg ? <div className="error-msg">{msg}</div> : null}
            <InputItem placeholder="username" onChange={ val => {this.handleChange("username", val)}}>Username</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder="password" type="password" onChange={ val => {this.handleChange("password", val)}}>Password</InputItem>
            <WhiteSpace></WhiteSpace>
            <InputItem placeholder="confirm password" type="password" onChange={ val => {this.handleChange("password2", val)}}>Confirm</InputItem>
            <Item>
              <span>User Type</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='bewerber'} onChange={ () => {this.handleChange("type", 'bewerber')}}>Bewerber</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='geber'} onChange={ () => {this.handleChange("type", 'geber')}}>Arbeitgeber</Radio>
            </Item>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>Register</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>Already have account</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)