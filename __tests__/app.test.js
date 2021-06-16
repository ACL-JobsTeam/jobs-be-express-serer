const pool = require('../lib/utils/pool');
const setup = require('../data/setup');

describe('test test', () => {
  beforeEach(() => setup(pool));
  it('CI/CD test', async () => {
    const apple = 'apple';
    expect(apple).toEqual('apple');

    const { rows } = await pool.query(
      'SELECT id, username, email FROM users WHERE id=100'
    );
    
    expect(rows[0]).toEqual({
      id: '100',
      username: 'user1',
      email: 'one@one.com',
    });

  });

});
