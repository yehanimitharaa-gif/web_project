const db = require('../database');

/**
 * Helper to execute a query and return all matching rows as a Promise
 */
const queryAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

/**
 * Fetch all statistics from highestIntakes, highestApplications, and highestCuttoff tables.
 * Supports optional filtering by stream or year.
 */
const getDashboardStatsData = async (filters = {}) => {
  const { stream, year } = filters;

  let intakeQuery = `
    SELECT h.*, c.name AS courseName, c.code AS courseCode, u.name AS universityName, u.shortname AS universityShortName
    FROM highestIntakes h
    LEFT JOIN courses c ON h.courseId = c.id
    LEFT JOIN universities u ON h.uniId = u.id
  `;

  let appQuery = `
    SELECT h.*, c.name AS courseName, c.code AS courseCode, u.name AS universityName, u.shortname AS universityShortName
    FROM highestApplications h
    LEFT JOIN courses c ON h.courseId = c.id
    LEFT JOIN universities u ON h.uniId = u.id
  `;

  let cutoffQuery = `
    SELECT h.*, c.name AS courseName, c.code AS courseCode, u.name AS universityName, u.shortname AS universityShortName
    FROM highestCuttoff h
    LEFT JOIN courses c ON h.courseId = c.id
    LEFT JOIN universities u ON h.uniId = u.id
  `;

  const conditions = [];
  const params = [];

  if (stream) {
    conditions.push('LOWER(TRIM(h.stream)) = LOWER(TRIM(?))');
    params.push(stream);
  }

  if (year) {
    conditions.push('h.year = ?');
    params.push(year);
  }

  if (conditions.length > 0) {
    const whereClause = ' WHERE ' + conditions.join(' AND ');
    intakeQuery += whereClause;
    appQuery += whereClause;
    cutoffQuery += whereClause;
  }

  const [highestIntakes, highestApplications, highestCuttoff] = await Promise.all([
    queryAll(intakeQuery, params),
    queryAll(appQuery, params),
    queryAll(cutoffQuery, params),
  ]);

  return {
    highestIntakes,
    highestApplications,
    highestCuttoff,
  };
};

/**
 * Express route handler for GET request to retrieve stats of each table separately
 */
const handleGetDashboardStats = async (req, res) => {
  try {
    const stats = await getDashboardStatsData(req.query);

    res.json({
      success: true,
      highestIntakes: stats.highestIntakes,
      highestApplications: stats.highestApplications,
      highestCuttoff: stats.highestCuttoff,
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStatsData,
  handleGetDashboardStats,
};
