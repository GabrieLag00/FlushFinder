// models/edificio.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Edificio = sequelize.define('Edificio', {
  EdificioID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Disponibilidad: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'disponible' // Asume 'disponible' como valor por defecto
  }
}, {
  tableName: 'edificios',
  timestamps: false
});

export default Edificio;
