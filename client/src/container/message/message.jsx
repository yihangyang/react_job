import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

// grouping chatMsgs with chat_id(chat_id = senduser + receiveuser), only the last msg is taken
// return the all last_msg array
function getLastMsgs(chatMsgs, userid) {
  // 1. find the last_msg in every chat, save in object {key: chat_id, value: lastmsg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {
    if(msg.to === userid && !msg.read) { // other send to you, and you havnt read yet
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }
    const chatId = msg.chat_id
    let lastMsg = lastMsgObjs[chatId]
    if(!lastMsg) { // this msg is the last msg in this group
      lastMsgObjs[chatId] = msg
    } else {
      // add new unReadCount
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      if(msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      // add unReadCount, save in newest lastMsg
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  });
  // 2. get all lastmsg array
  const lastMsgs = Object.values(lastMsgObjs)
  // 3. sort in create_time
  lastMsgs.sort(function(m1, m2) { // if < 0, move m1 before m2, if = 0 => no move, if < 0, move m2 before m1
    return m2.create_time - m1.create_time
  })
  return lastMsgs
}

class Message extends Component {

  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat
    
    const lastMsgs = getLastMsgs(chatMsgs, user._id)
    return (
      <List style={{marginTop:50, marginBottom: 50}}>
        {
          // msg.to === user._id means this msg is from other to me, highlight the msg.from(other)
          // msg.to !== user._id means this msg is from me to other, highlight the msg.to(other)
          lastMsgs.map(msg => {
            const targetUserId = msg.to === user._id ? msg.from : msg.to
            const targetUser = users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header.toLowerCase()}.png`) : null}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)