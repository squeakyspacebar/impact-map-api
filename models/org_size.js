'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('org_size', {
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

