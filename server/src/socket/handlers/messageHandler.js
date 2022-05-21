const { green, red, bold } = require('colorette')

module.exports = (io, socket) => {
    const sendMessage = async (message) => {
        message.chat.users.forEach((user) => {
            if (user._id !== message.sender._id) {
                socket.in(user._id).emit('message:received', message)
            }
        })
    }
    socket.on('message:send', sendMessage)
}
