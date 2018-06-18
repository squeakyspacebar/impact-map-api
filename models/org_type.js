'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('org_type', {
    type: {
      type: DataTypes.STRING,
    },
    other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'org_type',
    
    timestamps: false,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

