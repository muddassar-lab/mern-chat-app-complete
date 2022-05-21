const asyncHandler = require('express-async-handler')
const { Message, Chat } = require('../Models')

const send = asyncHandler(async (req, res) => {
    const { content } = req.body
    const { chat, user } = req
    try {
        const message = await Message.create({
            sender: user._id,
            content,
            chat: chat._id,
        })
        if (message) {
            chat.latestMessage = message._id
            const updatedChat = await chat.save()
            if (updatedChat) {
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
    const { chat } = req
    try {
        const messages = await Message.find({
            chat: chat._id,
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
