/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Event_Users', [{
      event_id: 9,
      user_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      event_id: 9,
      user_id: 7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      event_id: 9,
      user_id: 13,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      event_id: 9,
      user_id: 12,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      event_id: 9,
      user_id: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Event_Users', null, {});
  },
};
