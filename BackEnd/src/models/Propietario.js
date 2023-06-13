import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Propietario = sequelize.define('Propietario',{
    //atributos
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    RFC:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    Apellido:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    freezeTableName: true,
    timestamps: false,
})

//Propietario.hasMany(Contrato)


