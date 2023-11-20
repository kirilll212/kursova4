require('dotenv').config()
const User = require('../models/user')
const Request = require('../models/request')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const config = require('../util/config')

class userController {
    async register(req, res) {
        try {
            const { email, firstName, secondName, password, confirmPassword, type } = req.body

            if (confirmPassword !== password) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                email: email,
                firstName: firstName,
                secondName: secondName,
                password: hashedPassword,
                type: type
            })

            const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' })

            return res.status(201).json({ message: 'User registered successfully ' + user.email, token: token });
        } catch (err) {
            return res.status(400).json({ message: 'Failed to register user! ' + err });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ where: { email } })

            if (!user) {
                res.status(400).json({ message: 'User not found' })
            }

            const passwordMatch = await bcrypt.compare(password, user.password)

            if (!passwordMatch) {
                res.status(400).json({ message: 'Invalid password' })
            }

            const tocken = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' })

            const userType = user.type

            res.status(201).json({ message: `User ${user.firstName} with type - '${user.type}' logged in successfully`, tocken: tocken })
            return res.json({message: user.type})
        } catch (err) {
            res.status(400).json({ message: 'Failed to sign in! ' + err })
        }
    }

    async forgotPassword(req, res) {
        try {
            const { email } = req.body

            const user = await User.findOne({ where: { email } })

            if (!user) {
                res.status(400).json({ message: 'User was not found' })
            }

            const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' })

            const transport = nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                secure: false,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASSWORD
                },
            })

            await transport.sendMail({
                from: 'kiril@gmail.com',
                to: email,
                subject: `Password resete token`,
                text: `To reset your password copy and enter this token: \n ${token}`
            })

            res.status(201).json({ message: 'Reset password token sent successfully' })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    async resetPassword(req, res) {
        try {
            const { newPassword, confirmNewPassword } = req.body

            if (confirmNewPassword !== newPassword) {
                res.status(400).json({ message: 'Password does not match' })
            }

            const token = req.headers.authorization.split(' ')[1];

            const decodedToken = jwt.verify(token, config.jwtSecret);

            const userId = decodedToken.userId;

            const user = await User.findByPk(userId);

            if (!user) {
                return res.status(400).json({ message: 'User was not found!' });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await user.update({ password: hashedPassword })

            const transport = nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
                secure: false
            })

            await transport.sendMail({
                from: 'kiril@gmail.com',
                to: user.email,
                subject: 'Password reset!',
                text: `
                Congratulations, your password has been successfully changed!
                This is your new password: ${newPassword}`,
            })

            res.status(200).json({ message: 'Password reset email sent successfuly' })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    async sendRequest(req, res) {
        try {
            const { email, title, description } = req.body

            const user = await User.findOne({ where: { email } })

            if (!user) {
                res.status(400).json({ message: 'User was not found' })
            }

            const request = await Request.create({
                title: title,
                description: description
            })

            const transport = nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASSWORD,
                },
                secure: false
            })

            await transport.sendMail({
                from: email,
                to: user.email,
                subject: 'Request for help',
                text: `Request for help \n Title: ${request.title} \n Description: ${request.description} \n Id: ${request.id}`
            })

            res.status(201).json({ message: 'Request successfully sent' })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    async requestAccept(req, res) {
        const id = req.params.id

        try {
            const requestInstance = await Request.findByPk(id)

            if (!requestInstance) {
                res.status(400).json({ message: `Request with id: ${id} was not found` })
            }

            await requestInstance.update({ status: 'Accepted' })

            res.status(201).json({ message: 'Request accepted successfully' })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = new userController()