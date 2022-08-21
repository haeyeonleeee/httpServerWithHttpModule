
const http = require('http')
const express = require('express')
const { createUser } = require('./app')

const app = express()
app.use(express.json())

app.get('/ping', (req, res) => {
  res.json({ message: '/ pong' })
})

app.post('/signup', createUser)// 첫번째 인자에는 endpoint url 을 기입하고,

const server = http.createServer(app)

server.listen(8000, () => {
  console.log('server is listening on PORT 8000')
})