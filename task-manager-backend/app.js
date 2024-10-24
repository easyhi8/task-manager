//app.js
const express = require("express");
const cors = require("cors");
const app = express();
const taskRoutes = require("./routes/tasks");

app.use(express.json());
app.use(cors());

// ユーザー関連のAPIルートを使用
app.use("/api", taskRoutes);

app.listen(3001, () => {
    console.log('Server running on port 3001');
});
