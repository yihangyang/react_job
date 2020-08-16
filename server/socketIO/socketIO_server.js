const { ChatModel } = require('../db/models')

module.exports = function (server) {
  const io = require('socket.io')(server)
  
  io.on('connection', function (socket) {
    console.log('a client connects with server')
    
    // receive msg from client
    socket.on('sendMsg', function ({from, to, content}) {
      console.log('server get the data from client', {from, to, content})
      // data verarbeitung(save msg)
      // build chatMsg object
      const chat_id = [from, to].sort().join('_')// from_to or to_from
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save(function(err, chatMsg) {
        // server send msg to all conneted client
        io.emit('receiveMsg', chatMsg)
      })
      // data.name = data.name.toUpperCase()
      // 
      // socket.emit('receiveMsg', data)
      // console.log("server send msg to client", data)
    })
  })
}
