import { Router} from "express"
import {getAllUsers,getUserById,register,login} from "../controllers/userController"
const router = Router();

router.get("/getUsers",getAllUsers)
router.get("/getUserById/:id",getUserById)
router.post("/newUser",register)
router.post("/login",login)

export default router;