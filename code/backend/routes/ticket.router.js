"use strict";
const TicketManager = require('../controllers/TicketManager');
const { param, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

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

            res.status(200).json({ ticket: null });

        } catch (exception) {
            return res.status(500).json({ error: "Something went wrong, try again" });
        }

    }
);

module.exports = router;