const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");

var count = 1;
var allProducts = [];
var allArticles = [];
var product;
var article;

app.use(bodyParser.urlencoded());

const stringChecker = (element) => {
  return typeof element === "string";
};

const putData = (obj) => {
  allProducts.forEach((e) => {
    if (e.id === obj.body.id && parseInt(obj.params.id) === e.id) {
      e.name = obj.body.name;
    }
  });
};

const deleteData = (obj) => {
  allProducts.forEach((e) => {
    if (parseInt(obj.params.id) === e.id) {
      var location = allProducts.indexOf(e);
      allProducts.splice(location, 1);
    }
  });
};

const getData = (obj) => {
  allProducts.forEach((e) => {
    if (parseInt(obj.params.id) === e.id) {
      product = e;
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

const putArticle = (obj) => {
  allArticles.forEach((e) => {
    if (e.title === obj.body.title && obj.params.title === e.title) {
      e.body = obj.body.body;
      e.author = obj.body.author;
    }
  });
};

const postArticle = (obj) => {
  var values = Object.keys(obj).map((key) => {
    return obj[key];
  });
  var keys = Object.keys(obj).toString();
  if (keys === 'title,body,author' && values.some(stringChecker) === true) {
    obj.urlTitle = encodeURI(obj.title);
    allArticles.push(obj);
  }
};

const getArticle = (obj) => {
  allArticles.forEach((e) => {
    if (obj.params.title === e.title) {
      article = e;
    }
  });
};

const deleteArticle = (obj) => {
  allArticles.forEach((e) => {
    if (obj.params.title === e.title) {
      var location = allArticles.indexOf(e);
      allArticles.splice(location, 1);
    }
  });
};


const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs"
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");


app.get('/', (req, res) => {
  res.render('home');
});

app.route("/products")
  .get((req, res) => {
    res.render('index', {
      products: allProducts
    });
  });
  // .post((req, res) => {
  //   postData(req.body);
  //   // console.log("post: ");
  //   // console.log(allProducts);
  //   console.log(req.body);
  //   // res.json({
  //   //   "success": true
  //   // });
  //   res.redirect("/products");
  //   res.end();
  // });

  app.post("/products-submission", (req, res) => {
    postData(req.body);
    // console.log("post: ");
    // console.log(allProducts);
    console.log(req.body);
    // res.json({
    //   "success": true
    // });
    res.redirect("/products");
    res.end();
  });

app.route("/products/:id")
  .get((req, res) => {
    getData(req);
    console.log(product);
    res.render('product', {
      product: product
    });
  })
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

app.route("/articles")
  .get((req, res) => {
    res.render('index', {
      articles: allArticles
    });
  })
  .post((req, res) => {
    postArticle(req.body);
    console.log("post: ");
    console.log(allArticles);
    res.json({
      "success": true
    });
    res.end();
  });

app.route("/articles/:title")
  .get((req, res) => {
    getArticle(req);
    console.log(article);
    res.render('article', {
      article: article
    });
  })
  .put((req, res) => {
    console.log("put before: ");
    console.log(allArticles);
    putArticle(req);
    console.log("put after: ");
    console.log(allArticles);
  })
  .delete((req, res) => {
    console.log("before: ");
    console.log(allArticles);
    deleteArticle(req);
    console.log("after: ");
    console.log(allArticles);
    res.end();
  });



const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
