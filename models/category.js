'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('category', {
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

