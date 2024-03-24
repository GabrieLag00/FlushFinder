// models/conserje.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Conserje = sequelize.define('Conserje', {
  ConserjeID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Matricula: {
    type: DataTypes.STRING(10), // Cambiado a STRING para permitir matrículas que incluyan letras y números
    allowNull: false,
    unique: true // Asegura que la matrícula sea única
  },
  Contrasena: { // Asegúrate de que el nombre de campo cumpla con tu convención
    type: DataTypes.STRING(100), // Ajusta la longitud según las necesidades de seguridad
    allowNull: false
  }
}, {
  tableName: 'conserjes',
  timestamps: false
});

export default Conserje;
