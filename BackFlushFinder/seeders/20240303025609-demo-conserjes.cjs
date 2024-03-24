'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    const conserjes = [
      { Nombre: 'Conserje1', Matricula: '22393278', Contrasena: bcrypt.hashSync('Contrasena.segura28', salt) },
      { Nombre: 'Conserje2', Matricula: '22393279', Contrasena: bcrypt.hashSync('Contrasena.segura28', salt) },
      { Nombre: 'Conserje3', Matricula: '22393280', Contrasena: bcrypt.hashSync('Contrasena.segura28', salt) },
      { Nombre: 'Conserje4', Matricula: '22393281', Contrasena: bcrypt.hashSync('Contrasena.segura28', salt) },
      { Nombre: 'Conserje5', Matricula: '22393282', Contrasena: bcrypt.hashSync('Contrasena.segura28', salt) },
    ];

    await queryInterface.bulkInsert('conserjes', conserjes, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('conserjes', null, {});
  }
};