const db = require("../util/database");

module.exports = class Jardin {
  //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
  constructor(u_id, p_id, mi_imagen) {
    this.user_id = u_id;
    this.planta_id = p_id;
    this.mi_imagen = mi_imagen;
  }
  //Este método servirá para guardar de manera persistente el nuevo objeto.
  async save() {
    return db.execute(
      "INSERT INTO jardin(id_usuario, id_planta, imagen) VALUES (?, ?, ?)",
      [this.user_id, this.planta_id, this.mi_imagen]
    );
  }
  //Este método servirá para devolver los objetos del almacenamiento persistente.
  static async fetchAll(user_id) {
    return db.execute(
      `SELECT p.id, p.nombre, p.created_at
      FROM jardin j, plantas p 
      WHERE j.id_planta = p.id
      AND  j.id_usuario = ?`,
      [user_id]
    );
  }
};
