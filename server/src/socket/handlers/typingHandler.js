const { green, red, bold } = require('colorette')

module.exports = (io, socket) => {
    const startTyping = async (chat) => {
        socket.in(chat._id).emit('typing:start')
    }
    const stopTyping = async (chat) => {
        socket.in(chat._id).emit('typing:stop')
    }
    socket.on('typing:start', startTyping)
    socket.on('typing:stop', stopTyping)
}
