"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users_interests",
      [
        {
          id: 1,
          user_id: 1,
          interest_id: 1,
        },
        {
          id: 2,
          user_id: 1,
          interest_id: 2,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users_interests", null, {});
  },
};
