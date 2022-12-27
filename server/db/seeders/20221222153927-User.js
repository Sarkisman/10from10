/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [{
      name: 'Ivan Ivanov',
      email: 'ivanov@mail.ru',
      password: 'fjslfjhrtowoskhskhfshfihgiohiohg',
      description: 'I love paintball',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Petr Petrov',
      email: 'petrov@mail.ru',
      password: 'fjslfjhrtowoskhskhfiohg',
      description: 'I love shooting',
      avatar: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
