import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as brand from "../../src/scraper/brand.js";

use(chaiHttp);

describe('FRT-M9: Test product brand scraper module', () => {
    let mockValidSKU, mockInvalidSKU;

    mockValidSKU = '08390000636';
    mockInvalidSKU = 'asdfwefv234';

    describe('FRT-M9-1: Test fetchBrand()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-1a
         * Initial State: none
         * Input: a valid url with valid sku
         * Output: brand name of product
         * Derivation: the scraper module must fetch brand from web
         */
        it('FRT-M9-1a: should return brand name back', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockValidSKU}`;

            const brandName = await brand.fetchBrand(mockValidURL);
            expect(brandName).to.be.not.undefined;
            expect(brandName).to.equal('Nestea');
        });

        /**
         * FRT-M9-1b
         * Initial State: none
         * Input: a valid url with invalid sku
         * Output: null return
         * Derivation: the scraper module must return null for invalid sku
         */
        it('FRT-M9-1b: should return null', async () => {
            const mockValidURL = `https://grocerytracker.ca/search/0067/${mockInvalidSKU}`;

            const brandName = await brand.fetchBrand(mockValidURL);
            // expect(brandName).to.be.not.undefined;
            expect(brandName).to.be.null;
        });

        // /**
        //  * FRT-M9-1c
        //  * Initial State: none
        //  * Input: a invalid url
        //  * Output: throw error
        //  * Derivation: the scraper module must throw error for invalid url input
        //  */
        // it('FRT-M9-1c: should throw error', async () => {
        //     const mockInvalidURL = `https://invalidurl.ca/`;

        //     try {
        //         await brand.fetchBrand(mockInvalidURL);
        //         expect.fail('Expected fetchBrand to throw an error with invalid URL');
        //     } catch (err) {
        //         expect(err).to.exist;
        //     }
        // });
    });
});