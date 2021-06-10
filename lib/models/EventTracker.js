const pool = require('../utils/pool')


module.exports = class EventTracker {
    id;
    eventName;
    eventDate;

    constructor(row) {
        this.id = row.id;
        this.eventName = row.event_name;
        this.eventDate = row.event_date;
    }

    static async insertEvent({ eventName, eventDate }) {
        const { rows } = await pool.query(
            `INSERT INTO events (event_name, event_date)
            VALUES ($1, $2)
            RETURNING *
                `,
                [eventName, eventDate]
        );
       return new EventTracker(rows[0]) 
    }


}