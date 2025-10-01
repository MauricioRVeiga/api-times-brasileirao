import express from "express";
import * as controller from "../controllers/matchController.js";
import { updatePartida } from "../controllers/matchController.js";

const router = express.Router({ mergeParams: true });

// Rotas RESTful (com campeonatoId)
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.delete("/campeonato/:campeonatoId", controller.removeByCampeonato);
router.put("/:partidaId", updatePartida);

// Rota alternativa direta (sem campeonatoId)
const directRouter = express.Router();
directRouter.put("/:partidaId", updatePartida);

export { router as matchRoutes, directRouter as matchDirectRoutes };
