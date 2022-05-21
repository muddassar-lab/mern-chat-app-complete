const asyncHandler = require('express-async-handler')
const { Chat } = require('../../Models')

const GroupAdminMiddleware = asyncHandler(async (req, res, next) => {
    const { chatID } = req.body

    if (!chatID) {
        res.status(401).json({
            message: 'Please provide a chatID',
        })
    }
    try {
        const chat = await Chat.findById(chatID)

        if (chat) {
            if (chat.groupAdmin._id.equals(req.user._id)) {
                req.chat = chat
                next()
            } else {
                res.status(401).json({
                    message:
                        'Only Group admin is allowed to perform this operation',
                })
            }
        } else {
            res.status(400).json({ message: 'Chat not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(400)
        throw new Error("Couldn't perform operation.Please try again")
    }
})
module.exports = { GroupAdminMiddleware }
