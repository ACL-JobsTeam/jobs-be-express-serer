const pool = require('../utils/pool')


module.exports = class ContactTracker {
    id;
    companyContact;

    constructor(row) {
        this.id = row.id;
        this.companyContact = row.company_contact;
        
    }

    static async insertContact({ companyContact }) {
        const { rows } = await pool.query(
            `INSERT INTO user_note (company_contact)
            VALUES ($1)
            RETURNING *
                `,
                [companyContact]
        );
       return new ContactTracker(rows[0]) 
    }


}