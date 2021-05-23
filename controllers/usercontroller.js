const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { createToken } = require('../utils/createToken');
const { handleError } = require('../utils/handleError');

const User = require('../db').import('../models/user');

router.post('/signup', (req, res) => {
  User.create({
    full_name: req.body.user.full_name,
    username: req.body.user.username,
    passwordHash: bcrypt.hashSync(req.body.user.password, 10),
    email: req.body.user.email,
  })
    .then((user) => {
      res.status(200).json({
        user: user,
        token: createToken(user.id),
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err });
    });
});

router.post('/signin', (req, res) => {
  User.findOne({
    where: {
      username: req.body.user.username,
    },
  }).then((user) => {
    if (user) {
      bcrypt.compare(
        req.body.user.password,
        user.passwordHash,
        function (err, matches) {
          if (matches) {
            res.json({
              user: user,
              message: 'Successfully authenticated.',
              sessionToken: createToken(user.id),
            });
          } else {
            handleError(res, 401, { error: 'Passwords do not match.' });
          }
        },
      );
    } else {
      handleError(res, 404, { error: 'User not found.' });
    }
  });
});

module.exports = router;
