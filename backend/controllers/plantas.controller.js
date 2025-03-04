const fs = require("fs");
const Planta = require("../models/plantas.model");

exports.get_root = (req, res, next) => {
  res.render("plants", {
    plantas: Planta.fetchAll(), 
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.username,
  });
  console.log(req.get("Cookie"));
};

exports.get_agregar = (req, res, next) => {
  res.render("agregar_plantas", {
    isLoggedIn: req.session.isLoggedIn || false
  });
};

exports.post_agregar = (req, res, next) => {
  console.log(req.body.planta)
  const mi_planta = new Planta(req.body.planta);
  mi_planta.save();

  res.setHeader('Set-Cookie', `ultima-planta=${req.body.planta}`)
  res.redirect("/plantas/");
};
