const book = require('../model/book');

exports.create = async function(req, res){

  const data = await book.create(req.body, req.account);
  res.status(200).send({ message: 'book created', data: data });

}

exports.get = async function(req, res){

  const data = await book.get(req.params.id, req.account);
  res.status(200).send({ data: data });

}

exports.update = async function(req, res){

  await book.update(req.params.id, req.body, req.account);
  res.status(200).send({ message: 'book updated', data: req.body });

}

exports.delete = async function(req, res){

  await book.delete(req.params.id, req.account);
  res.status(200).send({ message: 'book deleted' });

}
