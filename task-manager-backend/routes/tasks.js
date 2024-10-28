//task.js
const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/tasks", tasksController.getTasks);

router.get("/tasks/:id", tasksController.getTask);

router.post("/tasks", tasksController.insertTask);

router.put("/tasks/:id", tasksController.updateTask);

router.delete("/tasks", tasksController.deleteTask);

module.exports = router;
