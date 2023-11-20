const userController = require('../controllers/userController')

module.exports = (router) => {
    router.post('/register', userController.register)
    router.post('/login', userController.login)
    router.get('/profile/:id', userController.getUserById)
    router.post('/forgot-password', userController.forgotPassword)
    router.post('/reset-password', userController.resetPassword)
    router.post('/send-request', userController.sendRequest)

    return router
}