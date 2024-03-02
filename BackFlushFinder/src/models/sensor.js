// models/sensor.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Sensor = sequelize.define('Sensor', {
  SensorID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  BanoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Tipo: {
    type: DataTypes.ENUM('Papel', 'Jabon', 'Disponibilidad'),
    allowNull: false
  },
  Valor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  FechaHoraUltimaMedicion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'sensores',
  timestamps: false
});

export default Sensor;
