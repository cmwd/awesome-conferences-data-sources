const _ = require('lodash');
const co = require('co-express');
const { Router } = require('express');
const bodyParser = require('body-parser');
const { BadRequest, NotFound } = require('http-errors');
const { videoModel, conferenceModel } = require('model');
const errorHandler = require('middleware/error-to-json-response');
const { tokenSecured, isAdmin } = require('middleware/authentication');
const collectors = require('service/collectors');

const SUCCESS_STATUS = { ok: true };

/**
 * @todo Find better solution for this check
 */
function* checkIfConferenceExists({ params }, res, next) {
  const conference = yield conferenceModel.findById(params.conferenceId);

  if (!conference) {
    throw new BadRequest('Unknown conference');
  }

  next(null);
}

function* getVideos(req, res) {
  const videos = yield videoModel.find();

  res.json({ videos, status: SUCCESS_STATUS });
}

function* getVideosByConferenceId({ params }, res) {
  const { conferenceId } = params;
  const videos = yield videoModel.find({ conferenceId });

  res.json({ videos, status: SUCCESS_STATUS });
}

function* addVideo({ params, body, log }, res) {
  const { conferenceId } = params;
  const { resourceName, videoId } = body;

  if (!resourceName || !videoId || !_.isString(videoId)) {
    throw new BadRequest('Incorrect input data');
  }

  const [videoDetails, video] = yield Promise.all([
    collectors.getVideoDetails({ resourceName, videoId }),
    videoModel.findOne({ conferenceId, videoId }),
  ]);
  const data = Object.assign({}, videoDetails, { resourceName, conferenceId });

  if (!video) {
    yield videoModel.create(data);
  } else {
    yield video.update(data, { runValidators: true });
  }

  res.json({ status: SUCCESS_STATUS });
}

function* removeVideo({ body }, res) {
  const { videoId } = body;

  const model = yield videoModel.findOne({ videoId });
  if (model) {
    yield model.remove();
  } else {
    throw new NotFound(`Video ${videoId} is not found`);
  }

  res.json({ status: { ok: true } });
}

module.exports = Router()
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .get('/', co(getVideos))
  .get('/:conferenceId',
    co(checkIfConferenceExists),
    co(getVideosByConferenceId)
    )
  .put('/:conferenceId',
    tokenSecured,
    isAdmin,
    co(checkIfConferenceExists),
    co(addVideo))
  .delete('/:conferenceId',
    tokenSecured,
    isAdmin,
    co(removeVideo))
  .use(errorHandler);
