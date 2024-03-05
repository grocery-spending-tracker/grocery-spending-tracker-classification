import { expect, use } from 'chai';
import chaiHttp from 'chai-http';
import sandbox from 'sinon';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import ScraperUtil from '../../src/scraper/util.js';

use(chaiHttp);

describe('FRT-M9: Test util functions for scraper module', () => {
    let existsSyncStub, readFileSyncStub, writeFileSyncStub, spy;

    beforeEach(() => {
        existsSyncStub = sandbox.stub(fs, 'existsSync');
        readFileSyncStub = sandbox.stub(fs, 'readFileSync');
        writeFileSyncStub = sandbox.stub(fs, 'writeFileSync');
    });

    afterEach(() => {
        sandbox.restore();
    });

    /**
     * Tests for FRT-M9-10
     */
    describe('FRT-M9-10: readCache()', function() {

        /**
         * FRT-M9-10a
         * Initial State: none
         * Input: none
         * Output: empty Object
         * Derivation: the util function must ensure empty object is returned if reading cache file fails
         */
        it('FRT-M9-10a: should fail to read cache file and return empty object', async () => {
            existsSyncStub.withArgs(sandbox.match.any).returns(false);
        
            const result = ScraperUtil.readCache();
            expect(result).to.deep.equal({});
        });

        /**
         * FRT-M9-10b
         * Initial State: cache file with Object { key: "value" }
         * Input: none
         * Output: Object { key: "value" }
         * Derivation: the util function must ensure object is read from cache file
         */
        it('FRT-M9-10b: should return parsed JSON object from cache file if exists', () => {
            existsSyncStub.withArgs(sandbox.match.any).returns(true);
            readFileSyncStub.withArgs(sandbox.match.any).returns(JSON.stringify({ key: "value" }));
    
            const result = ScraperUtil.readCache();
            expect(result).to.deep.equal({ key: "value" });
        });
    });

    /**
     * Tests for FRT-M9-11
     */
    describe('FRT-M9-11: writeCache()', function() {

        /**
         * FRT-M9-11a
         * Initial State: empty cache file
         * Input: cacheData Object
         * Output: none
         * Derivation: the util function must ensure writeFileSync is called
         */
        it('FRT-M9-11a: should assert writing file JSON object to cache file', async () => {
            writeFileSyncStub.withArgs(sandbox.match.any);
            
            const cacheData = { key: "value" };
            ScraperUtil.writeCache(cacheData);
        
            sandbox.assert.calledOnce(writeFileSyncStub);
        
            sandbox.assert.calledWith(writeFileSyncStub, sandbox.match.string, JSON.stringify(cacheData, null, 2));
        });

        /**
         * FRT-M9-11b
         * Initial State: empty cache file
         * Input: cacheData Object
         * Output: none
         * Derivation: the util function must ensure correct file path is called
         */
        it('FRT-M9-11b: should assert path to cache file', async () => {
            writeFileSyncStub.withArgs(sandbox.match.any);
            
            const cacheData = { key: "value" };
            ScraperUtil.writeCache(cacheData);

            const __filename = fileURLToPath(import.meta.url);
            const __dirname = path.dirname(__filename);
            const expectedPath = path.join(__dirname, '../../src/scraper/cache.json');
        
            const expectedData = JSON.stringify(cacheData, null, 2);
            sandbox.assert.calledWith(writeFileSyncStub, expectedPath, expectedData);
        });
    });
});
