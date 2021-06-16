const pool = require('../utils/pool');

module.exports = class NoteTracker {
  id;
  userNote;
  linkedApp;

  constructor(row) {
    this.id = row.id;
    this.userNote = row.user_note;
    this.linkedApp = row.linkedApp;
  }

  static async insertNote({ userNote, appId }) {
    const { rows } = await pool.query(
      `INSERT INTO notes (user_note, linked_app)
            VALUES ($1, $2)
            RETURNING *
                `,
      [userNote, appId]
    );
    return new NoteTracker(rows[0]);
  }

  static async deleteNoteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM notes WHERE id=$1 RETURNING *
            `,
      [id]
    );
    return new NoteTracker(rows[0]);
  }

  static async getNotesById(appId) {
    const { rows } = await pool.query(`
    SELECT 
    notes.id,
	  notes.user_note,
	  notes.linked_app
    FROM notes 
    INNER JOIN job_apps
    ON notes.linked_app = job_apps.app_id
    WHERE app_id = $1 

    `, 
    [appId]
    );
    return rows.map((row) => new NoteTracker(row));
  }
};
