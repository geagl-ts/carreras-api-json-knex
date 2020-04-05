const carreras = require("../carreras");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("carreras")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("carreras").insert(carreras);
    });
};
