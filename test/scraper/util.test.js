import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
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
        // it('FRT-M9-6a: should return product number back', async () => {
        //     const fetchedProductNumber = await productNumber.fetchProductNumber(mockURL);
        //     expect(fetchedProductNumber).to.be.not.undefined;
        //     expect(fetchedProductNumber).to.equal('20348331004_EA');
        // });
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