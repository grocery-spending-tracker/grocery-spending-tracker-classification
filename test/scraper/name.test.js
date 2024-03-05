import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as name from "../../src/scraper/name.js";

use(chaiHttp);

describe('FRT-M9: Test product name scraper module', () => {
    let mockValidSKU, mockInvalidSKU;

    mockValidSKU = '08390000636';
    mockInvalidSKU = 'asdfwefv234';
    
    /**
     * Tests for FRT-M9-2
     */
    describe('FRT-M9-2: Test fetchName()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-2a
         * Initial State: none
         * Input: a valid url
         * Output: product name of product
         * Derivation: the scraper module must fetch product name from web
         */
        it('FRT-M9-2a: should return product name back', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockValidSKU}`;

            const productName = await name.fetchName(mockValidURL);
            expect(productName).to.be.not.undefined;
            expect(productName).to.equal('Lemon Tea, Gable Top Carton');
        });

        /**
         * FRT-M9-2b
         * Initial State: none
         * Input: a valid url with invalid sku
         * Output: null return
         * Derivation: the scraper module must return null for invalid sku
         */
        it('FRT-M9-2b: should return null', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockInvalidSKU}`;

            const productName = await name.fetchName(mockValidURL);
            // expect(brandName).to.be.not.undefined;
            expect(productName).to.be.null;
        });
    });
});