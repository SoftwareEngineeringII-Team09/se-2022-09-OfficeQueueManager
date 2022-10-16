"use strict";

const TicketManager = require('../controllers/TicketManager');
const ServiceManager = require('../controllers/ServiceManager');
const { body, param, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

/* Select next ticket for counter :counterId */
router.get(
    '/next/:counterId', 
    param('counterId').isInt({ min: 1 }).toInt().withMessage('Provide a valid counter id'), 
    async (req, res) => {
        
        try {

            // Check for parameter validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ error: errors.array()[0] });

            const counterId = req.params.counterId;

            // TODO: await TicketManager.getNextTicket(counterId)

            return res.status(200).json({ ticket: null });

        } catch (exception) {
            return res.status(500).json({ error: 'Something went wrong, try again' });
        }

    }
);

/* Issues a new ticket (returns ticketId) for the serviceName specified in the body */
router.post(
    '/new',
    body('serviceName').isString().withMessage('Provide a valid service name'),
    async (req, res) => {

        try {

            // Check for parameter validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ error: errors.array()[0] });

            const service = await ServiceManager.serviceRowByAttribute('ServiceName', req.body.serviceName);
            const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss').toString();
            const status = 0;
            const counterId = 0;
            const ticketId =  await TicketManager.defineTicket(createTime, service.ServiceId, status, counterId)

            return res.status(201).json({ ticketId: ticketId });

        } catch (exception) {
            return res.status(503).json({ error: 'Something went wrong, try again', exc: `${exception}` });
        }

    }
);

module.exports = router;