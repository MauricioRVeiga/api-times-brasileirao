const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer token"

  if (!token) return res.status(401).json({ message: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // salva os dados do usuário no request
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido ou expirado" });
  }
}

module.exports = authMiddleware;
