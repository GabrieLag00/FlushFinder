// models/comentario.js
import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Comentario = sequelize.define('Comentario', {
  ComentarioID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UsuarioID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BanoID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Texto: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  FechaHora: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Tipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'comentarios',
  timestamps: false
});

export default Comentario;
