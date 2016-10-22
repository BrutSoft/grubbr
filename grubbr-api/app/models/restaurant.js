'use strict';

const Nodal = require('nodal');

class Restaurant extends Nodal.Model {}

Restaurant.setDatabase(Nodal.require('db/main.js'));
Restaurant.setSchema(Nodal.my.Schema.models.Restaurant);

module.exports = Restaurant;
