/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Club_Types', [{
      club_id: 1,
      type_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 1,
      type_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 2,
      type_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 3,
      type_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 4,
      type_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 5,
      type_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 6,
      type_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 7,
      type_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 8,
      type_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 8,
      type_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 8,
      type_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 9,
      type_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 9,
      type_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 9,
      type_id: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 10,
      type_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 11,
      type_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 12,
      type_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 12,
      type_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 13,
      type_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 13,
      type_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 14,
      type_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      club_id: 15,
      type_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Club_Types', null, {});
  },
};
