"use strict";

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const SERVER_PORT = 3001;
const CLIENT_PORT = 3000;
const API_PREFIX = '/api/v1';
const app = new express();


/* HTTP logger middleware */
app.use(morgan("combined"));

/* JSON */
app.use(express.json());

/* CORS */
app.use(cors({
    origin: `http://localhost:${CLIENT_PORT}`,
    credentials: true
}));

/* ROUTES */
const exampleRouter = require('./routes/example.router');

app.use(`${API_PREFIX}/example`, exampleRouter);


/* Serve requests */
app.listen(SERVER_PORT, () => {
    console.log(`Server listening at http://localhost:${SERVER_PORT}`);
});


module.exports = app;