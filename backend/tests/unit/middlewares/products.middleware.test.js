const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productFromServiceCreated, newProduct } = require('../mocks/product.mock');
const { productsMiddleware } = require('../../../src/middlewares');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes sobre o Products Middleware', function () {
    it('Criando um produto novo com sucesso', async function () {
      const next = sinon.stub(productsService, 'createNewProduct').resolves(productFromServiceCreated);
      
      const req = {
        body: { name: 'ProdutoX' },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
      productsMiddleware.validField(req, res, next);
      productsMiddleware.validNameLength(req, res, next);

      expect(next).to.have.been.calledWith();

      await productsController.createNewProduct(req, res);
      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
    it('Falhando ao criar um produto sem passar o name', async function () {
      const next = sinon.stub(productsService, 'createNewProduct').resolves();

      const req = {
        body: {},
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };

      productsMiddleware.validField(req, res, next);

      expect(next).to.not.have.been.calledWith();
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });
    it('Falhando ao criar um produto com name menor que 5 letras', async function () {
      const next = sinon.stub(productsService, 'createNewProduct').resolves();

        const req = {
          body: {
            name: 'Prod',
          },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
  
        productsMiddleware.validNameLength(req, res, next);

        expect(next).to.not.have.been.calledWith();
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({
          message: '"name" length must be at least 5 characters long',
        });
      });
  
  afterEach(function () {
    sinon.restore();
  });
});