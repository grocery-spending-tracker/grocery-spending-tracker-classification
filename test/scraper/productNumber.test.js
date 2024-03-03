import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as productNumber from "../../src/scraper/productNumber.js"; 

use(chaiHttp);

describe('FRT-M9: Test product number scraper module', () => {

    const sampleSKU = '08390000636';
    const mockURL = `https://grocerytracker.ca/search/0067/${sampleSKU}`;

    describe('FRT-M9-4: Test fetchProductNumber()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-4a
         * Initial State: none
         * Input: a valid url
         * Output: product number of product
         * Derivation: the scraper module must fetch product number from web
         */
        it('FRT-M9-4a: should return product number back', async () => {
            const fetchedProductNumber = await productNumber.fetchProductNumber(mockURL);
            expect(fetchedProductNumber).to.be.not.undefined;
            expect(fetchedProductNumber).to.equal('20348331004_EA');
        });
    });
});