'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('status', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'status',
    timestamps: false,
  });

  Model.associate = (models) => {
  };

  return Model;
};

