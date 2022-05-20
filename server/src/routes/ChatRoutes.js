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

const router = express.Router()
// Chat Routes
router.route('/access').post(accessChat)
router.route('/fetch').post(fetchChats)
// Group Routes
router.route('/group/create').post(createGroupChat)
router.route('/group/update').put(updateGroupChat)
router.route('/group/delete').delete(deleteGroupChat)
// Group User Routes
router.route('group/user/add').post(addUserToGroupChat)
router.route('group/user/leave').put(leaveGroupChat)
router.route('group/user/remove').post(removeUserFromGroupChat)

module.exports = router
