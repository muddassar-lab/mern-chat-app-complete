const asyncHandler = require('express-async-handler')
const { FriendRequest } = require('../../Models')

const FriendRequestRecieverMiddleware = asyncHandler(async (req, res, next) => {
    const { friendRequestID } = req.body
    if (!friendRequestID) {
        res.status(400)
        throw new Error('Please provide the friend id')
    }
    try {
        const friendRequest = await FriendRequest.findById(friendRequestID)
        if (friendRequest) {
            if (friendRequest.receiver._id.equals(req.user._id)) {
                req.friendRequest = friendRequest
                next()
            } else {
                res.status(401).json({
                    message:
                        'Only the reciever is allowed to perform this operation',
                })
            }
        } else {
            res.status(400).json({ message: 'Friend request not found' })
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to accept friend request.Please try again')
    }
})

module.exports = { FriendRequestRecieverMiddleware }
