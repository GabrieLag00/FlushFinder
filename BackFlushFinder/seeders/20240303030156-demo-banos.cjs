'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    // Suponiendo que tienes 10 edificios
    const numeroDeEdificios = 10;
    const banosParaAgregar = [];

    for (let edificioId = 1; edificioId <= numeroDeEdificios; edificioId++) {
      // Agregar 4 baños de hombres
      for (let i = 1; i <= 4; i++) {
        banosParaAgregar.push({
          EdificioID: edificioId,
          Genero: 'M',
          Estado: 'Disponible',
          Ubicacion: `Edificio ${edificioId} - Baño Hombres ${i}`,
          Nombre: `SanitarioH${i}`, // Agregar campo Nombre
        });
      }
      // Agregar 3 baños de mujeres
      for (let i = 1; i <= 3; i++) {
        banosParaAgregar.push({
          EdificioID: edificioId,
          Genero: 'F',
          Estado: 'Disponible',
          Ubicacion: `Edificio ${edificioId} - Baño Mujeres ${i}`,
          Nombre: `SanitarioM${i}`, // Agregar campo Nombre
        });
      }
    }

    await queryInterface.bulkInsert('banos', banosParaAgregar, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('banos', null, {});
  }
};
