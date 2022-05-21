const express = require('express')
const { userController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')

const router = express.Router()

// User Routes
router.route('/login').post(userController.login)
router.route('/register').post(userController.register)
router.route('/:id').get(AuthMiddleware, userController.getUserByID)
router.route('/search/:query').get(AuthMiddleware, userController.searchUsers)
// Router Export
module.exports = router
