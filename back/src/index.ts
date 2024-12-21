import app from "./server";
import {PORT} from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize()
.then(res => {
    console.log('Conexion a la base de datos realizada con éxito');
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    })
})