import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';

import { logError } from '../../src/logger.js';
import getProductDetails from '../../src/scraper/fetchProductDetails.js';
import { readCache, writeCache } from '../../src/scraper/util.js';

use(chaiHttp);

describe('FRT-M9: Test fetch product details using scraper module', () => {
    let mockReadCache, mockWriteCache, mockLogError, mockServer;

    beforeEach(() => {

    });

    afterEach(() => {
        
    });

    describe('FRT-M9-6: Test getProductDetails()', () => {

        it('FRT-M9-6a: should fetch and return product details for new SKU', async () => {
            
        });
    });
});
