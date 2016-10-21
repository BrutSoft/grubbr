'use strict';

const Nodal = require('nodal');

class MenuType extends Nodal.Model {}

MenuType.setDatabase(Nodal.require('db/main.js'));
MenuType.setSchema(Nodal.my.Schema.models.MenuType);

module.exports = MenuType;
