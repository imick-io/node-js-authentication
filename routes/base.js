const express = require("express");

const baseController = require("../controllers/base.controller");

const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/unprotected", baseController.unprotected);
router.get("/protected", isAuth, baseController.protected);

module.exports = router;
