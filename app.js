require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || "8888";

if (!port) {
  throw new Error("❌ ERROR: No se encontró la variable PORT en Railway.");
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cors = require("cors");

const allowedOrigins = [
  "http://localhost:5173",
  "https://reservas-salas-seven.vercel.app",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: "Content-Type",
}));


app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(`Ruta registrada: ${r.route.path}`);
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${port}`);
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
app.use(require("./src/routes/usuarioRoute"));
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
