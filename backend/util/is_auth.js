module.exports = (request, response, next) => {
  console.log("middleware");
  console.log(request.session.isLoggedIn);
  if (!request.session.isLoggedIn) {
    return response.redirect("/users/login");
  }
  next();
};
