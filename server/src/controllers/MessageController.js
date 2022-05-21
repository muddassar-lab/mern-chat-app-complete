const asyncHandler = require('express-async-handler')
const { Message, Chat } = require('../Models')

const send = asyncHandler(async (req, res) => {
    const { content, chatID } = req.body
    try {
        const message = await Message.create({
            sender: req.user._id,
            content,
            chat: req.chat._id,
        })
        if (message) {
            const chat = await Chat.findByIdAndUpdate(chatID, {
                latestMessage: message._id,
            })
            if (chat) {
                res.status(200).json(message)
            } else {
                res.status(400).json({
                    message: "Couldn't send message.Please try again",
                })
            }
        } else {
            res.status(400)
            throw new Error("Couldn't send message.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't send message.Please try again")
    }
})
const fetch = asyncHandler(async (req, res) => {
    const { chatID } = req.body
    try {
        const messages = await Message.find({
            chat: chatID,
        })
        if (messages) {
            res.status(200).json(messages)
        } else {
            res.status(400)
            throw new Error('No messages found')
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't fetch messages.Please try again")
    }
})

module.exports = { send, fetch }
