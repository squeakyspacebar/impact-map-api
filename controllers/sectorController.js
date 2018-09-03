'use strict';
const models = require('../models');
const sequelize = models.sequelize;

async function getOrgAgeGroupCount (parameters) {
  const sector = parameters.sector || null;
  const minAge = parameters.minAge || null;
  const maxAge = parameters.maxAge || null;

  let sql = 'SELECT COUNT(DISTINCT org_name) AS count ' +
    'FROM profile AS p, ' +
    'sector AS s, ' +
    'status AS st ' +
    'WHERE p.sector_id = s.id ' +
    'AND p.status_id = st.id ' +
    'AND s.sector = :sector ' +
    'AND st.status = "publish" ';

  if (minAge) {
    sql += 'AND p.org_year_founded <= YEAR(CURDATE()) - :minAge ';
  }

  if (maxAge) {
    sql += 'AND p.org_year_founded >= YEAR(CURDATE()) - :maxAge ';
  }

  let result = await sequelize.query(sql, {
    replacements: {
      'sector': sector,
      'minAge': minAge,
      'maxAge': maxAge,
    },
    type: sequelize.QueryTypes.SELECT,
    raw: true,
  });

  if (result[0]) {
    result = result[0]['count'];
  }

  return result;
}

exports.totalOrganizationCount = async function (req, res) {
  try {
    const sql = 'SELECT ' +
      'sector.sector AS sector, ' +
      '(' +
      'SELECT COUNT(DISTINCT org_name) ' +
      'FROM ' +
      'profile AS p, ' +
      'sector AS s, ' +
      'status AS st ' +
      'WHERE p.status_id = st.id ' +
      'AND p.sector_id = s.id ' +
      'AND s.sector = sector.sector ' +
      'AND st.status = "publish" ' +
      ') AS organization_count ' +
      'FROM sector ' +
      'GROUP BY sector.sector';

    let result = await sequelize.query(sql, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.organizationCount = async function (req, res) {
  try {
    let sector = req.params.sector;

    const sql = 'SELECT ' +
      'COUNT(DISTINCT org_name) AS organization_count ' +
      'FROM ' +
      'profile AS p, ' +
      'sector AS i, ' +
      'status AS st ' +
      'WHERE p.status_id = st.id ' +
      'AND p.sector_id = i.id ' +
      'AND i.sector = :sector ' +
      'AND st.status = "publish"';

    let result = await sequelize.query(sql, {
      replacements: {
        'sector': sector,
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

exports.dataTypes = async function (req, res) {
  try {
    let sector = req.params.sector;

    let sql = 'SELECT ' +
      'DISTINCT data_type, ' +
      '( ' +
      'SELECT COUNT(DISTINCT(ds.profile_id)) ' +
      'FROM ' +
      'data_source AS ds, ' +
      'data_type AS dt, ' +
      'profile AS p, ' +
      'sector AS s, ' +
      'status AS st ' +
      'WHERE ds.profile_id = p.id ' +
      'AND ds.data_type_id = dt.id ' +
      'AND p.sector_id = s.id ' +
      'AND s.sector = :sector ' +
      'AND dt.data_type = data_type.data_type ' +
      'AND st.status = "publish" ' +
      ') AS organization_count ' +
      'FROM data_type';

    let result = await sequelize.query(sql, {
      replacements: {
        'sector': sector,
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
    const sector = req.params.sector;

    let sql = 'SELECT ' +
      'type AS organization_type, ' + 
      '( ' + 
      'SELECT COUNT(p.org_name) ' + 
      'FROM ' + 
      'profile AS p, ' + 
      'org_type AS ot, ' + 
      'sector AS s, ' + 
      'status AS st ' + 
      'WHERE p.sector_id = s.id ' + 
      'AND p.status_id = st.id ' + 
      'AND p.org_type_id = ot.id ' + 
      'AND s.sector = :sector ' + 
      'AND ot.type = org_type.type ' + 
      'AND st.status = "publish" ' + 
      ') AS organization_count ' + 
      'FROM org_type ' + 
      'GROUP BY org_type.type';

    let result = await sequelize.query(sql, {
      replacements: {
        'sector': sector,
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
    const sector = req.params.sector;

    let sql = 'SELECT ' +
      'COALESCE(size, "N/A") AS organization_size, ' +
      'COUNT(*) AS organization_count ' +
      'FROM profile AS p ' +
      'JOIN sector AS s ' +
      'ON p.sector_id = s.id ' +
      'JOIN status AS st ' +
      'ON p.status_id = st.id ' +
      'LEFT JOIN org_size AS os ' +
      'ON p.org_size_id = os.id ' +
      'WHERE p.sector_id IN ( ' +
      'SELECT id ' +
      'FROM sector ' +
      'WHERE sector = :sector) ' +
      'AND st.status = "publish" ' +
      'GROUP BY os.size ' +
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
      'WHEN size IS NULL ' +
      'THEN 6 ' +
      'END';

    let result = await sequelize.query(sql, {
      replacements: {
        'sector': sector,
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
    const sector = req.params.sector;

    let results = [];

    let queryParams = [
      {
        sector: sector,
        maxAge: 3,
      },
      {
        sector: sector,
        minAge: 4,
        maxAge: 10,
      },
      {
        sector: sector,
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

exports.organizationApplications = async function (req, res) {
  try {
    const sector = req.params.sector;

    let sql = 'SELECT ' +
      'SUM(da.research) AS research, ' +
      'SUM(da.prod_srvc) AS prod_srvc, ' +
      'SUM(da.org_opt) AS org_opt, ' +
      'SUM(da.advocacy) AS advocacy ' +
      'FROM ' +
      'profile AS p, ' +
      'data_application AS da, ' +
      'sector AS s, ' +
      'status AS st ' +
      'WHERE da.profile_id = p.id ' +
      'AND p.sector_id = s.id ' +
      'AND p.status_id = st.id ' +
      'AND s.sector = :sector ' +
      'AND st.status = "publish"';

    let result = await sequelize.query(sql, {
      replacements: {
        'sector': sector,
      },
      type: sequelize.QueryTypes.SELECT,
      raw: true,
    });

    let applicationCounts = [
      {
        'application': 'Research',
        'organization_count': parseInt(result[0]['research']),
      },
      {
        'application': 'Development of Products/Services',
        'organization_count': parseInt(result[0]['prod_srvc']),
      },
      {
        'application': 'Organizational Optimization',
        'organization_count': parseInt(result[0]['org_opt']),
      },
      {
        'application': 'Advocacy',
        'organization_count': parseInt(result[0]['advocacy']),
      }
    ];

    res.send(applicationCounts);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};

exports.useCases = async function (req, res) {
  const sector = req.params.sector;

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
      where: {
        '$sector.sector$': sector,
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
