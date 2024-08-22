const { findById } = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validProductId = async (req, res, next) => {
  const data = req.body;
  const unedfinedProduct = data.filter(({ productId }) => productId === undefined);
  if (unedfinedProduct.length) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({
      message: '"productId" is required',
    });
  }
  const promises = data.map(({ productId }) => findById(productId));
  const results = await Promise.all(promises);
  const invalidProducts = results
    .filter(({ status }) => status === 'NOT_FOUND')
    .map(({ productId }) => productId);

  if (invalidProducts.length) {
    return res.status(404).json({
      message: 'Product not found',
    });
  }
  
  next();
};

const validQuantity = (req, res, next) => {
  const data = req.body;
  const undefinedQuantity = data.filter(({ quantity }) => quantity === undefined);
  if (undefinedQuantity.length) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({
      message: '"quantity" is required',
    });
  }
  const invalidQuantity = data.filter(({ quantity }) => quantity < 1);
  if (invalidQuantity.length) {
    return res.status(mapStatusHTTP('INVALID_VALUE')).json({
       message: '"quantity" must be greater than or equal to 1', 
      });
  }
  next();
};

module.exports = {
  validProductId,
  validQuantity,
};