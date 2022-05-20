const jwt = require('jsonwebtoken')

const generateToken = async (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '15d',
    })

module.exports = { generateToken }
