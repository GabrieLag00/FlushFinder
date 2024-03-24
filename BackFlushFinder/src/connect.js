import { Sequelize } from 'sequelize';
import '../envConfig.js';
import dotenv from 'dotenv';
dotenv.config();



// Carga las variables de entorno desde el archivo .env
dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_DATABASE, // Nombre de la base de datos
    process.env.DB_USERNAME, // Usuario
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST, // Host de la base de datos
        port: process.env.DB_PORT, // Puerto
        dialect: 'mysql', // Especifica el dialecto de la base de datos
        logging: false, // Desactiva el logging
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito a la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

export default sequelize;
export { connectDB };
