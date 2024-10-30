// database.js
const mysql = require("mysql2");

// MySQLデータベースへの接続プールを作成
const db = mysql.createPool({
    host: "localhost",       // データベースサーバーのホスト名
    user: "root",            // データベースに接続するためのユーザー名
    password: "rootroot",    // データベースユーザーのパスワード
    database: "task-manager" // 接続するデータベース名
});

module.exports = db;
