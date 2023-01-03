const express = require('express');
const auth = require('../model/auth');
const bookController = require('../controller/bookController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

api.post('/api/book', auth.verify('user'), use(bookController.create));

api.patch('/api/book/:id', auth.verify('user'), use(bookController.update));

api.get('/api/book', auth.verify('user'), use(bookController.get));

api.get('/api/book/:id', auth.verify('user'), use(bookController.get));

api.delete('/api/book/:id', auth.verify('admin'), use(bookController.delete));

module.exports = api;
