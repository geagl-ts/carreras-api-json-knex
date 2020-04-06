// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/carreras-iti",
  },
  test: {
    client: "pg",
    connection: "postgres://localhost/test-carreras-iti",
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
  },
};
