const productFromDB = {
    id: 1,
    name: 'Martelo de Thor',
  };

const allProductsFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do CapitÃ£o AmÃ©rica',
  },
];

const serviceResponseAllProducts = {
  status: 'SUCCESSFUL',
  data: allProductsFromDB,
};

const serviceResponseProductById = {
  status: 'SUCCESSFUL',
  data: productFromDB,
};

const failServiceResponseProductById = {
  status: 'NOT_FOUND',
  data: { message: 'Product not found' },
};

const newProduct = {
  id: 5,
  name: 'ProdutoX',
};

const paramNewProduct = {
  name: 'ProdutoX',
};

const productFromServiceCreated = {
  status: 'CREATED',
  data: newProduct,
};

module.exports = {
  productFromDB,
  allProductsFromDB,
  serviceResponseAllProducts,
  serviceResponseProductById,
  failServiceResponseProductById,
  newProduct,
  paramNewProduct,
  productFromServiceCreated,
};