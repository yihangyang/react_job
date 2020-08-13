import { combineReducers } from 'redux'
import { AUTH_SUCESS, ERROR_MSG } from './action-types'

const initUser = {
  username: '',
  type: '',
  msg: '',
  redirectTo: ''
}
function user(state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCESS: // data: user
      return { ...action.data, redirectTo: '/'}
    case ERROR_MSG: // data: msg
      return {...state, msg: action.data}
    default:
      return state
  }
}

export default combineReducers({
  user
})