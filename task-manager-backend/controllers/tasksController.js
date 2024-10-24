const db = require("../config/datebase");

// 全タスクを取得する
const getTasks = (req, res) => {
    const sqlSelect = "SELECT * FROM tasks ORDER BY id";
    db.query(sqlSelect, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error retrieving tasks from the database");
        } else {
            res.send(result);
        }
    });
};

// 新しいタスクを追加する
const insertTask = (req, res) => {
    const { title, description } = req.body;
    const sqlInsert = "INSERT INTO task (title, description) VALUES (?, ?)";
    db.query(sqlInsert, [title, description], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to insert new task");
        } else {
            res.status(200).send("Task added successfully");
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

module.exports = { getTasks, insertTask, updateTask, deleteTask };
