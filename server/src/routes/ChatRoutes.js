const express = require('express')

const { chatController } = require('../controllers')
const {
    AuthMiddleware,
    GroupAdminMiddleware,
    NotGroupAdminMiddleware,
} = require('../middlewares')

const router = express.Router()
// Chat Routes
router.route('/access').post(AuthMiddleware, chatController.accessChat)
router.route('/fetch').post(AuthMiddleware, chatController.fetchChats)
// Group Routes
router
    .route('/group/create')
    .post(AuthMiddleware, chatController.createGroupChat)
router
    .route('/group/update')
    .put(AuthMiddleware, GroupAdminMiddleware, chatController.updateGroupChat)
router
    .route('/group/delete')
    .delete(
        AuthMiddleware,
        GroupAdminMiddleware,
        chatController.deleteGroupChat
    )
// Group User Routes
router
    .route('/group/user/add')
    .put(
        AuthMiddleware,
        GroupAdminMiddleware,
        chatController.addUserToGroupChat
    )
router
    .route('/group/user/leave')
    .put(AuthMiddleware, NotGroupAdminMiddleware, chatController.leaveGroupChat)
router
    .route('/group/user/remove')
    .put(
        AuthMiddleware,
        GroupAdminMiddleware,
        chatController.removeUserFromGroupChat
    )

module.exports = router
