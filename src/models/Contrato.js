import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Contrato = sequelize.define('Contrato',{
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


