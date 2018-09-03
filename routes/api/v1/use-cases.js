'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

const useCaseController = require('../../../controllers/useCaseController');

router.get('/impact-map/use-cases', useCaseController.allUseCases);

module.exports = router;
