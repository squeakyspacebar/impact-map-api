'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_source', {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
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
  };

  return Model;
};

