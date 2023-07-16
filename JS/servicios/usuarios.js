const { pool } = require("./pgsql");

const creaUsuario = async (usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `INSERT INTO usuario (nombre, edad, rut,telefono, direccion ) VALUES ('${usuario.nombre}', '${usuario.edad}', '${usuario.rut}', '${usuario.telefono}', '${usuario.direccion}' )  `;
      await pool.query(sql);
      resolve("usuario creado: ");
    } catch (err) {
      reject(err);
    }
  });
};

const getAll = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT * FROM usuario`;
      const result = await pool.query(sql);
      resolve(result.rows);
    } catch (err) {
      reject(err);
    }
  });
};

const actualizaUsuario = async (usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `UPDATE usuario SET nombre = '${usuario.nombre}', edad = '${usuario.edad}', rut='${usuario.rut}', telefono='${usuario.telefono}', direccion='${usuario.direccion}' WHERE id='${usuario.id}';`;
      await pool.query(sql);
      resolve("usuario actualizado");
    } catch (err) {
      reject(err);
    }
  });
};

const eliminaUsuario = async (idUsuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `DELETE FROM usuario WHERE id='${idUsuario}'`;
      await pool.query(sql);
      resolve("usuarioEliminado");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { creaUsuario, getAll, actualizaUsuario, eliminaUsuario };
