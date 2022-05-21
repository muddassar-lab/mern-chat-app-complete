const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
            autoPopulate: {
                select: '-users',
            },
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            autoPopulate: {
                select: '-password',
            },
        },
    },
    {
        timestamps: true,
    }
)
messageSchema.plugin(require('mongoose-autopopulate'))

const Message = mongoose.model('Message', messageSchema)
module.exports = Message
