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

const UserModel =mongoose.model('user', userSchema)

exports.UserModel = UserModel