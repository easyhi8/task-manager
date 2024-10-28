//tasksController.js
const db = require("../config/database");

// 全タスクを取得する
const getTasks = (req, res) => {
  const sqlSelect = "SELECT * FROM tasks ORDER BY id";
  db.query(sqlSelect, (err, result) => {
      if (err) {
          console.error("データベースエラー:", err);
          res.status(500).send("Error retrieving tasks from the database");
      } else {
          console.log("取得したタスク:", result);
          res.send(result);
      }
  });
};

//単一のタスクを取得する
const getTask= (req, res) => {
  const id = req.params.id;
  const sqlSelect = "SELECT * FROM tasks WHERE id = ?"
  db.query(sqlSelect, [id], (err, result) => {
      if (err) {
          console.error("データベースエラー:", err);
          res.status(500).send("Error retrieving task from the database");
      }
      if (result.length === 0) {
          return res.status(404).send("タスクが見つかりません");
      }
      console.log("取得したタスク:", result[0]);
      res.json(result[0]);
  });
};

// 新しいタスクを追加する
const insertTask = (req, res) => {
    const { title, description } = req.body;
    const sqlInsert = "INSERT INTO tasks (title, description) VALUES (?, ?)";
    db.query(sqlInsert, [title, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new task");
        } else {
            res.status(201).send("Task added successfully");
        }
    });
};

// タスクを更新する
const updateTask = (req, res) => {
  const { id, title, description } = req.body;
  const sqlUpdate = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
  db.query(sqlUpdate, [id, title, description], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Failed to update task");
      } else if (result.affectedRows === 0) {
          res.status(404).send("Task not found");
      } else {
          res.send({ id, title, description });
      }
  });
};

// タスクを削除する
const deleteTask = (req, res) => {
  const { id } = req.body;
  const sqlDelete = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDelete, [id], (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).send("Failed to delete task");
      } else if (result.affectedRows === 0) {
          res.status(404).send("Task not found");
      } else {
          res.send({ message: "Task deleted successfully" });
      }
  });
};

module.exports = { getTasks, getTask, insertTask, updateTask, deleteTask };
