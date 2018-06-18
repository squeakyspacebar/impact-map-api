'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('region', {
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

