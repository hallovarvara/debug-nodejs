const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');
const { handleError } = require('../utils/handleError');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next();
  } else {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
      handleError(res, 403, {
        auth: false,
        message: 'Access denied. Please, provide correct token.',
      });
    } else {
      jwt.verify(sessionToken, 'lets_play_sum_games_man', (err, decoded) => {
        if (decoded) {
          User.findOne({
            where: {
              id: decoded.id,
            },
          })
            .then((user) => {
              req.user = user;
              next();
            })
            .catch((err) => {
              handleError(res, 401, {
                message:
                  'There is problem with authorization. Please, re-authorize.',
                error: err,
              });
            });
        } else {
          handleError(res, 400, {
            message: 'Something went wrong. Please, try again.',
            error: err,
          });
        }
      });
    }
  }
};
