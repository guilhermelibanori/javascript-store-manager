const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { serviceResponseAllProducts, serviceResponseProductById, failServiceResponseProductById, productFromServiceCreated, newProduct } = require('../mocks/product.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Realizando testes sobre o Products Controller', function () {
  it('Recebendo informações de todos produtos', async function () {
    sinon.stub(productsService, 'findAll').resolves(serviceResponseAllProducts);
   
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProducts(undefined, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponseAllProducts.data);
  });
  it('Recebendo informações de um produto por id com sucesso', async function () {
    sinon.stub(productsService, 'findById').resolves(serviceResponseProductById);

    const req = {
      params: { id: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(serviceResponseProductById.data);
  });
  it('Recebendo informações de um produto por id sem sucesso', async function () {
    sinon.stub(productsService, 'findById').resolves(failServiceResponseProductById);

    const req = {
      params: { id: 16 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.getProductById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(failServiceResponseProductById.data);
  });
  it('Inserindo um produto com sucesso - status 201', async function () {
    sinon.stub(productsService, 'createNewProduct').resolves(productFromServiceCreated);
    const req = {
      body: { name: 'ProdutoX' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await productsController.createNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});