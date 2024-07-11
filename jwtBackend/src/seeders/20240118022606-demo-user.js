"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "JohnDoe@yahoo.com",
          password: "123",
          username: "John Doe",
        },
        {
          email: "JohnDoe@yahoo.com",
          password: "123",
          username: "John Doe1",
        },
        {
          email: "JohnDoe@yahoo.com",
          password: "123",
          username: "John Doe2",
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
