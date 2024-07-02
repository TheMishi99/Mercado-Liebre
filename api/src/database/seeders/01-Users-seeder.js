"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: 1,
          profileImage: "/images/img-miFoto.jpg",
          fullName: "Matias Demian Sayago",
          email: "matiasgd99@gmail.com",
          birthDate: "2003-01-19",
          address: "Pedrito 505",
          profile: "Comprador",
          userName: "mishi",
          password:
            "$2b$10$S0C/6qMkOfU/tMUwmd66V.r2ZIXo/qcOYXAZvmlqn5uMiRmCsuaWa",
          authLevel: 1,
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
