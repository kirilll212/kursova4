const userController = require('../controllers/userController')

module.exports = (router) => {
    router.post('/register', userController.register)
    router.post('/login', userController.login)
    router.post('/forgot-password', userController.forgotPassword)
    router.post('/reset-password', userController.resetPassword)
    router.post('/send-request', userController.sendRequest)
    router.post('/accept-request/:id', userController.requestAccept)
    router.post('/decline-request/:id', userController.requestDecline)

    return router
}