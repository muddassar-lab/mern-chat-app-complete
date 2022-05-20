const asyncHandler = require('express-async-handler')
const { Chat } = require('../Models')
// Chat Methods
const accessChat = asyncHandler((req, res) => {})
const fetchChats = asyncHandler((req, res) => {})
// Group Methods
const createGroupChat = asyncHandler((req, res) => {})
const updateGroupChat = asyncHandler((req, res) => {})
const deleteGroupChat = asyncHandler((req, res) => {})
// Group User Methods
const addUserToGroupChat = asyncHandler((req, res) => {})
const leaveGroupChat = asyncHandler((req, res) => {})
const removeUserFromGroupChat = asyncHandler((req, res) => {})

module.exports = {
    accessChat,
    fetchChats,
    createGroupChat,
    updateGroupChat,
    deleteGroupChat,
    addUserToGroupChat,
    leaveGroupChat,
    removeUserFromGroupChat,
}
