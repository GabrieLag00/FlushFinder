'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const baños = [];
    const edificios = 10; 
    
    for(let i = 1; i <= edificios; i++) {
      // Baños de hombres
      for(let j = 1; j <= 7; j++) {
        baños.push({
          EdificioID: i,
          Genero: 'M', 
          Estado: 'Disponible',
          Ubicacion: `Edificio ${i} - Baño Hombres ${j}` 
        });
      }
      
      // Baños de mujeres
      for(let j = 1; j <= 7; j++) {
        baños.push({
          EdificioID: i,
          Genero: 'F',
          Estado: 'Disponible', 
          Ubicacion: `Edificio ${i} - Baño Mujeres ${j}` 
        });
      }
    }
    
    await queryInterface.bulkInsert('banos', baños, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('banos', null, {});
  }
};



