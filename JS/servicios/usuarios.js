const { pool } = require("./pgsql");

const creaUsuario = async (usuario) => {
  return new Promise(async (resolve, reject) => {
    try {
      sql = `CALL ingresa_usuario ('${usuario.email}', '${usuario.contrasena}')`;
      await pool.query(sql);
      resolve("usuario creado");
    } catch (err) {
      reject(err);
    }
  });
};

const validate_user = async (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT get_user_pass ('${email}')`;
      const stored_pass = await pool.query(sql);
      if(pass==stored_pass.rows[0].get_user_pass){
        resolve(true);
      }else{
        resolve(false);
      }
    } catch (err) {
      reject(err);
    }
  });
};

const get_user = async(email) =>{
  return email
}

module.exports = { creaUsuario, validate_user, get_user };
