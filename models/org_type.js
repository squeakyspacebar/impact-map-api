'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('org_type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'org_type',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

