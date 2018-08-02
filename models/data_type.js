'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_type', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data_type: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'data_type',
    underscored: true,
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

