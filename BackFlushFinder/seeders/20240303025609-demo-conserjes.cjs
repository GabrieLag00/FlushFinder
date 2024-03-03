'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('conserjes', [
      { Nombre: 'Conserje1', Matricula: '1234' },
      { Nombre: 'Conserje2', Matricula: '1234' },
      { Nombre: 'Conserje3', Matricula: '1234' },
      { Nombre: 'Conserje4', Matricula: '1234' },
      { Nombre: 'Conserje5', Matricula: '1234' },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('conserjes', null, {});
  }
};
