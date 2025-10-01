import { Router } from "express";
import * as controller from "../controllers/championshipController.js";
import { getRodada } from "../controllers/matchController.js"; // 👈 importa função de rodadas

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/participantes", controller.addTeams);
router.delete("/", controller.removeAll);

// classificação do campeonato
router.get("/:id/classificacao", controller.getClassificacao);

// jogos de uma rodada específica
router.get("/:id/rodadas/:rodada", getRodada); // 👈 nova rota

export default router;
