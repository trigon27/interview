const express = require("express");
const router = express.Router();
const { register, login } = require("../controller/UserController");

router.post("/Bregister", register);
router.post("/Blogin", login);

module.exports = router;
