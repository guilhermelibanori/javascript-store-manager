const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { allSalesFromDB, saleFromDB, failServiceResponseSaleById, paramNewSale, responseNewSaleService } = require('../mocks/sales.mock');

  describe('Realizando testes para o Sales Service', function () {
    it('Listando todos os produtos com sucesso', async function () {
      sinon.stub(salesModel, 'findAllSales').resolves(allSalesFromDB);

      const serviceResponse = await salesService.findAll();

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(allSalesFromDB);
    });

    it('Listando uma sale por id com sucesso', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves(saleFromDB);

      const serviceResponse = await salesService.findById(2);

      expect(serviceResponse.status).to.equal('SUCCESSFUL');
      expect(serviceResponse.data).to.deep.equal(saleFromDB);
    });

    it('Listando uma sale por id sem sucesso', async function () {
      sinon.stub(salesModel, 'findSaleById').resolves([]);

      const serviceResponse = await salesService.findById(71);

      expect(serviceResponse.status).to.equal(failServiceResponseSaleById.status);
      expect(serviceResponse.data).to.deep.equal(failServiceResponseSaleById.data);
    });

    it('Criando uma nova sale com sucesso', async function () {
      sinon.stub(salesModel, 'createNewSale').resolves(3);

      const serviceResponse = await salesService.createNewSale(paramNewSale);

      expect(serviceResponse.status).to.equal('CREATED');
      expect(serviceResponse.data).to.deep.equal(responseNewSaleService);
    });
    afterEach(function () {
      sinon.restore();
    });
  });