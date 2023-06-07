import express from "express";
import userRoute from "./src/routes/arrendatrioRoute.js"
import { sequelize } from "./src/database/database.js";
import { relaciones } from "./src/models/Relaciones.js";


const app = express();
const PORT = 4000

app.use(express.json());

app.use('/arrendatarios', userRoute);

const main = async() => {
    try {
        relaciones();
        await sequelize.sync({force: true});
        
           
        app.listen(PORT, () => {
            console.log("App on port", PORT);
        })
    } catch (e) {
        console.log("Error" + e.message);
    }
}

main();