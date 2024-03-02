'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('edificios', [
      { Nombre: 'Edificio A', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio B', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio C', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio D', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio E', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio F', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio G', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio H', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio K', Disponibilidad: 'disponible' },
      { Nombre: 'Edificio M', Disponibilidad: 'disponible' },
      // Añade más edificios según sea necesario...
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('edificios', null, {});
  }
};
