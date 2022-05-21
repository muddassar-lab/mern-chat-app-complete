const asyncHandler = require('express-async-handler')

const FriendRequestStatusMiddleware = asyncHandler(async (req, res, next) => {
    const { friendRequest } = req
    if (friendRequest.status !== 'pending') {
        res.status(400)
        throw new Error('Friend request is already accepted or rejected')
    } else {
        next()
    }
})
module.exports = { FriendRequestStatusMiddleware }
