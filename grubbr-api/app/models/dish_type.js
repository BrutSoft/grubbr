'use strict';

const Nodal = require('nodal');

class DishType extends Nodal.Model {}

DishType.setDatabase(Nodal.require('db/main.js'));
DishType.setSchema(Nodal.my.Schema.models.DishType);

module.exports = DishType;
