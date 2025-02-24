const http = require("http");
const fs = require("fs");

const header = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Las mejores plantas</title>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@1.0.2/css/bulma.min.css"
    >
  </head>
`;

const home =
  header +
  `
  <body>
  <section class="section">
    <form action="/agregar" method="POST">
      <label for="planta" class="label">Nombre de la planta</label>
      <input 
        class="input" 
        type="text" 
        placeholder="Orquidea" 
        id="planta"
        name="planta"
      />
      <input type="submit" value="Enviar" class="button is-info mt-2"/>
    </form>
  </section>
  </body>
</html>
`;

const error404 =
  header +
  `
<body>
<section class="section">
  <h1 class="is-danger">Error 404:</h1>
  <h1>La página que estás buscando no existe</h1>
</section>
</body>
</html>
`;

const server = http.createServer((request, response) => {
  console.log(request.url);
  if (
    (request.method == "GET" && request.url == "/agregar") ||
    request.url == "/"
  ) {
    response.setHeader("Content-Type", "text/html");
    response.write(home);
    response.end();
  } else if (request.method == "POST" && request.url == "/agregar") {
    response.end();
  } else {
    response.statusCode = 404;
    response.setHeader("Content-Type", "text/html");
    response.write(error404);
    response.end();
  }
});

console.log("Server started in port: http://localhost:3000");
server.listen(3000);
