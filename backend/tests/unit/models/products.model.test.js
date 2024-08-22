const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { productFromDB, allProductsFromDB, newProduct, paramNewProduct } = require('../mocks/product.mock');

describe('Realizando testes - Product MODEL:', function () {
  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[productFromDB]]);
    
    const product = await productsModel.findProductById(1);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productFromDB);
  });

  it('Recuperando todos products com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsFromDB]);
    
    const product = await productsModel.findAllProducts();

    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(allProductsFromDB);
  });

  it('Criando um product com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([newProduct]);
    
    const product = await productsModel.createNewProduct(paramNewProduct);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(newProduct);
  });

  afterEach(function () {
    sinon.restore();
  });
});