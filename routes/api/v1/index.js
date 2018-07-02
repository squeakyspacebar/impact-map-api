'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

const regionController = require('../../../controllers/regionController');
const sectorController = require('../../../controllers/sectorController');

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

router.get('/use-cases/', async (req, res) => {
  try {
    let result = await models.use_case.findAll({
      include: [
        {
          model: models.country,
          include: [
            models.region,
          ],
        },
        models.sector,
      ],
      order: [
        ['name', 'ASC'],
      ],
    })

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get('/regions/total-organizations',
  regionController.totalOrganizationCount);

router.get('/region/:region/total-organizations',
  regionController.regionOrganizationCount);

router.get('/region/:region/country-organization-count/',
  regionController.countryOrganizationCounts);

router.get('/region/:region/organization-types/',
  regionController.organizationTypes);

router.get('/region/:region/organization-sizes/',
  regionController.organizationSizes);

router.get('/region/:region/organization-ages/',
  regionController.organizationAges);

router.get('/region/:region/organization-sectors/',
  regionController.sectorOrganizationCounts);

router.get('/region/:region/use-cases',
  regionController.useCases);

router.get('/sectors/total-organizations',
  sectorController.totalOrganizationCount);

router.get('/sector/:sector/total-organizations',
  sectorController.organizationCount);

router.get('/sector/:sector/data-types',
  sectorController.dataTypes);

router.get('/sector/:sector/organization-types',
  sectorController.organizationTypes);

router.get('/sector/:sector/organization-sizes',
  sectorController.organizationSizes);

router.get('/sector/:sector/organization-ages',
  sectorController.organizationAges);

router.get('/sector/:sector/organization-applications',
  sectorController.organizationApplications);

router.get('/sector/:sector/use-cases',
  sectorController.useCases);

module.exports = router;
