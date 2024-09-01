const prisma = require("../db");
const path = require("path");
const fs = require("fs");

const findProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const findProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  return product;
};  

const insertProduct = async (productData) => {
  const product = await prisma.product.create({
    data: {
      name: productData.name,
      description: productData.description,
      image: productData.image ? path.basename(productData.image) : null, // Simpan nama file
      price: parseInt(productData.price),
    },
  });
  return product;
};

const deleteProduct = async (id) => {
  await prisma.product.delete({
    where: {
      id,
    },
  });
};


const editProduct = async (id, productData) => {
  const product = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      description: productData.description,
      image: productData.image ? path.basename(productData.image) : null, // Simpan nama file
      name: productData.name,
      price: parseInt(productData.price),
    },
  });
  return product;
};
module.exports = {
  findProducts,
  findProductById,
  insertProduct,
  deleteProduct,
  editProduct,
};
