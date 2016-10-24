'use strict';

const Nodal = require('nodal');

const Rating = Nodal.require('app/models/rating.js');

class Dish extends Nodal.Model {}

Dish.setDatabase(Nodal.require('db/main.js'));
Dish.setSchema(Nodal.my.Schema.models.Dish);

// Dish.calculates('ratingScore', function () {
//   let id = this.get('id');
//   Rating.query().where('dish_id === id').end((err, models) => {
//
//     return models;
//
//   });
//   // return 5;
// }, function () { return 7; });

module.exports = Dish;
