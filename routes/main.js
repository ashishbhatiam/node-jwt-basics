const express = require("express");
const router = express.Router();

const { loginRegister, dashboard } = require("../controllers/main");

router.route("/dashboard").get(dashboard);
router.route("/login").post(loginRegister);

module.exports = router;
