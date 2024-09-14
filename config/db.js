const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
  database: "annonces",
});

connection.getConnection((err, connection) => {
  if (err) {
    console.log("error connection to db");
    return;
  }
  console.log("connection to db successfully")
});

module.exports = connection;
