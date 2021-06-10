const pool = require('../utils/pool')


module.exports = class Notepad {
    id;
    userNote;

    constructor(row) {
        this.id = row.id;
        this.userNote = row.user_note
    }

    static async insertNote({ userNote }) {
        const { rows } = await pool.query(
            `INSERT INTO user_note (user_note)
            VALUES ($1)
            RETURNING *
                `,
                [userNote]
        );
       return new Notepad(rows[0]) 
    }


}