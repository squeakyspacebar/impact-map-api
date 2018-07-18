'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

const regionController = require('../../../controllers/regionController');

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

module.exports = router;
