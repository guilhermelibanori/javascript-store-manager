const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getSales = async (req, res) => {
  const { status, data } = await salesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createNewSale = async (req, res) => {
  const saleData = req.body;
  const { status, data } = await salesService.createNewSale(saleData);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  getSales,
  getSalesById,
  createNewSale,
};