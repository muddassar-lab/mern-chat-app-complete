const {
    registerChatHandler,
    registerSetupHandler,
    registerTypingHandler,
    registerMessageHandler,
} = require('./handlers')

const onSocketConnection = (io, socket) => {
    registerSetupHandler(io, socket)
    registerChatHandler(io, socket)
    registerTypingHandler(io, socket)
    registerMessageHandler(io, socket)
}

module.exports = onSocketConnection
