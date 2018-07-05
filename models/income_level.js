'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('income_level', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    income_level: {
      type: DataTypes.STRING,
    },
    abbreviation: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'income_level',
    underscored: true,
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

