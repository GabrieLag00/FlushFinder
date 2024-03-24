'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('conserjes', {
      ConserjeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Matricula: {
        type: Sequelize.STRING(10), // Cambiado a STRING para permitir matrículas con formatos variados
        allowNull: false,
        unique: true // Asegura que la matrícula sea única
      },
      Contrasena: { // Asegúrate de que el nombre de campo cumpla con tu convención (puede ser `Contrasena` o `Password`, etc.)
        type: Sequelize.STRING(100), // Ajusta la longitud según las necesidades de seguridad
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('conserjes');
  }
};

