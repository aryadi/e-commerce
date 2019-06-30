const {
  decodeToken
} = require('../helpers');

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('access_token')) {
    // console.log('==========>',req.headers.access_token);
    try {
      const decode = decodeToken(req.headers.access_token);

      req.decode = decode;
      next();
    } catch {
      next({
        code: 401
      })
    }
  } else {
    next({
      code: 401
    })
  }
}