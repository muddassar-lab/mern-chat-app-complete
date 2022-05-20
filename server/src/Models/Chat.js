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
            autopopulate: true,
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autopopulate: {
                select: '-password',
            },
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                autopopulate: {
                    select: '-password',
                    maxDepth: 1,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
)
chatSchema.plugin(require('mongoose-autopopulate'))

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
