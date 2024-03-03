import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as price from "../../src/scraper/price.js"; 

use(chaiHttp);

describe('FRT-M9: Test product price scraper module', () => {

    const sampleSKU = '08390000636';
    const mockURL = `https://grocerytracker.ca/search/0067/${sampleSKU}`;

    describe('FRT-M9-3: Test fetchPrice()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-3a
         * Initial State: none
         * Input: a valid url
         * Output: product price of product
         * Derivation: the scraper module must fetch product price from web
         */
        it('FRT-M9-3a: should return product price back', async () => {
            const productPrice = await price.fetchPrice(mockURL);
            expect(productPrice).to.be.not.undefined;
            expect(productPrice).to.equal('$4.49');
        });
    });
});