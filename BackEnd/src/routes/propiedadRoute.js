import * as Propiedad from "../controllers/propiedadController.js";
import { Router } from "express";


const router = Router()

router.get('/', Propiedad.getPropiedades);
router.get('/:id', Propiedad.getPropiedadById);
router.post('/', Propiedad.insertPropiedad);
router.delete('/:id', Propiedad.deletePropiedad)
router.patch('/', Propiedad.updatePropiedad)

export default router;