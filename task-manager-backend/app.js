//app.js
const express = require("express");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(cors());

// ユーザー関連のAPIルートを使用
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
