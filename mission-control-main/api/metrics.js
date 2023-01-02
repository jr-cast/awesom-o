const express = require('express');
const auth = require('../model/auth');
const metricsController = require('../controller/metricsController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* metrics */
api.get('/api/metrics/accounts', auth.verify('master'), use(metricsController.accounts));

api.get('/api/metrics/accounts/growth', auth.verify('master'), use(metricsController.growth));

module.exports = api;
