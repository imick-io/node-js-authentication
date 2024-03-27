const express = require("express");
const dummyauthController = require("../controllers/dummyauth.controller");

const router = express.Router();

router.post("/login", dummyauthController.login);

module.exports = router;
