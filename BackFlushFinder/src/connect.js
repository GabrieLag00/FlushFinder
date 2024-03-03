import { Sequelize } from 'sequelize';

// Configuración de la conexión a la base de datos usando Sequelize
const sequelize = new Sequelize('banointeligente', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql', // Especifica el dialecto de la base de datos
    logging: false, // Desactiva el logging; activa según sea necesario para depuración
    pool: { // Configuración opcional del pool de conexiones
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Función asíncrona para probar la conexión a la base de datos
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito a la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

export default sequelize; // Exporta la instancia de Sequelize para usarla en modelos
export { connectDB }; // Exporta la función para conectar y verificar la conexión a la DB
