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
  }
}, {
  tableName: 'conserjes',
  timestamps: false
});

export default Conserje;
