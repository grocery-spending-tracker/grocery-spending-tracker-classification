import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import fs from 'fs';
import * as util from './util.js';
import * as util from "../../src/scraper/util.js"; 

use(chaiHttp);

describe('FRT-M9: Test util of scraper module', () => {

    describe('FRT-M9-6: Test readCache()', function() {

        /**
         * FRT-M9-6a
         * Initial State: none
         * Input: a valid url
         * Output: product number of product
         * Derivation: the scraper module must fetch product number from web
         */
        // it('should retrieve data from cache', async () => {
        //     // Setup: Mock fs.readFile to simulate reading from cache
        //     const mockData = { productNumber: '20348331004_EA' };
        //     sinon.stub(fs, 'readFile').callsFake((path, encoding, callback) => {
        //       callback(null, JSON.stringify(mockData));
        //     });
      
        //     // Action: Call readCache with a test key
        //     const data = await util.readCache('testKey');
      
        //     // Assert: The returned data matches the mock data
        //     expect(data).to.deep.equal(mockData);
      
        //     // Cleanup: Restore fs.readFile
        //     sinon.restore();
        //   });
    });

    describe('FRT-M9-7: Test writeCache()', function() {

        /**
         * FRT-M9-7a
         * Initial State: none
         * Input: a valid url
         * Output: product number of product
         * Derivation: the scraper module must fetch product number from web
         */
        // it('FRT-M9-7a: should return product number back', async () => {
        //     const fetchedProductNumber = await productNumber.fetchProductNumber(mockURL);
        //     expect(fetchedProductNumber).to.be.not.undefined;
        //     expect(fetchedProductNumber).to.equal('20348331004_EA');
        // });
    });
});