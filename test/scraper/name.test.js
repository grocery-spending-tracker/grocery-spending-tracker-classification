import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as name from "../../src/scraper/name.js";

use(chaiHttp);

describe('FRT-M9: Test product name scraper module', () => {

    const sampleSKU = '08390000636';
    const mockURL = `https://grocerytracker.ca/search/0067/${sampleSKU}`;

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
            const productName = await name.fetchName(mockURL);
            expect(productName).to.be.not.undefined;
            expect(productName).to.equal('Lemon Tea, Gable Top Carton');
        });
    });
});