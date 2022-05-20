const express = require('express')
const {
    accessChat,
    fetchChats,
    createGroupChat,
    updateGroupChat,
    deleteGroupChat,
    addUserToGroupChat,
    leaveGroupChat,
    removeUserFromGroupChat,
} = require('../controllers/ChatController')
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')

const router = express.Router()
// Chat Routes
router.route('/access').post(AuthMiddleware, accessChat)
router.route('/fetch').post(AuthMiddleware, fetchChats)
// Group Routes
router.route('/group/create').post(AuthMiddleware, createGroupChat)
router.route('/group/update').put(AuthMiddleware, updateGroupChat)
router.route('/group/delete').delete(AuthMiddleware, deleteGroupChat)
// Group User Routes
router.route('/group/user/add').put(AuthMiddleware, addUserToGroupChat)
router.route('/group/user/leave').put(AuthMiddleware, leaveGroupChat)
router.route('/group/user/remove').put(AuthMiddleware, removeUserFromGroupChat)

module.exports = router
