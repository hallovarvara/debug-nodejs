const jwt = require('jsonwebtoken');

const createToken = (userId) =>
  jwt.sign({ id: userId }, 'lets_play_sum_games_man', {
    expiresIn: 60 * 60 * 24,
  });

module.exports = {
  createToken,
};
