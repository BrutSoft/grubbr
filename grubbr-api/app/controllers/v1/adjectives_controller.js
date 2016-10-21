'use strict';

const Nodal = require('nodal');
const Adjective = Nodal.require('app/models/adjective.js');

class V1AdjectivesController extends Nodal.Controller {

  index() {

    Adjective.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    Adjective.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    Adjective.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    Adjective.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    Adjective.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = V1AdjectivesController;
