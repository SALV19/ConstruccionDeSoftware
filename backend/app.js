// const file_system = require("fs");

// file_system.writeFileSync("hola.html", "Hola mi buen amigo");

// const arreglo = [199, 121, 434, 12, 54, 12, 54, 65, 7];

// arreglo.forEach((a) => {
//   setTimeout(() => {
//     console.log(a);
//   }, a);
// });

// const http = require("http");
// const server = http.createServer((request, response) => {
//   console.log(request.url);
//   response.setHeader("Content-Type", "text/html");
//   response.write("Hello there / General Kenobi");
//   response.end();
// });

// server.listen(3000);
const arr = [];
for (let i = 0; i < 10; i++) {
  arr.push(Math.floor(Math.random() * 100));
}

let prom = 0;
arr.forEach((val) => {
  // console.log(val);
  prom += val;
});

console.log(prom / 10);
