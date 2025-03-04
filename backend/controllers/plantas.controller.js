const fs = require("fs");
const Planta = require("../models/plantas.model");

exports.get_root = (req, res, next) => {
  console.log(req.session.isLoggedIn)
  res.render("plants", {
    plantas: Planta.fetchAll(), 
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.username,
  });
};

exports.get_agregar = (req, res, next) => {
  res.render("agregar_plantas");
};

exports.post_agregar = (req, res, next) => {
  const mi_planta = new Planta(req.body.username);
  mi_planta.save();

  res.redirect("/plantas/");
};
