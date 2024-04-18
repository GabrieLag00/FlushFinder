'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
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
          model: 'usuarios', // Asegúrate de que el nombre del modelo es correcto
          key: 'UsuarioID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Nombre: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      Email: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      BanoID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'banos', // Asegúrate de que el nombre del modelo es correcto
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sosreports');
  }
};
