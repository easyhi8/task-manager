// tasksController.js
const db = require("../config/database");

// エラーハンドリング関数
const handleError = (res, error, message) => {
  console.error("データベースエラー:", error);
  res.status(500).send(message);
};

// 全タスクを取得する
const getAllTasks = (req, res) => {
  const sqlSelect = "SELECT * FROM tasks ORDER BY id";
  db.query(sqlSelect, (err, result) => {
      if (err) return handleError(res, err, "データベースからタスクを取得中にエラーが発生しました");
      res.send(result);
  });
};

// 単一のタスクを取得する
const getTask= (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  const sqlSelect = "SELECT * FROM tasks WHERE id = ?"
  db.query(sqlSelect, [taskId], (err, result) => {
      if (err) return handleError(res, err, "データベースからタスクを取得中にエラーが発生しました");
      if (result.length === 0) return res.status(404).send("タスクが見つかりません");
      console.log("取得したタスク:", result[0]);
      res.json(result[0]);
  });
};

// 新しいタスクを追加する
const addTask = (req, res) => {
  const { title, description, deadline, status } = req.body; // リクエストボディからデータを取得
  const sqlInsert = "INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, ?)"; // タスクのタイトル、説明、期限、ステータスをデータベースへ追加
  db.query(sqlInsert, [title, description, deadline, status], (err, result) => {
    if (err) return handleError(res, err, "タスクの追加に失敗しました");
    res.status(201).send("タスクが正常に追加されました");
  });
};

// タスクを更新する
const updateTask = (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  const { title, description, deadline, status } = req.body;
  const sqlUpdate = "UPDATE tasks SET title = ?, description = ?, deadline = ?, status = ? WHERE id = ?"; // タスクのタイトル、説明、期限、ステータスを更新
  db.query(sqlUpdate, [title, description, deadline, status, taskId], (err, result) => {
    if (err) return handleError(res, err, "タスクの更新に失敗しました");
    if (result.affectedRows === 0) return res.status(404).send("タスクが見つかりません");
    res.send({ taskId, title, description, deadline, status });
  });
};

//  タスクを削除する
const deleteTask = (req, res) => {
  const taskId = req.params.id; // URLパラメータからIDを取得
  const sqlDelete = "DELETE FROM tasks WHERE id = ?";
  db.query(sqlDelete, [taskId], (err, result) => {
    if (err) return handleError(res, err, "タスクの削除に失敗しました");
    if (result.affectedRows === 0) return res.status(404).send("タスクが見つかりません");
    res.send({ message: "タスクが正常に削除されました" });
  });
};

module.exports = { getAllTasks, getTask, addTask, updateTask, deleteTask };
