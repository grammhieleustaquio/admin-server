const Sequelize = require("sequelize");
const db = require("../database/database");

const JeepRoute = db.define("jeeproutes", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },

  barangayId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  pointNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  routeDescription: {
    type: Sequelize.TEXT("long"),
    allowNull: false,
  },

  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = JeepRoute;
