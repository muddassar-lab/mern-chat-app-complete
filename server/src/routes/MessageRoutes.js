const express = require('express')
const { messageController } = require('../controllers')
const { ChatExistsMiddleware } = require('../middlewares')
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')

const router = express.Router()

router
    .route('/send')
    .post(AuthMiddleware, ChatExistsMiddleware, messageController.send)
router
    .route('/fetch')
    .post(AuthMiddleware, ChatExistsMiddleware, messageController.fetch)

module.exports = router
