import { combineReducers } from 'redux'
import { AUTH_SUCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG } from './action-types'

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
      const { users, chatMsgs } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG: // data: chatMsg
      const chatMsg = action.data
      return {
        users: state.users,
        chatMsgs: [...state.chatMsgs, chatMsg],
        unReadCount: 0
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


