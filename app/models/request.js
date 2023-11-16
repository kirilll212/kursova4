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
    dateTime: {
        type: Sequelize.STRING,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Waiting for action',
    }
});

module.exports = Request