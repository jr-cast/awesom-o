const express = require('express');
const auth = require('../model/auth');
const userController = require('../controller/userController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

api.get('/api/user', auth.verify('master'), use(userController.get));

api.post('/api/user/impersonate/:id', auth.verify('master'), use(userController.impersonate));

api.patch('/api/user/:id', auth.verify('master'), use(userController.update));

api.delete('/api/user/:id', auth.verify('master'), use(userController.delete));

module.exports = api;
