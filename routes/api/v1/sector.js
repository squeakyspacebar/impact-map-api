'use strict';
const express = require('express');
const router = express.Router();
const models = require('../../../models');
const sequelize = models.sequelize;

router.get('/sectors/organization-count');

router.get('/organization-count/sectors', (req, res) => {
  try {
    const sector = req.query.sector;

    const sql = 'SELECT ' +
      'sector.sector AS sector, ' +
      '(' +
      'SELECT COUNT(distinct(org_name)) ' +
      'FROM ' +
      'profile AS p, ' +
      'location AS l, ' +
      'country AS c, ' +
      'sector AS s, ' +
      'status AS st ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND p.sector_id = s.id ' +
      'AND p.status_id = st.id ' +
      'AND s.sector = sector.sector ' +
      'AND st.status = "publish" ' +
      ') AS organization_count ' +
      'FROM sector ' +
      'GROUP BY sector.id';

    sequelize
      .query(sql, { type: sequelize.QueryTypes.SELECT })
      .then((rows) => {
        res.send(rows);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
