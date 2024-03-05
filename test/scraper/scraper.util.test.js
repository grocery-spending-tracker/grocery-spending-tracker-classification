import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';

import ScraperUtil from '../../src/scraper/util.js';
import Logger from '../../src/logger.js';

use(chaiHttp);

describe('FRT-M9: ', () => {
    let readCacheStub, writeCacheStub, logErrorStub;

    beforeEach(() => {
        writeCacheStub = sandbox.stub(Util, 'writeCache').callsFake(() => {});
        logErrorStub = sandbox.stub(Logger, 'logError').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('FRT-M9-10: readCache()', function() {

        /**
         * FRT-M9-10a
         * Initial State: 
         * Input: 
         * Output:
         * Derivation: 
         */
        it('FRT-M9-10a: ', async () => {
            // readCacheStub = sandbox.stub(Util, 'readCache').returns({});
            // const expectedProductDetails = {
            //     brand: 'Nestea',
            //     image_url: 'https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png',
            //     name: 'Lemon Tea, Gable Top Carton',
            //     price: '$4.49',
            //     product_number: '20348331004_EA',
            //     store: 'Fortinos'
            // };
            // const productDetails = await getProductDetails(sampleSKU);
            // console.log(productDetails);
            // expect(productDetails).to.deep.equal(expectedProductDetails);
        });
    });
});
