const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getUserData,
  protect,
  updateProfile,
} = require("../controller/UserController");

router.post("/Bregister", register);
router.post("/Blogin", login);
router.get("/BgetUserData/:id", getUserData);
router.put("/BUpdateUserData/:id", updateProfile);

module.exports = router;
