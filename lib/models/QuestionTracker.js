const pool = require('../utils/pool');

module.exports = class QuestionTracker {
  id;
  userQuestion;
  linkedApp;

  constructor(row) {
    this.id = row.id;
    this.userQuestion = row.user_question;
    this.linkedApp = row.linked_app;
  }

  static async insertQuestion({ userQuestion, appId }) {
    const { rows } = await pool.query(
      `INSERT INTO questions (user_question, linked_app)
            VALUES ($1, $2)
            RETURNING *
                `,
      [userQuestion, appId]
    );
    return new QuestionTracker(rows[0]);
  }

  static async deleteQuestionById(id) {
    const { rows } = await pool.query(
      `DELETE FROM questions WHERE id=$1 RETURNING *
            `,
      [id]
    );
    return new QuestionTracker(rows[0]);
  }
  static async getQuestionsById(appId) {
    const { rows } = await pool.query(`
    SELECT 
    questions.id,
	  questions.user_question,
	  questions.linked_app
    FROM questions 
    INNER JOIN job_apps
    ON questions.linked_app = job_apps.app_id
    WHERE app_id = $1 

    `, 
    [appId]
    );
    return rows.map((row) => new QuestionTracker(row));
  }
};
