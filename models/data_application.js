'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_application', {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    advocacy: {
      type: DataTypes.BOOLEAN,
    },
    advocacy_desc: {
      type: DataTypes.STRING,
    },
    org_opt: {
      type: DataTypes.BOOLEAN,
    },
    org_opt_desc: {
      type: DataTypes.STRING,
    },
    use_other: {
      type: DataTypes.BOOLEAN,
    },
    use_other_desc: {
      type: DataTypes.STRING,
    },
    prod_srvc: {
      type: DataTypes.BOOLEAN,
    },
    prod_srvc_desc: {
      type: DataTypes.STRING,
    },
    research: {
      type: DataTypes.BOOLEAN,
    },
    research_desc: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'data_application',
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

