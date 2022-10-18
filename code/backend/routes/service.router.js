"use strict";

const ServiceManager = require('../controllers/ServiceManager');
const express = require('express');
const router = express.Router();

/* Get list of all affordable services */
router.get(
  '/',
  async (req, res) => {
    try {
      let services = await ServiceManager.loadAllServices();
      return res.status(200).json({ services });
    } catch (exception) {
      const errorCode = exception.code ?? 500;
      const errorMessage = exception.result ?? 'Something went wrong, try again';
      return res.status(errorCode).json({ error: errorMessage });
    }
  }
);

module.exports = router;