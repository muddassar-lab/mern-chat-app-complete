// imports
require('dotenv').config()
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const { red, bold } = require('colorette')

const connectToDatabase = require('./database/database')
const onSocketConnection = require('./socket/socket')

const { userRoutes, chatRoutes, messageRoutes } = require('./routes')
const { notFound, errorHandler } = require('./middlewares')

// Environment Variables
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app'
const NODE_ENV = process.env.NODE_ENV || 'development'

// Declaration of app
const app = express()
// declaration of server
const server = http.createServer(app)

// Listen to server
server.listen(PORT, () => {
    console.log(red(bold(`----------Server running on port ${PORT}----------`)))
})
// app middlewares

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(mongoSanitize())

// App Routes
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// Deployment
const _dirname1 = path.resolve()
if (NODE_ENV === 'production') {
    app.use(express.static(path.join(_dirname1, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname1, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('Api is running successfully')
    })
}
// Error Handlers
app.use(notFound)
app.use(errorHandler)

// Socket Initialization
const io = socket(server)
io.on('connection', (userSocket) => onSocketConnection(io, userSocket))

// database
connectToDatabase(MONGO_URI)
