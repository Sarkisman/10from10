/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Clubs', [{
      name: 'МГССК ДОСААФ России',
      email: 'mgssk@mail.ru',
      avatar: '',
      description: 'Стрелково-спортивные секции пулевой стрельбы для всех возрастов. Пневматика, лук и арбалет. Обучение безопасному обращению с оружием для граждан. Курсы обучения и профессиональной подготовки частных охранников и повышение квалификации. Отдельные курсы для руководителей стрелковых объектов, для инструкторов а также курсы по практической стрельбе.',
      address: 'Poklonnaya Ulitsa, 11, стр.1А, Moscow, 121170',
      user_id: 1,
      latitude: 55.87520963706954,
      longitude: 37.34728103439325,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      name: 'Центр Практической Стрельбы',
      email: 'cps@gmail.ru',
      avatar: '',
      description: 'Пневматика, лук и арбалет. Обучение безопасному обращению с оружием для граждан. Курсы обучения и профессиональной подготовки частных охранников и повышение квалификации. Отдельные курсы для руководителей стрелковых объектов, для инструкторов а также курсы по практической стрельбе.',
      address: 'Poklonnaya Ulitsa, 11, стр.1А, Moscow, 121170',
      user_id: 2,
      latitude: 55.86993940686203,
      longitude: 37.26018024444998,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Clubs', null, {});
  },
};
