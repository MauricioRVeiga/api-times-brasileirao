import { Router } from "express";
import * as controller from "../controllers/championshipController.js";
import { getRodada } from "../controllers/matchController.js";

const router = Router();

// ⚠️ Rotas mais específicas primeiro
router.get("/:id/rodadas/:rodada", getRodada);
router.get("/:id/classificacao", controller.getClassificacao);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.post("/:id/participantes", controller.addTeams);
router.delete("/", controller.removeAll);

export default router;