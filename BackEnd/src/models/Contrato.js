import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Propietario_Propiedad = sequelize.define('Propietario_Propiedad',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    }
},{
    freezeTableName: true,
    timestamps: false,
})


