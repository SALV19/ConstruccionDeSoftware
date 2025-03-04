const Planta = require("../models/plantas.model")

exports.get_login = (req, res, next) => {
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

exports.get_logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/users/login")
  })
}