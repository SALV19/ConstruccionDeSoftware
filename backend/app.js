const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const plantas_routes = require("./routes/plantas.routes");
const other_routes = require("./routes/other.routes");
const ejs_routes = require("./routes/ejs.routes");

app.use("/plantas", plantas_routes);
app.use("/", other_routes);
app.use("/ejs", ejs_routes);

app.use((req, res, next) => {
  res.status = 404;
  res.send("ERROR: 404");
});

console.log("Server started in: http://localhost:3000");
app.listen(3000);
