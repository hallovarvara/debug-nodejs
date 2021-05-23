const handleError = (res, statusCode, options) => {
  res.status(statusCode).send(options);
};

module.exports = {
  handleError,
};
