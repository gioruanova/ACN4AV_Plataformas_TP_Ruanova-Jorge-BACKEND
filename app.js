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

// Ruta
app.get("/test", (req, res) => {
  res.send("Ruta test");
});

// con parametros
app.get("/test/:nombre", (req, res) => {
  const { nombre } = req.params;

  res.send("Ruta test con vasriable: " + nombre);
});

// ------------------------------------------------------
// ------------
// Consulta a la base -- TODAS LAS SALAS --
app.get("/salas", async (req, res) => {
  const query = "SELECT * FROM listadosalas";

  try {
    const [results] = await connection.query(query);
    res.json({ succsess: true, results: results });
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
});

// ------------
// Consulta a la base -- SALA POR ID --
app.get("/salas/:id", async (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM listadosalas WHERE id = ?";

  try {
    const [result] = await connection.query(query, [id]);
    if (result < 1) {
      res.status(404).json({ succsess: false, message: "La sala no existe" });
    } else {
      res.json({ succsess: true, result: result[0] });
    }
  } catch (error) {
    res.status(500).json({ succsess: false, message: "Error en conexion" });
  }
});

// default con error
app.use("/", (req, res, next) => {
  res.status(404);
  res.send(`
    <h1>Error 404: Pagina no encontrada</h1>
    <p>La pagina no pudo encontrarse</p>    
    <a href="/">Volver al inicio</a>
    `);
});
