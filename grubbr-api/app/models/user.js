'use strict';

const Nodal = require('nodal');

class User extends Nodal.Model {}

User.setDatabase(Nodal.require('db/main.js'));
User.setSchema(Nodal.my.Schema.models.User);

module.exports = User;
