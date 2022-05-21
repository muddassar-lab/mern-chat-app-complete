const asyncHandler = require('express-async-handler')
const { Chat } = require('../../Models')

const NotGroupAdminMiddleware = asyncHandler(async (req, res, next) => {
    const { chatID } = req.body
    if (!chatID) {
        res.status(400)
        throw new Error('please provide a chat ID')
    }
    try {
        const chat = await Chat.findById(chatID)
        if (chat) {
            if (!chat.groupAdmin._id.equals(req.user._id)) {
                req.chat = chat
                next()
            } else {
                res.status(401).json({
                    message: 'Group Admin can not leave the chat',
                })
            }
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't perform operation.Please try again")
    }
})

module.exports = { NotGroupAdminMiddleware }
