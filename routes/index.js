const express = require("express");
const { showHome } = require("../controllers/homeController");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.get("/", showHome);
router.use("/users", userRoutes);

module.exports = router;
