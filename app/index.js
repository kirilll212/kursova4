const express = require('express')
const app = express()
const cors = require('cors')
const sequelize = require('./util/db')
const userRoute = require('./routes/user')
const carRoute = require('./routes/car')
const requestRoute = require('./routes/request')
const adminController = require('./controllers/adminController')
const Router = express.Router
const router = new Router()
const path = require('path')
const port = process.env.PORT || 3001

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(express.json())

app.use('/admin', express.static(__dirname + '/public/admin'))

app.get('/admin', (req, res) => {
  res.render('pages/index');
})

app.get('/admin/users', adminController.renderUsers)
app.get('/admin/cars', adminController.renderCars)
app.get('/admin/requests', adminController.renderRequests)
app.put('/admin/edit/:id', adminController.editUser)
app.put('/admin/edit/status/:id', adminController.editUserStatus)
app.delete('/admin/delete/:id', adminController.deleteUser)
app.delete('/admin/delete/request/:id', adminController.deleteRequest)
app.delete('/admin/delete/car/:id', adminController.deleteCar)
app.get('/admin/requests', adminController.renderRequests)
app.put('/admin/update-status/:id', adminController.updateRequestStatus)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/users', userRoute(router))
app.use('/cars', carRoute(router))
app.use('/requests', requestRoute(router))

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(port, () => {
      console.log(`App running on port ${port}!`);
    });
  }).catch(err => {
    console.log(err);
})