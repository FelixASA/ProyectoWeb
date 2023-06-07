import { getArrendatarios, getArrendatariosByRFC, insertArrendatario } from "../controllers/arrendatarioController.js";
import { Router } from "express";

const router = Router()

router.get('/', getArrendatarios);
router.get('/:rfc', getArrendatariosByRFC);
router.post('/', insertArrendatario)

export default router;