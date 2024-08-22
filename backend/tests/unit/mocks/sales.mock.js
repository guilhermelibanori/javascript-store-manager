const saleFromDB = [
  {
    date: '2023-07-07T05:12:41.000Z',
    productId: 3,
    quantity: 15,
  },
];

const allSalesFromDB = [
  {
    saleId: 1,
    date: '2023-07-07T05:12:41.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2023-07-07T05:12:41.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2023-07-07T05:12:41.000Z',
    productId: 3,
    quantity: 15,
  },
];

const serviceResponseAllSales = {
status: 'SUCCESSFUL',
data: allSalesFromDB,
};

const serviceResponseSaleById = {
status: 'SUCCESSFUL',
data: saleFromDB,
};

const failServiceResponseSaleById = {
status: 'NOT_FOUND',
data: { message: 'Sale not found' },
};

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const paramNewSale = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

const responseNewSaleService = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const saleFromServiceCreated = {
  status: 'CREATED',
  data: newSale,
};

module.exports = {
saleFromDB,
allSalesFromDB,
serviceResponseAllSales,
serviceResponseSaleById,
failServiceResponseSaleById,
newSale,
paramNewSale,
responseNewSaleService,
saleFromServiceCreated,
};