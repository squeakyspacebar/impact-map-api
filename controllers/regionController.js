'use strict';
const models = require('../models');
const sequelize = models.sequelize;

async function getOrgAgeGroupCount (parameters) {
  const region = parameters.region || null;
  const minAge = parameters.minAge || null;
  const maxAge = parameters.maxAge || null;

  let sql = 'SELECT COUNT(DISTINCT org_name) AS count ' +
    'FROM ' +
    'profile AS p, ' +
    'location AS l, ' +
    'country AS c, ' +
    'region AS r, ' +
    'status AS s ' +
    'WHERE p.location_id = l.id ' +
    'AND l.country_id = c.id ' +
    'AND c.region_id = r.id ' +
    'AND p.status_id = s.id ' +
    'AND r.name = :region ' +
    'AND s.status = "publish" ';

  if (minAge) {
    sql += 'AND p.org_year_founded <= YEAR(CURDATE()) - :minAge ';
  }

  if (maxAge) {
    sql += 'AND p.org_year_founded >= YEAR(CURDATE()) - :maxAge ';
  }

  let result = await sequelize.query(sql, {
    replacements: {
      'region': region,
      'minAge': minAge,
      'maxAge': maxAge,
    },
    type: sequelize.QueryTypes.SELECT,
  });

  if (result[0]) {
    result = result[0]['count'];
  }

  return result;
}

exports.totalOrganizationCount = async function (req, res) {
  try {
    const sql = 'SELECT ' +
      'region.name AS region, ' +
      '(' +
      'SELECT COUNT(distinct(org_name)) ' +
      'FROM ' +
      'profile AS p, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r, ' +
      'status AS s ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND r.name = region.name ' +
      'AND s.status = "publish" ' +
      ') AS organization_count ' +
      'FROM region ' +
      'GROUP BY region.id';

    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.regionOrganizationCount = async function (req, res) {
  try {
    const region = req.params.region;

    const sql = 'SELECT ' +
      'region.name AS region, ' +
      '(' +
      'SELECT COUNT(distinct(org_name)) ' +
      'FROM ' +
      'profile AS p, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r, ' +
      'status AS s ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND r.name = :region ' +
      'AND s.status = "publish" ' +
      ') AS organization_count ' +
      'FROM region ' +
      'WHERE region.name = :region';

    let result = await sequelize.query(sql, {
      replacements: {
        'region': region,
      },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });

    res.send(result[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.countryOrganizationCounts = async function (req, res) {
  try {
    const region = req.params.region;

    const sql = 'SELECT ' +
      'country.name AS country, ' +
      'country.alpha2 AS alpha2, ' +
      '( ' +
      'SELECT COUNT(distinct(org_name)) ' +
      'FROM ' +
      'profile AS p, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r, ' +
      'status AS s ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND c.name = country.name ' +
      'AND s.status = "publish" ' +
      ') AS organization_count ' +
      'FROM country ' +
      'LEFT JOIN region ' +
      'ON country.region_id = region.id ' +
      'WHERE region.name = :region';

    let result = await sequelize.query(sql, {
      replacements: {
        'region': region,
      },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.organizationTypes = async function (req, res) {
  try {
    const region = req.params.region;

    let sql = 'SELECT ' +
      'type AS organization_type, ' +
      '( ' +
      'SELECT COUNT(p.org_name) ' +
      'FROM ' +
      'profile AS p, ' +
      'org_type AS ot, ' +
      'status AS s, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND p.org_type_id = ot.id ' +
      'AND r.name = :region ' +
      'AND ot.type = org_type.type ' +
      'AND s.status = "publish" ' +
      ') AS organization_count ' +
      'FROM org_type ' +
      'GROUP BY org_type.type';

    let result = await sequelize.query(sql, {
      replacements: {
        'region': region,
      },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.organizationSizes = async function (req, res) {
  try {
    const region = req.params.region;

    let sql = 'SELECT ' +
      'size AS organization_size, ' +
      '( ' +
      'SELECT COUNT(p.org_name) ' +
      'FROM ' +
      'profile AS p, ' +
      'org_size AS os, ' +
      'status AS s, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND p.org_size_id = os.id ' +
      'AND r.name = :region ' +
      'AND os.size = org_size.size ' +
      'AND s.status = "publish" ' +
      ') AS organization_count ' +
      'FROM org_size ' +
      'GROUP BY org_size.size ' +
      'ORDER BY ' +
      'CASE ' +
      'WHEN size = "1 to 10" ' +
      'THEN 1 ' +
      'WHEN size = "11 to 50" ' +
      'THEN 2 ' +
      'WHEN size = "51 to 200" ' +
      'THEN 3 ' +
      'WHEN size = "201 to 1000" ' +
      'THEN 4 ' +
      'WHEN size = "1000+" ' +
      'THEN 5 ' +
      'END';

    let result = await sequelize.query(sql, {
      replacements: {
        'region': region,
      },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.organizationAges = async function async (req, res) {
  try {
    const region = req.params.region;

    let results = [];

    let queryParams = [
      {
        region: region,
        maxAge: 3,
      },
      {
        region: region,
        minAge: 4,
        maxAge: 10,
      },
      {
        region: region,
        minAge: 11,
      }
    ];

    let count = null;

    count = await getOrgAgeGroupCount(queryParams[0]);
    results.push({
      'age_group': '0-3 years',
      'organization_count': count,
    });

    count = await getOrgAgeGroupCount(queryParams[1]);
    results.push({
      'age_group': '4-10 years',
      'organization_count': count,
    });

    count = await getOrgAgeGroupCount(queryParams[2]);
    results.push({
      'age_group': '10+ years',
      'organization_count': count,
    });

    res.send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.sectorOrganizationCounts = async function (req, res) {
  try {
    const region = req.params.region;

    let sql = 'SELECT ' +
      'DISTINCT sector, ' +
      '( ' +
      'SELECT COUNT(DISTINCT org_name) ' +
      'FROM ' +
      'profile AS p, ' +
      'location AS l, ' +
      'country AS c, ' +
      'region AS r, ' +
      'sector AS i, ' +
      'status AS s ' +
      'WHERE p.location_id = l.id ' +
      'AND l.country_id = c.id ' +
      'AND c.region_id = r.id ' +
      'AND p.status_id = s.id ' +
      'AND p.sector_id = i.id ' +
      'AND r.name = :region ' +
      'AND i.sector = sector.sector ' +
      ') AS organization_count ' +
      'FROM sector ';

    let result = await sequelize.query(sql, {
      replacements: {
        'region': region,
      },
      type: sequelize.QueryTypes.SELECT,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.useCases = async function (req, res) {
  const region = req.params.region;

  try {
    console.log(region);

    let result = await models.use_case.findAll({
      include: [
        {
          model: models.country,
          include: [
            {
              model: models.region,
            },
          ],
        },
        models.sector,
      ],
      where: {
        '$country->region.name$': region,
      },
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