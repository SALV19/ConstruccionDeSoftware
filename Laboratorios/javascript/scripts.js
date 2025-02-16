console.log("Hello there");
// console.info("Hey! you should reply with General Kenobi");
// console.warn("If you don't, somehting might happen");
// console.error("This is what happens when you don't say General Kenobi");

var inseguro = "vas mal";
let mejor = "variable";
const precio = 99.99;

function submitForm() {
  const form = document.getElementById("form");
  let table = `<table id="number_table" class="container">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Cuadrado</th>
                      <th>Cúbico</th>
                    </tr>
                  </thead>
                  <tbody>`;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const element = event.target["number"].value;
    for (let i = 1; i <= element; i++) {
      table += `<tr>
                  <th>
                    ${i}
                  </th>
                  <th>
                    ${i ** 2}
                  </th>
                  <th>
                    ${i ** 3}
                  </th>
                </tr>`;
    }
    table += `</tbody>
              </table>`;
    document.write(table);
  });
}

const prompt_interaction = () => {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  const time1 = new Date();
  const suma_aleatoria = prompt(`¿Cual es la suma de:  ${num1} + ${num2}?`);
  const time2 = new Date();
  const final_time = (time2.getTime() - time1.getTime()) / 1000;
  console.log(final_time);

  if (num1 + num2 === Number(suma_aleatoria)) {
    console.log("Exito!");
    alert(
      `Correcto!! la respuesta es ${
        num1 + num2
      }\nTardaste ${final_time} segundos en contestar.`
    );
  } else {
    console.error("Te equivocaste");
    alert(
      `Perdón! la respuesta es ${
        num1 + num2
      }\nTardaste ${final_time} segundos en contestar.`
    );
  }
};

const array = new Array();
for (let i = 0; i < 10; i++) {
  array.push(Math.floor(Math.random() * 10 - 5));
}

function count_elements(array) {
  let { positive, negative, zero } = { positive: 0, negative: 0, zero: 0 };
  array.map((num) => {
    if (num > 0) positive++;
    else if (num === 0) zero++;
    else negative++;
  });
  return { positive, negative, zero };
}

function crear_tabla_contador() {
  const t = document.createElement("table");
  let r = t.insertRow(0);
  let c = r.insertCell(0);
  c.innerHTML = "Positivos";
  c = r.insertCell(1);
  c.innerHTML = "Negativos";
  c = r.insertCell(2);
  c.innerHTML = "Zero";
  r = t.insertRow(1);
  c = r.insertCell(0);
  c.innerHTML = positive;
  c = r.insertCell(1);
  c.innerHTML = negative;
  c = r.insertCell(2);
  c.innerHTML = zero;
  return t;
}

const { positive, negative, zero } = count_elements(array);

const contador = document.querySelector("#contador_numeros");
const head = document.createElement("h2");
head.innerHTML = `Contador de números: [${array}]`;
const t = crear_tabla_contador();
t.classList.add("table");
contador.appendChild(head);
contador.appendChild(t);

const matrix = Array(10).fill(Array(10).fill(1));
const new_matrix = matrix.map((arr) =>
  arr.map(() => {
    return Math.floor(Math.random() * 10);
  })
);

// console.log(new_matrix);
const promedio = new_matrix.map((arr) => {
  let prom = 0;
  arr.forEach((num) => {
    prom += num;
  });
  return prom / 10;
});

function matrix_table() {
  const t = document.createElement("table");
  for (let i = 0; i < 10; i++) {
    let r = t.insertRow(i);
    for (let j = 0; j < 10; j++) {
      let c = r.insertCell(j);
      c.innerHTML = new_matrix[i][j];
    }
  }
  return t;
}

function prom_table() {
  const t = document.createElement("table");
  const r = t.insertRow(0);
  for (let i = 0; i < 10; i++) {
    let c = r.insertCell(i);
    c.innerHTML = promedio[i];
  }
  return t;
}

const lista = matrix_table();
lista.classList.add("table");
const head_matrix = document.createElement("h2");
head_matrix.innerHTML = "Matriz";

document.querySelector("#matrix").appendChild(head_matrix);
document.querySelector("#matrix").appendChild(lista);

const prom = prom_table();
prom.classList.add("table");
const head_prom = document.createElement("h2");
head_prom.innerHTML = "Promedios";

document.querySelector("#promedios").appendChild(head_prom);
document.querySelector("#promedios").appendChild(prom);

function inverso(num) {
  const num_txt = String(num);
  console.log(num_txt);
  let inv = new String();
  for (let i = num_txt.length - 1; i > -1; i--) {
    inv += num_txt[i];
  }
  console.log(inv);
  return inv;
}

const num_inverso = document.createElement("p");
num_inverso.innerHTML = "Número original: 123456789 <br/>Nuevo número: ";
num_inverso.innerHTML += inverso(123456789);
document.querySelector("#inverso").appendChild(num_inverso);
