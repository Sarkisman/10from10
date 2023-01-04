/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [{
      title: 'луковая стрельба',
      description: 'пострелять',
      date: null,
      club_id: 1,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'стрельба по мишеням',
      description: 'соревнования',
      date: null,
      club_id: 3,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
