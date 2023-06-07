import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Arrendatario = sequelize.define('Arrendatario',{
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

//Arendatario tiene muchas propiedades
// Arrendatario.hasMany(Propiedad)
// Propiedad.belongsTo(Arrendatario)