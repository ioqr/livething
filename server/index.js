const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
})

io.attach(3000)

io.on('connection', socket => {
  const color = `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
  socket.on('seg', data => {
    io.sockets.emit('seg', { ...data, color })
  })
})
