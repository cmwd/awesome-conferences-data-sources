const co = require('co');
const paginator = require('../utils/paginator');
const { conferenceModel } = require('../model/index');

function *getConferencesList(offset, limit) {
  const conferences = yield conferenceModel.find().skip(offset).limit(limit);
  const count = yield conferenceModel.count();
  const pages = paginator.generate(count, offset, limit);

  return { pages, conferences };
}

function getConferences(req, res, next) {
  let {
    limit = 20,
    offset = 0,
  } = req.query;

  offset = parseInt(offset, 10);
  limit = parseInt(limit, 10);

  co(getConferencesList(offset, limit))
    .then(data => res.json(data))
    .catch(next);
}

module.exports = { getConferences };
