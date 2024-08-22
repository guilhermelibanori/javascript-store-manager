const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAllProducts();
  return { status: 'SUCCESSFUL', data: products };
};

const findById = async (id) => {
  const product = await productsModel.findProductById(id);
  if (!product) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }
  return { status: 'SUCCESSFUL', data: product };
};

const createNewProduct = async (data) => {
  const createProduct = await productsModel.createNewProduct(data);
  const newProduct = await productsModel.findProductById(createProduct.insertId);
  return { status: 'CREATED', data: newProduct };
};

const deleteProduct = async (id) => {
  const deletedProduct = await productsModel.deleteProductById(id);
  // const newProduct = await productsModel.deleteProductById(createProduct.insertId);
  return { status: 'DELETED', data: deletedProduct };
};

module.exports = {
  findAll,
  findById,
  createNewProduct,
  deleteProduct,
};