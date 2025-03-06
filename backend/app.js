const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret:
      "ewohgwrfhwrhgwriojfwefewpfohewfwgfwohreugerhgoierghrofhlñfherofhrfhriogerpguiwrhfoihwefhwrg",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const user_routes = require("./routes/user.routes");

app.use("/users", user_routes);

const plantas_routes = require("./routes/plantas.routes");
const other_routes = require("./routes/other.routes");
const ejs_routes = require("./routes/ejs.routes");
const home = require("./routes/home.routes");

app.use("/plantas", plantas_routes);
app.use("/", home);
app.use("/ejs", ejs_routes);

app.use((req, res, next) => {
  res.status = 404;
  res.send("ERROR: 404");
});

app.listen(3000, () => {
  console.log("Server started in: http://localhost:3000");
});
