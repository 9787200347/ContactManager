const express = require("express");
const router = express.Router();
const {registerUser, loginUser ,deleteUser} = require("../Coontroller/UserController");

router.route("/userRegister").post(registerUser);

router.route("/userLogin").get(loginUser);
router.route("/deleteUser/:userName").delete(deleteUser);
module.exports = router;