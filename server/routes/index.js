var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const UserModel = require('../db/models').UserModel
const filter = { password: 0, __v: 0}

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
module.exports = router;
