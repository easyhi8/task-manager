const db = require("../config/database");

// 全ユーザーを取得する
const getUsers = (req, res) => {
    const sqlSelect = "SELECT * FROM users ORDER BY id";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving users from the database");
        } else {
            res.send(result);
        }
    });
};

// 新しいユーザーを追加する
const insertUser = (req, res) => {
    const { title, description } = req.body;
    const sqlInsert = "INSERT INTO users (title, description) VALUES (?, ?)";
    db.query(sqlInsert, [title, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new user");
        } else {
            res.status(201).send("User added successfully");
        }
    });
};

// ユーザーを更新する
const updateUser = (req, res) => {
  const { id, title, description } = req.body;
  const sqlUpdate = "UPDATE users SET title = ?, description = ? WHERE id = ?";
  db.query(sqlUpdate, [id, title, description], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Failed to update Uuer");
      } else if (result.affectedRows === 0) {
          res.status(404).send("User not found");
      } else {
          res.send({ id, title, description });
      }
  });
};

// ユーザーを削除する
const deleteUser = (req, res) => {
  const { id } = req.body;
  const sqlDelete = "DELETE FROM users WHERE id = ?";
  db.query(sqlDelete, [id], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Failed to delete user");
      } else if (result.affectedRows === 0) {
          res.status(404).send("User not found");
      } else {
          res.send({ message: "User deleted successfully" });
      }
  });
};

module.exports = { getUsers, insertUser, updateUser, deleteUser };
