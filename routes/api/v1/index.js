'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

router.get('/', (req, res) => {
  try {
    res.status(200).send();
  } catch (err) {
    handleError(err);
  }
});

module.exports = router;