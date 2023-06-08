import * as Users from "../controllers/usersController.js"
import { Router } from "express";

const router = Router()

router.get('/', Users.getUsers);
router.get('/:id', Users.getUsersById);
router.post('/', Users.insertUser)
router.delete('/:id', Users.deleteUser)

export default router;