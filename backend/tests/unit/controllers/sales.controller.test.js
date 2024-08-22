const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { serviceResponseAllSales, serviceResponseSaleById, failServiceResponseSaleById, saleFromServiceCreated, newSale } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes sobre o Sales Controller', function () {
  it('Recebendo informações de todos produtos', async function () {
    sinon.stub(salesService, 'findAll').resolves(serviceResponseAllSales);
   
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSales(undefined, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponseAllSales.data);
  });
  it('Recebendo informações de uma venda por id com sucesso', async function () {
    sinon.stub(salesService, 'findById').resolves(serviceResponseSaleById);

    const req = {
      params: { id: 2 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponseSaleById.data);
  });
  it('Recebendo informações de uma venda por id sem sucesso', async function () {
    sinon.stub(salesService, 'findById').resolves(failServiceResponseSaleById);

    const req = {
      params: { id: 16 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(failServiceResponseSaleById.data);
  });
  it('Criando uma venda com sucesso', async function () {
    sinon.stub(salesService, 'createNewSale').resolves(saleFromServiceCreated);

    const req = {
      params: newSale,
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await salesController.createNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSale);
  });

  afterEach(function () {
    sinon.restore();
  });
});