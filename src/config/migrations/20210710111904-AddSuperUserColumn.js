'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     return queryInterface.addColumn('users', 'is_superuser', {
        type: Sequelize.BOOLEAN,
        field: "is_superuser",
        allowNull: true,
     })
  },

  down: async (queryInterface, Sequelize) => {
    
     return queryInterface.removeColumn('users', 'is_superuser');
  }
};
