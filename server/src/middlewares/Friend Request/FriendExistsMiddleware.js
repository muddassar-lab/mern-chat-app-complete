const asyncHandler = require('express-async-handler')
const { FriendRequest } = require('../../Models')

const FriendExistsMiddleware = asyncHandler(async (req, res, next) => {
    const { userID } = req.body
    const { user } = req
    if (!userID) {
        res.status(400)
        throw new Error('Please provide the user id')
    }
    try {
        if (user.friends.includes(userID)) {
            res.status(400)
            throw new Error('User is already your friend')
        } else {
            next()
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to send friend request.Please try again')
    }
})

module.exports = { FriendExistsMiddleware }
