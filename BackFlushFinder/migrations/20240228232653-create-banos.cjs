'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('banos', {
      BanoID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      EdificioID: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'edificios', // nombre de la tabla de referencia
          key: 'EdificioID', // llave de la tabla de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      Genero: {
        type: Sequelize.ENUM('M', 'F', 'Unisex'),
        allowNull: false
      },
      Estado: {
        type: Sequelize.ENUM('Disponible', 'En mantenimiento', 'No disponible'),
        allowNull: false
      },
      Ubicacion: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      Nombre: {
        type: Sequelize.STRING(50), // Define el tipo de dato y la longitud máxima
        allowNull: false, // Indica que el campo no puede ser nulo
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('banos');
  }
};