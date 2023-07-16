require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  max: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const testConnection = async () => {
  client = await pool.connect();
  client.release();
};
testConnection().then(console.log("conexion exitosa"));

pool.query = async (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const client = await pool.connect();
      const response = client.query(query);
      client.release();
      resolve(response);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

module.exports = { pool };
