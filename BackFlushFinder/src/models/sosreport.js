// models/sosreport.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const SosReport = sequelize.define('SosReport', {
  SosReportID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UsuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Nombre: {
    type: DataTypes.STRING(255),
    allowNull: true  // Dependiendo de tu requerimiento esto puede ser false
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  BanoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Problema: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  RatingLimpieza: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  Papel: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  Jabon: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  Comentarios: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  FechaHora: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },

}, {
  tableName: 'sosreports',
  timestamps: false
});

export default SosReport;
