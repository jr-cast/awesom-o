const express = require('express');
const auth = require('../model/auth');
const booksInfoController = require('../controller/booksInfoController');
const api = express.Router();

/*
* caller function for global error handling
* route all calls through this to try and handle errors
*/

const use = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

api.post('/api/booksInfo', auth.verify('user'), use(booksInfoController.create));

api.patch('/api/booksInfo/:id', auth.verify('user'), use(booksInfoController.update));

api.get('/api/booksInfo', auth.verify('user'), use(booksInfoController.get));

api.get('/api/booksInfo/:id', auth.verify('user'), use(booksInfoController.get));

api.delete('/api/booksInfo/:id', auth.verify('admin'), use(booksInfoController.delete));

module.exports = api;
