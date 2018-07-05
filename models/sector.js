'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('sector', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    sector: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'sector',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

