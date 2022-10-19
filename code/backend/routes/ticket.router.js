"use strict";

const TicketManager = require("../controllers/TicketManager");
const ServiceManager = require("../controllers/ServiceManager");
const { body, param, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");

/* Get "issued" ticket associated to counterId */
router.get(
  '/:counterId',
  param("counterId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("Provide a valid counter id"),
  async (req, res) => {
    try {
      // Check for parameter validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array()[0] });

      let tickets = await TicketManager.loadAllTicketsByAttribute("CounterId", req.params.counterId);
      let ticket = tickets.filter(ticket => ticket.Status === "issued")[0];

      if (!ticket) {
        return res.status(404).json({ error: `No available Ticket with CounterId = ${req.params.counterId} and Status = issued` });
      }

      return res.status(200).json({ ticket });
    } catch (exception) {
      const errorCode = exception.code ?? 500;
      const errorMessage = exception.result ?? 'Something went wrong, try again';
      return res.status(errorCode).json({ error: errorMessage });
    }
  }
);

/* Select next ticket for counter :counterId */
router.put(
  "/:counterId",
  param("counterId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("Provide a valid counter id"),
  async (req, res) => {
    try {
      // Check for parameter validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array()[0] });

      const counterId = req.params.counterId;

      const ticket = await TicketManager.getNextTicket(counterId);

      return res.status(200).json({ ticket });
    } catch (exception) {
      console.log(exception)
      const errorCode = exception.code ?? 500;
      const errorMessage =
        exception.result ?? "Something went wrong, try again";
      return res.status(errorCode).json({ error: errorMessage });
    }
  }
);

/* Issues a new ticket (returns a Ticket object) for the serviceId specified in the body */
router.post(
  "/",
  body("serviceId")
    .isInt({ min: 1 })
    .toInt()
    .withMessage("Provide a valid service Id"),
  async (req, res) => {
    try {
      // Check for parameter validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ error: errors.array()[0] });

      const ValidServiceId = await ServiceManager.existService(
        req.body.serviceId
      );
      if (ValidServiceId) {
        const createTime = dayjs().format("YYYY-MM-DD HH:mm:ss").toString();
        const serviceId = req.body.serviceId;
        const status = "issued";
        const counterId = 0;
        const ticket = await TicketManager.defineTicket(
          createTime,
          serviceId,
          status,
          counterId
        );
        const waitingTime = await TicketManager.getWaitingTime(ticket);
        return res.status(201).json({ ticket, waitingTime });
      }
    } catch (exception) {
      const errorCode = exception.code ?? 503;
      const errorMessage =
        exception.result ?? "Something went wrong, try again";
      return res.status(errorCode).json({ error: errorMessage });
    }
  }
);

module.exports = router;
