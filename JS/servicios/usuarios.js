const { pool } = require("./pgsql");

const creaUsuario = async (usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      sql = `CALL ingresa_usuario ('${usuario.email}', '${usuario.contrasena}')`;
      await pool.query(sql);
      resolve("usuario creado: ");
    } catch (err) {
      reject(err);
    }
  });
};

const getSingle = async (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT email, contrasena FROM usuario WHERE email='${email}'`;
      const result = await pool.query(sql);
      resolve(result.rows[0]);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { creaUsuario, getSingle };
