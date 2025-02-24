const file_system = require("fs");
// file_system.writeFileSync("hola.html", "Hola mi buen amigo");

// const arreglo = [199, 121, 434, 12, 54, 12, 54, 65, 7];

// arreglo.forEach((a) => {
//   setTimeout(() => {
//     console.log(a);
//   }, a);
// });

const http = require("http");
const home = file_system.readFileSync(
  "../Laboratorios/pages/home.html",
  "utf8"
);

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.setHeader("Content-Type", "text/html");
  response.write(home);
  response.end();
});

server.listen(3000);
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

// const file_system = require("fs");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(`Write something...`, (entrada) => {
  file_system.writeFileSync("texto.txt", entrada);
  rl.close();
});
// https://nodejs.org/en/learn/command-line/accept-input-from-the-command-line-in-nodejs

for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[j] > arr[i + 1]) {
      const temp = arr[j];
      arr[j] = arr[i + 1];
      arr[i + 1] = temp;
    }
  }
}

console.log(arr);
