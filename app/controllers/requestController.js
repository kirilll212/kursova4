const Request = require('../models/request')

class RequestController {
    async sendRequest(req, res) {
        const { userEmail, carMark, carModel } = req.body;

        try {
            const dateTime = new Date();
            const newDate = dateTime.toString()

            const newRequest = await Request.create({
                userEmail: userEmail,
                carMark: carMark,
                carModel: carModel,
                dateTime: newDate
            });

            res.json({ message: 'Request sent successfully', request: newRequest });
        } catch (err) {
            return res.status(400).json({ message: 'Server error ' + err });
        }
    }

    async showRequests(req, res) {
        try {
            const requests = await Request.findAll()

            res.json({ message: requests })
        } catch (err) {
            return res.status(400).json({ message: 'Server error ' + err });
        }
    }

    async getRequest(req, res) {
        const id = req.params.id

        try {
            const request = await Request.findByPk(id)

            res.json({ message: request })
        } catch (err) {
            return res.status(400).json({ message: 'Server error ' + err });
        }
    }

    async acceptR(req, res) {
        const requestId = req.params.id

        try {
            const request = await Request.findByPk(requestId)

            if (!request) {
                throw new Error('Request was not found');
            }

            await request.update({ status: 'Accepted' })

            res.json({ message: 'Accepted' })
        } catch (err) {
            return res.status(400).json({ message: 'Server error ' + err });
        }
    }

    async declineR(req, res) {
        const id = req.params.id

        try {
            const requestInstance = await Request.findByPk(id)

            if (!requestInstance) {
                throw new Error('Request was not found');
            }

            await requestInstance.update({ status: 'Declined' })

            res.json({ message: 'Declined' })
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }
}

module.exports = new RequestController()