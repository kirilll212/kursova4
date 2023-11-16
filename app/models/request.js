const Sequelize = require('sequelize')
const db = require('../util/db')

const Request = db.define('request', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    carMark: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    carModel: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Waiting for action',
    }
});

module.exports = Request