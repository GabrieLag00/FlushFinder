'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('edificios', {
      EdificioID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Nombre: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      Disponibilidad: {
        type: Sequelize.ENUM('disponible', 'no disponible'),
        allowNull: false,
        defaultValue: 'disponible' // Opción por defecto
      }
      // Añadir más columnas si es necesario
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('edificios');
  }
};
