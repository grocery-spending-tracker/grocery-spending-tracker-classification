import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as price from "../../src/scraper/price.js"; 

use(chaiHttp);

describe('FRT-M9: Test product price scraper module', () => {
    let mockValidSKU, mockInvalidSKU;

    mockValidSKU = '08390000636';
    mockInvalidSKU = 'asdfwefv234';

    /**
     * Tests for FRT-M9-3
     */
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
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockValidSKU}`;

            const productPrice = await price.fetchPrice(mockValidURL);
            expect(productPrice).to.be.not.undefined;
            expect(productPrice).to.equal('$4.49');
        });

        /**
         * FRT-M9-3b
         * Initial State: none
         * Input: a valid url with invalid sku
         * Output: null return
         * Derivation: the scraper module must return null for invalid sku
         */
        it('FRT-M9-3b: should return null', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockInvalidSKU}`;

            const productPrice = await price.fetchPrice(mockValidURL);
            // expect(brandName).to.be.not.undefined;
            expect(productPrice).to.be.null;
        });
    });
});