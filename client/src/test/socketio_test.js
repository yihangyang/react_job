import io from 'socket.io-client'

// connect to server, get connect io object
const socket = io('ws://localhost:4000')

// client send msg to server
socket.emit('sendMsg', {name: 'abc'})
console.log("client send msg to server", {name: 'abc'})

// listen: receive msg from server
socket.on('receiveMsg', function(data) {
  console.log("listen: receive msg from server", data)
})

/*
import io from 'socket.io-client'

// connect to server, get socket
const socket = io('ws://localhost:4000')

// on receiveMsg listen, receive msg from server
socket.on('receiveMsg',function (data) {
  console.log('Browser obain Msg', data)
})

// send msg to server
socket.emit('sendMsg', {name: 'Tom', date: Date.now()})
console.log('Browser send Msg to server', {name: 'Tom', date: Date.now()})

*/