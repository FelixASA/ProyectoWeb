import * as Relaciones from "../controllers/relacionesController.js";
import { Router } from "express";

const router = Router()

router.get('/', Relaciones.getRelaciones);
router.get('/:id', Relaciones.getRelacionById);
router.post('/', Relaciones.asociarPropiedad)
router.delete('/:id', Relaciones.deleteRelacion)
router.patch('/', Relaciones.updateRelacion)

export default router;