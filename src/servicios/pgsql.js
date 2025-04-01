require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  max: 4,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

/*
CREATE USER DB_USER WITH ENCRYPTED PASSWORD 'DB_PASSWORD';
CREATE DATABASE DB_NAME OWNER 'DB_USER';
*/

const testConnection =  () => {
  return new Promise(async (resolve, reject)=>{
    try{
      const client = await pool.connect();
      client.release();
      resolve("conexion a la base de datos exitosa");
    }catch(error){
      reject(error)
    }
  })
};
testConnection().then((value)=>{console.log(value)});

pool.query =  (query) => {
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
