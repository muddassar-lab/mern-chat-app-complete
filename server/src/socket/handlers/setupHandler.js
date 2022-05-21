const { green, red, bold } = require('colorette')

module.exports = (io, socket) => {
    const setupUser = async (user) => {
        socket.join(user._id)
        console.log(bold(green(`${user.name} has become online`)))
        socket.emit('connected')
    }
    const unSetupUser = async (user) => {
        socket.leave(user._id)
        console.log(bold(red(`${user.name} has become offline`)))
    }

    socket.on('user:setup', setupUser)
    socket.off('user:setup', unSetupUser)
}
