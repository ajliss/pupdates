const express = require('express');
const parser = require('body-parser');
const path = require('path');
require('dotenv').config();

// File imports
const routes = require('./routes/index.js');
const db = require('../db/index.js');

// Express Initialization
const app = express();

// MiddleWares
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

// Routes
app.use(express.static(path.resolve(__dirname, '../src')));
app.use('/api', routes);

module.exports = app;
