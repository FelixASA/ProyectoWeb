import { Arrendatario } from "./Arrendatario.js";
import { Propiedad } from "./Propiedad.js";
import { Propietario } from "./Propietario.js";
import { Propietario_Propiedad } from "./Contrato.js";
import { Users } from "./Users.js";

export function relaciones(){
    //Arrendatario tiene varias propiedades
    Arrendatario.hasMany(Propiedad)
    Propiedad.belongsTo(Arrendatario)

    //Propiedades pertenecen a muchos propietarios
    Propiedad.belongsToMany(Propietario, { through: 'Propietario_Propiedad' });
    //Propietarios pe
    Propietario.belongsToMany(Propiedad, { through: 'Propietario_Propiedad' });

    Propietario_Propiedad.belongsTo(Propiedad)
    Propietario.hasMany(Propietario_Propiedad)
    
    Propietario_Propiedad.belongsTo(Propietario)
    Propiedad.hasMany(Propietario_Propiedad)
    
    
    
}
