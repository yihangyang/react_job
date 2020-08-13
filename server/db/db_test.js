const md5 = require('blueimp-md5')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/react_job')

const conn = mongoose.connection
conn.on('connected', function () {
  console.log('mogondb connect sucess')
})

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true},
  header: {type: String}
})

const UserModel = mongoose.model('user', userSchema)

function testSave() {
  const userModel = new UserModel({username: 'App', password: md5('234'), type: 'bewerber'})
  userModel.save(function(err, user) {
    console.log('save()', err, user)
  })
}

function testFind() {
  // UserModel.find(function(err, users) {
  //   console.log('find()', err, users)
  // })
  UserModel.findOne({username: 'Bob'}, function (err, user) {
    console.log('findOne()', err, user)
  })
}

function testUpdate() {
  UserModel.findByIdAndDelete({_id:'5f338cef7af64b4e00bcbf15'},{username: 'Jack'}, function (err, oldUser) {
    console.log('testUpdate()', err, oldUser)
  })
}

function testDelete() {
  UserModel.remove({_id:'5f338cffecc0c830b4e0b2dc'}, function(err, doc) {
    console.log('remove()', err, doc)
  })
}
testDelete()