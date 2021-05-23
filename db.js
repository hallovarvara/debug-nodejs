const Sequelize = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
});

sequelize
  .authenticate()
  .then(() => {
    process.stdout.write(
      `Successfully connected to database on port ${DB_PORT}`,
    );
  })
  .catch((err) => {
    process.stderr.write(`Error: ${err}`);
  });

module.exports = sequelize;
