const express = require('express')
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')
const {
    login,
    register,
    getUserByID,
    searchUsers,
} = require('../controllers/UserController')

const router = express.Router()

// User Routes
router.route('/login').post(login)
router.route('/register').post(register)
router.route('/:id').get(AuthMiddleware, getUserByID)
router.route('/search/:query').get(AuthMiddleware, searchUsers)
// Router Export
module.exports = router
