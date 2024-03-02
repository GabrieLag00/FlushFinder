import { DataTypes } from 'sequelize';
import sequelize from '../connect.js';

const Usuario = sequelize.define('Usuario', {
  usuarioID: {
    field: 'UsuarioID',
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    field: 'Nombre',
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: { // Añadido el campo Email
    field: 'Email',
    type: DataTypes.STRING(255), // Asumiendo un tamaño máximo común para emails
    allowNull: false,
    unique: true, // Asegura que el email sea único en la base de datos
    validate: { // Opcional: Sequelize permite definir validaciones básicas
      isEmail: true, // Valida que el valor sea un email válido
    }
  },
  contrasena: {
    field: 'Contrasena',
    type: DataTypes.STRING(100),
    allowNull: false
  },
  genero: {
    field: 'Genero',
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

export default Usuario;
