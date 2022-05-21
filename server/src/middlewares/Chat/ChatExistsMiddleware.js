const asyncHandler = require('express-async-handler')
const { Chat } = require('../../Models')

const ChatExistsMiddleware = asyncHandler(async (req, res, next) => {
    const { chatID } = req.body
    try {
        const chat = await Chat.findById(chatID)
        if (chat) {
            req.chat = chat
            next()
        } else {
            res.status(400).json({ message: 'Chat not found' })
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't perform operation.Please try again")
    }
})
module.exports = { ChatExistsMiddleware }
