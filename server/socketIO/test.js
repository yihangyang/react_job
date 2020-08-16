module.exports = function (server) {
  const io = require('socket.io')(server)
  
  io.on('connection', function (socket) {
    console.log('a client connects with server')
    
    // receive msg from client
    socket.on('sendMsg', function (data) {
      console.log('server get the data from client', data)
      // data verarbeitung
      data.name = data.name.toUpperCase()
      // server send msg to client
      socket.emit('receiveMsg', data)
      console.log("server send msg to client", data)
    })
  })
}


/*
module.exports = function (server) {
  // io object
  const io = require('socket.io')(server)
  io.on('connect', function (socket) {
    console.log('socketio connect')
    // on sendMsg listen,  receive msg from client
    socket.on('sendMsg', function (data) {
      console.log('server receive msg from browser', data)
      // send client msg(name, data)
      io.emit('receiveMsg', data.name + '_' + data.date)
      console.log('server send Msg to browser', data.name + '_' + data.date)
    })
  })
}

*/