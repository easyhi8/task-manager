const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/auth", authController.getUsers);

router.post("/auth", authController.insertUser);

router.put("/auth", authController.updateUser);

// router.delete("/auth", authController.deleteUser);

module.exports = authRouter;
