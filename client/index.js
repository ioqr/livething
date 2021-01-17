const canvas = document.getElementById('cnvs')

const ctx = cnvs.getContext('2d')
ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

let drawing = false
let x, y

const socket = io('ws://localhost:3000/')

socket.on('seg', ({x1, x2, y1, y2, color}) => {
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  ctx.closePath()
})

canvas.addEventListener('mousedown', e => {
  x = e.offsetX 
  y = e.offsetY
  drawing = true
})

canvas.addEventListener('mouseup', e => {
  drawing = false
})

canvas.addEventListener('mousemove', e => {
  if (!drawing) return

  socket.emit('seg', {
    x1: x,
    y1: y,
    x2: e.offsetX,
    y2: e.offsetY,
  })

  x = e.offsetX
  y = e.offsetY
})