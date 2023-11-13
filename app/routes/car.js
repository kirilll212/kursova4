const carController = require("../controllers/carController");
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
    router.get('/list', carController.getCars)
    router.get('/list/:id', carController.getOneCar)
    router.post('/add-car', upload.single('image'), carController.addCar)
    router.delete('/delete-car/:id', carController.deleteCar)
    router.put('/edit-car/:id', carController.editCar)

    return router
}