'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('country_count', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    count: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'country_count',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

