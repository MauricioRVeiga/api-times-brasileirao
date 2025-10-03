const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middleware/authMiddleware");

// Todas as rotas de times exigem token
router.get("/teams", authMiddleware, teamController.getAll);
router.get("/teams/:id", authMiddleware, teamController.getById);
router.post("/teams", authMiddleware, teamController.create);
router.put("/teams/:id", authMiddleware, teamController.update);
router.delete("/teams/:id", authMiddleware, teamController.remove);

module.exports = router;
