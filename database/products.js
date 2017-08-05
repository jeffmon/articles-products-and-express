const db = require('./index');

function insertProductData(name, price, inventory){
  let newProduct = {
    name: name,
    price: price,
    inventory: inventory
  };

  return db.none(`INSERT INTO products VALUES (default, '${name}', ${price}, ${inventory})`);
}

function getProductData () {
  return db.query("SELECT * FROM products");
}

function getProductId (id) {
  return db.one(`SELECT * FROM products WHERE products.id = ${id}`);
}

// function editProduct (id) {

// }

module.exports = {
  insertProductData,
  getProductData,
  getProductId
};
