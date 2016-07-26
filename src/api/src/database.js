const { Promise, process } = require('global');
const mongoose = require('mongoose');
const info = require('debug')('api:info:database');
const error = require('debug')('api:error:database');
const DB_NAME = 'acl';
const DB_ADDRESS = `${process.env.NODE_DB_ADDRESS}/${DB_NAME}`;
const connection = mongoose.connect(DB_ADDRESS);

mongoose.Promise = Promise;
mongoose.connection.on('connected', () =>
  info(`connected with ${DB_ADDRESS}`));
mongoose.connection.on('disconnected', () =>
  info(`disconnected with ${DB_ADDRESS}`));
mongoose.connection.on('error', error);
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    info('Mongoose connection disconnected through app termination');
    process.exit(0);
  });
});

function database() {
  return connection;
}

module.exports = database;
