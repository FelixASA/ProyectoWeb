import { Arrendatario } from "./Arrendatario.js";
import { Propiedad } from "./Propiedad.js";
import { Propietario } from "./Propietario.js";
import { Contrato, Propietario_Propiedad } from "./Contrato.js";

export function relaciones(){
    //Arrendatario tiene varias propiedades
    Arrendatario.hasMany(Propiedad)
    Propiedad.belongsTo(Arrendatario)

    //Propiedades pertenecen a muchos propietarios
    Propiedad.belongsToMany(Propietario, { through: 'Propietario_Propiedad' });
    //Propietarios pe
    Propietario.belongsToMany(Propiedad, { through: 'Propietario_Propiedad' });

    Propiedad.hasMany(Propietario_Propiedad)
    Contrato.belongsTo(Propiedad)

    Propietario.hasMany(Propietario_Propiedad)
    Contrato.belongsTo(Propietario)

    
    
}
