'use strict';

const Nodal = require('nodal');

class Adjective extends Nodal.Model {}

Adjective.setDatabase(Nodal.require('db/main.js'));
Adjective.setSchema(Nodal.my.Schema.models.Adjective);

module.exports = Adjective;
