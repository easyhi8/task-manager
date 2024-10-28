//server.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/task");

app.use(bodyParser.json());
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
