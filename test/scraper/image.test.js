import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import * as image from "../../src/scraper/image.js"; 

use(chaiHttp);

describe('FRT-M9: Test product image scraper module', () => {

    const sampleSKU = '08390000636';
    const mockURL = `https://grocerytracker.ca/search/0067/${sampleSKU}`;

    describe('FRT-M9-5: Test fetchImage()', function() {

        this.timeout(20000);

        /**
         * FRT-M9-5a
         * Initial State: none
         * Input: a valid url
         * Output: product image url of product
         * Derivation: the scraper module must fetch product image url from web
         */
        it('FRT-M9-5a: should return product image url back', async () => {
            const productImage = await image.fetchImage(mockURL);
            expect(productImage).to.be.not.undefined;
            expect(productImage).to.equal('https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png');
        });
    });
});