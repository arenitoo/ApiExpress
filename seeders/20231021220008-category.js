'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        {
          id: 'c1b8d4ae-54da-4e0e-b1b0-0a99e9474844',  // UUID para Dairy
          name: 'Dairy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'a67a5c5e-d6eb-437f-8498-32c5e646ee2e',  // UUID para Bakery
          name: 'Bakery',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
