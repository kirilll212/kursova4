const userController = require('../controllers/userController')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage})

module.exports = (router) => {
    router.post('/register', userController.register)
    router.post('/login', userController.login)
    router.get('/profile/:id', userController.getUserById)
    router.post('/forgot-password', userController.forgotPassword)
    router.post('/reset-password', userController.resetPassword)
    router.post('/send-request', userController.sendRequest)
    router.patch('/add-photo', upload.single('image'), userController.addPhoto)

    return router
}