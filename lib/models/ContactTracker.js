const pool = require('../utils/pool');

module.exports = class ContactTracker {
  id;
  companyContact;
  linkedApp;
  
  constructor(row) {
    this.id = row.id;
    this.companyContact = row.company_contact;
    this.linkedApp = row.linked_app;
    
  }

  static async insertContact({ companyContact, appId }) {
    const { rows } = await pool.query(
      `INSERT INTO contacts (company_contact, linked_app)
            VALUES ($1, $2)
            RETURNING *
                `,
      [companyContact, appId]
    );
    return new ContactTracker(rows[0]);
  }

  static async deleteContactById(id) {
    const { rows } = await pool.query(
      `DELETE FROM contacts WHERE id=$1 RETURNING *
            `,
      [id]
    );
    return new ContactTracker(rows[0]);
  }

  // MUST TAKE IN LINKED APP AND USED ON FRONT END FETCH
  static async getContactsById(appId) {
    const { rows } = await pool.query(`
    SELECT 
    contacts.id,
	  contacts.company_contact,
	  contacts.linked_app
    FROM contacts 
    INNER JOIN job_apps
    ON contacts.linked_app = job_apps.app_id
    WHERE app_id = $1 

    `, 
    [appId]
    );
    return rows.map((row) => new ContactTracker(row));
  }

  static async updateContactById(companyContact, id, user) {
    const { rows } = await pool.query(`
    UPDATE contacts 
    SET contacts.company_contact = $1 
    FROM job_apps
    WHERE contacts.id = $2 AND job_apps.linked_user_id = $3
    RETURNING *
    `, [companyContact, id, user]
    );
    return new ContactTracker(rows[0]);
  }
};
