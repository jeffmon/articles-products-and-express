const db = require('./index');

function insertArticleData(title, body, author){
  let newArticle = {
    title: title,
    body: body,
    author:author
  };

  return db.none(`INSERT INTO articles VALUES (default, ${title}, ${body}, ${author})`, newArticle);
}

module.exports = {
  insertArticleData
};