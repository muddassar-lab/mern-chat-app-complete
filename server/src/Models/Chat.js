const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    {
        timestamps: true,
    }
)
const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
