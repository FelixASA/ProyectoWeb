import express from "express";
import cors from "cors";
import arrendatrioRoute from "./src/routes/arrendatrioRoute.js"
import propietarioRoute from "./src/routes/propietarioRoute.js"
import propiedadRoute from "./src/routes/propiedadRoute.js"
import usersRoute from "./src/routes/usersRoute.js"
import authRoute from "./src/routes/auth-routes.js"
import relacionesRoute from "./src/routes/relacionesRoute.js"
import { sequelize } from "./src/database/database.js";
import { relaciones } from "./src/models/Relaciones.js";

const app = express();
const PORT = 4000

app.use(express.json());

var whitelist = 'http://localhost:3000'
app.use(cors({
    origin: whitelist,
    allowedHeaders: ['Content-Type']
}));

app.use('/arrendatario', arrendatrioRoute);
app.use('/propiedad', propiedadRoute);
app.use('/propietario', propietarioRoute);
app.use('/users', usersRoute);
app.use('/auth', authRoute)
app.use('/relaciones', relacionesRoute)

const main = async() => {
    try {
        relaciones();
        await sequelize.sync({force: false});
        
           
        app.listen(PORT, () => {
            console.log("App on port", PORT);
        })
    } catch (e) {
        console.log("Error" + e.message);
    }
}

main();