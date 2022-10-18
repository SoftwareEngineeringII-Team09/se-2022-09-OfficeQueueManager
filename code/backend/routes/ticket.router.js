"use strict";

const TicketManager = require('../controllers/TicketManager');
const { body, param, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const dayjs = require('dayjs');

/* Select next ticket for counter :counterId */
router.put(
    '/:counterId', 
    param('counterId').isInt({ min: 1 }).toInt().withMessage('Provide a valid counter id'), 
    async (req, res) => {
        
        try {

            // Check for parameter validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ error: errors.array()[0] });

            const counterId = req.params.counterId;

            const ticket = await TicketManager.getNextTicket(counterId);

            return res.status(200).json({ ticket: ticket });

        } catch (exception) {
            const errorCode = exception.code ?? 500;
            const errorMessage = exception.result ?? 'Something went wrong, try again';
            return res.status(errorCode).json({ error: errorMessage });
        }

    }
);

/* Issues a new ticket (returns a Ticket object) for the serviceId specified in the body */
router.post(
    '/',
    body('serviceId').isInt({ min: 1 }).toInt().withMessage('Provide a valid service Id'),
    async (req, res) => {

        try {

            // Check for parameter validation errors
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ error: errors.array()[0] });

            const createTime = dayjs().format('YYYY-MM-DD HH:mm:ss').toString();
            const serviceId = req.body.serviceId;
            const status = "ISSUED";
            const counterId = 0;
            const ticket =  await TicketManager.defineTicket(createTime, serviceId, status, counterId)

            return res.status(201).json({ ticket });

        } catch (exception) {
            const errorCode = exception.code ?? 503;
            const errorMessage = exception.result ?? 'Something went wrong, try again';
            return res.status(errorCode).json({ error: errorMessage });
        }

    }
);

module.exports = router;