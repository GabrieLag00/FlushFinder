'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      UsuarioID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Email: { // Añadir la definición del campo Email
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Asegurar que el email sea único
        validate: {
          isEmail: true, // Esta validación es más una guía, Sequelize no aplicará esta validación en la migración
        }
      },
      Contrasena: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Genero: {
        type: Sequelize.ENUM('M', 'F'),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
