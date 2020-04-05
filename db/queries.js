const knex = require("./knex");

module.exports = {
  getAll() {
    return knex("carreras");
  },
  getOne(id) {
    return knex("carreras").where("id", id).first();
  },
  create(carrera) {
    return knex("carreras").insert(carrera, "*");
  },
};
