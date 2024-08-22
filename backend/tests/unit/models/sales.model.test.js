const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { saleFromDB, allSalesFromDB, paramNewSale } = require('../mocks/sales.mock');

describe('Realizando testes - Sales MODEL:', function () {
  it('Recuperando sale por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([saleFromDB]);
    
    const sale = await salesModel.findSaleById(2);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(saleFromDB);
  });

  it('Recuperando todas sales com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allSalesFromDB]);
    
    const sale = await salesModel.findAllSales();

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(allSalesFromDB);
  });
  it('Criando uma sale com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
      
    const saleId = await salesModel.createNewSale(paramNewSale);
  
    expect(saleId).to.be.a('number');
    expect(saleId).to.be.equal(3);
  });

  afterEach(function () {
    sinon.restore();
  });
});