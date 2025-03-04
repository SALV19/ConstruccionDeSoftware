const fs = require("fs");
const Planta = require("../models/plantas.model");

exports.get_root = (req, res, next) => {
  console.log(req.session.username)
  res.render("plants", {plantas: Planta.fetchAll()});
};

exports.get_agregar = (req, res, next) => {
  res.render("agregar_plantas");
};

exports.post_agregar = (req, res, next) => {
  console.log(req.body.planta);
  const mi_planta = new Planta(req.body.planta);
  mi_planta.save();

  res.redirect("/plantas/");
};
