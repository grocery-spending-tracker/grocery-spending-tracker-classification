import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';

import getProductDetails from '../../src/scraper/fetchProductDetails.js';
import Util from '../../src/scraper/util.js';
import Logger from '../../src/logger.js';

use(chaiHttp);

describe('FRT-M9: Test fetch product details using scraper module', () => {
    const sampleSKU = '08390000636';
    let readCacheStub, writeCacheStub, logErrorStub;

    beforeEach(() => {
        writeCacheStub = sandbox.stub(Util, 'writeCache').callsFake(() => {});
        logErrorStub = sandbox.stub(Logger, 'logError').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    /**
     * Tests for FRT-M9-6
     */
    describe('FRT-M9-6: Test getProductDetails()', function() {

        this.timeout(100000);

        /**
         * FRT-M9-6a
         * Initial State: empty cache.json
         * Input: a valid sku 08390000636
         * Output: product details
         * Derivation: the scraper module must properly scrape all product details from web.
         */
        it('FRT-M9-6a: should scrape and return product details for SKU', async () => {
            readCacheStub = sandbox.stub(Util, 'readCache').returns({});
            const expectedProductDetails = {
                brand: 'Nestea',
                image_url: 'https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png',
                name: 'Lemon Tea, Gable Top Carton',
                price: '$4.49',
                product_number: '20348331004_EA',
                store: 'Fortinos'
            };
            const productDetails = await getProductDetails(sampleSKU);
            // console.log(productDetails);
            expect(productDetails).to.deep.equal(expectedProductDetails);
        });

        /**
         * FRT-M9-6b
         * Initial State: cache.json with item "08390000636"
         * Input: a valid sku 08390000636
         * Output: product details
         * Derivation: the scraper module must properly access all product details from cache.
         */
        it('FRT-M9-6b: should access cache and return product details for SKU', async () => {
            readCacheStub = sandbox.stub(Util, 'readCache').returns(
                {
                    "08390000636": {
                        "store": "Fortinos",
                        "brand": "Nestea",
                        "name": "Lemon Tea, Gable Top Carton",
                        "price": "$4.49",
                        "product_number": "20348331004_EA",
                        "image_url": "https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png"
                    }
                }
            );
            const expectedProductDetails = {
                brand: 'Nestea',
                image_url: 'https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png',
                name: 'Lemon Tea, Gable Top Carton',
                price: '$4.49',
                product_number: '20348331004_EA',
                store: 'Fortinos'
            };
            const productDetails = await getProductDetails(sampleSKU);
            // console.log(productDetails);
            expect(productDetails).to.deep.equal(expectedProductDetails);
        });
    });
});
