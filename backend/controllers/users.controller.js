const Planta = require("../models/plantas.model")

exports.get_login = (req, res, next) => {
  console.log(req.session.isLoggedIn)
  res.render("login.ejs", {
    isLoggedIn: req.session.isLoggedIn || false,
  })
}
exports.post_login = (req, res, next) => {
  req.session.isLoggedIn = true;
  req.session.username = req.body.username
  
  const mi_planta = new Planta(req.session.username)
  mi_planta.save()

  res.redirect("/plantas")
}