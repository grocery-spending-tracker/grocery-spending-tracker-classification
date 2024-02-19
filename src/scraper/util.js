const fs = require('fs');
const path = require('path');


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

module.exports = { readCache, writeCache };
