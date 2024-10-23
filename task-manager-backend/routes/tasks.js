const express = require("express");
const router = express.Router();
const tasksController = require("../controllers/tasksController");

router.get("/get/tasks", tasksController.getTasks);

router.post("/insert/tasks", tasksController.getTasks);

router.put("/update/tasks", tasksController.getTasks);

router.delete("/delete/tasks", tasksController.getTasks);

module.exports = router;
