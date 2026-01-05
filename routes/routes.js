const express = require("express");
const router = express.Router();
const userRoutes = require("./useroutes");
router.use("/user",userRoutes);
module.exports = router;