const pool = require('../utils/pool');

module.exports = class JobTracker {
  id;
  title;
  company;
  url;
  post_date;
  location;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.company = row.company;
    this.url = row.url;
    this.post_date = row.post_date;
    this.location = row.location;
  }

  static async selectAllJobs() {
    const { rows } = await pool.query('SELECT * FROM all_jobs');
    return rows.map((row) => new JobTracker(row));
  }

  static async selectByCompany(company) {
    const { rows } = await pool.query(
      'SELECT * FROM all_jobs WHERE all_jobs.company=$1',
      [company]
    );
    return rows.map((row) => new JobTracker(row));
  }
};
