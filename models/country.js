'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('country', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
    },
    income_level_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    alpha2: {
      type: DataTypes.STRING,
    },
    alpha3: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.DOUBLE,
    },
    longitude: {
      type: DataTypes.DOUBLE,
    },
  }, {
    tableName: 'country',
    underscored: true,
    timestamps: false,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.region, {
      foreignKey: 'region_id',
    });
  };

  return Model;
};

