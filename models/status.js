'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('status', {
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

