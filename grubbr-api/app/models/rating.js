'use strict';

const Nodal = require('nodal');

class Rating extends Nodal.Model {}

Rating.setDatabase(Nodal.require('db/main.js'));
Rating.setSchema(Nodal.my.Schema.models.Rating);

module.exports = Rating;
