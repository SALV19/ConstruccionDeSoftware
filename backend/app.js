const file_system = require("fs");

file_system.writeFileSync("hola.html", "Hola mi buen amigo");

const arreglo = [199, 121, 434, 12, 54, 12, 54, 65, 7];

arreglo.forEach((a) => {
  setTimeout(() => {
    console.log(a);
  }, a);
});
