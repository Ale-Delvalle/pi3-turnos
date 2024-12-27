import express from "express"
import router from "./routes";
import cors from "cors"

const app=express();
// Los middlewares siempre deben estar antes que el router.
app.use(express.json());
app.use(cors());
app.use(router);

export default app;