"use strict";

const express = require('express');
const logger = require('morgan');
const cors = require('cors');


const SERVER_PORT = 3001;
const CLIENT_PORT = 3000;
const API_PREFIX = '/api';
const app = new express();


/* HTTP logger middleware, don't log during integration tests */
app.use(logger("combined", { skip: () => process.env.NODE_ENV === 'test' }));

/* JSON */
app.use(express.json());

/* CORS */
app.use(cors({
    origin: `http://localhost:${CLIENT_PORT}`,
    credentials: true
}));

/* ROUTES */
const ticketRouter = require('./routes/ticket.router');
const serviceRouter = require('./routes/service.router');

app.use(`${API_PREFIX}/tickets`, ticketRouter);
app.use(`${API_PREFIX}/services`, serviceRouter);


/* Serve requests */
app.listen(SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});


module.exports = app;