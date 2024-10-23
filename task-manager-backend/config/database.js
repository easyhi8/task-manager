const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "task-manager"
});

module.exports = db;
