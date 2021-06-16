const jwt = require('jsonwebtoken');

function ensureJwtAuth(req, res, next) {
  try {
    const token = req.cookies.acl_jobs;
    if(token){
    const decoded = jwt.verify(token, process.env.EXPRESS_SECRET_TOKEN);
    req.userData = decoded;
      next();
    } else {
      res.status(401).send('Unauthorized: JWT missing');
    }

  } catch(err) {
    res.clearCookie('acl_jobs', { path: '/' });
    res.status(401).send('Unauthorized: JWT expired or invalid');
  }
}

module.exports = { ensureJwtAuth };
