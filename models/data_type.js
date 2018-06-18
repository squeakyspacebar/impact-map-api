'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_type', {
    data_type: {
      type: DataTypes.STRING,
    },
    data_type_other: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'data_type',
    underscored: true,
    timestamps: false,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

