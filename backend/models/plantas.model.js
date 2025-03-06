const db = require("../util/database");

const plantas = [];
module.exports = class Planta {
  //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(mi_nombre) {
    this.nombre = mi_nombre;
  }
  //Este método servirá para guardar de manera persistente el nuevo objeto.
  async save() {
    return db.execute("INSERT INTO plantas(nombre) VALUES (?)", [this.nombre]);
  }
  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static async fetchAll() {
    return plantas;
  }
};
