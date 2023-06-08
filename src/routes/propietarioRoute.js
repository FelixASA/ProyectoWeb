import { getPropietarios, getPropietariosByRFC, insertPropietario } from "../controllers/propietarioController.js";
import { Router } from "express";


const router = Router()

router.get('/', getPropietarios);
router.get('/:rfc', getPropietariosByRFC);
router.post('/', insertPropietario)

export default router;