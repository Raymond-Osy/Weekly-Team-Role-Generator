"use strict";

process.env.NODE_ENV = "production";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Teams",
      [
        {
          firstName: "Sanusi",
          lastName: "Sulaiman",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          firstName: "Chike",
          lastName: "Ozulumba",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: "Martins",
          lastName: "Aloba",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: "Raymond",
          lastName: "Akalonu",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: "Oluwaseyi",
          lastName: "Adebajo",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: "Tolulope",
          lastName: "Olaniyan",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        },

        {
          firstName: "Micah",
          lastName: "Akpan",
          served: false,
          active: false,
          role: "",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teams", null, {});
  }
};
