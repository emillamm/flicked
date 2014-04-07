'use strict';

module.exports = {
	port: 80,
  env: 'production',
  mongo: {
    uri: process.env.MONGOLAB_URI ||
         process.env.MONGOHQ_URL ||
         'mongodb://localhost/flickfind'
  }
};