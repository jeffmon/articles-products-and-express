const db = require('./index');

function insertArticleData (title, body, author){
  let newArticle = {
    title: title,
    body: body,
    author:author
  };

  return db.none(`INSERT INTO articles VALUES (default, '${title}', '${body}', '${author}')`, newArticle);
}

function getArticleData () {
  return db.query("SELECT * FROM articles");
}

function getArticleId (id) {
  return db.one(`SELECT * FROM articles WHERE articles.id = ${id}`);
}

module.exports = {
  insertArticleData,
  getArticleData,
  getArticleId
};