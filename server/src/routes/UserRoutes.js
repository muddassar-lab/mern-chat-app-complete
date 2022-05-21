const express = require('express')
const { userController } = require('../controllers')
const {
    AuthMiddleware,
    FriendRequestRecieverMiddleware,
    FriendRequestStatusMiddleware,
    FriendExistsMiddleware,
} = require('../middlewares')

const router = express.Router()

// User Routes
// User Authentication Routes
router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
// Misc User Routes
router.route('/:id').get(AuthMiddleware, userController.getUserByID)
router.route('/search/:query').get(AuthMiddleware, userController.searchUsers)
router.route('/update').post(AuthMiddleware, userController.updateUser)
// User Friend Routes
router
    .route('/friends/request/send')
    .post(
        AuthMiddleware,
        FriendExistsMiddleware,
        userController.sendFriendRequest
    )
router
    .route('/friends/request/accept')
    .put(
        AuthMiddleware,
        FriendRequestRecieverMiddleware,
        FriendRequestStatusMiddleware,
        userController.acceptFriendRequest
    )
router
    .route('/friends/request/reject')
    .put(
        AuthMiddleware,
        FriendRequestRecieverMiddleware,
        FriendRequestStatusMiddleware,
        userController.rejectFriendRequest
    )
// Router Export
module.exports = router
