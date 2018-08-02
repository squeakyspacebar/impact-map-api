'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('org_size', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'org_size',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

