const express = require('express');
const auth = require('../model/auth');
const eventController = require('../controller/eventController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

api.get('/api/event', auth.verify('master'), use(eventController.get));

api.get('/api/event/:id', auth.verify('master'), use(eventController.get));

api.delete('/api/event/:id', auth.verify('master'), use(eventController.delete));

module.exports = api;
