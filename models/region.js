'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('region', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    abbreviation: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'region',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

