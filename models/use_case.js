'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('use_case', {
    profile_id: {
      type: DataTypes.INTEGER,
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
  };

  return Model;
};

