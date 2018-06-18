'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('industry', {
    industry: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'industry',
    
    timestamps: false,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

