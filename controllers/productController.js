const { Product } = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.json(error);
  }
};

const searchProducts = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.json([]);
  }

  try {
    const products = await Product.find({
      nombre: { $regex: q, $options: "i" },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    } else {
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductByCode = async (req, res) => {
  const { codigo } = req.params;
  try {
    const product = await Product.findOne({ codigo });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    } else {
      return res.json(product);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const createProduct = async (req, res) => {
  const { codigo, nombre, precio, categoria } = req.body;

  if (!codigo || !nombre || !precio || !categoria) {
    return res.status(400).json({ message: "Faltan campos obligatorios" });
  }

  const exists = await Product.findOne({ codigo });
  if (exists) {
    return res.status(400).json({ message: "El código ya existe" });
  }

  try {
    const newProduct = new Product(req.body);
    const insertProduct = await newProduct.save();
    res.status(201).json(insertProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createMultipleProducts = async (req, res) => {
  const products = req.body;

  if (!Array.isArray(products)) {
    return res
      .status(400)
      .json({ message: "El cuerpo debe ser un array de productos" });
  }

  const inserted = [];
  const errors = [];

  for (const product of products) {
    const { codigo, nombre, precio, categoria } = product;

    if (!codigo || !nombre || !precio || !categoria) {
      errors.push({ producto: product, error: "Faltan campos obligatorios" });
      continue;
    }

    const exists = await Product.findOne({ codigo });
    if (exists) {
      errors.push({ producto: product, error: "El código ya existe" });
      continue;
    }

    try {
      const newProduct = new Product(product);
      const insertProduct = await newProduct.save();
      inserted.push(insertProduct);
    } catch (error) {
      errors.push({
        producto: product,
        error: "Error al guardar",
      });
      continue;
    }
  }

  if (inserted.length === 0) {
    return res.status(400).json({
      message: "No se pudo insertar ningún producto válido",
      errors,
    });
  } else if (errors.length === 0) {
    return res.status(201).json(inserted);
  } else {
    return res.status(201).json({
      message: "Algunos productos no se pudieron insertar",
      inserted,
      errors,
    });
  }
};

const updateProduct = async (req, res) => {
  const { codigo } = req.params;
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { codigo }, // condición de búsqueda
      req.body, // nuevos datos
      { new: true } // para que devuelva el documento actualizado
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    } else {
      return res.json(updatedProduct);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteProduct = async (req, res) => {
  const { codigo } = req.params;
  try {
    const deletedProduct = await Product.findOneAndDelete({ codigo });

    if (!deletedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    } else {
      return res.json(deletedProduct);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoria } = req.params;

  try {
    const products = await Product.find({
      categoria: { $regex: categoria, $options: "i" },
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos para esa categoría" });
    } else {
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getProductsByPriceRange = async (req, res) => {
  const { rango } = req.params;
  const [min, max] = rango.split("-");

  try {
    const products = await Product.find({
      precio: { $gte: min, $lte: max },
    });

    if (products.length === 0) {
      return res.status(404).json({
        message: "No se encontraron productos en ese rango de precios",
      });
    } else {
      return res.json(products);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllProducts,
  searchProducts,
  getProductByCode,
  createProduct,
  createMultipleProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsByPriceRange,
};
