const pgp = require('pg-promise')();

const connecttionOptions = {
  host: 'localhost',
  port: 5432,
  database: 'articles_and_products',
};

const db = pgp(connecttionOptions);

module.exports = db;