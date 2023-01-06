/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [{
      title: 'луковая стрельба',
      description: 'пострелять',
      date: '2022-04-17',
      club_id: 1,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'стрельба по мишеням',
      description: 'соревнования',
      date: '2022-02-17',
      club_id: 1,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'стрельбища',
      description: 'соревнования',
      date: '2022-02-17',
      club_id: 2,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
