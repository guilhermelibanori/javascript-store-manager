const { findById } = require('../services/products.service');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const validField = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(mapStatusHTTP('BAD_REQUEST')).json({ message: '"name" is required' });
  }
  next();
};

const validNameLength = (req, res, next) => {
  const name = req.body.name.toString();
  if (name.length < 5) {
    return res.status(422).json({
       message: '"name" length must be at least 5 characters long', 
      });
  }
  next();
};

const validProduct = async (req, res, next) => {
  const { id } = req.params;
  const checkValid = await findById(id);
  if (checkValid.status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP('NOT_FOUND')).json({ message: 'Product not found' });
  }
  next();
};

module.exports = {
  validField,
  validNameLength,
  validProduct,
};