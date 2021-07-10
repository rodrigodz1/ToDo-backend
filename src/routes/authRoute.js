var express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.post('/register', authController.register)
router.post('/registerSuperuser', authController.registerSuperuser)
router.post('/verify', authController.verifyJWT)

module.exports = router