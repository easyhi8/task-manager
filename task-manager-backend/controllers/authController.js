//authController.js
const db = require("../config/database");
const bcrypt = require("bcrypt"); //パスワードハッシュ化のためのライブラリをインポート
require('dotenv').config(); //環境変数を読み込む
const jwt = require("jsonwebtoken"); //JWT生成のためのライブラリをインポート

//データベースクエリをラップする関数
const dbQuery = (query, params) => {
  return new Promise((resolve, reject) => {
      db.query(query, params, (err, results) => {
          if (err) return reject(err);
          resolve(results);
      });
  });
};

//新しいユーザーを追加する
const insertUser = async (req, res) => {
  const { userName, password } = req.body; //リクエストボディからユーザー名とパスワードを取得
  if (!userName || !password) {
      return res.status(400).send("Enter your username and password。"); //ユーザー名またはパスワードがない場合はエラーメッセージ
  }

  try {
    //パスワードをハッシュ化
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


//ログイン処理
const loginUser = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
      return res.status(400).send("Enter your username and password");
  }

  try {
    //ユーザー名に基づいてユーザーをデータベースから取得
    const results = await dbQuery("SELECT * FROM users WHERE userName = ?", [userName]);

    if (results.length === 0) {
        return res.status(401).send("Incorrect username or password"); //ユーザーが存在しない場合のエラーメッセージ
    }

    const user = results[0]; //ユーザー情報を取得
    const match = await bcrypt.compare(password, user.password); //パスワードを比較

    if (!match) {
        return res.status(401).send("Incorrect username or password"); //パスワードが一致しない場合のエラーメッセージ
    }

    //JWTを生成し、ユーザーIDをペイロードに含める
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "ログイン成功", token }); //成功メッセージとトークンを返す
  } catch (error) {
    console.error(error);
    return res.status(500).send("Faild to login");
  }
};

module.exports = { insertUser, loginUser };
