'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('profile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    location_id: {
      type: DataTypes.INTEGER,
    },
    sector_id: {
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
    org_profile_source: {
      type: DataTypes.STRING,
    },
    org_profile_year: {
      type: DataTypes.INTEGER,
    },
    org_year_founded: {
      type: DataTypes.INTEGER,
    },
    org_url: {
      type: DataTypes.STRING,
    },
    machine_readable: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  }, {
    tableName: 'profile',
    underscored: true,
    timestamps: true,
  });

  Model.associate = (models) => {
    Model.belongsTo(models.location, {
      foreignKey: 'location_id',
    });
    Model.belongsTo(models.sector, {
      foreignKey: 'sector_id',
    });
    Model.belongsTo(models.org_size, {
      foreignKey: 'org_size_id',
    });
    Model.belongsTo(models.org_type, {
      foreignKey: 'org_type_id',
    });
    Model.belongsTo(models.status, {
      foreignKey: 'status_id',
    });
    Model.belongsTo(models.category, {
      foreignKey: 'category_id',
    });
    Model.belongsTo(models.country_count, {
      foreignKey: 'country_count_id',
    });
  };

  return Model;
};

