const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/react_job')

const conn = mongoose.connection

conn.on('connected', () => {
  console.log('mogondb connect success')
})

const userSchema = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
  type: {type: String, required: true}, 
  header: {type: String}, 
  post: {type: String}, 
  info: {type: String},
  company: {type: String}, 
  salary: {type: String} 
})

const UserModel = mongoose.model('user', userSchema)

exports.UserModel = UserModel

const chatSchema = mongoose.Schema({
  from: {type: String, required: true},
  to: {type: String, required: true},
  to: {type: String, required: true},
  chat_id: {type: String, required: true}, // (from) + (to) array in order to sort sequence and and grouping
  content: {type: String, required: true},
  read: {type: Boolean, default: false},
  create_time: {type: Number},
})

const ChatModel = mongoose.model('chat', chatSchema)

exports.ChatModel = ChatModel