import { AUTH_SUCESS, ERROR_MSG } from './action-types'
import { reqRegister, reqLogin } from '../api'

const authSucess = (user) => ({type: AUTH_SUCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})

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
    if(result.code === 0) { // sucess
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
    if(result.code === 0) { // sucess
      dispatch(authSucess(result.data))
    } else { // fail
      dispatch(errorMsg(result.msg))
    }
  }
}