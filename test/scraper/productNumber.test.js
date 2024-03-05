import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as productNumber from "../../src/scraper/productNumber.js"; 

use(chaiHttp);

describe('FRT-M9: Test product number scraper module', () => {
    let mockValidSKU, mockInvalidSKU;

    mockValidSKU = '08390000636';
    mockInvalidSKU = 'asdfwefv234';

     /**
     * Tests for FRT-M9-4
     */
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
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockValidSKU}`;

            const fetchedProductNumber = await productNumber.fetchProductNumber(mockValidURL);
            expect(fetchedProductNumber).to.be.not.undefined;
            expect(fetchedProductNumber).to.equal('20348331004_EA');
        });

        /**
         * FRT-M9-4b
         * Initial State: none
         * Input: a valid url with invalid sku
         * Output: null return
         * Derivation: the scraper module must return null for invalid sku
         */
        it('FRT-M9-4b: should return null', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockInvalidSKU}`;

            const fetchedProductNumber = await productNumber.fetchProductNumber(mockValidURL);
            // expect(brandName).to.be.not.undefined;
            expect(fetchedProductNumber).to.be.null;
        });
    });
});