const db = require('./knex')();
const { v4: uuidv4 } = require('uuid');

exports.create = async function (data, account) {

  data.id = uuidv4();
  data.account_id = account;
  await db('book').insert(data);
  return data;

}

exports.get = async function (id, account) {

  return await db('book').select('*')
    .where({ account_id: account })
    .modify(q => {

      id && q.where('id', id);

    });
}

exports.update = async function (id, data, account) {

  await db('book').update(data).where({ id: id, account_id: account });
  return data;

}

exports.delete = async function (id, account) {

  await db('book').del().where({ id: id, account_id: account });
  return id;

}
