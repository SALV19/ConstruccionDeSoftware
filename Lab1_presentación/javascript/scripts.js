console.log("Hello there");
// console.info("Hey! you should reply with General Kenobi");
// console.warn("If you don't, somehting might happen");
// console.error("This is what happens when you don't say General Kenobi");

var inseguro = "vas mal";
let mejor = "variable";
const precio = 99.99;

function submitForm() {
  const form = document.getElementById("form");
  let table = `<table id="number_table">
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

onload = (event) => {
  console.log("loaded");
};
