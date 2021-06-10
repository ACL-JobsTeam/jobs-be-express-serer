const pool = require('../utils/pool')


module.exports = class QuestionTracker {
    id;
    userQuestion;

    constructor(row) {
        this.id = row.id;
        this.userQuestion = row.user_question;
        
    }

    static async insertQuestion({ userQuestion }) {
        const { rows } = await pool.query(
            `INSERT INTO user_note (user_question)
            VALUES ($1)
            RETURNING *
                `,
                [userQuestion]
        );
       return new QuestionTracker(rows[0]) 
    }


}