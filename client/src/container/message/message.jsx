/*
消息界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

// grouping chatMsgs with chat_id(chat_id = senduser + receiveuser), only the last msg is taken
// return the all last_msg array
function getLastMsgs(chatMsgs) {
  // 1. find the last_msg in every chat, save in object {key: chat_id, value: lastmsg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {
    // check the msg w
    const chatId = msg.chat_id
    const lastMsg = lastMsgObjs[chatId]
    if(!lastMsg) { // this msg is the last msg in this group
      lastMsg[chatId] = msg
    } else {

    }
  });
  // 2. get all lastmsg array

  // 3. sort in create_time
}

class Message extends Component {

  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    
    const lastMsgs = getLastMsgs(chatMsgs)
    return (
      <List style={{marginTop:50, marginBottom: 50}}>

        
              <Item
                extra={<Badge text="sd"/>}
                thumb={require(`../../assets/images/head1.png`)}
                arrow='horizontal'
              >
                abc
                <Brief>sss</Brief>
              </Item>
            
          
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)