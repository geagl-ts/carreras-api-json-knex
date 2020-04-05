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
});
