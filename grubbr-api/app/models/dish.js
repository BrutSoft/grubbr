'use strict';

const Nodal = require('nodal');

const Rating = Nodal.require('app/models/rating.js');

class Dish extends Nodal.Model {}

Dish.setDatabase(Nodal.require('db/main.js'));
Dish.setSchema(Nodal.my.Schema.models.Dish);


module.exports = Dish;
