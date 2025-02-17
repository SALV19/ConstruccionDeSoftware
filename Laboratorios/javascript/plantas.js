const boton = document.getElementById("boton_regar");

const poner_menta = () => {
  let imagen = document.getElementById("imagen_menta");
  imagen.innerHTML = `<img alt="foto_de_menta" src="https://notipress.mx/img/content/14958.webp"/>`;
  boton.onclick = poner_jacaranda;
};

const poner_jacaranda = () => {
  let imagen = document.getElementById("imagen_jacaranda");
  imagen.innerHTML = `<img alt="foto_de_menta" src="https://http2.mlstatic.com/D_NQ_NP_610820-MLM32511151877_102019-O.webp"/>`;
  boton.onclick = poner_maqui;
};

const poner_maqui = () => {
  let imagen = document.getElementById("imagen_maqui");
  imagen.innerHTML = `<img alt="foto_de_menta" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZB16JuftvA5-9G0M-X_MKDDTXjhC4sIL4LQ&s"/>`;
  boton.textContent = "Cortar";
  const img = document.querySelector("#imagen_jacaranda");
  img.style.position = "relative";
  img.style.top = "10rem";
  boton.onclick = cortar_plantas;
};

const cortar_plantas = () => {
  const imagenes = document.querySelectorAll("img");
  for (let i of imagenes) {
    i.remove();
  }
  boton.textContent = "Regar";
  boton.onclick = poner_menta;
};

boton.onclick = poner_menta;

setInterval(() => {
  boton.click();
}, 1000);

const email = document.getElementById("email");
const password = document.getElementById("password");

email.onkeydown = (e) => {
  const is_available = document.querySelector("#is_available");
  const is_not_available = document.querySelector("#is_not_available");

  if (e.target.value.includes("@") && e.target.value.includes(".com")) {
    is_not_available.classList.add("hidden");
    is_available.classList.remove("hidden");
  }
};
email.onchange = (e) => {
  const is_available = document.querySelector("#is_available");
  const is_not_available = document.querySelector("#is_not_available");
  if (!e.target.value.includes("@") && !e.target.value.includes(".com")) {
    is_not_available.classList.remove("hidden");
    is_available.classList.add("hidden");
  }
};

const verify_password = (e) => {
  const caps = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const caps_arr = [...caps];
  const special = ".,;:-_*'?¡¿!#$%&/()=<>";
  const special_arr = [...special];
  const length = e.length < 8;
  if (length) {
    document.querySelector("#long").classList.remove("hidden");
  } else {
    document.querySelector("#long").classList.add("hidden");
  }
  const arr = [...e];

  const caps_bool = arr.some((l) => caps_arr.includes(l));
  if (caps_bool) {
    document.querySelector("#mayusculas").classList.add("hidden");
  } else {
    document.querySelector("#mayusculas").classList.remove("hidden");
  }

  const special_bool = arr.some((l) => special_arr.includes(l));
  if (special_bool) {
    document.querySelector("#special").classList.add("hidden");
  } else {
    document.querySelector("#special").classList.remove("hidden");
  }

  const numbers_bool = /\d/.test(e);
  if (numbers_bool) {
    document.querySelector("#numero").classList.add("hidden");
  } else {
    document.querySelector("#numero").classList.remove("hidden");
  }

  if (numbers_bool && special_bool && caps_bool && !length) {
    document.querySelector("#pass").classList.remove("hidden");
  } else {
    document.querySelector("#pass").classList.add("hidden");
  }
  return numbers_bool && special_bool && caps_bool && !length;
};

password.onkeyup = (e) => {
  verify_password(e.target.value);
};

const registrar = document.querySelector("#registrar");
registrar.onclick = (e) => {
  e.preventDefault();
  const password = document.querySelector("#password").value;
  if (verify_password(password)) {
    alert("Contraseña guardada en la base de datos!");
  } else {
    alert("Error: Contraseña no valida");
  }
};

const verdana = (e) => {
  e.preventDefault();
  document.querySelector("body").style.fontFamily = "Verdana";
  cambio.onclick = arial;
};
const arial = (e) => {
  e.preventDefault();
  document.querySelector("body").style.fontFamily = "Arial";
  cambio.onclick = roboto;
};
const roboto = (e) => {
  e.preventDefault();
  document.querySelector("body").style.fontFamily = "Roboto";
  cambio.onclick = verdana;
};

const cambio = document.querySelector("#cambio");
cambio.onclick = verdana;

// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
// https://bulma.io
// https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
