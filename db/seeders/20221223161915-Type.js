/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [{
      club_type: 'Пулевая стрельба',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      club_type: 'Практическая стрельба',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      club_type: 'Стрельба из лука',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      club_type: 'Стендовая стрельба',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      club_type: 'Пейнтбол',
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_type: 'Пулевая стрельба для детей',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  },
};
