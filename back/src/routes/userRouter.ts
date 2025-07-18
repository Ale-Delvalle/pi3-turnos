import { Router} from "express"
import {getAllUsers,getUserById,register,login,turnosPorUsuario,isTheUserNameAvaiable} from "../controllers/userController"
const router = Router();

router.get("/getUsers",getAllUsers)
router.get("/getUserById/:id",getUserById)
router.get("/turnosPorUsuario/:id",turnosPorUsuario)
router.post("/UserExist",isTheUserNameAvaiable)
router.post("/newUser",register)
router.post("/login",login)

export default router;