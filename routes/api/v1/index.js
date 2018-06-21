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

router.get('/use-cases/', (req, res) => {
  try {
    models.use_case.findAll({
      include: [
        {
          model: models.profile,
          include: [
            {
              model: models.location,
              include: [
                {
                  model: models.country,
                  include: [
                    models.region,
                  ],
                },
              ],
            },
            models.status,
            models.industry,
          ],
        }
      ],
      order: [
        [models.profile, 'org_name', 'ASC'],
      ],
    }).then((values) => {
      res.send(values);
    });
  } catch (err) {
    handleError(err);
  }
});

module.exports = router;