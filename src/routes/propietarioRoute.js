import * as Propietario from "../controllers/propietarioController.js";
import { Router } from "express";


const router = Router()

router.get('/', Propietario.getPropietarios);
router.get('/:rfc', Propietario.getPropietarioById);
router.post('/', Propietario.insertPropietario)
router.delete('/:id', Propietario.deletePropietario)
router.patch('/', Propietario.updatePropietario)
router.put('/', Propietario.asociarPropiedad)

export default router;