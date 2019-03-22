'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    served: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING
    },
    dateStart: {
      type: DataTypes.DATE
    },
    dateEnd: {
      type: DataTypes.DATE
    }
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};