const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Rota de login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Usuário não encontrado" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ message: "Senha inválida" });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});


// Rota de registro
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Verifica se já existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Usuário já existe" });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria usuário
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao registrar usuário", error: err.message });
  }
});

module.exports = router;
