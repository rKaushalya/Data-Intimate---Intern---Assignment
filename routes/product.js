var express = require('express');
var router = express.Router();

const ProductController = require('../controllers/ProductController');

router.post("/add",ProductController.addProduct);
router.get("/",ProductController.getAllData);
router.get("/:id",ProductController.getDataFromId);
router.put("/update/:id",ProductController.updateProduct);
router.delete("/delete/:id",ProductController.deleteProduct);

module.exports = router;