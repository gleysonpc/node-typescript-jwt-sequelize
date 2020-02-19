import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()


export const database = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true
    }
})



