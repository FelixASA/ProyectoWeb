import { Arrendatario } from "./Arrendatario.js";
import { Propiedad } from "./Propiedad.js";
import { Propietario } from "./Propietario.js";
import { Contrato } from "./Contrato.js";

export function relaciones(){
    //Arrendatario tiene varias propiedades
    Arrendatario.hasMany(Propiedad)
    Propiedad.belongsTo(Arrendatario)

    //Propiedades pertenecen a muchos propietarios
    Propiedad.belongsToMany(Propietario, { through: 'Contrato' });
    //Propietarios 
    Propietario.belongsToMany(Propiedad, { through: 'Contrato' });

    Propiedad.hasMany(Contrato)
    Contrato.belongsTo(Propiedad)

    Propietario.hasMany(Contrato)
    Contrato.belongsTo(Propietario)

    
    
}
