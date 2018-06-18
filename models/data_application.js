'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('data_application', {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true 
    },
    advocacy: {
      type: DataTypes.INTEGER,
    },
    advocacy_desc: {
      type: DataTypes.STRING,
    },
    org_opt: {
      type: DataTypes.INTEGER,
    },
    org_opt_desc: {
      type: DataTypes.STRING,
    },
    use_other: {
      type: DataTypes.INTEGER,
    },
    use_other_desc: {
      type: DataTypes.STRING,
    },
    prod_srvc: {
      type: DataTypes.INTEGER,
    },
    prod_srvc_desc: {
      type: DataTypes.STRING,
    },
    research: {
      type: DataTypes.INTEGER,
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
  };

  return Model;
};

