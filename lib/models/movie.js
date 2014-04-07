'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Movie Schema
 */
var MovieSchema = new Schema({
  id: Number,
  title: String,
  year: Number,
  count: String,
  rating: String,
  plot: String
});

mongoose.model('Movie', MovieSchema);
