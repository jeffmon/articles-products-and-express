const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const exphbs = require("express-handlebars");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");


app.get("/", (req, res) =>{
  res.render();
});

const server = app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`);
});
