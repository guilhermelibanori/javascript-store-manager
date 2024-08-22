const route = require('express').Router();
const { salesController } = require('../controllers');
const { salesMiddleware } = require('../middlewares');

route.get('/', salesController.getSales);
route.post(
  '/', 
  salesMiddleware.validProductId,
  salesMiddleware.validQuantity,
  salesController.createNewSale,
  );
route.get('/:id', salesController.getSalesById);

module.exports = route;