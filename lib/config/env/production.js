'use strict';

module.exports = {
  env: 'production',
  port: 80,
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/flickfind'
  }
};