const request = require("supertest");
const expect = require("chai").expect;

const knex = require("../db/knex");

const app = require("../app");
const fixtures = require("./fixtures");

describe("CRUD carreras", () => {
  before(async () => {
    //run migrations
    await knex.migrate.latest();
    //run seeds
    await knex.seed.run();

    return;
  });

  it("List All Records", async () => {
    const response = await request(app)
      .get("/api/v1/carreras")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.be.a("Array");
    expect(response.body).to.deep.equal(fixtures.carreras);
  });

  it("Show One Record By Id", async () => {
    const response = await request(app)
      .get("/api/v1/carreras/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).to.be.a("Object");
    expect(response.body).to.deep.equal(fixtures.carreras[0]);
  });

  it("Creates A Carrera", async () => {
    const response = await request(app)
      .post("/api/v1/carreras")
      .send(fixtures.carrera)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    fixtures.carrera.id = response.body.id;
    expect(response.body).to.be.a("Object");
    expect(response.body).to.deep.equal(fixtures.carrera);
  });

  it("Updates A Carrera", async () => {
    fixtures.carrera.nombre = "Ing. Mecatronica";

    const response = await request(app)
      .put("/api/v1/carreras/4")
      .send(fixtures.carrera)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    fixtures.carrera.id = response.body.id;
    expect(response.body).to.be.a("Object");
    expect(response.body).to.deep.equal(fixtures.carrera);
  });

  it("Deletes A Carrera", async () => {
    const response = await request(app)
      .delete("/api/v1/carreras/4")
      .set("Accept", "application/json")
      .expect(200);

    expect(response.body).to.be.a("Object");
    expect(response.body).to.deep.equal({ deleted: true });
  });
});
