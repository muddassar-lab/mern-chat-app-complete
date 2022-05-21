const mongoose = require('mongoose')

const friendRequestSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: true,
        },
        status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'accepted', 'rejected'],
        },
    },
    { timestamps: true }
)
friendRequestSchema.plugin(require('mongoose-autopopulate'))

const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema)

module.exports = FriendRequest
