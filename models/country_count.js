'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('country_count', {
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

