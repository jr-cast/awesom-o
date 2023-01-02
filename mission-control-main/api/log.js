const express = require('express');
const auth = require('../model/auth');
const logController = require('../controller/logController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

api.get('/api/log', auth.verify('master'), use(logController.get));

api.get('/api/log/:id', auth.verify('master'), use(logController.get));

api.delete('/api/log/:id', auth.verify('master'), use(logController.delete));

module.exports = api;
