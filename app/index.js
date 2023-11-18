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

const User = require('./models/user')
const Car = require('./models/car')
const Request = require('./models/request')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors())
app.use(express.json())

app.use('/admin', express.static(__dirname + '/public/admin'))

app.get('/admin', async (req, res) => {
  try {
    const usersCount = await User.count();
    const carsCount = await Car.count();
    const requestsCount = await Request.count();

    res.render('pages/index', { usersCount, carsCount, requestsCount });
  } catch (err) {
    res.status(500).json({ error: 'Помилка під час отримання кількості записів' });
  }
})

app.get('/admin/count', async (req, res) => {
  try {
    const usersCount = await User.count();
    const carsCount = await Car.count();
    const requestsCount = await Request.count();

    res.json([carsCount, usersCount, requestsCount]);
  } catch (err) {
    res.status(500).json({ error: 'Помилка під час отримання кількості записів' });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const militaryCount = await User.count({ where: { type: 'ZSU' } })
    const volunteerCount = await User.count({ where: { type: 'volunteer' } })

    res.render('partials/users', { militaryCount, volunteerCount })
  } catch (err) {
    alert('Error fetching and rendering stats: ' + err);
  }
})

app.get('/admin/stats', async (req, res) => {
  try {
    const militaryCount = await User.count({ where: { type: 'ZSU' } })
    const volunteerCount = await User.count({ where: { type: 'volunteer' } })

    res.json([militaryCount, volunteerCount])
  } catch (err) {
    alert('Error fetching and rendering stats: ' + err);
  }
})

app.get('/admin', async (req, res) => {
  try {
    const defaultR = await Request.count({ where: { status: 'Waiting for action' } })
    const acceptedR = await Request.count({ where: { status: 'Accepted' } })
    const declinedR = await Request.count({ where: { status: 'Declined' } })

    res.render('partials/requests', { defaultR, acceptedR, declinedR })
  } catch (err) {
    alert('Error fetching and rendering stats: ' + err);
  }
})

app.get('/admin/req-stats', async (req, res) => {
  try {
    const defaultR = await Request.count({ where: { status: 'Waiting for action' } })
    const acceptedR = await Request.count({ where: { status: 'Accepted' } })
    const declinedR = await Request.count({ where: { status: 'Declined' } })

    res.json([defaultR, acceptedR, declinedR])
  } catch (error) {
    alert('Error fetching and rendering stats: ' + err);
  }
})

app.get('/admin/users', adminController.renderUsers)
app.get('/admin/users', adminController.count1)
app.get('/admin/cars', adminController.renderCars)
app.get('/admin/requests', adminController.renderRequests)
app.get('/admin/requests', adminController.count2)
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