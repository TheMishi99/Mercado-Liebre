"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "products",
      [
        {
          id: 1,
          image: "/images/products/img-cafetera-moulinex.jpg",
          name: "Cafetera Moulinex",
          altName: "Cafetera",
          price: "6.770",
        },
        {
          id: 2,
          image: "/images/products/img-macbook-pro-2019.jpg",
          name: "MacBook Pro 2019",
          altName: "MacBook",
          price: "230.000",
        },
        {
          id: 3,
          image: "/images/products/img-samsung-galaxy-s10.jpg",
          name: "Samsung Galaxy S10",
          altName: "Samsung S10",
          price: "70.500",
        },
        {
          id: 4,
          image: "/images/products/img-tv-samsung-smart.jpg",
          name: "SmartTv Samsung 43",
          altName: "SmartTv 43",
          price: "23.200",
        },
      ],
      {}
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
