const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// 🔑 Rota de login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ message: "Informe usuário e senha" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.json({ token });
  } catch (err) {
    console.error("Erro no login:", err);
    return res.status(500).json({ message: "Erro interno no login" });
  }
});

// 📝 Rota de registro
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({ message: "Informe usuário e senha" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    console.error("Erro no registro:", err);
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
});

// 🔍 Rota de debug (opcional, só para testar req.body)
router.post("/debug-body", (req, res) => {
  res.json({ recebido: req.body });
});

module.exports = router;
