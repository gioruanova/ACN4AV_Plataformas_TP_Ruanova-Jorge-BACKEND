const jwt = require("jsonwebtoken");


exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization header:", authHeader); // Agregar este log

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Token de autenticación no proporcionado",
    });
  }

  const [bearer, token] = authHeader.split(" ");
  console.log("Bearer:", bearer, "Token:", token); // Log para ver cómo está el token

  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ success: false, message: "Formato de token no válido" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("Error de verificación de token:", error); // Log para verificar el error de JWT
    return res.status(401).json({
      success: false,
      message: "Token de autenticación no válido",
    });
  }
};
