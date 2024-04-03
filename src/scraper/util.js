import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cachePath = path.join(__dirname, 'cache.json');

/**
 * reads data from cache
 * @returns {List} list of items data from cache
 */
function readCache() {
    if (fs.existsSync(cachePath)) {
        const cacheRaw = fs.readFileSync(cachePath);
        return JSON.parse(cacheRaw);
    }
    return {};
}

/**
 * writes data to cache
 * @param {Dict} cache item data to be written to cache
 */
function writeCache(cache) {
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

export default { readCache, writeCache };
