'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('use_case', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    profile_id: {
      type: DataTypes.INTEGER,
    },
    country_id: {
      type: DataTypes.INTEGER,
    },
    sector_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    },
    short_description: {
      type: DataTypes.STRING,
    },
    long_description: {
      type: DataTypes.STRING,
    },
    impact: {
      type: DataTypes.STRING,
    },
    data_used: {
      type: DataTypes.STRING,
    },
    machine_readable: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'use_case',
    underscored: true,
    timestamps: true,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.profile, {
      foreignKey: 'profile_id',
    });
    Model.belongsTo(models.country, {
      foreignKey: 'country_id',
    });
    Model.belongsTo(models.sector, {
      foreignKey: 'sector_id',
    });
  };

  return Model;
};

