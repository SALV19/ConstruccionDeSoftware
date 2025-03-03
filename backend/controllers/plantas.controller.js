const fs = require("fs");

exports.get_agregar = (req, res, next) => {
  res.render("agregar_plantas");
}

const plantas = []

exports.post_agregar = (req, res, next) => {
  console.log(req.body.planta);
  plantas.push(req.body.planta);
  fs.appendFileSync("plantas.txt", req.body.planta + "\n");
  const plantas_r = fs.readFileSync("plantas.txt")
  res.render("plants", {plantas: plantas})
}