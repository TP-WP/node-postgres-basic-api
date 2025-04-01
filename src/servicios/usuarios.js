const { pool } = require("./pgsql");

const valida_usuario = async (email, pass) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `SELECT check_pass('${email}', '${pass}') AS result`;
      const response = await pool.query(sql);
      resolve(response.rows[0].result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { valida_usuario };