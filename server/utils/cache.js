const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

module.exports = cache;
