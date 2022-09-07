var express = require("express");
var router = express.Router();
const products = require("../src/contenedor");

router.get("/", (req, res) => {
  res.render("form.hbs");
});

router.get("/productos", (req, res) => {
  res.render("products.hbs", { products: products.getAll() });
});

router.put("/productos/:id", ({ params, body }, res) => {
  const { id } = params;
console.log(body)
  products.updateProduct(id, body);
});

router.post("/productos", (req, res) => {
  products.save(req.body);
  res.redirect("/productos");
});

router.delete("/productos/:id", ({ params }, res) => {
  const { id } = params;

  products.deleteById(id);
  res.redirect("/productos");
});

module.exports = router;
