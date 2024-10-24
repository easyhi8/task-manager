//task.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/tasks", tasksController.getTasks);

router.post("/tasks", tasksController.insertTask);

router.put("/tasks", tasksController.updateTask);

router.delete("/tasks", tasksController.deleteTask);

module.exports = router;
