import io from 'socket.io-client'

import {
  AUTH_SUCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST, RECEIVE_MSG_LIST, RECEIVE_MSG, MSG_READ
} from './action-types'
import { reqRegister, reqLogin, reqUpdateUser, reqUserInfo, reqUserList, reqChatMsgList, reqReadMsg } from '../api'

function initIO(dispatch, userid) {
  // connect to server, get connect io object
  if(!io.socket) {
    io.socket = io('ws://localhost:4000')
    // listen: receive msg from server
    io.socket.on('receiveMsg', function(chatMsg) {
      console.log("listen: receive msg from server", chatMsg)
      // only the receiver of chat_msg is this user, then save
      if (userid === chatMsg.from || userid === chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })
  }
}

async function getChatMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code === 0) { // success
    const { users, chatMsgs } = result.data
    dispatch(receiveChatMsgList({ users, chatMsgs, userid }))
  } else { // fail
    dispatch(errorMsg(result.msg))
  }
}

export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    console.log("client send msg to server", {from, to, content})
    // send msg
    io.socket.emit("sendMsg", {from, to, content})
  }
}

export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if (result.code === 0) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    }
  }
}

const authSucess = (user) => ({type: AUTH_SUCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
const receiveChatMsgList = ({ users, chatMsgs, userid }) => ({type: RECEIVE_MSG_LIST, data: { users, chatMsgs, userid }})
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg,userid}})
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})

export const register = (user) => {
  const {username, password, password2, type} = user
  // frontend check
  if (!username) {
    return errorMsg('Please enter username')
  } else if (password !== password2) {
    return errorMsg('Confirmed password not consistent')
  }
  // form legal
  return async dispatch => {
    // send register async request
    const response = await reqRegister({username, password, type})
    const result = response.data
    if(result.code === 0) { // success
      getChatMsgList(dispatch, result.data._id)
      dispatch(authSucess(result.data))
    } else { // fail
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = (user) => {
  const {username, password} = user
  if (!username) {
    return errorMsg('Please enter username')
  } else if(!password) {
    return errorMsg('Please enter password')
  }
  return async dispatch => {
    // send login async request
    const response = await reqLogin(user)
    const result = response.data
    if(result.code === 0) { // success
      getChatMsgList(dispatch, result.data._id)
      dispatch(authSucess(result.data))
    } else { // fail
      dispatch(errorMsg(result.msg))
    }
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code === 0) { // success
      dispatch(receiveUser(result.data))
    } else { // fail
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const response = await reqUserInfo()
    const result = response.data
    if(result.code === 0) {
      getChatMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}
