'use strict';
const models = require('../models');
const sequelize = models.sequelize;

exports.allUseCases = async function (req, res) {
  try {
    let result = await models.use_case.findAll({
      include: [
        {
          model: models.country,
          include: [
            models.region,
          ],
        },
        {
          model: models.sector,
        },
      ],
      order: [
        ['name', 'ASC'],
      ],
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};
