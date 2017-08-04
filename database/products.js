const db = require('./index');

function insertProductData(name, price, inventory){
  let newProduct = {
    name: name,
    price: price,
    inventory: inventory
  };
  console.log(`INSERT INTO products VALUES (default, ${name}, ${price}, ${inventory})`);
  return db.none(`INSERT INTO products VALUES (default, '${name}', ${price}, ${inventory})`);
}

module.exports = {
  insertProductData
};
