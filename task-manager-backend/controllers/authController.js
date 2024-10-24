const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// 全ユーザーを取得する
const getUsers = (req, res) => {
    const sqlSelect = "SELECT * FROM users ORDER BY id";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error retrieving users from the database");
        }
        res.send(result);
    });
};

// 新しいユーザーを追加する
const insertUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).send("ユーザー名とパスワードを入力してください。");
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sqlInsert = "INSERT INTO users (userName, password) VALUES (?, ?)";
      db.query(sqlInsert, [userName, hashedPassword], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send("Failed to insert new user");
          }
          return res.status(201).send("User added successfully");
      });
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error hashing password");
  }
};

module.exports = { getUsers, insertUser };
