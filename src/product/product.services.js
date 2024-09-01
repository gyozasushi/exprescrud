const prisma = require("../db");
const path = require("path");
const fs = require("fs");
const {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
} = require("./product.repository");

const getAllProducts = async () => {
  const products = await findProducts();
  return products;
};

const getProductById = async (id) => {
  const product = await findProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

const createProduct = async (newProductData) => {
  // Jika ada gambar, pastikan formatnya sesuai (buffer)
  if (newProductData.image && Buffer.isBuffer(newProductData.image)) {
    newProductData.image = newProductData.image.toString('base64'); // Menyimpan gambar sebagai base64 string
  }
  console.log('Product Data After Base64 Conversion:', newProductData);
  const product = await insertProduct(newProductData);
  return product;
};


const deleteProductById = async (id) => {
  await getProductById(id);
  await deleteProduct(id);
};

const editProductById = async (id, productData) => {
  await getProductById(id);

  // Simpan path gambar ke database
  if (productData.image) {
    const imagePath = path.join(__dirname, '../public/uploads', productData.image);
    productData.image = imagePath; // Simpan path relatif di database
  }

  const product = await editProduct(id, productData);
  return product;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
