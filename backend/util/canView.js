module.exports = (request, response, next) => {
  console.log(request.session.privilegios);
  for (let privilegio of request.session.privilegios) {
    if (privilegio.nombre == "consultar_planta") {
      return next();
    }
  }
  return response
    .status(403)
    .send("Tus acciones han sido registradas y reportadas");
};
