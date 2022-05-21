const express = require('express')
const { messageController } = require('../controllers')
const { AuthMiddleware } = require('../middlewares/AuthMiddleware')

const router = express.Router()

router.route('/send').post(AuthMiddleware, messageController.send)
router.route('/fetch').post(AuthMiddleware, messageController.fetch)

module.exports = router
