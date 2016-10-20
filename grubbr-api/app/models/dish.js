'use strict';

const Nodal = require('nodal');

class Dish extends Nodal.Model {}

Dish.setDatabase(Nodal.require('db/main.js'));
Dish.setSchema(Nodal.my.Schema.models.Dish);

module.exports = Dish;
