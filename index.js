const jsonServer = require('json-server')
const db = require('./db')

const server = jsonServer.create()
const router = jsonServer.router(db())
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 9090;

server.use(middlewares)
server.use(router)

server.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' }}
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

server.listen(PORT, () => {
  console.log(`Noteful json-server started at ${PORT}`)
})
