const router = require("express").Router();
const {
  getAllProducts,
  searchProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/buscar", searchProducts);
router.get("/:codigo", getProductByCode);
router.post("/", createProduct);
router.put("/:codigo", updateProduct);
router.delete("/:codigo", deleteProduct);

module.exports = router;
