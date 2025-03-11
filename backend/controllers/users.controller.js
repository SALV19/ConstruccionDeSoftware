const Usuario = require("../models/users.model");

exports.get_login = (req, res, next) => {
  res.render("login.ejs", {
    isLoggedIn: req.session.isLoggedIn || false,
    user: "",
    isNew: false,
    error: false,
    csrfToken: req.csrfToken(),
  });
};
exports.post_login = (req, res, next) => {
  const bcrypt = require("bcrypt");
  Usuario.fetchOne(req.body.username)
    .then(([rows, fieldData]) => {
      if (rows.length > 0) {
        bcrypt
          .compare(req.body.password, rows[0].password)
          .then((doMatch) => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.username = req.body.username;
              return req.session.save((err) => {
                res.redirect("/plantas");
              });
            } else {
              res.render("login", {
                isLoggedIn: req.session.isLoggedIn || false,
                isNew: false,
                error: "wrong_password",
                csrfToken: req.csrfToken(),
              });
            }
          })
          .catch((e) => console.log(e));
      } else {
        res.redirect("/users/login");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.get_logout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/users/login");
  });
};

exports.get_signup = (req, res, next) => {
  res.render("login.ejs", {
    isLoggedIn: req.session.isLoggedIn || false,
    isNew: true,
    error: false,
    csrfToken: req.csrfToken(),
  });
};

exports.post_signup = (req, res, next) => {
  const mi_usuario = new Usuario(req.body.username, req.body.password);
  mi_usuario
    .save()
    .then(() => {
      res.redirect("/users/login");
    })
    .catch((error) => {
      console.log(error);
    });
};
