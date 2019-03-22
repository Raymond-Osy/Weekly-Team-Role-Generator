'use strict';

process.env.NODE_ENV = 'production';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Teams', [{
          firstName: 'John',
          lastName: 'Doe',
          served: false,
          active: false,
          role: 'team lead',
          createdAt: new Date(),
          updatedAt:  new Date()
        }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teams', null, {});
  }
};
