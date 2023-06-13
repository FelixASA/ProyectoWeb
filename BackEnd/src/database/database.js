import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const nombre = 'WebDB'
const user = 'root'
const pass = 'Halo1234'

export const sequelize = new Sequelize(
    nombre,
    user,
    pass,
    {
        host: 'localhost',
        port: 3307,
        dialect: 'mysql',
        dialectModule: mysql2
    }
);