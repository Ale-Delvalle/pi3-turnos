import { Router} from "express"
import {verTurnos,turnoPorId,nuevoTurno,cancelarTurno} from "../controllers/appointmentsController"
const router = Router();

router.get("/turnos",verTurnos)
router.get("/:id",turnoPorId)
router.post("/nuevoTurno",nuevoTurno)
router.put("/cancelar/:id",cancelarTurno)

export default router;