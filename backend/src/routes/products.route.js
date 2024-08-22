const route = require('express').Router();
const { productsController } = require('../controllers');
const { productsMiddleware } = require('../middlewares');

route.get('/', productsController.getProducts);
route.post(
'/', 
productsMiddleware.validField,
productsMiddleware.validNameLength, 
productsController.createNewProduct,
);
route.get('/:id', productsController.getProductById);
route.delete(
'/:id', 
productsMiddleware.validProduct,
productsController.deleteProduct,
);

module.exports = route;