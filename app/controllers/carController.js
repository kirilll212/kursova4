const Car = require('../models/car')
const path = require('path')

class carController {
    async getCars(req, res) {
        try {
            const cars = await Car.findAll()

            res.json({ message: cars })
        } catch (err) {
            res.status(400).json({ message: 'Failed to load cars ' + err })
        }
    }

    async getOneCar(req, res) {
        const id = req.params.id

        try {
            const car = await Car.findByPk(id)

            if (!car) {
                return res.status(404).json({ message: 'Car not found' })
            }

            res.json({ message: car })
        } catch (err) {
            res.status(400).json({ message: 'Failed to load cars ' + err })
        }
    }

    async addCar(req, res) {

        try {
            const { mark, model, year, engineCapacity, bodyType, weight, fuelType, carType, driveType } = req.body

            const imagePath = req.file ? path.join('uploads', req.file.filename) : null

            const car = await Car.create({
                mark: mark,
                model: model,
                year: year,
                engineCapacity: engineCapacity,
                bodyType: bodyType,
                weight: weight,
                fuelType: fuelType,
                carType: carType,
                driveType: driveType,
                imagePath: imagePath
            })

            res.status(201).json({ message: `Car: ${car.mark}, model: ${car.model}, year: ${car.year} added successfully` })
        } catch (err) {
            res.status(400).json({ message: 'Failed to add car ' + err })
        }
    }

    async deleteCar(req, res) {
        const id = req.params.id
        try {
            const carInstance = await Car.findByPk(id)

            if (!carInstance) {
                res.status(400).json({ message: `Car with id: ${id} wasn't found` })
            }

            await carInstance.destroy()

            res.status(201).json({ message: `Car with id: ${id} - ${carInstance.mark} ${carInstance.model} ${carInstance.year} deleted successfully` })
        } catch (err) {
            res.status(400).json({ message: 'Failed to delete car ' + err })
        }
    }

    async editCar(req, res) {
        const id = req.params.id
        const { engineCapacity, bodyType, weight, driveType } = req.body

        try {
            const carInstance = await Car.findByPk(id)

            if (!carInstance) {
                res.status(400).json({ message: `Car with id: ${id} was not found` })
            }

            await carInstance.update({
                engineCapacity: engineCapacity,
                bodyType: bodyType,
                weight: weight,
                driveType: driveType
            })

            res.status(201).json({ message: `Car with id: ${id} - ${carInstance.mark} ${carInstance.model} updated successfully` })
        } catch (err) {
            res.status(400).json({ message: 'Failed to update car information' })
        }
    }
}

module.exports = new carController()