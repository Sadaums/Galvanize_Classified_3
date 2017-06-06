exports.up = function(knex) {
  return knex.schema.createTable('classifieds', (tbl) => {
    tbl.increments();
    tbl.varchar('title').notNullable();
    tbl.varchar('description').notNullable();
    tbl.decimal('price').notNullable();
    tbl.varchar('item_image').notNullable();
    tbl.timestamps(true,true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('classifieds');
};
