'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('books', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV4
      },
      title: {
        type: Sequelize.STRING
      },
      isbn: {
        type: Sequelize.STRING
      },
      openLibraryId: {
        type: Sequelize.STRING
      },
      openLibraryBookUrl: {
        type: Sequelize.STRING
      },
      openLibraryCoverId: {
        type: Sequelize.STRING
      },
      numPages: {
        type: Sequelize.NUMBER
      },
      pubDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('books');
  }
};