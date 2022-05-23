const asyncHandler = require('express-async-handler')
const { matchPassword, generatePassword, generateToken } = require('../helpers')

const { User, FriendRequest } = require('../Models')
// Login Function
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email && !password) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    }
    // Check if user exists and populate the friends
    const user = await User.findOne({ email })
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
    const checkUser = await User.find({ email })
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
// update user function
const updateUser = asyncHandler(async (req, res) => {
    const { name, picture } = req.body
    const { user } = req
    if (!name && !picture) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            user._id,
            {
                name,
                picture,
            },
            {
                new: true,
            }
        )
        if (updatedUser) {
            res.status(200).json(updatedUser)
        } else {
            res.status(400)
            throw new Error('Failed to update user.Please try again')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to update user.Please try again')
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

// User Friends Functions
const sendFriendRequest = asyncHandler(async (req, res) => {
    const { userID } = req.body
    const { user } = req
    if (!userID) {
        res.status(400)
        throw new Error('Please provide a userID')
    }
    try {
        const friendRequest = await FriendRequest.create({
            sender: user._id,
            receiver: userID,
        })
        if (friendRequest) {
            res.status(200).json(friendRequest)
        } else {
            res.status(400)
            throw new Error('Failed to send friend request')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to send friend request.Please try again')
    }
})
const acceptFriendRequest = asyncHandler(async (req, res) => {
    const { user, friendRequest } = req

    try {
        await user.friends.push(friendRequest.sender._id)
        const updatedUser = await user.save()
        const updatedFriend = await User.findByIdAndUpdate(
            friendRequest.sender._id,
            {
                $push: { friends: user._id },
            },
            {
                new: true,
            }
        )
        friendRequest.status = 'accepted'
        const updatedFriendRequest = await friendRequest.save()
        if (updatedUser && updatedFriend && updatedFriendRequest) {
            res.status(200).json(updatedUser)
        } else {
            res.status(400)
            throw new Error('Failed to accept friend request')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to accept friend request.Please try again')
    }
})
const rejectFriendRequest = asyncHandler(async (req, res) => {
    const { friendRequest } = req
    try {
        friendRequest.status = 'rejected'
        const updatedFriendRequest = await friendRequest.save()
        if (updatedFriendRequest) {
            res.status(200).json(updatedFriendRequest)
        } else {
            res.status(400)
            throw new Error('Failed to reject friend request')
        }
    } catch (error) {
        res.status(400)
        throw new Error('Failed to reject friend request.Please try again')
    }
})
// Exports
module.exports = {
    login,
    register,
    getUserByID,
    searchUsers,
    updateUser,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
}
