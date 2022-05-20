const mongoose = require('mongoose')
const { blue, bold } = require('colorette')

const connectToDatabase = (MONGO_URI) => {
    mongoose.connect(
        MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log(
                blue(bold('----------Connected to database----------------'))
            )
        }
    )
}

module.exports = connectToDatabase
