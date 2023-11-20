const requestController = require('../controllers/requestController')

module.exports = (router) => {
    router.get('/all', requestController.showRequests)
    router.get('/one/:id', requestController.getRequest)
    router.post('/send', requestController.sendRequest)
    router.put('/accept-req/:id', requestController.acceptR)

    return router
}