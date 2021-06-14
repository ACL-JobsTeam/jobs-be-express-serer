const pool = require('../utils/pool');

module.exports = class NoteTracker {
  id;
  userNote;

  constructor(row) {
    this.id = row.id;
    this.userNote = row.user_note;
  }

  static async insertNote({ userNote }) {
    const { rows } = await pool.query(
      `INSERT INTO notes (user_note)
            VALUES ($1)
            RETURNING *
                `,
      [userNote]
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
};
