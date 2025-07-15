const mongoose = require("mongoose");
process.loadEnvFile();
const { DB_PROTOCOL, DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_OPTIONS } =
  process.env;
const MONGODB_URI = `${DB_PROTOCOL}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?${DB_OPTIONS}`;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB ha sido conectada con éxito");
  } catch (error) {
    console.log({ error });
  }
};

module.exports = { connectDB };
