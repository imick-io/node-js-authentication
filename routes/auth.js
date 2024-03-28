const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signin", authController.signin);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);

module.exports = router;
