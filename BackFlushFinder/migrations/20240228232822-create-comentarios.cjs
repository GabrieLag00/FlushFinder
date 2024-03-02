'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comentarios', {
      ComentarioID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      UsuarioID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // nombre de la tabla de referencia
          key: 'UsuarioID', // llave de la tabla de referencia
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      Texto: {
        type: Sequelize.STRING(500),
        allowNull: false
      },
      FechaHora: {
        type: Sequelize.DATE,
        allowNull: false
      },
      Tipo: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('comentarios');
  }
};
