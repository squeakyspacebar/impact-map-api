'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('income_level', {
    income_level: {
      type: DataTypes.STRING,
    },
    abbreviation: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'income_level',
    underscored: true,
    timestamps: false,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

