const express = require("express");
const app = express();
process.loadEnvFile();
const PORT = process.env.PORT || 5000;
const productRoutes = require("./routes/productRoutes");
const { connectDB } = require("./config/database");
connectDB();

app.use(express.json());

app.use("/api/productos", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
