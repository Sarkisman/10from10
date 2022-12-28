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
      title: 'paintball',
      description: 'to play',
      date: null,
      club_id: 1,
      num_of_members: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'pdfdsfsf',
      description: 'to play',
      date: null,
      club_id: 2,
      num_of_members: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
