'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_source', {
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
    data_type_id: {
      type: DataTypes.INTEGER,
    },
    data_scope: {
      type: DataTypes.STRING,
    },
    machine_readable: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'data_source',
    underscored: true,
    timestamps: false,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.profile, {
      foreignKey: 'profile_id',
    });
    Model.belongsTo(models.country, {
      foreignKey: 'country_id',
    });
    Model.belongsTo(models.data_type, {
      foreignKey: 'data_type_id',
    });
  };

  return Model;
};

