import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 60 * 60 * 24 });

export default cache;
