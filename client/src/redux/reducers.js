import { combineReducers } from 'redux'
import {
  AUTH_SUCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ
} from './action-types'

import { getRedirectTo } from '../utils'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}
function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCESS: // data: user
      const {type, header} = action.data
      return { ...action.data, redirectTo: getRedirectTo(type, header)}
    case ERROR_MSG: // data: msg
      return {...state, msg: action.data}
    case RECEIVE_USER: // data: user
      return action.data
    case RESET_USER: // data: msg
      return {...initUser, msg: action.data}
    default:
      return state
  }
}

const initUserList = []
function userList (state = initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat= {
  users: {}, // the object of all user_info, key: userid, value: {username, header}
  chatMsgs: [], // this user's relative msg
  unReadCount: 0 // total unread count
}

function chat(state = initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST: // data: { users, chatMsgs }
      const { users, chatMsgs, userid } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to===userid?1:0), 0)
      }
    case RECEIVE_MSG: // data: chatMsg
      const { chatMsg } = action.data
      console.log(chatMsg)
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to===action.data.userid?1:0)
      }
    case MSG_READ:
      const { from, to, count } = action.data
      state.chatMsgs.forEach(msg => {
        if(msg.from === from && msg.to === to && !msg.read) {
          msg.read = true
        }
      })
      return {
        users: state.users,
        chatMsgs: state.chatMsgs.map(msg => {
          if(msg.from === from && msg.to === to && !msg.read) { // need to update
            return {...msg, read: true}
          } else { // no need to update
            return msg
          }
        }),
        unReadCount: state.unReadCount - count
      }
    default:
      return state
  }
}
export default combineReducers({
  user,
  userList,
  chat
})


