'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('profile', {
    location_id: {
      type: DataTypes.INTEGER,
    },
    industry_id: {
      type: DataTypes.INTEGER,
    },
    org_size_id: {
      type: DataTypes.INTEGER,
    },
    org_type_id: {
      type: DataTypes.INTEGER,
    },
    status_id: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER,
    },
    country_count_id: {
      type: DataTypes.INTEGER,
    },
    org_confidence: {
      type: DataTypes.INTEGER,
    },
    no_org_url: {
      type: DataTypes.INTEGER,
    },
    org_additional: {
      type: DataTypes.STRING,
    },
    org_description: {
      type: DataTypes.STRING,
    },
    org_greatest_impact: {
      type: DataTypes.STRING,
    },
    org_greatest_impact_detail: {
      type: DataTypes.STRING,
    },
    org_name: {
      type: DataTypes.STRING,
    },
    org_profile_src: {
      type: DataTypes.STRING,
    },
    org_profile_status: {
      type: DataTypes.STRING,
    },
    org_url: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    machine_readable: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'profile',
    underscored: true,
    
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

