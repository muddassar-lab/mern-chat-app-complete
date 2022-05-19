const mongoose = require('mongoose')

const connectToDatabase = (MONGO_URI) => {
    mongoose.connect(
        MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        () => {
            console.log('Connected To MongoDB')
        }
    )
}

module.exports = connectToDatabase
