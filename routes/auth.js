const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.post("/reset", authController.reset);
router.post("/reset/:token", authController.newPassword);

module.exports = router;
