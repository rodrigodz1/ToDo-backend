'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        field: "id",
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        field: "user_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        field: "name",
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        field: "description",
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        field: "created_at",
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: "updated_at",
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('tasks');
  }
};
