const asyncHandler = require('express-async-handler')
const { Chat, User } = require('../Models')
// Chat Methods
const accessChat = asyncHandler(async (req, res) => {
    const { userID } = req.body
    if (!userID) {
        res.status(400)
        throw new Error('Please provide a userID')
    }
    const isChat = await Chat.findOne({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userID } } },
        ],
    })
    if (isChat) {
        res.status(200).json(isChat)
    } else {
        try {
            const user = await User.findById(userID)
            const chat = await Chat.create({
                name: `${req.user.name} & ${user.name}`,
                isGroupChat: false,
                users: [req.user._id, userID],
            })
            if (chat) {
                res.status(200).json(chat)
            } else {
                res.status(400)
                throw new Error("Couldn't create chat.Please try again")
            }
        } catch (error) {
            res.status(400)
            throw new Error("Couldn't create chat.Please try again")
        }
    }
})
const fetchChats = asyncHandler(async (req, res) => {
    try {
        const chats = await Chat.find({
            users: { $elemMatch: { $eq: req.user._id } },
        }).sort({ updatedAt: -1 })
        if (chats) {
            res.status(200).json(chats)
        } else {
            res.status(400)
            throw new Error('No chats found')
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't fetch chats.Please try again")
    }
})
// Group Methods
const createGroupChat = asyncHandler(async (req, res) => {
    const { name, users } = req.body
    if (!name || !users) {
        res.status(400)
        throw new Error('Please provide a name and users')
    }
    try {
        const chat = await Chat.create({
            name,
            isGroupChat: true,
            users,
            groupAdmin: req.user._id,
        })
        if (chat) {
            res.status(200).json(chat)
        } else {
            res.status(400)
            throw new Error("Couldn't create group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't create group.Please try again")
    }
})
const updateGroupChat = asyncHandler(async (req, res) => {
    const { name } = req.body
    const { chat } = req
    if (!name) {
        res.status(400)
        throw new Error('Please provide a name chat id')
    }

    try {
        chat.name = name
        const updatedChat = await chat.save()
        if (updatedChat) {
            res.status(200).json(updatedChat)
        } else {
            res.status(400)
            throw new Error("Couldn't update group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't update group.Please try again")
    }
})
const deleteGroupChat = asyncHandler(async (req, res) => {
    const { chat } = req
    try {
        const deleted = await chat.remove()
        if (deleted) {
            res.status(200).json('Chat deleted successfully')
        } else {
            res.status(400)
            throw new Error("Couldn't delete group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't delete group.Please try again")
    }
})
// Group User Methods
// Add user to a group chat function
const addUserToGroupChat = asyncHandler(async (req, res) => {
    const { userID } = req.body
    const { chat } = req
    if (!userID) {
        res.status(400)
        throw new Error('Please provide a chat id and user id')
    }
    try {
        chat.users.push(userID)
        const updatedChat = await chat.save()
        if (updatedChat) {
            res.status(200).json(updatedChat)
        } else {
            res.status(400)
            throw new Error("Couldn't add user to group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't add user to group.Please try again")
    }
})

// Leave a group chat function
const leaveGroupChat = asyncHandler(async (req, res) => {
    const { chat } = req
    try {
        chat.users.pull(req.user._id)
        const updatedChat = await chat.save()
        if (updatedChat) {
            res.status(200).json(updatedChat)
        } else {
            res.status(400)
            throw new Error("Couldn't leave group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't leave group.Please try again")
    }
})
// Remove a user from group chat function
const removeUserFromGroupChat = asyncHandler(async (req, res) => {
    const { userID } = req.body
    const { chat } = req
    if (!userID) {
        res.status(400)
        throw new Error('Please provide a user id')
    }
    try {
        chat.users.pull(userID)
        const updatedChat = await chat.save()
        if (updatedChat) {
            res.status(200).json(updatedChat)
        } else {
            res.status(400)
            throw new Error("Couldn't remove user from group.Please try again")
        }
    } catch (error) {
        res.status(400)
        throw new Error("Couldn't remove user from group.Please try again")
    }
})

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    updateGroupChat,
    deleteGroupChat,
    addUserToGroupChat,
    leaveGroupChat,
    removeUserFromGroupChat,
}
