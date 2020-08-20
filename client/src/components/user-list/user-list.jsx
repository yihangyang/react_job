import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render() {
    const {userList} = this.props
    return (
      <div>
        <WingBlank style={{marginBottom: 50, marginTop: 50}}>
          <QueueAnim type="scale">
            {
              userList.map(user => (
                <div key={user._id}>
                  <WhiteSpace />
                  <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                    <Header thumb={require(`../../assets/images/${user.header.toLowerCase()}.png`)}
                            extra={user.username}
                    />
                    <Body>
                      {user.post ? (<div>Job: {user.post}</div>) : null}
                      {user.company ? (<div>Company: {user.company}</div>) : null}
                      {user.salary ? (<div>Salary: {user.salary}</div>) : null}
                      <div>Info: {user.info}</div>
                    </Body>
                  </Card>
                </div>
              ))
            }
          </QueueAnim>
        </WingBlank>
      </div>
    )
  }
}

export default withRouter(UserList)