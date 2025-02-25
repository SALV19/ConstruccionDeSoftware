const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const plantas_routes = require("./routes/plantas.routes");

app.use("/plantas", plantas_routes);

app.use((req, res, next) => {
  console.log("middleware!");
  next();
});

app.use((req, res, next) => {
  console.log("otro middleware!");
  res.send(html_header + html_error404 + html_footer);
  next();
});

app.listen(3000);
