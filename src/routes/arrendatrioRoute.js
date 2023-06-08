import * as Arrendatario from "../controllers/arrendatarioController.js";
import { Router } from "express";

const router = Router()

router.get('/', Arrendatario.getArrendatarios);
router.get('/:id', Arrendatario.getArrendatarioById);
router.post('/', Arrendatario.insertArrendatario)
router.delete('/:id', Arrendatario.deleteArrendatario)
router.patch('/', Arrendatario.updateArrendatario)

export default router;