const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/get/tasks", tasksController.getTasks);

router.post("/insert/tasks", tasksController.insertTask);

router.put("/update/tasks", tasksController.updateTask);

router.delete("/delete/tasks", tasksController.deleteTask);

module.exports = router;
