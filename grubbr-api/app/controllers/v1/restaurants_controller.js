'use strict';

const Nodal = require('nodal');
const Restaurant = Nodal.require('app/models/restaurant.js');

class V1RestaurantsController extends Nodal.Controller {

  index() {

    Restaurant.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Restaurant.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Restaurant.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Restaurant.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Restaurant.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1RestaurantsController;
