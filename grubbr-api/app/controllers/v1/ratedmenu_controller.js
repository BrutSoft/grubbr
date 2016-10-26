'use strict';

const Nodal = require('nodal');

class V1RatedmenuController extends Nodal.Controller {

  get() {

    this.respond({message: `GET request to ${this.constructor.name}`});

  }

  post() {

    this.badRequest();

  }

  put() {

    this.badRequest();

  }

  del() {

    this.badRequest();

  }

}

module.exports = V1RatedmenuController;
