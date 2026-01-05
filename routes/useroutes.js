const express = require("express");
const router = express.Router();
const {loginUser} = require("../controller/usercontrol");
router.post("/login",loginUser);
module.exports = router;