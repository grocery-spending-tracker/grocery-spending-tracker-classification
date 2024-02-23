import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cachePath = path.join(__dirname, 'cache.json');

function readCache() {
    if (fs.existsSync(cachePath)) {
        const cacheRaw = fs.readFileSync(cachePath);
        return JSON.parse(cacheRaw);
    }
    return {};
}

function writeCache(cache) {
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2));
}

export { readCache, writeCache };
