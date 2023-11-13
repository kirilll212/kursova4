const Car = require('../models/car')
const User = require('../models/user')
const Request = require('../models/request')

class AdminController {
    async renderCars(req, res) {
        try {
            const cars = await Car.findAll()
            res.render('partials/cars', { cars })
        } catch (err) {
            alert('Can not render cars table' + err)
        }
    }

    async renderUsers(req, res) {
        try {
            const users = await User.findAll()
            res.render('partials/users', { users })
        } catch (err) {
            alert('Can not render users table' + err)
        }
    }

    async renderRequests(req, res) {
        try {
            const requests = await Request.findAll()
            res.render('partials/requests', { requests })
        } catch (err) {
            alert('Can not render requests table' + err)
        }
    }

    async editUser(req, res, next) {
        const userId = req.params.id;
        const newEmail = req.body.newEmail;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' });
            }
            await user.update({ email: newEmail });
            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    }

    async editUserStatus(req, res, next) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User was not found')
            }

            user.status = !user.status;
            await user.save();

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        const userId = req.params.id;
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Користувача не знайдено' }) && alert('User was not found');
            }
            await user.destroy();
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
    
    async deleteRequest(req, res, next) {
        const requestId = req.params.id
        
        try {
            const request = await Request.findByPk(requestId)

            if (!request) {
                return res.status(404).json({ message: 'Запит не знайдено' }) && alert('Request was not found');
            }

            await request.destroy()
            return res.status(204).send();
        } catch (err) {
            next(err);
        }
    }

    async deleteCar(req, res, next) {
        const carId = req.params.id

        try {
            const car = await Car.findByPk(carId)

            if (!car) {
                return res.status(404).json({ message: 'Машину не знайдено' }) && alert('Car was not found');
            }

            await car.destroy()
            return res.status(204).send()
        } catch (err) {
            next(err)
        }
    }

    async updateRequestStatus(req, res, next) {
        const requestId = req.params.id;
        const { status } = req.body;

        try {
            const request = await Request.findByPk(requestId);
            if (!request) {
                throw new Error('Request was not found');
            }

            request.status = status;
            await request.save();

            return res.status(200).send();
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new AdminController()