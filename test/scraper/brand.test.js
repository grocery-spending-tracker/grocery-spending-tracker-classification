import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as brand from "../../src/scraper/brand.js";

use(chaiHttp);

describe('FRT-M9: Test product brand scraper module', () => {

    const sampleSKU = '08390000636';
    const mockURL = `https://grocerytracker.ca/search/0067/${sampleSKU}`;

    describe('FRT-M9-1: Test fetchBrand()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-1a
         * Initial State: none
         * Input: a valid url
         * Output: brand name of product
         * Derivation: the scraper module must fetch brand from web
         */
        it('FRT-M9-1a: should return brand name back', async () => {
            const brandName = await brand.fetchBrand(mockURL);
            expect(brandName).to.be.not.undefined;
            expect(brandName).to.equal('Nestea');
        });
    });
});