const router = require("express").Router();
const {
  getAllProducts,
  searchProducts,
  getProductByCode,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productController");

router.get("/", getAllProducts);
router.get("/buscar", searchProducts);
router.get("/:codigo", getProductByCode);
router.post("/", createProduct);
router.put("/:codigo", updateProduct);
router.delete("/:codigo", deleteProduct);
router.get("/categoria/:categoria", getProductsByCategory);

module.exports = router;
