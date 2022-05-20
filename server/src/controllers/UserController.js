const asyncHandler = require('express-async-handler')

const {
    matchPassword,
    generatePassword,
} = require('../helpers/password/passwordHelpers')
const { generateToken } = require('../helpers/password/tokenHelpers')
const { User } = require('../Models')
// Login Function
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    }
    // Check if user exists and populate the friends
    const user = await User.findOne({ email }).populate(
        'friends',
        '_id name picture email'
    )
    // checking user and matching password hash
    if (user && (await matchPassword(password, user.password))) {
        res.status(200).json({
            id: user._id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            friends: user.friends,
            token: await generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid email or password')
    }
})
// Register Function
const register = asyncHandler(async (req, res) => {
    const { email, password, name, picture } = req.body
    if (!email && !password && !name) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    }
    // Check if user already exists
    const checkUser = await User.findOne({ email })
    if (checkUser) {
        res.status(400)
        throw new Error('User Already Exists.')
    }
    const hashedPassword = await generatePassword(password)
    const user = await User.create({
        email,
        password: hashedPassword,
        name,
        picture,
    })
    if (user) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture,
            friends: user.friends,
            token: await generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Failed to create user.Please try again')
    }
})
// Search Users function
const searchUsers = asyncHandler(async (req, res) => {
    // Getting query parameter from the get request
    const { query } = req.params
    // Defining regex for the query
    const keyword = query
        ? {
              $or: [
                  { name: { $regex: query, $options: 'i' } },
                  { email: { $regex: query, $options: 'i' } },
              ],
          }
        : {}
    // Searching for users
    const users = await User.find(keyword)
        .find({ _id: { $ne: req.user._id } })
        .select('-password')
    // Checking if user exists
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(400)
        throw new Error('No users found with this email or name.')
    }
})
// Get user by id function
const getUserByID = asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id).populate(
        'friends',
        '_id name picture email'
    )
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(400)
        throw new Error('User not found')
    }
})

// Exports
module.exports = {
    login,
    register,
    getUserByID,
    searchUsers,
}
