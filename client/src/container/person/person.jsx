import React, { Component } from 'react';
import { connect } from 'react-redux'
import { List, Result, WhiteSpace, Button, Modal } from 'antd-mobile';
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Person extends Component {
  logout = () => {
    Modal.alert("exit", "Sure to exit", [
      {text: 'Cancel'},
      {
        text: 'Sure',
        onPress: () => {
          // remove userid from cookie
          Cookies.remove('userid')
          // remove user from redux
          this.props.resetUser()
        }
      }
    ])
  }
  render() {
    const { username, info, header, company, post, salary } = this.props.user
    const header_l = header.toLowerCase()
    return (
      <div style={{marginBottom: 50, marginTop: 50}}>
        <Result
          img={<img src={require(`../../assets/images/${header_l}.png`)}/>}
          title={ username }
          message={ company }
        />
        <List renderHeader={() => 'info'}>
          <Item multipleLine >
            <Brief>Job: {post}</Brief>
            <Brief>Info: {info}</Brief>
            {salary ? (<Brief> Salary: {salary} </Brief>) : null}
          </Item>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <List>
          <Button type="warning" onClick={this.logout}>Log out</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  { resetUser }
)(Person)