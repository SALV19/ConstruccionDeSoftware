const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "planta",
  password: "",
});

module.exports = pool.promise();
