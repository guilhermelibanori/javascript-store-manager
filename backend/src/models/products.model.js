const camelize = require('camelize');
const connection = require('./connection');

const findAllProducts = async () => {
    const [products] = await connection.execute('SELECT * FROM products');
    return camelize(products);
};

const findProductById = async (id) => {
  const [[products]] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return products;
};

const createNewProduct = async (data) => {
  const [newProduct] = await connection.execute('INSERT INTO products (name) VALUES (?)', [data]);
  return newProduct;
};

const deleteProductById = async (id) => {
  const [deleted] = await connection.execute('DELETE FROM products WHERE id = ?', [id]);
  return deleted;
};

module.exports = {
  findAllProducts,
  findProductById,
  createNewProduct,
  deleteProductById,
};