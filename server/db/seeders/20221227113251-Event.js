/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Events', [{
      title: 'Стрельба из лука',
      description: 'Соревнования по стрельбе из лука',
      date: '2022-12-22',
      time: '10:00',
      club_id: 1,
      num_of_members: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Практическая стрельба',
      description: 'Соревнования по практической стрельбе с участием спортсменов зарубежных стран',
      date: '2023-01-17',
      time: '10:00',
      club_id: 1,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Практическая стрельба',
      description: 'Соревнования по практической стрельбе',
      date: '2023-02-17',
      time: '10:00',
      club_id: 2,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Стрельба из лука',
      description: 'соревнования по стрельбе из лука "Малахитовые стрелы"',
      date: '2022-11-17',
      time: '10:00',
      club_id: 3,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пейнтбол',
      description: 'Пейнтбол для всех. Турнир от десяти игроков',
      date: '2022-10-17',
      time: '10:00',
      club_id: 4,
      num_of_members: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пейнтбол',
      description: 'Пейнтбол для детей. Турнир от 10 игроков',
      date: '2023-02-19',
      time: '10:00',
      club_id: 5,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Турнир по пейнтболу',
      description: 'Пейнтбол для всех',
      date: '2023-04-10',
      time: '10:00',
      club_id: 6,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Турнир по пейнтболу',
      description: 'Пейнтбол для детей. Турнир от 10 игроков',
      date: '2022-02-17',
      time: '10:00',
      club_id: 6,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Стрельба из лука',
      description: 'Стрельба из лука. Турнир от 10 игроков',
      date: '2022-09-20',
      time: '10:00',
      club_id: 8,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пулевая стрельба',
      description: 'Пулевая стрельба по мишеням',
      date: '2023-03-14',
      time: '10:00',
      club_id: 8,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пулевая стрельба для детей',
      description: 'Пулевая стрельба для детей от 10 лет',
      date: '2022-12-15',
      time: '10:00',
      club_id: 8,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пулевая стрельба для детей',
      description: 'Пулевая стрельба для детей от 10 лет',
      date: '2023-01-14',
      time: '10:00',
      club_id: 9,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Пулевая стрельба',
      description: 'Пулевая стрельба для взрослых',
      date: '2022-02-18',
      time: '10:00',
      club_id: 9,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Стрельба из лука',
      description: 'Турнир по стрельбе из лука',
      date: '2023-04-11',
      time: '10:00',
      club_id: 9,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Практическая стрельба',
      description: 'Соревновани по практическая стрельбе',
      date: '2022-10-19',
      time: '10:00',
      club_id: 10,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Практическая стрельба',
      description: 'Турнир по практической стрельбе от 10 человек',
      date: '2022-04-05',
      time: '10:00',
      club_id: 11,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Практическая стрельба',
      description: 'Практическая стрельба с участие спортсменов из зарубежных стран',
      date: '2023-02-05',
      time: '10:00',
      club_id: 12,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: 'Стрельба из лука по мишеням',
      description: 'Соревнования по стрельбе из лука',
      date: '2022-12-07',
      time: '10:00',
      club_id: 13,
      num_of_members: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Events', null, {});
  },
};
