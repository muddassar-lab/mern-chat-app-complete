// imports
require('dotenv').config()
const express = require('express')
const http = require('http')
const socket = require('socket.io')
const path = require('path')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const mongoose = require('mongoose')
const connectToDatabase = require('./database/database')
const onSocketConnection = require('./socket/socket')

// Environment Variables
const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app'
const NODE_ENV = process.env.NODE_ENV || 'development'

// Declaration of app
const app = express()
// declaration of server
const server = http.createServer(app)
// app middlewares

app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(mongoSanitize())

// Socket Initialization
const io = socket(server)
io.on('connection', onSocketConnection)

// database
connectToDatabase(MONGO_URI)
