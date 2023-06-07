import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Propiedad = sequelize.define('Propiedad',{
    //atributos
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    clave_catastral:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,   
    }
},{
    freezeTableName: true,
    timestamps: false,
})



// Propiedad.belongsToMany(Propietario, { through: 'Contrato' });
// Propietario.belongsToMany(Propiedad, { through: 'Contrato' });
// Propiedad.hasMany(Contrato)
// Propietario.hasMany(Contrato)