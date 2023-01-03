exports.up = function (knex) {
  return knex.schema.createTable('book', table => {

    table.specificType('id', 'char(36) primary key');
    table.string('title', 32).notNullable();
    table.string('author', 32).notNullable();
    table.integer('year', 32).notNullable();
    table.timestamps(true, true);
    table.string('account_id', 36).notNullable().references('id').inTable('account').onDelete('cascade');

  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('book');
};
