'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sensores', {
      SensorID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      BanoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banos', // nombre de la tabla de referencia
          key: 'BanoID', // llave de la tabla de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Tipo: {
        type: Sequelize.ENUM('Papel', 'Jabon', 'Disponibilidad'),
        allowNull: false
      },
      Valor: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      FechaHoraUltimaMedicion: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sensores');
  }
};
