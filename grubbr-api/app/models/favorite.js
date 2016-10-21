'use strict';

const Nodal = require('nodal');

class Favorite extends Nodal.Model {}

Favorite.setDatabase(Nodal.require('db/main.js'));
Favorite.setSchema(Nodal.my.Schema.models.Favorite);

module.exports = Favorite;
