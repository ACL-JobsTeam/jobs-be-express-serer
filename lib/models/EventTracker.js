const pool = require('../utils/pool');

module.exports = class EventTracker {
  id;
  eventName;
  eventDate;
  linkedApp;

  constructor(row) {
    this.id = row.id;
    this.eventName = row.event_name;
    this.eventDate = row.event_date;
    this.linkedApp = row.linked_app;
  }

  static async insertEvent({ eventName, eventDate, appId }) {
    const { rows } = await pool.query(
      `INSERT INTO events (event_name, event_date, linked_app)
            VALUES ($1, $2, $3)
            RETURNING *
                `,
      [eventName, eventDate, appId]
    );
    return new EventTracker(rows[0]);
  }

  static async deleteEventById(id) {
    const { rows } = await pool.query(
      `DELETE FROM events WHERE id=$1 RETURNING *
            `,
      [id]
    );
    return new EventTracker(rows[0]);
  }

  static async getEventsById(appId) {
    const { rows } = await pool.query(`
    SELECT 
    events.id,
	  events.event_name,
    events.event_date,
	  events.linked_app
    FROM events 
    INNER JOIN job_apps
    ON events.linked_app = job_apps.app_id
    WHERE app_id = $1 

    `, 
    [appId]
    );
    return rows.map((row) => new EventTracker(row));
  }
};
