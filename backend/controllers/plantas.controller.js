const fs = require("fs");
const Planta = require("../models/plantas.model");

exports.get_root = (req, res, next) => {
  const mensaje = req.session.info || "";
  if (req.session.info) {
    req.session.info = "";
  }

  Planta.fetch(req.params.id)
    .then(([rows, fieldData]) => {
      console.log(fieldData);
      console.log(rows);
      res.render("plants", {
        plantas: rows,
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.username,
        info: mensaje,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_agregar = (req, res, next) => {
  res.render("agregar_plantas", {
    isLoggedIn: req.session.isLoggedIn || false,
  });
};

exports.post_agregar = async (req, res, next) => {
  console.log(req.body.planta);
  const mi_planta = new Planta(req.body.planta);
  mi_planta
    .save()
    .then(() => {
      console.log("Planta guardada");
      req.session.info = `mi planta se ha creado ${mi_planta.nombre}`;

      res.redirect("/plantas/");
      return 200;
    })
    .catch((error) => {
      console.log(error);
      return 500;
    });
};
