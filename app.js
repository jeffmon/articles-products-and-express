const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");

var count = 1;
var allProducts = [];

app.use(bodyParser.json());

const stringChecker = (element) => {
  return typeof element === "string";
};

const putData = (obj) => {
  allProducts.forEach((e) =>{
    if(e.id === obj.body.id && parseInt(obj.params.id) === e.id){
      e.name = obj.body.name;
    }
  });
};

const deleteData = (obj) => {
  allProducts.forEach((e) => {
    if(parseInt(obj.params.id) === e.id){
    var location = allProducts.indexOf(e);
    allProducts.splice(location, 1);
    }
  });
};

const postData = (obj) => {
  var values = Object.keys(obj).map((key) => {
    return obj[key];
  });

  var keys = Object.keys(obj).toString();

  if (keys === 'name,price,inventory' && values.some(stringChecker) === true) {
    let price = parseInt(obj.price);
    let inventory = parseInt(obj.inventory);
    obj.id = count;
    obj.price = price;
    obj.inventory = inventory;
    allProducts.push(obj);
    count++;
  }
};

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");


app.get("/", (req, res) => {
  res.render();
});

app.post('/products', (req, res) => {
  postData(req.body);
  console.log("post: ");
  console.log(allProducts);
  res.json({
    "success": true
  });
  res.end();
});



app.route("/products/:id")
  .put((req, res) => {
    console.log("put before: ");
    console.log(allProducts);
    putData(req);
    console.log("put after: ");
    console.log(allProducts);
    res.end();
  })
  .delete((req, res) => {
    console.log("before: ");
    console.log(allProducts);
    deleteData(req);
    console.log("after: ");
    console.log(allProducts);
    res.end();
  });



const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
