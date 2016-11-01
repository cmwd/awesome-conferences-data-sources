const fetch = require('node-fetch');
const { ServiceUnavailable } = require('http-errors');
const { stringify } = require('querystring');
const { COLLECTORS_ADDRESS } = require('config');
const logger = require('logger');

module.exports = {
  getVideoDetails({ resourceName, videoIds }) {
    const query = stringify({ action: 'videos' });
    const url = `${COLLECTORS_ADDRESS}/resource/${resourceName}/?${query}`;
    const opts = {
      body: JSON.stringify({ videoIds }),
      method: 'POST',
      timeout: 3e4,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    logger.trace(url);

    return fetch(url, opts)
    .then(response => response.json())
    .catch((err) => {
      logger.fatal(err);

      switch (err.code) {
        case 'ENOTFOUND':
        case 'ECONNRESET':
          throw new ServiceUnavailable('Failed to load video details');
        default:
          return Promise.reject(err);
      }
    });
  },
};
