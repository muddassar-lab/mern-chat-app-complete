const { green, red, bold } = require('colorette')

module.exports = (io, socket) => {
    const joinChat = async (chat) => {
        socket.join(chat._id)
        console.log(bold(green(`User Joined ${chat.name}`)))
    }
    const leaveChat = async (chat) => {
        socket.leave(chat._id)
        console.log(bold(red(`User Left ${chat.name}`)))
    }

    socket.on('chat:join', joinChat)
    socket.on('chat:leave', leaveChat)
}
