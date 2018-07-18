'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

const sectorController = require('../../../controllers/sectorController');

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
