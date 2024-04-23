const Pool = require("pg").Pool;
const pool = new Pool({
  user: "student",
  password: "00000111",
  host: "localhost",
  port: 5432,
  database: "todos",
});

module.exports = pool;
