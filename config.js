var config = {};

try {
    config = require('./config.json');
}
catch (e) {
    console.warn('Missing config.json, using config-sample.json instead.');
    config = require('./config-sample.json');
}

module.exports = config;