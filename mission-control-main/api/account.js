const express = require('express');
const auth = require('../model/auth');
const accountController = require('../controller/accountController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

/* master */
api.get('/api/account', auth.verify('master'), use(accountController.get));

module.exports = api;
