const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  res.render("home", { user: "Santiago", name: "Santiago", isLoggedIn: true });
});

module.exports = router;
