var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const { UserModel, ChatModel } = require('../db/models')
const filter = { password: 0, __v: 0 } // responde should not contain the password

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router: user register

router.post('/register', function(req, res, next) {
  const {username, password, type} = req.body

  UserModel.findOne({username}, function(err, user) {
    if(user) {
      res.send({code: 1, msg: 'account exists'})
    } else {
      new UserModel({username, password: md5(password), type}).save(function(err, user) {
        // cookie
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
        // response
        const data = {username, type, _id: user._id}
        res.send({code: 0, data})
    })
    }
  })
})
// login
router.post('/login', function (req, res, next) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)}, filter, function (err, user) {
    if(user) { // login successfully
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    } else { // login failed
      res.send({code: 1, msg: 'account or password is wrong'})
    }
  })
})
// update user data
router.post('/update', function (req, res, next) {
  // get userid from request cookie
  const userid = req.cookies.userid
  // if cookie not exists
  if(!userid) {
    return res.send({code: 1, msg: 'please log in'})
  }
  // cookie exists, update data
  const user = req.body // no _id
  UserModel.findByIdAndUpdate({_id: userid}, user, function (err, oldUser) {
    if(!oldUser) {
      // userid cookie ist broken, should be deleted
      res.clearCookie('userid')
      // return a message
      res.send({code: 1, msg: 'please log in'})
    } else {
      const {_id, username, type} = oldUser
      const data = Object.assign(user, {_id, username, type})
      res.send({code: 0, data})
    }
  })
})

// obtain user info from cookie-userid
router.get('/user', function (req, res, next) {
  const userid = req.cookies.userid
  if(!userid) {
    return res.send({code: 1, msg: 'please log in'})
  }
  // find
  UserModel.findOne({_id: userid}, filter, function(err, user) {
    res.send({code: 0, data: user})
  })
})

// use user_type to get user_list
// http://localhost:4000/userlist?type=geber
router.get('/userlist', function (req, res) {
  const {type} = req.query
  UserModel.find({type}, filter, function(err, users) {
    res.send({code: 0, data: users })
  }) 
})

// get all chat msg from this user
router.get('/msglist', function (req, res, next) {
  const userid = req.cookies.userid

  UserModel.find(function(err, userDocs) {

    // user object to store user info: key => _id in user, val => the object of name+header
    // const users = {}
    // userDocs.forEach(doc => {
    //   users[doc._id] = {username: doc.username, header: doc.header}
    // })
    const users = userDocs.reduce((users, user) => {
      users[user._id] = {username: user.username, header: user.header}
      return users
    }, {})
    // find all chat infos in userid (from user and to user)
    // param1: condition, param2: filter, param3: callback function
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      res.send({code: 0, data: {users, chatMsgs}})
    })

  })
})

// modify msg from unread to read
router.post('/readmsg', function (req, res, next) {
  const from = req.body.from
  const to = req.cookies.userid // only allowed to modify the msgs which other send me

  // param1: condition, param2: update, param3: default update once, but here should use multi, param4: callback
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function(err, doc) {
    console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) // the num of updated data
  })
})

module.exports = router;
