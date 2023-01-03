const booksInfo = require('../model/booksInfo');

exports.create = async function(req, res){

  const data = await booksInfo.create(req.body, req.account);
  res.status(200).send({ message: 'booksInfo created', data: data });

}

exports.get = async function(req, res){

  const data = await booksInfo.get(req.params.id, req.account);
  res.status(200).send({ data: data });

}

exports.update = async function(req, res){

  await booksInfo.update(req.params.id, req.body, req.account);
  res.status(200).send({ message: 'booksInfo updated', data: req.body });

}

exports.delete = async function(req, res){

  await booksInfo.delete(req.params.id, req.account);
  res.status(200).send({ message: 'booksInfo deleted' });

}
