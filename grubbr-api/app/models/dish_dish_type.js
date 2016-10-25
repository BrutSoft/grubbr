'use strict';

const Nodal = require('nodal');

class DishDishType extends Nodal.Model {}

DishDishType.setDatabase(Nodal.require('db/main.js'));
DishDishType.setSchema(Nodal.my.Schema.models.DishDishType);

module.exports = DishDishType;
