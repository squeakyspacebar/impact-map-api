'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    profile_id: {
      type: DataTypes.INTEGER,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'contact',
    underscored: true,
    timestamps: false,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.profile, {
      foreignKey: 'profile_id',
    });
  };

  return Model;
};

