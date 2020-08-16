import ajax from './ajax'

// register
export const reqRegister = (user) => ajax('/register', user, 'POST')
// login
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')
// update user
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// get user info
export const reqUserInfo = () => ajax('/user')
// get user list(bewerberlist and geberlist)
export const reqUserList = (type) => ajax('/userlist', {type})
// get msg list of this user
export const reqChatMsgList = () => ajax('/msglist')
// modify msg from unread to read
export const reqReadMsg = (from) => ajax("/readmsg", { from }, 'POST')