const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// 新しいユーザーを追加する
const insertUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).send("Enter your username and password。");
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

// ログイン処理
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).send("Enter your username and password。");
    }

    const sqlSelect = "SELECT * FROM users WHERE userName = ?";
    db.query(sqlSelect, [userName], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Failed to login");
        }

        if (results.length === 0) {
          return res.status(401).send("Incorrect username or password");
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
          return res.status(401).send("Incorrect username or password");
        }
        const token = jwt.sign({ id: user.id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ message: "User login successfully", token });
      });
};

module.exports = { insertUser, loginUser };
