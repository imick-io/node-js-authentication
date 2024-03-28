const express = require("express");
const dummyauthController = require("../controllers/sessionauth.controller");

const router = express.Router();

router.post("/login", dummyauthController.login);
router.post("/logout", dummyauthController.logout);

module.exports = router;
