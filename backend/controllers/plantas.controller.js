const fs = require("fs");
const Planta = require("../models/plantas.model");
const Jardin = require("../models/jardin.model");

exports.get_root = (req, res, next) => {
  const mensaje = req.session.info || "";
  if (req.session.info) {
    req.session.info = "";
  }

  Jardin.fetchAll(req.session.user_id)
    .then(([rows, fieldData]) => {
      res.render("plants", {
        plantas: rows,
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.username,
        info: mensaje,
        csrfToken: req.csrfToken(),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_agregar = (req, res, next) => {
  console.log(req.file);
  Planta.fetchAll()
    .then(([plantas, fieldData]) => {
      res.render("agregar_plantas", {
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.username,
        csrfToken: req.csrfToken(),
        privilegios: req.session.privilegios || [],
        plantas: plantas,
      });
    })
    .catch((e) => console.log(e));
};

exports.post_agregar = async (req, res, next) => {
  const mi_planta = new Jardin(req.body.planta);
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
