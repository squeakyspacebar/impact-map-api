'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    category: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'category',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

