'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sosreports', {
      SosReportID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      UsuarioID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'UsuarioID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      BanoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banos',
          key: 'BanoID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Problema: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      RatingLimpieza: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Papel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      Jabon: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      Comentarios: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      FechaHora: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      // Puedes añadir más campos si lo necesitas
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sosreports');
  }
};
