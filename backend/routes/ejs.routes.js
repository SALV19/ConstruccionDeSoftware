const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/una-ruta", (req, res, next) => {
  res.render("index");
});

module.exports = router;
