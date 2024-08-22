const { salesModel } = require('../models');

const findAll = async () => {
  const sales = await salesModel.findAllSales();
  return { status: 'SUCCESSFUL', data: sales };
};

const findById = async (id) => {
  const sale = await salesModel.findSaleById(id);
  if (sale.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  return { status: 'SUCCESSFUL', data: sale };
};

const createNewSale = async (saleData) => {
  const saleId = await salesModel.createNewSale(saleData);
  const itemsSold = saleData.map((element) => ({
    productId: element.productId,
    quantity: element.quantity,
  }));

  const newSale = {
    id: saleId,
    itemsSold,
  };

  return { status: 'CREATED', data: newSale };
};

module.exports = {
  findAll,
  findById,
  createNewSale,
};