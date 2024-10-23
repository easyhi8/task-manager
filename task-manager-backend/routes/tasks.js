const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/get/tasks", tasksController.getTasks);

router.post("/insert/tasks", tasksController.addTasks);

router.put("/update/tasks", tasksController.updateTasks);

router.delete("/delete/tasks", tasksController.deleteTasks);

module.exports = router;
