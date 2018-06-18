'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('location', {
    country_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    subnational_division: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
  }, {
    tableName: 'location',
    underscored: true,
    timestamps: false,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

