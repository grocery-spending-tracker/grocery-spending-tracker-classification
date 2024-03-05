import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';

import classifyItem from '../../src/classification/classifyItem.js';
import fuzzyMatch from '../../src/classification/fuzzyMatching.js';
import UtilClassification from '../../src/classification/util.js';
import Logger from '../../src/logger.js';

use(chaiHttp);

describe('FRT-M9: Test match product details using classification module', () => {
    let mockValidInputItem, mockInvalidInputData, logErrorStub, fuzzyMatchStub;
    
    mockValidInputItem = [{
        item_key: '06038318916', 
        item_desc: 'PC ITAL SAUS', 
        price: 4.29, 
        taxed: false
    }];

    mockInvalidInputData = [{}];

    beforeEach(() => {
        logErrorStub = sandbox.stub(Logger, 'logError').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    /**
     * Tests for FRT-M9-8
     */
    describe('FRT-M9-8: Test classifyItem()', async () => {

        /**
         * FRT-M9-8a
         * Initial State: none
         * Input: list of valid input item data
         * Output: empty list
         * Derivation: the classification module must reject match if score is above threshold.
         */
        it('FRT-M9-8a: Should classify item match that has match score above threshold and return empty list', async () => {
            const expectedClassifiedItem = [];
            const classifiedItem = await classifyItem(mockValidInputItem);
            // console.log(classifiedItem);
            expect(classifiedItem).to.deep.equal(expectedClassifiedItem);
        });

        /**
         * FRT-M9-8b
         * Initial State: none
         * Input: list of valid input item data
         * Output: list containing matched item details of input item
         * Derivation: the classification module must verify return of classified item deatils if match score is below threshold.
         */
        it('FRT-M9-8b: Should classify item match that has match score below threshold and return matched item description', async () => {
            fuzzyMatchStub = sandbox.stub(fuzzyMatch, 'fuzzyMatching').returns(
                [{ 
                    input: {
                        item_key: '06038318916', 
                        item_desc: 'PC ITAL SAUS', 
                        price: '4.29', 
                        taxed: false
                    }, 
                    match: {
                        store: 'Fortinos', 
                        brand: 'Pantanella', 
                        image_url: 'https://assets.shop.loblaws.ca/products/20251188008/b3/en/front/20251188008_front_a06_@2.png',
                        name: 'Spelt Pasta', 
                        price: 'sale\n$4.29', 
                        product_number: '20251188008_EA',
                        was_price: 'was\n$4.49'
                    }, 
                    score: 0.3388331601616838
                }]
            );

            const expectedClassifiedItem = {
                brand: 'Pantanella',
                name: 'Spelt Pasta',
                price: 'sale\n$4.29',
                was_price: 'was\n$4.49',
                product_number: '20251188008_EA',
                image_url: 'https://assets.shop.loblaws.ca/products/20251188008/b3/en/front/20251188008_front_a06_@2.png'
            };
            const classifiedItem = await classifyItem(mockValidInputItem);
            // console.log(classifiedItem);
            expect(classifiedItem).to.deep.equal(expectedClassifiedItem);
        });
    });
});
