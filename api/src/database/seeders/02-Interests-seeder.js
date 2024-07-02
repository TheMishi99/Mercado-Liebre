"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "interests",
      [
        {
          id: 1,
          name: "Electro",
        },
        {
          id: 2,
          name: "Moda",
        },
        {
          id: 3,
          name: "Hogar",
        },
        {
          id: 4,
          name: "Jugueteria",
        },
        {
          id: 5,
          name: "Vida Sana",
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("interests", null, {});
  },
};
