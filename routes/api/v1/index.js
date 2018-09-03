'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

router.get('/', async (req, res) => {
  res.status(200).send('OK!');
});

router.get('/impact-map/stats', async (req, res) => {
  try {
    let countryCountSQL = 'SELECT ' +
      'COUNT(DISTINCT country.name) AS count ' +
      'FROM profile ' +
      'LEFT JOIN location ' +
      'ON profile.location_id = location.id ' +
      'LEFT JOIN country ' +
      'ON location.country_id = country.id ' +
      'LEFT JOIN status ' +
      'ON profile.status_id = status.id ' +
      'WHERE status.status = "publish"';

    let countryCount = await sequelize.query(countryCountSQL, {
      type: sequelize.QueryTypes.SELECT,
    });

    let organizationCountSQL = 'SELECT ' +
      'COUNT(DISTINCT profile.org_name) AS count ' +
      'FROM profile ' +
      'LEFT JOIN status ' +
      'ON profile.status_id = status.id ' +
      'WHERE status.status = "publish"';

    let organizationCount = await sequelize.query(organizationCountSQL, {
      type: sequelize.QueryTypes.SELECT,
    });

    let result = {
      country_count: countryCount[0]['count'],
      organization_count: organizationCount[0]['count'],
    };

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
