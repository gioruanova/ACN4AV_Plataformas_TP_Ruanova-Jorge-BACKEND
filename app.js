require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./db");
const app = express();
const port = 8888;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log("Servidor iniciando en puerto : " + port);
});

// Raiz
app.get("/", (req, res) => {
  res.send("Home reservas");
});

// Rutas
// --------------
app.use(require("./src/routes/salaRoute"));
app.use(require("./src/routes/horarioRoute"));
app.use(require("./src/routes/reservaRoute"));
// --------------

// default con error
app.use("/", (req, res, next) => {
  res.status(404);
  res.send(`
    <h1>Error 404: Pagina no encontrada</h1>
    <p>La pagina no pudo encontrarse</p>    
    <a href="/">Volver al inicio</a>
    `);
});
