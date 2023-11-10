const express = require("express");
const cors = require("cors"); //para evitar problemas con la CORS policy
const usuariosRouter = require("./JS/rutas/usuarios");
const loginRouter = require("./JS/rutas/login");
const registroRouter = require("./JS/rutas/registro");
const PORT = process.env.PORT || 3050;

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


//rutas
//por defecto
app.get("/", async (req, res) => {
  res.send("bienvenido a la api");
});

app.use("/login", loginRouter);
app.use("/usuarios", usuariosRouter);

app.listen(PORT, () => console.log(`servidor corriendo en puerto: ${PORT}`));
