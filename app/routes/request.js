const requestController = require('../controllers/requestController')

module.exports = (router) => {
    router.get('/all', requestController.showRequests)
    router.get('/one/:id', requestController.getRequest)

    return router
}