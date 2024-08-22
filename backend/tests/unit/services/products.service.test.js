const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { allProductsFromDB, productFromDB, failServiceResponseProductById, newProduct, paramNewProduct } = require('../mocks/product.mock');
const { productsService } = require('../../../src/services');

  describe('Realizando testes para o Products Service', function () {
    it('Listando todos os produtos com sucesso', async function () {
      sinon.stub(productsModel, 'findAllProducts').resolves(allProductsFromDB);

      const serviceResponse = await productsService.findAll();

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(allProductsFromDB);
    });

    it('Listando um produto por id com sucesso', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(productFromDB);

      const serviceResponse = await productsService.findById(1);

      expect(serviceResponse.status).to.equal('SUCCESSFUL');

      expect(serviceResponse.data).to.deep.equal(productFromDB);
    });

    it('Listando um produto por id sem sucesso', async function () {
      sinon.stub(productsModel, 'findProductById').resolves(undefined);

      const serviceResponse = await productsService.findById(71);

      expect(serviceResponse.status).to.equal(failServiceResponseProductById.status);
      expect(serviceResponse.data).to.deep.equal(failServiceResponseProductById.data);
    });

    it('Criando um novo produto com sucesso', async function () {
      sinon.stub(productsModel, 'createNewProduct').resolves(newProduct);
      sinon.stub(productsModel, 'findProductById').resolves(newProduct);

      const serviceResponse = await productsService.createNewProduct(paramNewProduct);

      expect(serviceResponse.status).to.equal('CREATED');
      expect(serviceResponse.data).to.deep.equal(newProduct);
    });

    afterEach(function () {
      sinon.restore();
    });
  });