DROP DATABASE IF EXISTS articles_and_products;
--DROP USER IF EXISTS pizzaaman;

--CREATE USER pizzaaman WITH ENCRYPTED PASSWORD 'pepandcheese';
CREATE DATABASE articles_and_products;


CREATE TABLE articles (
  id SERIAL NOT NULL PRIMARY KEY,
  title varchar(30),
  body text,
  author varchar(30)
);

CREATE TABLE products (
  id SERIAL NOT NULL PRIMARY KEY,
  name varchar(30),
  price money,
  inventory int
);