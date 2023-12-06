const cloudinary = require("../helper/img-upload");
const { pool } = require("./pgsql");

const creaUsuario = async (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const sql = `CALL ingresa_usuario ('${email}', '${password}')`;
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

const get_all_users = async() =>{
  return new Promise(async (resolve, reject)=>{
    try{
      sql = `SELECT get_all_users();`;
      const result = await pool.query(sql);
      resolve(result.rows.map((row)=>row.get_all_users));
    }catch(e){
      reject(e);
    }
  })
}

const upload_image = async ( email, file ) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = cloudinary.v2.uploader.upload(file,
        { public_id: `${req.user}_profile`, width: 500, height: 500, crop: "fill" });
      console.log("result clodinary: ",result);
      const sql = `CALL store_image_path ('${email}','${result.url}')`;
      await pool.query(sql);
      resolve("image path stored");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { creaUsuario, validate_user, get_user, upload_image, get_all_users };
