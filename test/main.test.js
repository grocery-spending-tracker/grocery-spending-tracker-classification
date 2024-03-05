import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';

import ItemProcessor from '../src/main.js';
import classifyItem from '../src/classification/classifyItem.js';
import fuzzyMatch from '../src/classification/fuzzyMatching.js';
import UtilClassification from '../src/classification/util.js';
import UtilScraper from '../src/scraper/util.js';
import Logger from '../src/logger.js';

use(chaiHttp);

describe('FRT-M9: Test match product details using classification module', () => {
    let readCacheStub, writeCacheStub, logErrorStub, mockInputItems;

    mockInputItems = [
        {
            "item_key": "06038318916",
            "item_desc": "PC ITAL SAUS",
            "price": 4.29,
            "taxed": false
        },
        {
            "item_key": "08390000636",
            "item_desc": "NESTEA ICED TEA",
            "price": 3.79,
            "taxed": false
        },
        {
            "item_key": "06905212968",
            "item_desc": "PBRY PPOP PEPPRN",
            "price": 7.99,
            "taxed": false
        },
        {
            "item_key": "06038318640",
            "item_desc": "PCO CREMINI 227",
            "price": 1.99,
            "taxed": false
        },
        {
            "item_key": "2003040",
            "item_desc": "LEAN GRND BEEF",
            "price": 7.2,
            "taxed": false
        }
    ];

    beforeEach(() => {
        readCacheStub = sandbox.stub(UtilScraper, 'readCache').returns({});
        writeCacheStub = sandbox.stub(UtilScraper, 'writeCache').callsFake(() => {});
        logErrorStub = sandbox.stub(Logger, 'logError').callsFake(() => {});
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('FRT-M9-9: Test classifyItem()', function() {

        this.timeout(500000);

        /**
         * FRT-M9-9a
         * Initial State: none
         * Input: list of items and their details from receipt
         * Output: list of classified items and their details obtained from scraper
         * Derivation: the process should ensure that item is properly processed and robustly scrapes item details from web
         */
        it('FRT-M9-9a: Should scrape item details and return list of items and their details', async () => {
            const expectedClassifiedItem = [
                {
                    "brand": "President's Choice",
                    "image_url": "https://assets.shop.loblaws.ca/products/21004178/b1/en/front/21004178_front_a01_@2.png",
                    "list_price": 4.49,
                    "name": "Italian Sausage Pasta Sauce",
                    "price": 4.29,
                    "product_number": "21004178_EA"
                },
                {
                    "brand": "Nestea",
                    "image_url": "https://assets.shop.loblaws.ca/products/20348331004/b1/en/front/20348331004_front_a01_@2.png",
                    "list_price": 4.49,
                    "name": "Lemon Tea, Gable Top Carton",
                    "price": 3.79,
                    "product_number": "20348331004_EA"
                },
                {
                    "brand": "Pillsbury",
                    "image_url": "https://assets.shop.loblaws.ca/products/21435910/b1/en/front/21435910_front_a01_@2.png",
                    "list_price": 8.49,
                    "name": "Pizza Pops Pepperoni 8ct",
                    "price": 7.99,
                    "product_number": "21435910_EA"
                },
                {
                    "brand": "PC Organics",
                    "image_url": "https://assets.shop.loblaws.ca/products/21021565/b1/en/front/21021565_front_a01_@2.png",
                    "list_price": 3.29,
                    "name": "Organics Whole Cremini Mushrooms",
                    "price": 1.99,
                    "product_number": "21021565_EA"
                },
                {
                    "brand": "",
                    "image_url": "https://assets.shop.loblaws.ca/products/20797930/b1/en/front/20797930_front_a01_@2.png",
                    "list_price": 7.79,
                    "name": "Lean Ground Beef",
                    "price": 7.2,
                    "product_number": null
                }
            ];
            const classifiedItem = await ItemProcessor.processItem(mockInputItems);
            // console.log(classifiedItem);
            expect(classifiedItem).to.deep.equal(expectedClassifiedItem);
        });
    });
});
