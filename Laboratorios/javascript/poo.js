class VehicleFleet {
  #vehicles = [];

  constructor() {}
  add_vehicle(vehicle) {
    this.#vehicles.push(vehicle);
  }
  show_info() {
    this.#vehicles.map((v) => {
      console.table(v);
    });
  }
  show_prices() {
    this.#vehicles.map((v) => {
      console.log(v.get_tipo(), v.marca, v.calculate_price());
    });
  }
}

class Vehicle {
  marca;
  modelo;
  anio;
  matricula;
  constructor(marca, modelo, anio, matricula) {
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.matricula = matricula;
  }
  calculate_price() {}
}

class Car extends Vehicle {
  #tipo = "coche";
  #llantas = 4;
  get_tipo() {
    return this.#tipo;
  }
  calculate_price() {
    return Math.floor(100000 * ((2025 - this.anio) / 10));
  }
}

class Camion extends Vehicle {
  #tipo = "camion";
  #llantas = 6;
  get_tipo() {
    return this.#tipo;
  }
  calculate_price() {
    return Math.floor(50000 * ((2025 - this.anio) / 10 + 0.5));
  }
}

class Moto extends Vehicle {
  #tipo = "moto";
  #llantas = 2;
  get_tipo() {
    return this.#tipo;
  }
  calculate_price() {
    return Math.floor(5000 * ((2025 - this.anio) / 10));
  }
}

const vehicles = [
  new Car("BMW", "v3", 2013, "EW134L"),
  new Moto("BMW", "v3", 2013, "EW134L"),
  new Camion("BMW", "v3", 2013, "EW134L"),
  new Camion("BMW", "v3", 2013, "EW134L"),
];

const vF = new VehicleFleet();

vehicles.forEach((v) => {
  vF.add_vehicle(v);
});

vF.show_info();
vF.show_prices();
