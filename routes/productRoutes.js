const router = require("express").Router();
const {
  getAllProducts,
  searchProducts,
  getProductByCode,
  createProduct,
  createMultipleProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByPriceRange,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/buscar", searchProducts);
router.get("/:codigo", getProductByCode);
router.post("/", createProduct);
router.post("/masivo", createMultipleProducts);
router.put("/:codigo", updateProduct);
router.delete("/:codigo", deleteProduct);
router.get("/categoria/:categoria", getProductsByCategory);
router.get("/precio/:rango", getProductsByPriceRange);

module.exports = router;
