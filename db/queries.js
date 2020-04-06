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
  update(id, carrera) {
    return knex("carreras").where("id", id).update(carrera, "*");
  },
  delete(id) {
    return knex("carreras").where("id", id).del();
  },
};
