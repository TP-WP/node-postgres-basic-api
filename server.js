//node modules
const express = require("express");
const cors = require("cors"); //para evitar problemas con la CORS policy
const cookieParser = require("cookie-parser");
require("dotenv").config();
//routes
const usuariosRouter = require("./JS/rutas/usuarios");

const PORT = process.env.PORT || 3050;

const app = express();

//only allowing my ip for this to work
app.use(cors({
  origin: process.env.MY_IP.split(","),
  credentials: true
}));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

//rutas
//por defecto
app.get("/", async (req, res) => {
  res.send("bienvenido a la api");
});

app.use("/usuarios", usuariosRouter);

app.listen(PORT, () => console.log(`servidor corriendo en puerto: ${PORT}`));
