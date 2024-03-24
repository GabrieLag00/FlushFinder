// models/bano.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Bano = sequelize.define('Bano', {
  BanoID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  EdificioID: {
    type: DataTypes.INTEGER
  },
  Genero: {
    type: DataTypes.ENUM('M', 'F', 'Unisex'),
    allowNull: false
  },
  Estado: {
    type: DataTypes.ENUM('Disponible', 'En mantenimiento', 'No disponible'),
    allowNull: false
  },
  Ubicacion: {
    type: DataTypes.STRING(100)
  },
  Nombre: { // Nuevo campo agregado
    type: DataTypes.STRING(50), // Asumiendo que quieres un STRING de hasta 50 caracteres
    allowNull: true // O false si deseas que sea obligatorio
  }
}, {
  tableName: 'banos',
  timestamps: false
});

export default Bano;
