const Sequelize = require('sequelize')
const db = require('../util/db')

const Car = db.define('car', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    mark: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    engineCapacity: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    bodyType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    fuelType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    carType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    driveType: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imagePath: {
        type: Sequelize.STRING,
        allowNull: true,
    }
})

module.exports = Car