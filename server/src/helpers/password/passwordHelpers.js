const bcrypt = require('bcryptjs')

const matchPassword = async (password, userPassword) => {
    const match = await bcrypt.compare(password, userPassword)
    return match
}
const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

module.exports = { matchPassword, generatePassword }
