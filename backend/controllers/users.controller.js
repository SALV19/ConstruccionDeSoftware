exports.get_login = (req, res, next) => {
  res.render("login.ejs")
}
exports.post_login = (req, res, next) => {
  console.log(req.body.username)
  req.session.username = req.body.username
  res.redirect("/plantas")
}