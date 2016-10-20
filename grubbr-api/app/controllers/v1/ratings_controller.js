'use strict';

const Nodal = require('nodal');
const Rating = Nodal.require('app/models/rating.js');

class V1RatingsController extends Nodal.Controller {

  index() {

    Rating.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Rating.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Rating.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Rating.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Rating.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1RatingsController;
