'use strict';

var mongoose = require('mongoose'),
	Thing = mongoose.model('Thing'),
	Movie = mongoose.model('Movie'),
	jayson = require('jayson');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
	return Thing.find(function(err, things) {
		if (!err) {
			return res.json(things);
		} else {
			return res.send(err);
		}
	});
};

exports.getrank = function(req, res) {
	var uid = parseInt(req.params.uid);
	//Setup json-rpc communication here
	var client = jayson.client.http({
		port: 8080,
		hostname: 'localhost'
	});
	client.request('get_rank', [uid], function(err, error, response) {
		if (err) throw err;
		return res.json(response);
	});
};

exports.createuser = function(req, res) {
	//Setup json-rpc communication here
	var client = jayson.client.http({
		port: 8080,
		hostname: 'localhost'
	});
	var uid = Math.round(new Date().getTime() / 1000);
	client.request('add_user', [uid], function(err, error, response) {
		if (err) throw err;
		return res.json(uid);
	});
};

exports.gettopmovies = function(req, res) {
	var uid = parseInt(req.params.uid);
	//Setup json-rpc communication here
	var client = jayson.client.http({
		port: 8080,
		hostname: 'localhost'
	});
	client.request('get_rank', [uid], function(err, error, response) {
		if (err) throw err;

		Movie.find({
			'id': {
				$in: response
			}
		}, function(err, docs) {
			return res.json(docs);
		});
	});
};

exports.getrandompair = function(req, res) {
	var uid = parseInt(req.params.uid);
	var client = jayson.client.http({
		port: 8080,
		hostname: 'localhost'
	});
	client.request('get_random_pair', [uid], function(err, error, response) {
		if (err) {
			console.log(err);
		}
		if (response) {
			Movie.find({
				id: {
					$in: [
						response[0].vid,
						response[1].vid
					]
				}
			}, function(err, docs) {
				return res.json(docs);
			});
		}
	});
	// 	Movie.find(function (err, movies) {
	// 	if (!err) {
	// 		var N = movies.length; 
	// 		var m1 = movies[Math.floor(Math.random() * N-1)];
	// 		var m2 = movies[Math.floor(Math.random() * N-1)]; 
	// 		return res.json([m1, m2]);
	// 	} else {
	// 		return res.send(err);
	// 	}
	// }); 
};

exports.updatechoice = function(req, res) {
	var client = jayson.client.http({
		port: 8080,
		hostname: 'localhost'
	});
	client.request('update_choice', req.body, function(err, error, response) {
		if (err) throw err;
		return res.json(response);
	});

};