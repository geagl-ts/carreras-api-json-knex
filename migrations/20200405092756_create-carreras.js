exports.up = function (knex) {
  return knex.schema.createTable("carreras", (table) => {
    table.increments();
    table.text("nombre");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("carreras");
};
