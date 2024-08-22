const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesMiddleware } = require('../../../src/middlewares');
const { paramNewSale, saleFromServiceCreated, newSale } = require('../mocks/sales.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes sobre o Sales Middleware', function () {
    it('Criando uma sale nova com sucesso', async function () {
      const next = sinon.stub(salesService, 'createNewSale').resolves(saleFromServiceCreated);
      
      const req = {
        body: paramNewSale,
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      salesMiddleware.validProductId(req, res, next);
      salesMiddleware.validQuantity(req, res, next);

      expect(next).to.have.been.calledWith();

      await salesController.createNewSale(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newSale);
    });
    it('Falhando ao criar uma sale sem passar o productId', async function () {
      const next = sinon.stub(salesService, 'createNewSale').resolves();

      const req = {
        body: [{ quantity: 1 }, { productId: 2, quantity: 5 }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      salesMiddleware.validProductId(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
    it('Falhando ao criar uma sale sem passar o quantity', async function () {
      const next = sinon.stub(salesService, 'createNewSale').resolves();

      const req = {
        body: [{ productId: 1, quantity: 1 }, { productId: 2 }],
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      salesMiddleware.validQuantity(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"quantity" is required' });
    });
  
  afterEach(function () {
    sinon.restore();
  });
});