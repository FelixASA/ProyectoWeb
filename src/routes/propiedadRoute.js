import { getPropiedadById, getPropiedades, insertPropiedad} from "../controllers/propiedadController.js";
import { Router } from "express";


const router = Router()

router.get('/', getPropiedades);
router.get('/:id', getPropiedadById);
router.post('/', insertPropiedad);

export default router;